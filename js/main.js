/* ===== 洛克王国：世界 攻略站 — 共享脚本 ===== */

// 视频懒加载 — 点击缩略图后加载iframe
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.video-thumb').forEach(function(thumb) {
    thumb.addEventListener('click', function() {
      var container = this.nextElementSibling;
      var iframe = container.querySelector('iframe');
      if (iframe && iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
        iframe.removeAttribute('data-src');
      }
      container.style.display = 'block';
      this.style.display = 'none';
    });
  });
});

// 能力条动画 — 进入可视区域时才加载
(function() {
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-bar-fill').forEach(function(bar) {
          bar.style.width = bar.style.width; // 触发CSS transition重绘
        });
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('[class*="stat-bar"]').forEach(function(row) {
    observer.observe(row.closest('div') || row);
  });
})();

// 主题切换
(function() {
  const saved = localStorage.getItem('roco-theme');
  if (saved === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
  if (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? '' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('roco-theme', next || 'light');
  updateThemeIcon();
}

function updateThemeIcon() {
  const btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
}

document.addEventListener('DOMContentLoaded', updateThemeIcon);

// 复制兑换码
function copyCode(btn, code) {
  navigator.clipboard.writeText(code).then(() => {
    btn.textContent = '✅ 已复制';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 复制';
      btn.classList.remove('copied');
    }, 2000);
  }).catch(() => {
    // fallback
    const ta = document.createElement('textarea');
    ta.value = code;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    btn.textContent = '✅ 已复制';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = '📋 复制';
      btn.classList.remove('copied');
    }, 2000);
  });
}

// 全局搜索
(function() {
  const searchData = [
    { title: '新手开荒攻略', desc: '御三家选择 · 速升30级 · 前期必抓', url: '/guide-newbie.html' },
    { title: 'BOSS打法：传说精灵', desc: '高配/低配/逃课三套方案', url: '/guide-boss.html' },
    { title: '火花', desc: '火系 · 御三家 · 高爆发输出', url: '/pets.html#spark' },
    { title: '水蓝蓝', desc: '水系 · 御三家 · 续航坦克', url: '/pets.html#water' },
    { title: '喵喵', desc: '草系 · 御三家 · 回血生存', url: '/pets.html#grass' },
    { title: '机幕方舟', desc: '机械系 · S2传说 · 拼装传动', url: '/pets.html#mech' },
    { title: '雪怪', desc: '草+冰 · S2通行证', url: '/pets.html#snow' },
    { title: '爆焰喷喷', desc: '火+机械 · S2通行证', url: '/pets.html#blast' },
    { title: '岚鸟', desc: '跑图神器 · 加速性格', url: '/guide-newbie.html#catch' },
    { title: '音速犬', desc: '跑图神器 · PVE/PVP两用', url: '/guide-newbie.html#catch' },
    { title: '罗隐', desc: 'PVE神宠 · 冲刺采矿', url: '/guide-newbie.html#catch' },
    { title: '兑换码', desc: '洛神杯冠军之夜 · 326做回小洛克', url: '/quick-ref.html#codes' },
    { title: '藏宝图点位', desc: '黑水峡 · 沉船漩涡 · 岚语峰', url: '/quick-ref.html#treasure' },
    { title: '每日任务清单', desc: '每日必做 · 材料速刷', url: '/quick-ref.html#daily' },
    { title: 'BOSS技能时间轴', desc: '传说BOSS技能循环', url: '/quick-ref.html#boss' },
    { title: '捕捉技巧', desc: '星星魔法砸晕 + 绕背战斗', url: '/guide-newbie.html#tips' },
    { title: '孵蛋加速', desc: '港口海滩风场技巧', url: '/guide-newbie.html#tips' },
    { title: '古币机路线', desc: '商业街区 → 彼得大道 → 王国城堡', url: '/quick-ref.html#treasure' },
    { title: 'DOT逃课流', desc: '嘟嘟锅毒雾秒BOSS', url: '/guide-boss.html' },
    { title: '奇遇机制', desc: 'S2幸运惊喜盒盲盒', url: '/guide-newbie.html' },
    { title: '材料掉落', desc: '各区域材料速查', url: '/quick-ref.html#material' },
  ];

  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if (!input || !results) return;

  input.addEventListener('input', function() {
    const q = this.value.trim().toLowerCase();
    if (!q) { results.classList.remove('show'); return; }
    const matches = searchData.filter(item =>
      item.title.toLowerCase().includes(q) || item.desc.toLowerCase().includes(q)
    );
    if (matches.length === 0) {
      results.innerHTML = '<div class="no-results">未找到相关内容</div>';
    } else {
      results.innerHTML = matches.slice(0, 8).map(m =>
        `<a href="${m.url}" class="search-result-item" style="display:block;text-decoration:none;color:inherit;">
          <div style="color:var(--text-heading);">${m.title}</div>
          <div class="label">${m.desc}</div>
        </a>`
      ).join('');
    }
    results.classList.add('show');
  });

  document.addEventListener('click', function(e) {
    if (!e.target.closest('.search-wrap')) results.classList.remove('show');
  });
})();
