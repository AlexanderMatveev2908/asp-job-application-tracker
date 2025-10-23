import { Directive, OnInit } from '@angular/core';
import { UseAppUserDir } from './etc/1.use_app_user';

@Directive()
export abstract class UseAppDir extends UseAppUserDir implements OnInit {
  ngOnInit(): void {
    this.usePlatform.onClient(() => {
      this.markUserLogged();
    });

    this.useEffect(() => {
      this.fetchUser();
    });

    this.useEffect(() => {
      this.resetLoggingInTmr();
    });

    this.useEffect(() => {
      this.resetLoggingOutTmr();
    });
  }
}
