---
title: Docker
icon: Docker
category:
  - 后端
  - 容器
tag:
  - Golang
  - Docker
---
# ""


## Docker

## 为什么要使用Docker

#### 企业环境中存在的某个痛点

企业使用一项技术是为了解决当前企业环境中存在的某个痛点，目前行业存在以下几个痛点：

1. 软件更新发布及部署低效，过程繁琐需要人工介入
2. 环境一致性难以保证
3. 不同环境之间迁移成本太高。

#### Docker能解决的问题

Docker的使用十分简单，从开发的角度来看就是三步：构建、运输、运行。

其中关键是构建步骤，即打包镜像文件。但是从测试和运维的角度来看，就只有两步：复制、运行。有了这个镜像文件，在哪里运行都可以，和平台无关。

Docker这种容器技术隔离出了独立的运行空间，不会和其他应用争用系统资源，不需要考虑应用之间的相互影响。

其次，因为在构建镜像时就处理完了服务程序对于系统的所有依赖，所以在使用时，可以忽略原本程序的依赖以及开发语言。对测试和运维人员而言，可以更专注于自己业务内容。

最后，Docker为开发者提供了一种开发环境的管理办法，帮助测试人员保证环境的同步，为运维人员提供了可移植的标准化部署流程。



## Docker简介

Docker是一种运行与Linus和Windows上的软件，用于创建、管理和编排容器。

#### Docker引擎

Docker引擎可以从Docker网站下载，也可以基于GitHub上的源码进行构建，无论是开源版本还是商业版本，都有Linux和Windows版本

Docker引擎有两个版本:企业版EE和社区办CE。

每个季度，企业版和社区版都会发布一个稳定版本。社区版会提供 4 个月的支持，而企业版本会提供 12 个月的支持。

#### Docker官网

```http
https://www.docker.com/
```





## 安装Docker

 1 . 查看内核版本

linux操作系统Centos7,linux 3.10内核，docker指名至少要3.8以上，(ubuntu下要linux内核3.8以上)

在linux操作系统终端中输入:

```po
uname -a
```



安装Docker

```http
https://www.runoob.com/docker/ubuntu-docker-install.html
```





## Docker的中央仓库

Docker中央仓库，就是存放镜像的网站

#### 官网

镜像最全，但是下载速度慢

```http
https://hub.docker.com/
```



网易蜂巢

```http
http://c.163.com/hub
```



daoCloud(推荐)

```http
http://hub.daocloud.io/
```



#### 搭建私服

###### 1. 修改注册文件

修改/etc/docker/daemon.json文件，若文件不存在，则手动创建。

添加内容如下

```json
{
    "registry-mirrors":["https://docker-cn.com"],
    "insecure-registries":["ip:port"]//替换相应的ip和端口号
}
```

###### 2. 重启服务

```powershell
systemctl daemon-reload
systemctl restart docker
```





## Docker镜像操作

#### 拉取镜像到本地

```powershell
docker pull 镜像名称[:tag]

如:
docker pull daocloud.io/library/tomcat:8.5.15-jre8
```



#### 查看全部本地的镜像

```powershell
docker images
```



#### 删除本地镜像

```powershell
docker rmi 镜像的标识
```

删不掉就是里面有东西

```powershell
docker ps -a   //查看镜像状态
```

```powershell
docker rm 标志   //删除
```

```powershell
docker rmi 标志	//删除镜像
```



#### 导入导出

将本地镜像导出

```powershell
pwd   //查看当前路径

docker save -o 导出的路径 镜像id
```

加载本地的镜像文件

```powershell
docker load -i 镜像文件
```



#### 修改镜像名称

```powershell
docker tag 镜像id 新镜像名称:版本
```





## Docker容器操作 

#### 运行容器

```powershell
docker run 镜像标识[:tag]
```

**常用参数**

```powershell
docker run -d -p 宿主机端口:容器端口 --name 容器名称 镜像的标识名称[:tag]
```

* -d：代表后台运行
* -p：宿主机端口:容器端口：为了映射当前Linux的端口和容器的端口
* --name 容器名称 :指定容器的名称



#### 查看运行结果

当容器中运行了tomcat的docker后，可以在浏览器中访问了

