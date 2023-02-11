---
title: MyBatis
icon: markdown
category:
  - 后端
tag:
  - MyBatis
---
# ""


# 1.简介

## 1.1、什么是Mybatis

![MyBatis logo](https://mybatis.org/images/mybatis-logo.png)

* MyBatis 是一款优秀的持久层框架

* 它支持自定义 SQL、存储过程以及高级映射

如何获取MyBatis

* maven:https://mvnrepository.com/search?q=Mybatis

  ```java
  <!-- https://mvnrepository.com/artifact/org.mybatis/mybatis -->
  <dependency>
      <groupId>org.mybatis</groupId>
      <artifactId>mybatis</artifactId>
      <version>3.5.9</version>
  </dependency>
  
  ```

  

* GitHub:https://github.com/mybatis/mybatis-3/releases

## 1.2、持久层

* 持久化就是程序的数据在持久状态和瞬时状态转化的过程

Dao层，Serviceceng,Controller层......

* 完成持久化工作的代码块
* 界限十分明显
* 优点：
  * 简单易学
  * 灵活
  * sql和代码的分离，提高了可维护性
  * 提供映射标签，支持对象与数据库的orm字段关系映射
  * 提供对象关系映射标签，支持对象关系组件维护
  * 提供xml标签，支持编写动态sql

# 2.Mybatis程序

搭建环境>导入Mybatis>编写代码>测试

## 2.1、搭建环境

搭建数据库

```sql
CREATE DATABASE `mybatis`;

USE `mybatis`;

CREATE TABLE `user`(
 `id` INT(20) NOT NULL PRIMARY KEY,
 `name` VARCHAR(30) DEFAULT NULL,
 `pwd` VARCHAR(30) DEFAULT NULL
)ENGINE = INNODB DEFAULT CHARSET = utf8

INSERT INTO USER(`id`,`name`,`pwd`) VALUES 
(1,'admin','123456'),
(2,'admin','123456'),
(3,'admin','123456')
```

新建项目

​	1.新建普通maven项目

​	2.删除src目录

​	3.导入maven依赖

```xml
<!--导入依赖-->
    <dependencies>
<!--        mysql驱动-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.46</version>
        </dependency>
<!--        mybatis驱动-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.5.9</version>
        </dependency>
<!--        junit驱动-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>
        </dependency>
    </dependencies>
<build>
        <resources>

            <resource>
                <directory>src/main/resources</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>false</filtering>
            </resource>

            <resource>
                <directory>src/main/java</directory>
                <includes>
                    <include>**/*.properties</include>
                    <include>**/*.xml</include>
                </includes>
                <filtering>false</filtering>
            </resource>

        </resources>
    </build>
```

## 2.2、创建一个模块

* 编写mybatis的核心配置文件

```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration
        PUBLIC "-//mybatis.org//DTD Config 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd">
<configuration>
    <environments default="development">
        <environment id="development">
            <transactionManager type="JDBC"/>
            <dataSource type="POOLED">
                <property name="driver" value="com.mysql.jdbc.Driver"/>
                <property name="url" value="jdbc:mysql://localhost:3306/mybatis?useSSL=false&amp;useUnicode=true&amp;characterEncoding=UTF-8&amp;serverTimezone=GMT"/>
                <property name="username" value="root"/>
                <property name="password" value="123456"/>
            </dataSource>
        </environment>
    </environments>
    <mappers>
        <mapper resource="com/kuang/dao/UserMapper.xml"/>
    </mappers>
</configuration>
```

* 编写mybatis工具类

```java
//SqlSessionFactory
public class MybatisUtils {
    private static SqlSessionFactory sqlSessionFactory;
    static{

        try {
            //使用Mybatis第一步：获取sqlSessionFactory对象
            String resource = "mybatis-config.xml";
            InputStream inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
    //既然有了 SqlSessionFactory，顾名思义，我们可以从中获得 SqlSession 的实例
    //SqlSession 提供了在数据库执行 SQL 命令所需的所有方法

    public static SqlSession getSqlSession(){
        return sqlSessionFactory.openSession();
       
    }
}

```

## 2.3、编写代码

* 实体类

```java
//实体类
public class User {
    private int id;
    private String name;
    private String pwd;

    public User() {
    }

    public User(int id, String name, String pwd) {
        this.id = id;
        this.name = name;
        this.pwd = pwd;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", pwd='" + pwd + '\'' +
                '}';
    }
}
```

* Dao接口

```java
public interface UserDao {
    List<User> getUserList();
}
```

* 接口实现类

```	xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">

<mapper namespace="com.kuang.dao.UserDao">
    <select id="getUserList" resultType="com.kuang.pojo.User">
        select * from mybatis.user;
    </select>
</mapper>
```

## 2.4、测试

junit测试

```java
public class UserDaoTest {
    @Test
    public void test(){
        //diyibu:获取SqlSession对象
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        //执行sql
        UserDao userDao = sqlSession.getMapper(UserDao.class);
        List<User> userList = userDao.getUserList();

        for(User user: userList){
            System.out.println(user);
        }
        //关闭SqlSession
        sqlSession.close();
    }
}
```

# 3、CRUD

## 1.namespace

namespace中的包名要和Dao/mapper接口的包名一致

1.编写接口

```java
public interface UserMapper {
    //获取全部用户
    List<User> getUserList();

    //根据id查询用户
    User getUserById(int id);

    
}
```

2.编写对应的mapper中的sql语句

```xml
<mapper namespace="com.kuang.dao.UserMapper">
    <select id="getUserList" resultType="com.kuang.pojo.User">
        select * from mybatis.user;
    </select>
    
    <select id="getUserById" resultType="com.kuang.pojo.User" parameterType="int">
        select * from mybatis.user where id = #{id};
    </select>
    
    
</mapper>
```

3.测试

```java
public class UserDaoTest {
    @Test
    public void test(){
        //diyibu:获取SqlSession对象
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        try{
            //执行sql:方式一：getMapper
            UserMapper userDao = sqlSession.getMapper(UserMapper.class);
            List<User> userList = userDao.getUserList();
            System.out.println(userList);
        }catch (Exception e){
            e.printStackTrace();
        }finally {
        //关闭SqlSession
            sqlSession.close();
        }


        //方式二:
//        List<User> userList = sqlSession.selectList("com.kuang.dao.UserDao.getUserList");
//        for(User user: userList){
//            System.out.println(user);
//        }

    }
    @Test
    public void getUserById(){
        //diyibu:获取SqlSession对象
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        User userById = mapper.getUserById(1);
        System.out.println(userById);

        sqlSession.close();
    }

   
}
```

## 2.select

选择，查询语句

* id:就是对应的namespace中的方法名
* resultType:sql语句执行的返回值类型！
* parameterType：参数类型

## 3.insert

1.编写接口

```java
//insert一个用户
    int addUser(User user);
```

2.编写对应的mapper中的sql语句

```xml
<insert id="addUser" parameterType="com.kuang.pojo.User">
        insert into mybatis.user (id,name,pwd) value(#{id},#{name},#{pwd});
    </insert>
```

3.测试

```java
 @Test
    public void addUser(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        mapper.addUser(new User(4,"admin4","123456"));
        sqlSession.commit();
        sqlSession.close();
    }
```

## 4.update

1.编写接口

```java
//修改用户
    int updateUser(User user);

```

2.编写对应的mapper中的sql语句

```xml
    <update id="updateUser" parameterType="com.kuang.pojo.User">
        update mybatis.user set name= #{name},pwd=#{pwd} where id = #{id};
    </update>

```

3.测试

```java
 @Test
    public void updateUser(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        mapper.updateUser(new User(1,"admin5","12341515134"));
        sqlSession.commit();
        sqlSession.close();
    }

```

## 5.delete

1.编写接口

```java
    //删除用户
    int deleteUser(int id);
```

2.编写对应的mapper中的sql语句

```xml
    <delete id="deleteUser" parameterType="int">
        delete from mybatis.user where id = #{id};
    </delete>
```

3.测试

```java
    @Test
    public void deleteUser(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        mapper.deleteUser(1);
        sqlSession.commit();
        sqlSession.close();
    }
```

注意

* 增删改查需要提交事务

* Map传递对象，直接在sql语句中取得map的key键

* 对象传递参数，直接在sql中取得对象的属性

* 只有一个基本类型的参数的情况下，可以直接在aql中取

* 模糊查询

* ```java
  //模糊查找
      List<User> getUserLike(String name);
  ```

* ```xml
  <select id="getUserLike" parameterType="com.kuang.pojo.User" resultType="com.kuang.pojo.User">
          select * from mybatis.user where name like "%"#{name}"%";
      </select>
  ```

* ```java
  @Test
      public void getUserLike(){
          SqlSession sqlSession = MybatisUtils.getSqlSession();
          UserMapper mapper = sqlSession.getMapper(UserMapper.class);
          List<User> userList = mapper.getUserLike("李");
          for(User user : userList){
              System.out.println(user);
          }
          sqlSession.commit();
  
          sqlSession.close();
      }
  ```

# 4、配置

## 1.核心配置

* mybatis-config.xml

* ````
  configuration（配置）
  properties（属性）
  settings（设置）
  typeAliases（类型别名）
  typeHandlers（类型处理器）
  objectFactory（对象工厂）
  plugins（插件）
  environments（环境配置）
  environment（环境变量）
  transactionManager（事务管理器）
  dataSource（数据源）
  databaseIdProvider（数据库厂商标识）
  mappers（映射器）
  ````

## 2.属性properties

只能放在最上面

通过properties属性来实现引用配置文件

编写一个配置文件

```properties
driver=com.mysql.jdbc.Driver
url=jdbc:mysql://localhost:3306/mybatis?useSSL=false&useUnicode=true&characterEncoding=UTF-8&serverTimezone=GMT
username=root
paasword=123456
```

在核心配置文件中引入

```xml
<properties resource="db.properties">
        <property name="username" value="root"/>
        <property name="password" value="123456"/>
</properties>
```

> 引入时可以写入属性
>
> username和password两个属性，可以从外部引入，也可以在这里写，如果外部和内部都有，优先使用外部

## 3.类型别名typeAliases

这样就可以在使用全类名的时候只使用一个User

````xml
<typeAliases>
        <typeAlias type="com.kuang.pojo.User" alias="User"/>
</typeAliases>
````

也可以指定一个包名，Mybatis会搜索下面的包名

默认是小写的类名，也可以用注解@Alias("name")来指定搜索的Bean名

```xml
<typeAliases>
        <package name="com.kuang.pojo"/>
</typeAliases>
```

```java
@Alias("user")
public class User(){

}
```



实体类少用第一个，多用第二个

# 5.解决属性名和字段名不一致的问题

## resultMap属性

设置结果集映射

```xml
<resultMap id="UserMap" type="User">
        <result column="id" property="id"/>
        <result column="name" property="name"/>
        <result column="pwd" property="pwd"/>
    </resultMap>

    <select id="getUserById" resultMap="UserMap" parameterType="int">
        select * from mybatis.user where id = #{id};
    </select>
```

* resultMap元素是MyBatis最强大的元素
* ResultMap的设计思想是，对于简单的语句根本不需要配置显示的结果映射，而对于复杂一点的语句，只需要描述它们的关系就行了。

# 6.日志

## 1.日志工厂

如果一个数据库操作，出现了异常，需要排错，日志可以实现

logImpl	使用MyBatis所用的日志的具体体现，未指定时自动查找

* SLF4J 
*  LOG4J(deprecated since 3.5.9) （重点）
*  LOG4J2 
* JDK_LOGGING 
*  COMMONS_LOGGING 
*  STDOUT_LOGGING （重点）
*  NO_LOGGING

## 2.STDOUT_LOGGING	标准日志输出

```xml
<settings>
	<setting name="logImpl" value="STDOUT_LOGGING"/>
</settings>
```

## 3.LOG4J

先导入maven包

```xml
<dependency>
            <groupId>log4j</groupId>
            <artifactId>log4j</artifactId>
            <version>1.2.17</version>
</dependency>
```

新建log4j.properties配置文件

```properties
#将等级为DEBUG的日志信息输出到console和file这两个目的地，console和file的定义在下面的代码
log4j.rootLogger=DEBUG,console,file

#控制台输出的相关设置
log4j.appender.console = org.apache.log4j.ConsoleAppender
log4j.appender.console.Target = System.out
log4j.appender.console.Threshold=DEBUG
log4j.appender.console.layout = org.apache.log4j.PatternLayout
log4j.appender.console.layout.ConversionPattern=[%c]-%m%n

#文件输出的相关设置
log4j.appender.file = org.apache.log4j.RollingFileAppender
log4j.appender.file.File=./log/kuang.log
log4j.appender.file.MaxFileSize=10mb
log4j.appender.file.Threshold=DEBUG
log4j.appender.file.layout=org.apache.log4j.PatternLayout
log4j.appender.file.layout.ConversionPattern=[%p][%d{yy-MM-dd}][%c]%m%n

#日志输出级别
log4j.logger.org.mybatis=DEBUG
log4j.logger.java.sql=DEBUG
log4j.logger.java.sql.Statement=DEBUG
log4j.logger.java.sql.ResultSet=DEBUG
log4j.logger.java.sql.PreparedStatement=DEBUG
```

# 7.分页

* 减少数据的处理两

使用Mybatis实现分页，核心SQL

1.接口

```java
    List<User> getUserByLimit(Map<String,Integer> map);
```

2.Mapper.xml

```xml
    <select id="getUserByLimit" resultType="User" parameterType="map">
        select * from mybatis.user limit #{startIndex},#{pageSize};
    </select>
```

3.测试

```java
@Test
    public void getUserByLimit(){
        SqlSession sqlSession = MybatisUtils.getSqlSession();
        UserMapper mapper = sqlSession.getMapper(UserMapper.class);
        HashMap<String, Integer> map = new HashMap<String,Integer>();
        map.put("startIndex",0);
        map.put("pageSize",2);
        List<User> userByLimit = mapper.getUserByLimit(map);
        for (User user : userByLimit) {
            System.out.println(user);
        }

    }
```

# 8.使用注解开发

1.注解在接口实现

```java
1@Select("select * from user")
List<User> getUsers();
```

2.需要造核心配置文件中绑定接口

```xml
    <mappers>
        <mapper class="com.kuang.dao.UserMapper"/>
    </mappers>
```

3.查询

```java
@Select("select * from user")
    List<User> getUsers();
```

​	添加

```java
@Insert("insert into user(id,name,pwd) values (#{id},#{name},#{pwd})")
    int addUser(User user);
```

​	修改

```java
@Update("update user set name=#{name},pwd=#{pwd} where id=#{id}")
    int updateUser(User user);
```

​	删除

```java
@Delete("delete from user where id=#{id}")
    int deleteUser(@Param("id")int id);
```

# 9.Lombok

直接在pom配置文件里加入依赖

```xml
<dependency>
		<groupId>org.projectlombok</groupId>
		<artifactId>lombok</artifactId>
		<version>1.18.22</version>
		<scope>provided</scope>
</dependency>
```

* @Data		添加无参构造、get、set、tostring、hashcode、equals
* @AllArgsconstructor           添加有参构造
* @NoArgsconstructor          添加无参构造
* @ToString           生成toString方法
* @Get		生成get方法
* @Set		生成set方法 		   

在实体类上加注解

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    private int id;
    private String name;
    private String pwd;
}

