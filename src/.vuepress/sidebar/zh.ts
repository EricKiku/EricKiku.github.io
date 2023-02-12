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
        { text: "HTML", link: "HTML", icon: "html" },
        { text: "JS", link: "Js", icon: "socialjavascript" },
      ],
    },
    {
      text: "前端进阶",
      icon: "creative",
      prefix: "fontend-pro/",
      collapsible: true,
      children: [
        { text: "html进阶", link: "Html进阶", icon: "html" },
        { text: "Js进阶", link: "JS高级", icon: "socialjavascript" },
        { text: "Ajax", link: "Ajax", icon: "aJax" },
        { text: "ES6", link: "ES6", icon: "markdown" },
        { text: "Git", link: "Git", icon: "git" },
        { text: "Less", link: "Less", icon: "less" },
        { text: "NodeJs", link: "Node.js", icon: "Nodejs" },
        { text: "Promise", link: "Promise", icon: "markdown" },
        { text: "Webpack5", link: "Webpack5", icon: "webpack" },
        { text: "Webpack进阶", link: "Webpack高级", icon: "webpack" },
        { text: "Webpack生产模式", link: "Webpack生产模式", icon: "webpack" },
      ],
    },
    {
      text: "Vue",
      icon: "Vue",
      prefix: "Framework/",
      collapsible: true,
      children: [
        { text: "axios", link: "axios", icon: "aJax" },
        {
          text: "Vue2",
          icon: "creative",
          prefix: "Vue2/",
          collapsible: true,
          children: [
            { text: "Vue2(上)", link: "Vue", icon: "Vue" },
            { text: "Vue2(下)", link: "Vue下", icon: "Vue" },
          ],
        },
        {
          text: "Vue3",
          icon: "creative",
          prefix: "Vue3/",
          collapsible: true,
          children: [
            { text: "Vue3", link: "Vue3", icon: "Vue" },
            { text: "TypeScript", link: "TypeScript", icon: "typescript-def" },
            { text: "Pinia", link: "Pinia", icon: "boluo" },
          ],
        },
        {
          text: "底层原理",
          icon: "creative",
          prefix: "底层原理/",
          collapsible: true,
          children: [
            { text: "数据响应式原理", link: "数据响应式原理", icon: "dicengjiagou" },
            { text: "虚拟Dom与Diff算法", link: "虚拟DOM和diff", icon: "dicengjiagou" },
            { text: "mustache", link: "mustache", icon: "dicengjiagou" },
          ],
        },
      ],
    },
  ],
  "/zh/backend/":[
    "",
    {
      text: "Spring",
      icon: "bxl-spring-boot",
      prefix: "Spring/",
      collapsible: true,
      children: [
        { text: "Spring", link: "Spring", icon: "bxl-spring-boot" },
        { text: "SpringMVC", link: "SpringMVC", icon: "bxl-spring-boot" },
        { text: "SpringBoot", link: "SpringBoot", icon: "bxl-spring-boot" },
        { text: "SpringBoot+Vue", link: "SpringBootvue", icon: "bxl-spring-boot" },
      ],
    },
    {
      text: "MyBatis",
      icon: "Bird",
      prefix: "MyBatis/",
      collapsible: true,
      children: [
        { text: "MyBatis", link: "MyBatis", icon: "Bird" },
        { text: "MyBatis-Plus", link: "MyBatis-Plus", icon: "Bird" },
      ],
    },
  ],
  "/zh/posts/":[
    "",
    {text:'封装工具库',icon:'org-utility',link:"工具库"},
    {text:'背景动态代码',icon:'org-utility',link:"背景吸附鼠标动态代码"},
    {text:'日语笔记',icon:'icon-test',link:"日语笔记"},
    {text:'操作系统笔记',icon:'caozuoxitong',link:"操作系统"},
    {text:'项目笔记',icon:'project',link:"项目笔记"},
  ]
});
