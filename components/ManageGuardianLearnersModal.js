'use client';

import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export default function ManageGuardianLearnersModal({ guardian, onClose }) {
  const [links, setLinks] = useState([]); // {learner_code, learner_name, is_primary}
  const [learners, setLearners] = useState([]); // active learners to choose from
  const [pick, setPick] = useState('');

  useEffect(() => {
    load();
  }, [guardian?.id]);

  async function load() {
    if (!guardian?.id) return;
    // current links
    const { data: cur } = await supabase
      .from('learners_guardians')
      .select('learner_code, is_primary, learners_master ( learner_name )')
      .eq('guardian_id', guardian.id);
    setLinks(
      (cur || []).map((x) => ({
        learner_code: x.learner_code,
        learner_name: x.learners_master?.learner_name || '',
        is_primary: x.is_primary,
      }))
    );

    // active learners to pick
    const { data: act } = await supabase
      .from('v_learners_2_active')
      .select('learner_code, learner_name')
      .order('learner_name');
    setLearners(act || []);
  }

  async function linkSelected() {
    const code = Number(pick);
    if (!code) {
      toast.error('Select a learner');
      return;
    }
    const { error } = await supabase
      .from('learners_guardians')
      .insert([
        { learner_code: code, guardian_id: guardian.id, is_primary: false },
      ]);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Linked');
    setPick('');
    await load();
  }

  async function unlink(code) {
    const { error } = await supabase
      .from('learners_guardians')
      .delete()
      .eq('learner_code', code)
      .eq('guardian_id', guardian.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Unlinked');
    await load();
  }

  async function setPrimary(code) {
    // mark selected as primary; DB has unique index per learner, so others must be false
    const { error: e1 } = await supabase
      .from('learners_guardians')
      .update({ is_primary: false })
      .eq('guardian_id', guardian.id); // only for this guardian
    if (e1) {
      toast.error(e1.message);
      return;
    }

    const { error: e2 } = await supabase
      .from('learners_guardians')
      .update({ is_primary: true })
      .eq('guardian_id', guardian.id)
      .eq('learner_code', code);
    if (e2) {
      toast.error(e2.message);
      return;
    }

    toast.success('Primary updated');
    await load();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#1d3965] border border-[#88c4ef]/40 rounded p-5 w-full max-w-2xl">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">
            Manage Learners — {guardian.full_name}
          </h3>
          <button
            onClick={onClose}
            className="px-3 py-1 rounded bg-[#2a4a70] hover:bg-[#345780]"
          >
            Close
          </button>
        </div>

        {/* Add link */}
        <div className="flex gap-2 mb-4">
          <select
            value={pick}
            onChange={(e) => setPick(e.target.value)}
            className="flex-1 bg-[#1c375b] border border-[#88c4ef]/30 rounded px-3 py-2"
          >
            <option value="">Select learner…</option>
            {learners.map((l) => (
              <option key={l.learner_code} value={l.learner_code}>
                {l.learner_name} (#{l.learner_code})
              </option>
            ))}
          </select>
          <button
            onClick={linkSelected}
            className="bg-[#ffde59] text-[#1c375b] px-4 py-2 rounded hover:bg-[#f6ce2e]"
          >
            Link
          </button>
        </div>

        {/* Current links */}
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full bg-[#1d3965]">
            <thead>
              <tr className="bg-[#88c4ef] text-[#1c375b]">
                <th className="py-2 px-3 text-left">Learner</th>
                <th className="py-2 px-3 text-left">Primary</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm text-[#f9fbfa]">
              {links.map((x, idx) => (
                <tr
                  key={x.learner_code}
                  className={`${
                    idx % 2 === 0 ? 'bg-[#2a4a70]' : 'bg-[#1d3965]'
                  }`}
                >
                  <td className="py-2 px-3">
                    {x.learner_name} (#{x.learner_code})
                  </td>
                  <td className="py-2 px-3">
                    <input
                      type="radio"
                      name="primary"
                      checked={!!x.is_primary}
                      onChange={() => setPrimary(x.learner_code)}
                    />
                  </td>
                  <td className="py-2 px-3">
                    <button
                      onClick={() => unlink(x.learner_code)}
                      className="bg-[#f44336] text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {links.length === 0 && (
                <tr>
                  <td colSpan={3} className="py-4 px-3 opacity-80">
                    No linked learners yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
