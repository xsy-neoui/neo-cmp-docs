# Web端 NeoEntityGrid 使用说明

## 一、组件概述

`EntityGrid` 是 Neo UI Component Web 端的核心业务组件，用于展示和管理实体数据列表。它基于 AG-Grid 实现，支持表格视图、分屏视图、地图视图、BI 看板等多种展示模式，提供了完整的数据展示、筛选、排序、批量操作、单元格编辑等功能。

### 技术栈

- **React**: 基于 React 类组件实现
- **MobX**: 使用 MobX 进行状态管理
- **AG-Grid**: 基于 AG-Grid 进行表格渲染
- **amis**: 通过 amis 框架进行布局和部分 UI 渲染
- **TypeScript**: 完整的类型定义支持

## 二、核心功能

### 1. 多种展示模式

组件支持以下展示模式（通过 `displayMode` 控制）：

- **`list`**: 列表视图（默认）- 标准表格展示
- **`listSplitView`**: 分屏视图 - 左侧列表 + 右侧详情
- **`listMapView`**: 地图视图 - 地图 + 列表联动
- **BI Board**: BI 看板视图（通过 `biListVisible` 控制）

### 2. 数据展示功能

- **表格视图**: 基于 AG-Grid 的完整表格能力
- **列表视图切换**: 支持多个列表视图切换
- **分页加载**: 支持服务端分页（serverSide）和客户端分页（clientSide）
- **树形结构**: 支持树形数据展示（`treeData: true`）
- **空状态处理**: 提供友好的空数据提示
- **错误处理**: 完善的错误提示和重试机制

### 3. 支持列表视图切换、搜索、筛选和排序

- **列表视图切换功能**:
  - 切换视图后自动重新加载列表数据
  - 视图决定数据范围（筛选条件）和显示列
  - 支持系统视图和用户自定义视图
- **搜索功能**:
  - 用户在搜索框输入关键字
  - 系统对基本类型字段（文本、数字、电话、邮箱）进行模糊匹配
  - 支持防抖处理（默认300ms）
  - 支持回车触发搜索
- **筛选功能**:
  - 支持列头筛选
  - 支持自定义筛选条件（`setCustomCondition`）
  - 筛选条件持久化
- **排序功能**:
  - 支持多列排序
  - 支持升序/降序切换
  - 排序状态持久化

### 4. 批量操作

- **批量选择**: 支持单选/多选模式
- **批量操作按钮**: 支持批量编辑、删除、转移等操作
- **批量编辑**: 支持扣框编辑（单元格内联编辑）
- **Picker 模式**: 支持作为选择器使用（`pattern: 'pickView'`）

### 5. 单元格编辑

- **扣框编辑**: 支持单元格内联编辑
- **批量保存**: 支持批量编辑后统一保存
- **权限控制**: 支持字段级编辑权限
- **校验**: 支持保存前校验

### 6. 详情打开方式

- **单击**: 侧滑抽屉打开详情
- **双击**: 新页签打开详情
- **分屏视图**: 右侧直接展示详情
- **地图视图**: 点击地图标记打开详情

### 7. 分页器

- 用户通过底部分页器切换页码
- 支持上一页、下一页、跳转到指定页
- 支持修改每页显示条数
- 翻页时保持当前的筛选和排序条件

### 8. 列表汇总

- 底部显示当前结果集的汇总信息
- 支持总条数、金额汇总等【暂不支持】
- 勾选记录后显示选中集的汇总【暂不支持】
- 支持展开/收起汇总项【暂不支持】

## 三、组件扩展性

### 基础属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `objectApiKey` | `string` | - | 实体的 ApiKey（必填）。即使用 `agGridDataSource` 自定义行数据，仍需传入，用于布局、权限、缓存 key 等（见 [示例 4](#示例-4-自定义数据源)） |
| `pattern` | `string` | `'entityView'` | 使用模式：`entityView`/`pickView`/`simpleListView`/`globalSearchPage`/`secondaryList` |
| `autoHeight` | `boolean` | `false` | 是否根据内容自动撑高（true 时 height 属性失效） |
| `height` | `string \| number` | `'100%'` | 组件高度，`autoHeight` 为 false 时生效 |
| `className` | `string` | `''` | 自定义样式类名 |
| `name` | `string` | - | 组件名称，用于 amis 通信（必填） |
| `render` | `Function` | - | **必传**（Neo 业务组件内使用 `NeoEntityGrid` 时）。类组件传 `this.props.render`，函数组件传 `props.render`，由上层 amis/Neo 注入，用于渲染列表内部 Schema；否则列表无法正常渲染 |

