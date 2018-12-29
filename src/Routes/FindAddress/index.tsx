import { GoogleApiWrapper } from "google-maps-react";
import FindAddressContainer from "./FindAddressContainer";

export default GoogleApiWrapper({
  apiKey: "AIzaSyBPklGdyVwLvNxlZrCMC4kGs2z0D9CaDAk"
})(FindAddressContainer);
