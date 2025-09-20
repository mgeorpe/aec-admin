-- Add constraint only if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'chk_accounts_v2_status_logic'
      AND conrelid = 'public.accounts_v2'::regclass
  ) THEN
    ALTER TABLE public.accounts_v2
    ADD CONSTRAINT chk_accounts_v2_status_logic
    CHECK (
      (status = 'prospect' AND start_year IS NULL AND is_active = false) OR
      (status = 'active'   AND start_year IS NOT NULL AND is_active = true ) OR
      (status = 'inactive' AND is_active = false)
    ) NOT VALID;
  END IF;
END
$$;

-- Validate only if present and not yet validated
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'chk_accounts_v2_status_logic'
      AND conrelid = 'public.accounts_v2'::regclass
      AND NOT convalidated
  ) THEN
    ALTER TABLE public.accounts_v2
    VALIDATE CONSTRAINT chk_accounts_v2_status_logic;
  END IF;
END
$$;
