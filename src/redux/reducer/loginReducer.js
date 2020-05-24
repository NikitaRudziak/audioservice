import { loginStore } from '../store/loginStore'

export const loginReducer = (state = loginStore, action) => {
  switch (action.type) {
    case 'SET_NICKNAME': {
      return {
        ...state,
        user: {
          ...state.user,
          nickName: action.nickName,
        }
      }
    }

    case 'SET_ID': {
      return {
        ...state,
        user: {
          ...state.user,
          id: action.id,
        }
      }
    }

    case 'SET_TRASH': {
      return {
        ...state,
        user: {
          ...state.user,
          forTrash: action.forTrash,
        }
      }
    }

    case 'SET_NAME': {
      return {
        ...state,
        user: {
          ...state.user,
          name: action.name
        }
      }
    }

    case 'SHOW_PLAYLIST_TRACKS': {
      return {
        ...state,
        user: {
          ...state.user,
          forSPT: action.forSPT
        }
      }
    }

    case 'INIT_MODAL': {
      return {
        ...state,
        user: {
          ...state.user,
          initModal: action.initModal,
        }
      }
    }

    case 'INIT_ATTENTION': {
      return {
        ...state,
        user: {
          ...state.user,
          initAttention: action.initAttention,
          mesType: action.mesType,
          playTrash: action.playTrash
        }
      }
    }

    case 'SET_TRACKID': {
      return {
        ...state,
        user: {
          ...state.user,
          trackID: action.trackID
        }
      }
    }

    case 'SET_GENRENAME': {
      return {
        ...state,
        user: {
          ...state.user,
          genreName: action.genreName
        }
      }
    }

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
