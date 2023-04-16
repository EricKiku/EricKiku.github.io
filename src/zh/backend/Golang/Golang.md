---
title: Golang
icon: golang
category:
  - 后端
tag:
  - Golang
---
# ""



## Go

#### go语言特点

1. 背靠大厂,google，可靠
2. 天生支持并发
3. 语法简单，容易上手
4. 内置runtime，支持垃圾回收
5. 可直接编译成机器码，不依赖其他库
6. 丰富的标准库
7. 跨平台编译



#### 应用领域

1. 服务器编程
2. 开发云平台
3. 区块链
4. 分布式系统
5. 网络编程



## go语言开发环境搭建

#### 下载go

下载地址:https://golang.google.cn/dl/

并配置环境变量，bin目录

最后查看是否配置成功：

```
go version
```

#### go配置

查看配置

```
go env
```

修改配置：

```shell
$env:GO111MODULE="on"
$env:GOPROXY="http://goproxy.cn"
```

#### goroot和gopath

goroot就是go安装的根目录。gopath就是go项目所在的路径。

高版本go项目已经不依赖gopath，而是用go mod来管理项目



## 开发工具

使用VsCode开发

安装插件：

1. go
2. code runner
   右上角会有一个启动按钮，可以快捷运行



## 第一个代码

```go
package main

import "fmt"

func main() {
	fmt.Println("hello go")
}
```



## Go常用命令

- **`go build 文件名`**：构建，会生成一个.exe文件，可以直接运行
- **`go run 文件名`**：运行文件
- `go clean`：移除对象文件
- `go doc`：显示包或者符号的文档
- `go env`：打印go的环境信息
- `go bug`：启动错误报告
- `go fix`：运行go tool fix
- `go fmt`：把代码格式化
- **`go get 地址`** ：下载并安装包和依赖。用之前需要先`go mod init 项目名`
- `go install`：编译并安装包和依赖
- `go list`：列出包
- `go run 文件名`：编译并运行go程序
- `go tool`：运行go提供的工具
- `go test`：运行测试
- `go version`：显示go的版本
- `go vet`：运行go tool vet



## VsCode快捷键

常用的：

```
1. ctrl + /
2. shift + alt + a 块注释
3. ctrl + shift + k 删除行
4. ctrl + e 查找文件
5. ctrl + shift + p 打开设置命令行
```



## 编写代码

#### 代码组织

go应用使用`包`和`模块`来组织代码，包对应到的文件系统就是文件夹，模块就是`.go`的go源文件。一个包中会有多个模块，或者多个子包

#### go项目管理工具

早期的go项目使用gopath来管理项目，不方便而且容易出错，从golang 1.11 开始使用gomod来管理项目，当然还有第三方模块例如govendor

#### 实现步骤

1. 创建项目
2. 初始化项目
3. 创建包
4. 创建模块
5. 互相调用

```shell
go mod init 项目名称
```

书写包和模块

user/user.go

```go
package user

func Hello() string {
	return "hello"
}
```

main.go

```go
package main

import (
	"fmt"
	"gopro/user"	//导包
)

func main() {
	s := user.Hello()
	fmt.Printf("s: %v\n", s)
}

```



## 标识符、关键字、命名

#### 标识符的组成

1. 由数字、字母、下划线组成。
2. 只能以字母和下划线开头。
3. 标识符区分大小写。

正确命名：

```go
var name string
var age int
vat _sys int
```

#### go语言关键字

|          |             |        |           |        |
| -------- | ----------- | ------ | --------- | ------ |
| break    | default     | func   | interface | select |
| case     | defer       | go     | map       | struct |
| chan     | else        | goto   | package   | switch |
| const    | fallthrough | if     | range     | type   |
| continue | for         | import | return    | var    |

除了上面的以外，Go还有36个预定义标识符

|        |         |       |         |        |         |
| ------ | ------- | ----- | ------- | ------ | ------- |
| append | bool    | byte  | cap     | close  | complex |
| uint   | copy    | false | float   | imag   | int     |
| iota   | len     | make  | new     | nil    | panic   |
| print  | println | real  | recover | string | true    |



#### 命名法规

当命名以大写字母开头，如`Hello`，那么这种对象标识符就可以被`外部包的代码所用`，这称为导出，相当于`public`；如果命名以小写字母开头，那么对包外是不可见的，但是在包的内部是可见的，相当于`private`

###### 包名

应保持和`package`的名字和目录保持一直，采用简短，有意义的名，包名应 **小写**

```go
package main
package dao
```

###### 文件命名

使用小写单词，使用下划线分隔单词。

###### 结构体命名

采用 **驼峰命名法**，首次木根据防卫控制大写或小写。

###### 接口命名

单个函数的结构名以 **"er"**作为后缀。例如：`Reader`

###### 变量命名

和结构体类似，变量名称一般遵循驼峰命名法，首字母根据访问控制原则大写或小写。

如果变量为私有，且特有名词为首个单词，则使用小写，如appService

若变量类型为bool类型，则应该以`Has、Is、Can、Allow`开头。

```go
var isExist bool
var hasConflict bool
var canManage bool
var allowGitHook bool
```

###### 常量命名

全部大写，下划线分词

```go
const APP_URL = "https://..."
```

###### 错误处理

错误处理的原则就是不能丢弃任何有返回err的调用，不要用_丢弃，必须全部处理。接收到错误，要么返回err，或者使用log记录下来尽早return：一旦有错误发生，马上返回，尽量不要使用panic，除非你知道你在做什么，错误描述如果是英文必须为小写，不需要标点结尾，采用独立的错误流进行处理。

```go
//错误写法
if err!=nil{
    //错误处理
}else{
    //正常代码
}

//正确写法
if err!=nil{
    //错误处理
    return //或者继续
}
//正常代码
```

###### 单元测试

单元测试文件名命名规范为`exampla_test.go`，测试用例的函数名必须以`Test`，例如：`TestExample`每个重要的函数都要首先编写测试用例，测试用例和这正规代码一起提交方便进行回归测试。



## Golang变量

#### 变量声明

Go的变量需要声明后才能使用，同一作用域内不支持重复声明。并且Go语言的变量声明后必须使用。

声明语法：

```go
var identifier type
```

`var`：声明变量关键字

`identifier`：变量名称

`type`：变量类型



###### 批量声明

```go
var (
    name      string
    age       int
    isMarried bool
)
```



#### 变量初始化

语法

