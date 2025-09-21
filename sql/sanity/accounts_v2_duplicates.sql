-- Sanity: account_code must be unique

-- 1) Find duplicate account_code values (should return zero rows)
SELECT account_code, COUNT(*) AS dup_count
FROM public.accounts_v2
GROUP BY account_code
HAVING COUNT(*) > 1;
