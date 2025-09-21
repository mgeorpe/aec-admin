-- Sanity: Values must stay within allowed domains

-- 1) Service should be one of TF/CD/PW/LE
SELECT account_code, service
FROM public.accounts_v2
WHERE service NOT IN ('TF','CD','PW','LE') OR service IS NULL;

-- 2) Status should be one of prospect/active/inactive
SELECT account_code, status
FROM public.accounts_v2
WHERE status NOT IN ('prospect','active','inactive') OR status IS NULL;

-- 3) Type should be one of individual/institution
SELECT account_code, type
FROM public.accounts_v2
WHERE type NOT IN ('individual','institution') OR type IS NULL;
