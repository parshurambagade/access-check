# AccessCheck

## ✅ The 10 Accessibility Rules To Check

### 1️⃣ Images have alt text

- **Check:** All `<img>` elements have an `alt` attribute.
- **Fail:** Missing `alt`
- **Warning:** `alt=""` (decorative only)
- **Why it matters:** Screen readers can’t describe images.

---

### 2️⃣ Buttons have accessible names

- **Check:** Buttons have text, `aria-label`, or `aria-labelledby`.
- **Fail:** Icon-only buttons without labels.
- **Why it matters:** Screen readers announce button purpose.

---

### 3️⃣ Inputs have labels

- **Check:** Inputs are associated with `<label>` or `aria-label`.
- **Fail:** Placeholder-only inputs.
- **Why it matters:** Users don’t know what input is for.

---

### 4️⃣ Page has a single `<h1>`

- **Check:** Exactly one `<h1>` exists.
- **Fail:** No `<h1>` or multiple `<h1>`s.
- **Why it matters:** Screen readers use it as page title.

---

### 5️⃣ Heading order is logical

- **Check:** No heading level jumps (`h1 → h3`).
- **Fail:** Skipped levels.
- **Why it matters:** Broken content structure.

---

### 6️⃣ Page has a main landmark

- **Check:** `<main>` or `role="main"` exists.
- **Fail:** Missing main content region.
- **Why it matters:** Screen reader navigation.

---

### 7️⃣ Links have meaningful text

- **Check:** `<a>` text is descriptive.
- **Fail:** “Click here”, “Read more”.
- **Why it matters:** Links must make sense out of context.

---

### 8️⃣ Clickable elements are keyboard-focusable

- **Check:** Interactive elements are reachable via keyboard.
- **Fail:** `<div onClick>` without `tabindex`.
- **Why it matters:** Keyboard-only users.

---

### 9️⃣ ARIA roles are not misused

- **Check:** ARIA not used on native elements unnecessarily.
- **Warning:** `role="button"` on `<button>`.
- **Fail:** Invalid ARIA role.
- **Why it matters:** ARIA misuse breaks accessibility.

---

### 🔟 Document language is defined

- **Check:** <html lang="en"> exists
- **Fail:** lang attribute missing
- **Why it matters:** Screen readers need language to pronounce text correctly
