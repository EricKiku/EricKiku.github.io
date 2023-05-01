---
title: Gin
icon: golang1
category:
  - 后端
  - 框架
tag:
  - Golang
  - Gin
---

## Gin安装使用

Gin是一个golang的微框架，封装优雅，API友好，源代码比较明确。具有快速灵活、容错方便等特点。其实对于golang而言，web框架的依赖远比Python。Java之类的要小。自身的net/http足够简单，性能也不错。借助框架开发，可以省去封装的时间，也有助于统一编码风格。

Gin官方文档：https://gin-gonic.com/zh-cn/docs/

安装：

```powershell
$ go get -u github.com/gin-gonic/gin
```



如果爆红的解决方法：

Goland：File->Settings->Go->Go Modules

其中的Environment中把go env中的代理路径添入，去掉 后缀,direct

## Gin热加载

安装

```powershell
go get github.com/pilu/fresh
```

使用

```powershell
## 不再使用 go run 来启动项目
## 使用fresh来启动项目
fresh
```





## 实例代码

可以使用`gin.Default()`创建一个带有`Logger()和Recovery()`两个中间件的默认路由。也可以使用`gin.New()`创建一个什么都没有的路由。建议第一个

```go
import "github.com/gin-gonic/gin"

func main() {
	// 创建一个服务
	ginServer := gin.Default()

	//访问地址，处理请求，Request，Response
	ginServer.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// 服务器端口
	ginServer.Run(":8080") // 监听并在 0.0.0.0:8080 上启动服务
}
```

现在就开起了 一个服务，端口号是8080，可以访问`localhost:8080/ping`。

*gin.Context 的 c.JSON 可以返回一个json对象给客户端

除了JSOn还可以返回多种格式的数据



#### 设置网页favicon

导入包

`go get "github.com/thinkerou/favicon"`



```go
import "github.com/thinkerou/favicon"
...
ginServer.Use(favicon.New("./favicon.ico"))
```



## 返回数据

`JSON`：

```go
c.JSON(200,map[string]interface{}{
    "key":"value"
})

c.JSON(200,gin.H{
    "key":"value"
})

// 传递结构体实例
group.GET("/query", func(context *gin.Context) {
    var user = &User{UserId: "001", UserName: "Eric", UserPassword: "213055"}

    context.JSON(http.StatusOK, user)
})
```

`String`：

```go
c.String(200,"")
```





## RestFul 风格

Gin也支持`Get、Post、Put、Delete`请求





## 接收参数

#### GET请求接收参数：

```go
ginServer.GET("/ping", func(c *gin.Context) {
    value := c.Query("pingid")
    c.String(http.StatusOK, value)
})
```

使用`c.Query("")`就可以拿到客户端传输的params参数

可以使用`c.DefaultQuery("","value")`来设置如果没有参数的时候的默认值



#### POST请求接收参数：

```go
ginServer.POST("/ping", func(context *gin.Context) {
    // 序列化参数
    // 先接收参数
    data, _ := context.GetRawData()
    // 定义一个map容器
    var m map[string]interface{}
    _ = json.Unmarshal(data, &m)

    context.JSON(http.StatusOK, m)
})
```

> 接收表单提交的参数可以用：`context.PostForm("")`参数是表单标签上的name值，或者`context.DefaulPostForm("")`



#### 参数绑定到结构体上

**使用`GET`请求并且传递`params`参数时：**

1. 定义一个结构体。有属性名和类型。还有一个模板字符串
   `form:"..." json:"..."`
   form 后的参数是要把接受的参数中哪个键绑定到这个属性上
   json 后的参数是返回的时候，结果以什么格式返回
2. 在GET请求中定义实例`user := &User{}`
3. 使用`context.ShouldBind(user)`，有返回值。来把参数和结构体绑定
4. 最后再返回该结构体

