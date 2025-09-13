'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Header from '../components/Header';
import LearnerForm from '../components/LearnerForm';
import LearnersTable from '../components/LearnersTable';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [learners, setLearners] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // { learner_code, ... } or null

  useEffect(() => {
    loadData();
    loadCountries();
  }, []);

  async function loadData() {
    const { data, error } = await supabase
      .from('learners_master')
      .select('learner_code, learner_name, service, country, start_year')
      .is('archived_at', null)
      .order('learner_code', { ascending: true });

    if (error) {
      console.error(error);
      setLearners([]);
      return;
    }

    // fetch guardian summary
    const { data: gsum, error: gerr } = await supabase
      .from('v_learner_guardian_summary')
      .select('*');

    if (gerr) {
      console.error(gerr);
      setLearners(data || []);
      return;
    }

    const map = new Map(gsum?.map((x) => [x.learner_code, x]) || []);
    const merged = (data || []).map((row) => ({
      ...row,
      guardians_count: map.get(row.learner_code)?.guardians_count || 0,
      primary_guardian: map.get(row.learner_code)?.primary_guardian || null,
    }));

    setLearners(merged);
  }

  async function loadCountries() {
    const { data, error } = await supabase
      .from('countries')
      .select('name')
      .order('name');
    if (!error) setCountries(data || []);
  }

  async function archiveLearner(code) {
    // no window.confirm here – confirmation is handled by the table modal
    const { error } = await supabase
      .from('learners_master')
      .update({ archived_at: new Date().toISOString() })
      .eq('learner_code', code);

    if (error) {
      throw error; // let the caller (table) show the toast error
    }
    await loadData();
  }

  return (
    <main className="min-h-screen bg-[#1c375b] text-[#f9fbfa]">
      <Header />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Section header + Add Learner button aligned (like Guardians) */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Learners</h2>
          <button
            onClick={() => {
              setEditing?.(null);
              setShowForm(true);
            }}
            className="bg-[#ffde59] text-[#1c375b] font-semibold px-4 py-2 rounded hover:bg-[#f6ce2e] transition"
          >
            + Add Learner
          </button>
        </div>

        {showForm && (
          <LearnerForm
            mode={editing ? 'edit' : 'create'}
            initial={editing || undefined}
            countries={countries}
            reloadData={loadData}
            reloadCountries={loadCountries}
            closeForm={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        )}

        <LearnersTable
          learners={learners}
          onEdit={(row) => {
            setEditing(row);
            setShowForm(true);
          }}
          onArchive={(code) => archiveLearner(code)}
        />
      </div>
    </main>
  );
}
