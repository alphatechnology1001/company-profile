/* ============================================
   ALPHA TECHNOLOGY DASHBOARD — JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ===== SIDEBAR TOGGLE =====
  const sidebar     = document.getElementById('sidebar');
  const mainWrapper = document.getElementById('mainWrapper');
  const topbarToggle = document.getElementById('topbarToggle');

  topbarToggle.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle('mobile-show');
    } else {
      sidebar.classList.toggle('collapsed');
      mainWrapper.classList.toggle('collapsed');
    }
  });

  // Close sidebar on outside click (mobile)
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('mobile-show')) {
      if (!sidebar.contains(e.target) && !topbarToggle.contains(e.target)) {
        sidebar.classList.remove('mobile-show');
      }
    }
  });

  // ===== DROPDOWN PANELS =====
  const notifBtn   = document.getElementById('notifBtn');
  const notifPanel = document.getElementById('notifPanel');
  const userBtn    = document.getElementById('userBtn');
  const userPanel  = document.getElementById('userPanel');

  function toggleDropdown(panel, otherPanel) {
    panel.classList.toggle('show');
    otherPanel.classList.remove('show');
  }

  notifBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleDropdown(notifPanel, userPanel); });
  userBtn.addEventListener('click',  (e) => { e.stopPropagation(); toggleDropdown(userPanel, notifPanel); });

  document.addEventListener('click', () => {
    notifPanel.classList.remove('show');
    userPanel.classList.remove('show');
  });

  // ===== COUNTER ANIMATION =====
  function animateCounter(el, target, duration = 1500) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { start = target; clearInterval(timer); }
      el.textContent = Math.floor(start);
    }, 16);
  }

  document.querySelectorAll('.stat-value[data-target]').forEach(el => {
    const target = parseInt(el.dataset.target);
    setTimeout(() => animateCounter(el, target), 300);
  });

  // ===== SPARKLINE CHARTS =====
  const sparklineOptions = (data, color) => ({
    chart: { type: 'area', height: 60, sparkline: { enabled: true }, animations: { enabled: true, speed: 800 } },
    series: [{ data }],
    colors: [color],
    stroke: { curve: 'smooth', width: 2 },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0 } },
    tooltip: { enabled: false },
  });

  new ApexCharts(document.getElementById('spark-projects'), sparklineOptions([20,28,30,35,38,42,47], '#556ee6')).render();
  new ApexCharts(document.getElementById('spark-clients'),  sparklineOptions([14,16,17,19,20,22,23], '#34c38f')).render();
  new ApexCharts(document.getElementById('spark-revenue'),  sparklineOptions([150,170,190,210,240,265,285], '#f1b44c')).render();
  new ApexCharts(document.getElementById('spark-rate'),     sparklineOptions([85,88,90,91,92,93,94], '#50a5f1')).render();

  // ===== REVENUE CHART =====
  const monthlyData = {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'],
    revenue: [120, 145, 160, 135, 190, 210, 175, 230, 265, 240, 285, 310],
    projects: [3, 4, 4, 3, 5, 6, 4, 7, 8, 6, 8, 9],
  };

  const quarterlyData = {
    categories: ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025', 'Q1 2026'],
    revenue: [425, 535, 670, 720, 740],
    projects: [11, 14, 19, 23, 25],
  };

  let revenueChart;

  function buildRevenueChart(data) {
    const opts = {
      chart: { type: 'area', height: 320, toolbar: { show: false }, zoom: { enabled: false },
        animations: { enabled: true, speed: 800 }
      },
      series: [
        { name: 'Revenue (Juta Rp)', data: data.revenue },
        { name: 'Proyek Selesai', data: data.projects, type: 'line' },
      ],
      colors: ['#556ee6', '#34c38f'],
      xaxis: { categories: data.categories, labels: { style: { fontSize: '12px', fontFamily: 'Poppins' } } },
      yaxis: [
        { labels: { formatter: v => `${v}jt`, style: { fontSize: '11px' } } },
        { opposite: true, labels: { formatter: v => `${v}`, style: { fontSize: '11px' } } },
      ],
      stroke: { width: [2.5, 2.5], curve: 'smooth', dashArray: [0, 4] },
      fill: {
        type: ['gradient', 'solid'],
        gradient: { opacityFrom: 0.35, opacityTo: 0.02 },
      },
      dataLabels: { enabled: false },
      legend: {
        position: 'top', horizontalAlign: 'right',
        fontSize: '12px', fontFamily: 'Poppins',
        markers: { width: 8, height: 8, radius: 3 },
      },
      grid: { borderColor: '#f0f2f5', strokeDashArray: 4 },
      tooltip: { shared: true, intersect: false, style: { fontFamily: 'Poppins' }, y: [{ formatter: v => `Rp ${v}jt` }, { formatter: v => `${v} proyek` }] },
      markers: { size: 0, hover: { size: 5 } },
    };
    return new ApexCharts(document.getElementById('revenueChart'), opts);
  }

  revenueChart = buildRevenueChart(monthlyData);
  revenueChart.render();

  // Tab switch
  window.switchRevChart = function (type, btn) {
    document.querySelectorAll('.tab-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    revenueChart.destroy();
    revenueChart = buildRevenueChart(type === 'monthly' ? monthlyData : quarterlyData);
    revenueChart.render();
  };

  // ===== SERVICE DONUT CHART =====
  new ApexCharts(document.getElementById('serviceChart'), {
    chart: { type: 'donut', height: 220, animations: { speed: 800 }, toolbar: { show: false } },
    series: [42, 28, 18, 12],
    labels: ['Custom Web App', 'Sistem Internal', 'API Integration', 'Data & Reporting'],
    colors: ['#556ee6', '#34c38f', '#f1b44c', '#f46a6a'],
    legend: { show: false },
    plotOptions: {
      pie: {
        donut: {
          size: '72%',
          labels: {
            show: true,
            total: {
              show: true, label: 'Total Proyek',
              fontSize: '12px', fontFamily: 'Poppins',
              formatter: () => '47',
              color: '#343a40',
            },
          },
        },
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    tooltip: { style: { fontFamily: 'Poppins' } },
  }).render();

  // ===== SEGMENT BAR CHART =====
  new ApexCharts(document.getElementById('segmentChart'), {
    chart: { type: 'bar', height: 160, toolbar: { show: false }, animations: { speed: 800 },
      sparkline: { enabled: false }
    },
    series: [{ name: 'Klien', data: [10, 7, 4, 2] }],
    xaxis: {
      categories: ['UMKM', 'Startup', 'Menengah', 'Konvensional'],
      labels: { style: { fontSize: '11px', fontFamily: 'Poppins' } },
      axisBorder: { show: false }, axisTicks: { show: false },
    },
    yaxis: { show: false },
    colors: ['#556ee6'],
    plotOptions: {
      bar: { borderRadius: 6, columnWidth: '55%',
        distributed: true,
      },
    },
    colors: ['#556ee6', '#34c38f', '#f1b44c', '#f46a6a'],
    dataLabels: { enabled: false },
    grid: { show: false },
    legend: { show: false },
    tooltip: { style: { fontFamily: 'Poppins' }, y: { formatter: v => `${v} klien` } },
  }).render();

  // ===== RADIAL CHART =====
  new ApexCharts(document.getElementById('radialChart'), {
    chart: { type: 'radialBar', height: 220, toolbar: { show: false }, animations: { speed: 800 } },
    series: [75, 25, 15, 94],
    labels: ['In Progress', 'Planning', 'Selesai (baru)', 'Selesai (all)'],
    colors: ['#556ee6', '#f1b44c', '#34c38f', '#50a5f1'],
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: -90, endAngle: 270,
        hollow: { margin: 4, size: '30%' },
        track: { background: '#f0f2f5', strokeWidth: '97%' },
        dataLabels: {
          name: { fontSize: '11px', fontFamily: 'Poppins' },
          value: { fontSize: '14px', fontFamily: 'Poppins', fontWeight: '600' },
          total: { show: true, label: 'Avg', fontSize: '12px', fontFamily: 'Poppins',
            formatter: () => '52%',
          },
        },
      },
    },
    legend: {
      show: true, position: 'bottom',
      fontSize: '11px', fontFamily: 'Poppins',
      markers: { width: 8, height: 8, radius: 3 },
    },
    stroke: { lineCap: 'round' },
  }).render();

  // ===== EXPORT REPORT =====
  window.exportReport = function () {
    const btn = document.querySelector('.btn-primary-sm');
    const original = btn.innerHTML;
    btn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Mengekspor...';
    btn.disabled = true;
    setTimeout(() => {
      btn.innerHTML = '<i class="bx bx-check"></i> Berhasil!';
      btn.style.background = '#34c38f';
      setTimeout(() => {
        btn.innerHTML = original;
        btn.style.background = '';
        btn.disabled = false;
      }, 2000);
    }, 1500);
  };

  // ===== ACTIVE NAV ITEM =====
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function (e) {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // ===== PROGRESS BAR ANIMATION =====
  const bars = document.querySelectorAll('.mini-bar, .seg-bar');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const width = el.style.width;
        el.style.width = '0';
        setTimeout(() => { el.style.width = width; }, 100);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.1 });

  bars.forEach(bar => observer.observe(bar));

});
