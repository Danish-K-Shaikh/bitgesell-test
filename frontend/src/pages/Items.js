import { useCallback, useState, useEffect, useMemo, Fragment } from "react";
import StatCard, { SkeletonStatCard } from "../components/StatCard";
import ItemsHeader, {
  SkeletonItemsHeader,
} from "../components/items/ItemsHeader";
import SearchBox from "../components/SearchBox";
import ItemCard, { SkeletonItemCard } from "../components/items/ItemCard";
import Pagination from "../components/Pagination";
import { useData } from "../state/DataContext";
import debounce from "../utils/debounce";

const ItemsListPage = () => {
  const {
    items,
    totalItems,
    fetchItems,
    onItemsFetched,
    getStats,
    statsData: {
      totalItems: totalStatItems,
      totalPrice,
      averagePrice,
      loading: isStatsLoading,
    },
    isLoading,
  } = useData();

  const [searchText, setSearchText]= useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(function () {
    getStats();
  }, []);

  const debounceSearch = debounce(async function (textValue) {
    setSearchText(textValue);
    setCurrentPage(1);
  }, 300);

  const onSearchChange = useCallback(function (value) {    
    debounceSearch(value);
  }, []);

  const onItemsPerPageChange = useCallback(function(itemsPerPage) {
    setItemsPerPage(itemsPerPage);
    setCurrentPage(1);
  }, [setItemsPerPage, setCurrentPage])

  useEffect(() => {
    let active=true;
    fetchItems(itemsPerPage, currentPage, searchText).then((json) => {
      if(active) onItemsFetched(json);
    });
    return () => {
      active= false;
    }
  }, [itemsPerPage, currentPage, searchText]);

  const [totalPages, startIndex, endIndex] = useMemo(() => {
    const pages = Math.ceil(totalItems / itemsPerPage);
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(start + itemsPerPage - 1, items.length);
    return [pages, start, end];
  }, [totalItems, itemsPerPage, currentPage, items.length]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {isStatsLoading ? (
            <Fragment>
              <SkeletonStatCard />
              <SkeletonStatCard />
              <SkeletonStatCard />
            </Fragment>
          ) : (
            <Fragment>
              <StatCard title="Total Items" value={totalStatItems} />
              <StatCard title="Average value" value={averagePrice} />
              <StatCard
                title="Total Value"
                value={`₹${totalPrice.toLocaleString()}`}
              />
            </Fragment>
          )}
        </div>
        
        {isLoading ? (
          <SkeletonItemsHeader />
        ) : (
          <ItemsHeader
            totalItems={totalItems}
            currentPage={currentPage}
            totalPages={totalPages}
            startIndex={startIndex}
            endIndex={endIndex}
          />
        )}

        <div className="mt-6">
          <SearchBox onSearchChange={onSearchChange} />
        </div>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading
            ? Array.from({ length: itemsPerPage }).map((_, index) => (
                <SkeletonItemCard key={index} />
              ))
            : items.map((item) => <ItemCard key={item.id} item={item} />)}
        </div>
        
        {items.length === 0 && (
          <div className="text-center py-12">
            <p className="text-white/80 text-lg">
              No items found matching your search.
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            itemsPerPage={itemsPerPage}
            onItemsPerPageChange={onItemsPerPageChange}
            totalItems={totalItems}
          />
        )}
      </div>
    </div>
  );
};

export default ItemsListPage;
