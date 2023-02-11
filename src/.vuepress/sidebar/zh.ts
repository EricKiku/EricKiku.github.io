import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/zh/": [
    "",
    {
      text: "文章",
      icon: "note",
      prefix: "posts/",
      children: "structure",
    },
    "intro",
    "slides",
  ],
  "/zh/fontend/":[
    "",
    {
      text: "前端基础",
      icon: "creative",
      prefix: "fontend-basic/",
      collapsible: true,
      children: [
        { text: "HTML", link: "HTML", icon: "config" },
        { text: "JS", link: "Js", icon: "config" },
      ],
    },
    {
      text: "前端进阶",
      icon: "creative",
      prefix: "fontend-pro/",
      collapsible: true,
      children: [
        { text: "html进阶", link: "Html进阶", icon: "config" },
        { text: "Js进阶", link: "JS高级", icon: "config" },
        { text: "Ajax(获取服务器端的数据)", link: "Ajax", icon: "config" },
        { text: "ES6(新的规范)", link: "ES6", icon: "config" },
        { text: "Git(分布式版本控制系统)", link: "Git", icon: "config" },
        { text: "Less(Css预处理)", link: "Less", icon: "config" },
        { text: "Node.js(基于 Chrome V8引擎的 JavaScript 运行环境)", link: "Node.js", icon: "config" },
        { text: "Promise(异步编程的新的解决方案)", link: "Promise", icon: "config" },
        { text: "Webpack5", link: "Webpack5", icon: "config" },
        { text: "Webpack进阶", link: "Webpack高级", icon: "config" },
        { text: "Webpack生产模式", link: "Webpack生产模式", icon: "config" },
      ],
    },
    {
      text: "Vue",
      icon: "creative",
      prefix: "Framework/",
      collapsible: true,
      children: [
        { text: "axios", link: "axios", icon: "config" },
        {
          text: "Vue2",
          icon: "creative",
          prefix: "Vue2/",
          collapsible: true,
          children: [
            { text: "Vue2(上)", link: "Vue", icon: "config" },
            { text: "Vue2(下)", link: "Vue下", icon: "config" },
          ],
        },
        {
          text: "Vue3",
          icon: "creative",
          prefix: "Vue3/",
          collapsible: true,
          children: [
            { text: "Vue3", link: "Vue3", icon: "config" },
            { text: "TypeScript", link: "TypeScript", icon: "config" },
            { text: "Pinia", link: "Pinia", icon: "config" },
          ],
        },
        {
          text: "底层原理",
          icon: "creative",
          prefix: "底层原理/",
          collapsible: true,
          children: [
            { text: "数据响应式原理", link: "数据响应式原理", icon: "config" },
            { text: "虚拟Dom与Diff算法", link: "虚拟DOM和diff", icon: "config" },
            { text: "mustache", link: "mustache", icon: "config" },
          ],
        },
      ],
    },
  ],
  "/zh/backend/":[
    "",
    {
      text: "Spring",
      icon: "creative",
      prefix: "Spring/",
      collapsible: true,
      children: [
        { text: "Spring", link: "Spring", icon: "config" },
        { text: "SpringMVC", link: "SpringMVC", icon: "config" },
        { text: "SpringBoot", link: "SpringBoot", icon: "config" },
        { text: "SpringBoot+Vue", link: "SpringBootvue", icon: "config" },
      ],
    },
    {
      text: "MyBatis",
      icon: "creative",
      prefix: "MyBatis/",
      collapsible: true,
      children: [
        { text: "MyBatis", link: "MyBatis", icon: "config" },
        { text: "MyBatis-Plus", link: "MyBatis-Plus", icon: "config" },
      ],
    },
  ],
  "/zh/posts/":[
    "",
    {text:'封装工具库',icon:'note',link:"工具库"},
    {text:'背景动态代码',icon:'note',link:"背景吸附鼠标动态代码"},
    {text:'日语笔记',icon:'note',link:"日语笔记"},
    {text:'操作系统笔记',icon:'note',link:"操作系统"},
    {text:'项目笔记',icon:'note',link:"项目笔记"},
  ]
});
