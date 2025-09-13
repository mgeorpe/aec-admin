'use client';

import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';
import ManageGuardianLearnersModal from './ManageGuardianLearnersModal';

export default function GuardiansTable({
  guardians,
  onEdit,
  afterChange,
  emptyMessage = 'No guardians yet.',
}) {
  const [confirming, setConfirming] = useState(null); // {id, mode:'archive'|'unarchive'|'delete'}
  const [manageFor, setManageFor] = useState(null); // guardian object for linking modal

  async function doArchive(id) {
    const { error } = await supabase
      .from('guardians')
      .update({ archived_at: new Date().toISOString() })
      .eq('id', id);
    if (error) throw error;
    toast.success('Guardian archived');
    afterChange?.();
  }
  async function doUnarchive(id) {
    const { error } = await supabase
      .from('guardians')
      .update({ archived_at: null })
      .eq('id', id);
    if (error) throw error;
    toast.success('Guardian unarchived');
    afterChange?.();
  }
  async function doDelete(id) {
    const { error } = await supabase.from('guardians').delete().eq('id', id);
    if (error) {
      toast.error('Cannot delete: guardian may be linked');
      throw error;
    }
    toast.success('Guardian deleted');
    afterChange?.();
  }

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-[#1d3965]">
          <thead>
            <tr className="bg-[#88c4ef] text-[#1c375b]">
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Name
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Email
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Phone
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Notes
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-left text-sm font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="text-sm text-[#f9fbfa]">
            {guardians.map((g, idx) => (
              <tr
                key={g.id}
                className={`${
                  idx % 2 === 0 ? 'bg-[#2a4a70]' : 'bg-[#1d3965]'
                } hover:bg-[#8ac0eb]/20`}
              >
                <td className="py-3 px-4 border-b border-[#88c4ef]/20 font-medium">
                  {g.full_name}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20">
                  {g.email || '—'}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20">
                  {g.phone || '—'}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20 truncate max-w-[20rem]">
                  {g.notes || '—'}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20">
                  {g.archived_at ? 'Archived' : 'Active'}
                </td>
                <td className="py-3 px-4 border-b border-[#88c4ef]/20">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onEdit?.(g)}
                      className="bg-[#ffde59] text-[#1c375b] px-3 py-1 rounded hover:bg-[#f6ce2e]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setManageFor(g)}
                      className="bg-[#2a4a70] text-white px-3 py-1 rounded hover:bg-[#345780]"
                    >
                      Manage Learners
                    </button>
                    {g.archived_at ? (
                      <button
                        onClick={() =>
                          setConfirming({ id: g.id, mode: 'unarchive' })
                        }
                        className="bg-[#4caf50] text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Unarchive
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          setConfirming({ id: g.id, mode: 'archive' })
                        }
                        className="bg-[#f57c00] text-white px-3 py-1 rounded hover:bg-orange-600"
                      >
                        Archive
                      </button>
                    )}
                    <button
                      onClick={() =>
                        setConfirming({ id: g.id, mode: 'delete' })
                      }
                      className="bg-[#f44336] text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {guardians.length === 0 && (
              <tr>
                <td colSpan={6} className="py-6 px-4 text-center opacity-80">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Archive/Unarchive/Delete confirm */}
      {confirming && (
        <ConfirmModal
          message={
            confirming.mode === 'archive'
              ? 'Archive this guardian?'
              : confirming.mode === 'unarchive'
              ? 'Unarchive this guardian?'
              : 'Delete this guardian? (Blocked if linked)'
          }
          onCancel={() => setConfirming(null)}
          onConfirm={async () => {
            try {
              if (confirming.mode === 'archive') await doArchive(confirming.id);
              if (confirming.mode === 'unarchive')
                await doUnarchive(confirming.id);
              if (confirming.mode === 'delete') await doDelete(confirming.id);
            } catch (_) {}
            setConfirming(null);
          }}
        />
      )}

      {/* Manage linked learners */}
      {manageFor && (
        <ManageGuardianLearnersModal
          guardian={manageFor}
          onClose={() => setManageFor(null)}
        />
      )}
    </>
  );
}
