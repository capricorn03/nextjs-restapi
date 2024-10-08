import connectToDB from '@/lib/db';
import User from '@/lib/models/User';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    await connectToDB();
    const users = await User.find();
    return new NextResponse(JSON.stringify(users), { status: 200 });
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
    const newUser = new User(body);
    await newUser.save();
    return new NextResponse(
      JSON.stringify({ message: 'User created sucessfully', user: newUser }),
      { status: 200 },
    );
  } catch (error: any) {
    return new NextResponse('Error in creating user' + error.message, {
      status: 500,
    });
  }
};