```go
var 变量名 类型 = 表达式
```

```go
var (
    name      string = "Stiven"
    age       int    = 18
    isMarried bool   = true
)
```



###### 类型推断

don't need write the type of after

```go
var (
    name      = "Piter"
    age       = 45
    isMarried = true
)
```



###### 批量初始化

```go
var name, age, isMarried = "Meg", 20, true
```



###### 短变量声明

在 **函数内部**，可以使用`:=`对变量进行声明和初始化

```go
name := "Eric"
age := 18
isMarried := true
```

> 不能在函数外部使用



###### 匿名变量

如果接收多个变量，有一些变量用不到，可以使用`_`表示变量名称，这种叫匿名变量，例如：

```go
func test() (string, int) {
	return "Kiku", 20
}

func main() {
	_, age := test()

	fmt.Printf("age: %v\n", age)
}
```



## 常量

运行时无法修改值的变量。常量可以是数值类型，布尔类型，字符串类型等

#### 定义常量语法

```go
cosnt constantName [type] = value
```

常量定义

和变量差不多，只是使用`const`关键字

```go
const PI float32 = 3.14
const PI2 = 3.15
const (
    A = 1
    B = 2
)

const WIDTH int = 16
```



`const`同时声明多个常量时，如果省略了值则表示和上面的一行的值相同

```go
const (
    a1 = 100
    a2
    a3
)
fmt.Printf("a1: %v\n", a1)
fmt.Printf("a2: %v\n", a2)
fmt.Printf("a3: %v\n", a3)

100
100
100
```



#### `iota`

iota比较特殊，可以被认为是一个可被编译器修改的常量，它默认开始时`0`，每调用一次就加`1`，遇到const关键字时被重置为0

```go
const (
    A1 = iota
    A2
    A3
)
fmt.Printf("A1: %v\n", A1)
fmt.Printf("A2: %v\n", A2)
fmt.Printf("A3: %v\n", A3)
```

输出

```go
A1: 0
A2: 1
A3: 2
```



###### 使用`_`跳过某些值

```go
const (
    A1 = iota
    _
    A3
)
fmt.Printf("A1: %v\n", A1)
fmt.Printf("A3: %v\n", A3)
```

输出

```go
A1: 0
A3: 2	
```



###### `iota`声明中间插队

```go
const (
    A1 = iota
    A2 = 100
    A3 = iota
)
fmt.Printf("A1: %v\n", A1)
fmt.Printf("A2: %v\n", A2)
fmt.Printf("A3: %v\n", A3)
```

输出

```go
A1: 0
A2: 100
A3: 2
```



## Go语言数据类型

| 类型       | 值                  | 解释                   |
| ---------- | ------------------- | ---------------------- |
| 布尔型     | true/false          | var b bool = true      |
| 数字类型   | int/float32/float64 | Go语言支持整型和浮点型 |
| 字符串类型 |                     |                        |
| 派生类型   |                     |                        |

派生类型：

包括：指针类型(Pointer)、数组类型、结构化类型(struct)、Channel类型、函数类型、切片类型、接口类型(interface)、Map类型



#### 查看类型

输出语句中的`%T`，就可以输出后面变量的类型

```go
name := "zs"
fmt.Printf("%T\n", name)
```

输出

```go
string
```

#### 数字类型

int、uint、uintptr

| 类型    | 描述                                  |
| ------- | ------------------------------------- |
| uint8   | 无符号8位整型 0~255                   |
| uint16  | 无符号16位整型 0~65535                |
| uint32  | 无符号32位整型 0~4294967295           |
| uint64  | 无符号64位整型 0~18446744073709551615 |
| int8    | 有符号8位整型 -128~127                |
| int16   | 有符号16位整型 -32768~32767           |
| int32   | 有符号32位整型 -2147483648~2147483647 |
| int64   | 有符号64位整型                        |
| float32 | 浮点型                                |
| float64 | 浮点型                                |

整型的零值为0，浮点型的零值为0.0



```go
var i8 int8
fmt.Printf("%T %dB %v-%v\n", i8, unsafe.Sizeof(i8), math.MinInt8, math.MaxInt8)
```

输出

```go
int8 1B -128-127
```



###### 以二进制、八进制十六进制定义数字

```go
var msg1 int = 0xff
fmt.Printf("二进制 %b\n", msg1)
fmt.Printf("八进制 %o\n", msg1)
fmt.Printf("十六进制 %x\n", msg1)
```

输出

```go
二进制 11111111
八进制 377
十六进制 ff
```

###### 浮点型

打印浮点数时，可以使用`fmt`包含动词`%f`

```go
fmt.Printf("%f\n", math.Pi)
fmt.Printf("%.2f", math.Pi)
```

输出

```go
3.141593
3.14
```



#### 复数

```go
var c1 complex64
c1 = 1 + 2i
fmt.Println(c1)
```

复数有实部和虚部。complex64的实部和虚部为32位，complex128的实部和虚部为64位。



#### 布尔类型

`true/false`

经常用于条件判断或循环语句

```go
var bo1 bool = true
var bo2 bool = false
var bo3 = true
var bo4 = false
bo5 := true
bo6 := false
```

> 不能用`0`或者`非0`表示真或假

#### 指针类型

```go
name := "zs"
name1 := &name
fmt.Printf("%T\n", name1)	
```

输出

```go
*string
```

#### 数组类型

```go
arr := [3]int{1, 2, 3}
fmt.Printf("%T\n", arr)
```

输出

```go
[3]int
```

#### 切片类型

就是一个动态数组

```go
arr := []int{1, 2, 3}
fmt.Printf("%T\n", arr)
```

输出

```go
[]int
```

#### 函数类型

```go
func fn1(){}

func main() {
	fmt.Printf("%T\n", fn1)
}
```

输出

```go
func()
```



#### 字符串

一个Go语言字符串是一个任意字节的常量序列



使用双引号`""`或者反引号`` `来创建，双引号用来创建可解析的字符串，支持转义，但是不能多行；反引号用来创建原生的字符串字面量，可能由多行组成，但是不支持转义

```go
var str = `
		<div></div>
	`