```go
// 首先得有一个结构体
type User struct {
	UserId       string `form:"userId" json:"user_-id"`
	UserName     string `form:"userName" json:"user_-name"`
	UserPassword string `form:"userPassword" json:"user_-password"`
}
......
ginServer.GET("/ping", func(context *gin.Context) {
    user := &User{}
    err := context.ShouldBind(user)
    if err != nil {
        fmt.Print(err)
    }
    context.JSON(http.StatusOK, user)
})
```

返回结果：

```json
{
    "user_-id": "001",
    "user_-name": "eric",
    "user_-password": "213055"
}
```



**使用`POST`请求且传递参数时：**

和GET请求的方法一模一样

请求的方式是 使用`form-data`  表单传递



## 路由

#### 重定向

把页面重定向到某个页面

```go
ginServer.GET("/red", func(context *gin.Context) {
    context.Redirect(301, "http://www.erickiku.top:8888")
})
```



404页面

没有匹配的路由就转到指定的页面，一般转到404页面

```go
ginServer.NoRoute(func(context *gin.Context) {
    context.Redirect(http.StatusMovedPermanently, "http://www.erickiku.top:8888")
})
```



#### 路由组

使用路由组可以区分路由前缀

下面定义了两个路由组，组中的API访问时需要带上组的路径：`/user/add`

```go
//路由组
group := ginServer.Group("/user")
{
    group.GET("/add")
    group.GET("/delete")
    group.GET("/query")
}

orderGroup := ginServer.Group("/order")
{
    orderGroup.GET("/add")
    orderGroup.GET("/delete")
    orderGroup.GET("/query")
}
```



## 路由器文件抽离

先给路由分组，再把路由分组抽离到另一个单独的文件里

在main.go中调用路由文件夹中的某个首字母大写的方法。就相当于抽离了路由文件。



## 项目结构

**首先有一个`controller`层，在文件夹下为每个路由创建controller**

例如：

`controller/userController.go`

```go
package controller

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

func UserQuery(context *gin.Context) {

	context.JSON(http.StatusOK, gin.H{"msg": "userquery"})
}

func UserDelete(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"msg": "userdelete"})
}

func UserAdd(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"msg": "userAdd"})
}
```



**再有一个`routers`层**

为每个不同的请求配置请求接口

并且在每一个路由的回调函数中使用controller中定义的函数

`routers/userRouter.go`

```go
package routers

import (
	"ginpro/controller"
	"github.com/gin-gonic/gin"
)

func UserRouter(ginServer *gin.Engine) {
	group := ginServer.Group("/user")

	group.GET("/query", controller.UserQuery)
	group.GET("/delete", controller.UserDelete)
	group.GET("/add", controller.UserAdd)
}
```



再就是应用层`main.go`，注册路由即可

```go
func main() {
	// 创建一个服务
	ginServer := gin.Default()
	ginServer.Use(favicon.New("./favicon.ico"))
	//routers 包
	routers.UserRouter(ginServer)

	// 服务器端口
	ginServer.Run(":8080") // 监听并在 0.0.0.0:8080 上启动服务
}
```



总结就是：main.go调用 routers包里的函数，router包里的.go文件调用controller包里的函数，controller里的文件调用dao包里的文件去查询数据库



**Controller层里的代码可以使用结构体**

```go
type UserController struct{}

func (user UserController) Query(context *gin.Context) {

	context.JSON(http.StatusOK, gin.H{"msg": "userquery"})
}

func (user UserController) Delete(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"msg": "userdelete"})
}

func (user UserController) Add(context *gin.Context) {
	context.JSON(http.StatusOK, gin.H{"msg": "userAdd"})
}
```

**这样routers层里的文件调用时：**

调用结构体的某个方法

```go
func UserRouter(ginServer *gin.Engine) {
	group := ginServer.Group("/user")

	group.GET("/query", controller.UserController{}.Query)
	group.GET("/delete", controller.UserController{}.Delete)
	group.GET("/add", controller.UserController{}.Add)
}
```



#### 继承

创建`BaseController`，来让其他控制器继承该控制器

拿其他控制器也就可以调用base控制器的方法了。

```go
type BaseController struct {
}

func (bc BaseController) success(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"msg": "success"})
}

func (bc BaseController) failed(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"msg": "failed"})
}
```

