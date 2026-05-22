import { database } from './firebase';
import { ref, push, set, query, orderByChild, equalTo, get } from 'firebase/database';

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

    let subscriber = null;
    let subscriberId = null;

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
