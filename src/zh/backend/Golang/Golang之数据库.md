---
title: Golang之数据库
icon: golang
category:
  - 后端
tag:
  - Golang
---
# ""


## 安装MySQL驱动

**初始化项目**

```go
go mod init 项目名
```



**安装驱动**

```go
go get -u github.com/go-sql-driver/mysql
```



**使用官网实例**

```go
import (
	"database/sql"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// ...

db, err := sql.Open("mysql", "user:password@/dbname")
if err != nil {
	panic(err)
}
// See "Important settings" section.
db.SetConnMaxLifetime(time.Minute * 3)
db.SetMaxOpenConns(10)
db.SetMaxIdleConns(10)
```



## 初始化连接

Open函数只是验证数据库连接参数是否正确，并不是真正的连接

如果要检查数据源的名称是否真实有效，应该调用`Ping`方法

返回的DB对象可以安全地被多个goroutine并发使用，并且维护其自己的空闲连接池。因此Open函数应该仅被调用一次，很少需要关闭DB对象

```go
package main

import (
	"database/sql"
	"fmt"

	_ "github.com/go-sql-driver/mysql"
)

// 定义全局对象db
var db *sql.DB

// 定义初始化数据库函数
func initDb() (err error) {
	db, err = sql.Open("mysql", "root:123456@tcp(127.0.0.1:3306)/mydb")
	if err != nil {
		return err
	}

	// 尝试连接，校验参数是否正确
	err = db.Ping()
	if err != nil {
		return err
	}

	return nil
}

func main() {

	err := initDb()
	if err != nil {
		fmt.Printf("初始化失败:%v\n", err)
		return
	} else {
		fmt.Println("初始化成功")
	}
}
```

输出

```go
初始化成功
```





## 插入操作

插入、更新和删除操作都使用 `Exec`方法

```go
func (db *DB) Exec(query string,args ...interface)(Result,error)
```

```go
//插入数据

func insertDb() {
	sqlStr := "insert into user(username, password) values (?,?)"
	res, err := db.Exec(sqlStr, "马保国", "闪电五连鞭")
	if err != nil {
		fmt.Printf("insert failed:%v\n", err)
		return
	}

	// 拿到刚才插入的id
	id, err2 := res.LastInsertId()
	if err2 != nil {
		fmt.Printf("get lastId failed:%v\n", err2)
		return
	}

	fmt.Printf("the id:%v\n", id)
}
```



## 查询操作

**单行查询**

单行查询`db.QueryRow()`执行一次查询。并期望返回最多一行结果，

总是返回非nil的值，直到返回值的Scan方法被调用时，才会返回延迟的错误。

```go
type User struct {
	id       int
	username string
	password string
}

func queryRow() {
	sqlStr := "SELECT * FROM user WHERE id=?"
	var user User
	err := db.QueryRow(sqlStr, 102).Scan(&user.id, &user.username, &user.password)
	if err != nil {
		fmt.Printf("err:%v\n", err)
		return
	}
	fmt.Printf("id:%d,username:%s,password:%s", user.id, user.username, user.password)
}
```





**多行查询**

多行查询`db.Query()`执行一次查询，返回多行结果，即Rows

```go
func queryAll() {
	sqlStr := "SELECT * FROM user WHERE id>?"
	rows, err := db.Query(sqlStr, 350)
	if err != nil {
		fmt.Printf("err:%v\n", err)
		return
	}

	// 关闭数据库的连接
	defer rows.Close()

	// 循环读取结果
	for rows.Next() {
		var user User
		err2 := rows.Scan(&user.id, &user.username, &user.password)
		if err2 != nil {
			fmt.Printf("err2:%v\n", err2)
			return
		}
		fmt.Printf("id:%d,username:%s,password:%s\n", user.id, user.username, user.password)
	}

}
```



## 更新操作

使用`Exec`方法

```go
func update() {
	sqlStr := "UPDATE user SET password=? WHERE id = ?"
	r, err := db.Exec(sqlStr, "混元形意太极", 358)
	if err != nil {
		fmt.Printf("err:%v\n", err)
		return
	}

	// 返回收影响的行数
	i, err2 := r.RowsAffected()
	if err2 != nil {
		fmt.Printf("err2:%v\n", err2)
		return
	}
	fmt.Printf("更新成功：%v\n", i)
	queryAll()
}
```



## 删除操作

使用`Exec`方法

```go
func delete() {
	sqlStr := "DELETE FROM user WHERE id = ?"
	r, err := db.Exec(sqlStr, 358)
	if err != nil {
		fmt.Printf("err:%v\n", err)
		return
	}
	i, err2 := r.RowsAffected()
	if err2 != nil {
		fmt.Printf("err2:%v\n", err2)
		return
	}
	fmt.Printf("i:%v\n", i)
	queryAll()
}
```





## Gorm

#### ORM

对象关系映射(Object Relational Mapping)模式是一种为了解决面向对象与关系数据库存在的互不匹配的现象的技术。简单的说，ORM是通过使用描述对象和数据库之间映射的元数据，将程序中的对象自动持久化到关系数据库中。

#### 安装

```go
go get -u gorm.io/gorm
go get -u gorm.io/driver/sqlite
```

```go
type Produce struct {
	gorm.Model
	Code  string
	Price string
}

func main() {
	dsn := "root:123456@tcp(127.0.0.1:3306)/mydb"
	db, err := gorm.Open(mysql.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to open database")
	}

	// 迁移，也就是创建表，按照结构体创建
	db.AutoMigrate(&Produce{})

	// 插入数据
	db.Create(&Produce{Code: "20001", Price: "3888"})
}
```

后续看官网

https://gorm.io/zh_CN/docs/index.html

