import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { companyName, contactName, phone, email, type, message, requestType } = body;

    // Log for now - later integrate with database
    console.log('YENİ İŞƏGÖTÜRƏN MÜRACİƏTİ:', {
      requestType, // 'hire' or 'partner'
      companyName,
      contactName,
      phone,
      email,
      type,
      message,
      timestamp: new Date().toISOString()
    });

    // TODO: Save to employers table when schema is ready
    // await db.insert(employers).values({ ... });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Employer API Error:', err);
    return NextResponse.json({ error: 'Xəta baş verdi' }, { status: 500 });
  }
}
