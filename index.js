const server = require("./server")//express服务器模块
const mockMiddleware = require("./middleware") //导入中间件
const bodyParser  = require ('body-parser')
const mongodb_init = require("./mongodb")
const cors = require("cors")
var url = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
let dbname = "local"
let mongo_database = mongodb_init(url,dbname) //连接上的数据库
let app = server()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.text())
app.use(bodyParser.raw())
app.use(bodyParser.urlencoded())
app.use(mockMiddleware(mongo_database)) //使用中间件，并把数据库实例对象传到中间件
app.get('*', (req, res) => res.send('Hello World哈哈哈哈'))
