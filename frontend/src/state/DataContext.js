import {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
} from "react";
import { getItems, getStats as getStatsHttp, getItem } from "../httpClient";

const DataContext = createContext();

export function DataProvider({ children }) {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [statsData, setStatsData] = useState({
    loading: false,
    totalItems: 0,
    totalPrice: 0,
    averagePrice: 0,
  });

  const [singleItemData, setSingleItemData] = useState({
    loading: false,
    data: null,
  });

  const fetchItems = useCallback(async (limit, page = 1, filterQuery) => {
    setIsLoading(true);
    const res = await getItems(limit, page, filterQuery);
    const json = await res.json();
    return json;
  }, []);

  const onItemsFetched = useCallback(function (json) {
    setIsLoading(false);
    setItems(json.results);
    setTotalItems(json.totalItems);
  });

  const getStats = useCallback(async () => {
    try {
      setStatsData((data) => ({ ...data, loading: true }));
      const res = await getStatsHttp();
      const json = await res.json();

      setStatsData((data) => ({
        ...data,
        loading: false,
        totalItems: json.total,
        totalPrice: json.totalPrice,
        averagePrice: json.averagePrice,
      }));
    } finally {
      setStatsData((data) => ({ ...data, loading: false }));
    }
  }, []);

  const getSingleItem = useCallback(async (id) => {
    try {
      setSingleItemData((data) => ({ ...data, loading: true }));
      const res = await getItem(id);
      if (res.status !== 200) {
        return setSingleItemData((data) => ({
          ...data,
          loading: false,
          data: null,
        }));
      }
      const json = await res.json();

      setSingleItemData((data) => ({
        ...data,
        loading: false,
        data: json,
      }));
    } finally {
      setSingleItemData((data) => ({ ...data, loading: false }));
    }
  }, []);

  const contextValue = useMemo(
    () => ({
      items,
      totalItems,
      isLoading,
      statsData,
      singleItemData,

      fetchItems,
      onItemsFetched,
      getStats,
      getSingleItem,
    }),
    [items, isLoading, fetchItems, getStats, statsData, singleItemData]
  );

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);
