<div align="center">

# 🎓 Tutor Booking Platform

### *Connect. Learn. Grow.*

A premium, modern tutor booking platform built with **Next.js 15 (App Router)** — empowering students to discover expert tutors and manage their entire learning journey from one clean, intuitive interface.

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Features

| Feature | Description |
|---|---|
| 📚 **Dynamic Subject Categories** | Browse real-time academic categories with deep-link navigation |
| 🔍 **Advanced Tutor Search** | Filter tutors by name, bio, or specific skills instantly |
| 📊 **Analytics Dashboard** | Real-time tracking of students, tutors, bookings & revenue |
| 📅 **Booking Management** | View and manage bookings with status tracking (Confirmed / Completed / Cancelled) |
| ⚡ **Skeleton Loaders** | Smooth, optimized data-fetching transitions for a seamless UX |
| 📱 **Fully Responsive** | Pixel-perfect design across mobile, tablet, and desktop |
| 🛡️ **Robust Error Handling** | User-friendly error messages with "Try Again" recovery in Server Components |

---

## 🛠️ Tech Stack

```
🧩 Framework     →  Next.js 15 (App Router)
🔷 Language      →  TypeScript
🎨 Styling       →  Tailwind CSS
🖼️  Icons         →  Lucide React
📡 Data Fetching →  Fetch API with SSR (Server-Side Rendering)
🧱 UI Components →  Shadcn UI (built on Radix UI)
```

---

## ⚙️ Environment Variables

Create a `.env.local` file in the root of your project and add the following:

```env
# ─── Server Configuration ────────────────────────────
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000

# ─── API Endpoint ────────────────────────────────────
NEXT_PUBLIC_API_BASE_API=http://localhost:5000/api/v1

# ─── Image Upload (ImageBB) ──────────────────────────
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key_here
```

> 💡 **Tip:** Get your free ImageBB API key at [api.imgbb.com](https://api.imgbb.com)

---

## 🚀 Getting Started

Follow these steps to run the project locally:

**1. Clone the repository**
```bash
git clone https://github.com/your-username/tutor-booking-frontend.git
```

**2. Navigate into the project**
```bash
cd tutor-booking-frontend
```

**3. Install dependencies**
```bash
npm install
# or
yarn install
```

**4. Set up environment variables**
```bash
cp .env.example .env.local
# Then fill in your values in .env.local
```

**5. Start the development server**
```bash
npm run dev
# or
yarn dev
```

🌐 Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

---

## 📂 Project Structure

```
tutor-booking-frontend/
│
├── 📁 app/               # Next.js App Router — Pages, Layouts, Loading states
├── 📁 components/        # Reusable UI components & Skeleton loaders
├── 📁 service/           # API services and business logic
├── 📁 type/              # TypeScript interfaces & type definitions
├── 📁 public/            # Static assets — images, SVGs, logos
│
├── .env.local            # Environment configuration (not committed)
├── next.config.ts        # Next.js configuration
└── tailwind.config.ts    # Tailwind CSS configuration
```

---

## 🚢 Deployment

The easiest way to deploy this app is via **[Vercel](https://vercel.com)** — the creators of Next.js.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository on [vercel.com/new](https://vercel.com/new)
3. Add your environment variables in the Vercel dashboard
4. Click **Deploy** — your app is live! 🎉

---

## 🤝 Contributing

Contributions are always welcome! Here's how to get started:

1. **Fork** this repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m 'feat: add amazing feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a **Pull Request**

---



<div align="center">



⭐ If you found this project helpful, please consider giving it a star!

</div>
