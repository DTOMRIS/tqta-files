import { streamText } from 'ai';
import { anthropic } from '@ai-sdk/anthropic';
import { db } from '@/lib/db';
import { workshops, masterclasses, kurslar } from '@/lib/schema';
import { eq, sql } from 'drizzle-orm';
import { KURSLAR } from '@/data/kurslar';

// ========================
// TQTA BİLGİ TABANI (Knowledge Base)
// ========================

const TQTA_KNOWLEDGE = {
  about: {
    name: 'TQTA — Turan Qastro Turizm Akademiyası',
    foundDate: '4 dekabr 2024',
    location: 'Sumqayıt, Azərbaycan',
    model: '"Sənaye Məktəb" modeli',
    supporter: 'TİKA (Türkiyə Əməkdaşlıq və Koordinasiya Agentliyi)',
    unique: 'Azərbaycan və regionda ilk CTH akkreditasiyalı kulinariya mərkəzi'
  },
  cth: {
    fullName: 'Confederation of Tourism and Hospitality',
    recognition: 'London, Paris, Dubay, Gordon Ramsay Academy-də keçərli',
    levels: ['Level 2 Award', 'Level 3 Diploma', 'Level 4 Diploma'],
    benefit: 'Dünya mətbəxlərində işləmək hüququ'
  },
  contact: {
    phone: '+994 51 769 61 81',
    whatsapp: '+994 51 769 61 81',
    email: 'info@tqta.az',
    address: 'Sumqayıt şəhəri',
    workHours: 'Həftə içi: 09:00 - 18:00'
  },
  partners: {
    founders: ['Azərbaycan Sağlamlıq və Termal Turizm Dəstək İctimai Birliyi', 'Turan Restoranlar Şəbəkəsi', 'DK Agency', 'TİKA'],
    government: ['Dövlət Məşğulluq Agentliyi (DMA)'],
    international: ['Lefke Avropa Universiteti (ŞKTC)', 'Səlcuq Universiteti', 'Çanakkale Onsekiz Mart Universiteti'],
    industry: ['AQSİA', 'AQİSA']
  },
  dma: {
    name: 'Dövlət Məşğulluq Agentliyi',
    benefit: 'Pulsuz təhsil imkanı',
    guarantee: 'İş təminatı',
    certificate: 'Dövlət sertifikatı'
  },
  employment: {
    rate: '90%',
    hotels: ['Hilton', 'Marriott', 'Four Seasons', 'Hyatt', 'Fairmont', 'Jumeirah', 'Rixos', 'Kempinski'],
    locations: ['London', 'Paris', 'Dubai', 'İstanbul', 'Antalya', 'Moskva', 'Soçi', 'Singapore', 'New York']
  },
  registration: {
    url: '/telebe-qeydiyyat',
    requirements: ['Şəxsiyyət vəsiqəsi', 'Fotoşəkil', 'Təhsil sənədi'],
    steps: ['Formu doldurun', 'Sənədləri təqdim edin', 'Ödəniş (DMA proqramları pulsuz)', 'Təlimə başlayın']
  }
};

// Kurs məlumatlarını format et
function formatCourseInfo(course: typeof KURSLAR[0]) {
  const priceInfo = course.qiymet.dmaOdenissiz 
    ? '💚 PULSUZ (DMA dəstəkli)' 
    : `${course.qiymet.satisAZN} AZN`;
  
  const typeEmoji = course.tip === 'CTH' ? '🏆' : course.tip === 'DMA' ? '🏛️' : '📚';
  
  return `
${typeEmoji} ${course.ad}
├─ 💰 Qiymət: ${priceInfo}
├─ 📅 Müddət: ${course.muddet.toplamGun} gün (${course.muddet.toplamSaat} saat)
├─ 📖 Nəzəriyyə: ${course.muddet.dersProgrami.nezeriyye} saat
├─ 🔧 Praktika: ${course.muddet.dersProgrami.praktika} saat
${course.cth ? `├─ 🎓 CTH Level: ${course.cth.level}\n├─ 🌍 Beynəlxalq tanınma: Bəli` : ''}
${course.dma ? `├─ 📋 DMA Sənədləri: ${course.dma.senedPaketi.join(', ')}` : ''}
`;
}

