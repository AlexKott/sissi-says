export const getLocation = state => state.location;
export const getLocationPageId = state => state.location.payload ? state.location.payload.pageId : null;
export const getCurrentRoute = state => state.location.type;
