import Stripe from 'stripe';
import { saveServiceRequest, ServiceRequest } from '@/lib/firebase-service';

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {});
  }
  return stripe;
}

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET || '';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature');

    if (!signature || !webhookSecret) {
      return Response.json({ error: 'Missing webhook secret or signature' }, { status: 400 });
    }

    const stripe = getStripe();
    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (error) {
      console.error('Webhook signature verification failed:', error);
      return Response.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (event.type === 'payment_intent.succeeded') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      if (!paymentIntent.metadata) {
        console.error('Payment intent missing metadata');
        return Response.json({ error: 'Missing metadata' }, { status: 400 });
      }

      const {
        serviceName,
        nombre,
        email,
        telefono,
        curp,
        nss,
        tieneEstadoCuenta,
        edadActual,
        salarioDiario,
        authorizesRepresentation,
      } = paymentIntent.metadata;

      const serviceRequestData: Omit<ServiceRequest, 'requestId'> = {
        serviceName: serviceName as any,
        status: 'pending',
        nombre,
        email,
        telefono,
        curp,
        nss: nss || undefined,
        tieneEstadoCuenta: tieneEstadoCuenta === 'true',
        edadActual: edadActual ? parseInt(edadActual) : undefined,
        salarioDiario: salarioDiario ? parseFloat(salarioDiario) : undefined,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        price: paymentIntent.amount / 100,
        authorizesRepresentation: authorizesRepresentation === 'true',
        stripePaymentIntentId: paymentIntent.id,
        paymentStatus: 'completed',
        paymentAmount: paymentIntent.amount / 100,
        paymentDate: new Date().toISOString(),
      };

      try {
        await saveServiceRequest(serviceRequestData);
        console.log(`Service request created for payment ${paymentIntent.id}`);
      } catch (error) {
        console.error('Error creating service request:', error);
        return Response.json({ error: 'Failed to save service request' }, { status: 500 });
      }
    }

    if (event.type === 'payment_intent.payment_failed') {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      console.log(`Payment failed for intent: ${paymentIntent.id}`);
    }

    return Response.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error('Webhook error:', error);
    return Response.json({ error: 'Webhook processing failed' }, { status: 500 });
  }
}
