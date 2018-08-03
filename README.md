#一个基于yeoman的generator-generator
##主要目的是减少因开发简单活动页而导致的时间浪费，尤其是没有任何交互的活动页

##
templates是项目主要生成的模板的内容
index.js是脚手架的逻辑
## 安装依赖项
```
npm i 
```
##安装yoman
```
npm install -g yo
```
##安装脚手架
```
npm install -g generator-reactfirst
```
## 运行
```
yo reactfirst
```
假如出现问题
1 请检查所需要的依赖项是否安装成功
2 检查是否全局安装generator-reactfirst(尝试npm link)
3 yo doctor检查是否yo正常