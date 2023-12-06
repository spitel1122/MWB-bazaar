import React, { useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxList,
  ComboboxOption,
  ComboboxPopover,
} from "@reach/combobox/dist/reach-combobox";
import { async } from "q";

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  lat: 21.1702,
  lng: 72.8311,
};

function MyComponent({ lat, lng, setLng, setLat, getCoordinates,selectlocation }) {
  const [selected, setSelected] = useState(null);
  const [geoCordLat, setGeoCordLat] = useState(21.1702401);
  const [geoCordLng, setGeoCordLng] = useState(72.83106070000001);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    libraries: ["places"],
    googleMapsApiKey:   "https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&parameters",
  });

  const [map, setMap] = React.useState(null);
console.log("selectlocationfrgfg",selectlocation)
  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds({
      lat: lat || 21.1702,
      lng: lng || 72.8311,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null);
  }, []);
  useEffect(() => {}, []);
  return isLoaded ? (
    <>
      <div>
        <PlacesAutocomplete
        selectlocation={selectlocation}
          setSelected={setSelected}
          setLng={setLng}
          setLat={setLat}
        />
      </div>
      {/* <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat: lat, lng: lng }}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={getCoordinates}
      >
        {selected && <Marker position={selected} />}
      </GoogleMap> */}
    </>
  ) : (
    <></>
  );
}

export default React.memo(MyComponent);
const PlacesAutocomplete = ({ setSelected, setLng, setLat,selectlocation }) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    console.log("address--->", address);
    const results = await getGeocode({ address });
    console.log("results", results);
    const { lat, lng } = await getLatLng(results[0]);
    console.log("jenis---->", lat, lng);
    setSelected({ lat, lng });
    setLng(lng);
    setLat(lat);
    selectlocation(address);
  };
  console.log("selectlocationselectlocation",selectlocation)
  console.log("vallllllllllllllllee",value)
  return (
    <Combobox  onSelect={handleSelect} style={{textAlign:'center'}}>
      <ComboboxInput
      style={{width:"200px",padding:'5px',margin:'5px 20px',border:'1px solid gray'}}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        />
        {console.log("vaaaaaaaaaall=>",data)}
      {/* <ComboboxPopover> */}
        <ComboboxList className="border bg-white" style={{margin:'0px 20px'}}>
          {status == "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      {/* </ComboboxPopover> */}
    </Combobox>
  );
};