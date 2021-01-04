let envVersion = __wxConfig.envVersion;
let miniVersion_zw = '';
let baseUrl = '';
let URL = '';
console.log('小程序版本' + envVersion)
if (envVersion == 'develop') {
  miniVersion_zw = '开发版';
  baseUrl = 'http://xxptest.xianxiaoyemao.com/api';
  URL = 'http://xxptest.xianxiaoyemao.com/';
} else if (envVersion == 'trial') {
  miniVersion_zw = '体验版';
  baseUrl = 'https://mxxp.xianxiaoyemao.com/';
  URL = 'https://www.xianxiaoyemao.com/';
} else if (envVersion == 'release') {
  miniVersion_zw = '正式版';
  baseUrl = 'https://mxxp.xianxiaoyemao.com/';
  URL = 'https://www.xianxiaoyemao.com/';
} else {
    miniVersion_zw = '未识别版本';
}

export default {
  baseUrl,
  URL,
  miniVersion_zw
}
