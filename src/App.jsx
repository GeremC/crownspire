import { useState } from 'react';
import Login from './Login';
import Dashboard from './Dashboard';

function App() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {connected ? <Dashboard /> : <Login onLogin={() => setConnected(true)} />}
    </div>
  );
}


export default App;
