import React from "react";
import {GoogleMap,useLoadScript,Marker,InfoWindow, } from "@react-google-maps/api";
import usePlacesAutocomplete, {getGeocode, getLatLng} from "use-places-autocomplete";
import {Combobox,ComboboxInput,ComboboxPopover, ComboboxList, ComboboxOption,} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import CircleLoader from "react-spinners/ClipLoader";
import index from './indexx.css'
import { Grid,Box } from "@mui/material";
import Typography from "../../modules/components/Typography";

import {useDispatch, useSelector} from 'react-redux'
import { selectCurrentLocation, setLocation } from "./GoogleMapSlice";


const center = { //gde se na pocetku pozicioniramo 
  lat: 43.316872,
  lng: 21.894501,
};

const libraries = ["places"];
export default function App(props) {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'AIzaSyB-pD-Vk4hlvFtlVpZ2UoJnoUc_vpkuJfs',
    libraries,  //uzimam places, mora na onaj nacin (bugovi sa mapom)
  });
  const {fetchedLoc}=props
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null); //selected marker
  
  const dispatch=useDispatch();
  let LokacijaRedux=useSelector(selectCurrentLocation)

  const onMapClick = React.useCallback((e) => {
    console.log("onMapClick:"); 
    setMarkers([ { lat: e.latLng.lat(), lng: e.latLng.lng(),},]); 
    dispatch(setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }))

    
  }, []);  //useCallback function is used if you dont want this function to change unless props in dependency array isnt change( a posto ih nema onda se ona ne menja)


  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []); //uzimamo mapu i assignujemo je onMapLoad konstanti kako ne bi dolazilo do rerenderovanja
  //useState koristimo kada zelimo stanje da rerenderuje komponentu, a useRef koristimo kada stanje ne zelimo da rerenderuje komponentu


  const panTo = React.useCallback(({ lat, lng }) => { //panTo - pozicioniraj se
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);


  if (loadError) return "Error";
  if (!isLoaded) return (<CircleLoader loading={!isLoaded} color="red" size={150} />);


  return (
    <div style={{height:'60vh',width:'100%'}}>
      
      {fetchedLoc?null:
                      <Grid container nowrap>
                        <Grid item xs={8}>
                          <Search panTo={panTo}/>
                        </Grid>
                          <Grid item align='end' xs={4} nowrap >
                            <Locate panTo={panTo}/>
                          </Grid>
                      </Grid>
      }
      <GoogleMap
        id="map"
        mapContainerStyle={{height: "100%",width: "100%"}}
        zoom={12}
        center={center} 
        onClick={onMapClick}
        onLoad={onMapLoad}
        
      >
        {markers.map((marker) => (
          <Marker

            key={`${marker.lat}-${marker.lng}`}
            position={fetchedLoc? fetchedLoc:{ lat: marker.lat, lng: marker.lng }}
            onClick={() => { setSelected(marker)}}
          />
        ))}
          {selected ? (
            <InfoWindow
              position={fetchedLoc? fetchedLoc:{ lat: selected.lat, lng: selected.lng }}
              onCloseClick={() => {setSelected(null) }}
            >
              <div>
                <h2>
                  <span role="img" aria-label="basketball">
                    🏀
                  </span>{" "}
                  Basketball activity
                </h2>
                {selected.lat}{','}{selected.lng}
                <p>paste this cords into any mapping application</p>
              </div>
            </InfoWindow>
          ) : null}
      </GoogleMap>
    </div>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => { navigator.geolocation.getCurrentPosition((position) => {
            panTo({ lat: position.coords.latitude,lng: position.coords.longitude, });
          },
          () => null //error handling xd
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data }, //status and data from suggestions that we get from google api
    setValue,
    clearSuggestions, //function
  } = usePlacesAutocomplete({ //when person is searching it will prefer places near this locations
    requestOptions: {
      location: { lat: () =>43.316872, lng: () => 21.894501 },
      radius: 100 * 1000,  //100m *1000=100km
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleSelect = async (address) => { //dobijamo adresu od search comboboxa
    setValue(address, false);
    clearSuggestions();
    
    try {
      const results = await getGeocode({ address }); 
      const { lat, lng } = await getLatLng(results[0]); //1. deo od ogromnog results
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };
  
  return (
    <div className="search">
      <Combobox onSelect={handleSelect} >
        <ComboboxInput 
          value={value}
          onChange={(e)=>{setValue(e.target.value)} }
          disabled={!ready}
          placeholder="Search location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );
}
