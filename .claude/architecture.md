# 项目架构设计

## 目录结构

```
src/
├── app/                    # Next.js App Router 路由
│   ├── (backend)/         # 后端API接口
│   │   └── trpc/          # tRPC API路由
│   ├── (main)/            # 主应用页面
│   │   ├── chat/          # 聊天/对话功能
│   │   ├── customer/      # 客户管理
│   │   └── employee/      # 员工管理
│   ├── api/               # Next.js API 路由
│   └── mock/              # Mock 数据
├── components/            # 通用组件
├── config/                # 配置文件
│   ├── aiModels/          # AI 模型配置
│   └── modelProviders/    # AI 提供商配置
├── database/              # 数据库层
│   ├── schemas/           # Drizzle 数据库模式定义
│   ├── models/           # 数据模型业务逻辑
│   ├── migrations/       # 数据库迁移文件
│   ├── repositories/     # 数据仓库模式
│   └── server/           # 服务端数据库适配器
├── features/              # 功能模块
├── hooks/                 # 自定义 Hooks
├── libs/                  # 核心库
│   ├── model-runtime/     # AI 模型运行时
│   ├── trpc/             # tRPC 配置和中间件
│   ├── aliyun-mail.ts     # 阿里云邮件推送服务
│   └── clerk-backend.ts   # Clerk 后端集成
├── server/                # 服务端逻辑
│   └── routers/          # API 路由定义
│       ├── lambda/       # Lambda 函数路由
│       ├── edge/         # Edge Runtime 路由
│       ├── desktop/      # 桌面端专用路由
│       └── tools/        # 工具类路由
├── store/                 # Zustand 状态管理
│   ├── global/           # 全局状态
│   ├── chat/             # 聊天状态
│   ├── session/          # 会话状态
│   ├── user/             # 用户状态
│   ├── agent/            # AI 智能体状态
│   └── middleware/       # 状态中间件
├── types/                 # TypeScript 类型定义
└── utils/                 # 工具函数
```

## API 架构

### 1. Services API 集成
**位置**: `/src/services/`
- 提供标准化的 API 接口
- 包含用户、角色、智能体、会话、话题、消息、邮件等模块
- 支持完整的 TypeScript 类型定义
- 邮件服务支持单发、批量发送和系统通知

### 2. 多 AI 提供商支持
**位置**: `/src/libs/model-runtime/`
- 支持 OpenAI、Anthropic、Google、Azure 等多家提供商
- 统一的模型运行时接口
- 自动错误处理和重试机制

## 认证架构

支持多种认证方式：
- **NextAuth.js** (OAuth, JWT)
- **Clerk** (第三方认证服务)
- **OIDC Provider** (自建 OIDC 服务)
- **ACCESS_CODE** 访问控制

## 双模式架构

### Client 模式
- 直接操作本地数据库（PGLite）
- 适用于桌面端和开发环境
- 数据存储在客户端本地

### Server 模式  
- 通过 tRPC 调用服务端 API
- 适用于 Web 端和生产环境
- 数据存储在远程服务器

### 架构适配
- 服务层需要同时支持两种模式
- 自动根据环境选择合适的模式
- 统一的接口抽象，业务逻辑无感知

## 特殊注意事项

1. **多语言支持**: 项目使用中文作为主要界面语言
2. **AI 集成**: 支持多种 AI 模型和提供商
3. **权限管理**: 具有完整的 RBAC 权限管理系统
4. **实时功能**: 支持实时聊天和消息翻译功能
5. **渲染模式**: 使用服务器端渲染 (SSR) 和客户端状态管理相结合的架构