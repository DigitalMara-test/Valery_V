import { useState } from 'react';
import { apiUrl } from '../../constants/api';

export function useGetLogs() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [data, setData] = useState([]);

  const fetchLogs = async () => {
    setLoading(true);

    try {
      const res = await fetch(`${apiUrl}/log`);
      const data = await res.json();

      setLoading(false);
      setData(data)
    } catch (err) {
      console.error(err);
      setLoading(false);
      setError('Failed to fetch logs');
    }
  };

  return {
    loading,
    error,
    data,
    refetch: fetchLogs,
  }
}