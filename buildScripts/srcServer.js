import express from 'express'
import path from 'path'
//Open a file or url in the user's preferred application.
//var open = require("open");
// open("http://www.google.com");
import open from 'open'
import webpack from 'webpack'
import config from '../webpack.config.dev'
import devMiddleware from 'webpack-dev-middleware'

/* eslint-disable no-console */

const port = 3998
const app = express()
const compiler = webpack(config)

app.use(devMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
    //1. webpack-dev-middleware 配置项里的 publicPath 要与 webpack.config 里的 output.publicPath 保持一致（并且只能是相对路径），不然会出现问题；
    //2. 使用 webpack-dev-middleware 的时候，其实可以完全无视 webpack.config 里的 output.path，甚至不写也可以，因为走的纯内存，output.publicPath 才是
    //实际的 controller；
    //3. publicPath 配置的相对路径，实际是相对于 html 文件的访问路径。
    //http://www.cnblogs.com/vajoy/p/7000522.html
}))

app.get('/', function (req, res) {
    // path.join([path1][, path2][, ...])
    // 用于连接路径。该方法的主要用途在于，会正确使用当前系统的路径分隔符，Unix系统是"/"，Windows系统是"\"。
    // __dirname 表示当前目录（'buildScrits'）
    var htmlIndex = path.join(__dirname, '../src/index.html')
    res.sendFile(htmlIndex)
})

// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, '../src/index.html'));
// })

app.listen(port, function (err) {
    if (err) {
        console.log(err)
    } else {
        open('http://localhost:' + port)
    }
})


// 使用 localtunel 分享你正在进行中的项目
// $ npm install -g localtunnel
// $ lt --subdomain expresshello --port 3998
// your url is: https://expresshello.localtunnel.me
// 取消分享——在命令行里 Ctrl C

// localtunnel 结合 Browsersync 开发
