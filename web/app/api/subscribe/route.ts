import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    // Store email in a simple file-based system
    // In production, use a database
    const subscribersFile = path.join(process.cwd(), 'data', 'subscribers.json');
    const dir = path.dirname(subscribersFile);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let subscribers: { email: string; date: string }[] = [];
    if (fs.existsSync(subscribersFile)) {
      const data = fs.readFileSync(subscribersFile, 'utf-8');
      subscribers = JSON.parse(data);
    }

    // Check if email already exists
    if (!subscribers.find(sub => sub.email === email)) {
      subscribers.push({
        email,
        date: new Date().toISOString(),
      });

      fs.writeFileSync(subscribersFile, JSON.stringify(subscribers, null, 2));
    }

    return Response.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
