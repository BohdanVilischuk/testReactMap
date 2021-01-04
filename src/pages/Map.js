import React, { useEffect, useState, Fragment } from "react";
import "../styles/Map.scss";
import MapGL, { Source, Layer, Image, Popup, Marker } from "@urbica/react-map-gl";
import { useDispatch, useSelector } from "react-redux";
import animations from 'mapbox-gl-js-animations';
import { execMarker } from "../redux/actions"
import PopupInfo from "../components/PopupInfo/PopupInfo";
import PopupInput from "../components/PopupInput/PopupInput";
import "mapbox-gl/dist/mapbox-gl.css";
import { useAlert } from "react-alert";

const Map = (props) => {
  const markers = useSelector((state) => state.markersState.markers);
  const mapDispatch = useDispatch();
  const alerts = useAlert()
  useEffect(() => {
    mapDispatch(execMarker())
    alerts.show("Map page");
  }, [])
  const [viewport, setViewport] = useState({
    latitude: 50.450001,
    longitude: 30.523333,
    zoom: 17,
  });
  const metadata = {
    "animations": [
      {
        "rules": {
          "opacity": 0,
          "duration": 1500,
          "loop": true,
          "easing": "easeInOutQuart"
        },
        "variables": {
          "opacity": 0.9
        },
        "paint": {
          "circle-opacity": ["var", "opacity"]
        }
      }
    ]
  }
  const mapStyleCSS = {
    'width': '100vw',
    'height': '100vh',
  };
  ///
  let features = markers.map((m) => ({
    'type': 'Feature',
    'properties': {
      'description': m.description,
      'title': m.title,
      'id': m.id
    },
    'geometry': {
      'type': 'Point',
      'coordinates': [m.longitude, m.latitude]
    }
  }))
  let source = {
    'type': 'FeatureCollection',
    'features': features
  }
  const markerImage = 'https://img.icons8.com/color/48/000000/marker.png';
  ///
  const [showPopupInfo, setShowPopupInfo] = useState({
    visibility: false,
    longitude: 0,
    latitude: 0
  });
  
  const [showMarker, setShowMarker] = useState({
    visibility: false,
    id: 0,
    longitude: 0,
    latitude: 0,
    title: '',
    description: ''
  });
  
  const showPopupInfoHandler = (m) => {
    setShowPopupInfo((state) => ({
      ...state,
      visibility: true,
      latitude: m.lngLat.lat,
      longitude: m.lngLat.lng
    }))
  };

  const markerAddHandler = (m) => {
    if (!hoveredMarker) {
      showPopupInfoHandler(m)
    }
  };

  const [hoveredMarker, setHoveredMarker] = useState(false);

  function markerHoverIn(m) {
    setHoveredMarker(true)
    const coordinates = m.features[0].geometry.coordinates.slice();
    const index = m.features[0].properties.id;
    const title = m.features[0].properties.title;
    const description = m.features[0].properties.description;
    setShowMarker((state) => ({
      ...state,
      visibility: true,
      latitude: coordinates[1],
      longitude: coordinates[0],
      title,
      description,
      index
    }))
  }
  function markerHoverOut() {
    setHoveredMarker(false)
  }

  const closePopup = () => {
    setShowPopupInfo((state) => ({
      ...state,
      visibility: false,
      latitude: 0,
      longitude: 0
    }))
  };
  function closePopupMarker(m) {
    setShowMarker((state) => ({
      ...state,
      visibility: false,
      latitude: 0,
      longitude: 0
    }))
  };
  useEffect(() => {
    const listener = (m) => {
      if (m.key === "Escape") {
        setShowPopupInfo(false);
        setShowMarker(false)
      }
    };
    window.addEventListener("keydown", listener);
  }, []);
  return (
    <MapGL
      animations={animations}
      mapStyle="mapbox://styles/aquui/ckj47yqfecaam19rpwtzuc8ol"
      accessToken="pk.eyJ1IjoiYXF1dWkiLCJhIjoiY2tqNDZzYzFnMGhzcDJwbnZ0MDhveXh1YSJ9.GlnDn0nwLUES83z-gG7qFQ"
      style={mapStyleCSS}
      {...viewport}
      onViewportChange={(viewport) => {
        setViewport(viewport);
      }}
    >
      {/* 3d buildings layer*/}
      <Layer
        id='3d-buildings'
        type='fill-extrusion'
        source='composite'
        source-layer='building'
        filter={['==', 'extrude', 'true']}
        paint={{
          'fill-extrusion-color': '#000',
          'fill-extrusion-height': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'height']
          ],
          'fill-extrusion-base': [
            'interpolate',
            ['linear'],
            ['zoom'],
            15,
            0,
            15.05,
            ['get', 'min_height']
          ],
          'fill-extrusion-opacity': 0.7
        }}
        onClick={markerAddHandler}
      />
      {/* Show popup and marker on click and type data */}
      {
        showPopupInfo.visibility ? (
          <Fragment>
            {markers.map((marker, index) => (
              <Marker
                key={index}
                offsetTop={-48}
                offsetLeft={-24}
                longitude={showPopupInfo.longitude}
                latitude={showPopupInfo.latitude}
              >
                <img src={markerImage} />
              </Marker>
            ))}
            <Popup
              offset={30}
              longitude={showPopupInfo.longitude}
              latitude={showPopupInfo.latitude}
              onClose={closePopup}
            >
              <PopupInput
                alerts={alerts}
                closePopup={closePopup}
                longitude={showPopupInfo.longitude}
                latitude={showPopupInfo.latitude}
              />
            </Popup>
          </Fragment>
        ) : false}

      {/* Marker image layer */}
      <Source id='point' type='geojson' data={source} />
      <Image id='marker' image={markerImage} />
      <Layer
        id='marker'
        type='symbol'
        source='point'
        metadata={metadata}
        layout={{
          'icon-image': 'marker'
        }}
        onHover={markerHoverIn}
        onLeave={markerHoverOut}
      />
      {/* Popup hover Info  */}
      {
        showMarker.visibility ? (
          <Popup
            offset={20}
            longitude={showMarker.longitude}
            latitude={showMarker.latitude}
            onClose={closePopupMarker}
          >
            <PopupInfo
              title={showMarker.title}
              description={showMarker.description}
            />
          </Popup>
        ) : false
      }
    </MapGL>
  )
}
export default Map;