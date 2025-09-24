-- Seed: account_learners from legacy learners (idempotent)
-- Inserts one row per (client_code, learner_name); marks all as is_group = false

INSERT INTO public.account_learners (account_code, learner_label, is_group)
SELECT DISTINCT
  TRIM(l.client_code)           AS account_code,
  TRIM(l.learner_name)          AS learner_label,
  FALSE                         AS is_group
FROM public.learners l
JOIN public.accounts_v2 a
  ON a.account_code = l.client_code                 -- avoid orphans
WHERE l.learner_name IS NOT NULL
  AND l.learner_name <> ''
  -- idempotency: only rows not present yet
  AND NOT EXISTS (
    SELECT 1
    FROM public.account_learners al
    WHERE al.account_code  = l.client_code
      AND al.learner_label = l.learner_name
  );
