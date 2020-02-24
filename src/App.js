import React, { useState, useEffect } from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';

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

  useEffect(() => {
    (async () => {
      const logEntries = await listLogEntries();

      setLogEntries(logEntries);
    })();
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/navigation-guidance-day-v4"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
    >
      {logEntries.map(logEntry => (
        <Marker
          latitude={logEntry.latitude}
          longitude={logEntry.longitude}
          offsetLeft={-12}
          offsetTop={-24}
          key={logEntry._id}
        >
          <svg
            className="marker"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
        </Marker>
      ))}
    </ReactMapGL>
  );
};

export default App;
