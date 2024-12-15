import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const shed = await prisma.shed.create({
      data: {
        title: body.title,
        description: body.description,
        amount: body.amount,
      },
    });
    
    return NextResponse.json({ success: true, shed });
  } catch (error) {
    console.error('Error creating shed:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create shed' },
      { status: 500 }
    );
  }
} 