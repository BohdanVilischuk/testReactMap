import {EXECUTE_MARKER, ADD_MARKER} from "./actionTypes";

const initialState = {
  markers: []
}

export const markerReducer = (state = initialState, action) => {
  switch (action.type){
    case EXECUTE_MARKER:
      return {
        ...state,
        markers: state.markers.concat(action.payload)
      }
    case ADD_MARKER:
      return {
        ...state,
        markers: state.markers.concat(action.payload)
      }
    default: return state
  }
}