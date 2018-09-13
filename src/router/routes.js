export const ROUTE_INDEX = 'routes/INDEX';
export const ROUTE_LOGIN = 'routes/LOGIN';
export const ROUTE_PAGE = 'routes/PAGE';
export const ROUTE_SECTION = 'routes/SECTION';

export default {
  [ROUTE_INDEX]: {
    path: '/',
    itemType: 'global',
  },
  [ROUTE_LOGIN]: {
    path: '/login',
  },
  [ROUTE_PAGE]: {
    path: '/page/:pageId',
    itemType: 'pages',
  },
  [ROUTE_SECTION]: {
    path: '/page/:pageId/section/:sectionId',
    itemType: 'sections',
  },
};
