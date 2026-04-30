# Neo 自定义组件开发工具

**neo-cmp-cli** 是面向 Neo 平台的自定义组件开发工具。它基于 [AKFun](https://akfun-docs.netlify.app) 的工程能力，提供项目初始化、编译构建、本地预览与热更新、多技术栈支持以及发布到 NeoCRM 等能力。

## 主要特性

- **零配置**：内置符合前端工程实践的默认配置，开箱即用。
- **多技术栈**：支持 Vue2、React、React + TypeScript 等类型的自定义组件调试、构建与发布。
- **多种构建形态**：本地预览（含热更新与代理）、外链调试、库构建（UMD / ESM）、部署与发布。
- **灵活可配**：可配置构建入口、路径别名、代理、公共样式注入、ESLint / StyleLint、以及 Babel / Loader / Plugin 等扩展。
- **样式与规范**：内置 Autoprefixer、Sass、PostCSS、ESLint、StyleLint。
- **对接 NeoCRM**：支持将组件发布到 NeoCRM 平台（需要先登录授权）。

## 可用版本
可用版本列表见: [neo-cmp-cli](https://www.npmjs.com/package/neo-cmp-cli?activeTab=versions)
> 建议使用最新版本，历史版本含有未处理的 bug。

## 内置模板

执行 `neo init` 时，CLI 会以交互列表展示可选模板；若同时传入 `-t`（模板类型）与 `-n`（项目名称），可跳过交互，直接初始化对应模板工程。

| 模板类型 | 说明 | 参考仓库 |
| --- | --- | --- |
| `neo-web-entity-grid` | Web 端列表组件模板：含基础大列表、Picker 列表等示例 | CLI 内置模板 |
| `neo-h5-cmps` | H5 端业务组件模板：含全局搜索、数据列表、数据 Tabs、打开 AI 对话页等示例 | CLI 内置模板 |
| `neo` | 自定义业务组件模板：含实体表单、实体详情、实体数据表格等示例 | CLI 内置模板 |
| `neo-bi-cmps` | 数值指标组件模板：可配置展示实体数据源中的指标数据 | [neo-bi-cmps](https://github.com/xsy-neoui/neo-bi-cmps) |
| `echarts` | ECharts 组件模板：含基于 ECharts 的图表示例（地图场景请使用 `amap` 模板） | CLI 内置模板 |
| `antd` | Ant Design 组件模板：含数据仪表板、搜索组件等示例 | CLI 内置模板 |
| `amap` | 地图组件模板：含基于高德地图 API 的示例 | CLI 内置模板 |
| `vue2` | Vue2 组件模板：含基于 Vue2 的示例组件 | CLI 内置模板 |

**非交互创建**（须同时提供 `-t` 与 `-n`）示例：

```bash
neo init -t neo-web-entity-grid -n myWebListCmp
neo init -t neo-h5-cmps -n myH5Cmp
neo init -t neo -n myNeoBizCmp
neo init -t antd -n myAntdCmp
neo init -t echarts -n myChartCmp
neo init -t amap -n myMapCmp
neo init -t vue2 -n myVue2Cmp
```

## 命令参考

| 命令 | 说明 | 参数 |
| --- | --- | --- |
| `neo init` | 按模板创建自定义组件项目 | `-t` / `--type` 模板类型（见 [内置模板](#内置模板)），`-n` / `--name` 项目名称；两者同时传入时为非交互模式 |
| `neo create project` | 创建空项目（不含任何自定义组件） | `--name` 指定项目名称 |
| `neo create cmp` | 在当前项目中创建一个自定义组件 | `--name` 组件名，`--targetDevice` / `-d` 指定目标设备类型 |
| `neo login` | 登录 NeoCRM（OAuth2） | `-e` / `--env` 环境类型 |
| `neo logout` | 登出 NeoCRM | — |
| `neo preview` | 本地预览，默认支持热更新与接口代理。若组件依赖 `neo-ui-common` 或 `neo-ui-component-web`，则不支持本地预览（这些模块是平台运行时注入的虚拟模块，本地环境无法提供，需使用 `neo linkDebug` 外链调试代替） | `--name` 指定组件名 |
| `neo linkDebug` | 外链调试，在页面设计器中调试自定义组件 | `--platform` 调试设备类型，`--name` 组件名 |
| `neo push cmp` | 构建并发布到 NeoCRM | `--name` 组件名 |
| `neo pull cmp` | 从 NeoCRM 拉取线上组件到当前项目 | `--name` 组件名 |
| `neo delete cmp` | 删除 NeoCRM 上的指定自定义组件 | `--name` 组件名 |

## 登录授权配置

使用 `neo push cmp`、`neo pull cmp`、`neo delete cmp` 等与 NeoCRM 交互前，需要完成授权。

### 方式一：OAuth2 登录（推荐）

OAuth2 授权码模式无需在配置文件中保存账户密码，相对更安全。

#### 使用步骤

1. **登录 NeoCRM**

   ```bash
   neo login
   ```

   典型流程：

   - 自动打开浏览器进入授权页；
   - 在浏览器中登录 NeoCRM（需选择对应租户）；
   - 授权成功后跳转回本地（携带 `code`）；
   - CLI 用 `code` 换取 Token，并写入项目内 `.neo-cli/token.json`。

2. **登出**

   ```bash
   neo logout
   ```

   会清除本地保存的 token，下次使用需重新登录。

##### 在 `neo login` 中选择「自定义环境」时的配置示例

```javascript
// neo.config.js
module.exports = {
  neoConfig: {
    neoBaseURL: 'https://crm-xx.xiaoshouyi.com', // 平台根地址（默认：https://crm.xiaoshouyi.com）
    loginURL: 'https://login-xx.xiaoshouyi.com/auc/oauth2/auth', // 授权页 URL（获取 code）
    tokenAPI: 'https://login-xx.xiaoshouyi.com/auc/oauth2/token', // 换取 Token 的接口
  },
}
```

#### Token 有效期

- **access_token**：默认约 2 小时有效；
- **refresh_token**：默认约 30 天有效；
- 系统会在 access_token 过期前约 5 分钟尝试自动刷新；
- 若 refresh_token 也过期，需重新执行 `neo login`。


### 方式二：密码模式

在项目根目录 `neo.config.js` 中配置 NeoCRM 授权（示例）：

```javascript
module.exports = {
  neoConfig: {
    neoBaseURL: 'https://crm-cd.xiaoshouyi.com', // 平台根地址（默认：https://crm.xiaoshouyi.com）
    tokenAPI: 'https://login-cd.xiaoshouyi.com/auc/oauth2/token', // Token 接口
    authType: 'password',
    auth: {
      client_id: 'xx', // 客户端 ID（连接器中的 Client_Id）
      client_secret: 'xxx', // 客户端密钥（Client_Secret）
      username: 'xx', // 销售易用户名
      /**
       * password 为「账户密码 + 8 位安全令牌」直接拼接（无空格）。
       * 例如密码为 123456、安全令牌为 ABCDEFGH，则填 123456ABCDEFGH。
       */
      password: 'xxx', // 替换为实际「密码 + 安全令牌」
    },
  },
}
```

#### 如何获取配置项

1. **client_id / client_secret**  
   通过「创建连接器」在客户端信息中获取 `Client_Id` 与 `Client_Secret`。可参考 [销售易文档中心](https://doc.xiaoshouyi.com) 中相关说明。

2. **安全令牌与 password 字段**  
   在文档中心 OAuth 相关章节（如密码模式、获取令牌）按说明获取 8 位安全令牌；`password` 一般为「登录密码 + 8 位安全令牌」直接拼接（无额外空格或分隔符，具体以官方文档为准）。

### OAuth2 与密码模式对比

| 特性 | OAuth2 授权码模式 | 密码模式 |
| --- | --- | --- |
| 安全性 | 较高（不在配置中存明文密码） | 较低（需配置密码与令牌） |
| Token 刷新 | 支持自动刷新 | 支持自动刷新 |
| 有效期 | access_token 约 2 小时（可刷新） | 视平台与 refresh 策略而定（见官方文档） |
| 推荐程度 | 优先推荐 | 备选 |


## 开发自定义组件

### 1. 默认自动识别自定义组件

- **扫描与入口**：CLI 从 `src/components` 扫描子目录；子目录名为组件名；以目录下 `index.ts` / `tsx` / `js` / `jsx` 为组件入口，`model.ts` / `model.js` 为模型文件。
- **自动注册**：发布时会生成注册相关文件并注入构建流程，一般无需手写注册代码（参见 [neo-register](https://www.npmjs.com/package/neo-register)）。
- **样式隔离**：发布或 `linkDebug` 时会对组件样式做隔离处理（默认处理目录下 `(index|style).(scss|less)` 等），隔离方式为给样式增加作用域前缀（如 `[data-scope=组件目录名]`）。根节点请使用**与组件目录名一致**的类名（className），否则隔离策略会因作用域不匹配而导致样式失效。若需关闭，可在 `neo.config.js` 或 webpack 相关配置中将 `disableAutoAddStyleScope` 设为 `true`。

### 2. 本地调试自定义组件

#### 步骤 1：启动外链调试

```bash
neo linkDebug
```

成功后，终端会输出可使用的脚本地址（常见为 `http://localhost:1024/index.js`）。

#### 步骤 2：在设计器中开启 debug

在页面设计器 URL 后追加 `debug=true` 并重新访问。

#### 步骤 3：添加外链脚本

在设计器左侧「外部链接」面板中，将上一步输出的脚本地址加入，即可在物料中看到对应自定义组件。

### 3. 发布自定义组件至 NeoCRM

执行 `neo push cmp` 会构建组件并将资源发布到 NeoCRM（含平台 CDN 流程，以实际环境为准）。

#### 用法

```bash
# 交互选择要发布的组件
neo push cmp

# 指定组件名
neo push cmp --name=xxCmp
# 或
neo push cmp -n xxCmp
```

#### 发布前检查

- `package.json` 中 **`name`** 在 NeoCRM 中唯一；
- **`version`** 与已发布版本不冲突（每次发布按需递增）；
- 已完成 **NeoCRM 授权**（`neo.config.js` 或 `neo login`）；
- 组件能 **正常构建**，`dist` 中有对应产物；
- 组件目录存在 **`model.ts` 或 `model.js`**，且正确导出模型。

#### 注意事项

- 发布前务必更新 `version`，避免冲突；
- 组件名 / 包名在平台内需唯一；
- 技术栈需与项目配置一致（React、React+TS、Vue2 等）；
- 发布过程需稳定访问 NeoCRM 与对象存储等相关服务。

#### 在 NeoCRM 中使用

发布成功后，可在对应租户下的页面设计器、表单设计器等环境中使用该组件。

### 4. 拉取线上组件到本地

`neo pull cmp` 会从 NeoCRM 拉取组件源码到当前项目的 `src/components`。

```bash
neo pull cmp
neo pull cmp --name=xxCmp
neo pull cmp -n xxCmp
```

**拉取前**：已完成授权；`./src/components` 下不存在同名目录；线上组件技术栈与当前项目一致。

**注意**：会覆盖本地同名目录；若有新依赖，拉取后按提示执行 `npm install` / `yarn install`；zip 等中间文件可能留在 `.neo-cli/zip-source`，可按需清理。

### 5. 删除线上自定义组件

`neo delete cmp` 会从 NeoCRM **删除**指定组件，删除后设计器中无法再选用（请谨慎操作）。

```bash
neo delete cmp
neo delete cmp --name=xxCmp
neo delete cmp -n xxCmp
```

**删除前**：已完成授权；再次确认组件名。**删除不可恢复**，且会影响已引用该组件的页面 / 表单；建议必要时先用 `neo pull cmp` 备份源码。


## 前端工程配置说明

neo-cmp-cli 内置一套完整前端工程配置。若需自定义，可执行 `neo config init` 生成 `neo.config.js` 后按需调整和补充。

以下为常用配置片段（可按需组合）。

### 基础配置

#### 1. 代码规范（ESLint / StyleLint）

```javascript
module.exports = {
  settings: {
    enableESLint: true, // 是否启用 ESLint
    enableESLintFix: false, // 是否自动修复 ESLint 问题
    enableStyleLint: true, // 是否启用 StyleLint
    enableStyleLintFix: false, // 是否自动修复 StyleLint 问题
  },
}
```

#### 2. 构建入口

> **提示**：未配置 `entry` 时，CLI 默认扫描 `src/components` 并生成各组件的 entry。

当 `linkDebug`、`build2lib`、`pushCmp` 各自配置了 `entry` 时，会覆盖 `webpack.entry` 中的配置。

自定义示例：

```javascript
module.exports = {
  webpack: {
    entry: { index: './src/index.js' },
  },
  linkDebug: { entry: {} },
  build2lib: { entry: {} },
  pushCmp: { entry: {} },
}
```

> 更多说明见 Webpack 文档：[entry](https://www.webpackjs.com/configuration/entry-context/#entry)。

#### 3. 解析（extensions / alias）

```javascript
module.exports = {
  webpack: {
    resolve: {
      extensions: ['.js', '.jsx', '.vue', '.json'],
      alias: {},
    },
  },
}
```

> - [resolve.extensions](https://www.webpackjs.com/configuration/resolve/#resolve-extensions)  
> - [resolve.alias](https://www.webpackjs.com/configuration/resolve/#resolve-alias)

#### 4. 页面模板与公共样式

```javascript
module.exports = {
  webpack: {
    template: '', // 自定义 HTML 模板路径
    sassResources: [], // 作为全局注入的 Sass 资源（变量、mixin 等）
  },
}
```

### 高级配置

#### 5. 依赖打包策略（ignoreNodeModules）

```javascript
module.exports = {
  webpack: {
    ignoreNodeModules: true, // 是否忽略 node_modules（默认 false）
    allowList: [], // ignoreNodeModules 为 true 时仍打入 bundle 的包
  },
}
```

#### 6. TypeScript 声明与扫描目录

```javascript
module.exports = {
  webpack: {
    createDeclaration: false, // 是否生成 .d.ts
    projectDir: ['./src'], // 生效目录，可多个；默认 ['./src']
  },
}
```

#### 7. 环境变量替换（params-replace-loader）

```javascript
module.exports = {
  envParams: {
    common: { '#version#': '20250822.1' },
    local: {
      '#dataApiBase#': 'http://localhost:1024',
      '#assetsPublicPath#': 'http://localhost:1024',
      '#routeBasePath#': '/',
    },
  },
}
```

#### 8. 本地预览代理与 HTTPS

```javascript
module.exports = {
  preview: {
    proxyTable: {},
    https: false,
  },
}
```

> - [devServer.proxy](https://www.webpackjs.com/configuration/dev-server/#devserver-proxy)  
> - 启用 HTTPS 后若浏览器提示不安全，可在 Chrome 中打开 `chrome://flags/#allow-insecure-localhost` 并启用对应选项（以浏览器版本为准）。

#### 9. 库构建（UMD / ESM）

```javascript
module.exports = {
  build2lib: {
    NODE_ENV: 'production',
    libraryName: '',
    assetsRoot: resolve('dist'),
    assetsPublicPath: '/',
    assetsSubDirectory: '',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css', 'json'],
    bundleAnalyzerReport: false,
    ignoreNodeModules: true,
    allowList: [],
  },
}
```

#### 10. 自定义 Loader / Plugin / Babel 插件

```javascript
module.exports = {
  webpack: {
    moduleRules: [],
    plugins: [],
    babelPlugins: [
      [
        'component',
        { libraryName: 'element-ui', styleLibraryName: 'theme-chalk' },
      ],
    ],
  },
}
```

> 上例常用于 [Element UI 按需引入](https://element.eleme.cn/#/zh-CN/component/quickstart#an-xu-yin-ru)。

也支持用函数动态调整内置 Babel 插件列表：

```javascript
module.exports = {
  webpack: {
    babelPlugins: (curBabelPlugins) => {
      curBabelPlugins.push(/* your plugin */)
      return curBabelPlugins
    },
  },
}
```


更多工程配置说明见 [AKFun 使用手册](https://akfun-docs.netlify.app/config/basic.html)。
