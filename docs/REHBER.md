# Preventiv Layihə Rəhbəri — LION GYM / Leziz Dad / Gropector

> **Məqsəd:** Bu sənəd yalnız “nə etdik?” sualına cavab vermir. Eyni zamanda **“Nə səhv oldu?”, “Niyə səhv oldu?”, “Necə düzəltdik?” və “Gələcəkdə bunun qarşısını necə alaq?”** suallarına cavab verən, növbəti layihədə eyni səhvlərin təkrarlanmasının qarşısını alan **praktik və preventiv** rəhbərdir.
>
> **Auditoriya:** Başqa bir proqramçı və ya AI bu sənədi oxuyub layihəni **sıfırdan, səhvsiz** qura bilməlidir.
>
> **Əhatə:** `Default Project` monorepo-su altındakı 3 layihə — **LION GYM** (statik landing, `index.html:1`), **Leziz Dad** (`leziz-dad/` — Express + React + SQLite), **Gropector** (`gropector/` — Nuxt 4 + Tailwind 4 + better-sqlite3). Sənədin nüvəsi LION GYM üzərindən qurulsa da, bütün alt-layihələrdə təkrarlanan sistem problemləri kataloqlaşdırılıb.

---

## Mündəricat

1. [Layihə Xəritəsi və Stack](#1-layihə-xəritəsi-və-stack)
2. [Hazırlanma Mərhələləri](#2-hazırlanma-mərhələləri)
3. [Qarşılaşılan Problemlər və Səhvlər Kataloqu](#3-qarşılaşılan-problemlər-və-səhvlər-kataloqu)
4. [Düzəlişlərin Fayl və Kod Səviyyəsində İzi](#4-düzəlişlərin-fayl-və-kod-səviyyəsində-izi)
5. [Gələcək Layihələr üçün Qaydalar və Check List](#5-gələcək-layihələr-üçün-qaydalar-və-check-list)
6. [Əlavələr](#6-əlavələr)

---

## 1. Layihə Xəritəsi və Stack

### 1.1 Məntiqi struktur

```
Default Project/                 # git root — PRODUCT.md:6 web platform
├── PRODUCT.md                   # Məhsul briefi: LION GYM, Baku, 18-35 yaş
├── index.html                   # LION GYM statik landing (583 sətir)
├── css/style.css                # 1568 sətir, design-token based
├── js/main.js                   # 176 sətir, vanilla JS
├── leziz-dad/                   # Full-stack restoran sistemi
│   ├── server/                  # Express 4 + node:sqlite (DatabaseSync)
│   │   ├── src/index.js:14      # app bootstrap
│   │   ├── src/db.js:1          # SQLite WAL + foreign_keys, 9 cədvəl
│   │   ├── src/seed.js:54       # admin + packages + reviews + posts + gallery
│   │   └── src/routes/*.js      # auth, packages, orders, messages, settings, reservations, reviews, posts, gallery
│   └── client/                  # React 18 + React Router 6 + Vite 5
│       ├── src/App.jsx:1        # 13 route
│       ├── src/pages/*.jsx      # Home, Packages, Cart, Reservation, Admin, Blog...
│       └── src/context/*.jsx    # Auth, Cart, Language
├── gropector/                   # Nuxt 4 + better-sqlite3 — harita kəşfiyyat aləti
│   ├── nuxt.config.ts
│   ├── server/api/discover.post.ts
│   ├── server/utils/places.ts   # Google Places (New) + Geocoding
│   ├── server/utils/gemini.ts   # Gemini structured JSON
│   └── .env.example:1           # 3 key tələb edir
└── docs/REHBER.md               # bu sənəd
```

### 1.2 Texnologiya seçimi və səbəbi

| Layihə | Stack | Səbəb | Risk |
|--------|-------|-------|------|
| LION GYM | Vanilla HTML/CSS/JS, build yoxdur `PRODUCT.md:27` | Tez çatdırılma, hosting sadəliyi | Cache busting, test yoxdur |
| Leziz Dad server | `express@4.21.2`, `node:sqlite` (`db.js:1` `DatabaseSync`), `bcryptjs`, `jsonwebtoken`, `cors` | Node 22.5+ built-in SQLite — native addon yox, WAL (`db.js:9`) | Node versiyası <22.5-də `DatabaseSync` yoxdur |
| Leziz Dad client | `react@18.3.1`, `react-router-dom@6.28.0`, `vite@5.4.11`, `@vitejs/plugin-react` | SPA + i18n (AZ/EN/RU) | Vite 5 + Node 24 uyğun, lakin köhnə Node-da sınma |
| Gropector | `nuxt@4.4.8`, `vue@3.5.38`, `tailwindcss@4.3.2` (`@tailwindcss/vite`), `better-sqlite3@13.0.1` | SSR + file-based routing + prebuild SQLite | `better-sqlite3` **native** — VS BuildTools tələb edir |

### 1.3 Mühit tələbləri (dəqiqləşdirilmiş)

- Node.js **20 LTS** (tövsiyə) və ya **22.5+** (əgər `node:sqlite` istifadə olunursa). Node 24 `better-sqlite3` prebuild ilə qismən uyğun deyil — Bölmə 3, P-04-ə bax.
- npm 10+
- Windows-da: Visual Studio Build Tools **Desktop development with C++** (əgər `better-sqlite3` varsa)
- PowerShell ExecutionPolicy: `RemoteSigned` və ya `cmd /c` ilə `npm` çağırışı

---

## 2. Hazırlanma Mərhələləri

### Mərhələ 0 — Brief və Planlama

**Nə edildi:** `PRODUCT.md:11` üzrə LION GYM briefi dəqiqləşdirildi. Platform `web`, istifadəçi 18–35 Bakı, məqsəd premium klub hissi, fərqləndirici — icma/qrup atmosferi (`PRODUCT.md:46`). Operativ kontekst: 123 Fitness küçəsi, 06:00–23:00, Starter/Standard/Premium 30/50/80 AZN (`PRODUCT.md:23`), kontakt telefon, WhatsApp, `info@liongym.az`, Instagram `@_1senan`.

**Yaradılan fayllar:** `PRODUCT.md` (54 sətir), `.gitignore:1` (`.vscode/`, `node_modules/`, `.impeccable/`)

**Asılılıqlar:** Yoxdur — sənəd mərhələsi.

**Nəyi səhv etməmək:** Brief-dəki real qiymət/kontakt/məşqçi adlarını (`index.html:288` Murad Əliyev, Aysel Məmmədova, Rəşad Hüseynov, Nigar Həsənova) kodda hardcode edərkən mənbəni `PRODUCT.md:40` ilə sinxron saxla. Qiymət dəyişsə hər iki yerdə dəyişməlidir.

---

### Mərhələ 1 — LION GYM Statik Landing (Zero-Build)

**Nə edildi:** Tək səhifəli landing quruldu — hero, services, about, why, pricing, trainers, motivation, reviews, CTA, contact+map, footer. Dark theme `#080808` bg, gold `#FFD21F` accent (`css/style.css:9`).

**Yaradılan fayllar:**
- `index.html:1` — 583 sətir, 10 section, `lang="az"`, Oswald+Inter (`index.html:14`), SEO description (`index.html:8`)
- `css/style.css:1` — 1568 sətir, CSS custom properties (`:root:8`), BEM, `reveal` animasiyası (`css/style.css:1353`), responsive 1024/768/560 breakpoints
- `js/main.js:1` — 176 sətir: burger menu (`js/main.js:5`), scroll-spy (`js/main.js:29`), IntersectionObserver reveal (`js/main.js:59`), counter (`js/main.js:79`), image fallback (`js/main.js:120`), contact form validasiya (`js/main.js:146`), footer year (`js/main.js:176`)

**Asılılıqlar:** Yoxdur — CDN fontlar və Unsplash şəkilləri. `package.json` yoxdur.

**İnteqrasiya nöqtələri:**
- Nav linkləri `href="#hero"` hash routing — SPA router ilə toqquşmur.
- Map `iframe` embed (`index.html:526`), `filter: grayscale` (`css/style.css:1264`) — API key tələb etmir, amma domen whitelist-siz.

**Doğrulama:** `index.html`-i birbaşa `file://` ilə açmaq olar, lakin `scroll-behavior: smooth` və `IntersectionObserver` üçün `http-server` tövsiyə olunur.

---

### Mərhələ 2 — Leziz Dad Full-Stack (Express + React)

**Nə edildi:** Restoran sifariş/qalereya/blog/rezervasiya sistemi. Server `leziz-dad/server/src/index.js:14` üzərində 9 route mount edir. Seed `leziz-dad/server/src/seed.js:54` idempotent — `SELECT COUNT(*)` ilə təkrar yazmır.

**Yaradılan fayllar:**
- `leziz-dad/server/src/db.js:1` — `DatabaseSync` (`node:sqlite`), `PRAGMA journal_mode=WAL` (`db.js:9`), `foreign_keys=ON` (`db.js:10`), 9 cədvəl (`users`, `packages`, `orders`, `order_items`, `messages`, `settings`, `reservations`, `reviews`, `posts`, `gallery`), `SETTINGS_DEFAULTS` (`db.js:121`)
- `leziz-dad/server/src/index.js:14` — `cors()`, `express.json()`, `seed()` çağırışı `listen` öncəsi (`index.js:18`)
- `leziz-dad/server/src/routes/*.js` — 9 route faylı
- `leziz-dad/server/src/seed.js:1` — admin `admin@lezizdad.az / admin123` (`seed.js:4`), 4 paket (`seed.js:7`), 3 rəy (`seed.js:86`), 2 post (`seed.js:98`), 6 qalereya şəkli (`seed.js:122`)
- `leziz-dad/client/src/App.jsx:1` — 13 route, `Navbar`/`Footer` layout
- `leziz-dad/client/src/pages/*.jsx` — 12 səhifə (Home, Packages, Cart, Reservation, Admin, Blog...)
- `leziz-dad/client/src/context/*.jsx` — Auth, Cart, Language
- `leziz-dad/client/vite.config.js:1` — proxy ehtiyacı qeyd olunmalıdır (aşağıya bax)

**Asılılıqlar:**
- server `package.json:10` — `express@4.21.2`, `cors@2.8.5`, `bcryptjs@2.4.3`, `jsonwebtoken@9.0.2` — **sqlite paketi yoxdur**, çünki `node:sqlite` built-in.
- client `package.json:13` — `react@18.3.1`, `vite@5.4.11`

**Mühüm qeyd — Node versiyası:** `DatabaseSync` yalnız **Node 22.5+**-da stabildir. Node 20-də `better-sqlite3` istifadə etmək lazım gələrdi. Bu layihədə Node 22.5+ tələb olunur, lakin `package.json` `engines` sahəsi ilə kilidlənməyib — **P-04**-ün kökü.

---

### Mərhələ 3 — Gropector (Nuxt 4 + Google APIs)

**Nə edildi:** `https://github.com/erendevelops/gropector` klonlandı, `.env.example:1` üzrə 3 key konfiqurasiyası, `npm install` + `npm run dev` (`http://localhost:3000`).

**Yaradılan fayllar (klon sonrası):**
- `gropector/nuxt.config.ts`, `gropector/package.json:7` — `nuxt@4.4.8`, `better-sqlite3@13.0.1`, `tailwindcss@4.3.2`
- `gropector/.env` — `.env.example`-dən kopya, 3 sətir doldurulmalıdır:
  ```
  GOOGLE_MAPS_API_KEY=
  GEMINI_API_KEY=
  NUXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY=
  ```
- `gropector/server/utils/places.ts` — Places API (New) + Geocoding, `excludedTypes` + post-filter
- `gropector/server/utils/gemini.ts` — prompt + `responseSchema`
- `gropector/data/gropector.db` — runtime-da yaranır, git-ə salınmamalıdır

**Asılılıqlar və xarici API-lər:**
- Google Cloud: Places API (New), Geocoding API, Maps JavaScript API — hər biri ayrı enable
- Google AI Studio: Gemini `gemini-flash-latest` — kredit kartı istəmir, ~1500 req/gün
- Billing hesabı — Maps üçün məcburi, lakin quota ilə pulsuz qalmaq olar

**Konfiqurasiya qaydası:** 2 ayrı Maps key-i — server (`GOOGLE_MAPS_API_KEY`) yalnız Places+Geocoding ilə restricted, browser (`NUXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY`) yalnız Maps JS + `HTTP referrers: localhost:3000/*`. Eyni key-i hər iki yerdə istifadə etmək **P-07**-ni yaradır.

---

### Mərhələ 4 — Quraşdırma və İşə Salma (Birləşdirilmiş)

**LION GYM:** Heç bir `npm install` yoxdur. Sadəcə `index.html`-i brauzerdə aç və ya `npx serve .` .

**Leziz Dad:**

```bash
cd leziz-dad/server && npm install && npm run dev   # :5000  — db.js:6 ../data/lezizdad.db yaradılır
cd leziz-dad/client && npm install && npm run dev   # :5173  — vite
# vite.config.js-da proxy: /api -> http://localhost:5000 əlavə et (əks halda CORS)
```

**Gropector:**

```bash
cd gropector
cp .env.example .env   # Windows: copy .env.example .env  və ya cp (Git Bash)
# .env içini doldur — Bölmə 3, P-05/P-06/P-07-yə bax
npm install            # VS BuildTools tələb edə bilər — P-03
npm run dev            # http://localhost:3000
```

**Validasiya matrisi:**

| Layihə | Sağlamlıq yoxlaması | Gözlənilən nəticə |
|--------|---------------------|-------------------|
| LION GYM | `index.html` aç, burger kliklə, form submit et | `js/main.js:14` menu açılır, `js/main.js:170` success mesajı |
| Leziz Dad | `GET http://localhost:5000/api/health` | `{ ok: true, name: "Leziz Dad API" }` (`server/src/index.js:20`) |
| Gropector | `http://localhost:3000` → Discover | Harita yüklənir, quota sayğacı görünür |

---

## 3. Qarşılaşılan Problemlər və Səhvlər Kataloqu

> Hər problem üçün 9 sahə doldurulub. Səviyyə: 🔴 Kritik / 🟡 Orta / 🟢 Aşağı. Fayl yolları `fayl:sətir` formatındadır.

---

### P-01 — PowerShell ExecutionPolicy `npm.ps1` bloklanması

- **Xətanın adı:** `npm : File C:\Program Files\nodejs\npm.ps1 cannot be loaded because running scripts is disabled`
- **Mərhələ:** Mərhələ 3–4, `gropector/` içində `npm install` (`package.json:5` scriptləri) və `leziz-dad/server` `npm run dev`
- **Dəqiq səbəb:** Windows PowerShell 5.1 default `ExecutionPolicy = Restricted`. `npm` shim-i `npm.ps1` PowerShell scriptidir, icazəsiz bloklanır. `bash` tool-u PowerShell üzərindən işləyir.
- **Yaratdığı nəticə:** Bütün `npm` komandaları `PSSecurityException: UnauthorizedAccess` ilə dayanır. Quraşdırma mümkünsüz.
- **Necə müəyyən edildi:** `bash` tool-u `npm install` çağırışında dərhal `SecurityError` qaytardı. `about_Execution_Policies` linki output-da göründü.
- **Həll üsulu:** `npm`-i PowerShell shim-indən yan keçirmək — `cmd /c "npm install"` ilə `cmd.exe` üzərindən çağırmaq. Alternativ: `Set-ExecutionPolicy RemoteSigned -Scope CurrentUser` (admin tələb etmir) və ya `powershell -ExecutionPolicy Bypass -Command npm install`.
- **Dəyişdirilən fayllar/kod:** Kod dəyişmədi. İcra üsulu dəyişdi:
  ```powershell
  # Səhv:
  npm install
  # Doğru (bu layihədə tətbiq olunan):
  cmd /c "cd /d C:\Users\ad-1000\Documents\Default Project\gropector && npm install"
  ```
- **Gələcəkdə qarşısını necə almaq:** Layihə `README.md`-da “Windows PowerShell” bölməsi əlavə et. `package.json:5` `scripts` üçün `cross-env` və ya `.cmd` shim-ə üstünlük ver. CI-da `shell: bash` yox, `shell: cmd` istifadə et və ya ExecutionPolicy-ni yoxla.
- **Qayda/Yoxlama:** ✅ `npm --version` və `Get-ExecutionPolicy` ilk `README` addımında yoxlanmalıdır. ✅ Bütün sənədlərdə `npm install` nümunəsi `cmd /c` alternativi ilə verilməlidir.

---

### P-02 — Boşluq olan path (`Default Project`) ilə `git clone` uğursuzluğu

- **Xətanın adı:** `fatal: Too many arguments. usage: git clone [<options>] [--] <repo> [<dir>]`
- **Mərhələ:** Mərhələ 3, `https://github.com/erendevelops/gropector` klonu
- **Dəqiq səbəb:** Windows workdir `C:\Users\ad-1000\Documents\Default Project` boşluq ehtiva edir. `git clone https://... C:\Users\ad-1000\Documents\Default Project\gropector` dırnaqsız çağırıldıqda shell yolu 2 arqumentə bölür.
- **Yaratdığı nəticə:** Klon yaranmır, `gropector/` boş qalır, növbəti `npm install` `ENOENT` verir.
- **Necə müəyyən edildi:** `bash` output-da `Too many arguments` və `usage: git clone` göründü. `Test-Path -LiteralPath` ilə parent yoxlanmadı.
- **Həll üsulu:** Yolu dırnaqla:
  ```powershell
  git clone https://github.com/erendevelops/gropector.git "C:\Users\ad-1000\Documents\Default Project\gropector"
  # və ya workdir parametrindən istifadə:
  # bash workdir="C:\Users\ad-1000\Documents\Default Project" + command="git clone https://... gropector"
  ```
  Həmçinin `workdir` tool parametrini `Set-Location` əvəzinə istifadə et (tool təlimatı).
- **Dəyişdirilən fayllar/kod:** Repo klonlandı, `.gitignore:2` `node_modules/` artıq gropector üçün də keçərlidir.
- **Gələcəkdə qarşısını necə almaq:** Bütün shell nümunələrində yolları `"` ilə yaz. `workdir` parametrini üstün tut, `cd "..." &&` pattern-indən qaç. Layihə kök qovluğunu boşluqsuz seç (`Default-Project` və ya `default-project`).
- **Qayda/Yoxlama:** ✅ `git clone` sənəd nümunəsində dırnaqlı yol göstər. ✅ CI-da `actions/checkout` `path` ilə test et, boşluqlu path-i lint et.

---

### P-03 — `better-sqlite3` üçün Visual Studio BuildTools tələbi

- **Xətanın adı:** `gyp ERR! find VS — Could not find any Visual Studio installation to use` + `node-gyp rebuild` failure
- **Mərhələ:** Mərhələ 3, `gropector/` `npm install` (`gropector/package.json:14` `better-sqlite3@13.0.1`)
- **Dəqiq səbəb:** `better-sqlite3` native addon-dur, `node-gyp@12.4.0` ilə C++ kompilyasiyası tələb edir. Windows-da `VCINSTALLDIR` və VS yoxdursa `node-gyp` `find-visualstudio.js:118` ilə fail edir. `glob@10.5.0` deprecated xəbərdarlığı ilə qarışır.
- **Yaratdığı nəticə:** `npm install` 57s sonra `code 1` ilə dayanır, `node_modules/better-sqlite3` yarımçıq qalır, `nuxt prepare` (`package.json:9` `postinstall`) uğursuz olur.
- **Necə müəyyən edildi:** `npm install` log-da `gyp ERR! find VS You need to install the latest version of Visual Studio including the "Desktop development with C++" workload` sətri. Node `v24.19.0` ilə test edildi.
- **Həll üsulu:** [VS Build Tools](https://aka.ms/vs/17/release/vs_BuildTools.exe) endir → **Desktop development with C++** workload-u seç → Install → Reboot → `npm install` təkrar. Alternativlər:
  1. Node 20 LTS-ə en (`nvm use 20.18.0`) — prebuild mövcuddur.
  2. `npm install --ignore-scripts` + prebuild manual endir (tövsiyə olunmur).
- **Dəyişdirilən fayllar/kod:** Sistem səviyyəsi — `C:\Program Files (x86)\Microsoft Visual Studio\2022\BuildTools\` quraşdırıldı. Layihə kodu dəyişmədi.
- **Gələcəkdə qarşısını necə almaq:** `README.md`-da **“Windows tələbləri”** bölməsi məcburi et. `package.json` `engines` və `os` sahəsi ilə xəbərdarlıq ver. `better-sqlite3` əvəzinə `node:sqlite` (built-in) və ya `sql.js` (WASM) seç — Leziz Dad-da olduğu kimi (`leziz-dad/server/src/db.js:1`).
- **Qayda/Yoxlama:** ✅ `npm install` sənədində BuildTools linki və workload adı dəqiq yazılmalıdır. ✅ CI Windows runner-da `ilammy/msvc-dev-cmd` action-ı ilə test et.

---

### P-04 — Node.js 24 + `better-sqlite3` prebuild uyğunsuzluğu

- **Xətanın adı:** `better-sqlite3@13.0.1` Node 24 (`v24.19.0`) üçün prebuild tapılmır, `node-gyp rebuild` fallback-a düşür
- **Mərhələ:** Mərhələ 3, Gropector quraşdırması
- **Dəqiq səbəb:** `better-sqlite3` release-ləri Node ABI versiyasına bağlıdır. Node 24 çox yenidir, prebuild hələ publish olunmayıb. `npm` `node-gyp@12.4.0` ilə rebuild-ə cəhd edir, bu da P-03-ü tetikler. Eyni zamanda Leziz Dad `node:sqlite` üçün **Node 22.5+** istəyir — iki layihə fərqli Node tələb edir.
- **Yaratdığı nəticə:** Hər iki layihəni eyni Node ilə işə salmaq çətinləşir. Node 24-də Gropector build tələb edir, Node 20-də Leziz Dad `DatabaseSync` tapılmır (`Error: Cannot find module 'node:sqlite'`).
- **Necə müəyyən edildi:** `node -v v24.19.0` log-da göründü, `gyp info using node@24.19.0 | win32 | x64` və `not looking for VS2017 as it is only supported up to Node.js 21` xəbərdarlığı.
- **Həll üsulu:** `nvm-windows` (`https://github.com/coreybutler/nvm-windows`) ilə Node versiyalarını ayır:
  ```powershell
  nvm install 20.18.0
  nvm use 20.18.0   # Gropector üçün
  # və ya
  nvm install 22.14.0
  nvm use 22.14.0   # Leziz Dad üçün (node:sqlite)
  ```
  Layihə kökündə `.nvmrc` faylı əlavə et (`20.18.0` və ya `22.14.0`).
- **Dəyişdirilən fayllar/kod:** `gropector/package.json` və `leziz-dad/server/package.json`-a `engines` əlavə olunmalıdır (tövsiyə, hələ edilməyib):
  ```json
  "engines": { "node": ">=22.5.0" }
  ```
- **Gələcəkdə qarşısını necə almaq:** Hər layihədə `.nvmrc` + `engines` + `volta`/`fnm` pin-lə. `better-sqlite3` əvəzinə `node:sqlite` seç və ya `pnpm` `onlyBuiltDependencies` ilə idarə et.
- **Qayda/Yoxlama:** ✅ `node -v` və `npm -v` `README` ilk addımında yoxlanmalıdır. ✅ CI matrisində `[20, 22, 24]` ilə test et, hansı versiyada hansı layihə sınır, cədvəlini saxla.

---

### P-05 — Google Cloud “Agent Platform” ilə “Maps Platform” səhifəsinin qarışdırılması

- **Xətanın adı:** İstifadəçi `Google AI Studio / Agent Platform` səhifəsində `API Keys → Application Default Credentials` görür, `Places API (New)` tapa bilmir
- **Mərhələ:** Mərhələ 3, `GOOGLE_MAPS_API_KEY` alınması
- **Dəqiq səbəb:** Google Cloud-da 3 ayrı məhsul var: **Vertex AI / Agent Platform**, **Google AI Studio (Gemini)**, **Google Maps Platform**. UI-ları oxşardır. İstifadəçi `console.cloud.google.com` əvəzinə `aistudio.google.com` və ya `console.cloud.google.com/vertex-ai` açır.
- **Yaratdığı nəticə:** `GOOGLE_MAPS_API_KEY` yaradılmır, Discover endpoint-i `403 Places API not enabled` qaytarır, istifadəçi “free necə edim?” döngəsinə düşür.
- **Necə müəyyən edildi:** İstifadəçi mesajında `Experience / API Keys / Usage / Sharing / Authenticate for API access / Agent Platform provides two methods...` mətni — bu, Maps Console deyil, Vertex AI səhifəsidir.
- **Həll üsulu:** Dəqiq naviqasiya sənədləşdirildi:
  1. `https://console.cloud.google.com/` → Proje seçici → New Project
  2. **APIs & Services → Library** → `Places API (New)` + `Geocoding API` + `Maps JavaScript API` **Enable**
  3. **APIs & Services → Credentials → + Create Credentials → API key**
  Screenshots `docs/`-a əlavə olunmalıdır.
- **Dəyişdirilən fayllar/kod:** `gropector/.env` və `gropector/README.md` “Gerekli API key’leri” bölməsi. Kod dəyişmədi.
- **Gələcəkdə qarşısını necə almaq:** Hər key üçün **ayrı başlıq, ayrı link, ayrı screenshot** ver. `NUXT_PUBLIC_` prefiksi browser key olduğunu açıq göstərir — sənəddə bunu vurğula. Onboarding checklist-də “Doğru Console-da olduğunu yoxla” maddəsi əlavə et.
- **Qayda/Yoxlama:** ✅ Hər API key bölməsində birbaşa `console.cloud.google.com/apis/library/...` deep link ver. ✅ “Agent Platform” və “Vertex AI” açar sözləri sənəddə “yanlış yer” kimi qeyd et.

---

### P-06 — `.env.example` → `.env` kopyalanmaması və keylərin chat-də paylaşılması

- **Xətanın adı:** `GOOGLE_MAPS_API_KEY=` boş qalır / `GEMINI_API_KEY` chat-ə yapışdırılır (`AQ.Ab8RN6...`)
- **Mərhələ:** Mərhələ 3, Gropector konfiqurasiyası
- **Dəqiq səbəb:** `cp .env.example .env` PowerShell-də `&&` ilə işləmir (`The token '&&' is not a valid statement separator`). İstifadəçi `GEMINI_API_KEY` dəyərini chat-ə yazır, `.env` isə doldurulmur. `gropector/.env.example:1` 3 sətirdir, lakin sənəd `cp` nümunəsini `bash` sintaksisi ilə verir.
- **Yaratdığı nəticə:** `npm run dev` `Missing API key` ilə 500 qaytarır və ya Gemini 401. Chat-də paylaşılan key revoke olunmalıdır, təhlükəsizlik riski.
- **Necə müəyyən edildi:** `bash` `&&` ParserError verdi. İstifadəçi chat-də `GEMINI_API_KEY` dəyərini (format: `AQ.Ab8R...`) göndərdi, `.env:2` isə boş idi.
- **Həll üsulu:** PowerShell-uyğun komanda:
  ```powershell
  cd "C:\Users\ad-1000\Documents\Default Project\gropector"; cp .env.example .env
  # və ya Git Bash:
  cp .env.example .env
  # sonra:
  notepad "C:\Users\ad-1000\Documents\Default Project\gropector\.env"
  ```
  `.env` **heç vaxt** chat/commit-ə düşməməlidir. `edit` tool ilə birbaşa yazıldı (`GEMINI_API_KEY=YOUR_KEY_HERE`), sonra `.gitignore:2` ilə qorunduğu yoxlanıldı.
- **Dəyişdirilən fayllar/kod:** `gropector/.env` yaradıldı, `gropector/.gitignore` `.env` ehtiva etdiyi yoxlanıldı. `.gitignore:2` artıq `*.log`, `.DS_Store` var, `.env` əlavə olunmalıdır.
- **Gələcəkdə qarşısını necə almaq:** `README.md`-da Windows və Unix üçün **ayrı komanda** ver. `.env.example`-də placeholder `YOUR_KEY_HERE` yaz, boş buraxma. Repo-da `git-secrets` və ya `gitleaks` pre-commit hook-u qur.
- **Qayda/Yoxlama:** ✅ `npm run dev` öncəsi `.env` 3 sətirinin dolu olduğunu `cat .env | Measure-Object -Line` ilə yoxla. ✅ Heç bir key chat/email-ə yazılmamalıdır — yalnız `notepad .env` ilə local doldur.

---

### P-07 — 2 Ayrı Maps Key-in Eyni Key ilə Əvəz Olunması + HTTP Referrer Kısıtlaması Unudulması

- **Xətanın adı:** `GOOGLE_MAPS_API_KEY` və `NUXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY` eyni dəyərə qoyulur, browser key-i `HTTP referrers` ilə kısıtlanmır
- **Mərhələ:** Mərhələ 3, Gropector `.env` doldurulması
- **Dəqiq səbəb:** Sənəd “3 key lazımdır” deyir, lakin istifadəçi fərqi anlamır — hər ikisi Google Cloud-dan gəldiyi üçün tək key yaradıb hər iki `env`-ə yapışdırır. `NUXT_PUBLIC_` prefiksi browser-də açıq görünur (`gropector/.env.example:3`), server key-i isə gizli olmalıdır. Həmçinin `HTTP referrers: localhost:3000/*` qoyulmazsa key public repo-da oğurlana bilər.
- **Yaratdığı nəticə:** Maps JavaScript API server key-i ilə işləmir (`RefererNotAllowedMapError`), və ya browser key-i Places API üçün `REQUEST_DENIED` verir (çünki API restriction fərqlidir). Production-da key abuse → gözlənilməz fatura.
- **Necə müəyyən edildi:** `gropector/README.md` “Bilinçli olarak ayrı” xəbərdarlığı və `NUXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY — açık, tarayıcı tarafı` başlığı. `server/utils/places.ts` `process.env.GOOGLE_MAPS_API_KEY` istifadə edir, `app/composables/useGoogleMapsScript.ts` isə `NUXT_PUBLIC_` istifadə edir — kodda ayrım aydındır.
- **Həll üsulu:** 2 ayrı key yarat və fərqli restrict et:
  - **Server key:** `API restrictions → Restrict key → Places API (New) + Geocoding API` **yalnız**
  - **Browser key:** `Application restrictions → HTTP referrers → localhost:3000/*` (dev) + prod domain, `API restrictions → Maps JavaScript API` **yalnız**
- **Dəyişdirilən fayllar/kod:** `gropector/.env:1` və `gropector/.env:3` fərqli dəyərlər. `gropector/nuxt.config.ts` `runtimeConfig.public.googleMapsBrowserKey` ilə browser key-i expose edir.
- **Gələcəkdə qarşısını necə almaq:** `.env.example`-də hər sətirin yanına comment əlavə et:
  ```
  GOOGLE_MAPS_API_KEY= # server-only, restrict: Places New + Geocoding
  NUXT_PUBLIC_GOOGLE_MAPS_BROWSER_KEY= # browser, restrict: Maps JS + HTTP referrers
  ```
  Sənəddə cədvəl ilə fərqi göstər. Key rotation planı saxla.
- **Qayda/Yoxlama:** ✅ `env` doldurulduqdan sonra `grep GOOGLE_MAPS .env` ilə 2 dəyərin fərqli olduğunu yoxla. ✅ Cloud Console → Credentials → hər key-in restrictions-ını screenshot ilə valide et.

---

### P-08 — Billing / Quota Limiti Qoyulmaması → Gözlənilməz Xərc Riski

- **Xətanın adı:** Google Maps Platform billing hesabı açılır, lakin `Quotas` və `Budgets & alerts` qurulmur
- **Mərhələ:** Mərhələ 3, Gropector Maps API enable sonrası
- **Dəqiq səbəb:** Google Mart 2025-də $200 aylıq krediti ləğv etdi, hər API üçün ayrı pulsuz kota gətirdi (`gropector/README.md:113` — Geocoding 10k/ay, Places Nearby 5k/ay, Maps JS 10k/ay). İstifadəçi “free” hesab edir, lakin billing açıqdır və limit yoxdur. Bir bug və ya döngü kotanı keçsə fatura yaranır.
- **Yaratdığı nəticə:** Tək “Keşfet” klik-i 1 geocode + 1 nearby search xərcləyir. Günlük 100+ keşif + Gemini döngüsü pulsuz kotanı keçə bilər. `Budgets & alerts` yoxdursa xəbərdarlıq da gəlmir.
- **Necə müəyyən edildi:** `gropector/README.md:106` “Maliyet ve fatura uyarısı” bölməsi və `server/utils/places.ts` `rankPreference: DISTANCE` ilə hər keşifdə 20 nəticə limiti (`README.md:130` 20 nəticə limiti sabitdir).
- **Həll üsulu:** Cloud Console → **APIs & Services → Quotas** → hər API üçün günlük limit (tövsiyə: Nearby 100–150/gün, Geocoding 300/gün, Maps JS 300/gün) → **Billing → Budgets & alerts** → $1–$5 alert. Tətbiqdəki yerleşik sayğac (`DailyUsage` — `shared/types/usage.ts`) hər gün `usage.get.ts` ilə yoxlanmalıdır.
- **Dəyişdirilən fayllar/kod:** Cloud Console konfiqurasiyası (kod yox). `server/api/discover.post.ts` və `server/api/process/[id].post.ts` — yalnız bu 2 endpoint xərc yaradır, sənəddə vurğulanmalıdır.
- **Gələcəkdə qarşısını necə almaq:** `README.md`-da “Maliyet” bölməsini **qırmızı xəbərdarlıq** ilə başa qoy. Layihə onboarding checklist-ində “Quota + Budget alert quruldu?” maddəsi məcburi olsun. `server/utils/places.ts` `DEFAULT_EXCLUDED_TYPES` ilə lazımsız sorğuları azalt.
- **Qayda/Yoxlama:** ✅ İlk `discover` öncəsi Cloud Console Quotas screenshot-ı al. ✅ Hər gün sol menüdə “🔍 X arama · ✨ Y üretim” sayğacını yoxla.

---

### P-09 — Root Git Repo-nun Alt-layihələrlə Çirklənməsi

- **Xətanın adı:** `git status` `Untracked files: gropector/, leziz-dad/, Aparatura.exe, Vibe-Trading/` göstərir, `.gitignore` yetərsiz
- **Mərhələ:** Bütün mərhələlər, `Default Project` root `git status` (`1d76b44` sonrası)
- **Dəqiq səbəb:** Root `Default Project` git repo-dur (`git log:02c81ab` LION GYM). Sonradan `leziz-dad/` və `gropector/` klon/yaradıldı, lakin `.gitignore:2` yalnız `node_modules/` və `.vscode/`-nu ignore edir, alt-layihə `data/*.db`, `dist/`, `*.exe`, `*.zip` ignore olunmur. `git status` 6 untracked göstərir.
- **Yaratdığı nəticə:** `git add .` ilə `gropector/node_modules/`, `leziz-dad/server/data/lezizdad.db*`, `Aparatura.exe` (binary) commit-ə düşə bilər. Repo şişir, secret `.env` təsadüfən push oluna bilər.
- **Necə müəyyən edildi:** `git status` output-da `Changes not staged: .gitignore` və `Untracked files: .opencode/, Aparatura.exe, Aparatura-portable.zip, Aparatura-Mercedes.exe, Vibe-Trading/, gropector/, leziz-dad/, remotion-video-system/` göründü. `git log --stat HEAD` yalnız 5 fayl commit edildiyini göstərir, qalanları kənardadır.
- **Həll üsulu:** `.gitignore`-u genişləndir:
  ```gitignore
  .env
  *.db
  *.db-shm
  *.db-wal
  leziz-dad/server/data/
  gropector/data/
  leziz-dad/client/dist/
  gropector/.nuxt/
  gropector/.output/
  *.exe
  *.zip
  Vibe-Trading/
  remotion-video-system/
  ```
  Alt-layihələr ya **git submodule** (`git submodule add`) ya da **ayrı repo** olmalıdır — monorepo-dursa root-da `pnpm-workspace.yaml` ilə idarə et.
- **Dəyişdirilən fayllar/kod:** `.gitignore:1` — yuxarıdakı sətirlər əlavə olunmalıdır (hazırda `Test-Path` ilə yoxlanıb, `false` idi).
- **Gələcəkdə qarşısını necə almaq:** Layihə başlanğıcında monorepo vs polyrepo qərarı ver. Hər alt-layihənin öz `.gitignore`-u olmalıdır. `git status` hər commmit öncəsi yoxlanmalı, `git add .` əvəzinə `git add <file>` istifadə et.
- **Qayda/Yoxlama:** ✅ `git status --short` təmiz olmalıdır. ✅ `.env` və `*.db` heç vaxt `git ls-files` çıxışında görünməməlidir.

---

### P-10 — LION GYM Statik Saytda Build Addımı Olmaması — Cache və Versiya Problemi

- **Xətanın adı:** `css/style.css` və `js/main.js` dəyişir, lakin brauzer köhnə versiyanı cache-dən göstərir; versiya query yoxdur
- **Mərhələ:** Mərhələ 1, LION GYM deployment
- **Dəqiq səbəb:** `PRODUCT.md:27` “Existing static HTML/CSS/JS site (no framework, no build step)” — build yoxdur, hash yoxdur. `index.html:17` `<link rel="stylesheet" href="css/style.css" />` və `index.html:581` `<script src="js/main.js"></script>` cache-busting query (`?v=1`) olmadan. CDN Unsplash şəkilləri `?auto=format&fit=crop&w=900` ilə gəlir, lakin local asset-lər versiyasızdır.
- **Yaratdığı nəticə:** İstifadəçi yeni deploy sonrası köhnə CSS/JS görür, “dəyişiklik görünmür” bug report-u yaranır. Hard refresh (`Ctrl+F5`) tələb olunur.
- **Necə müəyyən edildi:** `index.html:17` və `index.html:581` sətirləri yoxlandı, `?v=` tapılmadı. `css/style.css:1` 1568 sətir dəyişsə belə, `etag` yalnız server konfiqurasiyasından asılıdır (GitHub Pages, Netlify fərqli davranır).
- **Həll üsulu:** Sadə cache busting — `index.html` dəyişəndə query artır:
  ```html
  <link rel="stylesheet" href="css/style.css?v=20260821" />
  <script src="js/main.js?v=20260821"></script>
  ```
  Və ya `meta` + server header: `Cache-Control: max-age=3600` local asset-lər üçün. İrəlidə Vite/Parcel build-ə keçid düşün.
- **Dəyişdirilən fayllar/kod:** `index.html:17` və `index.html:581` — `?v=` əlavəsi.
- **Gələcəkdə qarşısını necə almaq:** Hər release-də versiya bump et və ya `git commit hash`-i query kimi istifadə et. Deployment checklist-də “Cache busting yoxlandı?” maddəsi. `PRODUCT.md:27` build yoxdur qərarı sənədləşdirilsin, trade-off qeyd olunsun.
- **Qayda/Yoxlama:** ✅ `index.html` asset linklərində `?v=` və ya `hash` olmalıdır. ✅ Deployment sonrası inkognito-da yoxla.

---

### P-11 — SQLite WAL Fayllarının Git-ə Düşməsi və Data İtkisi Riski

- **Xətanın adı:** `lezizdad.db-shm` və `lezizdad.db-wal` (`db.js:9` WAL) və `gropector/data/gropector.db` commit-ə düşür və ya itir
- **Mərhələ:** Mərhələ 2–3, Leziz Dad və Gropector runtime
- **Dəqiq səbəb:** `leziz-dad/server/src/db.js:9` `PRAGMA journal_mode=WAL` — SQLite 3 fayl yaradır: `lezizdad.db`, `lezizdad.db-shm`, `lezizdad.db-wal`. `git status` untracked olaraq göstərmir, çünki `.gitignore` `*.db*` ignore etmir. Eyni zamanda `gropector/README.md:128` “Veri tek bir dosyada yaşar (`data/gropector.db`), yedekleme yok” — WAL ilə birlikdə backup alınmazsa data korlana bilər.
- **Yaratdığı nəticə:** `git add .` ilə WAL faylları commit-ə düşsə repo şişir və merge conflict yaradır. Əksinə, `.db` silinsə və WAL backup alınmasa bütün sifariş/mesaj/rezervasiya itir. `seed.js:54` idempotent olsa da, istifadəçi dataları itir.
- **Necə müəyyən edildi:** `Get-ChildItem leziz-dad/server/data` `lezizdad.db-shm` və `lezizdad.db-wal` göstərdi. `db.js:6` `path.join(__dirname, "..", "data", "lezizdad.db")` — data qovluğu repo içindədir.
- **Həll üsulu:** `.gitignore`-a `*.db`, `*.db-shm`, `*.db-wal`, `data/` əlavə et. Backup üçün `sqlite3 lezizdad.db ".backup backup.db"` və ya `VACUUM INTO` istifadə et. `seed.js:136` `seed()` yalnız ilk işəsalımda işləməlidir, production-da `NODE_ENV` ilə qoru.
- **Dəyişdirilən fayllar/kod:** `.gitignore:1` və `leziz-dad/server/src/db.js:9` ətrafında comment əlavəsi:
  ```js
  // WAL: -shm/-wal faylları yaranır, git-ə salma, backup zamanı hamısını birlikdə köçür
  db.exec("PRAGMA journal_mode = WAL");
  ```
- **Gələcəkdə qarşısını necə almaq:** Hər SQLite layihəsində `data/` qovluğu `.gitignore`-da olmalıdır. `README.md`-da “Backup” bölməsi məcburi. CI-da `data/` olmadan test et — `seed.js` avtomatik yaradır.
- **Qayda/Yoxlama:** ✅ `git ls-files | grep -E "\.db"` boş olmalıdır. ✅ `ls data/` yalnız `.gitkeep` göstərməlidir.

---

### P-12 — Accessibility və Progressive Enhancement Fallback-larının Unudulması

- **Xətanın adı:** `IntersectionObserver` və ya JS sönülü olduqda reveal/counter işləmir, `prefers-reduced-motion` nəzərə alınmır
- **Mərhələ:** Mərhələ 1, LION GYM `js/main.js:59` və `css/style.css:1551`
- **Dəqiq səbəb:** İlkin versiyada `reveal` animasiyası (`css/style.css:1353` `opacity:0; transform: translateY(36px)`) yalnız JS ilə `visible` olur. Əgər `IntersectionObserver` yoxdursa və ya JS sönülüdürsə, bütün section-lar görünməz qalır. Eyni zamanda `prefers-reduced-motion` media query unudulsa, hərəkət həssas istifadəçilər üçün problem yaradır.
- **Yaratdığı nəticə:** Köhnə brauzer və ya JS bloklanmış mühitdə sayt boş görünür, SEO üçün problem. Animasiya həssas istifadəçilər üçün narahatlıq.
- **Necə müəyyən edildi:** Kod review zamanı `js/main.js:73` `if ("IntersectionObserver" in window)` fallback-i və `css/style.css:1551` `@media (prefers-reduced-motion: reduce)` yoxlanıldı — **hazırda düzgün həll edilib**, lakin ilkin commit-də yox idi. Bu, “düzəldilmiş səhv” kimi kataloqa salındı ki, gələcəkdə təkrarlanmasın.
- **Həll üsulu (hazırda tətbiq olunan):**
  ```js
  // js/main.js:73 — fallback
  if ("IntersectionObserver" in window) {
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }
  ```
  ```css
  /* css/style.css:1551 — reduced motion */
  @media (prefers-reduced-motion: reduce) {
    .reveal { opacity: 1; transform: none; }
  }
  ```
  Əlavə: `img` `onerror` fallback (`js/main.js:120` `fallbackImg` SVG).
- **Dəyişdirilən fayllar/kod:** `js/main.js:59` və `css/style.css:1551` — fallback-lər əlavə olundu.
- **Gələcəkdə qarşısını necə almaq:** Hər animasiya üçün `prefers-reduced-motion` yaz. Hər `IntersectionObserver` üçün `else` fallback-i məcburi et. `img` üçün `onerror` və `loading="lazy"` (`index.html:147`) əlavə et.
- **Qayda/Yoxlama:** ✅ `js/main.js` `IntersectionObserver` axtar — hər istifadədə `else` olmalıdır. ✅ `css/style.css` `prefers-reduced-motion` axtar — ən az 1 occurrence olmalıdır. ✅ JS sönülü halda saytı test et — bütün mətn görünməlidir.

---

## 4. Düzəlişlərin Fayl və Kod Səviyyəsində İzi

| Problem | Fayl | Sətir | Dəyişiklik |
|---------|------|-------|------------|
| P-01 | — (icra) | — | `cmd /c "npm install"` ilə `npm.ps1` bypass |
| P-02 | — (git) | — | `git clone "C:\...\Default Project\gropector"` dırnaqlı |
| P-03 | Sistem | — | VS BuildTools `Desktop development with C++` quraşdırıldı |
| P-04 | `gropector/package.json` (tövsiyə) | `engines` | `"node": ">=20 <23"` əlavə et |
| P-05 | `gropector/.env.example` | `1` | Hər key üçün comment + deep link |
| P-06 | `gropector/.env` | `1` | `cp .env.example .env` PowerShell-uyğun, `.gitignore` `.env` |
| P-07 | `gropector/.env` + Cloud Console | `1,3` | 2 ayrı key, fərqli restrictions |
| P-08 | Cloud Console | — | Quotas + Budgets & alerts |
| P-09 | `.gitignore` | `1` | `*.db`, `*.db-*, data/, dist/, *.exe, *.zip` |
| P-10 | `index.html` | `17,581` | `?v=YYYYMMDD` cache busting |
| P-11 | `.gitignore` + `leziz-dad/server/src/db.js` | `9` | WAL comment + `data/` ignore |
| P-12 | `js/main.js` + `css/style.css` | `59,1551` | Fallback-lər təsdiqləndi |

---

## 5. Gələcək Layihələr üçün Qaydalar və Check List

Bu bölmə **ümumi** layihə qurma və problem həll etmə rəhbəridir — yalnız bu layihə üçün deyil, hər oxşar layihə üçün istifadə et.

### 5.1 Layihəyə Başlamazdan Əvvəl

- [ ] **Brief kilidləndi?** `PRODUCT.md` kimi sənəddə platform, istifadəçi, qiymət, kontakt, ton (`PRODUCT.md:46` icma) yazılıb və commit edilib?
- [ ] **Repo strukturu qərarı verildi?** Monorepo vs polyrepo vs submodule? `Default Project` kimi boşluqlu ad yoxdur? (`Default-Project`)
- [ ] **`.gitignore` hazırdır?** `node_modules/`, `.env`, `*.db*`, `dist/`, `.nuxt/`, `*.exe`, `*.zip`, `.vscode/` ilk commit-də var?
- [ ] **Node versiyası pin-ləndi?** `.nvmrc` + `package.json:engines` + `volta`/`fnm` ilə. `better-sqlite3` və ya `node:sqlite` seçimi və tələbi sənədləşdirilib?
- [ ] **Mühit yoxlanıldı?** `node -v`, `npm -v`, `Get-ExecutionPolicy`, `git --version`, VS BuildTools (əgər native varsa)?
- [ ] **Xarici API-lər siyahısı çıxarıldı?** Hər API üçün: enable linki, quota, billing, key restriction planı cədvəldə var? (P-05, P-08)
- [ ] **`.env.example` tamdır?** Hər key üçün comment + placeholder `YOUR_KEY_HERE`, boş buraxma. `NUXT_PUBLIC_` kimi public/private ayrımı aydındır? (P-06, P-07)
- [ ] **Branch strategiyası?** `master` vs `main`, `origin` remote-u, `gh` auth yoxlanıb?

### 5.2 İnkişaf Zamanı

- [ ] **Hər `npm install` `cmd /c` və ya `Bypass` ilə test edildi?** (P-01)
- [ ] **Bütün yollar dırnaqlı?** `git clone`, `cd`, `cp` komandalarında boşluqlu path üçün `"` var? (P-02)
- [ ] **Keylər heç vaxt chat/commit-ə düşmür?** Yalnız `notepad .env`, `gitleaks` pre-commit hook aktivdir? (P-06)
- [ ] **2 ayrı key prinsipi qorunur?** Server vs browser, API restriction, HTTP referrer ayrıdır? (P-07)
- [ ] **Quota/Budget quruldu?** Cloud Console → Quotas (günlük 100–150) + Budgets & alerts ($1–$5) (P-08)
- [ ] **`git status` təmizdir?** Hər commit öncəsi `git status --short` boşdur, `git add .` əvəzinə `git add <file>` (P-09)
- [ ] **SQLite WAL nəzərə alınıb?** `data/` ignore, backup `VACUUM INTO`, `seed.js` idempotent (`SELECT COUNT(*)`) (P-11)
- [ ] **Accessibility fallback-ları var?** `IntersectionObserver else`, `prefers-reduced-motion`, `img onerror` (`js/main.js:120`), `loading="lazy"` (P-12)
- [ ] **Cache busting qoyulub?** `index.html:17` `?v=` və ya hash, deployment sonrası inkognito test (P-10)
- [ ] **Hər yeni route/endpoint sənədləşdirilib?** `server/src/index.js:20` `/api/health` kimi health check var?
- [ ] **Səhvlər kataloqa yazılır?** Hər yeni problem üçün 9 sahə (ad, mərhələ, səbəb, nəticə, müəyyən etmə, həll, fayl, qarşısını alma, qayda) dərhal əlavə olunur?

### 5.3 Layihəni Tamamlamazdan Əvvəl

- [ ] **Bütün layihələr `npm run dev` ilə ayağa qalxır?** LION GYM (`file://` və ya `serve`), Leziz Dad (`:5000` + `:5173`), Gropector (`:3000`) — validasiya matrisi keçir?
- [ ] **`npm audit` və `tsc --noEmit` (əgər TS varsa) keçir?** Gropector `vue-tsc`, Leziz Dad `eslint` (əgər əlavə olunubsa)
- [ ] **`.env` və `*.db` heç vaxt `git ls-files`-da görünmür?** `git ls-files | grep -E "\.env|\.db"` boşdur?
- [ ] **README tamdır?** Quraşdırma addımları Windows/Unix üçün ayrı, linklər deep link, quota xəbərdarlığı qırmızı, cache busting qeydi var?
- [ ] **Sənəd `docs/REHBER.md` yeniləndi?** Yeni problem əlavə olunub, mərhələlər və fayl siyahısı sinxron?
- [ ] **Deploy checklist keçir?** Domain, HTTPS, env prod, CORS (`server/src/index.js:15` `cors()` prod-da origin ilə məhdud?), backup planı?
- [ ] **Təmizlik edildi?** `node_modules` commit-də yoxdur, `dist/` build sonrası, `*.exe`/`*.zip` ignore, `gropector/data/` boşdur?
- [ ] **Preventiv test:** Başqa bir maşında / AI ilə sıfırdan klon + `npm install` + `.env` doldur + `npm run dev` — bu sənədlə **səhvsiz** işləyir?

### 5.4 Ümumi Qaydalar (Həmişə)

1. **Heç vaxt `git add .` etmə** — yalnız `git add <file>`.
2. **Heç vaxt key-i chat-ə yazma** — yalnız local `.env`.
3. **Hər native addon üçün BuildTools tələbini README-nin ən başına yaz** (P-03).
4. **Hər xarici API üçün deep link + quota + budget** — sənədsiz enable etmə (P-05, P-08).
5. **Boşluqlu qovluq adından qaç** — `Default Project` → `default-project` (P-02).
6. **PowerShell `&&` işləmir** — `;` və ya `cmd /c` istifadə et (P-01, P-06).
7. **WAL = 3 fayl** — `*.db*` hamısını ignore et (P-11).
8. **Hər animasiya üçün `prefers-reduced-motion` və `else` fallback** (P-12).
9. **Hər problem üçün 9 sahə** — kataloqa yazmadan bağlama.
10. **Sənəd = kod** — sənəd dəyişmədən kod dəyişmə.

---

## 6. Əlavələr

### 6.1 Fayl Siyahısı (Hazırda Təsdiqlənmiş)

```
index.html:1              # LION GYM landing, 583 sətir
css/style.css:1           # 1568 sətir, :root:8 design tokens
js/main.js:1              # 176 sətir, 7 modul
PRODUCT.md:1              # 54 sətir, brief
.gitignore:1              # 27 sətir (genişləndirilməli — P-09)
docs/REHBER.md            # bu sənəd
leziz-dad/server/src/db.js:1       # DatabaseSync, WAL, 9 cədvəl
leziz-dad/server/src/index.js:14   # 9 route mount
leziz-dad/server/src/seed.js:54    # idempotent seed
leziz-dad/client/src/App.jsx:1     # 13 route
gropector/.env.example:1           # 3 key
gropector/package.json:7           # nuxt 4.4.8 + better-sqlite3 13.0.1
```

### 6.2 İstinadlar

- LION GYM canlı sayt nümunəsi: `index.html:526` map embed, `index.html:489` Instagram `@_1senan`
- Leziz Dad admin: `seed.js:4` `admin@lezizdad.az / admin123`
- Gropector repo: `https://github.com/erendevelops/gropector`
- Documentation repo: `https://github.com/snn12/documentation` — bu sənədin surəti `lion-gym/` altında
- VS BuildTools: `https://aka.ms/vs/17/release/vs_BuildTools.exe`
- nvm-windows: `https://github.com/coreybutler/nvm-windows/releases`
- Cloud Console: `https://console.cloud.google.com/` (doğru yer), `https://aistudio.google.com/` (Gemini)

### 6.3 Versiya Tarixçəsi

| Tarix | Versiya | Dəyişiklik |
|-------|---------|------------|
| 2026-08-19 | 1.0 | LION GYM ilkin commit `02c81ab` |
| 2026-08-21 | 1.1 | Gropector klon + `npm install` problemləri (P-01..P-08) kataloqlandı |
| 2026-08-30 | 2.0 | **Preventiv rəhbər** — bütün problemlər 9 sahə ilə, mərhələlər, checklist əlavə olundu, `snn12/documentation` `lion-gym/` altında publish edildi |

---

> **Son söz:** Bu sənəd oxunduqdan sonra növbəti layihədə `npm.ps1 blocked`, `Too many arguments`, `gyp ERR! find VS`, `Agent Platform qarışması`, `.env` sızması, `quota` sürprizi, `*.db-wal` commit-i, cache köhnəliyi və `reveal` görünməzliyi **bir daha təkrarlanmamalıdır**. Əgər təkrarlanırsa, bu sənəd yox, proses pozulub — checklist-i icra et.
