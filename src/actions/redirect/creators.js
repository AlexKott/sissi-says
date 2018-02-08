import * as routes from '@/router/routes';

export function redirectToIndex() {
  return {
    type: routes.ROUTE_INDEX,
  };
}

export function redirectToPage(pageId) {
  return {
    type: routes.ROUTE_PAGE,
    payload: { pageId },
  };
}
