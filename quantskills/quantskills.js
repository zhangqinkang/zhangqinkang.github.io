(function () {
  const root = document.documentElement;
  const header = document.querySelector('header');
  const hero = document.querySelector('main section:first-child');
  const searchInput = hero && hero.querySelector('input[placeholder*="搜索"]');
  const exploreButton = searchInput && searchInput.closest('.mt-8').querySelector('button');
  const themeButton = header && header.querySelector('button[aria-label*="深色"], button[aria-label*="浅色"]');
  const languageButton = header && header.querySelector('button[aria-label="Switch to English"]');
  const menuButton = header && header.querySelector('button[aria-label="打开菜单"]');
  const compare = hero && hero.querySelector('[role="slider"][aria-label="对比滑块"]');

  document.querySelectorAll('a[href="/"][target="_blank"], a[href="/data-service"][target="_blank"]').forEach((link) => {
    link.removeAttribute('target');
    link.removeAttribute('rel');
  });

  if (searchInput && exploreButton) {
    const runSearch = () => {
      const query = searchInput.value.trim();
      const target = document.querySelector('main section:nth-child(2)');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      if (query) {
        const heading = target && target.querySelector('h2');
        if (heading) heading.dataset.query = query;
      }
    };
    exploreButton.addEventListener('click', runSearch);
    searchInput.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') runSearch();
    });
  }

  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const dark = root.dataset.theme !== 'dark';
      root.dataset.theme = dark ? 'dark' : 'light';
      themeButton.setAttribute('aria-label', dark ? '切换到浅色模式' : '切换到深色模式');
    });
  }

  if (languageButton) {
    languageButton.addEventListener('click', () => {
      languageButton.textContent = languageButton.textContent.trim() === 'EN' ? '中' : 'EN';
    });
  }

  if (menuButton && header) {
    const nav = header.querySelector('nav');
    const mobileMenu = document.createElement('nav');
    mobileMenu.className = 'qs-mobile-menu';
    mobileMenu.hidden = true;
    mobileMenu.innerHTML = nav ? nav.innerHTML : '';
    header.appendChild(mobileMenu);
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.addEventListener('click', () => {
      mobileMenu.hidden = !mobileMenu.hidden;
      menuButton.setAttribute('aria-expanded', String(!mobileMenu.hidden));
    });
    mobileMenu.addEventListener('click', () => {
      mobileMenu.hidden = true;
      menuButton.setAttribute('aria-expanded', 'false');
    });
  }

  if (compare) {
    const stage = compare.closest('.cursor-ew-resize');
    const clipped = stage && compare.parentElement.previousElementSibling;
    const divider = compare.parentElement;
    const setPosition = (clientX) => {
      const box = stage.getBoundingClientRect();
      const pct = Math.max(2, Math.min(98, ((clientX - box.left) / box.width) * 100));
      clipped.style.clipPath = 'inset(0 ' + (100 - pct) + '% 0 0)';
      divider.style.left = pct + '%';
      compare.setAttribute('aria-valuenow', String(Math.round(pct)));
    };
    let dragging = false;
    let userControlled = false;
    stage.addEventListener('pointerdown', (event) => {
      dragging = true;
      userControlled = true;
      stage.setPointerCapture(event.pointerId);
      setPosition(event.clientX);
    });
    stage.addEventListener('pointermove', (event) => {
      if (dragging) setPosition(event.clientX);
    });
    stage.addEventListener('pointerup', () => { dragging = false; });
    compare.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
      event.preventDefault();
      userControlled = true;
      const next = Number(compare.getAttribute('aria-valuenow')) + (event.key === 'ArrowRight' ? 3 : -3);
      const box = stage.getBoundingClientRect();
      setPosition(box.left + box.width * next / 100);
    });
    const startedAt = performance.now();
    const animateCompare = (now) => {
      if (!userControlled && !dragging && document.visibilityState === 'visible') {
        const pct = 54 + Math.sin((now - startedAt) / 1800) * 13;
        const box = stage.getBoundingClientRect();
        setPosition(box.left + box.width * pct / 100);
      }
      requestAnimationFrame(animateCompare);
    };
    requestAnimationFrame(animateCompare);
  }

  const sections = [...document.querySelectorAll('main section')];
  const skillGrid = sections[1]?.querySelector('.grid.gap-4');
  const agentEmpty = sections[2]?.querySelector('.qs-grid-bg');
  const workflowEmpty = sections[3]?.querySelector('.qs-grid-bg');
  const contributorList = sections[3]?.querySelector('.card-surface');

  const skills = [
    { name: '因子有效性检验', desc: 'IC、RankIC、分层收益与稳定性一键评估。', tags: ['因子', '研究'], calls: '2.8k' },
    { name: 'A股多因子选股', desc: '组合价值、质量、动量因子生成候选股票池。', tags: ['A股', '选股'], calls: '2.1k' },
    { name: '研报因子复现', desc: '将研报逻辑拆解为可运行、可验证的因子流程。', tags: ['研报', '复现'], calls: '1.7k' },
    { name: 'CTA 趋势跟踪', desc: '多周期突破与波动率过滤的趋势信号。', tags: ['期货', 'CTA'], calls: '1.4k' },
    { name: '组合风险归因', desc: '拆分行业、风格和个股对组合风险的贡献。', tags: ['组合', '风控'], calls: '980' },
    { name: 'PandaData 数据接入', desc: '标准化行情、财务与因子数据读取接口。', tags: ['数据', 'API'], calls: '860' }
  ];
  if (skillGrid && !skillGrid.children.length) {
    skillGrid.innerHTML = skills.map(skill => '<article class="qs-content-card"><div class="qs-card-mark">SKILL</div><h3>' + skill.name + '</h3><p>' + skill.desc + '</p><div class="qs-card-foot"><span>' + skill.tags.map(tag => '#' + tag).join(' · ') + '</span><span>' + skill.calls + ' 次调用</span></div></article>').join('');
  }

  const agents = [
    { name: 'Alpha 因子研究员', desc: '从研究假设到因子检验，自动完成完整研究链路。', meta: '6 个技能 · 1.9k 次调用' },
    { name: '策略回测助手', desc: '把自然语言策略转换为回测参数与结果解读。', meta: '5 个技能 · 1.4k 次调用' },
    { name: '研报复现 Agent', desc: '解析研报并生成可复核的因子实现与实验报告。', meta: '8 个技能 · 1.1k 次调用' }
  ];
  if (agentEmpty) {
    agentEmpty.className = 'qs-content-grid qs-agent-grid';
    agentEmpty.innerHTML = agents.map((agent, index) => '<article class="qs-content-card qs-agent-card"><img src="/quantskills/avatars/' + ['294134849.jpg','1308597.jpg','586776.png'][index] + '" alt=""><div><div class="qs-card-mark">AGENT</div><h3>' + agent.name + '</h3><p>' + agent.desc + '</p><span class="qs-card-meta">' + agent.meta + '</span></div></article>').join('');
  }

  const workflows = [
    { name: '研报到因子验证', steps: '研报解析 → 因子实现 → IC 检验 → 回测报告' },
    { name: '多因子组合构建', steps: '因子清洗 → 中性化 → 加权合成 → 风险归因' },
    { name: 'CTA 策略研究', steps: '合约数据 → 趋势信号 → 仓位管理 → 绩效评估' }
  ];
  if (workflowEmpty) {
    workflowEmpty.className = 'qs-workflow-list';
    workflowEmpty.innerHTML = workflows.map((workflow, index) => '<article class="qs-workflow-card"><span class="qs-workflow-no">0' + (index + 1) + '</span><div><h3>' + workflow.name + '</h3><p>' + workflow.steps + '</p></div><button type="button">查看流程</button></article>').join('');
  }

  const contributors = [
    ['60038466.jpg', 'PandaAI Research', '34 项贡献'],
    ['45360742.png', 'quant-lab', '27 项贡献'],
    ['213890245.png', 'factor-miner', '19 项贡献'],
    ['46114615.png', 'alpha-builder', '16 项贡献'],
    ['210153680.jpg', 'data-runner', '12 项贡献']
  ];
  if (contributorList && !contributorList.children.length) {
    contributorList.innerHTML = contributors.map((item, index) => '<div class="qs-contributor"><span class="qs-rank">' + (index + 1) + '</span><img src="/quantskills/avatars/' + item[0] + '" alt=""><div><strong>' + item[1] + '</strong><span>' + item[2] + '</span></div></div>').join('');
  }

  /* The marked showcase entrances are previews only until authentication.
     Desktop keeps them visibly non-interactive; mobile sends a single tap
     straight to login, matching the site's shared device rule. */
  const authMedia = window.matchMedia('(max-width: 768px)');
  const authReturnUrl = location.pathname + location.search + location.hash;
  const authHref = '/login?redirect=' + encodeURIComponent(authReturnUrl);
  const authSelectors = [
    'header nav a',
    'header a[aria-label="GitHub"]',
    'main section:nth-child(2) > div:last-child .qs-content-card',
    'main section:nth-child(2) a',
    'main section:nth-child(3) .qs-content-card',
    'main section:nth-child(3) a',
    '.qs-workflow-card button',
    'footer .grid a'
  ].join(',');
  const syncAuthEntrances = () => {
    document.querySelectorAll(authSelectors).forEach(control => {
      control.dataset.qsAuthEntry = 'true';
      if (authMedia.matches) {
        delete control.dataset.pandaUnavailable;
        control.dataset.pandaMobileLogin = 'true';
        control.removeAttribute('aria-disabled');
        if (!control.matches('a,button')) control.setAttribute('tabindex', '0');
        return;
      }
      delete control.dataset.pandaMobileLogin;
      control.dataset.pandaUnavailable = 'true';
      control.setAttribute('aria-disabled', 'true');
      control.setAttribute('tabindex', '-1');
    });
  };
  document.addEventListener('click', event => {
    const control = event.target.closest?.('[data-qs-auth-entry="true"]');
    if (!control) return;
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    if (authMedia.matches) location.href = authHref;
  }, true);
  syncAuthEntrances();
  if (typeof authMedia.addEventListener === 'function') authMedia.addEventListener('change', syncAuthEntrances);
  else authMedia.addListener?.(syncAuthEntrances);

  const assistant = document.createElement('div');
  assistant.className = 'fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-[1000] flex flex-col items-end gap-3';
  assistant.innerHTML = '<button data-v-9dda0f02="" class="flex-center w-14 h-14 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 text-white shadow-xl hover:scale-105 active:scale-95 transition-transform" aria-label="打开智能助手"><span data-v-b1c0cc32="" data-v-9dda0f02="" class="robot3d-stage" aria-hidden="true" style="width:34px;height:34px"><span data-v-b1c0cc32="" class="robot3d-bob"><svg data-v-b1c0cc32="" class="robot3d-turn" viewBox="0 0 40 40" width="34" height="34" fill="none"><defs><linearGradient id="qs-r3d-head" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#c4cdf0"/></linearGradient><linearGradient id="qs-r3d-ear" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b6bfe2"/><stop offset="1" stop-color="#7c85ad"/></linearGradient><radialGradient id="qs-r3d-eye"><stop offset="0" stop-color="#e7feff"/><stop offset=".55" stop-color="#22d3ee"/><stop offset="1" stop-color="#0ea5c4"/></radialGradient><radialGradient id="qs-r3d-tip"><stop offset="0" stop-color="#cffafe"/><stop offset="1" stop-color="#22d3ee"/></radialGradient></defs><line x1="20" y1="5.5" x2="20" y2="9.5" stroke="#aeb7da" stroke-width="1.6" stroke-linecap="round"/><circle class="robot3d-tip" cx="20" cy="4" r="2.1" fill="url(#qs-r3d-tip)"/><rect x="8.9" y="9.9" width="22" height="19" rx="7" fill="#9aa3c8"/><rect x="8" y="9" width="22" height="19" rx="7" fill="url(#qs-r3d-head)" stroke="#eef1fb" stroke-width=".5"/><ellipse cx="19" cy="12" rx="7" ry="2" fill="#fff" opacity=".5"/><rect x="6.2" y="15" width="2.1" height="5.2" rx="1" fill="url(#qs-r3d-ear)"/><rect x="31.7" y="15" width="2.1" height="5.2" rx="1" fill="url(#qs-r3d-ear)"/><rect x="11.4" y="13" width="15.2" height="11.6" rx="3.8" fill="#1e1a3c"/><g class="robot3d-eyes"><circle cx="15.4" cy="18.7" r="2" fill="url(#qs-r3d-eye)"/><circle cx="22.6" cy="18.7" r="2" fill="url(#qs-r3d-eye)"/></g><path d="M16.6 22.2h6.8" stroke="#3f3a6e" stroke-width="1.2" stroke-linecap="round"/><rect x="16.5" y="28" width="7" height="2.6" rx="1.2" fill="#aab3d8"/><path d="M12 33.5c0-2.6 3.4-4 8-4s8 1.4 8 4v1H12z" fill="url(#qs-r3d-head)"/></svg></span></span></button>';
  document.body.appendChild(assistant);
})();
