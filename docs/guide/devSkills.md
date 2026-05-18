# Neo 开发助手 Skills

::: warning Beta 状态
本「开发助手 Skills」目前处于 **Beta** 阶段，功能和使用方式仍在持续打磨中。试用过程中发现任何问题，或有改进建议，欢迎随时反馈到 [neo-cmp-docs Issues](https://github.com/xsy-neoui/neo-cmp-docs/issues)。
:::

## 什么是 Neo 开发助手 Skills

一套 AI 辅助开发工具，让你在 AI 编辑器（如 Kiro、Cursor）中通过对话完成 NeoCRM PaaS 平台的定制开发。AI 理解平台的 SDK、API 规范和开发约束，能帮你做方案设计、生成代码、部署验证。

## 环境准备

| 依赖 | 安装方式 | 用途 |
|:---|:---|:---|
| Node.js | [nodejs.org](https://nodejs.org/) | 运行脚本和 neo-cmp-cli |
| neo-cmp-cli | `npm i -g neo-cmp-cli` | 项目创建、登录、组件发布 |

验证安装：`neo -v`

## 适用人群

| 类型 | 角色 | 典型诉求 |
|:---|:---|:---|
| 内部 | 售前顾问 | 快速搭建 Demo 环境，向客户演示定制能力 |
| 内部 | 业务顾问 | 将业务需求转化为可落地的技术方案，减少与开发的沟通成本 |
| 内部 | 技术经理 | 对已经清晰的技术方案进行快速落地，提高交付效率 |
| 外部 | 企业管理员 | 梳理业务场景并自动落地，降低技术门槛 |
| 外部 | 合作伙伴 | 基于 PaaS 平台交付客户项目，加速开发效率 |

> 无需编程经验即可使用方案设计和实体管理技能包；后端/前端开发技能包建议具备基础的 Java 或 React 知识。


## 典型使用场景

### 场景 1：设计 + 创建业务对象

> 你说："我要管理投标项目，帮我设计实体模型并创建出来"

**涉及技能包**：neo-solution-design → neo-entity-management

**AI 会做什么**：
1. 引导你描述业务场景（投标有哪些阶段？需要记录哪些信息？）
2. 生成实体模型设计文档（实体名、字段列表、关联关系）
3. 确认后通过 Metadata API 在租户中自动创建实体和字段

**产出**：
- 方案文档：`solutions/bid-management/design.md`
- 租户中已创建的实体和字段，可直接在 CRM 界面使用

**价值**：传统方式需要业务顾问写需求 → 开发建模 → 手动配置，耗时 1-2 天。使用技能包后，一次对话即可完成从需求梳理到实体落地，约 10 分钟。


### 场景 2：开发一个数据看板

> 你说："帮我做一个商机阶段分布的统计卡片组件"

**涉及技能包**：neo-frontend-dev（可选先走 neo-solution-design）

**AI 会做什么**：
1. 确认数据来源（查询哪个实体、按什么维度统计）
2. 生成 React + AntD 组件代码（含数据查询、图表渲染、样式）
3. 执行 `neo push cmp` 发布到租户

**产出**：
- 组件代码：`src/components/opportunityStatsCard__c/`
- 租户中可用的自定义组件，可拖拽到首页或详情页

**价值**：前端开发者通常需要查阅组件规范、调试接口、处理发布流程，整个过程 2-4 小时。技能包将规范内置，AI 一次性生成符合平台要求的代码并完成发布，约 15 分钟。


### 场景 3：完整功能模块从设计到落地

> 你说："我要做一个项目管理模块，包含项目、里程碑、任务三个对象，项目关闭时自动归档所有任务"

**涉及技能包**：neo-solution-design → neo-entity-management → neo-backend-dev → neo-frontend-dev → neo-task-summary

**AI 会做什么**：
1. **需求分析**：梳理三个实体的字段、关联关系、业务规则
2. **技术设计**：输出 design.md，拆分为可执行的任务列表
3. **创建实体**：通过 API 创建 project__c、milestone__c、task__c 及其字段
4. **后端开发**：编写"项目关闭时归档任务"的 Trigger，配置并部署
5. **前端开发**：开发项目看板组件，发布到租户
6. **生成总结**：输出本次开发的回顾文档，记录决策和问题

**产出**：
- 方案文档：`solutions/project-management/`（requirements.md + design.md + tasks.md）
- 租户中 3 个实体 + 字段 + Trigger + 前端组件
- 开发总结：`summaries/项目管理模块-20250512.md`

**价值**：一个完整功能模块从需求到上线，传统方式需要产品出文档 → 开发排期 → 编码 → 测试 → 部署，通常 1-2 周。使用技能包后，技术经理或合作伙伴可以在 1-2 小时内完成全链路交付。


## 快速开始

### 1. 在 AI 编辑器中安装技能包

可通过下载技能包手动安装到 AI 编辑器（CodeBuddy、Kiro、Cursor等）中。

### 下载技能包

- **点击下载**：[devSkills.zip](/devSkills.zip)。

技能包内包含以下技能：

| Skill | 作用 |
| --- | --- |
| `neo-frontend-dev` | React 16 + TypeScript 自定义组件开发（基于 neo-cmp-cli 工具链） |
| `neo-backend-dev` | Java 后端代码全流程开发 |
| `neo-entity-management` | 查询和管理平台实体元数据，支持通过 Metadata API 自动创建实体和字段|
| `neo-solution-design` | 从需求到方案的全流程引导 |
| `neo-task-summary` | 任务完成后生成结构化回顾文档 |

### 手动安装步骤

根据你使用的 AI 编辑器，将 `devSkills.zip` 解压得到的 skill 添加导入到对应的 AI 编辑器（CodeBuddy、Kiro、Cursor等）即可。

以 CodeBuddy 为例，skill 添加导入步骤如下： 

1. 在「技能」页面，点击右上角的「+ 添加技能」按钮，选择「上传技能」；
2. 选择 `devSkills.zip` 解压得到的 `neo-frontend-dev` 目录（devSkills/neo-frontend-dev），点击「确定」；
3. 重复步骤 1、2 导入 `neo-backend-dev`、`neo-entity-management`、`neo-solution-design`、`neo-task-summary` 四个 skill。

::: tip 覆盖说明
若目标目录中已有同名 skill，覆盖式写入即可。
:::

### 2. 创建项目

对 AI 说：
> "帮我创建一个 Neo 项目"

AI 会执行 `neo create project` 并引导你登录租户。

### 3. 开始开发

直接描述你的需求，AI 会自动选择合适的技能包：

| 你说的话 | AI 使用的技能包 |
|:---|:---|
| "帮我做一个客户查重功能" | neo-solution-design → neo-backend-dev |
| "开发一个商机看板组件" | neo-solution-design → neo-frontend-dev |
| "写一个 Trigger，商机关闭时更新客户状态" | neo-backend-dev |
| "查一下 account 实体有哪些字段" | neo-entity-management |
| "总结一下这次的开发" | neo-task-summary |

## 技能包说明

### neo-solution-design（方案设计）

从需求到方案的全流程引导。

**适用场景**：新功能开发、老功能迭代、不确定技术方案时

**流程**：需求收集 → 技术设计 → 任务拆分

**产出**：`solutions/{feature-name}/` 下的 requirements.md、design.md、tasks.md

**使用方式**：
```
"帮我设计一个项目管理模块的方案"
"我要做一个定时同步数据的功能，帮我分析一下"
```

### neo-backend-dev（后端开发）

Java 后端代码全流程开发。

**支持的扩展类型**：
- Trigger 触发器（before/after，支持 add/update/delete/transfer 等）
- 自定义 REST API（@RestApi + @RestMapping）
- 计划作业（ScheduleJob + BatchJobService）
- 流程扩展（审批事件 / 自动流 / 规则事件）
- 异步任务（FutureTask）
- AI 提示词模板调用

**使用方式**：
```
"帮我写一个 Trigger，客户创建后自动分配负责人"
"开发一个 API，根据员工姓名查询积分详情"
"部署代码包 other.xsy.account"
```

**代码存放位置**：`src/codePackages/{代码包简称}/other/{company}/{module}/`

**部署命令**：
```bash
node neo-backend-dev/scripts/deploy_server_script.js <项目目录> <代码包简称> <Java包名>
```

### neo-frontend-dev（前端开发）

React 16 + TypeScript 自定义组件开发（基于 neo-cmp-cli 工具链）。

**核心能力**：
- 11 步开发流程（需求分析→实体识别→数据接入→组件实现→发布）
- 平台数据源对接（xObject / customApi / 通用代理）
- 事件动作机制（@NeoEvent + BaseCmp）
- 平台预置组件（NeoEntityList / NeoEntityGrid）
- propsSchema 属性面板配置

**使用方式**：
```
"帮我开发一个商机统计卡片组件"
"拉取系统中的 pipelineWidget__c 组件并修改"
"发布组件 statsCard__c"
```

**组件存放位置**：`src/components/{组件名}__c/`

**发布命令**：
```bash
neo push cmp --name <组件名>
```

### neo-entity-management（实体管理）

查询和管理平台实体元数据，支持通过 Metadata API 自动创建实体和字段。

**支持的操作**：
- 查询实体列表和字段定义
- 创建自定义实体（文本/自动编号主字段）
- 创建 19 种字段类型（文本、单选、多选、整数、金额、日期、日期时间、电话、邮箱、网址、图片、布尔、地理位置、百分比、关联关系、查找字段、文件、富文本等）
- 创建业务类型
- 查询实体间关联关系

**使用方式**：
```
"查一下系统里有哪些实体"
"查询 opportunity 实体的字段定义"
"创建一个招投标项目实体，包含预算金额、截止日期、状态等字段"
```

**本地缓存位置**：
- 实体列表：`src/xObjects/AllxObjects.md`
- 字段定义：`src/xObjects/fields/{apiKey}.md`

### neo-task-summary（任务总结）

任务完成后生成结构化回顾文档。

**触发方式**：对 AI 说"总结一下"、"回顾"、"写个总结"

**产出位置**：`summaries/{任务简述}-{YYYYMMDD}.md`

**文档结构**：
1. 任务背景（做了什么、为什么做）
2. 最终结果（产出、部署状态）
3. 过程问题（意图 → 问题 → 解法）


## 项目目录结构

```
你的项目/
├── neo.config.js              # 项目配置
├── .neo-cli/token.json        # 登录凭证
├── solutions/                 # 方案设计文档
│   └── {feature-name}/
├── src/
│   ├── components/            # 前端自定义组件
│   │   └── xxxWidget__c/
│   ├── xObjects/              # 实体元数据缓存
│   │   ├── AllxObjects.md
│   │   └── fields/{apiKey}.md
│   └── codePackages/          # 后端代码包
│       └── {代码包简称}/
│           ├── other/{company}/{module}/
│           │   ├── triggers/
│           │   ├── apis/
│           │   ├── schedules/
│           │   ├── flows/
│           │   └── utils/
│           ├── scriptTrigger.xml
│           └── doc.md
└── summaries/                 # 任务总结
```

## 常见问题

**Q: AI 直接开始写代码，没有先做方案设计怎么办？**

技能包已内置前置检查：如果没有 tasks.md，AI 会提示你先走方案设计。如果你确定不需要方案设计，告诉 AI "跳过方案设计，直接开发"。

**Q: 部署时报 SSL 证书错误？**

在命令前加环境变量：
```bash
NODE_TLS_REJECT_UNAUTHORIZED=0 node neo-backend-dev/scripts/deploy_server_script.js ...
```

**Q: 部署 Trigger 时报 order 冲突？**

将 scriptTrigger.xml 中对应 `<order>` 的值 +1 后重新部署。

**Q: 如何确认实体的正确 API Key？**

对 AI 说"查一下系统里有哪些实体"，或直接查看 `src/xObjects/AllxObjects.md`。

**Q: 后端代码包的 Java 包名规则是什么？**

- 前三级：`other.{company}.{module}`（如 `other.xsy.account`），全部小写
- 第四级可选：`triggers` / `apis` / `schedules` / `flows` / `utils`
- 部署时只用三级包名

**Q: npm install 很慢怎么办？**

后端代码部署不需要 npm install。前端组件发布前才需要，技能包会自动加淘宝源 `--registry=https://registry.npmmirror.com` 加速安装。


## 反馈与改进

使用过程中遇到问题或有优化建议，可以在任务完成后对 AI 说"总结一下"，生成的总结文件会记录问题和解法，方便后续反馈给技能包维护者。


