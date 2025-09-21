-- Sanity: Contacts must map to valid accounts

-- 1) Orphaned contacts (account_code not found in accounts_v2)
SELECT ac.id, ac.account_code, ac.full_name
FROM public.account_contacts ac
LEFT JOIN public.accounts_v2 a ON a.account_code = ac.account_code
WHERE a.account_code IS NULL;

-- 2) Duplicate (account_code, full_name) pairs (optional: helps catch accidental dupes)
SELECT account_code, full_name, COUNT(*) AS dup_count
FROM public.account_contacts
GROUP BY account_code, full_name
HAVING COUNT(*) > 1;
