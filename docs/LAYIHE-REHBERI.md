# LION GYM — Praktik və Preventiv Layihə Rəhbəri

> **Məqsəd:** Bu sənəd yalnız "nə etdik?" sualına deyil, **"nə səhv oldu?", "niyə səhv oldu?", "necə düzəltdik?" və "gələcəkdə qarşısını necə alaq?"** suallarına cavab verən, sıfırdan eyni tipli layihəni quracaq istənilən proqramçı və ya AI üçün təkrar səhvlərin qarşısını alan preventiv bələdçidir.

| Sahə | Dəyər |
|------|-------|
| **Layihə** | LION GYM — Premium Fitness Club (Bakı) |
| **Platforma** | Web — statik HTML / CSS / JS, build-step yoxdur |
| **Repo** | `snn12/GYM-zal` (master) |
| **Dokumentasiya repo** | `snn12/documentation` → `lion-gym/` |
| **Stack** | `index.html` (583 sətir), `css/style.css` (1568 sətir), `js/main.js` (176 sətir), Google Fonts (Oswald + Inter), Unsplash CDN |
| **Müəllif sənəd** | Preventiv audit 2026-08-30 |
| **Dil** | AZ (bütün copy Azərbaycan dilində) |

---

## Mündəricat

1. [Layihənin Qısa Xülasəsi](#1-layihənin-qısa-xülasəsi)
2. [Hazırlanma Mərhələləri — Addım-addım](#2-hazirlanma-mərhələləri--addim-addim)
3. [Qarşılaşılan Əsas Problemlər və Səhvlər (P01–P14)](#3-qarşilaşilan-əsas-problemlər-və-səhvlər-p01p14)
4. [Gələcək Layihələr üçün Qaydalar və Check List](#4-gələcək-layihələr-üçün-qaydalar-və-check-list)
5. [Əlavələr — Fayl Strukturu, Git Konvensiyası, Resurslar](#5-əlavələr)

---

## 1. Layihənin Qısa Xülasəsi

**LION GYM** Bakıda yerləşən premium fitness klubdur. Hədəf auditoriya 18–35 yaş, fiziki formasını və özünəinamını artırmaq istəyən şəxslərdir. Uğur meyarı: üzvün gücü/sağlam həyat tərzi qazanması və icma atmosferi sayəsində geri qayıtması.

**Brend sözü:** `güc` tonu, dark theme (`#080808` fon, `#FFD21F` qızılı aksent), Oswald + Inter şriftləri, Instagram `@_1senan`.

**Funksional bloklar (one-page):**

`Header` → `Hero` → `Services (6 proqram)` → `About (10+ il təcrübə)` → `Why Choose Us (4 üstünlük)` → `Pricing (Starter 30 / Standard 50 / Premium 80 AZN)` → `Trainers (4 məşqçi)` → `Motivation` → `Reviews (3 rəy)` → `CTA` → `Contact (ünvan, telefon, email, xəritə, form)` → `Footer`

**Əməliyyat konteksti:** Ünvan `123 Fitness küçəsi, Bakı`, saat 06:00–23:00, həftənin 7 günü. Əlaqə: `+994 50 000 00 00`, `info@liongym.az`.

---

## 2. Hazırlanma Mərhələləri — Addım-addım

> Hər mərhələ üçün: **Məqsəd → Görülən işlər → Yaradılan / Dəyişən fayllar → Asılılıqlar → Çıxış artefaktı → Tələ**

### Mərhələ 0 — Kəşf və Tələblərin fiksasiyası

- **Məqsəd:** Brendi, auditoriyanı və məzmunu dondurmaq, "fake copy" riskini sıfırlamaq.
- **Görülən işlər:** `PRODUCT.md` yaradıldı (`<!-- impeccable:product-schema 1 -->` ilə). Platforma = web, Users, Positioning, Operating Context, Capabilities, Brand Commitments, Evidence on Hand yazıldı. Qiymətlər (30/50/80), məşqçi adları, ünvan, Instagram handle `index.html`-də real kimi təsdiqləndi.
- **Fayllar:** `PRODUCT.md:1-54`
- **Asılılıqlar:** — (insan qərarı)
- **Çıxış:** Dondurulmuş brend sözlüyü və məzmun mənbəyi.
- **Tələ:** Mərhələ 1-ə keçmədən `PRODUCT.md` olmadan HTML yazma.

### Mərhələ 1 — Layihə Skeleti və Repo Quruluşu

- **Məqsəd:** Təmiz git tarixi və düzgün `.gitignore` ilə başlamaq.
- **Görülən işlər:** `index.html`, `css/style.css`, `js/main.js` boş skelet kimi yaradıldı. `.gitignore` ilk versiyası (`c6036de`) yalnız `.vscode/`, `node_modules/`, `*.log`, `.DS_Store` saxlayırdı. `.vscode/settings.json` təsadüfən commit edildi (`02c81ab`), sonra `1d76b44`-də silindi.
- **Fayllar:** `.gitignore:1-4`, `.vscode/settings.json` (müvəqqəti)
- **Asılılıqlar:** Git
- **Çıxış:** `02c81ab` — ilk tam commit (5 fayl, 2334 sətir).
- **Tələ:** `.gitignore` `.impeccable` qaydaları olmadan merge edildi → sonradan local diff yarandı (bax P02).

### Mərhələ 2 — HTML Semantikası və Məzmun

- **Məqsəd:** SEO və əlçatanlıq üçün semantik, ARIA-etiketli struktur.
- **Görülən işlər:** `index.html:1-583` yazıldı. `<header>`, `<nav aria-label>`, `<main>`, `<section id>`, `<footer>` istifadə edildi. Bütün copy AZ dilində. Google Fonts preconnect əlavə edildi (`index.html:11-16`).
- **Fayllar:** `index.html`
- **Asılılıqlar:** `PRODUCT.md` → copy mənbəyi, Google Fonts CDN.
- **Çıxış:** W3C-keçərli, real məzmunlu one-page.
- **Tələ:** `index.html:525-533` map iframe placeholder koordinatları (`49.8, 40.4`) real Google Maps embed ilə əvəz edilmədi.

### Mərhələ 3 — Dizayn Sistemi və CSS

- **Məqsəd:** `güc` tonlu dark+gold dizaynı, responsive gridlər.
- **Görülən işlər:** `css/style.css:1-1568` yazıldı. `:root` dizayn tokenləri (`--gold: #ffd21f`, `--bg: #080808`, `--radius: 20px`, `--header-h: 84px`) (`style.css:8-26`). Bütün section-lar (hero, services, about, why, pricing, trainers, motivation, reviews, cta, contact, footer) və responsive breakpoint-lər (`1024px`, `768px`, `560px`) ekləndi. `prefers-reduced-motion` dəstəyi (`style.css:1551-1568`).
- **Fayllar:** `css/style.css`
- **Asılılıqlar:** `index.html` class adları.
- **Çıxış:** 1568 sətir monolit CSS, heç bir build aləti yoxdur.
- **Tələ:** Monolit fayl — gələcəkdə modulizasiya ehtiyacı (bax P05).

### Mərhələ 4 — İnteraktivlik (JS)

- **Məqsəd:** Nav, scroll-spy, reveal, counter, form validation, image fallback.
- **Görülən işlər:** `js/main.js:1-176` yazıldı. Burger menyu (`main.js:5-22`), header scroll + scroll-spy (`main.js:26-53`), IntersectionObserver reveal (`main.js:58-75`), counter animation (`main.js:79-116`), image `error` fallback data-URI SVG (`main.js:120-139`), contact form validation (`main.js:143-172`), footer year (`main.js:176`).
- **Fayllar:** `js/main.js` → `<script src="js/main.js">` ilə `index.html:582`-də daxil edilir.
- **Asılılıqlar:** DOM id-ləri (`burger`, `nav`, `header`, `contactForm`, `formStatus`, `year`).
- **Çıxış:** Zero-dependency vanilla JS.
- **Tələ:** Qlobal scope, `DOMContentLoaded` gözləməsi yoxdur — script `</body>` sonunda olduğu üçün işləyir, amma kövrəkdir (bax P07).

### Mərhələ 5 — QA, Əlçatanlıq, Performans

- **Məqsəd:** Manual yoxlama, lakin avtomat test yoxdur.
- **Görülən işlər:** Reveal və counter üçün `IntersectionObserver` fallback (`main.js:73-75`, `112-116`), `prefers-reduced-motion` CSS, `loading="lazy"` şəkillərdə (`index.html:147, 293` və s.), Unsplash şəkillərinə fallback SVG.
- **Fayllar:** `css/style.css`, `js/main.js`, `index.html`
- **Asılılıqlar:** Brauzer API-ləri.
- **Çıxış:** Əl ilə yoxlanılmış, lakin Lighthouse / axe / W3C avtomatik pipeline yoxdur (bax P10).

### Mərhələ 6 — Git Tarixi və Deploy Hazırlığı

- **Məqsəd:** Təmiz tarix və deploy.
- **Görülən işlər:** İki commit: `02c81ab` (LION GYM website) və `1d76b44` (Remove .vscode). Origin `snn12/GYM-zal`.
- **Fayllar:** `.git`, `.gitignore`
- **Asılılıqlar:** GitHub.
- **Çıxış:** Public repo, lakin `docs/` və `README.md` yox idi — bu rəhbər onu bağlayır.
- **Tələ:** Conventional Commits, branch strategiyası, PR yoxdur (bax P08).

### Mərhələ 7 — Dokumentasiya (hazırkı)

- **Məqsəd:** Preventiv rəhbər yaratmaq.
- **Görülən işlər:** `docs/LAYIHE-REHBERI.md` (bu fayl), kök `README.md` yeniləndi, `snn12/documentation` reposuna `lion-gym/` kimi əlavə edildi.
- **Fayllar:** `docs/LAYIHE-REHBERI.md`, `README.md`, `snn12/documentation/lion-gym/README.md`
- **Asılılıqlar:** Bütün əvvəlki mərhələlərin auditi.
- **Çıxış:** Gələcək layihələr üçün təkrar istifadə olunan bələdçi.

**Asılılıq qrafı (qısa):**

```
PRODUCT.md ──→ index.html ──→ css/style.css
                     │                │
                     └────→ js/main.js
                                     │
                               .gitignore / Git → GitHub
                                     │
                               docs/LAYIHE-REHBERI.md
```

---

## 3. Qarşılaşılan Əsas Problemlər və Səhvlər (P01–P14)

> Hər problem üçün 9 bənd məcburidir. Fayl yolları `fayl:sətir` formatında verilir. Kod hissələri diff kimi göstərilir.

---

### P01 — Repo kökündə əlaqəsiz layihə qalıqları

- **Xətanın adı:** Mono-repo qarışıqlığı — bir git kökündə 6+ əlaqəsiz layihə
- **Mərhələ:** M1 (Repo quraluşu) və M6 (Git)
- **Dəqiq səbəb:** `Default Project` qovluğu eyni anda `GYM-zal` git kökü kimi istifadə edilib, lakin içində `Vibe-Trading/` (2317 fayl, ~500 MB), `gropector/`, `leziz-dad/`, `remotion-video-system/`, `Aparatura.exe`, `Aparatura-Mercedes.exe`, `Aparatura-portable.zip` kimi tamamilə əlaqəsiz qovluq/fayllar saxlanılıb. `git status` çıxışında bunlar `Untracked files` kimi görünür, lakin `.gitignore`-da yoxdur.
- **Nəticə:** `git status` daim çirkli, `git add .` təsadüfən 500 MB push edə bilər, klon edən hər kəs lazımsız binary-ləri endirir, GitHub limiti və CI dağılır.
- **Necə müəyyən edildi:** `default.read:Default Project` + `default.bash: git status` → 7 untracked entry; `default.bash: ls Vibe-Trading` → 2317 fayl.
- **Həll üsulu:** (tövsiyə olunan düzəliş — tətbiq edilməlidir):
  1. Hər layihə üçün ayrı repo/qovluq: `GYM-zal/` yalnız gym fayllarını saxlasın.
  2. Və ya `.gitignore`-a əlavə et:
     ```gitignore
     Vibe-Trading/
     gropector/
     leziz-dad/
     remotion-video-system/
     Aparatura*.exe
     Aparatura*.zip
     .opencode/
     data/
     ```
  3. Artıq commit edilməmiş binary-ləri sil: `git rm --cached -r Vibe-Trading` (əgər əlavə edilibsə).
- **Dəyişən fayllar/kod:** `.gitignore:1-27` — yuxarıdakı sətirlər əlavə edilməlidir; fiziki silinmə: `Vibe-Trading/`, `gropector/`, `leziz-dad/`, `remotion-video-system/`, `Aparatura*`.
- **Gələcəkdə qarşısını alma:** Layihə yaradarkən `mkdir yeni-layihe && cd yeni-layihe && git init` — heç vaxt `Documents/` və ya `Default Project` kimi ümumi qovluğu git init etmə. Template repo istifadə et.
- **Qayda / Yoxlama:** PR Checklist: `git status --short` boşdurmu? `git ls-files | grep -E '\.(exe|zip)$'` nəticə vermir? CI-da `if [ $(git ls-files | wc -l) -gt 50 ]; then echo "Untracked clutter?"` guard.

---

### P02 — `.gitignore` natamam və commit edilməmiş diff

- **Xəta:** `.impeccable` ephemeral faylları üçün ignore qaydaları local-da var, amma commit edilməyib
- **Mərhələ:** M1 və M6
- **Səbəb:** `.opencode` plugini `.gitignore`-a 22 sətirlik `# impeccable-ignore-start ... # impeccable-ignore-end` bloku əlavə edib, lakin `git diff` hələ `modified: .gitignore` göstərir. İlk commit (`c6036de`) yalnız 4 sətir idi.
- **Nəticə:** Hər `git status` "modified" göstərir, komanda yoldaşı pull edəndə `.impeccable/live/` çirki repo-ya düşür, merge konflikti.
- **Necə müəyyən edildi:** `default.bash: git diff --stat` → `.gitignore | 25 ++++++++++++++++++++++++`; `default.bash: git diff` → bütün impeccable bloku.
- **Həll:** Dərhal commit:
  ```bash
  git add .gitignore
  git commit -m "chore: impeccable ephemeral ignore rules"
  git push
  ```
- **Dəyişən fayllar:** `.gitignore:6-27`
- **Qarşısını alma:** `.gitignore` dəyişəndə pre-commit hook `git diff --exit-code` yoxlasın; `impeccable` pluginini quraşdıran kimi ignore-u commit et.
- **Qayda:** Hər session sonunda `git status` təmiz olmalıdır — `dirty working tree` deploy-a getməz.

---

### P03 — `.vscode/settings.json` səhvən commit edildi, sonra silindi

- **Xəta:** IDE konfiqurasiyası repo-ya düşdü
- **Mərhələ:** M1
- **Səbəb:** `.gitignore` əvvəlcə `.vscode/`-ni ehtiva etsə də, `02c81ab`-də `.vscode/settings.json` (3 sətir) yenə commit edildi — ehtimal `.gitignore` commit-dən sonra yaradıldı və ya `git add -f` ilə əlavə edildi.
- **Nəticə:** Komanda yoldaşının VS Code ayarı zorla override olur, PR-da noise.
- **Necə müəyyən edildi:** `default.bash: git show --stat HEAD~1` → `.vscode/settings.json | 3 +`; `git show --stat HEAD` → `3 ---` (silinmə).
- **Həll:** `1d76b44`-də düzəldildi (`git rm --cached .vscode/settings.json`), lakin tarixdə qalır. Tarixi təmizləmək üçün (məcburi deyil):
  ```bash
  git filter-branch --index-filter 'git rm --cached --ignore-unmatch .vscode/settings.json'
  ```
  və ya `git rebase -i` ilə squash.
- **Dəyişən fayllar:** `.vscode/settings.json`, `.gitignore:1`
- **Qarşısını alma:** Repo yaradarkən ilk commit-dən ƏVVƏL `.gitignore` yaz və `git check-ignore -v .vscode/settings.json` ilə yoxla.
- **Qayda:** `.vscode/`, `.idea/`, `*.suo` heç vaxt track edilməz — CI-da `git ls-files | grep "^\.vscode"` boş olmalıdır.

---

### P04 — `README.md` və `docs/` tamamilə yox idi

- **Xəta:** Sənədsiz layihə
- **Mərhələ:** M2–M6
- **Səbəb:** 2334 sətir kod yazıldı, lakin kök `README.md` və `docs/` yaradılmadı. Yalnız `PRODUCT.md` (opencode sxemi) var idi, o da istifadəçi üçün deyil, AI tapşırıq sxemidir.
- **Nəticə:** Yeni proqramçı/AI layihəni sıfırdan qura bilmir: "Necə işə salım? Hansı fayl nə edir? Deploy necədir?" sualları cavabsız qalır.
- **Necə müəyyən edildi:** `default.bash: Get-ChildItem -Filter "README*"` → yalnız `PRODUCT.md`; `Get-ChildItem -Filter "*.md"` → 1 fayl.
- **Həll:** Bu rəhbər + kök `README.md` yaradıldı. `README.md:1-...` strukturu: Layihə təsviri → Quraşdırma (`python -m http.server` və ya `npx serve`) → Fayl strukturu → Töhfə qaydaları → Lisenziya.
- **Dəyişən fayllar:** `README.md` (yeni), `docs/LAYIHE-REHBERI.md` (yeni, bu fayl).
- **Qarşısını alma:** Mərhələ 0-da `README.md` skeleton-u yarat: `# Layihə Adı`, `## Quraşdırma`, `## Struktur` — koddan əvvəl.
- **Qayda:** CI-da `test -f README.md || exit 1` — README olmayan PR merge edilməz.

---

### P05 — `css/style.css` 1568 sətir monolit

- **Xəta:** Tək faylda bütün stillər — miqyas və texniki borc
- **Mərhələ:** M3
- **Səbəb:** Framework/build-step yoxdur deyə bütün CSS bir fayla yığılıb (`style.css:1-1568`). Tokenlər `:root:8-26`-da düzgün ayrılsa da, section-lar (`hero:252-357`, `services:448-539`, `pricing:704-845` və s.) eyni faylda qarışıb. Yenidən istifadə, tree-shaking, minifikasiya yoxdur.
- **Nəticə:** 28 KB CSS hər səhifədə yüklənir (lazy yoxdur), dəyişiklikdə regression riski yüksək, iki nəfər eyni faylı editləyəndə konflikt.
- **Necə müəyyən edildi:** `default.read: css/style.css` → 1568 sətir; `default.bash: ls` → `css/` altında yalnız 1 fayl.
- **Həll (indiki layihə üçün tövsiyə, məcburi deyil):**
  ```
  css/
    tokens.css    ← :root dəyişənləri
    base.css      ← reset, typography, container
    components/   ← btn, header, card
    sections/     ← hero, pricing, trainers...
    responsive.css← media queries
  ```
  və ya ən azı `style.css` daxilində `/* ========== SECTION ========== */` ayırıcıları saxla (hazırda var — yaxşı nümunə). Gələcəkdə PostCSS + cssnano ilə minifikasiya.
- **Dəyişən fayllar:** `css/style.css` (refaktor), `index.html:17` `<link>` sayı artar.
- **Qarşısını alma:** 500 sətiri keçəndə faylı böl — "500-line rule".
- **Qayda:** PR-da `wc -l css/*.css` → hər fayl <600 sətir; `npx stylelint` keçməlidir.

---

### P06 — Xarici CDN şəkillərinə sərt asılılıq

- **Xəta:** Unsplash URL-ləri fallback-sız, hüquqi və performans riski
- **Mərhələ:** M2, M3, M5
- **Səbəb:** Hero (`index.html:76`), About (`index.html:145`), Trainer-lar (`index.html:291, 312, 330, 353`), Motivation bg (`style.css:983`) birbaşa `https://images.unsplash.com/...` ünvanına istinad edir. `js/main.js:120-139`-da `error` fallback data-URI SVG var, lakin yalnız `<img>` üçün; CSS `background-image` üçün fallback yoxdur. `srcset`/`sizes`/`webp` yoxdur.
- **Nəticə:** Offline/CSP/CORS zamanı şəkil sınır, Unsplash rate-limit və ya URL dəyişəndə site "sızır", LCP (Largest Contentful Paint) 900px JPG ilə yavaş, hüquqi lisenziya qeyri-müəyyən.
- **Necə müəyyən edildi:** `default.grep: unsplash` → 6+ URL; `default.read: js/main.js:120-139` → fallback yalnız JS ilə.
- **Həll:**
  ```html
  <!-- index.html:76 əvəzinə -->
  <img src="img/hero-900.jpg"
       srcset="img/hero-480.jpg 480w, img/hero-900.jpg 900w, img/hero-1440.jpg 1440w"
       sizes="(max-width: 768px) 100vw, 50vw"
       alt="Gymdə məşq edən atletik kişi" loading="eager" decoding="async">
  ```
  ```css
  /* style.css:978-984 — fallback rəng */
  .motivation__bg {
    background-color: #0a0a0a; /* şəkil gəlməsə belə */
    background-image: linear-gradient(...), url("../img/motivation.jpg");
  }
  ```
  Şəkilləri `img/` qovluğuna endir, `imagemin` ilə sıx.
- **Dəyişən fayllar:** `index.html:76,145,291,312,330,353`, `css/style.css:983`, `js/main.js:120-139` (saxlanılır), yeni `img/` qovluğu.
- **Qarşısını alma:** Xarici URL commit etməzdən əvvəl `img/` mirror-u yarat; `srcset` olmadan hero merge etmə.
- **Qayda:** `grep -r "unsplash.com" --include="*.html" --include="*.css"` CI-da xəbərdarlıq versin; Lighthouse LCP <2.5s.

---

### P07 — `js/main.js` qlobal scope və `DOMContentLoaded` kövrəkliyi

- **Xəta:** Modulsuz, qlobal dəyişənli, DOM-hazır olmayan JS
- **Mərhələ:** M4
- **Səbəb:** `main.js:3-176` `"use strict"` ilə başlayır, lakin IIFE/modul yoxdur; `burger`, `nav`, `header`, `form` qlobalda (`main.js:5-6,26,143`). `DOMContentLoaded` dinləyicisi yoxdur — yalnız `<script>`-in `</body>` (`index.html:582`) sonunda olması xilas edir. Əgər script `<head>`-ə köçürülsə və ya `async` əlavə edilsə, `getElementById` null qaytaracaq.
- **Nəticə:** Gələcək refactor-da script yeri dəyişəndə sayt dağılır; qlobal ad toqquşması (məs. başqa lib `header` dəyişəni).
- **Necə müəyyən edildi:** `default.read: js/main.js` → heç bir `addEventListener('DOMContentLoaded'` yoxdur; `index.html:582` → script sonda.
- **Həll:**
  ```js
  // js/main.js:1-... — bük
  (() => {
    "use strict";
    document.addEventListener("DOMContentLoaded", () => {
      const burger = document.getElementById("burger");
      if (!burger) return; // guard
      // ... bütün kod bura
    });
  })();
  ```
  və ya `<script type="module" src="js/main.js">` + `export`.
- **Dəyişən fayllar:** `js/main.js:1-176`, `index.html:582`
- **Qarşısını alma:** Hər JS faylı `DOMContentLoaded` və ya `type="module"` ilə başlasın; `eslint: no-undef` aktiv olsun.
- **Qayda:** `grep -n "getElementById" js/*.js` → hər biri `if (!el) return` guard ilə.

---

### P08 — Git tarixi kasıb: 2 commit, Conventional Commits yoxdur

- **Xəta:** Qeyri-informativ tarix, branch strategiyası yoxdur
- **Mərhələ:** M1, M6
- **Səbəb:** Cəmi `02c81ab` ("LION GYM premium fitness club website" — 2334 sətir bir commit-də) və `1d76b44` ("Remove .vscode"). `git log --oneline` 2 sətirdir. Commit mesajları Conventional Commits (`feat:`, `fix:`, `chore:`) deyil; atomic commit prinsipi pozulub (HTML+CSS+JS bir yerdə).
- **Nəticə:** `git blame` faydasız, rollback çətin, PR review-da 2300 sətir bir dəfəyə.
- **Necə müəyyən edildi:** `default.bash: git log --oneline` → 2 commit; `git show --stat HEAD~1` → 5 fayl bir commit-də.
- **Həll (tarixi düzəltmək üçün, məcburi deyil):**
  ```bash
  # Gələcəkdə belə et:
  git commit -m "feat: html semantic structure for LION GYM"
  git commit -m "feat: dark/gold design tokens and hero/services styles"
  git commit -m "feat: pricing and trainers sections"
  git commit -m "feat: mobile nav and scroll interactions"
  ```
  İndiki tarix üçün `git rebase -i HEAD~2` ilə bölmək olar, lakin push edildiyi üçün tövsiyə edilmir — dərslik kimi saxla.
- **Dəyişən fayllar:** Git tarixi (konseptual).
- **Qarşısını alma:** Hər section/mərhələ üçün ayrı commit; `commitlint` + `husky` ilə `feat|fix|docs|chore` məcbur et.
- **Qayda:** PR <400 sətir; commit mesajı `type(scope): subject` formatında.

---

### P09 — Form backend-siz "fake success"

- **Xəta:** Kontakt formu əslində heç yerə göndərilmir
- **Mərhələ:** M4, M5
- **Səbəb:** `js/main.js:146-172` yalnız `preventDefault`, trim, regex yoxlayır və `statusEl.textContent = "✓ Təşəkkürlər! Mesajınız göndərildi."` yazıb `form.reset()` edir. `fetch`/`action`/`method` yoxdur (`index.html:501` → `<form novalidate>`). İstifadəçi mesajın getdiyini zənn edir.
- **Nəticə:** Lead itir, GDPR baxımından yanıltıcı UX, biznes zərəri.
- **Necə müəyyən edildi:** `default.read: js/main.js:146-172` → heç bir `fetch` yoxdur; `index.html:501` → `action` atributu yoxdur.
- **Həll (3 variant, birini seç):**
  1. **Formspree / Getform (ən asan):**
     ```html
     <form action="https://formspere.io/f/x/abc" method="POST" id="contactForm">
     ```
  2. **Netlify Forms:** `<form netlify>`
  3. **Öz backend:** `fetch('/api/contact', {method:'POST', body: JSON.stringify({name,email,message})})` + `try/catch` + `statusEl` error handling.
  ```js
  // js/main.js:169-172 əvəzinə
  try {
    const res = await fetch('/api/contact', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,message})});
    if (!res.ok) throw new Error();
    statusEl.textContent = "✓ Göndərildi! 24 saat ərzində cavab verəcəyik.";
    form.reset();
  } catch {
    statusEl.textContent = "Xəta: Mesaj göndərilmədi. WhatsApp ilə əlaqə saxlayın.";
    statusEl.className = "form__status error";
  }
  ```
- **Dəyişən fayllar:** `index.html:501-522`, `js/main.js:143-172`
- **Qarşısını alma:** Formu "fake success" ilə heç vaxt merge etmə — ya `action` olsun, ya `disabled` + "tezliklə" yazısı.
- **Qayda:** `grep -n "Təşəkkürlər" js/*.js` → yanında `fetch` olmalıdır; QA-da formu doldurub Network tab-da request görmədən təsdiq etmə.

---

### P10 — Avtomat test və əlçatanlıq audit yoxdur

- **Xəta:** Lighthouse / axe / W3C validator heç vaxt işlədilməyib
- **Mərhələ:** M5
- **Səbəb:** Layihədə `package.json` yoxdur, `npm test` yoxdur, CI yoxdur. Emoji ikonlar (`index.html:100` `🏋️`, `style.css` yox) `aria-hidden` bəzən var, bəzən yox; `service__icon` emoji screen reader-da oxuna bilər. Contrast: `#a8a8a8` (`--muted`) `#181818` (`--card`) üzərində 4.5:1-in altında ola bilər. `footer` sosial linkləri `href="#"` (`index.html:566-569`).
- **Nəticə:** WCAG pozuntusu, SEO xalı aşağı, klaviatura nav qırıq ola bilər.
- **Necə müəyyən edildi:** `default.bash: ls *.json` → yoxdur; `default.read: index.html:566-569` → dummy linklər; manual contrast check.
- **Həll:**
  ```bash
  npm init -y
  npm i -D stylelint eslint axe-core lighthouse
  npx lighthouse http://localhost:8000 --view
  npx axe index.html
  ```
  `href="#"` → real URL və ya `<button>`; emoji → `<span aria-hidden="true">🏋️</span>` + gizli `<span class="sr-only">Güc məşqləri</span>`.
- **Dəyişən fayllar:** `package.json` (yeni), `index.html:99-134,566-569`, `css/style.css` (contrast düzəlişi).
- **Qarşısını alma:** Hər PR-da `npx lighthouse --only-categories=accessibility,performance` >90 olmalıdır.
- **Qayda:** Dummy `href="#"` qadağandır — `grep -r 'href="#"' index.html` 0 olmalıdır.

---

### P11 — Map placeholder koordinatları

- **Xəta:** Saxta Google Maps embed
- **Mərhələ:** M2
- **Səbəb:** `index.html:528` `src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3040.5!2d49.8!3d40.4..."` — `49.8, 40.4` Bakının təxmini mərkəzidir, `123 Fitness küçəsi` real ünvan deyil. `pb` parametri `!2x...!3x...` placeholder.
- **Nəticə:** İstifadəçi gələ bilmir, biznes etibarı düşür.
- **Necə müəyyən edildi:** `default.read: index.html:525-533` → koordinat və `!2s...` yoxdur; `PRODUCT.md:23` ünvanın real olduğu deyilir, lakin map saxtadır.
- **Həll:** Google Maps → Share → Embed a map → `iframe` kopyala:
  ```html
  <iframe src="https://www.google.com/maps/embed?pb=!1m18!...!2sLION%20GYM!..."></iframe>
  ```
  və ya OpenStreetMap embed. `title` artıq düzgündür (`index.html:527`).
- **Dəyişən fayllar:** `index.html:525-533`
- **Qarşısını alma:** Map commit etməzdən əvvəl brauzerdə aç və pin-in düzgünlüyünü yoxla.
- **Qayda:** `grep -n "maps/embed" index.html` → `pb` içində real place_id və ya `q=LION+GYM` olmalıdır.

---

### P12 — `Vibe-Trading` qovluğu layihə içində klonlanıb

- **Xəta:** Nəhəng xarici repo layihə kökündə
- **Mərhələ:** M6 (təsadüfi)
- **Səbəb:** İstifadəçi `https://www.quantframe.io/...` linki paylaşıb, sonra agent `git clone https://github.com/HKUDS/Vibe-Trading.git --depth 1` ilə birbaşa `Default Project/Vibe-Trading/` qovluğuna klon edib. `.gitignore`-da bu yol yoxdur.
- **Nəticə:** `du -sh` → ~500 MB, `git add .` faciəsi, GitHub push 2GB limitinə yaxınlaşır.
- **Necə müəyyən edildi:** `default.bash: git status` → `Vibe-Trading/` untracked; `default.bash: pip install vibe-trading-ai` log-u.
- **Həll:** Sil və ya ignore:
  ```bash
  rm -rf Vibe-Trading/
  echo "Vibe-Trading/" >> .gitignore
  # Əgər virtual env lazımdırsa, pipx və ya ayrı venv
  pipx install vibe-trading-ai
  ```
- **Dəyişən fayllar:** Fiziki `Vibe-Trading/` qovluğu, `.gitignore`
- **Qarşısını alma:** `git clone` üçün həmişə `/tmp` və ya ayrı workspace istifadə et; layihə kökündə klon etmə.
- **Qayda:** Layihə kökündə `ls -d */` → yalnız `css/`, `js/`, `img/`, `docs/` olmalı; başqa qovluq varsa `.gitignore`-da olmalıdır.

---

### P13 — SEO minimal: OG, JSON-LD, sitemap yoxdur

- **Xəta:** Axtarış və sosial paylaşım üçün meta kasıbdır
- **Mərhələ:** M2
- **Səbəb:** `index.html:6-9` yalnız `<meta name="description">` var. `og:title`, `og:image`, `og:url`, `twitter:card`, `canonical`, `JSON-LD LocalBusiness` yoxdur.
- **Nəticə:** Instagram/WhatsApp paylaşımında preview çıxmir, Google "Gym Baku" axtarışında geridə qalır.
- **Necə müəyyən edildi:** `default.read: index.html:1-18` → OG tag yoxdur.
- **Həll:** `<head>`-a əlavə:
  ```html
  <link rel="canonical" href="https://liongym.az/">
  <meta property="og:title" content="LION GYM — Premium Fitness Club | Bakı">
  <meta property="og:description" content="Peşəkar məşqçilər, müasir avadanlıqlar...">
  <meta property="og:image" content="https://liongym.az/img/og-cover.jpg">
  <meta property="og:type" content="website">
  <script type="application/ld+json">
  {"@context":"https://schema.org","@type":"Gym","name":"LION GYM","address":{"@type":"PostalAddress","streetAddress":"123 Fitness küçəsi","addressLocality":"Bakı"}}
  </script>
  ```
- **Dəyişən fayllar:** `index.html:6-18`
- **Qarşısını alma:** `head` checklist: title, description, canonical, OG (4), twitter, JSON-LD, favicon.
- **Qayda:** `npx lighthouse --only-categories=seo` >90 olmadan deploy etmə.

---

### P14 — Performans: `srcset`, `webp` və CSS minifikasiya yoxdur

- **Xəta:** Optimallaşdırmasız asset-lər
- **Mərhələ:** M3, M5
- **Səbəb:** Bütün şəkillər JPG, tək ölçü; `css/style.css` 28 KB minifikasiyasız, `js/main.js` 4.9 KB minifikasiyasız. `index.html:17` CSS birbaşa yüklənir, `rel="preload"` yoxdur.
- **Nəticə:** Mobile 3G-də LCP ~3.5s, Lighthouse Performance <80.
- **Necə müəyyən edildi:** `default.bash: ls -lh css/style.css` → 28 KB; Network throttling ilə manual test.
- **Həll:**
  ```bash
  npm i -D sharp cssnano terser
  # img/ → webp + avif
  npx sharp -i img/hero.jpg -o img/hero.webp
  # css min
  npx postcss css/style.css -o css/style.min.css --use cssnano
  ```
  ```html
  <link rel="preload" href="css/style.min.css" as="style">
  <link rel="stylesheet" href="css/style.min.css">
  <picture><source srcset="img/hero.webp" type="image/webp"><img src="img/hero.jpg" alt=""></picture>
  ```
- **Dəyişən fayllar:** `css/style.css` → `css/style.min.css`, `index.html:17`, yeni `img/*.webp`
- **Qarşısını alma:** `npm run build` script-i yarad və deploy-da yalnız `dist/` push et.
- **Qayda:** `npm run build` çıxışında `css/*.min.css` və `img/*.webp` olmalıdır; Lighthouse Performance >90.

---

## 4. Gələcək Layihələr üçün Qaydalar və Check List

> Bu bölmə **ümumi layihə qurma və problem həll etmə qaydaları** kimi istənilən oxşar statik/portfolio/landing layihəsində tətbiq edilir. Hər maddə checkbox-dur — `x` ilə işarələ.

### 4.1 Layihəyə Başlamazdan ƏVVƏL (Planning)

- [ ] **P0-1 Repo izolyasiyası:** `mkdir layihe-adi && cd layihe-adi && git init` — heç vaxt `Documents/` kimi ümumi qovluğu init etmə.
- [ ] **P0-2 `.gitignore` ilk commit-dən ƏVVƏL:** `.vscode/`, `.idea/`, `node_modules/`, `*.log`, `.DS_Store`, `.impeccable/`, `Vibe-Trading/`, `*.exe`, `*.zip`, `data/` əlavə et və `git check-ignore -v <fayl>` ilə yoxla.
- [ ] **P0-3 `PRODUCT.md` / `BRIEF.md` dondur:** Brend, auditoriya, qiymətlər, copy mənbəyi yazılı şəkildə təsdiqlənmədən kod yazma.
- [ ] **P0-4 Fayl struktur qərarı:** `index.html`, `css/`, `js/`, `img/`, `docs/` — strukturu `README.md`-da çək.
- [ ] **P0-5 `README.md` skeleton:** `# Ad`, `## Quraşdırma`, `## Struktur`, `## Deploy` başlıqları boş da olsa yarat.
- [ ] **P0-6 Lisenziya və hüquq:** Şəkil lisenziyası (Unsplash → local mirror), font lisenziyası (Google Fonts OK), məzmunun reallığı təsdiqləndi?
- [ ] **P0-7 SEO head checklist hazırlığı:** title, description, canonical, OG (4), JSON-LD siyahısını hazırla.

### 4.2 İnkişaf ZAMANI (Development)

- [ ] **D-1 Atomic commit:** Hər section/feature üçün ayrı commit, mesaj `feat: ...`, `fix: ...`, `chore: ...` formatında (`commitlint` tövsiyə).
- [ ] **D-2 PR <400 sətir:** 500+ sətir PR review edilməz.
- [ ] **D-3 CSS 500-line rule:** Bir CSS faylı 600 sətiri keçərsə böl (`tokens.css`, `sections/*.css`).
- [ ] **D-4 JS guard:** Hər `getElementById` üçün `if (!el) return;`, `DOMContentLoaded` və ya `type="module"`.
- [ ] **D-5 Xarici CDN qadağası:** `unsplash.com` birbaşa commit etmə — `img/` mirror + `srcset`/`webp` məcburidir.
- [ ] **D-6 Form real endpoint:** `fetch` və ya `action` olmadan "Təşəkkürlər" mesajı merge etmə.
- [ ] **D-7 Map real pin:** `maps/embed` URL-ni brauzerdə aç və pin düzgünlüyünü ekranla təsdiqlə.
- [ ] **D-8 Dummy link qadağası:** `href="#"` commit etmə — real URL və ya `<button>`.
- [ ] **D-9 Əlçatanlıq hər commit-də:** emoji → `aria-hidden="true"` + `.sr-only`, contrast 4.5:1, klaviatura nav yoxlanıldı?
- [ ] **D-10 `git status` təmiz:** Hər session sonunda `git status --short` boş olmalıdır; `git diff --exit-code` CI-da.

### 4.3 Layihəni Tamamlamazdan ƏVVƏL (Pre-Deploy)

- [ ] **C-1 `README.md` dolu:** Quraşdırma (`npx serve` və ya `python -m http.server`), struktur ağacı, deploy təlimatı var?
- [ ] **C-2 W3C valid:** `npx html-validate index.html` və `npx stylelint css/**/*.css` 0 error?
- [ ] **C-3 Lighthouse >90:** `npx lighthouse http://localhost:8000 --only-categories=performance,accessibility,seo` hər biri >90?
- [ ] **C-4 Axe audit:** `npx axe index.html` 0 critical?
- [ ] **C-5 SEO head tam:** `grep -c "og:" index.html` ≥4, `canonical` var, `JSON-LD` var?
- [ ] **C-6 Performans asset-ləri:** `css/*.min.css` var, `img/*.webp` var, `rel="preload"` var?
- [ ] **C-7 Form E2E test:** Form doldur → Network-də POST görünür → success/error UI yoxlanıldı?
- [ ] **C-8 Map E2E test:** Map iframe real ünvanı göstərir, mobile-da toxunulur?
- [ ] **C-9 Git tarixi təmiz:** `git log --oneline` oxunaqlı, `git ls-files | grep -E '\.(exe|zip)$'` boş, `git diff origin/master` yalnız gözlənilən dəyişikliklər?
- [ ] **C-10 Repo təmizliyi:** `ls -d */` yalnız `css/`, `js/`, `img/`, `docs/`; `du -sh` <10 MB (binary yoxdur)?
- [ ] **C-11 Deploy yoxlanışı:** `npx serve` və ya `python -m http.server` ilə local preview, bütün linklər işləyir?
- [ ] **C-12 Dokumentasiya sync:** `docs/LAYIHE-REHBERI.md` və `snn12/documentation` reposu eyni commit hash-i göstərir?

### 4.4 Daimi Qaydalar (Hər Layihə üçün)

1. **Tək repo = tək layihə.** Mono-repo lazımdırsa `pnpm-workspace` və ya `git submodule` istifadə et — manual copy yox.
2. **Sənəd koddan əvvəl.** `README.md` və `docs/` olmadan feature branch açma.
3. **Şəkil = local + webp + srcset.** Xarici URL birbaşa HTML/CSS-ə girməz.
4. **Form = real endpoint və ya disabled.** Fake success ciddi biznes və hüquqi riskdir.
5. **Commit = atomik + Conventional.** `feat|fix|docs|chore(scope): subject`.
6. **Hər PR = Lighthouse + axe.** 90-dan aşağı merge yoxdur.

---

## 5. Əlavələr

### 5.1 Fayl Strukturu (hazırkı və tövsiyə edilən)

**Hazırkı (audit anı):**
```
Default Project/  ← git kökü (PROBLEM: çox layihə qarışıb)
├── index.html          583 sətir, one-page
├── css/style.css       1568 sətir, monolit
├── js/main.js          176 sətir, vanilla
├── .gitignore          27 sətir (local diff var)
├── PRODUCT.md          54 sətir, brend brief
├── docs/LAYIHE-REHBERI.md  ← BU SƏNƏD
├── README.md           ← yeniləndi
├── Vibe-Trading/       ← SİLİNMƏLİ (P12)
├── gropector/          ← SİLİNMƏLİ (P01)
├── leziz-dad/          ← SİLİNMƏLİ
├── remotion-video-system/ ← SİLİNMƏLİ
└── Aparatura*          ← SİLİNMƏLİ
```

**Tövsiyə edilən (gələcək):**
```
lion-gym/
├── index.html
├── css/
│   ├── tokens.css
│   ├── base.css
│   ├── components.css
│   └── sections.css
├── js/
│   └── main.js         ← type="module", DOMContentLoaded guard
├── img/
│   ├── hero-480.webp
│   ├── hero-900.webp
│   ├── hero-1440.webp
│   └── og-cover.jpg
├── docs/
│   └── LAYIHE-REHBERI.md
├── README.md
├── package.json        ← stylelint, lighthouse, sharp script-ləri
└── .gitignore
```

### 5.2 Git Konvensiyası (tövsiyə)

```bash
feat(hero): dark/gold hero with badge and CTA
feat(pricing): 3-tier pricing cards, Standard featured
fix(nav): burger menu closes on link click
fix(form): wire contact form to Formspree endpoint
docs: preventiv rehber elave et (P01-P14)
chore: impeccable ignore rules
```

Branch: `main` qorunur, `feat/*`, `fix/*` branch-lərindən PR.

### 5.3 Faydalı Komandalar

```bash
# Local preview
python -m http.server 8000
# və ya
npx serve .

# Audit
npx html-validate index.html
npx stylelint "css/**/*.css"
npx lighthouse http://localhost:8000 --view
npx axe index.html

# Asset optimallaşdırma
npx sharp -i img/hero.jpg -o img/hero.webp
npx postcss css/style.css -o css/style.min.css --use cssnano
```

### 5.4 İstinadlar

- `PRODUCT.md:1-54` — brend brief mənbəyi
- `index.html:1-583` — semantik struktur
- `css/style.css:8-26` — dizayn tokenləri
- `js/main.js:1-176` — interaktivlik
- Git tarixi: `02c81ab`, `1d76b44`
- Dokumentasiya repo: `https://github.com/snn12/documentation`

---

> **Son söz:** Bu rəhbər canlı sənəddir. Hər yeni layihədə qarşılaşdığın yeni P15, P16... problemini eyni 9-bənd formatında əlavə et və Check List-i yenilə. Növbəti proqramçı sənin bugünkü qeydini oxuyub eyni tələyə düşməyəcək — sənədin dəyəri budur.

— Hazırladı: Preventiv Audit, 2026-08-30 · LION GYM
