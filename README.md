# MyGuestList — Frontend

React/Vite SPA for managing wedding guest lists. Served from S3 via CloudFront CDN, and also containerized on EKS for the dynamic API path.

**Live:** https://d1mjlad8qvj4iq.cloudfront.net

---

## Stack

| Technology | Version |
|-----------|---------|
| React | 18.2 |
| Vite | 5.0 |
| TailwindCSS | 3.3 |
| Axios | 1.6 |

---

## Project Structure

```
MyGuestList-Frontend/
├── src/
│   ├── App.jsx             # Root component + routing
│   ├── main.jsx            # React entrypoint
│   ├── index.css           # Tailwind base styles
│   ├── assets/             # Static assets
│   └── components/         # React components
├── nginx.conf              # Nginx config for production container
├── Dockerfile              # Multi-stage: Node (build) → Nginx (serve)
├── vite.config.js
└── tailwind.config.js
```

---

## Features

- User registration and login (JWT stored in memory)
- Dashboard with live statistics — invited / confirmed / pending / declined
- Guest table with search, status filters, and inline editing
- Filter by side (Groom / Bride), category (Family / Friends / Work), and RSVP status
- Fully responsive layout with TailwindCSS

---

## Local Development

```bash
npm install
npm run dev
# → http://localhost:5173
```

Create `.env`:
```
VITE_API_URL=http://localhost:5000
```

Requires the backend running locally (see [MyGuestList-Backend](../MyGuestList-Backend/README.md)).

---

## Build & Deploy

```bash
npm run build   # outputs to dist/
```

The CI/CD pipeline (triggered on push to `main`):
1. `npm run build`
2. Upload `dist/` artifact
3. Sync `dist/` to S3 — `aws s3 sync`
4. Invalidate CloudFront cache — `aws cloudfront create-invalidation`
5. Build Docker image → push to ECR
6. Update EKS deployment — `kubectl set image`

---

## Docker

```bash
docker build -t myguestlist-frontend .
docker run -p 80:80 myguestlist-frontend
```

Multi-stage build: Node builds the static assets, Nginx serves them in production. Runs as non-root UID 101 (nginx user).

---

## Security

| Feature | Detail |
|---------|--------|
| Non-root user | UID 101 (nginx) |
| Read-only filesystem | `readOnlyRootFilesystem: true` in K8s |
| Capabilities | `drop: [ALL]` |
| Resource limits | CPU 500m / Memory 256Mi |
| S3 access | Bucket is private — only CloudFront can read via OAC |