fmt.Printf("%v", str)
```



###### 字符串连接

**加号**

支持`+`级联和`+=`追加操作。

```go
var str1 string = "hello"
var str2 string = "world"
fmt.Printf("%v\n", str1+str2)
```



> 但是Go中的字符串时不可变的，每次运算都会产生一个新的字符串，所以性能较差

**使用`fmt.Sprintf()`函数**

格式化输出，有返回值

```go
var str1 string = "hello"
var str2 string = "world"
msg := fmt.Sprintf("h=%s,w=%s",str1,str2)
fmt.Printf("msg: %v\n", msg)
```

输出

```go
msg: h=hello,w=world
```



**使用`strings.Join()`**

```go
var str1 string = "hello"
var str2 string = "world"

msg := strings.Join([]string{str1, str2}, "-")
fmt.Printf("msg: %v\n", msg)
```

输出

```go
msg: hello-world
```



**使用`buffer.WriteString`**

```go
var buffer bytes.Buffer
buffer.WriteString("eric")
buffer.WriteString("kiku")

fmt.Printf("%v", buffer.String())
```

输出

```go
erickiku
```



###### 转义字符

| 符号 | 描述   |
| ---- | ------ |
| `\r` | 回车   |
| `\n` | 换行   |
| `\t` | 制表符 |
| `\'` | 单引号 |
| `\"` | 双引号 |
| `\\` | 反斜杠 |



###### 切片

```go
var str string = "heloworld"
n := 3
m := 5
fmt.Println(str[n])		//获取n位的unicode
fmt.Println(str[n:])	//从n到长度-1
fmt.Println(str[n:m])	//从n到m-1
fmt.Println(str[:m])	//从0到m-1
```

输出

```go
111
oworld
ow
helow
```



###### 字符串常用方法

| 方法                                  | 描述                     |
| ------------------------------------- | ------------------------ |
| `len(str)`                            | 获取字符串长度           |
| `+或fmt.Sprintf`                      | 拼接字符串，格式化字符串 |
| `strings.Split`                       | 分割                     |
| `strings.contains`                    | 判断是否包含             |
| `strings.HasPrefix,strings.HasSuffix` | 前缀/后缀判断            |
| `strings.Index(),strings.LastIndex()` | 子串出现的位置           |
| `strings.Join(a[]sring,sep string)`   | join操作                 |
| `strings.ToLower(str)`                | 把目标字符串转为小写     |
| `strings.ToUpper`                     |                          |

```go
var str string = "heloworld"
fmt.Printf("len(str):%v\n", len(str))
fmt.Printf("+:%s\n", str+"eric")
fmt.Printf("split:%s\n", strings.Split(str, "o"))
fmt.Printf("contains:%v\n", strings.Contains(str, "hel"))
fmt.Printf("pre:%v\n", strings.HasPrefix(str, "h"))
fmt.Printf("suf:%v\n", strings.HasSuffix(str, "ld"))
fmt.Printf("index:%v\n", strings.Index(str, "ow"))
fmt.Printf("lastindex:%v\n", strings.LastIndex(str, "r"))
fmt.Printf("join:%s\n", strings.Join([]string{"eric", "kiku"}, "."))
```

输出

```go
len(str):9
+:heloworlderic
split:[hel w rld]
contains:true
pre:true
suf:true
index:3
lastindex:6
join:eric.kiku
```



## 格式化输出

#### 占位符

**普通占位符**

`%v`：相应值的默认格式

`%+v`：携带字段名的格式

`%##v`：显示包和类型和字段和值

`%T`：输出类型

`%%`：转义成%

```go
type Website struct {
	Name string
}

var site = Website{Name: "erickiku.top"}
```

```go
fmt.Printf("%v\n", site)
fmt.Printf("%+v\n", site)
fmt.Printf("%##v\n", site)
fmt.Printf("%T\n", site)
fmt.Printf("%%\n")
```

输出

```go
{erickiku.top}
{Name:erickiku.top}
main.Website{Name:"erickiku.top"}
main.Website
%
```



**布尔占位符**

`%t`：输出true/false

```go
var is bool = true
fmt.Printf("%t\n", is)
```

输出

```go
true
```



**整数占位符**

| 占位符 | 描述                    |
| ------ | ----------------------- |
| `%b`   | 二进制表示              |
| `%c`   | 相应Unicode码表示的字符 |
| `%d`   | 十进制表示              |
| `%o`   | 八进制表示              |
| `%q`   | 单引号围绕的字符字面值  |
| `%x`   | 十六进制小写            |
| `%X`   | 十六进制大写            |
| `%U`   | Unicode格式             |

```go
var d int = 23
fmt.Printf("Unicode：%c\n", 45)
fmt.Printf("二进制：%b\n", d)
fmt.Printf("八进制：%o\n", d)
fmt.Printf("十进制：%d\n", d)
fmt.Printf("十六进制：%x\n", d)
fmt.Printf("十六进制大写：%X\n", d)
```

输出

```go
Unicode：-
二进制：10111
八进制：27
十进制：23
十六进制：17
十六进制大写：17
```



**浮点数和复数的组成部分**

| 占位符 | 描述                                     |
| ------ | ---------------------------------------- |
| `%b`   | 无小数部分的，指数为二的幂的科学计数法   |
| `%e`   | 科学计数法                               |
| `%E`   | 科学计数法大写E                          |
| `%f`   | 有小数点而无指数                         |
| `%g`   | 根据情况选择`%e`或`%f`以产生更紧凑的输出 |
| `%G`   | 大写E                                    |



**字符串与字节切片**

| 占位符 | 描述                                 |
| ------ | ------------------------------------ |
| `%s`   | 字符串表示，用于[]byte 类型          |
| `%q`   | 双引号围绕的字符串，由Go语法安全转义 |
| `%x`   | 十六进制，小写，每字节两个字符       |
| `%X`   | 十六进制，大写，每字节两个字符       |
| `%p`   | 输出指针类型                         |



## 运算符

Go语言的运算符有：

1. 算术运算符
2. 关系运算符
3. 逻辑运算符
4. 位运算符
5. 赋值运算符

#### 算数运算符

`+,-,*,/,%`

> `++`和`--`在Go语言中是单独的语句，并不是运算符

```go
var a int = 10
var b int = 100
fmt.Printf("b+a:%v\n", a+b)
fmt.Printf("b-a:%v\n", b-a)
fmt.Printf("b*a:%v\n", b*a)
fmt.Printf("b/a:%v\n", b/a)
a++
fmt.Printf("a:%v\n", a)
a--
fmt.Printf("a--:%v\n", a)
```

输出

```go
b+a:110
b-a:90
b*a:1000
b/a:10
a:11
a--:10
```



#### 关系运算符

