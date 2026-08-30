# LION GYM — Premium Fitness Club

> Bakıda premium fitness klub üçün one-page statik sayt. Dark + gold (`#FFD21F`) dizayn, `güc` tonu, tam responsive.

![LION GYM](https://img.shields.io/badge/LION%20GYM-Premium%20Fitness-FFD21F?style=for-the-badge)
![Stack](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-111111)
![No Build](https://img.shields.io/badge/build-none%20required-2ea043)

**Canlı repo:** `snn12/GYM-zal` · **Ətraflı preventiv rəhbər:** [`docs/LAYIHE-REHBERI.md`](docs/LAYIHE-REHBERI.md) · **Ümumi dokumentasiya:** [`snn12/documentation/lion-gym`](https://github.com/snn12/documentation)

---

## Qısa Məlumat

- **Auditoriya:** 18–35 yaş, Bakı — fiziki forma və özünəinam üçün premium gym axtaranlar.
- **Dəyər təklifi:** Müasir avadanlıqlar + peşəkar məşqçilər + fərdi proqramlar + dost/qrup atmosferi (retention səbəbi).
- **Ünvan:** 123 Fitness küçəsi, Bakı · **Saat:** 06:00–23:00, həftənin 7 günü
- **Əlaqə:** `+994 50 000 00 00` · `info@liongym.az` · Instagram `@_1senan`
- **Paketlər:** Starter **30 AZN/ay** · Standard **50 AZN/ay** (Ən çox seçilən) · Premium **80 AZN/ay**

## Bölmələr

`Header` → `Hero` → `Services (6)` → `About` → `Why Choose Us (4)` → `Pricing (3)` → `Trainers (4)` → `Motivation` → `Reviews (3)` → `CTA` → `Contact + Map + Form` → `Footer`

## Fayl Strukturu

```
.
├── index.html          # 583 sətir — semantik one-page, AZ copy
├── css/style.css       # 1568 sətir — :root tokenlər, responsive (1024/768/560)
├── js/main.js          # 176 sətir — burger, scroll-spy, reveal, counter, form
├── docs/LAYIHE-REHBERI.md # Preventiv layihə rəhbəri (P01–P14 + Check List)
├── PRODUCT.md          # Brend brief mənbəyi
└── .gitignore
```

Dizayn tokenləri `css/style.css:8-26` — `--gold: #ffd21f`, `--bg: #080808`, `--radius: 20px`, Oswald + Inter.

## Tez Başlama

Heç bir build aləti lazım deyil — statik faylları birbaşa aç və ya local server işə sal:

```bash
# Python
python -m http.server 8000
# ya Node
npx serve .

# sonra aç: http://localhost:8000
```

> **Qeyd:** Unsplash şəkilləri CDN-dən gəlir; offline üçün `docs/LAYIHE-REHBERI.md` P06-da `img/` mirror təlimatı var.

## Dokumentasiya

- **Preventiv rəhbər (əsas sənəd):** [`docs/LAYIHE-REHBERI.md`](docs/LAYIHE-REHBERI.md) — 7 mərhələ, P01–P14 problem analizi (9 bənd hər biri), 3 fazalı Check List. Gələcək layihələr üçün "nə səhv oldu / niyə / necə düzəltdik / necə qarşısını alaq" formatında.
- **Ümumi dokumentasiya repo:** [`snn12/documentation`](https://github.com/snn12/documentation) → `lion-gym/` qovluğu — eyni bələdçi yeni layihə adı ilə əlavə edilib.

## Texniki Qeydlər

- **Form:** Hazırda `js/main.js:146-172` yalnız client validasiya edir, backend yoxdur — real endpoint üçün `docs/LAYIHE-REHBERI.md` P09-a bax (Formspree / `fetch('/api/contact')` nümunəsi).
- **Map:** `index.html:528` placeholder koordinatdır — real embed üçün P11-ə bax.
- **Performans:** `srcset`/`webp`/`min.css` üçün P14-ə bax.
- **JS:** Qlobal scope — P07-də `DOMContentLoaded` guard tövsiyəsi var.

## Töhfə

1. Branch yarat: `feat/qisa-ad`
2. Atomic commit: `feat(scope): subject` (Conventional Commits)
3. PR <400 sətir, `docs/LAYIHE-REHBERI.md` §4 Check List-dən keç
4. `npx lighthouse` Performance/Accessibility/SEO >90 olmadan merge yoxdur

## Lisenziya

Məzmun və dizayn LION GYM-ə məxsusdur. Kod nümunələri MIT kimi təkrar istifadə edilə bilər.

---

Hazırlanıb: 2026-08-30 · Preventiv audit əsasında
