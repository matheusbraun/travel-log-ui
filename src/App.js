import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './api';

const App = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: -30.1087957,
    longitude: -51.3172272,
    zoom: 11,
  });

  const [logEntries, setLogEntries] = useState([]);
  const [showPopup, setShowPopup] = useState({});
  const [addEntryLocation, setAddEntryLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();

      setLogEntries(logEntries);
    })();
  }, []);

  const showAddMarkerPopup = pointerEvent => {
    const [longitude, latitude] = pointerEvent.lngLat;

    setAddEntryLocation({
      latitude,
      longitude,
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/navigation-guidance-day-v4"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={pointerEvent => showAddMarkerPopup(pointerEvent)}
    >
      {logEntries.map(logEntry => (
        <>
          <Marker
            latitude={logEntry.latitude}
            longitude={logEntry.longitude}
            offsetLeft={-24}
            offsetTop={-48}
            key={logEntry._id}
          >
            <div
              onClick={() =>
                setShowPopup({
                  [logEntry._id]: true,
                })
              }
            >
              <svg viewBox="0 0 512 512" className="marker">
                <path
                  d="M256,0C156.698,0,76,80.7,76,180c0,33.6,9.302,66.301,27.001,94.501l140.797,230.414
                  c2.402,3.9,6.002,6.301,10.203,6.901c5.698,0.899,12.001-1.5,15.3-7.2l141.2-232.516C427.299,244.501,436,212.401,436,180
                  C436,80.7,355.302,0,256,0z M256,270c-50.398,0-90-40.8-90-90c0-49.501,40.499-90,90-90s90,40.499,90,90
                  C346,228.9,306.999,270,256,270z"
                />
              </svg>
            </div>
          </Marker>
          {showPopup[logEntry._id] ? (
            <Popup
              latitude={logEntry.latitude}
              longitude={logEntry.longitude}
              closeButton={true}
              closeOnClick={false}
              onClose={() => setShowPopup({})}
              anchor="top"
              dynamicPosition={true}
            >
              <div className="popup">
                <h3>{logEntry.title}</h3>
                <p>{logEntry.comments}</p>
                <small>
                  Visited on:{' '}
                  {new Date(logEntry.visitDate).toLocaleDateString()}
                </small>
              </div>
            </Popup>
          ) : null}
        </>
      ))}
      {addEntryLocation ? (
        <>
          <Marker
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
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
            latitude={addEntryLocation.latitude}
            longitude={addEntryLocation.longitude}
            closeButton={true}
            closeOnClick={false}
            onClose={() => setAddEntryLocation(null)}
            anchor="top"
            dynamicPosition={true}
          >
            <h3>Add your new Log Entry</h3>
          </Popup>
        </>
      ) : null}
    </ReactMapGL>
  );
};

export default App;
