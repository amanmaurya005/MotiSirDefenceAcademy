# Moti sir defence academy Website

A modern full-stack website for a Defence & Physical Training Academy. It includes a responsive React frontend, Express API, MongoDB/Mongoose models, course pages, gallery, video placeholders, enquiry form, Google Maps section, WhatsApp button, SEO basics and demo content that is easy to replace.

## Tech Stack

- Frontend: React.js, Vite, React Router DOM, Axios, React Icons, CSS3
- Backend: Node.js, Express.js
- Database: MongoDB with Mongoose

## Folder Structure

```text
frontend/
  src/
    components/
    pages/
    data/
    assets/images/
    assets/videos/
backend/
  config/
  controllers/
  data/
  middleware/
  models/
  routes/
```

## Installation

Install frontend:

```bash
cd frontend
npm install
```

Install backend:

```bash
cd backend
npm install
```

## Environment Variables

Create `frontend/.env`:

```text
VITE_API_URL=http://localhost:5000
```

Create `backend/.env`:

```text
PORT=5000
MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
FRONTEND_URL=http://localhost:5173
CONTACT_EMAIL_TO=rathoremotisingh651@gmail.com
SMTP_SERVICE=gmail
SMTP_USER=YOUR_GMAIL_ADDRESS
SMTP_PASS=YOUR_GMAIL_APP_PASSWORD
MAIL_FROM="Moti Sir Defence Academy <YOUR_GMAIL_ADDRESS>"
```

Example files are included as `frontend/.env.example` and `backend/.env.example`.

For Gmail SMTP, create an app password in your Google account and use that value for `SMTP_PASS`. Do not use your normal Gmail password.

## Run Locally

Start backend:

```bash
cd backend
npm run dev
```

Start frontend in another terminal:

```bash
cd frontend
npm run dev
```

Open:

```text
http://localhost:5173
```

## MongoDB Setup

1. Create a MongoDB Atlas cluster or run MongoDB locally.
2. Copy the MongoDB connection string.
3. Put it in `backend/.env` as `MONGO_URI`.
4. Start the backend.

The first `GET /api/courses` request inserts demo course data if the courses collection is empty.

## API Routes

```text
GET  /api/courses
GET  /api/courses/:slug
POST /api/enquiries
```

`POST /api/enquiries` saves the enquiry in MongoDB and sends the student details to `CONTACT_EMAIL_TO` using Nodemailer when SMTP credentials are configured.

## Replace Academy Information

Edit:

```text
frontend/src/data/config.js
```

This file controls:

- Academy name
- Phone
- WhatsApp number
- Email
- Address
- Training hours
- Google Maps embed URL
- Google directions URL
- YouTube, Instagram, WhatsApp and Facebook links

## Replace Photos

Put your real images in:

```text
frontend/src/assets/images/
frontend/src/assets/images/gallery/
```

Recommended names are listed in:

```text
frontend/src/assets/images/README.md
```

Then update image references in:

```text
frontend/src/data/config.js
frontend/src/data/siteData.js
frontend/src/data/courses.js
```

For backend course images, update:

```text
backend/data/demoCourses.js
```

or edit course documents directly in MongoDB later.

## Replace Videos / YouTube Links

Edit:

```text
frontend/src/data/siteData.js
```

Find the `videos` array and replace each `title`, `thumbnail` and `url`.

## Replace WhatsApp Number

Edit:

```text
frontend/src/data/config.js
```

Update:

```javascript
whatsappNumber
socialLinks.whatsapp
```

Use WhatsApp format without `+` for direct links, for example `919876543210`.

## Replace Google Maps Location

Edit:

```text
frontend/src/data/config.js
```

Update:

```javascript
googleMapsEmbedUrl
googleDirectionsUrl
```

Use a Google Maps embed URL for the map and a directions/search URL for the button.

## Deployment Notes

- Build frontend with `npm run build` inside `frontend`.
- Deploy `frontend/dist` to Vercel, Netlify or similar.
- Deploy backend to Render, Railway, VPS or another Node hosting service.
- Set production environment variables on the hosting provider.
- Update `FRONTEND_URL` in backend and `VITE_API_URL` in frontend for production.

## Customization Notes

Most demo content is intentionally centralized:

- `frontend/src/data/config.js` for contact and social information
- `frontend/src/data/courses.js` for frontend course fallback and icons
- `frontend/src/data/siteData.js` for gallery, videos, trainers, testimonials, activities and stats
- `backend/data/demoCourses.js` for backend demo courses

No admin panel is included in this version, keeping the project focused on the public website and enquiry flow.
