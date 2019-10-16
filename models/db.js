let mysql = require('mysql');
let pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'node_music'
});

let db = {};
// db.q('select..', [], function (err, data) {
//     if (err) {

//     }
//     console.log(data);
// })

db.q = function (sql, params, callback) {
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                callback(err, null);
                return;
            }
            connection.query(sql, params, function (error, results, fields) {
                console.log(`${sql} => ${params}`);
                connection.release();
                if (error) {
                    reject(eror);
                    return;
                }
                resolve(results);
            })
        })
    })
}

module.exports = db;