import { AppEventT } from '@/common/types/events';

export class ApiShape {
  public static isResOk(status: number): boolean {
    // eslint-disable-next-line no-magic-numbers
    return status >= 200 && status < 300;
  }

  public static emojiByStatus(status: number): string {
    return this.isResOk(status) ? '✅' : '❌';
  }
  public static appEventByStatus(status: number): AppEventT {
    return this.isResOk(status) ? 'OK' : 'ERR';
  }
}
