import connectToDB from '@/lib/db';
import Updates from '@/lib/models/Updates';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectToDB();
    const updates = await Updates.find();
    return new NextResponse(JSON.stringify(updates), { status: 200 });
  } catch (error: any) {
    return new NextResponse('Error in fetching users' + error.message, {
      status: 500,
    });
  }
};
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    await connectToDB();
    const newUpdates = new Updates(body);
    await newUpdates.save();
    return new NextResponse(
      JSON.stringify({
        message: 'Updates created sucessfully',
        update: newUpdates,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse('Error in creating update' + error.message, {
      status: 500,
    });
  }
};
