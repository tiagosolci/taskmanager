const mysql = require('mysql');

function connectMySQL() {
  return mysql.createConnection({
    host:'127.0.0.1',
    user:'root',
    password: '',
    database:'task-manager'
  });
}

module.exports = function() {
  console.log('conectado DB');
	return connectMySQL;
};
