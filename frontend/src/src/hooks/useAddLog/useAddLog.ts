import { useState } from 'react';
import { apiUrl } from "../../constants/api.ts";

interface AppLogParams {
  jsonInput: string;
  onSuccess?: () => void;
  onError?: () => void;
}

export function useAddLog() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<null | string>(null);

  const submit = async ({ jsonInput, onSuccess, onError }: Readonly<AppLogParams>) => {
    setLoading(true);

    try {
      const parsed = JSON.parse(jsonInput);
      await fetch(`${apiUrl}/log`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed),
      });
      setLoading(false);
      setError(null);
      onSuccess?.();
    } catch (e) {
      console.error(e);
      setLoading(false);
      setError('Incorrect JSON');
      onError?.();
    }
  };

  return {
    loading,
    error,
    submit,
  }
}
