-- Migration: Add contacts_count to v_accounts_summary
-- Date: 2025-09-22

CREATE OR REPLACE VIEW public.v_accounts_summary AS
SELECT
  a.account_code         AS account_code,
  a.account_name         AS account_name,
  a.type                 AS type,
  a.service              AS service,
  a.country              AS country,
  a.status               AS status,
  a.is_active            AS is_active,
  a.start_year           AS start_year,
  (SELECT COUNT(*) 
     FROM public.account_contacts c 
     WHERE c.account_code = a.account_code) AS contacts_count,
  a.created_at           AS created_at,
  a.updated_at           AS updated_at
FROM public.accounts_v2 a
ORDER BY a.account_code;
