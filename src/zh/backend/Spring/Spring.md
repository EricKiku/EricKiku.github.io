---
title: Spring
icon: markdown
category:
  - 后端
tag:
  - Spring
  - Java
---
# ""


# Spring是一款轻量级开源JavaEE框架

***核心 IOC	控制反转，将创建对象过程交给Spring**	
	 **AOP	面向切面，不该源代码增加新功能***

##### 	特点：

​				1.方便解耦，简化开发
​		  	 2.AOP编程支持
​		  	 3.方便程序测试
​		 	 4.方便个各种框架集成
​		 	 5.方便进行事务操作
​			  6.降低API开发难度

##### 2.导入jar包

​	将基础jar包(**`beans,context,core,expression`**)放在lib文件目录下，
​	打开项目结构，模块，依赖，添加jar包(lib目录下)

##### 3.使用xml配置文件管理类与方法

​	新建.xml的spring配置文件
​	id和类

``````java
<bean id="name" class="com.atguigu.spring5.User"></bean>
``````

所在的包地址
	->新建test测试类->使用注解@Test
		->加载spring配置文件

````java
ApplicationContext context = new ClassPathXmlApplication("文件名")
````

如在此目录下则可，不在则需完整路径
		->使用context获取Bean对象，再创建对象

````java
User user = context.getBean("user",User.class)
````



## IOC概念和原理

#### 	1.概念

​		1.1.控制反转，把对象创建和对象之间的调用过程，交给Spring管理
​		1.2.目的：降低耦合度

#### 	2.底层原理

​		2.1.XMl解析，工厂模式，反射

#### 	3.IOC降低耦合度方法

​		3.1配置XML文件，在工厂类里:

```java
public static UserDao getDao()
String classValue = class值
Class clazz = Class.forName(classValue)
return (UserDao) clazz.newInstance
```



#### 	4.IOC

​		可以用BeanFactory:IOC基本实现，Sprng内部接口，不推荐使用。加载配置文件你不会创建对象，只有获取对象的时候才会创建对象
​		ApplicationContext：BeanFactory的子接口，提供的功能更强大，一般由开发人员进行使用，获取配置文件的时候创建对象
IOC操作Bean管理

##### 	1.基于xml方式创建对象

```java
<bean id="" class=""></bean>
```

​		1.1在配置文件中，使用bean标签添加对应属性，可以实现对象创建
​		1.2属性:id:唯一标识
​				class:类全路径
​		1.3创建对象也是默认无参构造方法

##### 	2.基于xml方式注入属性

​		2.1 DI：依赖注入，就是注入属性。DI是IOC的具体实现，
​		需要创建对象基础上完成

###### 		2.2	第一种注入方式：使用set方法注入

​			//使用property完成属性注入，name：类属性名称，value:注入的值

```java
<bean id="book" class="com.atguitu.spring5.Book">
    <property name="bname" value="书名"></property>
</bean>
```

​			

###### 		2.3 第二种注入方式：使用带参构造注入

​			假设类里已经有了带参构造方法
​			

```java
<bean id="orders" class="....orders">
			<constructor-arg name="属性名" value="注入值"></constructor-arg>
			..
</bean>
```

###### 		3.p名称空间注入

​			3.1 使用p名称空间注入，可以简化基于xml配置方式

```java
<bean xmlns="....."
			  xmlns:p="http://www.springframework.org/schema/p"
			  xmlns:"...">
<bean id="book" class="com...." p:bname="值" p:bauther="值">
```

###### 		4.空值与对象值注入，与特殊字符

```java
//空值
		在bean中<property name="变量名">
					<null/>	//将这个变量设置为null	
				</property>
		//特殊字符	<<南京>>
		<property name="变量名">
			<value>  <![CDATA[<<南京>>]]>   </value>
		</property>
```

###### 5.注入属性 外部bean，外部就是不属于此包下的类

