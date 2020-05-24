import { pageStore } from '../store/pageStore'

export const pageReducer = (state = pageStore, action) => {
  switch (action.type) {
    case 'CHANGE_PAGE': {
      return {
        ...state,
        page: {
          ...state.page,
          name: action.page,
        }
      }
    }

    default: {
      return state
    }
  }
}
