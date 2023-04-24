---
title: Golang之OS
icon: golang
category:
  - 后端
tag:
  - Golang
---
# ""

## Golang OS模块



#### 文件目录

OS标准库实现了平台(操作系统)无关的编程接口



###### **创建文件**

`os.Create(文件名)`

等价于：`os.OpenFile(name,O_RDWR|O_CREATE|O_TRUNC,0666)`

在同级目录下生成文件

创建完之后最好关闭

```go
func main() {
	f, err := os.Create("a.txt")
	if err != nil {
		fmt.Printf("err:%v\n", err)
	} else {
        f.Close()
		fmt.Printf("fileName:%v\n", f.Name())
	}
}
```

###### 创建文件到临时目录

`os.CreateTemp("","")`

第一个参数 目录默认。第二个参数：文件名前缀

```go
f,_ :os.CreateTemp("","temp")
fmt.Printf("f.Name():%v\n",f.Name())
```

输出：以temp为前缀，随机字符为后缀的文件名

```go
f.Name():C:\Users\ADMINI~1\AppData\Local\Temp\temp672924595
```



###### **创建目录**

`os.Mkdir("目录路径",权限)`

在同级目录下创建一个单独目录

```go
func main() {
	err := os.Mkdir("a", os.ModePerm)
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
}
```



###### **创建多级目录**

`os.MkdirAll("目录路径",权限)`

```go
func main() {
	err := os.MkdirAll("a/b/c", os.ModePerm)
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
}
```



###### **删除目录**

`os.Remove(目录路径)`

`os.RemoveAll(路径)`

```go
func remove(path string) {
	err := os.Remove(path)
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
}
```



###### **删除文件**

`os.Remove(fileName)`

```go
func remove(filePath string) {
	err := os.Remove(filePath)
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
}
```



###### **获得工作目录**

`os.Getwd()`

```go
func main() {
	dir, err := os.Getwd()
	if err != nil {
		fmt.Printf("err:%v\n", err)
	} else {
		fmt.Printf("dir:%v\n", dir)
	}
}
```



###### **修改工作目录**

`os.Chdir("路径")`

```go
func chDir(dir string) {
	err := os.Chdir(dir)
	if err != nil {
		fmt.Printf("err:%s\n", err)
	}
}
```



###### **获得临时目录**

`os.TempDir()`

```go
func getTempDir() string {
	s := os.TempDir()
	return s
}
```



###### **重命名文件**

`os.Rename(oldFileName,newFileName)`

```go
func rename(oldname, newname string) {
	err := os.Rename(oldname, newname)
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
}
```



###### 读文件

`os.ReadFile("文件名")`

```go
func readFile(fileName string) {
	b, err := os.ReadFile(fileName)
	if err != nil {
		fmt.Printf("err:%v\n", err)
	} else {
		fmt.Printf("b:%v\n", string(b[:]))
	}
}
```



###### 写文件

`os.WriteFile("文件名",[]byte("内容"),权限)`

```go
func wirte(fileName string) {
	err := os.WriteFile("test.txt", []byte("i am erickiku"), os.ModePerm)
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
}
```







#### 文件打开操作

`os.Open("文件名")`：简单的打开操作

`os.OpenFile("文件名",os.O_RDWR|os.O_CREATE,0755)`

分别是：文件名，权限和如果没有是否创建，还有读写执行权限等级

7:111 读写可执行

5:101 读和可执行

```go
func main() {
	f, _ := os.Open("test.txt")
	fmt.Printf("f.Name:%v\n", f.Name())

	f2, _ := os.OpenFile("a.txt", os.O_RDWR|os.O_CREATE, 0755)
	fmt.Printf("f2.Name():%v\n", f2.Name())

	f.Close()
	f2.Close()
}
```

 

#### 文件读操作

文件打开后，可以读取文件内容，拥有指针，可以随意读取指定位置的内容

采用循环读取

创建一个 缓冲区`buf`，然后一次把文件中的内容放入缓冲区，缓冲区有大小

`f.Read()`可以把f里读取到的内容放入参数缓冲区中，可以使用`io.EOF`来判断是否到文件尾了。

