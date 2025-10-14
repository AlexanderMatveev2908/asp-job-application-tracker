import { Routes } from '@angular/router';

import { GetJobApplication } from '@/pages/job_applications/get/get-job-application';
import { PostJobApplications } from '@/pages/job_applications/post/post-job-applications';
import { PutJobApplications } from '@/pages/job_applications/put/put-job-applications';
import { ReadAllJobApplications } from '@/pages/job_applications/read_all/read-all-job-applications';
import { Home } from '@/pages/home/home';
import { NotFound } from '@/pages/not_found/not-found';
import { WrapPageJobApplications } from '@/features/job_applications/components/wrap_page/wrap-page-job-applications';
import { Notice } from '@/pages/notice/notice';

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
    path: 'job-applications',
    component: WrapPageJobApplications,
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
