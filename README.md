# train

LF

1. NPM 淘宝镜像地址错误 `http://npm.taobao.org/` -> `https://npmmirror.com/`
1. 使用 `npm config set registry="https://npmmirror.com/" -g` 代替 `cnpm` 的建议
1. `babel-eslint` 已经弃用，改用 `@babel/eslint-parser`
1. `husky` 的初始化方法已过时，使用 `npx husky-init && npm install`
1. `husky` 的用法已过时，使用 `npx husky add .husky/<git-hook> <script>`
1. 使用 `prettier --write --list-different --ignore-unknown` 让 Prettier 跳过不支持的文件