```java
//下面是创建一个对象，上面是利用ref将这个对象在service类里创建，就可以在service里调用userDao里的方法
<bean id="userService" class="com...">
		<property name="userDao" ref="userDaoImpl"></property>
</bean>
<bean id="userDaoImpl" class="com..."></bean>
```

###### 6.注入属性 内部bean和级联赋值	内部就是属于此包下的类

​	6.1 在实体类之间表示一对多关系

```java
<bean id="emp" class ="...">
	<property name="" value=""></property>//给普通属性赋值
		<property name="类名变量">
			<bean id="类名变量" class="...">
				<property name="变量" value="值"></property>
			</bean>
		</property>
</bean>
```

也可以: 

> <property name="dept.dname" value="值"></property>，只不过需要调用dept的类里必须有dept对象的get方法

###### 7.集合类型的属性注入

​	7.1 普通集合属性:

```java
<property name="变量名">
		<array>
			<value>值</value>
			<value>值</value>
		</array>
</property>
```

​	7.2 list集合属性:

```java
<property name="list">
	<list>
		<value>张三</value>
		<value>小三</value>
	</list>
</property>
```

​	7.3	map集合属性:

```java
<property name="maps">
	<map>
		<entry key="JAVA" value="java"></entry>
		<entry key="PHP" value="php"></entry>
	</map>
</property>
```

​	7.4 set集合属性:

```java
<property name="sets">
	<set>
		<value>MYSQL</value>
		<value>Redis</value>
	</set>
</property>
```

​	7.5	list集合注入对象: 在list中不再是value，而是ref，值为创建的多个bean

```java
<property name="courseList">
	<list>
		<ref bean="course1"></ref>
		<ref bean="course2"></ref>
	</list>
</property>
<bean id="course1" class="com.atguigu.spring5.collectiontype.Course">
	<property name="cname" value="Spring5kecheng"></property>
</bean>
<bean id="course2" class="com.atguigu.spring5.collectiontype.Course">
	<property name="cname" value="SpringMVCkecheng"></property>
</bean>
```

###### 8.在bean里引入写好的工具方法数据：

```
xmlns:util="http://www.springframework.org/schema/util"
	再将最后一行，复制一行，将所有复制的beans改为util
<util:list id="booklist">
	<value>one</value>
	<value>two</value>
	<value>three</value>
</util:list>
<bean id="book" class="com.atguigu.spring5.collectiontype.Book">
	<property name="list" ref="booklist"></property>
</bean>
```

##### IOC操作Bean管理 FactoryBean		

​	在配置文件中定义bean类型可以和返回类型不一样

​	1.<bean id="myBean" class="com.atguigu.spring5.factorybean.MyBean"></bean>
​		在MyBean类中实现接口FactoryBean的三个实现方法，并使用泛型`<Course>`，将getObject的返回对象为`<Course>`，在getObject中new 一个Course对		象，return course.

###### 	2.bean单例多例

​		bean默认是单例，多次getBean获取一个对象。使用scope来设置为多例
​		scope=singleton 表示单实例对象，	scope=prototype表示多实例对象
​		singleton在加载Spring配置文件的时候创建单例对象。
​		prototype在加载Spring配置文件的时候不创建对象，在getBean的时候创建对象

##### IOC操作Bean管理	bean生命周期


​		1.通过构造器创建bean实例(无参数构造)
​		2.为bean的属性设置值和对其他bean引用(调用set方法)
​		3.调用bean的初始化的方法(需要进行配置初始化的方法)
​		4.bean可以使用(对象获取到了)
​		5.当容器关闭时，调用bean的销毁方法，(需要进行配置销毁的方法)

##### IOC操作Bean管理  xml自动装配


​		1.在xml配置bean对象后面加 autowire
​			有两个值:byName和byType，byName按照名称自动注入,byType按照类型自动注入

##### IOC操作Bean管理	基于注解方式

###### 	引入依赖:

> spring-aop-5.2.6.RELEASE.jar

###### 	四个注解:

> @Component	、@Service 、@Controller 、@Repository   都是对对象创建

