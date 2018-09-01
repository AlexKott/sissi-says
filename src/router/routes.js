import MainEditor from '@/components/editor/MainEditor';
import Login from '@/components/login/Login';
import PageEditor from '@/components/editor/PageEditor';
import SectionEditor from '@/components/editor/SectionEditor';

export const ROUTE_INDEX = 'routes/INDEX';
export const ROUTE_LOGIN = 'routes/LOGIN';
export const ROUTE_PAGE = 'routes/PAGE';
export const ROUTE_SECTION = 'routes/SECTION';

export default {
  [ROUTE_INDEX]: {
    path: '/',
    component: MainEditor,
    itemType: 'global',
  },
  [ROUTE_LOGIN]: {
    path: '/login',
    component: Login,
  },
  [ROUTE_PAGE]: {
    path: '/page/:pageId',
    component: PageEditor,
    itemType: 'pages',
  },
  [ROUTE_SECTION]: {
    path: '/page/:pageId/section/:sectionId',
    component: SectionEditor,
    itemType: 'sections',
  },
};
