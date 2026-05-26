import { database } from './firebase';
import { ref, push, set, query, orderByChild, equalTo, get, update } from 'firebase/database';

export interface SubscriberData {
  nombre: string;
  telefono: string;
  correo: string;
  nss?: string;
  semanas_cotizadas?: number;
  privacyAccepted: boolean;
  marketingAccepted: boolean;
  accessToken: string;
}

export interface ServiceRequest {
  requestId: string;
  subscriberId?: string;
  serviceName: 'estado-cuenta' | 'modalidad-40' | 'solicitud-pension';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';

  nombre: string;
  email: string;
  telefono: string;
  curp: string;
  nss?: string;

  tieneEstadoCuenta?: boolean;
  edadActual?: number;
  salarioDiario?: number;

  createdAt: string;
  updatedAt: string;
  price: number;

  notes?: string;
  expectedCompletionDate?: string;

  authorizesRepresentation: boolean;

  stripePaymentIntentId?: string;
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentAmount: number;
  paymentDate?: string;
}

export interface CalculationRecord {
  calculationId: string;
  nombre: string;
  email: string;
  telefono?: string;

  // Calculation Inputs
  edadActual: number;
  salarioDiario: number;
  semanasCotizadas: number;
  ley: string;
  annoInicio: number;
  tieneEsposa: boolean;
  numHijos: number;
  padresDependientes: boolean;

  // Calculation Outputs
  cuantiaBasica: number;
  incrementoExtra: number;
  pensionA60: number;
  pensionA65: number;
  gafes: number;

  // Metadata
  createdAt: string;
  downloadedAt?: string;
  pdfGenerated: boolean;
  status: 'completed';
}

export async function saveSubscriber(data: SubscriberData) {
  try {
    const subscribersRef = ref(database, 'subscribers');
    const newSubscriberRef = push(subscribersRef);

    await set(newSubscriberRef, {
      nombre: data.nombre,
      telefono: data.telefono,
      correo: data.correo,
      nss: data.nss || null,
      semanas_cotizadas: data.semanas_cotizadas || null,
      privacyAccepted: data.privacyAccepted,
      marketingAccepted: data.marketingAccepted,
      accessToken: data.accessToken,
      subscribedAt: new Date().toISOString(),
      status: 'active',
      accessCount: 0,
    });

    return { success: true, id: newSubscriberRef.key };
  } catch (error) {
    console.error('Error saving subscriber:', error);
    throw error;
  }
}

export async function verifyAccessToken(token: string) {
  try {
    const subscribersRef = ref(database, 'subscribers');
    const tokenQuery = query(subscribersRef, orderByChild('accessToken'), equalTo(token));
    const snapshot = await get(tokenQuery);

    if (!snapshot.exists()) {
      return { valid: false, subscriber: null };
    }

    let subscriber: any = null;
    let subscriberId: string | null = null;

    snapshot.forEach((childSnapshot) => {
      subscriber = childSnapshot.val();
      subscriberId = childSnapshot.key;
    });

    if (!subscriber) {
      return { valid: false, subscriber: null };
    }

    // Update lastAccessDate and accessCount
    if (subscriberId) {
      const updates: Record<string, any> = {
        lastAccessDate: new Date().toISOString(),
        accessCount: (subscriber.accessCount || 0) + 1,
      };

      const subscriberRef = ref(database, `subscribers/${subscriberId}`);
      await set(subscriberRef, { ...subscriber, ...updates });

      // Return subscriber data without accessToken for security
      const { accessToken, ...safeData } = subscriber;
      return {
        valid: true,
        subscriber: {
          ...safeData,
          ...updates,
        },
      };
    }

    return { valid: false, subscriber: null };
  } catch (error) {
    console.error('Error verifying access token:', error);
    return { valid: false, subscriber: null };
  }
}

