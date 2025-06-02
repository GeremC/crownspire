import { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) console.error(error);
      else setProfile(data);
    }

    fetchProfile();
  }, []);

  if (!profile) return <p>Chargement du profil...</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Bienvenue, {profile.username}</h2>
      <p><strong>Rang :</strong> {profile.rank}</p>
      <p><strong>Niveau :</strong> {profile.level}</p>
      <p><strong>Stats :</strong> {JSON.stringify(profile.stats)}</p>
    </div>
  );
}