```go
type UserController struct {
	BaseController	// 继承
}

func (user UserController) Query(context *gin.Context) {
	user.success(context)	// 可以用继承来的方法
}
```





## 拦截器(中间件)

在Go中也叫 中间件

定义好拦截器后，可以使用Next放行或者Abort阻止。

可以在后续接口中使用，如果没有人使用，那默认就是全部都拦截，给某一个接口使用那就是只拦截这一个接口。

```go
// 自定义Go中间件   拦截器
func myHandler() gin.HandlerFunc {
	// 通过自定义的中间件，设置的值，在后续处理只要调用了这个中间件的都可以拿到这里的参数
	return func(context *gin.Context) {
		context.Set("usersession", "userid-1")
		context.Next() // 放行
		//context.Abort()     // 阻止通过
	}
}

.....

//访问地址，处理请求，Request，Response
ginServer.GET("/ping", myHandler(), func(c *gin.Context) {
    // 取出中间件中的值
    get := c.MustGet("usersession")
    fmt.Printf("get:%v\n", get)
    value := c.Query("pingid")
    c.String(http.StatusOK, value)
})
```

`Next()`：执行后续剩余等待处理的程序，Next后续的代码暂时不会执行。在请求结束的时候再执行Next()后的代码。

`Abort()`：阻止后续等待处理的程序执行，也就是不会再执行请求了，但是该函数内部的剩余代码该执行还执行。





#### 多个拦截器的执行顺序

```go
func myHandler(c *gin.Context) {
	fmt.Print("1中间件-1") 
	c.Next()
	fmt.Print("1中间件-2")
}
func myHandler1(c *gin.Context) {
	fmt.Print("2中间件-1")
	c.Next()
	fmt.Print("2中间件-2")
}
```

```go
1中间件-1
2中间件-1
{200 request}	//数据
2中间件-2
1中间件-2
```

#### 全局中间件

全局中间件中可以注册多个函数，在每一个请求前都会判断这个函数。

`main.go`

```
ginServe := gin.Default()
....
ginServe.Use(函数1,函数2,...)
```



#### 路由组中间件

建议路由组的中间件放在单独的层中

```go
func UserRouter(ginServer *gin.Engine) {
	group := ginServer.Group("/user")
    group.Use(myHandler, myHandler1)//路由组注册中间件，所有组成员都被拦截
    
	group.GET("/query", myHandler, myHandler1, controller.UserController{}.Query)
	group.GET("/delete", controller.UserController{}.Delete)
	group.GET("/add", controller.UserController{}.Add)
}
```



#### 中间件与控制器之间共享数据

中间件通过`context.Set(key,value)`来设置键值。后续中间件通过`context.Get(key)`来获取键的值。

后续中间件和控制器都可以获得中间件设置的数据

```go
// 中间件1
func myHandler(c *gin.Context) {
	c.Set("handler1", "message1")	//设置handler1的值是message1
	c.Next()
}

//中间件2
func myHandler1(c *gin.Context) {
	value, _ := c.Get("handler1")	// 获取handler1的值
	fmt.Printf("从中间件1获取的数据：%v\n", value)
	c.Next()
}

//控制器中：
func (user UserController) Query(context *gin.Context) {
	fmt.Print("控制器中：\n")
    // 使用Get来获取数据
	value, exists := context.Get("handler1")
	fmt.Printf("中间件设置的值是：%v\n", value)
	context.JSON(http.StatusOK, gin.H{"msg": context.Request.URL})
}
```





## 协程使用context

在协程中使用`context *gin.Context`的实例时，不能直接使用，需要使用context的副本，使用`contextC := context.Copy()`方法，在协程中使用contextC

```go
ctx := context.Copy()
go func() {
    fmt.Printf("协程中的数据:%v\n", ctx.Request.URL)
}()
```







## 文件上传

#### 单文件上传

**首先是前端，使用`Form`表单传递文件**

`action`就是接口地址。`method`就是请求方式。

重点：`enctype`使form表单可以发送文件的关键，必须携带

