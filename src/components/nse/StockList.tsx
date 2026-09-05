import { useEffect, useRef, useState } from "react";
import { useNSEData } from "@/hooks/use-nse-data";
import SkeletonLoader from "../common/skeleton-loader";

export default function NseTicker() {
  const { data } = useNSEData({ initialData: { data: [] }, url: "getMarqueData", refreshInterval: 10000 });
  const [isLoading, setIsLoading] = useState(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setIsLoading(!(data && data.data.length > 0));
  }, [data]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animation: number;
    let pos = 0;

    const step = () => {
      pos -= 1;
      if (Math.abs(pos) >= el.scrollWidth / 2) {
        pos = 0;
      }
      el.style.transform = `translateX(${pos}px)`;
      animation = requestAnimationFrame(step);
    };

    animation = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animation);
  }, []);

  return (
    <div className="overflow-hidden bg-white text-gray py-2">
      <div
        ref={scrollRef}
        className="flex whitespace-nowrap space-x-8"
        style={{ willChange: "transform" }}
      >
        {
          isLoading ? (<SkeletonLoader count={8} height="30px" width="200px" />)
            :
            [...data.data, ...data.data].map((stock, i) => (
              <div key={i} className="flex items-center bg-gray space-x-2 text-sm">
                <span className="font-semibold">{stock.symbol}</span>
                <span>{stock.lastTradedPrice}</span>
                <span
                  className={
                    stock.change >= 0 ? "text-green-400" : "text-red-400"
                  }
                >
                  {stock.perChange}%
                </span>
              </div>
            ))
        }
      </div>
    </div>
  );
}
