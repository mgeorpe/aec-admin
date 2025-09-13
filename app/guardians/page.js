'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/Header';
import GuardiansTable from '../../components/GuardiansTable';
import GuardianForm from '../../components/GuardianForm';

export default function GuardiansPage() {
  const [guardians, setGuardians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loadErr, setLoadErr] = useState(null);

  useEffect(() => {
    loadGuardians();
  }, []);

  async function loadGuardians() {
    setLoading(true);
    const { data, error } = await supabase
      .from('v_guardians_2_active')
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
          <h2 className="text-lg font-semibold">Active Guardians</h2>
          <button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
            className="bg-[#ffde59] text-[#1c375b] font-semibold px-4 py-2 rounded hover:bg-[#f6ce2e] transition"
          >
            + Add Guardian
          </button>
        </div>

        {loadErr && (
          <div className="bg-red-600/20 border border-red-500/50 text-red-200 px-4 py-2 rounded">
            {loadErr}
          </div>
        )}

        {showForm && (
          <GuardianForm
            mode={editing ? 'edit' : 'create'}
            initial={editing || undefined}
            reloadData={loadGuardians}
            closeForm={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        )}

        {loading ? (
          <div className="opacity-80">Loading…</div>
        ) : (
          <GuardiansTable
            guardians={guardians}
            onEdit={(row) => {
              setEditing(row);
              setShowForm(true);
            }}
            afterChange={loadGuardians}
          />
        )}
      </div>
    </main>
  );
}
