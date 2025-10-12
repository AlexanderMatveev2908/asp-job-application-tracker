import { Injectable } from '@angular/core';
import { RootUiSvc } from './root_ui';
import { LinkT } from '../../common/types/links';
import { SvgStrokeHome } from '../../common/components/svgs/stroke/home/home';
import { SvgFillBriefcase } from '../../common/components/svgs/fill/briefcase/briefcase';
import { ShapeCheck } from '../lib/data_structure/shape';

@Injectable({
  providedIn: 'root',
})
export class LinksSvc extends RootUiSvc {
  private readonly allUsers: Partial<LinkT>[] = [
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

  public get allUsersLinks(): LinkT[] {
    return this.arrWithIDs(this.allUsers) as LinkT[];
  }

  private static cutPath(arg: string): string {
    return arg.split('?')[0].replace(/\/+$/, '');
  }

  public static isCurrPath(currPath: string | null, lkPath: string): boolean {
    if (!ShapeCheck.isStr(currPath)) return false;

    const currCut = LinksSvc.cutPath(currPath!);
    const lkCut = LinksSvc.cutPath(lkPath);

    return currCut === lkCut;
  }
}
