//域名地址
var host = "http://10.1.132.57:8080";
//接口授权码
var authCode = "11112222";
//接口访问类型
var clientType = "wsc";

/**接口api*/
//授权获取微信用户信息
const oauthUrl = host+"/wcsp/oauth";
function getOauthUrl(){
  return oauthUrl;
}

//花卉api
const flowerUrl = host + "/rest/icr/detect?clientType=" + clientType + '&apiType=flower&authCode=' + authCode;
function getFlowerUrl() {
  return flowerUrl;
}
//植物识别url
const plantUrl = host + '/rest/icr/detect?clientType=' + clientType + '&apiType=plant&authCode=' + authCode;
function getPlantUrl(){
    return plantUrl;
}

/**对外暴露的常量函数 */
module.exports.getOauthUrl = getOauthUrl;
module.exports.getFlowerUrl = getFlowerUrl;
module.exports.getPlantUrl = getPlantUrl;