`==、!=、>、>=、<、<=`

```go
var a int = 10
var b int = 100
fmt.Printf("a==b?%t\n", a == b)
fmt.Printf("a!=b?%t\n", a != b)
fmt.Printf("a>=b?%t\n", a >= b)
fmt.Printf("a>b?%t\n", a > b)
fmt.Printf("a<b?%t\n", a < b)
fmt.Printf("a<=b?%t\n", a <= b)
```

输出

```go
a==b?false
a!=b?true
a>=b?false
a>b?false
a<b?true
a<=b?true
```



#### 逻辑运算

`&&、||、!`

```go
var a bool = true
var b bool = false
fmt.Printf("a&&b：%t\n", a && b)
fmt.Printf("a||b：%t\n", a || b)
fmt.Printf("!b：%t\n", !b)
fmt.Printf("!a：%t\n", !a)
```

输出

```go
a&&b：false
a||b：true
!b：true
!a：false
```



#### 位运算

位运算对整数在内存中的二进制位进行操作

| 运算符 | 描述                                                         |
| ------ | ------------------------------------------------------------ |
| `&`    | 参与运算的两数对应的二进位相与。同是1才是1                   |
| `|`    | 相或。有一个是1就是1                                         |
| `^`    | 相异或，当两对应的二进位不同时，结果为1                      |
| `<<`   | 左移n位就是乘以2的n次方。"a<<b"是把a的各二进位全部左移b位，高位丢弃，低位补0 |
| `>>`   | 右移n位就是除以2的n次方。"a>>b"是把a的各二进位全部右移b位    |

```go
a := 27
b := 29
fmt.Printf("a:%b\n", a)
fmt.Printf("b:%b\n", b)
fmt.Printf("a&b: %v %b\n", (a & b), (a & b))
fmt.Printf("a|b: %v %b\n", (a | b), (a | b))
fmt.Printf("a^b: %v %b\n", (a ^ b), (a ^ b))

fmt.Printf("a<<2 %v %b\n", (a << 2), (a << 2))
fmt.Printf("a>>2 %v %b\n", (a >> 2), (a >> 2))
```

输出

```go
a:11011
b:11101
a&b: 25 11001
a|b: 31 11111
a^b: 6 110
a<<2 108 1101100
a>>2 6 110
```



> << ：把操作数的二进制向左移n位，低位补0
>
> **规律为：源操作数 \* 2的N次方（N取决于移动的位数） = 移动后的结果。**
>
> 32 << 2 = 32 * 2^2  = 128
>
> 16 << 4 = 16 * 2^4 = 256
>
> 7 << 2 = 7 * 2^2 = 28
>
> ==>>== ：把操作数的二进制向右移n位
>
> **规律为：源操作数 / 2的N次方（N取决于移动的位数） = 移动后的结果(只取整数部分)**
>
> 32 >> 2  = 32 / 2^2  = 8
>
> 17 >> 2 = 17 / 2^2 = 4.25 = 4（因为只取整数部分）
>
> 512 >> 10 = 512 / 2^10 = 0.5 = 0（因为只取整数部分）



#### 赋值运算符

`=、+=、-=、*=、/=、%=、<<=、>>=、&=、|=、^=`

```go
a := 27
a += 2
fmt.Printf("a+=2：%v\n", a)

a -= 2
fmt.Printf("a-=2：%v\n", a)

a *= 2
fmt.Printf("a*=2：%v\n", a)

a /= 2
fmt.Printf("a/=2：%v\n", a)

a %= 2
fmt.Printf("a%%=2：%v\n", a)

a <<= 2
fmt.Printf("a<<=2：%v\n", a)

a >>= 2
fmt.Printf("a>>=2：%v\n", a)

a &= 2
fmt.Printf("a&=2：%v\n", a)

a |= 2
fmt.Printf("a|=2：%v\n", a)

a ^= 2
fmt.Printf("a^=2：%v\n", a)
```

输出

```go
a+=2：29
a-=2：27
a*=2：54
a/=2：27
a%=2：1
a<<=2：4
a>>=2：1
a&=2：0
a|=2：2
a^=2：0
```



## 流程控制

#### 条件选择

**`if`**

```go
a := 20
if a >= 18 {
    fmt.Println("成年")
} else {
    fmt.Println("未成年")
}
```

输出

```go'
成年
```

**`if嵌套`**

```go
a := 20
if a >= 18 {
    fmt.Println("成年")
    if a >= 50 {
        fmt.Println("中年")
    } else {
        fmt.Println("不是中年")
    }
} else {
    fmt.Println("未成年")
    if a == 18 {
        fmt.Println("18岁")
    } else {
        fmt.Println("不是18岁")
    }
}
```

**`if...else if`**

```go
a := 55
if a < 60 {
    fmt.Println("不及格")
} else if a < 90 {
    fmt.Println("及格")
} else {
    fmt.Println("优秀")
}
```



**`switch`**

```go
a := "P"
switch a {
    case "A":
    	fmt.Println("A")
    	fallthrough
    case "B":
   	 	fmt.Println("B")
    case "C":
   	 	fmt.Println("C")
    default:
   	 	fmt.Println("N")
}
```

> `select`语句类似于switch语句，但是select会随机执行一个可运行的case，如果没有case可运行，它将阻塞，直到有case可运行。

fallthrough穿透，可用执行满足条件的下一个case

#### 循环语句

Go只有`for`循环，没有while，do while循环

1. for 循环
2. for range 循环

for的几种用法

```go
for i := 0; i < 10; i++ {
    fmt.Println(i)
}


for {
    a++
    if a > 40 {
        break
    }
}


for a > 40 {
    fmt.Println("a")
}
```

`for range`的用法

```go
a := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
for range a {
    fmt.Println("##")
}
//输出: 9个##

for k := range a {
    fmt.Println(k)
}
//输出:  下标

for k, v := range a {
    fmt.Printf("%v %v\n", k, v)
}
// 输出: 下标 值
```

最后的方式的k索引可用为`_`



**循环语句关键字**

1. `break`
   break可以结束for、switch、select代码块
   break可以结合标签使用，更加灵活，且不会再执行for循环

   ```go
   MYTAG:
   for{
       ...
       break MYTAG
   }
   ```

   

2. `continue`
   不加标签有可以

   ```go
   a := []int{1, 2, 3, 4, 5, 6, 7, 8, 9}
   MYTAG:
   for _, v := range a {
       if v == 4 {
           continue MYTAG
       }
   
       fmt.Printf("%v\n", v)
   }
   ```
   
   
   
