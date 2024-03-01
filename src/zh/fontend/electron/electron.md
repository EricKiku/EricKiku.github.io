##  Electron官方示例

```bash
$ git clone https://github.com/electron/electron-quick-start

$ cd electron-quick-start

$ npm i
$ npm start
```



## 在VSCode调试项目

[地址](https://www.electronjs.org/zh/docs/latest/tutorial/tutorial-first-app#%E5%8F%AF%E9%80%89%E4%BD%BF%E7%94%A8-vs-code-%E8%B0%83%E8%AF%95)



## 打包、分发

[打包地址](https://www.electronjs.org/zh/docs/latest/tutorial/%E6%89%93%E5%8C%85%E6%95%99%E7%A8%8B)

[发布、更新地址](https://www.electronjs.org/zh/docs/latest/tutorial/%E6%8E%A8%E9%80%81%E6%9B%B4%E6%96%B0%E6%95%99%E7%A8%8B)

## 创建一个electron项目

* 初始化项目文件夹。填写一些列 信息。

```
npm init
```

* 安装`electron`到开发依赖

```
npm install --save--dev electron
```

* 修改package.json文件

```json
"scripts": {
    "start":"electron ."
}
```

* 启动

```
npm start
```

报错，没有需要运行的应用



## 创建入口文件和页面

**创建主进程**

在项目根目录创建`main.js`后，再次启动，项目不会报错，但是没有任何反应。

**创建页面**

在项目根目录创建`index.html`文件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Electron</title>
</head>
<body>
    The first Electron project;
</body>
</html>
```



**引入页面**

需要使用两个Electron的模块：`app`、`BrowserWindow`

* `app`模块，控制应用程序的事件生命周期。
* `BrowserWindow`模块，创建和管理应用程序的 窗口。

可以在main.js中引入这两个模块，可以使用`CommonJS`方式

```js
const { app, BrowserWindow } = require('electron')
```



然后添加一个方法，来将index.html加载进一个新的BrowserWindow实例

```js
const createWindow = ()=>{

    const win = new BrowserWindow({
        width:800,
        height:600
    })

    win.loadFile('index.html')
}
```



在Electron中，只有app模块的`ready`事件被激活后才可以创建窗口，可以使用`app.whenReady()`API来监听此事件，在成功后调用`createWindow()`

```js
app.whenReady().then(()=>{
    createWindow()
})
```



此时，再次使用`npm start`应该可以正常启动项目。

> Ctrl + Shift + I 打开开发者工具面板

**窗口生命周期**

在关闭所有的窗口时，应用程序也会退出。使用`app.on`监听`window-all-closed`，在回调中处理。

```js
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})
```

某些系统在关闭所有窗口时，会打开新的窗口，由于不能在`ready`之前创建窗口，所以在ready回调中处理该方法

```js
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
```



**生命周期事件**

* `ready`：app 初始化完成。生命周期优先级：1

* `dom-ready`：一个窗口的文本加载完成。生命周期优先级：2

  ```js
  win.webContents.on('dom-ready',()=>{})
  ```

* `did-finsh-load`：导航完成触发。生命周期优先级：3

* `window-all-closed`：所有窗口都被关闭时

* `before-quit`：在关闭窗口之前时触发

* `will-quit`：当窗口关闭并且应用退出时触发

* `quit`：当所有窗口关闭时触发
  以上三个退出方法，如果指定了`window-all-closed`时是不会触发的，需要主动在监听window-all-closed方法的回调中去调用`app.quit()`才会触发。

* `closed`：当窗口关闭时触发

  ```js
  const createWindow = ()=>{
     const win = new BrowserWindow({
          width:800,
          height:600
      })
  	win.loadFile('index.html')
  	win.on('close',()=>{
          win = null;// 当窗口被关闭，释放内存
      })
  }
  ```

  



## 修改代码时自动重载

1. 可以点击窗口上的reload刷新。

2. 使用nodemon

   ```json
   "scripts": {
       "start":"nodemon --watch main.js --exec npm run build",
       "build":"electron .
   },
   ```

   





## 首屏白屏现象

窗口加载完成后，是没有内容的，所以有可能在短时间内是白屏，解决方法是：

```js
const createWindow = () => {
    const win = new BrowserWindow({
        show:false,//先让窗口不显示
        width: 800,
        height: 600
    })
    // 先加载页面资源
    win.loadFile('index.html')
    // 监听窗口是否准备好显示方法
    win.on('ready-to-show',()=>{
        win.show();// 再让窗口显示
    })

}
```



## 窗口的配置

```js
const win = new BrowserWindow({
    show:false,
    x:500,
    y:400,
    width: 800,
    height: 600,
    maxHeight:1000, // 最大高度
    maxWidth:1000,  // 最大宽度
    minHeight:100,  // 最小高度
    minWidth:100,   // 最小宽度
    resizable:false, // 是否允许修改宽高
    title:"Erickiku",// 前提是html文件没有设置title值
    icon:"favicon.ico",	// 设置图标
    //frame:false,	// 消除标题栏和菜单栏
    frame:true,
    autoHideMenuBar:true,// 这两个为true时，只隐藏菜单栏，显示标题栏
})
```



## *打开新窗口

需要去官方文档看



## 自定义窗口

如果把`frame`设置为false，则会让标题和菜单栏都消失，可以自己自定义标题栏和最小最大化、关闭按钮等样式，但是会有无法拖动窗口和按钮没有功能，所以需要自己自定义方法，来处理这些事件。

[自定义窗口](https://www.electronjs.org/zh/docs/latest/tutorial/window-customization)

## 暴露全局对象/变量

可以在预加载脚本中，向渲染器进程中的脚本暴露对象或变量，暴露的对象是全局的。



首先创建一个`preload.js`文件

```js
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    age: '1'
})
```

上文是获取了一些版本号



将脚本放在`BrowserWindow的webPreferences.preload`中，以让渲染进程使用。

```js
const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')
}
```



现在可以在渲染器进程使用了



创建`renderer.js`文件

```js
const infoHtml = document.getElementById("info")
infoHtml.innerText = `当前正在使用Chrome(v${versions.chrome()})、Node(v${versions.node()})、Electron(v${versions.electron()})`
```



在Html页面中引入js文件

```html
<body>
    The first Electron project;reload
    <h1 id="info"></h1>
    <script src='./renderer.js'></script>
</body>
```



可以在页面上看到显示的版本号，或者是一个变量。



## 进程间通信

在预加载脚本中引入`ipcRenderer`模块，它可以使用`ipcRenderer.invoke(函数名)`来触发主进程中的某个函数

`preload.js`

```js
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('versions', {
  pingFun: () => ipcRenderer.invoke('ping')
  // 除函数之外，我们也可以暴露变量
})
```



在主进程中设计监听器，监听被`invoke`所调用的函数

引入`ipcMain`模块，使用`ipcMain.handle(函数名,回调函数)`来监听某个函数的触发

`main.js`

```js
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  win.loadFile('index.html')
}
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()
})
```



之后可以在渲染器进程中调用`versions.pingFun`，去触发主进程的回调，返回一个`pong`字符串





## 与Vue3搭配

**创建项目**

先创建一个vue3+vite项目



再安装electron

```powershell
$ npm i electron -D
```

再`package.json`文件中，修改以下，并在项目根目录新建`main.js`

```json
....
"main": "main.js",
"scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "electron .",
    "preview": "vite preview"
},
```

