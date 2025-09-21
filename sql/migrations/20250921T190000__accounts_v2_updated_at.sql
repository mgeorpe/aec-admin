-- Ensure column exists
ALTER TABLE public.accounts_v2
ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

-- Function (safe to replace)
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger
LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END $$;

-- Attach trigger only if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_trigger t
    JOIN pg_class c ON c.oid = t.tgrelid
    JOIN pg_namespace n ON n.oid = c.relnamespace
    WHERE n.nspname = 'public'
      AND c.relname = 'accounts_v2'
      AND t.tgname  = 'trg_accounts_v2_updated_at'
      AND NOT t.tgisinternal
  ) THEN
    CREATE TRIGGER trg_accounts_v2_updated_at
    BEFORE UPDATE ON public.accounts_v2
    FOR EACH ROW
    EXECUTE FUNCTION public.set_updated_at();
  END IF;
END $$;