3. `goto`
   跳转到任意位置，后跟标签名，和continue一样



## Golang数组

数组是 **相同数据类型**的一组数据的集合。数组一旦定义长度了就不能修改。数组可通过下标来访问元素

数组传参时传递的是值，一个副本

#### Go语言数组的定义

定义语法

```go
var arr_name [size]arr_type
```

#### 数组初始化

**使用初始化列表**

```go
var num = [2]int{1, 2}

var str = [2]string{"eric", "kiku"}

var b = [2]bool{true, false}
```

**省略数组长度**

数组长度可以省略，用`...`来代替

```go
var num = [...]int{1, 2}
var str = [...]string{"eric", "kiku"}
var b = [...]bool{2:true, false}
```

> 初始化时可以指定索引的值。如最后一个数组初始化



## Golang切片

切片是数组的抽象，切片是长度可变的数组

切片是引用类型，传递的时候传的是地址

#### 切片语法

**声明**

```go
var arr []int
```

或者

```go
var arr = make([]type,len)
```

可以指定大小，也可指定容量

```go
var arr = make([]type,len,cap)
```

如果不指定，cap容量就等于长度

而且追加数据时，如果长度超过了容量，则容量会直接翻倍



**初始化**

把数组的所有元素都转为切片

```go
var arr = [3]int{1, 2, 3}
var sli = arr[:]
```



使用数组的部分元素初始化

```go
var arr = [3]int{1, 2, 3}
var sli = arr[1:2]
```

输出

```go
[2]
```



#### **增删查改**

**添加元素**

```go
var arr = []int{}
arr = append(arr, 1)
arr = append(arr, 2)
arr = append(arr, 3, 4, 5)
fmt.Printf("%v", arr)
```

输出

```go
[1 2 3 4 5]
```



**删除元素**

```go
func removeAt(arr []int, index int) []int {
	arr = append(arr[:index], arr[index+1:]...)
	return arr
}
func removeCount(arr []int, start int, end int) []int {
	arr = append(arr[:start], arr[start+end:]...)
	return arr
}

func main() {
    var arr = []int{}
    arr = append(arr, 1, 2, 3, 4, 5, 6, 7)
    fmt.Printf("增加:%v\n", arr)
    // 删除
    arr = removeAt(arr, 2)
    fmt.Printf("删除：%v\n", arr)
    // 删除中间几个
    arr = removeCount(arr, 2, 2)
    fmt.Printf("删除几个:%v", arr)
}
```

输出

```go
增加:[1 2 3 4 5 6 7]
删除：[1 2 4 5 6 7]
删除几个:[1 2 6 7]
```



**查询元素**

```go
func findIndex(arr []int, value int) int {
	for i, v := range arr {
		if v == value {
			return i
		}
	}
	return -1
}

func main() {
	var arr = []int{}
	arr = append(arr, 1, 2, 3, 4, 5, 6, 7)
	fmt.Printf("增加:%v\n", arr)
	index := findIndex(arr, 3)
	fmt.Printf("3的位置:%v", index)
}
```



**修改元素**

`copy(tempValue,originValue)`拷贝后者数据给前者

```go
func updateIndex(arr []int, index int, value int) {
	var arrTemp = make([]int, len(arr))
	copy(arrTemp, arr)
	arrTemp[index] = value
	fmt.Printf("update:%v", arrTemp)
}
func main() {
	var arr = []int{}
	arr = append(arr, 1, 2, 3, 4, 5, 6, 7)
	updateIndex(arr, 3, 100)
}
```



## Golang Map

是一种`key:value`的键值对，内部是hash表

map可以通过key来快速检索数据，key类似于索引，指向数据的值

map是引用类型的

#### 语法格式

**定义**：

```go
var map1 = make(map[string]string)
var map1 = map[string]string{"name": "erickiku"}//定义+初始化
```

**赋值**

```go
map1["age"]="18"
```

**获取值**

可以获取一个值，也可以获取两个值，第一个是值，第二个是是否存在这个值

```go
v, ok := map1["name"]
fmt.Println(v)
fmt.Println(ok)
```

**输出**

```go
erickiku
true
```



#### 遍历map

**获取键名**

```go
var map1 = map[string]string{"name": "erickiku", "age": "22", "gender": "male"}

for k := range map1 {
    fmt.Println(k)
}
```

输出

```go
gender
name
age
```

 

**获取键名和键值**

```go
for k, v := range map1 {
    fmt.Printf("%v:%v\n", k, v)
}
```

输出

```go
name:erickiku
age:22
gender:male
```



## Golang函数

Go不是面向对象的，所以函数很重要，所有的功能都包含在函数中，可以重复使用。

#### Golang函数特性

1. Go中有三种函数：普通函数、匿名函数、方法
2. 不允许函数重载，也就是不允许函数同名，但是方法可以
3. 函数不能嵌套函数，但是可以嵌套匿名函数
4. 函数是一个值，可以将函数赋值给变量，使这个变量变为函数
5. 函数可以作为参数传递给另一个函数
6. 函数调用的时候，如果有参数传递给函数，则先拷贝参数的副本，再将副本传给函数
7. 函数参数可以没有名称



#### 函数的定义和调用

###### 函数定义语法

```go
func funcName([param list]) [return_types]
{
    函数体
    return
}
```



**可以返回两个数据**

```go
func text() (int, int) {
	return 1, 2
}
```

调用：

```go
func main() {
	i, i2 := text()
	fmt.Println(i, i2)
}
```



**返回时不写名称**

```go
func text() (n int, m int) {
	n = 10
	m = 20
	return	//默认按照函数返回值返回，相当于return n,m
}
```

调用

```go
func main() {
	i, i2 := text()
	fmt.Println(i, i2)	// 10  20
}
```



**覆盖返回值**

```go
func text() (name int, age int) {
	n := 10
	m := 20
	return n, m
}
```

调用

```go
func main() {
	i, i2 := text()
	fmt.Println(i, i2)
}
```



> Go中经常会使用其中一个返回值作为函数是否执行成功，是否有错误信息的判断条件。例如`return value,exists`、`return value,ok`、`return value,err`等



#### 函数的参数

参数可以有0个或多个。必须指定数据类型。

go是通过传值的方式传参的，意味着传递给函数的是参数的副本，所以函数内部访问，修改的也是这个副本。

