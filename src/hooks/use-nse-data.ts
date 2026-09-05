import { useEffect, useState } from "react";

interface UseNSEDataOptions<T> {
  url: string; 
  initialData?: T;
  refreshInterval?: number;
}

export function useNSEData<T = unknown>({
  url,
  initialData,
  refreshInterval,
}: UseNSEDataOptions<T>) {
  const [data, setData] = useState<T | null>(initialData || null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/nse/${url}`, { cache: "no-store" });
      if (!res.ok) throw new Error(`Failed with status ${res.status}`);

      const json = await res.json();
      setData(json);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isMounted = true;
    fetchData();

    let intervalId: NodeJS.Timeout | null = null;
    if (refreshInterval) {
      intervalId = setInterval(() => {
        if (isMounted) fetchData();
      }, refreshInterval);
    }

    return () => {
      isMounted = false;
      if (intervalId) clearInterval(intervalId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url, refreshInterval]);

  return { data, loading, error, refetch: fetchData };
}
