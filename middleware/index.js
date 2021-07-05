const Mock = require("mockjs");
const mockJson = require("../mock-json");

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

function mockMiddleware(req, res, next) {
  // console.log('req',req.query,req.path);
  const { type, paramnum, optionMock } = req.query; //请求方法 1，mock 2，json 请求是否是数组 >1 是数组，等于1是单条数据
  const path = req.path;
  let result = {};
  if (type == 1) {
    result.data = Mock.mock(JSON.parse(optionMock));
    res.send(result);
  } else {
    mockJsonfn(res, paramnum, path);
  }
  next();
}
module.exports = mockMiddleware;
