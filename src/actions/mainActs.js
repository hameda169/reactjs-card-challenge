export const init = () => ({
    type: 'INIT',
});

export const start = () => ({
    type: 'REQ_START'
});

export const loadCards = () => (dispatch, getState) => {
    dispatch(start());
    return fetch('http://static.pushe.co/challenge/json')
        .then(r => r.json())
        .then(r => dispatch({type: 'REQ_DONE', cards: r.cards}))
        .catch(err => dispatch({type: 'REQ_ERR'}))
};

export const changeTitle = (idx, title) => ({
    type: 'CHANGE_TITLE',
    title, idx
});

export const changeDesc = (idx, desc) => ({
    type: 'CHANGE_DESC',
    desc, idx
});
