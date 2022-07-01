import {
  createStore,
  compose,
  bindActionCreators,
  combineReducers,
  applyMiddleware,
} from "redux";

const reducer = (state = { count: 0 }) => {
  return state;
};

const consoleEnhancer = (createStore) => (reducer, initialState, enhancer) => {
  const consoleReducer = (state, action) => {
    console.log("old state", state);
    const newState = reducer(state, action);
    console.log("new state", newState);

    return newState;
  };

  return createStore(consoleReducer, initialState, enhancer);
};

const logMiddleware = (store) => (next) => (action) => {
  console.log("old state", store.getState(), action);
  next(action);
  console.log("new state", store.getState(), action);
};

const monitorMiddleware = (store) => (next) => (action) => {
  const start = performance.now();
  next(action);
  const end = performance.now();
  const diff = end - start;
  console.log(diff);
};

const store = createStore(
  reducer,
  applyMiddleware(logMiddleware, monitorMiddleware)
);

store.dispatch({ type: "Hello" });
