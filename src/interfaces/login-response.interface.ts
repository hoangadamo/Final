export interface ILoginResponse {
  accessToken: string;
  expires: number;
  refreshToken: string;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    isAdmin: boolean;
    otp: string;
    otpExpireTime: number;
    rankId: number;
  };
}
