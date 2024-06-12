import axios from "axios";
import { Cep, Districits, State } from "./types";

export const getStates = async () => {
  try {
    const response = await axios.get<State[]>(
      "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(
        `Error: ${error.response.status} - ${error.response.statusText}`
      );
    } else if (error.request) {
      // The request was made, but there was no response
      throw new Error("No response received from server");
    } else {
      //  Error in request configuration
      throw new Error(`Request error: ${error.message}`);
    }
  }
};

export const getCities = async (uf: string) => {
  try {
    const response = await axios.get<Districits[]>(
      `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/distritos`
    );

    return response.data;
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

export const getCepInfo = async (cep: string) => {
  try {
    const response = await axios.get<Cep>(
      `https://viacep.com.br/ws/${cep}/json/`
    );

    return response.data;
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
