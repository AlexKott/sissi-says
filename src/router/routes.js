import Editor from '@/components/editor/Editor';
import Login from '@/components/login/Login';

export const ROUTE_INDEX = 'routes/INDEX';
export const ROUTE_LOGIN = 'routes/LOGIN';
export const ROUTE_PAGE = 'routes/PAGE';
export const ROUTE_SECTION = 'routes/SECTION';

export default {
  [ROUTE_INDEX]: {
    path: '/',
    component: Editor,
    itemType: 'global',
  },
  [ROUTE_LOGIN]: {
    path: '/login',
    component: Login,
  },
  [ROUTE_PAGE]: {
    path: '/page/:pageId',
    component: Editor,
    itemType: 'pages',
  },
  [ROUTE_SECTION]: {
    path: '/page/:pageId/section/:sectionId',
    component: Editor,
    itemType: 'sections',
  },
};
