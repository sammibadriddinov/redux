import './styles.css'
import {applyMiddleware, createStore} from "redux";
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import {rootReducer} from "./redux/rootReducer";
import {asyncIncrement, changeTheme, decrement, increment} from "./redux/actions";
import thunk from "redux-thunk";

const counter = document.getElementById('counter')
const addBtn = document.getElementById('add')
const subBtn = document.getElementById('sub')
const asyncBtn = document.getElementById('async')
const themeBtn = document.getElementById('theme')

// function logger(state) {
//   return function (next) {
//     return function (action) {
//       console.log('State', state.getState())
//       console.log('Action', action)
//       let newState = next(action);
//       console.log('New state', newState)
//       return newState
//     }
//   }
// }

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
)

addBtn.addEventListener('click', () => {
  store.dispatch(increment())
})

subBtn.addEventListener('click', () => {
  store.dispatch(decrement())
})

asyncBtn.addEventListener('click', () => {
  store.dispatch(asyncIncrement())
})

themeBtn.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light')
  ? 'dark'
  : 'light'
  store.dispatch(changeTheme(newTheme))
})

store.subscribe(() => {
  let state = store.getState();

  counter.textContent = state.counter;
  document.body.className = state.theme.value;

  [addBtn, subBtn, themeBtn, asyncBtn].forEach(btn => {
    btn.disabled = state.theme.disabled
  })
})

store.dispatch({type: 'INIT_APPLICATION'})