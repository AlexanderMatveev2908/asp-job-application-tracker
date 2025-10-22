import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SpinBtn } from '@/common/components/spins/spin_btn/spin-btn';
import { UseWrapApiDir } from '@/core/directives/use_wrap_api';

@Component({
  selector: 'app-wrap-btn-api',
  imports: [SpinBtn],
  templateUrl: './wrap-btn-api.html',
  styleUrl: './wrap-btn-api.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WrapBtnApi extends UseWrapApiDir {}
