const { useState, useEffect, useMemo, useRef } = React;

const CONFIG = window.RIANG_CONFIG || {};
const API_URL = CONFIG.API_URL || '';

const SUBJECTS = [
  { id: 'mtk', name: 'Matematika', icon: 'fas fa-calculator', color: 'bg-purple-100 text-purple-600' },
  { id: 'pancasila', name: 'Pancasila', icon: 'fas fa-shield-alt', color: 'bg-red-100 text-red-600' },
  { id: 'ipas', name: 'IPAS', icon: 'fas fa-flask', color: 'bg-green-100 text-green-600' },
  { id: 'bindo', name: 'B. Indonesia', icon: 'fas fa-font', color: 'bg-blue-100 text-blue-600' },
  { id: 'agama', name: 'Pend. Agama', icon: 'fas fa-book-reader', color: 'bg-emerald-100 text-emerald-600' },
  { id: 'pjok', name: 'PJOK', icon: 'fas fa-running', color: 'bg-orange-100 text-orange-600' },
  { id: 'seni', name: 'Seni Budaya', icon: 'fas fa-palette', color: 'bg-pink-100 text-pink-600' },
  { id: 'tik', name: 'Informatika', icon: 'fas fa-laptop-code', color: 'bg-cyan-100 text-cyan-600' },
  { id: 'bing', name: 'B. Inggris', icon: 'fas fa-language', color: 'bg-indigo-100 text-indigo-600' },
  { id: 'lampung', name: 'B. Lampung', icon: 'fas fa-banjo', color: 'bg-yellow-100 text-pink-600' },
  { id: 'game', name: 'Game PID', icon: 'fas fa-gamepad', color: 'bg-violet-100 text-violet-600' },
  { id: 'video', name: 'Video Pembelajaran', icon: 'fas fa-play-circle', color: 'bg-rose-100 text-rose-600' },
  { id: 'buku', name: 'Buku Pelajaran (Digital)', icon: 'fas fa-book', color: 'bg-teal-100 text-teal-600' },
  { id: 'administrasi', name: 'Administrasi Guru', icon: 'fas fa-folder-open', color: 'bg-slate-200 text-slate-600' }
];

const NAV_ITEMS = [
  { id: 'hero', icon: 'fa-home', labelShort: 'Home', labelLong: 'Beranda' },
  { id: 'services', icon: 'fa-book-open', labelShort: 'Belajar', labelLong: 'Program Belajar' },
  { id: 'contributors', icon: 'fa-trophy', labelShort: 'Kontributor', labelLong: 'Kontributor' },
  { id: 'testimoni', icon: 'fa-comment-dots', labelShort: 'Ulasan', labelLong: 'Testimoni' }
];

const FALLBACK_MEDIA = [
  { id: 1, judul: 'Petualangan Angka', kontributor: 'Budi Santoso', mapel: 'Matematika', kelas: 'Kelas 4', jenis: 'Permainan', rating: '5', likes: 25, link: '#', deskripsi: 'Game seru belajar matematika.' },
  { id: 2, judul: 'Sejarah Kemerdekaan', kontributor: 'Siti Aminah', mapel: 'Pancasila', kelas: 'Kelas 5', jenis: 'Video Pembelajaran', rating: '4', likes: 40, link: '#', deskripsi: 'Video interaktif sejarah RI.' },
  { id: 3, judul: 'Konsep Dasar Statistika & Olah Data', kontributor: 'Ahmad Dahlan', mapel: 'Matematika', kelas: 'Kelas 8', jenis: 'Video Pembelajaran', rating: '5', likes: 58, link: '#', deskripsi: 'Video penjelasan interaktif materi penyajian data, mean, median, dan modus.' },
  { id: 4, judul: 'Kartu Tantangan IPAS', kontributor: 'Rina Wulandari', mapel: 'IPAS', kelas: 'Kelas 6', jenis: 'Media Ajar', rating: '5', likes: 32, link: '#', deskripsi: 'Aktivitas bermain sambil memahami konsep sains dan lingkungan.' },
  { id: 5, judul: 'Cerita Pancasila untuk Anak', kontributor: 'Dwi Lestari', mapel: 'Pancasila', kelas: 'Kelas 3', jenis: 'Bahan Ajar', rating: '4', likes: 18, link: '#', deskripsi: 'Materi ringkas untuk mengenalkan nilai Pancasila melalui cerita.' },
  { id: 6, judul: 'Bermain Kata Bahasa Indonesia', kontributor: 'Fajar Pratama', mapel: 'B. Indonesia', kelas: 'Kelas 2', jenis: 'Permainan Interaktif', rating: '5', likes: 29, link: '#', deskripsi: 'Permainan sederhana untuk melatih kosakata dan pemahaman bacaan.' },
  { id: 7, judul: 'Infografis Energi', kontributor: 'Budi Santoso', mapel: 'IPAS', kelas: 'Kelas 5', jenis: 'Infografis', rating: '4', likes: 21, link: '#', deskripsi: 'Infografis singkat tentang sumber dan perubahan energi.' },
  { id: 8, judul: 'E-book Bahasa Inggris Dasar', kontributor: 'Siti Aminah', mapel: 'B. Inggris', kelas: 'Kelas 6', jenis: 'E-book', rating: '5', likes: 36, link: '#', deskripsi: 'Kumpulan latihan kosakata dan ungkapan Bahasa Inggris dasar.' }
];

const FALLBACK_CONTRIBUTORS = [
  { id: 1, name: 'Budi Santoso', role: 'Guru SD N 1', initial: 'BS', desc: 'Pengembang Media' },
  { id: 2, name: 'Siti Aminah', role: 'Guru SD N 2', initial: 'SA', desc: 'Kreator Video' },
  { id: 3, name: 'Ahmad Dahlan', role: 'Guru SD N 4', initial: 'AD', desc: 'Kreator Media' },
  { id: 4, name: 'Rina Wulandari', role: 'Guru SD N 8', initial: 'RW', desc: 'Kreator IPAS' },
  { id: 5, name: 'Dwi Lestari', role: 'Guru SD N 10', initial: 'DL', desc: 'Penulis Bahan Ajar' }
];

const FALLBACK_TESTIMONIALS = [
  { id: 1, name: 'Andi', role: 'Guru', quote: 'Materinya membantu saya menemukan ide pembelajaran yang lebih menyenangkan.', rating: '5' },
  { id: 2, name: 'Nisa', role: 'Siswa', quote: 'Belajarnya jadi lebih seru karena ada permainan dan video.', rating: '5' },
  { id: 3, name: 'Rudi', role: 'Orang Tua', quote: 'Anak saya lebih tertarik belajar di rumah setelah mencoba beberapa materi.', rating: '4' }
];

const ICONS = {
  'Permainan': 'fa-gamepad',
  'Permainan Interaktif': 'fa-gamepad',
  'Video Pembelajaran': 'fa-play-circle',
  'Bahan Ajar': 'fa-book-open',
  'E-book': 'fa-book',
  'Artikel': 'fa-newspaper',
  'Media Ajar': 'fa-chalkboard',
  'Infografis': 'fa-chart-pie',
  'Augmented Reality (AR)': 'fa-vr-cardboard'
};

function getIcon(jenis) {
  if (!jenis) return 'fa-box-open';
  if (jenis.includes('Permainan')) return 'fa-gamepad';
  if (jenis.includes('Video')) return 'fa-play-circle';
  if (jenis.includes('Bahan Ajar') || jenis.includes('E-book') || jenis.includes('Artikel')) return 'fa-book-open';
  return ICONS[jenis] || 'fa-box-open';
}

