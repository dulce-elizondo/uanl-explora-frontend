// =============================================
// UANL EXPLORA – Script Compartido
// =============================================

// =============================================
// TOAST & CONFIRM PERSONALIZADOS
// =============================================
var _toastTimer = null;

function showToast(msg, type) {
  type = type || 'success';
  var existing = document.getElementById('uanl-toast');
  if (existing) existing.remove();
  if (_toastTimer) clearTimeout(_toastTimer);

  var icons = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' };
  var toast = document.createElement('div');
  toast.id = 'uanl-toast';
  toast.className = 'uanl-toast uanl-toast-' + type;
  toast.innerHTML =
    '<span class="toast-icon">' + (icons[type] || icons.success) + '</span>' +
    '<span class="toast-msg">' + msg + '</span>';

  toast.addEventListener('click', function() { hideToast(toast); });
  document.body.appendChild(toast);

  requestAnimationFrame(function() { toast.classList.add('toast-show'); });
  _toastTimer = setTimeout(function() { hideToast(toast); }, 1000);
}

function hideToast(toast) {
  if (!toast) toast = document.getElementById('uanl-toast');
  if (!toast) return;
  toast.classList.remove('toast-show');
  toast.classList.add('toast-hide');
  setTimeout(function() { if (toast.parentNode) toast.remove(); }, 300);
}

function showConfirm(msg, onConfirm) {
  var existing = document.getElementById('uanl-confirm');
  if (existing) existing.remove();

  var overlay = document.createElement('div');
  overlay.id = 'uanl-confirm';
  overlay.className = 'uanl-confirm-overlay';
  overlay.innerHTML =
    '<div class="uanl-confirm-box">' +
      '<p class="uanl-confirm-msg">' + msg + '</p>' +
      '<div class="uanl-confirm-btns">' +
        '<button class="uanl-confirm-cancel">Cancelar</button>' +
        '<button class="uanl-confirm-ok">Confirmar</button>' +
      '</div>' +
    '</div>';

  overlay.querySelector('.uanl-confirm-cancel').addEventListener('click', function() {
    overlay.remove();
  });
  overlay.querySelector('.uanl-confirm-ok').addEventListener('click', function() {
    overlay.remove();
    onConfirm();
  });
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) overlay.remove();
  });
  document.body.appendChild(overlay);
  requestAnimationFrame(function() { overlay.classList.add('confirm-show'); });
}

