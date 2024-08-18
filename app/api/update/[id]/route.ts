// file: pages/api/update/[id].js
import connectToDB from '@/lib/db';
import Updates from '@/lib/models/Updates';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    await connectToDB();
    const update = await Updates.findById(params.id);

    if (!update) {
      return new NextResponse('Update not found', { status: 404 });
    }

    return new NextResponse(JSON.stringify(update), { status: 200 });
  } catch (error: any) {
    return new NextResponse('Error fetching update' + error.message, {
      status: 500,
    });
  }
};
