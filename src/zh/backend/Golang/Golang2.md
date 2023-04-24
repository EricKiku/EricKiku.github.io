---
title: Golang2
icon: golang
category:
  - 后端
tag:
  - Golang
---
# ""


## Golang包

包可以区分命令空间，一个文件夹中不能有两个同名文件。也可以更好的管理项目。

Go中创建一个包， 一般是创建一个文件夹，在该文件夹里面的Go文件中，使用package关键字来声明包名称。通常，文件夹名称和包名称相同，并且，同一个文件夹下面只有一个包。

#### 创建包

1. 创建dao文件夹

2. 创建dao.go文件

   ```go
   package dao
   
   
   func main() {
   
   }
   ```

   

#### 导入包

```go
package main

import "dao"

func main(){
    dao.Test()
}
```



## Golang包管理工具

#### Go module简介

用来管理模块中包的依赖关系

#### Go mod使用方法

* 初始化模块
  `go mod init <项目模块名称>`
* 依赖关系处理，根据go.mod文件
  `go mod tidy`
* 将依赖包复制到项目下的vendor目录
  `go mod vendor`
  如果包被墙，可以使用这个命令，随后使用 **go build -mod=vendor**编译
* 显示依赖关系
  `go list -m all`
* 显示详细依赖关系
  `go list -m -json all`
* 下载依赖
  `go mod download [path@version]`



#### 导入其他包

例如gin包

先在https://golang.google.cn/ 官网点击Packages

搜索`gin`，把导入的语句复制到代码中

```go
import "github.com/gin-gonic/gin"
```

然后运行

```go
go mod tidy
```

自动安装依赖

在根据文档所说，把以下代码放入main函数中

```go
  r := gin.Default()
  r.GET("/ping", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
      "message": "pong",
    })
  })
  r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
```



最后完整代码：

```go
package main

import (
  "net/http"

  "github.com/gin-gonic/gin"
)

func main() {
  r := gin.Default()
  r.GET("/ping", func(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{
      "message": "pong",
    })
  })
  r.Run() // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}
```



然后运行代码，就可以开启一个Http服务



## Golang并发编程



#### 之协程

Golang中的并发是函数相互独立运行的能力。

`Goroutines`是并发运行的函数。Golang提供了 Goroutines作为并发处理操作的一种方式。

创建一个协程很简单，就是在任务函数前添加一个go关键字

```go
go task()
```

###### 实例1

还是同步执行，会阻塞

```go
func showMsg(msg string) {
	for i := 0; i < 5; i++ {
		fmt.Printf("%s\n", msg)
		time.Sleep(time.Millisecond * 100)
	}
}

func main() {
	showMsg("javascript")
	showMsg("golang")

	fmt.Printf("%v\n", "end..")
}
```

输出

```go
javascript
javascript
javascript
javascript
javascript
golang
golang
golang
golang
golang
end..
```

第一个是协程，不会阻塞第二个函数执行

```go
func main() {
	go showMsg("javascript")
	showMsg("golang")

	fmt.Printf("%v\n", "end..")
}
```

输出

```go
golang
javascript
javascript
golang
golang
javascript
golang
javascript
javascript
golang
end..
```

两个都是协程，但是却没有输出

原因是：两个都是协程，没人阻塞main函数的执行，main执行完之后会立即死亡。随后的两个协程也就跟着死亡

```go
func main() {
	go showMsg("javascript")
	go showMsg("golang")

	fmt.Printf("%v\n", "end..")
}
```

输出

```go
end..
```



###### 实例2

一个获取网络大小的案例

```go
func responseSize(url string) {
	fmt.Println("Step1:", url)
	response, err := http.Get(url)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Step2:", url)
	defer response.Body.Close()

	fmt.Println("Step3:", url)
	body, err := ioutil.ReadAll(response.Body)
	if err != nil {
		log.Fatal(err)
	}
	fmt.Println("Step4:", url, len(body))
}

func main() {
	go responseSize("http://39.98.110.164:8888")
	go responseSize("https://baidu.com")
	go responseSize("https://jd.com")
	time.Sleep(time.Second * 10)
}
```

输出

