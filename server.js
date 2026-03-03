import express from "express";
import { createServer as createViteServer } from "vite";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_FILE = path.join(__dirname, "data", "opening-hours.json");

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // CORS middleware
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      return res.sendStatus(200);
    }
    next();
  });

  // Debug middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  app.post("/api/login", (req, res) => {
    console.log("Login attempt:", req.body);
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({ success: false, message: "Heslo je povinné" });
    }
    
    // Simple hardcoded password for demo purposes
    if (password === "admin") {
      console.log("Login successful");
      res.json({ success: true, token: "admin-token-xyz" });
    } else {
      console.log("Login failed - wrong password");
      res.status(401).json({ success: false, message: "Nesprávné heslo" });
    }
  });

  app.get("/api/hours", (req, res) => {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = fs.readFileSync(DATA_FILE, "utf-8");
        res.json(JSON.parse(data));
      } else {
        // Default data if file missing
        res.json({
          monday: "7:30 - 15:30",
          tuesday: "7:30 - 15:30",
          wednesday: "7:30 - 15:30",
          thursday: "7:30 - 15:30",
          friday: "7:30 - 12:00",
          note: "* Polední pauza 12:00 - 12:30"
        });
      }
    } catch (error) {
      console.error("Error reading hours:", error);
      res.status(500).json({ error: "Failed to read data" });
    }
  });

  app.post("/api/hours", (req, res) => {
    const { token, data } = req.body;
    
    console.log("POST /api/hours - token:", token ? "present" : "missing");
    console.log("POST /api/hours - data:", data);
    
    // Simple token check
    if (!token || token !== "admin-token-xyz") {
      console.log("Unauthorized access attempt");
      return res.status(401).json({ error: "Unauthorized" });
    }

    if (!data) {
      return res.status(400).json({ error: "Data is required" });
    }

    try {
      // Ensure data directory exists
      const dataDir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      
      fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2));
      console.log("Hours saved successfully to:", DATA_FILE);
      res.json({ success: true });
    } catch (error) {
      console.error("Error writing hours:", error);
      res.status(500).json({ error: "Failed to save data", details: String(error) });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
