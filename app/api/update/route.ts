import connectToDB from '@/lib/db';
import Updates from '@/lib/models/Updates';
import { NextResponse } from 'next/server';
import { extractLink, generateSummary } from '@/lib/utils';

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
    let description = body.topic;
    const link = extractLink(body.topic);
    if (link) {
      description = await generateSummary(link);
    }

    await connectToDB();
    const newUpdates = new Updates({
      topic: body.topic,
      description: description,
      link: link,
    });

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

export const PATCH = async (request: Request) => {
  try {
    const body = await request.json();
    const id = body.id;
    await connectToDB();

    let update = await Updates.findById(id);
    if (!update) {
      return new NextResponse('Update not found', { status: 404 });
    }

    // Toggle the 'saved' status
    update.saved = !update.saved;
    await update.save();

    return new NextResponse(
      JSON.stringify({
        message: 'Update saved successfully',
        update: update,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse('Error in updating update' + error.message, {
      status: 500,
    });
  }
};

export const DELETE = async (request: Request) => {
  try {
    const body = await request.json();
    const id = body.id;
    await connectToDB();
    const update = await Updates.findByIdAndDelete(id);
    if (!update) {
      return new NextResponse('Update not found', { status: 404 });
    }
    return new NextResponse(
      JSON.stringify({
        message: 'Update deleted successfully',
        update: update,
      }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse('Error in deleting update' + error.message, {
      status: 500,
    });
  }
};