### 数据加载属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `dataLoadType` | `'serverSide' \| 'clientSide' \| 'auto' \| 'pagination'` | - | 数据加载方式：`serverSide` 搜索时总是从远程加载数据；`clientSide` 一次性请求完所有数据，在本地检索、编辑 |
| `cacheBlockSize` | `number` | - | 服务端模式下单次请求条数 |
| `agGridDataSource` | `object` | - | 自定义 AG Grid **服务端**行数据源：须实现 `getRows`（见 [示例 4](#示例-4-自定义数据源)）。传入后列表行数据不再走默认实体 search，列布局仍按 `objectApiKey` 走布局接口 |
| `defaultViewId` | `string` | - | 默认显示的列表视图 ID |
| `additionalConditions` | `array` | `[]` | 固定附加筛选条件，格式同 `setCustomCondition` 参数 |

### 显隐控制属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `hiddenHeader` | `boolean` | `false` | 隐藏头部（视图切换栏 + 操作工具栏） |
| `disableSearch` | `boolean` | `false` | 禁用搜索框 |
| `showView` | `boolean` | `true` | 是否显示列表视图控制栏 |
| `enableChangeView` | `boolean` | `true` | 是否支持列表视图切换 |
| `canCreate` | `boolean` | `true` | 是否显示新建按钮 |
| `canImport` | `boolean` | `false` | 是否显示导入按钮 |
| `disablePagination` | `boolean` | `false` | 是否禁用分页 |
| `paginationPageSize` | `number` | `20` | 每页显示条数 |

### 列表配置属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `withOrder` | `boolean` | `true` | 是否显示序号列 |
| `withCheck` | `boolean` | `true` | 是否显示多选列 |
| `editable` | `boolean` | `true` | 是否支持单元格编辑（扣框编辑） |
| `selectionMode` | `'single' \| 'multiple'` | - | 选择模式（Picker 模式下默认 `single`） |

### 工具栏配置属性

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `enableToolbar` | `boolean` | `true` | 是否开启工具栏 |
| `disableExport` | `boolean` | `false` | 是否禁用导出 |
| `disableBatchEdit` | `boolean` | `false` | 是否禁用编辑列表 |
| `disableFieldSetup` | `boolean` | `false` | 是否禁用字段设置 |
| `disableBiView` | `boolean` | `false` | 是否禁用 BI 视图 |
| `disableFullScreen` | `boolean` | `false` | 是否禁用全屏 |
| `disableAutoSizeColumns` | `boolean` | `false` | 是否禁用一键调整列宽 |
| `customToolbarButtons` | `array` | - | 工具栏自定义按钮配置 |

### 事件回调属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `onRowSelected` | `(data: Array<{data: Record}>, event) => void` | 行选中状态变化回调，`data` 为当前所有已选中行数据数组，每项为 `{data: {...行字段, id, name}}` |
| `onGridReady` | `(gridModel) => void` | 表格就绪回调，`gridModel` 包含 `reloadGrid`/`setCustomCondition` 等方法 |
| `onFirstDataRendered` | `() => void` | 首次数据渲染完成回调 |
| `onDataLoaded` | `(data) => void` | 数据加载完成回调 |
| `onDataRequest` | `(store) => void` | 数据请求前回调，可通过 `store.setCustomCondition(...)` 修改请求条件 |
| `onLayoutLoaded` | `(data) => void` | 布局加载完成回调 |
| `onSmartViewChanged` | `(data) => void` | SmartView 切换回调 |
| `onSinglerClick` | `(clickData) => boolean` | 行单击拦截，返回 `true` 则阻止默认打开详情逻辑 |
| `onDetailPageChange` | `(data) => void` | 侧滑详情翻页时回调（分屏视图/地图视图） |
| `onSelectedCall` | `(data) => void` | picker 选择器模式时，点击「确认」的回调方法 |
| `onCancel` | `() => void` | picker 选择器模式时，点击「取消」的回调方法 |

### 其他属性

| 属性名 | 类型 | 说明 |
|--------|------|------|
| `searchPlaceholder` | `string` |  搜索框自定义 placeholder 文本 |
| `pageInfo` | `{pageKey: string, scope: {objectApiKey: string}}` | 页面信息，传入后会自动注册 `reloadPage`/`refreshData`/`refreshPage` 等刷新方法到页面 Com |
| `noPermission` | `ReactNode \| Function` | 无数据权限时展示的内容，可为 React 节点或无参函数，通过设计器添加的列表组件时该值固定为 `true` |
| `customEmptyMsg` | `string` | 自定义空数据提示文本，覆盖默认的「暂无数据」提示 |
| `scene` | `string` | 场景标识，如 `'standard'`（standard 场景下侧滑详情会带遮罩并可点击关闭） |
| `busiTypeApiKey` | `string` | 业务类型 ApiKey，用于打开详情时传入业务类型参数 |
| `selectedCount` | `number` | picker选择器模式时可选择的最多个数 |


## 四、核心方法介绍

### customToolbarButtons — 工具栏自定义按钮

**作用**：在列表右上角工具栏区域插入业务线自定义按钮，支持在默认按钮组的**前方**（`header`）和**后方**（`footer`）分别注入，常用于业务线定制化操作入口。

**函数签名**：
```typescript
customToolbarButtons?: {
  header?: Array<CustomButtonProps>  // 插入到默认按钮组前方
  footer?: Array<CustomButtonProps>  // 插入到默认按钮组后方
}

interface CustomButtonProps {
  id: string                                          // 唯一标识（必填）
  label: string                                       // 按钮文本（图标模式时作为 tooltip 备用）
  icon?: string                                       // 图标名称（IconView 组件的 name），有图标时优先展示图标
  tooltip?: string                                    // hover 时的提示文本，未设置时使用 label
  visible?: boolean                                   // 是否显示，false 时不渲染，默认 true
  disabled?: boolean                                  // 是否禁用（添加 disable 样式类）
  onClick?: (event: MouseEvent) => void               // 点击回调
  className?: string                                  // 自定义 CSS 类名
  testId?: string                                     // 测试 ID，默认为 `{objectApiKey}-listbutton-custom-{id}`
  customRender?: (button: CustomButtonProps) => ReactNode  // 完全自定义渲染，优先级最高
}
```

**实现逻辑**：
- 工具栏按钮的渲染顺序为：`header 自定义按钮` → 一键调整列宽 → 刷新 → 导出 → 批量编辑 → 字段设置 → BI 视图 → 地图 → 全屏 → `footer 自定义按钮`
- 每个按钮用 `Tooltip` 包裹，hover 时展示 `tooltip`（未配置则用 `label`）
- 设置了 `icon` 时，按钮只展示图标（`IconView`）；否则展示文本 `label`
- `visible === false` 时该按钮不渲染（跳过）
- `customRender` 优先级最高，设置后完全由业务方控制渲染内容
- `disabled` 为 `true` 时，按钮添加 `disable` 样式类，但**不会阻止** `onClick` 触发（需业务方自行在 `onClick` 内判断）

**使用示例**：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

function syncDataFromExternalSystem() {
  /* 业务实现 */
}
function exportAsPDF() {
  /* 业务实现 */
}
function openApprovalDialog(_ids: string[]) {
  /* 业务实现 */
}

/** 示例 1：在工具栏末尾追加一个图标按钮 */
export class AccountToolbarFooterBtnExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        customToolbarButtons={{
          footer: [
            {
              id: 'sync-btn',
              label: '同步数据',
              icon: 'Refresh',
              tooltip: '点击同步最新数据',
              onClick: () => syncDataFromExternalSystem()
            }
          ]
        }}
      />
    )
  }
}

