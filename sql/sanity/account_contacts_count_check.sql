-- Sanity: contacts_count in v_accounts_summary matches raw account_contacts

-- 1. Compare view vs raw counts side by side
-- Should show identical values in both columns.
SELECT
  v.account_code,
  v.contacts_count         AS from_view,
  COUNT(c.*)               AS from_raw
FROM public.v_accounts_summary v
LEFT JOIN public.account_contacts c
  ON v.account_code = c.account_code
GROUP BY v.account_code, v.contacts_count
ORDER BY v.account_code;

-- 2. Spot mismatches (should return 0 rows)
SELECT
  v.account_code,
  v.contacts_count,
  COUNT(c.*) AS raw_count
FROM public.v_accounts_summary v
LEFT JOIN public.account_contacts c
  ON v.account_code = c.account_code
GROUP BY v.account_code, v.contacts_count
HAVING v.contacts_count <> COUNT(c.*);
