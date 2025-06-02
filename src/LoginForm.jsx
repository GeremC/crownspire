import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    const userId = data.user.id;

    // Créer profil si inexistant
    const { data: profile } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (!profile) {
      await supabase.from('profiles').insert({
        id: userId,
        username: 'Inconnu',
        rank: 1,
        level: 1,
        stats: { atk: 1, def: 1, hp: 10 }
      });
    }

    onLogin();
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Connexion</button>
    </form>
  );
}
