-- Sanity: Updated_at baseline and trigger behavior

-- 1. Check that most rows are still on the Sep-11 baseline
SELECT updated_at::date, COUNT(*) AS row_count
FROM public.accounts_v2
GROUP BY updated_at::date
ORDER BY updated_at::date;

-- 2. Spot rows where updated_at < created_at (should not happen)
SELECT account_code, created_at, updated_at
FROM public.accounts_v2
WHERE updated_at < created_at;

-- 3. Spot rows where updated_at is much newer than baseline (expected only for rows you’ve updated)
SELECT account_code, created_at, updated_at
FROM public.accounts_v2
WHERE updated_at > TIMESTAMPTZ '2025-09-11 16:06:28.898529+00'
ORDER BY updated_at DESC
LIMIT 10;
