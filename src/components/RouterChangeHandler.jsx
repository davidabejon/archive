import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function RouteChangeHandler({ onChange }) {
  const location = useLocation();

  useEffect(() => {
    onChange(location);
  }, [location, onChange]);

  return null;
}

export default RouteChangeHandler;
