---
title: SpringBoot+Vue
icon: markdown
category:
  - 前端
  - 后端
tag:
  - Spring
  - Vue
---
# ""


# 主要技术

Java EE 框架：`SpringBoot` + `MyBatisPlus`

Web 框架：`Vue`+`ElementUI`

# Web技术基础

目前模式主要分为两种：
`BS(Browser/Server)`:浏览器/服务器架构模式。

`CS(Client/Server)`：客户端/服务器架构模式。如QQ

![image-20221123184239514](D:\Typora\images\image-20221123184239514.png)

# 后端

## Maven配置

下载Maven

```
https://maven.apache.org/download.cgi
```

Maven配置：

* 指定本地仓库位置
  修改maven安装包中的`conf/settings.xml`文件

  ```xml
    <!-- localRepository
     | The path to the local repository maven will use to store artifacts.
     |
     | Default: ${user.home}/.m2/repository
    <localRepository>/path/to/local/repo</localRepository>
    -->
    <localRepository>D:\Maven-Repository</localRepository>
  ```

  默认路径：`C:\Users\Administrator\.m2`

* 远程仓库配置

  ```xml
  <mirrors>   
      
  <mirror>
      <id>aliyunmaven</id>
      <mirrorOf>*</mirrorOf>
      <name>阿里云公共仓库</name>
      <url>https://maven.aliyun.com/repository/public</url>
  </mirror>
  
  </mirrors>
  ```

IDEA配置

![image-20221123192438255](D:\Typora\images\image-20221123192438255.png)

在第一处修改maven的目录。在第二处修改maven配置文件位置

## SpringBoot

![image-20221123193453561](D:\Typora\images\image-20221123193453561.png)

### 快速创建

![image-20221123193701581](D:\Typora\images\image-20221123193701581.png)

`组：`一般是公司域名倒写

![image-20221123194013068](D:\Typora\images\image-20221123194013068.png)

开发web应用，需要勾选`Web-Spring Web`。会自动安装SpringMVC相关依赖

### controller

新建`xyz.erickiku.doem/controller`目录

新建`HelloController.java`文件

```java
@RestController //该注解可以当做前端接口
public class HelloController {
    
    @GetMapping("/hello")   //该注解需要Get请求    请求路径为：http://localhost:8080/hello
    public String hello(){
        return "Hello World";
    }
}
```

### 启动

点击该文件左侧的启动命令，启动服务

```java
@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

}
```

### 访问

通过本地`http://localhost:8080/hello`访问接口。返回`Hello Wrold`

### 热部署

`devtools`

安装依赖：

```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-devtools</artifactId>
    <optional>true</optional>
</dependency>
```

在`application.properties`配置：

```properties
# 热部署生效
spring.devtools.restart.enabled=true
# 设置重启目录
spring.devtools.restart.additional-paths=src/main/java
# 设置哪些目录下内容修改不重启
spring.devtools.restart.additional-exclude=static/**
```

在设置中设置：

`文件-设置-构建、执行、部署-编译器-自动构建项目`

在注册表中勾选：

按`Ctrl+Shift+Alt+/`快捷键调出页面，点击注册表，勾选`compiler.automake.allow.when.app.running`复选框。

之后再重启服务，就可以自动构建

### 控制器

Spring Boot提供了`@Controller`和`@RestController`两种注解来标识此类负责接收和处理HTTP请求

如果请求的是`页面和数据`，使用`@Controller`注解

如果请求的是`数据`，则使用`@RestController`注解

### @RestController

==默认情况下，@RestController注解会将返回的对象数据转换为JSON格式==

```java
@RestController
public class controllerTest {

    @RequestMapping("/user")
    public User hello(){
        User user = new User();
        user.setName("zs");
        user.setPwd("123")
        return user;
    }
}
```

### 路由映射

`@RequestMapping`注解主要负责URL的路径映射，可以添加在Controller类或者方法上

如果添加在Controller类上，则这个控制类中所有的路由映射都会加上此映射规则，如果添加在方法上，则只对当前方法生效

`@RequestMapping`注解包含很多属性参数来定义HTTP的请求映射规则，常用的属性如下：

* `value`：请求URL的路径，支持URL模板、正则
* `method`：HTTP请求方法
* `consumes`：请求的媒体类型(Content-Type)
* `produces`：响应的媒体类型
* `params，headers`：请求的参数及请求头的值

![image-20221124090140143](D:\Typora\images\image-20221124090140143.png)

Method匹配

