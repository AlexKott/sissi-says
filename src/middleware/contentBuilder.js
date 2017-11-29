import * as t from '../actions/types';

export default (store) => next => action => {
    const { type } = action;
    console.log('init content');

    if (type === t.SET_INITIAL_CONTENT) {
    }
}
