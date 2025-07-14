
export const SkeletonItemCard = () => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
    <div className="flex justify-between items-start mb-4">
      <div className="flex-1">
        <div className="h-6 bg-white/20 rounded-lg mb-2 w-2/3 animate-pulse"></div>
        <div className="h-8 bg-white/20 rounded-lg w-1/2 animate-pulse"></div>
      </div>
      <div className="h-9 bg-white/20 rounded-lg w-16 animate-pulse"></div>
    </div>
  </div>
);

const ItemCard = ({ item }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-2xl font-bold">₹{item.price.toLocaleString()}</p>
      </div>
      <Link to={"/items/" + item.id}>
        <button className="bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2">
          <Eye className="w-4 h-4" />
          View
        </button>
      </Link>
    </div>
  </div>
);

import PropTypes from "prop-types";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ItemCard;
