// src/components/AdminPanel.jsx
import { useState, useEffect } from 'react';
import {
  FaCog, FaSave, FaTimes, FaMusic, FaUser, FaUpload,
  FaInfoCircle, FaLink, FaInstagram, FaGithub, FaTiktok, FaWhatsapp,
  FaBriefcase, FaGraduationCap, FaShieldAlt, FaFingerprint, FaDatabase
} from 'react-icons/fa';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const DEFAULT_SETTINGS = {
  name: 'Nur Wahyu Nandarudin',
  title: 'Web Developer & Content Creator',
  bio: 'Mahasiswa Informatika yang passionate dalam pengembangan web modern.',
  location: 'Indonesia',
  email: 'nurwahyunandarudin21@gmail.com',
  phone: '+62 889-8004-5976',
  instagram: 'https://instagram.com/n_wahyu_n',
  github: 'https://github.com/Nandar2921',
  tiktok: 'https://tiktok.com/@santuy.217',
  whatsapp: 'https://wa.me/6288980045976',
  projectsCount: '3+',
  hoursCode: '500+',
  semester: '4th',
  commitment: '100%',
  htmlSkill: 90,
  cssSkill: 85,
  jsSkill: 80,
  reactSkill: 82,
  uiuxSkill: 75,
  designSkill: 88,
  musicVolume: 50,
};

