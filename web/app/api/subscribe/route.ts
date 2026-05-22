import { saveSubscriber } from '@/lib/firebase-service';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return Response.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    // Save to Firebase
    await saveSubscriber(email);

    // Send welcome email via Resend
    await resend.emails.send({
      from: 'mi.consultor.pensiones@gmail.com',
      to: email,
      subject: '✓ Bienvenido a Consultoría de Pensiones - Tu Guía Gratis',
      html: `
        <h2>¡Hola! 👋</h2>
        <p>Gracias por suscribirse a nuestra consultoría de pensiones.</p>
        <p>Te hemos guardado en nuestra base de datos. Pronto recibirás tu guía exclusiva: <strong>"Cálculo de Semanas Cotizadas"</strong></p>
        <p>Si tienes dudas sobre tu elegibilidad bajo Ley 73 o necesitas una consulta personalizada, escríbeme por WhatsApp:</p>
        <p><a href="https://wa.me/529992005550" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">Contactar por WhatsApp</a></p>
        <hr />
        <p style="font-size: 12px; color: #666;">
          <strong>Consultoría Integral de Pensiones</strong><br/>
          Mérida, Yucatán<br/>
          <a href="mailto:mi.consultor.pensiones@gmail.com">mi.consultor.pensiones@gmail.com</a>
        </p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error('Subscribe error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
