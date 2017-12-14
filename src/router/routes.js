export const ROUTE_INDEX = 'routes/INDEX';
export const ROUTE_PAGE = 'routes/PAGE';
export const ROUTE_SECTION = 'routes/SECTION';

export default {
  [ROUTE_INDEX]: {
    path: '/',
  },
  [ROUTE_PAGE]: {
    path: '/page/:pageId',
  },
  [ROUTE_SECTION]: {
    path: '/page/:pageId/section/:sectionId',
  },
};
