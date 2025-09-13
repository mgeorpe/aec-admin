import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xqjhpvskxmubrbqcysoy.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhxamhwdnNreG11YnJicWN5c295Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY5ODc1ODcsImV4cCI6MjA3MjU2MzU4N30.HNaUNG-GpkOxTTjp-wFV7K4RMGikle55HPO4q2vzJa4'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
