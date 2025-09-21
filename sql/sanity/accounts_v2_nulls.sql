-- Sanity: Required columns must not be NULL

-- 1) Find rows with missing required fields
SELECT account_code, account_name, type, service, status, is_active
FROM public.accounts_v2
WHERE account_code IS NULL
   OR account_name IS NULL
   OR type IS NULL
   OR service IS NULL
   OR status IS NULL
   OR is_active IS NULL;