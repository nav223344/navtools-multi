import fetch from "node-fetch";

export async function handler(event, context) {
  try {
    const username = event.queryStringParameters?.username || "instagram";
    const url = `https://www.instagram.com/${username}/?__a=1`;

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
