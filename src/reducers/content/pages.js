export default (state = [], action = {}) => {
    return state;
};

export function getNumberOfPages(state) {
    return state.content.pages.length;
}