/** 示例 2：工具栏前方注入按钮，控制显隐/禁用（以下为示意变量，实际来自 props/state） */
const hasApprovePermission = true
const selectedCount = 0
const selectedIds: string[] = []

export class PriceToolbarHeaderFooterExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="priceList"
        objectApiKey="price"
        pattern="entityView"
        customToolbarButtons={{
          header: [
            {
              id: 'approve-btn',
              label: '批量审批',
              icon: 'CheckOne',
              tooltip: '对选中记录批量审批',
              visible: hasApprovePermission,
              disabled: selectedCount === 0,
              onClick: () => {
                if (selectedCount === 0) return
                openApprovalDialog(selectedIds)
              }
            }
          ],
          footer: [
            {
              id: 'export-pdf-btn',
              label: '导出 PDF',
              icon: 'FilePdf',
              onClick: () => exportAsPDF()
            }
          ]
        }}
      />
    )
  }
}

const syncStatus: 'ok' | 'fail' = 'ok'

/** 示例 3：customRender 完全自定义 */
export class OrderToolbarCustomRenderExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="orderList"
        objectApiKey="order"
        pattern="entityView"
        customToolbarButtons={{
          footer: [
            {
              id: 'status-indicator',
              label: '同步状态',
              customRender: (button) => (
                <li key={button.id} className="custom-sync-status">
                  <span className={`dot ${syncStatus === 'ok' ? 'green' : 'red'}`} />
                  {syncStatus === 'ok' ? '已同步' : '同步失败'}
                </li>
              )
            }
          ]
        }}
      />
    )
  }
}
```


### additionalConditions - 自定义筛选条件

通过 `additionalConditions` 可传入静态筛选条件。初始化时 Store 会将其与 `urlConditions`（若有）合并，顺序为：**先 `additionalConditions`，后 `urlConditions`**。这些条件会参与列表 **search** 请求的 `conditions` 参数。

**字段说明**

| 字段 | 类型 | 说明 |
|------|------|------|
| **apiKey** | `string` | 字段 API 名（与实体字段元数据中的 `apiKey` 一致）。 |
| **type** | `number` | 查询 **运算符**。常用取值见下表；复杂场景（如日期区间等）还可能使用其它数值，与表头筛选生成的条件类型保持一致。 |
| **value** | `string` 等 | 比较右侧的值。例如 **等于** 时为单个标量；**包含多选 / IN（type 10）** 时常为逗号分隔的 id 字符串；具体格式需与字段类型及后端约定一致。 |

**type 常用取值**（与组件内 `FilterCondition` 常量一致，源码：`EntityGrid/constant/index.ts`）

| 数值 | 含义 |
|------|------|
| `1` | 等于（EQUALS） |
| `2` | 不等于（NOT_EQUALS） |
| `3` | 包含（CONTAINS） |
| `4` | 不包含（NOT_CONTAINS） |
| `5` | 开始于（STARTS_WITH） |
| `6` | 大于（GREATER_THAN） |
| `7` | 大于等于（GREATER_EQUAL） |
| `8` | 小于（LESS_THAN） |
| `9` | 小于等于（LESS_EQUAL） |
| `10` | 在列表中 / IN |
| `13` | 为空（EMPTY） |
| `14` | 不为空（NOT_EMPTY） |
| `21` | 不在列表中 / NOT_IN |

**使用示例**：

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export default class AccountGridWithConditions extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        // 推荐：直接写 apiKey，与 BFF conditions 一致
        additionalConditions={[{ apiKey: 'accountName', type: 3, value: '测试客户12' }]}
        // 亦可：用字段 id（需在列表 items 中能解析到对应字段）
        // additionalConditions={[{ item: 123, type: 3, value: '关键词' }]}
      />
    )
  }
}
```


