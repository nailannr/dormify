import React from 'react';

const SustLogo = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className}`}>
      <img 
        src="../assets/sust_logo_big.png" 
        alt="SUST Logo"
        className="h-10 w-10"
      />
    </div>
  );
};

export default SustLogo;
