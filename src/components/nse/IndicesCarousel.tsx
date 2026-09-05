"use client";

import { useNSEData } from "@/hooks/use-nse-data";
import { useEffect, useState } from "react";
import SkeletonLoader from "../common/skeleton-loader";

export default function NseCarousel() {
  const [indices, setIndics] = useState([]);

  const { data } = useNSEData({ initialData: [], url: "allIndices", refreshInterval: 10000 });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setIsLoading(!(data && Array.isArray(data.data) && data.data.length > 0));
      setIndics(Array.isArray(data.data) ? data.data : []);
    }
  }, [data]);

  return (
    <div className="overflow-hidden flex space-x-4 overflow-x-auto p-4 bg-white text-gray-900 rounded-lg shadow scrollbar-hide">
      {
        isLoading ?
          <SkeletonLoader count={8} width="200px" height="50px" />
          :
          indices?.map((index) => (
            <div
              key={index.indexSymbol}
              className={`flex flex-col items-center px-4 py-3 rounded-xl shadow-sm hover:shadow-md transition-shadow
            ${index.percentChange >= 0
                  ? "bg-green-50"
                  : "bg-red-50"
                }`}
            >
              <span className="font-semibold text-sm text-gray-700 text-center truncate whitespace-nowrap">
                {index.indexSymbol}
              </span>
              <span className="text-lg font-bold">{index.last}</span>
              <span
                className={`text-sm font-medium whitespace-nowrap ${index.percentChange >= 0 ? "text-green-500" : "text-red-500"
                  }`}
              >
                {index.variation} ({index.percentChange}%)
              </span>
            </div>
          ))
      }
    </div>

  );
};