// --- SEED DATA ---
const SEED_DATA = [
  {
    id: 'l1', nombre: 'Biblioteca Capilla Alfonsina', categoria: 'populares',
    descripcion: 'La biblioteca más importante de la UANL. Cuenta con amplias salas de lectura, acceso a internet, cubículos privados y más de 200,000 volúmenes.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/capilla-alfonsina.jpg',
    resenas: [
      { id: 'r1', autorId: 'seed', autor: 'Carlos R.', texto: 'El mejor lugar para estudiar. Silencioso y con buena iluminación.', estrellas: 5, fecha: '2024-11-15' },
      { id: 'r2', autorId: 'seed', autor: 'Diana P.', texto: 'Muy completa. A veces los cubículos están llenos en exámenes.', estrellas: 4, fecha: '2024-12-01' },
      { id: 'r3', autorId: 'seed', autor: 'Mario L.', texto: 'Excelente para hacer proyectos. Buen WiFi.', estrellas: 5, fecha: '2025-01-10' },
    ]
  },
  {
    id: 'l13', nombre: 'Cafetería FACPYA', categoria: 'cafeterias',
    descripcion: 'Cafetería de la Facultad de Contaduría Pública y Administración. Ofrece desayunos, almuerzos y bebidas para los estudiantes.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/cafeteria-facpya.jpg',
    resenas: [
      { id: 'r24', autorId: 'seed', autor: 'Valeria R.', texto: 'Excelente comida, siempre fresca y a buen precio. ¡Mi cafetería favorita!', estrellas: 5, fecha: '2025-02-10' },
    ]
  },
  {
    id: 'l14', nombre: 'Cafetería FIC', categoria: 'cafeterias',
    descripcion: 'Cafetería de la Facultad de Ingeniería Civil. Menú variado con opciones económicas y ricas.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/cafeteria-fic.jpg',
    resenas: [
      { id: 'r25', autorId: 'seed', autor: 'Santiago M.', texto: 'Super buena la comida, el arroz y el pollo están increíbles. Totalmente recomendada.', estrellas: 5, fecha: '2025-01-22' },
    ]
  },
  {
    id: 'l15', nombre: 'Cafetería FIME', categoria: 'cafeterias',
    descripcion: 'Cafetería de la Facultad de Ingeniería Mecánica y Eléctrica. Variedad de platillos y snacks para los ingenieros.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/cafeteria-fime.jpg',
    resenas: [
      { id: 'r26', autorId: 'seed', autor: 'Daniela K.', texto: 'La mejor cafetería de FIME, todo está riquísimo y el servicio es muy rápido.', estrellas: 5, fecha: '2025-03-05' },
    ]
  },
  {
    id: 'l8', nombre: 'Librería UANL', categoria: 'negocios',
    descripcion: 'Librería oficial con textos académicos, revistas científicas, material de estudio y artículos universitarios.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/libreria.jpg',
    resenas: [
      { id: 'r16', autorId: 'seed', autor: 'Pedro A.', texto: 'Excelente selección de libros académicos. Personal muy amable.', estrellas: 5, fecha: '2024-12-05' },
    ]
  },
  {
    id: 'l9', nombre: 'Impresiones en la Biblio de FIME', categoria: 'negocios',
    descripcion: 'Servicio rápido de copias e impresiones ubicado en la Facultad de Ingeniería Mecánica y Eléctrica.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/reprografia.jpg',
    resenas: [
      { id: 'r17', autorId: 'seed', autor: 'Natalia M.', texto: 'Muy rápido y económico. Útil en época de exámenes.', estrellas: 4, fecha: '2024-11-10' },
      { id: 'r18', autorId: 'seed', autor: 'Tomás B.', texto: 'Buen servicio, nunca me han fallado.', estrellas: 5, fecha: '2024-12-14' },
    ]
  },
  {
    id: 'l10', nombre: 'Baños Capilla Alfonsina', categoria: 'banos',
    descripcion: 'Sanitarios de la Biblioteca Capilla Alfonsina. Muy bien mantenidos y limpios durante todo el día.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/banos-capilla-alfonsina.jpg',
    resenas: [
      { id: 'r19', autorId: 'seed', autor: 'Andrea C.', texto: 'Siempre limpios. Los mejores baños del campus.', estrellas: 5, fecha: '2024-10-30' },
      { id: 'r20', autorId: 'seed', autor: 'Pablo E.', texto: 'Excelente higiene. Siempre hay papel y jabón.', estrellas: 5, fecha: '2024-12-02' },
    ]
  },
  {
    id: 'l11', nombre: 'Baños Biblioteca Central', categoria: 'banos',
    descripcion: 'Sanitarios dentro de la biblioteca, accesibles para todos los estudiantes y visitantes.',
    imagen: 'https://loremflickr.com/400/250/restroom,facility,toilet?lock=112',
    resenas: [
      { id: 'r21', autorId: 'seed', autor: 'Miguel L.', texto: 'Limpios en la mañana, pueden descuidarse en la tarde.', estrellas: 3, fecha: '2024-12-03' },
    ]
  },
  {
    id: 'l12', nombre: 'Baños FIME Edificio 1', categoria: 'banos',
    descripcion: 'Sanitarios de la Facultad de Ingeniería renovados recientemente. Amplios y bien equipados.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/banos-fime.jpg',
    resenas: [
      { id: 'r22', autorId: 'seed', autor: 'Elena B.', texto: 'Bien mantenidos desde la remodelación. Hay jabón y papel.', estrellas: 4, fecha: '2024-11-18' },
      { id: 'r23', autorId: 'seed', autor: 'Omar J.', texto: 'Mucho mejor que antes. Los remodelaron bien.', estrellas: 4, fecha: '2024-12-20' },
    ]
  },
  {
    id: 'l16', nombre: 'Tacos', categoria: 'comida',
    descripcion: 'Deliciosos tacos en el campus universitario. Variedad de guisados, tacos al pastor y más opciones para comer rápido y a buen precio.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/tacos.jpg',
    resenas: [
      { id: 'r27', autorId: 'seed', autor: 'Javier P.', texto: 'Los mejores tacos del campus. Muy ricos y económicos.', estrellas: 5, fecha: '2025-02-15' },
    ]
  },
  {
    id: 'l17', nombre: 'Tim Hortons', categoria: 'comida',
    descripcion: 'Sucursal de Tim Hortons ubicada en FIME. Café, bebidas frías, donas y snacks para los estudiantes de ingeniería.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/tim-hortons-fime.jpg',
    resenas: [
      { id: 'r28', autorId: 'seed', autor: 'Lucía F.', texto: 'El café frío es excelente, perfecto para estudiar largas horas.', estrellas: 5, fecha: '2025-01-30' },
    ]
  },
  {
    id: 'l18', nombre: 'Puesto de Comida', categoria: 'comida',
    descripcion: 'Puesto de comida ubicado detrás de Rectoría. Variedad de platillos caseros a precios muy accesibles para estudiantes.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/puesto-comida-rectoria.jpg',
    resenas: [
      { id: 'r29', autorId: 'seed', autor: 'Andrés G.', texto: 'Comida de calidad y muy económica. Ideal para un almuerzo rápido.', estrellas: 5, fecha: '2025-02-20' },
    ]
  },
  {
    id: 'l19', nombre: 'Tim Hortons FARQ', categoria: 'comida',
    descripcion: 'Sucursal de Tim Hortons en la Facultad de Arquitectura. Café, timbits y bebidas para los estudiantes creativos.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/tim-hortons-farq.jpg',
    resenas: [
      { id: 'r30', autorId: 'seed', autor: 'Sofía B.', texto: 'Ambiente muy agradable y el café está delicioso. Gran opción para descansar.', estrellas: 5, fecha: '2025-03-10' },
    ]
  },
  {
    id: 'l20', nombre: 'Hub Natura – Biblio de FIME', categoria: 'internet',
    descripcion: 'Espacio de estudio con conexión a internet en la Biblioteca de FIME. Cómodo, tranquilo y con buena señal WiFi.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/hub-natura-biblio-fime.jpg',
    resenas: [
      { id: 'r31', autorId: 'seed', autor: 'Carlos T.', texto: 'Excelente lugar para estudiar, WiFi muy rápido y mesas cómodas.', estrellas: 5, fecha: '2025-02-08' },
    ]
  },
  {
    id: 'l21', nombre: 'Hub Natura – Edificio 7', categoria: 'internet',
    descripcion: 'Área de descanso y estudio con internet en el Edificio 7. Ideal para trabajar en proyectos o revisar material de clase.',
    imagen: 'https://uanl-explora-backend.onrender.com/uploads/hub-natura-edificio7.jpg',
    resenas: [
      { id: 'r32', autorId: 'seed', autor: 'Mariana H.', texto: 'Muy buen espacio con internet estable. Lo recomiendo para estudiar en equipo.', estrellas: 5, fecha: '2025-03-01' },
    ]
  },
];

