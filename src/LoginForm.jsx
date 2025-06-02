import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function LoginForm({ onLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    // Gestion du profil comme avant...

    onLogin();
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <button className="mb-4 text-blue-600 underline" onClick={onBack}>
        ← Retour
      </button>
      <form onSubmit={handleLogin} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Se connecter</button>
      </form>
    </div>
  );
}
