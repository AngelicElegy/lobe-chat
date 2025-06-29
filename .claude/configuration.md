# 项目配置指南

## 环境变量配置

### 基础配置
- `DATABASE_URL` - 数据库连接字符串
- `NEXTAUTH_SECRET` - NextAuth 密钥
- `APP_URL` - 应用访问地址
- `ACCESS_CODE` - 访问控制码

### AI 提供商配置
- AI 提供商 API 密钥（根据使用的提供商配置相应的环境变量）

## 邮件服务配置

支持阿里云邮件推送服务（DirectMail），提供 SMTP 和 API 两种集成方式：

### SMTP 方式配置（推荐）
- `ALIYUN_MAIL_SMTP_HOST` - SMTP 服务器地址（默认：smtpdm.aliyun.com）
- `ALIYUN_MAIL_SMTP_PORT` - SMTP 端口（默认：25）
- `ALIYUN_MAIL_SMTP_SECURE` - 是否使用 SSL/TLS（默认：false）
- `ALIYUN_MAIL_SMTP_USER` - SMTP 用户名（发信邮箱）
- `ALIYUN_MAIL_SMTP_PASS` - SMTP 密码

### API 方式配置（可选）
- `ALIYUN_ACCESS_KEY_ID` - 阿里云 Access Key ID
- `ALIYUN_ACCESS_KEY_SECRET` - 阿里云 Access Key Secret
- `ALIYUN_MAIL_ENDPOINT` - API 端点（默认：https://dm.aliyuncs.com）

### 其他配置
- `ALIYUN_MAIL_DEFAULT_FROM` - 默认发信邮箱
- `APP_NAME` - 应用名称（用于邮件模板）

## 数据库配置

### 配置文件
- 主配置文件：`drizzle.config.ts`
- 数据库迁移文件位于：`src/database/migrations/`
- 数据库模式定义：`src/database/schemas/`

### 环境支持
- **生产环境**: PostgreSQL
- **开发/测试环境**: PGLite
- **桌面环境**: PGLite

### 迁移管理
- 使用 Drizzle ORM 进行数据库版本控制
- 支持向前/向后迁移
- 自动生成迁移文件和类型定义