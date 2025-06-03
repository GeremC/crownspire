import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function LoginForm({ onLogin, onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);

    const user = data?.user;
    if (!user) {
      alert("Utilisateur non trouvé.");
      return;
    }

    // Vérifie si le profil existe déjà
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (!profile) {
      // Récupère le username depuis les metadata, sinon fallback sur l'email
      const username =
        user.user_metadata?.username ||
        user.email.split('@')[0];

      await supabase.from('profiles').insert({
        id: user.id,
        username,
        elo: 1000,
        level: 1,
        experience: 0,
        stats: { atk: 1, def: 1, hp: 10 },
        equipment: {},
        created_at: new Date().toISOString()
      });
    }

    alert("Connexion réussie !");
    if (onLogin) onLogin(user); // Passe bien l'objet user ici
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-3 max-w-md mx-auto p-6 bg-white rounded shadow">
      <button type="button" className="mb-4 text-blue-600 underline" onClick={onBack}>
        ← Retour
      </button>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Mot de passe"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Se connecter
      </button>
    </form>
  );
}