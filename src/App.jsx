import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <p style={{ color: 'red', fontWeight: 'bold' }}>
        ✅ TEST : Ceci est un texte de test pour vérifier le déploiement
      </p>
      {connected ? <Dashboard /> : <Login onLogin={() => setConnected(true)} />}
    </div>
  );
}


export default App;
