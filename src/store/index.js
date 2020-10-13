/**
 * @Description: redux
 * @author: forguo
 * @date: 2020/8/27
 */
import {applyMiddleware, compose, createStore} from "redux";
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

// 创建数据仓库
const store = createStore(
    rootReducer,
    enhancer
);

export default store;