// =============================================
// INICIALIZACIÓN
// =============================================
function initData() {
  var stored = JSON.parse(localStorage.getItem('uanl_lugares') || 'null');
  var seedIds = SEED_DATA.map(function(s) { return s.id; });

  if (!stored) {
    localStorage.setItem('uanl_lugares', JSON.stringify(SEED_DATA));
  } else {
    // Eliminar entradas seed que ya no existen, conservar las del usuario
    var filtered = stored.filter(function(l) {
      return seedIds.indexOf(l.id) !== -1 || (l.autorId && l.autorId !== 'seed');
    });

    // Actualizar/agregar cada entrada seed (conservar reseñas del usuario)
    SEED_DATA.forEach(function(seed) {
      var idx = -1;
      for (var i = 0; i < filtered.length; i++) {
        if (filtered[i].id === seed.id) { idx = i; break; }
      }
      if (idx !== -1) {
        var userResenas = filtered[idx].resenas.filter(function(r) { return r.autorId !== 'seed'; });
        filtered[idx] = Object.assign({}, seed, { resenas: seed.resenas.concat(userResenas) });
      } else {
        filtered.push(seed);
      }
    });

    localStorage.setItem('uanl_lugares', JSON.stringify(filtered));
  }

  if (!localStorage.getItem('uanl_usuarios')) {
    localStorage.setItem('uanl_usuarios', JSON.stringify([]));
  }
  if (!localStorage.getItem('uanl_favoritos')) {
    localStorage.setItem('uanl_favoritos', JSON.stringify({}));
  }
}

// =============================================
// AUTH
// =============================================
function getSession() {
  return localStorage.getItem('uanl_sesion') || null;
}

function setSession(userId) {
  localStorage.setItem('uanl_sesion', userId);
}

function clearSession() {
  localStorage.removeItem('uanl_sesion');
  localStorage.removeItem('uanl_usuario_actual');
}

function getUsuarioActual() {
  var stored = localStorage.getItem('uanl_usuario_actual');
  if (!stored) return null;
  try { return JSON.parse(stored); } catch(e) { return null; }
}

function saveUsuarioActual(user) {
  localStorage.setItem('uanl_usuario_actual', JSON.stringify(user));
  setSession(user.id);
  sincronizarDesdeBackend(user);
}

function sincronizarDesdeBackend(user) {
  var usuarioIdNum = user.id.toString().replace('db_', '');
  if (!parseInt(usuarioIdNum)) return;
  var API = 'https://uanl-explora-backend.onrender.com';

  // Sincronizar favoritos
  fetch(API + '/favoritos/' + usuarioIdNum)
    .then(function(r) { return r.json(); })
    .then(function(favIds) {
      if (!Array.isArray(favIds)) return;
      var favs = JSON.parse(localStorage.getItem('uanl_favoritos') || '{}');
      favs[user.id] = favIds;
      localStorage.setItem('uanl_favoritos', JSON.stringify(favs));
    }).catch(function() {});

  // Sincronizar reseñas del usuario
  fetch(API + '/resenas/usuario/' + usuarioIdNum)
    .then(function(r) { return r.json(); })
    .then(function(resenas) {
      if (!Array.isArray(resenas)) return;
      var lugares = JSON.parse(localStorage.getItem('uanl_lugares') || '[]');
      resenas.forEach(function(r) {
        if (!r.lugar_id_str) return;
        var lugar = lugares.find(function(l) { return l.id === r.lugar_id_str; });
        if (!lugar) return;
        var yaExiste = lugar.resenas.find(function(re) {
          return re.autorId === user.id && re.texto === r.comentario;
        });
        if (!yaExiste) {
          lugar.resenas.push({
            id: 'r_db_' + r.id,
            autorId: user.id,
            autor: user.nombre + ' ' + user.apellido,
            texto: r.comentario,
            estrellas: r.calificacion,
            fecha: r.created_at ? r.created_at.toString().slice(0, 10) : ''
          });
        }
      });
      localStorage.setItem('uanl_lugares', JSON.stringify(lugares));
    }).catch(function() {});
}

