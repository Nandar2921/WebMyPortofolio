// src/supabase.js
import { createClient } from '@supabase/supabase-js';

// 👇 GANTI DENGAN DARI SUPABASE CONSOLE MAS!
const supabaseUrl = 'https://ejqqvpxnndxrinyprnqa.supabase.co/rest/v1/';      // Project URL mas
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVqcXF2cHhubmR4cmlueXBybnFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk4ODQwOTcsImV4cCI6MjA5NTQ2MDA5N30.qQgmcOuR6l6rogyHqxbrZM4bJSGMmP7GXf-EyhF4yPY';   // anon public key mas

export const supabase = createClient(supabaseUrl, supabaseAnonKey);