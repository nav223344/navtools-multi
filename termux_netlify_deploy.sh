#!/bin/bash

# 🚀 Project root
cd ~/navtools-multi || exit
echo "📂 Navigated to project root"

# 📝 netlify.toml setup
cat > netlify.toml <<EOL
[build]
command = "npm run netlify:build"
publish = "dist"
functions = "netlify/functions"

[[redirects]]
from = "/api/*"
to = "/.netlify/functions/:splat"
status = 200

[[redirects]]
from = "/*"
to = "/index.html"
status = 200
EOL
echo "📝 netlify.toml created/updated"

# ⚙️ Functions folder + insta.js
mkdir -p netlify/functions
cat > netlify/functions/insta.js <<EOL
import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const username = event.queryStringParameters?.username || "instagram";
    const url = \`https://www.instagram.com/\${username}/?__a=1\`;

    const response = await fetch(url);
    if (!response.ok) {
      return { statusCode: response.status, body: JSON.stringify({ error: "Failed to fetch Instagram data" }) };
    }

    const data = await response.json();
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
}
EOL
echo "⚙️ insta.js created"

# 🏗️ Install dependencies + build
npm install
npm run netlify:build
echo "🏗️ Build complete"

# 📝 Git add & commit
git add .
git commit -m "Full working SPA + insta.js auto deploy"
git push origin main
echo "🚀 Changes pushed to GitHub"

echo "✅ Script complete. Go to Netlify and trigger deploy."