function logout() {
  clearSession();
  window.location.href = 'index.html';
}

// =============================================
// LUGARES
// =============================================
function getLugares() {
  return JSON.parse(localStorage.getItem('uanl_lugares') || '[]');
}

function saveLugares(lugares) {
  localStorage.setItem('uanl_lugares', JSON.stringify(lugares));
}

function getLugaresByCategoria(categoria) {
  return getLugares().filter(function(l) { return l.categoria === categoria; });
}

function getTop10() {
  var lugares = getLugares();
  return lugares
    .map(function(l) {
      var numResenas = l.resenas.length;
      var promedio   = numResenas > 0
        ? l.resenas.reduce(function(s, r) { return s + r.estrellas; }, 0) / numResenas
        : 0;
      // Puntaje combinado: 70% promedio de estrellas (sobre 5) + 30% cantidad de reseñas (normalizado a 10 máx)
      var puntaje = (promedio / 5) * 0.7 + (Math.min(numResenas, 10) / 10) * 0.3;
      return Object.assign({}, l, { promedio: promedio, puntaje: puntaje });
    })
    .filter(function(l) { return l.resenas.length > 0; })
    .sort(function(a, b) { return b.puntaje - a.puntaje; })
    .slice(0, 10);
}

function addLugar(lugar) {
  var lugares = getLugares();
  lugares.push(lugar);
  saveLugares(lugares);
}

function addResena(lugarId, resena) {
  var lugares = getLugares();
  var lugar = lugares.find(function(l) { return l.id === lugarId; });
  if (lugar) {
    lugar.resenas.push(resena);
    saveLugares(lugares);
  }
}

// =============================================
// FAVORITOS
// =============================================
function getFavoritos() {
  var userId = getSession();
  if (!userId) return [];
  var favs = JSON.parse(localStorage.getItem('uanl_favoritos') || '{}');
  return favs[userId] || [];
}

function toggleFavorito(lugarId) {
  var userId = getSession();
  if (!userId) return false;
  var favs = JSON.parse(localStorage.getItem('uanl_favoritos') || '{}');
  if (!favs[userId]) favs[userId] = [];
  var idx = favs[userId].indexOf(lugarId);
  var added = idx === -1;
  if (added) {
    favs[userId].push(lugarId);
  } else {
    favs[userId].splice(idx, 1);
  }
  localStorage.setItem('uanl_favoritos', JSON.stringify(favs));

  // Sincronizar con MySQL
  var usuarioIdNum = userId.toString().replace('db_', '');
  if (parseInt(usuarioIdNum)) {
    if (added) {
      fetch('https://uanl-explora-backend.onrender.com/favoritos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: parseInt(usuarioIdNum), lugar_id_str: lugarId })
      }).catch(function() {});
    } else {
      fetch('https://uanl-explora-backend.onrender.com/favoritos/' + usuarioIdNum + '/' + lugarId, {
        method: 'DELETE'
      }).catch(function() {});
    }
  }
  return added;
}

function esFavorito(lugarId) {
  return getFavoritos().indexOf(lugarId) !== -1;
}

// =============================================
// UI HELPERS
// =============================================
function getPromedioEstrellas(resenas) {
  if (!resenas.length) return 0;
  return resenas.reduce(function(s, r) { return s + r.estrellas; }, 0) / resenas.length;
}

function renderEstrellas(promedio) {
  var llenas = Math.round(promedio);
  return '★'.repeat(llenas) + '☆'.repeat(5 - llenas);
}

function getCategoryIcon(cat) {
  var icons = { populares: '⭐', cafeterias: '☕', negocios: '🏢', banos: '🚻', comida: '🍽️', internet: '📶' };
  return icons[cat] || '📍';
}

function getCategoryLabel(cat) {
  var labels = { populares: 'Popular', cafeterias: 'Cafetería', negocios: 'Negocio', banos: 'Baños', comida: 'Comida', internet: 'Internet' };
  return labels[cat] || cat;
}

// =============================================
// RENDER HEADER
// =============================================
// =============================================
// DARK MODE
// =============================================
function isDarkMode() {
  return localStorage.getItem('uanl_dark') === '1';
}
function applyTheme() {
  if (isDarkMode()) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  // Actualizar todos los switches del DOM
  document.querySelectorAll('.switch-track').forEach(function(t) {
    t.classList.toggle('dark-on', isDarkMode());
  });
}
function toggleDarkMode() {
  localStorage.setItem('uanl_dark', isDarkMode() ? '0' : '1');
  applyTheme();
}
// Aplicar tema al cargar página (antes de renderHeader)
applyTheme();

