---
title: SpringMVC
icon: bxl-spring-boot
category:
  - 后端
tag:
  - Spring
---
# ""


# SpringMVC

## 	1.创建maven项目

## 	2.在pom.xml中写入springMVc依赖

```java
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>

    <groupId>com.atguigu</groupId>
    <artifactId>springMVC-demo1</artifactId>
    <version>1.0-SNAPSHOT</version>
    
    <packaging>war</packaging>


    <dependencies>
<!--        SpringMVC-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>5.3.9</version>
        </dependency>

<!--        日志-->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-core</artifactId>
            <version>1.2.5</version>
        </dependency>
<!--        ServletAPI-->
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>4.0.1</version>
            <scope>provided</scope>
        </dependency>
<!--        Spring5和Thymeleaf整合包-->
        <dependency>
            <groupId>org.thymeleaf</groupId>
            <artifactId>thymeleaf-spring5</artifactId>
            <version>3.0.12.RELEASE</version>
        </dependency>
    </dependencies>



    <properties>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

</project>
```

## 3.在web.xml文件中配置前端控制器

```java
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">
<!--     配置springMVC的前端控制器，对浏览器发送的请求进行统一处理-->
    <servlet>
        <servlet-name>SpringMVC</servlet-name>
        <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
        <init-param>
            <param-name>contextConfigLocation</param-name>
            <param-value>classpath:springMVC.xml</param-value>
        </init-param>
        <load-on-startup>1</load-on-startup>
    </servlet>
    <servlet-mapping>
        <servlet-name>SpringMVC</servlet-name>
        <url-pattern>/</url-pattern>
    </servlet-mapping>

</web-app>
```

## 4.在resources文件下新建springMVC.xml的springMVC配置文件

```java
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd http://www.springframework.org/schema/context https://www.springframework.org/schema/context/spring-context.xsd">

    <!--扫描控制层组件-->
    <context:component-scan base-package="com.atguigu.mvc.controller"></context:component-scan>

    <!-- 配置Thymeleaf视图解析器 -->
    <bean id="viewResolver" class="org.thymeleaf.spring5.view.ThymeleafViewResolver">
        <property name="order" value="1"/>
        <property name="characterEncoding" value="UTF-8"/>
        <property name="templateEngine">
            <bean class="org.thymeleaf.spring5.SpringTemplateEngine">
                <property name="templateResolver">
                    <bean class="org.thymeleaf.spring5.templateresolver.SpringResourceTemplateResolver">
                        <!-- 视图前缀 -->
                        <property name="prefix" value="/WEB-INF/templates/"/>
                        <!-- 视图后缀 -->
                        <property name="suffix" value=".html"/>
                        <property name="templateMode" value="HTML5"/>
                        <property name="characterEncoding" value="UTF-8" />
                    </bean>
                </property>
            </bean>
        </property>
    </bean>

</beans>
```



## 5.创建控制器类

```java
@Controller
public class HelloController {
   @RequestMapping(value ="/")
    public String index(){
        return "index";
    }
    
    @RequestMapping(value="/")
    public String toTarget(){
        return "target";
    }
}

```

#### 	HTML页面:

```java
<body>
<h1>首页</h1>
<a th:href="@{/target}">访问指定页面target.html</a>
</body>
```

> 通过th:交给thymeleaf处理，响应控制类里的方法，最终实现跳转

## 6.注解

### 	@RequestMapping注解

#### 			1.就是将请求和处理请求的控制器方法关联起来，建立映射关系

#### 			2.注解的位置

##### 					(1)@RequestMapping标识一个类：设置映射请求的请求路径的初始信息

##### 					(2)@RequestMapping标识一个方法：设置映射请求请求路径的具体信息

​						标识一个类时，使用thymeleaf函数时需要：

> ​	th:href="@{/hello/testRequestMapping}"

```java
@Controller
@RequestMapping("/hello")
public class RequestMappingController {

    @RequestMapping("/testRequestMapping")
    public String success(){
        return "success";
    }

}
```

#### 3.@RequestMapping注解的Value值

##### ①：通过请求的请求地址匹配请求映射

##### ②：一个字符串类型的数组，表示该映射能够匹配多个请求地址

​		两个跳转方法都可以调用同一个方法

##### ③：value属性必须设置，至少通过请求地址匹配请求映射

```html
HTML:
<a th:href="@{/testRequestMapping}">测试RequestMapping注解的Value值:->/testRequestMapping</a>
<a th:href="@{/test}">测试RequestMapping注解的Value值:->/test</a>
```

```java
java:
@Controller
//@RequestMapping("/hello")
public class RequestMappingController {

    @RequestMapping(
            value = {"/testRequestMapping","/test"}
    )
    public String success(){
        return "success";
    }

}
```

#### 4.@RequestMapping注解的method属性

@RequestMapping注解的method通过请求方式(get/post)匹配请求映射

@RequestMapping注解的method属性是一个RequestMethod类型的数组，表示该请求映射可以匹配多种方式的请求

