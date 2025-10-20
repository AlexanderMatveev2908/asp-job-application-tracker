import { RootUiFkt } from '../root_ui';
import { SvgStrokeHome } from '@/common/components/svgs/stroke/home/home';
import { SvgFillBriefcase } from '@/common/components/svgs/fill/briefcase/briefcase';
import { LinkT } from '@/core/ui_fkt/links/etc/types';
import { ShapeCheck } from '../../lib/data_structure/shape_check';
import { SvgStrokeRegister } from '@/common/components/svgs/stroke/register/register';
import { SvgStrokePassword } from '@/common/components/svgs/stroke/password/password';
import { SvgFillLogin } from '@/common/components/svgs/fill/login/login';
import { SvgFillVerify } from '@/common/components/svgs/fill/verify/verify';

export class LinksUiFkt extends RootUiFkt {
  private static readonly _allUsers: Partial<LinkT>[] = [
    {
      label: 'Home',
      path: '/',
      Svg: SvgStrokeHome,
    },
    {
      label: 'Job Applications',
      path: '/job-applications',
      Svg: SvgFillBriefcase,
    },
  ];

  private static readonly _notLogged: Partial<LinkT>[] = [
    {
      label: 'Register',
      path: '/auth/register',
      Svg: SvgStrokeRegister,
    },
    {
      label: 'Login',
      path: '/auth/login',
      Svg: SvgFillLogin,
    },
    {
      label: 'Recover Password',
      path: '/auth/recover-pwd',
      Svg: SvgStrokePassword,
    },
    {
      label: 'Verify account',
      path: '/auth/require-email/confirm-email',
      Svg: SvgFillVerify,
    },
  ];

  public static get allUsers(): LinkT[] {
    return this.arrWithIDs(this._allUsers) as LinkT[];
  }
  public static get notLogged(): LinkT[] {
    return this.arrWithIDs(this._notLogged) as LinkT[];
  }

  private static cutPath(arg: string): string {
    return arg.split('?')[0].replace(/\/+$/, '');
  }

  public static isCurrPath(currPath: string | null, lkPath: string): boolean {
    if (!ShapeCheck.isStr(currPath)) return false;

    const currCut = LinksUiFkt.cutPath(currPath!);
    const lkCut = LinksUiFkt.cutPath(lkPath);

    return currCut === lkCut;
  }
}
