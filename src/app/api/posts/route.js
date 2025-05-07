import { NextResponse } from "next/server";


/////////////////////////////
/*  Next.js Route Handlers */
/////////////////////////////

// This is a simple API route that handles GET, POST, PUT, and DELETE requests for example purposes.
// You can replace the logic inside each function with your own implementation as needed, like fetching data from a database or performing other operations.

export function GET() {
  return NextResponse.json({ message: "Hello from the posts route!" });
}

export function POST() {
  return NextResponse.json({ message: `Post created!` });
}

export function PUT() {
  return NextResponse.json({ message: `Post updated!` });
}

export function DELETE() {
  return NextResponse.json({ message: `Post deleted!` });
}