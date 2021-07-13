const Mock = require("mockjs");
const mockJson = require("../mock-json");
const Request = require("../utils/axios");
const { mongodbOperation, collectionOperation } = require("../mongodb/config");
//调取服务器接口
/**
 * @param  getApi
 * @param  {option.url} url
 * @param  {get} method
 * @param  {option.data} params
 */
function getApi(option) {
  return new Request({
    url: option.url, //"https://api.btc126.com/alt.php",
    method: "get",
    params: option.data || "",
  });
}
function postApi(option) {
  return new Request({
    url: option.url, //"https://api.btc126.com/alt.php",
    method: "post",
    data: option.data,
  });
}
//是否存在name名字的ct集合 true存在 false不存在
async function isExistenceCt(name, cts) {
  let ctList = await mongodbOperation(name, 4);
  let unindex = ctList.findIndex((item) => item.name == name);
  return unindex > -1 ? true : false;
}

//返回数据
async function searchCt(res, path, query) {
  //筛选条件
  let { search } = query;
  let isundefined = await isExistenceCt(path);
  if (isundefined) {
    //返回集合实例
    let collection = await mongodbOperation(path, 3);
    let result = await collectionOperation(collection,(value = null),query,4);
    res.send(result);
  } else {
    res.send("此mock接口不存在，请创建mock接口");
  }
}
/**
 * @param  mockMiddleware  中间件
 * @param {object} option 实例化的db对象
 */
function mockMiddleware() {
  /**
   * @function mockJsonfn 职责链模式方法
   * @param  {object} res 查找对象
   * @param  {number} paramnum 数据对象需要的数据大小
   * @param {string} path  接口路径
   */
  function mockJsonfn(res, paramnum, path) {
    const chain = function (fn) {
      this.fn = fn;
      this.sucessor = null;
    };

    chain.prototype.setNext = function (sucessor) {
      this.sucessor = sucessor;
    };

    chain.prototype.init = function () {
      const result = this.fn.apply(this, arguments);
      if (result === "nextSuccess") {
        this.sucessor.init.apply(this.sucessor, arguments);
      }
    };
    const order0 = function (paramnum, path, mockJson) {
      if (mockJson[path]) {
        return "nextSuccess";
      } else {
        res.send("该JSON文件中尚未配置");
      }
    };
    const order1 = function (paramnum, path, mockJson) {
      if (paramnum > 1) {
        res.send(mockJson[path]);
      } else {
        res.send(mockJson[path][0]);
      }
    };
    const order0New = new chain(order0);
    const order1New = new chain(order1);
    order0New.setNext(order1New);
    order0New.init(paramnum, path, mockJson);
  }

  return function _mockMiddleware(req, res, next) {
    const { type, paramnum, optionMock } = req.query;
    const postBody = req.body;
    console.log("req.query", req.body);
    const path = req.path; //'/api/v1/sys/getDict'
    const apiMethods = req.method;

    async function run() {
      //默认先登录
      // await postApi({
      //   url: "/api/v1/sys/userLogin",
      //   data: { username: 1314, password: 123456 },
      // }).then((axiosres) => {
      //   // console.log("postApi",res)
      // });
      //判断浏览器调取方法类型
      if (apiMethods == "GET") {
        let getStateCode = await getApi({ url: path, data: req.query }) //req.query
          .then((axiosRes) => {
            return axiosRes.data;
          })
          .catch((err) => {
            return err.response ? err.response.status : "";
          });

        //判断服务器是否存在此接口
        if (getStateCode === 404) {
          //不存在此接口，查询mongodb里的mock数据
          await searchCt(res, path, req.query);
        } else {
          res.send(getStateCode);
        }
      } else {
        let postStateCode = await postApi({ url: path, data: postBody })
          .then((axiosRes) => {
            console.log("axiosRes", axiosRes);
            return axiosRes.data;
          })
          .catch((axiosErr) => {
            return axiosErr.response.status;
          });
        if (postStateCode === 404) {
          //不存在此接口，查询mongodb里的mock数据
        } else {
          res.send(postStateCode);
        }
      }
    }
    run();
  };
}

module.exports = mockMiddleware;
