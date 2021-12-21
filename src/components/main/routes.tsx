import React from 'react';
import Dashboard from 'src/pages/dashboard/index';
import NewContent from 'src/pages/new-content';
import Opportunities from 'src/pages/opportunities';
import Saves from 'src/pages/saves';
import Shares from 'src/pages/shares';
import Sources from 'src/pages/sources';
import Tasks from 'src/pages/tasks';
import TopContent from 'src/pages/top-content';
import TopShared from 'src/pages/top-shared';
import Users from 'src/pages/users';

export const mainRoutes: Array<{
  path: string;
  component: React.FunctionComponent;
}> = [
  { path: '/dashboard', component: () => <Dashboard /> },
  { path: '/opportunities', component: () => <Opportunities /> },
  { path: '/tasks', component: () => <Tasks /> },
  { path: '/shares', component: () => <Shares /> },
  { path: '/saves', component: () => <Saves /> },
  { path: '/top-content', component: () => <TopContent /> },
  { path: '/top-shared', component: () => <TopShared /> },
  { path: '/new-content', component: () => <NewContent /> },
  { path: '/sources', component: () => <Sources /> },
  { path: '/content-index', component: () => <Sources /> },
  { path: '/users', component: () => <Users /> },
];