```go
Step1: https://jd.com
Step1: https://baidu.com
Step1: http://39.98.110.164:8888
Step2: http://39.98.110.164:8888
Step3: http://39.98.110.164:8888
Step4: http://39.98.110.164:8888 654
Step2: https://baidu.com
Step3: https://baidu.com
Step2: https://jd.com
Step3: https://jd.com
Step4: https://jd.com 177121
Step4: https://baidu.com 385731
```



#### 之通道channel

Go提供了一种称为通道的机制，用于在goroutine之间`共享数据`。当使用goroutine进行并发活动时，需要在goroutine之间共享资源或数据。通道充当goroutine之间的管道，并提供一种机制来保证同步交换。

需要在声明通道时指定数据类型。我们可以共享内置、命名、结构和引用类型的值和指针。数据在通道上传递：在任何给定时间只有一个goroutine可以访问数据项，因此不会发生数据竞争。

根据数据交换的行文，有两种类型的通道：**无缓冲通道**和 **缓冲通道**。无缓冲通道用于执行goroutine之间的同步通信，而缓冲通道用于执行异步通信。无缓冲通道保证在发送和接收的瞬间执行两个goroutine之间的交换。缓冲通道没有这样的保证。

**通道由 make 函数创建，该函数指定 chan 关键字和通道的元素类型**



###### 语法

```go
Unbuffered := make(chan int) // 整型无缓冲通道
buffered := make(chan int,10) //整型有缓冲通道
```

使用内置函数`make`创建通道，`make`的第一个参数需要关键字`chan`，然后是通道允许交换的数据类型。



**发送和接收的语法**

发送，要使用`<-`运算符

```go
goroutine1 := make(chan string,5)
goroutine1 <- "hello"
```

一个包含5个值的缓冲区的字符串类型的goroutine1童年到。然后通过通道发送字符串



接收

```go
data := <- goroutine1 //从通道接收字符串
```

`<-`运算符附加到通道变量的左侧，以接收来自通道的值



###### 特性

1. 对于同一个通道，发送操作之间是互斥的，接收操作之间也是互斥的。
2. 发送操作和接收操作中对元素值的处理都是不可分割的。
3. 发送操作在完全完成之前会被阻塞。接收操作也是如此。



###### 实例

main函数在收到通道的数据之前是不会往下走的，会阻塞。所以即使设置了延迟，main函数也会等待通道数据返回。

```go
// 定义通道
var values = make(chan int)

func send() {
	rand.Seed(time.Now().UnixNano())
	value := rand.Intn(10)
	fmt.Printf("send:%v\n", value)
	// time.Sleep(3 * time.Second)
	values <- value
}

func main() {
	defer close(values)
	go send()
	fmt.Println("wait...")
	value := <-values
	fmt.Printf("receive:%v\n", value)
	fmt.Println("end...")

}
```

输出

```go
wait...
send:3
receive:3
end...
```



#### 之WaitGroup同步

###### 实例

导包`sync`

定义变量 和类型`wp sync.WaitGroup`

`wp.Add(1)`向组中追加一个

`wp.Done()`从组中删除一个

`wp.Wait()`直到组中没有数据后才会越过，否则阻塞在此，也就是等待组中的任务都执行完毕

```go
var wp sync.WaitGroup

func show(i int) {
	defer wp.Done()
	fmt.Println("I:", i)
}

func main() {
	for i := 0; i < 10; i++ {

		go show(i)
		wp.Add(1)
	}
	wp.Wait()
	fmt.Println("end...")
}
```



#### 之 runtime包

runtime包里面定义了一些协程管理相关的api



###### runtime.Gosched()

sched：调度

让出CPU时间片，重新等待安排任务

**实例**

没有使用Gosched时：输出不确定

```go
func show(s string) {
	for i := 0; i < 2; i++ {
		fmt.Printf("%v\n", s)
	}
}

func main() {
	go show("java")

	for i := 0; i < 2; i++ {
		// runtime.Gosched()
		fmt.Printf("%v\n", "golang")
	}
}
```

输出

```go
golang
golang
java
```



使用Gosched时

