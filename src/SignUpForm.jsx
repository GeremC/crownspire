import { useState } from 'react';
import { supabase } from './supabaseClient';

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp(e) {
    e.preventDefault();
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) return alert(error.message);
    alert("Inscription réussie ! Vérifie ton email.");
  }

  return (
    <form onSubmit={handleSignUp} className="flex flex-col gap-3">
      <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Mot de passe" onChange={e => setPassword(e.target.value)} />
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">Créer un compte</button>
    </form>
  );
}
