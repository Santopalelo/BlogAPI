# BlogAPI
A robust RESTful API for a blogging platform, featuring user authentication, article management, file uploads, and ownership verification.

## Features
- User Management: Registration, login, and profile avatar uploads.
- Article Management: Full CRUD (Create, Read, Update, Delete) functionality for blog posts.
- Security: 
    - Password hashing using `bcrypt`.
    - JWT (JSON Web Token) authentication for protected routes.
    - Ownership Middleware: Ensures only the author of an article can edit or delete it.
- Advanced Querying: Pagination and search functionality for articles.
- File Handling: Multi-file upload support via Multer.
- Centralized Error Handling: Custom error middleware to handle Multer and server errors.

## 🛠️ Tech Stack
- Runtime: Node.js
- Framework: Express.js
- Database: MongoDB (via Mongoose)
- Authentication: JWT, Bcrypt
- Validation: joi
- File Uploads: Multer
- Environment: dotenv

## 📂 Project Structure
```text
BLOGAPI/
├── SRC/
│   ├── config/          # Database and 3rd party configurations (Cloudinary, etc.)
│   ├── controllers/     # Business logic for Users and Articles
│   ├── middlewares/     # Auth, Ownership, Logger, and Error handlers
│   ├── models/          # Mongoose schemas for Users and Articles
│   ├── routes/          # Route definitions
│   ├── utilities/       # Helper functions (bcrypt encryption)
│   ├── validator/       # Request validation logic
│   └── app.js           # Express application configuration
├── uploads/             # Local storage for uploaded avatars
├── .env                 # Environment variables (secret keys, DB URI)
└── index.js             # Server entry point
```

## ⚙️ Installation & Setup
1. Clone the repository:
   ```bash
   git clone <https://github.com/Santopalelo/BlogAPI>
   cd BlogAPI
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Environment Variables:
   Create a `.env` file in the root directory based on `.env.example`:
   ```env
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
4. Run the server:
   ```bash
   npm start or 
   npm run dev <development>
   ```
   The server will run on `https://blogapi-3m9l.onrender.com`.

---

# Part 2: Postman Documentation
*Use this layout to create your Postman Collection. Group the requests into two folders: User Auth and Articles.*

Base URL: `https://blogapi-3m9l.onrender.com/api`  
Auth Method: Bearer Token (JWT)

## 📁 Folder 1: User Auth
| Action | Method | Endpoint | Body/Params | Auth | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Sign Up | `POST` | `/users/sign-up` | `{email, password, name}` | None | Registers a new user. |
| Login | `POST` | `/users/login` | `{email, password}` | None | Returns a JWT token. |
| Upload Avatar| `POST` | `/users/upload/avatar`| `form-data` (Key: `avatar`, Type: File) | None/JWT | Uploads up to 5 images. |

## 📁 Folder 2: Articles
*Note: All requests in this folder require a `Bearer <token>` in the Authorization header.*

| Action | Method | Endpoint | Params/Body | Auth | Description |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Create Article| `POST` | `/articles` | `{title, content, ...}` | JWT | Creates a new blog post. |
| Get All | `GET` | `/articles` | `?page=1&limit=10` | JWT | Fetches articles with pagination. |
| Search | `GET` | `/articles/search` | `?q=keyword` | JWT | Search articles by title/content. |
| Get Single | `GET` | `/articles/:id` | `id` (URL Param) | JWT | Fetches a specific article. |
| Update | `PUT` | `/articles/:id` | `{title, content}` | JWT | Updates article (Owner only). |
| Delete | `DELETE` | `/articles/:id` | `id` (URL Param) | JWT | Deletes article (Owner only). |

### 💡 Postman Testing Tips:
1. Auth Variable: After logging in, copy the token and save it as a Postman Environment Variable named `{{token}}`. 
2. Authorization Tab: Set the "Auth" tab of the Articles folder to `Bearer Token` and use `{{token}}`. This applies the token to all requests inside that folder automatically.
3. File Uploads: For the `/upload/avatar` endpoint, ensure the body type is set to `form-data` and the key type is changed from `Text` to `File`.

### Expected Response Codes:
- `200 OK`: Request successful.
- `201 Created`: Resource created successfully.
- `400 Bad Request`: Validation error or Multer upload error.
- `401 Unauthorized`: Missing or invalid JWT token.
- `403 Forbidden`: User is authenticated but does not own the resource (`requireOwnership`).
- `404 Not Found`: Resource or User not found.
- `500 Internal Server Error`: Unexpected server error.