export default async (request) => {
  return new Response(
    JSON.stringify({ message: "Hello from Netlify Function!" }),
    {
      headers: { "Content-Type": "application/json" },
    }
  );
};

