import { envVars } from '@/environments/environment';

export class RefreshMdwConst {
  public static readonly KEY_MSG_ERR: string[] = ['jwt_not_provided', 'jwt_invalid', 'jwt_expired'];

  public static readonly ENDPOINT_REFRESH: string = '/auth/refresh';

  public static readonly FULL_URL: string = `${
    envVars.mode === 'production' ? envVars.backURL : ''
  }${this.ENDPOINT_REFRESH}`;
}