```

​     

# 10.动态SQL

## 搭建环境

```sql
CREATE TABLE `blog`(
`id` VARCHAR(50) NOT NULL COMMENT '博客id',
`title` VARCHAR(100) NOT NULL COMMENT '博客标题',
`author` VARCHAR(30) NOT NULL COMMENT '博客作者',
`create_time` DATETIME NOT NULL COMMENT '创建时间',
`views` INT(30) NOT NULL COMMENT '浏览量'
)ENGINE=INNODB DEFAULT CHARSET=utf8
```

创建一个基础工程

1.导包

2.编写配置文件

3.编写实体类

```java
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Blog {
    private int id;
    private String title;
    private String author;
    private Date create_time;
    private int views;
}

```



4.编写实体类对应Mapper接口和Mapper.XML文件

5.编写IDutile类文件，用于获取随机的id值

## IF

BlogMapper

```java
List<Blog> queryBlogIF(Map map);
```

BlogMapper.xml

```xml
<select id="queryBlogIF" parameterType="map" resultType="blog">
        select * from blog where 1=1
        <if test="title!= null">
            and title = #{title}
        </if>
        <if test="author!= null">
            and author =#{author}
        </if>
</select>
```

> 如果没有向**map**中传入**title**值和**author**值，则会查询出所有数据
>
> 若**title**不为空，则将and 条件追加到**where** 后面
>
> **author**同理

## choose(when,otherwise)

```xml
<select id="queryBlogChoose" parameterType="map" resultType="blog">
        select * from blog
        <where>
            <choose>
                <when test="title!=null">
                    title=#{title}
                </when>
                <when test="author!=null">
                    AND author=#{author}
                </when>
                <otherwise>
                    AND views=#{views}
                </otherwise>
            </choose>
        </where>
</select>
```



## trim(where,set)

* where

```xml
<select id="queryBlogIF" parameterType="map" resultType="blog">
        select * from blog
        <where>
            <if test="title!= null">
                and title = #{title}
            </if>
            <if test="author!= null">
                and author =#{author}
            </if>
        </where>
</select>
```

* set

```xml
<update id="updateBlog" parameterType="map">
        update blog
        <set>
            <if test="title!=null">
                title=#{title},
            </if>
            <if test="author!=null">
                author=#{author}
            </if>
        </set>
        where id=#{id}
</update>
```

# 11.SQL片段

```xml
<sql id="if-title-author">
	<if test="title !=null">
    	title=#{title}
    </if>
    <if test="author !=null">
    	author=#{author}
    </if>
</sql>
```

```xml
<select id="queryBlogIF" parameterType="map" resultType="blog">
	select * from blog
    <where>
    	<include refid="if-title-author"></include>
    </where>
</select>
```

