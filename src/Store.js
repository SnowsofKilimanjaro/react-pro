import {createStore,combineReducers,applyMiddleware}from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/Sagas';
import  * as rootReducer from './reducers/Index';

const sagaMiddleware = createSagaMiddleware() // 创建了一个saga中间件实例
const Store = createStore(
    combineReducers(rootReducer),
    applyMiddleware(sagaMiddleware)
)

// 下边这句话和下边的两行代码创建store的方式是一样的
// const store = createStore(rootReducer,applyMiddlecare(sagaMiddleware))

// const createStoreWithMiddleware = applyMiddleware(sagaMiddleware)(createStore)
// const store = createStoreWithMiddleware(rootReducer)


//sagaMiddleware.run(rootSaga);
export default Store;