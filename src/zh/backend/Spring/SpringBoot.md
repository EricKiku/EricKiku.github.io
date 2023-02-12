---
title: SpringBoot
icon: bxl-spring-boot
category:
  - 后端
tag:
  - Spring
  - Java
---
# ""


### 创建一个springboot项目

SpringBoot

1.新建一个空项目

在项目中新建模块 Spring Initializr



2.选择依赖

Web->Spring Web



注:idea下载spring boot模板失败时，用这个网站:

> https://start.springboot.io

### 配置文件

application.properties是springboot配置文件

如

```properties
#设置内嵌Tomcat端口号
server.port=8081
#设置上下文根
server.servlet.context-path=/springboot
```

application.yml和application.yaml也是springboot核心配置文件，只是和上述的格式不同

以制表符为父子关系，下一行就是被上一行所包含。server就是port和servlet的根

```yaml
server:
  port: 8081
  servlet:
    context-path: /springboot
```

> yml 和 properties仅仅是代码格式不一样
>
> 这两种配置文件只需写一种即可

### 多环境的开发

有多个环境，为每个过程创建一个配置文件是，并在主配置文件中配置使用哪个配置文件

开发：application-dev.properties

```properties
#开发环境配置文件
server.port=8080
server.servlet.context-path=/dev
```

测试：application-test.properties

```properties
#测试环境的配置文件
server.port=8081
server.servlet.context-path=/test
```

准生产：application-ready.properties

```properties
#准生产环境配置文件
server.port=8082
server.servlet.context-path=/ready
```

生产：application-product.properties

```properties
#生产环境配置文件
server.port=8083
server.servlet.context-path=/product
```

核心配置文件:application.properties

```properties
#springboot主核心配置文件
#激活使用的配置文件
spring.profiles.active=dev 
```

> 后面参数是哪个，就执行哪个配置文件，不写application

### 自定义配置参数：

在properties配置文件中，可以自定义配置：

```properties
#springboot主核心配置文件
#激活使用的配置文件
spring.profiles.active=dev

eric.name=EricKiku
eric.age=18
```

> 上面是官方参数
>
> 下面两个是自定义的，无法解析

但是可以在其他地方使用@Value注解来获取这个配置的值

```java
@Value("${eric.name}")
private String ericName;
@Value("${eric.age}")
private String ericAge;
```

### springboot集成jsp

首先在main目录下新建webapp目录并且设置为web资源

在pom依赖中添加依赖

```xml
<dependency>
            <groupId>org.apache.tomcat.embed</groupId>
            <artifactId>tomcat-embed-jasper</artifactId>
</dependency>
```

然后在`<build>`标签中添加资源定位

```xml
<!--如果想要在springboot中集成jsp
            需要使用springboot规定的路径
            META-INF/resources
        -->
        <resources>
            <resource>
                <!--源文件夹-->
                <directory>src/main/webapp</directory>
                <!--指定编译到META-INF/rescources中-->
                <targetPath>META-INF/resources</targetPath>
                <!--指定源文件夹中的哪些资源-->
                <includes>
                    <!--所有-->
                    <include>*.*</include>
                </includes>
            </resource>
        </resources>
```

在资源文件中配置视图解析器

```properties
#配置视图解析器
spring.mvc.view.prefix=/
spring.mvc.view.suffix=.jsp
```

### 集成MyBatis

在pom中导入MySQL驱动,版本由其爷爷级管理

```xml
<!--MySQL驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
        </dependency>
```

导入mybatis依赖

```xml
<!--mybatis整合springboot框架的起步依赖-->
        <dependency>
            <groupId>org.mybatis.spring.boot</groupId>
            <artifactId>mybatis-spring-boot-starter</artifactId>
            <version>2.2.2</version>
        </dependency>
```

#### Mybatis逆向工程,逆向生成model,mapper,目录文件

先创建一个在根目录下的文件GeneratorMapper.xml

需要修改一下其中的数据库参数