export async function saveServiceRequest(data: Omit<ServiceRequest, 'requestId'>) {
  try {
    const serviceRequestsRef = ref(database, 'service-requests');
    const newRequestRef = push(serviceRequestsRef);
    const requestId = newRequestRef.key || '';

    const now = new Date().toISOString();

    await set(newRequestRef, {
      requestId,
      serviceName: data.serviceName,
      status: 'pending',
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono,
      curp: data.curp,
      nss: data.nss || null,
      tieneEstadoCuenta: data.tieneEstadoCuenta || false,
      edadActual: data.edadActual || null,
      salarioDiario: data.salarioDiario || null,
      createdAt: now,
      updatedAt: now,
      price: data.price,
      notes: '',
      expectedCompletionDate: null,
      authorizesRepresentation: data.authorizesRepresentation,
      stripePaymentIntentId: data.stripePaymentIntentId || null,
      paymentStatus: data.paymentStatus || 'pending',
      paymentAmount: data.paymentAmount,
      paymentDate: data.paymentDate || null,
      subscriberId: data.subscriberId || null,
    });

    return { success: true, requestId };
  } catch (error) {
    console.error('Error saving service request:', error);
    throw error;
  }
}

export async function updateServiceRequest(
  requestId: string,
  updates: Partial<ServiceRequest>
) {
  try {
    const requestRef = ref(database, `service-requests/${requestId}`);

    const updateData = {
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    await update(requestRef, updateData);

    return { success: true };
  } catch (error) {
    console.error('Error updating service request:', error);
    throw error;
  }
}

export async function getServiceRequest(requestId: string) {
  try {
    const requestRef = ref(database, `service-requests/${requestId}`);
    const snapshot = await get(requestRef);

    if (!snapshot.exists()) {
      return { success: false, data: null };
    }

    return { success: true, data: snapshot.val() };
  } catch (error) {
    console.error('Error getting service request:', error);
    return { success: false, data: null };
  }
}

export async function getClientServiceRequests(subscriberId: string) {
  try {
    const serviceRequestsRef = ref(database, 'service-requests');
    const clientRequestsQuery = query(
      serviceRequestsRef,
      orderByChild('subscriberId'),
      equalTo(subscriberId)
    );
    const snapshot = await get(clientRequestsQuery);

    if (!snapshot.exists()) {
      return { success: true, data: [] };
    }

    const requests: ServiceRequest[] = [];
    snapshot.forEach((childSnapshot) => {
      requests.push(childSnapshot.val());
    });

    return { success: true, data: requests };
  } catch (error) {
    console.error('Error getting client service requests:', error);
    return { success: false, data: [] };
  }
}

export async function saveCalculation(data: Omit<CalculationRecord, 'calculationId' | 'createdAt'>) {
  try {
    const calculationsRef = ref(database, 'calculations');
    const newCalculationRef = push(calculationsRef);
    const calculationId = newCalculationRef.key || '';

    const now = new Date().toISOString();

    await set(newCalculationRef, {
      calculationId,
      nombre: data.nombre,
      email: data.email,
      telefono: data.telefono || '',

      // Calculation Inputs
      edadActual: data.edadActual,
      salarioDiario: data.salarioDiario,
      semanasCotizadas: data.semanasCotizadas,
      ley: data.ley,
      annoInicio: data.annoInicio,
      tieneEsposa: data.tieneEsposa,
      numHijos: data.numHijos,
      padresDependientes: data.padresDependientes,

      // Calculation Outputs
      cuantiaBasica: data.cuantiaBasica,
      incrementoExtra: data.incrementoExtra,
      pensionA60: data.pensionA60,
      pensionA65: data.pensionA65,
      gafes: data.gafes,

      // Metadata
      createdAt: now,
      downloadedAt: null,
      pdfGenerated: false,
      status: 'completed',
    });

    return { success: true, calculationId };
  } catch (error) {
    console.error('Error saving calculation:', error);
    throw error;
  }
}

export async function updateCalculation(
  calculationId: string,
  updates: Partial<CalculationRecord>
) {
  try {
    const calculationRef = ref(database, `calculations/${calculationId}`);

    const updateData = {
      ...updates,
    };

    await update(calculationRef, updateData);

    return { success: true };
  } catch (error) {
    console.error('Error updating calculation:', error);
    throw error;
  }
}
