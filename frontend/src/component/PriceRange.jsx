import React, { useState, useEffect, useRef } from 'react';

const PriceRangeSlider = ({ 
  onPriceChange, 
  initialMin = 50000, 
  initialMax = 1800000, 
  minLimit = 0, 
  maxLimit = 10000000 
}) => {
  const [minPrice, setMinPrice] = useState(initialMin);
  const [maxPrice, setMaxPrice] = useState(initialMax);
  const minInputRef = useRef(null);
  const maxInputRef = useRef(null);
  const rangeRef = useRef(null);

  // Format price to appropriate unit (thousands, lakhs, crores)
  const formatPrice = (price) => {
    if (price >= 10000000) { // 1 crore or more
      return `₹${(price / 10000000).toFixed(2)}Cr`;
    } else if (price >= 100000) { // 1 lakh or more
      return `₹${(price / 100000).toFixed(2)}L`;
    } else if (price >= 1000) { // 1 thousand or more
      return `₹${(price / 1000).toFixed(0)}K`;
    }
    return `₹${price}`;
  };

  // Update range progress bar
  useEffect(() => {
    if (rangeRef.current) {
      const minPercent = ((minPrice - minLimit) / (maxLimit - minLimit)) * 100;
      const maxPercent = ((maxPrice - minLimit) / (maxLimit - minLimit)) * 100;
      
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
    
    // Notify parent component
    onPriceChange({ min: minPrice, max: maxPrice });
  }, [minPrice, maxPrice, minLimit, maxLimit, onPriceChange]);

  // Handle min price change
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice - 1);
    setMinPrice(value);
  };

  // Handle max price change
  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice + 1);
    setMaxPrice(value);
  };

  return (
    <div className="w-full bg-[#f9f3e6] p-4 rounded-md shadow-sm border border-gray-200">
      <div className="flex justify-between mb-4">
        <div className="border rounded-md bg-white p-2 w-2/5">
          <span className="text-gray-700 font-medium">Min: </span>
          <span className="font-bold">{formatPrice(minPrice)}</span>
        </div>
        <div className="border rounded-md bg-white p-2 w-2/5">
          <span className="text-gray-700 font-medium">Max: </span>
          <span className="font-bold">{formatPrice(maxPrice)}</span>
        </div>
      </div>
      
      <div className="relative mt-6 mb-8">
        <div className="relative h-1">
          {/* Background track */}
          <div className="slider-track absolute w-full h-1 bg-gray-300 rounded"></div>
          
          {/* Selected range */}
          <div 
            ref={rangeRef}
            className="slider-range absolute h-1 bg-blue-600 rounded"
          ></div>
          
          {/* Min thumb slider */}
          <input
            ref={minInputRef}
            type="range"
            min={minLimit}
            max={maxLimit}
            value={minPrice}
            onChange={handleMinChange}
            className="thumb absolute h-0 w-full outline-none z-10"
            style={{
              WebkitAppearance: 'none',
              appearance: 'none',
              pointerEvents: 'none',
              zIndex: 3,
            }}
          />
          
          {/* Max thumb slider */}
          <input
            ref={maxInputRef}
            type="range"
            min={minLimit}
            max={maxLimit}
            value={maxPrice}
            onChange={handleMaxChange}
            className="thumb absolute h-0 w-full outline-none z-10"
            style={{
              WebkitAppearance: 'none',
              appearance: 'none',
              pointerEvents: 'none',
              zIndex: 4,
            }}
          />
          
          {/* Custom min thumb */}
          <div 
            className="absolute w-5 h-5 bg-white border-2 border-blue-600 rounded-full cursor-pointer -mt-2 hover:bg-blue-50"
            style={{ 
              left: `calc(${((minPrice - minLimit) / (maxLimit - minLimit)) * 100}% - 10px)`,
              zIndex: 5,
              pointerEvents: 'auto'
            }}
            onMouseDown={() => {
              if (minInputRef.current) {
                minInputRef.current.style.pointerEvents = 'auto';
                minInputRef.current.focus();
              }
            }}
            onMouseUp={() => {
              if (minInputRef.current) {
                minInputRef.current.style.pointerEvents = 'none';
              }
            }}
          ></div>
          
          {/* Custom max thumb */}
          <div 
            className="absolute w-5 h-5 bg-white border-2 border-blue-600 rounded-full cursor-pointer -mt-2 hover:bg-blue-50"
            style={{ 
              left: `calc(${((maxPrice - minLimit) / (maxLimit - minLimit)) * 100}% - 10px)`,
              zIndex: 6,
              pointerEvents: 'auto'
            }}
            onMouseDown={() => {
              if (maxInputRef.current) {
                maxInputRef.current.style.pointerEvents = 'auto';
                maxInputRef.current.focus();
              }
            }}
            onMouseUp={() => {
              if (maxInputRef.current) {
                maxInputRef.current.style.pointerEvents = 'none';
              }
            }}
          ></div>
        </div>
      </div>
      
      {/* Price range labels */}
      <div className="flex justify-between px-1 mt-4 text-xs text-gray-600">
        <span>{formatPrice(minLimit)}</span>
        <span>{formatPrice(maxLimit * 0.25)}</span>
        <span>{formatPrice(maxLimit * 0.5)}</span>
        <span>{formatPrice(maxLimit * 0.75)}</span>
        <span>{formatPrice(maxLimit)}</span>
      </div>
      
      {/* Optional: Add manual input fields */}
      <div className="flex justify-between mt-6">
        <div className="w-2/5">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice - 1))}
            className="w-full p-2 border rounded"
            min={minLimit}
            max={maxPrice - 1}
          />
        </div>
        <div className="w-2/5">
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice + 1))}
            className="w-full p-2 border rounded"
            min={minPrice + 1}
            max={maxLimit}
          />
        </div>
      </div>
    </div>
  );
};

export default PriceRangeSlider;