需要修改一下三个生成文件的targetPackage和targetProject的路径

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE generatorConfiguration PUBLIC "-//mybatis.org//DTD MyBatis Generator Configuration 1.0//EN" "http://mybatis.org/dtd/mybatis-generator-config_1_0.dtd">
<generatorConfiguration>
    <!--指定连接数据库的JDBC驱动包所在位置-->
    <classPathEntry location="D:\Spring\jar包\mysql-connector-java-8.0.28.jar"/>
    <context id="DB2Tables" targetRuntime="MyBatis3">
        <commentGenerator>
            <!-- 是否去除自动生成的注释 -->
            <property name="suppressAllComments" value="true" />
        </commentGenerator>
        <!-- Mysql数据库连接的信息：驱动类、连接地址、用户名、密码 -->
        <jdbcConnection driverClass="com.mysql.jdbc.Driver"
                        connectionURL="jdbc:mysql://localhost:3306/springboot"
                        userId="root"
                        password="123456" />
        <!-- 默认为false，把JDBC DECIMAL 和NUMERIC类型解析为Integer，为true时 把JDBC DECIMAL 和NUMERIC类型解析为java.math.BigDecimal -->
        <javaTypeResolver>
            <property name="forceBigDecimals" value="false" />
        </javaTypeResolver>
        <!-- targetProject：生成POJO类的位置 -->
        <javaModelGenerator
                targetPackage="com.eric.springboot.model" targetProject="src/main/java">
            <!-- enableSubPackages:是否让schema作为包的后缀 -->
            <property name="enableSubPackages" value="false" />
            <!-- 从数据库返回的值被清理前后的空格 -->
            <property name="trimStrings" value="true" />
        </javaModelGenerator>
        <!-- targetProject：mapper映射文件生成的位置 -->
        <sqlMapGenerator targetPackage="com.eric.springboot.mapper"
                         targetProject="src/main/java">
            <!-- enableSubPackages:是否让schema作为包的后缀 -->
            <property name="enableSubPackages" value="false" />
        </sqlMapGenerator>
        <!-- targetProject：mapper接口生成的的位置 -->
        <javaClientGenerator type="XMLMAPPER"
                             targetPackage="com.eric.springboot.mapper" targetProject="src/main/java">
            <!-- enableSubPackages:是否让schema作为包的后缀 -->
            <property name="enableSubPackages" value="false" />
        </javaClientGenerator>
        <!-- 指定数据表 -->
        <table tableName="student" domainObjectName="Student"></table>
    </context>
</generatorConfiguration>
```

再添加一个插件

```xml
<plugin>
                <groupId>org.mybatis.generator</groupId>
                <artifactId>mybatis-generator-maven-plugin</artifactId>
                <version>1.3.6</version>
                <configuration>
                    <!--配置文件的位置-->
                    <configurationFile>GeneratorMapper.xml</configurationFile>
                    <verbose>true</verbose>
                    <overwrite>true</overwrite>
                </configuration>
            </plugin>
```

> 最后运行项目maven仓库的插件的mybatis-generator:generate插件，双击

#### 新建service层目录

控制层要加@Controller注解，service的实现类impl要加@Service注解,Mapper层要加@Mapper注解

> Mapper注解也可以写在启动类上@MapperScan(basePackages="")后面是mapper的包路径.
>
> > basePackages可以省略

在控制层自动注入Service层，调用service层中的方法，service的实现类中自动注入Mapper层，调用Mapper层的方法

#### 再配置springboot核心配置文件中的数据库

```properties
#设置连接数据库的配置
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/springboot?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT
spring.datasource.username=root
spring.datasource.password=123456
```

> 通常会报一个错，因为java目录并不是静态资源文件，所以java目录下的xml文件总是不被解析到，应该手动添加一个资源指定目录

#### 在pom.xml文件中的`<build>`标签中

```xml
<!--手动指定文件夹为resources-->
        <resources>
            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.xml</include>
                </includes>
            </resource>
        </resources>
