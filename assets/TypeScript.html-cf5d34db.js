import{_ as e,W as p,X as t,Y as n,Z as o,$ as l,a2 as s,G as c}from"./framework-61af4b36.js";const i={},r=s(`<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> &quot;&quot;</h1><h1 id="typescript是什么" tabindex="-1"><a class="header-anchor" href="#typescript是什么" aria-hidden="true">#</a> TypeScript是什么</h1><ul><li>以JS为基础构建的语言</li><li>一个JS的<code>超集</code></li><li>可以在任何支持JS的平台中执行</li><li>TS扩展了JS，并添加了类型</li><li><mark>TS不能被JS解析器直接执行，需要把TS代码编译为JS</mark></li></ul><h1 id="ts增加了什么" tabindex="-1"><a class="header-anchor" href="#ts增加了什么" aria-hidden="true">#</a> TS增加了什么</h1><ul><li>类型</li><li>支持ES的新特性，并添加了新特性</li><li>丰富的配置选项</li></ul><h1 id="ts使用" tabindex="-1"><a class="header-anchor" href="#ts使用" aria-hidden="true">#</a> TS使用</h1><h2 id="_1-ts开发环境" tabindex="-1"><a class="header-anchor" href="#_1-ts开发环境" aria-hidden="true">#</a> 1. TS开发环境</h2><p>使用npm全局安装ts</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm install -g typescript
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>安装完成后我们可以使用 <strong>tsc</strong> 命令来执行 TypeScript 的相关代码，以下是查看版本号：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tsc -v
Version 3.2.2
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-创建ts文件" tabindex="-1"><a class="header-anchor" href="#_2-创建ts文件" aria-hidden="true">#</a> 2. 创建TS文件</h2><p><code>ts_test.ts</code></p><p>要想运行，需要先转为JS文件：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tsc ts_test.ts
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>会生成一个同名的.JS文件</p><p>注：如果TS代码报错，可以初始化ts</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tsc --init
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h1 id="ts类型" tabindex="-1"><a class="header-anchor" href="#ts类型" aria-hidden="true">#</a> TS类型</h1><h2 id="_1-ts类型声明" tabindex="-1"><a class="header-anchor" href="#_1-ts类型声明" aria-hidden="true">#</a> 1. TS类型声明</h2><p>给变量声明：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//把a声明为数值类型，之后不能复制其他类型的值</span>
<span class="token keyword">let</span> a<span class="token operator">:</span> <span class="token builtin">number</span><span class="token punctuation">;</span>

a <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>	<span class="token comment">//不报错</span>

a<span class="token operator">=</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">;</span>	<span class="token comment">//报错</span>
<span class="token comment">//-----------------</span>
<span class="token keyword">let</span> b<span class="token operator">:</span> <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">&#39;hello&#39;</span>

<span class="token comment">//-----------------</span>
<span class="token keyword">let</span> c<span class="token operator">:</span> <span class="token builtin">boolean</span> <span class="token operator">=</span> <span class="token boolean">true</span>


<span class="token comment">//-------------------</span>
<span class="token comment">//如果声明同时赋值，则TS会自动把值的类型当做变量的类型</span>
<span class="token keyword">let</span> d <span class="token operator">=</span> <span class="token boolean">false</span>

d <span class="token operator">=</span> <span class="token number">123</span><span class="token punctuation">;</span>	<span class="token comment">//报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>给方法声明：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">function</span> <span class="token function">fun1</span><span class="token punctuation">(</span>a<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">,</span>b<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>

<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">fun1</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">fun1</span><span class="token punctuation">(</span><span class="token string">&#39;10&#39;</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">//报错</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">fun1</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">,</span><span class="token number">30</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token comment">//报错</span>
<span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token function">fun1</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>	<span class="token comment">//报错</span>

<span class="token comment">//-------------------------</span>
<span class="token comment">//给方法返回值声明类型</span>
<span class="token keyword">function</span> <span class="token function">fun2</span><span class="token punctuation">(</span>a<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">,</span>b<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token builtin">number</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a <span class="token operator">+</span> b
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_2-ts的类型" tabindex="-1"><a class="header-anchor" href="#_2-ts的类型" aria-hidden="true">#</a> 2. TS的类型</h2><h3 id="类型别名" tabindex="-1"><a class="header-anchor" href="#类型别名" aria-hidden="true">#</a> 类型别名</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//可以被类型起别名，在使用的时候，就可以直接使用别名</span>
<span class="token keyword">type</span> <span class="token class-name">myType</span> <span class="token operator">=</span> <span class="token number">1</span> <span class="token operator">|</span> <span class="token number">2</span> <span class="token operator">|</span> <span class="token number">3</span> <span class="token operator">|</span> <span class="token number">4</span> <span class="token operator">|</span> <span class="token number">5</span>
<span class="token keyword">let</span> k<span class="token operator">:</span>myType<span class="token punctuation">;</span>	<span class="token comment">//变量k的类型和myTy一样</span>
k <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
k <span class="token operator">=</span> <span class="token number">5</span><span class="token punctuation">;</span>
k <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span><span class="token comment">//报错</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="普通类型" tabindex="-1"><a class="header-anchor" href="#普通类型" aria-hidden="true">#</a> 普通类型</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> a<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
a <span class="token operator">=</span> <span class="token string">&#39;hi&#39;</span><span class="token punctuation">;</span>
<span class="token comment">//-------------------------</span>
<span class="token keyword">let</span> b<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">;</span>
b <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token comment">//-------------------------</span>
<span class="token keyword">let</span> c<span class="token operator">:</span><span class="token builtin">boolean</span><span class="token punctuation">;</span>
c <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="字面量声明" tabindex="-1"><a class="header-anchor" href="#字面量声明" aria-hidden="true">#</a> 字面量声明：</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//使用字面量声明，类似于常量</span>
<span class="token keyword">let</span> d<span class="token operator">:</span> <span class="token number">10</span><span class="token punctuation">;</span>
d <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
d <span class="token operator">=</span> <span class="token number">11</span><span class="token punctuation">;</span><span class="token comment">//报错</span>
<span class="token keyword">let</span> e<span class="token operator">:</span> <span class="token string">&#39;男&#39;</span> <span class="token operator">|</span> <span class="token string">&#39;女&#39;</span><span class="token punctuation">;</span><span class="token comment">//e的值只能是其中一个类型&quot;|&quot;，连接多个类型(联合类型)</span>
e <span class="token operator">=</span> <span class="token string">&#39;男&#39;</span>
e <span class="token operator">=</span> <span class="token string">&#39;女&#39;</span>
<span class="token keyword">let</span> f<span class="token operator">:</span><span class="token builtin">string</span> <span class="token operator">|</span> <span class="token builtin">boolean</span>	<span class="token comment">//可以是字符或布尔</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="any类型" tabindex="-1"><a class="header-anchor" href="#any类型" aria-hidden="true">#</a> any类型:</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//以下两种不常用</span>
<span class="token keyword">let</span> g<span class="token operator">:</span><span class="token builtin">any</span><span class="token punctuation">;</span>	<span class="token comment">//表示任意类型，相当于关闭了ts的类型检测</span>
<span class="token keyword">let</span> h<span class="token punctuation">;</span>		<span class="token comment">//h类型就是any，没有类型没有值，就是any</span>
g <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
g <span class="token operator">=</span> <span class="token string">&#39;hi&#39;</span><span class="token punctuation">;</span>
g <span class="token operator">=</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="unknown类型" tabindex="-1"><a class="header-anchor" href="#unknown类型" aria-hidden="true">#</a> unknown类型：</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> i<span class="token operator">:</span> <span class="token builtin">unknown</span><span class="token punctuation">;</span>	<span class="token comment">//类型未知，就是一个类型安全的any，尽量不要使用any，使用unknown</span>
i <span class="token operator">=</span> <span class="token number">10</span><span class="token punctuation">;</span>
i <span class="token operator">=</span> <span class="token string">&#39;hi&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>any类型和unknown类型给其他类型赋值：</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//但是any类型的值可以赋值给任意类型，如：</span>
<span class="token keyword">let</span> j<span class="token operator">:</span> <span class="token builtin">string</span><span class="token punctuation">;</span>
j <span class="token operator">=</span> g<span class="token punctuation">;</span>	<span class="token comment">//就可以，g是any类型，j是string类型，此时，j也变成了any类型</span>
j <span class="token operator">=</span> i<span class="token punctuation">;</span>	<span class="token comment">//报错，j是string类型，i是unknown类型，unknown不能赋值给其他类型</span>
<span class="token comment">//可以使用’类型断言‘</span>
<span class="token comment">//类型断言语法：</span>
<span class="token comment">// 1. 变量 as 类型</span>
<span class="token comment">// 2. &lt;类型&gt;变量</span>
j <span class="token operator">=</span> i <span class="token keyword">as</span> <span class="token builtin">string</span><span class="token punctuation">;</span><span class="token comment">//类型断言，i之前是unknown类型，断言之后是string类型	</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="void类型" tabindex="-1"><a class="header-anchor" href="#void类型" aria-hidden="true">#</a> void类型</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//void表示空，以函数为例，表示没有返回值的函数</span>
<span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span> <span class="token punctuation">{</span>
<span class="token punctuation">}</span>

<span class="token comment">//表示没有返回值，void返回的是空，never没有返回值</span>
<span class="token keyword">function</span> <span class="token function">fun</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token builtin">never</span> <span class="token punctuation">{</span>   
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="object类型" tabindex="-1"><a class="header-anchor" href="#object类型" aria-hidden="true">#</a> object类型</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> k<span class="token operator">:</span> object<span class="token punctuation">;</span>

<span class="token comment">//一般使用下面这个方式，指定k是一个对象，并且这个对象要包含指定的属性</span>
<span class="token comment">//语法:{属性:属性值类型,属性?:属性值类型,...}</span>
<span class="token comment">//在属性后加&#39;?&#39;，表示该属性可有可无</span>
<span class="token keyword">let</span> k<span class="token operator">:</span><span class="token punctuation">{</span>name<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span>age<span class="token operator">?</span><span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">}</span>
k <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token operator">:</span><span class="token string">&#39;zs&#39;</span><span class="token punctuation">,</span>age<span class="token operator">:</span><span class="token number">18</span><span class="token punctuation">}</span>

<span class="token comment">//[propName:string]:any		表示任意类型的属性，propName是变量名，可以随意修改</span>
<span class="token keyword">let</span> l<span class="token operator">:</span><span class="token punctuation">{</span>name<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span><span class="token punctuation">[</span>propName<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token operator">:</span><span class="token builtin">any</span><span class="token punctuation">}</span>
l<span class="token operator">=</span><span class="token punctuation">{</span>name<span class="token operator">:</span><span class="token string">&#39;zs&#39;</span><span class="token punctuation">,</span>age<span class="token operator">:</span><span class="token number">20</span><span class="token punctuation">,</span>gender<span class="token operator">:</span><span class="token string">&#39;男&#39;</span><span class="token punctuation">}</span>	<span class="token comment">//name属性必须有，其他不做要求</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="function类型" tabindex="-1"><a class="header-anchor" href="#function类型" aria-hidden="true">#</a> function类型</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//语法：</span>
<span class="token comment">//(形参:类型,形参:类型...)=&gt;返回值类型</span>

<span class="token comment">//表示m是一个函数，有两个参数，都是number类型，返回值是number类型</span>
<span class="token keyword">let</span> <span class="token function-variable function">m</span><span class="token operator">:</span><span class="token punctuation">(</span>a<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">,</span>b<span class="token operator">:</span><span class="token builtin">number</span><span class="token punctuation">)</span><span class="token operator">=&gt;</span><span class="token builtin">number</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="array类型" tabindex="-1"><a class="header-anchor" href="#array类型" aria-hidden="true">#</a> array类型</h3><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token keyword">let</span> n<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">[</span><span class="token punctuation">]</span>	<span class="token comment">//表示存储字符串类型的数组</span>
n<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">]</span>

<span class="token comment">//语法： 类型[]	或者	Array&lt;类型&gt;</span>
<span class="token keyword">let</span> o<span class="token operator">:</span><span class="token builtin">Array</span><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span><span class="token punctuation">;</span>
o<span class="token operator">=</span><span class="token punctuation">[</span><span class="token number">1</span><span class="token punctuation">,</span><span class="token number">2</span><span class="token punctuation">,</span><span class="token number">3</span><span class="token punctuation">]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="元组类型" tabindex="-1"><a class="header-anchor" href="#元组类型" aria-hidden="true">#</a> 元组类型</h3><p>TS新增类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//元组用于声明固定长度的数组</span>
<span class="token keyword">let</span> p<span class="token operator">:</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">,</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token punctuation">;</span>	<span class="token comment">//声明了元组，其中只能有两个元素，都是string类型</span>
p<span class="token operator">=</span><span class="token punctuation">[</span><span class="token string">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;b&#39;</span><span class="token punctuation">]</span>
<span class="token comment">//语法:[类型，类型，类型...]</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="枚举类型" tabindex="-1"><a class="header-anchor" href="#枚举类型" aria-hidden="true">#</a> 枚举类型</h3><p>TS新增类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">//一般用于变量只有几个可选的值，如性别，可以使用枚举</span>
<span class="token keyword">enum</span> Gender<span class="token punctuation">{</span>
    Male<span class="token punctuation">,</span>
    Female
<span class="token punctuation">}</span>
<span class="token keyword">let</span> q<span class="token operator">:</span><span class="token punctuation">{</span>name<span class="token operator">:</span><span class="token builtin">string</span><span class="token punctuation">,</span>gender<span class="token operator">:</span>Gender<span class="token punctuation">}</span>
i <span class="token operator">=</span> <span class="token punctuation">{</span>name<span class="token operator">:</span><span class="token string">&#39;zs&#39;</span><span class="token punctuation">,</span>gender<span class="token operator">:</span>Gender<span class="token punctuation">.</span>Male<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="编译" tabindex="-1"><a class="header-anchor" href="#编译" aria-hidden="true">#</a> 编译</h1><h2 id="_1-自动编译文件" tabindex="-1"><a class="header-anchor" href="#_1-自动编译文件" aria-hidden="true">#</a> 1. 自动编译文件</h2><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tsc xxx.ts -w
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>让TS编译器自动监视文件的变化，发生变化后自动编译</p><p>缺点，只能监视一个文件</p><h2 id="_2-配置文件" tabindex="-1"><a class="header-anchor" href="#_2-配置文件" aria-hidden="true">#</a> 2. 配置文件</h2><p><code>tsconfig.json</code></p><p>有了配置文件，就可以全局编译:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tsc		编译目录下所有ts文件
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>tsc -w	编译所有ts文件，并监视
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>配置文件详细：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token comment">/*
    	&quot;include&quot; 指定哪些ts文件需要编译
    	路径：** 表示任意目录	* 表示任意文件
    */</span>
    <span class="token property">&quot;include&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;./src/**/*&quot;</span> <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">/*
    	&quot;exclude&quot; 指定哪些ts文件不需要编译
    	以下实例表示不编译hello目录下的所有文件
    	默认值:[&#39;node_modules&#39;,&#39;bower_components&#39;,&#39;jspm_packages&#39;]
    */</span>
    <span class="token property">&quot;exclude&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token string">&quot;./src/hello/**/*&quot;</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">/*
    	files表示指定编译哪些文件
    */</span>
    <span class="token property">&quot;files&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span>
        &#39;***.ts&#39;<span class="token punctuation">,</span>
        &#39;***.ts&#39;
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token comment">/*
    	TS编译器选项
    */</span>
    <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token comment">/*
    		编译的ES版本
    		可选项： &#39;es3&#39;, &#39;es5&#39;, &#39;es6&#39;, &#39;es2015&#39;, &#39;es2016&#39;, &#39;es2017&#39;, &#39;es2018&#39;, &#39;es2019&#39;, &#39;es2020&#39;, &#39;es2021&#39;, &#39;es2022&#39;, &#39;esnext&#39;
    	*/</span>
        <span class="token property">&quot;target&quot;</span><span class="token operator">:</span><span class="token string">&quot;es6&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">/*
            编译导入模块时导入方式
            可选项： &#39;none&#39;, &#39;commonjs&#39;, &#39;amd&#39;, &#39;system&#39;, &#39;umd&#39;, &#39;es6&#39;, &#39;es2015&#39;, &#39;es2020&#39;, &#39;es2022&#39;, &#39;esnext&#39;, &#39;node16&#39;, &#39;nodenext&#39;
        */</span>
        <span class="token property">&quot;module&quot;</span><span class="token operator">:</span><span class="token string">&quot;es6&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">/*
            用来指定项目中要使用的库，一般不修改
            可选项： &#39;es5&#39;, &#39;es6&#39;, &#39;es2015&#39;, &#39;es7&#39;, &#39;es2016&#39;, &#39;es2017&#39;, &#39;es2018&#39;, &#39;es2019&#39;, &#39;es2020&#39;, &#39;es2021&#39;, &#39;es2022&#39;, &#39;esnext&#39;, &#39;dom&#39;, &#39;dom.iterable&#39;, &#39;webworker&#39;, 
&#39;webworker.importscripts&#39;, &#39;webworker.iterable&#39;, &#39;scripthost&#39;, &#39;es2015.core&#39;, &#39;es2015.collection&#39;, &#39;es2015.generator&#39;, &#39;es2015.iterable&#39;, &#39;es2015.promise&#39;, &#39;es2015.proxy&#39;, &#39;es2015.reflect&#39;, &#39;es2015.symbol&#39;, &#39;es2015.symbol.wellknown&#39;, &#39;es2016.array.include&#39;, &#39;es2017.object&#39;, &#39;es2017.sharedmemory&#39;, &#39;es2017.string&#39;, &#39;es2017.intl&#39;, &#39;es2017.typedarrays&#39;, &#39;es2018.asyncgenerator&#39;, &#39;es2018.asynciterable&#39;, &#39;es2018.intl&#39;, &#39;es2018.promise&#39;, &#39;es2018.regexp&#39;, &#39;es2019.array&#39;, &#39;es2019.object&#39;, &#39;es2019.string&#39;, &#39;es2019.symbol&#39;, &#39;es2020.bigint&#39;, &#39;es2020.date&#39;, &#39;es2020.promise&#39;, &#39;es2020.sharedmemory&#39;, &#39;es2020.string&#39;, &#39;es2020.symbol.wellknown&#39;, &#39;es2020.intl&#39;, &#39;es2020.number&#39;, &#39;es2021.promise&#39;, &#39;es2021.string&#39;, &#39;es2021.weakref&#39;, &#39;es2021.intl&#39;, &#39;es2022.array&#39;, &#39;es2022.error&#39;, &#39;es2022.intl&#39;, &#39;es2022.object&#39;, &#39;es2022.sharedmemory&#39;, &#39;es2022.string&#39;, &#39;esnext.array&#39;, &#39;esnext.symbol&#39;, &#39;esnext.asynciterable&#39;, &#39;esnext.intl&#39;, &#39;esnext.bigint&#39;, &#39;esnext.string&#39;, &#39;esnext.promise&#39;, &#39;esnext.weakref&#39;.
        */</span>
        <span class="token property">&quot;lib&quot;</span><span class="token operator">:</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">,</span>
        <span class="token comment">/*
            用于指定编译之后文件所在目录
        */</span>
        <span class="token property">&quot;outDir&quot;</span><span class="token operator">:</span><span class="token string">&quot;./dist&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">/*
            用于将编译的文件合并成一个文件
        */</span>
        <span class="token property">&quot;outFile&quot;</span><span class="token operator">:</span><span class="token string">&quot;./dist/app.js&quot;</span><span class="token punctuation">,</span>
        <span class="token comment">/*
           	是否对js文件进行编译，默认false
        */</span>
        <span class="token property">&quot;allowJs&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token comment">/*
           	检查js代码是否符合语法规范，默认false
        */</span>
        <span class="token property">&quot;checkJs&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token comment">/*
           	是否删除所有注释，默认false不删除
        */</span>
        <span class="token property">&quot;removeComments&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token comment">/*
           	编译之后不生成js文件，一般用于检错
        */</span>
        <span class="token property">&quot;noEmit&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token comment">/*
           	当有错误时，不生成编译后文件
        */</span>
        <span class="token property">&quot;noEmitOnError&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token comment">/*
           	生成的js文件，是否使用严格模式
        */</span>
        <span class="token property">&quot;alwasyStrict&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token comment">/*
			不允许隐式any类型，any类型必须声明
        */</span>
        <span class="token property">&quot;noImplicitAny&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token comment">/*
           	不允许不明确类型的this
        */</span>
        <span class="token property">&quot;noImplicitThis&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token comment">/*
           	严格检查空值null。将可能是null的变量报错
        */</span>
        <span class="token property">&quot;strictNullChecks&quot;</span><span class="token operator">:</span><span class="token boolean">false</span><span class="token punctuation">,</span>
        <span class="token comment">/*
           	所有严格检查的总开关。为true时，上面几个检查都开启，反之亦然
        */</span>
        <span class="token property">&quot;strict&quot;</span><span class="token operator">:</span><span class="token boolean">false</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="webpack打包ts" tabindex="-1"><a class="header-anchor" href="#webpack打包ts" aria-hidden="true">#</a> webpack打包ts</h1><h2 id="_1-基础打包" tabindex="-1"><a class="header-anchor" href="#_1-基础打包" aria-hidden="true">#</a> 1. 基础打包</h2><p>安装依赖包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm i -D webpack webpack-cli typescript ts-loader
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>新建<code>webpack.config.js</code>配置文件：</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&#39;path&#39;</span><span class="token punctuation">)</span>

module<span class="token punctuation">.</span>exports<span class="token operator">=</span><span class="token punctuation">{</span>
    <span class="token literal-property property">entry</span><span class="token operator">:</span><span class="token string">&quot;./src/main.ts&quot;</span><span class="token punctuation">,</span>
    <span class="token literal-property property">output</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">path</span><span class="token operator">:</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span>__dirname<span class="token punctuation">,</span><span class="token string">&quot;dist&quot;</span><span class="token punctuation">)</span><span class="token punctuation">,</span>
        <span class="token literal-property property">filename</span><span class="token operator">:</span><span class="token string">&quot;bundle.js&quot;</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>

    <span class="token literal-property property">module</span><span class="token operator">:</span><span class="token punctuation">{</span>
        <span class="token literal-property property">rules</span><span class="token operator">:</span><span class="token punctuation">[</span>
            <span class="token punctuation">{</span>
                <span class="token literal-property property">test</span><span class="token operator">:</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">\\.ts$</span><span class="token regex-delimiter">/</span></span><span class="token punctuation">,</span>
                <span class="token literal-property property">use</span><span class="token operator">:</span><span class="token string">&#39;ts-loader&#39;</span><span class="token punctuation">,</span>
                <span class="token literal-property property">exclude</span><span class="token operator">:</span><span class="token regex"><span class="token regex-delimiter">/</span><span class="token regex-source language-regex">node_modules</span><span class="token regex-delimiter">/</span></span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">]</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>新建目录：</p><p><code>src/main.ts</code></p><p>新建<code>tsconfig.json</code>配置文件</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token punctuation">{</span>
  <span class="token property">&quot;compilerOptions&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;module&quot;</span><span class="token operator">:</span> <span class="token string">&quot;es6&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;target&quot;</span><span class="token operator">:</span> <span class="token string">&quot;es6&quot;</span><span class="token punctuation">,</span>
    <span class="token property">&quot;strict&quot;</span><span class="token operator">:</span> <span class="token boolean">true</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在<code>package.json</code>中，添加调试：</p><div class="language-json line-numbers-mode" data-ext="json"><pre class="language-json"><code><span class="token property">&quot;scripts&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token property">&quot;build&quot;</span><span class="token operator">:</span><span class="token string">&quot;webpack&quot;</span>
<span class="token punctuation">}</span><span class="token punctuation">,</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>打包：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>npm run build
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="_2-增强打包" tabindex="-1"><a class="header-anchor" href="#_2-增强打包" aria-hidden="true">#</a> 2. 增强打包</h2><p>安装各种loader和plugin，来增强打包的能力，详细需要看：</p>`,79),u={href:"https://gitee.com/EricKiku/web/blob/master/Webpack/%E7%AC%94%E8%AE%B0/Webpack5.md",target:"_blank",rel:"noopener noreferrer"},d=s(`<p>处理各种资源</p><h1 id="面向对象" tabindex="-1"><a class="header-anchor" href="#面向对象" aria-hidden="true">#</a> 面向对象</h1><h2 id="_1-类" tabindex="-1"><a class="header-anchor" href="#_1-类" aria-hidden="true">#</a> 1. 类</h2><p>创建一个类：</p><ol><li><p>类的属性</p><ul><li><p>类中直接定义的属性是<code>实例属性</code>，需要对象去访问，如：<code>name</code>属性</p></li><li><p>类中使用<code>static</code>定义的属性是<code>静态属性</code>，可以用类去访问，如：<code>age</code>属性</p></li><li><p>使用<code>readonly</code>定义的属性是<code>只读属性</code>，只能访问，不能修改</p></li><li><p><code>static</code>和<code>readonly</code>可以一块：\`static readonly 属性:类型</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定义一个类</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span>string <span class="token operator">=</span> <span class="token string">&#39;zs&#39;</span><span class="token punctuation">;</span>
    <span class="token keyword">static</span> <span class="token literal-property property">age</span><span class="token operator">:</span>number<span class="token operator">=</span><span class="token number">20</span><span class="token punctuation">;</span>
    readonly gender<span class="token operator">:</span>string<span class="token operator">=</span><span class="token string">&#39;男&#39;</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>Person<span class="token punctuation">.</span>age<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>类的方法</p><ul><li>类的方法也有<code>static</code>，可以定义静态方法</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定义一个类</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span>string <span class="token operator">=</span> <span class="token string">&#39;zs&#39;</span><span class="token punctuation">;</span>
    <span class="token function">satHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

person<span class="token punctuation">.</span><span class="token function">satHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>构造函数</p><ul><li>构造函数会在<code>对象创建时</code>调用</li><li><code>this</code>就是指向当前的实例对象</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定义一个类</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span>number<span class="token punctuation">;</span>
	<span class="token comment">//构造函数	</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span>number</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> person <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;张三&quot;</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> person1 <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Person</span><span class="token punctuation">(</span><span class="token string">&quot;李四&quot;</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>person1<span class="token punctuation">)</span><span class="token punctuation">;</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ol><h2 id="_2-继承" tabindex="-1"><a class="header-anchor" href="#_2-继承" aria-hidden="true">#</a> 2. 继承</h2><p>把多个类的公共代码写在一个父类中，然后子类继承父类</p><ul><li>子类继承父类之后，就相当于把父类里的所有属性和方法都写在子类中</li><li>子类继承之后，会拥有所有父类的方法和属性</li><li>子类可以直接添加父类中没有的方法，只属于该子类，其他子类无法使用</li><li>如果子类中添加了和父类<code>相同的方法</code>，则子类会覆盖掉父类的方法，称为<code>方法重写</code></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定义一个父类</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
    <span class="token literal-property property">age</span><span class="token operator">:</span>number<span class="token punctuation">;</span>

    <span class="token function">satHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span>number</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//创建子类，继承父类</span>
<span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
    <span class="token comment">//该子类独有的方法</span>
    <span class="token function">study</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">\`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">\${</span><span class="token keyword">this</span><span class="token punctuation">.</span>name<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">在学习</span><span class="token template-punctuation string">\`</span></span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//重写了父类的方法</span>
    <span class="token function">satHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;我整在学习，不要打扰我&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token comment">//创建子类，继承父类</span>
<span class="token keyword">class</span> <span class="token class-name">Teacher</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>

<span class="token punctuation">}</span>

<span class="token keyword">let</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span><span class="token number">20</span><span class="token punctuation">)</span>
<span class="token keyword">let</span> teh <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Teacher</span><span class="token punctuation">(</span><span class="token string">&#39;老刘&#39;</span><span class="token punctuation">,</span><span class="token number">40</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span><span class="token punctuation">;</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>teh<span class="token punctuation">)</span><span class="token punctuation">;</span>

stu<span class="token punctuation">.</span><span class="token function">study</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_3-super" tabindex="-1"><a class="header-anchor" href="#_3-super" aria-hidden="true">#</a> 3. super</h2><p>代表的就是父类</p><p>一般多用于：如果在子类中重写了父类的构造器函数，则在子类的构造函数中必须写<code>super()</code>，来调用父类的构造函数</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定义一个父类</span>
<span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
    <span class="token comment">//子类特有的属性</span>
    <span class="token literal-property property">banji</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
    <span class="token comment">//重写构造函数</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">,</span><span class="token literal-property property">banji</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">//调用父类的构造函数，并且传参</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>banji <span class="token operator">=</span> banji
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;一年级&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>stu<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_4-抽象类" tabindex="-1"><a class="header-anchor" href="#_4-抽象类" aria-hidden="true">#</a> 4. 抽象类</h2><ul><li><p>如果想让一个类，只用于<code>被继承</code>，而不用于<code>创建实例</code>，则需要将该类定义为<code>抽象类</code></p></li><li><p>抽象类不能用于创建实例，只能用于被继承</p></li><li><p>抽象类中可以写<code>抽象方法</code>，抽象方法没有<code>代码体</code>，仅有结构。也可以有非抽象的普通方法</p></li><li><p>子类继承父类时，必须重写父类的所有抽象方法</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 定义一个抽象父类</span>
abstract <span class="token keyword">class</span> <span class="token class-name">Person</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token comment">//抽象方法，没有代码体，只有结构</span>
    abstract <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">class</span> <span class="token class-name">Student</span> <span class="token keyword">extends</span> <span class="token class-name">Person</span><span class="token punctuation">{</span>
    <span class="token literal-property property">banji</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">,</span><span class="token literal-property property">banji</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">super</span><span class="token punctuation">(</span>name<span class="token punctuation">)</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>banji <span class="token operator">=</span> banji
    <span class="token punctuation">}</span>
    <span class="token comment">//必须重写父类的抽象方法</span>
    <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span> <span class="token keyword">void</span> <span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;你好&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> 
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> stu <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Student</span><span class="token punctuation">(</span><span class="token string">&#39;张三&#39;</span><span class="token punctuation">,</span><span class="token string">&#39;一年级&#39;</span><span class="token punctuation">)</span>
stu<span class="token punctuation">.</span><span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_5-接口" tabindex="-1"><a class="header-anchor" href="#_5-接口" aria-hidden="true">#</a> 5. 接口</h2><ul><li><p>用于定义一个类的结构</p></li><li><p>定义一个类中应该包含哪些<code>属性和方法</code></p></li><li><p>同时接口也可以当做类型声明去使用</p></li><li><p>接口中的所有属性都<code>不能有实际的值</code></p></li><li><p>接口中的所有方法都是<code>抽象方法</code></p></li><li><p>接口就是一个规范，必须符合这个规范，才可以在特定场景中使用</p></li><li><p>类使用<code>implements</code>来实现接口</p></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">//定义一个接口</span>
<span class="token keyword">interface</span> <span class="token class-name">myInter</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
    <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token keyword">void</span>
<span class="token punctuation">}</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span> <span class="token keyword">implements</span> <span class="token class-name">myInter</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span> string<span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token punctuation">}</span>
    <span class="token function">sayHello</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_6-属性封装" tabindex="-1"><a class="header-anchor" href="#_6-属性封装" aria-hidden="true">#</a> 6. 属性封装</h2><ul><li>如果不想让类中的属性被随意访问，就需要对属性进行私有声明<code>private</code></li><li>属性默认的声明是<code>public</code>，可以随意被访问，包括继承的子类</li><li>属性的第三个声明是：<code>protected</code>，声明的属性只能在该类或子类中访问或修改</li><li>私有声明的属性不能被直接访问，需要<code>getter/setter</code>方法</li><li>获取属性值需要使用<code>属性.get***</code>，设置属性值需要使用<code>属性.set***</code></li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 属性封装</span>
<span class="token keyword">class</span> <span class="token class-name">Animal</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token literal-property property">age</span><span class="token operator">:</span>number<span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span>number</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
    <span class="token punctuation">}</span>
    <span class="token comment">// getter方法</span>
    <span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>name
    <span class="token punctuation">}</span>
    <span class="token comment">//setter方法</span>
    <span class="token function">setName</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> value
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

<span class="token keyword">let</span> dog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token string">&#39;小黑&#39;</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dog<span class="token punctuation">.</span><span class="token function">setName</span><span class="token punctuation">(</span><span class="token string">&#39;小小黑&#39;</span><span class="token punctuation">)</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dog<span class="token punctuation">.</span><span class="token function">getName</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>上述方式需要使用调用get或set方法去修改属性，还可以使用<code>get/set 方法名(){}</code></li><li>这样只需要访问使用<code>get/set</code>方法定义的方法名即可</li><li>看似是访问的属性，实际上还是经过了<code>get/set</code>方法</li></ul><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 属性封装</span>
<span class="token keyword">class</span> <span class="token class-name">Animal</span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token literal-property property">_name</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
    <span class="token keyword">private</span> <span class="token literal-property property">age</span><span class="token operator">:</span>number<span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">,</span><span class="token literal-property property">age</span><span class="token operator">:</span>number</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name<span class="token punctuation">;</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>age <span class="token operator">=</span> age
    <span class="token punctuation">}</span>
    <span class="token comment">// getter方法</span>
    <span class="token keyword">get</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">return</span> <span class="token keyword">this</span><span class="token punctuation">.</span>_name
    <span class="token punctuation">}</span>
    <span class="token comment">//setter方法</span>
    <span class="token keyword">set</span> <span class="token function">name</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">value</span><span class="token operator">:</span>string</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>_name <span class="token operator">=</span> value
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">let</span> dog <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Animal</span><span class="token punctuation">(</span><span class="token string">&#39;小黑&#39;</span><span class="token punctuation">,</span><span class="token number">5</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
dog<span class="token punctuation">.</span>name <span class="token operator">=</span> <span class="token string">&#39;小小黑&#39;</span>	<span class="token comment">//直接访问name方法，就和访问属性用于，更接近原始的写法</span>
console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dog<span class="token punctuation">.</span>name<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h1 id="泛型" tabindex="-1"><a class="header-anchor" href="#泛型" aria-hidden="true">#</a> 泛型</h1><ul><li><p>在方法参数和返回值的类型不确定的时候，可以使用<code>泛型</code></p></li><li><p>在方法名后使用<code>&lt;&gt;</code>指定泛型</p></li><li><p>在调用方法时，方法名后可以指定类型</p><div class="language-typescript line-numbers-mode" data-ext="ts"><pre class="language-typescript"><code><span class="token comment">// 泛型</span>
<span class="token keyword">function</span> <span class="token generic-function"><span class="token function">fun1</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>a<span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a
<span class="token punctuation">}</span>
<span class="token generic-function"><span class="token function">fun1</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">number</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token generic-function"><span class="token function">fun1</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token builtin">string</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>泛型可以同时指定多个</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 泛型</span>
<span class="token keyword">function</span> fun1<span class="token operator">&lt;</span><span class="token constant">T</span><span class="token punctuation">,</span><span class="token constant">K</span><span class="token operator">&gt;</span><span class="token punctuation">(</span>a<span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">,</span><span class="token literal-property property">b</span><span class="token operator">:</span><span class="token constant">K</span><span class="token punctuation">)</span><span class="token operator">:</span><span class="token constant">T</span> <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a
<span class="token punctuation">}</span>
fun1<span class="token operator">&lt;</span>number<span class="token punctuation">,</span>string<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span><span class="token string">&#39;he&#39;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
fun1<span class="token operator">&lt;</span>string<span class="token punctuation">,</span>boolean<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token string">&#39;hello&#39;</span><span class="token punctuation">,</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li><li><p>泛型也可以是类或接口</p></li><li><p><code>fun1&lt;Inter&gt;</code>也可以<code>fun1&lt;T extends Inter&gt;</code>，意思是<code>T</code>类型实现接口</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 泛型</span>
<span class="token comment">//定义一个接口</span>
<span class="token keyword">interface</span> <span class="token class-name">Inter</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span>string<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">function</span> fun1<span class="token operator">&lt;</span>Inter<span class="token operator">&gt;</span><span class="token punctuation">(</span>a<span class="token operator">:</span>Inter<span class="token punctuation">)</span><span class="token operator">:</span>Inter <span class="token punctuation">{</span>
    <span class="token keyword">return</span> a
<span class="token punctuation">}</span>
<span class="token comment">//传参时，必须满足接口的结构</span>
fun1<span class="token operator">&lt;</span>Inter<span class="token operator">&gt;</span><span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token string">&#39;zs&#39;</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">//类使用泛型</span>
<span class="token keyword">class</span> <span class="token class-name">MyClass</span><span class="token operator">&lt;</span><span class="token constant">T</span><span class="token operator">&gt;</span><span class="token punctuation">{</span>
    <span class="token literal-property property">name</span><span class="token operator">:</span><span class="token constant">T</span><span class="token punctuation">;</span>
    <span class="token function">constructor</span><span class="token punctuation">(</span><span class="token parameter"><span class="token literal-property property">name</span><span class="token operator">:</span><span class="token constant">T</span></span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">this</span><span class="token punctuation">.</span>name <span class="token operator">=</span> name
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></li></ul>`,26);function k(v,m){const a=c("ExternalLinkIcon");return p(),t("div",null,[r,n("p",null,[n("a",u,[o("https://gitee.com/EricKiku/web/blob/master/Webpack/笔记/Webpack5.md"),l(a)])]),d])}const g=e(i,[["render",k],["__file","TypeScript.html.vue"]]);export{g as default};
