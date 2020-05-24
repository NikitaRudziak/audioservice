import { musicStore } from '../store/musicStore'

export const musicReducer = (state = musicStore, action) => {
  switch (action.type) {
    case 'SET_TRACK': {
      return {
        ...state,
        track: {
          ...state.track,
            groupName: action.track.groupName,
            image: action.track.image,
            trackName: action.track.trackName,
            trackUrl: action.track.trackUrl,
            likeCount: action.track.likeCount,
            playCount: action.track.playCount,
            itemID: action.track.itemID,
        }
      }
    }


    default: {
      return state
    }
  }
}