每次main协程准备输出时，就会放弃CPU时间片，CPU就会输出show协程的数据，等没有协程可以执行了，再执行main后续的代码

```go
func show(s string) {
	for i := 0; i < 2; i++ {
		fmt.Printf("%v\n", s)
	}
}

func main() {
	go show("java")

	for i := 0; i < 2; i++ {
		runtime.Gosched()
		fmt.Printf("%v\n", "golang")
	}
}
```

输出

```go
java
java
golang
golang
```



###### runtime.Goexit()

退出当前协程

下面实例，当i>5时，直接退出协程

```go
func show(s string) {
	defer wp.Done()
	for i := 0; i < 10; i++ {
		if i > 5 {
			runtime.Goexit()
		}
		fmt.Printf("%v\n", s)
	}
}

func main() {
	wp.Add(1)

	go show("java")

	wp.Wait()
}
```

输出

```go
java
java
java
java
java
java
```



###### runtime.GOMAXPROCS

设置CPU最大核心数

如果不设置就是使用最大核心数来执行。

如果CPU核心数设为1，则必定是顺序执行，因为其中一个函数没执行完是不能执行另个一个函数的，设为2以上，就是交替输出。

```go
func showA() {
	for i := 0; i < 10; i++ {
		fmt.Printf("A:%v\n", i)
	}
}
func showB() {
	for i := 0; i < 10; i++ {
		fmt.Printf("B:%v\n", i)
	}
}
func main() {
	fmt.Printf("runtime.NumCPU:%v\n", runtime.NumCPU())
	runtime.GOMAXPROCS(2)
	go showA()
	go showB()
	time.Sleep(1000 * time.Millisecond)
}
```



#### 之Mutex互斥锁实现同步

除了使用 channel 实现同步之外，还可以使用 Mutex 互斥锁的方式实现同步。



###### 实例

**没有加锁也没有加协程的时候：**

```go
var m int = 10

func add() {
	m += 1
	fmt.Printf("m++:%v\n", m)
}
func sub() {
	m -= 1
	fmt.Printf("m--:%v\n", m)
}
func main() {
	for i := 0; i < 5; i++ {
		add()
		sub()
	}

	fmt.Printf("end:%v\n", m)
}
```

输出：是同步输出

```go
m++:11
m--:10
m++:11
m--:10
m++:11
m--:10
m++:11
m--:10
m++:11
m--:10
end:10
```



**加了协程没有加锁的时候：**

```go
var m int = 10

var wp sync.WaitGroup

func add() {
	defer wp.Done()
	m += 1
	fmt.Printf("m++:%v\n", m)
}
func sub() {
	defer wp.Done()
	m -= 1
	fmt.Printf("m--:%v\n", m)
}
func main() {
	for i := 0; i < 5; i++ {
		go add()
		wp.Add(1)
		go sub()
		wp.Add(1)
	}
	wp.Wait()
	fmt.Printf("end:%v\n", m)
}
```

输出：最后资源数可能会改变

```go
m++:11
m--:10
m++:10
m--:9
m++:11
m--:10
m++:11
m++:12
m--:11
m--:10
end:10
```



**为了保证同一时间只能有一个协程去 改变资源数，就需要加锁**

```go
var m int = 10

var wp sync.WaitGroup
var lock sync.Mutex

func add() {
	defer wp.Done()
	lock.Lock()
	m += 1
	fmt.Printf("m++:%v\n", m)
	lock.Unlock()
}
func sub() {
	defer wp.Done()
	lock.Lock()
	m -= 1
	fmt.Printf("m--:%v\n", m)
	lock.Unlock()
}
func main() {
	for i := 0; i < 5; i++ {
		go add()
		wp.Add(1)
		go sub()
		wp.Add(1)
	}
	wp.Wait()
	fmt.Printf("end:%v\n", m)
}
```

输出：保证了资源数最后是不变的

```go
m++:11
m--:10
m--:9
m--:8
m++:9
m--:8
m--:7
m++:8
m++:9
m++:10
end:10
```



#### 之 channel 的遍历

###### 方法1	for循环+if判断

如果读得多，写得少，并且通道还没有关闭，则会报错

关闭通道了 之后，读的超过的部分获取的是默认值

