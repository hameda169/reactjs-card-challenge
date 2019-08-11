import {combineReducers} from 'redux'

const init = {
    cards: [],
    loading: false,
    err: null,
    done: false
};

const main = (state = init, action = {}) => {
    let cards;
    switch (action.type) {
        case 'INIT':
            return {...init};
        case 'REQ_START':
            return {...state, loading: true};
        case 'REQ_DONE':
            return {...state, cards: action.cards, done: true, loading: false};
        case 'REQ_ERR':
            return {...state, loading: false, err: 'ERROR'};
        case 'CHANGE_TITLE':
            cards = state.cards.map((x, idx) => idx === action.idx ? ({...x, title: action.title}) : x);
            return {...state, cards};
        case 'CHANGE_DESC':
            cards = state.cards.map((x, idx) => idx === action.idx ? ({...x, description: action.desc}) : x);
            return {...state, cards};
        default:
            return state
    }
};

export default combineReducers({main})