```go
func readOps() {
	f, _ := os.Open("test.txt")
	for {
		buf := make([]byte, 3)
		n, err2 := f.Read(buf)
		fmt.Println(string(buf))
		fmt.Printf("n:%v\n", n)
		if err2 == io.EOF {
			break
		}
	}
	f.Close()
}
```



###### 读取指定字节数

`f.ReadAt(buf,length)`

指定从第几个位置开始读，读的长度是缓冲区的长度

```go
func readAt() {
    f, _ := os.Open("test.txt")
    buf := make([]byte, 4)
    n, _ := f.ReadAt(buf, 4)
    fmt.Printf("n:%v\n", n)
    fmt.Printf("buf:%v\n", string(buf))
}
```

#### 文件写操作

**写字节数组**

可以追加和覆盖

`O_APPEND`追加

`O_TRUNC`覆盖

```go
func write() {
	f, _ := os.OpenFile("test.txt", os.O_RDWR|os.O_APPEND, 0755)
	f.Write([]byte("hello golang"))
	f.Close()
}
```

**写字符串**

```go
func writeString() {
	f, _ := os.OpenFile("test.txt", os.O_RDWR|os.O_APPEND, 0777)
	f.WriteString("hello goling")
	f.Close()
}
```



**向指定的位置写入**

```go
func writeAt() {
	f, _ := os.OpenFile("test.txt", os.O_RDWR, 0777)
	f.WriteAt([]byte("HHH"), 4)
	f.Close()
}
```



#### 读取文件夹

`os.ReadDir("")`

获取该文件夹下的所有文件

```go
func getDir() {
	de, _ := os.ReadDir("a")
	for _, v := range de {
		fmt.Printf("visDir:%v\n", v.IsDir())
		fmt.Printf("v:%v\n", v.Name())
	}
}
```



###### 定位

`f.Seek(3,0)`

从文件的第3个位置开始读

```go
func seek() {
	f, _ := os.Open("test.txt")
	f.Seek(3, 0)
	buf := make([]byte, 5)
	f.Read(buf)
	fmt.Printf("buf:%v\n", string(buf))
}
```

文件:

```
iamerickiku
```

输出

```go
buf:erick
```



## Golang OS包进程



```go
func main() {
	// 获得当前正在运行的进程ID
	fmt.Printf("os.Getpid:%v\n", os.Getpid())
	// 父进程ID
	fmt.Printf("os.Getppid:%v\n", os.Getppid())

	// 设置新进程的属性
	attr := &os.ProcAttr{
		// files指定新进程继承的活动文件对象
		// 前三个分别为，标准输出、标准输出、标准错误输出
		Files: []*os.File{os.Stdin, os.Stdout, os.Stderr},
		// 新进程的环境变量
		Env: os.Environ(),
	}

	// 开始一个新进程
	p, err := os.StartProcess("C:\\WINDOWS\\system32\\notepad.exe",
		[]string{"C:\\WINDOWS\\system32\\notepad.exe", "D\\a.txt"}, attr)
	if err != nil {
		fmt.Println(err)
	}
	fmt.Println(p)
	fmt.Printf("进程ID:%v\n", p.Pid)

	// 通过进程ID查找进程
	p2, _ := os.FindProcess(p.Pid)
	fmt.Println(p2)

	// 等待10秒，执行函数
	time.AfterFunc(time.Second*10, func() {
		// 向p进程发送退出信号
		p.Signal(os.Kill)
	})

	// 等待p进程的退出，返回进程状态
	ps, _ := p.Wait()
	fmt.Println(ps.String())
}
```



## Golang OS包和环境相关方法

```go
func main() {
	//获得所有环境变量
	s := os.Environ()
	fmt.Printf("f:%v\n", s)
	//获得某个环境变量
	s2 := os.Getenv("GOPATH")
	fmt.Printf("s2:%v\n", s2)
	//设置环境变量
	os.Setenv("env1", "env1")

	// 查找
	s, b := os.LookupEnv("env1")
	fmt.Printf("s:%v\n", s)
	fmt.Printf("b:%v\n", b)
}
```



## Golang IO包

Go中，为了方便开发者使用，将IO操作封装在了如下几个包中。

* io 为 IO原语，提供基本的接口
* io/ioutil 封装一些使用的I/O函数
* fmt实现格式化I/O，类似于C语言中的printf和scanf
* bufio 实现带缓冲I/O



