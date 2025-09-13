'use client';

import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export default function GuardianForm({
  mode = 'create',
  initial,
  reloadData,
  closeForm,
}) {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && initial) {
      setForm({
        full_name: initial.full_name || '',
        email: initial.email || '',
        phone: initial.phone || '',
        notes: initial.notes || '',
      });
    }
  }, [mode, initial]);

  function validate() {
    const er = {};
    if (!form.full_name) er.full_name = 'Required';
    if (form.email && !/^\S+@\S+\.\S+$/.test(form.email))
      er.email = 'Invalid email';
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  async function save(e) {
    e.preventDefault();
    if (!validate()) return;
    try {
      if (mode === 'edit') {
        const { error } = await supabase
          .from('guardians')
          .update(form)
          .eq('id', initial.id);
        if (error) throw error;
        toast.success('Guardian updated');
      } else {
        const { error } = await supabase.from('guardians').insert([form]);
        if (error) throw error;
        toast.success('Guardian added');
      }
      await reloadData();
      closeForm();
    } catch (err) {
      console.error(err);
      toast.error('Failed to save guardian');
    }
  }

  return (
    <form
      onSubmit={save}
      className="bg-[#1d3965] text-[#f9fbfa] shadow rounded-lg p-5 border border-[#88c4ef]/30 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {mode === 'edit' ? 'Edit Guardian' : 'New Guardian'}
        </h2>
        <button
          type="button"
          onClick={() => {
            toast('Cancelled — nothing saved', { icon: 'ℹ️' });
            requestAnimationFrame(() => closeForm());
          }}
          className="bg-[#f44336] text-[#f9fbfa] px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Cancel
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm mb-1">Full Name</label>
          <input
            type="text"
            value={form.full_name}
            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
            className={`w-full bg-[#1c375b] text-[#f9fbfa] border rounded px-3 py-2 ${
              errors.full_name ? 'border-[#f44336]' : 'border-[#88c4ef]/30'
            }`}
            placeholder="e.g., Gwen Yu"
          />
          {errors.full_name && (
            <p className="text-xs text-red-400 mt-1">{errors.full_name}</p>
          )}
        </div>

        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full bg-[#1c375b] text-[#f9fbfa] border rounded px-3 py-2 ${
              errors.email ? 'border-[#f44336]' : 'border-[#88c4ef]/30'
            }`}
            placeholder="name@example.com"
          />
          {errors.email && (
            <p className="text-xs text-red-400 mt-1">{errors.email}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Phone</label>
          <input
            type="text"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full bg-[#1c375b] text-[#f9fbfa] border rounded px-3 py-2 border-[#88c4ef]/30"
            placeholder="+63 ..."
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm mb-1">Notes</label>
          <textarea
            rows={3}
            value={form.notes}
            onChange={(e) => setForm({ ...form, notes: e.target.value })}
            className="w-full bg-[#1c375b] text-[#f9fbfa] border rounded px-3 py-2 border-[#88c4ef]/30"
            placeholder="Any extra context"
          />
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="bg-[#ffde59] text-[#1c375b] font-semibold px-4 py-2 rounded hover:bg-[#f6ce2e] transition"
        >
          {mode === 'edit' ? 'Update Guardian' : 'Save Guardian'}
        </button>
      </div>
    </form>
  );
}
