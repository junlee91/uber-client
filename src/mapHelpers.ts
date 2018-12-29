import axios from "axios";
import { GEO_KEY } from "./keys";

export const geoCode = () => null;

export const reverseGeoCode = async (lat: number, lng: number) => {
  const URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GEO_KEY}`;
  const { status, data } = await axios(URL);
  console.log(status, data);
};
