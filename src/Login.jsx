import React, { useState } from 'react';
import { supabase } from './supabaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function signUp() {
    const { user, error } = await supabase.auth.signUp({ email, password });
    if (error) alert(error.message);
    else alert('Mail de confirmation envoyé !');
  }

  async function signIn() {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) alert(error.message);
    else alert('Connecté !');
  }

  return (
    <div>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Mot de passe" />
      <button onClick={signUp}>S’inscrire</button>
      <button onClick={signIn}>Se connecter</button>
    </div>
  );
}
