let mysql = require("mysql");
const { dbConfig } = require("../config");
let pool = mysql.createPool(dbConfig);

let db = {};
// db.q('select..', [], function (err, data) {
//     if (err) {

//     }
//     console.log(data);
// })

db.q = function(sql, params, callback) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject(err);
        return;
      }
      connection.query(sql, params, function(error, results, fields) {
        console.log(`${sql} => ${params}`);
        connection.release();
        if (error) {
          reject(error);
          return;
        }
        resolve(results);
      });
    });
  });
};

module.exports = db;