```go
var chann = make(chan int)

func main() {
	go func() {
		for i := 0; i < 2; i++ {
			chann <- i
		}
        // close(chann)  不关闭会报错
	}()

	for i := 0; i < 3; i++ {
		r := <-chann
		fmt.Printf("f:%v\n", r)
	}
}
```

输出

```go
f:0
f:1
fatal error: all goroutines are asleep - deadlock!
```





###### 方法2	for range

```go
var chann = make(chan int)

func main() {
	go func() {
		for i := 0; i < 2; i++ {
			chann <- i
		}
		close(chann)
	}()

	for v := range chann {
		fmt.Printf("chann:%v\n", v)
	}
}
```

输出

```go
chann:0
chann:1
```



#### 之 select switch

1. `select `是 Go 中的一个控制结构，类似于switch语句，用于处理异步IO操作。select会监听`case`语句中 channel 的读写操作，当`case` 中的`channel `读写操作为非阻塞状态时，将会触发相应的操作。

   > select 中的 case语句必须是一个 channel 操作
   >
   > select中的 default 子句总是可运行的

2. 如果有多个` case` 都可以运行，`select`会随机公平的选出一个执行，其他不会执行

3. 如果没有可运行的`case`语句，且有`default`语句，那么就会执行`default`的动作。

4. 如果没有可运行的`case`语句，且没有`default`语句，select将阻塞，直到某个case通信可以运行。

###### 实例

```go
var chann1 = make(chan int)
var chann2 = make(chan string)

func main() {
	go func() {
		chann1 <- 10
		chann2 <- "hello"
		defer close(chann1)
		defer close(chann2)
	}()
	for {
		select {
		case res := <-chann1:
			fmt.Printf("chann1:%v\n", res)
		case res := <-chann2:
			fmt.Printf("chann2:%v\n", res)
		default:
			fmt.Println("No Message Received")
		}
		time.Sleep(time.Second)
	}
}
```

输出

```go
No Message Received
chann1:10
chann2:hello
chann1:0
chann2:
chann1:0
chann1:0
```



#### 之 Timer

Timer 顾名思义，就是定时器的意思，可以实现一些定时操作，内部是使用channel 来实现的。

**案例1**

单纯的阻塞2s。不如直接`tiem.Sleep(tiem.Second*2)`

返回的是一个timer.C，是一个通道类型数据

```go
func main() {
	var timer = time.NewTimer(time.Second * 2)

	fmt.Printf("timeType:%T\n", timer)
	fmt.Printf("time.Now:%v\n", time.Now())
	t1 := <-timer.C
	fmt.Printf("t1:%v\n", t1)
}
```

输出：先输出前两行，2s后输出最后一行，因为

```go
timeType:*time.Timer
time.Now:2023-04-17 13:23:29.7093705 +0800 CST m=+0.007481501
t1:2023-04-17 13:23:31.7123475 +0800 CST m=+2.010458501
```



**案例2**

也是阻塞2s

```go
<- time.After(time.Second * 2)
fmt.Println("2s后输出")
```



**案例3**

停止阻塞并跳过。timer.Stop()，被停止的timer后续的代码也不会执行。

```go
func main() {
	var timer = time.NewTimer(time.Second * 2)
	go func() {
		<-timer.C
		fmt.Println("协程中的输出")
	}()

	stop := timer.Stop()
	if stop {
		fmt.Println("timer stopped")
	}
}
```

输出：输出第一行之后，等待2s，程序结束

```go
timer stopped
```



**案例4**

Reset，重新设置时间

本应该阻塞5s再运行，重置之后只需要阻塞1s

```go
func main() {
	fmt.Println("begin..")
	timer := time.NewTimer(time.Second * 5)
	timer.Reset(time.Second * 1)
	<-timer.C

	fmt.Println("end..")
}
```



#### 之 Ticker

Ticker可以周期的执行，类似于js的setInterval



**案例**

使用for range，可以以ticker为周期的执行代码。以下代码每一秒打印一次ticker，打印6个之后就结束

