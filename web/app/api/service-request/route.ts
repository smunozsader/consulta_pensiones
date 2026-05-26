import { saveServiceRequest, ServiceRequest } from '@/lib/firebase-service';
import { Resend } from 'resend';
import { randomUUID } from 'crypto';

function validateServiceRequest(body: any) {
  const { serviceName, nombre, email, telefono, curp, authorizesRepresentation } = body;

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
    return { valid: false, error: 'Nombre is required and must be at least 2 characters' };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false, error: 'Invalid email address' };
  }

  if (!telefono || !/^[0-9\s\-+()]{10,}$/.test(telefono.replace(/\D/g, ''))) {
    return { valid: false, error: 'Invalid phone number' };
  }

  if (!curp || curp.length !== 18) {
    return { valid: false, error: 'Invalid CURP (must be 18 characters)' };
  }

  if (!serviceName || !['estado-cuenta', 'modalidad-40', 'solicitud-pension'].includes(serviceName)) {
    return { valid: false, error: 'Invalid service name' };
  }

  if (authorizesRepresentation !== true) {
    return { valid: false, error: 'Must authorize representation' };
  }

  return { valid: true };
}

function getServiceDetails(serviceName: string) {
  const details: Record<string, { price: number; displayName: string }> = {
    'estado-cuenta': { price: 890, displayName: 'Solicitud de Estado de Cuenta' },
    'modalidad-40': { price: 1290, displayName: 'Inscripción en Modalidad 40' },
    'solicitud-pension': { price: 2890, displayName: 'Solicitud de Pensión' },
  };
  return details[serviceName];
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const validation = validateServiceRequest(body);
    if (!validation.valid) {
      return Response.json({ error: validation.error }, { status: 400 });
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
      stripePaymentIntentId,
      paymentStatus,
      paymentAmount,
      paymentDate,
    } = body;

    const serviceDetails = getServiceDetails(serviceName);
    if (!serviceDetails) {
      return Response.json({ error: 'Invalid service' }, { status: 400 });
    }

    const serviceRequestData: Omit<ServiceRequest, 'requestId'> = {
      serviceName,
      status: 'pending',
      nombre: nombre.trim(),
      email: email.trim(),
      telefono: telefono.trim(),
      curp: curp.trim().toUpperCase(),
      nss: nss ? nss.trim() : undefined,
      tieneEstadoCuenta: tieneEstadoCuenta === true,
      edadActual: edadActual ? parseInt(edadActual) : undefined,
      salarioDiario: salarioDiario ? parseFloat(salarioDiario) : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      price: serviceDetails.price,
      authorizesRepresentation: authorizesRepresentation === true,
      stripePaymentIntentId,
      paymentStatus: paymentStatus || 'pending',
      paymentAmount: paymentAmount || serviceDetails.price,
      paymentDate: paymentDate || undefined,
    };

    const result = await saveServiceRequest(serviceRequestData);

    if (!result.success) {
      return Response.json({ error: 'Failed to save service request' }, { status: 500 });
    }

    // Send confirmation email
    const resend = new Resend(process.env.RESEND_API_KEY);

    const timeEstimate: Record<string, string> = {
      'estado-cuenta': '7-10 días',
      'modalidad-40': '10-15 días',
      'solicitud-pension': '15-30 días',
    };

    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: email,
      subject: '✓ Tu solicitud de gestión fue recibida - Consultoría de Pensiones',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>¡Hola ${nombre}! 👋</h2>

          <p>Hemos recibido tu solicitud de gestión. Te indicamos los detalles:</p>

          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Servicio solicitado:</strong> ${serviceDetails.displayName}</p>
            <p><strong>Precio:</strong> $${serviceDetails.price.toLocaleString('es-MX')}</p>
            <p><strong>Tiempo estimado:</strong> ${timeEstimate[serviceName]}</p>
            <p><strong>Estado:</strong> Pendiente de confirmación</p>
          </div>

          <p><strong>Próximos pasos:</strong></p>
          <ol>
            <li>Nos contactaremos por WhatsApp en las próximas 24 horas</li>
            <li>Confirmaremos los detalles de tu caso</li>
            <li>Iniciaremos los trámites ante IMSS/ISSSTE</li>
            <li>Te mantendremos actualizado en cada paso</li>
          </ol>

          <p>Si tienes preguntas, no dudes en contactarnos por WhatsApp:</p>
          <p>
            <a href="https://wa.me/529992005550" style="background-color: #25D366; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Contactar por WhatsApp
            </a>
          </p>

          <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;" />

          <p style="font-size: 12px; color: #666;">
            <strong>Consultoría Integral de Pensiones</strong><br/>
            Especializado en IMSS e ISSSTE<br/>
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
      requestId: result.requestId,
      message: 'Tu solicitud fue recibida. Nos contactaremos por WhatsApp en 24 horas.',
      serviceName: serviceDetails.displayName,
      price: serviceDetails.price,
    });
  } catch (error) {
    console.error('Service request error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
