const e=JSON.parse('{"key":"v-9af0e3e8","path":"/zh/fontend/fontend-pro/Promise.html","title":"Promise","lang":"zh-CN","frontmatter":{"title":"Promise","icon":"markdown","category":["前端"],"tag":["Js","ES6"],"description":"\\"\\" Promise是什么 抽象表达式 Promise是一门新的技术 Promise是JS中进行异步编程的新的解决方案，旧的是用回调函数 具体表达 从语法说：Promise是一个构造函数 从功能说：Promise用来封装一个异步操作，并可以获取成功/失败的值 promise的状态 pending 变成 resolved pending 变成 rejected Promise对象的值 PromiseResult：保存对象成功或失败的结果 Promise.then和Promise.catch then可以处理成功和失败的结果 catch只能处理失败的结果 let p = new Promise(); p.catch(reason=&gt;{})","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/zh/fontend/fontend-pro/Promise.html"}],["meta",{"property":"og:site_name","content":"笔记"}],["meta",{"property":"og:title","content":"Promise"}],["meta",{"property":"og:description","content":"\\"\\" Promise是什么 抽象表达式 Promise是一门新的技术 Promise是JS中进行异步编程的新的解决方案，旧的是用回调函数 具体表达 从语法说：Promise是一个构造函数 从功能说：Promise用来封装一个异步操作，并可以获取成功/失败的值 promise的状态 pending 变成 resolved pending 变成 rejected Promise对象的值 PromiseResult：保存对象成功或失败的结果 Promise.then和Promise.catch then可以处理成功和失败的结果 catch只能处理失败的结果 let p = new Promise(); p.catch(reason=&gt;{})"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-11T15:21:15.000Z"}],["meta",{"property":"article:tag","content":"Js"}],["meta",{"property":"article:tag","content":"ES6"}],["meta",{"property":"article:modified_time","content":"2023-02-11T15:21:15.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Promise\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-11T15:21:15.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"Promise是什么","slug":"promise是什么","link":"#promise是什么","children":[]},{"level":2,"title":"为什么使用","slug":"为什么使用","link":"#为什么使用","children":[]},{"level":2,"title":"Promise基本使用","slug":"promise基本使用","link":"#promise基本使用","children":[]},{"level":2,"title":"Promise-fs模块练习","slug":"promise-fs模块练习","link":"#promise-fs模块练习","children":[]},{"level":2,"title":"Promise-ajax练习","slug":"promise-ajax练习","link":"#promise-ajax练习","children":[]},{"level":2,"title":"使用Promise封装函数","slug":"使用promise封装函数","link":"#使用promise封装函数","children":[]},{"level":2,"title":"util.promisify","slug":"util-promisify","link":"#util-promisify","children":[]},{"level":2,"title":"Promise方法","slug":"promise方法","link":"#promise方法","children":[]},{"level":2,"title":"p.then()","slug":"p-then","link":"#p-then","children":[]},{"level":2,"title":"Promise异常穿透","slug":"promise异常穿透","link":"#promise异常穿透","children":[]},{"level":2,"title":"中断Promise链","slug":"中断promise链","link":"#中断promise链","children":[]},{"level":2,"title":"Promise手写","slug":"promise手写","link":"#promise手写","children":[]},{"level":2,"title":"async与await","slug":"async与await","link":"#async与await","children":[{"level":3,"title":"1.async函数","slug":"_1-async函数","link":"#_1-async函数","children":[]},{"level":3,"title":"2. await 表达式","slug":"_2-await-表达式","link":"#_2-await-表达式","children":[]},{"level":3,"title":"3.async和await","slug":"_3-async和await","link":"#_3-async和await","children":[]},{"level":3,"title":"4.async+await+fs读取文件","slug":"_4-async-await-fs读取文件","link":"#_4-async-await-fs读取文件","children":[]}]}],"git":{"createdTime":1676128875000,"updatedTime":1676128875000,"contributors":[{"name":"EricKiku","email":"2966678301@qq.com","commits":1}]},"readingTime":{"minutes":6.46,"words":1938},"filePathRelative":"zh/fontend/fontend-pro/Promise.md","localizedDate":"2023年2月11日","excerpt":"<h1> \\"\\"</h1>\\n<h2> Promise是什么</h2>\\n<ol>\\n<li>\\n<p>抽象表达式</p>\\n<ol>\\n<li>Promise是一门新的技术</li>\\n<li>Promise是JS中进行异步编程的新的解决方案，旧的是用回调函数</li>\\n</ol>\\n</li>\\n<li>\\n<p>具体表达</p>\\n<ol>\\n<li>从语法说：Promise是一个构造函数</li>\\n<li>从功能说：Promise用来封装一个异步操作，并可以获取成功/失败的值</li>\\n</ol>\\n</li>\\n<li>\\n<p>promise的状态</p>\\n<ol>\\n<li><code>pending </code>变成 <code>resolved</code></li>\\n<li><code>pending</code> 变成 <code>rejected</code></li>\\n</ol>\\n</li>\\n<li>\\n<p>Promise对象的值</p>\\n<ol>\\n<li><code>PromiseResult</code>：保存对象成功或失败的结果</li>\\n</ol>\\n</li>\\n<li>\\n<p>Promise.then和Promise.catch</p>\\n<ol>\\n<li>\\n<p><code>then</code>可以处理成功和失败的结果</p>\\n</li>\\n<li>\\n<p><code>catch</code>只能处理失败的结果</p>\\n<ol>\\n<li>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token keyword\\">let</span> p <span class=\\"token operator\\">=</span> <span class=\\"token keyword\\">new</span> <span class=\\"token class-name\\">Promise</span><span class=\\"token punctuation\\">(</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n\\np<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">catch</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">reason</span><span class=\\"token operator\\">=&gt;</span><span class=\\"token punctuation\\">{</span><span class=\\"token punctuation\\">}</span><span class=\\"token punctuation\\">)</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div></li>\\n<li></li>\\n</ol>\\n</li>\\n</ol>\\n</li>\\n</ol>","autoDesc":true}');export{e as data};