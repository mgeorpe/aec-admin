'use client';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import toast from 'react-hot-toast';

export default function LearnerForm({
  mode = 'create',
  initial,
  countries,
  reloadData,
  reloadCountries,
  closeForm,
}) {
  const [form, setForm] = useState({
    learner_code: '',
    learner_name: '',
    service: 'TF',
    country: '',
    start_year: '',
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mode === 'edit' && initial) {
      setForm(initial);
    }
  }, [mode, initial]);

  function handleKeyDown(e) {
    if (e.key === 'Enter') e.preventDefault();
  }

  function validate() {
    const er = {};
    if (!form.learner_code) er.learner_code = 'Required';
    if (!form.learner_name) er.learner_name = 'Required';
    if (!form.service) er.service = 'Required';
    if (!form.country) er.country = 'Required';
    if (!form.start_year) er.start_year = 'Required';
    setErrors(er);
    return Object.keys(er).length === 0;
  }

  async function addCountry(name) {
    const trimmed = (name || '').trim();
    if (trimmed.length < 3 || !/^[A-Za-z ]+$/.test(trimmed)) {
      toast.error('Enter a valid country name (letters/spaces, ≥3 chars).');
      return;
    }

    const { data: ref, error: refErr } = await supabase
      .from('country_reference')
      .select('name')
      .eq('name', trimmed)
      .limit(1);
    if (refErr) {
      toast.error(refErr.message);
      return;
    }
    if (!ref || ref.length === 0) {
      toast.error('Not a recognized country. Please check the spelling.');
      return;
    }

    const { data: exists } = await supabase
      .from('countries')
      .select('name')
      .eq('name', trimmed)
      .limit(1);

    if (!exists || exists.length === 0) {
      const code = trimmed.slice(0, 2).toUpperCase();
      const { error: insErr } = await supabase
        .from('countries')
        .insert([{ code, name: trimmed }]);
      if (insErr) {
        toast.error(insErr.message);
        return;
      }
    }

    await reloadCountries();
    toast.success('Country added');
  }

  async function save(e) {
    e.preventDefault();
    if (!validate()) return;

    const payload = {
      ...form,
      learner_code: Number(form.learner_code),
      start_year: Number(form.start_year),
    };

    try {
      if (mode === 'edit') {
        const { error } = await supabase
          .from('learners_master')
          .update(payload)
          .eq('learner_code', payload.learner_code);
        if (error) throw error;
        toast.success('Learner updated successfully!');
      } else {
        const { error } = await supabase
          .from('learners_master')
          .insert([payload]);
        if (error) throw error;
        toast.success('Learner saved successfully!');
      }

      await reloadData();
      closeForm();
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Error saving learner');
    }
  }

  return (
    <form
      autoComplete="off"
      onSubmit={save}
      onKeyDown={handleKeyDown}
      className="bg-[#1d3965] text-[#f9fbfa] shadow rounded-lg p-5 border border-[#88c4ef]/30 space-y-4"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">
          {mode === 'edit' ? 'Edit Learner' : 'New Learner'}
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
        {/* Learner Code */}
        <div>
          <label className="block text-sm mb-1">Learner Code</label>
          <input
            type="number"
            value={form.learner_code}
            onChange={(e) => setForm({ ...form, learner_code: e.target.value })}
            disabled={mode === 'edit'}
            className={`w-full bg-[#1c375b] text-[#f9fbfa] placeholder-[#dbe5f5]/70 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#88c4ef] ${
              errors.learner_code ? 'border-[#f44336]' : 'border-[#88c4ef]/30'
            }`}
            placeholder="e.g., 77"
          />
          {errors.learner_code && (
            <p className="text-xs text-red-400 mt-1">{errors.learner_code}</p>
          )}
        </div>

        {/* Learner Name */}
        <div>
          <label className="block text-sm mb-1">Learner Name</label>
          <input
            type="text"
            value={form.learner_name}
            onChange={(e) => setForm({ ...form, learner_name: e.target.value })}
            className={`w-full bg-[#1c375b] text-[#f9fbfa] placeholder-[#dbe5f5]/70 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#88c4ef] ${
              errors.learner_name ? 'border-[#f44336]' : 'border-[#88c4ef]/30'
            }`}
            placeholder="Full name"
          />
          {errors.learner_name && (
            <p className="text-xs text-red-400 mt-1">{errors.learner_name}</p>
          )}
        </div>

        {/* Service */}
        <div>
          <label className="block text-sm mb-1">Service</label>
          <select
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className={`w-full bg-[#1c375b] text-[#f9fbfa] border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#88c4ef] ${
              errors.service ? 'border-[#f44336]' : 'border-[#88c4ef]/30'
            }`}
          >
            <option value="TF">TF — Training Facilitation</option>
            <option value="CD">CD — Curriculum Development</option>
            <option value="PW">PW — (placeholder)</option>
          </select>
          {errors.service && (
            <p className="text-xs text-red-400 mt-1">{errors.service}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm mb-1">Country</label>
          <div className="flex gap-2">
            <input
              id="aecCountryCustom"
              name="aecCountryCustom"
              list="countries"
              type="text"
              autoComplete="off"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              onBlur={(e) =>
                setForm({ ...form, country: e.target.value.trim() })
              }
              className={`flex-1 bg-[#1c375b] text-[#f9fbfa] placeholder-[#dbe5f5]/70 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#88c4ef] ${
                errors.country ? 'border-[#f44336]' : 'border-[#88c4ef]/30'
              }`}
              placeholder="Start typing or choose…"
            />
            {!countries.some((c) => c.name === form.country) &&
              form.country?.trim() && (
                <button
                  type="button"
                  onClick={() => addCountry(form.country)}
                  className="bg-[#ffde59] text-[#1c375b] px-3 py-2 rounded hover:bg-[#f6ce2e] transition"
                >
                  Add
                </button>
              )}
          </div>

          <datalist id="countries">
            {countries.map((c) => (
              <option key={c.name} value={c.name} />
            ))}
          </datalist>

          {errors.country && (
            <p className="text-xs text-red-400 mt-1">{errors.country}</p>
          )}
        </div>

        {/* Start Year */}
        <div>
          <label className="block text-sm mb-1">Start Year</label>
          <input
            type="number"
            value={form.start_year}
            onChange={(e) => setForm({ ...form, start_year: e.target.value })}
            className={`w-full bg-[#1c375b] text-[#f9fbfa] placeholder-[#dbe5f5]/70 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#88c4ef] ${
              errors.start_year ? 'border-[#f44336]' : 'border-[#88c4ef]/30'
            }`}
            placeholder="e.g., 2025"
          />
          {errors.start_year && (
            <p className="text-xs text-red-400 mt-1">{errors.start_year}</p>
          )}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="bg-[#ffde59] text-[#1c375b] font-semibold px-4 py-2 rounded hover:bg-[#f6ce2e] transition"
        >
          {mode === 'edit' ? 'Update Learner' : 'Save Learner'}
        </button>
      </div>
    </form>
  );
}
