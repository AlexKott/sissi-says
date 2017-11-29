import * as t from './types';

export function setInitialContent() {
    return {
        type: t.SET_INITIAL_CONTENT,
    };
}

export function addPage(type) {
    return {
        type: t.ADD_PAGE,
        payload: { type },
    };
}
