const app = require('./config/express');
const http = require('http').Server(app);

const port = process.env.PORT || 3000;
http.timeout = 0;
http.listen(port,function(){
    console.log("Servidor do Task Manager rodando na porta "+port);
});