###### 	1.开启组件扫描

```java
<context:component-scan base-package="包名"></context:component-scan>
```

​	扫描可以使用","来包含多个包名，也可以选择使用父类包名

###### 	2.@Component创建UserService对象，value值即为bean的id值

```java
@Component(value = "userService")	//
public class UserService{
	....
}
```

###### 	3.此代码表示只会扫描这个包下的被 Controller 所注释的类

```java
<context:component-scan base-package="包名" use-default-filters="false">
	<context:include-filter type="annotation"
				expression="org......Controller"/>
</context:component-scan>
```

###### 	4.此代码表示不会扫描这个包下的被 Controller 所注释的类

```java
<context:component-scan base-package="包名">
		<context:exclude-filter type="annotation"
								expression="org......Controller"/>
</context:component-scan>
```

###### 	5.属性注入注解:

 	@AutoWired		@Qualifier	 @Resource

>```java
>@AutoWired	根据属性类型进行自动装配
>	将此注解写在属性上，不需要set方法
>@Qualifier	根据属性名称进行注入，需要和AutoWired一起使用
>	此注解表示根据名称注入	@Qualifier(value="被注解的类对象名称")
>@Resource	可以根据类型注入，也可以根据名称注入
>	@Resource直接根据类型注入。@Resource(name="") 根据名称注入
>@Value		注入普通属性		
>```

#### AOP

​		面向切面编程，利用AOP对业务逻辑的各个部分进行隔离，从而使得业务逻辑各部分之前的耦合	度降低，提高程序可重用性，同时提高了开发的效率

> ​	通俗描述：不通过修改源代码方式，在主干功能里添加新功能

##### AOP底层原理

###### 	AOP底层使用动态代理

​		(1) 两种情况动态代理

​				一、有接口情况，使用JDK动态代理

​				创建接口实现类的代理对象，增强类的方法



​				二、没有接口情况，使用CGLIB动态代理

​				创建子类的代理对象，增强类的方法



##### AOP(JDK动态代理)

###### 	1.使用JDK动态代理，使用Proxy类里的方法创建代理对象

​			使用java.lang.Object下的reflect.Proxy的static Object  newProxyInstance()方法，方法里有三个参数:

> 第一个:ClassLoader loader,	类加载器
>
> 第二个:interfaces, 	增强方法所在的类，这个类实现的，支持多个接口
>
> 第三个:invocationHandler，	实现这个接口，创建代理对象，写增强方法

​		(1)创建接口，定义方法

```java
public interface UserDao {

    public int add(int a,int b);

    public void update(String id);
}
```

​		(2)创建接口实现类，实现方法

```java
public class UserDaoImpl implements UserDao{
    @Override
    public int add(int a, int b) {
        return a+b;
    }

    @Override
    public String update(String id) {
        return id;
    }
}
```

​		(3)使用Proxy类创建接口代理对象

```java
public class JDKProxy {
    public static void main(String[] args) {
        UserDaoImpl userDao = new UserDaoImpl();
        Class[] interfaces = {UserDao.class};
        UserDao dao = (UserDao)Proxy.newProxyInstance(JDKProxy.class.getClassLoader(), interfaces, new UserDaoProxy(userDao));

        System.out.println("resule"+dao.add(1,2));
    }

}
class UserDaoProxy implements InvocationHandler{
    private Object obj;
    public UserDaoProxy(Object obj){
        this.obj=obj;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 在要增强的方法之前
        System.out.println("方法之前执行"+method.getName()+" :传递的参数"+ Arrays.toString(args));

        // 被增强的方法的执行
        Object res = method.invoke(obj, args);

        //在要增强的方法之后
        System.out.println("方法之后执行..."+obj);
        return res;
    }
}
```

##### AOP术语

###### 	1.连接点

###### 	2.切入点

###### 	3.通知(增强)

###### 	4.切面


##### AOP操作

###### 		1.Spring框架一般基于AspectJ实现AOP操作

