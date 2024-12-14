import { fetchRequest } from '../utils/fetchRequest';
import { API_BASE_URL } from './const';

export type TChangePfofileInfoResponse = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
};

export type TChangePfofileInfoData = Omit<TChangePfofileInfoResponse, 'id' | 'avatar'>;

export type TChangeUserPasswordData = {
  oldPassword: string;
  newPassword: string;
};

class UserApi {
  private request: typeof fetchRequest;
  private baseUrl: string;

  constructor(instanceHttpTransport: typeof fetchRequest) {
    this.request = instanceHttpTransport;
    this.baseUrl = API_BASE_URL;
  }

  public changePfofileInfo = async (data: TChangePfofileInfoData) => {
    return await this.request.put<TChangePfofileInfoResponse>(`${this.baseUrl}/user/profile`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  };

  // public changePfofileAvatar = async (data: TChangePfofileInfoData) => {
  //   return await this.request.put<TChangePfofileInfoResponse>(`${this.baseUrl}/user/profile`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     data,
  //   });
  // };

  public changeUserPassword = async (data: TChangeUserPasswordData) => {
    return await this.request.put(`${this.baseUrl}/user/profile`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  };
}

export const userApi = new UserApi(fetchRequest);
