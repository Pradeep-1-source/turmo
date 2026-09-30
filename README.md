# Urban Fresh - Premium B2B Agricultural Products & Food Export Website

**Tagline:** GROWN WITH CARE DELIVERED WORLD WIDE  
**Primary Export Desk & WhatsApp:** [+91 9884449843](https://wa.me/919884449843)  
**Registered Exporter Headquarters:**  
D.No-48, VELLI VALASU, Attavanai Anumanpalli,  
PO: Arachalur, DIST: Erode, Tamil Nadu - 638101, India

---

## 🌿 Overview & Business Architecture

Urban Fresh is a premium, international export-focused digital platform connecting authentic Indian agricultural excellence with B2B global importers, food processors, and cosmetic formulators across the globe.

### Core Business Model: Pure B2B Export Inquiries
- **NO ecommerce cart / checkout / consumer accounts / online payments**
- **100% WhatsApp Trade Desk Integration**: Every product card, specification page, and contact touchpoint generates a pre-filled, contextual WhatsApp enquiry containing product name, MOQ, specifications, and packaging requests.
- **Enterprise CMS & Admin Portal**: Allows business owners to update headlines, add/edit commodities, change categories, and modify office details without touching code.

---

## 🎨 Brand Identity & Visual Language

- **Primary Colors:**
  - Dark Navy: `#03111F`
  - Deep Navy: `#061A2B`
  - Fresh Green: `#62C914`
  - Lime Green: `#A8E600`
  - White: `#FFFFFF`
  - Light Slate / Gray: `#F5F7F4`
- **Typography & Aesthetics:** Modern corporate typography, subtle floating leaf animations, maritime trade routes map, dark glassmorphism, and luxury commercial product photography.

---

## 📦 Key Export Portfolio

1. **Premium Indian Turmeric Powder & Fingers (High Curcumin Content)**
   - Whole Polished Fingers, Semi-polished, and Ultra-Fine Powder
   - Tested and certified high curcumin yield from Erode farmlands
   - NABL Lab certified COA, Phytosanitary certification, and FSSAI approved
2. **Premium Cold-Pressed Coconut Oil (Raw, Multi-Purpose Export Grade)**
   - Extra Virgin & Pure Cold-Pressed (Raw, Unrefined)
   - Moisture-controlled for extended maritime transit stability
   - Bulk drums (200L), IBCs, and retail glass jars
3. **Premium Cold-Pressed Groundnut Oil (100% Pure / Unrefined)**
   - High smoke point, 100% cold-pressed unrefined
   - Export Flexitanks (20ft container loads) & bulk drums

---

## 🚀 Technology Stack

- **Framework:** Next.js 14 (App Router) + React 18
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Custom Brand Tokens
- **Icons:** Lucide React
- **Database & Storage:** Supabase PostgreSQL + Supabase Storage + Row Level Security (RLS)
- **Deployment:** Vercel Ready

---

## 🗄️ Supabase Setup & Migration

1. Create a project in [Supabase](https://supabase.com).
2. Navigate to the **SQL Editor** in your Supabase dashboard.
3. Open `supabase/schema.sql` from this repository and run the script. It will automatically:
   - Create tables: `categories`, `products`, `product_images`, `product_highlights`, `homepage_content`, `about_content`, `quality_content`, `contact_settings`, `site_settings`.
   - Configure public read RLS and authenticated write policies.
   - Provision public storage buckets: `product-images` and `site-assets`.
   - Seed the initial categories and 3 flagship commodities.
4. Copy your Supabase credentials into `.env.local`:
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
   ```

---

## 🔐 Admin Dashboard Access

- **URL:** [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Email:** `admin@urbanfresh.in`
- **Default Password:** `UrbanFreshExport2026!`
- *(A one-click "Autofill Default Administrator Credentials" button is provided on the login page for rapid access).*

---

## 🌐 Running Locally

```bash
# Install dependencies
npm install

# Build production bundle
npm run build

# Start production server
npm run start
```

Server runs on: [http://localhost:3000](http://localhost:3000)
