import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';
import { JobApplicationsWrapper } from '../features/job_applications/components/job_applications_wrapper/job-applications-wrapper';
import { JobApplicationsPost } from '../pages/job_applications/job_applications_post/job-applications-post';
import { JobApplicationsGetOne } from '../pages/job_applications/job_applications_get_one/job-applications-get-one';
import { JobApplicationsReadAll } from '../pages/job_applications/job_applications_read_all/job-applications-read-all';
import { JobApplicationsPut } from '../pages/job_applications/job_applications_put/job-applications-put';
import { NotFound } from '../pages/not_found/not-found';

export const routes: Routes = [
  {
    path: '',
    component: Home,
  },
  {
    path: 'job-applications',
    component: JobApplicationsWrapper,
    children: [
      {
        path: 'post',
        component: JobApplicationsPost,
      },
      {
        path: ':applicationID',
        component: JobApplicationsGetOne,
      },
      {
        path: 'put/:applicationID',
        component: JobApplicationsPut,
      },
      {
        path: '',
        component: JobApplicationsReadAll,
      },
    ],
  },
  {
    path: '**',
    component: NotFound,
  },
];
