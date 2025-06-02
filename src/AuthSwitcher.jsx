import { useState } from 'react';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpForm';

export default function AuthSwitcher({ onLogin }) {
  const [mode, setMode] = useState('login'); // 'login' ou 'signup'

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl">
      <div className="flex justify-center gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('login')}
        >
          Se connecter
        </button>
        <button
          className={`px-4 py-2 rounded ${mode === 'signup' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setMode('signup')}
        >
          S'inscrire
        </button>
      </div>

      {mode === 'login' ? (
        <LoginForm onLogin={onLogin} />
      ) : (
        <SignUpForm />
      )}
    </div>
  );
}