后端接收参数使用的是表单内的`name`属性的值。

```html
<template>
  <form action="http://localhost:8080/file" method="post" enctype="multipart/form-data">
    <input type="text" name="username"><br>
    <input type="file" name="file" value=""><br>
    <input type="submit" name="" value="提交">
  </form>
</template>
```



**后端：**

使用`context.PostForm("")`接收表单中的数据，一个参数是和表单标签的`name`属性对照。

使用`context.FormFile("")`接收表单中的name="file"的标签提供的文件。

`dst`：使用路径 + `file.Filename`来创建一个带文件名的路径。

`SaveUploadedFile(file,dst)`来把文件保存在一个路径中

```go
func main() {
	// 创建一个服务
	ginServer := gin.Default()

	ginServer.POST("/file", func(context *gin.Context) {
		//username := context.PostForm("username")
		file, _ := context.FormFile("file")
		dst := "H:\\onUpLoad\\" + file.Filename
		context.SaveUploadedFile(file, dst)
		context.JSON(http.StatusOK, gin.H{
			"status":   "200",
			"fileName": file.Filename,
			"path":     dst,
		})
	})
    
    
	// 服务器端口
	ginServer.Run(":8080") // 监听并在 0.0.0.0:8080 上启动服务
}
```



#### 多文件上传

**前端不变，只是input type="file"多了几个而已**



**后端：**

最简单的方式，仅仅使用不同的名字区分，然后分别获取保存。

```go
//多文件上传
ginServer.POST("/files", func(context *gin.Context) {
    file1, _ := context.FormFile("file1")
    dst1 := "H:\\onUpLoad\\" + file1.Filename
    context.SaveUploadedFile(file1, dst1)

    file2, _ := context.FormFile("file2")
    dst2 := "H:\\onUpLoad\\" + file2.Filename
    context.SaveUploadedFile(file2, dst2)

    file3, _ := context.FormFile("file3")
    dst3 := "H:\\onUpLoad\\" + file3.Filename
    context.SaveUploadedFile(file3, dst3)

    context.JSON(http.StatusOK, gin.H{"status": "200"})
})
```



#### 相同名字多文件上传

**前端：**

`name`属性值一致

```html
<template>
  <form action="http://localhost:8080/files" method="post" enctype="multipart/form-data">
    <input type="text" name="username"><br>
    文件1：<input type="file" name="file[]" value=""><br>
    文件2：<input type="file" name="file[]" value=""><br>
    文件3：<input type="file" name="file[]" value=""><br>
    <input type="submit" name="" value="提交">
  </form>
</template>
```



**后端：**

使用`context.MultipartForm()`来接收多个文件

使用`form.File[""]`参数是name属性的值。来获得一个切片

遍历切片，依次处理

```go
//多文件上传
ginServer.POST("/files", func(context *gin.Context) {
    form, _ := context.MultipartForm()
    headers := form.File["file[]"]
    for _, header := range headers {

        dst := path.Join("H:\\onUpLoad\\", header.Filename)
        context.SaveUploadedFile(header, dst)
    }
    context.JSON(http.StatusOK, gin.H{"status": "200"})
})
```



#### 按日期上传文件

把不同日期上传的文件保存在不同文件夹中。

**获取文件后缀名**

`path.Ext(文件.文件名)`。path是包

```go
ginServer.POST("/filesDate", func(context *gin.Context) {
    // 1. 获取上传的文件
    file, _ := context.FormFile("file")
    // 2. 获取后缀名，并判断后缀名类型时候可以
    ext := path.Ext(file.Filename)
    allowExtMap := map[string]bool{
        ".jpg":  true,
        ".png":  true,
        ".gif":  true,
        ".jpeg": true,
    }
    // 3. 判断文件后缀名是否包含在map中
    _, ok := allowExtMap[ext]
    if !ok {
        context.String(200, "格式不合法")
        return
    }
    // 4. 创建图片保存路径  H:/onUpLoad/20230427
    template := "2023_01_01"
    format := time.Now().Format(template) // 返回2023/04/27
    dir := path.Join("H:/onUpLoad/", format)
    fmt.Print("dir:" + dir)
    // 创建目录 All 是如果不存在，会创建多层
    err := os.MkdirAll(dir, 0666)
    if err != nil {
        fmt.Print(err)
        context.String(200, "文件夹创建失败")
        return
    }

    // 5. 生成文件名和文件保存的路径
    // 	获取当前时间戳
    unix := time.Now().Unix()
    // 	把int64 转成字符串
    filename := strconv.FormatInt(unix, 10) + ext

    // 6. 上传文件
    dst := path.Join(dir, filename)
    context.SaveUploadedFile(file, dst)
})
```





