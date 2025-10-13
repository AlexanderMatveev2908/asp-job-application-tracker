import { CmnShadowConfT } from '@/common/components/shapes/shadow/types';

interface MetaInfo {
  isPending: boolean;
  isDisabled: boolean;
}

export interface BtnShadowConfT extends CmnShadowConfT {
  meta: MetaInfo;
}
