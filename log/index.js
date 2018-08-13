let fs = require('fs');
let moment = require('moment');
let logPattern = '$remote_addr - - [$time_local] "$request" $status $body_bytes_sent "$http_referer" "$http_user_agent"';
let nginxLogParse = require('nginx-log-parser')(logPattern);

let logs = fs.readFileSync('access.log', {'encoding': 'utf8'}).split('\n');
let map = new Map(),
    re = /html\?id=(\d+)/i,
    reOS = /Mozilla\/\d.\d \(([^\)]*)\)/i;

let getOS = (osStr) => {
    if (!osStr) return 'unknown';
    if (/windows nt 5.[1-2]/i.test(osStr)) return 'Windows XP';
    if (/windows nt 6.1/i.test(osStr)) return 'Windows 7';
    if (/windows nt 6.[2-3]/i.test(osStr)) return 'Windows 8';
    if (/windows nt 10.0/i.test(osStr)) return 'Windows 10';
    if (/Macintosh/i.test(osStr)) {
        return osStr.split(';')[1];
    }
    if (/iphone/i.test(osStr)) {
        let iOS_ver = osStr.match(/OS ([\d_]+)/i)[1];
        return 'iOS ' + iOS_ver.replace(/_/g, '.');
    }
    let found = osStr.match(/Android[^;]+;[^;]+/i);
    if (found) {
        return  found[0];
    }
    return 'unknown:' + osStr;
}

let getBrowser = (userAgent, os) => {
    if (/micromessenger/i.test(userAgent)) {
        return 'Wechat';
    }
    let found = userAgent.match(/QQBrowser\/[\d.]+/i);
    if (found) {
        return found[0];
    }

   found = userAgent.match(/chrome\/[^\s]+/i);
    if(found) {
        return found[0];
    }

    if (/safari/i.test(userAgent)) {
        if(os.match(/android/i))
            return 'Android Browser';
        let verFound = userAgent.match(/version\/([\d.]+)/i);
        let ver = !verFound ? '' : ' ' + verFound[1];
        if(os.match(/mac/i) || os.match(/ios/i))
            return 'Safari' + ver;
    }

    if (/firefox/i.test(userAgent))
        return 'Firefox';

    if (/applewebkit/i.test(userAgent))
        return 'Webkit based Browser';

    found = userAgent.match(/trident\/([\d.]+)/i);
    if (found) {
        let ver = Number(found[1]);
        if (ver >= 7.0)
            return 'IE 11';
        if (ver >= 6.0)
            return 'IE 10';
        if (ver >= 5.0)
            return 'IE 9';
        if (ver >= 4.0)
            return 'IE 8';
    }
    found = userAgent.match(/MSIE [\d.]+/i);
    if (found) return found[0];
    return 'unknown';
}


logs.forEach((log) => {
    let found = log.match(re);
    if (!found) return;
    let id = found[1];

    let data = nginxLogParse(log);
    let userAgent = data['http_user_agent'];
    let os = getOS(userAgent.match(reOS)[1]);
    let browser = getBrowser(userAgent, os)
    if (!map.get(id)) {
        map.set(id, [{
            'ip' : data['remote_addr'],
            'os' : os,
            'browser': browser,
            'useragent': userAgent,
            'count': 1
        }])
    } else {
        let items = map.get(id);
        let ip = data['remote_addr'];

        let index = items.findIndex((item) => {
            return item.ip === ip && item.useragent == userAgent;
        })
        if (index === -1) {
            items.push({
                'ip' : data['remote_addr'],
                'os' : os,
                'browser': browser,
                'useragent': userAgent,
                'count': 1
            })
        } else {
            items[index].count++;
        }
    }
    // let datetime = moment(data.time_local.slice(1, -1), 'DD/MMM/YYYY:HH:mm:ss Z');
    // console.log(data.time_local, datetime.startOf('hour'));
});

let obj = {}, obj1 = {}
map.forEach((v, id)=> {
    obj[id] = v;
    let item = v.sort((a, b) => a.count < b.count)[0]
    console.log("update survey set ip='" + item.ip + "', os='" + item.os + "', browser='" + item.browser + "' where id=" + id +';');
})

