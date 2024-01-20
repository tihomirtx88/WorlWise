import { useEffect, useState } from "react";

export default function useGGeolocation(defautPosition = null) {
  const [isLoading, setIsLoading] = useState(false);
  const [positon, setPosition] = useState(defautPosition);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPosition();
  }, []);

  function getPosition() {
    if (!navigator.geolocation)
      return setError("Your broweser does not support geolocation!");

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });

        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }

  return { isLoading, positon, error, getPosition };
}
