export interface MailAttachment {
  cid?: string;
  content: string | Buffer;
  contentType?: string;
  encoding?: string;
  filename: string;
  path?: string;
}

export interface MailAddress {
  address: string;
  name?: string;
}

export interface MailOptions {
  attachments?: MailAttachment[];
  bcc?: string | string[] | MailAddress | MailAddress[];
  cc?: string | string[] | MailAddress | MailAddress[];
  from?: string | MailAddress;
  headers?: Record<string, string>;
  html?: string;
  priority?: 'high' | 'normal' | 'low';
  replyTo?: string | MailAddress;
  subject: string;
  text?: string;
  to: string | string[] | MailAddress | MailAddress[];
}

export interface MailResponse {
  envelope?: {
    from: string;
    to: string[];
  };
  error?: string;
  messageId?: string;
  response?: string;
  success: boolean;
}

export interface AliyunSMTPConfig {
  auth: {
    pass: string;
    user: string;
  };
  host: string;
  port: number;
  secure?: boolean;
}

export interface AliyunAPIConfig {
  accessKeyId: string;
  accessKeySecret: string;
  endpoint?: string;
  region?: string;
}

export interface AliyunMailConfig {
  api?: AliyunAPIConfig;
  defaultFrom?: string | MailAddress;
  smtp?: AliyunSMTPConfig;
}

export interface MailTemplate {
  htmlContent: string;
  id: string;
  name: string;
  subject: string;
  textContent?: string;
  variables?: Record<string, string | number | boolean>;
}

export interface BatchMailOptions {
  from?: string | MailAddress;
  recipients: Array<{
    to: string | MailAddress;
    variables?: Record<string, string | number | boolean>;
  }>;
  template: MailTemplate;
}

export interface MailServiceStatus {
  connected: boolean;
  error?: string;
  lastChecked: Date;
}

export type MailServiceProvider = 'aliyun' | 'smtp' | 'sendgrid' | 'other';

export interface MailServiceConfig {
  config: AliyunMailConfig;
  enabled: boolean;
  provider: MailServiceProvider;
}

// API 请求和响应类型
export interface SendSingleMailRequest {
  attachments?: MailAttachment[];
  from?: string | MailAddress;
  html?: string;
  subject: string;
  text?: string;
  to: string | string[] | MailAddress | MailAddress[];
}

export interface SendBatchMailRequest {
  from?: string | MailAddress;
  recipients: Array<{
    to: string | MailAddress;
    variables?: Record<string, string | number | boolean>;
  }>;
  template: MailTemplate;
}

export interface SendNotificationRequest {
  data?: Record<string, string | number | boolean>;
  to: string | string[];
  type: 'welcome' | 'password_reset' | 'account_verification' | 'system_alert';
}

export interface TestMailRequest {
  content?: string;
  data?: Record<string, string | number | boolean>;
  notificationType?: 'welcome' | 'password_reset' | 'account_verification' | 'system_alert';
  subject?: string;
  to: string;
  type?: 'test' | 'system';
}

export interface MailApiResponse<T = unknown> {
  data?: T;
  error?: string;
  success: boolean;
}

// 业务邮件请求类型
export interface SendLoginGuideRequest {
  email: string;
  employeeId: string;
  employeeName?: string;
}

export interface SendEmployeePasswordResetRequest {
  email?: string;
  employeeId: string;
}

// 业务邮件响应类型
export interface NotificationResponse {
  message: string;
  success: boolean;
  timestamp: string;
}