function renderHeader() {
  var headerEl = document.getElementById('app-header');
  if (!headerEl) return;
  var usuario = getUsuarioActual();
  var dark = isDarkMode();
  headerEl.innerHTML =
    '<div class="header-left">' +
      '<a href="index.html" class="logo-link"><span class="logo-text">UANL <span class="logo-gold">EXPLORA</span></span></a>' +
    '</div>' +
    '<div class="header-right">' +
      '<div class="theme-switch" onclick="toggleDarkMode()" title="Cambiar tema">' +
        '<span class="switch-icon">☀️</span>' +
        '<div class="switch-track' + (dark ? ' dark-on' : '') + '"><div class="switch-thumb"></div></div>' +
        '<span class="switch-icon">🌙</span>' +
      '</div>' +
      (usuario
        ? '<div class="user-info">' +
            '<span class="user-avatar">' +
              (usuario.foto ? '<img src="' + usuario.foto + '" alt="foto">' : '👤') +
            '</span>' +
            '<span class="user-name">' + usuario.nombre + '</span>' +
            '<button class="btn-logout" onclick="logout()">Salir</button>' +
          '</div>'
        : '<a href="registro.html" class="btn-acceder-app">Acceder</a>') +
    '</div>';
}

// =============================================
// RENDER BOTTOM NAV
// =============================================
function renderBottomNav(activa) {
  var navEl = document.getElementById('bottom-nav');
  if (!navEl) return;
  function navItem(href, icon, label, key, isBtn) {
    var cls = 'nav-btn' + (activa === key ? ' active' : '');
    if (isBtn) {
      return '<button class="' + cls + '" onclick="abrirModalSugerir()">' +
        '<span>' + icon + '</span><span>' + label + '</span></button>';
    }
    return '<a href="' + href + '" class="' + cls + '">' +
      '<span>' + icon + '</span><span>' + label + '</span></a>';
  }
  navEl.innerHTML =
    navItem('index.html',       '🏠', 'Inicio',       'inicio') +
    navItem('populares.html',   '⭐', 'Populares',    'populares') +
    navItem('favoritos.html',   '♥',  'Favoritos',    'favoritos') +
    '<button class="nav-btn" onclick="abrirCatSheet()">' +
      '<span>🗂️</span><span>Categorías</span>' +
    '</button>' +
    navItem('mis-resenas.html', '📝', 'Mis public.', 'mis-resenas') +
    navItem('',                 '👍', 'Sugerir',      'sugerir', true);

  // Renderizar el bottom sheet de categorías si no existe
  if (!document.getElementById('cat-sheet')) {
    var overlay = document.createElement('div');
    overlay.id = 'cat-sheet-overlay';
    overlay.onclick = function() { cerrarCatSheet(); };
    document.body.appendChild(overlay);

    var sheet = document.createElement('div');
    sheet.id = 'cat-sheet';
    sheet.innerHTML =
      '<div class="cat-sheet-handle"></div>' +
      '<div class="cat-sheet-title">Explorar categorías</div>' +
      '<div class="cat-sheet-grid">' +
        '<a href="cafeterias.html" class="cat-sheet-item"><span class="cs-icon">☕</span><span class="cs-label">Cafeterías</span></a>' +
        '<a href="comida.html"     class="cat-sheet-item"><span class="cs-icon">🍽️</span><span class="cs-label">Comida</span></a>' +
        '<a href="negocios.html"   class="cat-sheet-item"><span class="cs-icon">🏢</span><span class="cs-label">Negocios</span></a>' +
        '<a href="banos.html"      class="cat-sheet-item"><span class="cs-icon">🚻</span><span class="cs-label">Baños</span></a>' +
        '<a href="internet.html"   class="cat-sheet-item"><span class="cs-icon">📶</span><span class="cs-label">Internet</span></a>' +
      '</div>';
    document.body.appendChild(sheet);
  }
}

function abrirCatSheet() {
  document.getElementById('cat-sheet-overlay').classList.add('open');
  document.getElementById('cat-sheet').classList.add('open');
}

function cerrarCatSheet() {
  document.getElementById('cat-sheet-overlay').classList.remove('open');
  document.getElementById('cat-sheet').classList.remove('open');
}

// =============================================
// MODAL SUGERIR LUGAR
// =============================================
function abrirModalSugerir() {
  var usuario = getUsuarioActual();
  if (!usuario) {
    showConfirm('Necesitas iniciar sesión para sugerir un lugar. ¿Deseas acceder?', function() {
      window.location.href = 'registro.html';
    });
    return;
  }
  var modal = document.getElementById('modal-sugerir');
  if (modal) modal.style.display = 'flex';
}

function cerrarModalSugerir() {
  var modal = document.getElementById('modal-sugerir');
  if (modal) modal.style.display = 'none';
}

