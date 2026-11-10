# AuftragKompass Customer Tracking

Next.js frontend for customers to track their service request without login.

## Stack

- Next.js App Router + TypeScript + Tailwind
- Laravel API: `/api/user/offer-track/{token}`

## Local setup

```bash
cd customer-tracking
cp .env.example .env.local
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Set:

```env
NEXT_PUBLIC_API_BASE_URL=http://kompaslast_v.test/api
```

On the Laravel backend `.env`:

```env
TRACKING_APP_URL=http://localhost:3000
```

## Pages

Locales: `de` `en` `ar` `fr` `it` (Arabic is RTL)

- `/[locale]` token entry
- `/[locale]/confirm/[token]` confirms offer then redirects to tracking
- `/[locale]/track/[token]` status, companies, rate, message

Language switcher is in the header. Old links without locale are redirected automatically.

## Chat

Customer ↔ company chat (only companies that purchased the offer):

- Customer: `GET/POST /api/user/offer-track/{token}/chats[/{companyId}]`
- Company: `GET /api/company/chats`, `POST /api/company/chats/open`, `GET/POST /api/company/chats/{id}`

## Brand colors

- Navy `#182844`
- Blue `#0084FC`
- Orange `#FF8A1A`
- Background `#F3F5F8`
