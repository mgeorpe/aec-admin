'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import Header from '../../components/Header';
import ArchivedLearnersTable from '../../components/ArchivedLearnersTable';

export default function ArchivedPage() {
  const [learners, setLearners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArchived();
  }, []);

  async function loadArchived() {
    setLoading(true);
    const { data, error } = await supabase
      .from('learners_master')
      .select(
        'learner_code, learner_name, service, country, start_year, archived_at'
      )
      .not('archived_at', 'is', null)
      .order('archived_at', { ascending: false });
    if (!error) setLearners(data || []);
    setLoading(false);
  }

  async function unarchiveLearner(code) {
    const { error } = await supabase
      .from('learners_master')
      .update({ archived_at: null })
      .eq('learner_code', code);
    if (error) throw error;
    await loadArchived();
  }

  return (
    <main className="min-h-screen bg-[#1c375b] text-[#f9fbfa]">
      <Header />
      <div className="p-6 max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Archived Learners</h2>
          {/* No add button here */}
          <div />
        </div>

        {loading ? (
          <div className="opacity-80">Loading…</div>
        ) : (
          <ArchivedLearnersTable
            learners={learners}
            onUnarchive={loadArchived}
            emptyMessage="No archived learners yet."
          />
        )}
      </div>
    </main>
  );
}
