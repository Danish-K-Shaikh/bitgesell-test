import PropTypes from "prop-types";
import { ArrowLeft } from "lucide-react";

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useData } from "../state/DataContext";
import NotFoundPage from "../components/404";
const SkeletonDetailPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-6">
    <div className="max-w-2xl mx-auto">
      {/* Header Skeleton */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8">
        <div className="h-6 bg-white/20 rounded-lg mb-4 w-1/4 animate-pulse"></div>
        <div className="h-8 bg-white/20 rounded-lg w-1/3 animate-pulse"></div>
      </div>

      {/* Item Details Skeleton */}
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
        <div className="h-10 bg-white/20 rounded-lg mb-8 w-1/2 mx-auto animate-pulse"></div>

        <div className="space-y-6">
          {/* Category Skeleton */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="h-4 bg-white/20 rounded-lg mb-2 w-1/3 mx-auto animate-pulse"></div>
            <div className="h-6 bg-white/20 rounded-lg w-1/2 mx-auto animate-pulse"></div>
          </div>

          {/* Price Skeleton */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="h-4 bg-white/20 rounded-lg mb-2 w-1/4 mx-auto animate-pulse"></div>
            <div className="h-8 bg-white/20 rounded-lg w-1/3 mx-auto animate-pulse"></div>
          </div>
        </div>

        {/* Action Buttons Skeleton */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <div className="flex-1 h-12 bg-white/20 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
);

const ItemDetailPage = () => {
  const {
    getSingleItem,
    singleItemData: { data: item, loading },
  } = useData();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getSingleItem(id);
  }, [id]);

  const onBack = () => {
    navigate(-1);
  };
  if (loading) {
    return <SkeletonDetailPage />;
  }
  
  if (!item) return <NotFoundPage />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-blue-600 p-6">
      <div className="max-w-2xl mx-auto">

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to List
          </button>
          <h1 className="text-2xl font-bold">Item Details</h1>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 text-white">
          <h2 className="text-3xl font-bold mb-8 text-center">{item.name}</h2>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-sm opacity-80 mb-2">Category</div>
              <div className="text-xl font-semibold">{item.category}</div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
              <div className="text-sm opacity-80 mb-2">Price</div>
              <div className="text-2xl font-bold">
                ₹{item.price.toLocaleString()}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={onBack}
              className="flex-1 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-6 py-3 text-white transition-all duration-200 font-semibold"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetailPage;