​				AspectJ不是Spring组成部分，独立于AOP框架，一般把AspectJ和Spring框架一起使用，进行AOP操作

###### 		2.基于AspectJ实现AOP操作

​				(1)基于xml配置文件实现

​				(2)基于注解方式实现(常用)

###### 

###### 		3.在项目里引入AOP相关的依赖



###### 4.切入点表达式

​			(1)切入点表达式作用，知道对哪个类里面的	哪个方法进行增强

​			(2)语法结构

```java
 execution([权限修饰符][返回类型][类全路径][方法名称]([参数列表])
```

> 例:	execution(*com.atguitu.dao.BookDao.add(...))       一个切入点表达式，对add进行增强
>
> execution(*com.atguitu.dao.BookDao.*(...))不写方法，在包名后写*号表示所有方法
>
> execution(*com.atguitu.dao.*.*(...)) 不写类名，不写方法名，对dao包里的所有类的所有方法

#### AOP操作(AspectJ注解)

##### 	1.创建类，在类里面定义方法

```java
//被增强的类
public class User {
    public void add(){
        System.out.println("add.......");
    }
}
```

##### 	2.创建增强类(编写增强逻辑)

```java
//增强类
public class UserProxy {
    public void before(){
        System.out.println("add.....");
    }

}

```

##### 	3.进行通知的配置

​			(1)在spring配置文件中，开启注解扫描

```java
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:aop="http://www.springframework.org/schema/aop"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context.xsd
http://www.springframework.org/schema/aop http://www.springframework.org/schema/aop/spring-aop.xsd">
    <context:component-scan base-package="com.atguigu.spring5.aopanno"></context:component-scan>
</beans>
```



​			(2)使用注解创建User和UserProxy对象

```java
//被增强的类
@Component
public class User {

    public void add(){
        System.out.println("add.......");
    }
}

```

```java
//增强类
@Component
public class UserProxy {

    public void before(){
        System.out.println("add.....");
    }

}

```

​			(3)在增强类上面添加注解@Aspect

```java
//增强类
@Component
@Aspect
public class UserProxy {

    public void before(){
        System.out.println("add.....");
    }

}
```

​			(4)在spring配置文件中开启生成代理对象

```java
<!--    开启Aspect生成代理对象,使被@Aspect注解的类成为代理类-->
    <aop:aspectj-autoproxy></aop:aspectj-autoproxy>
```

##### 4.配置不同类型的通知

​		在增强类的里面，在作为通知方法上面添加通知类型注解，使用切入点表达式配置

```java
@Component
@Aspect
public class UserProxy {
    //前置通知
    @Before(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void before(){
        System.out.println("before.....");
    }
    
    //最终通知
    @After(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void after(){
        System.out.println("after......");
    }
    //后置通知
    @AfterReturning(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void afterReturning(){
        System.out.println("afterReturning.......");
    }
    //异常通知
    @AfterThrowing(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void afterThrowing(){
        System.out.println("afterThrowing.......");
    }
    //环绕通知
    @Around(value = "execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void around(ProceedingJoinPoint proceedingJoinPoint) throws Throwable{

        System.out.println("环绕之前.......");

        //被增强的方法执行

        proceedingJoinPoint.proceed();

        System.out.println("环绕之后.......");
    }
}
```

##### 5.公共切入点抽取

```java
//相同切入点抽取
    @Pointcut(value="execution(* com.atguigu.spring5.aopanno.User.add(..))")
    public void pointdemo(){}
    //前置通知
    @Before(value = "pointdemo()")
    public void before(){
        System.out.println("before.....");
    }
```

##### 6.有多个增强类对同一个方法进行增强，设置增强类优先级

​		(1)在增强类上面添加注解@Order(数字)		值越小优先级越高



## jdbcTemplate

#### 		1.什么是jdbcTemplate(概念和准备)

##### 					(1)Spring框架对JDBC进行封装，使用JdbcTemplate方便实现对数据库操作

#### 		2.准备工作

