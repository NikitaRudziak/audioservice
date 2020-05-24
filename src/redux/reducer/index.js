import { combineReducers } from 'redux'
import { loginReducer } from './loginReducer'
import { musicReducer } from './musicReducer'
import { pageReducer } from './pageReducer'

export default combineReducers({
  loginReducer,
  musicReducer,
  pageReducer
})