* HTTP请求Method有`GET、POST、PUT、DELETE`等方式，HTTP支持全部的Method
* `@RequestMapping`注解提供了method参数指定请求的Method类型，包括`RequestMethod.GET`、`RequestMethod.POST`、`RequestMethod.PUT`、`RequestMethod.DELETE`等，分别对应HTTP请求的Method
* Method匹配也可以用`@GetMapping`、`@PostMapping`

```java
@RequestMapping(value="/hello",method = RequestMethod.GET)
public String hello(){
    return "hello world!!!!!";
}
```

### 参数传递

==GET请求参数传递时：==

```java
//http://localhost:8080/hello?name=erickiku&pwd=123
@RequestMapping(value="/hello",method = RequestMethod.GET)
public String hello(String name,String pwd){
    return "hello" + name+ pwd;
}
```

参数和传递的参数不一致时：

`@RequestParam(value="name",required=false)`注解：

* value是对应的路径中的参数，如果只有value可以不写value，但是参数必须传递`@RequestParam("name")`
* required是指定该参数是否必须传递

路径参数是`name`，方法接收的参数是`username`时：

```java
//http://localhost:8080/test?name=erickiku
@RequestMapping(value = "/test",method = RequestMethod.GET)
public String test(@RequestParam(value = "name",required = false) String username){
    return "hello"+" "+username;
}
```

==POST请求参数传递时：==

```java
@RequestMapping(value = "/post1",method = RequestMethod.POST)
public String postTest1(String name,String pwd){
    return "Post请求"+" "+name+" "+pwd;
}
```

当参数特别多时：

可以使用封装对象方式

```java
public class User {
    private String name;
    private String pwd;  
    
    get与set和toString方法...
}
```

把对象作为方法的形参，需要注意`POST请求的请求体必须与对象中的属性完全一致`

```java
@RequestMapping(value = "/post2",method = RequestMethod.POST)
public String postTest2(User user){
    System.out.println(user);
    return "Post请求";
}
```

如果以JSON格式发送请求时，JSON中的键也必须对应对象的属性：

```java
@RequestMapping(value = "/post3",method = RequestMethod.POST)
public String postTest3(@RequestBody User user){
    System.out.println(user);
    return "Post请求";
}
```



### 静态资源

`src/resources/static/`目录下就是存放静态资源的地方。

只要存放在该目录下，就可以直接在根路径后加文件名：

​	如存放了一个`background.jpg`文件，访问就是：

>  	`http://localhost:8080/background1.jpg`

在`application.properties`中定义过滤规则和静态资源位置

```properties
# 过滤规则：
spring.mvc.static-path-pattern=/static/**
```

定义过滤规则之后，再想要访问图片资源，就需要加上定义的前缀

>  `http://localhost:8080/static/background1.jpg`



### 文件上传

==文件上传原理：==

* 表单的`enctype`属性规定在发送到服务器之前应该如何对表单的数据进行编码
* 当表单的`enctype="application/x-www-form-urlencoded"(默认)`时，form表单中数据的格式为`key=value&key=value`
* 当表单的`enctype="multipart/form-data"`时，传输形式如下
  普通字符串依然是是key=value。但是图片或文本文件是传输的文件名，类型，文本文件传输内容，图片传输二进制

==SpringBoot实现文件上传功能：==

* SpringBoot工程限制了请求文件的大小，每个文件配置最大为1MB，单次请求的文件总数不能大于10MB

* 需要修改配置，来修改这个默认的文件上传大小

  ```properties
  # 配置文件上传大小
  # 单个文件上传最大大小
  spring.servlet.multipart.max-file-size=10MB
  # 单次请求最大大小
  spring.servlet.multipart.max-request-size=10MB
  ```

* 当表单的`enctype="multipart/form-data"`时，可以使用`MultipartFile`获取上传的文件数据，再通过`transferTo`将其写入到磁盘中

==代码操作：==

先通过`Apipost`工具，发送`form-data`类型的数据，可以发送文件

==接口：==

接收文件的类型必须是`MultipartFile`

保存文件后，会在服务器运行的目录下存储文件

```java
@RestController
public class FileUploadController {

    @PostMapping("/upload")
    public String upload(String name, MultipartFile photo, HttpServletRequest request) throws IOException {
        System.out.println(name);
        //获取图片的原始名称
        System.out.println(photo.getOriginalFilename());
        //获取文件类型
        System.out.println(photo.getContentType());
        //获取web服务器的运行目录，动态获取
        String path = request.getServletContext().getRealPath("/upload/");
        System.out.println(path);
        saveFile(photo,path);
        return "上传成功";
    }
    
	//用于存储文件
    public void saveFile(MultipartFile photo,String path) throws IOException{
        //判断存储的目录是否存在，如果不存在再创建
        File dir = new File(path);
        if (!dir.exists()){
            //创建目录
            dir.mkdir();
        }
		
        File file = new File(path+photo.getOriginalFilename());
        photo.transferTo(file);

    }
}
```



