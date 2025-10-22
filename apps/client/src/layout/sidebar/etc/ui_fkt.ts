import { SpanPropsT } from '@/common/components/els/span/etc/types';
import { SvgStrokeUserCheck } from '@/common/components/svgs/stroke/user_check/user-check';
import { SvgStrokeUserQuest } from '@/common/components/svgs/stroke/user_quest/user-quest';

export const spanUserNotLogged: SpanPropsT = {
  label: 'User',
  Svg: SvgStrokeUserQuest,
};

export const spanUserLogged: SpanPropsT = {
  label: 'Account',
  Svg: SvgStrokeUserCheck,
};