function App() {
  const [currentTab, setCurrentTab] = useState('hero');
  const [isLoadingAPI, setIsLoadingAPI] = useState(false);
  const [globalNotification, setGlobalNotification] = useState({ msg: '', type: 'success' });
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);
  const [showUserAuthModal, setShowUserAuthModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', role: 'Siswa' });

  const [mediaList, setMediaList] = useState([]);
  const [contributors, setContributors] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [reports, setReports] = useState([]);
  const [likedItems, setLikedItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem('riang_liked') || '[]'); } catch { return []; }
  });

  const [selectedSubject, setSelectedSubject] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [heroSearchQuery, setHeroSearchQuery] = useState('');
  const [heroSearchFilter, setHeroSearchFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [testiCurrentPage, setTestiCurrentPage] = useState(1);
  const [servicesFilterClass, setServicesFilterClass] = useState('all');
  const [servicesFilterType, setServicesFilterType] = useState('all');

  const [reportModalConfig, setReportModalConfig] = useState({ isOpen: false, mediaId: null, mediaTitle: '' });
  const [reportForm, setReportForm] = useState({ reason: '', detail: '' });
  const [deleteModalConfig, setDeleteModalConfig] = useState({ isOpen: false, type: null, id: null });
  const [isTestiModalOpen, setIsTestiModalOpen] = useState(false);
  const [publicTesti, setPublicTesti] = useState({ quote: '', rating: '5' });

  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [adminTab, setAdminTab] = useState('media');

  const initialFormMedia = { judul: '', kontributor: '', mapel: '', kelas: '', jenis: '', rating: '5', link: '', deskripsi: '', kurator: '', likes: 0 };
  const [formMedia, setFormMedia] = useState(initialFormMedia);
  const [editMediaId, setEditMediaId] = useState(null);
  const [adminMediaSearch, setAdminMediaSearch] = useState('');

  const initialFormContrib = { name: '', role: '', initial: '', desc: '' };
  const [formContrib, setFormContrib] = useState(initialFormContrib);
  const [editContribId, setEditContribId] = useState(null);
  const [adminContribSearch, setAdminContribSearch] = useState('');
  const [adminContribSort, setAdminContribSort] = useState('name-asc');

  const initialFormTesti = { name: '', role: '', quote: '', rating: '5' };
  const [formTesti, setFormTesti] = useState(initialFormTesti);
  const [editTestiId, setEditTestiId] = useState(null);

  const lastActionTime = useRef(0);
  const sliderRef = useRef(null);
  const topSliderRef = useRef(null);

  const showToast = (msg, type = 'success') => {
    setGlobalNotification({ msg, type });
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => setGlobalNotification({ msg: '', type: 'success' }), 3200);
  };

  useEffect(() => {
    const handleFullscreenChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    try {
      const savedUser = localStorage.getItem('riang_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
    } catch (_) {}
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const fetchBackendData = async () => {
      setIsLoadingAPI(true);
      try {
        if (!API_URL) throw new Error('API_URL kosong');
        const response = await fetch(API_URL, { method: 'GET', cache: 'no-store' });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const result = await response.json();
        setMediaList(Array.isArray(result.media) ? result.media : []);
        setContributors(Array.isArray(result.contributors) ? result.contributors : []);
        setTestimonials(Array.isArray(result.testimonials) ? result.testimonials : []);
        setReports(Array.isArray(result.reports) ? result.reports : []);
      } catch (error) {
        console.warn('Backend tidak tersedia. Menggunakan data fallback.', error);
        setMediaList(FALLBACK_MEDIA);
        setContributors(FALLBACK_CONTRIBUTORS);
        setTestimonials(FALLBACK_TESTIMONIALS);
        setReports([]);
      } finally {
        setIsLoadingAPI(false);
      }
    };
    fetchBackendData();
  }, []);

  useEffect(() => {
    localStorage.setItem('riang_liked', JSON.stringify(likedItems));
  }, [likedItems]);

  useEffect(() => {
    setCurrentPage(1);
    setSearchQuery('');
  }, [selectedSubject, itemsPerPage, servicesFilterClass, servicesFilterType]);

  useEffect(() => {
    if (!currentUser) return;
    // Keep session representation compatible with the reconstructed frontend.
    localStorage.setItem('riang_user', JSON.stringify(currentUser));
  }, [currentUser]);

  const postToBackend = async (actionType, payloadData) => {
    if (!API_URL) return;
    try {
      const enrichedPayload = {
        ...payloadData,
        _actorName: currentUser ? currentUser.name : 'Anonymous',
        _actorRole: currentUser ? currentUser.role : 'Guest'
      };
      await fetch(API_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: actionType, data: enrichedPayload })
      });
    } catch (error) {
      console.warn('POST backend gagal:', error);
    }
  };

  const calculatePoints = (contributorName) => mediaList.reduce((pts, m) => {
    if (m.kontributor !== contributorName) return pts;
    const rating = parseInt(m.rating, 10) || 0;
    return pts + ({ 5: 10, 4: 8, 3: 6, 2: 4, 1: 2 }[rating] || 0);
  }, 0);

  const rankedContributors = useMemo(
    () => [...contributors].map(c => ({ ...c, poin: calculatePoints(c.name) })).sort((a, b) => b.poin - a.poin),
    [contributors, mediaList]
  );

  const subjectFilteredMedia = useMemo(() => {
    if (!selectedSubject) return mediaList;
    return mediaList.filter(m => {
      if (selectedSubject.id === 'video') return (m.jenis || '').toLowerCase().includes('video') || m.mapel === 'Video Pembelajaran';
      if (selectedSubject.id === 'game') return (m.jenis || '').toLowerCase().includes('game') || (m.jenis || '').toLowerCase().includes('permainan') || m.mapel === 'Game PID';
      return m.mapel === selectedSubject.name;
    });
  }, [mediaList, selectedSubject]);

  const uniqueClasses = useMemo(() => [...new Set(subjectFilteredMedia.map(m => m.kelas).filter(Boolean))].sort(), [subjectFilteredMedia]);
  const uniqueTypes = useMemo(() => [...new Set(subjectFilteredMedia.map(m => m.jenis).filter(Boolean))].sort(), [subjectFilteredMedia]);

  const processedMedia = useMemo(() => {
    let sorted = [...mediaList].sort((a, b) => (b.likes || 0) - (a.likes || 0));
    if (selectedSubject) {
      if (selectedSubject.id === 'video') sorted = sorted.filter(m => (m.jenis || '').toLowerCase().includes('video') || m.mapel === 'Video Pembelajaran');
      else if (selectedSubject.id === 'game') sorted = sorted.filter(m => (m.jenis || '').toLowerCase().includes('game') || (m.jenis || '').toLowerCase().includes('permainan') || m.mapel === 'Game PID');
      else sorted = sorted.filter(m => m.mapel === selectedSubject.name);
    }
    if (servicesFilterClass !== 'all') sorted = sorted.filter(m => m.kelas === servicesFilterClass);
    if (servicesFilterType !== 'all') sorted = sorted.filter(m => m.jenis === servicesFilterType);
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      sorted = sorted.filter(m => [m.judul, m.kelas, m.jenis, m.kontributor, m.mapel].some(v => (v || '').toLowerCase().includes(q)));
    }
    return sorted;
  }, [mediaList, selectedSubject, servicesFilterClass, servicesFilterType, searchQuery]);

  const filteredHeroMedia = useMemo(() => {
    if (!heroSearchQuery.trim()) return [];
    const q = heroSearchQuery.toLowerCase().trim();
    return mediaList.filter(item => {
      const matchTitle = (item.judul || '').toLowerCase().includes(q);
      const matchContrib = (item.kontributor || '').toLowerCase().includes(q);
      const matchType = (item.jenis || '').toLowerCase().includes(q);
      const matchSubject = (item.mapel || '').toLowerCase().includes(q);
      if (heroSearchFilter === 'title') return matchTitle;
      if (heroSearchFilter === 'contrib') return matchContrib;
      if (heroSearchFilter === 'type') return matchType;
      if (heroSearchFilter === 'subject') return matchSubject;
      return matchTitle || matchContrib || matchType || matchSubject;
    });
  }, [mediaList, heroSearchQuery, heroSearchFilter]);

  const recentMedia = useMemo(() => [...mediaList].sort((a, b) => (b.id || 0) - (a.id || 0)).slice(0, 8), [mediaList]);
  const featuredMedia = useMemo(() => [...mediaList].sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 8), [mediaList]);

  useEffect(() => {
    if (currentTab !== 'hero' || !recentMedia.length) return;
    const interval = setInterval(() => {
      if (!sliderRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) sliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      else sliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }, 3500);
    return () => clearInterval(interval);
  }, [currentTab, recentMedia]);

  useEffect(() => {
    if (currentTab !== 'hero' || !featuredMedia.length) return;
    const interval = setInterval(() => {
      if (!topSliderRef.current) return;
      const { scrollLeft, scrollWidth, clientWidth } = topSliderRef.current;
      if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth - 10) topSliderRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      else topSliderRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }, 4000);
    return () => clearInterval(interval);
  }, [currentTab, featuredMedia]);

  const paginatedMedia = processedMedia.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalMediaPages = Math.ceil(processedMedia.length / itemsPerPage) || 1;
  const testiItemsPerPage = 6;
  const paginatedTesti = testimonials.slice((testiCurrentPage - 1) * testiItemsPerPage, testiCurrentPage * testiItemsPerPage);
  const totalTestiPages = Math.ceil(testimonials.length / testiItemsPerPage) || 1;

  const filteredAdminMedia = useMemo(() => {
    if (!adminMediaSearch.trim()) return mediaList;
    const q = adminMediaSearch.toLowerCase().trim();
    return mediaList.filter(m => [m.judul, m.kontributor, m.mapel, m.jenis].some(v => (v || '').toLowerCase().includes(q)));
  }, [mediaList, adminMediaSearch]);

  const filteredAdminContribs = useMemo(() => {
    let result = [...contributors].map(c => ({ ...c, poin: calculatePoints(c.name) }));
    if (adminContribSearch.trim()) {
      const q = adminContribSearch.toLowerCase().trim();
      result = result.filter(c => [c.name, c.role].some(v => (v || '').toLowerCase().includes(q)));
    }
    result.sort((a, b) => {
      if (adminContribSort === 'name-asc') return (a.name || '').localeCompare(b.name || '');
      if (adminContribSort === 'name-desc') return (b.name || '').localeCompare(a.name || '');
      if (adminContribSort === 'poin-asc') return (a.poin || 0) - (b.poin || 0);
      return (b.poin || 0) - (a.poin || 0);
    });
    return result;
  }, [contributors, adminContribSearch, adminContribSort, mediaList]);

  const switchTab = tabId => {
    setCurrentTab(tabId);
    if (tabId !== 'services') setSelectedSubject(null);
    setServicesFilterClass('all');
    setServicesFilterType('all');
  };

  const requireAuth = callback => {
    if (!currentUser) {
      setPendingAction(() => callback);
      setShowUserAuthModal(true);
      showToast('Silakan isi nama Anda terlebih dahulu.', 'warning');
    } else callback();
  };

  const handleUserLogin = e => {
    e.preventDefault();
    const user = { id: Date.now(), name: userForm.name.trim(), role: userForm.role };
    if (!user.name) return;
    setCurrentUser(user);
    setShowUserAuthModal(false);
    showToast(`Selamat datang, ${user.name}!`);
    if (pendingAction) {
      window.setTimeout(() => pendingAction(), 300);
      setPendingAction(null);
    }
  };

  const handleUserLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('riang_user');
    showToast('Berhasil keluar profil.');
  };

  const executeLike = media => {
    const now = Date.now();
    if (now - lastActionTime.current < 1500) {
      showToast('Jangan klik terlalu cepat! Tunggu sebentar.', 'warning');
      return;
    }
    lastActionTime.current = now;
    const isLiked = likedItems.includes(media.id);
    setLikedItems(isLiked ? likedItems.filter(id => id !== media.id) : [...likedItems, media.id]);
    setMediaList(current => current.map(m => m.id === media.id ? { ...m, likes: (m.likes || 0) + (isLiked ? -1 : 1) } : m));
    postToBackend('TOGGLE_LIKE', { id: media.id, isLiked: !isLiked });
    if (!isLiked) showToast(`Kamu menyukai materi "${media.judul}"! ❤`);
  };

  const handleLikeClick = media => requireAuth(() => executeLike(media));
  const handleReportClick = media => requireAuth(() => setReportModalConfig({ isOpen: true, mediaId: media.id, mediaTitle: media.judul }));

  const handleReportSubmit = e => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastActionTime.current < 5000) {
      showToast('Harap tunggu sebelum mengirim laporan lagi.', 'error');
      return;
    }
    lastActionTime.current = now;
    const payload = {
      name: currentUser.name,
      school: currentUser.role,
      reason: reportForm.reason,
      detail: reportForm.detail,
      mediaId: reportModalConfig.mediaId,
      mediaTitle: reportModalConfig.mediaTitle,
      date: new Date().toLocaleString('id-ID')
    };
    setReports(current => [payload, ...current]);
    postToBackend('REPORT_MEDIA', payload);
    showToast('Laporan berhasil dikirim dan akan ditinjau Admin.');
    setReportModalConfig({ isOpen: false, mediaId: null, mediaTitle: '' });
    setReportForm({ reason: '', detail: '' });
  };

  const handleAdminAuth = e => {
    e.preventDefault();
    if (adminPasswordInput === CONFIG.ADMIN_PASSWORD) {
      setIsAdminAuthenticated(true);
      setShowPasswordModal(false);
      setPasswordError('');
      switchTab('admin');
    } else {
      setPasswordError('Password salah!');
    }
    setAdminPasswordInput('');
  };

  const handleMediaSubmit = e => {
    e.preventDefault();
    const payload = { ...formMedia, id: editMediaId || Date.now() };
    if (editMediaId) {
      setMediaList(current => current.map(m => m.id === editMediaId ? payload : m));
      postToBackend('EDIT_MEDIA', payload);
      showToast('Media diperbarui!');
    } else {
      setMediaList(current => [...current, payload]);
      postToBackend('ADD_MEDIA', payload);
      showToast('Media ditambahkan!');
    }
    setFormMedia(initialFormMedia);
    setEditMediaId(null);
  };

  const handleContribSubmit = e => {
    e.preventDefault();
    const payload = { ...formContrib, id: editContribId || Date.now() };
    if (editContribId) {
      setContributors(current => current.map(c => c.id === editContribId ? payload : c));
      postToBackend('EDIT_CONTRIB', payload);
      showToast('Kontributor diperbarui!');
    } else {
      setContributors(current => [...current, payload]);
      postToBackend('ADD_CONTRIB', payload);
      showToast('Kontributor ditambahkan!');
    }
    setFormContrib(initialFormContrib);
    setEditContribId(null);
  };

  const handleTestiSubmit = e => {
    e.preventDefault();
    const payload = { ...formTesti, id: editTestiId || Date.now() };
    if (editTestiId) {
      setTestimonials(current => current.map(t => t.id === editTestiId ? payload : t));
      postToBackend('EDIT_TESTI', payload);
      showToast('Testimoni diperbarui!');
    } else {
      setTestimonials(current => [...current, payload]);
      postToBackend('ADD_TESTI', payload);
      showToast('Testimoni ditambahkan!');
    }
    setFormTesti(initialFormTesti);
    setEditTestiId(null);
  };

  const handlePublicTestiSubmit = e => {
    e.preventDefault();
    requireAuth(() => {
      const payload = { name: currentUser.name, role: currentUser.role, quote: publicTesti.quote.trim(), rating: publicTesti.rating, id: Date.now() };
      if (!payload.quote) return;
      setTestimonials(current => [payload, ...current]);
      postToBackend('ADD_TESTI', payload);
      setPublicTesti({ quote: '', rating: '5' });
      setIsTestiModalOpen(false);
      showToast('Ulasan berhasil dikirim!');
    });
  };

  const requestDelete = (type, id) => setDeleteModalConfig({ isOpen: true, type, id });
  const executeDelete = () => {
    const { type, id } = deleteModalConfig;
    if (type === 'media') {
      setMediaList(current => current.filter(m => m.id !== id));
      postToBackend('DELETE_MEDIA', { id });
    }
    if (type === 'kontributor') {
      setContributors(current => current.filter(c => c.id !== id));
      postToBackend('DELETE_CONTRIB', { id });
    }
    if (type === 'testimoni') {
      setTestimonials(current => current.filter(t => t.id !== id));
      postToBackend('DELETE_TESTI', { id });
    }
    setDeleteModalConfig({ isOpen: false, type: null, id: null });
    showToast('Data dihapus!');
  };

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen().catch(() => showToast('Gagal masuk layar penuh.', 'error'));
    else document.exitFullscreen();
  };

  const handleScrollSlider = dir => sliderRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  const handleScrollTopSlider = dir => topSliderRef.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:hidden shrink-0 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-md">R</div>
          <span className="font-extrabold text-xl tracking-tight text-slate-900">RIANG</span>
        </div>
        <div>
          {currentUser ? (
            <button onClick={handleUserLogout} className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-700 font-bold flex items-center justify-center text-xs" title="Keluar">{currentUser.name.charAt(0).toUpperCase()}</button>
          ) : (
            <button onClick={() => setShowUserAuthModal(true)} className="px-3 py-1.5 bg-slate-100 text-slate-700 text-xs font-bold rounded-lg">Masuk</button>
          )}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden min-h-0">
        <nav className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 z-40 h-screen sticky top-0">
          <div className="p-5 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-red-500 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md">R</div>
              <span className="font-extrabold text-2xl tracking-tight text-slate-900">RIANG</span>
            </div>
          </div>

          <div className="p-4 mx-3 mt-4 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-between">
            {currentUser ? (
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-600 font-black flex items-center justify-center shrink-0">{currentUser.name.charAt(0).toUpperCase()}</div>
                <div className="overflow-hidden">
                  <div className="font-bold text-slate-800 text-sm truncate">{currentUser.name}</div>
                  <div className="text-xs text-slate-500 truncate">{currentUser.role}</div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col w-full gap-2">
                <span className="text-xs text-slate-500 font-medium">Masuk untuk memberi nilai</span>
                <button onClick={() => setShowUserAuthModal(true)} className="w-full py-2 bg-slate-900 text-white font-bold rounded-lg text-xs hover:bg-slate-800">Buat Profil</button>
              </div>
            )}
            {currentUser && <button onClick={handleUserLogout} className="text-slate-400 hover:text-red-500 ml-2" title="Keluar"><i className="fas fa-sign-out-alt"></i></button>}
          </div>

          <div className="flex-1 overflow-y-auto py-5 px-3 space-y-1 hide-scrollbar">
            {NAV_ITEMS.map(item => (
              <button key={item.id} onClick={() => switchTab(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${currentTab === item.id ? 'bg-red-50 text-red-600 shadow-sm' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}>
                <i className={`fas ${item.icon} text-lg w-5 text-center`}></i>{item.labelLong}
              </button>
            ))}
            <a href={CONFIG.DONATION_URL} target="_blank" rel="noreferrer" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-slate-500 hover:bg-slate-50 hover:text-slate-800 mt-2">
              <i className="fas fa-hand-holding-heart text-lg w-5 text-center"></i>Donasi
            </a>
          </div>

          <div className="p-3 border-t border-slate-100 space-y-2">
            <button onClick={toggleFullScreen} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all bg-slate-50 text-slate-600 hover:bg-slate-100">
              <i className={`fas ${isFullscreen ? 'fa-compress' : 'fa-expand'} text-lg w-5 text-center`}></i>Layar Penuh
            </button>
            <button onClick={() => isAdminAuthenticated ? switchTab('admin') : setShowPasswordModal(true)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${currentTab === 'admin' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
              <i className="fas fa-cog text-lg w-5 text-center"></i>Admin Panel
            </button>
          </div>
        </nav>

        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 z-50 flex justify-around pb-safe">
          {NAV_ITEMS.map(item => (
            <button key={item.id} onClick={() => switchTab(item.id)} className={`flex-1 py-3 flex flex-col items-center gap-1 ${currentTab === item.id ? 'text-red-500' : 'text-slate-400'}`}>
              <i className={`fas ${item.icon} text-lg`}></i>
              <span className="text-[10px] font-bold">{item.labelShort}</span>
            </button>
          ))}
          <button onClick={() => isAdminAuthenticated ? switchTab('admin') : setShowPasswordModal(true)} className={`flex-1 py-3 flex flex-col items-center gap-1 ${currentTab === 'admin' ? 'text-slate-900' : 'text-slate-400'}`}>
            <i className="fas fa-cog text-lg"></i><span className="text-[10px] font-bold">Admin</span>
          </button>
        </div>

        <main className="flex-1 overflow-y-auto pb-20 md:pb-0 scroll-smooth relative flex flex-col min-w-0">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 md:py-8 w-full flex-1 mb-10">
            {isLoadingAPI && (
              <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[1,2,3].map(i => <div key={i} className="h-28 rounded-2xl skeleton"></div>)}
              </div>
            )}

            {currentTab === 'hero' && (
              <div className="slide-up space-y-12">
                <section className="flex flex-col md:flex-row items-center gap-6 md:gap-10 mt-2">
                  <div className="flex-1 space-y-5 text-center md:text-left">
                    <div className="inline-block px-3 py-1.5 bg-red-100 text-red-600 font-bold rounded-full text-xs">Platform Edukasi Digital</div>
                    <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">Belajar Jadi <br/><span className="text-red-500">RIANG</span> dan <span className="text-slate-900">Menyenangkan!</span></h1>
                    <p className="text-slate-600 text-base leading-relaxed max-w-lg mx-auto md:mx-0">Silahkan akses ratusan materi interaktif yang dibuat oleh guru-guru SD hebat di kota Bandar Lampung.</p>
                    <div className="flex flex-col sm:flex-row items-center gap-3 justify-center md:justify-start">
                      <button onClick={() => switchTab('services')} className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 shadow-lg flex items-center gap-2">Mulai Belajar <i className="fas fa-rocket"></i></button>
                      <a href={CONFIG.ADD_WORK_URL} target="_blank" rel="noreferrer" className="px-6 py-3 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-900 shadow-lg flex items-center gap-2">Tambah Karya <i className="fas fa-plus-circle"></i></a>
                    </div>
                  </div>
                  <div className="flex-1 flex justify-center mt-6 md:mt-0">
                    <img src={CONFIG.ILLUSTRATION_URL} alt="Ilustrasi Belajar" className="w-full max-w-sm object-contain drop-shadow-2xl hover:scale-105 transition-transform" onError={e => { e.currentTarget.src = CONFIG.ILLUSTRATION_FALLBACK; }} />
                  </div>
                </section>

                {recentMedia.length > 0 && (
                  <section className="relative">
                    <div className="flex justify-between items-end mb-4 px-2">
                      <div><h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2"><i className="fas fa-sparkles text-amber-500"></i>Materi Baru Diunggah</h3><p className="text-xs text-slate-500 mt-1">Jelajahi program belajar yang baru saja ditambahkan</p></div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleScrollSlider('left')} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"><i className="fas fa-chevron-left text-xs"></i></button>
                        <button onClick={() => handleScrollSlider('right')} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"><i className="fas fa-chevron-right text-xs"></i></button>
                      </div>
                    </div>
                    <div ref={sliderRef} className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar px-2 scroll-smooth">
                      {recentMedia.map(item => (
                        <div key={item.id} className="min-w-[280px] md:min-w-[320px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-5 text-white shadow-lg snap-start shrink-0 relative overflow-hidden group hover:-translate-y-1 transition-transform">
                          <div className="absolute -right-8 -top-8 text-white/5 text-9xl pointer-events-none"><i className={`fas ${getIcon(item.jenis)}`}></i></div>
                          <div className="absolute top-0 right-0 bg-emerald-500 text-white text-[10px] font-black px-3 py-1 rounded-bl-xl z-20">BARU</div>
                          <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-3 pr-12"><span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-bold rounded-lg border border-white/10">{item.mapel}</span></div>
                            <h4 className="font-bold text-lg leading-tight mb-2 line-clamp-2 text-white">{item.judul}</h4>
                            <p className="text-xs text-slate-300 mb-6 opacity-90"><i className="fas fa-user-edit mr-1"></i>{item.kontributor}</p>
                            <div className="flex items-center justify-between mt-auto border-t border-white/10 pt-3"><div className="text-xs font-bold text-pink-400"><i className="fas fa-heart"></i> {item.likes || 0} Suka</div><a href={item.link || '#'} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold hover:bg-slate-100 shadow-sm inline-flex items-center gap-2">Buka <i className="fas fa-arrow-right"></i></a></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {featuredMedia.length > 0 && (
                  <section className="relative">
                    <div className="flex justify-between items-end mb-4 px-2">
                      <div><h3 className="text-lg md:text-xl font-black text-slate-900 flex items-center gap-2"><i className="fas fa-medal text-amber-500"></i>Program Belajar Unggulan</h3><p className="text-xs text-slate-500 mt-1">Materi terfavorit dengan jumlah apresiasi terbanyak dari pengguna</p></div>
                      <div className="flex gap-2 shrink-0">
                        <button onClick={() => handleScrollTopSlider('left')} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"><i className="fas fa-chevron-left text-xs"></i></button>
                        <button onClick={() => handleScrollTopSlider('right')} className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center transition-colors"><i className="fas fa-chevron-right text-xs"></i></button>
                      </div>
                    </div>
                    <div ref={topSliderRef} className="flex overflow-x-auto gap-4 pb-4 snap-x hide-scrollbar px-2 scroll-smooth">
                      {featuredMedia.map(item => (
                        <div key={item.id} className="min-w-[280px] md:min-w-[320px] bg-gradient-to-br from-indigo-700 to-slate-900 rounded-2xl p-5 text-white shadow-lg snap-start shrink-0 relative overflow-hidden">
                          <div className="absolute -right-8 -top-8 text-white/5 text-9xl pointer-events-none"><i className={`fas ${getIcon(item.jenis)}`}></i></div>
                          <div className="relative z-10 flex flex-col h-full">
                            <div className="flex justify-between items-start mb-3 pr-12"><span className="px-2.5 py-1 bg-white/20 text-white text-[10px] font-bold rounded-lg border border-white/10">{item.mapel}</span></div>
                            <h4 className="font-bold text-lg leading-tight mb-2 line-clamp-2 text-white">{item.judul}</h4>
                            <p className="text-xs text-indigo-200 mb-6 opacity-90"><i className="fas fa-user-edit mr-1"></i>{item.kontributor}</p>
                            <div className="flex items-center justify-between mt-auto border-t border-indigo-700/50 pt-3"><div className="text-xs font-bold text-pink-400"><i className="fas fa-heart"></i> {item.likes || 0} Suka</div><a href={item.link || '#'} target="_blank" rel="noreferrer" className="px-4 py-2 bg-white text-indigo-900 rounded-xl text-xs font-bold hover:bg-indigo-50 shadow-sm inline-flex items-center gap-2">Buka <i className="fas fa-arrow-right"></i></a></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section className="bg-white p-5 md:p-6 rounded-2xl shadow-sm border border-slate-200">
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-4">
                    <div><h3 className="text-lg font-black text-slate-900 flex items-center gap-2"><i className="fas fa-search text-red-500"></i>Cari Konten & Media Pembelajaran</h3><p className="text-xs text-slate-500 mt-1">Cari berdasarkan nama konten, jenis konten, kontributor, atau mata pelajaran</p></div>
                    <div className="flex items-center gap-2 w-full md:w-auto"><span className="text-xs font-bold text-slate-500 shrink-0">Filter:</span><select value={heroSearchFilter} onChange={e => setHeroSearchFilter(e.target.value)} className="w-full md:w-auto px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-700 outline-none"><option value="all">Semua Kriteria</option><option value="title">Nama Konten (Judul)</option><option value="type">Jenis Konten</option><option value="contrib">Nama Kontributor</option><option value="subject">Mata Pelajaran</option></select></div>
                  </div>
                  <div className="relative"><i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i><input type="text" placeholder="Masukkan kata kunci pencarian (misal: Statistika, Budi, Game, Matematika)..." value={heroSearchQuery} onChange={e => setHeroSearchQuery(e.target.value)} className="w-full pl-11 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-500" />{heroSearchQuery && <button onClick={() => setHeroSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-slate-200 text-slate-600 flex items-center justify-center text-xs"><i className="fas fa-times"></i></button>}</div>
                  {heroSearchQuery.trim() && <div className="mt-6 pt-6 border-t border-slate-100">
                    <div className="flex justify-between items-center mb-4"><span className="text-xs font-bold text-slate-600">Hasil Pencarian: <span className="text-red-500 font-black">{filteredHeroMedia.length}</span> media ditemukan</span><button onClick={() => setHeroSearchQuery('')} className="text-xs text-slate-400 hover:text-red-500 font-bold">Bersihkan Pencarian</button></div>
                    {filteredHeroMedia.length > 0 ? <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">{filteredHeroMedia.map(item => (
                      <div key={item.id} className="bg-slate-50 rounded-xl p-4 border border-slate-200 hover:border-red-300 transition-all flex flex-col justify-between">
                        <div><div className="flex justify-between items-start gap-2 mb-2"><span className="px-2 py-0.5 bg-red-100 text-red-600 text-[10px] font-bold rounded-md">{item.kelas || 'Kelas VIII'}</span><span className="px-2 py-0.5 bg-blue-100 text-blue-600 text-[10px] font-bold rounded-md">{item.mapel}</span></div><h4 className="font-bold text-sm text-slate-900 line-clamp-2">{item.judul}</h4><p className="text-xs text-slate-500 mt-1"><i className="fas fa-user-edit mr-1"></i>{item.kontributor}</p><p className="text-xs text-slate-600 mt-2 line-clamp-2">{item.deskripsi}</p></div>
                        <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-200"><span className="text-[10px] font-bold text-slate-500 bg-white px-2 py-1 rounded border border-slate-200"><i className={`fas ${getIcon(item.jenis)} mr-1 text-red-500`}></i>{item.jenis}</span><div className="flex items-center gap-2"><button onClick={() => handleLikeClick(item)} className={`flex items-center gap-1 text-xs font-bold ${likedItems.includes(item.id) ? 'text-red-500' : 'text-slate-400'}`}><i className={`${likedItems.includes(item.id) ? 'fas' : 'far'} fa-heart`}></i>{item.likes || 0}</button><a href={item.link || '#'} target="_blank" rel="noreferrer" className="w-7 h-7 rounded-full bg-red-500 text-white flex items-center justify-center text-xs hover:bg-red-600"><i className="fas fa-external-link-alt"></i></a></div></div>
                      </div>
                    ))}</div> : <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200"><i className="fas fa-search-minus text-3xl mb-2 text-slate-300"></i><p className="text-xs font-medium">Tidak ada konten yang cocok dengan kata kunci "{heroSearchQuery}"</p></div>}
                  </div>}
                </section>

                <section className="grid grid-cols-3 gap-3 md:gap-6 border-t border-slate-200 pt-8">
                  <StatCard value={mediaList.length} label="Total Media" color="text-red-500" />
                  <StatCard value={contributors.length} label="Kontributor" color="text-blue-500" />
                  <StatCard value={rankedContributors.reduce((sum, c) => sum + c.poin, 0)} label="Total Poin" color="text-emerald-500" />
                </section>
              </div>
            )}

            {currentTab === 'services' && !selectedSubject && (
              <div className="slide-up space-y-8">
                <div className="text-center"><h2 className="text-2xl font-black text-slate-900">Pilih Mata Pelajaran</h2><p className="text-slate-500 mt-2">Pilih materi yang ingin kamu pelajari hari ini</p></div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {SUBJECTS.map(sub => <button key={sub.id} onClick={() => { setSelectedSubject(sub); setServicesFilterClass('all'); setServicesFilterType('all'); setSearchQuery(''); }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center gap-3 hover:-translate-y-1 hover:shadow-md transition-all group"><div className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${sub.color} group-hover:scale-110 transition-transform`}><i className={sub.icon}></i></div><span className="font-bold text-slate-700">{sub.name}</span></button>)}
                </div>
              </div>
            )}

            {currentTab === 'services' && selectedSubject && (
              <div className="slide-up space-y-6">
                <div className="flex flex-col gap-4 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
                  <div className="flex items-center gap-3"><button onClick={() => { setSelectedSubject(null); setServicesFilterClass('all'); setServicesFilterType('all'); setSearchQuery(''); }} className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 shrink-0"><i className="fas fa-arrow-left"></i></button><div><h2 className="text-xl font-black text-slate-900">{selectedSubject.name}</h2><p className="text-xs text-slate-500">{processedMedia.length} Media Tersedia (Diurutkan Love Terbanyak)</p></div></div>
                  <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-slate-100">
                    <SelectFilter icon="fa-chalkboard-teacher" value={servicesFilterClass} onChange={setServicesFilterClass} options={uniqueClasses} allLabel="Semua Kelas" />
                    <SelectFilter icon="fa-layer-group" value={servicesFilterType} onChange={setServicesFilterType} options={uniqueTypes} allLabel="Semua Jenis Media" />
                    <div className="w-full sm:w-1/3 relative"><i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i><input type="text" placeholder="Cari materi, kelas..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-500" /></div>
                  </div>
                </div>
                {paginatedMedia.length > 0 ? <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {paginatedMedia.map(item => <MediaCard key={item.id} item={item} liked={likedItems.includes(item.id)} onLike={handleLikeClick} onReport={handleReportClick} />)}
                  </div>
                  <PaginationControls current={currentPage} total={totalMediaPages} onPageChange={setCurrentPage} itemsPerPage={itemsPerPage} onItemsChange={setItemsPerPage} showDropdown />
                </> : <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-slate-300"><i className="fas fa-folder-open text-4xl text-slate-300 mb-3"></i><p className="text-slate-500 font-medium">Belum ada materi untuk pencarian ini.</p></div>}
              </div>
            )}

            {currentTab === 'contributors' && (
              <div className="slide-up space-y-10">
                <div className="text-center"><h2 className="text-2xl font-black text-slate-900">Pahlawan Edukasi (Top Kontributor)</h2><p className="text-slate-500 mt-2">Peringkat dihitung otomatis berdasarkan akumulasi poin rating karya kontributor.</p></div>
                <div className="flex items-end justify-center gap-2 md:gap-6 max-w-2xl mx-auto pt-10 px-2">
                  {rankedContributors.length > 1 && <PodiumItem item={rankedContributors[1]} place={2} tone="silver" />}
                  {rankedContributors.length > 0 && <PodiumItem item={rankedContributors[0]} place={1} tone="gold" />}
                  {rankedContributors.length > 2 && <PodiumItem item={rankedContributors[2]} place={3} tone="bronze" />}
                </div>
                {rankedContributors.length > 3 && <div className="space-y-3 pt-6 border-t border-slate-200 max-w-3xl mx-auto"><h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Kontributor Lainnya</h3><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{rankedContributors.slice(3).map((c, idx) => <div key={c.id || idx} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4"><div className="font-black text-slate-400 text-sm w-7 text-center">#{idx + 4}</div><div className="w-11 h-11 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center font-bold text-slate-700 shrink-0">{c.initial}</div><div className="flex-1 min-w-0"><h4 className="font-bold text-slate-900 text-sm truncate">{c.name}</h4><p className="text-xs text-slate-500 truncate">{c.role}</p></div><div className="text-right shrink-0"><div className="text-sm font-black text-emerald-600">{c.poin}</div><div className="text-[10px] font-bold text-slate-400 uppercase">Poin</div></div></div>)}</div></div>}
              </div>
            )}

            {currentTab === 'testimoni' && (
              <div className="slide-up space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4"><div><h2 className="text-2xl font-black text-slate-900">"Ini Kata Mereka"</h2><p className="text-slate-500">Pengalaman seru belajar dengan Aplikasi RIANG</p></div><button onClick={() => requireAuth(() => setIsTestiModalOpen(true))} className="px-5 py-2.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 shadow-md text-sm"><i className="fas fa-pencil-alt mr-2"></i>Tambah Ulasan</button></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{paginatedTesti.map(t => <TestimonialCard key={t.id} item={t} />)}</div>
                {testimonials.length > testiItemsPerPage && <PaginationControls current={testiCurrentPage} total={totalTestiPages} onPageChange={setTestiCurrentPage} itemsPerPage={testiItemsPerPage} showDropdown={false} />}
              </div>
            )}

            {currentTab === 'admin' && isAdminAuthenticated && (
              <div className="slide-up bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="bg-slate-900 p-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-white"><div><h2 className="text-xl font-black">Panel Administrasi</h2><p className="text-xs text-slate-400">Kelola konten dan pengaturan platform</p></div><button onClick={() => { setIsAdminAuthenticated(false); switchTab('hero'); }} className="px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-bold">Logout Admin</button></div>
                <div className="flex overflow-x-auto border-b border-slate-200 hide-scrollbar">{[
                  { id: 'media', label: 'Kelola Media', icon: 'fa-photo-video' }, { id: 'kontributor', label: 'Kontributor', icon: 'fa-users' }, { id: 'testimoni', label: 'Testimoni', icon: 'fa-comments' }, { id: 'laporan', label: 'Laporan & Love', icon: 'fa-chart-bar' }
                ].map(tab => <button key={tab.id} onClick={() => setAdminTab(tab.id)} className={`px-6 py-4 font-bold text-sm whitespace-nowrap transition-colors border-b-2 ${adminTab === tab.id ? 'border-slate-900 text-slate-900' : 'border-transparent text-slate-500 hover:text-slate-800'}`}><i className={`fas ${tab.icon} mr-2`}></i>{tab.label}</button>)}</div>
                <div className="p-6">
                  {adminTab === 'media' && <AdminMedia mediaList={filteredAdminMedia} contributors={contributors} subjects={SUBJECTS} form={formMedia} setForm={setFormMedia} editing={!!editMediaId} onSubmit={handleMediaSubmit} onEdit={m => { setFormMedia(m); setEditMediaId(m.id); window.scrollTo({top: 0, behavior: 'smooth'}); }} onDelete={id => requestDelete('media', id)} search={adminMediaSearch} setSearch={setAdminMediaSearch} initialForm={initialFormMedia} onCancel={() => { setFormMedia(initialFormMedia); setEditMediaId(null); }} />}
                  {adminTab === 'kontributor' && <AdminContributors list={filteredAdminContribs} form={formContrib} setForm={setFormContrib} editing={!!editContribId} onSubmit={handleContribSubmit} onEdit={c => { setFormContrib(c); setEditContribId(c.id); window.scrollTo({top: 0, behavior: 'smooth'}); }} onDelete={id => requestDelete('kontributor', id)} search={adminContribSearch} setSearch={setAdminContribSearch} sort={adminContribSort} setSort={setAdminContribSort} initialForm={initialFormContrib} onCancel={() => { setFormContrib(initialFormContrib); setEditContribId(null); }} total={contributors.length} />}
                  {adminTab === 'testimoni' && <AdminTestimonials list={testimonials} form={formTesti} setForm={setFormTesti} editing={!!editTestiId} onSubmit={handleTestiSubmit} onEdit={t => { setFormTesti(t); setEditTestiId(t.id); }} onDelete={id => requestDelete('testimoni', id)} initialForm={initialFormTesti} onCancel={() => { setFormTesti(initialFormTesti); setEditTestiId(null); }} />}
                  {adminTab === 'laporan' && <AdminReports reports={reports} />}
                </div>
              </div>
            )}
          </div>

          <footer className="bg-slate-900 text-slate-300 py-10 px-5 mt-auto w-full">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center md:items-start gap-8 text-center md:text-left">
              <div className="flex-1"><div className="flex items-center justify-center md:justify-start gap-2 text-white font-black text-2xl mb-2"><div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center text-sm">R</div>RIANG</div><p className="text-sm text-slate-400 max-w-sm mx-auto md:mx-0">Platform Edukasi Digital Terbaik oleh Kombel SD GTK Bandar Lampung</p></div>
              <div className="flex flex-col items-center md:items-end gap-6 shrink-0"><div className="flex gap-4">
                <SocialButton href={CONFIG.SOCIALS?.instagram} icon="fa-instagram" hover="hover:bg-pink-600" />
                <SocialButton href={CONFIG.SOCIALS?.tiktok} icon="fa-tiktok" hover="hover:bg-black" />
                <SocialButton href={CONFIG.SOCIALS?.youtube} icon="fa-youtube" hover="hover:bg-red-600" />
                <SocialButton href={CONFIG.SOCIALS?.facebook} icon="fa-facebook-f" hover="hover:bg-blue-600" />
              </div><div className="flex flex-col items-center md:items-end gap-2"><span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Statistik Pengunjung Global</span><div className="bg-white/5 p-2 rounded-xl border border-slate-700/50 shadow-lg inline-block"><a href="https://info.flagcounter.com/yDHU" target="_blank" rel="noreferrer"><img src={CONFIG.FLAGCOUNTER_URL} alt="Flag Counter" className="rounded-lg max-w-full h-auto opacity-90" /></a></div></div></div>
            </div>
            <div className="max-w-5xl mx-auto mt-10 pt-6 border-t border-slate-800 text-xs text-center text-slate-500">&copy; {new Date().getFullYear()} RIANG - Kombel SD GTK Bandar Lampung. All rights reserved.</div>
          </footer>
        </main>
      </div>

      {globalNotification.msg && <div className={`fixed top-4 left-1/2 -translate-x-1/2 z-[200] px-4 py-3 rounded-xl shadow-xl text-sm font-bold text-white slide-down ${globalNotification.type === 'error' ? 'bg-red-600' : globalNotification.type === 'warning' ? 'bg-amber-500' : 'bg-slate-900'}`} role="status">{globalNotification.msg}</div>}
      {showUserAuthModal && <UserAuthModal form={userForm} setForm={setUserForm} onSubmit={handleUserLogin} onClose={() => { setShowUserAuthModal(false); setPendingAction(null); }} />}
      {showPasswordModal && <AdminPasswordModal value={adminPasswordInput} setValue={setAdminPasswordInput} error={passwordError} onSubmit={handleAdminAuth} onClose={() => { setShowPasswordModal(false); setPasswordError(''); }} />}
      {reportModalConfig.isOpen && <ReportModal currentUser={currentUser} config={reportModalConfig} form={reportForm} setForm={setReportForm} onSubmit={handleReportSubmit} onClose={() => setReportModalConfig({ isOpen: false, mediaId: null, mediaTitle: '' })} />}
      {isTestiModalOpen && <PublicTestimonialModal currentUser={currentUser} value={publicTesti} setValue={setPublicTesti} onSubmit={handlePublicTestiSubmit} onClose={() => setIsTestiModalOpen(false)} />}
      {deleteModalConfig.isOpen && <DeleteModal onConfirm={executeDelete} onClose={() => setDeleteModalConfig({ isOpen: false, type: null, id: null })} />}
    </div>
  );
}

function StatCard({ value, label, color }) {
  return <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-slate-100 text-center"><div className={`text-3xl md:text-4xl font-black ${color}`}>{value}</div><div className="text-xs md:text-sm font-bold text-slate-500 mt-1">{label}</div></div>;
}

function SelectFilter({ icon, value, onChange, options, allLabel }) {
  return <div className="w-full sm:w-1/3 relative"><i className={`fas ${icon} absolute left-3 top-1/2 -translate-y-1/2 text-slate-400`}></i><select value={value} onChange={e => onChange(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-700 outline-none focus:ring-2 focus:ring-red-500 appearance-none"><option value="all">{allLabel}</option>{options.map(v => <option key={v} value={v}>{v}</option>)}</select><i className="fas fa-chevron-down absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs pointer-events-none"></i></div>;
}

function MediaCard({ item, liked, onLike, onReport }) {
  return <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full"><div className="p-5 flex-1 space-y-3"><div className="flex justify-between items-start"><div className="px-2.5 py-1 bg-red-50 text-red-600 text-xs font-bold rounded-lg border border-red-100">{item.kelas}</div><div className="flex gap-1">{[...Array(5)].map((_, i) => <i key={i} className={`fas fa-star text-xs ${i < parseInt(item.rating,10) ? 'text-yellow-400' : 'text-slate-200'}`}></i>)}</div></div><div><h3 className="font-bold text-lg text-slate-900 line-clamp-2">{item.judul}</h3><p className="text-xs text-slate-500 mt-1"><i className="fas fa-user-edit mr-1"></i>{item.kontributor}</p></div><p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">{item.deskripsi}</p></div><div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-between mt-auto"><div className="flex items-center gap-3"><div className="flex items-center gap-1.5 bg-white px-2 py-1 rounded-lg border border-slate-200 shadow-sm"><i className={`fas ${getIcon(item.jenis)} text-slate-400 text-xs`}></i><span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{item.jenis}</span></div><button onClick={() => onLike(item)} className={`flex items-center gap-1.5 text-xs font-bold ${liked ? 'text-red-500 heart-animate' : 'text-slate-400 hover:text-red-500'} transition-colors`}><i className={`${liked ? 'fas' : 'far'} fa-heart text-sm`}></i>{item.likes || 0}</button></div><div className="flex gap-2"><button onClick={() => onReport(item)} className="w-8 h-8 rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 flex items-center justify-center text-xs" title="Laporkan Materi"><i className="fas fa-flag"></i></button><a href={item.link || '#'} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-full bg-red-500 text-white hover:bg-red-600 flex items-center justify-center text-xs shadow-sm"><i className="fas fa-external-link-alt"></i></a></div></div></div>;
}

function PodiumItem({ item, place, tone }) {
  const isGold = tone === 'gold';
  const isSilver = tone === 'silver';
  const border = isGold ? 'border-amber-400' : isSilver ? 'border-slate-300' : 'border-amber-600';
  const circle = isGold ? 'bg-amber-50 text-amber-600 ring-4 ring-amber-200/50' : isSilver ? 'bg-slate-100 text-slate-700' : 'bg-orange-50 text-amber-800';
  const podiumClass = isGold ? 'podium-1' : isSilver ? 'podium-2' : 'podium-3';
  const label = isGold ? 'Utama' : isSilver ? 'Perak' : 'Perunggu';
  return <div className={`flex flex-col items-center ${isGold ? 'w-1/3 z-20' : 'w-1/3'}`}><div className="relative mb-3 flex flex-col items-center w-full"><div className={`absolute ${isGold ? '-top-9 text-4xl' : '-top-7 text-2xl'} ${isGold ? 'text-amber-400' : isSilver ? 'text-slate-400' : 'text-amber-700'} drop-shadow`}><i className={`fas ${isGold ? 'fa-crown' : 'fa-medal'}`}></i></div><div className={`${isGold ? 'w-20 h-20 md:w-24 md:h-24 text-2xl md:text-3xl' : 'w-16 h-16 md:w-20 md:h-20 text-xl md:text-2xl'} rounded-full ${circle} border-4 ${border} flex items-center justify-center font-black z-10 shadow-lg`}>{item.initial || `K${place}`}</div><div className="text-center mt-2 px-1 w-full"><div className={`${isGold ? 'font-black text-sm md:text-base' : 'font-bold text-xs md:text-sm'} text-slate-900 truncate`}>{item.name || `Kontributor ${place}`}</div><div className="text-slate-500 text-[10px] md:text-xs font-semibold truncate">{item.role || 'Guru'}</div><div className={`mt-1 inline-block px-2 py-0.5 ${isGold ? 'bg-amber-500 text-white' : isSilver ? 'bg-slate-200 text-slate-700' : 'bg-amber-100 text-amber-800'} text-[10px] font-black rounded-full`}>{item.poin || 0} Poin</div></div></div><div className={`w-full ${podiumClass} rounded-t-2xl flex flex-col items-center justify-start pt-3 text-white shadow-lg`}><span className="font-black text-2xl md:text-3xl drop-shadow">{place}</span><span className="text-[10px] uppercase tracking-wider font-bold opacity-90">{label}</span></div></div>;
}

function TestimonialCard({ item }) {
  return <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 relative"><i className="fas fa-quote-right absolute top-6 right-6 text-4xl text-slate-100"></i><div className="flex gap-1 mb-4">{[...Array(5)].map((_, i) => <i key={i} className={`fas fa-star text-xs ${i < parseInt(item.rating,10) ? 'text-yellow-400' : 'text-slate-200'}`}></i>)}</div><p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{item.quote}"</p><div className="flex items-center gap-3 border-t border-slate-100 pt-4"><div className="w-10 h-10 rounded-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center font-bold text-slate-500">{(item.name || '?').charAt(0)}</div><div><div className="font-bold text-sm text-slate-900">{item.name}</div><div className="text-xs text-slate-500">{item.role}</div></div></div></div>;
}

function PaginationControls({ current, total, onPageChange, itemsPerPage, onItemsChange, showDropdown }) {
  return <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">{showDropdown && <div className="flex items-center gap-2 text-sm text-slate-600"><span>Tampilkan:</span><select value={itemsPerPage} onChange={e => { onItemsChange(Number(e.target.value)); onPageChange(1); }} className="border rounded p-1 outline-none focus:ring-2 focus:ring-red-500">{[6,10,20,50,100].map(n => <option key={n} value={n}>{n}</option>)}</select></div>}<div className="flex items-center gap-2 mx-auto sm:mx-0"><button onClick={() => onPageChange(Math.max(1, current - 1))} disabled={current <= 1} className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40"><i className="fas fa-chevron-left text-xs"></i></button>{Array.from({length: Math.min(total, 5)}, (_, i) => { const page = Math.max(1, Math.min(total - 4, current - 2)) + i; return <button key={page} onClick={() => onPageChange(page)} className={`w-9 h-9 rounded-lg text-xs font-bold ${current === page ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}>{page}</button>;})}<button onClick={() => onPageChange(Math.min(total, current + 1))} disabled={current >= total} className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:opacity-40"><i className="fas fa-chevron-right text-xs"></i></button></div></div>;
}

function AdminMedia({ mediaList, contributors, subjects, form, setForm, editing, onSubmit, onEdit, onDelete, search, setSearch, initialForm, onCancel }) {
  return <div className="space-y-6"><form onSubmit={onSubmit} className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4"><h3 className="md:col-span-2 font-bold text-lg mb-2">{editing ? 'Edit Media' : 'Tambah Media Baru'}</h3><input required value={form.judul} onChange={e => setForm({...form, judul:e.target.value})} placeholder="Judul Materi" className="p-2 border rounded" /><div><input required list="kontributor-list" value={form.kontributor} onChange={e => setForm({...form, kontributor:e.target.value})} placeholder="Ketik atau Pilih Kontributor..." className="p-2 border rounded w-full" /><datalist id="kontributor-list">{contributors.map(c => <option key={c.id} value={c.name} />)}</datalist></div><select required value={form.mapel} onChange={e => setForm({...form, mapel:e.target.value})} className="p-2 border rounded"><option value="">Pilih Mata Pelajaran</option>{subjects.map(s => <option key={s.id} value={s.name}>{s.name}</option>)}</select><select required value={form.kelas} onChange={e => setForm({...form, kelas:e.target.value})} className="p-2 border rounded"><option value="">Pilih Kelas</option>{[1,2,3,4,5,6].map(k => <option key={k} value={`Kelas ${k}`}>Kelas {k}</option>)}</select><select required value={form.jenis} onChange={e => setForm({...form, jenis:e.target.value})} className="p-2 border rounded"><option value="">Pilih Jenis</option>{['Permainan Interaktif','Media Ajar','Video Pembelajaran','Bahan Ajar','E-book','Infografis','Augmented Reality (AR)','Artikel'].map(v => <option key={v} value={v}>{v}</option>)}</select><input required value={form.link} onChange={e => setForm({...form, link:e.target.value})} placeholder="URL Link (http://...)" className="p-2 border rounded" /><select value={form.rating} onChange={e => setForm({...form, rating:e.target.value})} className="p-2 border rounded"><option value="5">Rating 5 Bintang (10 Poin)</option><option value="4">Rating 4 Bintang (8 Poin)</option><option value="3">Rating 3 Bintang (6 Poin)</option><option value="2">Rating 2 Bintang (4 Poin)</option><option value="1">Rating 1 Bintang (2 Poin)</option><option value="0">Tanpa Rating (0 Poin)</option></select><input value={form.kurator} onChange={e => setForm({...form, kurator:e.target.value})} placeholder="Nama Kurator (Hanya Admin)" className="p-2 border rounded bg-yellow-50 placeholder-yellow-600" /><textarea required value={form.deskripsi} onChange={e => setForm({...form, deskripsi:e.target.value})} placeholder="Deskripsi Singkat" className="p-2 border rounded md:col-span-2 h-20"></textarea><div className="md:col-span-2 flex justify-end gap-2">{editing && <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-300 rounded font-bold">Batal</button>}<button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded font-bold">{editing ? 'Simpan Perubahan' : 'Tambah Media'}</button></div></form><div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200"><div className="relative w-full"><i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari judul materi, kontributor, jenis, atau mata pelajaran..." className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm" /></div><span className="text-xs font-bold text-slate-500 whitespace-nowrap">Tampil: {mediaList.length}</span></div><div className="table-wrap"><table className="w-full text-left text-sm whitespace-nowrap"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Judul</th><th className="p-3">Kontributor & Kurator</th><th className="p-3">Mapel & Kelas</th><th className="p-3 text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">{mediaList.length ? mediaList.map(m => <tr key={m.id} className="hover:bg-slate-50"><td className="p-3"><div className="font-bold">{m.judul}</div><div className="text-xs text-slate-500">{m.jenis} | Love: {m.likes || 0}</div></td><td className="p-3">{m.kontributor}<br/><span className="text-xs text-orange-500">Kurator: {m.kurator || '-'}</span></td><td className="p-3">{m.mapel}<br/><span className="text-xs">{m.kelas}</span></td><td className="p-3 text-center"><button onClick={() => onEdit(m)} className="text-blue-500 mx-1 p-1" title="Edit"><i className="fas fa-edit"></i></button><button onClick={() => onDelete(m.id)} className="text-red-500 mx-1 p-1" title="Hapus"><i className="fas fa-trash"></i></button></td></tr>) : <tr><td colSpan="4" className="text-center py-6 text-slate-400 text-xs">Tidak ada media yang cocok dengan pencarian "{search}"</td></tr>}</tbody></table></div></div>;
}

function AdminContributors({ list, form, setForm, editing, onSubmit, onEdit, onDelete, search, setSearch, sort, setSort, initialForm, onCancel, total }) {
  return <div className="space-y-6"><form onSubmit={onSubmit} className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4"><h3 className="md:col-span-2 font-bold text-lg mb-2">{editing ? 'Edit Kontributor' : 'Tambah Kontributor Baru'}</h3><input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Nama Lengkap" className="p-2 border rounded" /><input required value={form.role} onChange={e => setForm({...form, role:e.target.value})} placeholder="Asal Sekolah / Jabatan" className="p-2 border rounded" /><input required maxLength="2" value={form.initial} onChange={e => setForm({...form, initial:e.target.value.toUpperCase()})} placeholder="Inisial (Maks 2 Huruf)" className="p-2 border rounded" /><input value={form.desc} onChange={e => setForm({...form, desc:e.target.value})} placeholder="Deskripsi Singkat" className="p-2 border rounded" /><div className="md:col-span-2 flex justify-end gap-2">{editing && <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-300 rounded font-bold">Batal</button>}<button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded font-bold">{editing ? 'Simpan Perubahan' : 'Tambah Kontributor'}</button></div></form><div className="flex flex-col sm:flex-row justify-between items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200"><div className="relative w-full sm:w-1/2"><i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"></i><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Cari nama kontributor atau instansi..." className="w-full pl-10 pr-10 py-2 bg-white border border-slate-200 rounded-lg text-sm" /></div><div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end"><span className="text-xs font-bold text-slate-600">Urutkan:</span><select value={sort} onChange={e => setSort(e.target.value)} className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold"><option value="name-asc">Nama (A - Z)</option><option value="name-desc">Nama (Z - A)</option><option value="poin-desc">Poin (Tertinggi)</option><option value="poin-asc">Poin (Terendah)</option></select><span className="text-xs font-bold text-slate-500 whitespace-nowrap">Tampil: {list.length} / {total}</span></div></div><div className="table-wrap"><table className="w-full text-left text-sm whitespace-nowrap"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Nama Kontributor</th><th className="p-3">Instansi / Sekolah</th><th className="p-3 text-center">Poin</th><th className="p-3 text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">{list.length ? list.map(c => <tr key={c.id} className="hover:bg-slate-50"><td className="p-3"><div className="font-bold text-slate-900 flex items-center gap-2"><span className="w-7 h-7 rounded-full bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center">{c.initial}</span>{c.name}</div></td><td className="p-3 text-slate-600">{c.role}</td><td className="p-3 text-center font-bold text-emerald-600">{c.poin}</td><td className="p-3 text-center"><button onClick={() => onEdit(c)} className="text-blue-500 mx-1 p-1"><i className="fas fa-edit"></i></button><button onClick={() => onDelete(c.id)} className="text-red-500 mx-1 p-1"><i className="fas fa-trash"></i></button></td></tr>) : <tr><td colSpan="4" className="text-center py-6 text-slate-400 text-xs">Tidak ada kontributor yang cocok dengan pencarian "{search}"</td></tr>}</tbody></table></div></div>;
}

function AdminTestimonials({ list, form, setForm, editing, onSubmit, onEdit, onDelete, onCancel }) {
  return <div className="space-y-6"><form onSubmit={onSubmit} className="bg-slate-50 p-5 rounded-xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4"><input required value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Nama" className="p-2 border rounded" /><input required value={form.role} onChange={e => setForm({...form, role:e.target.value})} placeholder="Role/Siswa/Guru" className="p-2 border rounded" /><textarea required value={form.quote} onChange={e => setForm({...form, quote:e.target.value})} placeholder="Isi Testimoni" className="p-2 border rounded md:col-span-2"></textarea><select value={form.rating} onChange={e => setForm({...form, rating:e.target.value})} className="p-2 border rounded"><option value="5">5 Bintang</option><option value="4">4 Bintang</option><option value="3">3 Bintang</option><option value="2">2 Bintang</option><option value="1">1 Bintang</option></select><div className="md:col-span-2 flex justify-end gap-2">{editing && <button type="button" onClick={onCancel} className="px-4 py-2 bg-slate-300 rounded font-bold">Batal</button>}<button type="submit" className="px-4 py-2 bg-slate-900 text-white rounded font-bold">{editing ? 'Simpan Perubahan' : 'Simpan Testimoni'}</button></div></form><div className="table-wrap"><table className="w-full text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Nama</th><th className="p-3">Ulasan</th><th className="p-3 text-center">Aksi</th></tr></thead><tbody className="divide-y divide-slate-100">{list.map(t => <tr key={t.id}><td className="p-3 font-bold whitespace-nowrap">{t.name}</td><td className="p-3 text-xs">{t.quote}</td><td className="p-3 text-center whitespace-nowrap"><button onClick={() => onEdit(t)} className="text-blue-500 mx-1 p-1"><i className="fas fa-edit"></i></button><button onClick={() => onDelete(t.id)} className="text-red-500 mx-1 p-1"><i className="fas fa-trash"></i></button></td></tr>)}</tbody></table></div></div>;
}

function AdminReports({ reports }) {
  return <div className="space-y-6"><div className="bg-red-50 p-4 border border-red-100 rounded-xl"><h3 className="font-bold text-red-700 mb-1">Daftar Laporan Media</h3><p className="text-sm text-red-600">Berikut adalah data laporan dari pengguna terkait media yang bermasalah.</p></div>{reports.length ? <div className="table-wrap"><table className="w-full text-left text-sm"><thead className="bg-slate-100 text-slate-600"><tr><th className="p-3">Media</th><th className="p-3">Pelapor</th><th className="p-3">Alasan</th><th className="p-3">Waktu</th></tr></thead><tbody className="divide-y divide-slate-100">{reports.map((r,i) => <tr key={i} className="hover:bg-slate-50"><td className="p-3 font-bold">{r.mediaTitle}</td><td className="p-3">{r.name} ({r.school})</td><td className="p-3 text-red-600">{r.reason}</td><td className="p-3 text-xs">{r.date || '-'}</td></tr>)}</tbody></table></div> : <div className="text-center py-10 text-slate-500">Belum ada laporan sejauh ini.</div>}</div>;
}

function SocialButton({ href, icon, hover }) {
  return <a href={href || '#'} target="_blank" rel="noreferrer" className={`w-10 h-10 rounded-full bg-slate-800 ${hover} text-white flex items-center justify-center transition-colors`}><i className={`fab ${icon}`}></i></a>;
}

function ModalShell({ children, max = 'max-w-md', onClose, z = 'z-[100]' }) {
  return <div className={`fixed inset-0 bg-slate-900/50 backdrop-blur-sm ${z} flex items-center justify-center p-4`} onMouseDown={e => { if (e.target === e.currentTarget && onClose) onClose(); }}><div className={`bg-white p-6 rounded-2xl w-full ${max} shadow-2xl slide-up modal-scroll`}>{children}</div></div>;
}

function UserAuthModal({ form, setForm, onSubmit, onClose }) {
  return <ModalShell onClose={onClose}><div className="w-12 h-12 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center text-2xl mb-4"><i className="fas fa-user-circle"></i></div><h3 className="font-black text-xl mb-1">Identitas Diri</h3><p className="text-sm text-slate-500 mb-4">Silakan masukkan nama untuk bisa memberi ulasan, nilai, dan laporan.</p><form onSubmit={onSubmit}><input required type="text" placeholder="Nama Lengkap Kamu" value={form.name} onChange={e => setForm({...form, name:e.target.value})} className="w-full p-3 border rounded-xl mb-3" autoFocus/><select required value={form.role} onChange={e => setForm({...form, role:e.target.value})} className="w-full p-3 border rounded-xl mb-4"><option value="Siswa">Siswa</option><option value="Guru">Guru</option><option value="Orang Tua">Orang Tua</option></select><div className="flex gap-2"><button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-bold">Batal</button><button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold">Lanjutkan</button></div></form></ModalShell>;
}

function AdminPasswordModal({ value, setValue, error, onSubmit, onClose }) {
  return <ModalShell onClose={onClose}><h3 className="font-black text-xl mb-4">Akses Admin</h3><form onSubmit={onSubmit}><input required type="password" placeholder="Masukkan Password" value={value} onChange={e => setValue(e.target.value)} className="w-full p-3 border rounded-xl mb-2" autoFocus/>{error && <p className="text-red-500 text-xs mb-3">{error}</p>}<div className="flex gap-2"><button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Batal</button><button type="submit" className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold">Masuk</button></div></form></ModalShell>;
}

function ReportModal({ currentUser, config, form, setForm, onSubmit, onClose }) {
  return <ModalShell max="max-w-md" onClose={onClose}><h3 className="font-black text-lg mb-1">Laporkan Media</h3><p className="text-sm text-slate-500 mb-4 truncate text-red-500 font-medium">"{config.mediaTitle}"</p><div className="bg-slate-50 p-3 rounded-lg border border-slate-200 mb-4 flex gap-3 items-center"><div className="w-8 h-8 bg-slate-200 rounded-full flex items-center justify-center text-slate-600 font-bold text-xs">{currentUser?.name?.charAt(0)}</div><div className="text-sm"><span className="text-slate-500">Pelapor:</span> <b>{currentUser?.name}</b></div></div><form onSubmit={onSubmit} className="space-y-3"><select required value={form.reason} onChange={e => setForm({...form, reason:e.target.value})} className="w-full p-3 border rounded-xl"><option value="">-- Pilih Alasan Pelanggaran --</option><option value="Link Mati / Tidak Bisa Diakses">Link Mati / Tidak Bisa Diakses</option><option value="Konten Tidak Sesuai Umur">Konten Tidak Sesuai Umur / Kasar</option><option value="Pelanggaran Hak Cipta / Plagiasi">Pelanggaran Hak Cipta / Plagiasi</option><option value="Spam / Iklan">Spam / Mengandung Iklan</option></select><textarea placeholder="Detail tambahan (Opsional)" value={form.detail} onChange={e => setForm({...form, detail:e.target.value})} className="w-full p-3 border rounded-xl h-20 text-sm"></textarea><div className="flex gap-2 pt-2"><button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Batal</button><button type="submit" className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">Kirim Laporan</button></div></form></ModalShell>;
}

function PublicTestimonialModal({ currentUser, value, setValue, onSubmit, onClose }) {
  return <ModalShell onClose={onClose}><h3 className="font-black text-xl mb-4 text-center">Tulis Ulasan Anda</h3><form onSubmit={onSubmit} className="space-y-3"><div className="bg-slate-50 p-3 rounded-lg border border-slate-200 text-sm">Ulasan atas nama: <b>{currentUser?.name}</b> ({currentUser?.role})</div><textarea required placeholder="Bagaimana pengalaman Anda menggunakan RIANG?" value={value.quote} onChange={e => setValue({...value, quote:e.target.value})} className="w-full p-3 border rounded-xl h-24"></textarea><select value={value.rating} onChange={e => setValue({...value, rating:e.target.value})} className="w-full p-3 border rounded-xl"><option value="5">5 Bintang</option><option value="4">4 Bintang</option><option value="3">3 Bintang</option><option value="2">2 Bintang</option><option value="1">1 Bintang</option></select><div className="flex gap-2 pt-2"><button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold text-slate-600">Batal</button><button type="submit" className="flex-1 py-3 bg-slate-900 text-white rounded-xl font-bold">Kirim</button></div></form></ModalShell>;
}

function DeleteModal({ onConfirm, onClose }) {
  return <ModalShell max="max-w-sm" onClose={onClose}><div className="text-center"><div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center text-3xl mx-auto mb-4"><i className="fas fa-exclamation-triangle"></i></div><h3 className="font-black text-xl mb-2">Hapus Data?</h3><p className="text-slate-500 text-sm mb-6">Data yang dihapus tidak dapat dikembalikan lagi.</p><div className="flex gap-2"><button onClick={onClose} className="flex-1 py-3 bg-slate-100 rounded-xl font-bold">Batal</button><button onClick={onConfirm} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">Ya, Hapus</button></div></div></ModalShell>;
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
