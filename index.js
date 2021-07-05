const server = require("./server")//express服务器模块
const mockMiddleware = require("./middleware") //导入中间件
let app = server()
app.use(mockMiddleware)
// app.get('/target-direction/index-database', (req, res) => {})
