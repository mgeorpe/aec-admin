'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../../lib/supabaseClient';
import Header from '../../../components/Header';
import GuardiansTable from '../../../components/GuardiansTable';
import { Toaster } from 'react-hot-toast';

export default function GuardiansArchivedPage() {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadErr, setLoadErr] = useState(null);

  useEffect(() => {
    loadGuardians();
  }, []);

  async function loadGuardians() {
    setLoading(true);
    const { data, error } = await supabase
      .from('v_guardians_3_archived')
      .select('*');
    if (error) {
      setLoadErr(error.message);
      setGuardians([]);
    } else {
      setLoadErr(null);
      setGuardians(data || []);
    }
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#1c375b] text-[#f9fbfa]">
      <Header />
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Archived Guardians</h2>
          <div />
        </div>

        {loadErr && (
          <div className="bg-red-600/20 border border-red-500/50 text-red-200 px-4 py-2 rounded">
            {loadErr}
          </div>
        )}

        {loading ? (
          <div className="opacity-80">Loading…</div>
        ) : (
          <GuardiansTable
            guardians={guardians}
            afterChange={loadGuardians}
            emptyMessage="No archived guardians yet."
          />
        )}
      </div>
    </main>
  );
}
