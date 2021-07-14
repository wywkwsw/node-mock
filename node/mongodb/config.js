const init = require("./index.js");

/**
 * @function createCollection 创建一个新的集合
 * @param  {string} name 数据库集合新建名称
 */
function createCollection(name,db) {
  return db.createCollection(name).then();
}

/**
 * @function dropCollection 删除一个函数集合
 * @param  {string} name
 */
function dropCollection(name,db) {
  return db.dropCollection(name);
}

/**
 * @function connectCollection 连接一个函数集合
 * @param  {string} name
 */
function connectCollection(name,db) {
  return db.collection(name); //返回一个集合
}

/**
 * @function listCollections  查找改数据库中集合list
 * @param  {object} db 数据库对象
 * @param  {JSON} filter 文档数据
 */
function listCollections(name,db) {
  return db.listCollections().toArray(); //返回一个集合
}

/**
 * @function addDocuments  向集合中插入一条文档
 * @param  {object} ct 数据库对象
 * @param  {JSON} value 文档数据
 */
function addDocuments(ct, value,find) {
  return ct.insertOne(value);
}

/**
 * @function deleteDocuments  向集合中插入一条文档
 * @param  {object} ct 数据库对象
 * @param  {JSON} value 文档数据
 */
function deleteDocuments(ct, value,find) {
  return ct.deleteOne(filter, options, callback);
  ct.deleteMany(filter, options, callback);
}

/**
 * @function updateDocuments  向集合中更新文档
 * @param  {object} ct 数据库对象
 * @param  {JSON} value 文档数据
 */
function updateDocuments(ct, value,find) {
  return ct.updateOne(filter, options, callback);
  ct.updateMany(filter, options, callback);
}

/**
 * @function findDocuments  向集合中查找文档
 * @param  {object} ct 数据库对象
 * @param  {JSON} value 文档数据
 */
function findDocuments(ct, value,filter) {
  return ct.find(filter).toArray();
}

/**
 * @param  {object} db 数据库实例
 * @param  {string} name  数据库名称
 * @param  {number} type 操作类型
 */
function mongodbOperation(name, type) {
  let url = "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false";
  let dbname = "local";
  let db = init(url, dbname); //连接上的数据库
  //数据库操作
  // 1.增加集合 2.删除集合 3.连接集合
  let operationType = {
    1: createCollection,
    2: dropCollection,
    3: connectCollection,
    4: listCollections
  };
  return operationType[type](name,db); //返回一个ct实例对象，异步需要await接收
}

/**
 * @param  {object} ct 集合实例
 * @param  {object} value  操作数据
 * @param  {number} type 操作类型
 */
function collectionOperation(ct, value,find={}, type) {
  // console.log('ct, value,find, type',ct, value,find, type);
  
  //集合操作
  // 1.增加文档 2.删除文档 3.更新文档 4.查询文档
  let operationType = {
    1: addDocuments,
    2: deleteDocuments,
    3: updateDocuments,
    4: findDocuments,
  };
  return operationType[type](ct, value,find);
}

module.exports = { mongodbOperation, collectionOperation };