## Cookie

可以实现多页面的数据共享，

cookie 是存储在访问者计算机的浏览器中，可以让我们用同一个浏览器访问同一个域名的时候共享数据



#### 实现的功能

1. 保持用户登录状态
2. 保存用户浏览的历史记录
3. 猜你喜欢，智能推荐
4. 电商网站的加入购物车



#### 设置和获取Cookie

**设置Cookie**

`context.SetCookie(name,value string,maxAge int,path,domain string,secure,httpOnly bool)`

第一个参数：key

第二个参数：value

第三个参数：过期时间，可以设置nil

第四个参数：cookie的路径

第五个参数：cookie的路径Domain作用域 本地调试配置成 localhost，正式上线配置成域名。

第六个参数：secure，值为true时，cookie在HTTP中是无效的，在HTTPS才有效

第七个参数：httpOnly，是微软对cookie做的扩展，如果再cookie中设置了httponly属性，则通过JS脚本、applet等是无法读取到cookie信息的，防止XSS攻击。只能被后端修改

```go
// 测试cookie
ginServer.GET("/api/testCookie", func(context *gin.Context) {
    context.SetCookie("name", "zhangsan", 3600, "/", "localhost", false, false)	// 设置
    context.JSON(http.StatusOK, gin.H{"msg": "success"})
})
```



**获取Cookie**

`cookie,err := context.Cookie("name")`

```go
// 获取Cookie
ginServer.GET("/api/testCookieGet", func(context *gin.Context) {
    cookie, err := context.Cookie("name")	//获取
    if err != nil {
        return
    }
    fmt.Print(cookie)
    context.JSON(http.StatusOK, gin.H{"msg": cookie})
})
```



**删除Cookie**

把过去时间设成`-1`

`context.SetCookie(......,-1,....)`



#### 多个二级域名共享cookie

```go
// 设置Cookie
c.SetCookie("name","value",3600,"/",".erickiku.com",false,false)
```

这样一来，不论是`www.erickiku.com、blog.erickiku.com、xxx.erickiku.com`都可以访问该Cookie





## Session

#### 介绍

session是另一种记录客户端状态的机制，不同的是Cookie保存在客户端浏览器中，而Session保存在服务器上。



#### 工作流程

当客户端浏览器第一次访问服务器并发送请求时，服务器会创建一个session对象，生成一个类似于 key,value的键值对，然后将value保存到服务器，将key(cookie)返回到浏览器(客户端)。浏览器下次访问时会携带key(cookie)，找到对应的session

#### 在Gin中使用Session

需要使用第三方中间件来实现Session

安装

```powershell
go get github.com/gin-contrib/sessions
```



**使用中间件**

```go
// 创建一个服务
ginServer := gin.Default()
ginServer.Use(favicon.New("./favicon.ico"))

//配置Session中间件
//创建基于 cookie的存储引擎，后面参数可以随便写
store := cookie.NewStore([]byte("secret"))
//配置session的中间件，store是前面创建的存储引擎，可以替换成其他的引擎
// 第一个参数是键名
ginServer.Use(sessions.Sessions("mysession", store))
```



**设置Session以及获取Session**

```go
// 使用了中间件后
// 测试session
ginServer.GET("/api/testSession", func(context *gin.Context) {
    session := sessions.Default(context)	//设置Session
    session.Set("name", "lisi")		// 设置键值
    session.Save()		//必须保存才会生效

    context.JSON(http.StatusOK, gin.H{"msg": session})
})
```

