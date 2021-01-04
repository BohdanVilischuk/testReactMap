import { ADD_POPUP, REMOVE_POPUP} from "./actionTypes";

const initialState = {
  popups: [],
}

export const popupsReducer = (state = initialState, action) => {
  switch (action.type){
    case ADD_POPUP:
      return {
        ...state,
        popups: [...state.popups, action.payload.popup],
      }
    case REMOVE_POPUP:
      return {
        ...state.popups.filter(
          el => el.id !== action.payload
        )
      }
    default: return state
  }
}