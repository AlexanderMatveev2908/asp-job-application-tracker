import { SpanLinkPropsT } from '@/common/components/els/span/etc/types';
import { SvgFillLogin } from '@/common/components/svgs/fill/login/login';
import { SvgFillVerify } from '@/common/components/svgs/fill/verify/verify';
import { SvgStrokePassword } from '@/common/components/svgs/stroke/password/password';
import { SvgStrokeUserWrite } from '@/common/components/svgs/stroke/user_write/user-write';
import { Nullable } from '@/common/types/etc';
import { RootUiFkt } from '@/core/ui_fkt/root_ui';

export class AuthSpanLinksUiFkt extends RootUiFkt {
  private static readonly registerPage: SpanLinkPropsT[] = this.arrWithIdAndEvent(
    [
      {
        label: "Already have an'account? Login",
        path: '/auth/login',
        Svg: SvgFillLogin,
      },
      {
        label: 'Forgot password ? Recover account',
        Svg: SvgStrokePassword,
        path: '/auth/require-email/recover-pwd',
      },
    ],
    'INFO'
  );

  private static readonly loginPage: SpanLinkPropsT[] = this.arrWithIdAndEvent(
    [
      {
        label: 'Do not have an account ? Register',
        path: '/auth/register',
        Svg: SvgStrokeUserWrite,
      },
      {
        label: 'Confirmation email not arrived ? Send another',
        path: '/auth/require-email/confirm-email',
        Svg: SvgFillVerify,
      },
    ],
    'INFO'
  );

  private static readonly map: Map<string, SpanLinkPropsT[]> = new Map<string, SpanLinkPropsT[]>([
    ['/auth/register', this.registerPage],
    ['/auth/login', this.loginPage],
  ]);

  public static byPath(path: Nullable<string>): Nullable<SpanLinkPropsT[]> {
    return this.map.get(path ?? '') ?? null;
  }
}