### 拦截器

SpringBoot定义了`HandlerInterceptor`接口来实现自定义拦截器的功能

`HandlerInterceptor`接口定义了`preHandle`、`postHandle`、`afterCompletion`三种方法，通过重写这三种方法实现请求前，请求后等操作

在进入接口之前，调用`proHandle`方法，在接口调用完毕之后调用`postHandle`方法，等页面渲染完之后，最后调用`afterCompletion`方法

==拦截器定义：==

在`demo1/interceptor`文件包下创建一个拦截器类，一般以`Interceptor`结尾，实现`HandlerInterceptor`接口，重写其中的方法，这里只重写了`preHandle`方法。如果返回`true`则进入下一个拦截器或者直接执行接口，返回false后直接取消该次请求

```java
public class LoginInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        System.out.println("LoginInterceptor");
        return true;
    }
}
```

==拦截器注册==

在`demo1/config`目录下创建配置类`WebConfig`。实现`WebMvcConfigurer`接口，需要在类前加注解。重写`addInterceptors`方法，来增加拦截器。使用自带的`registry`参数的`.addInterceptor`方法，参数是拦截器对象，可以在最后添加一个方法`addPathPatterns`，来规定拦截哪些请求，如下`"/user/**"`表示只有请求路径是user下的接口时，才会拦截，否则无视

```java
//有了这个注解之后，springboot会自动读取这个类
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    //增加拦截器方法
    public void addInterceptors(InterceptorRegistry registry) {
        //registry.addInterceptor(new LoginInterceptor()).addPathPatterns("/user/**");
        registry.addInterceptor(new LoginInterceptor());

    }
}
```



### RESTful+Swagger

==RESTful的特点：==

* 客户端使用：GET用于获取资源，POST用于新建资源，PUT用于更新资源，DELETE用于删除资源
* 资源的表示形式是JSON或HTML
* 安全性：安全的方法被期望不会产生任何副作用，比如发送GET请求，只是获取资源，不会引起资源本身的改变，也不会引起服务器状态的改变
* 常见的RESTful风格
  ![image-20221124123230703](D:\Typora\images\image-20221124123230703.png)

==HTTP状态码：==

* HTTP定义了40个标准状态码，用于传达客户端请求的结果，状态码分为5个类别
* 1xx：信息，通过传输协议级信息
* 2xx：成功，表示客户端的请求已成功接收
* 3xx：重定向，表示客户端必须执行一些其他操作才能完成其请求
* 4xx：客户端错误，指客户端发生错误
* 5xx：服务器错误，指服务器发生错误
* ![image-20221124123551365](D:\Typora\images\image-20221124123551365.png)

==SpringBoot实现RESTful API==

* `@GetMapping`：处理GET请求，获取资源
* `@PostMapping`：处理POST请求，新增资源
* `@PutMapping`：处理PUT请求，更新资源
* `@DeleteMapping`：处理DELETE请求，删除资源
* `@PatchMapping`：处理PATCH请求，用于部分更新资源

==一些RESTful风格的接口：==

```java
@GetMapping("/user/{id}")
//获取大括号内的参数时，必须要加@PathVariable注解
public String getUserById(@PathVariable int id){
    System.out.println(id);
    return "getUserById";
}

@PostMapping("/user")
public String save(User user){
    return "添加用户";
}

@PutMapping("/user")
public String update(User user){
    return "更新用户";
}

@DeleteMapping("/user/{id}")
public String deleteById(@PathVariable int id){
    System.out.println(id);
    return "删除用户";
}
```



==Swagger==

* 一个规范和完整的框架，用于生成、描述、调用和可视化RESTful风格的Web服务，是非常流行的API表达工具
* Swagger能够自动生成完善的RESTful API文档，同时并根据后台代码的修改同步更新，同时提供完整的测试页面来调试API

==使用Swagger生成Web API文档：==

没看==



## MyBatisPlus

