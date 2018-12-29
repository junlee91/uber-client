import axios from "axios";
import { toast } from "react-toastify";
import { GEO_KEY } from "./keys";

export const geoCode = async (address: string) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GEO_KEY}`;
  const { data } = await axios(URL);

  console.log(data);
};

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEO_KEY}`;
  const { status, data } = await axios(URL);

  if (status === 200) {
    const { results } = data;
    const firstPlace = results[0];
    const address = firstPlace.formatted_address;

    return address;
  } else {
    toast.error(data.error_message);

    return false;
  }
};
