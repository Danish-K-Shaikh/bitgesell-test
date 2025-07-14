import PropTypes from 'prop-types';

export const SkeletonItemsHeader = () => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
    <div className="h-8 bg-white/20 rounded-lg mb-2 animate-pulse"></div>
    <div className="h-4 bg-white/20 rounded-lg mb-4 w-1/2 animate-pulse"></div>
    <div className="flex justify-between items-center">
      <div className="h-4 bg-white/20 rounded-lg w-1/3 animate-pulse"></div>
      <div className="h-4 bg-white/20 rounded-lg w-1/4 animate-pulse"></div>
    </div>
  </div>
);

const ItemsHeader = ({ totalItems, currentPage, totalPages, startIndex, endIndex }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white">
    <h2 className="text-2xl font-bold mb-2">Items</h2>
    <p className="text-sm opacity-90 mb-4">Manage your inventory</p>
    <div className="flex justify-between items-center text-sm">
      <span>Showing {startIndex}-{endIndex} of {totalItems} items</span>
      <span>Page {currentPage} of {totalPages}</span>
    </div>
  </div>
);

export default ItemsHeader;

ItemsHeader.propTypes = {
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
};