Go可以使用`变长参数`，有时候并不能确定参数的个数，可以使用变长参数，可以在函数定义时，形参使用`ARGS...TYPE`的方式，这时会将`...`代表的参数全部保存到一个名为ARGS的slice中，注意这些参数的数据类型都是TYPE。



> `map`、`slice`、`interface`、`channel`这些是指针类型，作为参数传递，所以拷贝也是拷贝的指针，所以可能影响到外部的数据



**可变长参数**

```go
func text(args ...int) {
	for _, v := range args {
		fmt.Println(v)
	}
}

text(1, 2, 3, 4, 5, 6, 7, 8, 9)
```





#### Golang函数类型和函数变量

可以使用`type`关键字来定义一个函数类型，语法格式如下:

```go
type fun func(int,int)int
```

定义了一个`fun`函数类型，它是一种函数类型，这种函数接收两个int类型的参数。并且返回一个int类型的返回值。



```go
type fun1 func(int, int) int

func max(a int, b int) int {
	if a > b {
		return a
	} else {
		return b
	}
}
func main() {

	var f1 fun1
	f1 = max
	fmt.Printf("max:%v", f1(4, 5))
}
```

输出

```go
max:5
```





## Golang高阶函数

go语言的函数，可以作为函数的参数，传递给另一个函数，作为另一个函数的返回值返回



#### go语言喊出作为参数

```go
func sayHello(name string) {
	fmt.Printf("hello,%s", name)
}

func actions(name string, fun func(string)) {
	fun(name)
}
```

调用

```go
actions("tom", sayHello)
```

#### go语言函数作为返回值

```go
func add(a int, b int) int {
	return a + b
}
func fun1() func(int, int) int {
	return add
}
```

调用

```go
func main() {
	var add = fun1()(1, 2)
	fmt.Println(add)
}
```



## Golang匿名函数

Go函数不能嵌套，但是在函数内部有定义匿名函数，实现一下简单功能调用。

**语法格式**

```go
func (参数列表)(返回值)
```



#### 实例

```go
func test(a int, b int) int {
	var fun = func(a int, b int) int {
		return a + b
	}

	return fun(a, b)
}
```

调用

```go
fmt.Printf("%v", test(1, 2))
```



## Golang闭包

闭包可以理解成`定义在一个函数内部的函数`，本质上就是将函数内部和函数外部连接起来的桥梁。或者说是函数和其引用环境的组合体。

`闭包=函数+引用环境`



```go
func test() func(int) int {
	var x int
	return func(y int) int {
		x += y
		return x
	}
}
```

调用

```go
var fn = test()
fmt.Printf("%v\n", fn(10))
fmt.Printf("%v\n", fn(10))
fmt.Printf("%v\n", fn(10))


//10
//20
//30
```

变量x就是一个闭包，在函数生命周期内，x一直有效，不会释放，所以会递增

闭包的另一个实例

```go
func makeHasSuffixFunc(suffix string) func(string) string {
	return func(name string) string {
		if !strings.HasSuffix(name, suffix) {
			return name + suffix
		}
		return name
	}
}
```

调用

```go
func main() {
	var jpgFunc = makeHasSuffixFunc(".jpg")
	var pngFunc = makeHasSuffixFunc(".png")

	var name = jpgFunc("test")
	var png = pngFunc("test")
	fmt.Printf("%v\n", name)
	fmt.Printf("%v", png)
}
```



## Golang递归

自身调用自身就是递归

必须定义退出条件，否则就是死循环

递归可能产生一大堆的goroutine，也可能会出现栈空间溢出问题。



实例

```go
func jiecheng(base int64) int64 {
	if base == 1 {
		return 1
	}
	var result = base * jiecheng(base-1)
	return result
}
```

调用

```go
func main() {
	var result = jiecheng(1)
	fmt.Printf("%v", result)
}
```





## Golang的defer

defer语句会将其后面跟随的语句进行延迟处理，在`defer`归属的函数即将返回时，将延迟处理的语句按`defer`定义的逆序进行执行，也就是说，先被`defer`的语句最后被执行，最后被defer的语句最先执行。

#### defer特性

1. defer用于注册延迟调用
2. 这些调用直到return前才被执行。因此可以用来做资源清理
3. defer语句中的变量，在defer声明时就决定了 

#### 用途

1. 关闭文件句柄
2. 锁资源释放
3. 数据库连接释放



#### 实例

```go
fmt.Printf("%v\n", 1)
defer fmt.Printf("%v\n", 2)
defer fmt.Printf("%v\n", 3)
defer fmt.Printf("%v\n", 4)
fmt.Printf("%v\n", 5)
```

输出

```go
1
5
4
3
2
```



## Golang  init函数

先于`main`函数执行，实现一些初始化操作

#### 特点

* 先于main函数自动执行，不能被其他函数调用。
* init函数没有形参、返回值
* 每个包可以有多个init函数
* 包的每个文件也可以有多个init函数
* 同一个包的init执行顺序，没有明确定义，不能依赖顺序去分析执行
* 不同包的init函数按照包导入的依赖关系决定执行顺序。



#### 执行顺序

`变量初始化-> init()->main()`



实例

```go
var globalConfigHttp = "http://localhost:8080"

func init() {
	fmt.Println(globalConfigHttp)
	fmt.Println("init()........")
}
func main() {

	fmt.Println("main()........")
}
```



**多个init也可以**



## Golang指针

Go语言中的函数传参都是值拷贝，当我们想要改变某个变量的时候，可以创建一个`指向该变量地址`的指针变量。传递数据使用指针，而无须拷贝数据

类型指针不能用于偏移和运算。

Go语言中的指针有两个符号：`&`取地址、`*`根据地址取值

#### 指针地址和指针类型

每个变量在运行时都有一个地址，这个地址代表变量在内存中的位置。Go中使用`&`字符放在变量前面对变量进行 **取地址**操作。Go中的值类型（int、float、bool、string、array、struct）都有对应的指针指针类型，如`*int、*int64、*string`等



#### 指针语法

一个指针变量指向了 一个值的内存地址。也就是声明了一个指针之后，可以像变量赋值一样，把一个值的内存地址放入到指针中。



```go
var pointer *string
var i = "hello"
pointer = &i
fmt.Printf("类型:%T\n", pointer)
fmt.Printf("地址:%v的值是:%v", pointer, *pointer)
```



#### 指向数组

语法

```go
var ptr [MAX] *int
```

演示：

