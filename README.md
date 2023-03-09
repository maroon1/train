# train

LF

1. NPM 淘宝镜像地址错误 `http://npm.taobao.org/` -> `https://npmmirror.com/`
1. 使用 `npm config set registry="https://npmmirror.com/" -g` 代替 `cnpm` 的建议
1. `babel-eslint` 已经弃用，改用 `[@babel/eslint-parser](https://www.npmjs.com/package/@babel/eslint-parser)`
1. `husky` 的初始化方法已过时，使用 `npx husky-init && npm install`
1. `husky` 的用法已过时，使用 `npx husky add .husky/<git-hook> <script>`
1. 使用 `prettier --write --list-different --ignore-unknown` 让 Prettier 跳过不支持的文件
1. `eslint-loader` 已废弃，使用 `[eslint-webpack-plugin](https://www.npmjs.com/package/eslint-webpack-plugin)` 替代
1. 建议不要使用 `eslint-loader` 类似插件，代码编辑器如 VSCode 已经能够配合 ESLint 做好实时的代码风格检查工作，在 Webpack 编译阶段报错反而会干扰开发
1. `react-hot-loader` 已被淘汰，使用 `[react-refresh-webpack-plugin](https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin)`
1. 使用 `[ress](https://www.npmjs.com/package/ress)` 代替 `normalize.css`，`ress` 在 `normalize.css` 基础上做了一些些常用的样式重置
1. `css-loader` 模式支持 CSS Module，只要使用 `xxx.module.css` 来命名需要模块化的 CSS 文件
1. 新版 Sass 已经弃用 `node-sass`，使用更高性能的 `dart-sass` 来解析
1. `optimize-css-assets-webpack-plugin` 不支持 Webpack 5+，需要使用 `css-minimizer-webpack-plugin`
