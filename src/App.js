import React, { useState, useEffect } from 'react';
import ReactMapGL from 'react-map-gl';

import TemporaryMapMarker from './components/TemporaryMapMarker';
import MapMarker from './components/MapMarker';

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

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setViewport(viewport => ({ ...viewport, latitude, longitude }));
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000,
      },
    );
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
        <MapMarker
          key={logEntry._id}
          showPopup={showPopup}
          setShowPopup={setShowPopup}
          {...logEntry}
        />
      ))}
      {addEntryLocation ? (
        <TemporaryMapMarker
          {...addEntryLocation}
          onCloseCallback={() => setAddEntryLocation(null)}
        />
      ) : null}
    </ReactMapGL>
  );
};

export default App;
