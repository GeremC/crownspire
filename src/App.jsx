import AuthSwitcher from './AuthSwitcher';

function App() {
  const [connected, setConnected] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {connected ? <Dashboard /> : <AuthSwitcher onLogin={() => setConnected(true)} />}
    </div>
  );
}
