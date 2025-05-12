import { useState } from 'react';
import { useAddLog } from '../../hooks/useAddLog/useAddLog';

import './styles.css';

interface LogFormProps {
  onSubmit?: () => void;
}

export function LogForm ({ onSubmit }: Readonly<LogFormProps>) {
  const [jsonInput, setJsonInput] = useState('{"example": "test"}');
  const { error, loading, submit } = useAddLog();

  const handleSubmit= () => {
    submit({ jsonInput, onSuccess: onSubmit });
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonInput(e.target.value);
  }

  return (
    <section className="form-container">
      <h2>Add log</h2>
      <textarea
        className="textarea"
        rows={5}
        cols={50}
        value={jsonInput}
        onChange={handleChange}
      />
      <br />
      <button
        disabled={loading}
        onClick={handleSubmit}
        className="submit-button"
      >
        Send
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </section>
  );
}