```go
// 测试Session获取
ginServer.GET("/api/testGetSession", func(context *gin.Context) {
    session := sessions.Default(context)	//设置Session
    get := session.Get("name")	// 获取Session
    context.JSON(http.StatusOK, gin.H{"msg": get})
})
```



> 如果想要跨多个后端服务器访问同一个Session，则需要把Session键值存储在Redis数据库中。
>
> https://github.com/gin-contrib/sessions##redis





## MySQL

#### MySQL命令行

**数据库的连接**

```powershell
mysql -u root -p
```



**展示所有数据库 **

```powershell
show databases;
```



**选择进入数据库**

```powershell
use 数据库名;
```



**查看数据库下有哪些表**

```powershell
show tables;
```



**创建数据库**

```powershell
create databse 数据库名;
```



**创建一张表**

```powershell
create table users(
	u_id varchar(20),
	sex int(1),
	status int(1)
)
```



#### 海量数据优化

当在大量数据中查询记录时，会非常耗时

一些优化方法：

1. 使用索引

   ```mysql
   create index index_name on class(name)
   ```

   ```mysql
   abter table class add index index_name(name)
   ```

2. 查看索引
   设置过主键的表默认有一个主键索引

   ```mysql
   show index from table_name
   ```

   ```mysql
   show index from class
   ```

   ```mysql
   show index from class\G
   ```

3. 删除索引

   ```mysql
   drop index index_name on class;
   ```



#### Mysql事务

维护数据库完整性，保证成批的SQL语句要么全部执行，要么都不执行

**MYSQL使用 **

`BEGIN`开启一个事务

`ROLLBACK`事务回滚

`COMMIT`事务确认

```mysql
## 开启一个事务
begin;

## 写SQL语句
## 让id=1的人money-100
 update bank set money = money -100 where id = 1
 
## 让id= 2的人money+100
update bank set money = money + 100 where id = 2;

## 如果没什么问题，就commit
commit;


## 如果中途出现问题了，就需要回滚
rollback;
```



开启事务后，之后的操作都是在内存中操作，不会反映到真实的数据库中。





#### 锁

Mysql有`表级锁`和`行级锁`，这里主解释表级锁



###### 添加读锁

可以并发读，但是不能并发写，读锁期间，没释放锁 之前不能进行写操作。

**使用场景：**读取结果集的最新版本，同时防止其他事务产生更新该结果集

主要用在需要数据依存关系时确认某行记录是否存在，并确保没有人对这个记录进行UPDATE或DELETE操作。

```mysql
lock table user read;


unlock tables;
```



#### 添加写锁

添加写锁后，只有所表的用户可用进行读写操作，其他用户不行

```mysql
lock tables user write;


unlock tables;
```





## GORM

#### 安装

```powershell
go get -u gorm.io/gorm
go get -u gorm.io/driver/sqlite
```



#### 官网

https://gorm.io/zh_CN/docs/connecting_to_the_database.html



#### 使用

一般该方法放在一个工具类包中，当做一个工具函数

```go
package uTools

import (
	"fmt"
	"gorm.io/driver/mysql"
	"gorm.io/gorm"
)

var DB *gorm.DB
var err error

func init() {
	dsn := "root:123456@tcp(127.0.0.1:3306)/mydb?charset=utf8mb4&parseTime=True&loc=Local"
	DB, err = gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		return
	}
	fmt.Print(DB)
}
```





**模型层**

一般放在模型包的文件中。

一般结构体名对应表明，如果对不上的话，可以给这个结构体绑定一个方法

`TableName`，返回一个表明

```go
package Pojo

type User struct {
	Id       int
	Username string
	Password string
}

func (User) TableName() string {
	return "user"
}

```

