const e=JSON.parse(`{"key":"v-e430024c","path":"/zh/fontend/Framework/Vue2/Vue.html","title":"Vue2(上)","lang":"zh-CN","frontmatter":{"title":"Vue2(上)","icon":"Vue","category":["前端","框架"],"tag":["Vue"],"description":"\\"\\" ES5和ES6 \` ## const所定义的对象，不可以被重新定义，但是可以改变对象中的属性 ES6对象字面量增强写法 ES5: const name='eric'; const age=18; const height=1.8 const user = { \\tname:name, age:age, height:height } ES6: const name='eric'; const age=18; const height=1.8 const user = { \\tname, age, height }","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/zh/fontend/Framework/Vue2/Vue.html"}],["meta",{"property":"og:site_name","content":"博客演示"}],["meta",{"property":"og:title","content":"Vue2(上)"}],["meta",{"property":"og:description","content":"\\"\\" ES5和ES6 \` ## const所定义的对象，不可以被重新定义，但是可以改变对象中的属性 ES6对象字面量增强写法 ES5: const name='eric'; const age=18; const height=1.8 const user = { \\tname:name, age:age, height:height } ES6: const name='eric'; const age=18; const height=1.8 const user = { \\tname, age, height }"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-12T06:26:17.000Z"}],["meta",{"property":"article:tag","content":"Vue"}],["meta",{"property":"article:modified_time","content":"2023-02-12T06:26:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"Vue2(上)\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-12T06:26:17.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"ES6对象字面量增强写法","slug":"es6对象字面量增强写法","link":"#es6对象字面量增强写法","children":[]},{"level":2,"title":"Vuejs安装","slug":"vuejs安装","link":"#vuejs安装","children":[]},{"level":2,"title":"一、基本语法","slug":"一、基本语法","link":"#一、基本语法","children":[]},{"level":2,"title":"二、基本表达式","slug":"二、基本表达式","link":"#二、基本表达式","children":[]},{"level":2,"title":"v-once","slug":"v-once","link":"#v-once","children":[]},{"level":2,"title":"v-html","slug":"v-html","link":"#v-html","children":[]},{"level":2,"title":"v-text","slug":"v-text","link":"#v-text","children":[]},{"level":2,"title":"v-pre","slug":"v-pre","link":"#v-pre","children":[]},{"level":2,"title":"v-cloak","slug":"v-cloak","link":"#v-cloak","children":[]},{"level":2,"title":"v-bind","slug":"v-bind","link":"#v-bind","children":[{"level":3,"title":"v-bing动态绑定class属性","slug":"v-bing动态绑定class属性","link":"#v-bing动态绑定class属性","children":[]},{"level":3,"title":"案例：点击列表某一项变色","slug":"案例-点击列表某一项变色","link":"#案例-点击列表某一项变色","children":[]},{"level":3,"title":"v-bind动态绑定style属性","slug":"v-bind动态绑定style属性","link":"#v-bind动态绑定style属性","children":[]}]},{"level":2,"title":"1.基本使用","slug":"_1-基本使用","link":"#_1-基本使用","children":[]},{"level":2,"title":"2.复杂使用","slug":"_2-复杂使用","link":"#_2-复杂使用","children":[]},{"level":2,"title":"3.计算属性的settre和getter","slug":"_3-计算属性的settre和getter","link":"#_3-计算属性的settre和getter","children":[]},{"level":2,"title":"v-on","slug":"v-on","link":"#v-on","children":[]},{"level":2,"title":"v-on的修饰符","slug":"v-on的修饰符","link":"#v-on的修饰符","children":[]},{"level":2,"title":"v-if、v-else-if、v-else","slug":"v-if、v-else-if、v-else","link":"#v-if、v-else-if、v-else","children":[]},{"level":2,"title":"v-show","slug":"v-show","link":"#v-show","children":[]},{"level":2,"title":"v-for循环遍历对象","slug":"v-for循环遍历对象","link":"#v-for循环遍历对象","children":[]},{"level":2,"title":"组件的key属性","slug":"组件的key属性","link":"#组件的key属性","children":[]},{"level":2,"title":"哪些数组的方法是响应式的","slug":"哪些数组的方法是响应式的","link":"#哪些数组的方法是响应式的","children":[]},{"level":2,"title":"v-model:radio","slug":"v-model-radio","link":"#v-model-radio","children":[]},{"level":2,"title":"v-model: checkbox","slug":"v-model-checkbox","link":"#v-model-checkbox","children":[]},{"level":2,"title":"v-model结合select","slug":"v-model结合select","link":"#v-model结合select","children":[]},{"level":2,"title":"v-model的修饰符","slug":"v-model的修饰符","link":"#v-model的修饰符","children":[{"level":3,"title":".lazy","slug":"lazy","link":"#lazy","children":[]},{"level":3,"title":".number","slug":"number","link":"#number","children":[]},{"level":3,"title":".trim","slug":"trim","link":"#trim","children":[]}]},{"level":2,"title":"注册组件的基本步骤","slug":"注册组件的基本步骤","link":"#注册组件的基本步骤","children":[]},{"level":2,"title":"全局组件和局部组件","slug":"全局组件和局部组件","link":"#全局组件和局部组件","children":[]},{"level":2,"title":"组件的语法糖格式","slug":"组件的语法糖格式","link":"#组件的语法糖格式","children":[]},{"level":2,"title":"组件和模板分离","slug":"组件和模板分离","link":"#组件和模板分离","children":[]},{"level":2,"title":"组件中数据存放问题","slug":"组件中数据存放问题","link":"#组件中数据存放问题","children":[]},{"level":2,"title":"父子组件的通信","slug":"父子组件的通信","link":"#父子组件的通信","children":[{"level":3,"title":"父组件向子组件传输数据","slug":"父组件向子组件传输数据","link":"#父组件向子组件传输数据","children":[]},{"level":3,"title":"子组件向父组件传输数据","slug":"子组件向父组件传输数据","link":"#子组件向父组件传输数据","children":[]},{"level":3,"title":"父组件直接访问子组件中的属性或者方法-$refs","slug":"父组件直接访问子组件中的属性或者方法-refs","link":"#父组件直接访问子组件中的属性或者方法-refs","children":[]},{"level":3,"title":"子访问父(未学，可不学)","slug":"子访问父-未学-可不学","link":"#子访问父-未学-可不学","children":[]},{"level":3,"title":"插槽slot","slug":"插槽slot","link":"#插槽slot","children":[]},{"level":3,"title":"具名插槽slot","slug":"具名插槽slot","link":"#具名插槽slot","children":[]}]},{"level":2,"title":"webpack安装","slug":"webpack安装","link":"#webpack安装","children":[]},{"level":2,"title":"webpack起步","slug":"webpack起步","link":"#webpack起步","children":[]},{"level":2,"title":"webpack配置文件(78集未听)","slug":"webpack配置文件-78集未听","link":"#webpack配置文件-78集未听","children":[]},{"level":2,"title":"loader","slug":"loader","link":"#loader","children":[]},{"level":2,"title":"安装Vue cli","slug":"安装vue-cli","link":"#安装vue-cli","children":[]},{"level":2,"title":"Vue cli2","slug":"vue-cli2","link":"#vue-cli2","children":[]},{"level":2,"title":"Vue cli3","slug":"vue-cli3","link":"#vue-cli3","children":[]},{"level":2,"title":"路由配置方式","slug":"路由配置方式","link":"#路由配置方式","children":[]},{"level":2,"title":"使用vue-router的步骤","slug":"使用vue-router的步骤","link":"#使用vue-router的步骤","children":[{"level":3,"title":"router-link","slug":"router-link","link":"#router-link","children":[]},{"level":3,"title":"button方式","slug":"button方式","link":"#button方式","children":[]}]},{"level":2,"title":"动态路由，并且传参","slug":"动态路由-并且传参","link":"#动态路由-并且传参","children":[{"level":3,"title":"使用params的类型","slug":"使用params的类型","link":"#使用params的类型","children":[]},{"level":3,"title":"使用query的类型","slug":"使用query的类型","link":"#使用query的类型","children":[]}]},{"level":2,"title":"路由懒加载","slug":"路由懒加载","link":"#路由懒加载","children":[]},{"level":2,"title":"路由的嵌套使用","slug":"路由的嵌套使用","link":"#路由的嵌套使用","children":[]},{"level":2,"title":"全局导航守卫","slug":"全局导航守卫","link":"#全局导航守卫","children":[]},{"level":2,"title":"keep-alive","slug":"keep-alive","link":"#keep-alive","children":[]},{"level":2,"title":"通过mutations来操作state中的值","slug":"通过mutations来操作state中的值","link":"#通过mutations来操作state中的值","children":[]},{"level":2,"title":"Vuex核心概念","slug":"vuex核心概念","link":"#vuex核心概念","children":[{"level":3,"title":"State单一状态树","slug":"state单一状态树","link":"#state单一状态树","children":[]},{"level":3,"title":"Getters","slug":"getters","link":"#getters","children":[]},{"level":3,"title":"Mutations状态更新","slug":"mutations状态更新","link":"#mutations状态更新","children":[]},{"level":3,"title":"Action","slug":"action","link":"#action","children":[]},{"level":3,"title":"Modules","slug":"modules","link":"#modules","children":[]}]},{"level":2,"title":"Vuex的目录组织结构","slug":"vuex的目录组织结构","link":"#vuex的目录组织结构","children":[]}],"git":{"createdTime":1676128875000,"updatedTime":1676183177000,"contributors":[{"name":"EricKiku","email":"2966678301@qq.com","commits":3}]},"readingTime":{"minutes":30.1,"words":9031},"filePathRelative":"zh/fontend/Framework/Vue2/Vue.md","localizedDate":"2023年2月11日","excerpt":"<h1> \\"\\"</h1>\\n<h1> ES5和ES6</h1>\\n<blockquote>\\n<p>\` ## const所定义的对象，不可以被重新定义，但是可以改变对象中的属性</p>\\n</blockquote>\\n<h2> ES6对象字面量增强写法</h2>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token constant\\">ES5</span><span class=\\"token operator\\">:</span>\\n<span class=\\"token keyword\\">const</span> name<span class=\\"token operator\\">=</span><span class=\\"token string\\">'eric'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> age<span class=\\"token operator\\">=</span><span class=\\"token number\\">18</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> height<span class=\\"token operator\\">=</span><span class=\\"token number\\">1.8</span>\\n\\n<span class=\\"token keyword\\">const</span> user <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n\\t<span class=\\"token literal-property property\\">name</span><span class=\\"token operator\\">:</span>name<span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token literal-property property\\">age</span><span class=\\"token operator\\">:</span>age<span class=\\"token punctuation\\">,</span>\\n    <span class=\\"token literal-property property\\">height</span><span class=\\"token operator\\">:</span>height\\n<span class=\\"token punctuation\\">}</span>\\n\\n\\n<span class=\\"token constant\\">ES6</span><span class=\\"token operator\\">:</span>\\n<span class=\\"token keyword\\">const</span> name<span class=\\"token operator\\">=</span><span class=\\"token string\\">'eric'</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> age<span class=\\"token operator\\">=</span><span class=\\"token number\\">18</span><span class=\\"token punctuation\\">;</span>\\n<span class=\\"token keyword\\">const</span> height<span class=\\"token operator\\">=</span><span class=\\"token number\\">1.8</span>\\n\\n<span class=\\"token keyword\\">const</span> user <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">{</span>\\n\\tname<span class=\\"token punctuation\\">,</span>\\n    age<span class=\\"token punctuation\\">,</span>\\n    height\\n<span class=\\"token punctuation\\">}</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}`);export{e as data};
