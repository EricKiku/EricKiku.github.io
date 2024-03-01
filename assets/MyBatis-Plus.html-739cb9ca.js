const t=JSON.parse('{"key":"v-99b9db74","path":"/zh/backend/MyBatis/MyBatis-Plus.html","title":"MyBatis-Plus","lang":"zh-CN","frontmatter":{"title":"MyBatis-Plus","icon":"Bird","category":["后端"],"tag":["MyBatis"],"description":"\\"\\" MyBatis-Plus image-20220510202246421 快速创建 1\\t数据库表 现有一张 User 表，其表结构如下： id name age email 1 Jone 18 test1@baomidou.com 2 Jack 20 test2@baomidou.com 3 Tom 28 test3@baomidou.com 4 Sandy 21 test4@baomidou.com 5 Billie 24 test5@baomidou.com","head":[["meta",{"property":"og:url","content":"https://mister-hope.github.io/zh/backend/MyBatis/MyBatis-Plus.html"}],["meta",{"property":"og:site_name","content":"笔记"}],["meta",{"property":"og:title","content":"MyBatis-Plus"}],["meta",{"property":"og:description","content":"\\"\\" MyBatis-Plus image-20220510202246421 快速创建 1\\t数据库表 现有一张 User 表，其表结构如下： id name age email 1 Jone 18 test1@baomidou.com 2 Jack 20 test2@baomidou.com 3 Tom 28 test3@baomidou.com 4 Sandy 21 test4@baomidou.com 5 Billie 24 test5@baomidou.com"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-02-12T06:26:17.000Z"}],["meta",{"property":"article:tag","content":"MyBatis"}],["meta",{"property":"article:modified_time","content":"2023-02-12T06:26:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"MyBatis-Plus\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2023-02-12T06:26:17.000Z\\",\\"author\\":[]}"]]},"headers":[{"level":2,"title":"1\\t数据库表","slug":"_1数据库表","link":"#_1数据库表","children":[]},{"level":2,"title":"2 导入依赖","slug":"_2-导入依赖","link":"#_2-导入依赖","children":[]},{"level":2,"title":"3.连接数据库","slug":"_3-连接数据库","link":"#_3-连接数据库","children":[]},{"level":2,"title":"4.创建接口","slug":"_4-创建接口","link":"#_4-创建接口","children":[{"level":3,"title":"pojo-模型层","slug":"pojo-模型层","link":"#pojo-模型层","children":[]},{"level":3,"title":"mapper接口","slug":"mapper接口","link":"#mapper接口","children":[]}]},{"level":2,"title":"5.编写测试类","slug":"_5-编写测试类","link":"#_5-编写测试类","children":[]},{"level":2,"title":"1.insert","slug":"_1-insert","link":"#_1-insert","children":[{"level":3,"title":"主键生成策略","slug":"主键生成策略","link":"#主键生成策略","children":[]}]},{"level":2,"title":"2.update","slug":"_2-update","link":"#_2-update","children":[]},{"level":2,"title":"3.自动填充","slug":"_3-自动填充","link":"#_3-自动填充","children":[{"level":3,"title":"在实体类字段属性上增加注解","slug":"在实体类字段属性上增加注解","link":"#在实体类字段属性上增加注解","children":[]}]},{"level":2,"title":"4.select","slug":"_4-select","link":"#_4-select","children":[]},{"level":2,"title":"分页查询","slug":"分页查询","link":"#分页查询","children":[]},{"level":2,"title":"5.delete","slug":"_5-delete","link":"#_5-delete","children":[{"level":3,"title":"逻辑删除","slug":"逻辑删除","link":"#逻辑删除","children":[]}]},{"level":2,"title":"乐观锁","slug":"乐观锁-1","link":"#乐观锁-1","children":[]}],"git":{"createdTime":1676128875000,"updatedTime":1676183177000,"contributors":[{"name":"EricKiku","email":"2966678301@qq.com","commits":3}]},"readingTime":{"minutes":7.67,"words":2300},"filePathRelative":"zh/backend/MyBatis/MyBatis-Plus.md","localizedDate":"2023年2月11日","excerpt":"<h1> \\"\\"</h1>\\n<h1> MyBatis-Plus</h1>\\n<figure><img src=\\"/assets/images/image-20220510202246421.png\\" alt=\\"image-20220510202246421\\" tabindex=\\"0\\" loading=\\"lazy\\"><figcaption>image-20220510202246421</figcaption></figure>\\n<h1> 快速创建</h1>\\n<h2> 1\\t数据库表</h2>\\n<p>现有一张 <code>User</code> 表，其表结构如下：</p>\\n<table>\\n<thead>\\n<tr>\\n<th>id</th>\\n<th>name</th>\\n<th style=\\"text-align:left\\">age</th>\\n<th>email</th>\\n</tr>\\n</thead>\\n<tbody>\\n<tr>\\n<td>1</td>\\n<td>Jone</td>\\n<td style=\\"text-align:left\\">18</td>\\n<td><a href=\\"mailto:test1@baomidou.com\\">test1@baomidou.com</a></td>\\n</tr>\\n<tr>\\n<td>2</td>\\n<td>Jack</td>\\n<td style=\\"text-align:left\\">20</td>\\n<td><a href=\\"mailto:test2@baomidou.com\\">test2@baomidou.com</a></td>\\n</tr>\\n<tr>\\n<td>3</td>\\n<td>Tom</td>\\n<td style=\\"text-align:left\\">28</td>\\n<td><a href=\\"mailto:test3@baomidou.com\\">test3@baomidou.com</a></td>\\n</tr>\\n<tr>\\n<td>4</td>\\n<td>Sandy</td>\\n<td style=\\"text-align:left\\">21</td>\\n<td><a href=\\"mailto:test4@baomidou.com\\">test4@baomidou.com</a></td>\\n</tr>\\n<tr>\\n<td>5</td>\\n<td>Billie</td>\\n<td style=\\"text-align:left\\">24</td>\\n<td><a href=\\"mailto:test5@baomidou.com\\">test5@baomidou.com</a></td>\\n</tr>\\n</tbody>\\n</table>","autoDesc":true}');export{t as data};