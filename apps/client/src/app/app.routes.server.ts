import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'job-applications/*',
    renderMode: RenderMode.Server,
  },
  {
    path: 'job-applications/(post|put)/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'user/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'auth/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'verify/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'notice/**',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
