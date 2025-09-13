'use client';

import ConfirmModal from './ConfirmModal';
import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export default function ArchivedLearnersTable({
  learners,
  onUnarchive,
  emptyMessage = 'No archived learners yet.',
}) {
  const [confirming, setConfirming] = useState(null); // learner_code

  async function doUnarchive(code) {
    try {
      const { error } = await supabase
        .from('learners_master')
        .update({ archived_at: null })
        .eq('learner_code', code);
      if (error) throw error;
      toast.success('Learner unarchived');
      onUnarchive?.(code);
    } catch (e) {
      toast.error('Failed to unarchive');
    }
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-[#1d3965]">
          <thead>
            <tr className="bg-[#88c4ef] text-[#1c375b]">
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Code
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Service
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Country
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Start Year
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#f9fbfa]">
            {learners.map((l, idx) => (
              <tr
                key={l.learner_code}
                className={`${
                  idx % 2 === 0 ? 'bg-[#2a4a70]' : 'bg-[#1d3965]'
                } hover:bg-[#8ac0eb]/20`}
              >
                <td className="py-3 px-4 border-b border-[#88c4ef]/20 font-medium">
                  {l.learner_code}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20">
                  {l.learner_name}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20">
                  {l.service}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20">
                  {l.country}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20">
                  {l.start_year}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20">
                  <button
                    onClick={() => setConfirming(l.learner_code)}
                    className="bg-[#4caf50] text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Unarchive
                  </button>
                </td>
              </tr>
            ))}
            {learners.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 px-4 text-center opacity-80">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {confirming && (
        <ConfirmModal
          message="Unarchive this learner?"
          onCancel={() => setConfirming(null)}
          onConfirm={async () => {
            await doUnarchive(confirming);
            setConfirming(null);
          }}
        />
      )}
    </>
  );
}
