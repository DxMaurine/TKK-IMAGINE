// API Proxy untuk Pollinations
export default async function handler(req, res) {
  // Hanya terima metode POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Token API disimpan di server, tidak di client
    const API_TOKEN = process.env.POLLINATIONS_API_TOKEN || "IU6OBB-pF3hKZVWC";
    
    // Ambil data dari request
    const data = req.body;
    
    // Tambahkan parameter ke URL
    const timestamp = new Date().getTime();
    const randomSeed = Math.floor(Math.random() * 10000);
    const apiUrl = `https://text.pollinations.ai/openai?token=${API_TOKEN}&random=${timestamp}&seed=${randomSeed}`;
    
    // Kirim request ke Pollinations API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    // Ambil hasil dan kirim kembali ke client
    const result = await response.json();
    return res.status(200).json(result);
  } catch (error) {
    console.error('Error proxying to Pollinations API:', error);
    return res.status(500).json({ error: 'Failed to fetch from API' });
  }
}