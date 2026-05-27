// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// 👇 GANTI DENGAN URL DARI SUPABASE CONSOLE MAS!
const supabaseUrl = 'https://ejqqvpxnndxrinypnrqa.supabase.co';

// 👇 GANTI DENGAN ANON KEY DARI SUPABASE CONSOLE MAS!
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcXF2cHhubmR4cmlueXBybnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODQwOTcsImV4cCI6MjA5NTQ2MDA5N30.qQgmcOuR6l6rogyHqxbrZM4bJSGMmP7GXf-EyhF4yPY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);