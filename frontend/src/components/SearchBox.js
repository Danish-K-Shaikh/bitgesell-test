
const SearchBox = ({ onSearchChange }) => (
  <div className="relative mb-6">
    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/70 w-5 h-5" />
    <input
      type="text"
      placeholder="Search items..."
      
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full pl-12 pr-4 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-white/50 transition-all duration-200"
    />
  </div>
);
SearchBox.propTypes = {
    
    onSearchChange: PropTypes.func.isRequired,
    };
export default SearchBox;

import PropTypes from 'prop-types';
import { Search } from 'lucide-react';