### onRowSelected — 行选中变化回调

**触发时机**：用户勾选或取消勾选某行时触发；清空选中时也会以空数组触发。

**函数签名**：
```typescript
onRowSelected?: (data: Array<{ data: Record }>, event: Event) => void
```

**参数说明**：
- `data`：当前所有已选中行的数据数组，每一项格式为 `{ data: { ...行字段, id: string, name: string } }`，其中 `name` 字段取自实体的主属性字段
- `event`：AG-Grid 原生 rowSelected 事件对象

**实现逻辑**：
1. 触发时会重新计算所有已选中的行数据（支持跨页选中）
2. 在树形模式下，跨页选中通过 `selectedIds` 集合维护
3. 清空选中操作（点击「清除选中」按钮）时，以 `[]` 调用此回调

**使用示例**：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export class AccountGridRowSelectedExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        onRowSelected={(data, event) => {
          const selectedIds = data.map(({ data }) => data.id)
          const selectedNames = data.map(({ data }) => data.name)
          console.log('已选中条数：', data.length)
          console.log('已选中 ID：', selectedIds)
        }}
      />
    )
  }
}
```


### onSinglerClick — 行单击拦截

**触发时机**：用户单击表格某一行时，在执行默认「打开详情抽屉/跳转详情页」逻辑**之前**调用。

**函数签名**：
```typescript
onSinglerClick?: (clickData: ClickData) => boolean
```

**参数说明**：
`clickData` 包含被点击行的完整数据，关键字段包括：
- `id`：记录 ID
- `objectApiKey`：实体 ApiKey
- `objectId`：实体对象 ID
- `entityType`：业务类型 ID
- `nameField`：是否是主属性字段
- `i18nTitle`：记录名称（国际化）
- 其他行字段数据

**实现逻辑**：
- 返回 `true`：拦截默认逻辑，不打开详情页，完全由业务方自定义处理
- 返回 `false` / `undefined` / 不返回：继续执行默认的打开详情逻辑
- **注意**：双击行时也会调用 `onSinglerClick`（双击打开详情时同样会先检查此回调）

**使用示例**：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export class ContactGridSinglerClickExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="contactList"
        objectApiKey="contact"
        pattern="entityView"
        onSinglerClick={(clickData) => {
          if (clickData.objectApiKey === 'contact') {
            window.open(`/custom/contact/${clickData.id}`)
            return true
          }
          return false
        }}
      />
    )
  }
}
```


