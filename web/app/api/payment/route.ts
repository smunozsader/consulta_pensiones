import Stripe from 'stripe';

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {});
  }
  return stripe;
}

function getServicePrice(serviceName: string): number {
  const prices: Record<string, number> = {
    'estado-cuenta': 89900,
    'modalidad-40': 129900,
    'solicitud-pension': 289900,
  };
  return prices[serviceName] || 0;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { amount, serviceId, serviceName, nombre, email, telefono, curp, nss, tieneEstadoCuenta, edadActual, salarioDiario, authorizesRepresentation } = body;

    if (!amount || !serviceName) {
      return Response.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const stripe = getStripe();

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'mxn',
      receipt_email: email,
      metadata: {
        serviceName,
        nombre,
        email,
        telefono,
        curp,
        nss: nss || '',
        tieneEstadoCuenta: String(tieneEstadoCuenta),
        edadActual: String(edadActual || ''),
        salarioDiario: String(salarioDiario || ''),
        authorizesRepresentation: String(authorizesRepresentation),
      },
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    });
  } catch (error) {
    console.error('Payment error:', error);
    return Response.json({ error: 'Failed to create payment intent' }, { status: 500 });
  }
}
