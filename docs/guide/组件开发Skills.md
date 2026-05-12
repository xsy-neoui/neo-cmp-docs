# 组件开发 Skills

::: warning Beta 状态
本「组件开发 Skills」目前处于 **Beta** 阶段，功能和使用方式仍在持续打磨中。试用过程中发现任何问题，或有改进建议，欢迎随时反馈到 [neo-cmp-docs Issues](https://github.com/xsy-neoui/neo-cmp-docs/issues)。
:::

## 什么是组件开发 Skills

「组件开发 Skills」是一组面向 AI 编辑器的开发技能包，内容涵盖 Neo 自定义组件从命令行操作、React 组件开发、Vue 组件迁移 React 组件的开发指南 Skill 和开发规范，指导 AI 开发出更贴近 Neo 平台和业务需求的自定义组件。

目前提供以下四个技能包：

| Skill | 作用 |
| --- | --- |
| `neo-cmp-cli` | `neo` 命令行工具技能，负责项目创建 / 初始化、组件新增、发布 / 上传、预览、本地调试、外链调试、登录 / 登出等命令操作。遵循非交互式执行、镜像源配置、登录态预检等规范。 |
| `neo-cmp-dev` | React 16 + TypeScript 自定义组件开发技能，覆盖组件目录结构、`model.ts` 模型、`propsSchema` 配置、事件动作（`@NeoEvent` + `BaseCmp`）、运行时上下文、平台预置组件、数据源、SCSS + BEM 样式隔离及工程规范。开发完成后可转交 `neo-cmp-cli` 技能执行预览 / 发布。 |
| `vue-to-react` | Vue 组件 / 项目迁移到 React 16 + TypeScript 的语法层技能。覆盖 SFC 拆分、模板转 JSX、响应式转 hooks、生命周期对照、通信机制、Vuex / Pinia 转 MobX、Vue Router 转 React Router、自定义指令 / mixin 转 hook / HOC 等。语法迁移完成后转交 `neo-cmp-dev` 做平台规范落地。 |
| `frontend-design` | 前端创意设计技能，打造具有高设计品质的独特界面。负责选定美学方向（极简 / 极繁 / 复古等），关注字体排版、色彩主题、动效、空间构成和背景细节，避免通用的 AI 审美。 |

### 技能协作关系

```text
vue-to-react (Vue → React 语法迁移)
       │
       ▼
neo-cmp-dev (平台规范落地)
       │
       ▼
neo-cmp-cli (命令执行：创建、预览、发布)
       │
       ▼
frontend-design (UI/UX 创意设计，可贯穿任何阶段)
```

## 支持的 AI 编辑器

`neo-cmp-cli` 会将技能包安装到对应产品的 skill 目录下，当前支持：

- **CodeBuddy**
- **Kiro**
- **Cursor**
- **Claude Code**

## 安装技能包
::: tip 前置条件
安装技能包前，请确保已全局安装 `neo-cmp-cli`。如尚未安装，请参考 [安装](/guide/安装) 页面完成 CLI 的全局安装。
:::

```bash
# 交互选择目标产品
neo add cli-skills

# 指定目标产品（跳过交互）
neo add cli-skills -p codebuddy
neo add cli-skills -p kiro
neo add cli-skills -p cursor
neo add cli-skills -p claudeCode
```

执行后，CLI 会将技能包安装到所选产品的 skill 目录下。若目标目录中已存在同名 skill，会以覆盖方式写入。

## 更新技能包

```bash
# 交互选择目标产品
neo update cli-skills

# 指定目标产品
neo update cli-skills -p codebuddy
```

更新命令会下载最新技能包，并在选定产品的 skill 目录中覆盖式的更新原有的 skills。

## 移除技能包

```bash
# 交互选择目标产品
neo remove cli-skills

# 指定目标产品
neo remove cli-skills -p codebuddy
```

移除命令会在选定产品的 skill 目录中清理以下 skills：

- `neo-cmp-cli`
- `neo-cmp-dev`
- `vue-to-react`
- `frontend-design`

::: tip 关于 frontend-design
`remove` 命令不会删除 `frontend-design`，避免影响通用的前端设计类工作流。如需整体清理，可手动删除对应目录。
:::

## 命令速查

| 命令 | 说明 | 参数 |
| --- | --- | --- |
| `neo add cli-skills` | 安装「组件开发 Skills」到指定产品的 skill 目录（用户级） | `-p` / `--product` 目标产品（`codebuddy` / `kiro` / `cursor` / `claudeCode`） |
| `neo update cli-skills` | 更新指定产品下的「组件开发 Skills」（覆盖式 copy `neo-cmp-cli` / `neo-cmp-dev` / `vue-to-react` / `frontend-design`） | `-p` / `--product` 目标产品 |
| `neo remove cli-skills` | 移除指定产品下的「组件开发 Skills」（清理 `neo-cmp-cli` / `neo-cmp-dev` / `vue-to-react`） | `-p` / `--product` 目标产品 |

## 使用 Case

安装完技能包后，在支持的 AI 编辑器（Kiro / CodeBuddy / Cursor / Claude Code）中，只需用自然语言描述需求，AI 助手会按技能包约定自动匹配对应的 skill，走标准的 Neo 自定义组件开发流程（创建项目 / 组件目录 → 写 `index.tsx` + `model.ts` + `propsSchema` → 事件动作 → 数据源对接 → 样式隔离 → 预览 / 发布）。

以下是几个典型的使用 case，直接把「Prompt 示例」粘到 AI 对话框里就能跑：

### Case 1：客户列表 + 点击查看详情（PC 端）

::: tip Prompt 示例
开发一个展示客户列表的自定义组件，支持点击某一行跳转到该客户的详情页。
:::

AI 助手结合 `neo-cmp-dev` 技能，典型会这么做：

1. 通过 `neo create cmp` 在 `src/components` 下生成组件目录（例如 `accountListCmp__c`）；
2. 识别到「客户」对应 Neo 标准实体 `Account`，并提示通过 `xObject.getDesc('Account')` 或 `scripts/fetchEntityDesc.js` 查询 `Account` 的真实字段，避免杜撰字段名；
3. 在 `propsSchema` 中暴露「要展示的字段」「每页条数」「是否展示操作列」等属性面板配置项，并默认选择 `name` / `customerType` / `phone` / `owner` 等已有字段；
4. 在 `index.tsx` 中通过 `xObject.getData({ apiKey: 'Account', ... })` 拉取客户列表，使用平台预置的 PC 版列表组件或 antd `Table` 渲染；
5. 为「行点击」定义事件动作（`@NeoEvent.click`），通过 `props.env.ctx` 打开标准的客户详情页（路由到 `Account` 实体详情），无需手写跳转 URL；
6. 样式写在 `style.scss` 中，根节点 className 与组件目录名保持一致，交由 CLI 做样式隔离。

完成后，AI 助手会按 `neo-cmp-cli` 技能的约定提示：是否需要执行 `neo preview` 在线预览、`neo linkDebug` 外链调试，或 `neo push cmp` 发布到 NeoCRM。

### Case 2：H5 版客户列表 + 点击查看详情

::: tip Prompt 示例
开发一个 H5 版的客户列表自定义组件，支持点击某一条查看客户详情，使用 H5 端常用的卡片 / 下拉刷新 + 触底加载样式。
:::

AI 助手结合 `neo-cmp-dev` 技能，相对 Case 1 的差异主要在：

1. 在 `neo create cmp` 时通过 `-d` / `--targetDevice` 指定目标设备类型为 H5，或使用 `neo-h5-cmps` 模板起步（在首次初始化项目且用户明确需要 H5 模板时用 `neo init -t neo-h5-cmps`）；
2. 优先使用平台预置的 **H5 版列表组件**（参见 [H5 版 列表组件使用说明](/cmpDocs/H5版列表组件使用说明)），接入 `Account` 实体数据源，直接获得下拉刷新、触底加载、卡片布局等能力；
3. 「查看详情」通过 `props.env.ctx` 调用平台实体详情跳转能力，H5 端会自动走移动端详情页路由；
4. 样式采用 SCSS + BEM，根节点 className 与组件目录名一致，保证 H5 端的样式隔离。

### Case 3：商机列表 + 分页 + 新增 / 删除

::: tip Prompt 示例
开发一个展示商机列表的自定义组件：支持分页展示，支持新增商机和删除商机两种操作。
:::

AI 助手结合 `neo-cmp-dev` 技能，典型会这么做：

1. 识别到「商机」对应 Neo 标准实体 `Opportunity`，先查 `Opportunity` 已有字段列表（`xObject.getDesc` 或 `scripts/fetchEntityDesc.js`），在 `propsSchema` 中通过 `selectFieldsApi` 让业务方选要展示的字段；
2. 在 `index.tsx` 中调用 `xObject.getData({ apiKey: 'Opportunity', pageSize, pageNum, ... })` 拉分页数据，并把分页状态（`pageNum` / `pageSize` / `total`）维护在组件 state 中；
3. 「新增」按钮通过 `props.env.ctx` 打开 `Opportunity` 的新建表单页；「删除」按钮调用 `xObject.delete({ apiKey: 'Opportunity', ids: [...] })`，删除前使用 antd `Modal.confirm` 做二次确认；
4. 新增 / 删除成功后，触发定义在 `model.ts` 中的组件事件（如 `onCreated` / `onDeleted`），便于其他组件联动；同时刷新当前分页的数据；
5. 所有与平台交互的动作均用 `@NeoEvent.function` / `@NeoEvent.click` 装饰，确保属性面板「事件动作」可正确识别。

### Case 4：基于 jsonplaceholder 的用户信息卡片列表

::: tip Prompt 示例
使用 https://jsonplaceholder.typicode.com/users 接口，写一个展示用户信息的卡片列表自定义组件（卡片要包含姓名、邮箱、公司名、地址等字段）。
:::

AI 助手结合 `neo-cmp-dev` 技能，典型会这么做：

1. 识别到这是**第三方接口**、不是 Neo 实体，走「自定义 API（通用代理）」场景：通过平台通用代理 `/rest/data/v2.0/scripts/api/proxy/forward` 转发请求，避免浏览器端跨域与鉴权问题；
2. 在 `propsSchema` 中暴露一个「自定义 API 配置项」，默认值指向 `https://jsonplaceholder.typicode.com/users`，允许业务方在属性面板替换目标接口；
3. 在 `index.tsx` 中用 `customApi.run(fetchConfig)` 发起请求，对返回结果做统一兜底（数组 / `{ data: [...] }` / `{ records: [...] }` 等结构都要兼容）；
4. 使用 antd `Card` / `Row` / `Col` 渲染成卡片网格，卡片内部展示 `name` / `email` / `company.name` / `address.city` 等字段；`Spin` 处理加载态、`Empty` 处理错误与空数据态；
5. 样式写在 `style.scss` 中，根节点 className 与组件目录名一致；响应式布局通过 antd 的栅格 `xs` / `sm` / `md` 断点实现。

::: tip 可直接参考的示例
CLI 自带的 `neo-custom-cmp-template` 模板中就有一个 `customApi__c` 组件，用的就是 `customApi.run` + `jsonplaceholder` 接口，AI 助手会主动参考这个样例快速落地。
:::

## 使用反馈

「组件开发 Skills」仍在 Beta 阶段，欢迎在实际开发中持续试用。如遇到以下任一场景，请在 [neo-cmp-docs Issues](https://github.com/xsy-neoui/neo-cmp-docs/issues) 提交反馈：

- AI 助手输出的代码不符合 Neo 自定义组件规范；
- 某个技能包的指引与当前 CLI / 平台行为存在冲突；
- 需要新增某类使用场景的指引或示例；
- 希望支持更多 AI 编辑器的 skill 目录。
