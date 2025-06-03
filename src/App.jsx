import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';
import Matchmaking from './Matchmaking';

export default function App() {
  const [page, setPage] = useState('welcome');
  const [connected, setConnected] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    supabase.auth.getUser().then(res => {
      const id = res.data?.user?.id;
      if (id) {
        setUserId(id);
        setConnected(true);
      }
    });
  }, []);

  // Fonction de déconnexion
  async function handleLogout() {
    await supabase.auth.signOut();
    setConnected(false);
    setUserId(null);
    setPage('welcome');
  }

  if (connected && userId) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <button
          className="self-end mb-4 px-4 py-2 bg-red-600 text-white rounded"
          onClick={handleLogout}
        >
          Déconnexion
        </button>
        <h2 className="text-3xl font-bold">Bienvenue dans Crownspire</h2>
        <Matchmaking userId={userId} onLogout={handleLogout} />
      </div>
    );
  }

  if (page === 'welcome') {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-6">
        <h1 className="text-3xl font-bold">Bienvenue sur Crownspire</h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white rounded"
          onClick={() => setPage('login')}
        >
          Se connecter
        </button>
        <button
          className="px-6 py-3 bg-green-600 text-white rounded"
          onClick={() => setPage('signup')}
        >
          S'inscrire
        </button>
      </div>
    );
  }

  if (page === 'login') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoginForm onLogin={() => setConnected(true)} onBack={() => setPage('welcome')} />
      </div>
    );
  }

  if (page === 'signup') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <SignUpForm onBack={() => setPage('welcome')} />
      </div>
    );
  }
}