> 如果请求满足value值，不满足method值，报405错误

不写就是不以method请求

> 处理get请求的映射->@GetMapping(value="").	只有value一个属性value可不写，下同
>
> 处理post请求的映射->@PostMapping(value="")
>
> 处理put请求的映射->@PutMapping(value="")
>
> 处理delete请求的映射->@DeleteMapping(value="")

注：form表单的method方法默认以get或post方法发出请求，如果不是get或post，按get请求

#### 5.@RequestMapping注解的params属性

​	1.通过请求的参数匹配映射

​	2.是字符串数组，可以写多个条件，拥有四种表达式

> param:要求必须带param参数
>
> !param:要求不能待param参数
>
> param=value:要求必须带param参数，切值必须是value
>
> param!=value：不能等于value的param参数
>
> 代码：

```html
<a th:href="@{/testParams(username='admin',password=123)}">测试RequestMapping注解的Params属性</a>
```

```java
	@RequestMapping(
            value = "/testParams",
            params = {"username","password=123"}
    )
    public String testParams(){
        return "success";
    }
```



#### 6.@RequestMapping注解的headers属性

​		1.通过请求头信息匹配映射

​		2.是一个字符串数组，可以有四种表达式

> header:要求请求映射的请求必须携带header请求头信息
>
> !header:要求请求映射的请求必须不携带header请求头信息
>
> header=value:要求请求映射的请求必须携带header请求头信息,切值是value
>
> header!=value:要求请求映射的请求必须携带header请求头信息,切值不能等于value
>
> 注：如果请求满足value和method，而不满足header，则404错误

## 7.SpringMVC支持ant风格的路径

> ? :代表任意的单个字符
>
> *:代表任意的0或多个字符
>
> **:代表任意的一层或多层目录

![image-20220328140029816](/assets/images/image-20220328140029816.png)

## 8.SpringMVC支持路径中的占位符

​		通过@PathVariable注解，将占位符所表示的数据赋值给控制器方法的形参

```html
<a th:href="@{/testPath/1}">测试占位符</a>
```

```java
@RequestMapping("/testPath/{id}")
    public String testPath(@PathVariable("id")Integer id){
        System.out.println(id);
        return "success";
    }
```

## 9.SpringMVC获取请求参数

### 	1.通过ServletAPI获取

```html
<a th:href="@{/testServletAPI(username='admin',password=123456)}">测试使用ServletAPI获取请求对象</a>
```

```java
@RequestMapping("/testServletAPI")
    public String testServletAPI(HttpServletRequest request){
        String username = request.getParameter("username");
        String password = request.getParameter("password");
        System.out.println("username:"+username+",password:"+password);
        return "success";
    }
```

### 	2.通过控制器获取

​	==若形参表单提交的name属性相对应，即可获取到此参数==

```java
@RequestMapping("/testParam")
    //若请求参数中出现多个同名的请求参数，可以在控制器方法的形参位置设置字符串类型或字符串数组来接收此参数
    //若使用字符串类型的形参，最终结果为请求参数的每一个值之间使用逗号进行拼接
    public String testParam(
            String username,
            String password,
            String[] hobby){
        System.out.println("username:"+username+",password:"+password+",hobby:"+ Arrays.toString(hobby));
        return "success";
    }
```

```html
<form th:action="@{/testParam}" method="get">
    用户名:<input type="text" name="username"><br>
    密码:<input type="password" name="password"></br>
    爱好:<input type="checkbox" name="hobby" value="a">a
    <input type="checkbox" name="hobby" value="b">b
    <input type="checkbox" name="hobby" value="c">c</br>
    <input type="submit" value="测试使用控制器形参获取请求参数">
</form>
```

#### @RequestParam

将请求参数和控制器方法的形参创建映射

一共有三个属性:

> value:指定为形参赋值的请求参数的参数名
>
> required：设置	是否必须传输此参数，默认值是true
>
> defaultValue:不管required属性是false或true，当value所指定的请求参数没有传输时，则使用默认值为形参赋值
>
> 代码:

```java
@RequestMapping("/testParam")
    //若请求参数中出现多个同名的请求参数，可以在控制器方法的形参位置设置字符串类型或字符串数组来接收此参数
    //若使用字符串类型的形参，最终结果为请求参数的每一个值之间使用逗号进行拼接
    public String testParam(
            @RequestParam(value = "username" ,required = false,defaultValue = "you don't send the value....")String username,
            String password,
            String[] hobby){
        System.out.println("username:"+username+",password:"+password+",hobby:"+ Arrays.toString(hobby));
        return "success";
    }
```

#### @RequestHeader

@RequestHeader是将请求头信息和控制器方法的形参创建映射关系

@RequestHeader注解一共有三个属性：value、required、defaultValue，用法同@RequestParam

#### 5、@CookieValue

@CookieValue是将cookie数据和控制器方法的形参创建映射关系

@CookieValue注解一共有三个属性：value、required、defaultValue，用法同@RequestParam
