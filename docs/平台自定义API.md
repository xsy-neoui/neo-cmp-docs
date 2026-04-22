# 平台自定义 API

平台自定义 API（`customApi`）用于封装自定义业务逻辑，支持以 API 接口的形式开放给自定义组件使用。例如：

- 将 ERP 系统数据同步至 CRM 系统时，可将多个对象的数据同时推送至销售易自定义 API。在自定义 API 中，根据业务规则对数据进行拆分，并分别存储到相应对象中。
- 根据业务需求，在自定义 API 中实现复杂的查询逻辑，并将查询结果返回给 API 调用方。

如何开发平台自定义 API 见[《自定义 API 开发手册》](https://doc.xiaoshouyi.com/?sso-domain=login-cd.xiaoshouyi.com#/proMan/workplaceDetail?url=%2F%2Fconcepts%2FdevelopmentPlatform_businessLogicDevelopment_customApi.html&id=1558&dir=output_1776334087332&time=1776751244974&proId=1097&checkStat=undefined)。

## 使用平台自定义 API

在自定义组件中，可通过 **Neo OpenAPI SDK**（`neo-open-api`）使用平台自定义 API。

### 调用自定义 API（`customApi.run`）

```typescript
import { customApi } from 'neo-open-api';

const result = await customApi.run({
  apiUrl: '/rest/custom/api/endpoint', // 自定义 API 路径
  methodType: 'POST', // GET、POST、PUT、DELETE 等，可选，默认 POST
  data: {
    key1: 'value1',
    key2: 'value2'
  }
});
```

**参数说明**

- `apiUrl`：自定义 API 地址（必填）  
- `methodType` 或 `method`：HTTP 方法，默认 `POST`  
- `data`：请求体，通常会包装在 `data` 字段中发送  

**返回结构**

```typescript
{
  status: boolean;
  code: number | string;
  msg: string;
  data: any;
}
```

**示例：执行自定义 API**

```typescript
import { customApi } from 'neo-open-api';

const result = await customApi.run({
  apiUrl: '/rest/custom/api/processData',
  methodType: 'POST',
  data: {
    param1: 'value1',
    param2: 'value2'
  }
});
```


### 获取自定义 API 列表（`customApi.getList`）

```typescript
import { customApi } from 'neo-open-api';

const result = await customApi.getList({
  pageNo: 1,     // 可选
  pageSize: 1000 // 可选
});
```

**参数说明**

- `pageNo`：页码，默认 `1`  
- `pageSize`：每页条数，默认 `1000`  

**返回结构**

```typescript
{
  status: boolean;
  code: number | string;
  msg: string;
  totalSize: number;
  data: any[];
}
```


## 使用外部 API（第三方）

对于外部数据接口（API），在自定义组件中可通过以下两种方式使用：

### 方式一：直接请求外部 API

对于支持 CORS 跨域的外部 API，可使用 `neo-open-api` 中的 `request` 直接发起请求。

`request` 基于 axios 封装，可用于自行发起接口请求（支持 GET、POST、PATCH、DELETE 等），使用方式如下：

```typescript
import { request } from 'neo-open-api';

const result = await request({
  url: 'https://third-party.example.com/api/v1/query',
  method: 'GET',
  headers: { 'Custom-Header': 'value' },
  data: {
    q: 'keyword',
    page: 1
  },
  timeout: 30000
});
```

**参数说明**

- `url`：请求路径  
- `method`：HTTP 方法，默认 `GET`  
- `data`：请求数据；GET 时会转为 `params`  
- `headers`：请求头；默认包含 `Content-Type: application/json`  
- `timeout`：超时（毫秒），默认 `30000`  

**白名单路径（拦截器限制）**

仅允许访问以下类型的接口路径（示例前缀，以实际环境为准）：

- 自定义 API：`/rest/data/v2.0/scripts`  
- 自定义 API 列表：`/rest/metadata/v2.0/dx/logic/extpoints/openapi`  
- 实体 Open API：`/rest/data/v2.0/xobjects`  
- 实体列表（元数据过滤）：`/rest/metadata/v2.0/xobjects/filter`  
- 通用查询：`/rest/data/v2/query`  
- BI：`/rest/neobi/v2.0`  
- AI Agent：`/rest/ai/v2.0/agent`  

### 方式二：使用通用代理对接外部 API

对于暂不支持 CORS 跨域的外部 API，可在平台侧部署「通用代理」自定义 API，由服务端转发请求到第三方地址，前端仍通过 `customApi.run` 调用。

#### 资源下载

通用代理以代码包形式提供（ZIP）。

- **点击下载**：[proxy.zip](/proxy.zip)。

包内主要包含：

| 路径 | 说明 |
|------|------|
| `other/xsy/proxy/api/ProxyApi.java` | 自定义 API：`@RestApi(baseUrl = "/proxy")`，转发入口为 `POST /proxy/forward` |
| `other/xsy/proxy/utils/Result.java` | 统一错误封装（如 URL 为空、转发异常时返回） |

部署成功后，在管理端看到的**自定义 API 完整路径**（`apiUrl`）以前台配置为准，需与 `@RestMapping` 实际路由一致；下文中 `/proxy/forward` 表示相对业务逻辑服务的路径片段，实际调用时通常带有平台统一前缀（以环境为准）。

#### 添加通用代理

**步骤 1**

在 admin 管理端，打开 **开发 / 业务逻辑代码**，切换到 **代码包** 面板，点击「新建代码包」，按界面提示填写，例如：

- **代码名称**：通用代理接口  
- **Package**：`other.xsy.proxy`（须与 ZIP 内 Java 包名一致）  
- **代码描述**：用于代理转发第三方 API  

**步骤 2**

将 **[forward.zip](/forward.zip)** 上传到刚创建的代码包并完成发布（具体以管理端「上传 / 发布」流程为准）。

#### 使用「通用代理」请求「外部 API」

前端通过 `customApi.run` 调用通用代理；**外层**固定为 `POST`，**内层** `data` 中携带真正要访问的第三方 URL、HTTP 方法与参数。

```typescript
import { customApi } from 'neo-open-api';

const result = await customApi.run({
  apiUrl: '/rest/data/v2.0/scripts/api/proxy/forward', // 通用代理的 自定义API 地址
  methodType: 'POST', // 固定的请求方式
  data: {
    url: 'https://third-party.example.com/api/v1/query',
    method: 'GET',
    data: {
      q: 'keyword',
      page: 1
    }
  }
});
```

**外层：`customApi.run` 参数**

| 参数 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `apiUrl` | `string` | 是 | 通用代理在平台上的自定义 API 路径（示例为 `/rest/data/v2.0/scripts/api/proxy/forward`，以发布后的路由为准） |
| `methodType` / `method` | `string` | 否 | 调用**平台自定义 API** 的 HTTP 方法；使用本通用代理时固定为 `POST` |
| `data` | `object` | 否 | 传给通用代理 Java 方法的 JSON，见下表 |

**内层：`data` 中传给外部API的请求参数**

| 字段 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `url` | `string` | 是 | 第三方接口的完整地址（含协议与路径）。为空时服务端返回错误码 `5000001`，提示「转发 URL(url) 不能为空」 |
| `method` | `string` | 否 | 转发到第三方时使用的 HTTP 方法，如 `GET`、`POST`、`PUT`、`PATCH`、`DELETE` 等。不传或为空时**默认 `POST`**（会先转大写并 trim） |
| `data` | `object` | 否 | 转发到第三方时的**业务参数**。未传时按空对象 `{}` 处理 |

**内层 `data` 在不同 HTTP 方法下的行为**

- **`GET`**：将 `data` 中各键值对序列化为 URL **查询参数**并追加到 `url` 上（已有 `?` 则用 `&` 拼接）。值为 `null` 的项不会参与拼接。  
- **`POST` / `PUT` / `PATCH` 等非 GET**：将 `data` 序列化为 **JSON 字符串**作为请求体，并设置请求头 `Content-Type: application/json`。

**返回说明**

- **成功**：返回第三方接口的响应体；若响应体可解析为 JSON，则返回解析后的对象，否则返回原始字符串。  
- **失败**：例如 `url` 为空、转发过程异常等，由 `Result.resultFailWrapper` 封装，例如错误码 `5000001`、`5000002` 及对应错误信息（以实际返回为准）。

**示例：使用通用代理请求第三方接口**

```typescript
const result = await customApi.run({
  apiUrl: '/rest/data/v2.0/scripts/api/proxy/forward',
  methodType: 'POST',
  data: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    method: 'POST',
    data: {
      name: 'demo',
      amount: 100
    }
  }
});
```