### customEmptyMsg — 自定义空数据提示

**作用**：替换列表无数据时的默认提示文本，常用于在特定业务场景下给用户更明确的引导信息。

**函数签名**：
```typescript
customEmptyMsg?: string
```

**实现逻辑**：
- 组件内部将 `customEmptyMsg` 传给 `Empty` 组件（AG-Grid 的 `agNoRowsOverlay`）
- 当列表查询结果为空时，显示此自定义文本；若未配置，则显示默认的「暂无数据」
- 若列表因筛选条件导致为空，空状态组件会同时展示「清除筛选条件」按钮

**使用示例**：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

/** 示例 ：简单的自定义空状态文案 */
export class TaskSecondaryCustomEmptyExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="taskList"
        objectApiKey="task"
        pattern="secondaryList"
        customEmptyMsg="暂无关联任务，请点击「新建」按钮创建"
      />
    )
  }
}
```


## 五、完整使用示例

> `NeoEntityGrid` 需从 `neo-ui-component-web` 导出；
> 无需在项目中安装 `neo-ui-component-web`；组件在 Neo 平台运行时会由平台注入该模块；
> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染；
> 若父组件为**函数组件**，请使用 `render={props.render}`，与类组件的 `this.props.render` 等价。

### 示例 1: 基础大列表

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export default class AccountEntityGridBasic extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        // defaultViewId="default_view"
        hiddenHeader={false}
        showView={true}
        enableChangeView={true}
        disableSearch={false}
        canCreate={true}
        canImport={true}
        editable={true}
        withOrder={true}
        withCheck={true}
        enableToolbar={true}
        disableExport={false}
        disablePagination={false}
        paginationPageSize={20}
        autoHeight={false}
        height="500px"
        additionalConditions={[]}
      />
    )
  }
}
```

### 示例 2: Picker 列表（选择器）

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export default class ContactPickerGrid extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="pickerList"
        objectApiKey="contact"
        pattern="pickView"
        selectionMode="multiple"
        referData={{
          "referObjectApiKey": "opportunity", // 关联表
          "referItemApiKey": "accountId" // 关联表对应的外键字段
        }}
        onSelectedCall={(selectedData) => {
          console.log('选中的数据', selectedData)
        }}
        shouldCloseDialog={true}
      />
    )
  }
}
```

### 示例 3: 自定义筛选条件 + 自定义工具栏

本示例将 **静态筛选**（`additionalConditions`）与 **工具栏扩展**（`customToolbarButtons`）放在同一张大列表上：筛选逻辑可参考模板 `entityGrid4__c`，工具栏按钮与 `customRender` 可参考模板 `entityGrid2__c`（二者在项目中为独立示例组件，此处合并演示）。

- **`additionalConditions`**：在列表初始化时追加条件，与视图条件等合并后参与查询；下例对客户名称做「包含」过滤（`type: 3` 表示包含，与文档「additionalConditions」章节一致）。
- **`customToolbarButtons`**：`header` 插在默认按钮组前，`footer` 插在后；支持 `icon`、`tooltip`、`onClick` 以及 `customRender` 完全自定义节点。

> **说明**：`customRender` 返回的节点需自行包一层带 `key` 的根元素（如 `<li key={button.id}>`），与模板 `entityGrid2__c` 一致。

```tsx
import React from 'react'
import { Tooltip } from 'antd'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import { NeoEntityGrid } from 'neo-ui-component-web'

/** 同步状态等可来自 props / 上游状态 */
const syncStatus: 'ok' | 'fail' = 'ok'

