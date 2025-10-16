import { Routes } from '@angular/router';

import { GetJobApplication } from '@/pages/job_applications/get/get-job-application';
import { PostJobApplications } from '@/pages/job_applications/post/post-job-applications';
import { PutJobApplications } from '@/pages/job_applications/put/put-job-applications';
import { ReadAllJobApplications } from '@/pages/job_applications/read_all/read-all-job-applications';
import { Home } from '@/pages/home/home';
import { NotFound } from '@/pages/not_found/not-found';
import { Notice } from '@/pages/notice/notice';
import { LayoutJobApplications } from '@/pages/job_applications/layout/layout-job-applications';
import { LayoutAuth } from '@/pages/auth/layout/layout-auth';
import { Register } from '@/pages/auth/register/register';
import { Login } from '@/pages/auth/login/login';
import { RecoverPwd } from '@/pages/auth/recover_pwd/recover-pwd';
import { Login2fa } from '@/pages/auth/login_2fa/login-2fa';
import { RecoverPwd2fa } from '@/pages/auth/recover_pwd_2fa/recover-pwd-2fa';
import { AuthReqMailConfMail } from '@/pages/auth/req_mail/conf_mail/auth-req-mail-conf-mail';
import { AuthReqMailRecoverPwd } from '@/pages/auth/req_mail/recover_pwd/auth-req-mail-recover-pwd';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'notice',
    component: Notice,
  },
  {
    path: 'auth',
    component: LayoutAuth,
    children: [
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'recover-pwd',
        component: RecoverPwd,
      },
      {
        path: 'login-2fa',
        component: Login2fa,
      },
      {
        path: 'recover-pwd-2fa',
        component: RecoverPwd2fa,
      },
      {
        path: 'require-email',
        children: [
          {
            path: 'confirm-email',
            component: AuthReqMailConfMail,
          },
          {
            path: 'recover-pwd',
            component: AuthReqMailRecoverPwd,
          },
        ],
      },
    ],
  },
  {
    path: 'job-applications',
    component: LayoutJobApplications,
    children: [
      {
        path: 'post',
        component: PostJobApplications,
      },
      {
        path: ':applicationID',
        component: GetJobApplication,
      },
      {
        path: 'put/:applicationID',
        component: PutJobApplications,
      },
      {
        path: '',
        component: ReadAllJobApplications,
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
