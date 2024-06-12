import React, { createContext, useCallback, useContext, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";

import { MapsContextHandles, Location } from "./types";

interface Props {
  children: React.ReactNode;
}

const MapsContext = createContext({} as MapsContextHandles);

export default function MapsProvider({ children }: Props) {
  const [location, setLocation] = useState<Location | null>(null);

  const handleMapPosition = useCallback((newLocation: Location | null) => {
    setLocation(newLocation);
  }, []);

  return (
    <MapsContext.Provider value={{ handleMapPosition }}>
      {location && (
        <div className="flex items-center justify-center">
          <Map
            center={{ lat: location.lat, lng: location.long }}
            defaultZoom={3}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            className="w-[50vw] h-[20vh]"
          >
            <Marker position={{ lat: location.lat, lng: location.long }} />
          </Map>
        </div>
      )}
      {children}
    </MapsContext.Provider>
  );
}

export const useMaps = () => useContext(MapsContext);
