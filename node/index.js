const server = require("./server")//express服务器模块
const mockMiddleware = require("./middleware") //导入中间件
const bodyParser  = require ('body-parser')
const cors = require("cors")
const  { createProxyMiddleware }  =  require ( 'http-proxy-middleware' ) ; 
let app = server()
app.use(cors())
// app.use('/api', createProxyMiddleware({ target: 'http://localhost:9999', changeOrigin: true }))
app.use(bodyParser.urlencoded({extended:false}))
app.use(mockMiddleware()) //使用中间件，并把数据库实例对象传到中间件
// app.get('/hellonode', (req, res) => res.send('Hello World哈哈哈哈'))
