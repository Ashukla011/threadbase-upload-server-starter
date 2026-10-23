import "dotenv/config";
import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || "threadbase_secret";

app.use(cors());
app.use(express.json());

// ─── Demo account ────────────────────────────────────────────────────────────
const users = [{ userId: 1, username: "ada", password: "password" }];

// Login - returns a JWT you can use as the Bearer token when testing uploads.
app.post("/auth/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ userId: user.userId, username: user.username }, JWT_SECRET, {
    expiresIn: "8h",
  });
  res.json({ token, user: { userId: user.userId, username: user.username } });
});

// ─────────────────────────────────────────────────────────────────────────────
// TODO Task 3: serve the uploads/ folder statically so returned URLs open.
//   app.use("/uploads", express.static("uploads"));
//
// TODO Task 3: wire the upload route under /api.
//   import uploadRoutes from "./routes/upload.routes.js";
//   app.use("/api", uploadRoutes);
// ─────────────────────────────────────────────────────────────────────────────

app.get("/", (req, res) => res.json({ ok: true, service: "threadbase-upload-server" }));

app.listen(PORT, () => console.log(`Server on http://localhost:${PORT}`));
