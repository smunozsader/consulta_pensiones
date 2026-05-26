import { updateServiceRequest, getServiceRequest } from '@/lib/firebase-service';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin-key-not-set';

function isAuthorized(request: Request): boolean {
  const authHeader = request.headers.get('Authorization');
  if (!authHeader) return false;
  return authHeader === `Bearer ${ADMIN_PASSWORD}`;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ requestId: string }> }
) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { requestId } = await params;
    const body = await request.json();

    const { status, notes, expectedCompletionDate, paymentStatus } = body;

    const validStatuses = ['pending', 'in-progress', 'completed', 'rejected'];
    const validPaymentStatuses = ['pending', 'completed', 'failed'];

    if (status && !validStatuses.includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 });
    }

    if (paymentStatus && !validPaymentStatuses.includes(paymentStatus)) {
      return Response.json({ error: 'Invalid payment status' }, { status: 400 });
    }

    const updateData: any = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;
    if (expectedCompletionDate) updateData.expectedCompletionDate = expectedCompletionDate;
    if (paymentStatus) updateData.paymentStatus = paymentStatus;

    await updateServiceRequest(requestId, updateData);

    return Response.json({
      success: true,
      message: 'Service request updated',
    });
  } catch (error) {
    console.error('Update service request error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ requestId: string }> }
) {
  if (!isAuthorized(request)) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { requestId } = await params;
    const result = await getServiceRequest(requestId);

    if (!result.success) {
      return Response.json({ error: 'Request not found' }, { status: 404 });
    }

    return Response.json({
      success: true,
      data: result.data,
    });
  } catch (error) {
    console.error('Get service request error:', error);
    return Response.json({ error: 'Internal server error' }, { status: 500 });
  }
}
