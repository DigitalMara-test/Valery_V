import { useEffect } from 'react';

import { useGetLogs } from './src/hooks/useGetLogs/useGetLogs';
import { Logs}  from './src/components/Logs/Logs';
import { LogForm } from './src/components/LogForm/LogForm';

import './App.css'


function App() {
  const { loading, data, refetch } = useGetLogs();

  useEffect(() => {
    refetch();
  }, []);

  const onSubmitSuccess = async () => {
    refetch();
  }

  return (
    <>
      <h1>Log Viewer</h1>
      <LogForm onSubmit={onSubmitSuccess} />
      {loading ? <div>Loading...</div> : (
        <Logs logs={data} />
      )}
    </>
  )
}

export default App
