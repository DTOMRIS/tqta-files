import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { db } from '@/lib/db';
import { workshops, masterclasses } from '@/lib/schema';
import { eq } from 'drizzle-orm';

// Program verileri (static - landing page'den)
const programs = [
  {
    name: "Aşpaz Bacarıqları",
    level: "CTH Level 2 Award in Cookery Skills",
    duration: "12 Həftə",
    desc: "Peşəkar aşpazlıq texnikaları və beynəlxalq standartlarda təhsil",
    kategori: "Kulinari"
  },
  {
    name: "Barista Bacarıqları",
    level: "CTH Level 2 Award in Barista Skills",
    duration: "8 Həftə",
    desc: "Espresso hazırlama, latte art və kofe sənəti",
    kategori: "Kafe"
  },
  {
    name: "Restoran Xidməti",
    level: "CTH Level 2 Certificate in Professional Restaurant Front of House Service",
    duration: "10 Həftə",
    desc: "Qonaq xidməti, restoran idarəetməsi və peşəkar xidmət standartları",
    kategori: "Restoran"
  },
  {
    name: "Turizm və Qonaqlama İngiliscəsi",
    level: "CTH Level 1 Certificate in English for Tourism and Hospitality",
    duration: "16 Həftə",
    desc: "Turizm və qonaqlama sənayesi üçün xüsusi İngilis dili təhsil",
    kategori: "Turizm"
  }
];

// RAG: Veritabanından ilgili içeriği çek
async function retrieveContext(userMessage: string) {
  const keywords = userMessage.toLowerCase();
  let context = '';

  // Program verileri
  if (keywords.includes('program') || keywords.includes('proqram') || 
      keywords.includes('aşpaz') || keywords.includes('barista') || 
      keywords.includes('restoran') || keywords.includes('turizm') ||
      keywords.includes('fiyat') || keywords.includes('qiymət') ||
      keywords.includes('süre') || keywords.includes('müddət') ||
      keywords.includes('sertifika') || keywords.includes('sertifikat')) {
    context += '\n\n=== TQTA PROQRAMLARI ===\n';
    programs.forEach(prog => {
      context += `\n📚 ${prog.name}\n`;
      context += `   Səviyyə: ${prog.level}\n`;
      context += `   Müddət: ${prog.duration}\n`;
      context += `   Təsvir: ${prog.desc}\n`;
      context += `   Kateqoriya: ${prog.kategori}\n`;
    });
  }

  // Workshop verileri
  if (keywords.includes('workshop') || keywords.includes('atölye') || 
      keywords.includes('workshop') || keywords.includes('masterclass')) {
    try {
      const allWorkshops = await db
        .select()
        .from(workshops)
        .where(eq(workshops.aktif, true))
        .limit(10);
      
      if (allWorkshops.length > 0) {
        context += '\n\n=== WORKSHOPLAR ===\n';
        allWorkshops.forEach(ws => {
          context += `\n🎨 ${ws.ad}\n`;
          if (ws.muellim) context += `   Müəllim: ${ws.muellim}\n`;
          if (ws.muddet) context += `   Müddət: ${ws.muddet}\n`;
          if (ws.qiymet) context += `   Qiymət: ${ws.qiymet} AZN\n`;
          if (ws.tesvir) context += `   Təsvir: ${ws.tesvir}\n`;
        });
      }
    } catch (error) {
      console.error('Workshop retrieval error:', error);
    }
  }

  // Masterclass verileri
  if (keywords.includes('masterclass') || keywords.includes('master')) {
    try {
      const allMasterclasses = await db
        .select()
        .from(masterclasses)
        .where(eq(masterclasses.aktif, true))
        .limit(5);
      
      if (allMasterclasses.length > 0) {
        context += '\n\n=== MASTERCLASSLAR ===\n';
        allMasterclasses.forEach(mc => {
          context += `\n⭐ ${mc.ad}\n`;
          if (mc.muellim) context += `   Müəllim: ${mc.muellim}\n`;
          if (mc.muddet) context += `   Müddət: ${mc.muddet}\n`;
          if (mc.qiymet) context += `   Qiymət: ${mc.qiymet} AZN\n`;
          if (mc.tesvir) context += `   Təsvir: ${mc.tesvir}\n`;
        });
      }
    } catch (error) {
      console.error('Masterclass retrieval error:', error);
    }
  }

  return context;
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || lastMessage.role !== 'user') {
      return new Response('Invalid request', { status: 400 });
    }

    // RAG: İlgili içeriği getir
    const context = await retrieveContext(lastMessage.content);

    // System prompt - Azerbaycan dili, samimi ama profesyonel
    const systemPrompt = `Sən "Beledçiniz" - TQTA Culinary Academy-nin rəhbərisən. 

GÖREVİN:
- Azərbaycan dilində samimi, dostcasına və köməkçi bir şəkildə cavab vermək
- Təhsil proqramları, qiymətlər, müddət, sertifikatlar haqqında məlumat vermək
- İstifadəçini başvuru etməyə təşviq etmək (amma təzyiq etmədən)
- Hər cavabın sonunda növbəti addımı təklif etmək

MƏLUMATLAR:
${context}

QAYDALAR:
- Qısa və aydın cavablar ver (maksimum 3-4 cümlə)
- Bilinməyən bir şey soruşulursa: "Bu məsələ haqqında ətraflı məlumat üçün komandamızla əlaqə saxlayın: +994 51 769 61 81"
- Hər cavabın sonunda bir sonraki addımı təklif et (məs: "Daha çox məlumat istəyirsiniz?" və ya "Başvuru etmək üçün kömək edə bilərəm?")
- Rəsmi deyil, dostcasına üslub istifadə et
- Emoji istifadə et (amma həddindən artıq deyil)
- Akademik dil istifadə ETMƏ - sadə, başa düşülən dil

NÜMUNƏ CAVABLAR:
- "Aşpaz proqramı haqqında məlumat verin" → "Əlbəttə! 'Aşpaz Bacarıqları' proqramımız 12 həftə davam edir və CTH Level 2 sertifikatı verir. Peşəkar aşpazlıq texnikalarını öyrənəcəksiniz. Daha ətraflı məlumat istəyirsiniz?"
- "Qiymət nə qədərdir?" → "Proqramlarımızın qiymətləri müxtəlifdir. Dəqiq qiymət və ödəniş planları üçün komandamızla əlaqə saxlayın: +994 51 769 61 81. Yaxud başvuru formasını doldurun, sizinlə əlaqə saxlayacağıq! 📞"
`;

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: systemPrompt,
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
      maxTokens: 500,
      temperature: 0.7,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('AI Chat error:', error);
    return new Response(
      JSON.stringify({ error: 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.' }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}




