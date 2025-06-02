import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  async function handleSignUp() {
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) return alert(signUpError.message);

    // attendre que l'utilisateur soit confirmé (ou appeler le profil plus tard)
    const userId = signUpData?.user?.id;
    if (userId) {
      await supabase.from('profiles').insert({
        id: userId,
        username: username || 'Inconnu',
      });
    }

    alert('Inscription réussie ! Vérifie tes emails.');
  }

  async function handleSignIn() {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return alert(error.message);
    onLogin(); // déclenche le chargement du dashboard
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Connexion ou inscription</h2>
      <input className="border p-2 mb-2 w-full" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input className="border p-2 mb-2 w-full" type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} />
      <input className="border p-2 mb-2 w-full" placeholder="Nom de joueur" value={username} onChange={e => setUsername(e.target.value)} />
      <button className="bg-blue-600 text-white px-4 py-2 mr-2" onClick={handleSignUp}>S’inscrire</button>
      <button className="bg-green-600 text-white px-4 py-2" onClick={handleSignIn}>Se connecter</button>
    </div>
  );
}
