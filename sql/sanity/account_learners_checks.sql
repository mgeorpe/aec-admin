-- Sanity: account_learners (atomic-only policy)

-- 0) Structure: column list (quick visual)
SELECT column_name
FROM information_schema.columns
WHERE table_schema='public' AND table_name='account_learners'
ORDER BY ordinal_position;
-- Expect: id, account_code, learner_label, created_at (no is_group)

-- 1) Duplicates (exact key)
-- Should return 0 rows (UNIQUE (account_code, learner_label) must hold).
SELECT account_code, learner_label, COUNT(*) AS dup_count
FROM public.account_learners
GROUP BY account_code, learner_label
HAVING COUNT(*) > 1;

-- 2) Case-insensitive duplicates
-- Should return 0 rows; catches "Jewel" vs "jewel".
WITH norm AS (
  SELECT account_code, lower(trim(learner_label)) AS label_norm, COUNT(*) AS n
  FROM public.account_learners
  GROUP BY account_code, lower(trim(learner_label))
)
SELECT account_code, label_norm, n
FROM norm
WHERE n > 1;

-- 3) Orphans (FK by business key)
-- Should return 0 rows; every learner must belong to an existing account_code.
SELECT al.account_code, al.learner_label
FROM public.account_learners al
LEFT JOIN public.accounts_v2 a ON a.account_code = al.account_code
WHERE a.account_code IS NULL;

-- 4) Null/empty labels
-- Should return 0 rows.
SELECT *
FROM public.account_learners
WHERE learner_label IS NULL OR trim(learner_label) = '';

-- 5) Suspected group labels (atomic policy)
-- Should return 0 rows; we avoid combined labels like "A & B" or "A and B".
SELECT account_code, learner_label
FROM public.account_learners
WHERE learner_label ~ '\s&\s' OR learner_label ~* '\band\b';

-- 6) Whitespace anomalies
-- Should return 0 rows; no leading/trailing spaces or double spaces.
SELECT account_code, learner_label
FROM public.account_learners
WHERE learner_label <> trim(learner_label)
   OR learner_label LIKE '%  %';

-- 7) Timestamps sanity
-- Should return 0 rows; created_at must not be in the future.
SELECT account_code, learner_label, created_at
FROM public.account_learners
WHERE created_at > now();
