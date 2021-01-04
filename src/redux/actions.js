import {EXECUTE_MARKER, ADD_MARKER} from "./actionTypes";
///
export function execMarkerAction(marker){
  return {
    type: EXECUTE_MARKER,
    payload: marker
  }
}
export function execMarker(){
  return dispatch => {
    const allLocalState = localStorage.getItem("markersState");
    if (allLocalState === null) {
      dispatch(execMarkerAction([]));
    } else {
      dispatch(execMarkerAction(JSON.parse(allLocalState)));
    }
  }
}
///
export function addMarkerAction(marker){
  return {
    type: ADD_MARKER,
    payload: marker
  }
}
export function addMarker(marker){
  return dispatch => {
    const allLocalState = localStorage.getItem("markersState");
    if (allLocalState !== null) {
      let state = JSON.parse(allLocalState)
      state.push(marker)
      localStorage.setItem("markersState", JSON.stringify(state));
      dispatch(addMarkerAction(marker))
    } else {
      localStorage.setItem("markersState", JSON.stringify([marker]));
      dispatch(addMarkerAction(marker))
    }
  }
}