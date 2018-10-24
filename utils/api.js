//域名地址
var host = '10.1.132.57';
//接口授权码
var authCode = '11112222';
//接口访问类型
var clientType = 'wsc';

/**接口api*/
//授权获取微信用户信息
const oauthUrl = host+'/wcsp/oauth';
function getOauthUrl(){
  return oauthUrl;
}



/**对外暴露的常量函数 */
module.exports.getOauthUrl = getOauthUrl;