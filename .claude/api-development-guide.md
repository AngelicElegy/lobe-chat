# API开发标准化指南

## 概述

本文档定义了项目中API开发的标准化流程，涵盖从tRPC路由到数据库模型的完整后端服务开发链路。适用于新增API接口、数据模型和服务层的开发。

## 技术栈架构

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **数据库**: Drizzle ORM + PostgreSQL/PGLite
- **状态管理**: Zustand
- **API**: tRPC (类型安全的API层)
- **认证**: NextAuth.js + Clerk + OIDC

## 完整开发链路

### 1. 后端 API 层 (Server Routers)

**位置**: `src/server/routers/lambda/`

```
src/server/routers/lambda/
├── [module].ts              # 模块路由定义
└── index.ts                 # 导出新路由到 lambdaRouter
```

**职责**:

- 定义 tRPC 路由和中间件
- 输入验证（Zod Schema）
- 权限控制和认证
- 调用 Model 层处理业务逻辑

**规范**:

- 每个模块对应一个路由文件
- 使用 `authedProcedure` 进行权限验证
- 输入验证必须使用 Zod Schema
- 错误处理遵循 tRPC 规范

### 2. 数据库模型层 (Database Models)

**位置**: `src/database/models/`

```
src/database/models/
├── [entity].ts              # 实体模型类
└── __tests__/
    └── [entity].test.ts      # 模型测试
```

**职责**:

- 封装数据库 CRUD 操作
- 实现业务逻辑和数据验证
- 处理复杂查询和事务
- 数据关联和聚合操作

**规范**:

- 继承数据库连接和用户上下文
- 所有方法都应该是 async
- 错误处理使用 TRPCError
- 支持分页、排序、筛选

### 3. 服务层 (Services)

**位置**: `src/services/[module]/`

```
src/services/[module]/
├── client.ts                # 客户端服务实现 (PGLite/ClientDB)
├── server.ts                # 服务端服务实现 (tRPC调用)
├── index.ts                 # 服务导出和环境选择逻辑
├── type.ts                  # 服务接口类型定义
└── __tests__/               # 服务层测试
```

**职责**:

- 统一的服务接口抽象
- 客户端/服务端双模式支持
- 环境适配（Web/Desktop/Server）
- 数据转换和缓存策略

**规范**:

- 必须实现 interface 定义的所有方法
- 客户端服务直接调用 Model 层
- 服务端服务通过 tRPC client 调用
- 错误处理和重试机制

### 4. 类型定义层 (Types)

**位置**: `src/types/`

```
src/types/
└── [module].ts              # 模块类型定义
```

**职责**:

- 业务实体类型定义
- API 请求/响应类型
- 状态管理类型
- 通用枚举和常量

**规范**:

- 与数据库 Schema 保持一致
- 导出清晰的接口定义
- 使用 TypeScript 最佳实践
- 支持泛型和类型推导

### 5. 状态管理层 (Store)

**位置**: `src/store/[module]/`

```
src/store/[module]/
├── store.ts                 # Zustand store定义
├── initialState.ts          # 初始状态
├── selectors.ts             # 状态选择器
└── slices/                  # 功能切片
    ├── [feature]/
    │   ├── action.ts         # 异步操作
    │   ├── initialState.ts   # 切片初始状态
    │   └── selectors.ts      # 切片选择器
    └── index.ts
```

**职责**:

- 客户端状态管理
- 异步操作和错误处理
- 数据缓存和同步
- 组件间状态共享

**规范**:

- 使用 `createWithEqualityFn` 和 `shallow` 优化性能
- 异步操作使用 Action 模式
- 状态更新遵循不可变性
- 开发环境启用 DevTools

### 6. 工具函数层 (Utils)

**位置**:

- `src/utils/[module].ts` - 通用工具函数
- `src/server/utils/[module].ts` - 服务端专用工具

```
src/utils/
└── [module]Utils.ts         # 模块相关工具函数

src/server/utils/
└── [module]Helpers.ts       # 服务端工具函数
```