#### IO 基本的IO接口

在io包中最重要的两个接口：`Reader`和`Writer`接口。本章所提到的各种IO包，都跟这两个接口有关，也就是说，只要实现了这两个接口，它就有了IO的功能。

###### Reader接口

```go
type Reader interface {
	Read(p []byte) (n int, err error)
}
```

###### Writer 接口

```go
type Writer interface {
	Write(p []byte) (n int, err error)
}
```



#### 实现了Reader和Writer的包

```go
os.File 实现了Reader和Writer
strings.Reader 实现了Reader
bufio.Reader/Writer
bytes.Buffer  两个都实现
bytes.Reader  实现了Reader
compress/gzip.Reader/Writer  两个都实现了
crypto/cipher.StreamReader/StreamWriter		分别实现
crypto/tls.Conn	两个都实现
encoding/csv.Reader/Writer	分别实现
```



## Golang IOUtil包

封装了一些IO函数

1. `ReadAll`：读取数据，返回读到的字节 Slice
2. `ReadDir`：读取一个目录，返回目录入口数组[]os.FileInfo
3. `ReadFile`：读取一个文件，返回文件内容字节 slice
4. `WriteFile`：根据文件路径，写入字节 slice
5. `TempDir`：在一个目录中创建指定前缀名的临时目录，返回新临时目录路径
6. `TempFile`：在一个目录中创建指定前缀名的临时文件，返回 os.File



但是已经被弃用

应该使用IO包或者OS包代替：

https://pkg.go.dev/io@go1.20.3



## Golang bufio

> bufio 包实现了有缓冲的I/O。它包装一个io.Reader或io.Writer接口对象。
>
> 创建另一个也实现了该接口，且同时还提供了缓冲和一些文本I/O的帮助函数的对象。

官方文档：https://pkg.go.dev/bufio@go1.20.3



## Golang log包

#### 简介

log包，实现了简单的日志服务。通过log包的函数，可以实现简单的日志打印功能

#### 使用

log包中有3个系列的日志打印函数，分别是`print`系列、`panic`系列、`fatal`系列。

print:单纯打印日志

panic：打印日志，抛出panic异常

fatal：打印日志，强制结束程序(`os.Exit(1)`)，defer不会执行。



#### 实例 

`print：`

```go
func logPrint() {
	log.Print("my log1")
	log.Printf("mylog%v\n", true)
	log.Println("my", ",", "log")
}
```

输出

```go
2023/04/19 11:09:31 my log1
2023/04/19 11:09:31 mylogtrue
2023/04/19 11:09:31 my , log
```



`panic：`

遇到panic会打印一个异常，后续代码不会执行。defer会执行

```go
func logPanic() {
	log.Print("my log")
	log.Panic("my panic")
	log.Print("eng")
}
```

输出

```go
2023/04/19 11:10:36 my log
2023/04/19 11:10:36 my panic
2023/04/19 11:10:36 结束
panic: my panic

goroutine 1 [running]:
log.Panic({0xc000115f30?, 0x3c1ce0?, 0xc000018120?})
	D:/Golang/src/log/log.go:384 +0x65
main.logPanic()
	h:/2022web开发/Golang/代码/go_pro/main.go:13 +0xc5
main.main()
	h:/2022web开发/Golang/代码/go_pro/main.go:17 +0x17
exit status 2
```



`fatal：`

直接调用`os.Exit(1)`，不会执行defer

```go
func fatal() {
	defer log.Print("defer")
	log.Print("my log")
	log.Fatal("fatal")

	log.Print("end")
}
```

输出

```go
2023/04/19 11:15:27 my log
2023/04/19 11:15:27 fatal
exit status 1
```



#### 配置

可以修改log日志的输出格式

```go
func logConfig() {
	i := log.Flags()
	fmt.Println(i)
	log.SetFlags(log.Ldate | log.Ltime | log.Llongfile)
	log.Print("mylog")
}
```

输出

```go
3
2023/04/19 11:18:50 h:/2022web开发/Golang/代码/go_pro/main.go:30: mylog
```



初始化

```go
func init(){
    log.SetFlags(log.Ldate|log.Ltime|log.Llongfile)
}
```



###### 前缀配置

`log`包提供两个日志前缀配置函数

