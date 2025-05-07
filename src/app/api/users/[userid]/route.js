import { NextResponse } from "next/server";


export function GET(){
  return NextResponse.json({ message: `Searching user` });
}

export function POST(){
  return NextResponse.json({ message: `Creating user` });
}

export function PUT(){
  return NextResponse.json({ message: `Updating user` });
}

export function DELETE(){
  return NextResponse.json({ message: `Deleting user` });
}