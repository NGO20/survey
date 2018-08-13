const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

let model = {};
function initModel() {
    let sequelize = new Sequelize('ngo20map', 'root', '123456', {
        host: '127.0.0.1',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        }
    });

    model.User = sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: Sequelize.STRING(100),
        type: Sequelize.STRING(20),
        englishName: {
            type: Sequelize.STRING(100),
            field: 'english_name'
        },
        byname: Sequelize.STRING(100),
        email: Sequelize.STRING(100),
        phone: Sequelize.STRING(50),
        province: Sequelize.STRING(20),
        city: Sequelize.STRING(20),
        county: Sequelize.STRING(20),
        place: Sequelize.TEXT,
        weibo: Sequelize.STRING(50),
        wechat: Sequelize.STRING(50),
        website: Sequelize.STRING(50),
        workField: {
            type: Sequelize.STRING(200),
            field: 'work_field',
            get: function () {
                let val = this.getDataValue('workField');
                return val ? val.split(',') : null;
            }
        },
        documentedYear: {
            type: Sequelize.CHAR(4),
            field: 'documented_year'
        },
        documentedMonth: {
            type: Sequelize.CHAR(4),
            field: 'documented_month'
        },
        registerYear: {
            type: Sequelize.CHAR(4),
            field: 'register_year'
        },
        registerMonth: {
            type: Sequelize.CHAR(4),
            field: 'register_month'
        },
        registerType: {
            type: Sequelize.CHAR(20),
            field: 'register_type'
        },
        projectScale: {
            type: Sequelize.STRING(100),
            field: 'project_scale'
        },
        serviceArea: {
            type: Sequelize.STRING(100),
            field: 'service_area'
        },
        staffFulltime: {
            type: Sequelize.INTEGER,
            field: 'staff_fulltime'
        },
        staffFulltimeRange: {
            type: Sequelize.STRING(50),
            field: 'staff_fulltime_range'
        },
        staffParttime: {
            type: Sequelize.INTEGER,
            field: 'staff_parttime'
        },
        staffVolunteer: {
            type: Sequelize.INTEGER,
            field: 'staff_volunteer'
        },
        orgRules: {
            type: Sequelize.STRING(100),
            field: 'org_rules'
        },
        hasBoard: {
            type: Sequelize.INTEGER,
            field: 'has_board'
        },
        accountantSatus: {
            type: Sequelize.INTEGER,
            field: 'accountant_status'
        },
        leadExperience: {
            type: Sequelize.STRING(50),
            field: 'lead_experience'
        },
        memberExperience: {
            type: Sequelize.STRING(50),
            field: 'member_experience'
        },
        govLevel: {
            type: Sequelize.STRING(20),
            field: 'gov_level'
        },
        hasReward: {
            type: Sequelize.INTEGER,
            field: 'has_reward'
        },
        rewardDetail: {
            type: Sequelize.STRING(150),
            field: 'reward_detail'
        },
        participantScale: {
            type: Sequelize.STRING(100),
            field: 'participant_scale'
        },
        fundInfo: {
            type: Sequelize.STRING(100),
            field: 'fund_info'
        },
        mediaRport: {
            type: Sequelize.STRING(100),
            field: 'media_report'
        },
        hasReport: {
            type: Sequelize.INTEGER,
            field: 'has_report'
        },
        hasPlan: {
            type: Sequelize.INTEGER,
            field: 'has_plan'
        }
    }, {
        tableName: 'user',
        timestamps: false
    });

    model.Survey = sequelize.define('survey', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        orgName: {
            type: Sequelize.STRING(100),
            field: 'org_name'
        },
        alias: Sequelize.STRING(100),
        email: Sequelize.STRING(100),
        phone: Sequelize.STRING(50),
        province: Sequelize.STRING(20),
        city: Sequelize.STRING(20),
        district: Sequelize.STRING(20),
        address: Sequelize.TEXT,
        userName: {
            type: Sequelize.STRING(100),
            field: 'user_name'
        },
        userPosition: {
            type: Sequelize.STRING(100),
            field: 'user_position'
        },
        userPhone: {
            type: Sequelize.STRING(50),
            field: 'user_phone'
        },
        qq: Sequelize.STRING(20),
        weibo: Sequelize.STRING(50),
        website: Sequelize.STRING(50),
        wechat: Sequelize.STRING(50),
        workField: {
            type: Sequelize.STRING(200),
            field: 'work_field',
            get: function () {
                let val = this.getDataValue('workField');
                return val ? val.split(',') : null;
            },
            set: function (val) {
                return this.setDataValue('workField', val ? Object.keys(val).map((key) => val[key]).join(',') : null);
            }
        },
        workFieldExt: {
            type: Sequelize.STRING(50),
            field: 'work_field_ext'
        },
        orgFundingTime: {
            type: Sequelize.DATE,
            field: 'org_funding_time'
        },
        orgRegisterTime: {
            type: Sequelize.DATE,
            field: 'org_register_time'
        },
        registerType: {
            type: Sequelize.STRING(50),
            field: 'register_type'
        },
        orgInitator: {
            type: Sequelize.STRING(100),
            field: 'org_initator'
        },
        income: Sequelize.STRING(50),
        projectScale: {
            type: Sequelize.STRING(50),
            field: 'project_scale'
        },
        serviceArea: {
            type: Sequelize.STRING(50),
            field: 'service_area'
        },
        staffFulltime: {
            type: Sequelize.STRING(20),
            field: 'staff_fulltime'
        },
        staffParttime: {
            type: Sequelize.STRING(20),
            field: 'staff_parttime'
        },
        staffVolunteer: {
            type: Sequelize.STRING(20),
            field: 'staff_volunteer'
        },
        orgRules: {
            type: Sequelize.STRING(200),
            field: 'org_rules',
            get: function () {
                let val = this.getDataValue('orgRules');
                return val ? val.split(',') : null;
            },
            set: function (val) {
                return this.setDataValue('orgRules', val ? Object.keys(val).map((key)=>val[key]).join(',') : null);
            }
        },
        hasBoard: {
            type: Sequelize.INTEGER,
            field: 'has_board'
        },
        accountantStatus: {
            type: Sequelize.STRING(20),
            field: 'accountant_status'
        },
        leadExperience: {
            type: Sequelize.STRING(50),
            field: 'lead_experience'
        },
        memberExperience: {
            type: Sequelize.STRING(50),
            field: 'member_experience'
        },
        govLevel: {
            type: Sequelize.STRING(20),
            field: 'gov_level'
        },
        hasReward: {
            type: Sequelize.INTEGER,
            field: 'has_reward'
        },
        rewardDetail: {
            type: Sequelize.STRING(150),
            field: 'reward_detail'
        },
        participantScale: {
            type: Sequelize.STRING(100),
            field: 'participant_scale'
        },
        techSupport: {
            type: Sequelize.STRING(50),
            field: 'tech_support'
        },
        fundInfo: {
            type: Sequelize.STRING(100),
            field: 'fund_info',
            get: function () {
                let val = this.getDataValue('fundInfo');
                return val ? val.split(',') : null;
            },
            set: function (val) {
                return this.setDataValue('fundInfo', val ? Object.keys(val).map((key)=>val[key]).join(',') : null);
            }
        },
        mediaReport: {
            type: Sequelize.STRING(100),
            field: 'media_report'
        },
        internetLimiting: {
            type: Sequelize.STRING(50),
            field: 'internet_limiting'
        },
        internetLimitingExt: {
            type: Sequelize.STRING(100),
            field: 'internet_limiting_ext'
        },
        internetDemand: {
            "type": Sequelize.STRING(100),
            "field": "internet_demand"
        },
        internetDemandExt: {
            "type": Sequelize.STRING(100),
            "field": "internet_demand_ext"
        },
        commCustomerMethod: {
            "type": Sequelize.STRING(100),
            "field": "comm_customer_method",
            get: function () {
                let val = this.getDataValue('commCustomerMethod');
                return val ? val.split(',') : null;
            },
            set: function (val) {
                return this.setDataValue('commCustomerMethod', val ? Object.keys(val).map((key)=>val[key]).join(',') : null);
            }
        },
        commVolunteerMethods: {
            "type": Sequelize.STRING(100),
            "field": "comm_volunteer_method",
            get: function () {
                let val = this.getDataValue('commVolunteerMethods');
                return val ? val.split(',') : null;
            },
            set: function (val) {
                return this.setDataValue('commVolunteerMethods', val ? Object.keys(val).map((key)=>val[key]).join(',') : null);
            }
        },
        hasCrowdfunding: {
            "type": Sequelize.INTEGER,
            "field": "has_crowdfunding"
        },
        crowdfundingCount: {
            "type": Sequelize.INTEGER,
            "field": "crowdfunding_count",
            set: function(val) {
              let count = parseInt(val);
              return this.setDataValue('crowdfundingCount', isNaN(count) ? 0 : count);
            }
        },
        crowdfundingPlatform: {
            "type": Sequelize.STRING(100),
            "field": "crowdfunding_platform",
            get: function () {
                let val = this.getDataValue('crowdfundingPlatform');
                return val ? val.split(',') : null;
            },
            set: function (val) {
                return this.setDataValue('crowdfundingPlatform', val ? Object.keys(val).map((key)=>val[key]).join(',') : null);
            }
        },
        crowdfundingExt: {
            "type": Sequelize.STRING(100),
            "field": "crowdfunding_ext"
        },
        crowdfundingProject: {
            "type": Sequelize.STRING(100),
            "field": "crowdfunding_project"
        },
        crowdfundingAmount: {
            "type": Sequelize.FLOAT,
            "field": "crowdfunding_amount",
            set: function(val) {
              let count = parseInt(val);
              return this.setDataValue('crowdfundingAmount', isNaN(count) ? 0 : count);
            }
        },
        communityLevel: {
            "type": Sequelize.STRING(20),
            "field": "community_level"
        },
        expertLevel: {
            "type": Sequelize.STRING(20),
            "field": "expert_level"
        },
        newVolunteerLevel: {
            "type": Sequelize.STRING(20),
            "field": "new_volunteer_level"
        },
        oldVolunteerLevel: {
            "type": Sequelize.STRING(20),
            "field": "old_volunteer_level"
        },
        buildingBrandLevel: {
            "type": Sequelize.STRING(20),
            "field": "building_brand_level"
        },
        oldCustomerLevel: {
            "type": Sequelize.STRING(20),
            "field": "old_customer_level"
        },
        newFundSourceLevel: {
            "type": Sequelize.STRING(20),
            "field": "new_fund_source_level"
        },
        oldFundSourceLevel: {
            "type": Sequelize.STRING(20),
            "field": "old_fund_source_level"
        },
        orgWebLevel: {
            "type": Sequelize.STRING(20),
            "field": "org_web_level"
        },
        pvLevel: {
            "type": Sequelize.STRING(20),
            "field": "pv_level"
        },
        opWechatLevel: {
            "type": Sequelize.STRING(20),
            "field": "op_wechat_level"
        },
        prPlan: {
            "type": Sequelize.STRING(50),
            "field": "pr_plan"
        },
        prChannel: {
            "type": Sequelize.STRING(200),
            "field": "pr_channel",
            get: function () {
                let val = this.getDataValue('prChannel');
                return val ? val.split(',') : null;
            },
            set: function (val) {
                return this.setDataValue('prChannel', val ? Object.keys(val).map((key)=>val[key]).join(',') : null);
            }
        },
        misVolunteer: {
            "type": Sequelize.INTEGER,
            "field": "mis_volunteer"
        },
        misCustomer: {
            "type": Sequelize.INTEGER,
            "field": "mis_customer"
        },
        misFund: {
            "type": Sequelize.INTEGER,
            "field": "mis_fund"
        },
        cloudDirve: {
            "type": Sequelize.INTEGER,
            "field": "cloud_dirve"
        },
        misProject: {
            "type": Sequelize.INTEGER,
            "field": "mis_project"
        },
        newsletterSub: {
            "type": Sequelize.INTEGER,
            "field": "newsletter_sub"
        },
        wechatSub: {
            "type": Sequelize.INTEGER,
            "field": "wechat_sub"
        },
        weiboSub: {
            "type": Sequelize.INTEGER,
            "field": "weibo_sub"
        },
        groupMember: {
            "type": Sequelize.INTEGER,
            "field": "group_member"
        },
        announceAim: {
            "type": Sequelize.INTEGER,
            "field": "announce_aim"
        },
        hasPartner: {
            "type": Sequelize.INTEGER,
            "field": "has_partner"
        },
        hasReport: {
            "type": Sequelize.INTEGER,
            "field": "has_report"
        },
        hasPlan: {
            "type": Sequelize.INTEGER,
            "field": "has_plan"
        },
        websiteAnalysis: {
            "type": Sequelize.STRING(10),
            "field": "website_analysis"
        },
        weiboAnalysis: {
            "type": Sequelize.STRING(10),
            "field": "weibo_analysis"
        },
        wechatAnalysis: {
            "type": Sequelize.STRING(10),
            "field": "wechat_analysis"
        },
        orgAbilityAnalysis: {
            "type": Sequelize.STRING(10),
            "field": "org_ability_analysis"
        },
        stuffTraining: {
            "type": Sequelize.STRING(100),
            "field": "stuff_training"
        },
        attendOnlineVC: {
            "type": Sequelize.STRING(10),
            "field": "attend_online_v_c"
        },
        attendResourcePairMeeting: {
            "type": Sequelize.STRING(10),
            "field": "attend_resource_pair_meeting"
        },
        attendBid: {
            "type": Sequelize.STRING(10),
            "field": "attend_bid"
        },
        webNgoResource: {
            "type": Sequelize.STRING(10),
            "field": "web_ngo_resource"
        },
        mediaPublicResource: {
            "type": Sequelize.STRING(10),
            "field": "media_public_resource"
        },
        onlineCalnader: {
            "type": Sequelize.STRING(10),
            "field": "online_calnader"
        },
        onlineMetting: {
            "type": Sequelize.STRING(10),
            "field": "online_metting"
        },
        onlineEditor: {
            "type": Sequelize.STRING(10),
            "field": "online_editor"
        },
        onlineCollaboration: {
            "type": Sequelize.STRING(10),
            "field": "online_collaboration"
        },
        onlineScreenShare: {
            "type": Sequelize.STRING(10),
            "field": "online_screen_share"
        },
        trainingShare: {
            "type": Sequelize.STRING(10),
            "field": "training_share"
        },
        internalTraining: {
            "type": Sequelize.STRING(10),
            "field": "internal_training"
        },
        opinionAnalysis: {
            "type": Sequelize.STRING(10),
            "field": "opinion_analysis"
        },
        publicity: {
            "type": Sequelize.STRING(10),
            "field": "publicity"
        },
        publicVideo: {
            "type": Sequelize.STRING(10),
            "field": "public_video"
        },
        snInteract: {
            "type": Sequelize.STRING(10),
            "field": "sn_interact"
        },
        snShare: {
            "type": Sequelize.STRING(10),
            "field": "sn_share"
        },
        publicityPage: {
            "type": Sequelize.STRING(10),
            "field": "publicity_page"
        },
        visitNGOSite: {
            "type": Sequelize.STRING(10),
            "field": "visit_ngo_site"
        },
        usingSE: {
            "type": Sequelize.STRING(10),
            "field": "using_se"
        },
        ontimeWebUpdate: {
            "type": Sequelize.STRING(10),
            "field": "ontime_web_update"
        },
        snUpdateProjectInfo: {
            "type": Sequelize.STRING(10),
            "field": "sn_update_project_info"
        },
        snPublish: {
            "type": Sequelize.STRING(10),
            "field": "sn_publish"
        },
        meidaInterview: {
            "type": Sequelize.STRING(10),
            "field": "meida_interview"
        },
        foreignMedia: {
            "type": Sequelize.STRING(10),
            "field": "foreign_media"
        },
        rating: Sequelize.STRING(10),
        startTime: Sequelize.DATE,
        endTime: Sequelize.DATE,
        ip: Sequelize.STRING(20),
        os: Sequelize.STRING(20),
        browser: Sequelize.STRING(50)
    }, {
        tableName: 'survey',
        underscored: true
    })
    model.Survey.sync();
}

