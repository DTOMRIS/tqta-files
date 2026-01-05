import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { leads } from '@/lib/schema';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { adSoyad, telefon, email, ilgilenilenProgram, mesaj, kaynak } = body;

    // Validation
    if (!adSoyad || !telefon || !email) {
      return NextResponse.json(
        { error: 'Bütün məcburi sahələri doldurun' },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Düzgün e-poçt ünvanı daxil edin' },
        { status: 400 }
      );
    }

    // Check if lead already exists (by email)
    const existingLead = await db
      .select()
      .from(leads)
      .where(eq(leads.email, email))
      .limit(1);

    if (existingLead.length > 0) {
      // Update existing lead instead of creating duplicate
      const [updatedLead] = await db
        .update(leads)
        .set({
          adSoyad,
          telefon,
          ilgilenilenProgram: ilgilenilenProgram || existingLead[0].ilgilenilenProgram,
          mesaj: mesaj || existingLead[0].mesaj,
          kaynak: kaynak || existingLead[0].kaynak,
          updatedAt: new Date()
        })
        .where(eq(leads.id, existingLead[0].id))
        .returning();

      return NextResponse.json({ 
        success: true, 
        id: updatedLead.id,
        message: 'Müraciətiniz yeniləndi'
      });
    }

    // Insert new lead
    const [lead] = await db
      .insert(leads)
      .values({
        adSoyad,
        telefon,
        email,
        ilgilenilenProgram: ilgilenilenProgram || null,
        mesaj: mesaj || null,
        kaynak: kaynak || 'landing_page',
        durum: 'yeni'
      })
      .returning();

    // Context Graph event (async - don't wait)
    try {
      const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
      await fetch(`${baseUrl}/api/context/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          entityType: 'lead',
          entityId: lead.id.toString(),
          eventType: 'lead_captured',
          actor: 'system',
          action: 'form_submitted',
          reasoning: `Yeni lead: ${adSoyad} - ${ilgilenilenProgram || 'Program seçilmədi'} - ${kaynak || 'landing_page'}`,
          context: {
            email,
            telefon,
            kaynak: kaynak || 'landing_page',
            program: ilgilenilenProgram || null
          },
          outcome: 'lead_created'
        })
      });
    } catch (error) {
      console.error('Context Graph event error:', error);
      // Don't fail the request if context event fails
    }

    // TODO: Email notification (admin'e)
    // TODO: SMS notification (optional)

    return NextResponse.json({ 
      success: true, 
      id: lead.id,
      message: 'Müraciətiniz uğurla qeydə alındı'
    });
  } catch (error) {
    console.error('Lead kayıt hatası:', error);
    return NextResponse.json(
      { error: 'Kayıt zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.' },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    // Admin için lead listesi
    // TODO: Auth check ekle
    const allLeads = await db
      .select()
      .from(leads)
      .orderBy(leads.createdAt);

    return NextResponse.json({ success: true, data: allLeads });
  } catch (error) {
    console.error('Lead listesi hatası:', error);
    return NextResponse.json(
      { error: 'Xəta baş verdi' },
      { status: 500 }
    );
  }
}




