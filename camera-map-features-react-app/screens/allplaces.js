import { useEffect, useState } from "react";
import PlacesList from "../components/places/places_list";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

function AllPlaces() {

    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();
    useEffect(() => {   
        async function loadPlaces() {
           const places =  await fetchPlaces();
           setLoadedPlaces(places);
        }

        if(isFocused) { 
            // setLoadedPlaces((curPlaces) => [...curPlaces , route.params.place]);
            loadPlaces();
        }
    },[isFocused])
    return <PlacesList places={loadedPlaces}  />

}

export default AllPlaces;