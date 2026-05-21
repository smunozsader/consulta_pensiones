import { database } from './firebase';
import { ref, push, set } from 'firebase/database';

export async function saveSubscriber(email: string) {
  try {
    const subscribersRef = ref(database, 'subscribers');
    const newSubscriberRef = push(subscribersRef);

    await set(newSubscriberRef, {
      email,
      subscribedAt: new Date().toISOString(),
      status: 'active',
    });

    return { success: true, id: newSubscriberRef.key };
  } catch (error) {
    console.error('Error saving subscriber:', error);
    throw error;
  }
}
