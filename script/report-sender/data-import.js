const xlsx = require('xlsx');

function xlsx2json(xlsxFile, sheetName) {
  const workbook = xlsx.readFile(xlsxFile);
  const sheet = workbook.Sheets[sheetName];
  return xlsx.utils.sheet_to_json(sheet);
};

const groups = {

}
function genColumnsInfo(header) {
  Object.entries(header).forEach(entry => console.log(entry));
}
let json = xlsx2json('./data/data.xlsx', 'Sheet2');

genColumnsInfo(json[0]);

console.log(json[1])

let columns = [
  {
    name: 'knowledgeAndInfoManagement',
    text: '知识管理和信息管理',
    columns: [
      {
        name: 'internalTraining',
        text: '举办组织内部培训（项目培训、财务培训等）',
      },
      {
        name: 'knowledgeSharing',
        text: '接受过外部互联网技术培训的员工在组织内做分享',
      },
      {
        name: 'feedbackViaInternet',
        text: '通过网络工具收听、收集公众对我们的评价（如百度新闻订阅等）',
      },
      {
        name: 'volunteerManagementSystem',
        text: '建立志愿者管理系统（如灵析、志多星、麦客CRM、今目标或定制开发等）',
      },
      {
        name: 'targetManagementSystem',
        text: '建立服务对象管理系统',
      },
      {
        name: 'donatorManagementSystem',
        text: '建立捐赠者管理系统',
      },
      {
        name: 'sharingOnCloud',
        text: '本组织在互联网上有分享公共资料的地方（如百度云盘等）',
      },
      {
        name: 'projectManagement',
        text: '使用项目管理工具进行项目管理（如Tower、钉钉等）'
      }
    ],
  },
  {
    name: 'trackingNGONews',
    text: '了解行业信息',
    columns: [
      {
        name: 'trackingBySearchEngin',
        text: '通过搜索引擎搜索行业信息',
      },
      {
        name: 'subscribingEBriefing',
        text: '订阅了同行的电子简报',
      },
      {
        name: 'followNGOWechatOfficialAccounts',
        text: '关注了其他公益组织的微信公众号',
      },
      {
        name: 'followNGOWeibos',
        text: '在微博上关注了公益组织',
      },
      {
        name: 'joinNGOWechatQQGroups',
        text: '加入了公益组织QQ群/微信群',
      },
      {
        name: 'visitNGOWebsite',
        text: '访问公益行业信息网站',
      },
      {
        name: '在线下跟公益同行交流信息',
        text: 'peerExchangeOffline'
      }
    ]
  }, 
  {
    name: 'credibilityOnInternet',
    text: '通过互联网提高透明度公信力',
    columns: [
      { name: 'manifestoOnInternet', text: '通过互联网公开了工作目标、使命宣言', },
      { name: ''}
    ]

  }
]