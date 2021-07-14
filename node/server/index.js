function createServer(port){

const express = require("express")

const ports = port || 9999;

const server = express()

//返回数据
// 

server.listen(ports, () => console.log(`Example app listening on port port!`+ports))

return server
}
module.exports = createServer
