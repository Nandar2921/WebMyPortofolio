import { useState, useEffect } from 'react';
import { 
  FaCog, FaSave, FaTimes, FaMusic, FaUser, FaUpload, FaTrash, FaVolumeUp, 
  FaInfoCircle, FaLink, FaInstagram, FaGithub, FaTiktok, FaWhatsapp, 
  FaBriefcase, FaGraduationCap, FaShieldAlt, FaKey, FaClock, FaFingerprint, 
  FaQuestionCircle, FaRegSave, FaEnvelope, FaMapPin, FaPhone
} from 'react-icons/fa';

export default function AdminPanel({ audioRef }) {
  const [isOpen, setIsOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // ===== FITUR KEAMANAN =====
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(null);
  const [remainingTime, setRemainingTime] = useState(0);
  const [biometricSupported, setBiometricSupported] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);
  
  // ===== FITUR LUPA PASSWORD =====
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [forgotAnswers, setForgotAnswers] = useState(['', '', '']);
  const [showResetPassword, setShowResetPassword] = useState(false);
  const [newResetPassword, setNewResetPassword] = useState('');
  const [confirmResetPassword, setConfirmResetPassword] = useState('');
  
  const [securityQuestions, setSecurityQuestions] = useState([
    { id: 1, question: 'Siapa nama ibu kandung Anda?', answer: '' },
    { id: 2, question: 'Apa nama hewan peliharaan pertama Anda?', answer: '' },
    { id: 3, question: 'Di kota mana Anda lahir?', answer: '' }
  ]);
  
  const [settings, setSettings] = useState({
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
    musicFile: null
  });

  // Cek biometric
  useEffect(() => {
    if (window.PublicKeyCredential && 
        window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable) {
      window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
        .then(available => {
          setBiometricSupported(available);
          const savedBiometric = localStorage.getItem('biometricEnabled');
          if (savedBiometric === 'true' && available) {
            setBiometricEnabled(true);
          }
        })
        .catch(() => setBiometricSupported(false));
    }
    
    const savedPasswordHash = localStorage.getItem('adminPasswordHash');
    if (!savedPasswordHash) {
      const defaultHash = btoa('NurWahyu2024!');
      localStorage.setItem('adminPasswordHash', defaultHash);
    }
    
    const savedQuestions = localStorage.getItem('securityQuestions');
    if (savedQuestions) {
      setSecurityQuestions(JSON.parse(savedQuestions));
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

  // Load settings
  useEffect(() => {
    const savedSettings = localStorage.getItem('portfolioSettings');
    if (savedSettings) {
      const parsed = JSON.parse(savedSettings);
      setSettings(parsed);
    }
  }, []);

  // Volume
  useEffect(() => {
    if (audioRef?.current) {
      audioRef.current.volume = settings.musicVolume / 100;
    }
  }, [settings.musicVolume, audioRef]);

  const saveSettings = () => {
    localStorage.setItem('portfolioSettings', JSON.stringify(settings));
    alert('✅ Settings saved! Page will reload to apply changes.');
    setTimeout(() => window.location.reload(), 1000);
  };

  const handleMusicUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'audio/mpeg') {
      const url = URL.createObjectURL(file);
      if (audioRef?.current) {
        const wasPlaying = !audioRef.current.paused;
        audioRef.current.src = url;
        audioRef.current.load();
        if (wasPlaying) {
          audioRef.current.play().catch(err => console.log("Play error:", err));
        }
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        localStorage.setItem('uploadedMusic', reader.result);
        localStorage.setItem('musicFileName', file.name);
      };
      reader.readAsDataURL(file);
      setSettings({...settings, musicFile: file.name});
      alert(`✅ Music changed to: ${file.name}`);
    } else {
      alert('Please select an MP3 file!');
    }
  };

  const resetMusic = () => {
    if (audioRef?.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = '/Lagu.mp3';
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(err => console.log("Play error:", err));
      }
    }
    localStorage.removeItem('uploadedMusic');
    localStorage.removeItem('musicFileName');
    setSettings({...settings, musicFile: null});
    alert('✅ Music reset to default (Lagu.mp3)!');
  };

  const enrollBiometric = async () => {
    if (!biometricSupported) {
      alert('❌ Browser tidak mendukung biometric!');
      return;
    }
    try {
      await navigator.credentials.create({
        publicKey: {
          challenge: new Uint8Array(32),
          rp: { name: 'Portfolio Admin' },
          user: {
            id: new Uint8Array(16),
            name: 'admin',
            displayName: 'Admin'
          },
          pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
          authenticatorSelection: {
            authenticatorAttachment: 'platform',
            userVerification: 'required'
          }
        }
      });
      setBiometricEnabled(true);
      localStorage.setItem('biometricEnabled', 'true');
      alert('✅ Biometric berhasil diaktifkan!');
    } catch (error) {
      alert('❌ Gagal mengaktifkan biometric.');
    }
  };

  const loginWithBiometric = async () => {
    if (!biometricEnabled) {
      alert('❌ Biometric belum diaktifkan.');
      return;
    }
    try {
      await navigator.credentials.get({
        publicKey: {
          challenge: new Uint8Array(32),
          allowCredentials: [],
          userVerification: 'required'
        }
      });
      setIsAuthenticated(true);
      setLoginAttempts(0);
      alert('✅ Biometric verification successful!');
    } catch (error) {
      alert('❌ Verifikasi biometric gagal!');
    }
  };

  const changePassword = () => {
    const storedHash = localStorage.getItem('adminPasswordHash');
    const oldPasswordHash = btoa(oldPassword);
    if (oldPasswordHash !== storedHash) {
      alert('❌ Password lama salah!');
      return;
    }
    if (newPassword !== confirmPassword) {
      alert('❌ Password baru tidak cocok!');
      return;
    }
    if (newPassword.length < 8) {
      alert('❌ Password minimal 8 karakter!');
      return;
    }
    const newHash = btoa(newPassword);
    localStorage.setItem('adminPasswordHash', newHash);
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowChangePassword(false);
    alert('✅ Password berhasil diubah!');
  };

  const saveSecurityQuestions = () => {
    localStorage.setItem('securityQuestions', JSON.stringify(securityQuestions));
    setShowSecurityQuestions(false);
    alert('✅ Pertanyaan keamanan berhasil disimpan!');
  };

  const verifySecurityAnswers = () => {
    const savedQuestions = localStorage.getItem('securityQuestions');
    if (savedQuestions) {
      const saved = JSON.parse(savedQuestions);
      let correct = true;
      for (let i = 0; i < saved.length; i++) {
        if (saved[i].answer.toLowerCase() !== forgotAnswers[i].toLowerCase()) {
          correct = false;
          break;
        }
      }
      if (correct) {
        setShowForgotPassword(false);
        setShowResetPassword(true);
        setForgotAnswers(['', '', '']);
      } else {
        alert('❌ Jawaban salah!');
      }
    } else {
      alert('❌ Pertanyaan keamanan belum diatur. Hubungi admin.');
    }
  };

  const resetPassword = () => {
    if (newResetPassword.length < 8) {
      alert('❌ Password minimal 8 karakter!');
      return;
    }
    if (newResetPassword !== confirmResetPassword) {
      alert('❌ Password tidak cocok!');
      return;
    }
    const newHash = btoa(newResetPassword);
    localStorage.setItem('adminPasswordHash', newHash);
    setShowResetPassword(false);
    setNewResetPassword('');
    setConfirmResetPassword('');
    alert('✅ Password berhasil direset! Gunakan password baru untuk login.');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (lockoutTime && lockoutTime > Date.now()) {
      const remaining = Math.ceil((lockoutTime - Date.now()) / 1000);
      alert(`⛔ Terlalu banyak percobaan! Coba lagi dalam ${remaining} detik.`);
      return;
    }
    const storedHash = localStorage.getItem('adminPasswordHash');
    const inputHash = btoa(password);
    if (inputHash === storedHash) {
      setIsAuthenticated(true);
      setLoginAttempts(0);
      setLockoutTime(null);
    } else {
      const newAttempts = loginAttempts + 1;
      setLoginAttempts(newAttempts);
      if (newAttempts >= 3) {
        setLockoutTime(Date.now() + 30000);
        alert(`⛔ Terlalu banyak percobaan gagal! Akses terkunci selama 30 detik.`);
      } else {
        alert(`❌ Password salah! Sisa percobaan: ${3 - newAttempts}`);
      }
      setPassword('');
    }
  };

  // ========== TAMPILAN LOGIN ==========
  if (!isAuthenticated) {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-8 z-50 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition hover:scale-110"
          title="Admin Panel"
        >
          <FaShieldAlt />
        </button>

        {isOpen && (
          <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-900 to-cyan-900 rounded-2xl p-8 max-w-md w-full border border-purple-500/30">
              <div className="flex items-center gap-2 mb-4">
                <FaShieldAlt className="text-green-400 text-xl" />
                <h2 className="text-2xl font-bold">🔐 Secure Admin Access</h2>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4 text-xs">
                <div className="flex items-center gap-1 bg-green-500/20 px-2 py-1 rounded-full">
                  <FaKey className="text-green-400 text-[10px]" />
                  <span className="text-green-400">Password</span>
                </div>
                <div className="flex items-center gap-1 bg-yellow-500/20 px-2 py-1 rounded-full">
                  <FaClock className="text-yellow-400 text-[10px]" />
                  <span className="text-yellow-400">3 Attempts</span>
                </div>
                {biometricSupported && biometricEnabled && (
                  <div className="flex items-center gap-1 bg-blue-500/20 px-2 py-1 rounded-full">
                    <FaFingerprint className="text-blue-400 text-[10px]" />
                    <span className="text-blue-400">Biometric Ready</span>
                  </div>
                )}
                {lockoutTime && lockoutTime > Date.now() && (
                  <div className="flex items-center gap-1 bg-red-500/20 px-2 py-1 rounded-full">
                    <FaShieldAlt className="text-red-400 text-[10px]" />
                    <span className="text-red-400">Locked: {remainingTime}s</span>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleLogin}>
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white/10 border border-white/20 text-white mb-3 focus:border-purple-500 focus:outline-none"
                  autoFocus
                  disabled={lockoutTime && lockoutTime > Date.now()}
                />
                <button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 py-2 rounded-xl font-semibold hover:scale-105 transition disabled:opacity-50"
                  disabled={lockoutTime && lockoutTime > Date.now()}
                >
                  {lockoutTime && lockoutTime > Date.now() ? `Terkunci (${remainingTime}s)` : 'Login with Password'}
                </button>
              </form>
              
              {biometricSupported && biometricEnabled && (
                <button
                  onClick={loginWithBiometric}
                  className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-500 py-2 rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2"
                >
                  <FaFingerprint /> Login dengan Sidik Jari / Face ID
                </button>
              )}
              
              {/* TOMBOL LUPA PASSWORD */}
              <button
                onClick={() => setShowForgotPassword(true)}
                className="w-full mt-3 text-xs text-purple-400 hover:text-purple-300 transition"
              >
                🔐 Lupa Password?
              </button>
              
              <div className="mt-4 pt-4 border-t border-white/10 text-center">
                <p className="text-xs text-zinc-500 flex items-center justify-center gap-1">
                  <FaShieldAlt className="text-green-400" /> 
                  Secure Admin Panel • {biometricSupported ? (biometricEnabled ? '🔓 Biometric Active' : '📱 Biometric Available') : '💻 Standard Login'}
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* MODAL LUPA PASSWORD */}
        {showForgotPassword && (
          <div className="fixed inset-0 z-[400] bg-black/90 backdrop-blur-md flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-900 to-cyan-900 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">🔐 Reset Password</h3>
              <p className="text-sm text-zinc-400 mb-4">Jawab pertanyaan keamanan untuk mereset password</p>
              
              {securityQuestions.map((q, idx) => (
                <div key={q.id} className="mb-3">
                  <label className="text-sm text-zinc-400">{q.question}</label>
                  <input
                    type="text"
                    placeholder="Jawaban Anda"
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
        
        {/* MODAL RESET PASSWORD */}
        {showResetPassword && (
          <div className="fixed inset-0 z-[400] bg-black/90 backdrop-blur-md flex items-center justify-center">
            <div className="bg-gradient-to-br from-purple-900 to-cyan-900 rounded-2xl p-6 max-w-md w-full">
              <h3 className="text-xl font-bold mb-4">📝 Reset Password</h3>
              <p className="text-sm text-zinc-400 mb-4">Buat password baru</p>
              
              <input
                type="password"
                placeholder="Password Baru (min 8 karakter)"
                value={newResetPassword}
                onChange={(e) => setNewResetPassword(e.target.value)}
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white mb-3"
              />
              <input
                type="password"
                placeholder="Konfirmasi Password Baru"
                value={confirmResetPassword}
                onChange={(e) => setConfirmResetPassword(e.target.value)}
                className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-white mb-4"
              />
              
              <div className="flex gap-3">
                <button onClick={resetPassword} className="flex-1 bg-green-500 py-2 rounded-lg">Reset Password</button>
                <button onClick={() => setShowResetPassword(false)} className="flex-1 bg-white/10 py-2 rounded-lg">Batal</button>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  // ========== TAMPILAN ADMIN PANEL ==========
  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-8 z-50 bg-green-600 text-white p-3 rounded-full shadow-lg hover:bg-green-700 transition hover:scale-110"
        title="Admin Panel (Active)"
      >
        <FaCog className="animate-spin-slow" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[300] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-gradient-to-br from-purple-900 to-cyan-900 rounded-2xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold flex items-center gap-2">
                <FaShieldAlt className="text-green-400" /> Admin Panel
              </h2>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full">
                <FaTimes />
              </button>
            </div>

            {/* Security Bar */}
            <div className="bg-green-500/20 border border-green-500/40 rounded-xl p-3 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <FaShieldAlt className="text-green-400" />
                  <span className="text-sm text-green-400">Secure Session Active</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-xs px-2 py-1 bg-green-500/30 rounded-full">✅ Password</span>
                  <span className="text-xs px-2 py-1 bg-green-500/30 rounded-full">✅ 3 Attempt Limit</span>
                  <span className="text-xs px-2 py-1 bg-green-500/30 rounded-full">✅ 30s Lockout</span>
                  {biometricEnabled && <span className="text-xs px-2 py-1 bg-blue-500/30 rounded-full">✅ Biometric</span>}
                </div>
              </div>
            </div>

            {/* SECURITY SETTINGS */}
            <div className="border border-white/10 rounded-xl p-4 mb-6">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <FaShieldAlt className="text-yellow-400" /> Security Settings
              </h3>
              
              <div className="grid md:grid-cols-2 gap-4">
                {biometricSupported && (
                  <div className="border border-white/20 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <FaFingerprint className="text-blue-400 text-xl" />
                      <span className="font-semibold">Biometric Login</span>
                    </div>
                    <p className="text-xs text-zinc-400 mb-2">Gunakan sidik jari atau face ID untuk login cepat</p>
                    {!biometricEnabled ? (
                      <button onClick={enrollBiometric} className="text-sm bg-blue-500/20 px-3 py-1 rounded-full hover:bg-blue-500/30">
                        Aktifkan Biometric
                      </button>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-400">✅ Biometric Active</span>
                        <button onClick={() => {
                          setBiometricEnabled(false);
                          localStorage.removeItem('biometricEnabled');
                          alert('Biometric dinonaktifkan');
                        }} className="text-xs text-red-400 hover:underline">
                          Nonaktifkan
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="border border-white/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <FaKey className="text-yellow-400 text-xl" />
                    <span className="font-semibold">Change Password</span>
                  </div>
                  <button onClick={() => setShowChangePassword(!showChangePassword)} className="text-sm bg-yellow-500/20 px-3 py-1 rounded-full hover:bg-yellow-500/30">
                    {showChangePassword ? 'Cancel' : 'Ganti Password'}
                  </button>
                  
                  {showChangePassword && (
                    <div className="mt-3 space-y-2">
                      <input type="password" placeholder="Password Lama" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-sm" />
                      <input type="password" placeholder="Password Baru (min 8 karakter)" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-sm" />
                      <input type="password" placeholder="Konfirmasi Password Baru" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-sm" />
                      <button onClick={changePassword} className="w-full bg-purple-500 py-1 rounded-lg text-sm">Simpan Password Baru</button>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="border border-white/20 rounded-lg p-3 mt-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FaQuestionCircle className="text-purple-400 text-xl" />
                    <span className="font-semibold">Pertanyaan Keamanan</span>
                  </div>
                  <button onClick={() => setShowSecurityQuestions(!showSecurityQuestions)} className="text-sm bg-purple-500/20 px-3 py-1 rounded-full">
                    {showSecurityQuestions ? 'Selesai' : 'Atur'}
                  </button>
                </div>
                
                {showSecurityQuestions && (
                  <div className="space-y-3">
                    {securityQuestions.map((q, idx) => (
                      <div key={q.id}>
                        <label className="text-xs text-zinc-400">{q.question}</label>
                        <input type="text" placeholder="Jawaban" value={q.answer} onChange={(e) => {
                          const newQuestions = [...securityQuestions];
                          newQuestions[idx].answer = e.target.value;
                          setSecurityQuestions(newQuestions);
                        }} className="w-full p-2 rounded-lg bg-white/10 border border-white/20 text-sm" />
                      </div>
                    ))}
                    <button onClick={saveSecurityQuestions} className="w-full bg-green-500/20 py-1 rounded-lg text-sm flex items-center justify-center gap-2">
                      <FaRegSave /> Simpan Pertanyaan Keamanan
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* PROFILE SETTINGS */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2"><FaUser className="text-purple-400" /> Profile Settings</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div><label className="block text-sm text-zinc-400 mb-1">Full Name</label><input type="text" value={settings.name} onChange={(e) => setSettings({...settings, name: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div><label className="block text-sm text-zinc-400 mb-1">Title</label><input type="text" value={settings.title} onChange={(e) => setSettings({...settings, title: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div><label className="block text-sm text-zinc-400 mb-1">Location</label><input type="text" value={settings.location} onChange={(e) => setSettings({...settings, location: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div><label className="block text-sm text-zinc-400 mb-1">Email</label><input type="email" value={settings.email} onChange={(e) => setSettings({...settings, email: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div className="md:col-span-2"><label className="block text-sm text-zinc-400 mb-1">Phone</label><input type="text" value={settings.phone} onChange={(e) => setSettings({...settings, phone: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div className="md:col-span-2"><label className="block text-sm text-zinc-400 mb-1">Bio</label><textarea value={settings.bio} onChange={(e) => setSettings({...settings, bio: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" rows="3" /></div>
              </div>
            </div>

            {/* SOCIAL MEDIA */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3"><FaLink className="text-cyan-400 inline mr-2" /> Social Media</h3>
              <div className="grid gap-3">
                <div className="flex items-center gap-2"><FaInstagram className="text-pink-400" /><input type="text" value={settings.instagram} onChange={(e) => setSettings({...settings, instagram: e.target.value})} className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div className="flex items-center gap-2"><FaGithub className="text-white" /><input type="text" value={settings.github} onChange={(e) => setSettings({...settings, github: e.target.value})} className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div className="flex items-center gap-2"><FaTiktok className="text-white" /><input type="text" value={settings.tiktok} onChange={(e) => setSettings({...settings, tiktok: e.target.value})} className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div className="flex items-center gap-2"><FaWhatsapp className="text-green-400" /><input type="text" value={settings.whatsapp} onChange={(e) => setSettings({...settings, whatsapp: e.target.value})} className="flex-1 p-2 rounded-lg bg-white/10 border border-white/20" /></div>
              </div>
            </div>

            {/* STATS */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3"><FaBriefcase className="text-yellow-400 inline mr-2" /> Stats</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div><label className="text-sm">Projects</label><input type="text" value={settings.projectsCount} onChange={(e) => setSettings({...settings, projectsCount: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div><label className="text-sm">Hours of Code</label><input type="text" value={settings.hoursCode} onChange={(e) => setSettings({...settings, hoursCode: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div><label className="text-sm">Semester</label><input type="text" value={settings.semester} onChange={(e) => setSettings({...settings, semester: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></div>
                <div><label className="text-sm">Commitment</label><input type="text" value={settings.commitment} onChange={(e) => setSettings({...settings, commitment: e.target.value})} className="w-full p-2 rounded-lg bg-white/10 border border-white/20" /></div>
              </div>
            </div>

            {/* SKILLS */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3"><FaGraduationCap className="text-green-400 inline mr-2" /> Skills</h3>
              <div className="grid md:grid-cols-2 gap-3">
                <div><label>HTML: {settings.htmlSkill}%</label><input type="range" min="0" max="100" value={settings.htmlSkill} onChange={(e) => setSettings({...settings, htmlSkill: parseInt(e.target.value)})} className="w-full" /></div>
                <div><label>CSS: {settings.cssSkill}%</label><input type="range" min="0" max="100" value={settings.cssSkill} onChange={(e) => setSettings({...settings, cssSkill: parseInt(e.target.value)})} className="w-full" /></div>
                <div><label>JS: {settings.jsSkill}%</label><input type="range" min="0" max="100" value={settings.jsSkill} onChange={(e) => setSettings({...settings, jsSkill: parseInt(e.target.value)})} className="w-full" /></div>
                <div><label>React: {settings.reactSkill}%</label><input type="range" min="0" max="100" value={settings.reactSkill} onChange={(e) => setSettings({...settings, reactSkill: parseInt(e.target.value)})} className="w-full" /></div>
                <div><label>UI/UX: {settings.uiuxSkill}%</label><input type="range" min="0" max="100" value={settings.uiuxSkill} onChange={(e) => setSettings({...settings, uiuxSkill: parseInt(e.target.value)})} className="w-full" /></div>
                <div><label>Design: {settings.designSkill}%</label><input type="range" min="0" max="100" value={settings.designSkill} onChange={(e) => setSettings({...settings, designSkill: parseInt(e.target.value)})} className="w-full" /></div>
              </div>
            </div>

            {/* MUSIC */}
            <div className="border border-white/10 rounded-xl p-4 mb-4">
              <h3 className="text-lg font-semibold mb-3"><FaMusic className="text-cyan-400 inline mr-2" /> Music</h3>
              <div className="mb-4">
                <label className="text-sm">Current: {localStorage.getItem('musicFileName') || settings.musicFile || 'Lagu.mp3'}</label>
                {localStorage.getItem('uploadedMusic') && <button onClick={resetMusic} className="ml-2 text-red-400 text-sm">Reset</button>}
              </div>
              <div className="mb-4">
                <label className="cursor-pointer flex items-center justify-center gap-2 w-full p-2 rounded-lg bg-purple-500/20 border border-purple-500/40"><FaUpload /> Upload MP3<input type="file" accept="audio/mpeg" onChange={handleMusicUpload} className="hidden" /></label>
              </div>
              <div><label>Volume: {settings.musicVolume}%</label><input type="range" min="0" max="100" value={settings.musicVolume} onChange={(e) => setSettings({...settings, musicVolume: parseInt(e.target.value)})} className="w-full" /></div>
            </div>

            {/* INFO */}
            <div className="border border-white/10 rounded-xl p-4 mb-4 bg-purple-500/10">
              <h3 className="text-lg font-semibold mb-2"><FaInfoCircle className="text-yellow-400 inline mr-2" /> Info</h3>
              <p className="text-sm text-zinc-400">
                • 🔐 Default Password: <code className="bg-black/30 px-2 py-0.5 rounded">NurWahyu2024!</code><br />
                • 🛡️ 3 percobaan login, terkunci 30 detik<br />
                • 🔓 Biometric: sidik jari/face ID (jika perangkat mendukung)<br />
                • 🔄 Ganti password di Security Settings<br />
                • ❓ Lupa password? Klik "Lupa Password?" di form login<br />
                • 💾 Semua data tersimpan di localStorage browser
              </p>
            </div>

            <button onClick={saveSettings} className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 py-3 rounded-xl font-semibold hover:scale-105 transition flex items-center justify-center gap-2">
              <FaSave /> Save All Settings & Refresh
            </button>
          </div>
        </div>
      )}
    </>
  );
}