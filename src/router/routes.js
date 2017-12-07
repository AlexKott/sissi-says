const ROUTE_INDEX = 'routes/INDEX';
const ROUTE_PAGE = 'routes/PAGE';
const ROUTE_SECTION = 'routes/SECTION';

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
