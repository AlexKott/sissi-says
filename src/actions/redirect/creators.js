import * as routes from '@/router/routes';
import { redirect } from 'redux-first-router';

export function redirectToIndex() {
  return redirect({
    type: routes.ROUTE_INDEX,
  });
}

export function redirectToLogin() {
  return redirect({
    type: routes.ROUTE_LOGIN,
  });
}

export function redirectToPage(pageId) {
  return redirect({
    type: routes.ROUTE_PAGE,
    payload: { pageId },
  });
}
