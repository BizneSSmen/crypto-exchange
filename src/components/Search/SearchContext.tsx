import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Advertisement } from "../../interfaces/advertisement.interface";
import axios from "axios";
import { QueryDto } from "../../interfaces/dto/query.dto";
import { Make } from "../../interfaces/make.interface";
import { Condition } from "../../interfaces/condition.interface";
import { EngineType } from "../../interfaces/engine-type.interface";
import { Model } from "../../interfaces/model.interface";
import { Color } from "../../interfaces/color.interface";

interface SearchData {
  makes: Make[];
  models: Model[];
  engineTypes: EngineType[];
}

interface SearchContextState {
  advertisements: Advertisement[];
  searchData: SearchData;
  query: QueryDto;
  updateQuery: <T extends keyof QueryDto>(key: T, value: QueryDto[T]) => void;
  fetchAdvertisements: (query: QueryDto) => void;
}

const SearchContext = createContext<SearchContextState | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [advertisements, setAdvertisements] = useState<Advertisement[]>([]);
  const [page, setPage] = useState<number>(0);
  const [searchData, setSearchData] = useState<SearchData>({
    makes: [] as Make[],
    models: [] as Model[],
    engineTypes: [] as EngineType[],
  } as SearchData);
  const [query, setQuery] = useState<QueryDto>({} as QueryDto);

  const fetchData = useCallback(
    async (endpoint: string, key: keyof SearchData) => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/vehicle/${endpoint}`
        );
        setSearchData((prev) => ({ ...prev, [key]: response.data }));
      } catch (err) {
        console.error(err);
      }
    },
    []
  );

  const fetchAdvertisements = useCallback(async (query: QueryDto) => {
    try {
      const response = await axios.get<Advertisement[]>(
        `${process.env.REACT_APP_API_URL}/advertisements`,
        { params: query }
      );
      setAdvertisements(response.data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  const fetchModels = useCallback(async () => {
    if (query.make) {
      try {
        const response = await axios.get<Model[]>(
          `${process.env.REACT_APP_API_URL}/vehicle/models/${query.make}`
        );
        setSearchData((prev) => ({ ...prev, models: response.data }));
      } catch (error) {
        console.error("Failed to fetch models:", error);
      }
    }
  }, [query.make]);

  const updateQuery = <T extends keyof QueryDto>(
    key: T,
    value: QueryDto[T]
  ): void => {
    setQuery((prevQuery) => ({
      ...prevQuery,
      [key]: value,
    }));
  };

  useEffect(() => {
    fetchAdvertisements({} as QueryDto);
    fetchData("makes", "makes");
    fetchData("engineTypes", "engineTypes");
  }, [fetchAdvertisements, fetchData]);

  useEffect(() => {
    fetchModels();
  }, [fetchModels]);

  return (
    <SearchContext.Provider
      value={{
        advertisements,
        searchData,
        fetchAdvertisements,
        query,
        updateQuery,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = (): SearchContextState => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("usePlaceContext must be used within a PlaceProvider");
  }
  return context;
};
