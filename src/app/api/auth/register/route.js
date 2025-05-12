import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prisma";
import bcrypt from 'bcrypt';


export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, password } = data;

    console.log("data:\n", data);

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    }

    // Save user to database (example, replace with actual DB logic)
    // Hash the password (example using bcrypt)
    data.password = await bcrypt.hash(data.password, 10);
    const newUser = await prisma.user.create({
        data
    });

    // Simulate saving to DB
    console.log('User registered:', newUser);

    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error registering user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}