function renderModalSugerir() {
  if (document.getElementById('modal-sugerir')) return;
  var modal = document.createElement('div');
  modal.id = 'modal-sugerir';
  modal.className = 'modal-overlay';
  modal.innerHTML =
    '<div class="modal-content">' +
      '<button class="modal-close" onclick="cerrarModalSugerir()">✕</button>' +
      '<h3>Sugerir un Lugar</h3>' +
      '<form onsubmit="submitSugerencia(event)">' +
        '<input type="text" id="sug-nombre" placeholder="Nombre del lugar" required>' +
        '<select id="sug-categoria" required>' +
          '<option value="">Selecciona una categoría...</option>' +
          '<option value="cafeterias">Cafetería</option>' +
          '<option value="negocios">Negocio</option>' +
          '<option value="banos">Baños</option>' +
          '<option value="comida">Comida</option>' +
          '<option value="internet">Internet</option>' +
        '</select>' +
        '<textarea id="sug-desc" placeholder="Describe el lugar..." required></textarea>' +
        '<div class="star-input">' +
          '<span>Calificación:</span>' +
          [1,2,3,4,5].map(function(n) {
            return '<span class="star-opt" onclick="selectStarSug(' + n + ')">☆</span>';
          }).join('') +
        '</div>' +
        '<input type="hidden" id="sug-estrellas" value="0">' +
        '<div style="display:flex;align-items:center;gap:10px;margin:2px 0">' +
          '<div id="sug-foto-preview" style="width:44px;height:44px;border-radius:8px;background:var(--gris);border:1px solid var(--gris-medio);display:flex;align-items:center;justify-content:center;font-size:1.4rem;overflow:hidden;flex-shrink:0">📍</div>' +
          '<div>' +
            '<div style="font-size:.76rem;color:var(--texto-suave);margin-bottom:3px">Foto del lugar *</div>' +
            '<input type="file" id="sug-foto" accept="image/*" onchange="previewSugFoto(this)" style="font-size:.8rem" required>' +
          '</div>' +
        '</div>' +
        '<button type="submit" class="btn-primary" style="padding:10px;font-size:.9rem">Publicar sugerencia</button>' +
      '</form>' +
    '</div>';
  document.body.appendChild(modal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) cerrarModalSugerir();
  });
}

function previewSugFoto(input) {
  var file = input.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e) {
    var prev = document.getElementById('sug-foto-preview');
    prev.innerHTML = '<img src="' + e.target.result + '" style="width:100%;height:100%;object-fit:cover">';
  };
  reader.readAsDataURL(file);
}

function selectStarSug(val) {
  document.getElementById('sug-estrellas').value = val;
  var stars = document.querySelectorAll('#modal-sugerir .star-opt');
  stars.forEach(function(s, i) { 
    s.textContent = i < val ? '★' : '☆'; 
    if (i < val) s.classList.add('star-active'); else s.classList.remove('star-active');
  });
}

function submitSugerencia(e) {
  e.preventDefault();
  var usuario   = getUsuarioActual();
  var estrellas = parseInt(document.getElementById('sug-estrellas').value);
  if (!estrellas) { showToast('Por favor selecciona una calificación.', 'warning'); return; }
  var fotoFile = document.getElementById('sug-foto').files[0];
  if (!fotoFile) { showToast('La foto del lugar es obligatoria.', 'warning'); return; }

  var nombre     = document.getElementById('sug-nombre').value;
  var categoria  = document.getElementById('sug-categoria').value;
  var descripcion= document.getElementById('sug-desc').value;

  // Enviar al backend para guardar en MySQL y obtener nombre de imagen
  var fd = new FormData();
  fd.append('nombre',      nombre);
  fd.append('categoria',   categoria);
  fd.append('descripcion', descripcion);
  if (fotoFile) fd.append('foto', fotoFile);

  fetch('https://uanl-explora-backend.onrender.com/lugares', { method: 'POST', body: fd })
    .then(function(r) { return r.json(); })
    .then(function(data) {
      var nuevo = {
        id: 'l' + Date.now(),
        autorId: usuario.id,
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        imagen: data.foto ? ('https://uanl-explora-backend.onrender.com/uploads/' + data.foto) : null,
        resenas: [{
          id: 'r' + Date.now(),
          autorId: usuario.id,
          autor: usuario.nombre + ' ' + usuario.apellido,
          texto: descripcion,
          estrellas: estrellas,
          fecha: new Date().toISOString().slice(0, 10)
        }]
      };
      addLugar(nuevo);
      cerrarModalSugerir();
      showToast('¡Lugar sugerido exitosamente!', 'success');
      location.reload();
    })
    .catch(function() {
      // Si el servidor no responde, guardar solo en localStorage sin foto
      var nuevo = {
        id: 'l' + Date.now(),
        autorId: usuario.id,
        nombre: nombre,
        categoria: categoria,
        descripcion: descripcion,
        imagen: null,
        resenas: [{
          id: 'r' + Date.now(),
          autorId: usuario.id,
          autor: usuario.nombre + ' ' + usuario.apellido,
          texto: descripcion,
          estrellas: estrellas,
          fecha: new Date().toISOString().slice(0, 10)
        }]
      };
      addLugar(nuevo);
      cerrarModalSugerir();
      showToast('¡Lugar sugerido exitosamente!', 'success');
      location.reload();
    });
}

