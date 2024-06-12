import React, { createContext, useCallback, useContext, useState } from "react";
import { Map, Marker } from "@vis.gl/react-google-maps";
import { motion } from "framer-motion";

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
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center rounded-xl"
        >
          <Map
            center={{ lat: location.lat, lng: location.long }}
            defaultZoom={3}
            gestureHandling={"greedy"}
            disableDefaultUI={true}
            className="w-[50vw] h-[20vh] rounded-xl"
          >
            <Marker position={{ lat: location.lat, lng: location.long }} />
          </Map>
        </motion.div>
      )}
      {children}
    </MapsContext.Provider>
  );
}

export const useMaps = () => useContext(MapsContext);
