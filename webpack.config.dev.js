import path from 'path'

export default {
    //默认的上下文关系为当前目录，但是推荐在配置中传递一个值。这使得你的配置独立于 CWD(current working directory - 当前执行路径)。
    //context 有什么实际作用？官方文档的解释是使得你的配置独立于工程目录 「This makes your configuration independent from CWD (current working directory)」。
    // 怎么理解？举个例子，在分离开发生产配置文件时候，一般把 z.config 放到 build 文件夹下，此时 entry 却不用考虑相对于 build 目录
    // 来配置，仍然要相对于 context 来配置，这也就是所谓的独立于工程目录。
    //context: path.resolve(__dirname, "app")
    debug: true,
    noInfo: false,
    devtool: 'inline-source-map',
    entry: [
        path.resolve(__dirname, 'src/index')
    ],
    output: {
        path: path.resolve(__dirname, 'src'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [],
    module: {
        loaders: [
            {test: /\.js$/, exclude: /node_modules/, loaders: ['babel']},
            {test: /\.css$/, loaders: ['style','css']}
        ]
    }
}
