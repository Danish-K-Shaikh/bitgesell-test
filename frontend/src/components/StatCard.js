import PropTypes from 'prop-types';
import React from 'react';

export const SkeletonStatCard = () => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
    <div className="h-8 bg-white/20 rounded-lg mb-2 animate-pulse"></div>
    <div className="h-4 bg-white/20 rounded-lg animate-pulse"></div>
  </div>
);

const StatCard = ({ title, value, subtitle }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center text-white">
    <div className="text-3xl font-bold mb-2">{value}</div>
    <div className="text-sm opacity-90">{title}</div>
    {subtitle && <div className="text-xs opacity-75 mt-1">{subtitle}</div>}
  </div>
);

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  subtitle: PropTypes.string,
};

export default StatCard;