```go
func Prefix() string //返回日志的前缀配置
func SetPrefix(prefix string) //设置前缀配置
```



#### 日志输出位置

默认值将日志输出到控制台，还可以把日志输出到文件中。	

提供的函数：

```go
func SetOutput(w io.Writer)
```

###### 日志输出位置配置

```go
func init() {
	log.SetPrefix("\nERICKIKU_LOG:")
	f, err := os.OpenFile("test.txt", os.O_WRONLY|os.O_CREATE|os.O_APPEND, 0664)
	if err != nil {
		fmt.Println(err)
	}
	log.SetOutput(f)
}
```



#### 自定义 logger

log包中提供了`func New(out io.Writer,prefix string,flag int)*Logger`函数来自定义logger

```go
var logger * log.Logger

func init(){
    logFile,err := os.OpenFile("a.log",os.O_CREATE|	os.O_WRONLY|os.O_APPEND,0644)
    if err!= nil{
        log.Panic("error")
    }
    logger = log.New(logFile,"success",log.Ldate|log.Ltime|log.Lshortfile)
}
func main(){
    logger.Println("DIY logger")
}
```



## Golang builtin

包提供了一些类型声明、变量和常量声明，还有一些便利函数，这个包不需要导入，这些变量和函数就可以直接使用。

#### 常用函数

###### **append**

```go
func append(slice []Type, elems ...Type)[]Type

slice = append(slice,elem1,elem2)
slice = append(slice,anotherSlice...)
```

**实例**

```go
func main() {
	var sli1 = []int{1, 2, 3}
	sli1 = append(sli1, 4)
	sli1 = append(sli1, 5)
	fmt.Printf("sli1:%v\n", sli1)
}
```

输出

```go
sli1:[1 2 3 4 5]
```



**合并切片**


```go
func main() {
	var sli1 = []int{1, 2, 3}
	var sli2 = []int{4, 5, 6}
	sli2 = append(sli2, sli1...)
	fmt.Printf("sli2:%v\n", sli2)
}
```

输出

```go
sli2:[4 5 6 1 2 3]
```



###### len

```go
func main() {
	var s = "Hello World!"
	fmt.Printf("len(s): %v\n", len(s))
	var sli1 = []int{1, 2, 3}
	fmt.Printf("len(sli1): %v\n", len(sli1))
}
```

输出

```go
len(s): 12
len(sli1): 3
```



###### panic

抛出一个异常

```go
func main(){
    defer fmt.Println("defer")
    panic("error")
    fmt.Println("end...")
}
```

输出

```go
defer
panic: error

goroutine 1 [running]:
main.main()
	h:/2022web开发/Golang/代码/go_pro/main.go:7 +0x73
exit status 2
```





###### new   make

`new`和`make`的区别：

1. `make`只能用来**分配及初始化**类型为`slice`，`map`，`chan`的数据。`new`可以分配任意类型的数据
2. `new`分配返回的是指针，即类型`*T`;`make`返回引用，即`T`
3. `new`分配的空间被清零，`make`分配后，会进行初始化



**实例**

new

```go
func main() {
	b := new(bool)
	fmt.Printf("b:%v\n", *b)
	i := new(int)
	fmt.Printf("i:%v\n", *i)
	s := new(string)
	fmt.Printf("s:%v\n", *s)
}
```

输出

```go
b:false
i:0
s:
```



make

```go
make([]int,10,100)
```

分配一个有100个int的数组，创建一个长度为10，容量为100的切片，该slice引用包含前10个元素的数组。对应的，new([]int)返回一个指向新分配的，被置零的slice结构体的指针，即指向值为nil的slice的指针。

```go
func main() {
	var p *[]int = new([]int)
	i := make([]int, 10, 100)

	fmt.Println(p)
	fmt.Println(i)
}
```

输出

```go
&[]
[0 0 0 0 0 0 0 0 0 0]
```





## Golang bytes

bytes包提供了对`字节切片`进行读写操作的一些列函数，字节切片处理的函数比较多分为基本处理函数，比较函数、后缀检查函数、索引函数、分割函数、大小写处理函数和子切片处理函数等。

#### 常用函数

**`Contains`**：第一个参数是否包含第二个参数

`func Contains(b, subslice []byte) bool`