// =============================================
// RENDER CARD
// =============================================
function renderCard(lugar) {
  var promedio = getPromedioEstrellas(lugar.resenas);
  var fav = esFavorito(lugar.id);
  var usuario = getUsuarioActual();
  var ultimaResena = lugar.resenas.length > 0 ? lugar.resenas[lugar.resenas.length - 1] : null;

  return (
    '<div class="card" id="card-' + lugar.id + '">' +

      // — Fila: imagen + contenido + columna derecha (badge arriba + favorito debajo) —
      '<div class="card-row">' +
        (lugar.imagen
          ? '<div class="card-top-img"><img src="' + lugar.imagen + '" alt="' + lugar.nombre + '" onerror="this.parentElement.style.display=\'none\'"></div>'
          : '') +
        '<div class="card-body">' +
          '<div class="card-title-wrap" style="margin-bottom:6px">' +
            '<div class="card-icon">' + getCategoryIcon(lugar.categoria) + '</div>' +
            '<strong class="card-title">' + lugar.nombre + '</strong>' +
          '</div>' +
          '<p class="card-desc">' + lugar.descripcion + '</p>' +
          '<span class="estrellas">' + renderEstrellas(promedio) +
            ' <small>(' + lugar.resenas.length + ' reseña' + (lugar.resenas.length !== 1 ? 's' : '') + ')</small>' +
          '</span>' +
        '</div>' +
        '<div class="card-right-col">' +
          '<span class="badge badge-' + lugar.categoria + '">' + getCategoryLabel(lugar.categoria) + '</span>' +
          '<button class="btn-fav' + (fav ? ' fav-activo' : '') + '" onclick="handleToggleFav(\'' + lugar.id + '\', this)">' +
            (fav ? '♥' : '♡') + ' Favorito' +
          '</button>' +
        '</div>' +
      '</div>' + // card-row

      // — Sección inferior full-width: reseña + formulario —
      (ultimaResena || usuario
        ? '<div class="card-bottom">' +
            (ultimaResena
              ? '<div class="resena-item">' +
                  '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px">' +
                    '<div>' +
                      '<strong>' + ultimaResena.autor + '</strong>' +
                      '<span class="est-mini"> ' + '★'.repeat(ultimaResena.estrellas) + '</span>' +
                    '</div>' +
                    (usuario && ultimaResena.autorId === usuario.id
                      ? '<button onclick="eliminarResena(\'' + lugar.id + '\',\'' + ultimaResena.id + '\')" style="background:none;border:none;cursor:pointer;font-size:.75rem;color:#c0392b;padding:2px 6px;border-radius:6px;border:1px solid #c0392b" title="Eliminar mi reseña">🗑</button>'
                      : '') +
                  '</div>' +
                  '<p>&ldquo;' + ultimaResena.texto + '&rdquo;</p>' +
                '</div>'
              : '') +
            (lugar.resenas.length > 1
              ? '<button class="btn-ver-resenas" onclick="toggleResenas(\'' + lugar.id + '\', this)">' +
                  '<span class="btn-ver-resenas-icon">💬</span>' +
                  'Ver ' + (lugar.resenas.length - 1) + ' reseña' + (lugar.resenas.length - 1 !== 1 ? 's' : '') + ' más' +
                  '<span class="btn-ver-resenas-arrow">▾</span>' +
                '</button>' +
                '<div class="resenas-panel" id="resenas-panel-' + lugar.id + '">' +
                  lugar.resenas.slice(0, -1).reverse().map(function(r) {
                    return '<div class="resena-item">' +
                      '<div style="display:flex;justify-content:space-between;align-items:center;gap:8px">' +
                        '<div>' +
                          '<strong>' + r.autor + '</strong>' +
                          '<span class="est-mini"> ' + '★'.repeat(r.estrellas) + '</span>' +
                        '</div>' +
                        (usuario && r.autorId === usuario.id
                          ? '<button onclick="eliminarResena(\'' + lugar.id + '\',\'' + r.id + '\')" style="background:none;border:none;cursor:pointer;font-size:.75rem;color:#c0392b;padding:2px 6px;border-radius:6px;border:1px solid #c0392b" title="Eliminar mi reseña">🗑</button>'
                          : '') +
                      '</div>' +
                      '<p>&ldquo;' + r.texto + '&rdquo;</p>' +
                      '<small style="color:var(--texto-suave);font-size:.72rem">' + r.fecha + '</small>' +
                    '</div>';
                  }).join('') +
                '</div>'
              : '') +
            (usuario
              ? '<button class="btn-resena" onclick="toggleFormResena(\'' + lugar.id + '\')">' +
                  '+ Agregar reseña' +
                '</button>' +
                '<div id="form-' + lugar.id + '" class="form-resena" style="display:none">' +
                  '<textarea id="txt-' + lugar.id + '" placeholder="Escribe tu reseña..."></textarea>' +
                  '<div class="star-input-inline" id="stars-' + lugar.id + '">' +
                    [1,2,3,4,5].map(function(n) {
                      return '<span class="star-opt" onclick="selectStarResena(\'' + lugar.id + '\',' + n + ')">☆</span>';
                    }).join('') +
                  '</div>' +
                  '<input type="hidden" id="est-' + lugar.id + '" value="0">' +
                  '<button onclick="submitResena(\'' + lugar.id + '\')" class="btn-primary-sm">Publicar</button>' +
                '</div>'
              : '<p class="hint-login"><a href="registro.html">Inicia sesión</a> para agregar una reseña o favorito.</p>') +
          '</div>'
        : '') +

    '</div>'
  );
}

