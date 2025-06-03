import { useState, useEffect } from 'react';
import { supabase } from './supabaseClient';

export default function Matchmaking({ userId }) {
  const [searching, setSearching] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [status, setStatus] = useState('');
  const [range, setRange] = useState(50); // élargissement progressif

  useEffect(() => {
    if (!searching) return;

    const interval = setInterval(() => {
      setRange(prev => prev + 25); // élargir la recherche
      searchForOpponent();
    }, 2000); // toutes les 2s

    return () => clearInterval(interval);
  }, [searching]);

  async function searchForOpponent() {
    const { data: me, error } = await supabase
      .from('profiles')
      .select('elo')
      .eq('id', userId)
      .single();

    if (error || !me) {
      setStatus("Erreur récupération profil");
      setSearching(false);
      return;
    }

    const elo = me.elo;

    const { data: opponents } = await supabase
      .from('profiles')
      .select('id, username, elo')
      .neq('id', userId)
      .gte('elo', elo - range)
      .lte('elo', elo + range)
      .limit(1);

    if (opponents && opponents.length > 0) {
      setOpponent(opponents[0]);
      setStatus("Match trouvé !");
      setSearching(false);
    } else {
      setStatus(`Recherche dans une plage de ±${range} ELO...`);
    }
  }

  return (
    <div className="flex flex-col items-center gap-4">
      {!searching && !opponent && (
        <button
          className="px-8 py-4 bg-purple-600 text-white rounded text-xl"
          onClick={() => {
            setRange(50);
            setStatus('Recherche lancée...');
            setSearching(true);
          }}
        >
          Trouver une partie
        </button>
      )}

      {searching && (
        <button
          className="px-6 py-2 bg-red-600 text-white rounded"
          onClick={() => {
            setSearching(false);
            setStatus('Recherche arrêtée.');
          }}
        >
          Arrêter la recherche
        </button>
      )}

      {status && <p className="text-lg">{status}</p>}

      {opponent && (
        <div className="text-center border p-4 rounded shadow bg-white">
          <p className="font-bold text-lg">Match trouvé !</p>
          <p>Adversaire : {opponent.username}</p>
          <p>ELO : {opponent.elo}</p>
        </div>
      )}
    </div>
  );
}
