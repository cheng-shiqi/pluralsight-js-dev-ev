import { expect } from 'chai'
import fs from 'fs'
import jsdom from 'jsdom'

const { JSDOM } = jsdom
// const virtualConsole = new jsdom.VirtualConsole()

describe('test test', function() {
    // body...
    it('true 是不是等于 true', function() {
        expect(true).to.be.equal(true)
    })
})

describe('index.html', function() {
    // body...
    it('should be hello world', function(done) {
        const index = fs.readFileSync('./src/index.html', 'utf-8')

        // const dom = new JSDOM(`<!DOCTYPE html><p>Hello world</p>`)
        const dom = new JSDOM(index)
        // 如果只用到 JSDOM 的 window，可以这样写 const {window} = new JSDOM(index)
        const h1 = dom.window.document.querySelector('h1').firstChild
        const h1Content = h1.textContent

        expect(h1Content).to.be.equal('Hello World')
        done()
        //上面的代码有异步操作，所以需要在这里显示调用 done http://harttle.com/2016/07/12/async-test-with-chai-as-promised.html

        dom.window.close()
        //虚拟 dom 使用结束，释放其使用的内存
    })
})

//  jsdom 貌似不支持 element.children, element[0], innerHTML
