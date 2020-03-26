import { loginStore } from '../store/loginStore'

export const loginReducer = (state = loginStore, action) => {
  switch (action.type) {
    case 'LOGIN_SUBMIT': {
      if (state.userID.login === action.login
        && state.userID.pass === action.pass) {
        return {
          ...state,
          userID: {
            ...state.userID,
            isAuth: true
          }
        }
      } else {
        return {
          ...state,
          notLoginText: 'Incorrect login or password!'
        }
      }
    }
    default: {
      return state
    }
  }
}
