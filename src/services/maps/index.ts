import axios from "axios";
import { ContactAddress } from "@/components/contact/form/types";
import type { Places } from "./types";

const PROXY = "https://cors-anywhere.herokuapp.com/";

export const getSuggestions = async (address: ContactAddress) => {
  try {
    const response = await axios.get<Places>(
      `${PROXY}https://maps.googleapis.com/maps/api/place/autocomplete/json`,
      {
        params: {
          input: `${address.address},${address.city},${address.uf},Brazil`,
          types: "address",
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    return response.data.predictions;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      // The request was made, but there was no response
      throw new Error("No response received from server");
    } else {
      // Error in request configuration
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export const getLocationByAddress = async (encodedAddress: string) => {
  try {
    const response = await axios.get<any>(
      `${PROXY}https://maps.googleapis.com/maps/api/geocode/json`,
      {
        params: {
          address: encodedAddress,
          key: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        },
      }
    );

    return response.data.results;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      // The request was made, but there was no response
      throw new Error("No response received from server");
    } else {
      // Error in request configuration
      throw new Error(`Request error: ${error.message}`);
    }
  }
};