export default class AccountGridFilterAndToolbar extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        defaultViewId="default_view"
        hiddenHeader={false}
        showView={true}
        enableChangeView={true}
        disableSearch={false}
        canCreate={true}
        canImport={true}
        editable={true}
        withOrder={true}
        withCheck={true}
        enableToolbar={true}
        disableExport={false}
        disablePagination={false}
        paginationPageSize={20}
        autoHeight={false}
        height="500px"
        customEmptyMsg="暂无数据，请点击「新建」按钮创建"
        additionalConditions={[
          {
            apiKey: 'accountName',
            value: '测试客户',
            type: 3, // 3: 包含；1: 等于；详见上文 additionalConditions 章节
            // item: -11100000100014, // 可选：筛选条件 ID（与设计器/元数据一致时使用）
          },
        ]}
        customToolbarButtons={{
          header: [
            {
              id: 'approve-btn',
              label: '批量审批',
              icon: 'CheckOne',
              tooltip: '对选中记录批量审批',
              onClick: () => {
                console.log('批量审批')
              },
            },
          ],
          footer: [
            {
              id: 'export-pdf-btn',
              label: '导出 PDF',
              icon: 'FilePdf',
              onClick: () => console.log('导出 PDF'),
            },
            {
              id: 'status-indicator',
              label: '同步状态',
              customRender: (button: any) => {
                const ok = syncStatus === 'ok'
                const tip = ok ? '已同步' : '同步失败'
                const Icon = ok ? CheckCircleOutlined : CloseCircleOutlined
                return (
                  <li key={button.id} className="account-grid-filter-toolbar__status">
                    <Tooltip title={tip} placement="top" mouseEnterDelay={0.1}>
                      <button
                        type="button"
                        className={ok ? 'is-ok' : 'is-error'}
                        aria-label={`同步状态：${tip}`}
                      >
                        <Icon aria-hidden />
                      </button>
                    </Tooltip>
                  </li>
                )
              },
            },
          ],
        }}
      />
    )
  }
}
```

### 示例 4: 自定义数据源
备注：待完善。

**使用注意**

- 对象形态需符合 AG Grid `IServerSideDatasource`：**至少实现 `getRows(params)`**。`params.request` 中含 `startRow`、`endRow`、`sortModel`、`filterModel` 等；取数结束后调用 `params.successCallback(行数组, 总行数)`，异常调用 `params.fail()`。
- 行对象字段需与当前列表**列配置的字段 apiKey** 对齐，否则单元格无法正常展示。
- 建议同时设置 `dataLoadType="serverSide"`，与自定义服务端分页语义一致（与 `NeoEntityGrid` 其它 props 一致，透传至底层 `entityGrid`）。
- 业务中完整参考可见：`NeoBpm/approvalWorkBench/components/gridTable.tsx`（`getRows` 内调审批台查询并 `successCallback`）、`NeoBpm/flow/flowDetail/formFields/components/formRelationItem.tsx`（关联子表自定义加载）。
- 下方 `fetchAccountCustomPage` 的 mock `records` 从同一批 **21 条** account 数据中取 **3 条**（`id` 分别为 `4255673156574812`、`4225737913212487`、`4225737647447519`）；示例为可读性省略了大量值为 `null` 的键，真实对接时请按列表列 apiKey 与接口完整结构对齐。

**`agGridDataSource`与 `objectApiKey` 的关系**

**需要传 `objectApiKey`，且应传与当前列表业务一致的实体 ApiKey**（不要随意省略或随便填）。`agGridDataSource` 只接管 AG Grid **行数据**的 `getRows`，列表组件内部有很多依赖 `objectApiKey` 的逻辑，例如：

- **布局初始化**：`loadLayout` 调用 `requestLayout` 时，默认请求体来自计算属性 `layoutParam`，其中包含 `objectApiKey`，用于拉取实体、列表视图、列与筛选元数据等。
- **权限**：列表职能权限判断会用 `objectApiKey` 在权限数据中匹配 `LIST`（`doPermission`）。
- **缓存**：部分 localStorage key（如视图、分页条数）会拼接 `objectApiKey`。
- **其它接口**：导出、批量保存、真实条数、SmartView 详情等仍可能走 `/xobjects/{objectApiKey}/...` 一类路径。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

/**
 * 示例：自有接口分页返回 { records, totalSize }，字段需与 objectApiKey 对应实体的列表列一致。
 * fetchAccountCustomPage 仅为示意，请替换为真实请求。
 */
async function fetchAccountCustomPage(params: {
  startRow: number
  endRow: number
  sortModel: any[]
  filterModel: any
}) {
  const pageSize = params.endRow - params.startRow
  const pageNo = Math.floor(params.startRow / pageSize) + 1
  // const res = await getNeoContext().fetcher({ url: '/your/api', method: 'post', data: { pageNo, pageSize, sort: params.sortModel, filter: params.filterModel } })
  // mock：以下 3 条从同一批 21 条 account 列表数据中抽取（测试客户111 / 17 / 160）；totalSize 示意服务端总条数便于分页
  const owner = { id: 3256836509097427, name: 'LS' }
  const depart = { id: 3256835676528229, name: '全公司' }

  return {
    records: [
      {
        id: 4255673156574812,
        accountName: '测试客户111',
        pinyin: 'ceshikehu111',
        entityType: -11010000100001,
        'entityType-label': '默认业务类型',
        'entityType-labelKey': 'XdMDBizTp.account.defaultBusiType',
        accountScore: 80,
        level: 1,
        accountType: 1,
        ownerId: owner,
        'ownerId-icon': icon,
        dimDepart: depart,
        tenantId: 3256219432312412,
        objectId: 1,
        countryId: 1,
        lockStatus: 1,
        highSeaStatus: 1,
        doNotDisturb: 0,
        delFlg: 0,
        duplicateFlg: 0,
        srcFlg: 0,
        newOppFlg: 0,
        approvalStatus: 0,
        isCustomer: '0',
        opportunityCount: '0',
        innerGroupId: 4255673366634048,
        parentAccountId: null,
        phone: null,
        createdAt: 1774510489068,
        updatedAt: 1774510489193,
        createdBy: owner,
        updatedBy: owner,
      },
      {
        id: 4225737913212487,
        accountName: '测试客户17',
        pinyin: 'ceshikehu17',
        entityType: -11010000100003,
        'entityType-label': '企业客户',
        'entityType-labelKey': 'XdMDBizTp.account.defaultScrmBusiType',
        accountScore: 70,
        level: 2,
        accountType: 1,
        ownerId: owner,
        'ownerId-icon': icon,
        dimDepart: depart,
        tenantId: 3256219432312412,
        objectId: 1,
        countryId: 1,
        lockStatus: 1,
        highSeaStatus: 1,
        doNotDisturb: 0,
        delFlg: 0,
        duplicateFlg: 0,
        srcFlg: 0,
        newOppFlg: 0,
        approvalStatus: 0,
        isCustomer: '0',
        opportunityCount: '0',
        innerGroupId: 4225737927466432,
        parentAccountId: { id: 4225737231359452, name: '测试客户14' },
        phone: '15910783333',
        employeeNumber: 100,
        customItem165__c: 1,
        createdAt: 1772683374683,
        updatedAt: 1774439363104,
        createdBy: owner,
        updatedBy: owner,
      },
      {
        id: 4225737647447519,
        accountName: '测试客户160',
        pinyin: 'ceshikehu160',
        entityType: -11010000100003,
        'entityType-label': '企业客户',
        'entityType-labelKey': 'XdMDBizTp.account.defaultScrmBusiType',
        accountScore: 50,
        level: null,
        accountType: 1,
        ownerId: owner,
        'ownerId-icon': icon,
        dimDepart: depart,
        tenantId: 3256219432312412,
        objectId: 1,
        countryId: 1,
        lockStatus: 1,
        highSeaStatus: 1,
        doNotDisturb: 0,
        delFlg: 0,
        duplicateFlg: 0,
        srcFlg: 0,
        newOppFlg: 0,
        approvalStatus: 0,
        isCustomer: '0',
        opportunityCount: '0',
        innerGroupId: 4225737692618304,
        parentAccountId: null,
        phone: '15910781111',
        customItem165__c: 2,
        createdAt: 1772683360350,
        updatedAt: 1774426404632,
        createdBy: owner,
        updatedBy: owner
      },
    ] as any[],
    totalSize: 3,
  }
}

export default class AccountGridCustomDataSource extends React.Component<{ render: any }> {
  /** 保留为类属性，避免 render 每次新建函数导致 ag-grid 重复绑定 */
  private agGridDataSource = {
    getRows: (params: any) => {
      const { startRow, endRow, sortModel, filterModel } = params.request
      // 通过接口获取自定义数据（列表数据）
      fetchAccountCustomPage({ startRow, endRow, sortModel, filterModel })
        .then(({ records, totalSize }) => {
          params.successCallback(records, totalSize)
        })
        .catch(() => {
          params.fail()
        })
    },
  }

  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountListCustomDs"
        objectApiKey="account"
        pattern="entityView"
        dataLoadType="serverSide"
        agGridDataSource={this.agGridDataSource}
        paginationPageSize={20}
      />
    )
  }
}
```

