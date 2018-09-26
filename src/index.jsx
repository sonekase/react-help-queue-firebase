import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { AppContainer } from 'react-hot-loader';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import persistDataLocally from './middleware/persist-data-locally';
import ticketListReducer from './reducers/ticket-list-reducer';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';

let retrievedState;
try {
  retrievedState = localStorage.getItem('reduxStore');
  if (retrievedState === null){
    retrievedState = {};
  }
  retrievedState = JSON.parse(retrievedState);
} catch (err){
  retrievedState = {};
}

const store = createStore(rootReducer, retrievedState, applyMiddleware(persistDataLocally));

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

const render = (Component) => {
  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </HashRouter>,
    document.getElementById('react-app-root')
  );
};

render(App);

/*eslint-disable */
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
};
/*eslint-enable */