> 在实际项目中定义数据库模型有以下要求：
>
> 1.  **结构体的名称必须首字母大写，**并和数据库表明对应，例如，表明user，结构体名称就是User，表名称为 article_cate 结构体名称定义成 ArticleCate 。
>
> 2. 结构体中的 **字段名称首字母必须大写**，并和数据库表中字段一一对应。例如：表字段名 id  ，结构体就是Id， 字段名 username ，结构体就是 Username，字段名  add_time 和 对应结构体 AddTime
>
> 3. **默认情况表明是结构体名称的复数形式，**如果我们结构体名称定义为 User，表明这个模型默认操作的是  users 表
>
> 4. 但是可以通过自定义函数改变结构体默认操作的 表明
>
>    ```go
>    func (User) TableName() string {
>    	return "user"
>    }
>    ```
>    
> 5. 可以使用
>
>    ```go
>    Id   int   `json:"id"`
>    ```
>
>    的方法来改变返回时的键名





**控制层**

在控制层中可以直接调用 uTools包中的`DB`属性，并且同时调用init方法，给DB赋值。定义切片类型的对象切片

```go
ginServer.GET("/getAll", func(context *gin.Context) {
    var userList = []Pojo.User{}
    uTools.DB.Find(&userList)
    context.JSON(http.StatusOK, gin.H{"msg": userList})
})
```



#### 条件查询