官方网站：[MyBatisPlus](https://baomidou.com/pages/24112f/)

### ORM

* ORM是为了解决面向对象与关系数据库存在的互不匹配现象的一种技术
* ORM通过使用描述对象和数据库之间映射的元数据将程序中的对象自动持久化到关系数据库中。
* ORM框架的本质是简化编程中操作数据库的编码

### MyBatis-Plus

* MyBatis是一个优秀的数据持久层ORM框架。
* MyBatis比较复杂，MyBatisPlus增强了Mybatis，简化了开发。

### CRUD注解

| 注解     | 功能                              |
| -------- | --------------------------------- |
| @Insert  | 插入                              |
| @Update  | 更新                              |
| @Delete  | 删除                              |
| @Select  | 查询                              |
| @Result  | 结果集封装                        |
| @Results | 与@Result一起使用，封装多个结果集 |
| @One     | 一对一结果集封装                  |
| @Many    | 一对多结果集封装                  |

==添加依赖==

```xml
<!--MybatisPlus依赖-->
<dependency>
    <groupId>com.baomidou</groupId>
    <artifactId>mybatis-plus-boot-starter</artifactId>
    <version>3.4.3.1</version>
</dependency>
<!--MySql驱动-->
<dependency>
    <groupId>mysql</groupId>
    <artifactId>mysql-connector-java</artifactId>
    <version>5.1.47</version>
</dependency>
<!--数据库连接池-->
<dependency>
    <groupId>com.alibaba</groupId>
    <artifactId>druid-spring-boot-starter</artifactId>
    <version>1.1.20</version>
</dependency>
```

==配置数据库信息==

```properties
# 配置数据库配置
spring.datasource.type=com.alibaba.druid.pool.DruidDataSource
spring.datasource.driver-class-name=com.mysql.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/mydb?useSSL=false&characterEncoding=utf8
spring.datasource.username=root
spring.datasource.password=123456
mybatis-plus.configuration.log-impl=org.apache.ibatis.logging.stdout.StdOutImpl
```

==添加@MapperScan注解==

对数据库的操作的类都放在mapper文件夹下

```java
@SpringBootApplication
//必须添加配置，让spring扫描到mapper文件夹
@MapperScan("xyz.erickiku.demo2.mapper")
public class Demo2Application {

    public static void main(String[] args) {
        SpringApplication.run(Demo2Application.class, args);
    }

}
```

### 使用

创建`mapper`文件夹：`xyz.erickiku.demo2.mapper`

==创建`UserMapper`接口==

继承BaseMapper，无须写任何SQL语句，MyBatisPlus自带很多SQL语句，可以按Ctrl+BaseMapper查看

```java
//继承BaseMapper是MybatisPlus的功能
@Mapper
public interface UserMapper extends BaseMapper<User> {
	
}
```

==创建User类==

默认类的名字就是表名，类里的所有属性都是与表字段一一对应，可以使用MybatisPlus的注解来标识一些特殊的属性：[MybatisPlus注解](https://baomidou.com/pages/223848/#tablename)

```java
public class User {
    private String id;
    private String username;
    private String password;
	
	get/set/toString...
}
```

==创建Controller类==

需要先注入userMapper类，无须实例化对象，使用注解`@Autowired`

之后直接使用userMapper中的MybatisPlus定义的SQL接口就可以了

```java
@RestController
public class UserController {

    //自动注入UserMapper实例对象，不需要自己new
    @Autowired
    private UserMapper userMapper;

    @GetMapping("/user")
    public List query(){
        List<User> list = userMapper.selectList(null);
        System.out.println(list);
        return list;
    }
    @PostMapping("/user1")
    public String insert(User user){
        int i = userMapper.insert(user);
        if (i > 0){
            return "插入成功";
        }else{
            return "插入失败";
        }
    }

}
```



### 多表查询

实现复杂关系映射时，可以使用`@Results`、`@Result`、`@One`、`@Many`注解组合完成复杂关系配置，这些是由Mybatis提供，Plus只对单表查询做了增强

例如有两张表：`user和order`

想要通过`user`的`id`去查询所有该`id`的`order`数据，则是`一对多`查询

1. 在userMapper中写SQL语句：
   由于Plus不能直接多表查询，所以还是需要手写SQL
   第一部分是先查询所有用户，第二部分是封装结果集
   `column`对应表中字段，`property`对应类中属性名，意思是类中的属性映射哪个字段值，最后一个是用id去映射User类中的`orders`属性，user表中没有该属性，
   映射类型是List，结果是`many`，意思是一对多关系，一个id对应多个order属性，
   使用@Many使用SQL语句，调用的SQL是另一个Mapper中的SQL，参数会直接使用`column`指定的字段值

   ```java
   @Select("select * from user")
   @Results({
       @Result(column = "id",property = "id"),
       @Result(column = "username",property = "username"),
       @Result(column = "password",property = "password"),
       @Result(column = "id",property = "orders",javaType = List.class,
               many = @Many(select = "xyz.erickiku.demo2.mapper.OrderMapper.selectByUid")
              ),
   })
   List<User> selectAllUserAndOrder();
   ```

2. 在User类中添加新的属性orders
   该注解只有Plus才认识，MyBatis不认识。记得给orders添加get和set方法

   ```java
   //该字段表中没有
   @TableField(exist = false)
   private List<Order> orders;
   ```

3. 创建`OrderMapper`接口
   该接口就是查询所有对应id的订单，由于order是关键字，所以用``包裹

   ```java
   @Mapper
   public interface OrderMapper extends BaseMapper<Order> {
   
       //这个查询是给userMapper中的查询所有用户及订单的sql语句调用
       @Select("select * from `order` where uid = #{uid}")
       List<Order> selectByUid(int uid);
   }
   ```

4. 最后调用UserMapper中的`selectAllUserAndOrder`方法即可查询出对应id的订单

### 条件查询

实例化对象`QueryWapper`，然后使用方法eq，来创建一个条件，参数是键和值。

作为查询方法的参数，可以当做查询条件

```java
@GetMapping("/order")
public List<Order> query1(){
    QueryWapper<User> queryWapper = new QueryWapper();
    queryWapper.eq("username","zhangsan");
    List<Order> orders = orderMapper.selectList(queryWapper);
    return orders;
}
```



### 分页查询

新建配置文件`MyBatisPlusConfig`

```java
@Configuration
public class MyBatisPlusConfig {

    @Bean
    public MybatisPlusInterceptor paginationInterceptor(){
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        PaginationInnerInterceptor paginationInnerInterceptor = new PaginationInnerInterceptor(DbType.MYSQL);
        interceptor.addInnerInterceptor(paginationInnerInterceptor);
        return interceptor;
    }
}
```

在控制层：

实例化Page对象，参数是起始值和每页条数

然后像代码一样就可以了。

返回的结果并不只有数据，还有总共多少数据，总共多少页，当前是第几页等信息

```java
@GetMapping("/user/findByPage")
public IPage findByPage(){
    //    设置起始值，以及每页条数
    Page<User> page = new Page<>(2,2);
    IPage iPage = userMapper.selectPage(page,null);
    return iPage;
}
```





# 前端

Vue...

## MockJS

### 介绍

* 一款前端开发中拦截AJAX请求再生成随机数据响应的工具，可以用来模拟服务器响应

* 非常简单方便，无侵入性，基本覆盖常用的所有接口

* 支持生成随机的文本，数字，布尔值，日期，邮箱，链接，图片，颜色等。

* 安装：

  ```
  npm install mockjs
  ```

### 核心方法

`Mock.mock(rurl,rtype,template|function(options))`

* rurl,表示需要拦截的URL，可正则

* rtype,表示拦截的Ajax请求类型，不写就是全部

* template，返回的数据，对象或字符串

* function，表示用函数生成数据

* ```js
  //延时400s返回数据
  Mock.setup({
      timeout:400
  })
  //延时200-600s
  Mock.setup({
      timeout:'200-600'
  })
  ```



### 使用

创建`src/mock/index.js`

```js
import Mock from 'mockjs'

Mock.setup({
    timeout:1000
})
Mock.mock('/user',{
    "ret":0,
    "data":{
        "mime":"@datetime",//随机生成日期
        "score|1-800":1,//随机生成1-800数字
        "rank|1-100":1,
        "start|1-5":1,
        "nicename":"@cname",
        //图片，大小，背景颜色，前景颜色，格式，文字
        "img":"@image('200x100','#ffcc33','#FFF','png','Fast Mock')"
    }
});
```

`main.js`

```js
import './mock/index'
```

发送请求：

```js
axios.get("/user")
    .then(res=>{
    console.log(res);
})
```



## vue-element-admin

[官网](https://panjiachen.github.io/vue-element-admin-site/zh/guide/#%E5%8A%9F%E8%83%BD)

[基础模板官网](https://gitee.com/panjiachen/vue-admin-template)



# JWT跨域认证

视频：[BILIBILI视频](https://www.bilibili.com/video/BV1nV4y1s7ZN?p=16&vd_source=4826e78be6a985a9a8641312e495221e)





# 部署

https://www.cnblogs.com/gulugulul/p/13151993.html

https://www.cnblogs.com/onepunchstar/p/13190877.html

https://www.jianshu.com/p/af90db4b54e3