```go
func main() {
	var ticker = time.NewTicker(time.Second * 1)

	count := 0
	for _ = range ticker.C {
		fmt.Println("ticker...")
		count++
		if count > 5 {
			ticker.Stop()
			break
		}
	}
}
```



**案例2**

```go
var wait sync.WaitGroup

func main() {
	var ticker = time.NewTicker(time.Second * 1)
	var ticker2 = time.NewTicker(time.Second * 3)
	var chann1 = make(chan int)
	go func() {
		defer wait.Done()
		for _ = range ticker.C {
			fmt.Println("我正在等待..")
			value := <-chann1
			fmt.Printf("我收到了:%v\n", value)
		}
	}()
	count := 0
	wait.Add(1)
	for _ = range ticker2.C {
		count++
		chann1 <- count
		fmt.Printf("我发送了:%v\n", count)
	}
	wait.Wait()
	fmt.Println("end...")
}
```



**案例3**

子协程每1s向通道添加一个数据

主协程不断循环，如果通道中没有数据会阻塞，有就会执行代码

```go
var wait sync.WaitGroup

func main() {
	var ticker = time.NewTicker(time.Second * 1)
	var chann = make(chan int)
	go func() {
		for _ = range ticker.C {
			select {
			case chann <- 1:
			case chann <- 2:
			case chann <- 3:
			}
		}
	}()

	sum := 0
	for v := range chann {
		fmt.Printf("收到:%v\n", v)
		sum += v
		if sum > 10 {
			break
		}
	}
}
```



#### 之 原子变量的引入

在之前，要保证，资源数量不会改变的时候，需要使用互斥锁来保证。

还有另一个方法，就是原子操作，原子操作不可中断，不可分割，所以可以保证资源数量的不变

```go
var wait sync.WaitGroup

var i int32 = 100

func add() {
	defer wait.Done()
	atomic.AddInt32(&i, 1)
}
func sub() {
	defer wait.Done()
	atomic.AddInt32(&i, -1)
}
func main() {
	for i := 0; i < 10; i++ {
		go add()
		wait.Add(1)
		go sub()
		wait.Add(1)
	}
	wait.Wait()
	fmt.Printf("i:%v\n", i)
}
```

输出

```go
i:100
```



#### 之 原子操作详解

`atomic`提供的原子操作能够确保任意时刻只有一个goroutine对变量进行操作，善用 atomic 可以避免大量的锁操作

atomic 常见的操作有：

1. 增减
2. 载入
3. 比较并交换cas
4. 交换
5. 存储

###### 增减操作

```go
func AddInt32(addr *int32,delte int32)(new int32)
func AddInt64(addr *int64,delte int64)(new int64)
func AddUint32(addr *uint32,delte uint32)(new uint32)
func AddUint64(addr *uint64,delte uint64)(new uint64)
func AddUintptr(addr *uintptr,delte uintptr)(new uintptr)
```

```go
atomic.AddInt32(&i, 1)
atomic.AddInt32(&i, -1)
```



###### 载入(读)操作

保证了在读取变量的时候，不会的其他协程修改

```go
func main() {
	var i int32 = 100

	value := atomic.LoadInt32(&i)

	fmt.Printf("value:%v\n", value)
}
```



###### 存储操作

把之前的变量存储为一个新的值200

```go
func main() {
	var i int32 = 100
	atomic.StoreInt32(&i, 200)
	fmt.Printf("i:%v\n", i)
}
```



###### cas操作

把第一个参数和变量的值比较，如果一样，则赋值后面的值。

如果不一样，则赋值失败，此次原子操作就是失败的。有返回值

以下代码，如果进行原子操作时，i的值不是100，那么f的值就是false，并且i也不会变成200。

如果是100，则f的值是true，且i的值也会变成200

```go
func main() {
	var i int32 = 100
	f := atomic.CompareAndSwapInt32(&i, 100, 200)
	fmt.Printf("f:%v\n", f)
	fmt.Printf("i:%v\n", i)
}
```



###### 交换

不比较，直接交换。并且有返回值，返回值是交换前的值。

```go
func main() {
	var i int32 = 100
	atomic.SwapInt32(&i, 200)
	fmt.Printf("i:%v\n", i)
}
```





