import { FormEvent, memo, useCallback, useEffect, useState } from "react";

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";

import { ContactAddress } from "../types";
import { useMapsLibrary, useMap } from "@vis.gl/react-google-maps";
import { X } from "lucide-react";

interface Props {
  value: ContactAddress["address"];
  onChange: (e: ContactAddress["address"]) => void;
}

function ContactAddressAutocomplete({ value, onChange }: Props) {
  const map = useMap();
  const places = useMapsLibrary("places");

  const [sessionToken, setSessionToken] =
    useState<google.maps.places.AutocompleteSessionToken>();

  const [placesService, setPlacesService] =
    useState<google.maps.places.PlacesService | null>(null);

  const [autocompleteService, setAutocompleteService] =
    useState<google.maps.places.AutocompleteService | null>(null);

  const [predictionResults, setPredictionResults] = useState<
    Array<google.maps.places.AutocompletePrediction>
  >([]);

  const [inputValue, setInputValue] = useState<string>("");

  // starting the services creating a new custom session
  useEffect(() => {
    if (!places || !map) return;

    setAutocompleteService(new places.AutocompleteService());
    setPlacesService(new places.PlacesService(map));
    setSessionToken(new places.AutocompleteSessionToken());
  }, [places, map]);

  // get predictions with the autocomplete service
  const fetchPredictions = useCallback(
    async (newInputValue: string) => {
      try {
        if (!autocompleteService || !newInputValue) {
          setPredictionResults([]);
          return;
        }

        const request = { input: newInputValue, sessionToken };
        const response = await autocompleteService.getPlacePredictions(request);

        setPredictionResults(response.predictions);
      } catch (error) {
        console.log(error);
      }
    },
    [autocompleteService, sessionToken]
  );

  // fetching predictions and saving input value
  const onInputChange = useCallback(
    (event: FormEvent<HTMLInputElement>) => {
      const value = (event.target as HTMLInputElement)?.value;

      setInputValue(value);
      fetchPredictions(value);
    },
    [fetchPredictions]
  );

  // handle when a suggestion is cliked
  const handleSuggestionClick = useCallback(
    (placeId: string) => {
      if (!places) return;
      const detailRequestOptions = {
        placeId,
        fields: ["geometry", "name", "formatted_address"],
        sessionToken,
      };

      const detailsRequestCallback = (
        placeDetails: google.maps.places.PlaceResult | null
      ) => {
        onChange({
          description: placeDetails?.formatted_address ?? "",
          lat: placeDetails?.geometry?.location?.lat() ?? 0,
          long: placeDetails?.geometry?.location?.lng() ?? 0,
        });
        setPredictionResults([]);
        setInputValue(placeDetails?.formatted_address ?? "");
        setSessionToken(new places.AutocompleteSessionToken());
      };

      placesService?.getDetails(detailRequestOptions, detailsRequestCallback);
    },
    [places, sessionToken]
  );

  return (
    <div className="w-full flex flex-col items-end pb-4">
      <div className="w-[74%]">
        {!value ? (
          <>
            <Input
              value={inputValue}
              placeholder="Search for a place"
              onInput={(event: FormEvent<HTMLInputElement>) =>
                onInputChange(event)
              }
            />
            <Command>
              <CommandList>
                <CommandGroup>
                  {predictionResults.length > 0 && (
                    <ul>
                      {predictionResults.map(({ place_id, description }) => {
                        return (
                          <CommandItem>
                            <li
                              className="cursor-pointer"
                              key={place_id}
                              onClick={() => handleSuggestionClick(place_id)}
                            >
                              {description}
                            </li>
                          </CommandItem>
                        );
                      })}
                    </ul>
                  )}
                </CommandGroup>
              </CommandList>
            </Command>
          </>
        ) : (
          <div className="border-[1px] border-gray px-3 py-2 rounded-lg shadow-sm flex flex-row items-center justify-between hover:opacity-80 transition-opacity cursor-default">
            <span className="text-sm">{`${value.description.slice(
              0,
              value.description.length - 10
            )}...`}</span>
            <div
              role="button"
              onClick={() => {
                onChange(null);
              }}
            >
              <X />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ContactAddressAutocomplete);