// RAG: Veritabanından və statik datadan ilgili içeriği çek
async function retrieveContext(userMessage: string) {
  const keywords = userMessage.toLowerCase();
  let context = '';

  // 1. Əsas TQTA Məlumatları
  if (keywords.match(/haqqımızda|nədir|kimdir|akademiya|tqta|hakkında|ne.?yapıyor/)) {
    context += `\n\n=== TQTA HAQQINDA ===\n`;
    context += `• Ad: ${TQTA_KNOWLEDGE.about.name}\n`;
    context += `• Açılış: ${TQTA_KNOWLEDGE.about.foundDate}, ${TQTA_KNOWLEDGE.about.location}\n`;
    context += `• Model: ${TQTA_KNOWLEDGE.about.model}\n`;
    context += `• Dəstək: ${TQTA_KNOWLEDGE.about.supporter}\n`;
    context += `• Xüsusiyyət: ${TQTA_KNOWLEDGE.about.unique}\n`;
  }

  // 2. CTH Məlumatları
  if (keywords.match(/cth|sertifikat|certificate|beynəlxalq|international|gordon|ramsay/)) {
    context += `\n\n=== CTH SERTİFİKATI ===\n`;
    context += `• ${TQTA_KNOWLEDGE.cth.fullName}\n`;
    context += `• Keçərlilik: ${TQTA_KNOWLEDGE.cth.recognition}\n`;
    context += `• Səviyyələr: ${TQTA_KNOWLEDGE.cth.levels.join(', ')}\n`;
    context += `• Fayda: ${TQTA_KNOWLEDGE.cth.benefit}\n`;
  }

  // 3. DMA (Pulsuz) Məlumatları
  if (keywords.match(/dma|pulsuz|free|dövlət|government|ödənişsiz|məşğulluq|işsiz/)) {
    context += `\n\n=== DMA PULSUZ PROQRAMLAR ===\n`;
    context += `• ${TQTA_KNOWLEDGE.dma.name} ilə əməkdaşlıq\n`;
    context += `• ✓ ${TQTA_KNOWLEDGE.dma.benefit}\n`;
    context += `• ✓ ${TQTA_KNOWLEDGE.dma.guarantee}\n`;
    context += `• ✓ ${TQTA_KNOWLEDGE.dma.certificate}\n`;
    
    const dmaCourses = KURSLAR.filter(k => k.tip === 'DMA' && k.aktif);
    context += `\nDMA Proqramları:\n`;
    dmaCourses.forEach(course => {
      context += formatCourseInfo(course);
    });
  }

  // 4. Kurs və Proqram Məlumatları
  if (keywords.match(/kurs|proqram|program|course|aşpaz|barista|ofisiant|garson|otel|turizm|xidmət/)) {
    // Spesifik kurs axtarışı
    if (keywords.includes('barista')) {
      const baristaCourses = KURSLAR.filter(k => k.ad.toLowerCase().includes('barista') && k.aktif);
      context += `\n\n=== BARİSTA KURSLARI ===\n`;
      baristaCourses.forEach(course => { context += formatCourseInfo(course); });
    } else if (keywords.match(/aşpaz|chef|cook|yemek|yemək/)) {
      const chefCourses = KURSLAR.filter(k => (k.ad.toLowerCase().includes('aşpaz') || k.ad.toLowerCase().includes('cookery')) && k.aktif);
      context += `\n\n=== AŞPAZLIQ KURSLARI ===\n`;
      chefCourses.forEach(course => { context += formatCourseInfo(course); });
    } else if (keywords.match(/ofisiant|garson|waiter|restoran|front.?of.?house|foh/)) {
      const waiterCourses = KURSLAR.filter(k => (k.ad.toLowerCase().includes('ofisiant') || k.ad.toLowerCase().includes('front of house')) && k.aktif);
      context += `\n\n=== OFİSİANT KURSLARI ===\n`;
      waiterCourses.forEach(course => { context += formatCourseInfo(course); });
    } else if (keywords.match(/otel|hotel|turizm|tourism|qapıçı|xadimə|housekeeping/)) {
      const tourismCourses = KURSLAR.filter(k => k.kategoriId === 'turizm' && k.aktif);
      context += `\n\n=== TURİZM & OTEL KURSLARI ===\n`;
      tourismCourses.forEach(course => { context += formatCourseInfo(course); });
    } else {
      // Bütün kurslar
      context += `\n\n=== BÜTÜN KURSLAR ===\n`;
      const activeCourses = KURSLAR.filter(k => k.aktif);
      activeCourses.forEach(course => { context += formatCourseInfo(course); });
    }
  }

  // 5. Qiymət Məlumatları
  if (keywords.match(/qiymət|fiyat|price|cost|nə qədər|ne kadar|ödəniş|para|manat|azn/)) {
    context += `\n\n=== QİYMƏT SİYASƏTİ ===\n`;
    context += `🏛️ DMA Proqramları: PULSUZ (Dövlət tərəfindən ödənilir)\n`;
    context += `🏆 CTH Proqramları: 1000-1200 AZN\n`;
    context += `📚 Standart Proqramlar: 300-900 AZN\n`;
    context += `\n💳 Ödəniş seçimləri: Tam ödəniş, Taksit, DMA (pulsuz)\n`;
    context += `📞 Dəqiq qiymət üçün: ${TQTA_KNOWLEDGE.contact.phone}\n`;
  }

  // 6. İş İmkanları
  if (keywords.match(/iş|job|work|career|karyera|maas|maaş|salary|nerede|harada|otel|hotel|employment/)) {
    context += `\n\n=== İŞ İMKANLARI ===\n`;
    context += `• İşlə təminat: ${TQTA_KNOWLEDGE.employment.rate}\n`;
    context += `• Beynəlxalq otellər: ${TQTA_KNOWLEDGE.employment.hotels.join(', ')}\n`;
    context += `• İş yerleri: ${TQTA_KNOWLEDGE.employment.locations.join(', ')}\n`;
    context += `\n🌍 CTH sertifikatı ilə dünya mətbəxlərində işləyə bilərsiniz!\n`;
  }

  // 7. Qeydiyyat
  if (keywords.match(/qeydiyyat|kayıt|register|başla|başvur|necə|nasıl|apply|enrollment/)) {
    context += `\n\n=== QEYDİYYAT ===\n`;
    context += `📋 Tələb olunan sənədlər: ${TQTA_KNOWLEDGE.registration.requirements.join(', ')}\n`;
    context += `\n📝 Addımlar:\n`;
    TQTA_KNOWLEDGE.registration.steps.forEach((step, i) => {
      context += `${i + 1}. ${step}\n`;
    });
    context += `\n🔗 Online qeydiyyat: ${TQTA_KNOWLEDGE.registration.url}\n`;
  }

  // 8. Əlaqə
  if (keywords.match(/əlaqə|contact|telefon|phone|whatsapp|email|ünvan|adres|address|zəng|call/)) {
    context += `\n\n=== ƏLAQƏ ===\n`;
    context += `📞 Telefon: ${TQTA_KNOWLEDGE.contact.phone}\n`;
    context += `💬 WhatsApp: ${TQTA_KNOWLEDGE.contact.whatsapp}\n`;
    context += `📧 Email: ${TQTA_KNOWLEDGE.contact.email}\n`;
    context += `📍 Ünvan: ${TQTA_KNOWLEDGE.contact.address}\n`;
    context += `🕐 İş saatları: ${TQTA_KNOWLEDGE.contact.workHours}\n`;
  }

  // 9. Workshop/Masterclass (DB-dən)
  if (keywords.match(/workshop|atölye|masterclass|master/)) {
    try {
      const allWorkshops = await db
        .select()
        .from(workshops)
        .where(eq(workshops.aktif, true))
        .limit(10);
      
      if (allWorkshops.length > 0) {
        context += '\n\n=== WORKSHOPLAR ===\n';
        allWorkshops.forEach((ws: any) => {
          context += `\n🎨 ${ws.ad}\n`;
          if (ws.muellim) context += `   Müəllim: ${ws.muellim}\n`;
          if (ws.muddet) context += `   Müddət: ${ws.muddet}\n`;
          if (ws.qiymet) context += `   Qiymət: ${ws.qiymet} AZN\n`;
        });
      }
    } catch (error) {
      console.error('Workshop retrieval error:', error);
    }
  }

  // 10. Tərəfdaşlıqlar
  if (keywords.match(/tərəfdaş|partner|əməkdaşlıq|university|universitet/)) {
    context += `\n\n=== TƏRƏFDAŞLIQLar ===\n`;
    context += `🏢 Təsisçilər: ${TQTA_KNOWLEDGE.partners.founders.join(', ')}\n`;
    context += `🏛️ Dövlət: ${TQTA_KNOWLEDGE.partners.government.join(', ')}\n`;
    context += `🌍 Beynəlxalq: ${TQTA_KNOWLEDGE.partners.international.join(', ')}\n`;
    context += `🏭 Sənaye: ${TQTA_KNOWLEDGE.partners.industry.join(', ')}\n`;
  }

  return context;
}

