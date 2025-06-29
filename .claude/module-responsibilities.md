# 核心模块职责规范

## Database 模块职责 (`/src/database/`)

### 架构设计
- **多环境适配**: 支持 PostgreSQL (生产环境) 和 PGLite (开发/桌面环境)
- **ORM框架**: 基于 Drizzle ORM 实现类型安全的数据库操作
- **模块化设计**: 采用 Schema + Model + Repository 三层架构

### 核心组件
1. **Schemas (`schemas/`)**
   - 数据库表结构定义，使用 Drizzle Schema DSL
   - 包含字段类型、约束、关系定义
   - 自动生成 TypeScript 类型定义

2. **Models (`models/`)**
   - 业务逻辑封装，提供 CRUD 操作的高级接口
   - 实现数据验证、业务规则、事务处理
   - 每个模型对应一个业务实体（User、Session、Message等）

3. **Migrations (`migrations/`)**
   - 数据库版本控制和结构变更管理
   - 支持向前/向后迁移
   - 包含数据迁移和结构迁移

4. **Repositories (`repositories/`)**
   - 数据访问层抽象，提供复杂查询和数据聚合
   - 实现数据导入/导出、表视图等高级功能

### 开发规范
- 所有数据库操作必须通过 Model 层进行
- 新增表结构需要先创建 Schema，再生成 Migration
- 复杂查询逻辑应封装在 Repository 中
- 支持客户端数据库和服务端数据库的统一接口

## Server/Routers 模块职责 (`/src/server/routers/`)

### 架构设计
- **基于 tRPC**: 提供端到端类型安全的 API 接口
- **多运行时支持**: Lambda、Edge、Desktop 三种运行环境
- **中间件系统**: 统一的认证、权限、数据库连接管理

### 路由分类
1. **Lambda 路由 (`lambda/`)**
   - 标准的服务端函数，适用于复杂业务逻辑
   - 支持数据库操作、文件处理、AI 调用等
   - 包含完整的 CRUD 操作和业务逻辑

2. **Edge 路由 (`edge/`)**
   - 边缘计算函数，适用于轻量级、高频访问的接口
   - 主要处理配置、上传、市场数据等

3. **Desktop 路由 (`desktop/`)**
   - 桌面端专用接口，处理本地数据库和系统集成
   - 支持 PGLite 数据库操作和桌面特性

### 开发规范
- 每个路由文件对应一个业务领域（agent、session、message等）
- 使用中间件进行认证和权限控制
- 输入验证使用 Zod Schema
- 错误处理遵循 tRPC 错误规范
- API 设计遵循 RESTful 原则，使用 tRPC 的 query/mutation 模式

## Store 状态管理模块职责 (`/src/store/`)

### 架构设计
- **基于 Zustand**: 轻量级、类型安全的状态管理
- **模块化分离**: 按业务领域划分独立的 Store
- **Slice 模式**: 每个功能使用独立的 Slice 进行管理

### Store 分类
1. **全局状态 (`global/`)**
   - 系统级状态：主题、语言、布局等
   - 客户端数据库状态和同步状态
   - 工作区面板状态

2. **聊天状态 (`chat/`)**
   - 消息列表、会话状态、AI 响应
   - 工具调用、插件状态、翻译功能
   - 主题管理、分享功能、TTS/STT

3. **会话状态 (`session/`)**
   - 会话列表、会话分组、会话元数据
   - 智能体配置、会话设置

4. **用户状态 (`user/`)**
   - 用户信息、认证状态、偏好设置
   - API 密钥管理、模型配置
   - 同步状态、导入导出

### 开发规范
- 每个 Store 必须包含：
  - `store.ts`: Store 定义和导出
  - `initialState.ts`: 初始状态定义
  - `selectors.ts`: 状态选择器
  - `slices/`: 功能切片目录
- 使用 `createWithEqualityFn` 和 `shallow` 优化渲染性能
- 异步操作使用 Action 模式，支持错误处理和加载状态
- 状态更新遵循不可变性原则
- 开发环境启用 DevTools 支持

## 状态管理架构总览

使用 Zustand 实现模块化状态管理：
- `store/global/` - 全局状态
- `store/chat/` - 聊天相关状态
- `store/user/` - 用户相关状态
- `store/session/` - 会话管理状态
- `store/agent/` - AI 智能体状态

每个 store 包含：
- `store.ts` - store 主文件
- `initialState.ts` - 初始状态
- `selectors.ts` - 状态选择器
- `slices/` - 功能切片