export default function AdminPanel({ audioRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // ===== KEAMANAN =====
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotAnswers, setForgotAnswers] = useState(['', '', '']);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newResetPassword, setNewResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');
  const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);

  const [securityQuestions, setSecurityQuestions] = useState([
    { id: 1, question: 'Siapa nama ibu kandung Anda?', answer: '' },
    { id: 2, question: 'Apa nama hewan peliharaan pertama Anda?', answer: '' },
    { id: 3, question: 'Di kota mana Anda lahir?', answer: '' },
  ]);

  const [settings, setSettings] = useState(DEFAULT_SETTINGS);

  // ===== LOAD DATA DARI FIREBASE =====
  useEffect(() => {
    const loadData = async () => {
      try {
        const docRef = doc(db, 'settings', 'portfolio');
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setSettings({ ...DEFAULT_SETTINGS, ...data });
          // Sync ke localStorage supaya komponen lain bisa baca
          localStorage.setItem('portfolioSettings', JSON.stringify({ ...DEFAULT_SETTINGS, ...data }));
        } else {
          // Dokumen belum ada, buat dengan default
          await setDoc(docRef, DEFAULT_SETTINGS);
          localStorage.setItem('portfolioSettings', JSON.stringify(DEFAULT_SETTINGS));
        }
      } catch (error) {
        console.error('Error loading from Firebase:', error);
        // Fallback ke localStorage
        const saved = localStorage.getItem('portfolioSettings');
        if (saved) setSettings(JSON.parse(saved));
      }
      setIsLoading(false);
    };

    loadData();

    // Load security data
    const savedPasswordHash = localStorage.getItem('adminPasswordHash');
    if (!savedPasswordHash) {
      // Set default password hash (hanya pertama kali)
      localStorage.setItem('adminPasswordHash', btoa('NurWahyu2024!'));
    }
    const savedQuestions = localStorage.getItem('securityQuestions');
    if (savedQuestions) setSecurityQuestions(JSON.parse(savedQuestions));

    if (window.PublicKeyCredential) {
      PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable().then((available) => {
        setBiometricSupported(available);
        if (available && localStorage.getItem('biometricEnabled') === 'true') {
          setBiometricEnabled(true);
        }
      });
    }
  }, []);

  // Timer lockout
  useEffect(() => {
    let interval;
    if (lockoutTime && lockoutTime > Date.now()) {
      interval = setInterval(() => {
        const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
        setRemainingTime(remaining);
        if (remaining <= 0) {
          setLockoutTime(null);
          setLoginAttempts(0);
          setRemainingTime(0);
          clearInterval(interval);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [lockoutTime]);

  // Apply volume ke audio
  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = settings.musicVolume / 100;
    }
  }, [settings.musicVolume, audioRef]);

  // ===== SAVE KE FIREBASE =====
  const saveSettings = async () => {
    try {
      const docRef = doc(db, 'settings', 'portfolio');
      await setDoc(docRef, settings);
      localStorage.setItem('portfolioSettings', JSON.stringify(settings));
      alert('✅ Settings berhasil disimpan! Semua pengunjung akan melihat perubahan.');
      setTimeout(() => window.location.reload(), 800);
    } catch (error) {
      console.error('Error saving to Firebase:', error);
      alert('❌ Gagal menyimpan ke Firebase! Cek koneksi internet.');
    }
  };

  // ===== RESET KE DEFAULT =====
  const resetToDefault = async () => {
    if (!confirm('⚠️ Yakin mau reset semua data ke default?')) return;
    try {
      const docRef = doc(db, 'settings', 'portfolio');
      await setDoc(docRef, DEFAULT_SETTINGS);
      localStorage.setItem('portfolioSettings', JSON.stringify(DEFAULT_SETTINGS));
      localStorage.removeItem('uploadedMusic');
      localStorage.removeItem('musicFileName');
      setSettings(DEFAULT_SETTINGS);
      alert('✅ Data direset ke default!');
      window.location.reload();
    } catch (error) {
      console.error('Reset error:', error);
      alert('❌ Gagal reset data!');
    }
  };

  // ===== MUSIK =====
  const handleMusicUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'audio/mpeg') {
      const url = URL.createObjectURL(file);
      if (audioRef?.current) {
        const wasPlaying = !audioRef.current.paused;
        audioRef.current.src = url;
        audioRef.current.load();
        if (wasPlaying) audioRef.current.play();
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('uploadedMusic', reader.result);
        localStorage.setItem('musicFileName', file.name);
      };
      reader.readAsDataURL(file);
      setSettings({ ...settings, musicFile: file.name });
      alert(`✅ Music changed to: ${file.name}`);
    } else {
      alert('Pilih file MP3!');
    }
  };

  const resetMusic = () => {
    if (audioRef?.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = '/Lagu.mp3';
      audioRef.current.load();
      if (wasPlaying) audioRef.current.play();
    }
    localStorage.removeItem('uploadedMusic');
    localStorage.removeItem('musicFileName');
    setSettings({ ...settings, musicFile: null });
    alert('✅ Music reset ke default!');
  };

  // ===== BIOMETRIC =====
  const registerBiometric = async () => {
    try {
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      const credential = await navigator.credentials.create({
        publicKey: {
          challenge,
          rp: { name: 'Portfolio Admin', id: window.location.hostname },
          user: {
            id: new TextEncoder().encode('admin-user-id'),
            name: 'admin@portfolio',
            displayName: 'Portfolio Admin',
          },
          pubKeyCredParams: [
            { type: 'public-key', alg: -7 },
            { type: 'public-key', alg: -257 },
          ],
          authenticatorSelection: { authenticatorAttachment: 'platform', userVerification: 'required' },
          timeout: 60000,
        },
      });
      if (credential) {
        localStorage.setItem('biometricCredentialId', btoa(String.fromCharCode(...new Uint8Array(credential.rawId))));
        localStorage.setItem('biometricEnabled', 'true');
        setBiometricEnabled(true);
        alert('✅ Biometric berhasil didaftarkan!');
      }
    } catch {
      alert('❌ Gagal mendaftarkan biometric.');
    }
  };

  const loginWithBiometric = async () => {
    try {
      const credentialIdBase64 = localStorage.getItem('biometricCredentialId');
      if (!credentialIdBase64) throw new Error();
      const challenge = new Uint8Array(32);
      crypto.getRandomValues(challenge);
      await navigator.credentials.get({
        publicKey: {
          challenge,
          allowCredentials: [
            { id: Uint8Array.from(atob(credentialIdBase64), (c) => c.charCodeAt(0)), type: 'public-key' },
          ],
          userVerification: 'required',
          timeout: 60000,
        },
      });
      setIsAuthenticated(true);
      setLoginAttempts(0);
    } catch {
      alert('❌ Verifikasi biometric gagal!');
    }
  };

  const removeBiometric = () => {
    localStorage.removeItem('biometricEnabled');
    localStorage.removeItem('biometricCredentialId');
    setBiometricEnabled(false);
    alert('✅ Biometric dinonaktifkan.');
  };

  // ===== PASSWORD =====
  const handleLogin = (e) => {
    e.preventDefault();
    if (lockoutTime && lockoutTime > Date.now()) {
      alert(`⛔ Tunggu ${remainingTime} detik!`);
      return;
    }
    const storedHash = localStorage.getItem('adminPasswordHash');
    if (btoa(password) === storedHash) {
      setIsAuthenticated(true);
      setLoginAttempts(0);
      setLockoutTime(null);
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      if (newAttempts >= 3) {
        setLockoutTime(Date.now() + 30000);
        alert('⛔ Terlalu banyak gagal! Terkunci 30 detik.');
      } else {
        alert(`❌ Password salah! Sisa: ${3 - newAttempts}`);
      }
      setPassword('');
    }
  };

  const changePassword = () => {
    const storedHash = localStorage.getItem('adminPasswordHash');
    if (btoa(oldPassword) !== storedHash) { alert('❌ Password lama salah!'); return; }
    if (newPassword !== confirmPassword) { alert('❌ Password baru tidak cocok!'); return; }
    if (newPassword.length < 8) { alert('❌ Password minimal 8 karakter!'); return; }
    localStorage.setItem('adminPasswordHash', btoa(newPassword));
    setOldPassword(''); setNewPassword(''); setConfirmPassword('');
    setShowChangePassword(false);
    alert('✅ Password berhasil diubah!');
  };

  const saveSecurityQuestions = () => {
    localStorage.setItem('securityQuestions', JSON.stringify(securityQuestions));
    setShowSecurityQuestions(false);
    alert('✅ Pertanyaan keamanan disimpan!');
  };

  const verifySecurityAnswers = () => {
    const saved = JSON.parse(localStorage.getItem('securityQuestions') || '[]');
    const correct = saved.every((q, i) => q.answer.toLowerCase() === forgotAnswers[i].toLowerCase());
    if (correct) { setShowForgotPassword(false); setShowResetPassword(true); }
    else alert('❌ Jawaban salah!');
  };

  const resetPassword = () => {
    if (newResetPassword.length < 8) { alert('❌ Password minimal 8 karakter!'); return; }
    if (newResetPassword !== confirmResetPassword) { alert('❌ Password tidak cocok!'); return; }
    localStorage.setItem('adminPasswordHash', btoa(newResetPassword));
    setShowResetPassword(false);
    setNewResetPassword(''); setConfirmResetPassword('');
    alert('✅ Password berhasil direset!');
  };

  // ===== LOADING STATE =====
  if (isLoading) {
    return (
      <button className="fixed bottom-24 right-8 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg">
        <FaDatabase className="animate-spin" />
      </button>
    );
  }

  // ===== LOGIN FORM =====
  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-8 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition"
        >
          <FaShieldAlt />
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-900 to-cyan-900 rounded-2xl p-8 max-w-md w-full border border-purple-500/30">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <FaDatabase className="text-orange-400" /> 🔐 Admin Login
                </h2>
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded-full">
                  <FaTimes />
                </button>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 text-xs">
                <span className="bg-green-500/20 px-2 py-1 rounded-full">🔑 Password</span>
                <span className="bg-yellow-500/20 px-2 py-1 rounded-full">⏱️ 3 Attempts</span>
                <span className="bg-orange-500/20 px-2 py-1 rounded-full">🔥 Firebase Sync</span>
                {biometricSupported && biometricEnabled && (
                  <span className="bg-blue-500/20 px-2 py-1 rounded-full">🔓 Biometric</span>
                )}
                {lockoutTime && (
                  <span className="bg-red-500/20 px-2 py-1 rounded-full">🔒 Locked: {remainingTime}s</span>
                )}
              </div>

              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white mb-3"
                  autoFocus
                  disabled={lockoutTime && lockoutTime > Date.now()}
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 py-2 rounded-xl font-semibold"
                  disabled={lockoutTime && lockoutTime > Date.now()}
                >
                  {lockoutTime ? `Terkunci (${remainingTime}s)` : 'Login'}
                </button>
              </form>

              {biometricSupported && biometricEnabled && (
                <button
                  onClick={loginWithBiometric}
                  className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-500 py-2 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <FaFingerprint /> Login dengan Sidik Jari / Face ID
                </button>
              )}

              <button
                onClick={() => setShowForgotPassword(true)}
                className="w-full mt-3 text-xs text-purple-400 hover:underline"
              >
                🔐 Lupa Password?
              </button>

              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-zinc-500 flex items-center justify-center gap-1">
                  <FaDatabase className="text-orange-400" /> Firebase Cloud Sync Active
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Modal Forgot Password */}
        {showForgotPassword && (
          <div className="fixed inset-0 z-[400] bg-black/90 flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-900 to-cyan-900 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">🔐 Reset Password</h3>
              {securityQuestions.map((q, idx) => (
                <div key={q.id} className="mb-3">
                  <label className="text-sm text-zinc-400">{q.question}</label>
                  <input
                    type="text"
                    value={forgotAnswers[idx]}
                    onChange={(e) => {
                      const newAnswers = [...forgotAnswers];
                      newAnswers[idx] = e.target.value;
                      setForgotAnswers(newAnswers);
                    }}
                    className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white mt-1"
                  />
                </div>
              ))}
              <div className="flex gap-3 mt-4">
                <button onClick={verifySecurityAnswers} className="flex-1 bg-purple-500 py-2 rounded-lg">Verifikasi</button>
                <button onClick={() => setShowForgotPassword(false)} className="flex-1 bg-white/10 py-2 rounded-lg">Batal</button>
              </div>
            </div>
          </div>
        )}

        {showResetPassword && (
          <div className="fixed inset-0 z-[400] bg-black/90 flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-900 to-cyan-900 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">📝 Reset Password</h3>
              <input type="password" placeholder="Password Baru (min 8)" value={newResetPassword} onChange={(e) => setNewResetPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white mb-3" />
              <input type="password" placeholder="Konfirmasi Password" value={confirmResetPassword} onChange={(e) => setConfirmResetPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white mb-4" />
              <div className="flex gap-3">
                <button onClick={resetPassword} className="flex-1 bg-green-500 py-2 rounded-lg">Reset</button>
                <button onClick={() => setShowResetPassword(false)} className="flex-1 bg-white/10 py-2 rounded-lg">Batal</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // ===== ADMIN PANEL =====
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition"
      >
        <FaCog className="animate-spin-slow" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-purple-900 to-cyan-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaDatabase className="text-orange-400" /> Admin Panel
              </h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                <FaTimes />
              </button>
            </div>

            {/* Firebase Status */}
            <div className="bg-orange-500/20 border border-orange-500/40 rounded-xl p-3 mb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FaDatabase className="text-orange-400" />
                  <span className="text-sm text-orange-400">🔥 Firebase Cloud Sync Active</span>
                </div>
                <span className="text-xs text-orange-400">✅ Real-time ke semua pengunjung</span>
              </div>
            </div>

            {/* Security Settings */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FaShieldAlt className="text-yellow-400" /> Security Settings
              </h3>

              {biometricSupported && (
                <div className="border border-white/20 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FaFingerprint className="text-blue-400 text-xl" />
                    <span className="font-semibold">🔓 Biometric Login</span>
                  </div>
                  {!biometricEnabled ? (
                    <button onClick={registerBiometric} className="text-sm bg-blue-500/20 px-3 py-1 rounded-full">
                      📱 Daftarkan Sidik Jari / Face ID
                    </button>
                  ) : (
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-green-400">✅ Biometric Active</span>
                      <button onClick={removeBiometric} className="text-xs text-red-400 hover:underline">Nonaktifkan</button>
                    </div>
                  )}
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                <button onClick={() => setShowChangePassword(!showChangePassword)} className="text-sm bg-yellow-500/20 px-3 py-1 rounded-full">🔑 Ganti Password</button>
                <button onClick={() => setShowSecurityQuestions(!showSecurityQuestions)} className="text-sm bg-purple-500/20 px-3 py-1 rounded-full">❓ Pertanyaan Keamanan</button>
                <button onClick={resetToDefault} className="text-sm bg-red-500/20 px-3 py-1 rounded-full">🔄 Reset All Data</button>
              </div>

              {showChangePassword && (
                <div className="mt-3 space-y-2">
                  <input type="password" placeholder="Password Lama" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" />
                  <input type="password" placeholder="Password Baru (min 8)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" />
                  <input type="password" placeholder="Konfirmasi" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" />
                  <button onClick={changePassword} className="bg-purple-500 px-4 py-1 rounded-lg">Simpan</button>
                </div>
              )}

              {showSecurityQuestions && (
                <div className="mt-3 space-y-2">
                  {securityQuestions.map((q, idx) => (
                    <div key={q.id}>
                      <label className="text-xs text-zinc-400">{q.question}</label>
                      <input
                        type="text"
                        value={q.answer}
                        onChange={(e) => {
                          const newQ = [...securityQuestions];
                          newQ[idx].answer = e.target.value;
                          setSecurityQuestions(newQ);
                        }}
                        className="w-full p-2 rounded-lg bg-white/10 border border-white/20"
                      />
                    </div>
                  ))}
                  <button onClick={saveSecurityQuestions} className="bg-green-500/20 px-4 py-1 rounded-lg">Simpan</button>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3"><FaUser className="text-purple-400 inline mr-2" /> Profile</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <input type="text" placeholder="Name" value={settings.name} onChange={(e) => setSettings({ ...settings, name: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" />
                <input type="text" placeholder="Title" value={settings.title} onChange={(e) => setSettings({ ...settings, title: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" />
                <input type="text" placeholder="Location" value={settings.location} onChange={(e) => setSettings({ ...settings, location: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" />
                <input type="email" placeholder="Email" value={settings.email} onChange={(e) => setSettings({ ...settings, email: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" />
                <input type="text" placeholder="Phone" value={settings.phone} onChange={(e) => setSettings({ ...settings, phone: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" />
                <textarea placeholder="Bio" value={settings.bio} onChange={(e) => setSettings({ ...settings, bio: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" rows="2" />
              </div>
            </div>

            {/* Social Media */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3"><FaLink className="text-cyan-400 inline mr-2" /> Social Media</h3>
              <div className="space-y-2">
                <div className="flex gap-2 items-center"><FaInstagram className="text-pink-400 shrink-0" /><input type="text" value={settings.instagram} onChange={(e) => setSettings({ ...settings, instagram: e.target.value })} className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div className="flex gap-2 items-center"><FaGithub className="text-white shrink-0" /><input type="text" value={settings.github} onChange={(e) => setSettings({ ...settings, github: e.target.value })} className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div className="flex gap-2 items-center"><FaTiktok className="text-white shrink-0" /><input type="text" value={settings.tiktok} onChange={(e) => setSettings({ ...settings, tiktok: e.target.value })} className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div className="flex gap-2 items-center"><FaWhatsapp className="text-green-400 shrink-0" /><input type="text" value={settings.whatsapp} onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })} className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20" /></div>
              </div>
            </div>

            {/* Stats */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3"><FaBriefcase className="text-yellow-400 inline mr-2" /> Stats</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <input type="text" placeholder="Projects (e.g. 3+)" value={settings.projectsCount} onChange={(e) => setSettings({ ...settings, projectsCount: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" />
                <input type="text" placeholder="Hours (e.g. 500+)" value={settings.hoursCode} onChange={(e) => setSettings({ ...settings, hoursCode: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" />
                <input type="text" placeholder="Semester" value={settings.semester} onChange={(e) => setSettings({ ...settings, semester: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" />
                <input type="text" placeholder="Commitment" value={settings.commitment} onChange={(e) => setSettings({ ...settings, commitment: e.target.value })} className="p-2 rounded-lg bg-white/10 border border-white/20" />
              </div>
            </div>

            {/* Skills */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3"><FaGraduationCap className="text-green-400 inline mr-2" /> Skills</h3>
              <div className="grid md:grid-cols-2 gap-3">
                {[
                  { key: 'htmlSkill', label: 'HTML' },
                  { key: 'cssSkill', label: 'CSS' },
                  { key: 'jsSkill', label: 'JavaScript' },
                  { key: 'reactSkill', label: 'React' },
                  { key: 'uiuxSkill', label: 'UI/UX' },
                  { key: 'designSkill', label: 'Design' },
                ].map(({ key, label }) => (
                  <div key={key}>
                    <label className="text-xs">{label}: {settings[key]}%</label>
                    <input
                      type="range" min="0" max="100"
                      value={settings[key]}
                      onChange={(e) => setSettings({ ...settings, [key]: parseInt(e.target.value) })}
                      className="w-full"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Music */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3"><FaMusic className="text-cyan-400 inline mr-2" /> Music</h3>
              <div className="mb-2 flex items-center gap-2">
                <label className="text-sm">Current: {localStorage.getItem('musicFileName') || 'Lagu.mp3'}</label>
                {localStorage.getItem('uploadedMusic') && (
                  <button onClick={resetMusic} className="text-red-400 text-sm hover:underline">Reset</button>
                )}
              </div>
              <label className="cursor-pointer flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-purple-500/20 border border-purple-500/40 mb-2">
                <FaUpload /> Upload MP3
                <input type="file" accept="audio/mpeg" onChange={handleMusicUpload} className="hidden" />
              </label>
              <div>
                <label className="text-sm">Volume: {settings.musicVolume}%</label>
                <input type="range" min="0" max="100" value={settings.musicVolume} onChange={(e) => setSettings({ ...settings, musicVolume: parseInt(e.target.value) })} className="w-full" />
              </div>
            </div>

            {/* Info - TANPA password ditampilkan */}
            <div className="border border-white/10 rounded-xl p-4 mb-4 bg-orange-500/10">
              <h3 className="text-lg font-semibold mb-2"><FaInfoCircle className="text-yellow-400 inline mr-2" /> Info</h3>
              <p className="text-sm text-zinc-400">
                • 🔥 Data tersimpan di <strong>Firebase Firestore</strong><br />
                • ✅ Semua pengunjung langsung melihat perubahan<br />
                • 🔑 Gunakan menu "Ganti Password" untuk update password<br />
                • 🔓 Biometric: sidik jari/face ID untuk login cepat
              </p>
            </div>

            <button
              onClick={saveSettings}
              className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
            >
              <FaSave /> Save All Settings & Sync to Firebase
            </button>
          </div>
        </div>
      )}
    </>
  );
}
