// import React, { Fragment } from "react";
// import ReactMapGl, { Marker } from "react-map-gl";
// import {useDispatch, useSelector} from "react-redux";
//
// const Markers = () => {
//   const markers = useSelector(state => state.markersState.markers)
//   return (
    // <Fragment>
    //   { markers.map((marker, index) => (
    //     <Marker
    //       key={index}
    //       offsetTop={-20}
    //       offsetLeft={0}
    //       latitude={marker[1]}
    //       longitude={marker[0]}
    //     >
    //       {index}
    //       <button
    //         className="btn-next"
    //         onMouseOverCapture={(e) => {
    //           e.preventDefault();
    //         }}
    //       >
    //         <div className="pin">

    //         </div>
    //         <div className="pulse"></div>
    //       </button>
    //     </Marker>
    //   ))}
    // </Fragment>
//   );
// };
// export default Markers