```go
var arr = [MAX]int{1, 2, 3}
var ptr [MAX]*int

fmt.Printf("%v\n", ptr)

for i, _ := range arr {
    ptr[i] = &arr[i]
}
for i := 0; i < MAX; i++ {
    fmt.Printf("ptr[%v]的值：%v\n", ptr[i], *ptr[i])
}
```

输出

```go
[<nil> <nil> <nil>]
ptr[0xc000018168]的值：1
ptr[0xc000018170]的值：2
ptr[0xc000018178]的值：3
```



## Golang类型定义

#### 类型定义

```go
type myInt int
var msg1 myInt
msg1 = 10

fmt.Printf("%T\n", msg1)
fmt.Printf("%v\n", msg1)
```

输出

```go
main.myInt
10
```



#### 类型别名

```go
type myInt = int
var msg1 myInt = 10

fmt.Printf("%T\n", msg1)
fmt.Printf("%v\n", msg1)
```

输出

```go
int
10
```



#### 区别

1. 类型定义相当于定义了一个全新的类型，与之前的类型不同；但是类型别名没有定义新的类型，而是使用一个别名来替换之前的类型。
2. 类型别名只会在代码中存在，在编译完成之后不会存在该别名。
3. 因为类型别名和原类型是一致的，所以原来类型所拥有的方法，类别名中也可以调用，但是如果是重新定义一个类型，那么不可以调用原类型的方法



## Golang结构体

Go不是面向对象的，但是可以使用结构体来实现，面向对象编程的一些特性，例如，继承、组合等特性。 

#### 实例

```go
type Person struct {
    age                  int
    id, name, sex, email string
}

var student Person
student.id = "001"
student.name = "erickiku"
student.sex = "male"
student.age = 18
student.email = "xyz2966678301@gmail.com"
fmt.Printf("%v", student)
```

输出

```go
{18 001 erickiku male xyz2966678301@gmail.com}
```



#### 匿名结构体

```go
var dog struct {
    color string
    name  string
}
dog.color = "灰色"
dog.name = "小灰灰"
fmt.Printf("dog:%v", dog)
```

输出

```go
dog:{灰色 小灰灰}
```



#### 结构体的初始化

**键值对**

```go
type Person struct {
	id, name string
	age      int
}

func main() {
	var teacher Person = Person{
		id:   "001",
		name: "eric",
		age:  20,
	}
	fmt.Printf("%v", teacher)
}
```

输出

```go
{001 eric 20}
```



**顺序**

```go
type Person struct {
	id, name string
	age      int
}

func main() {
	var teacher Person = Person{
		"1", "eric", 20,
	}
	fmt.Printf("%v", teacher)
}
```



**部分初始化**

```go
type Person struct {
	id, name string
	age      int
}

func main() {
	var teacher Person = Person{
		name: "eric",
	}
	fmt.Printf("%v", teacher)
}
```

输出

```go
{ eric 0}
```



#### Golang结构体指针

```go
type Person struct {
	id, name string
	age      int
}


var teacher Person = Person{
    "001", "eric", 18,
}
fmt.Printf("teacher:%v\n", teacher)

var pointerPerson *Person = &teacher

fmt.Printf("pointerPerson:%p\n", pointerPerson)
fmt.Printf("pointerPersonValue:%v\n", *pointerPerson)
```

输出

```go
teacher:{001 eric 18}
pointerPerson:0xc00007e510
pointerPersonValue:{001 eric 18}
```



###### 使用new关键字

new出来的也是一个指针

```go
var teacher = new(Person)
teacher.id = "002"
teacher.name = "erickiku"
teacher.age = 29

fmt.Printf("teacher:%p\n", teacher)
fmt.Printf("teacher:%v\n", *teacher)
```

输出

```go
teacher:0xc00007e510
teacher:{002 erickiku 29}
```



#### 结构体作为函数参数

结构体可以像普通变量一样，作为函数的参数，传递给函数

1. 直接传递结构体，传递的是一个副本，在函数内部不会改变外部的结构体内容
2. 传递结构体指针，在函数内部会修改外部的内容



**直接传递结构体**：

在函数中修改形参结构体，main函数中的结构体数据不会改变

```go
type Person struct {
	id, name string
	age      int
}

func testValue(teacher Person) {
	teacher.name = "zhangsan"
	fmt.Printf("test:teacher:%v\n", teacher)
}

func main() {
	var teacher Person = Person{"001", "eric", 18}

	testValue(teacher)

	fmt.Printf("teacher:%p\n", teacher)

}
```

输出

```go
test:teacher:{001 zhangsan 18}
teacher:%!p(main.Person={001 eric 18})
```



**传递结构体指针**

```go
func testPointer(teacher *Person) {
	teacher.name = "zhangsan"
	fmt.Printf("test:teacher%v\n", teacher)
}
func main() {
	var teacher = new(Person)
	teacher.id = "001"
	teacher.name = "eric"
	teacher.age = 20
	testPointer(teacher)
	fmt.Printf("teacher:%v\n", teacher)
}
```

输出

```go
test:teacher&{001 zhangsan 20}
teacher:&{001 zhangsan 20}
```



#### 结构体嵌套

Go中没有面向对象的思想， 也没有继承，但是可以通过嵌套来实现



```go
type Person struct {
	id, name string
	age      int
	teacher  Teacher
}
type Teacher struct {
	t_id string
	name string
	sex  string
}

func main() {
	var student Person
	student.id = "001"
	student.name = "xiao hong"
	student.age = 13
	student.teacher.t_id = "2001011"
	student.teacher.name = "wang yan"
	student.teacher.sex = "female"
	fmt.Printf("student:%v的信息:%v", student.name, student)
}
```

输出

```go
student:xiao hong的信息:{001 xiao hong 13 {2001011 wang yan female}}
```



## Golang方法

Go中没有面向对象的特性，也没有类对象的概念，但是可以使用结构体来模拟这些特性。也可以声明一些方法，属于某个结构体

#### 语法

```go
type Type struct{}

func (recv Type) fun1(params) return_type{}
func (recv *Type) fun1(params) return_type{}
```



#### 实例

如果不使用结构体指针的话，在函数中修改不会影响外部

(person Person)的person是用来调用结构体的，可以随便写，但是如果想要影响外部数据，则就需要使用结构体指针。