function handleToggleFav(lugarId, btn) {
  var usuario = getUsuarioActual();
  if (!usuario) {
    showConfirm('Necesitas iniciar sesión para agregar a favoritos. ¿Deseas acceder?', function() {
      window.location.href = 'registro.html';
    });
    return;
  }
  var added = toggleFavorito(lugarId);
  btn.textContent = (added ? '♥' : '♡') + ' Favorito';
  btn.classList.toggle('fav-activo', added);
}

function toggleResenas(lugarId, btn) {
  var panel = document.getElementById('resenas-panel-' + lugarId);
  var icon = btn.querySelector('.btn-ver-resenas-arrow');
  if (panel) {
    if (panel.style.display === 'block') {
      panel.style.display = 'none';
      if (icon) icon.textContent = '▾';
    } else {
      panel.style.display = 'block';
      if (icon) icon.textContent = '▴';
    }
  }
}

function toggleFormResena(lugarId) {
  var form = document.getElementById('form-' + lugarId);
  if (form) form.style.display = form.style.display === 'none' ? 'block' : 'none';
}

function selectStarResena(lugarId, val) {
  document.getElementById('est-' + lugarId).value = val;
  var stars = document.querySelectorAll('#stars-' + lugarId + ' .star-opt');
  stars.forEach(function(s, i) { 
    s.textContent = i < val ? '★' : '☆'; 
    if (i < val) s.classList.add('star-active'); else s.classList.remove('star-active');
  });
}

function submitResena(lugarId) {
  var usuario = getUsuarioActual();
  var texto = document.getElementById('txt-' + lugarId).value.trim();
  var estrellas = parseInt(document.getElementById('est-' + lugarId).value);
  if (!texto) { showToast('Escribe algo en tu reseña.', 'warning'); return; }
  if (!estrellas) { showToast('Selecciona una calificación.', 'warning'); return; }

  // Guardar en localStorage
  addResena(lugarId, {
    id: 'r' + Date.now(),
    autorId: usuario.id,
    autor: usuario.nombre + ' ' + usuario.apellido,
    texto: texto,
    estrellas: estrellas,
    fecha: new Date().toISOString().slice(0, 10)
  });

  // Guardar en MySQL
  var usuarioIdNum = usuario.id.toString().replace('db_', '');
  var lugarIdNum   = lugarId.toString().replace('db_', '').replace('l', '');

  fetch('https://uanl-explora-backend.onrender.com/resenas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      usuario_id:   parseInt(usuarioIdNum) || null,
      lugar_id:     parseInt(lugarIdNum)   || null,
      lugar_id_str: lugarId,
      comentario:   texto,
      calificacion: estrellas
    })
  }).catch(function() {
    console.warn('No se pudo guardar la reseña en la base de datos.');
  });

  showToast('¡Reseña publicada!', 'success');
  setTimeout(function() { location.reload(); }, 1600);
}

function eliminarResena(lugarId, resenaId) {
  var usuario = getUsuarioActual();
  if (!usuario) return;
  showConfirm('¿Eliminar tu reseña?', function() {
    var lugares = JSON.parse(localStorage.getItem('uanl_lugares') || '[]');
    var lugar = lugares.find(function(l) { return l.id === lugarId; });
    if (!lugar) return;
    var resena = lugar.resenas.find(function(r) { return r.id === resenaId; });
    if (!resena || resena.autorId !== usuario.id) {
      showToast('No puedes eliminar esta reseña.', 'error');
      return;
    }
    lugar.resenas = lugar.resenas.filter(function(r) { return r.id !== resenaId; });
    localStorage.setItem('uanl_lugares', JSON.stringify(lugares));
    showToast('Reseña eliminada.', 'success');
    setTimeout(function() { location.reload(); }, 1600);
  });
}

// =============================================
// INIT ON LOAD
// =============================================
document.addEventListener('DOMContentLoaded', initData);
