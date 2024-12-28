import { fetchRequest } from '../utils/fetchRequest';
import { API_BASE_URL } from './const';

export type TSignupData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

type TSignupResponse = {
  id: number;
};

export type TSigninData = {
  login: string;
  password: string;
};

export type TUserInfoResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

class AuthApi {
  private request: typeof fetchRequest;
  private baseUrl: string;

  constructor(instanceHttpTransport: typeof fetchRequest) {
    this.request = instanceHttpTransport;
    this.baseUrl = API_BASE_URL;
  }

  public signup = async (data: TSignupData) => {
    return await this.request.post<TSignupResponse>(`${this.baseUrl}/auth/signup`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  };

  public signin = async (data: TSigninData) => {
    return await this.request.post(`${this.baseUrl}/auth/signin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  };

  public getCurrentUser = async () => {
    return this.request.get<TUserInfoResponse>(`${this.baseUrl}/auth/user`);
  };

  public logout = async () => {
    return await this.request.post(`${this.baseUrl}/auth/logout`);
  };
}

export const authApi = new AuthApi(fetchRequest);
