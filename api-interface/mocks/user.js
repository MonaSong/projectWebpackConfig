/**
 * user page - user info
 *
 * @url /user?uid=233
 *
 * GET: Request method and parameter
 *   uid This is the requested userID
 *
 * Here you can write a detailed description
 * of the parameters of the information.
 */

module.exports = function (req) {
  var uid = req.query.uid;

  if (!uid) {
    return {
      code: -1,
      msg: 'no uid'
    };
  }

  return {
    "code": 0,
    "result|3": [
      {
        "uid|+1": 1,
        "name": "@cname",
        "email": "@email",
        "img": "@image",
        "address": "上海市普陀区金沙江路 15弄",
        "date": "@date",
      }
    ]
  };
};