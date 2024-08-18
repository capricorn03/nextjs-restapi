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
    body.topic = body.topic.replace(link, '.');
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