```

如果不想使用上述方法，也可以直接把Mapper.xml文件放在static目录下的mapper目录下，但是，必须在核心配置中添加代码	

```properties
mybatis.mapper-locations=classpath:mapper/*.xml
```

#### 事务

在真正执行mapper中的sql语句的方法中，也就是impl类的方法中，给方法一个注解@Transactional,就可以自动生成事务，在方法报错或异常时会回滚事务 	

### springboot中springmvc注解

在控制层中，不再用==@Controller==注解，而是用==@RestController==注解，这样，类中的所有方法均为返回json对象，无须再每个方法注解@ResponseBody

在方法上添加@GetMapping注解，无须再写@RequestMapping注解，此注解代表该方法只能接收get请求

```java
@GetMapping(value="")
用来查询时使用
```

> 或者@PostMapping		新增时使用
>
> @DeleteMapping		删除时使用
>
> @PutMapping		修改时使用

### RESTful风格

传入参数时，风格有所变化,{id}代表路径中的这个位置的参数将会赋值给id,

在方法形参中，==@PathVariable("id")	Integer id==	代表获取路径中的id赋值给后面的变量id

```java
@RequestMapping(value = "/student/{id}/{age}")
    public Object student(@PathVariable("id") Integer id,@PathVariable("age") Integer age){
        Student student = new Student();
        student.setId(id);
        student.setAge(age);
        return student;
    }
```

### springboot集成Redis

导入依赖

```xml
<!--springboot集成Redis的起步依赖 -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-redis</artifactId>
        </dependency>
```

### Thymeleaf

在html代码中的html代码行添加

```html
xmlns:th="http://www.thymeleaf.org"
```

即可使用 th:

#### 标准表达式:

用于访问容器中tomcat中上下文环境中的变量

==${}==

#### 选择变量表达式

==*{}==

在div子标签中使用*{}来代替绑定的对象

```html
<div th:object="{user}">
    <span th:text="*{id}"></span>
</div>
```

#### 路径表达式

==<a th:href="@{/user/detail}"></a>==

相对路径，带参数

静态:

```html
<a th:href="@{/test?username=zhangsai}"
```

动态:动态的获取id值

```html
<a th:href="@{'/test?username='+${id}}"
```

多个参数:

```html
<a th:href="@{/test(id=${id},username=${username})}"></a>
```

#### 常见属性:

th:each

##### List集合:

```java
@RequestMapping(value = "/students/student")
    public ModelAndView getStudent(){
        List<Student> students = new LinkedList<>();
        Student student = new Student();
        student.setId(1);
        student.setName("全栈学习笔记");
        student.setAge(21);
        Student student1 = new Student();
        student1.setId(2);
        student1.setName("张三");
        student1.setAge(22);
        students.add(student);
        students.add(student1);
        ModelAndView modelAndView = new ModelAndView();
        modelAndView.addObject("students",students);
        modelAndView.setViewName("students");
        return modelAndView;
    }
```



th:each="user,student:${students}"

user是别名,用来获取参数的键,student是实例名用来获取数组固有的属性，如index索引号,${students}是传输过来的数组数据

```html
<tr th:each="student:${students}">
        <td th:text="${student.id}"></td>
        <td th:text="${student.name}"></td>
        <td th:text="${student.age}"></td>
</tr>
```

##### Map集合

```html
<tr th:each="student:${students}">
        <td th:text="${student.key}"></td>
        <td th:text="${student.value}"></td>
        <td th:text="${student.value.id}"></td>
        <td th:text="${student.value.name}"></td>
        <td th:text="${student.value.age}"></td>
</tr>
```

#### 条件判断if

##### th:if="${ 条件表达式 	}"

满足条件的才会渲染，不满足的不会选

##### th:unless="${ 条件表达式 }"

用法与th:if相反

##### th:switch/th:case

```html
<div th:switch="${productType}">
    <span th:case="0">为0</span>
    <span th:case="1">为1</span>
    <span th:case="2">为2</span>
    <span th:case="*">为*</span>
</div>
```

#### 内敛文本

##### th:inline="text"

使用[[${data}]]	来获取数据，可在th:inline="text"中的div中写，也可以在div外写

```html
<div th:inline="text">
    数据:	[[${data}]]
</div>
```

#### 内敛脚本

##### th:inline="javascript"

使用内敛脚本就可以在函数中获取后台传输过来的参数，默认不可以

```html
<script type="text/javascript" th:inline="javascript">
	function showData(){
        alert([[${data}]]);
    }
</script>
```

#### 字符串拼接

可以在text中使用==||==来拼接字符串，可以直接在字符串中插入${}值，不用使用"+"号

```html
<span th:text="|一共${Total}条数据,当前是第${page}页|"></span>
```

#### 运算符

可以直接在text属性中写计算式子

```html
<span th:text="20+5"></span>
```

关系运算符中

```
gt、lt、ge、le、eq、ne
分别表示为
>、<、>=、<=、==、!=
```
