-- Sanity: account_contacts integrity

-- 1. Orphans
-- Should return 0 rows because every contact must link to a valid account_code in accounts_v2.
SELECT ac.id, ac.account_code, ac.full_name
FROM public.account_contacts ac
LEFT JOIN public.accounts_v2 a ON a.account_code = ac.account_code
WHERE a.account_code IS NULL;

-- 2. Duplicates
-- Should return 0 rows because the same (account_code, full_name, role) should not appear more than once.
SELECT account_code, full_name, role, COUNT(*) AS dup_count
FROM public.account_contacts
GROUP BY account_code, full_name, role
HAVING COUNT(*) > 1;
