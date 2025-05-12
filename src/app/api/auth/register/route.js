import { NextResponse } from 'next/server';
import { prisma } from "@/libs/prisma";
// const bcrypt = require('bcryptjs');

export async function POST(request) {
  try {
    const data = await request.json();
    const { name, email, password } = data;

    console.log("data:\n", data);

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    // // Hash the password (example using bcrypt)
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Save user to database (example, replace with actual DB logic)
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