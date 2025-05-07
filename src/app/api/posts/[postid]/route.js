import { NextResponse } from "next/server";


export function GET(){
  return NextResponse.json({ message: `Searching post` });
}

export function POST(){
  return NextResponse.json({ message: `Creating post` });
}

export function PUT(){
  return NextResponse.json({ message: `Updating post` });
}

export function DELETE(){
  return NextResponse.json({ message: `Deleting post` });
}