```go
func main() {
	var str = "erickiku"
	b := []byte(str)
	b1 := []byte("kik")
	b2 := bytes.Contains(b, b1)
	fmt.Println(b2)
}
//true
```



**`Count`**：第一个参数里有几个第二个参数

如果第二个参数是空字符串，那就是返回第一个参数字符串长度+1

`func Count(s, sep []byte) int`

```go
func main() {
	var b = []byte("helooooo")
	var b1 = []byte("o")
	i := bytes.Count(b, b1)
	fmt.Println(i)
}

//5
```



`Repeat`：重复byte切片

`func Repeat(b []byte, count int) []byte`

```go
func main() {
	var b = []byte("hel ")
	b2 := bytes.Repeat(b, 3)
	fmt.Printf("b2:%s\n", b2)
}

//hel hel hel
```



`Replace`：替换，第一个参数是源数据，第二个参数是替换什么，第三个参数是替换成什么，第四个参数是替换几次，-1就是全替换，0是不替换

参数除了替换几次外，全是[]byte类型

`func Replace(s, old, new []byte, n int) []byte`

```go
func replace(s []byte, old, new []byte, count int) []byte {
	b := bytes.Replace(s, old, new, count)
	return b
}
func main() {
	var s = []byte("this is a string")
	b := replace(s, []byte("i"), []byte("-yeeee-"), -1)
	fmt.Printf("b:%s\n", b)
}

//b:th-yeeee-s -yeeee-s a str-yeeee-ng
```



`Runes`：Runes函数返回和s等价的[]rune切片。（将utf-8编码的unicode码值分别写入单个rune）

`func Runes(s []byte) []rune`

```go
func main() {
	var s = []byte("我是中国人")
	r := bytes.Runes(s)
	fmt.Println(len(s))
	fmt.Printf("r:%v\n", len(r))
}

//15
//r:5
```



`Join`：将一系列[]byte切片连接为一个[]byte切片，之间用sep来分隔，返回生成的新切片。

`func Join(s [][]byte, sep []byte) []byte`

```go
func main() {
	var b = [][]byte{[]byte("hello"), []byte("world")}
	var sep = []byte("-*-")
	b2 := bytes.Join(b, sep)
	fmt.Printf("b2:%s\n", b2)
}

//b2:hello-*-world
```





#### Reader类型

Reader实现了`io.Reader`,`io.ReaderAt`,`io.WriterTo`,`io.Seeker`,`io.ByteScanner`,`io.RuneScanner`接口，Reader是只读的、有seek



**`NewReader`**：NewReader创建一个从s读取数据的Reader。

`func NewReader(b []byte) *Reader`

**`Len`**：Len返回r包含的切片中还没有被读取的部分。

`func (r *Reader) Len() int`

```go
func reader() {
	data := "13613200891"
	r := bytes.NewReader([]byte(data))
	fmt.Printf("r.Len(): %v\n", r.Len())
}
func main() {
	reader()
}

//11
```



实例

```go
func reader() {
	data := "13613200891"
	r := bytes.NewReader([]byte(data))
	fmt.Printf("r.Len(): %v\n", r.Len())
	fmt.Printf("r.Size(): %v\n", r.Size())

	buf := make([]byte, 2)
	n, err := r.Read(buf)
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
	fmt.Println(string(buf[:n]))
	n, err = r.Read(buf)
	if err != nil {
		fmt.Printf("err:%v\n", err)
	}
	fmt.Println(string(buf[:n]))
	fmt.Printf("r.Len(): %v\n", r.Len())

	r.Seek(0, 0)
	for {
		b, err2 := r.ReadByte()
		if err2 != nil {
			break
		}
		fmt.Println(string(b))

	}
	fmt.Println("-------------")
	r.Seek(0, 0)
	off := int64(0)
	for {
		n2, err2 := r.ReadAt(buf, off)
		if err2 != nil {
			break
		}
		off += int64(n2)
		fmt.Println(off, string(buf[:n]))
	}

}
func main() {
	reader()
}
```

输出

```go
r.Len(): 11
r.Size(): 11
13
61
r.Len(): 7
1
3
6
1
3
2
0
0
8
9
1
-------------
2 13
4 61
6 32
8 00
10 89
```



#### Buffer类型

