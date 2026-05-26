import { saveSubscriber, SubscriberData } from '@/lib/firebase-service';
import { Resend } from 'resend';
import { randomUUID } from 'crypto';

function isValidWhatsAppNumber(phone: string): boolean {
  // Accept formats like: +52 999 200 5550, 52 999 200 5550, 999 200 5550, 9992005550
  const cleaned = phone.replace(/\D/g, '');
  return cleaned.length >= 10;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      nombre,
      telefono,
      correo,
      nss,
      semanas_cotizadas,
      privacyAccepted,
      marketingAccepted,
    } = body;

    // Validate required fields
    if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
      return Response.json(
        { error: 'Nombre is required and must be at least 2 characters' },
        { status: 400 }
      );
    }

    if (!telefono || !isValidWhatsAppNumber(telefono)) {
      return Response.json(
        { error: 'Invalid WhatsApp number' },
        { status: 400 }
      );
    }

    if (!correo || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
      return Response.json(
        { error: 'Invalid email' },
        { status: 400 }
      );
    }

    if (privacyAccepted !== true) {
      return Response.json(
        { error: 'Privacy acceptance is required' },
        { status: 400 }
      );
    }

    // Validate optional fields
    let semanas = undefined;
    if (semanas_cotizadas !== undefined && semanas_cotizadas !== null) {
      const parsed = parseInt(semanas_cotizadas);
      if (!isNaN(parsed) && parsed >= 0 && parsed <= 750) {
        semanas = parsed;
      }
    }

    // Generate access token
    const accessToken = randomUUID().replace(/-/g, '').substring(0, 32);

    // Prepare subscriber data
    const subscriberData: SubscriberData = {
      nombre: nombre.trim(),
      telefono: telefono.trim(),
      correo: correo.trim(),
      nss: nss ? nss.trim() : undefined,
      semanas_cotizadas: semanas,
      privacyAccepted: privacyAccepted === true,
      marketingAccepted: marketingAccepted === true,
      accessToken,
    };

    // Save to Firebase
    await saveSubscriber(subscriberData);

    // Generate access link
    const accessLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://asesor-pensiones.mx'}/acceso?token=${accessToken}`;

    // Send access email via Resend
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: correo,
      subject: '✓ Tu acceso a contenido educativo - Consultoría de Pensiones',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>¡Bienvenido(a) ${nombre}! 🎉</h2>

          <p>Hemos recibido tu registro y creado tu acceso a nuestro contenido educativo completo.</p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${accessLink}" style="background-color: #1f2937; color: white; padding: 15px 40px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; font-size: 16px;">
              Acceder a Blog y Recursos
            </a>
          </div>

          <p><strong>Este link es personal y nunca caduca.</strong> Podrás acceder siempre que necesites revisar artículos, usar la calculadora o ver casos de éxito.</p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

          <h3>¿Preguntas sobre tu pensión?</h3>
          <p>Contáctame directamente por WhatsApp para una consulta inicial sin compromiso:</p>
          <p><a href="https://wa.me/529992005550" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">Contactar por WhatsApp</a></p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

          <p style="font-size: 12px; color: #666;">
            <strong>Consultoría Integral de Pensiones</strong><br/>
            Especializado en Ley 73, Modalidades 10, 13 y 40<br/>
            Mérida, Yucatán, México<br/>
            <a href="mailto:mi.consultor.pensiones@gmail.com" style="color: #2563eb;">mi.consultor.pensiones@gmail.com</a>
          </p>

          <p style="font-size: 11px; color: #999; margin-top: 20px;">
            Tus datos están protegidos conforme a la Ley Federal de Protección de Datos Personales (LFPDPPP).
            <a href="https://asesor-pensiones.mx/privacidad" style="color: #2563eb;">Ver política de privacidad</a>
          </p>
        </div>
      `,
    });

    return Response.json({
      success: true,
      message: 'Revisa tu correo para acceder al contenido educativo',
    });
  } catch (error) {
    console.error('Subscribe error:', error);
    return Response.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
