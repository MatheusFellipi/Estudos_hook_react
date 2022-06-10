import { useEffect, useState } from "react";

type Location = {
  latitude: any;
  longitude: any;
};

function App() {
  const [location, setLocation] = useState<Location>({});

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(handlePositionReceived);
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  function handlePositionReceived({ coords }: any) {
    const { latitude, longitude } = coords;
    setLocation({ latitude, longitude });
  }

  return (
    <div>
      {" "}
      Latitude: {location.latitude} <br />
      Longitude: {location.longitude} <br />
    </div>
  );
}

export default App;
