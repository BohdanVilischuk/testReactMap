import {combineReducers} from "redux";
import {markerReducer} from "./markerReducer";
import {popupsReducer} from "./popupReducer";


export const rootReducer = combineReducers({
  markersState: markerReducer,
  popupState: popupsReducer
})