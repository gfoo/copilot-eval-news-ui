import { useState } from 'react';
import axios from 'axios';

export default function App() {
  const [name, setName] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendHello = async () => {
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await axios.get('/api/hello', { params: { name } });
      const msg =
        (res.data && (res.data.message ?? res.data.msg ?? res.data.greeting)) ??
        JSON.stringify(res.data);
      setMessage(msg);
    } catch (e: unknown) {
      const err = axios.isAxiosError(e)
        ? (e.response?.data?.message as string) ?? e.message
        : 'Erreur inattendue';
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: 24, maxWidth: 520 }}>
      <h1>Hello API</h1>
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          type="text"
          placeholder="Entrez un nom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ flex: 1, padding: 8 }}
        />
        <button onClick={sendHello} disabled={!name || loading}>
          {loading ? 'Envoi...' : 'Dire bonjour'}
        </button>
      </div>

      {message && (
        <p style={{ marginTop: 16 }}>
          Réponse: <strong>{message}</strong>
        </p>
      )}
      {error && (
        <p style={{ marginTop: 16, color: 'crimson' }}>
          Erreur: {error}
        </p>
      )}
    </div>
  );
}
