## React Scaffolding
### react脚手架，支持typescript

## 技术选型
* react 
* react-router(v4)
* react-loadable - 按需加载
* es6
* typescript
* css/less/sass
* webpack(v4)

## 库
* antd - 按需加载
* lodash - 按需加载
* moment - 按时区引入

## 工具支持
* babel7
* eslint
* stylelint
* prettier
* commit message规范（angular规范）
* husky（约束代码提交：代码检查、格式化、commit msg规范）

## 环境
```
node v11.14.0+
npm v6.7.0+
```

## 安装与使用
```
npm install create-react-ts-cli -g
create-react-ts init
cd [projectName]
npm install
```

## create-react相关命令
```
create-react-ts init 初始化项目
create-react-ts -v 查看工具版本号
```

## 模版结构
```
.
├── config  --------------------- webpack相关配置
├── dist  --------------------- 打包文件
├── dll  --------------------- dll文件
├── public  --------------------- html入口文件
├── src  ------------------------------ 项目代码目录
│    ├── api  ------------------- 接口集合
│    ├── constants  -------------------------- 常量集合
│    ├── components  ------------------- 公共组件
│    ├── images  ----------------------- 图片资源目录
│    └── pages  ------------------------ 页面集合目录
│        └── home  --------------------- home页面
│            ├── Home.tsx  ------------- 页面入口文件
│            └── Home.scss  -------- 页面样式
│            └── components  -------- 页面组件
│        ├── App.tsx  -------------------------- 路由配置
│        ├── index.tsx  -------------------------- 入口文件
│        └──index.scss  -------------------------- 入口样式
│    ├── styles  -------------------------- 公共css
│    └── utils  -------------------------- 通用函数
├── test  ------------------------------ 测试用例
├── types  ------------------------------ ts类型定义
├── .babelrc  ------------------------------ babel配置文件
├── .browserslistrc  ------------------------------ babel兼容浏览器配置
├── .commitlintrc.js  ------------------------------ commit msg规范检验配置
├── .editorconfig   ------------------------------ 编辑器配置
├── .eslintignore  ------------------------------ eslint 忽略文件
├── .eslintrc.js  ------------------------------ eslint 配置
├── .gitignore  ------------------------------ git commit忽略文件
├── .postcssrc.js  ------------------------------ postcss配置
├── .prettierignore  ------------------------------ prettier格式化忽略文件
├── .prettierrc.js  ------------------------------ prettier配置
├── .stylelintignore  ------------------------------ style lint忽略文件
├── .stylelintrc.js  ------------------------------ style lint配置
├── jest.config.js  ------------------------------ 单元测试jest配置文件
├── package-lock.json  --------------------- package lock 文件
├── package.json  --------------------- 项目配置
├── README.md  ------------------------ 说明文件
└── tsconfig.json  ------------------------ ts配置
```


## todo
* 检查命令是否有更新
* 自动安装项目包
* CI/CD
* 关联git仓库
* 日志监控

## 待扩展
* 模版类型（vue/ng等）
* 从远程仓库拉取模版