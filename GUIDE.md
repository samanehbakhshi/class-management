# 📘 Project Development Guide  
### Next.js + TypeScript + Supabase  
این فایل راهنمای کامل برای توسعه‌ی اصولی، تمیز و حرفه‌ای پروژه است.

---

# 🧱 1. Branch Strategy (GitHub Flow)

## 🌱 شاخه اصلی
- `main` → همیشه نسخه‌ی پایدار پروژه.

## 🔥 برای هر فیچر یک شاخه جدید بساز:
فرمت:
feat/<feature-name>
fix/<bug-name>
refactor/<change-name>
style/<ui-change>
types/<model-name>
chore/<task-name>


### مثال‌ها:
feat/home-page
feat/student-form
types/student-model
fix/input-export
refactor/form-validation


---

# ✍️ 2. Conventional Commit Messages

ساختار پیام:

type(scope?): message

## انواع متداول:
- `feat:` → اضافه شدن فیچر جدید
- `fix:` → رفع باگ
- `refactor:` → تغییر در کد بدون تغییر رفتار
- `style:` → تغییر UI / CSS / Tailwind
- `types:` → تایپ‌های TypeScript
- `chore:` → کارهای جانبی (تنظیمات، کانفیگ، پاکسازی)

## مثال‌ها:
feat(home): add Home page layout
feat(ui): add InputField and Checkbox components
types(student): define Student interface
fix(form): resolve InputField export error
refactor(api): improve Supabase fetch logic
style(table): update colors and spacing


---

# 🔀 3. Pull Request Rules

### عنوان PR:

feat: implement student form and TS models

### چه زمانی PR بسازی؟
- وقتی یک فیچر کامل شد  
- وقتی یک بخش قابل بررسی است  
- وقتی نیاز به بازخورد داری  

---

# 🧩 4. Code Structure

پیشنهاد ساختار:
src/
app/
(routes)
components/
ui/
InputField.tsx
Checkbox.tsx
students/
StudentTable.tsx
StudentForm.tsx
types/
student.ts
user.ts
attendance.ts
lib/
supabase.ts

---

# 🧪 5. TypeScript Rules

### تایپ‌ها را اینجا تعریف کن:

### مثال:
```ts
export interface Student {
  id: number;
  created_at: string;
  class_id: number;
  first_name: string;
  last_name: string;
  national_id: string;
  city: string;
  province: string;
  phone: string;
}
``

# 🎨 7. UI/UX Rules

- تمام فرم‌ها با کامپوننت‌های reusable ساخته شوند

- Margin/Spacing با Tailwind کنترل شود

- از رنگ‌های ثابت استفاده کن تا UI یکنواخت باشد

- جدول‌ها همیشه sortable و readable باشند

# 🧼 8. Clean Code Rules

- نام کامپوننت‌ها PascalCase

- نام فایل‌ها camelCase یا kebab-case

- تابع‌ها کوتاه و ساده

- هر کامپوننت یک کار انجام دهد

- map/filters به جای loops سنتی

🚀 9. Workflow روزانه

- یک branch جدید بساز

- فیچر را پیاده کن

- تست دستی انجام بده

- commit های کوچک و معنی‌دار بزن

- PR بساز و merge کن

- branch را پاک کن

🏁 10. هدف این پروژه

- این پروژه باید تبدیل شود به:

- یک نمونه‌کار قوی

- یک داشبورد واقعی مدیریت کلاس

- کاملاً Typed

- با UI حرفه‌ای و ساختاری تمیز

- قابل گسترش برای نسخه‌ی تجاری