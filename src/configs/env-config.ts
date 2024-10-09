import * as dotenv from 'dotenv';
dotenv.config();

export const application = {
  environment: process.env.ENVIRONMENT || 'local',
  urlPrefix: process.env.URL_PREFIX || '/api',
  serverPort: +process.env.SERVER_PORT || 3000,
  baseUrl: process.env.BASE_URL || 'http://localhost:3000/',
};

export const token = {
  expireTime: process.env.ACCESS_TOKEN_EXPIRE_TIME || '30d',
  secretKey:
    process.env.ACCESS_TOKEN_SECRET_KEY ||
    '5239955f-4e01-4873-aca9-5183816ae4a9',

  rfExpireTime: process.env.REFRESH_TOKEN_EXPIRE_TIME || '90d',
  rfSecretKey:
    process.env.REFRESH_TOKEN_SECRET_KEY ||
    'f23e4ace-dd6b-419f-8e29-2419504e14c5',
};

export const postgresql = {
  host: process.env.POSTGRES_HOST || 'localhost',
  port: +process.env.POSTGRES_PORT || 5432,
  username: process.env.POSTGRES_USERNAME || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'root',
  database: process.env.POSTGRES_DATABASE || 'final-project',
};

export const emailSender = {
  secretKeySendGmail:
    process.env.SECRET_KEY_SEND_GMAIL || '57ec1978-ddad-48b6-8db7-88123a8da5c2',
  otpTimeExpire: +process.env.OTP_TIME_EXPIRE || 300,
  email: process.env.ADMIN_EMAIL || 'viethoangb0410@gmail.com',
  password: process.env.ADMIN_PASSWORD_EMAIL || 'sjwu gefe aduj ecwh',
  name: process.env.ADMIN_EMAIL_NAME || 'hoang',
};
