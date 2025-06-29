# 项目概述

## 基本信息

这是一个基于 Next.js 构建的保险客户管理系统，采用 TypeScript 开发，使用现代化的技术栈构建智能对话和客户管理功能。

## 开发命令

### 基本开发命令
- `npm run dev` - 启动开发服务器 (http://localhost:3000)
- `npm run build` - 构建生产版本
- `npm run start` - 启动生产服务器
- `npm run lint` - 运行代码检查

### 包管理器
项目同时支持多个包管理器，推荐使用 pnpm：
- 使用 `pnpm install` 安装依赖
- 也支持 npm、yarn、bun

### 数据库相关
- 使用 Drizzle ORM 管理数据库
- 配置文件：`drizzle.config.ts`
- 数据库迁移文件位于：`src/database/migrations/`
- 数据库模式定义：`src/database/schemas/`
- 支持 PostgreSQL (生产) 和 PGLite (开发/测试)

## 技术栈

- **框架**: Next.js 15 (App Router)
- **语言**: TypeScript
- **UI 库**: Ant Design + @lobehub/ui
- **样式**: Tailwind CSS + Antd Style
- **状态管理**: Zustand (多个独立 store)
- **数据库**: Drizzle ORM + PostgreSQL/PGLite
- **认证**: NextAuth.js + Clerk (支持 OIDC)
- **HTTP 客户端**: Axios (带自动 token 刷新)