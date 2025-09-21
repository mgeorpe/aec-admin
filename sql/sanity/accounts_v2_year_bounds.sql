-- Sanity: start_year must be within allowed range

-- 1) Flag years outside [2021, current_year+1] (only when start_year is set)
SELECT account_code, start_year
FROM public.accounts_v2
WHERE start_year IS NOT NULL
  AND (start_year < 2021 OR start_year > EXTRACT(YEAR FROM CURRENT_DATE)::int + 1);