首先在Ubuntu中安装net-tools

```powershell
sudo apt install net-tools
```

然后查看ip地址

```go
sudo ifconfig
```

结果：有ip4地址。

```powershell
inet 192.168.150.128  netmask 255.255.255.0  broadcast 192.168.150.255
```

因为已经端口映射了，所以直接在浏览器访问：

192.168.150.128:8080

就可以访问tomcat官网



#### 查看正在运行的容器

```powershell
docker ps [-qa]
```

* -a ：查看全部的容器，包括没有运行的
* -q：只查看容器的标识



#### 查看容器的日志

```powershell
docker logs -f 容器id
```





#### 进入到容器内部

```powershell
docker exec -it 容器id bash
```



#### 删除容器

删除容器前，需要先停止容器

```powershell
## 停止指定的容器
docker stop 容器ID

##停止全部容器
docker stop $(docker ps -qa)

##删除指定容器
docker rm 容器ID

##删除全部容器
docker rm $(docker ps -qa)

##启动容器
docker start 容器ID
```





## 创建MySQL容器

#### 创建MySQL镜像

```powershell
docker pull daocloud.io/library/mysql:5.7.5-m15
```

#### 查看MySQL镜像

```powershell
docker images
```

#### 创建MySQL容器

```powershell
docker run -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=root --name mysql 镜像tag
```

#### 测试





## Docker 数据卷

如果每次更新项目都要把项目放入容器中，未免太过于麻烦。

所以就有：数据卷。

数据卷：将宿主主机的一个目录，映射到容器的一个目录中，可以在宿主主机中操作目录中的内容，那么容器内部映射的文件，也会跟着一起改变。

#### 创建数据卷

```powershell
docker volume create 数据卷名称
## 创建数据卷之后，默认会存放在一个目录下 /var/lib/docker/volumes/数据卷名称/_data
```



#### 查看数据卷的详细信息

```powershell
docker volume inspect 数据卷名称
```





#### 查看全部数据卷

```powershell
docker volume ls
```





#### 删除数据卷

```powershell
docker volume rm 数据卷名称
```





#### 应用数据卷

当你映射数据卷时，如果数据卷不存在。Docker会帮你自动创建，会将容器内部自带的文件，存储在默认的存放路径中。

```powershell
docker run -v 数据卷名称:容器内部的路径 镜像id
## 直接指定一个路径作为数据卷的存放位置，这个路径下是空的
docker run -v 路径:容器内部的路径 镜像id
```







## Docker file

#### Dockerfile

是一个包含用于组合映像的命令的文本文档。可以使用在命令行中调用的任何命令。Docker通过读取Dockerfile中的指令自动生成映像。

`docker build`命令用于从Dockerfile构建映像。可以在`docker build`命令中使用-f 标志指向文件系统中任何位置的Dockerfile

例如：

```powershell
docker build -f /path/to/a/Dockerfile
```



#### Dockerfile基本结构

一般分为四部分：

1. 基础镜像信息
2. 维护者信息
3. 镜像操作指令
4. 容器启动时执行指令

#### Dockerfile文件说明

Docker以从上到下的顺序运行Dockerfile的指令，为了指定基本映像，第一条指令必须是FROM。一个声明以##字符开头则被视为注释。可以在Dockerfile中使用 RUN，CMD，FROM，EXPOSE，ENV等指令。

**列出一些常用的指令：**

`FROM：指定基础镜像，必须为第一个命令`

```go
FROM <image>
FROM <image>:<tag>
FROM <image>@<digest>

例：  FROM mysql:5.6
```



`MAINTAINER:维护者信息`

```go
格式： MAINTAINSE <name>

例： MAINTAINER Jasper Xu
	MAINTAINSE sore@163.com
	MAINTAINER Jasper Xu <sorex@16.com>
```



`RUN:构建镜像时执行的命令`

```go
RUN  用于在镜像容器中执行命令，其有两种执行方式
RUN <command>

RUN ["executable","param1","param2"]
```



#### Docker自定义镜像

https://www.bilibili.com/video/BV1zR4y1t7Wj/?p=178&spm_id_from=pageDriver&vd_source=4826e78be6a985a9a8641312e495221e



其后还有 docker-compose
