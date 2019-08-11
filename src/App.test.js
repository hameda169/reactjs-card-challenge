import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {Provider} from "react-redux";
import {createStore, applyMiddleware} from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers/index";

export const store = createStore(rootReducer, applyMiddleware(thunk));

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}> <App/></Provider>, div);
    ReactDOM.unmountComponentAtNode(div);
});