async function querySuggestions(ctx, next) {
    let key = '%' + ctx.query.key + '%';
    let users = await model.User.findAll({
        where: {
            name: {
                [Op.like]: key
            },
            type: 'ngo'
        },
        attributes: ['id', 'name'],
        limit: 10
    });
    ctx.response.body = {suggestions: users};
}

async function queryServerTime(ctx, next) {
    ctx.response.body = {datetime: new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')}
}

async function queryOrgInfo(ctx, next) {
    let orgId = ctx.query.id;
    console.log(ctx.request);
    let org = await model.User.findOne({
        where: {id: orgId}
    });
    console.log(org);
    ctx.response.body = {orgInfo: org}
}

const scoreRules = {
    workField: {
        score: 2.91, type: 'range',
        preProcess: function (value) { return value.length; },
        conds: {3: 1, 5: 0.9, 7: 0.5, 1024: 0}
    },
    orgAge: {score: 2.34, type: 'range', conds: {5: 0.2, 1024: 1}},
    registerType: {score: 3.97, type: 'match', conds: {'民非注册': 1, '工商注册': 0.8, '机构挂靠': 0.6, '虚拟组织': 0.4}},
    staffFulltime: {
        score: 1.96,
        type: 'match',
        conds: {'51人及以上': 1, '21-50人': 1, '11-20人': 0.8, '4-10人': 0.5, '0-3人': 0.3}
    },
    memberExperience: {score: 10.32, type: 'match', conds: {'3年以下': 0.3, '3-5年': 0.5, '5-10年': 0.8, '10年以上': 1}},
    leadExperience: {score: 6.72, type: 'match', conds: {'3年以下': 0.3, '3-5年': 0.5, '5-10年': 0.8, '10年以上': 1}},
    accountantStatus: {score: 3.71, type: 'match', conds: {"全职": 1, "兼职": 0.5, "无": 0}},
//获取weibo,wechat,website项目不为空数量
    // info_platform : { 'score' : 2.52, 'type' : 'range', 'except' : '暂无', 'conds' : { 1 : 0.5, 2 : 0.8, 3 : 1 } },
    // orgRules : { score : 3.16, type : 'range', except : '以上都没有', conds :  {0: 0, 1 : 0.1, 2 : 0.2, 3 : 0.4, 4: 0.5, 5: 0.8, 6: 0.9, 7: 1.0 } },
    hasBoard : { score : 4.09, type : 'match', conds : { 0 : 0, 1 : 1 } },
    // has_plan : { score : 5.30, type : 'match', conds : { 0 : 0, 1 : 1 } },
    // has_report : { score : 4.09, type : 'match', conds : { 0 : 0, 1 : 1, } },
    projectScale : { score : 17.92, type : 'match', conds : { '20万以下' : 0, '20万-50万' : 0.5, '50万-100万' : 0.8, '100万及以上' : 1.0 } },
    participantScale: {
        score: 4.70,
        type: 'match',
        conds: {'500人以下': 0.2, '501-2000人': 0.5, '2001-5000人': 0.6, '5001-10000人': 0.8, '10000人以上': 1.0}
    },
    serviceArea: {
        score: 4.70,
        type: 'match',
        conds: {'组织所在的社区': 0.6, '组织所在的城市': 0.7, '组织所在的省份': 0.8, '涵盖几个省份': 0.9, '全国范围都有': 1.0}
    },
    mediaReport: {
        score: 5.29,
        type: 'match',
        conds: {'100次以上': 1, '50-100次': 0.8, '20-50次': 0.6, '5-20次': 0.4, '5次以下': 0.2, '0': 0}
    },
    fundInfo : {
        score : 7.41,
        type : 'function',
        func : function (value)  {
            if (value.indexOf('未获得资助') >= 0) {
                return 0;
            }
            const count = value.length;
            if (count >= 3) return 1;
            if (value.indexOf('企业') >= 0) return 0.8;
            return 0.6;
        }
    },
    hasReward : { score : 4.52, type : 'match', conds : { 1 : 1, 0 : 0 } },
    govLevel : { score : 4.38, type : 'match', conds : { '5A' : 1, '4A' : 0.9, '3A' : 0.8, '2A' : 0.7, 'A' : 0.6, '0' : 0 } }
};

function calcScore(data) {
    let total = Object.keys(data).reduce((sum, key) => {
        let rule = scoreRules[key];
        if (!rule) return sum;

        let ratio = 0, score = 0;
        switch (rule.type) {
            case 'match':
                ratio = rule.conds[data[key]];
                if(!ratio) ratio = 0;
                score = ratio * rule.score;
                break;
            case 'range':
                if (rule.except && key.indexOf(rule.except) >= 0) break;
                if(rule.preProcess) {
                    key = rule.preProcess(data[key]);
                }
                for (let rightValue of Object.keys(rule.conds)) {
                    if (rightValue > key) {
                        score = rule.score * rule.conds['' + rightValue];
                        break;
                    }
                }
                break;
            case 'function':
                score = rule.score * rule.func(data[key]);
                break;
        }
        return sum + score;
    }, 0);

    total += 35;
    if (total >= 85) return 'A+';
    if (total >= 80) return 'A';
    if (total >= 75) return 'A-';
    if (total >= 65) return 'B+';
    if (total >= 60) return 'B';
    return 'B-';
}

async function saveSurvey(ctx, next) {
    let data = ctx.request.body;
    console.log(ctx.request);
    data.rating = calcScore(data)
    console.log(JSON.stringify(data));
    let survey = await model.Survey.create(data);
    ctx.redirect('/survey.html?id=' + survey.id);
}

async function updateSurvey(ctx, next) {
    let data = ctx.request.body;
    console.log(data);
    await model.Survey.update(data, {
        where: {
            id: data.id
        },
    });
    let survey = await model.Survey.findOne({
        where: {id: data.id},
        attributes: ['id', 'orgName']
    })
    ctx.redirect('/result.html?orgName=' + encodeURIComponent(survey ? survey.orgName : ''));
}

function initRouters() {
    router.get('/api/queryServerTime', queryServerTime);
    router.get('/api/querySuggestions', querySuggestions);
    router.get('/api/queryOrgInfo', queryOrgInfo);
    router.post('/api/saveSurvey', saveSurvey);
    router.post('/api/updateSurvey', updateSurvey);
}

function main() {
    const app = new Koa();
    initModel();
    initRouters();

    app.use(bodyParser({arrayLimit: 50}));
    app.use(router.routes());

    app.listen(3000);
}

main();
