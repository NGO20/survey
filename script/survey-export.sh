#! /usr/bin/env sh
csv=/opt/mysql/backups/survey.csv
dest=/usr/share/nginx/survey/survey-1b3df2349a.csv
mysqldump -uroot -p123456 --tab=/tmp --fields-terminated-by=, --fields-enclosed-by='"' --lines-terminated-by=0x0d0a ngo20map survey > ${csv}
rm $(dest)
iconv -f utf-8 -t utf-16 ${csv} > ${dest}
