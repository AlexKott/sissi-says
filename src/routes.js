const ROUTE_INDEX = 'routes/INDEX';
const ROUTE_PAGE = 'routes/PAGE';
const ROUTE_SECTION = 'routes/SECTION';

export default {
    [ROUTE_INDEX]: {
        path: '/',
    },
    [ROUTE_PAGE]: {
        path: '/page/:id',
    },
    [ROUTE_SECTION]: {
        path: '/section/:id',
    },
};
