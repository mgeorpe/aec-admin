-- Sanity: status ↔ start_year ↔ is_active must align

-- 1) Find rows that violate the agreed status rules (should return zero rows)
--    - prospect  => start_year IS NULL AND is_active = false
--    - active    => start_year IS NOT NULL AND is_active = true
--    - inactive  => is_active = false (start_year can be NULL or NOT NULL)
SELECT account_code, start_year, status, is_active
FROM public.accounts_v2
WHERE NOT (
  (status = 'prospect' AND start_year IS NULL AND is_active = false) OR
  (status = 'active'   AND start_year IS NOT NULL AND is_active = true ) OR
  (status = 'inactive' AND is_active = false)
);
