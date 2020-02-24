import React from 'react';
import { Marker, Popup } from 'react-map-gl';

const TemporaryMapMarker = ({ latitude, longitude, onCloseCallback }) => (
  <>
    <Marker
      latitude={latitude}
      longitude={longitude}
      offsetLeft={-12}
      offsetTop={-24}
    >
      <div>
        <svg viewBox="0 0 512 512" className="marker temporary">
          <path
            d="M256,0C156.698,0,76,80.7,76,180c0,33.6,9.302,66.301,27.001,94.501l140.797,230.414
            c2.402,3.9,6.002,6.301,10.203,6.901c5.698,0.899,12.001-1.5,15.3-7.2l141.2-232.516C427.299,244.501,436,212.401,436,180
            C436,80.7,355.302,0,256,0z M256,270c-50.398,0-90-40.8-90-90c0-49.501,40.499-90,90-90s90,40.499,90,90
            C346,228.9,306.999,270,256,270z"
          />
        </svg>
      </div>
    </Marker>
    <Popup
      latitude={latitude}
      longitude={longitude}
      closeButton={true}
      closeOnClick={false}
      onClose={onCloseCallback}
      anchor="top"
      dynamicPosition={true}
    >
      <h3>Add your new Log Entry</h3>
    </Popup>
  </>
);

export default TemporaryMapMarker;
