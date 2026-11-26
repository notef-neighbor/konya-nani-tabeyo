(() => {
  "use strict";

  const STORAGE_KEY = "konya_nani_tabeyo_items_v1";
  const SOUND_KEY = "konya_nani_tabeyo_sound_v1";

  const CATEGORY_LABELS = {
    everyday: "定番ごはん",
    indulgent: "ちょっと贅沢",
    wildcard: "変わり種",
    custom: "マイ追加",
  };

  // デフォルトのお品書き（全48品：定番20・ちょっと贅沢16・変わり種12）
  const DEFAULT_DISHES = [
    // 定番ごはん（20品）
    { id: "def-01", name: "豚の生姜焼き定食", comment: "甘辛いタレと千切りキャベツ、白米が止まらない鉄板の王道。", category: "everyday" },
    { id: "def-02", name: "ふわとろ親子丼", comment: "出汁香る半熟たまごと鶏肉のやさしさ、お味噌汁も添えて。", category: "everyday" },
    { id: "def-03", name: "じっくり煮込んだ肉じゃが", comment: "ほくほくのじゃがいもに味が染みて、なんだかホッとする夜。", category: "everyday" },
    { id: "def-04", name: "サバの味噌煮定食", comment: "こっくり甘味噌でご飯が二杯いける、和食の底力。", category: "everyday" },
    { id: "def-05", name: "おうちカレーライス", comment: "翌日の楽しみまで付いてくる、裏切らない今夜の主役。", category: "everyday" },
    { id: "def-06", name: "鶏の唐揚げ（レモン添え）", comment: "外カリ中ジュワ、マヨネーズかおろしポン酢で味変も最高。", category: "everyday" },
    { id: "def-07", name: "町中華のチャーハン＆餃子", comment: "パラパラ炒飯とパリッと焼き餃子、無敵のゴールデンコンビ。", category: "everyday" },
    { id: "def-08", name: "とろけるオムライス", comment: "ケチャップ派もデミグラス派も、スプーンを入れる瞬間が幸せ。", category: "everyday" },
    { id: "def-09", name: "具だくさん豚汁と塩おにぎり", comment: "ごま油香る熱々の豚汁があれば、それだけで立派なごちそう。", category: "everyday" },
    { id: "def-10", name: "旨辛・麻婆豆腐", comment: "山椒をひと振りすれば、白米がみるみる消えていく魔法。", category: "everyday" },
    { id: "def-11", name: "ソース香る鉄板焼きそば", comment: "青のりと紅しょうが、目玉焼きを乗せたら屋台気分。", category: "everyday" },
    { id: "def-12", name: "鮭の塩焼きと大根おろし", comment: "パリッとした皮まで美味しい、シンプルイズベストの極み。", category: "everyday" },
    { id: "def-13", name: "喫茶店風ナポリタン", comment: "ちょっと焦げ目のついた太麺に粉チーズとタバスコをたっぷり。", category: "everyday" },
    { id: "def-14", name: "熱々・鍋焼きうどん", comment: "ぐつぐつ湯気と落とし卵、心までぽかぽかに温まる一杯。", category: "everyday" },
    { id: "def-15", name: "肉汁あふれるハンバーグ", comment: "こんがり焼き目と和風おろし、または濃厚デミソースで。", category: "everyday" },
    { id: "def-16", name: "揚げたてカツ丼", comment: "サクサク衣に出汁と卵が絡む、今日頑張った自分へのエール。", category: "everyday" },
    { id: "def-17", name: "シャキシャキ回鍋肉", comment: "甘味噌キャベツと豚バラ肉、箸が休まる暇がない旨さ。", category: "everyday" },
    { id: "def-18", name: "ざるそばと揚げたて天ぷら", comment: "ちゅるっと喉越し爽やか、えび天とかぼちゃ天は外せない。", category: "everyday" },
    { id: "def-19", name: "ホクホクお肉屋さんのコロッケ定食", comment: "ソースをたっぷりかけて、懐かしい夕暮れの味を満喫。", category: "everyday" },
    { id: "def-20", name: "きのこと鶏の炊き込みご飯", comment: "蓋を開けた瞬間の湯気と香りで、もう今夜の優勝が確定。", category: "everyday" },

    // ちょっと贅沢（16品）
    { id: "def-21", name: "とろける国産牛のすき焼き", comment: "割り下の甘い香りと溶き卵、今夜はちょっと特別に。", category: "indulgent" },
    { id: "def-22", name: "香ばしいうな重", comment: "ふっくら蒲焼きに山椒をぱらり。明日への元気をフルチャージ。", category: "indulgent" },
    { id: "def-23", name: "ちょっといい皿もOKな回転寿司", comment: "サーモンから中トロまで、今日の気分で好きなだけ。", category: "indulgent" },
    { id: "def-24", name: "ジュウジュウ焼肉ナイト", comment: "タン塩からカルビ、〆の冷麺まで妄想するだけで幸せ。", category: "indulgent" },
    { id: "def-25", name: "ぷりぷり博多もつ鍋", comment: "にんにくとニラの香りに包まれる、至福のあったか鍋。", category: "indulgent" },
    { id: "def-26", name: "焼き鳥盛り合わせと冷えた一杯", comment: "ねぎま、つくね、皮は塩？タレ？おうち居酒屋が開店。", category: "indulgent" },
    { id: "def-27", name: "豪華・海鮮丼", comment: "宝石みたいに輝くお刺身を、わさび醤油で豪快にかきこむ。", category: "indulgent" },
    { id: "def-28", name: "厚切りロースとんかつ", comment: "サクッと衣の向こうからじゅわっと脂の甘み、キャベツはおかわり。", category: "indulgent" },
    { id: "def-29", name: "とろ〜りチーズタッカルビ", comment: "甘辛チキンに伸びるチーズ、背徳感すらスパイスになる。", category: "indulgent" },
    { id: "def-30", name: "豚しゃぶ（ごまだれ＆ポン酢）", comment: "野菜もたっぷり食べられるのに、満足感はしっかりごちそう。", category: "indulgent" },
    { id: "def-31", name: "鉄板お好み焼き＆もんじゃ", comment: "ヘラでハフハフ、ソースとマヨの芸術を楽しむ夜。", category: "indulgent" },
    { id: "def-32", name: "海老どっさり天丼", comment: "甘辛の丼つゆが染みたご飯、最後の一粒までたまらない。", category: "indulgent" },
    { id: "def-33", name: "ガーリック香るステーキ丼", comment: "レアに焼いたお肉にバター醤油、ワイルドに頬張ろう。", category: "indulgent" },
    { id: "def-34", name: "海老とマッシュルームのアヒージョ", comment: "熱々オイルにバゲットを浸して、バル気分で乾杯。", category: "indulgent" },
    { id: "def-35", name: "本格スパイスカレー＆焼きたてナン", comment: "香り立つスパイスの海、チーズナンにしたらもう天国。", category: "indulgent" },
    { id: "def-36", name: "とろとろ角煮と煮卵", comment: "箸でほろっと崩れる柔らかさ、からしを添えて至福のひと口。", category: "indulgent" },

    // 変わり種・冒険（12品）
    { id: "def-37", name: "餃子100%パーティー（白米なし）", comment: "今夜は餃子だけをひたすら焼いて食べる、夢のストイック宴。", category: "wildcard" },
    { id: "def-38", name: "卵かけご飯を本気で極める夜", comment: "ちょっと良い卵、ごま油、海苔、しらす…TKGの頂点を目指す。", category: "wildcard" },
    { id: "def-39", name: "コンビニ新作おつまみ＆スイーツ祭り", comment: "普段は買わない棚の端っこまで攻める、大人のご褒美遠足。", category: "wildcard" },
    { id: "def-40", name: "深夜の背徳カップ麺＋追いチーズ", comment: "たまには栄養バランスを忘れて、ジャンキーな快楽に溺れよう。", category: "wildcard" },
    { id: "def-41", name: "冷蔵庫の余り物クリエイティブ炒め", comment: "在庫一掃！偶然生まれる奇跡の味付けに賭けてみる夜。", category: "wildcard" },
    { id: "def-42", name: "おうち屋台のたこ焼き＆イカ焼き", comment: "ソースの匂いを部屋中に充満させて、気分は夏祭りの夜。", category: "wildcard" },
    { id: "def-43", name: "〆のお茶漬けから始める逆転晩酌", comment: "さらさら出汁茶漬けをメインに、梅干しと塩辛で渋く決める。", category: "wildcard" },
    { id: "def-44", name: "宅配ピザで映画ナイト", comment: "箱を開けた瞬間の高揚感、今夜はソファから動かなくてOK。", category: "wildcard" },
    { id: "def-45", name: "缶詰バーごっこ", comment: "焼き鳥缶やサバ缶をトースターで温めて一味を振れば、立派な名店。", category: "wildcard" },
    { id: "def-46", name: "ご当地レトルトカレー食べ比べ", comment: "2種類あいがけにして、おうちでプチ全国グルメ旅。", category: "wildcard" },
    { id: "def-47", name: "激辛担々麺で汗だくチャレンジ", comment: "痺れる辛さで一日のモヤモヤを吹き飛ばす爽快ディナー。", category: "wildcard" },
    { id: "def-48", name: "台湾屋台風の魯肉飯（ルーローハン）", comment: "八角がふわっと香る甘辛豚バラ、旅気分を味わう一杯。", category: "wildcard" },
  ];

  // 状態管理
  let dishes = [];
  let activeFilter = "all";
  let isSpinning = false;
  let lastPickedId = null;
  let history = [];
  let soundEnabled = true;
  let audioCtx = null;
  let toastTimer = null;

  // DOM 要素
  const plaqueEl = document.getElementById("plaque");
  const resultStampEl = document.getElementById("result-stamp");
  const resultCategoryEl = document.getElementById("result-category");
  const resultDishEl = document.getElementById("result-dish");
  const resultCommentEl = document.getElementById("result-comment");
  const spinBtn = document.getElementById("spin-btn");
  const spinBtnSub = document.getElementById("spin-btn-sub");
  const spinBtnMain = document.getElementById("spin-btn-main");
  const poolSummaryEl = document.getElementById("pool-summary");
  const filterButtons = document.querySelectorAll(".filter-pill");
  const soundToggleBtn = document.getElementById("sound-toggle");
  const soundLabelEl = document.getElementById("sound-label");

  const historyStripEl = document.getElementById("history-strip");
  const historyListEl = document.getElementById("history-list");

  const toggleDrawerBtn = document.getElementById("toggle-drawer-btn");
  const toggleDrawerText = document.getElementById("toggle-drawer-text");
  const manageBodyEl = document.getElementById("manage-body");
  const addFormEl = document.getElementById("add-form");
  const dishNameInput = document.getElementById("dish-name-input");
  const dishCategorySelect = document.getElementById("dish-category-select");
  const dishCommentInput = document.getElementById("dish-comment-input");
  const formErrorEl = document.getElementById("form-error");
  const menuSearchInput = document.getElementById("menu-search");
  const resetBtn = document.getElementById("reset-btn");
  const menuListEl = document.getElementById("menu-list");
  const menuEmptyMsgEl = document.getElementById("menu-empty-msg");
  const toastEl = document.getElementById("toast");

  const confettiCanvas = document.getElementById("confetti-canvas");
  const confettiCtx = confettiCanvas.getContext("2d");

  // ============================================================
  // ストレージ読み書き
  // ============================================================
  function loadDishes() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return cloneDefaults();
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || parsed.length === 0) {
        return cloneDefaults();
      }
      return parsed
        .filter((item) => item && typeof item.name === "string" && item.name.trim())
        .map((item, idx) => ({
          id: typeof item.id === "string" ? item.id : `restored-${idx}`,
          name: item.name.trim(),
          comment: typeof item.comment === "string" && item.comment.trim()
            ? item.comment.trim()
            : "今夜の気分にぴったりな一品！",
          category: CATEGORY_LABELS[item.category] ? item.category : "custom",
        }));
    } catch {
      return cloneDefaults();
    }
  }

  function saveDishes() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(dishes));
    } catch {
      // プライベートブラウズ等で保存できない場合も動作継続
    }
  }

  function loadSoundPreference() {
    try {
      const val = window.localStorage.getItem(SOUND_KEY);
      return val === null ? true : val === "1";
    } catch {
      return true;
    }
  }

  function saveSoundPreference(enabled) {
    try {
      window.localStorage.setItem(SOUND_KEY, enabled ? "1" : "0");
    } catch {
      // 無視
    }
  }

  function cloneDefaults() {
    return DEFAULT_DISHES.map((d) => ({ ...d }));
  }

  // ============================================================
  // Web Audio 効果音（外部ファイル不要）
  // ============================================================
  function ensureAudioContext() {
    if (!soundEnabled) return null;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!audioCtx) {
      audioCtx = new AudioCtx();
    }
    if (audioCtx.state === "suspended") {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTickSound(progress) {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    // 木札をはじくような軽快な音
    const freq = 520 + (1 - progress) * 260;
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.045);

    gain.gain.setValueAtTime(0.09, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.055);
  }

  function playWinSound() {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    // 温かみのある和風ペンタトニック調の決定音
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = i === notes.length - 1 ? "sine" : "triangle";
      const start = now + i * 0.065;
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.11, start + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.42);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.45);
    });
  }

  // ============================================================
  // 紙吹雪・火の粉バースト（軽量Canvas）
  // ============================================================
  let particles = [];
  let confettiRaf = null;

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    confettiCanvas.width = Math.floor(window.innerWidth * dpr);
    confettiCanvas.height = Math.floor(window.innerHeight * dpr);
    confettiCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function launchConfetti() {
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    resizeCanvas();
    const rect = plaqueEl.getBoundingClientRect();
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height * 0.45;
    const colors = ["#ffd479", "#f5a623", "#ef5c3d", "#fff2d6", "#d9412b", "#f4a3b4"];

    for (let i = 0; i < 64; i++) {
      const angle = (Math.PI * 2 * i) / 64 + (Math.random() - 0.5) * 0.35;
      const speed = 3.2 + Math.random() * 6.8;
      particles.push({
        x: originX + (Math.random() - 0.5) * 40,
        y: originY + (Math.random() - 0.5) * 20,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3.2,
        size: 5 + Math.random() * 6,
        color: colors[i % colors.length],
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.24,
        alpha: 1,
        shape: i % 3 === 0 ? "circle" : "rect",
      });
    }

    if (!confettiRaf) {
      confettiRaf = window.requestAnimationFrame(stepConfetti);
    }
  }

  function stepConfetti() {
    confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.19;
      p.vx *= 0.985;
      p.rotation += p.vRot;
      p.alpha -= 0.015;

      if (p.alpha <= 0 || p.y > window.innerHeight + 30) {
        particles.splice(i, 1);
        continue;
      }

      confettiCtx.save();
      confettiCtx.globalAlpha = Math.max(0, p.alpha);
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rotation);
      confettiCtx.fillStyle = p.color;
      if (p.shape === "circle") {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
        confettiCtx.fill();
      } else {
        confettiCtx.fillRect(-p.size / 2, -p.size * 0.32, p.size, p.size * 0.64);
      }
      confettiCtx.restore();
    }

    if (particles.length > 0) {
      confettiRaf = window.requestAnimationFrame(stepConfetti);
    } else {
      confettiRaf = null;
      confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  // ============================================================
  // 絞り込み & ガチャ抽選ロジック
  // ============================================================
  function getFilteredPool() {
    if (activeFilter === "all") return dishes;
    return dishes.filter((d) => d.category === activeFilter);
  }

  function updatePoolSummary() {
    const pool = getFilteredPool();
    const label = activeFilter === "all" ? "ぜんぶ" : CATEGORY_LABELS[activeFilter];
    poolSummaryEl.textContent = `${label}：${pool.length}品`;
  }

  function displayDish(dish, state) {
    plaqueEl.dataset.state = state;
    resultDishEl.textContent = dish.name;
    resultCommentEl.textContent = dish.comment;
    resultCategoryEl.textContent = CATEGORY_LABELS[dish.category] || "おすすめ";
    resultCategoryEl.dataset.cat = dish.category;
    resultStampEl.textContent = state === "won" ? "今夜の一品" : state === "spinning" ? "抽選中" : "お品書き";
  }

  function pickRandom(pool, excludeId) {
    if (pool.length === 1) return pool[0];
    const candidates = excludeId ? pool.filter((d) => d.id !== excludeId) : pool;
    const list = candidates.length > 0 ? candidates : pool;
    return list[Math.floor(Math.random() * list.length)];
  }

  function startSpin() {
    if (isSpinning) return;

    const pool = getFilteredPool();
    if (pool.length === 0) {
      showToast("このジャンルにはまだ候補がありません。追加するか「ぜんぶ」を選んでください。");
      plaqueEl.dataset.state = "idle";
      resultStampEl.textContent = "品切れ中";
      resultCategoryEl.textContent = CATEGORY_LABELS[activeFilter] || "お品書き";
      resultCategoryEl.dataset.cat = activeFilter;
      resultDishEl.textContent = "候補がまだありません";
      resultCommentEl.textContent = "下のお品書きアレンジから追加するか、別の気分タブを選んでみてください。";
      return;
    }

    isSpinning = true;
    spinBtn.disabled = true;
    spinBtnSub.textContent = "どれになるかな…";
    spinBtnMain.textContent = "お品書きをシャッフル中！";

    const winner = pickRandom(pool, lastPickedId);
    const reducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reducedMotion || pool.length === 1) {
      finishSpin(winner);
      return;
    }

    // だんだん減速する心地よいルーレット演出（約1.35秒）
    const steps = 18;
    let currentStep = 0;

    function nextTick() {
      const progress = currentStep / steps;
      const preview = pickRandom(pool, null);
      displayDish(preview, "spinning");
      playTickSound(progress);

      currentStep += 1;
      if (currentStep < steps) {
        // 最初は速く(45ms)、終盤は溜めて(165ms)止まる
        const delay = Math.round(42 + Math.pow(progress, 2.2) * 145);
        window.setTimeout(nextTick, delay);
      } else {
        window.setTimeout(() => finishSpin(winner), 110);
      }
    }

    nextTick();
  }

  function finishSpin(winner) {
    lastPickedId = winner.id;
    displayDish(winner, "won");
    playWinSound();
    launchConfetti();

    pushHistory(winner);

    isSpinning = false;
    spinBtn.disabled = false;
    spinBtnSub.textContent = "別の気分も見てみる？";
    spinBtnMain.textContent = "もう一回まわす！";
  }

  function pushHistory(dish) {
    history = [dish, ...history.filter((h) => h.id !== dish.id)].slice(0, 5);
    renderHistory();
  }

  function renderHistory() {
    if (history.length <= 1) {
      historyStripEl.hidden = true;
      return;
    }
    historyStripEl.hidden = false;
    historyListEl.innerHTML = "";
    // 最新の1つ（現在表示中）を除く直前4件を表示
    history.slice(1).forEach((item) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "history-chip";
      btn.textContent = item.name;
      btn.title = "この候補をもう一度表示する";
      btn.addEventListener("click", () => {
        if (isSpinning) return;
        displayDish(item, "won");
        lastPickedId = item.id;
      });
      li.appendChild(btn);
      historyListEl.appendChild(li);
    });
  }

  // ============================================================
  // お品書き一覧レンダリング・追加・削除・リセット
  // ============================================================
  function renderMenuList() {
    const query = menuSearchInput.value.trim().toLowerCase();
    const filtered = dishes.filter((item) => {
      if (!query) return true;
      const catLabel = CATEGORY_LABELS[item.category] || "";
      return (
        item.name.toLowerCase().includes(query) ||
        item.comment.toLowerCase().includes(query) ||
        catLabel.toLowerCase().includes(query)
      );
    });

    menuListEl.innerHTML = "";

    if (filtered.length === 0) {
      menuEmptyMsgEl.hidden = false;
      return;
    }

    menuEmptyMsgEl.hidden = true;
    const frag = document.createDocumentFragment();

    filtered.forEach((item) => {
      const li = document.createElement("li");
      li.className = "menu-item";

      const info = document.createElement("div");
      info.className = "menu-item-info";

      const head = document.createElement("div");
      head.className = "menu-item-head";

      const nameSpan = document.createElement("span");
      nameSpan.className = "menu-item-name";
      nameSpan.textContent = item.name;

      const badge = document.createElement("span");
      badge.className = "menu-item-badge";
      badge.dataset.cat = item.category;
      badge.textContent = CATEGORY_LABELS[item.category] || "その他";

      head.appendChild(nameSpan);
      head.appendChild(badge);

      const commentP = document.createElement("p");
      commentP.className = "menu-item-comment";
      commentP.textContent = item.comment;

      info.appendChild(head);
      info.appendChild(commentP);

      const delBtn = document.createElement("button");
      delBtn.type = "button";
      delBtn.className = "delete-btn";
      delBtn.textContent = "削除";
      delBtn.setAttribute("aria-label", `${item.name}をお品書きから削除`);
      delBtn.addEventListener("click", () => removeDish(item.id));

      li.appendChild(info);
      li.appendChild(delBtn);
      frag.appendChild(li);
    });

    menuListEl.appendChild(frag);
  }

  function handleAddDish(event) {
    event.preventDefault();
    formErrorEl.textContent = "";

    const name = dishNameInput.value.trim();
    const comment = dishCommentInput.value.trim();
    const category = dishCategorySelect.value;

    if (!name) {
      formErrorEl.textContent = "料理名を入力してください。";
      dishNameInput.focus();
      return;
    }

    const isDuplicate = dishes.some((d) => d.name === name);
    if (isDuplicate) {
      formErrorEl.textContent = "同じ名前の料理がすでにお品書きにあります。";
      dishNameInput.focus();
      return;
    }

    const newDish = {
      id: `custom-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      name,
      comment: comment || "自分だけのとっておきメニュー。今夜これに決まりかも！",
      category: CATEGORY_LABELS[category] ? category : "custom",
    };

    dishes.unshift(newDish);
    saveDishes();
    updatePoolSummary();
    renderMenuList();

    dishNameInput.value = "";
    dishCommentInput.value = "";
    dishNameInput.focus();

    showToast(`「${newDish.name}」をお品書きに追加しました！`);
  }

  function removeDish(id) {
    const target = dishes.find((d) => d.id === id);
    if (!target) return;

    dishes = dishes.filter((d) => d.id !== id);
    saveDishes();
    updatePoolSummary();
    renderMenuList();
    showToast(`「${target.name}」を削除しました`);
  }

  function resetToDefaults() {
    const ok = window.confirm("お品書きを初期の48品に戻しますか？（自分で追加したメニューは消えます）");
    if (!ok) return;

    dishes = cloneDefaults();
    saveDishes();
    updatePoolSummary();
    renderMenuList();
    showToast("お品書きを初期リスト（48品）に戻しました");
  }

  // ============================================================
  // UI 補助
  // ============================================================
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.hidden = false;
    if (toastTimer) window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => {
      toastEl.hidden = true;
    }, 2800);
  }

  function updateSoundUI() {
    soundToggleBtn.setAttribute("aria-pressed", String(soundEnabled));
    soundLabelEl.textContent = soundEnabled ? "効果音：オン" : "効果音：オフ";
  }

  // ============================================================
  // イベント設定 & 初期化
  // ============================================================
  function init() {
    dishes = loadDishes();
    soundEnabled = loadSoundPreference();

    updateSoundUI();
    updatePoolSummary();
    renderMenuList();
    resizeCanvas();

    spinBtn.addEventListener("click", startSpin);

    // スペースキーでも回せるように（入力欄フォーカス中は除外）
    document.addEventListener("keydown", (e) => {
      if (e.code !== "Space") return;
      const tag = document.activeElement && document.activeElement.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || tag === "BUTTON") {
        return;
      }
      e.preventDefault();
      spinBtn.classList.add("is-pressed");
      window.setTimeout(() => spinBtn.classList.remove("is-pressed"), 140);
      startSpin();
    });

    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (isSpinning) return;
        activeFilter = btn.dataset.filter || "all";
        filterButtons.forEach((b) => b.classList.toggle("is-active", b === btn));
        updatePoolSummary();
      });
    });

    soundToggleBtn.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      saveSoundPreference(soundEnabled);
      updateSoundUI();
      if (soundEnabled) playTickSound(0.5);
    });

    toggleDrawerBtn.addEventListener("click", () => {
      const expanded = toggleDrawerBtn.getAttribute("aria-expanded") === "true";
      const next = !expanded;
      toggleDrawerBtn.setAttribute("aria-expanded", String(next));
      manageBodyEl.hidden = !next;
      toggleDrawerText.textContent = next ? "お品書きを閉じる" : "お品書きを開く";
    });

    addFormEl.addEventListener("submit", handleAddDish);
    menuSearchInput.addEventListener("input", renderMenuList);
    resetBtn.addEventListener("click", resetToDefaults);
    window.addEventListener("resize", resizeCanvas);
  }

  init();
})();
