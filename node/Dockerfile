# 使用镜像环境
FROM node

# 创建工作目录 -p是递归创建目录
RUN mkdir -p /usr/node-mock
WORKDIR /usr/node-mock

# RUN/COPY 是分层的，package.json 提前，只要没修改，就不会重新安装包
COPY package.json /usr/node-mock/package.json
RUN cd /usr/node-mock/
RUN npm i

# 把当前目录下的所有文件拷贝到 Image 的 /usr/src/nodejs/ 目录下
COPY . /usr/node-mock/

EXPOSE 9999
CMD ["node","index.js"]