```go
type Person struct {
	name string
	age  int
}

func (person Person) getName() string {
	return person.name
}
func (person *Person) setName(name string) {
	person.name = name
}
func main() {
	var student = new(Person)
	student.setName("eric")
	fmt.Printf("getName:%v\n", student.getName())
	fmt.Printf("student:%v\n", student)
}
```

输出

```go
getName:eric
student:&{eric 0}
```



#### 注意事项

1. 方法的receiver type并非一定要是一个struct类型，type定义的类型别名、slice、map、channel、func等都可以
2. struct结合它的方法就等价于面向对象，只不过struct可以和方法分开，并非要属于同一个文件，但是要属于同一个包
3. 方法有两种接收类型T type 和T *type
4. 方法就是函数，所以Go中没有方法重载
5. 如果receiver是一个指针类型，则会自动解除引用



## Golang接口

定义一些通用规范，只设计规范，不实现规范。

Go语言的接口，就是一种新的类型定义。它把所有的具有共性的方法定义在一起，任何其他类型只要实现了这些方法就是实现了这个接口。

语法格式和方法非常类似

接口的应用是，在处理对象时，不必关心是什么对象，只要实现了这个方法，那么在特定的时机就可以调用这个方法，比如狗会跑，汽车也会跑，那么狗和汽车可以实现同一个接口。狗会吃东西，猫也会吃东西，狗和猫可以实现同一个接口

**一个接口可以被多个结构体实现**

**一个结构体可以实现多个接口。各接口之间互不干扰。**

Go接口是非侵入式的。



#### 语法格式

```go
type interfaceName interface{
    methodName return type
    ...
}
```



#### 实例

```go
// 定义接口
type USB interface {
	read()
	write()
}

//  定义结构体
type Computer struct {
}
type Mobile struct {
}

// 实现方法
func (com Computer) read() {
	fmt.Printf("com%s\n", "read...")
}
func (com Computer) write() {
	fmt.Printf("com%s\n", "write...")
}
func (mob Mobile) read() {
	fmt.Printf("mob%s\n", "read...")
}
func (mob Mobile) write() {
	fmt.Printf("mob%s\n", "wirte...")
}
func main() {
	var lenovn Computer
	lenovn.read()
	lenovn.write()
	var redmi Mobile
	redmi.read()
}
```

输出

```go
comread...
comwrite...
mobread...
mobwirte...
```



#### 多态

接上面代码，实现同一个接口之后，可以使用多态

```go
func main() {
	var usb USB
	usb = Computer{}
	fmt.Printf("comUSB:%v\n", usb)
	usb = Mobile{}
	fmt.Printf("mobUSB:%v", usb)
}
```



#### 接口嵌套

**接口可以嵌套，一个接口中可以有多个接口**

```go
// 定义接口
type Flyer interface {
	fly()
}
type Swimer interface {
	swim()
}

type FlyFish interface {
	Flyer
	Swimer
}

// 结构体
type BlueFlyFish struct {
	color string
}

func (blueFf BlueFlyFish) fly() {
	fmt.Printf("飞鱼:%v\n", "飞")
}
func (blueFf BlueFlyFish) swim() {
	fmt.Printf("飞鱼:%v\n", "游")
}
func main() {
	var fish FlyFish
	fish = BlueFlyFish{"red"}
	fish.fly()
	fish.swim()
	fmt.Printf("Fly:%v", fish)
}
```

输出

```go
飞鱼:飞
飞鱼:游
Fly:{red}
```



#### 通过接口实现OCP

OCP：开闭原则

对扩展是开放的，对修改是关闭的。

**实例**

Dog和Cat都实现了Pet的方法，所以他们两个都实现了Pet接口，在Person的方法care中，参数是Pet类型的参数，但是由于dog和cat都实现了pet，所以传递dog类型和cat类型的也可以。

之后扩展就可以直接实现接口即可完美扩展。

```go
type Pet interface {
	eat()
	sleep()
}
type Dog struct {
}
type Cat struct {
}

func (dog Dog) eat() {
	fmt.Printf("dog:%s\n", "eat...")
}
func (dog Dog) sleep() {
	fmt.Printf("dog:%s\n", "sleep...")
}
func (cat Cat) eat() {
	fmt.Printf("cat:%s\n", "eat...")
}
func (cat Cat) sleep() {
	fmt.Printf("cat:%s\n", "sleep...")
}

type Person struct {
}

func (person Person) care(pet Pet) {
	pet.eat()
	pet.sleep()
}


func main() {
	var dog = Dog{}
	var cat = Cat{}
	var per = Person{}
	per.care(dog)
	per.care(cat)
}
```

输出

```go
dog:eat...
dog:sleep...
cat:eat...
cat:sleep...
```



#### 接口模拟OOP的属性和方法

Go没有面向对象的概念，也没有封装的概念但是可以通过结构体和函数绑定来实现OOP

**实例**



## Golang继承

Go本没有oop的概念，也没有继承的概念，可以通过结构体嵌套来实现

```go
type Organismer interface {
	eat()
	sleep()
}
type Animal struct {
	name string
	age  int
}

func (ani Animal) eat(name string) {
	fmt.Printf("%s:%v\n", name, "eat..")
}
func (ani Animal) sleep(name string) {
	fmt.Printf("%s:%v\n", name, "sleep..")
}

type Dog struct {
	Animal
	color string
}
type Cat struct {
	Animal
}

func (cat Cat) play() {
	fmt.Printf("cat:%v\n", "play..")
}

func main() {
	var dog = Dog{}
	dog.name = "小黑"
	dog.age = 2
	dog.color = "borwn"
	fmt.Printf("dog:%v\n", dog)
	dog.eat(dog.name)
	dog.sleep(dog.name)

	var cat = Cat{}
	cat.name = "小咪"
	cat.age = 3
	cat.play()
	cat.eat(cat.name)
	cat.sleep(cat.name)
}
```

输出

```go
dog:{{小黑 2} borwn}
小黑:eat..
小黑:sleep..
cat:play..
小咪:eat..
小咪:sleep..
```





## Golang构造函数



```go
type Person struct {
	name string
	age  int
}

func NewPerson(name string, age int) (*Person, error) {
	if age < 0 {
		return nil, fmt.Errorf("age must be greater than 0")
	}
	return &Person{name: name, age: age}, nil
}

func main() {
	person, err := NewPerson("eric", 20)
	fmt.Printf("person:%v\n", person)
	fmt.Printf("err:%v\n", err)
}
```

输出

```go
person:&{eric 20}
err:<nil>
```





