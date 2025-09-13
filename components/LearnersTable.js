import { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmModal from './ConfirmModal';

export default function LearnersTable({ learners, onEdit, onArchive }) {
  const [confirming, setConfirming] = useState(null); // store learner_code

  const handleConfirm = async () => {
    const code = confirming;
    setConfirming(null);
    try {
      await onArchive(code);
      toast.success('Learner archived successfully!');
    } catch (err) {
      console.error(err);
      toast.error('Failed to archive learner.');
    }
  };

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
                <td className="py-3 px-4 border-b border-[#88c4ef]/20 flex gap-2">
                  <button
                    onClick={() => onEdit(l)}
                    className="bg-[#ffde59] text-[#1c375b] px-3 py-1 rounded hover:bg-[#f6ce2e] transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setConfirming(l.learner_code)}
                    className="bg-[#f44336] text-white px-3 py-1 rounded hover:bg-red-600 transition"
                  >
                    Archive
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {confirming && (
        <ConfirmModal
          message="Archive this learner?"
          onConfirm={handleConfirm}
          onCancel={() => setConfirming(null)}
        />
      )}
    </>
  );
}