// ========================
// SYSTEM PROMPT
// ========================
const SYSTEM_PROMPT = `Sən "TQTA Bələdçisi" - Turan Qastro Turizm Akademiyasının rəsmi köməkçisisən.

🎯 ƏSAS VƏZİFƏLƏRİN:
1. Tələbə namizədlərini proqramlar haqqında məlumatlandırmaq
2. Qeydiyyat prosesində kömək etmək  
3. Kurs seçimində məsləhət vermək
4. Karyera imkanlarını təqdim etmək
5. Əlaqə məlumatlarını vermək

📝 CAVAB QAYDALARI:
• QISA və AYDIN cavablar ver (maksimum 3-4 cümlə)
• Emoji istifadə et (amma həddindən artıq yox)
• Dostcasına və samimi üslub
• Hər cavabın sonunda NÖVBƏTİ ADDIM təklif et
• Bilinməyən məlumat soruşulursa: "Bu barədə komandamızla əlaqə saxlayın: +994 51 769 61 81"

🚫 ETMƏ:
• Rəsmi və bürokratik dil
• Çox uzun cavablar
• Fərz etmə - əmin olmadığın şeyi demə
• Rəqiblər haqqında danışma

💡 NÖVBƏTİ ADDIM TƏKLİFLƏRİ:
• "Daha ətraflı məlumat istəyirsiniz?"
• "Qeydiyyat üçün kömək edə bilərəm?"
• "Hansı proqram sizi maraqlandırır?"
• "WhatsApp-dan yazın: +994 51 769 61 81"

📞 ƏSASİ ƏLAQƏ: +994 51 769 61 81 (WhatsApp)
🔗 QEYDİYYAT: /telebe-qeydiyyat

ƏSAS MƏLUMATLAR:`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1];

    if (!lastMessage || lastMessage.role !== 'user') {
      return new Response('Invalid request', { status: 400 });
    }

    // RAG: İlgili içeriği getir
    const context = await retrieveContext(lastMessage.content);

    const result = await streamText({
      model: anthropic('claude-3-5-sonnet-20241022'),
      system: SYSTEM_PROMPT + context,
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




