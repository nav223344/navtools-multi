import { useState } from "react";

export default function App() {
  const [url, setUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    if (!url) return alert("Please paste Instagram link!");

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(
        "/.netlify/functions/insta?url=" + encodeURIComponent(url)
      );

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ success: false, error: "Server error" });
    }

    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", textAlign: "center" }}>
      <h2>Instagram Downloader</h2>

      <input
        style={{ width: "90%", padding: "10px", marginBottom: "10px" }}
        placeholder="Paste Instagram Link"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        style={{ padding: "10px 20px" }}
        onClick={handleDownload}
      >
        {loading ? "Processing..." : "Download"}
      </button>

      {result && (
        <div style={{ marginTop: "20px" }}>
          {result.success ? (
            <a
              href={result.link}
              target="_blank"
              rel="noreferrer"
              style={{ color: "blue" }}
            >
              Download Video
            </a>
          ) : (
            <p style={{ color: "red" }}>{result.error || "Invalid link"}</p>
          )}
        </div>
      )}
    </div>
  );
}

