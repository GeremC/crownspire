// Exemple à placer dans LoginForm.jsx (ou équivalent)
import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function LoginForm({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    const user = data.user;
    if (!user) return;

    // Vérifie si le profil existe déjà
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile) {
      // Crée le profil si inexistant
      await supabase.from('profiles').insert({
        id: user.id,
        username: user.email.split('@')[0],
        rank: 1,
        level: 1,
        experience: 0,
        stats: { atk: 1, def: 1, hp: 10 },
        equipment: {},
        created_at: new Date().toISOString()
      });
    }

    alert("Connexion réussie !");
    // Redirige ou autre logique ici
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Se connecter</button>
    </form>
  );
}