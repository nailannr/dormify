import React from 'react';
import sustLogo from '../../assets/sust_logo_big.png'

const SustLogo = ({ className = "h-10 w-10" }) => {
  return (
    <div className={`relative ${className}`}>
      <img 
        src= {sustLogo}
        alt="SUST Logo"
        className='w-full h-full object-contain'
      />
    </div>
  );
};

export default SustLogo;
