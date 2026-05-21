import { saveSubscriber } from '@/lib/firebase-service';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    await saveSubscriber(email);
    return Response.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