### 其他用法示例
见 CLI 内置组件模板 `neo-web-entity-grid`。

## 六、注意事项

### 1. Store 初始化

- Store 由 amis 框架根据 `storeType: EntityGridStore.name` 自动创建
- 无需手动创建 Store 实例

### 2. 模式区分

- `pattern='entityView'`: 标准大列表
- `pattern='pickView'`: Picker 选择器
- `pattern='globalSearchPage'`: 全局搜索结果列表

### 3. 必传参数

- **所有模式**: `objectApiKey`、`name`、`render={this.props.render}`（Neo 业务组件内嵌列表时，`render` 必须为父组件注入的 `this.props.render`，否则列表无法正常渲染）
- **Picker**: `referData`（referItemApiKey、referObjectApiKey）、`onSelectedCall`

### 4. 树形模式

- 需显式设置 `treeData: true`
- 支持 `treeParentIdField`、`treeInitialLoadCount`、`treeLoadMoreCount` 等配置
- 超过 1000 条时「展开全部」按钮自动禁用

### 5. 性能优化

- 服务端模式（serverSide）适合大数据量
- 客户端模式（clientSide）适合小数据量
- `dataLoadType: 'auto'` 会根据数据量自动切换

### 6. render 必传说明

- 在 Neo 业务组件中内嵌 `NeoEntityGrid` 时，**必须**传入由框架注入的渲染函数：`render={this.props.render}`（类组件）或 `render={props.render}`（函数组件）。
- 该函数用于将列表内部的 amis Schema 渲染为真实 DOM；缺失时头部、表格体、底栏等子区域无法正常展示。

