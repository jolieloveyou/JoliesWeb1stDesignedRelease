import { createClient } from '@supabase/supabase-js'

// ⚙️ Thay 2 dòng dưới bằng thông tin thật từ Supabase Dashboard
const supabaseUrl = 'https://tbgmfgkuhawgzseokvap.supabase.co'
const supabaseKey = 'YeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRiZ21mZ2t1aGF3Z3pzZW9rdmFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1NDkyOTcsImV4cCI6MjA3NzEyNTI5N30.m6SlM89iHqc20M8CeE72geY_iBaIi_rDS-O27Nqof6U'

// Tạo kết nối client
export const supabase = createClient(supabaseUrl, supabaseKey)
