import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

type ValidLocation = "chennai" | "ooty";

interface LocationContextType {
  currentLocation: ValidLocation | null;
  setCurrentLocation: (loc: ValidLocation | null) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

const validLocations: ValidLocation[] = ["chennai", "ooty"];

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [currentLocation, setCurrentLocationState] = useState<ValidLocation | null>(() => {
    const stored = localStorage.getItem("selectedLocation") as ValidLocation;
    return validLocations.includes(stored) ? stored : null;
  });

  const setCurrentLocation = (loc: ValidLocation | null) => {
    setCurrentLocationState(loc);
    if (loc) {
      localStorage.setItem("selectedLocation", loc);
    } else {
      localStorage.removeItem("selectedLocation");
    }
  };

  return (
    <LocationContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocationContext must be used within a LocationProvider");
  }
  return context;
};

/**
 * An optional wrapper that can be placed on the root route ("/") 
 * to automatically redirect the user to their previously saved location.
 */
export const RootLocationRedirect = ({ children }: { children: ReactNode }) => {
  const { currentLocation } = useLocationContext();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (currentLocation && location.pathname === "/") {
      navigate(`/${currentLocation}`, { replace: true });
    }
  }, [currentLocation, location.pathname, navigate]);

  return <>{children}</>;
};
