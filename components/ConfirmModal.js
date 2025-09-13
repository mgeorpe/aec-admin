'use client';

export default function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#1d3965] border border-[#88c4ef]/40 rounded p-5 w-full max-w-md">
        <p className="mb-4">{message}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-[#2a4a70] hover:bg-[#345780]"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-[#ffde59] text-[#1c375b] font-semibold hover:bg-[#f6ce2e]"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}
