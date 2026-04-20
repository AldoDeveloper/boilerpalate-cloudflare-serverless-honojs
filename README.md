# Boilerplate API CV - Cloudflare Worker CV/Portfolio API

A comprehensive RESTful API for managing CV/Portfolio data, built with **Hono** and deployed on **Cloudflare Workers**. Features Cloudflare D1 database, image processing, and HTTP Basic Authentication.

---

## 🚀 Features

- ✅ Full CRUD operations for all portfolio sections
- 🔐 HTTP Basic Authentication with bcrypt password hashing
- 🖼️ Image upload & transformation via Cloudflare Images
- 📝 Request validation with Zod
- 🗄️ Cloudflare D1 (SQLite) database
- ⚡ Deployed on Cloudflare Workers (edge computing)

---

## 📋 Tech Stack

| Component | Technology |
|-----------|-----------|
| Framework | [Hono](https://hono.dev/) v4.12.12 |
| Runtime | Cloudflare Workers |
| Database | Cloudflare D1 (SQLite) |
| Validation | [Zod](https://zod.dev/) v4.3.6 |
| Authentication | HTTP Basic Auth + bcrypt |
| Image Processing | Cloudflare Images |
| Language | TypeScript |

---

## 📁 Project Structure

```
src/
├── modules/              # Feature modules
│   ├── users/
│   ├── projects/
│   ├── experiences/
│   ├── educations/
│   ├── skills/
│   ├── expertise/
│   ├── certifications/
│   ├── achievements/
│   ├── services/
│   ├── articles/
│   ├── contacts/
│   ├── open-sources/
│   ├── profile/
│   └── images/
├── core/                 # Core utilities
│   ├── auth.ts          # Authentication middleware
│   ├── base.response.ts # Response helpers
│   ├── context.ts       # Environment context
│   └── http.error.code.ts
├── types/               # TypeScript type definitions
└── index.ts             # Application entry point
```

### Module Architecture

Each module follows a clean **layered architecture**:

```
module/
├── routes.ts              # Router & endpoint definitions
├── module.controller.ts   # Request/response handling
├── module.service.ts      # Business logic
├── module.repository.ts   # Database queries
├── module.schema.ts       # Zod validation schemas
├── module.validator.ts    # Validator middleware
└── dto/module.dto.ts      # Data Transfer Objects
```

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- pnpm (or npm/yarn)
- Cloudflare account (for deployment)
- Wrangler CLI

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd api-cv
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Setup Wrangler configuration**
   
   Ensure `wrangler.jsonc` is properly configured with:
   - D1 database binding
   - Images binding (if using image features)
   - Required environment variables

4. **Run database migrations**
   ```bash
   # Local development
   pnpm migration:dev
   
   # Production (after deployment)
   wrangler d1 migrations apply api_cv_db --remote
   ```

5. **Start development server**
   ```bash
   pnpm dev
   ```
   
   The API will be available at `http://localhost:8787`

---

## 📡 API Documentation

### Base URL

```
Development: http://localhost:8787
Production:  https://<your-worker>.workers.dev
```

### Authentication

**All `/api/*` endpoints require HTTP Basic Authentication.**

Include credentials in every request:

```bash
curl -u username:password https://<your-worker>.workers.dev/api/projects
```

Or with header:

```bash
curl -H "Authorization: Basic <base64(username:password)>" \
  https://<your-worker>.workers.dev/api/projects
```

To create a user, use the `/api/user` endpoint (also requires auth - set up initial user via Wrangler or direct database access).

---

### Response Format

All endpoints return a consistent JSON structure:

**Success Response:**
```json
{
  "success": true,
  "message": "OK",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Not Found",
  "errors": ["Resource not found"]
}
```

---

### API Endpoints

#### 👤 Users (`/api/user`)

Manage API users with authentication credentials.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/user` | Create new user |
| `GET` | `/api/user` | List all users |
| `GET` | `/api/user/:id` | Get user by ID |
| `PATCH` | `/api/user/:id` | Update user |
| `DELETE` | `/api/user/:id` | Delete user |

**Create User Request:**
```json
{
  "name": "John Doe",
  "username": "johndoe",
  "password": "securepassword",
  "email": "john@example.com",
  "is_active": true
}
```

---

#### 💼 Profile (`/api/profile`)

Manage your professional profile information.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/profile` | Create profile |
| `GET` | `/api/profile` | List all profiles |
| `GET` | `/api/profile/:id` | Get profile by ID |
| `GET` | `/api/profile/username/:username` | Get profile by username |
| `PATCH` | `/api/profile/:id` | Update profile |
| `DELETE` | `/api/profile/:id` | Delete profile |

**Create Profile Request:**
```json
{
  "full_name": "John Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "headline": "Senior Full Stack Developer",
  "bio": "Experienced developer with 5+ years...",
  "avatar_url": "https://example.com/avatar.jpg",
  "resume_url": "https://example.com/resume.pdf",
  "location": "Jakarta, Indonesia",
  "is_available": true,
  "years_of_experience": 5
}
```

---

#### 🚀 Projects (`/api/projects`)

Showcase your portfolio projects.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/projects` | Create project |
| `GET` | `/api/projects` | List all projects |
| `GET` | `/api/projects/:id` | Get project by ID |
| `GET` | `/api/projects/slug/:slug` | Get project by slug |
| `PATCH` | `/api/projects/:id` | Update project |
| `DELETE` | `/api/projects/:id` | Delete project |

**Create Project Request:**
```json
{
  "title": "E-Commerce Platform",
  "slug": "ecommerce-platform",
  "description": "A modern e-commerce solution",
  "content_md": "# Project Details\n\nBuilt with...",
  "thumbnail_url": "https://example.com/thumb.jpg",
  "demo_url": "https://demo.example.com",
  "repo_url": "https://github.com/user/project",
  "video_url": "https://youtube.com/watch?v=..."
}
```

---

#### 💼 Experiences (`/api/experiences`)

Document your work experience.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/experiences` | Create experience |
| `POST` | `/api/experiences/many` | Bulk create experiences |
| `GET` | `/api/experiences` | List all experiences (sorted by date) |
| `GET` | `/api/experiences/:id` | Get experience by ID |
| `PATCH` | `/api/experiences/:id` | Update experience |
| `DELETE` | `/api/experiences/:id` | Delete experience |

**Create Experience Request:**
```json
{
  "company_name": "Tech Corp",
  "position": "Senior Developer",
  "employment_type": "full-time",
  "location": "Jakarta, Indonesia",
  "is_remote": true,
  "start_date": "2022-01-01",
  "end_date": "2024-12-31",
  "is_current": false,
  "description": "Led development of microservices..."
}
```

**Bulk Create Request:**
```json
[
  {
    "company_name": "Company A",
    "position": "Developer",
    "employment_type": "full-time",
    "start_date": "2020-01-01"
  },
  {
    "company_name": "Company B",
    "position": "Senior Developer",
    "employment_type": "full-time",
    "start_date": "2022-01-01"
  }
]
```

---

#### 🎓 Educations (`/api/educations`)

Document your educational background.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/educations` | Create education |
| `POST` | `/api/educations/many` | Bulk create educations |
| `GET` | `/api/educations` | List all educations |
| `GET` | `/api/educations/:id` | Get education by ID |
| `PATCH` | `/api/educations/:id` | Update education |
| `DELETE` | `/api/educations/:id` | Delete education |

**Create Education Request:**
```json
{
  "institution_name": "University of Indonesia",
  "education_level": "bachelor",
  "major": "Computer Science",
  "start_date": "2016-09-01",
  "end_date": "2020-06-30",
  "is_current": false,
  "grade": "3.85",
  "description": "Focus on software engineering..."
}
```

---

#### 🛠️ Skills (`/api/skills`)

List your technical skills and proficiency levels.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/skills` | Create skill |
| `GET` | `/api/skills` | List all skills |
| `GET` | `/api/skills/:id` | Get skill by ID |
| `PATCH` | `/api/skills/:id` | Update skill |
| `DELETE` | `/api/skills/:id` | Delete skill |

**Create Skill Request:**
```json
{
  "name": "JavaScript",
  "category": "backend",
  "level": "advanced",
  "description": "5+ years experience"
}
```

**Category Options:** `backend`, `frontend`, `devops`, `other`  
**Level Options:** `beginner`, `intermediate`, `advanced`

---

#### 🎯 Expertise (`/api/expertise`)

Highlight your areas of expertise.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/expertise` | Create expertise |
| `GET` | `/api/expertise` | List all expertise |
| `GET` | `/api/expertise/:id` | Get expertise by ID |
| `PATCH` | `/api/expertise/:id` | Update expertise |
| `DELETE` | `/api/expertise/:id` | Delete expertise |

**Create Expertise Request:**
```json
{
  "title": "Microservices Architecture",
  "description": "Designing and implementing scalable distributed systems..."
}
```

---

#### 📜 Certifications (`/api/certifications`)

Showcase your professional certifications.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/certifications` | Create certification |
| `GET` | `/api/certifications` | List all certifications |
| `GET` | `/api/certifications/:id` | Get certification by ID |
| `PATCH` | `/api/certifications/:id` | Update certification |
| `DELETE` | `/api/certifications/:id` | Delete certification |

**Create Certification Request:**
```json
{
  "name": "AWS Solutions Architect",
  "issuer": "Amazon Web Services",
  "issue_date": "2023-06-15",
  "credential_url": "https://credential.example.com/123",
  "description": "Professional level certification"
}
```

---

#### 🏆 Achievements (`/api/achievements`)

Document your professional achievements.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/achievements` | Create achievement |
| `GET` | `/api/achievements` | List all achievements |
| `GET` | `/api/achievements/:id` | Get achievement by ID |
| `PATCH` | `/api/achievements/:id` | Update achievement |
| `DELETE` | `/api/achievements/:id` | Delete achievement |

**Create Achievement Request:**
```json
{
  "title": "Employee of the Year",
  "description": "Recognized for outstanding performance",
  "issuer": "Company Name",
  "date": "2023-12-01",
  "certificate_url": "https://certificate.example.com",
  "image_url": "https://example.com/achievement.jpg",
  "category": "professional",
  "status": "verified"
}
```

**Status Options:** `verified`, `pending`, `in-progress`

---

#### 💡 Services (`/api/services`)

List services you offer.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/services` | Create service |
| `GET` | `/api/services` | List all services |
| `GET` | `/api/services/:id` | Get service by ID |
| `PATCH` | `/api/services/:id` | Update service |
| `DELETE` | `/api/services/:id` | Delete service |

**Create Service Request:**
```json
{
  "title": "Web Development",
  "description": "Full-stack web application development",
  "price": "Starting from $1000"
}
```

---

#### 📝 Articles (`/api/articles`)

Manage your blog posts and articles.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/articles` | Create article |
| `GET` | `/api/articles` | List all articles |
| `GET` | `/api/articles/:id` | Get article by ID |
| `GET` | `/api/articles/slug/:slug` | Get article by slug |
| `PATCH` | `/api/articles/:id` | Update article |
| `DELETE` | `/api/articles/:id` | Delete article |

**Create Article Request:**
```json
{
  "title": "Getting Started with Cloudflare Workers",
  "slug": "getting-started-cloudflare-workers",
  "content_md": "# Getting Started\n\nCloudflare Workers are...",
  "thumbnail_url": "https://example.com/article.jpg",
  "published": true
}
```

---

#### 📞 Contacts (`/api/contacts`)

Manage your contact information and social links.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/contacts` | Create contact |
| `GET` | `/api/contacts` | List all contacts |
| `GET` | `/api/contacts/:id` | Get contact by ID |
| `PATCH` | `/api/contacts/:id` | Update contact |
| `DELETE` | `/api/contacts/:id` | Delete contact |

**Create Contact Request:**
```json
{
  "type": "github",
  "url": "https://github.com/yourusername",
  "label": "GitHub Profile"
}
```

**Type Options:** `github`, `linkedin`, `email`, `twitter`, `instagram`, `website`, `other`

---

#### 🔓 Open Source (`/api/open-sources`)

Showcase your open source contributions.

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/open-sources` | Create open-source project |
| `GET` | `/api/open-sources` | List all open-source projects |
| `GET` | `/api/open-sources/:id` | Get open-source project by ID |
| `PATCH` | `/api/open-sources/:id` | Update open-source project |
| `DELETE` | `/api/open-sources/:id` | Delete open-source project |

**Create Open Source Request:**
```json
{
  "project_name": "awesome-library",
  "repo_url": "https://github.com/user/awesome-library",
  "description": "A useful library for developers",
  "stars": 150
}
```

---

#### 🖼️ Images

Upload and transform images.

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `POST` | `/upload` | ❌ No | Upload image (resized to 250x250 PNG) |
| `POST` | `/api/images` | ✅ Yes | Upload image with custom transformations |

**Upload Image (multipart/form-data):**

```bash
curl -X POST https://<your-worker>.workers.dev/api/images \
  -u username:password \
  -F "file=@/path/to/image.jpg" \
  -F "formatType=image/webp" \
  -F "width=800" \
  -F "height=600" \
  -F "rotate=0"
```

**Parameters:**
- `file` (required): Image file
- `file_name` (optional): Custom filename
- `formatType` (optional): `image/webp`, `image/jpeg`, `image/png`, `image/gif`, `image/avif`, `rgb`, `rgba`
- `width` (optional): Target width
- `height` (optional): Target height
- `rotate` (optional): `0`, `90`, `180`, `270`

---

## 📝 Database Migrations

Migrations are stored in the `migrations/` directory:

```
migrations/
├── 0001_create_table.sql              # Users table
├── 0002_create_profile.sql            # Profiles table
├── 0003_create_projects.sql           # Projects table
├── 0004_add_column_projects.sql       # Add content_md to projects
├── 0005_add_column_projects.sql       # Add video_url to projects
├── 0006_create_table_experience.sql   # Experiences table
├── 0007_create_table_education.sql    # Educations table
├── 0008_create_table_skills.sql       # Skills table
├── 0009_create_table_expertise.sql    # Expertise table
├── 0010_create_table_certifications.sql # Certifications table
├── 0011_create_table_achievements.sql   # Achievements table
├── 0012_create_table_services.sql       # Services table
├── 0013_create_table_articles.sql       # Articles table
├── 0014_create_table_contacts.sql       # Contacts table
├── 0015_create_table_open_sources.sql   # Open sources table
└── 0016_add_column_achievements.sql     # Add columns to achievements
```

### Apply Migrations

```bash
# Local development
pnpm migration:dev

# Production
wrangler d1 migrations apply api_cv_db --remote
```

---

## 🔧 Available Scripts

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start development server with Wrangler |
| `pnpm deploy` | Deploy to Cloudflare Workers |
| `pnpm migration:dev` | Apply migrations locally |
| `pnpm cf-typegen` | Generate Cloudflare types |

---

## 🚀 Deployment

### Deploy to Cloudflare Workers

```bash
# Login to Cloudflare
wrangler login

# Deploy
pnpm deploy
```

Your API will be deployed to `https://<your-worker>.workers.dev`

---

## 📊 Environment Variables

Configure in `wrangler.jsonc`:

| Variable | Type | Description |
|----------|------|-------------|
| `api_cv_db` | D1Database | D1 database binding |
| `IMAGES` | ImagesBinding | Cloudflare Images binding |
| `CLOUDFLARE_ACCOUNT_ID` | string | Your Cloudflare account ID |

---

## 🧪 Testing with cURL

### Create a User
```bash
curl -X POST http://localhost:8787/api/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Admin User",
    "username": "admin",
    "password": "securepassword123",
    "email": "admin@example.com",
    "is_active": true
  }'
```

### Create a Project
```bash
curl -X POST http://localhost:8787/api/projects \
  -u admin:securepassword123 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Project",
    "slug": "my-first-project",
    "description": "A sample project"
  }'
```

### Get All Projects
```bash
curl http://localhost:8787/api/projects \
  -u admin:securepassword123
```

---

## 🏗️ Architecture Principles

- **Separation of Concerns**: Clear layers (routes → controllers → services → repositories)
- **Validation First**: Zod schemas validate all incoming data
- **Type Safety**: Full TypeScript coverage
- **Consistent Responses**: Uniform response format across all endpoints
- **Security**: Passwords hashed with bcrypt, authentication on all API routes

---

## 📖 Example: Complete Workflow

1. **Setup** - Deploy and run migrations
2. **Create User** - POST `/api/user`
3. **Create Profile** - POST `/api/profile`
4. **Add Experiences** - POST `/api/experiences/many` (bulk)
5. **Add Skills** - POST `/api/skills`
6. **Add Projects** - POST `/api/projects`
7. **Upload Images** - POST `/api/images`
8. **Fetch Data** - GET endpoints for your frontend/app

---

## 🤝 Contributing

Contributions are welcome! Please follow the existing architecture patterns:

1. Create module in `src/modules/<module-name>/`
2. Follow the 6-file layered pattern
3. Create migration in `migrations/`
4. Add validation schemas
5. Test thoroughly

---

## 📄 License

MIT License - feel free to use this project for your portfolio API.

---

## 📞 Support

For issues or questions, please open an issue in the repository.

---

**Built with ❤️ using Hono & Cloudflare Workers**
