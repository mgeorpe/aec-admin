-- 1) Drop unused column
ALTER TABLE public.account_learners
  DROP COLUMN IF EXISTS is_group;

-- 2) Enforce atomic labels: one row per (account_code, learner_label)
CREATE UNIQUE INDEX IF NOT EXISTS uq_account_learners_label
  ON public.account_learners (account_code, learner_label);

-- (Optional safety) Ensure requireds are NOT NULL (noop if already set)
ALTER TABLE public.account_learners
  ALTER COLUMN account_code SET NOT NULL,
  ALTER COLUMN learner_label SET NOT NULL;
