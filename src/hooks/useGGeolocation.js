import { useEffect, useState } from "react";


export default function useGGeolocation(defautPosition = null){
    const [isLoading, setIsLoading] = useState(false);
    const [positon, setPosition]= useState(defautPosition);
    const [error, setError] = useState(null);
    
    // Set 
    useEffect(() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition, showError);
        }
      }, []);

      const showPosition = data => {
       
        setPosition({
            lat: data.coords.latitude,
            lng: data.coords.longitude
        });
      };
    
      const showError = err => {
        setError(err.message);
        setIsLoading(false);
      };
    
    
    function getPosition(){
        if(navigator.geolocation)
        return setError('Your broweser does not support geolocation!');

        setIsLoading(true);
        navigator.geolocation.getCurrentPosition(
            (pos) =>{
                setPosition({
                    lat: pos.coords.latitude,
                    lng: pos.coords.longitude
                });

                setIsLoading(false);
            },
            (error)=>{
                setError(error.message);
                setIsLoading(false);
            }
        );
    }
    return {isLoading, positon, error, getPosition};
}