缓冲区是具有读取和写入方法的可变大小的字节缓冲区。Buffer的零值是准备使用的空缓冲区。

**声明Buffer**

四种方法

```go
func main() {
	var b bytes.Buffer
	b1 := new(bytes.Buffer)
	b2 := bytes.NewBuffer([]byte("www"))
	b3 := bytes.NewBufferString("erickiku")
	fmt.Printf("b,b1,b2,b3%v%v%v%v\n", b, b1, b2, b3)
}
```

**往Buffer中写入数据**

```go
b.Write(d []byte)
b.WriteString)(s string)
b.WriteByte(c byte)
b.WrieRune(r rune)
b.WriteTo(w io.Writer)
```

> 将文件中的内容写入Buffer，则使用 ReadForm(i io.Reader)



## Golang errors

errors包实现了操作错误的函数，使用errors类型来返回函数执行过程中遇到的错误。如果error为`nil`表示没有错误 

#### error结构

```go
type error interface{
    Error() string
}
```

可以用任何类型去实现它，只要添加一个error()方法即可，也就是说，error可以是任何类型，这意味着，函数返回的error值实际可以包含任何信息，不一定是字符串。

error不一定表示一个错误，它可以表示任何信息，比如IO包中就用error类型的`io.EOF`表示数据读取结束，而不是遇到了什么错误。

errors包实现了一个最简单的error类型，只包含一个字符串，它可以记录大多数情况下遇到的错误。errors包的用法也很简单，只有一个`New`函数，用于生成一个最简单的error对象。



```go
func isEmpty(s string) (string, error) {
	if s == "" {
		return s, errors.New("string is empty")
	} else {
		return s, nil
	}
}
func main() {
	s, err := isEmpty("")
	if err != nil {
		fmt.Printf("err:%v\n", err)
	} else {
		fmt.Printf("s:%v\n", s)
	}
}
```



#### 自定义错误

```go
type MyError struct {
	when time.Time
	what string
}

func (e MyError) Error() string {
	return fmt.Sprintf("%v:%v", e.when, e.what)
}
func oops() error {
	return MyError{
		time.Date(1989, 3, 15, 22, 30, 0, 0, time.UTC),
		"this file is not find",
	}
}
func main() {
	if err := oops(); err != nil {
		fmt.Println(err)
	}
}
```





## Golang sort包

#### 内容

scor提供了排序切片和用户自定义数据集以及相关功能的函数。

sort包主要针对`[]int、[]float64、[]string`、以及其他自定义切片的排序。

#### 结构体

```go
type IntSlice struct
type Float64Slice 
type StringSlice 
```

#### 函数

https://pkg.go.dev/sort@go1.20.3



#### 实例

```go
func main() {
	s := []int{2, 1, 4, 6, 3}
	sort.Ints(s)
	fmt.Printf("s:%v\n", s)
}
```



## Golang time

包提供测量和显示时间的功能。

#### 基本使用

```go
func main() {
	t := time.Now()
	fmt.Printf("t:%v\n", t)
	i := t.Year()
	m := t.Month()
	i2 := t.Day()
	i3 := t.Hour()
	i4 := t.Minute()
	i5 := t.Second()
	fmt.Printf("%d-%02d-%02d,%02d:%02d:%02d\n", i, m, i2, i3, i4, i5)
	fmt.Printf("%T,%T,%T,%T,%T,%T,", i, m, i2, i3, i4, i5)
}
```

输出

```go
t:2023-04-22 20:18:24.3255498 +0800 CST m=+0.006325601
2023-04-22,20:18:24
int,time.Month,int,int,int,int,
```



#### 时间戳

```go
t := time.Now()

fmt.Printf("Unix:%v", t.Unix())
```

输出

```go
Unix:1682166085
```

`.UnixNano`纳秒级

```go
fmt.Printf("Unix:%v", t.UnixNano())
```



#### 时间戳转时间格式

```go
t := time.Now().Unix()
time := time.Unix(t, 0)
fmt.Printf("time:%v\n", time)
i := time.Year()
m := time.Month()
i2 := time.Day()
i3 := time.Hour()
i4 := time.Minute()
i5 := time.Second()
```



其他请看官网



## 其他库

`json`、`xml`、`math`

看官网





