// import { Fragment , useState } from "react";
// import ReactMapGl, { Popup } from "react-map-gl";
// import {useDispatch, useSelector} from "react-redux";
// // import { deletePopup } from "../../reduxActions/actions"
//
//
// const Popups = () => {
//   const popups = useSelector(state => state.popupsState.popups)
//   const popupDispatch = useDispatch()
//
//   return (
//     <Fragment>
//       { popups.map((popup, index) => (
//         <Popup
//           key={index}
//           offsetTop={-20}
//           offsetLeft={0}
//           latitude={popup[1]}
//           longitude={popup[0]}
//
//         >
//           {index}
//         </Popup>
//       ))}
//     </Fragment>
//   );
// };
// export default Popups