export async function handler(event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      link: "https://example.com/video.mp4"
    })
  };
}
