import reducer from './index'
import * as actions from '../actions/mainActs'

it('initial state...', () => {
    expect(reducer()).toEqual({
        main: {
            cards: [],
            loading: false,
            err: null,
            done: false
        }
    })
});

it('start loading...', () => {
    let state = reducer();
    expect(reducer(state, actions.start())).toEqual({
        main: {
            cards: [],
            loading: true,
            err: null,
            done: false
        }
    })
});

it('load cards...', () => {
    let state = reducer();
    expect(reducer(state, {type: 'REQ_DONE', cards: [{title: 'title', description: 'description'}]})).toEqual({
        main: {
            ...state.main,
            cards: [{title: 'title', description: 'description'}],
            done: true
        }
    });
});

it('changeTitle', () => {
    let state = reducer();
    state = reducer(state, {type: 'REQ_DONE', cards: [{title: 'title', description: 'description'}]});
    state = reducer(state, actions.changeTitle(0, 'hamed'))
    expect(state.main.cards).toEqual([{title: 'hamed', description: 'description'}])
});

it('changeDiscription', () => {
    let state = reducer();
    state = reducer(state, {type: 'REQ_DONE', cards: [{title: 'title', description: 'description'}]});
    state = reducer(state, actions.changeDesc(0, 'hamed'));
    expect(state.main.cards).toEqual([{title: 'title', description: 'hamed'}])
});