[GORM官网](https://gorm.io/zh_CN/docs/query.html)

**全部查询**

```go
result := db.Find(&users)
```

**条件查询**

```go
// Get first matched record
db.Where("name = ?", "jinzhu").First(&user)
// SELECT * FROM users WHERE name = 'jinzhu' ORDER BY id LIMIT 1;

// Get all matched records
db.Where("name <> ?", "jinzhu").Find(&users)
// SELECT * FROM users WHERE name <> 'jinzhu';

// IN
db.Where("name IN ?", []string{"jinzhu", "jinzhu 2"}).Find(&users)
// SELECT * FROM users WHERE name IN ('jinzhu','jinzhu 2');

// LIKE
db.Where("name LIKE ?", "%jin%").Find(&users)
// SELECT * FROM users WHERE name LIKE '%jin%';

// AND
db.Where("name = ? AND age >= ?", "jinzhu", "22").Find(&users)
// SELECT * FROM users WHERE name = 'jinzhu' AND age >= 22;

// Time
db.Where("updated_at > ?", lastWeek).Find(&users)
// SELECT * FROM users WHERE updated_at > '2000-01-01 00:00:00';

// BETWEEN
db.Where("created_at BETWEEN ? AND ?", lastWeek, today).Find(&users)
// SELECT * FROM users WHERE created_at BETWEEN '2000-01-01 00:00:00' AND '2000-01-08 00:00:00';
```

#### 插入记录

[GORM官网](https://gorm.io/zh_CN/docs/create.html)

插入一条记录，先拿取传入的数据，再赋值给一个及结构体，插入的是结构体的指针。

```go
// 创建
ginServer.POST("/addUser", func(context *gin.Context) {
    // 定义结构体实例
    user := Pojo.User{}
    // 序列化对象
    data, _ := context.GetRawData()
    var m map[string]string
    // m是一个map，保存了传入的数据
    _ = json.Unmarshal(data, &m)
    user.Username = m["Username"]
    user.Password = m["Password"]
    
    // 插入记录
    result := uTools.DB.Create(&user)

    context.JSON(http.StatusOK, gin.H{"map": user})
})
```

返回的信息

```go
user.ID             // 返回插入数据的主键
result.Error        // 返回 error
result.RowsAffected // 返回插入记录的条数
```

#### 更新记录

[GORM官网](https://gorm.io/zh_CN/docs/update.html)

```go
// 更新
ginServer.POST("/updateUser", func(context *gin.Context) {
    data, _ := context.GetRawData()
    var m map[string]string
    _ = json.Unmarshal(data, &m)

    result := uTools.DB.Model(&Pojo.User{}).Where(m["where"]+" = ?", m["wherevalue"]).Update(m["field"], m["value"])
    fmt.Printf("rows:%v\n", result.RowsAffected)
    context.JSON(http.StatusOK, gin.H{"status": "200"})
})
```

**第二种方式**

先通过Find找到记录，再修改记录，最后使用`Save`更新记录

```go
// 更新
ginServer.POST("/updateUser", func(context *gin.Context) {
    user := Pojo.User{Id: 2}
    uTools.DB.Find(&user)
    user.Password = "213055"
    result := uTools.DB.Save(&user)
    fmt.Printf("userid:%v,rows:%v\n", user.Id, result.RowsAffected)
    context.JSON(http.StatusOK, gin.H{"status": "200"})
})
```

#### 删除记录

[GORM官网](https://gorm.io/zh_CN/docs/delete.html)

```go
// 删除
ginServer.DELETE("/deleteUser", func(context *gin.Context) {
    data, _ := context.GetRawData()
    var m map[string]int
    _ = json.Unmarshal(data, &m)

    user := Pojo.User{}
    user.Id, _ = m["id"]
    // 并不需要先查询，可以直接删
    uTools.DB.Find(&user)
    // 第一种方法，根据结构体删除
    uTools.DB.Delete(&user)
    context.JSON(http.StatusOK, gin.H{"data": user})
})
```

**第二种方式**

```go
// 删除
ginServer.DELETE("/deleteUser", func(context *gin.Context) {
    data, _ := context.GetRawData()
    var m map[string]int
    _ = json.Unmarshal(data, &m)

    user := Pojo.User{}
    // 使用条件删除
    uTools.DB.Where("id = ?", m["id"]).Delete(&user)
    context.JSON(http.StatusOK, gin.H{"data": "success"})
})
```





#### 查询详解

**查询全部记录**

```go
userTs := []Pojo.User{}
uTools.DB.Find(&userTs)
context.JSON(http.StatusOK, gin.H{"msg": userTs})
```

**查询一条记录**

```go
user := Pojo.User{Id: 3}
uTools.DB.Find(&user)
context.JSON(http.StatusOK, gin.H{"msg": user})
```

**条件查询**

```go
var users []Pojo.User
uTools.DB.Where("id > ?", 3).Find(&users)
context.JSON(http.StatusOK, gin.H{"msg": users})
```

**AND**

也可以是OR

```go
uTools.DB.Where("id > ? AND id < ?", 3, 6).Find(&users)
```

**IN**

```go
var users []Pojo.User
uTools.DB.Where("id IN ?", []int{1, 3, 5}).Find(&users)
```

**Like**

```go
var users []Pojo.User
uTools.DB.Where("username like ?", "%li%").Find(&users)
```

**between and**

```go
var users []Pojo.User
uTools.DB.Where("id between ? and ?", 2, 4).Find(&users)
```

**指定返回字段**

```go
// 先创建一个临时结构体
type TempUser struct {
	Id       int    `json:"id" `
	Username string `json:"username"`
}

func (TempUser) TableName() string {
	return "user"
}
...
var tempUsers []TempUser
uTools.DB.Select("id,username").Find(&tempUsers)
```

**Order**

```go
var users []Pojo.User
uTools.DB.Order("id desc").Order("password desc").Find(&users)
```

**Limit & Offset**

单个Limie是限制查询的长度，配合Offset可以实现从第几个记录查询几个记录，多用与分页

```go
var users []Pojo.User
uTools.DB.Offset(2).Limit(2).Find(&users)
```

**Count**

```go
var users []Pojo.User
var num int64
uTools.DB.Find(&users).Count(&num)
fmt.Printf("count:%v\n", num)
```





#### 使用原生SQL

**查询**

```go
var users []Pojo.User
uTools.DB.Raw("select * from user where id = ?", 3).Scan(&users)
```

**删除**

```go
uTools.DB.Exec("delete from user where id = ?", 8)
```

**更新**

```go
uTools.DB.Exec("update user set username = ? where id = ?", "666", 6)
```

**新增**

```go
uTools.DB.Exec("insert into user(username,password) values (?,?)", "蜘蛛侠", "21854")
```

**Count**

```go
var num int
uTools.DB.Raw("select count(*) from user").Scan(&num)
```

