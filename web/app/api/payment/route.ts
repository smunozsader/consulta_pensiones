import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  
});

function getServicePrice(serviceName: string): number {
  const prices: Record<string, number> = {
    'estado-cuenta': 89900, // $899 in cents
    'modalidad-40': 129900, // $1,299 in cents
    'solicitud-pension': 289900, // $2,899 in cents
  };
  return prices[serviceName] || 0;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { serviceName, nombre, email } = body;

    if (!serviceName || !nombre || !email) {
      return Response.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const amount = getServicePrice(serviceName);
    if (amount === 0) {
      return Response.json(
        { error: 'Invalid service name' },
        { status: 400 }
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'mxn',
      customer_email: email,
      metadata: {
        serviceName,
        nombre,
        email,
      },
      description: `Gestión: ${serviceName}`,
    });

    return Response.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      amount,
    });
  } catch (error) {
    console.error('Payment intent creation error:', error);
    return Response.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    );
  }
}