## 七、常见问题

### Q1: 如何刷新列表数据？

**A**: 通过指令或组件方法：

```typescript
// 方式1: amis 指令
target: 'listviewx?cmd=refresh_grid'

// 方式2: 在 onGridReady 中拿到 gridModel，调用 store.reloadGrid(false)
// gridModel.reloadGrid 会代理到内部 store
```

### Q2: 如何拦截行点击打开详情？

**A**: 使用 `onSinglerClick`（需在类组件 `render` 中挂载，并传入 `render={this.props.render}`）：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export class AccountGridInterceptExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        onSinglerClick={(clickData) => {
          console.log('点击了', clickData)
          return true
        }}
      />
    )
  }
}
```

### Q3: 如何获取选中的数据？

**A**: 通过 `onRowSelected` 回调：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export class AccountGridSelectionExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        onRowSelected={(data) => {
          const selectedIds = data.map(({ data }) => data.id)
          console.log('选中 ID 列表：', selectedIds)
        }}
      />
    )
  }
}
```

### Q4: 如何自定义空状态提示？

**A**: 使用 `customEmptyMsg`：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export class TaskGridEmptyMsgExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="taskList"
        objectApiKey="task"
        pattern="secondaryList"
        customEmptyMsg="暂无数据，请先创建"
      />
    )
  }
}
```

### Q5: 如何禁用某些功能？

**A**: 使用对应的禁用属性：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export class AccountGridDisableFeaturesExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        disableSearch={true}
        disableExport={true}
        disablePagination={true}
        withOrder={false}
        withCheck={false}
        editable={false}
      />
    )
  }
}
```

### Q6: Picker 模式如何获取选中结果？

**A**: 使用 `onSelectedCall` 回调：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

function closeDialog() {
  /* 关闭弹窗 */
}

export class ContactPickerSelectedExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountPicker"
        objectApiKey="account"
        pattern="pickView" // Picker 列表（选择器）
        referData={{
          referObjectApiKey: 'opportunity',
          referItemApiKey: 'accountId'
        }}
        onSelectedCall={(selectedData) => {
          console.log(selectedData)
          closeDialog()
        }}
        shouldCloseDialog={true}
      />
    )
  }
}
```

### Q7: 如何添加自定义工具栏按钮？

**A**: 使用 `customToolbarButtons`（`header` / `footer` 结构，见上文「customToolbarButtons」章节）：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export class AccountGridCustomToolbarExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        customToolbarButtons={{
          footer: [
            {
              id: 'customBtn',
              label: '自定义',
              icon: 'Refresh',
              onClick: () => console.log('clicked')
            }
          ]
        }}
      />
    )
  }
}
```

### Q8: 无权限时如何自定义展示？

**A**: 使用 `noPermission`：

> **说明**：`render` 属性必须为 `this.props.render`，确保列表组件正常渲染。

```tsx
import React from 'react'
import { NeoEntityGrid } from 'neo-ui-component-web'

export class AccountGridNoPermissionExample extends React.Component<{ render: any }> {
  render() {
    return (
      <NeoEntityGrid
        render={this.props.render}
        name="accountList"
        objectApiKey="account"
        pattern="entityView"
        noPermission={() => <div>您没有权限查看此列表</div>}
      />
    )
  }
}
```
