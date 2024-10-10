export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  isAdmin: boolean;
  otp: number;
  otpExpireTime: number;
  rankId: number;
}
