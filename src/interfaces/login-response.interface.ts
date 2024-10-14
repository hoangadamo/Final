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

export interface IStoreLoginResponse {
  accessToken: string;
  expires: number;
  refreshToken: string;
  store: {
    id: number;
    name: string;
    email: string;
    otp: string;
    otpExpireTime: number;
  };
}
