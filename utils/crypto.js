const crypto = require('crypto');

module.exports = {
  encrypt: async function(pwd) {
    let salt = crypto.randomBytes(16).toString('hex');   // 32位16进制随机盐值
    let hash = crypto.createHmac('sha256', salt);        // 创建hmac对象
    hash.update(pwd);          // 添加明文
    let r = hash.digest('base64');                  // 以base64形式生成密文
    return { salt, r }
  },

  decrypt: async function(pwd, salt) {
    let hash = crypto.createHmac('sha256', salt);
    hash.update(pwd);
    let r = hash.digest('base64');
    return r
  }
}