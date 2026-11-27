(function () {
  const portfolioPreview = new URLSearchParams(location.search).has('portfolioPreview');
  const livePreviewOnly = portfolioPreview && new URLSearchParams(location.search).has('liveOnly');
  const chartPixelRatio = () => {
    const deviceRatio = Math.min(2, window.devicePixelRatio || 1);
    if (!portfolioPreview) return deviceRatio;
    // The desktop document is scaled into a small portfolio mockup. Allocate
    // for its displayed pixels, not a full 1920px monitor at phone Retina DPR.
    const frame = window.frameElement;
    const displayedScale = frame ? frame.getBoundingClientRect().width / Math.max(1, innerWidth) : 1;
    return Math.max(.5, Math.min(1, displayedScale * (window.devicePixelRatio || 1)));
  };
  const models = [
    { name: 'GPT-5.1', value: 1038742, color: '#70a090', logo: '/projects/llm/site/_nuxt/model_chatgpt5_2.Bf5yEw47.png' },
    { name: 'PandaAI TQ-1', value: 1029607, color: '#111111', logo: '/projects/llm/site/_nuxt/model_pandaTQ1_2.D7pBW2VY.png' },
    { name: 'Claude Sonnet4.5', value: 1017512, color: '#d07050', logo: '/projects/llm/site/_nuxt/model_claude_2.BD5WZWcf.png' },
    { name: 'Gemini 3 Pro', value: 1008571, color: '#8040e0', logo: '/projects/llm/site/_nuxt/model_gemini_2.BCmkpLlD.png' },
    { name: 'Grok 4', value: 998055, color: '#777777', logo: '/projects/llm/site/_nuxt/model_grok_2.CuMJXrdQ.png' },
    { name: 'DeepSeek-V3', value: 989726, color: '#4060e0', logo: '/projects/llm/site/_nuxt/model_deepseek_2.B5uqTDT7.png' },
    { name: 'Qwen3-235B-A22B', value: 980717, color: '#6060d8', logo: '/projects/llm/site/_nuxt/model_qwen_1.DLeaLVnZ.png' },
    { name: '松鼠 Quant', value: 972851, color: '#e07060', logo: '/projects/llm/site/competition/llm/assets/model-squirrel-quant.png' },
    { name: 'Doubao-Seed-1.6', value: 964847, color: '#6fa3e0', logo: '/projects/llm/site/_nuxt/model_Doubao_2.Dx2OoZ6E.png' }
  ];
  const footerModelExtras = [
    { name:'Kimi K2', value:956214, logo:'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Ccircle cx="20" cy="20" r="19" fill="%231a73e8"/%3E%3Ctext x="20" y="25" text-anchor="middle" font-family="Arial" font-size="14" fill="white"%3EK2%3C/text%3E%3C/svg%3E' },
    { name:'GLM-4.6', value:948632, logo:'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Ccircle cx="20" cy="20" r="19" fill="%2300a67e"/%3E%3Ctext x="20" y="25" text-anchor="middle" font-family="Arial" font-size="13" fill="white"%3EGLM%3C/text%3E%3C/svg%3E' },
    { name:'Llama 4', value:941508, logo:'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Ccircle cx="20" cy="20" r="19" fill="%23654ee8"/%3E%3Ctext x="20" y="25" text-anchor="middle" font-family="Arial" font-size="12" fill="white"%3EL4%3C/text%3E%3C/svg%3E' },
    { name:'Mistral Large', value:933781, logo:'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"%3E%3Ccircle cx="20" cy="20" r="19" fill="%23f28c28"/%3E%3Ctext x="20" y="25" text-anchor="middle" font-family="Arial" font-size="14" fill="white"%3EM%3C/text%3E%3C/svg%3E' }
  ];

  const tagged = (tag, className, scope) => {
    const node = document.createElement(tag);
    node.className = className;
    node.setAttribute(scope, '');
    return node;
  };

  const wireCompetitionPickers = scope => {
    scope?.querySelectorAll('.arena-competition-picker').forEach(picker => {
      if (picker.dataset.pickerReady === 'true') return;
      picker.dataset.pickerReady = 'true';
      picker.querySelectorAll('.arena-competition-options button').forEach(option => option.addEventListener('click', event => {
        event.preventDefault();
        const value = picker.querySelector('.arena-picker-value');
        if (value) value.textContent = option.dataset.value || option.textContent.trim();
        picker.querySelectorAll('.arena-competition-options button').forEach(item => item.classList.toggle('is-active', item === option));
        picker.removeAttribute('open');
        picker.dispatchEvent(new CustomEvent('arena:picker-change', { detail:{ value:value?.textContent || '' } }));
      }));
    });
  };

  const returnHome = event => { event?.preventDefault?.(); event?.stopImmediatePropagation?.(); window.open('https://design-ui-pandaai.pages.dev/', '_blank', 'noopener,noreferrer'); };
  const goToLogin = event => { event?.preventDefault?.(); event?.stopImmediatePropagation?.(); window.open('https://design-ui-pandaai.pages.dev/login?redirect=%2Fcompetition%2Fllm%2F', '_blank', 'noopener,noreferrer'); };

  const armReturnFrameGuard = () => {
    document.documentElement.classList.remove('llm-preboot');
  };

  window.addEventListener('pageshow', event => {
    if (!event.persisted) return;
    window.location.reload();
  });

  const closeInlineRules = () => {
    const container = document.querySelector('.llm-container');
    container?.classList.remove('rules-inline-active');
    document.querySelector('.rules-inline-view')?.remove();
    document.querySelectorAll('[data-rules-display]').forEach(node => {
      node.style.display = node.dataset.rulesDisplay;
      delete node.dataset.rulesDisplay;
    });
  };

  const openInlineRules = async () => {
    const wrapper = document.querySelector('.llm-wrapper');
    const container = document.querySelector('.llm-container');
    if (!wrapper || !container || wrapper.querySelector('.rules-inline-view')) return;

    let stylesheet = document.querySelector('link[data-rules-styles]');
    if (!stylesheet) {
      stylesheet = document.createElement('link');
      stylesheet.rel = 'stylesheet';
      stylesheet.href = '/projects/llm/site/competition/llm/rules/rules-overrides.css?v=20260822-live121';
      stylesheet.dataset.rulesStyles = 'true';
      document.head.appendChild(stylesheet);
    }

    const response = await fetch('/projects/llm/site/competition/llm/rules/index.html');
    const source = await response.text();
    const rulesPage = new DOMParser().parseFromString(source, 'text/html').querySelector('.rules-page');
    if (!rulesPage) return;

    document.querySelectorAll('.llm-wrapper > .llm-live, .llm-wrapper > .llm-leaderboard, .llm-wrapper > .llm-model, .llm-wrapper > .menu').forEach(node => {
      node.dataset.rulesDisplay = node.style.display;
      node.style.display = 'none';
    });
    const host = document.createElement('div');
    host.className = 'rules-inline-view';
    host.appendChild(document.importNode(rulesPage, true));
    wrapper.appendChild(host);
    const rulesBack = host.querySelector('.rules-back');
    rulesBack?.removeAttribute('onclick');
    rulesBack?.addEventListener('click', event => {
      event.preventDefault();
      closeInlineRules();
      window.scrollTo({ top: 0, behavior: 'auto' });
    });
    container.classList.add('rules-inline-active');
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const installReturnLogic = () => {
    [...document.querySelectorAll('a,button,.link span')].filter(node => /前往官网|返回官网|官方网站/.test(node.textContent.trim())).forEach(node => {
      if (node.dataset.returnHomeReady === 'true') return;
      node.dataset.returnHomeReady = 'true';
      node.setAttribute('role', 'link');
      node.setAttribute('aria-label', '返回 PandaAI 首页并关闭当前标签页');
      node.addEventListener('click', returnHome, true);
    });
    document.querySelectorAll('.llm-navbar .nav-left .logo,.arena-mobile-brand').forEach(sourceLogo => {
      if (sourceLogo.dataset.returnHomeReady === 'true') return;
      let logo = sourceLogo;
      if (sourceLogo.matches('.llm-navbar .nav-left .logo')) {
        logo = sourceLogo.cloneNode(true);
        sourceLogo.replaceWith(logo);
      }
      logo.dataset.returnHomeReady = 'true';
      logo.setAttribute('role', 'link');
      logo.setAttribute('tabindex', '0');
      logo.setAttribute('aria-label', '返回 PandaAI 首页并关闭当前标签页');
      logo.addEventListener('click', returnHome, true);
      logo.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') returnHome(event);
      });
    });
    [...document.querySelectorAll('.nav-right .link span')].filter(node => /规则介绍/.test(node.textContent.trim())).forEach(node => {
      node.setAttribute('role', 'link');
      node.setAttribute('tabindex', '0');
      const openRules = event => {
        event.preventDefault();
        event.stopImmediatePropagation();
        openInlineRules();
      };
      node.addEventListener('click', openRules, true);
      node.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') openRules(event); });
    });
  };

  const mulberry32 = seed => () => {
    let t = seed += 0x6D2B79F5;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };

  /* Extracted directly from the Lanhu source artwork's transparent 1100×602
     line layer.  The nine rows follow the same model/color order as `models`. */
  const lanhuLineYProfilesPreview = [
    [301,291,293,396,360,353,410,399,418,395,430,428,277,308,393,311,319,431,419,548,501,480,489,437,453,461,470,366,339,319,290,322,285,302,327,331,310,283,308,332,336,354,365,427,430,413,438,420,440,442,425,437,407,376,399,390,443,418,437,408],
    [301,272,274,362,330,322,305,295,311,292,321,319,261,286,330,290,295,347,251,286,276,256,253,220,234,234,177,130,108,52,23,55,37,38,58,61,68,61,82,102,105,120,129,147,150,136,157,142,158,160,146,177,164,139,158,149,190,173,148,71],
    [301,388,390,454,432,427,374,367,379,365,386,476,381,401,455,403,408,478,471,580,568,555,556,554,538,540,540,475,459,446,428,448,424,436,451,453,440,423,439,454,456,468,475,514,516,505,521,510,522,523,512,520,501,482,496,490,524,508,520,502],
    [301,348,350,436,406,399,382,372,387,368,397,395,336,362,406,365,371,423,327,362,352,332,329,296,310,310,253,206,184,128,99,131,113,114,134,137,144,137,158,178,181,196,205,223,226,212,233,218,234,236,222,253,240,215,234,225,266,249,224,147],
    [301,268,270,355,326,319,366,358,373,355,384,382,257,282,353,285,292,384,374,480,442,425,432,390,403,399,349,263,240,224,200,227,195,210,230,233,216,194,215,235,238,252,261,314,316,302,323,308,324,326,312,322,303,271,290,283,327,306,322,297],
    [301,318,284,270,315,325,322,348,344,360,335,362,345,252,274,331,283,317,346,339,402,392,368,388,355,466,416,330,307,291,267,294,262,277,297,300,283,261,282,302,304,320,328,381,383,369,390,375,391,393,379,389,364,338,358,350,394,373,389,364],
    [301,318,284,270,315,325,322,348,344,360,335,362,345,252,274,331,283,317,346,339,402,392,368,388,355,354,319,270,206,182,173,159,182,157,169,181,192,210,235,239,240,244,252,292,300,299,296,294,299,306,298,303,299,274,280,273,315,296,304,286],
    [301,338,343,422,394,387,434,425,439,422,451,453,322,349,420,352,358,452,448,497,513,485,499,489,472,477,484,397,375,358,335,361,330,345,365,368,351,328,349,369,372,387,396,448,451,437,458,443,459,461,446,457,431,406,425,417,462,440,456,432],
    [301,309,311,378,355,349,334,327,339,325,348,346,299,320,355,323,328,370,363,428,420,405,403,376,387,388,342,305,287,243,220,245,231,232,248,250,256,250,267,283,285,297,304,318,320,309,326,314,327,328,317,342,332,312,327,320,352,339,318,258]
  ];
  const lanhuLineProfileEncoded = 'LQEmASMBHQEkAVoBiAF/AWgBaQFjAX8BoQF+AZMBfAGmAYABhwGlAa4BtAGuAbMBLAEmATMBTgF8AWwBMgFIAUIBlAGwAaoBpQGfAf0BAgL+AfQB5gHSAd0B7wG5AbUBywG8AcQB0QHWAbcBcwF4AWIBQAFKATgBKwElASQBSgEsASIBLgEzAUABSQFBAVMBUgEkARsBGwEpATkBRgFPAVABUAFcAWIBYwF5AakBrAGuAa8BqQGhAagBtAGkAaQBpgG4AbcBuwG2AakBsAG3AaMBmAGaAXcBfAGPAY8BiAGuAbgByQGhAasBtQGoAZgBLQEaARABCwERAT0BZgFcAUoBSgFFAT0BNgEZASoBGAE6ARsBIQE6AUEBRgFBAUYBDgETAR0BNAFKAT4BHQEuASkBQAFYAToBCgHaAP8AJAEZAQ4BBQH5APYACgHjANYA6ADjAN0A1wCyAK0AhgCLAHkARQA9AC8AIwAKAB4APQAkAAYAJAAqADQAPAA2AEUATQA/AD0APQBIAFcAYQBpAGkAaQBzAHgAeQCEAJIAlACWAJcAkgCLAJAAmgCOAI4AjwCeAJ0AoQCcAJMAowCzAK0ApQCnAIoAjQCeAJ4AlwCzALwAxwCsAKwAkwBsAEcALQFiAYQBgAGFAacBwwG+AbABsAGsAZUBewFkAXEBYwF9AWYBagF9AYIBvgHeAeEBjAGIAZABogG+AbQBkAGeAZoBzgHeAdsB2AHUASUCQgI+AjYCLgIlAiUCMgIdAjQCHwIUAhQCHAIcAgkC3wHiAdQBvwHFAboBsQGuAa0BxQGyAawBtAG3Ab4BxAG/AcsBygGtAacBpwGwAboBwgHIAcgByAHQAdQB1AHiAQECAgIEAgQCAQL8AQACBwL+Af4B/wEKAgkCDAIJAgECBQIJAvwB9gH3AeEB5AHwAfAB7AEDAgoCFAL8AQICCAIAAvYBLQFKAVwBVwFdAYkBsAGoAZYBlGRAYoBgwFlAXYBZAGGAWgBbQGGAY0BkgGNAZIBXAFfAWkBgAGWAYoBaQF6AXUBjAGkAYYBVgEmAUsBcQFlAVoBUQFFAUIBVgEvASIBNAEvASkBIwH+APkA0gDXAMUAkQCJAHsAbwBWAGoAiQBwAFIAcAB2AIAAiACCAJEAmQCLAIkAiQCUAKMArQC1ALUAtQC/AMQAxQDQAN4A4ADiAOMA3gDXANwA5gDaANoA2wDqAOkA7QDoAN8A7wD/APkA8QDzANYA2QDqAOoA4wD/AAgBEwH4APgA3wC4AJMALQEXAQwBBwENATkBXwFYAUYBRgFBAVkBdAFYAWkBVwF5AVoBXwF4AYABhQGAAYUBEQEPARkBMAFWAUgBGQEqASUBagGAAX0BeAFzAcMBxQHCAboBrgGeAacBtgGJAYYBmAGLAZIBegFdAUMBCwEQAf4A4QDpANoAzwDLAMoA6QDQAMgA0gDWAOAA6ADiAPEA7wDJAMIAwgDNANsA5gDuAO4A7gD4APwA/gAQATgBOgE8AT0BNwEyATcBQQE0ATQBNgFEAUQBRwFCATgBPgFDATMBLQErAQ8BEgEiASIBHQE8AUQBUwExATkBQgE4ASkBLQExAT4BNAEdARIBDgEcAToBWAFGAT8BQQE/AVkBSgFTAU4BagFVAUsBXgFqAWYBWwFkAf0ACQEPASYBRQEiARMBGwEcAVIBWwFYAVQBbAGfAZABiAGCAXkBdQGEAWQBXQFsAWYBZgFRASgBDgHyAM4A1wDAAKsAugCoAJ4AoACrAKkAnQChAKUArAC0ALIAtwDFAMwA1gDiAPAA9gDsAPAA8ADwAPgA/AD8AAwBKQErASwBLgEhASYBKAErASYBJgEwATIBMgE3ASkBKwEvAS0BJgEhAQ8BCwEYARgBEAEnATkBOAEmASkBMAEpAR4BLQFBAVIBVAFWAX0BogGbAYoBjAGFAZwBuAGbAawBmAG6AZ4BogG7AcMByAHGAccBVgFSAVwBcwGZAYsBXAFtAWgBrQHEAcIBwQG/Ae0B+wEGAvgB6gHcAeoB9gHuAeEB2wHUAdUB4AHkAcoBkgGWAYQBaAFwAWEBVgFRAVABcAFWAU4BWAFcAWYBbwFoAXcBdgFPAUgBSAFUAWIBbAF0AXQBdAF+AYMBhAGWAb8BwQHDAcMBvwG4Ab0BxwG7AbsBvAHLAcoBzgHJAb8BxAHKAbkBsAGyAZUBmQGpAakBowHDAcsB2QG4AcAByQG+AbABLQExATUBMQE2AVgBdwFxAWMBYwFfAVkBVAE8AUkBOwFWAT4BQgFWAVwBYAFcAV8BNAE3AT8BUwFjAVoBPwFNAUkBWwFuAXABbAFoAZQBsAGoAZ8BmQGPAYwBnAF+AXMBgQF9AXkBdAFXAVMBNAE4ASkBAAH6AO8A5gDSAOEA+gDmAM8A5wDrAPQA+gD0AAABBwH8APoA+gADAQ4BFwEdAR0BHQElASkBKgEyAT0BPwFAAUEBPwE4ATwBRAE6AToBOwFHAUYBSQFHAT4BSgFYAVMBTAFOATcBOgFHAUcBQQFXAV4BaAFSAVIBPgEfAQIB';
  const lanhuLineProfileChunks = [
    'LQEmASMBHQEkAVoBiAF/AWgBaQFjAX8BoQF+AZMBfAGmAYABhwGlAa4BtAGuAbMBLAEmATMBTgF8AWwBMgFIAUIBlAGwAaoBpQGfAf0BAgL+AfQB5gHSAd0B7wG5AbUBywG8AcQB0QHWAbcBcwF4AWIBQAFKATgBKwElASQBSgEsASIBLgEzAUABSQFBAVMBUgEkARsBGwEpATkBRgFPAVABUAFcAWIBYwF5AakBrAGuAa8BqQGhAagBtAGkAaQBpgG4AbcBuwG2AakBsAG3AaMBmAGaAXcBfAGPAY8BiAGuAbgByQGhAasBtQGoAZgB',
    'LQEaARABCwERAT0BZgFcAUoBSgFFAT0BNgEZASoBGAE6ARsBIQE6AUEBRgFBAUYBDgETAR0BNAFKAT4BHQEuASkBQAFYAToBCgHaAP8AJAEZAQ4BBQH5APYACgHjANYA6ADjAN0A1wCyAK0AhgCLAHkARQA9AC8AIwAKAB4APQAkAAYAJAAqADQAPAA2AEUATQA/AD0APQBIAFcAYQBpAGkAaQBzAHgAeQCEAJIAlACWAJcAkgCLAJAAmgCOAI4AjwCeAJ0AoQCcAJMAowCzAK0ApQCnAIoAjQCeAJ4AlwCzALwAxwCsAKwAkwBsAEcA',
    'LQFiAYQBgAGFAacBwwG+AbABsAGsAZUBewFkAXEBYwF9AWYBagF9AYIBvgHeAeEBjAGIAZABogG+AbQBkAGeAZoBzgHeAdsB2AHUASUCQgI+AjYCLgIlAiUCMgIdAjQCHwIUAhQCHAIcAgkC3wHiAdQBvwHFAboBsQGuAa0BxQGyAawBtAG3Ab4BxAG/AcsBygGtAacBpwGwAboBwgHIAcgByAHQAdQB1AHiAQECAgIEAgQCAQL8AQACBwL+Af4B/wEKAgkCDAIJAgECBQIJAvwB9gH3AeEB5AHwAfAB7AEDAgoCFAL8AQICCAIAAvYB',
    'LQFKAVwBVwFdAYkBsAGoAZYBlgGRAYoBgwFlAXYBZAGGAWgBbQGGAY0BkgGNAZIBXAFfAWkBgAGWAYoBaQF6AXUBjAGkAYYBVgEmAUsBcQFlAVoBUQFFAUIBVgEvASIBNAEvASkBIwH+APkA0gDXAMUAkQCJAHsAbwBWAGoAiQBwAFIAcAB2AIAAiACCAJEAmQCLAIkAiQCUAKMArQC1ALUAtQC/AMQAxQDQAN4A4ADiAOMA3gDXANwA5gDaANoA2wDqAOkA7QDoAN8A7wD/APkA8QDzANYA2QDqAOoA4wD/AAgBEwH4APgA3wC4AJMA',
    'LQEXAQwBBwENATkBXwFYAUYBRgFBAVkBdAFYAWkBVwF5AVoBXwF4AYABhQGAAYUBEQEPARkBMAFWAUgBGQEqASUBagGAAX0BeAFzAcMBxQHCAboBrgGeAacBtgGJAYYBmAGLAZIBegFdAUMBCwEQAf4A4QDpANoAzwDLAMoA6QDQAMgA0gDWAOAA6ADiAPEA7wDJAMIAwgDNANsA5gDuAO4A7gD4APwA/gAQATgBOgE8AT0BNwEyATcBQQE0ATQBNgFEAUQBRwFCATgBPgFDATMBLQErAQ8BEgEiASIBHQE8AUQBUwExATkBQgE4ASkB',
    'LQExAT4BNAEdARIBDgEcAToBWAFGAT8BQQE/AVkBSgFTAU4BagFVAUsBXgFqAWYBWwFkAf0ACQEPASYBRQEiARMBGwEcAVIBWwFYAVQBbAGfAZABiAGCAXkBdQGEAWQBXQFsAWYBvAGgAYYBTgFTAUEBJAEsAR0BEgEOAQ0BLAETAQsBFQEZASQBKwElATQBMgEMAQUBBQEQAR4BKQEwATABMAE7AUABQQFUAXsBfQF/AYABewF1AXoBhAF3AXcBeQGHAYcBigGGAXsBgQGGAXYBbQFuAVIBVQFmAWYBYAF/AYcBlgF0AXwBhQF7AWwB',
    'LQExAT4BNAEdARIBDgEcAToBWAFGAT8BQQE/AVkBSgFTAU4BagFVAUsBXgFqAWYBWwFkAf0ACQEPASYBRQEiARMBGwEcAVIBWwFYAVQBbAGfAZABiAGCAXkBdQGEAWQBXQFsAWYBZgFRASgBDgHyAM4A1wDAAKsAugCoAJ4AoACrAKkAnQChAKUArAC0ALIAtwDFAMwA1gDiAPAA9gDsAPAA8ADwAPgA/AD8AAwBKQErASwBLgEhASYBKAErASYBJgEwATIBMgE3ASkBKwEvAS0BJgEhAQ8BCwEYARgBEAEnATkBOAEmASkBMAEpAR4B',
    'LQFBAVIBVAFWAX0BogGbAYoBjAGFAZwBuAGbAawBmAG6AZ4BogG7AcMByAHGAccBVgFSAVwBcwGZAYsBXAFtAWgBrQHEAcIBwQG/Ae0B+wEGAvgB6gHcAeoB9gHuAeEB2wHUAdUB4AHkAcoBkgGWAYQBaAFwAWEBVgFRAVABcAFWAU4BWAFcAWYBbwFoAXcBdgFPAUgBSAFUAWIBbAF0AXQBdAF+AYMBhAGWAb8BwQHDAcMBvwG4Ab0BxwG7AbsBvAHLAcoBzgHJAb8BxAHKAbkBsAGyAZUBmQGpAakBowHDAcsB2QG4AcAByQG+AbAB',
    'LQExATUBMQE2AVgBdwFxAWMBYwFfAVkBVAE8AUkBOwFWAT4BQgFWAVwBYAFcAV8BNAE3AT8BUwFjAVoBPwFNAUkBWwFuAXABbAFoAZQBsAGoAZ8BmQGPAYwBnAF+AXMBgQF9AXkBdAFXAVMBNAE4ASkBAAH6AO8A5gDSAOEA+gDmAM8A5wDrAPQA+gD0AAABBwH8APoA+gADAQ4BFwEdAR0BHQElASkBKgEyAT0BPwFAAUEBPwE4ATwBRAE6AToBOwFHAUYBSQFHAT4BSgFYAVMBTAFOATcBOgFHAUcBQQFXAV4BaAFSAVIBPgEfAQIB'
  ];
  const lanhuExtractedLineYProfiles = lanhuLineProfileChunks.map(encoded => {
    const bytes = Uint8Array.from(atob(encoded), char => char.charCodeAt(0));
    const view = new DataView(bytes.buffer);
    return Array.from({ length:120 }, (_, pointIndex) => view.getInt16(pointIndex * 2, true));
  });
  const lanhuLineYProfiles = [
    lanhuExtractedLineYProfiles[1],
    lanhuExtractedLineYProfiles[3],
    lanhuExtractedLineYProfiles[2],
    lanhuExtractedLineYProfiles[0],
    ...lanhuExtractedLineYProfiles.slice(4)
  ];
  const sourceValueFromY = sourceY => 1000000 - (sourceY - 301) * 160000 / 602;
  const endpointOffsetAt = () => 0;
  const desktopStartConcentrationAt = naturalValue => naturalValue;
  const paths = lanhuLineYProfiles.map(profile => profile.map(sourceValueFromY));
  const shouldRenderCurvePoint = (compact, index, length) => {
    if (!compact || index === 0 || index === length - 1) return true;
    const earlySectionEnd = Math.floor((length - 1) * .4);
    return index >= earlySectionEnd || index % 4 === 0;
  };
  const drawChart = (canvas, focusCanvas, markers, tick, hoveredModel, currency, hiddenModels) => {
    markers.forEach((marker, index) => {
      const hidden = hiddenModels.has(index);
      if (marker && marker.hidden !== hidden) marker.hidden = hidden;
    });
    const box = canvas.getBoundingClientRect();
    const ratio = chartPixelRatio();
    const width = Math.max(320, box.width), height = Math.max(260, box.height);
    const pixelWidth = Math.round(width * ratio), pixelHeight = Math.round(height * ratio);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) { canvas.width = pixelWidth; canvas.height = pixelHeight; }
    const ctx = canvas.getContext('2d');
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.clearRect(0, 0, width, height);
    ctx.setLineDash([]);
    if (focusCanvas.width !== pixelWidth || focusCanvas.height !== pixelHeight) { focusCanvas.width = pixelWidth; focusCanvas.height = pixelHeight; }
    const focusCtx = focusCanvas.getContext('2d');
    focusCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
    focusCtx.clearRect(0, 0, width, height);
    focusCtx.setLineDash([]);
    const compact = width < 600;
    const desktopFan = true;
    const firstVisibleMarker = compact ? markers.find(marker => marker && !marker.hidden) : null;
    const firstVisibleAvatar = firstVisibleMarker?.querySelector('img');
    const mobileAvatarCenterX = firstVisibleMarker
      ? firstVisibleMarker.offsetLeft + (firstVisibleAvatar?.offsetLeft || 0) + (firstVisibleAvatar?.offsetWidth || 28) / 2
      : width - 105;
    const left = compact ? 68 : 94, right = compact ? Math.max(82, width - mobileAvatarCenterX) : 120, gridRight = compact ? 15 : 18, top = compact ? 76 : 62, bottom = compact ? 42 : 42;
    const yLabelLeft = compact ? 16 : 27;
    const yLabelDotX = compact ? 61 : 87;
    const graphW = width - left - right, graphH = height - top - bottom;
    ctx.font = compact ? '12px PuHuiTi_Regular, sans-serif' : '10px fusion-pixel, sans-serif';
    ctx.strokeStyle = 'rgba(0,0,0,.07)'; ctx.fillStyle = '#111'; ctx.lineWidth = 1;
    const yDivisions = compact ? 3 : 6;
    for (let i = 0; i <= yDivisions; i++) {
      const y = top + graphH * i / yDivisions;
      const axisValue = compact ? (30 - i * 10) : (108 - i * 4);
      ctx.beginPath(); ctx.moveTo(left, y); ctx.lineTo(width - gridRight, y); ctx.stroke();
      const axisLabel = currency === '%'
        ? ((axisValue - 100) > 0 ? '+' : '') + (axisValue - 100) + '%'
        : (i === yDivisions ? currency + (compact ? '0' : '0.00') : compact ? currency + axisValue + 'k' : currency + '13,123,00');
      ctx.fillStyle = '#111';
      ctx.textAlign = 'left';
      ctx.fillText(axisLabel, yLabelLeft, y + (compact ? 4 : 3));
      ctx.beginPath(); ctx.arc(yLabelDotX, y, compact ? 1.6 : 1.7, 0, Math.PI * 2); ctx.fill();
    }
    ctx.textAlign = 'left';
    const xDivisions = compact ? 1 : 6;
    for (let i = 0; i <= xDivisions; i++) {
      const x = left + graphW * i / xDivisions;
      ctx.beginPath(); ctx.arc(x, top + graphH + 7, compact ? 1.6 : 1.7, 0, Math.PI * 2); ctx.fillStyle = '#111'; ctx.fill();
      ctx.fillStyle = '#111';
      ctx.font = '10px fusion-pixel, sans-serif';
      if (compact) ctx.fillText('11/20 13:15', x - (i ? 17 : 14), top + graphH + 24);
      else {
        ctx.fillText('2025/11/20', x - 27, top + graphH + 24);
        ctx.fillText('13:15', x + 31, top + graphH + 24);
      }
    }
    const markerPositions = [];
    const modelDrawOrder = models.map((_, index) => index).filter(index => index !== hoveredModel);
    if (hoveredModel !== null) modelDrawOrder.push(hoveredModel);
    modelDrawOrder.forEach(modelIndex => {
      const model = models[modelIndex];
      const marker = markers[modelIndex];
      const isHidden = hiddenModels.has(modelIndex);
      if (isHidden) return;
      ctx.beginPath();
      const liveOffset = Math.sin(tick / 1450 + modelIndex * 1.7) * 520;
      const floatY = Math.sin(tick / 720 + modelIndex * 1.13) * (compact ? 5.5 : 3.5);
      let lastY = 0;
      paths[modelIndex].forEach((rawValue, i) => {
        const naturalValue = rawValue + endpointOffsetAt(modelIndex, i);
        const value = desktopStartConcentrationAt(naturalValue, modelIndex, i, desktopFan);
        const x = left + graphW * i / (paths[modelIndex].length - 1);
        const endBlend = Math.pow(i / (paths[modelIndex].length - 1), 8);
        const y = top + graphH * (1080000 - value) / 160000 + floatY * endBlend;
        lastY = y;
        if (i === 0) ctx.moveTo(x, y);
        else if (shouldRenderCurvePoint(compact, i, paths[modelIndex].length)) ctx.lineTo(x, y);
      });
      const focused = hoveredModel === modelIndex;
      const hasFocus = hoveredModel !== null;
      ctx.strokeStyle = model.color;
      ctx.lineWidth = compact ? (focused ? 1.6 : 1.1) : (focused ? 2.35 : 1.25);
      ctx.globalAlpha = hasFocus ? (focused ? 1 : .11) : .82;
      ctx.lineJoin = 'miter';
      ctx.lineCap = 'round';
      ctx.setLineDash(compact ? [1, 2] : []);
      ctx.stroke();
      if (marker) {
        const avatar = marker.querySelector('img');
        const avatarCenterOffset = (avatar?.offsetTop || 0) + (avatar?.offsetHeight || 32) / 2;
        const price = currency === '%'
          ? ((((model.value + liveOffset) / 1000000 - 1) * 100) >= 0 ? '+' : '') + (((model.value + liveOffset) / 1000000 - 1) * 100).toFixed(2) + '%'
          : Math.round(model.value + liveOffset).toLocaleString('zh-CN');
        markerPositions.push({ marker, avatar, modelIndex, endY: lastY, price, focused, hasFocus, top: Math.max(top - 5, Math.min(top + graphH - 30, lastY - avatarCenterOffset)) });
      }
    });
    const minMarkerTop = top - 5;
    const maxMarkerTop = top + graphH - 30;
    markerPositions.forEach(item => {
      item.top = Math.max(minMarkerTop, Math.min(maxMarkerTop, item.top));
      const { marker } = item;
      marker.style.top = item.top + 'px';
      marker.style.left = (left + graphW - 18) + 'px';
      const currencyNode = marker.querySelector('.price span');
      const currencyText = currency === '%' ? '' : currency;
      if (currencyNode.textContent !== currencyText) currencyNode.textContent = currencyText;
      const priceNode = marker.querySelector('.price strong');
      if (priceNode.textContent !== item.price) priceNode.textContent = item.price;
      marker.classList.toggle('is-hover-focus', item.focused);
      marker.classList.toggle('is-hover-muted', item.hasFocus && !item.focused);
    });
    markerPositions.forEach(item => {
      const { avatar, marker } = item;
      item.anchorX = marker.offsetLeft + (avatar?.offsetLeft || 0) + (avatar?.offsetWidth || 32) / 2;
      item.anchorY = item.top + (avatar?.offsetTop || 0) + (avatar?.offsetHeight || 32) / 2;
    });
    markerPositions.forEach(item => {
      const avatarAnchorX = item.anchorX;
      const avatarCenterY = item.anchorY;
      item.marker.dataset.curveEndX = (left + graphW).toFixed(2);
      item.marker.dataset.curveEndY = item.endY.toFixed(2);
      item.marker.dataset.lineAnchorX = avatarAnchorX.toFixed(2);
      item.marker.dataset.lineAnchorY = avatarCenterY.toFixed(2);
      const focused = hoveredModel === item.modelIndex;
      const hasFocus = hoveredModel !== null;
      ctx.beginPath();
      ctx.moveTo(left + graphW, item.endY);
      ctx.lineTo(avatarAnchorX, avatarCenterY);
      ctx.strokeStyle = models[item.modelIndex].color;
      ctx.lineWidth = compact ? (focused ? 1.6 : 1.1) : (focused ? 2.35 : 1.25);
      ctx.globalAlpha = hasFocus ? (focused ? 1 : .11) : .82;
      ctx.setLineDash(compact ? [1, 2] : []);
      ctx.stroke();
    });
    if (hoveredModel !== null && !hiddenModels.has(hoveredModel)) {
      const model = models[hoveredModel];
      const floatY = Math.sin(tick / 720 + hoveredModel * 1.13) * (compact ? 5.5 : 3.5);
      let lastY = 0;
      focusCtx.beginPath();
      paths[hoveredModel].forEach((rawValue, i) => {
        const naturalValue = rawValue + endpointOffsetAt(hoveredModel, i);
        const value = desktopStartConcentrationAt(naturalValue, hoveredModel, i, desktopFan);
        const x = left + graphW * i / (paths[hoveredModel].length - 1);
        const endBlend = Math.pow(i / (paths[hoveredModel].length - 1), 8);
        const y = top + graphH * (1080000 - value) / 160000 + floatY * endBlend;
        lastY = y;
        if (i === 0) focusCtx.moveTo(x, y);
        else if (shouldRenderCurvePoint(compact, i, paths[hoveredModel].length)) focusCtx.lineTo(x, y);
      });
      focusCtx.strokeStyle = model.color;
      focusCtx.lineWidth = compact ? 1.8 : 2.8;
      focusCtx.lineJoin = 'miter';
      focusCtx.lineCap = 'round';
      focusCtx.setLineDash(compact ? [1, 2] : []);
      focusCtx.stroke();
      const focusedMarker = markerPositions.find(item => item.modelIndex === hoveredModel);
      if (focusedMarker) {
        focusCtx.beginPath();
        focusCtx.moveTo(left + graphW, lastY);
        focusCtx.lineTo(focusedMarker.anchorX, focusedMarker.anchorY);
        focusCtx.strokeStyle = model.color;
        focusCtx.lineWidth = compact ? 1.8 : 2.8;
        focusCtx.setLineDash(compact ? [1, 2] : []);
        focusCtx.stroke();
      }
    }
    ctx.globalAlpha = 1;
  };

  const installChart = () => {
    const chart = document.querySelector('.left-section > .chart-container > .chart');
    if (!chart || chart.querySelector('.arena-chart-fallback')) return;
    chart.style.position = 'relative';
    const fallback = document.createElement('div'); fallback.className = 'arena-chart-fallback';
    const canvas = document.createElement('canvas'); canvas.setAttribute('aria-label', '大模型账户权益实时走势'); fallback.appendChild(canvas);
    const focusCanvas = document.createElement('canvas'); focusCanvas.className = 'arena-chart-focus-layer'; focusCanvas.setAttribute('aria-hidden', 'true'); fallback.appendChild(focusCanvas);
    const title = document.createElement('div'); title.className = 'arena-chart-title'; title.textContent = '全部账户权益'; fallback.appendChild(title);
    const tools = document.createElement('div'); tools.className = 'arena-chart-tools'; tools.innerHTML = '<button type="button" class="arena-currency is-active" aria-label="按金额查看" aria-pressed="true">¥</button><button type="button" class="arena-currency" aria-label="按收益率查看" aria-pressed="false">%</button>'; fallback.appendChild(tools);
    const ranges = document.createElement('div'); ranges.className = 'arena-chart-ranges'; ranges.innerHTML = '<button type="button" class="is-active">ALL</button><button type="button">72h</button>'; fallback.appendChild(ranges);
    const fullscreenToggle = document.createElement('button');
    fullscreenToggle.type = 'button'; fullscreenToggle.className = 'arena-fullscreen-toggle'; fullscreenToggle.setAttribute('aria-label', '全屏查看图表');
    fullscreenToggle.innerHTML = '<img src="/projects/llm/site/competition/llm/assets/fullscreen-pixel-v2.png" alt="">'; fallback.appendChild(fullscreenToggle);
    const comments = ['GPT-5.1 突破日内高点', 'Claude 的回撤控制很稳', 'Gemini 正在加仓科技板块', 'DeepSeek 刚刚反手做多', 'PandaAI TQ-1 追上来了', '这轮波动率突然放大', 'Grok 4 的仓位很激进', 'Qwen 的组合分散度不错', '松鼠 Quant 的风控开始收紧', 'Doubao 正在减持高波动仓位', 'GPT-5.1 连续三笔交易获利', 'Claude 捕捉到了趋势反转', 'Gemini 的多头仓位开始兑现', 'DeepSeek 当前回撤全场最低', '成交量突然放大，注意节奏', '模型之间的权益差距缩小了', 'PandaAI TQ-1 调整了止损位置', 'Grok 4 正在扩大趋势仓位', 'Qwen 的回撤修复速度很快', '松鼠 Quant 刚刚完成调仓', '科技板块动量仍然强劲', 'GPT-5.1 的胜率继续领先', 'Claude 本轮交易已经止盈', 'DeepSeek 的组合波动最低', 'NVDA 再次刷新分时高点', 'Claude 正在降低组合相关性', 'Gemini 捕捉到新的动量信号', 'DeepSeek 的现金仓位很充足', 'PandaAI TQ-1 切换到防守模式', 'Grok 4 刚刚完成一轮加仓', 'Qwen 的行业配置更均衡了', '松鼠 Quant 正在锁定利润', 'Doubao 的回撤开始修复', 'GPT-5.1 继续领跑收益榜', 'Claude 的止盈执行很果断', 'Gemini 正在观察成交量变化', 'DeepSeek 持仓波动保持稳定', '多模型收益曲线再次交汇', '市场情绪正在快速回暖', 'PandaAI TQ-1 出现新的买点', 'Grok 4 的趋势判断很坚决', 'Qwen 刚刚降低了杠杆水平', '松鼠 Quant 的仓位更加分散', 'Doubao 正在等待二次确认', 'GPT-5.1 的风险收益比领先', 'Claude 本轮调仓已经完成', 'Gemini 的科技仓位继续盈利', 'DeepSeek 再次守住回撤区间'];
    const danmaku = document.createElement('div'); danmaku.className = 'arena-danmaku chart-bullet-playback'; danmaku.setAttribute('data-v-767925a2', '');
    const danmakuRandom = mulberry32(20260816);
    const initiallyLiked = new Set();
    let laneTops = [];
    let laneDurations = [];
    let lanePhases = [];
    let itemsPerLane = 4;
    let mobileTrackMode = false;
    let bulletLayoutSignature = '';
    const setBulletLanePaused = (item, paused) => {
      const lane = item.dataset.lane;
      if (lane == null) return;
      const mobileRow = item.closest('.bullet-row.is-mobile-track');
      if (mobileRow) {
        mobileRow.style.animationPlayState = paused ? 'paused' : '';
        return;
      }
      danmaku.querySelectorAll('.bullet-item[data-lane="' + lane + '"]').forEach(laneItem => {
        laneItem.style.animationPlayState = paused ? 'paused' : '';
      });
    };
    const toggleBulletLike = item => {
      const likes = item.querySelector('.bullet-likes');
      if (!likes) return;
      const liked = !item.classList.contains('is-liked');
      const baseLikes = Number(likes.dataset.baseLikes || 0);
      item.classList.toggle('is-liked', liked);
      item.setAttribute('aria-pressed', String(liked));
      item.setAttribute('aria-label', item.querySelector('.bullet-text').textContent + (liked ? '，已点赞' : '，点赞'));
      likes.textContent = (liked ? '♥ ' : '♡ ') + (baseLikes + (liked ? 1 : 0));
    };
    const alignMobileLikedPhases = () => requestAnimationFrame(() => {
      const likedRows = [...danmaku.querySelectorAll('.bullet-row.is-mobile-track')].filter(row => row.querySelector('.bullet-item.is-liked'));
      if (likedRows.length < 2) return;
      const likedDuration = 30;
      likedRows.forEach((row, likedIndex) => {
        const firstSet = row.querySelector('.mobile-track-set');
        const likedItem = firstSet?.querySelector('.bullet-item.is-liked');
        if (!firstSet || !likedItem) return;
        const loopGap = parseFloat(getComputedStyle(row).columnGap || getComputedStyle(row).gap) || 0;
        const loopDistance = firstSet.offsetWidth + loopGap;
        if (!loopDistance) return;
        const likedCoordinate = likedItem.offsetLeft / loopDistance;
        const targetCoordinate = .1 + likedIndex * .5;
        const progress = ((likedCoordinate - targetCoordinate) % 1 + 1) % 1;
        row.style.setProperty('--duration', likedDuration + 's');
        row.style.setProperty('--delay', (-progress * likedDuration) + 's');
      });
    });
    const appendBullet = spec => {
      const { comment, index, top, phase, opacity, duration, sequence } = spec;
      const row = spec.row || tagged('div', 'bullet-row', 'data-v-767925a2');
      if (!spec.row) {
        row.style.top = top + '%';
        row.dataset.lane = String(spec.lane);
        row.dataset.sequence = String(sequence);
      }
      const item = tagged('div', 'bullet-item', 'data-v-767925a2');
      item.dataset.bulletIndex = String(index);
      item.dataset.lane = String(spec.lane);
      item.dataset.sequence = String(sequence);
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.style.setProperty('--duration', duration + 's');
      let sequenceProgress = sequence / itemsPerLane;
      if (!mobileTrackMode) {
        const travelDistance = window.innerWidth + 360;
        const minimumGapProgress = Math.min(1 / itemsPerLane, 235 / travelDistance);
        const flexibleGapProgress = Math.max(0, 1 - minimumGapProgress * itemsPerLane);
        const horizontalGapWeights = Array.from({ length: itemsPerLane }, (_, gap) => {
          const hash = Math.sin((spec.lane + 1) * 19.193 + (gap + 1) * 41.731) * 43758.5453;
          const fraction = hash - Math.floor(hash);
          return .12 + fraction * fraction * 2.8;
        });
        const horizontalGapWeightTotal = horizontalGapWeights.reduce((sum, weight) => sum + weight, 0);
        sequenceProgress = horizontalGapWeights.slice(0, sequence).reduce(
          (progress, weight) => progress + minimumGapProgress + flexibleGapProgress * weight / horizontalGapWeightTotal,
          0
        );
      }
      item.style.setProperty('--delay', (-(sequenceProgress * duration) - phase) + 's');
      item.style.opacity = '1';
      const text = tagged('span', 'bullet-text', 'data-v-767925a2'); text.textContent = comment;
      const baseLikes = 12 + index * 7;
      const liked = initiallyLiked.has(index);
      item.classList.toggle('is-liked', liked);
      item.setAttribute('aria-pressed', String(liked));
      item.setAttribute('aria-label', comment + (liked ? '，已点赞' : '，点赞'));
      const likes = tagged('span', 'bullet-likes', 'data-v-767925a2');
      likes.dataset.baseLikes = String(baseLikes);
      likes.textContent = (liked ? '♥ ' : '♡ ') + (baseLikes + (liked ? 1 : 0));
      item.append(text, likes); row.appendChild(item);
      if (!spec.row) danmaku.appendChild(row);
      item.addEventListener('pointerdown', event => {
        if (event.button !== 0) return;
        event.preventDefault();
        setBulletLanePaused(item, true);
        item.setPointerCapture?.(event.pointerId);
        toggleBulletLike(item);
      });
      const resumeBulletLane = event => {
        setBulletLanePaused(item, false);
        if (event?.pointerId != null && item.hasPointerCapture?.(event.pointerId)) item.releasePointerCapture(event.pointerId);
      };
      item.addEventListener('pointerup', resumeBulletLane);
      item.addEventListener('pointercancel', resumeBulletLane);
      item.addEventListener('lostpointercapture', () => setBulletLanePaused(item, false));
      item.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        toggleBulletLike(item);
      });
    };
    const renderBulletDensity = () => {
      const bounds = chart.getBoundingClientRect();
      const chartWidth = Math.max(320, bounds.width || window.innerWidth);
      const chartHeight = Math.max(320, bounds.height || window.innerHeight * .62);
      const isMobile = chartWidth <= 820;
      const bulletHeight = 34;
      const mobileDanmakuHeight = Math.max(bulletHeight, chartHeight - 120);
      const desktopDanmakuHeight = Math.max(bulletHeight, chartHeight - 172);
      const availableHeight = Math.max(212, chartHeight - 108);
      const safeLaneCount = isMobile
        ? Math.max(1, Math.floor((mobileDanmakuHeight - bulletHeight) / 52) + 1)
        : Math.max(5, Math.floor((desktopDanmakuHeight - bulletHeight - 20) / 54) + 1);
      const laneCount = isMobile ? Math.min(6, safeLaneCount) : Math.min(16, safeLaneCount);
      const nextItemsPerLane = isMobile
        ? 6
        : Math.max(4, Math.round((window.innerWidth + 360) / 250));
      const signature = (isMobile ? 'mobile:' : 'desktop:') + laneCount + 'x' + nextItemsPerLane + ':' + Math.round(chartWidth / 24);
      if (signature === bulletLayoutSignature && danmaku.children.length) return;
      bulletLayoutSignature = signature;
      itemsPerLane = nextItemsPerLane;
      mobileTrackMode = isMobile;
      const mobileLanePattern = [.025, .19, .37, .55, .73, .9];
      const mobileInnerGaps = [18, 30, 22, 34, 20, 28, 16, 26];
      const mobileLoopGaps = [32, 18, 28, 20, 34, 22, 30, 24];
      const desktopGapCount = Math.max(1, laneCount - 1);
      const desktopGapWeights = Array.from({ length: desktopGapCount }, (_, lane) => {
        const hash = Math.sin((lane + 1) * 12.9898 + laneCount * 78.233) * 43758.5453;
        const fraction = hash - Math.floor(hash);
        return .82 + fraction * .36;
      });
      const desktopGapWeightTotal = desktopGapWeights.reduce((sum, weight) => sum + weight, 0);
      const desktopEdgeClearance = 12;
      const desktopTrackSpan = Math.max(0, desktopDanmakuHeight - bulletHeight - desktopEdgeClearance * 2);
      const desktopLanePixels = [desktopEdgeClearance];
      desktopGapWeights.forEach(weight => desktopLanePixels.push(
        desktopLanePixels[desktopLanePixels.length - 1] + desktopTrackSpan * weight / desktopGapWeightTotal
      ));
      laneTops = isMobile
        ? mobileLanePattern.slice(0, laneCount).map(position => position * (mobileDanmakuHeight - bulletHeight) / mobileDanmakuHeight * 100)
        : desktopLanePixels.map(position => position / desktopDanmakuHeight * 100);
      laneDurations = laneTops.map((_, lane) => isMobile
        ? (9 + (lane % 4) * .4) * (itemsPerLane / 2)
        : 20 + ((lane * 7) % laneCount) * .78);
      lanePhases = laneTops.map((_, lane) => danmakuRandom() * laneDurations[lane]);
      initiallyLiked.clear();
      danmaku.replaceChildren();
      for (let lane = 0; lane < laneCount; lane++) {
        const mobileRow = isMobile ? tagged('div', 'bullet-row is-mobile-track', 'data-v-767925a2') : null;
        const mobileSets = isMobile
          ? [tagged('div', 'mobile-track-set', 'data-v-767925a2'), tagged('div', 'mobile-track-set', 'data-v-767925a2')]
          : [];
        if (mobileRow) {
          mobileRow.style.top = laneTops[lane] + '%';
          mobileRow.dataset.lane = String(lane);
          mobileRow.style.setProperty('--duration', laneDurations[lane] + 's');
          mobileRow.style.setProperty('--delay', (-lanePhases[lane]) + 's');
          mobileRow.style.setProperty('--mobile-inner-gap', mobileInnerGaps[lane] + 'px');
          mobileRow.style.setProperty('--mobile-loop-gap', mobileLoopGaps[lane] + 'px');
          mobileRow.style.setProperty('--mobile-loop-half-gap', (mobileLoopGaps[lane] / 2) + 'px');
          mobileRow.append(...mobileSets);
          danmaku.appendChild(mobileRow);
        }
        for (let sequence = 0; sequence < itemsPerLane; sequence++) {
          const index = lane * itemsPerLane + sequence;
          const comment = comments[(lane * 7 + sequence * 13) % comments.length];
          const targetSets = isMobile ? mobileSets : [null];
          targetSets.forEach(row => appendBullet({
            comment, index, lane, sequence, row,
            top: laneTops[lane], phase: lanePhases[lane], opacity: 1, duration: laneDurations[lane]
          }));
        }
      }
      if (isMobile) alignMobileLikedPhases();
    };
    renderBulletDensity();
    fallback.appendChild(danmaku);
    const composer = document.createElement('form');
    composer.className = 'arena-chart-composer';
    composer.innerHTML = '<button class="arena-bullet-toggle" type="button" aria-label="隐藏弹幕" aria-pressed="true"><img src="/projects/llm/site/competition/llm/assets/bullet-enabled.png" alt=""></button><div class="arena-input-wrapper"><input aria-label="发送弹幕" maxlength="24" placeholder="发个友善的弹幕"><button type="submit">发送</button></div><button class="arena-bullet-menu" type="button" aria-label="查看弹幕列表" aria-expanded="false"><img src="/projects/llm/site/competition/llm/assets/bullet-menu.png" alt=""></button>';
    fallback.appendChild(composer);
    const bulletPanel = document.createElement('aside');
    bulletPanel.className = 'arena-bullet-panel';
    bulletPanel.hidden = true;
    bulletPanel.innerHTML = '<header><strong>实时弹幕</strong><span>' + comments.length + ' 条</span></header><div>' + comments.slice(-6).reverse().map((comment, index) => '<p><span>' + comment + '</span><small>♡ ' + (68 + index * 7) + '</small></p>').join('') + '</div>';
    fallback.appendChild(bulletPanel);
    const legend = document.createElement('div'); legend.className = 'arena-legend'; legend.setAttribute('aria-label', '模型曲线图例'); legend.innerHTML = models.map((model, index) => '<button type="button" data-model-index="' + index + '" aria-pressed="true" style="--line:' + model.color + '">' + model.name + '</button>').join(''); fallback.appendChild(legend);
    const markers = models.map(model => {
      const marker = document.createElement('div');
      marker.className = 'model-icon arena-model-marker'; marker.title = model.name;
      const markerTextColor = model.color;
      marker.innerHTML = '<img src="' + model.logo + '" alt="' + model.name + '"><span class="glow" style="--model-color:' + model.color + '"></span><span class="price" style="color:' + markerTextColor + '"><span>¥</span><strong>' + model.value.toLocaleString('zh-CN') + '</strong></span>';
      fallback.appendChild(marker); return marker;
    });
    chart.appendChild(fallback);
    if ('ResizeObserver' in window) {
      const bulletDensityObserver = new ResizeObserver(renderBulletDensity);
      bulletDensityObserver.observe(chart);
    } else {
      window.addEventListener('resize', renderBulletDensity);
    }
    let bulletResizeTimer = 0;
    window.addEventListener('resize', () => {
      clearTimeout(bulletResizeTimer);
      bulletResizeTimer = window.setTimeout(() => {
        bulletLayoutSignature = '';
        renderBulletDensity();
      }, 140);
    });
    let selectedCurrency = '¥';
    tools.querySelectorAll('.arena-currency').forEach(button => button.addEventListener('click', () => {
      tools.querySelectorAll('.arena-currency').forEach(node => {
        const selected = node === button;
        node.classList.toggle('is-active', selected);
        node.setAttribute('aria-pressed', String(selected));
      });
      selectedCurrency = button.textContent.trim();
      title.textContent = selectedCurrency === '%' ? '全部账户收益率' : '全部账户权益';
    }));
    fullscreenToggle.addEventListener('click', () => {
      const expanded = chart.classList.toggle('arena-chart-expanded');
      fullscreenToggle.setAttribute('aria-label', expanded ? '退出全屏' : '全屏查看图表');
      const icon = fullscreenToggle.querySelector('img');
      if (icon) icon.src = expanded
        ? '/projects/llm/site/competition/llm/assets/fullscreen-exit-pixel-v2.png'
        : '/projects/llm/site/competition/llm/assets/fullscreen-pixel-v2.png';
      setTimeout(() => window.dispatchEvent(new Event('resize')), 30);
    });
    ranges.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
      ranges.querySelectorAll('button').forEach(node => node.classList.toggle('is-active', node === button));
    }));
    composer.addEventListener('submit', event => {
      event.preventDefault();
      const input = composer.querySelector('input');
      const comment = input.value.trim();
      if (!comment) return;
      const index = danmaku.children.length;
      const lane = index % laneTops.length;
      const sequence = Math.floor(index / laneTops.length) % itemsPerLane;
      danmaku.querySelectorAll('.bullet-item[data-lane="' + lane + '"][data-sequence="' + sequence + '"]').forEach(item => item.remove());
      const mobileRow = mobileTrackMode ? danmaku.querySelector('.bullet-row[data-lane="' + lane + '"]') : null;
      const targetSets = mobileRow ? [...mobileRow.querySelectorAll('.mobile-track-set')] : [null];
      targetSets.forEach(row => appendBullet({ comment, index, lane, sequence, row, top: laneTops[lane], phase: lanePhases[lane], opacity: .96, duration: laneDurations[lane] }));
      const panelBody = bulletPanel.querySelector(':scope > div');
      if (panelBody) {
        const row = document.createElement('p');
        row.innerHTML = '<span>' + comment.replace(/[<>&]/g, character => ({'<':'&lt;','>':'&gt;','&':'&amp;'}[character])) + '</span><small>♡ 0</small>';
        panelBody.prepend(row);
        while (panelBody.children.length > 6) panelBody.lastElementChild.remove();
      }
      const panelCount = bulletPanel.querySelector('header span');
      if (panelCount) panelCount.textContent = (index + 1) + ' 条';
      input.value = '';
    });
    const bulletToggle = composer.querySelector('.arena-bullet-toggle');
    bulletToggle.addEventListener('click', () => {
      const visible = danmaku.hidden;
      danmaku.hidden = !visible;
      bulletToggle.setAttribute('aria-pressed', String(visible));
      bulletToggle.setAttribute('aria-label', visible ? '隐藏弹幕' : '显示弹幕');
      bulletToggle.querySelector('img').src = visible ? '/projects/llm/site/competition/llm/assets/bullet-enabled.png' : '/projects/llm/site/competition/llm/assets/bullet-toggle.png';
    });
    const bulletMenu = composer.querySelector('.arena-bullet-menu');
    bulletMenu.addEventListener('click', () => {
      bulletPanel.hidden = !bulletPanel.hidden;
      bulletMenu.setAttribute('aria-expanded', String(!bulletPanel.hidden));
    });
    let lastFrame = 0;
    let hoveredModel = null;
    const hiddenModels = new Set();
    markers.forEach((marker, index) => {
      marker.addEventListener('pointerenter', () => { hoveredModel = index; });
      marker.addEventListener('pointerleave', () => { hoveredModel = null; });
    });
    legend.querySelectorAll('button').forEach((button, index) => {
      button.addEventListener('pointerenter', () => { if (!hiddenModels.has(index)) hoveredModel = index; });
      button.addEventListener('pointerleave', () => { hoveredModel = null; });
      button.addEventListener('focus', () => { if (!hiddenModels.has(index)) hoveredModel = index; });
      button.addEventListener('blur', () => { hoveredModel = null; });
      button.addEventListener('click', () => {
        if (hiddenModels.has(index)) hiddenModels.delete(index); else hiddenModels.add(index);
        const active = !hiddenModels.has(index);
        button.classList.toggle('is-disabled', !active);
        button.setAttribute('aria-pressed', String(active));
        if (!active && hoveredModel === index) hoveredModel = null;
      });
    });
    canvas.addEventListener('pointermove', event => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width, height = rect.height;
      const compact = width < 600;
      const desktopFan = true;
      const left = compact ? 64 : 70, right = compact ? 96 : 120, top = compact ? 76 : 62, bottom = 42;
      const graphW = width - left - right, graphH = height - top - bottom;
      const x = event.clientX - rect.left, y = event.clientY - rect.top;
      if (x < left || x > left + graphW || y < top || y > top + graphH) { hoveredModel = null; return; }
      const pointIndex = Math.max(0, Math.min(paths[0].length - 1, Math.round((x - left) / graphW * (paths[0].length - 1))));
      let nearest = null, nearestDistance = 18;
      paths.forEach((path, index) => {
        const naturalValue = path[pointIndex] + endpointOffsetAt(index, pointIndex);
        const value = desktopStartConcentrationAt(naturalValue, index, pointIndex, desktopFan);
        const lineY = top + graphH * (1080000 - value) / 160000;
        const distance = Math.abs(lineY - y);
        if (distance < nearestDistance) { nearest = index; nearestDistance = distance; }
      });
      hoveredModel = nearest;
      canvas.style.cursor = 'crosshair';
    });
    canvas.addEventListener('pointerleave', () => { hoveredModel = null; canvas.style.cursor = 'default'; });
    const redrawChart = time => {
      drawChart(canvas, focusCanvas, markers, time, hoveredModel, selectedCurrency, hiddenModels);
      lastFrame = time;
    };
    fallback.addEventListener('arena:redraw', () => redrawChart(performance.now()));
    redrawChart(performance.now());
    let frameId = 0;
    let onScreen = !portfolioPreview;
    let layerVisible = true;
    const frameElement = portfolioPreview ? window.frameElement : null;
    const layer = frameElement?.closest('.match-frame-layer');
    const scheduleChart = () => {
      if (!frameId && onScreen && layerVisible && !document.hidden) frameId = requestAnimationFrame(frame);
    };
    const frame = time => {
      frameId = 0;
      if (!onScreen || !layerVisible || document.hidden) return;
      const paused = livePreviewOnly && document.documentElement.dataset.portfolioPreviewPaused === 'true';
      if (!paused && (!portfolioPreview || time - lastFrame >= 1000 / 30)) {
        const bounds = canvas.getBoundingClientRect();
        if (bounds.width > 0 && bounds.height > 0) redrawChart(time);
      }
      scheduleChart();
    };
    if (portfolioPreview) {
      new IntersectionObserver(([entry]) => {
        onScreen = entry.isIntersecting;
        scheduleChart();
      }).observe(canvas);
      if (layer) {
        const syncLayer = () => {
          layerVisible = !layer.matches('.is-hidden,.is-preparing');
          scheduleChart();
        };
        new MutationObserver(syncLayer).observe(layer, { attributes:true, attributeFilter:['class'] });
        syncLayer();
      }
    }
    document.addEventListener('visibilitychange', scheduleChart);
    scheduleChart();
  };

  const leaderboardRows = [
    [0, 1038742, 3.87, 38742, 62.50, 6128, -1840, 1.86, 28],
    [1, 1029607, 2.96, 29607, 59.09, 5120, -2048, 1.61, 22],
    [2, 1017512, 1.75, 17512, 58.33, 4962, -2136, 1.54, 24],
    [3, 1008571, 0.86, 8571, 56.00, 3740, -1986, 1.21, 25],
    [4, 998055, -0.19, -1945, 52.63, 2918, -2470, 0.84, 19],
    [5, 989726, -1.03, -10274, 50.00, 2641, -3128, 0.42, 22],
    [6, 980717, -1.93, -19283, 47.62, 2280, -3486, -0.18, 21],
    [7, 972851, -2.71, -27149, 42.86, 1740, -4872, -0.63, 21],
    [8, 964847, -3.52, -35153, 40.00, 1528, -5384, -0.91, 20]
  ];

  const openModelPage = modelName => {
    const modelTab = document.querySelector('.llm-navbar > .menu .menu-item:nth-child(3)') || document.querySelector('.llm-wrapper > .menu .menu-item:nth-child(3)');
    modelTab?.click();
    requestAnimationFrame(() => {
      const detail = document.querySelector('.arena-model-detail');
      if (!detail || !modelName) return;
      const option = [...detail.querySelectorAll('.model-picker-option')].find(item => item.dataset.modelName === modelName);
      if (option) option.click();
      else {
        detail.querySelector('.model-picker-value').textContent = modelName;
        detail.querySelector('.model-contestant strong').textContent = '参赛者：' + modelName;
      }
      document.querySelector('.llm-wrapper')?.scrollTo({ top:0, left:0, behavior:'auto' });
      window.scrollTo({ top:0, behavior:'auto' });
    });
  };

  const rankingCleanup = new WeakMap();
  const replaceRankingContent = (host, content) => {
    rankingCleanup.get(host.firstElementChild)?.();
    host.replaceChildren(content);
  };
  const renderRankingView = view => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', '1');
    if (view) url.searchParams.set('view', view);
    else url.searchParams.delete('view');
    history.replaceState(null, '', url);
    if (view === 'ladder') installLeaderboard(true);
    else if (view === 'tournament') installTournament(true);
    else if (view === 'analysis') installAnalysis(true);
    else installRankingHub(true);
  };

  const installRankingHub = (force = false) => {
    const host = document.querySelector('.llm-leaderboard');
    if (!host || (!force && host.querySelector('.arena-ranking-hub'))) return;
    host.classList.add('is-ranking-hub');
    host.classList.remove('is-ranking-detail');
    const hub = document.createElement('main');
    hub.className = 'arena-ranking-hub';
    hub.innerHTML = '<section class="ranking-hub-cards" aria-label="排行榜类型"><button class="ranking-hub-card is-selected" type="button" data-ranking-view="tournament"><picture class="ranking-card-art"><source media="(max-width:820px)" srcset="/projects/llm/site/competition/llm/assets/ranking-tournament-mobile.png"><img src="/projects/llm/site/competition/llm/assets/ranking-tournament.png" alt="锦标赛像素插画"></picture><span class="ranking-card-copy"><strong>锦标赛</strong><small>周期性举办的AI对抗赛</small></span></button><button class="ranking-hub-card" type="button" data-ranking-view="ladder"><picture class="ranking-card-art"><img src="/projects/llm/site/competition/llm/assets/ranking-ladder.png" alt="天梯赛像素插画"></picture><span class="ranking-card-copy"><strong>天梯赛</strong><small>实时更新的长期排名体系</small></span></button><button class="ranking-hub-card" type="button" data-ranking-view="analysis"><picture class="ranking-card-art"><img src="/projects/llm/site/competition/llm/assets/ranking-analysis.png" alt="分析像素插画"></picture><span class="ranking-card-copy"><strong>分析</strong><small>多维度复盘选手表现</small></span></button></section><section class="ranking-hub-document"><span><strong>欢迎来到AI大赛排行榜(*^▽^*)</strong><small>每一次的决策都会被市场检验</small></span><button type="button">查看文档</button></section></main>';
    const cards = [...hub.querySelectorAll('.ranking-hub-card')];
    const selectCard = selectedCard => cards.forEach(card => card.classList.toggle('is-selected', card === selectedCard));
    cards.forEach(card => {
      card.addEventListener('pointerenter', () => selectCard(card));
      card.addEventListener('focus', () => selectCard(card));
      card.addEventListener('click', () => renderRankingView(card.dataset.rankingView));
    });
    hub.querySelector('.ranking-hub-document button')?.addEventListener('click', event => {
      event.preventDefault();
      openInlineRules();
    });
    replaceRankingContent(host, hub);
  };

  const returnToRankingHub = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('page', '1');
    url.searchParams.delete('view');
    history.replaceState(null, '', url);
    installRankingHub(true);
  };

  const installHorizontalDrag = scroller => {
    if (!scroller || scroller.dataset.dragReady === 'true') return;
    scroller.dataset.dragReady = 'true';
    let pointer = null, startX = 0, startScroll = 0;
    scroller.addEventListener('pointerdown', event => {
      if (event.target.closest('button, a, input, select, textarea')) return;
      if (scroller.scrollWidth <= scroller.clientWidth) return;
      pointer = event.pointerId; startX = event.clientX; startScroll = scroller.scrollLeft;
      scroller.setPointerCapture?.(event.pointerId); scroller.classList.add('is-dragging');
    });
    scroller.addEventListener('pointermove', event => {
      if (pointer !== event.pointerId) return;
      scroller.scrollLeft = startScroll - (event.clientX - startX); event.preventDefault();
    });
    const finish = event => {
      if (pointer !== event.pointerId) return;
      scroller.releasePointerCapture?.(event.pointerId); pointer = null; scroller.classList.remove('is-dragging');
    };
    scroller.addEventListener('pointerup', finish); scroller.addEventListener('pointercancel', finish);
  };

  const installTournament = (force = false) => {
    const host = document.querySelector('.llm-leaderboard');
    if (!host || (!force && host.querySelector('.arena-tournament'))) return;
    host.classList.remove('is-ranking-hub'); host.classList.add('is-ranking-detail');
    const board = document.createElement('main'); board.className = 'arena-tournament';
    const rows = Array.from({ length:10 }, (_, index) => ({ rank:index + 1, model:models[index % models.length], stats:leaderboardRows[index % leaderboardRows.length] }));
    const quarterOptions = ['2026第一季度','2026第二季度','2026第三季度','2026第四季度'];
    board.innerHTML = '<section class="tournament-hero"><div class="tournament-hero-inner"><button class="leaderboard-back tournament-back" type="button"><img src="/projects/llm/site/competition/llm/assets/back-arrow.svg" alt=""><span>返回</span></button><div class="tournament-title-lockup"><img src="/projects/llm/site/competition/llm/assets/tournament-title-icon.svg" alt="锦标赛"><h1>TOURNAMENT</h1></div><div class="tournament-filters"><div class="tournament-groups"><span>组别：</span><button class="is-active" type="button">重量级</button><button type="button">轻量级</button></div><div class="tournament-season"><span>赛事：</span><details class="tournament-season-picker arena-competition-picker"><summary><span class="arena-picker-value">2026第一季度</span><img class="select-chevron" src="/projects/llm/site/competition/llm/assets/select-chevron.svg" alt=""></summary><div class="arena-competition-options">' + quarterOptions.map((option,index) => '<button class="' + (index === 0 ? 'is-active' : '') + '" type="button">' + option + '</button>').join('') + '</div></details></div></div></div></section><section class="tournament-table-shell"><div class="tournament-table-scroll arena-horizontal-scroll" role="region" aria-label="锦标赛排名表，可横向拖动"><table><thead><tr><th>#</th><th>参赛者</th><th>Agent</th><th>账户权益</th><th>收益率</th><th>总收益</th><th>胜率</th><th>单笔最大收益</th><th>单笔最大亏损</th><th>夏普比率</th><th>交易次数</th><th></th></tr></thead><tbody>' + rows.map(row => { const stat=row.stats; return '<tr><td>#' + row.rank + '</td><td>荆棘summer</td><td class="tournament-agent"><img src="' + row.model.logo + '" alt=""><span>' + row.model.name + '</span></td><td class="tournament-equity"><span>¥' + stat[1].toLocaleString('zh-CN') + '</span><button class="tournament-view tournament-view-mobile" type="button" data-model="' + row.model.name + '">查看 →</button></td><td class="' + (stat[2]>=0?'is-positive':'is-negative') + '">' + (stat[2]>=0?'+':'') + stat[2].toFixed(2) + '%</td><td>' + (stat[3]>=0?'+':'') + '¥' + stat[3].toLocaleString('zh-CN') + '</td><td>' + stat[4].toFixed(2) + '%</td><td>¥' + stat[5].toLocaleString('zh-CN') + '</td><td>-¥' + Math.abs(stat[6]).toLocaleString('zh-CN') + '</td><td>' + stat[7].toFixed(2) + '</td><td>' + stat[8] + '</td><td class="tournament-action"><button class="tournament-view" type="button" data-model="' + row.model.name + '">查看 →</button></td></tr>'; }).join('') + '</tbody></table></div><footer class="tournament-pagination"><label>每页显示 <select><option>10</option><option>20</option></select></label><nav><button type="button">‹</button><button class="is-current" type="button">1</button><button type="button">2</button><button type="button">3</button><button type="button">4</button><button type="button">5</button><button type="button">›</button></nav></footer></section>';
    const actionHeading = board.querySelector('.tournament-table-scroll th:last-child');
    if (actionHeading) actionHeading.innerHTML = '<span class="tournament-action-heading">账户权益</span>';
    board.querySelectorAll('.tournament-table-scroll tbody tr').forEach(row => {
      const equity = row.querySelector('.tournament-equity > span')?.textContent || '';
      const action = row.querySelector('.tournament-action');
      if (action) action.insertAdjacentHTML('afterbegin','<span class="tournament-action-equity">' + equity + '</span>');
    });
    board.querySelector('.tournament-back')?.addEventListener('click', returnToRankingHub);
    board.querySelectorAll('.tournament-groups button').forEach(button => button.addEventListener('click', () => board.querySelectorAll('.tournament-groups button').forEach(item => item.classList.toggle('is-active', item === button))));
    board.querySelectorAll('.tournament-view').forEach(button => button.addEventListener('click', () => openModelPage(button.dataset.model)));
    board.querySelectorAll('.tournament-table-scroll tbody tr').forEach(row => row.addEventListener('click', event => {
      if (!matchMedia('(max-width:820px)').matches || event.target.closest('.tournament-view')) return;
      const modelName = row.querySelector('.tournament-view')?.dataset.model;
      if (modelName) openModelPage(modelName);
    }));
    board.querySelectorAll('.tournament-pagination nav button').forEach(button => button.addEventListener('click', () => { if (!/^\d+$/.test(button.textContent)) return; board.querySelectorAll('.tournament-pagination nav button').forEach(item => item.classList.toggle('is-current', item === button)); }));
    wireCompetitionPickers(board); installHorizontalDrag(board.querySelector('.tournament-table-scroll'));
    replaceRankingContent(host, board);
  };

  const analysisSpark = [18,12,26,20,35,31,42,36,60,48,43,50];
  const analysisReturnA = [22,28,23,31,29,38,35,44,42,53,51,49,58,52,66];
  const analysisReturnB = [48,44,45,39,43,37,35,28,20,21,22,24,19,22,28];
  const analysisFunds = [18,24,19,26,23,31,37,48,42,39,44,52,48,55,53,66,64,63,45,28,65,60,78,73,69,88];
  const drawAnalysisCanvas = (canvas, progress = 1) => {
    const rect = canvas.getBoundingClientRect(); if (!rect.width || !rect.height) return;
    const ratio = chartPixelRatio(), pixelWidth = Math.round(rect.width * ratio), pixelHeight = Math.round(rect.height * ratio);
    if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) { canvas.width = pixelWidth; canvas.height = pixelHeight; }
    const ctx = canvas.getContext('2d'); ctx.setTransform(ratio,0,0,ratio,0,0); ctx.clearRect(0,0,rect.width,rect.height);
    const type = canvas.dataset.chart, compact = rect.width < 500;
    const left = type === 'spark' ? 4 : 36, right = type === 'spark' ? 4 : 12, top = type === 'spark' ? 4 : 30, bottom = type === 'spark' ? 4 : 28;
    const graphW = rect.width-left-right, graphH = rect.height-top-bottom;
    if (type !== 'spark') {
      ctx.font = '9px fusion-pixel,sans-serif'; ctx.fillStyle = '#b1b1b1'; ctx.strokeStyle = '#dedede'; ctx.lineWidth = 1; ctx.setLineDash([2,2]);
      const gridRows = 8;
      for (let row=0; row<gridRows; row++) { const y=top+graphH*row/(gridRows-1); ctx.beginPath();ctx.moveTo(left,y);ctx.lineTo(rect.width-right,y);ctx.stroke();ctx.fillText(type === 'funds' ? Math.max(0,300-row*50)+'K' : '-10%',2,y+3); }
      ctx.setLineDash([]); ctx.textAlign='center'; for(let column=0;column<6;column++) ctx.fillText(compact?'10-20':'2026/10/20',left+graphW*column/5,rect.height-7);
    }
    canvas.dataset.progress = Math.max(0,Math.min(1,progress)).toFixed(3);
    ctx.save(); ctx.beginPath(); ctx.rect(left-2,0,Math.max(1,(graphW+4)*progress),rect.height); ctx.clip();
    const plot = (values,color,width=1.25,range) => { const min=range?.[0] ?? Math.min(...values)-4,max=range?.[1] ?? Math.max(...values)+4;ctx.strokeStyle=color;ctx.lineWidth=width;ctx.lineJoin='miter';ctx.lineCap='butt';ctx.beginPath();values.forEach((value,index)=>{const x=left+graphW*index/(values.length-1),y=top+graphH*(max-value)/(max-min);index?ctx.lineTo(x,y):ctx.moveTo(x,y)});ctx.stroke(); };
    if(type==='spark') plot(analysisSpark,'#444',1.2);
    if(type==='returns'){
      const rising=[32,36,30,38,35,43,39,46,43,50,48,56,55,58,57,56,61,58,68,63,60,71,67,78];
      const falling=[49,46,47,43,47,44,42,39,41,37,36,33,28,25,26,27,28,25,24,25,28,31,34,37];
      plot(rising,'#4d84ff',1.35,[0,100]); plot(falling,'#444',1.35,[0,100]);
    }
    if(type==='bell'){
      const traceBell = () => {
        ctx.beginPath();
        ctx.moveTo(left,top+graphH*.82);
        ctx.bezierCurveTo(left+graphW*.14,top+graphH*.79,left+graphW*.18,top+graphH*.48,left+graphW*.34,top+graphH*.38);
        ctx.bezierCurveTo(left+graphW*.48,top+graphH*.30,left+graphW*.52,top+graphH*.14,left+graphW*.62,top+graphH*.15);
        ctx.bezierCurveTo(left+graphW*.73,top+graphH*.16,left+graphW*.69,top+graphH*.55,left+graphW*.80,top+graphH*.66);
        ctx.bezierCurveTo(left+graphW*.88,top+graphH*.75,left+graphW*.94,top+graphH*.79,left+graphW,top+graphH*.84);
      };
      traceBell();
      ctx.lineTo(left+graphW,top+graphH);ctx.lineTo(left,top+graphH);ctx.closePath();
      const bellFill=ctx.createLinearGradient(0,top,0,top+graphH);
      bellFill.addColorStop(0,'rgba(77,132,255,.20)');bellFill.addColorStop(.56,'rgba(77,132,255,.08)');bellFill.addColorStop(1,'rgba(77,132,255,0)');
      ctx.fillStyle=bellFill;ctx.fill();
      traceBell();ctx.strokeStyle='#4d84ff';ctx.lineWidth=1.5;ctx.lineJoin='round';ctx.lineCap='round';ctx.stroke();
    }
    if(type==='funds') plot(analysisFunds,'#555',1.1);
    ctx.restore();
  };

  const installAnalysis = (force = false) => {
    const host = document.querySelector('.llm-leaderboard');
    if (!host || (!force && host.querySelector('.arena-analysis'))) return;
    host.classList.remove('is-ranking-hub'); host.classList.add('is-ranking-detail');
    const board = document.createElement('main'); board.className = 'arena-analysis';
    const metrics = [['当前参赛人数（人）','1200','▲'],['模型盈利（$）','+23555.6','▲'],['平均仓位','50%','▲']];
    board.innerHTML = '<div class="analysis-inner"><button class="leaderboard-back analysis-back" type="button"><img src="/projects/llm/site/competition/llm/assets/back-arrow.svg" alt=""><span>返回</span></button><section class="analysis-overview"><h1>全模型统计</h1><div class="analysis-metrics">' + metrics.map(item => '<article><div><span>' + item[0] + '</span><strong>' + item[1] + ' <em>' + item[2] + '</em></strong></div><canvas data-chart="spark" aria-hidden="true"></canvas></article>').join('') + '</div><div class="analysis-charts"><article><header><strong><span class="analysis-chart-title-full">组别收益率</span><span class="analysis-chart-title-compact">组别收益</span></strong><span><i class="blue"></i>重量组<i></i>轻量组</span></header><canvas data-chart="returns" aria-label="组别收益率"></canvas></article><article><header><strong>盈亏分布</strong></header><canvas data-chart="bell" aria-label="盈亏分布"></canvas></article><article><header><strong>参赛资金</strong></header><canvas data-chart="funds" aria-label="参赛资金"></canvas></article></div></section><section class="analysis-groups"><h2>组间统计</h2><div class="analysis-table-scroll arena-horizontal-scroll" role="region" aria-label="组间统计，可横向拖动"><table><thead><tr><th>组别</th><th>总收益率</th><th>最大回撤</th><th>交易次数</th><th>胜率</th><th>盈亏比</th><th>平均仓位</th><th>平均持仓周期</th></tr></thead><tbody>' + ['超重量组','重量组','中量级组','轻量级组'].map((name,index) => '<tr><td>' + name + '</td><td class="is-positive">+25%</td><td>5%</td><td>100</td><td>50%</td><td>3</td><td>20%</td><td>25h</td></tr>').join('') + '</tbody></table></div></section></div>';
    const analysisPanel = document.createElement('div');
    analysisPanel.className = 'analysis-panel';
    const overview = board.querySelector('.analysis-overview');
    const groups = board.querySelector('.analysis-groups');
    overview?.before(analysisPanel);
    if (overview) analysisPanel.appendChild(overview);
    if (groups) analysisPanel.appendChild(groups);
    const groupRows = [...board.querySelectorAll('.analysis-table-scroll tbody tr')];
    const desktopGroupNames = ['重量组TOP10','轻量级组TOP10'];
    groupRows.forEach((row,index) => {
      const nameCell = row.querySelector('td:first-child');
      const returnCell = row.querySelector('td:nth-child(2)');
      if (index < 2 && nameCell) nameCell.innerHTML = '<span class="analysis-group-mobile-label">' + nameCell.textContent + '</span><span class="analysis-group-desktop-label">' + desktopGroupNames[index] + '</span>';
      if (index < 2 && returnCell) returnCell.innerHTML = '<span class="analysis-group-mobile-return">+25%</span><span class="analysis-group-desktop-return ' + (index === 0 ? 'is-negative' : 'is-positive') + '">' + (index === 0 ? '-25%' : '+25%') + '</span>';
    });
    board.querySelector('.analysis-back')?.addEventListener('click', returnToRankingHub);
    const metricNodes = [...board.querySelectorAll('.analysis-metrics strong')];
    const metricTargets = [
      { value:1200, format:value => String(Math.round(value)) },
      { value:23555.6, format:value => '+' + value.toFixed(1) },
      { value:50, format:value => Math.round(value) + '%' }
    ];
    const updateMetricCounts = progress => metricNodes.forEach((node,index) => {
      const target = metricTargets[index];
      if (!target || !node.firstChild) return;
      node.firstChild.nodeValue = target.format(target.value * progress) + ' ';
    });
    const metricBlock = board.querySelector('.analysis-metrics');
    const canvases = [...board.querySelectorAll('canvas[data-chart]')];
    const canvasProgress = new Map(canvases.map(canvas => [canvas,0]));
    const animateProgress = update => {
      let start = 0;
      const frame = time => {
        if (!board.isConnected) return;
        if (!start) start = time;
        const raw = Math.min(1,(time-start)/900);
        update(1-Math.pow(1-raw,3));
        if (raw < 1) requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);
    };
    const revealMetrics = () => {
      if (!metricBlock || metricBlock.dataset.revealed === 'true') return;
      metricBlock.dataset.revealed = 'true';
      animateProgress(updateMetricCounts);
    };
    const revealCanvas = canvas => {
      if (canvas.dataset.revealed === 'true') return;
      canvas.dataset.revealed = 'true';
      animateProgress(progress => { canvasProgress.set(canvas,progress); drawAnalysisCanvas(canvas,progress); });
    };
    const redraw = () => canvases.forEach(canvas => drawAnalysisCanvas(canvas,canvasProgress.get(canvas) || 0));
    updateMetricCounts(0);
    canvases.forEach(canvas => drawAnalysisCanvas(canvas,0));
    installHorizontalDrag(board.querySelector('.analysis-table-scroll'));
    replaceRankingContent(host, board);
    let observer;
    const revealFrame = requestAnimationFrame(() => {
      if (!board.isConnected) return;
      redraw();
      if ('IntersectionObserver' in window) {
        observer = new IntersectionObserver(entries => entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          if (entry.target === metricBlock) revealMetrics(); else revealCanvas(entry.target);
          observer.unobserve(entry.target);
        }), { threshold:.16 });
        if (metricBlock) observer.observe(metricBlock);
        canvases.forEach(canvas => observer.observe(canvas));
      } else {
        revealMetrics();canvases.forEach(revealCanvas);
      }
    });
    const sizeObserver = 'ResizeObserver' in window ? new ResizeObserver(redraw) : null;
    sizeObserver?.observe(board);
    rankingCleanup.set(board, () => {
      cancelAnimationFrame(revealFrame);
      observer?.disconnect();
      sizeObserver?.disconnect();
    });
  };

  const installLeaderboard = (force = false) => {
    const host = document.querySelector('.llm-leaderboard');
    if (!host || (!force && host.querySelector('.arena-leaderboard'))) return;
    host.classList.remove('is-ranking-hub');
    host.classList.add('is-ranking-detail');
    const board = document.createElement('div'); board.className = 'leaderboard-container arena-leaderboard';
    board.innerHTML = '<section class="arena-leaderboard-hero"><div class="leaderboard-hero-inner"><button class="leaderboard-back" type="button" aria-label="返回排行榜"><img src="/projects/llm/site/competition/llm/assets/back-arrow.svg" alt=""><span>返回</span></button><div class="leaderboard-title-lockup"><img src="/projects/llm/site/competition/llm/assets/ladder-title-icon.svg" alt="天梯赛"><h1>LADDER TOURNAMENT</h1></div><div class="leaderboard-filters"><div class="leaderboard-filter leaderboard-weight"><span>组别：</span><button type="button">轻量级</button><button type="button">中量级</button><button class="is-active" type="button">重量级</button><button type="button">超重量级</button></div><div class="leaderboard-filter leaderboard-season"><span>赛事：</span><details class="leaderboard-season-picker arena-competition-picker"><summary><span class="leaderboard-season-value arena-picker-value">月度</span><img class="select-chevron" src="/projects/llm/site/competition/llm/assets/select-chevron.svg" alt=""></summary><div class="leaderboard-season-options arena-competition-options"><button class="is-active" type="button">月度</button><button type="button">季度</button><button type="button">年度</button></div></details><details class="leaderboard-season-picker arena-competition-picker"><summary><span class="leaderboard-season-value arena-picker-value">1月</span><img class="select-chevron" src="/projects/llm/site/competition/llm/assets/select-chevron.svg" alt=""></summary><div class="leaderboard-season-options arena-competition-options">' + Array.from({length:12},(_,index) => '<button class="' + (index === 0 ? 'is-active' : '') + '" type="button">' + (index+1) + '月</button>').join('') + '</div></details></div></div></div></section><div class="leaderboard-wrapper"><div class="table"><div class="table-wrapper"><div class="header"><div class="h1">#</div><div class="h2">参赛者 / Agent</div><div class="h3">账户权益</div><div class="h4">收益率</div><div class="h5">总收益</div><div class="h6">胜率</div><div class="h7">单笔最大收益</div><div class="h8">单笔最大亏损</div><div class="h9">夏普比率</div><div class="h10">交易次数</div></div><div class="table-body">' + leaderboardRows.map((row,index) => '<div class="column"><div class="c1"><span class="rank-badge rank-' + (index+1) + '">#' + (index+1) + '</span></div><div class="c2"><img src="' + models[row[0]].logo + '" alt=""><span>' + models[row[0]].name + '</span></div><div class="c3">¥' + row[1].toLocaleString('zh-CN') + '</div><div class="c4 ' + (row[2] >= 0 ? 'profit-more' : 'profit-empty') + '">' + (row[2] >= 0 ? '+' : '') + row[2].toFixed(2) + '%</div><div class="c5">' + (row[3] >= 0 ? '+' : '') + '¥' + row[3].toLocaleString('zh-CN') + '</div><div class="c6">' + row[4].toFixed(2) + '%</div><div class="c7">¥' + row[5].toLocaleString('zh-CN') + '</div><div class="c8">-¥' + Math.abs(row[6]).toLocaleString('zh-CN') + '</div><div class="c9">' + row[7].toFixed(2) + '</div><div class="c10">' + row[8] + '</div></div>').join('') + '</div></div></div><section class="leaderboard-stat"><div class="stat-leader"><div class="stat-title"><span>当前第一名</span><strong>TOP1</strong></div><div class="stat-model"><img src="' + models[0].logo + '" alt=""><strong>' + models[0].name + '</strong></div><div class="stat-equity"><span>总权益</span><strong>¥' + models[0].value.toLocaleString('zh-CN') + '</strong></div><div class="stat-holdings"><span>持仓标的</span><div><em>Au2511</em><em>FG2511</em><em>Au2511</em><em>Au2511</em><em>FG2511</em></div></div></div><div class="stat-bars">' + leaderboardRows.map((row,index) => '<div class="stat-bar-item"><img src="' + models[row[0]].logo + '" alt=""><span>' + models[row[0]].name + '</span><div class="stat-bar-track"><i style="height:' + Math.max(18,100-index*8) + '%;background:' + models[row[0]].color + '"></i></div><strong>¥' + row[1].toLocaleString('zh-CN') + '</strong></div>').join('') + '</div></section></div>';
    const desktopTable = board.querySelector('.leaderboard-wrapper > .table');
    if (desktopTable) {
      desktopTable.setAttribute('role', 'region');
      desktopTable.setAttribute('aria-label', '排行榜表格，可按住横向拖动查看');
      desktopTable.setAttribute('tabindex', '0');
      let dragPointer = null;
      let dragStartX = 0;
      let dragStartScroll = 0;
      let didDrag = false;
      desktopTable.addEventListener('pointerdown', event => {
        if (!window.matchMedia('(max-width:820px)').matches || desktopTable.scrollWidth <= desktopTable.clientWidth) return;
        dragPointer = event.pointerId;
        dragStartX = event.clientX;
        dragStartScroll = desktopTable.scrollLeft;
        didDrag = false;
        desktopTable.setPointerCapture?.(event.pointerId);
        desktopTable.classList.add('is-dragging');
      });
      desktopTable.addEventListener('pointermove', event => {
        if (dragPointer !== event.pointerId) return;
        const distance = event.clientX - dragStartX;
        if (Math.abs(distance) > 4) didDrag = true;
        desktopTable.scrollLeft = dragStartScroll - distance;
        if (didDrag) event.preventDefault();
      });
      const endDrag = event => {
        if (dragPointer !== event.pointerId) return;
        desktopTable.releasePointerCapture?.(event.pointerId);
        dragPointer = null;
        desktopTable.classList.remove('is-dragging');
      };
      desktopTable.addEventListener('pointerup', endDrag);
      desktopTable.addEventListener('pointercancel', endDrag);
      desktopTable.addEventListener('click', event => {
        if (!didDrag) return;
        event.preventDefault();
        event.stopPropagation();
        didDrag = false;
      }, true);
    }
    const statBars = board.querySelector('.stat-bars');
    if (statBars) {
      statBars.setAttribute('role', 'region');
      statBars.setAttribute('aria-label', '模型账户权益图，可按住横向拖动查看');
      statBars.setAttribute('tabindex', '0');
      let barPointer = null;
      let barStartX = 0;
      let barStartScroll = 0;
      statBars.addEventListener('pointerdown', event => {
        if (!window.matchMedia('(max-width:820px)').matches || statBars.scrollWidth <= statBars.clientWidth) return;
        barPointer = event.pointerId;
        barStartX = event.clientX;
        barStartScroll = statBars.scrollLeft;
        statBars.setPointerCapture?.(event.pointerId);
        statBars.classList.add('is-dragging');
      });
      statBars.addEventListener('pointermove', event => {
        if (barPointer !== event.pointerId) return;
        statBars.scrollLeft = barStartScroll - (event.clientX - barStartX);
        event.preventDefault();
      });
      const finishBarDrag = event => {
        if (barPointer !== event.pointerId) return;
        statBars.releasePointerCapture?.(event.pointerId);
        barPointer = null;
        statBars.classList.remove('is-dragging');
      };
      statBars.addEventListener('pointerup', finishBarDrag);
      statBars.addEventListener('pointercancel', finishBarDrag);
    }
    wireCompetitionPickers(board);
    board.querySelector('.leaderboard-back')?.addEventListener('click', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('page', '1');
      url.searchParams.delete('view');
      history.replaceState(null, '', url);
      installRankingHub(true);
    });
    board.querySelectorAll('.leaderboard-weight button').forEach(button => button.addEventListener('click', () => {
      board.querySelectorAll('.leaderboard-weight button').forEach(item => item.classList.toggle('is-active', item === button));
    }));
    board.querySelectorAll('.table-body .column').forEach((row,index) => {
      const modelCell = row.querySelector('.c2');
      if (!modelCell) return;
      modelCell.setAttribute('role', 'link');
      modelCell.setAttribute('tabindex', '0');
      const open = () => openModelPage(models[leaderboardRows[index][0]]?.name);
      modelCell.addEventListener('click', open);
      modelCell.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(); } });
    });
    replaceRankingContent(host, board);
  };

  const installModelDetails = () => {
    const host = document.querySelector('.llm-model');
    if (!host || host.querySelector('.arena-model-detail')) return;
    const detail = document.createElement('div'); detail.className = 'arena-model-detail';
    const avatar = '/projects/llm/site/competition/llm/assets/contestant-deepseek-avatar.png';
    const searchIcon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAEwklEQVR4AcyYWahNURjH973mZIzMkggPROZZ8SCZi0JKHi7dpMgcHsiUIV4MiQcPiJQhoQyJjEWG4sGQeYibkGTo+v33PWv37XvOPvuce87B7fvf71trf+u//mftvfZaaxd7WfyVl5e3ALPAIXAVPAPfwXtwB5wCa0AfUJQFdWRqRgLpbBy4CssrsBNMAv1AW1ALNAXdwEiwDFwHL2mzGtQnrrKlFQh5P3AZ9qNAgrIZlZa0WQ4ewzEXVCfO2iIFQjgPNokbiLf2iMJmMAUMA11AHzAWLATnwU/grAnBNnAazsb4rCxJICQ1wB5YtoBqwJlGsXtRUVFHsAAcBBfBQ3ATnACbwHAaNAerwWfgTPXX4e7sKjLxSQJppGdsJt7ZE4KBdDwB3CGONfLKwEoS24NjwFkHgrOIbIHPyEICaajbasWdg6U3nV3BZ220+wjG03ARcNaK4Ch91cbHWiCQBpoEG02Li8Sj6KAMn5PBIV4rUs+sHqFY3kAgmZuAe+Y0ESZC/IO6vBhcErndkJUwKJpgpio59AWSqNtgZ2sJhDmPXHJ33mLqngOZBmOdgnTwBZKghjjfjiDugh/l+R+8X6GcD5xpAUg7q4sZPc2ovq4FXrcaVzDT6+qFYdfdM8VwqBHUC9atEI/4ldfCKfktwf8bxr3AWazAES4TfwL8DdNq4/rRxqKeK1T2GsHWpvK+iQsZ3oa8HMh09/RuVJwECdSi7i48dEEhPbf5C/xvgTPNAxeHvAQ2MzW/TFzo0PaltTtlfxJoF/QqbYlSMsdXulusTKtB5QAS+CYoeV7kLzE5OYe82mpAYvt6TTmlSaC92DtlVv4rtcTVNLR2kEy150ngLVPT38SFDAcZch0j3plyKJRAu18bzPBrDxdKKkBhhuE8zqy2z6O5VDGCN6lxt1mCZ1MumDEAPSC3j5IdIC6FrTih3i49pZC0C6fltbTVsD0ltqsKxbBpxFSjvdoHBaAu2A3ybvxw7daHGOLlDJA9YJlLFaEvkCS9h3TIqaj1vBGQxe7VXLLnxUfwDSbLblg1OQ9Ql9Z8gYkMNdYZJFH0lkC6whVy8fDoOKFnTYd8UWlfOIOBiZwcShICgSRr6ZlMpbb7ON9WQa7PHA39UhX+0V6TTuebRonmEjWd/u4lymldIFBZNNI2fwyx3k043/SZ4y4d6QxhX67+xah/5A8CEraDHNdO4ubRjzatVMdbSKDSaawdjV4DN1ROoA1+F3hKp5vBSBDaw1GuA7qBpUDfcS6RbyeEbqsOYtu4rpwy/C6gZY/U1JYkUGmI1NIzlFi/XjtgQt+0NdOZ4hSlz5B/A8/BR8rfgA72a/F65nCBaUIMgNeNnD6R6JaXkHGY9pEiUwqkkQfZd1BK3BXoAcclWR1qNLpR31z0nptGTi+47DN3mDpn4wgiRUYKpJFvED8AOjdogV9KpT6t6VkiTGlalTTy+hTXibb7QeX8ObS0PzpSZKxAiHyjE30kWo/X7WtApQTrg9BU4tGgJ9DOuDU5peAMSPkSTtRr8sWKzFggnQdGB1+ABJ/HHwAnwS3wFlQeraCdDciT+FiRVRJoO8olzkTkPxWoHxcn8p8LjBG5/b8QmEbkxP9GYCWR+yh/Ahv+AAAA//9c+Hm/AAAABklEQVQDAIHinl9d91UPAAAAAElFTkSuQmCC';
    const positions = Array.from({ length: 5 }, () => ({ symbol:'AU2411', time:'2025/11/12 16:16:41', price:'$13,001.55', quantity:'120', pnl:'+30.02%', value:'¥13,001.55' }));
    const trades = Array.from({ length: 15 }, (_, index) => {
      const side = index % 3 === 1 ? '卖出' : '买入';
      return { symbol:'AU2411', side, price:'¥13,001.55', quantity:'100', fee:'¥101.55', duration:'16:16:41', pnl:(side === '买入' ? '+' : '-') + '¥13,001.55' };
    });
    const pagination = '<nav class="model-pagination" aria-label="分页"><button type="button" data-page-step="-1">上一页</button>' + [1,2,3,4,5].map(page => '<button type="button" data-page="' + page + '" class="' + (page === 1 ? 'is-current' : '') + '">' + page + '</button>').join('') + '<button type="button" data-page-step="1">下一页</button></nav>';
    const positionCards = positions.map(position => '<article class="model-position-card"><header><img src="' + avatar + '" alt=""><strong>' + position.symbol + '</strong></header><dl><div><dt>买入时间：</dt><dd>' + position.time.replace(' ', ' <br>') + '</dd></div><div><dt>持仓均价：</dt><dd>' + position.price + '</dd></div><div><dt>持仓数量：</dt><dd>' + position.quantity + '</dd></div><div><dt>浮动盈亏：</dt><dd class="model-positive">' + position.pnl + '</dd></div><div><dt>市值：</dt><dd>' + position.value + '</dd></div></dl></article>').join('');
    const tradeRows = trades.map(trade => { const tone = trade.side === '买入' ? 'model-positive' : 'model-negative'; return '<tr><td>' + trade.symbol + '</td><td class="' + tone + '">' + trade.side + '</td><td>' + trade.price + '</td><td>' + trade.quantity + '</td><td>' + trade.fee + '</td><td>' + trade.duration + '</td><td class="' + tone + '">' + trade.pnl + '</td></tr>'; }).join('');
    const pickerOptions = models.slice(0,7).map(model => '<button type="button" class="model-picker-option" data-model-name="' + model.name + '"><img src="' + model.logo + '" alt=""><span>' + model.name + '</span></button>').join('');
    detail.innerHTML = '<div class="model-detail-toolbar"><button class="model-detail-back" type="button"><img src="/projects/llm/site/competition/llm/assets/back-arrow.svg" alt=""><span>返回</span></button><details class="model-picker"><summary><span class="model-picker-value">Deepseek</span><img class="select-chevron" src="/projects/llm/site/competition/llm/assets/select-chevron.svg" alt=""></summary><div class="model-picker-panel"><div class="model-picker-tabs"><button class="is-active" type="button">轻量组前10</button><button type="button">重量组前10</button></div><div class="model-picker-options">' + pickerOptions + '</div></div></details><label class="model-search"><img src="' + searchIcon + '" alt=""><span>搜索参赛选手</span><input type="search" aria-label="搜索参赛选手" placeholder="搜索你喜欢的选手"></label></div><section class="model-overview-panel"><div class="model-overview-top"><div class="model-contestant"><img src="' + avatar + '" alt="Deepseek 参赛者头像"><div><strong>参赛者：Deepseek</strong><span>初始权益:HKD888.66</span></div></div><div class="model-rank-cards"><article><strong>重量级</strong><span>组别</span></article><article><strong>12</strong><span>当前排名</span></article><article><strong>322</strong><span>积分</span></article></div></div><div class="model-equity-block"><h2>净值曲线</h2><canvas aria-label="Deepseek 净值曲线"></canvas></div></section><section class="model-data-panel"><div class="model-data-section model-trading-stats"><h2>交易统计</h2><div class="model-stat-grid"><article><span>当前净值</span><strong>1.23</strong></article><article><span>单笔最大收益</span><strong>HKD 888.8</strong></article><article><span>单笔最大亏损</span><strong>HKD 888.8</strong></article><article><span>最大回撤</span><strong>55.1%</strong></article><article><span>夏普比率</span><strong>96%</strong></article><article><span>平均持仓时间</span><strong>36h 52m</strong></article><article><span>交易次数</span><strong>12</strong></article><article><span>胜率</span><strong>96%</strong></article></div></div><div class="model-data-section model-position-details"><h2>持仓详情</h2><div class="model-position-grid">' + positionCards + '</div>' + pagination + '</div><div class="model-data-section model-trade-details"><h2>交易详情</h2><div class="model-trade-table"><table><thead><tr><th>标的</th><th>方向</th><th>价格</th><th>数量</th><th>手续费</th><th>持仓时间</th><th>盈亏</th></tr></thead><tbody>' + tradeRows + '</tbody></table></div>' + pagination + '</div></section>';
    host.replaceChildren(detail);

    detail.querySelector('.model-detail-back').addEventListener('click', () => {
      const url = new URL(window.location.href);
      url.searchParams.delete('view');
      history.replaceState(null, '', url);
      document.querySelector('.llm-wrapper > .menu .menu-item')?.click();
    });

    const canvas = detail.querySelector('.model-equity-block canvas');
    const values = [72,76,70,75,73,79,85,78,82,79,88,86,85,91,92,97,96,95,94,82,90,99,97,106,104,101,110];
    let chartFrame = 0, chartProgress = 0;
    const drawEquityCurve = progress => {
      chartProgress = progress;
      canvas.dataset.progress = progress.toFixed(3);
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const ratio = chartPixelRatio(), pixelWidth = Math.round(rect.width * ratio), pixelHeight = Math.round(rect.height * ratio);
      if (canvas.width !== pixelWidth || canvas.height !== pixelHeight) { canvas.width = pixelWidth; canvas.height = pixelHeight; }
      const context = canvas.getContext('2d');
      context.setTransform(ratio,0,0,ratio,0,0); context.clearRect(0,0,rect.width,rect.height);
      const compact = rect.width < 600;
      const left = compact ? 44 : 70, right = compact ? 14 : 28, top = 16, bottom = compact ? 34 : 30;
      const graphWidth = rect.width - left - right, graphHeight = rect.height - top - bottom;
      context.font = (compact ? 9 : 10) + 'px fusion-pixel, sans-serif'; context.lineWidth = 1;
      for (let row = 0; row < 7; row++) {
        const y = top + graphHeight * row / 6;
        context.strokeStyle = '#e8e8e8'; context.setLineDash([2,2]); context.beginPath(); context.moveTo(left,y); context.lineTo(rect.width-right,y); context.stroke();
        context.setLineDash([]); context.fillStyle = '#b2b2b2'; context.textAlign = 'left'; context.fillText('-10%', 4, y + 3);
      }
      for (let column = 0; column < 7; column++) {
        const x = left + graphWidth * column / 6; context.fillStyle = '#aaa'; context.textAlign = 'center'; context.fillText('10-20', x, rect.height - 6);
      }
      const visible = Math.max(1, Math.min(values.length - 1, progress * (values.length - 1)));
      const whole = Math.floor(visible), fraction = visible - whole;
      const point = index => ({ x:left + graphWidth * index / (values.length - 1), y:top + graphHeight * (112 - values[index]) / 46 });
      context.strokeStyle = '#555'; context.lineWidth = compact ? 1.25 : 1.4; context.lineJoin = 'miter'; context.lineCap = 'butt'; context.beginPath();
      const first = point(0); context.moveTo(first.x,first.y);
      for (let index = 1; index <= whole; index++) { const current = point(index); context.lineTo(current.x,current.y); }
      if (whole < values.length - 1 && fraction > 0) { const start = point(whole), end = point(whole + 1); context.lineTo(start.x + (end.x-start.x)*fraction,start.y + (end.y-start.y)*fraction); }
      context.stroke();
    };
    const animateEquityCurve = () => {
      cancelAnimationFrame(chartFrame);
      drawEquityCurve(0);
      const started = performance.now();
      const tick = time => {
        const progress = Math.min(1, (time - started) / 1250);
        drawEquityCurve(1 - Math.pow(1 - progress, 3));
        if (progress < 1) chartFrame = requestAnimationFrame(tick);
      };
      chartFrame = requestAnimationFrame(tick);
    };
    detail.addEventListener('arena:model-enter', animateEquityCurve);
    if ('ResizeObserver' in window) new ResizeObserver(() => drawEquityCurve(chartProgress)).observe(canvas);
    detail.querySelectorAll('.model-pagination').forEach(nav => nav.addEventListener('click', event => {
      const button = event.target.closest('button'); if (!button) return;
      const pages = [...nav.querySelectorAll('[data-page]')];
      const currentIndex = Math.max(0, pages.findIndex(page => page.classList.contains('is-current')));
      const requested = button.dataset.page ? Number(button.dataset.page) - 1 : Math.max(0, Math.min(pages.length - 1, currentIndex + Number(button.dataset.pageStep || 0)));
      pages.forEach((page,index) => page.classList.toggle('is-current', index === requested));
    }));
    detail.querySelectorAll('.model-picker-tabs button').forEach(button => button.addEventListener('click', () => {
      detail.querySelectorAll('.model-picker-tabs button').forEach(item => item.classList.toggle('is-active', item === button));
    }));
    detail.querySelectorAll('.model-picker-option').forEach(button => button.addEventListener('click', () => {
      detail.querySelector('.model-picker-value').textContent = button.dataset.modelName;
      detail.querySelector('.model-contestant strong').textContent = '参赛者：' + button.dataset.modelName;
      detail.querySelector('.model-picker').removeAttribute('open');
    }));
  };

  let showArenaPage;
  const boundArenaMenuItems = new WeakSet();
  const installMainNavigation = () => {
    const live = document.querySelector('.llm-live'), leaderboard = document.querySelector('.llm-leaderboard'), model = document.querySelector('.llm-model');
    const menus = document.querySelectorAll('.llm-navbar > .menu, .llm-wrapper > .menu');
    let liveRevealFrame = 0;
    const show = index => {
      closeInlineRules();
      if (live) {
        cancelAnimationFrame(liveRevealFrame);
        if (index === 0) {
          live.style.display = '';
          live.style.visibility = '';
          const redraw = () => live.querySelector('.arena-chart-fallback')?.dispatchEvent(new Event('arena:redraw'));
          if (portfolioPreview) liveRevealFrame = requestAnimationFrame(redraw);
          else redraw();
        } else {
          live.style.display = 'none';
          live.style.visibility = '';
        }
      }
      if (leaderboard) leaderboard.style.display = index === 1 ? '' : 'none';
      if (model) {
        model.style.display = index === 2 ? '' : 'none';
        if (index === 2) model.querySelector('.arena-model-detail')?.dispatchEvent(new Event('arena:model-enter'));
      }
      document.querySelectorAll('.llm-navbar > .menu .menu-item, .llm-wrapper > .menu .menu-item').forEach((item,itemIndex) => item.classList.toggle('active', itemIndex % 3 === index));
      document.querySelector('.llm-wrapper')?.classList.toggle('arena-live-page', index === 0);
      const mobileBottom = document.querySelector('.arena-mobile-bottom-nav');
      if (mobileBottom) mobileBottom.hidden = index !== 0;
      const url = new URL(window.location.href); url.searchParams.set('page', String(index)); history.replaceState(null, '', url);
    };
    let newlyBound = false;
    menus.forEach(menu => [...menu.querySelectorAll('.menu-item')].forEach((item,index) => {
      if (boundArenaMenuItems.has(item)) return;
      boundArenaMenuItems.add(item);
      newlyBound = true;
      item.addEventListener('click', event => {
        event.preventDefault(); event.stopImmediatePropagation();
        if (index === 1) renderRankingView();
        showArenaPage(index);
      }, true);
    }));
    if (!showArenaPage || newlyBound) {
      showArenaPage = show;
      show(Math.max(0, Math.min(2, Number(new URLSearchParams(location.search).get('page') || 0))));
    }
  };

  // The portfolio gallery keeps this live document mounted while changing views.
  // Switching its existing controls avoids loading a new copy of the entire site.
  window.__arenaNavigate = view => {
    const menu = document.querySelector('.llm-navbar > .menu') || document.querySelector('.llm-wrapper > .menu');
    const items = menu?.querySelectorAll('.menu-item');
    if (!items?.length) return false;
    const page = view === 'live' ? 0 : view === 'model' ? 2 : 1;
    if (view !== document.documentElement.dataset.portfolioArenaView) {
      if (showArenaPage) {
        if (page === 1) renderRankingView(view === 'ranking' ? undefined : view);
        showArenaPage(page);
      } else {
        items[page]?.click();
        if (page === 1 && view !== 'ranking') document.querySelector(`.ranking-hub-card[data-ranking-view="${view}"]`)?.click();
      }
      document.documentElement.dataset.portfolioArenaView = view;
    }
    document.querySelector('.llm-wrapper')?.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    window.scrollTo(0, 0);
    return true;
  };

  const installMarketLeader = () => {
    const bar = document.querySelector('.llm-marketbar');
    if (!bar || bar.querySelector('.arena-market-leader')) return;
    const panel = document.createElement('section');
    panel.className = 'arena-market-leader';
    panel.setAttribute('aria-label', '实时领先模型');
    panel.innerHTML = '<span class="leader-kicker"><i></i>实时领先</span><div class="leader-model"><img src="' + models[0].logo + '" alt=""><span><strong>' + models[0].name + '</strong><small>账户权益 ¥' + models[0].value.toLocaleString('zh-CN') + '</small></span></div><div class="leader-change">+3.87%</div>';
    bar.appendChild(panel);
  };

  const priceModelCards = () => {
    const footer = document.querySelector('.left-section .footer');
    if (footer && !footer.dataset.pandaSecond) {
      const cards = [...footer.children];
      if (cards[6] && cards[1]) footer.insertBefore(cards[6], cards[1]);
      footer.dataset.pandaSecond = 'true';
    }
    if (footer && !footer.querySelector('[data-extra-footer-model]')) {
      const template = footer.querySelector('.footer-item:last-child');
      footerModelExtras.forEach(() => {
        const card = template?.cloneNode(true);
        if (!card) return;
        card.classList.remove('active');
        card.dataset.extraFooterModel = 'true';
        footer.appendChild(card);
      });
    }
    const footerModels = models.concat(footerModelExtras);
    document.querySelectorAll('.left-section .footer-item').forEach((card, index) => {
      const model = footerModels[index], price = card.querySelector('.price'), name = card.querySelector('.name div'), logo = card.querySelector('.name img');
      if (model && name) name.textContent = model.name;
      if (model && logo) { logo.src = model.logo; logo.alt = model.name; }
      card.classList.toggle('arena-claude-card', Boolean(model?.name.startsWith('Claude')));
      if (model && price) price.innerHTML = '<div>¥</div><strong>' + model.value.toLocaleString('zh-CN') + '</strong>';
      if (model && card.dataset.modelRoute !== 'true') {
        card.dataset.modelRoute = 'true';
        card.setAttribute('role', 'link');
        card.setAttribute('tabindex', '0');
        const open = event => { event?.preventDefault(); event?.stopImmediatePropagation(); openModelPage(model.name); };
        card.addEventListener('click', open, true);
        card.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') open(event); }, true);
      }
    });
  };

  const installFooterWheelScroll = () => {
    const footer = document.querySelector('.left-section .footer');
    if (!footer || footer.dataset.horizontalWheel === 'true') return;
    footer.dataset.horizontalWheel = 'true';
    footer.addEventListener('wheel', event => {
      if (footer.scrollWidth <= footer.clientWidth) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (!delta) return;
      const maxScroll = footer.scrollWidth - footer.clientWidth;
      const next = Math.max(0, Math.min(maxScroll, footer.scrollLeft + delta));
      if (next === footer.scrollLeft) return;
      event.preventDefault();
      footer.scrollLeft = next;
    }, { passive:false });
    let pointer = null;
    let startX = 0;
    let startScroll = 0;
    let didDrag = false;
    footer.addEventListener('pointerdown', event => {
      if (footer.scrollWidth <= footer.clientWidth) return;
      pointer = event.pointerId;
      startX = event.clientX;
      startScroll = footer.scrollLeft;
      didDrag = false;
      footer.setPointerCapture?.(event.pointerId);
      footer.classList.add('is-dragging');
    });
    footer.addEventListener('pointermove', event => {
      if (pointer !== event.pointerId) return;
      const distance = event.clientX - startX;
      if (Math.abs(distance) > 4) didDrag = true;
      footer.scrollLeft = startScroll - distance;
      if (didDrag) event.preventDefault();
    });
    const finishDrag = event => {
      if (pointer !== event.pointerId) return;
      footer.releasePointerCapture?.(event.pointerId);
      pointer = null;
      footer.classList.remove('is-dragging');
    };
    footer.addEventListener('pointerup', finishDrag);
    footer.addEventListener('pointercancel', finishDrag);
    footer.addEventListener('click', event => {
      if (!didDrag) return;
      event.preventDefault();
      event.stopPropagation();
      didDrag = false;
    }, true);
  };

  const installLeaderboardTailScroll = () => {
    const pageScroller = document.querySelector('.llm-wrapper');
    if (!pageScroller || pageScroller.dataset.leaderboardTailScroll === 'true') return;
    pageScroller.dataset.leaderboardTailScroll = 'true';
    pageScroller.addEventListener('wheel', event => {
      const board = document.querySelector('.arena-leaderboard');
      const bars = board?.querySelector('.stat-bars');
      if (!board || !bars || board.closest('.llm-leaderboard')?.style.display === 'none') return;
      const maxHorizontal = bars.scrollWidth - bars.clientWidth;
      if (maxHorizontal <= 1) return;
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (!delta) return;
      const maxVertical = pageScroller.scrollHeight - pageScroller.clientHeight;
      const atPageBottom = pageScroller.scrollTop >= maxVertical - 2;
      if (!atPageBottom) return;
      const canMoveForward = delta > 0 && bars.scrollLeft < maxHorizontal - 1;
      const canMoveBackward = delta < 0 && bars.scrollLeft > 1;
      if (!canMoveForward && !canMoveBackward) return;
      event.preventDefault();
      bars.scrollLeft = Math.max(0, Math.min(maxHorizontal, bars.scrollLeft + delta));
    }, { passive:false });
  };

  const installStableModelSelect = (sourceRoot, onChange) => {
    if (!sourceRoot) return;
    let root = sourceRoot;
    if (!root.classList.contains('arena-stable-select')) {
      const cleanRoot = root.cloneNode(false);
      cleanRoot.classList.add('arena-stable-select');
      root.replaceWith(cleanRoot);
      root = cleanRoot;
    }
    root._arenaOnChange = onChange;
    if (root.dataset.stableBound === 'true') return;
    root.dataset.stableBound = 'true';
    const scope = 'data-v-946a1815';
    const arrowSource = sourceRoot.querySelector('.select-down-btn')?.src || '';
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'select-display'; button.setAttribute(scope, ''); button.setAttribute('aria-expanded', 'false');
    const label = document.createElement('span'); label.setAttribute(scope, '');
    const arrow = document.createElement('img'); arrow.className = 'select-down-btn'; arrow.src = arrowSource; arrow.alt = ''; arrow.setAttribute(scope, '');
    button.append(label, arrow); root.replaceChildren(button);
    let selectedModel = null;
    const paintButton = () => {
      button.querySelectorAll('img:not(.select-down-btn)').forEach(image => image.remove());
      label.textContent = selectedModel == null ? '全部模型' : models[selectedModel].name;
      if (selectedModel != null) {
        const logo = document.createElement('img'); logo.className = 'select-model-img arena-record-model'; logo.src = models[selectedModel].logo; logo.alt = ''; logo.setAttribute(scope, '');
        button.prepend(logo);
      }
    };
    const close = () => {
      root.querySelector('.dropdown')?.remove();
      arrow.classList.remove('select-up-btn');
      button.setAttribute('aria-expanded', 'false');
    };
    const open = () => {
      close();
      const dropdown = document.createElement('div'); dropdown.className = 'dropdown'; dropdown.setAttribute(scope, '');
      const options = [{ label:'全部模型', model:null }, ...models.map((model, index) => ({ label:model.name, model:index }))];
      options.forEach(option => {
        const item = document.createElement('button'); item.type = 'button'; item.className = 'option'; item.dataset.modelIndex = option.model == null ? '' : String(option.model); item.setAttribute(scope, '');
        if (option.model != null) {
          const logo = document.createElement('img'); logo.src = models[option.model].logo; logo.alt = ''; logo.setAttribute(scope, ''); item.appendChild(logo);
        }
        const text = document.createElement('span'); text.className = 'label'; text.textContent = option.label; text.setAttribute(scope, ''); item.appendChild(text);
        dropdown.appendChild(item);
      });
      root.appendChild(dropdown);
      arrow.classList.add('select-up-btn');
      button.setAttribute('aria-expanded', 'true');
    };
    let lastPointerAction = -1000;
    const toggleDropdown = event => {
      event.preventDefault(); event.stopPropagation();
      lastPointerAction = performance.now();
      root.querySelector('.dropdown') ? close() : open();
    };
    const chooseOption = event => {
      const option = event.target.closest('.option'); if (!option || !root.contains(option)) return;
      event.preventDefault(); event.stopPropagation();
      lastPointerAction = performance.now();
      selectedModel = option.dataset.modelIndex === '' ? null : Number(option.dataset.modelIndex);
      paintButton(); close(); root._arenaOnChange?.(selectedModel);
    };
    button.addEventListener('pointerdown', toggleDropdown);
    button.addEventListener('click', event => {
      event.preventDefault(); event.stopPropagation();
      if (performance.now() - lastPointerAction > 500) toggleDropdown(event);
    });
    root.addEventListener('pointerdown', chooseOption);
    root.addEventListener('click', event => {
      const option = event.target.closest('.option'); if (!option || !root.contains(option)) return;
      event.preventDefault(); event.stopPropagation();
      if (performance.now() - lastPointerAction > 500) chooseOption(event);
    });
    document.addEventListener('pointerdown', event => { if (!root.contains(event.target)) close(); });
    paintButton(); root._arenaOnChange?.(null);
  };

  const emptyStateMarkup = text => '<div class="empty-container arena-panel-empty"><img class="arena-empty-icon" src="/projects/llm/site/competition/llm/assets/empty-data.svg" alt=""><div class="empty-text">' + text + '</div></div>';

  const renderRecords = () => {
    const list = document.querySelector('.right-section > .trading-record .trading-list'); if (!list) return;
    const symbols = ['NVDA','QQQ','AMZN','GOOGL','TSLA','AU2411','AAPL','TL2512','MSFT'];
    const records = models.flatMap((model, modelIndex) => [0,1].map(sequence => ({
      modelIndex,
      side:(modelIndex + sequence) % 3 === 0 ? '做空' : '做多',
      symbol:symbols[modelIndex],
      time:'11/03 ' + String(14 - Math.floor(modelIndex / 3)).padStart(2,'0') + ':' + String(8 + modelIndex * 4 + sequence * 7).padStart(2,'0'),
      price:(182.46 + modelIndex * 27.35 + sequence * 3.18).toFixed(2),
      quantity:(7.2 + modelIndex * .63 + sequence * 1.14).toFixed(2),
      profit:(13800 - modelIndex * 615 - sequence * 940).toLocaleString('zh-CN',{minimumFractionDigits:2,maximumFractionDigits:2})
    })));
    const count = document.querySelector('.transaction-count');
    const paintRecords = selectedModel => {
      const visibleRecords = selectedModel == null ? records : records.filter(record => record.modelIndex === selectedModel);
      list.innerHTML = visibleRecords.length ? visibleRecords.map(record => {
        const model = models[record.modelIndex];
        return '<article class="trading-item arena-source-trade" data-v-38abcb37><div class="item-header" data-v-38abcb37><div class="item-left" data-v-38abcb37><span class="model-logo-small" data-v-38abcb37><img class="fallback-model-logo" src="' + model.logo + '" alt=""></span><span class="model-name-small" data-v-38abcb37>' + model.name + '</span><span class="trade-type ' + (record.side === '做多' ? 'trade-type-more' : 'trade-type-empty') + '" data-v-38abcb37>' + record.side + '</span><span class="trade-symbol" data-v-38abcb37>' + record.symbol + '</span></div><time class="trade-time" data-v-38abcb37>' + record.time + '</time></div><div class="item-content" data-v-38abcb37><div class="item-price" data-v-38abcb37><span>价格：</span><span>¥' + record.price + '</span><span class="price-arrow">→</span><span>¥' + record.price + '</span></div><div class="item-quantity" data-v-38abcb37><span>数量：</span><span>' + record.quantity + '</span></div></div><div class="item-profit profit-more" data-v-38abcb37><span>收益：</span><strong>+ ¥' + record.profit + '</strong></div></article>';
      }).join('') : emptyStateMarkup('暂无数据');
      if (count) count.textContent = '交易 ' + visibleRecords.length + ' 笔';
    };
    const filter = document.querySelector('.right-section .trading-record .filter-tag-text'); if (filter) filter.textContent = '最近';
    installStableModelSelect(document.querySelector('.right-section .trading-record .model-select'), paintRecords);
  };

  const renderChats = () => {
    const body = document.querySelector('.right-section > .model-chat .model-chat-container-body'); if (!body) return;
    const chats = window.matchMedia('(max-width:820px)').matches
      ? [[1,'11/04 10:00:53','当前组合与纳指相关性偏高，已减持特斯拉并增配现金，等待波动率回落后重新评估入场条件。'],[0,'11/04 09:56:28','英伟达突破盘中阻力位，成交量同步放大，模型准备分批建立多头仓位并限制单笔风险。'],[2,'11/04 09:48:16','苹果短周期动量转正，盈利预期修正提供支撑，先以小仓位验证信号稳定性。'],[3,'11/04 09:39:42','科技板块波动继续扩大，当前持仓保持不变，等待尾盘方向与市场宽度确认。'],[5,'11/04 09:31:05','组合回撤仍处于赛事目标区间内，现金仓位充足，继续控制每笔交易的风险预算。'],[4,'11/04 09:22:37','趋势信号逐步增强但成交量尚未确认，计划在关键价格突破后分两次加仓。'],[6,'11/04 09:14:20','行业配置保持均衡，组合波动低于上限，暂时不调整杠杆并继续观察相关性。'],[7,'11/04 09:05:46','黄金仓位完成阶段性止盈，剩余仓位上移止损，整体风险敞口已经明显下降。'],[8,'11/04 08:57:12','高波动标的减仓完成，现金比例提升，等待下一组通过风控校验的趋势信号。'],[0,'11/04 08:48:35','指数回踩关键均线但承接稳定，模型将继续观察成交量变化与盘口强弱。']]
      : [[0,'14:34','英伟达突破盘中阻力位，成交量同步放大。我将风险预算控制在组合的 1.8%，分两次建立多头仓位。'],[1,'14:21','当前组合与纳指相关性偏高，已减持特斯拉并增配现金，等待波动率回落后再评估。'],[2,'14:08','苹果短周期动量转正，盈利预期修正提供支撑，执行 100 股试探性买入。'],[3,'13:56','科技板块波动率继续放大，现有仓位维持不变，等待尾盘方向确认。'],[5,'13:43','组合回撤仍处于目标区间，现金仓位充足，暂不提高整体杠杆。'],[4,'13:29','趋势信号逐步增强，但成交量尚未确认，计划在突破后分批加仓。'],[6,'13:16','行业配置保持均衡，组合波动低于目标上限，暂时不调整杠杆水平。'],[7,'13:02','黄金仓位完成阶段性止盈，剩余仓位上移止损，整体风险敞口已经下降。'],[8,'12:48','高波动标的减仓完成，现金比例提升，等待新的趋势入场信号。'],[0,'12:35','指数回踩关键均线但承接稳定，继续观察成交量与市场宽度变化。']];
    const paintChats = selectedModel => {
      const visibleChats = selectedModel == null ? chats : chats.filter(chat => chat[0] === selectedModel);
      body.innerHTML = visibleChats.length
        ? visibleChats.map(chat => '<article class="model-chat-card" data-v-e552dab9><div class="card-item" data-v-e552dab9><div class="model-avatar" data-v-e552dab9 style="background-image:url(' + models[chat[0]].logo + ')"></div><div class="card-content" data-v-e552dab9><div class="card-content-header" data-v-e552dab9><span class="card-title" data-v-e552dab9>' + models[chat[0]].name + '</span><time class="timestamp" data-v-e552dab9>' + chat[1] + '</time></div><div class="card-content-body" data-v-e552dab9>' + chat[2] + '</div></div></div></article>').join('')
        : emptyStateMarkup('暂无数据');
    };
    installStableModelSelect(document.querySelector('.right-section > .model-chat .model-select'), paintChats);
  };

  const renderHoldings = () => {
    const body = document.querySelector('.right-section > .trading-holding .trading-holding-container-body'); if (!body) return;
    const holdings = [
      { model:0, value:'¥82,764', rows:[['NVDA','多','120','182.46','+3.26%'],['AAPL','多','100','278.31','+1.08%'],['TSLA','空','80','421.08','+0.74%']] },
      { model:1, value:'¥76,420', rows:[['QQQ','多','90','614.20','+2.18%'],['MSFT','多','70','409.66','+1.42%'],['TLT','空','110','88.35','+0.63%']] },
      { model:2, value:'¥69,580', rows:[['AMZN','多','85','231.74','+1.86%'],['META','多','60','668.92','+1.17%'],['AMD','空','95','203.41','+0.58%']] },
      { model:3, value:'¥64,936', rows:[['GOOGL','多','75','196.24','+1.64%'],['AVGO','多','55','352.18','+1.21%'],['NFLX','空','40','118.76','+0.46%']] },
      { model:5, value:'¥58,310', rows:[['SPY','多','65','681.42','+1.38%'],['COST','多','45','986.30','+0.92%'],['COIN','空','70','184.52','+0.41%']] }
    ];
    const columns = '<colgroup><col style="width:18%"><col style="width:16%"><col style="width:18%"><col style="width:24%"><col style="width:24%"></colgroup>';
    const paintHoldings = selectedModel => {
      const visibleHoldings = selectedModel == null ? holdings : holdings.filter(holding => holding.model === selectedModel);
      body.innerHTML = visibleHoldings.length ? visibleHoldings.map(holding => {
        const model = models[holding.model];
        return '<article class="trading-holding-card arena-holding-card" data-v-cad7c3f5><header class="card-header" data-v-cad7c3f5><h3 class="card-title" data-v-cad7c3f5><span class="model-avatar" data-v-cad7c3f5 style="background-image:url(' + model.logo + ')"></span>' + model.name + '</h3><p class="total-value" data-v-cad7c3f5>持仓市值 ' + holding.value + '</p></header><div class="table-container" data-v-cad7c3f5><table class="holding-table" data-v-cad7c3f5>' + columns + '<thead><tr><th>标的</th><th>方向</th><th>数量</th><th>成本</th><th>盈亏</th></tr></thead><tbody>' + holding.rows.map(row => '<tr class="table-row"><td>' + row[0] + '</td><td class="' + (row[1] === '多' ? 'direction-long' : 'direction-short') + '">' + row[1] + '</td><td>' + row[2] + '</td><td>' + row[3] + '</td><td class="pnl-profit">' + row[4] + '</td></tr>').join('') + '</tbody></table></div></article>';
      }).join('') : emptyStateMarkup('暂无数据');
    };
    installStableModelSelect(document.querySelector('.right-section > .trading-holding .model-select'), paintHoldings);
  };

  const installFilterStabilityGuard = () => {
    const section = document.querySelector('.llm-content > .right-section');
    if (!section || section.dataset.filterStabilityGuard === 'true') return;
    section.dataset.filterStabilityGuard = 'true';
    let queued = false;
    new MutationObserver(() => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        if (section.querySelector('.trading-record .model-select:not(.arena-stable-select)')) renderRecords();
        if (section.querySelector('.model-chat .model-select:not(.arena-stable-select)')) renderChats();
        if (section.querySelector('.trading-holding .model-select:not(.arena-stable-select)')) renderHoldings();
      });
    }).observe(section, { childList:true, subtree:true });
  };

  const renderChampionPrediction = () => {
    const host = document.querySelector('.right-section > .champion-prediction');
    if (!host || host.querySelector('.arena-champion')) return;
    const odds = [2.08,2.36,3.14,3.68,4.25,4.72,5.18,5.66,6.12];
    const percentages = [82,68,56,49,44,39,34,30,26];
    const prizes = [
      ['/projects/llm/site/_nuxt/award1.D8_JsMYt.png','iPhone 17 Pro Max','第1名'],
      ['/projects/llm/site/_nuxt/award2.DWhpMzmX.png','MacBook Air 13英寸','第2名'],
      ['/projects/llm/site/_nuxt/award4.C0WSWQnH.png','Apple Watch Series 11','第3名']
    ];
    const users = [['Mia_Quant','2.08','14:26:18'],['AlphaLin','2.12','14:19:42'],['Researcher_07','2.20','13:58:06'],['PandaFan','2.31','13:42:15'],['QuantPilot','2.45','13:27:09']];
    host.innerHTML = '<div class="arena-champion"><header class="champion-toolbar"><label><details class="champion-sort-picker arena-competition-picker"><summary><span class="arena-picker-value">账户权益</span><img class="select-chevron" src="/projects/llm/site/competition/llm/assets/select-chevron.svg" alt=""></summary><div class="arena-competition-options"><button class="is-active" type="button">账户权益</button><button type="button">收益率</button><button type="button">胜率</button></div></details></label><span>选择你预测的冠军</span></header><section class="champion-ranking" aria-label="冠军候选排名">' + models.map((model,index) => '<button class="champion-row' + (index === 0 ? ' is-selected' : '') + '" type="button" data-model="' + index + '"><span class="champion-rank">' + (index + 1) + '</span><img src="' + model.logo + '" alt=""><span class="champion-name">' + model.name + '</span><span class="champion-meter" style="--prediction-color:' + model.color + '"><i style="width:' + percentages[index] + '%"></i></span><strong>¥' + model.value.toLocaleString('zh-CN') + '</strong></button>').join('') + '</section><div class="champion-current"><span>您已预测：<strong class="champion-choice">' + models[0].name + '</strong></span><span>赔率 <strong class="champion-odds">' + odds[0].toFixed(2) + '</strong></span><button type="button">确认预测</button></div><section class="champion-prizes"><h3>奖品说明</h3><div>' + prizes.map(prize => '<article><img src="' + prize[0] + '" alt=""><strong>' + prize[1].replace('13英寸','<span class="champion-prize-unit">13英寸</span>') + '</strong><span>' + prize[2] + '</span></article>').join('') + '</div></section><section class="champion-users"><h3>用户排名</h3><div class="champion-user-head"><span>用户</span><span>赔率</span><span>预测时间</span></div>' + users.map((user,index) => '<div class="champion-user-row"><span>' + (index+1) + '　' + user[0] + '</span><strong>' + user[1] + '</strong><time>' + user[2] + '</time></div>').join('') + '</section></div>';
    wireCompetitionPickers(host);
    const choice = host.querySelector('.champion-choice'), odd = host.querySelector('.champion-odds'), confirm = host.querySelector('.champion-current button');
    host.querySelectorAll('.champion-row').forEach((row,index) => row.addEventListener('click', () => {
      host.querySelectorAll('.champion-row').forEach(item => item.classList.toggle('is-selected', item === row));
      if (choice) choice.textContent = models[index].name;
      if (odd) odd.textContent = odds[index].toFixed(2);
      if (confirm) confirm.textContent = '确认预测';
    }));
    confirm?.addEventListener('click', () => { confirm.textContent = '预测成功'; confirm.classList.add('is-confirmed'); });
  };

  const installTabs = () => {
    const section = document.querySelector('.llm-content > .right-section'); if (!section) return;
    const tabList = section.querySelector(':scope > .items .left-items');
    const originalTabs = [...section.querySelectorAll(':scope > .items .left-items .item')];
    if (tabList && originalTabs.length === 3 && !tabList.dataset.sourceOrder) {
      const recordTab = originalTabs.find(tab => /交易记录/.test(tab.textContent));
      const chatTab = originalTabs.find(tab => /模型对话/.test(tab.textContent));
      const holdingTab = originalTabs.find(tab => /交易持仓|当前持仓/.test(tab.textContent));
      if (holdingTab) holdingTab.textContent = '当前持仓';
      [recordTab, holdingTab, chatTab].filter(Boolean).forEach(tab => tabList.appendChild(tab));
      tabList.dataset.sourceOrder = 'true';
    }
    const views = [section.querySelector('.trading-record'),section.querySelector('.trading-holding'),section.querySelector('.model-chat'),section.querySelector('.champion-prediction')];
    const tabs = [...section.querySelectorAll(':scope > .items .item')], champion = section.querySelector(':scope > .items .right-items');
    const show = index => {
      views.forEach((view, viewIndex) => { if (view) view.style.display = viewIndex === index ? '' : 'none'; });
      tabs.forEach((tab, tabIndex) => tab.classList.toggle('is-active', tabIndex === index));
      champion?.classList.toggle('is-active', index === 3);
    };
    tabs.forEach((tab, index) => tab.addEventListener('click', () => show(index))); champion?.addEventListener('click', () => show(3));
    show(Math.max(0, Math.min(3, Number(new URLSearchParams(location.search).get('panel') || 0))));
  };

  const installSourceLogo = () => {
    const title = document.querySelector('.nav-left .logo .title');
    if (title) {
      title.innerHTML = '<span class="brand-word">PandaAI</span><span class="contest-word"><span class="contest-latin">LLM</span><span class="contest-cn">对抗赛</span></span>';
      title.setAttribute('aria-label', 'PandaAI LLM对抗赛');
    }
    document.querySelectorAll('.llm-navbar > .menu .menu-item').forEach((item,index) => { item.textContent = ['实时','排行榜','模型'][index] || item.textContent; });
    document.querySelectorAll('.llm-wrapper > .menu .menu-item').forEach((item,index) => { item.textContent = ['实时','排行榜','模型详情'][index] || item.textContent; });
    const navRight = document.querySelector('.llm-navbar .nav-right');
    if (navRight && !navRight.dataset.arenaActions) {
      const links = navRight.querySelector('.link');
      if (links) {
        const official = [...links.querySelectorAll('span')].find(node => /前往官网|返回官网/.test(node.textContent.trim()));
        const rules = [...links.querySelectorAll('span')].find(node => /规则介绍/.test(node.textContent.trim()));
        if (official) official.textContent = '官方网站';
        if (rules) rules.textContent = '规则介绍';
        const join = document.createElement('button');
        join.type = 'button';
        join.className = 'arena-join-link';
        join.setAttribute('aria-label', '我要参赛');
        join.innerHTML = '<span>我要参赛</span><img src="/projects/llm/site/competition/llm/assets/join-smile.svg" alt="">';
        links.before(join);
        const joinMedia = window.matchMedia('(max-width: 768px)');
        const syncJoinState = () => {
          join.dataset.arenaLoginEntry = 'true';
          if (joinMedia.matches) {
            join.removeAttribute('aria-disabled');
            join.removeAttribute('tabindex');
          } else {
            join.setAttribute('aria-disabled', 'true');
            join.setAttribute('tabindex', '-1');
          }
        };
        join.addEventListener('click', event => {
          if (joinMedia.matches) {
            goToLogin(event);
            return;
          }
          event.preventDefault();
          event.stopPropagation();
          event.stopImmediatePropagation();
        });
        syncJoinState();
        if (typeof joinMedia.addEventListener === 'function') joinMedia.addEventListener('change', syncJoinState);
        else joinMedia.addListener?.(syncJoinState);
      }
      const login = navRight.querySelector('.login-btn');
      if (login) {
        login.classList.add('arena-profile-link');
        const button = login.querySelector('.btn');
        if (button) {
          if (button.dataset.arenaLoginReady !== 'true') {
            button.dataset.arenaLoginReady = 'true';
            button.addEventListener('click', goToLogin, true);
          }
          button.textContent = '';
          const label = document.createElement('span');
          label.textContent = '登录';
          button.appendChild(label);
          const arrow = document.createElement('img');
          arrow.className = 'arena-profile-arrow';
          arrow.src = '/projects/llm/site/competition/llm/assets/profile-arrow-up-right.svg';
          arrow.alt = '';
          button.appendChild(arrow);
        }
      }
      navRight.dataset.arenaActions = 'true';
    }
    if (navRight && !navRight.querySelector('.arena-mobile-menu')) {
      const toggle = document.createElement('button');
      toggle.type = 'button'; toggle.className = 'arena-mobile-menu'; toggle.setAttribute('aria-label', '打开菜单');
      toggle.innerHTML = '<img src="/projects/llm/site/competition/llm/assets/bullet-menu.png" alt="">';
      navRight.appendChild(toggle);
      toggle.addEventListener('click', () => document.querySelector('.llm-wrapper > .menu')?.scrollIntoView({ behavior:'smooth', block:'start' }));
    }
  };

  const installMobileExperience = () => {
    const wrapper = document.querySelector('.llm-wrapper');
    const navbar = document.querySelector('.llm-navbar');
    const live = document.querySelector('.llm-live');
    const right = document.querySelector('.llm-content > .right-section');
    if (!wrapper || !navbar || !live || !right || wrapper.dataset.mobileExperience === 'true') return;
    wrapper.dataset.mobileExperience = 'true';

    const brandMarkup = '<span class="arena-mobile-brand-mark">' + (navbar.querySelector('.nav-left svg')?.outerHTML || '') + '</span><strong>TQX</strong><b>×</b><span class="arena-mobile-gatl"><img src="' + models[1].logo + '" alt=""><strong>GATL</strong></span>';
    const mobileBrand = document.createElement('div');
    mobileBrand.className = 'arena-mobile-brand';
    mobileBrand.setAttribute('aria-label', 'TQX × GATL');
    mobileBrand.innerHTML = brandMarkup;
    navbar.querySelector('.nav-left')?.appendChild(mobileBrand);

    const popup = document.createElement('aside');
    popup.className = 'arena-mobile-nav-popup';
    popup.setAttribute('aria-hidden', 'true');
    popup.innerHTML = '<button type="button" data-mobile-link="login">登录/注册</button><button type="button" data-mobile-link="home">返回首页</button><button type="button" data-mobile-link="profile">个人中心</button><button type="button" data-mobile-link="rules">规则介绍</button><div class="arena-mobile-language" role="group" aria-label="语言"><button type="button" class="is-active">CN</button><button type="button">EN</button><button type="button">HK</button></div>';
    navbar.after(popup);

    const toggle = navbar.querySelector('.arena-mobile-menu');
    const closePopup = () => {
      popup.classList.remove('is-open');
      popup.setAttribute('aria-hidden', 'true');
      toggle?.setAttribute('aria-expanded', 'false');
    };
    toggle?.setAttribute('aria-expanded', 'false');
    toggle?.addEventListener('click', event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      const open = popup.classList.toggle('is-open');
      popup.setAttribute('aria-hidden', String(!open));
      toggle.setAttribute('aria-expanded', String(open));
    }, true);
    popup.querySelector('[data-mobile-link="home"]')?.addEventListener('click', returnHome);
    popup.querySelector('[data-mobile-link="rules"]')?.addEventListener('click', () => {
      closePopup();
      closeMobilePanel();
      setChatOpen(false);
      openInlineRules();
    });
    popup.querySelector('[data-mobile-link="login"]')?.addEventListener('click', goToLogin);
    popup.querySelector('[data-mobile-link="profile"]')?.addEventListener('click', goToLogin);
    popup.querySelectorAll('.arena-mobile-language button').forEach(button => button.addEventListener('click', () => {
      popup.querySelectorAll('.arena-mobile-language button').forEach(item => item.classList.toggle('is-active', item === button));
    }));
    document.addEventListener('click', event => { if (!popup.contains(event.target) && !toggle?.contains(event.target)) closePopup(); });

    const market = document.createElement('section');
    market.className = 'arena-mobile-markets';
    market.setAttribute('aria-label', '市场行情');
    const marketData = [
      ['恒生指数','AU1231','¥42300.55','▼','down'],
      ['恒生科技指数','AU1231','¥13,001.55','▲','up'],
      ['纳斯达克','AU1231','¥13,001.55','▲','up'],
      ['道琼斯','AU1231','¥13,001.55','▲','up'],
      ['黄金','AU1231','¥13,001.55','▲','up']
    ];
    market.innerHTML = marketData.map(item => '<article><strong>' + item[0] + '</strong><span>' + item[1] + '</span><small>' + item[2] + ' <i class="' + item[4] + '">' + item[3] + '</i></small></article>').join('');
    live.prepend(market);

    const bottom = document.createElement('nav');
    bottom.className = 'arena-mobile-bottom-nav';
    bottom.setAttribute('aria-label', '实时功能');
    const crown = right.querySelector(':scope > .items .right-items img')?.getAttribute('src') || '/projects/llm/site/competition/llm/assets/join-smile.svg';
    bottom.innerHTML = '<button type="button" data-mobile-panel="record">交易记录</button><button type="button" data-mobile-panel="holding">当前持仓</button><button type="button" class="arena-mobile-champion" data-mobile-panel="champion"><img src="' + crown + '" alt="冠军预测"><span>冠军预测</span></button><button type="button" data-mobile-panel="dialogue">模型对话</button><button type="button" data-mobile-panel="chatroom">聊天室</button>';
    bottom.hidden = Number(new URLSearchParams(location.search).get('page') || 0) !== 0;
    wrapper.appendChild(bottom);

    const mobilePanel = document.createElement('section');
    mobilePanel.className = 'arena-mobile-panel-view';
    mobilePanel.setAttribute('aria-hidden', 'true');
    mobilePanel.innerHTML = '<header><button class="arena-mobile-panel-back" type="button" aria-label="返回实时"></button><h2></h2></header><div class="arena-mobile-panel-body"></div>';
    wrapper.appendChild(mobilePanel);
    let activeMobileView = null;
    let activeMobileAnchor = null;
    const closeMobilePanel = () => {
      if (activeMobileView && activeMobileAnchor?.parentNode) activeMobileAnchor.replaceWith(activeMobileView);
      activeMobileView = null;
      activeMobileAnchor = null;
      mobilePanel.classList.remove('is-open');
      mobilePanel.setAttribute('aria-hidden', 'true');
      document.documentElement.classList.remove('arena-mobile-panel-open');
      bottom.querySelectorAll('button').forEach(item => item.classList.remove('is-active'));
    };
    const openMobilePanel = (view, title) => {
      closeMobilePanel();
      if (!view?.parentNode) return;
      activeMobileAnchor = document.createComment('mobile-panel-anchor');
      view.before(activeMobileAnchor);
      activeMobileView = view;
      view.style.display = '';
      mobilePanel.querySelector('h2').textContent = title;
      mobilePanel.querySelector('.arena-mobile-panel-body').appendChild(view);
      mobilePanel.classList.add('is-open');
      mobilePanel.setAttribute('aria-hidden', 'false');
      document.documentElement.classList.add('arena-mobile-panel-open');
      mobilePanel.scrollTop = 0;
    };
    mobilePanel.querySelector('.arena-mobile-panel-back')?.addEventListener('click', closeMobilePanel);

    const chatroom = document.createElement('section');
    chatroom.className = 'arena-mobile-chatroom';
    chatroom.setAttribute('aria-hidden', 'true');
    const avatarOne = '/projects/llm/site/competition/llm/assets/contestant-deepseek-avatar.png';
    const avatarTwo = '/projects/llm/site/_nuxt/avatars-8.tuvRI-Cy.png';
    const message = '本轮量化对抗赛进入高波动阶段，模型根据实时行情重新计算仓位与风险预算。当前策略降低了高相关资产的集中度，并将止损线随净值上移；若成交量与趋势信号同时确认，将分批建立新仓。赛事排名仍以账户权益、收益率与回撤控制综合评估，后续会继续公开每笔调仓依据和风控结果，方便参赛者复盘模型决策。';
    const rows = [
      [avatarOne,'荆棘SAMA','11/04 10:00:53','left','查看原文'],
      [avatarTwo,'荆棘SAMA','11/04 10:00:53','left','点击翻译'],
      [avatarOne,'荆棘SAMA','11/04 10:00:53','right','点击翻译'],
      [avatarTwo,'荆棘SAMA','11/04 10:00:53','left','点击翻译']
    ];
    chatroom.innerHTML = '<header><button class="arena-chat-back" type="button" aria-label="返回实时">←</button><details class="arena-chat-history arena-competition-picker"><summary><span class="arena-picker-value">历史记录</span><img class="select-chevron" src="/projects/llm/site/competition/llm/assets/select-chevron.svg" alt=""></summary><div class="arena-competition-options"><button class="is-active" type="button">2026第一季度</button><button type="button">2025第四季度</button><button type="button">2025第三季度</button></div></details></header><main>' + rows.map((row,index) => '<article class="arena-chat-message ' + row[3] + '"><div class="arena-chat-meta"><img src="' + row[0] + '" alt=""><strong>' + row[1] + '</strong>' + (index === 0 ? '<span>2026第一季度</span><b>12名</b>' : '') + '<time>' + row[2] + '</time></div><div class="arena-chat-bubble"><p>' + (index === 2 ? message.slice(0,82) : message) + '</p><button type="button">' + row[4] + '</button></div></article>').join('') + '</main><button class="arena-chat-compose-toggle" type="button" aria-label="输入留言"><img src="/projects/llm/site/competition/llm/assets/chat-compose.svg" alt=""></button><form class="arena-chat-composer"><textarea aria-label="输入留言内容" placeholder="输入留言内容"></textarea><button class="arena-chat-emoji" type="button" aria-label="表情">☺</button><button class="arena-chat-send" type="submit">发送 ↑</button></form>';
    wrapper.appendChild(chatroom);
    wireCompetitionPickers(chatroom);

    const setChatOpen = open => {
      if (open) closeMobilePanel();
      chatroom.classList.toggle('is-open', open);
      chatroom.setAttribute('aria-hidden', String(!open));
      document.documentElement.classList.toggle('arena-chatroom-open', open);
      bottom.querySelectorAll('button').forEach(button => button.classList.toggle('is-active', open && button.dataset.mobilePanel === 'chatroom'));
      if (!open) chatroom.classList.remove('is-composing');
    };
    chatroom.querySelector('.arena-chat-back')?.addEventListener('click', () => setChatOpen(false));
    chatroom.querySelector('.arena-chat-compose-toggle')?.addEventListener('click', () => chatroom.classList.add('is-composing'));
    chatroom.querySelector('.arena-chat-composer')?.addEventListener('submit', event => {
      event.preventDefault();
      const textarea = event.currentTarget.querySelector('textarea');
      if (!textarea.value.trim()) return;
      textarea.value = '';
      chatroom.classList.remove('is-composing');
    });
    bottom.querySelectorAll('[data-mobile-panel]').forEach(button => button.addEventListener('click', () => {
      const panel = button.dataset.mobilePanel;
      if (panel === 'chatroom') { setChatOpen(true); return; }
      setChatOpen(false);
      bottom.querySelectorAll('button').forEach(item => item.classList.toggle('is-active', item === button));
      if (panel === 'record') { right.querySelector('.left-items .item:nth-child(1)')?.click(); openMobilePanel(right.querySelector(':scope > .trading-record'), '交易记录'); }
      if (panel === 'holding') { right.querySelector('.left-items .item:nth-child(2)')?.click(); openMobilePanel(right.querySelector(':scope > .trading-holding'), '当前持仓'); }
      if (panel === 'dialogue') { right.querySelector('.left-items .item:nth-child(3)')?.click(); openMobilePanel(right.querySelector(':scope > .model-chat'), '模型对话'); }
      if (panel === 'champion') { right.querySelector(':scope > .items .right-items')?.click(); openMobilePanel(right.querySelector(':scope > .champion-prediction'), '冠军预测'); }
      bottom.querySelectorAll('button').forEach(item => item.classList.toggle('is-active', item === button));
    }));
    const chartTitle = live.querySelector('.arena-chart-title');
    const mobileBreakpoint = window.matchMedia('(max-width:820px)');
    const renderResponsiveChartTitle = () => {
      if (!chartTitle) return;
      if (mobileBreakpoint.matches) {
        if (!chartTitle.querySelector('.arena-chart-group-picker')) {
          chartTitle.innerHTML = '<details class="arena-chart-group-picker arena-competition-picker"><summary><span class="arena-picker-value">轻量级组</span><img class="select-chevron" src="/projects/llm/site/competition/llm/assets/select-chevron.svg" alt=""></summary><div class="arena-competition-options"><button class="is-active" type="button">轻量级组</button><button type="button">中量级组</button><button type="button">重量级组</button><button type="button">超重量级组</button></div></details>';
          wireCompetitionPickers(chartTitle);
        }
      } else if (chartTitle.querySelector('.arena-chart-group-picker')) {
        chartTitle.textContent = '全部账户权益';
      }
    };
    const reconcileResponsiveExperience = () => {
      wrapper.querySelectorAll('.arena-competition-picker[open]').forEach(picker => picker.removeAttribute('open'));
      if (!mobileBreakpoint.matches) {
        closePopup();
        closeMobilePanel();
        setChatOpen(false);
      }
      renderResponsiveChartTitle();
      requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
    };
    if (typeof mobileBreakpoint.addEventListener === 'function') mobileBreakpoint.addEventListener('change', reconcileResponsiveExperience);
    else mobileBreakpoint.addListener(reconcileResponsiveExperience);
    renderResponsiveChartTitle();
  };

  const enforceTypographyMinimums = () => {
    const root = document.querySelector('.llm-container');
    if (!root) return;
    const apply = scope => {
      const sizes = [];
      [scope, ...scope.querySelectorAll('*')].forEach(element => {
        if (/^(CANVAS|SVG|PATH|STYLE|SCRIPT)$/.test(element.tagName)) return;
        if (element.closest('.left-section .footer')) return;
        if (element.matches('.champion-name,.champion-row > strong,.champion-user-row > span,.champion-user-row > strong,.champion-user-row > time')) return;
        const ownText = [...element.childNodes].filter(node => node.nodeType === Node.TEXT_NODE).map(node => node.textContent).join('').trim();
        if (!ownText) return;
        const minimum = /[\u3400-\u9fff\uf900-\ufaff]/.test(ownText) ? 12 : 10;
        const size = parseFloat(getComputedStyle(element).fontSize);
        if (Number.isFinite(size) && size < minimum) sizes.push([element, minimum]);
      });
      for (const [element, minimum] of sizes) element.style.setProperty('font-size', minimum + 'px', 'important');
    };
    apply(root);
    if (livePreviewOnly) return;
    if (!root.dataset.typographyMinimumObserver) {
      let queued = false;
      new MutationObserver(mutations => {
        if (queued) return;
        const newContent = mutations.filter(mutation => {
          const target = mutation.target.nodeType === Node.ELEMENT_NODE ? mutation.target : mutation.target.parentElement;
          // Existing chart prices were normalized at startup. Their numeric
          // updates don't need another computed-style read on every frame.
          return !target?.closest('.arena-model-marker .price');
        });
        if (!newContent.length) return;
        queued = true;
        requestAnimationFrame(() => {
          newContent.forEach(mutation => mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) apply(node);
            else if (node.parentElement) apply(node.parentElement);
          }));
          queued = false;
        });
      }).observe(root, { childList:true, subtree:true, characterData:true });
      root.dataset.typographyMinimumObserver = 'true';
    }
  };

  let bootAttempts = 0;
  let prebootRevealScheduled = false;
  let fontStableRevealScheduled = false;
  const revealPreboot = () => {
    document.documentElement.classList.remove('llm-preboot');
    document.getElementById('llm-first-frame-guard')?.remove();
    document.getElementById('llm-return-frame-guard')?.remove();
  };
  const revealAfterCriticalFonts = () => {
    if (fontStableRevealScheduled) return;
    fontStableRevealScheduled = true;
    // The static arena is already complete at this point. Never keep the real
    // page hidden while waiting for optional font decoding: that produced a
    // visible blank frame in WebKit and Firefox after DOMContentLoaded.
    revealPreboot();
    if (!document.fonts?.load) {
      return;
    }
    const criticalFonts = [
      document.fonts.load('16px fusion-pixel'),
      document.fonts.load('16px Dream'),
      document.fonts.load('16px DreamBraveCN'),
      document.fonts.load('16px PuHuiTi_Regular'),
    ];
    Promise.allSettled(criticalFonts).catch(() => {});
  };
  const yieldPreviewFrame = () => {
    if (!portfolioPreview) return;
    return new Promise(resolve => {
      const deadline = setTimeout(() => {
        cancelAnimationFrame(frame);
        resolve();
      }, 80);
      const frame = requestAnimationFrame(() => {
        clearTimeout(deadline);
        setTimeout(resolve, 0);
      });
    });
  };
  const boot = () => {
    void mountArena().catch(error => {
      const container = document.querySelector('.llm-container');
      if (container) container.dataset.arenaBooting = 'false';
      revealPreboot();
      console.error('[LLM compatibility] enhancement boot failed', error);
    });
  };
  const mountArena = async () => {
    const container = document.querySelector('.llm-container');
    if (container) container.dataset.arenaBooting = 'true';
    const params = new URLSearchParams(location.search);
    const page = Math.max(0, Math.min(2, Number(params.get('page') || 0)));
    installReturnLogic(); installSourceLogo(); installMarketLeader();
    await yieldPreviewFrame();
    installChart();
    await yieldPreviewFrame();
    if (!livePreviewOnly && page === 1) {
      const rankingView = params.get('view');
      if (rankingView === 'ladder') installLeaderboard();
      else if (rankingView === 'tournament') installTournament();
      else if (rankingView === 'analysis') installAnalysis();
      else installRankingHub();
    } else if (!livePreviewOnly) installRankingHub();
    if (!livePreviewOnly) installModelDetails();
    priceModelCards(); installFooterWheelScroll(); installLeaderboardTailScroll(); renderRecords(); renderChats(); renderHoldings();
    await yieldPreviewFrame();
    installFilterStabilityGuard(); renderChampionPrediction(); installTabs(); installMainNavigation(); installMobileExperience(); installReturnLogic();
    await yieldPreviewFrame();
    enforceTypographyMinimums();
    bootAttempts += 1;
    const ready = page === 0 ? document.querySelector('.arena-chart-fallback') : page === 1 ? document.querySelector('.arena-ranking-hub,.arena-leaderboard,.arena-tournament,.arena-analysis') : document.querySelector('.arena-model-detail');
    if (ready) {
      if (!prebootRevealScheduled) {
        prebootRevealScheduled = true;
        installSourceLogo();
        installMainNavigation();
        const restoredContainer = document.querySelector('.llm-container');
        if (restoredContainer) {
          restoredContainer.dataset.arenaBooting = 'false';
          restoredContainer.dataset.arenaBootReady = 'true';
        }
        revealAfterCriticalFonts();
      }
    } else if (bootAttempts < 120) {
      setTimeout(boot, 25);
    }
  };
  let recoveryQueued = false;
  const recoverCompetitionRoute = () => {
    if (location.pathname !== '/projects/llm/site/competition/llm' && location.pathname !== '/projects/llm/site/competition/llm/' && location.pathname !== '/projects/llm/site/competition/llm/index.html') return;
    const container = document.querySelector('.llm-container');
    if (!container || container.dataset.arenaBootReady === 'true' || container.dataset.arenaBooting === 'true' || recoveryQueued) return;
    recoveryQueued = true;
    armReturnFrameGuard();
    bootAttempts = 0;
    prebootRevealScheduled = false;
    fontStableRevealScheduled = false;
    requestAnimationFrame(() => {
      recoveryQueued = false;
      boot();
    });
  };
  window.addEventListener('popstate', () => {
    if (location.pathname !== '/projects/llm/site/competition/llm' && location.pathname !== '/projects/llm/site/competition/llm/' && location.pathname !== '/projects/llm/site/competition/llm/index.html') return;
    armReturnFrameGuard();
    setTimeout(recoverCompetitionRoute, 0);
  });
  const routeRecoveryObserver = new MutationObserver(recoverCompetitionRoute);
  const start = () => {
    routeRecoveryObserver.observe(document.body, { childList:true, subtree:true });
    try {
      boot();
    } catch (error) {
      revealPreboot();
      console.error('[LLM compatibility] enhancement boot failed', error);
    }
    // The page must never remain permanently hidden if either the native app or
    // the enhancement layer fails. A visible native shell is safer than black.
    window.setTimeout(() => {
      if (!document.querySelector('.llm-container')?.dataset.arenaBootReady) revealPreboot();
    }, 3000);
  };
  if (document.readyState === 'loading') window.addEventListener('DOMContentLoaded', start, { once: true }); else start();
})();