##### 					(1)引入相关jar包



##### 					(2)在spring配置文件配置数据库连接池

```java
<!-- 数据库连接池 -->
<bean id="dataSource" class="com.alibaba.druid.pool.DruidDataSource"
          destroy-method="close">
    <property name="url" value="jdbc:mysql://localhost:3306/user_db"/>
    <property name="username" value="root"/>
    <property name="password" value="root"/>
    <property name="driverClassName" value = "com.mysql.jdbc.Driver"/>
</bean>
```

##### 					(3)配置JdbcTemplate对象，注入DataSource

```java
<bean id="jdbcTemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="dataSource"></property>
</bean>
```

##### 					(4)创建service类，创建dao类，在dao类中注入jdbcTemplate对象

*配置文件

```java
<!-- 开启组件扫描 -->
<context:component-scan base-package="com.atguigu"></context:component-scan>
```

*Service

```java
@Service
public class UserService {
	//注入bookdao
    @Autowired
    private UserDao userDao;
}

```

*dao

```java
public interface UserDao {
}
```

```java
@Repository
public class BookDaoImpl implements BookDao{
	//注入jdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;
}
```

#### 3.JdbcTemplate操作数据库(增删改查)



##### *Service类	具体调用的类

```java
@Service
public class UserService {
	//注入bookdao
    @Autowired
    private UserDao userDao;
    //增加数据
     public void addUser(User user){
        userDao.add(user);
    }
	//修改数据
    public void updateUser(User user){userDao.updateUser(user); }
	//删除数据
    public void deleteUser(String id){ userDao.deleteUser(id); }
	//查询数据个数
    public int findCount(){return userDao.selectCount(); }
	//查询指定对象
    public User findOne(String id){
        return userDao.findUserInfo(id);
    }
	//查询所有数据
    public List<User> findAll(){
        return userDao.findAllUser();
    }
}
```

##### *Dao 类	接口类

```java
public interface UserDao {
    void add(User user);

    void updateUser(User user);

    void deleteUser(String id);

    int selectCount();

    User findUserInfo(String id);

    List<User> findAllUser();
}
```

##### *Dao实现类	实际执行的类

​		执行的函数参数解析:

```java
jdbcTemplate.update(String sql,Object ... args)
2个参数:	
sql:sql语句
args:多个数据，可以是一个数组，用于填充sql语句里的占位符?
返回一个int类型
```

```java
jdbcTemplate.queryForObject(String sql,RowMapper<T> rowMapper)
2个参数:
sql:sql语句
rowMapper:如果想返回Integer类型的值就Integer.class
3个参数:
sql:sql语句
rowMapper:new BeanPropertyRowMapper<User>(user.class),创建一个BeanPropertyRowMapper对象，泛型是对象类，括号里是对象的实体类
args:第三个参数，用于占位符，填充sql语句里的?
返回对象类型
```

```java
jdbcTemplate.query(String sql,RowMapper...);
2个参数:
sql:sql语句
RowMapper:new BeanPropertyRowMapper<User>(User.class)
可以返回的是一个list类型，将查询到的数据存放在一个list集合里
```



```java
@Repository
public class UserDaoImpl implements UserDao{
	//注入jdbcTemplate
    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    //添加方法
    @Override
    public void add(User user) {

        String sql="insert into t_user values(?,?,?)";

        int update = jdbcTemplate.update(sql, user.getUserId(), user.getUsername(), user.getUstatus());
        System.out.println(update);
    }
	//修改数据实现方法
    @Override
    public void updateUser(User user) {
        String sql = "update t_user set username=?,ustatus=? where user_id=?";
        Object[] args = {user.getUsername(),user.getUstatus(),user.getUserId()};
        int update = jdbcTemplate.update(sql, args);
        System.out.println(update);
    }
	//删除数据
    @Override
    public void deleteUser(String id) {
        String sql = "delete from t_user where user_id=?";
        int update = jdbcTemplate.update(sql, id);
        System.out.println(update);
    }
	//查询数据个数
    @Override
    public int selectCount() {
        String sql = "select count(*) from t_user";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class);
        return count;
    }
	//查找指定id的对象
    @Override
    public User findUserInfo(String id) {
        String sql="select * from t_user where user_id=?";
        User user = jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<User>(User.class), id);
        return user;
    }
	//查询所有数据
    @Override
    public List<User> findAllUser() {
        String sql="select * from t_user";
        List<User> userList = jdbcTemplate.query(sql, new BeanPropertyRowMapper<User>(User.class));
        return userList;
    }
}
```

