/* ============================================
   ALPHA TECHNOLOGY — SHARED LAYOUT JS
   Handles sidebar, topbar, dropdowns for all pages
   ============================================ */

(function () {
  const SIDEBAR_HTML = `
  <aside class="sidebar" id="sidebar">
    <div class="sidebar-brand">
      <div class="brand-logo">
        <span class="brand-icon">α</span>
      </div>
      <div class="brand-text">
        <span class="brand-name">Alpha</span>
        <span class="brand-sub">Technology</span>
      </div>
    </div>
    <nav class="sidebar-nav">
      <div class="nav-label">MENU UTAMA</div>
      <a href="../index.html"   class="nav-item" data-page="dashboard"><i class='bx bxs-dashboard'></i><span>Dashboard</span></a>
      <a href="calendar.html"  class="nav-item" data-page="calendar"><i class='bx bx-calendar'></i><span>Kalender</span></a>
      <a href="projects-list.html" class="nav-item" data-page="projects"><i class='bx bx-folder-open'></i><span>Proyek</span><span class="nav-badge">12</span></a>
      <a href="tasks-kanban.html"  class="nav-item" data-page="tasks"><i class='bx bx-task'></i><span>Tasks</span></a>
      <div class="nav-label">KEUANGAN</div>
      <a href="invoices-list.html" class="nav-item" data-page="invoices"><i class='bx bx-receipt'></i><span>Invoice</span></a>
      <a href="#" class="nav-item"><i class='bx bx-line-chart'></i><span>Revenue</span></a>
      <div class="nav-label">TEKNOLOGI</div>
      <a href="#" class="nav-item"><i class='bx bx-code-block'></i><span>Tech Stack</span></a>
      <a href="#" class="nav-item"><i class='bx bx-group'></i><span>Tim Kami</span></a>
      <div class="nav-label">SISTEM</div>
      <a href="#" class="nav-item"><i class='bx bx-cog'></i><span>Pengaturan</span></a>
    </nav>
    <div class="sidebar-footer">
      <div class="user-avatar-sm">AT</div>
      <div class="user-info-sm">
        <span class="user-name-sm">Admin</span>
        <span class="user-role-sm">Super Admin</span>
      </div>
      <i class='bx bx-log-out logout-icon'></i>
    </div>
  </aside>`;

  const TOPBAR_HTML = `
  <header class="topbar">
    <div class="topbar-left">
      <button class="topbar-toggle" id="topbarToggle"><i class='bx bx-menu'></i></button>
      <div class="breadcrumb" id="breadcrumb">
        <span class="breadcrumb-item">Alpha Technology</span>
        <i class='bx bx-chevron-right breadcrumb-sep'></i>
        <span class="breadcrumb-item active" id="breadcrumb-page">Dashboard</span>
      </div>
    </div>
    <div class="topbar-right">
      <div class="topbar-search">
        <i class='bx bx-search'></i>
        <input type="text" placeholder="Cari..." />
      </div>
      <div class="topbar-icon-btn" id="notifBtn">
        <i class='bx bx-bell'></i>
        <span class="notif-dot"></span>
        <div class="dropdown-panel notif-panel" id="notifPanel">
          <div class="dp-header"><h6>Notifikasi</h6><span class="badge-count">4</span></div>
          <div class="notif-list">
            <div class="notif-item"><div class="notif-icon bg-primary-soft"><i class='bx bx-folder'></i></div><div class="notif-text"><p>HR System <strong>selesai review</strong></p><small>5 menit lalu</small></div></div>
            <div class="notif-item"><div class="notif-icon bg-success-soft"><i class='bx bx-check-circle'></i></div><div class="notif-text"><p>Invoice #047 sudah <strong>dibayar</strong></p><small>1 jam lalu</small></div></div>
            <div class="notif-item"><div class="notif-icon bg-warning-soft"><i class='bx bx-time'></i></div><div class="notif-text"><p>Deadline Inventory — <strong>3 hari lagi</strong></p><small>2 jam lalu</small></div></div>
          </div>
          <div class="dp-footer"><a href="#">Lihat semua notifikasi</a></div>
        </div>
      </div>
      <div class="topbar-user" id="userBtn">
        <div class="user-avatar">AT</div>
        <div class="user-info"><span class="user-name">Admin</span><span class="user-role">Super Admin</span></div>
        <i class='bx bx-chevron-down'></i>
        <div class="dropdown-panel user-panel" id="userPanel">
          <div class="dp-user-header">
            <div class="user-avatar lg">AT</div>
            <div><p class="dp-user-name">Administrator</p><small>admin@alphatech.id</small></div>
          </div>
          <div class="dp-links">
            <a href="#"><i class='bx bx-user'></i> Profil Saya</a>
            <a href="#"><i class='bx bx-cog'></i> Pengaturan</a>
          </div>
          <div class="dp-footer"><a href="#" class="logout-link"><i class='bx bx-power-off'></i> Keluar</a></div>
        </div>
      </div>
    </div>
  </header>`;

  function inject() {
    const sidebarTarget = document.getElementById('sidebar-slot');
    const topbarTarget  = document.getElementById('topbar-slot');
    if (sidebarTarget) sidebarTarget.outerHTML = SIDEBAR_HTML;
    if (topbarTarget)  topbarTarget.outerHTML  = TOPBAR_HTML;
    initLayout();
  }

  function initLayout() {
    // Active nav
    const currentPage = document.body.dataset.page;
    document.querySelectorAll('.nav-item[data-page]').forEach(item => {
      if (item.dataset.page === currentPage) item.classList.add('active');
    });

    // Breadcrumb
    const bcPage = document.getElementById('breadcrumb-page');
    if (bcPage && document.body.dataset.breadcrumb) {
      bcPage.textContent = document.body.dataset.breadcrumb;
    }

    // Sidebar toggle
    const sidebar     = document.getElementById('sidebar');
    const mainWrapper = document.getElementById('mainWrapper');
    const toggle      = document.getElementById('topbarToggle');

    if (toggle && sidebar && mainWrapper) {
      toggle.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          sidebar.classList.toggle('mobile-show');
        } else {
          sidebar.classList.toggle('collapsed');
          mainWrapper.classList.toggle('collapsed');
        }
      });
    }

    // Dropdowns
    const notifBtn   = document.getElementById('notifBtn');
    const notifPanel = document.getElementById('notifPanel');
    const userBtn    = document.getElementById('userBtn');
    const userPanel  = document.getElementById('userPanel');

    function close() {
      [notifPanel, userPanel].forEach(p => p && p.classList.remove('show'));
    }

    if (notifBtn) notifBtn.addEventListener('click', e => { e.stopPropagation(); notifPanel.classList.toggle('show'); userPanel.classList.remove('show'); });
    if (userBtn)  userBtn.addEventListener('click',  e => { e.stopPropagation(); userPanel.classList.toggle('show'); notifPanel.classList.remove('show'); });
    document.addEventListener('click', close);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject);
  } else {
    inject();
  }
})();
