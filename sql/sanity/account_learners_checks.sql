-- Column gone?
SELECT column_name
FROM information_schema.columns
WHERE table_schema='public' AND table_name='account_learners'
ORDER BY ordinal_position;

-- Unique holds?
INSERT INTO public.account_learners (account_code, learner_label, created_at)
SELECT account_code, learner_label, now()
FROM public.account_learners
LIMIT 1;
-- Expect: ERROR on duplicate due to unique index