##### *实体类	User

```java
public class User {
    private String userId;
    private String username;
    private String ustatus;

    public String getUserId() {
        return userId;
    }

    public String getUsername() {
        return username;
    }

    public String getUstatus() {
        return ustatus;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setUstatus(String ustatus) {
        this.ustatus = ustatus;
    }
    
    @Override
    public String toString() {
        return "User{" +
                "userId='" + userId + '\'' +
                ", username='" + username + '\'' +
                ", ustatus='" + ustatus + '\'' +
                '}';
    }
}
```



##### 				Test测试类

```java
ApplicationContext context = new ClassPathXmlApplicationContext("bean1.xml");
        UserService userService = context.getBean("userService",UserService.class);
		//插入数据
        User user = new User();
        user.setUserId("1");
        user.setUsername("java");
        user.setUstatus("abcd");
        userService.addUser(user);
		//修改数据
        User user = new User();
        user.setUserId("1");
        user.setUsername("javaupup");
        user.setUstatus("abcdguituaaaaaa");
        userService.updateUser(user);
		//删除数据
        userService.deleteUser("1");

		//查找数据个数
        int count = userService.findCount();
        System.out.println(count);
		//查找指定id对象
        User user = userService.findOne("1");
        System.out.println(user);
		//查找所有数据
        List<User> all = userService.findAll();
        System.out.println(all);

```



#### 4.JdbcTemplate操作数据库(批量操作)	

​	实现批量添加操作函数

```java
batchUpdate(String sql,List<Object[]> batchArgs)
第一个参数:sql语句
第二个参数:List集合，添加多条记录数据
```

*Service类

```java
public void batchAdd(List<Object[]> batchArgs){userDao.batchAddUser(batchArgs);}
```

*Dao实现类

```java
@Override
    public void batchAddUser(List<Object[]> batchArgs) {
        String sql="insert into t_user values(?,?,?)";
        int[] ints = jdbcTemplate.batchUpdate(sql, batchArgs);
        System.out.println(Arrays.toString(ints));
    }
```

*Test测试类，此演示添加，删查改类似

```java
		List<Object[]> batchArgs = new ArrayList<>();
        Object[] o1={"3","java","a"};
        Object[] o2={"4","javajava","a"};
        Object[] o3={"5","javajavajava","a"};
        batchArgs.add(o1);
        batchArgs.add(o2);
        batchArgs.add(o3);
        userService.batchAdd(batchArgs);
```

## 事务概念

### 	事务四个特性(ACID)

#### 		1.原子性

#### 		2.一致性

#### 		3.隔离性

#### 	    4.持久性

### 	事务操作(搭建事务操作环境)

#### 	1.创建数据库表，添加记录

#### 	2.创建service，搭建dao,完成对象创建和注入关系

##### 			(1)service注入dao，在dao注入JdbcTemplate,在JdbcTemplate注入DataSource

##### 			(2)完成对数据库的操作，模拟异常，转账出错

#### 	3.开启事务



##### 	3.1在Spring进行事务管理操作

###### 		(1)有两种方式:编程式事务管理和声明式事务管理

##### 	3.2声明式事务管理

###### 		(1)基于注解方式

###### 		(2)基于xml配置文件方式

#### 4.在Spring进行声明式事务管理，底层使用AOP原理

#### 5.Spring事务管理API

##### 	(1)提供一个接口，代表事务管理器，这个接口针对不同的框架提供不同的实现类	



