import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function SignUpForm({ onBack }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  async function handleSignUp(e) {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { username }
      }
    });
    if (error) return alert(error.message);

    alert("Inscription réussie ! Vérifie ton email.");
    onBack();
  }

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow">
      <button className="mb-4 text-blue-600 underline" onClick={onBack}>
        ← Retour
      </button>
      <form onSubmit={handleSignUp} className="flex flex-col gap-3">
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} required />
        <input type="text" placeholder="Nom d'utilisateur" onChange={e => setUsername(e.target.value)} required />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">S'inscrire</button>
      </form>
    </div>
  );
}