**职责**:

- 通用业务逻辑提取
- 数据格式转换
- 验证和校验函数
- 常量和配置管理

### 7. 中间件层 (Middleware)

**位置**: `src/libs/trpc/lambda/middleware/`

```
src/libs/trpc/lambda/middleware/
└── [module]Auth.ts          # 权限校验中间件
```

**职责**:

- 权限验证和访问控制
- 数据库连接管理
- 请求日志和监控
- 错误处理和转换

### 8. 前端Hook层 (可选)

**位置**: `src/hooks/`

```
src/hooks/
├── use[Module]Management.ts  # 管理类Hook
└── use[Module]Permissions.ts # 权限检查Hook
```

**职责**:

- 封装复杂的状态逻辑
- 提供便捷的数据操作接口
- 处理组件间的状态同步
- 优化渲染性能

## 开发顺序建议

### 阶段一：数据基础层

1. **Types** - 类型定义 (`src/types/`)
2. **Database Models** - 数据库操作 (`src/database/models/`)

### 阶段二：API服务层

3. **Server Routers** - API接口 (`src/server/routers/lambda/`)
4. **Services** - 服务封装 (`src/services/`)

### 阶段三：前端状态层

5. **Store** - 状态管理 (`src/store/`)
6. **Utils & Middleware** - 工具和中间件

### 阶段四：优化增强层

7. **Hooks** - 前端使用Hook (`src/hooks/`)

## 关键规范要点

### tRPC路由规范

```typescript
// 路由定义模板
export const [module]Router = router({
  // Query操作 - 数据查询
  get[Entity]: authedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => { /* 实现 */ }),

  // Mutation操作 - 数据变更
  create[Entity]: authedProcedure
    .input(createEntitySchema)
    .mutation(async ({ input, ctx }) => { /* 实现 */ }),
});
```

### 服务层规范

```typescript
// 服务接口定义
export interface I[Module]Service {
  create[Entity](data: Create[Entity]Input): Promise<string>;
  get[Entity](id: string): Promise<[Entity]Item>;
  // ... 其他方法
}

// 服务实现选择
export const [module]Service =
  process.env.NEXT_PUBLIC_SERVICE_MODE === 'server' || isDesktop
    ? new ServerService()
    : new ClientService();
```

### 状态管理规范

```typescript
// Store定义模板
export interface [Module]Store extends [Module]State, [Module]Action {}

const createStore: StateCreator<[Module]Store> = (...params) => ({
  ...initialState,
  ...[module]Slice(...params),
});

export const use[Module]Store = createWithEqualityFn<[Module]Store>()(
  subscribeWithSelector(devtools(createStore)),
  shallow,
);
```

## 特殊注意事项

### 双模式架构

- **Client模式**: 直接操作本地数据库（PGLite）
- **Server模式**: 通过tRPC调用服务端API
- 服务层需要同时支持两种模式

### 权限控制

- 所有敏感操作必须使用权限中间件
- 权限检查在路由层和中间件层进行
- 前端也需要实现权限显示控制

### 错误处理

- 使用 TRPCError 进行标准化错误处理
- 前端状态需要包含 loading 和 error 状态
- 提供用户友好的错误提示

## 文件命名规范

- **路由文件**: `camelCase.ts` (如: `userRole.ts`)
- **模型文件**: `PascalCase.ts` (如: `UserRole.ts`)
- **服务目录**: `camelCase/` (如: `userRole/`)
- **类型文件**: `camelCase.ts` (如: `userRole.ts`)
- **Hook文件**: `use + PascalCase.ts` (如: `useUserRole.ts`)

## 示例模板

参考现有模块实现：

- `src/services/session/` - 标准服务层实现
- `src/store/chat/` - 完整状态管理实现
- `src/server/routers/lambda/session.ts` - 路由层实现
- `src/database/models/session.ts` - 模型层实现

---

_本文档将随着项目架构演进持续更新_