#### 6.事务操作(注解声明式事务管理)

##### 		1.在spring配置文件配置事务管理器

```java
<!--创建事务管理器-->
    <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
        <!--  输入数据源-->
        <property name="dataSource" ref="dataSource"></property>
    </bean>
```

###### 				(1)在spring配置文件引入名称空间tx

###### 				(2)开启事务注解

```java
<!--    开启事务注解-->
    <tx:annotation-driven transaction-manager="transactionManager"></tx:annotation-driven>
```

##### 		2.在service类上面(或者service类中方法上面)添加事务注解

###### 			(1)@Transactional,这个注解可在类上，也可在方法上

###### 			(2)添加在类上，为这个类所有方法添加事务

###### 			(3)添加在方法上，为这个方法添加事务

```java
@Service
@Transactional
public class UserService {
}
```

#### 7.事务操作(声明式事务管理参数配置)

##### 	1.propagation	事务传播行为

​		**@Transactional(propagation = Propagation.REQUIRED)**

​		多事务方法直接进行调用，这个过程中事务是如何进行管理的

methodA调用methodB中的方法，那B是用A的事务还是自己开一个事务看的是B后面注解的下列哪个属性



##### 	2.ioslation	事务隔离级别

###### 		(1)事务有特性成为隔离性，多事务操作之间不会产生影响。不考虑隔离性产生很多问题	

###### 		(2)三个读:脏读、不可重复读、虚读

###### 		(3)脏读:一个未提交的事务读取到另一个未提交事务

###### 		(4)不可重复读:一个未提交事务读取到另一个提交事务修改数据

###### 		(5)虚读:一个未提交事务读取到另一个提交的事务添加数据

###### 		(6)解决：通过设置事务隔离级别，解决读问题

​				mySql默认的是可重复读



```java
@Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ)
```



##### 	3.timeout	超时时间

###### 		(1)事务需要在一定的时间内进行提交，不提交就进行回滚

###### 		(2)默认值是 -1，没有超时,可设置以秒为单位

```java
@Transactional(timeout = 10 ,propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ)
```



##### 	4.readOnly	是否只读

###### 		设置为false，可查询，可增删。设置为true，只可查询。

```java
@Transactional(readOnly= false , timeout = 10 ,propagation = Propagation.REQUIRED,isolation = Isolation.REPEATABLE_READ)
```



​	

##### 	5.rollbackFor	回滚

###### 		设置出现哪些异常进行事务回滚

##### 	6.noRollbackFor	不回滚

###### 		设置出现哪些异常不进行事务回滚

#### 8.完全注解开发

​		将xml文件中的配置全部在类里实现

```java
@Configuration 	//配置类
@ComponentScan(basePackages = "com.atguigu")	//组件臊面
@EnableTransactionManagement	//开启事务
public class TxConfig{
	//创建数据库连接池
	@Bean
	public DruidDataSource getDruidDataSource(){
		DruidDataSource dataSource = new DruidDataSource();
		dataSource.setDriverClassName("com.mysql.jdbc.Driver");
		dataSource.setUrl("jdbc:mysql://localhost:3306/user_db");
		dataSource.setUsername("root");
		dataSource.setPassword("root");
		return dataSource;
	}
    //创建JbdcTemplate对象,参数dataSource是spring从IOC容器中拿出来的，不需要调用方法也不需要new什么类
    @Bean
    public JdbcTemplate getJdbcTemplate(DataSource dataSource){
        JdbcTemplate jdbcTemplate = new JdbcTemplate();
        //注入dataSource
        jdbcTemplate.setDataSource(dataSource);
        return jdbcTemplate;
    }
    //创建事务管理器
    @Bean 
    public DataSourceTransactionManager getDataSourceTransactionManager(DataSource dataSource){
        DataSourceTransactionManager transactionManager = new DataSourceTransactionManager();
        transactionManager.setDataSource(dataSource);
        return transactionManager;
    }

}
```

#### 
