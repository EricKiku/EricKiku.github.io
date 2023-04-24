import{_ as a,W as t,X as e,Y as n,Z as p,$ as o,a2 as c,G as i}from"./framework-61af4b36.js";const l={},u=c(`<h1 id="" tabindex="-1"><a class="header-anchor" href="#" aria-hidden="true">#</a> &quot;&quot;</h1><h2 id="安装mysql驱动" tabindex="-1"><a class="header-anchor" href="#安装mysql驱动" aria-hidden="true">#</a> 安装MySQL驱动</h2><p><strong>初始化项目</strong></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> mod init 项目名
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>安装驱动</strong></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> get <span class="token operator">-</span>u github<span class="token punctuation">.</span>com<span class="token operator">/</span><span class="token keyword">go</span><span class="token operator">-</span>sql<span class="token operator">-</span>driver<span class="token operator">/</span>mysql
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p><strong>使用官网实例</strong></p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;database/sql&quot;</span>
	<span class="token string">&quot;time&quot;</span>

	<span class="token boolean">_</span> <span class="token string">&quot;github.com/go-sql-driver/mysql&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// ...</span>

db<span class="token punctuation">,</span> err <span class="token operator">:=</span> sql<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;user:password@/dbname&quot;</span><span class="token punctuation">)</span>
<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
	<span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
<span class="token comment">// See &quot;Important settings&quot; section.</span>
db<span class="token punctuation">.</span><span class="token function">SetConnMaxLifetime</span><span class="token punctuation">(</span>time<span class="token punctuation">.</span>Minute <span class="token operator">*</span> <span class="token number">3</span><span class="token punctuation">)</span>
db<span class="token punctuation">.</span><span class="token function">SetMaxOpenConns</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
db<span class="token punctuation">.</span><span class="token function">SetMaxIdleConns</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="初始化连接" tabindex="-1"><a class="header-anchor" href="#初始化连接" aria-hidden="true">#</a> 初始化连接</h2><p>Open函数只是验证数据库连接参数是否正确，并不是真正的连接</p><p>如果要检查数据源的名称是否真实有效，应该调用<code>Ping</code>方法</p><p>返回的DB对象可以安全地被多个goroutine并发使用，并且维护其自己的空闲连接池。因此Open函数应该仅被调用一次，很少需要关闭DB对象</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">&quot;database/sql&quot;</span>
	<span class="token string">&quot;fmt&quot;</span>

	<span class="token boolean">_</span> <span class="token string">&quot;github.com/go-sql-driver/mysql&quot;</span>
<span class="token punctuation">)</span>

<span class="token comment">// 定义全局对象db</span>
<span class="token keyword">var</span> db <span class="token operator">*</span>sql<span class="token punctuation">.</span>DB

<span class="token comment">// 定义初始化数据库函数</span>
<span class="token keyword">func</span> <span class="token function">initDb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	db<span class="token punctuation">,</span> err <span class="token operator">=</span> sql<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">&quot;mysql&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;root:123456@tcp(127.0.0.1:3306)/mydb&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	<span class="token comment">// 尝试连接，校验参数是否正确</span>
	err <span class="token operator">=</span> db<span class="token punctuation">.</span><span class="token function">Ping</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token keyword">return</span> err
	<span class="token punctuation">}</span>

	<span class="token keyword">return</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>

	err <span class="token operator">:=</span> <span class="token function">initDb</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;初始化失败:%v\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;初始化成功&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code>初始化成功
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="插入操作" tabindex="-1"><a class="header-anchor" href="#插入操作" aria-hidden="true">#</a> 插入操作</h2><p>插入、更新和删除操作都使用 <code>Exec</code>方法</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token punctuation">(</span>db <span class="token operator">*</span>DB<span class="token punctuation">)</span> <span class="token function">Exec</span><span class="token punctuation">(</span>query <span class="token builtin">string</span><span class="token punctuation">,</span>args <span class="token operator">...</span><span class="token keyword">interface</span><span class="token punctuation">)</span><span class="token punctuation">(</span>Result<span class="token punctuation">,</span><span class="token builtin">error</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token comment">//插入数据</span>

<span class="token keyword">func</span> <span class="token function">insertDb</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	sqlStr <span class="token operator">:=</span> <span class="token string">&quot;insert into user(username, password) values (?,?)&quot;</span>
	res<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sqlStr<span class="token punctuation">,</span> <span class="token string">&quot;马保国&quot;</span><span class="token punctuation">,</span> <span class="token string">&quot;闪电五连鞭&quot;</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;insert failed:%v\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 拿到刚才插入的id</span>
	id<span class="token punctuation">,</span> err2 <span class="token operator">:=</span> res<span class="token punctuation">.</span><span class="token function">LastInsertId</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err2 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;get lastId failed:%v\\n&quot;</span><span class="token punctuation">,</span> err2<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;the id:%v\\n&quot;</span><span class="token punctuation">,</span> id<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="查询操作" tabindex="-1"><a class="header-anchor" href="#查询操作" aria-hidden="true">#</a> 查询操作</h2><p><strong>单行查询</strong></p><p>单行查询<code>db.QueryRow()</code>执行一次查询。并期望返回最多一行结果，</p><p>总是返回非nil的值，直到返回值的Scan方法被调用时，才会返回延迟的错误。</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> User <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	id       <span class="token builtin">int</span>
	username <span class="token builtin">string</span>
	password <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">queryRow</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	sqlStr <span class="token operator">:=</span> <span class="token string">&quot;SELECT * FROM user WHERE id=?&quot;</span>
	<span class="token keyword">var</span> user User
	err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">QueryRow</span><span class="token punctuation">(</span>sqlStr<span class="token punctuation">,</span> <span class="token number">102</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>username<span class="token punctuation">,</span> <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;err:%v\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;id:%d,username:%s,password:%s&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span>id<span class="token punctuation">,</span> user<span class="token punctuation">.</span>username<span class="token punctuation">,</span> user<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>多行查询</strong></p><p>多行查询<code>db.Query()</code>执行一次查询，返回多行结果，即Rows</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">queryAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	sqlStr <span class="token operator">:=</span> <span class="token string">&quot;SELECT * FROM user WHERE id&gt;?&quot;</span>
	rows<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Query</span><span class="token punctuation">(</span>sqlStr<span class="token punctuation">,</span> <span class="token number">350</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;err:%v\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 关闭数据库的连接</span>
	<span class="token keyword">defer</span> rows<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span>

	<span class="token comment">// 循环读取结果</span>
	<span class="token keyword">for</span> rows<span class="token punctuation">.</span><span class="token function">Next</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
		<span class="token keyword">var</span> user User
		err2 <span class="token operator">:=</span> rows<span class="token punctuation">.</span><span class="token function">Scan</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>user<span class="token punctuation">.</span>id<span class="token punctuation">,</span> <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>username<span class="token punctuation">,</span> <span class="token operator">&amp;</span>user<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
		<span class="token keyword">if</span> err2 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;err2:%v\\n&quot;</span><span class="token punctuation">,</span> err2<span class="token punctuation">)</span>
			<span class="token keyword">return</span>
		<span class="token punctuation">}</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;id:%d,username:%s,password:%s\\n&quot;</span><span class="token punctuation">,</span> user<span class="token punctuation">.</span>id<span class="token punctuation">,</span> user<span class="token punctuation">.</span>username<span class="token punctuation">,</span> user<span class="token punctuation">.</span>password<span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="更新操作" tabindex="-1"><a class="header-anchor" href="#更新操作" aria-hidden="true">#</a> 更新操作</h2><p>使用<code>Exec</code>方法</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">update</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	sqlStr <span class="token operator">:=</span> <span class="token string">&quot;UPDATE user SET password=? WHERE id = ?&quot;</span>
	r<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sqlStr<span class="token punctuation">,</span> <span class="token string">&quot;混元形意太极&quot;</span><span class="token punctuation">,</span> <span class="token number">358</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;err:%v\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 返回收影响的行数</span>
	i<span class="token punctuation">,</span> err2 <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">RowsAffected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err2 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;err2:%v\\n&quot;</span><span class="token punctuation">,</span> err2<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;更新成功：%v\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token function">queryAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="删除操作" tabindex="-1"><a class="header-anchor" href="#删除操作" aria-hidden="true">#</a> 删除操作</h2><p>使用<code>Exec</code>方法</p><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">func</span> <span class="token function">delete</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	sqlStr <span class="token operator">:=</span> <span class="token string">&quot;DELETE FROM user WHERE id = ?&quot;</span>
	r<span class="token punctuation">,</span> err <span class="token operator">:=</span> db<span class="token punctuation">.</span><span class="token function">Exec</span><span class="token punctuation">(</span>sqlStr<span class="token punctuation">,</span> <span class="token number">358</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;err:%v\\n&quot;</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	i<span class="token punctuation">,</span> err2 <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">RowsAffected</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err2 <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;err2:%v\\n&quot;</span><span class="token punctuation">,</span> err2<span class="token punctuation">)</span>
		<span class="token keyword">return</span>
	<span class="token punctuation">}</span>
	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;i:%v\\n&quot;</span><span class="token punctuation">,</span> i<span class="token punctuation">)</span>
	<span class="token function">queryAll</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="gorm" tabindex="-1"><a class="header-anchor" href="#gorm" aria-hidden="true">#</a> Gorm</h2><h4 id="orm" tabindex="-1"><a class="header-anchor" href="#orm" aria-hidden="true">#</a> ORM</h4><p>对象关系映射(Object Relational Mapping)模式是一种为了解决面向对象与关系数据库存在的互不匹配的现象的技术。简单的说，ORM是通过使用描述对象和数据库之间映射的元数据，将程序中的对象自动持久化到关系数据库中。</p><h4 id="安装" tabindex="-1"><a class="header-anchor" href="#安装" aria-hidden="true">#</a> 安装</h4><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">go</span> get <span class="token operator">-</span>u gorm<span class="token punctuation">.</span>io<span class="token operator">/</span>gorm
<span class="token keyword">go</span> get <span class="token operator">-</span>u gorm<span class="token punctuation">.</span>io<span class="token operator">/</span>driver<span class="token operator">/</span>sqlite
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><div class="language-go line-numbers-mode" data-ext="go"><pre class="language-go"><code><span class="token keyword">type</span> Produce <span class="token keyword">struct</span> <span class="token punctuation">{</span>
	gorm<span class="token punctuation">.</span>Model
	Code  <span class="token builtin">string</span>
	Price <span class="token builtin">string</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	dsn <span class="token operator">:=</span> <span class="token string">&quot;root:123456@tcp(127.0.0.1:3306)/mydb&quot;</span>
	db<span class="token punctuation">,</span> err <span class="token operator">:=</span> gorm<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>mysql<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>dsn<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token operator">&amp;</span>gorm<span class="token punctuation">.</span>Config<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">&quot;failed to open database&quot;</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>

	<span class="token comment">// 迁移，也就是创建表，按照结构体创建</span>
	db<span class="token punctuation">.</span><span class="token function">AutoMigrate</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Produce<span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>

	<span class="token comment">// 插入数据</span>
	db<span class="token punctuation">.</span><span class="token function">Create</span><span class="token punctuation">(</span><span class="token operator">&amp;</span>Produce<span class="token punctuation">{</span>Code<span class="token punctuation">:</span> <span class="token string">&quot;20001&quot;</span><span class="token punctuation">,</span> Price<span class="token punctuation">:</span> <span class="token string">&quot;3888&quot;</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>后续看官网</p>`,40),r={href:"https://gorm.io/zh_CN/docs/index.html",target:"_blank",rel:"noopener noreferrer"};function d(k,v){const s=i("ExternalLinkIcon");return t(),e("div",null,[u,n("p",null,[n("a",r,[p("https://gorm.io/zh_CN/docs/index.html"),o(s)])])])}const b=a(l,[["render",d],["__file","Golang之数据库.html.vue"]]);export{b as default};
