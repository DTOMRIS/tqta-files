"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Printer, Save, User, FileText, GraduationCap, HeartPulse, CreditCard, Calendar, Phone, Receipt, Briefcase, FileCheck, AlertTriangle } from "lucide-react";
import { KURSLAR } from "@/data/kurslar";
import { YOUTH_CONTRACT_TEMPLATE, GENERAL_CONTRACT_TEMPLATE, SPECIFIC_RULES, COMMON_APPENDICES, DMA_ATTENDANCE_CLAUSE } from "@/data/contract-content";

export default function StudentRegistration() {
  const [formData, setFormData] = useState({
    // 1. Şəxsi Məlumatlar
    ad: "",
    soyad: "",
    ataAdi: "",
    dogumTarixi: "",
    cinsiyet: "",
    mobilTelefon: "",
    whatsappNomresi: "",
    email: "",
    elaqeVasitesi: "",
    evUnvani: "",

    // 2. Təhsil və İş Məlumatları
    tehsilSeviyyesi: "",
    ixtisas: "",
    isYeri: "",
    stajYeri: "", // NEW
    xariciDil: "",

    // 3. Vəli Məlumatları
    veliAdSoyad: "",
    veliYaxinliq: "",
    veliElaqe: "",
    veliIsPozisiyasi: "",
    veliIsUnvani: "",
    veliEvTelefonu: "",
    veliSosialStatus: "",
    veliEvUnvani: "",
    sehidYakini: false,
    qaziYakini: false,

    // 4. Sənəd Məlumatları
    senedNovu: "Şəxsiyyət vəsiqəsi",
    finKod: "",
    seriyaNo: "",

    // 5. Kurs Seçimi
    anaKategoriya: "",
    kursId: "",
    tehsilFormati: "",
    telimDili: "",
    baslamaTarixi: "",

    // 6. Sağlıq və Alerji
    alerjiVarmi: "Xeyr",
    xronikiXestelik: "",
    qanQrupu: "",
    tibbiArayis: "Xeyr",

    // 7. Sertifikat Seçimləri
    dmaSertifikati: false,
    turkiyeSertifikati: false,
    tqtaSertifikati: false,
    cthSertifikati: false, // NEW
    sertifikatDekontu: false, // NEW

    // 8. Ödəniş Məlumatları
    odenisNovu: "Tam ödəniş", // Default
    ilkOdenis: "",
    endirimKodu: "",
    odenisSecimi: "",
    discountType: "Yoxdur", // NEW
    discountPercent: 0, // NEW

    // 9. Müqavilə Tipi
    muqavileTipi: "",

    // Şərtlər
    sertleriQebulEtdim: false,
    melumatIslemesiRazi: false
  });

  const [selectedCourse, setSelectedCourse] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [isYouth, setIsYouth] = useState(false);
  const [ageError, setAgeError] = useState("");
  const [finalPrice, setFinalPrice] = useState(0);

  // --- EFFECTS ---

  // Filter courses by category
  useEffect(() => {
    if (formData.anaKategoriya) {
      let catId = "";
      if (formData.anaKategoriya === "İctimai İaşə") catId = "ictimai-iase";
      if (formData.anaKategoriya === "Turizm") catId = "turizm";

      if (catId) {
        setFilteredCourses(KURSLAR.filter(k => k.kategoriId === catId));
      } else {
        setFilteredCourses(KURSLAR);
      }
    } else {
      setFilteredCourses([]);
    }
  }, [formData.anaKategoriya]);

  // Set selected course & Reset Payment
  useEffect(() => {
    if (formData.kursId) {
      const course = KURSLAR.find(k => k.id === formData.kursId);
      setSelectedCourse(course);

      if (course) {
        setFinalPrice(course.qiymet.satisAZN);
        // Auto-set Payment Type if DMA
        if (course.tip === 'DMA') {
          handleInputChange('odenisNovu', 'Dövlət Məşğulluq Agentliyi (ödənişsiz)');
          handleInputChange('discountType', 'Yoxdur');
          handleInputChange('discountPercent', 0);
        } else {
          handleInputChange('odenisNovu', 'Tam ödəniş');
        }
      }
    }
  }, [formData.kursId]);

  // Age Logic & Contract Type
  useEffect(() => {
    if (formData.dogumTarixi) {
      const birthDate = new Date(formData.dogumTarixi);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      setIsYouth(age < 18);

      // Barista Age Check
      if (selectedCourse && selectedCourse.ad.toLowerCase().includes("barista") && age < 18) {
        setAgeError("Barista kursu üçün minimum yaş həddi 18-dir!");
      } else {
        setAgeError("");
      }

      if (age < 18) {
        handleInputChange('muqavileTipi', 'Gənc iştirakçı müqaviləsi');
      } else {
        handleInputChange('muqavileTipi', 'Yetkin üçün müqavilə');
      }
    }
  }, [formData.dogumTarixi, selectedCourse]);

  // Price Calculation
  useEffect(() => {
    if (selectedCourse && selectedCourse.tip !== 'DMA') {
      let price = selectedCourse.qiymet.satisAZN;
      if (formData.discountPercent > 0) {
        price = price - (price * (formData.discountPercent / 100));
      }
      setFinalPrice(price);
    }
  }, [selectedCourse, formData.discountPercent]);


  // --- HANDLERS ---

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleDiscountChange = (type) => {
    let percent = 0;
    if (type === "Tələbə") percent = 10;
    if (type === "Şəhid/Qazi") percent = 20;
    if (type === "Korporativ") percent = 15;
    if (type === "Tam") percent = 100;

    setFormData(prev => ({
      ...prev,
      discountType: type,
      discountPercent: percent
    }));
  };

  const getSpecificRules = (courseName) => {
    if (!courseName) return "";
    const name = courseName.toLowerCase();
    if (name.includes("barista")) return SPECIFIC_RULES.BARISTA;
    if (name.includes("aşpaz") || name.includes("cookery")) return SPECIFIC_RULES.CHEF;
    if (name.includes("ofisiant") || name.includes("front of house")) return SPECIFIC_RULES.WAITER;
    if (name.includes("pizza")) return SPECIFIC_RULES.PIZZA;
    if (name.includes("dönər")) return SPECIFIC_RULES.DONER;
    if (name.includes("pide")) return SPECIFIC_RULES.PIDE;
    if (name.includes("xadimə") || name.includes("housekeeping")) return SPECIFIC_RULES.HOUSEKEEPING;
    return "";
  };

  // --- GENERATORS ---

  const generateContract = () => {
    if (!selectedCourse) return "";

    let template = formData.muqavileTipi === 'Gənc iştirakçı müqaviləsi' ? YOUTH_CONTRACT_TEMPLATE : GENERAL_CONTRACT_TEMPLATE;
    const specificRules = getSpecificRules(selectedCourse.ad);
    const currentDate = new Date().toLocaleDateString('az-AZ');

    // Replace Placeholders
    template = template.replace(/\[DATE\]/g, currentDate);

    // Student Details
    const studentDetails = `
• Adı Soyadı Ata adı: ${formData.ad} ${formData.soyad} ${formData.ataAdi}
• FİN / Seriya: ${formData.finKod} / ${formData.seriyaNo} (${formData.senedNovu})
• Doğum Tarixi: ${formData.dogumTarixi} (${formData.cinsiyet})
• Əlaqə: ${formData.mobilTelefon} / ${formData.email}
• Ünvan: ${formData.evUnvani}
• Təhsil/İş: ${formData.tehsilSeviyyesi} / ${formData.isYeri}
• Staj Yeri: ${formData.stajYeri || "Təyin edilməyib"}
    `;
    template = template.replace("[STUDENT_DETAILS]", studentDetails);
    template = template.replace("[STUDENT_NAME]", `${formData.ad} ${formData.soyad}`);

    // Parent Details (if Youth)
    if (formData.muqavileTipi === 'Gənc iştirakçı müqaviləsi') {
      const parentDetails = `
• Adı Soyadı: ${formData.veliAdSoyad} (${formData.veliYaxinliq})
• Əlaqə: ${formData.veliElaqe}
• Sosial Status: ${formData.veliSosialStatus}
• Ünvan: ${formData.veliEvUnvani}
${formData.sehidYakini ? "• Şəhid Yakını" : ""}
${formData.qaziYakini ? "• Qazi Yakını" : ""}
      `;
      template = template.replace("[PARENT_DETAILS]", parentDetails);
      template = template.replace("[PARENT_NAME]", formData.veliAdSoyad);
    }

    // Course Details
    const courseDetails = `
• Proqramın Adı: ${selectedCourse.ad}
• Kateqoriya: ${formData.anaKategoriya}
• Format: ${formData.tehsilFormati}
• Dil: ${formData.telimDili}
• Başlama Tarixi: ${formData.baslamaTarixi}
    `;
    template = template.replace("[COURSE_DETAILS]", courseDetails);

    // Financials
    let priceText = "";
    let paymentPlanText = formData.odenisNovu;

    if (formData.odenisNovu.includes("Dövlət Məşğulluq Agentliyi")) {
      priceText = "0 (DMA tərəfindən qarşılanır)";
      paymentPlanText = "Ödənişsiz (DMA)";
    } else {
      priceText = `${finalPrice} AZN`;
      if (formData.discountType !== "Yoxdur") priceText += ` (Endirim: ${formData.discountType} - ${formData.discountPercent}%)`;
      if (formData.odenisNovu === "Taksitli ödəniş") paymentPlanText += ` (İlk ödəniş: ${formData.ilkOdenis} AZN)`;
    }

    template = template.replace(/\[PRICE\]/g, priceText);
    template = template.replace(/\[PAYMENT_PLAN\]/g, paymentPlanText);

    // DMA Clause Injection
    if (selectedCourse.tip === 'DMA' || formData.odenisNovu.includes("Dövlət")) {
      template = template.replace(/6\.1\. Davamiyyət qaydaları:[\s\S]*?• Praktiki dərslərdə iştirak məcburidir/, DMA_ATTENDANCE_CLAUSE.trim());
    }

    // Health Info
    const healthInfo = `
8.1 Sağlıq Məlumatları:
• Allergiya: ${formData.alerjiVarmi}
• Xroniki Xəstəlik: ${formData.xronikiXestelik || "Yoxdur"}
• Qan Qrupu: ${formData.qanQrupu}
• Tibbi Arayış: ${formData.tibbiArayis}
    `;
    template = template.replace(/8\.1 VƏLİ,[\s\S]*?• İstifadə Edilən Dərmanlar: _________________/, healthInfo.trim());


    // Appendices
    const fullContract = `
${template}

---------------------------------------------------------

${COMMON_APPENDICES}

${specificRules}
    `;

    return fullContract;
  };

  const handlePrintContract = () => {
    if (!formData.sertleriQebulEtdim) {
      alert("Zəhmət olmasa şərtləri qəbul edin.");
      return;
    }
    if (ageError) {
      alert(ageError);
      return;
    }
    if ((formData.cthSertifikati || (selectedCourse && selectedCourse.tip === 'CTH')) && !formData.sertifikatDekontu) {
      alert("CTH Sertifikatı üçün ödəniş dekontu təhvil alınmalıdır!");
      return;
    }

    document.getElementById('print-area').innerText = generateContract();
    window.print();
  };

  return (
    <div className="space-y-8 p-4 md:p-8">
      <div className="flex justify-between items-center print:hidden">
        <h1 className="text-3xl font-bold">Tələbə Qeydiyyat Formu</h1>
        <Button onClick={handlePrintContract} variant="outline" disabled={!formData.sertleriQebulEtdim || !selectedCourse || !!ageError}>
          <Printer className="mr-2 h-4 w-4" /> Müqaviləni Çap Et
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 print:hidden">
        {/* SOL TƏRƏF: FORM */}
        <div className="space-y-6">

          {/* 1. ŞƏXSİ MƏLUMATLAR */}
          <Card>
            <CardHeader><CardTitle className="flex gap-2"><User className="w-5 h-5" /> Şəxsi Məlumatlar</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Ad *</Label><Input value={formData.ad} onChange={(e) => handleInputChange('ad', e.target.value)} /></div>
                <div className="space-y-2"><Label>Soyad *</Label><Input value={formData.soyad} onChange={(e) => handleInputChange('soyad', e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Ata adı</Label><Input value={formData.ataAdi} onChange={(e) => handleInputChange('ataAdi', e.target.value)} /></div>
                <div className="space-y-2">
                  <Label>Doğum tarixi *</Label>
                  <Input type="date" value={formData.dogumTarixi} onChange={(e) => handleInputChange('dogumTarixi', e.target.value)} />
                  {ageError && <p className="text-red-500 text-xs mt-1 font-bold">{ageError}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Cinsiyet *</Label>
                  <Select onValueChange={(val) => handleInputChange('cinsiyet', val)}>
                    <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kişi">Kişi</SelectItem>
                      <SelectItem value="Qadın">Qadın</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Mobil Telefon *</Label><Input value={formData.mobilTelefon} onChange={(e) => handleInputChange('mobilTelefon', e.target.value)} /></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>WhatsApp</Label><Input value={formData.whatsappNomresi} onChange={(e) => handleInputChange('whatsappNomresi', e.target.value)} /></div>
                <div className="space-y-2"><Label>Email *</Label><Input value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} /></div>
              </div>
              <div className="space-y-2">
                <Label>Əlaqə vasitəsi</Label>
                <Select onValueChange={(val) => handleInputChange('elaqeVasitesi', val)}>
                  <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="WhatsApp">WhatsApp</SelectItem>
                    <SelectItem value="SMS">SMS</SelectItem>
                    <SelectItem value="Email">Email</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Ev ünvanı</Label><Input value={formData.evUnvani} onChange={(e) => handleInputChange('evUnvani', e.target.value)} /></div>
            </CardContent>
          </Card>

          {/* 2. TƏHSİL VƏ İŞ */}
          <Card>
            <CardHeader><CardTitle className="flex gap-2"><Briefcase className="w-5 h-5" /> Təhsil və İş Məlumatları</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Təhsil səviyyəsi</Label>
                <Select onValueChange={(val) => handleInputChange('tehsilSeviyyesi', val)}>
                  <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Orta təhsil">Orta təhsil</SelectItem>
                    <SelectItem value="Peşə təhsili">Peşə təhsili</SelectItem>
                    <SelectItem value="Bakalavr">Bakalavr</SelectItem>
                    <SelectItem value="Magistr">Magistr</SelectItem>
                    <SelectItem value="Doktorantura">Doktorantura</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>İxtisas</Label><Input value={formData.ixtisas} onChange={(e) => handleInputChange('ixtisas', e.target.value)} /></div>
                <div className="space-y-2"><Label>İş yeri</Label><Input value={formData.isYeri} onChange={(e) => handleInputChange('isYeri', e.target.value)} /></div>
              </div>
              <div className="space-y-2"><Label>Staj Yeri</Label><Input value={formData.stajYeri} onChange={(e) => handleInputChange('stajYeri', e.target.value)} placeholder="Staj keçəcəyi müəssisə" /></div>
              <div className="space-y-2"><Label>Xarici dil bilikləri</Label><Input value={formData.xariciDil} onChange={(e) => handleInputChange('xariciDil', e.target.value)} /></div>
            </CardContent>
          </Card>

          {/* 3. VƏLİ MƏLUMATLARI (YALNIZ 18 YAŞDAN KİÇİKLƏR ÜÇÜN) */}
          {isYouth && (
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader><CardTitle className="flex gap-2 text-orange-800"><User className="w-5 h-5" /> Vəli Məlumatları (Məcburidir)</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Ad Soyad *</Label><Input value={formData.veliAdSoyad} onChange={(e) => handleInputChange('veliAdSoyad', e.target.value)} /></div>
                  <div className="space-y-2">
                    <Label>Yaxınlıq dərəcəsi *</Label>
                    <Select onValueChange={(val) => handleInputChange('veliYaxinliq', val)}>
                      <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Ata">Ata</SelectItem>
                        <SelectItem value="Ana">Ana</SelectItem>
                        <SelectItem value="Qardaş">Qardaş</SelectItem>
                        <SelectItem value="Bacı">Bacı</SelectItem>
                        <SelectItem value="Digər">Digər</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>Əlaqə nömrəsi *</Label><Input value={formData.veliElaqe} onChange={(e) => handleInputChange('veliElaqe', e.target.value)} /></div>
                  <div className="space-y-2"><Label>Ev telefonu</Label><Input value={formData.veliEvTelefonu} onChange={(e) => handleInputChange('veliEvTelefonu', e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2"><Label>İş pozisiyası</Label><Input value={formData.veliIsPozisiyasi} onChange={(e) => handleInputChange('veliIsPozisiyasi', e.target.value)} /></div>
                  <div className="space-y-2"><Label>İş ünvanı</Label><Input value={formData.veliIsUnvani} onChange={(e) => handleInputChange('veliIsUnvani', e.target.value)} /></div>
                </div>
                <div className="space-y-2">
                  <Label>Sosial status</Label>
                  <Select onValueChange={(val) => handleInputChange('veliSosialStatus', val)}>
                    <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="İşləyən">İşləyən</SelectItem>
                      <SelectItem value="Təqaüdçü">Təqaüdçü</SelectItem>
                      <SelectItem value="İşsiz">İşsiz</SelectItem>
                      <SelectItem value="Əlil">Əlil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Ev ünvanı</Label><Input value={formData.veliEvUnvani} onChange={(e) => handleInputChange('veliEvUnvani', e.target.value)} /></div>
                <div className="flex gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="sehid" checked={formData.sehidYakini} onCheckedChange={(c) => handleInputChange('sehidYakini', c)} />
                    <Label htmlFor="sehid">Şəhid Yakını</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="qazi" checked={formData.qaziYakini} onCheckedChange={(c) => handleInputChange('qaziYakini', c)} />
                    <Label htmlFor="qazi">Qazi Yakını</Label>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* 4. SƏNƏD MƏLUMATLARI */}
          <Card>
            <CardHeader><CardTitle className="flex gap-2"><FileCheck className="w-5 h-5" /> Sənəd Məlumatları</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Sənəd növü *</Label>
                <Select onValueChange={(val) => handleInputChange('senedNovu', val)} defaultValue="Şəxsiyyət vəsiqəsi">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Şəxsiyyət vəsiqəsi">Şəxsiyyət vəsiqəsi</SelectItem>
                    <SelectItem value="Miqrasiya sənədi">Miqrasiya sənədi</SelectItem>
                    <SelectItem value="DMX qaçqın">DMX tərəfindən verilən qaçqın vəsiqəsi</SelectItem>
                    <SelectItem value="Xidməti">Xidməti (diplomatik) vəsiqə</SelectItem>
                    <SelectItem value="BMT QAK">BMT QAK (UNHCR) vəsiqəsi</SelectItem>
                    <SelectItem value="Xarici pasport">Xarici pasport</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>FİN Kod *</Label><Input value={formData.finKod} onChange={(e) => handleInputChange('finKod', e.target.value)} maxLength={7} /></div>
                <div className="space-y-2"><Label>Seriya № *</Label><Input value={formData.seriyaNo} onChange={(e) => handleInputChange('seriyaNo', e.target.value)} /></div>
              </div>
            </CardContent>
          </Card>

          {/* 5. KURS SEÇİMİ */}
          <Card>
            <CardHeader><CardTitle className="flex gap-2"><GraduationCap className="w-5 h-5" /> Kurs Seçimi</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Ana Kategoriya *</Label>
                <Select onValueChange={(val) => handleInputChange('anaKategoriya', val)}>
                  <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="İctimai İaşə">İctimai İaşə</SelectItem>
                    <SelectItem value="Turizm">Turizm</SelectItem>
                    <SelectItem value="İdarəetmə">İdarəetmə</SelectItem>
                    <SelectItem value="Workshop">Workshop</SelectItem>
                    <SelectItem value="Master Class">Master Class</SelectItem>
                    <SelectItem value="Korporativ Tədbirlər">Korporativ Tədbirlər</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Alt Kurs</Label>
                <Select onValueChange={(val) => handleInputChange('kursId', val)} disabled={!formData.anaKategoriya}>
                  <SelectTrigger><SelectValue placeholder={formData.anaKategoriya ? "Kurs seçin..." : "Öncə kategoriya seçin"} /></SelectTrigger>
                  <SelectContent>
                    {filteredCourses.map(kurs => (
                      <SelectItem key={kurs.id} value={kurs.id}>{kurs.ad} ({kurs.tip})</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Təhsil formatı *</Label>
                <Select onValueChange={(val) => handleInputChange('tehsilFormati', val)}>
                  <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2 ay (Peşəkar)">2 ay (Peşəkar)</SelectItem>
                    <SelectItem value="1 ay (Standart)">1 ay (Standart)</SelectItem>
                    <SelectItem value="Sürətli (16 saat)">Sürətli (16 saat)</SelectItem>
                    <SelectItem value="Yarım gün (4 saat/gün)">Yarım gün (4 saat/gün)</SelectItem>
                    <SelectItem value="Tam gün (8 saat/gün)">Tam gün (8 saat/gün)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Təlim dili</Label>
                  <Select onValueChange={(val) => handleInputChange('telimDili', val)}>
                    <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Azərbaycan dili">Azərbaycan dili</SelectItem>
                      <SelectItem value="Rus dili">Rus dili</SelectItem>
                      <SelectItem value="İngilis dili">İngilis dili</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2"><Label>Başlama tarixi</Label><Input type="date" value={formData.baslamaTarixi} onChange={(e) => handleInputChange('baslamaTarixi', e.target.value)} /></div>
              </div>
            </CardContent>
          </Card>

          {/* 6. SAĞLIQ VƏ ALERJİ */}
          <Card>
            <CardHeader><CardTitle className="flex gap-2"><HeartPulse className="w-5 h-5" /> Sağlıq və Alerji</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Hər hansı bir alerji mövcuddurmu?</Label>
                <Select onValueChange={(val) => handleInputChange('alerjiVarmi', val)} defaultValue="Xeyr">
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Xeyr">Xeyr</SelectItem>
                    <SelectItem value="Bəli">Bəli</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label>Xroniki xəstəlik</Label><Input value={formData.xronikiXestelik} onChange={(e) => handleInputChange('xronikiXestelik', e.target.value)} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Qan qrupu</Label>
                  <Select onValueChange={(val) => handleInputChange('qanQrupu', val)}>
                    <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0 Rh+">0 Rh+</SelectItem>
                      <SelectItem value="0 Rh-">0 Rh-</SelectItem>
                      <SelectItem value="A Rh+">A Rh+</SelectItem>
                      <SelectItem value="A Rh-">A Rh-</SelectItem>
                      <SelectItem value="B Rh+">B Rh+</SelectItem>
                      <SelectItem value="B Rh-">B Rh-</SelectItem>
                      <SelectItem value="AB Rh+">AB Rh+</SelectItem>
                      <SelectItem value="AB Rh-">AB Rh-</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tibbi arayış təqdim edəcəyəm</Label>
                  <Select onValueChange={(val) => handleInputChange('tibbiArayis', val)} defaultValue="Xeyr">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Xeyr">Xeyr</SelectItem>
                      <SelectItem value="Bəli">Bəli</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 7. SERTİFİKAT SEÇİMLƏRİ */}
          <Card>
            <CardHeader><CardTitle className="flex gap-2"><FileText className="w-5 h-5" /> Sertifikat Seçimləri</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center gap-2">
                <Checkbox id="dma" checked={formData.dmaSertifikati} onCheckedChange={(c) => handleInputChange('dmaSertifikati', c)} />
                <Label htmlFor="dma">DMA Peşə Sertifikatı</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="tr" checked={formData.turkiyeSertifikati} onCheckedChange={(c) => handleInputChange('turkiyeSertifikati', c)} />
                <Label htmlFor="tr">Türkiyə Sertifikatı</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="tqta" checked={formData.tqtaSertifikati} onCheckedChange={(c) => handleInputChange('tqtaSertifikati', c)} />
                <Label htmlFor="tqta">TQTA Sertifikatı</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="cth" checked={formData.cthSertifikati} onCheckedChange={(c) => handleInputChange('cthSertifikati', c)} />
                <Label htmlFor="cth">CTH Sertifikatı</Label>
              </div>

              {/* CTH DEKONT CHECK */}
              {(formData.cthSertifikati || (selectedCourse && selectedCourse.tip === 'CTH')) && (
                <div className="flex items-center gap-2 bg-yellow-50 p-3 rounded border border-yellow-200 mt-2">
                  <Checkbox id="cth-dekont" checked={formData.sertifikatDekontu} onCheckedChange={(c) => handleInputChange('sertifikatDekontu', c)} />
                  <Label htmlFor="cth-dekont" className="font-semibold text-yellow-800">Sertifikat ödəniş dekontu təhvil alındı (Məcburidir)</Label>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 8. ÖDƏNİŞ MƏLUMATLARI (DMA DEYİLSƏ) */}
          {(!selectedCourse || selectedCourse.tip !== 'DMA') && !formData.odenisNovu.includes("Dövlət") && (
            <Card>
              <CardHeader><CardTitle className="flex gap-2"><CreditCard className="w-5 h-5" /> Ödəniş Məlumatları</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Ödəniş növü *</Label>
                  <Select onValueChange={(val) => handleInputChange('odenisNovu', val)} defaultValue="Tam ödəniş">
                    <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tam ödəniş">Tam ödəniş</SelectItem>
                      <SelectItem value="Taksitli ödəniş">Taksitli ödəniş</SelectItem>
                      <SelectItem value="Dövlət Məşğulluq Agentliyi (ödənişsiz)">Dövlət Məşğulluq Agentliyi (ödənişsiz)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* DETAILED DISCOUNT MODULE */}
                <div className="space-y-2">
                  <Label>Endirim Tətbiq Et</Label>
                  <Select onValueChange={handleDiscountChange} defaultValue="Yoxdur">
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Yoxdur">Endirim Yoxdur</SelectItem>
                      <SelectItem value="Tələbə">Tələbə (10%)</SelectItem>
                      <SelectItem value="Şəhid/Qazi">Şəhid/Qazi Ailəsi (20%)</SelectItem>
                      <SelectItem value="Korporativ">Korporativ (15%)</SelectItem>
                      <SelectItem value="Tam">Tam Təqaüd (100%)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.odenisNovu !== "Dövlət Məşğulluq Agentliyi (ödənişsiz)" && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label>İlk ödəniş məbləği</Label><Input value={formData.ilkOdenis} onChange={(e) => handleInputChange('ilkOdenis', e.target.value)} /></div>
                      <div className="space-y-2"><Label>Endirim kodu</Label><Input value={formData.endirimKodu} onChange={(e) => handleInputChange('endirimKodu', e.target.value)} /></div>
                    </div>
                    <div className="space-y-2">
                      <Label>Ödəniş Seçimi</Label>
                      <Select onValueChange={(val) => handleInputChange('odenisSecimi', val)}>
                        <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Kredit Kartı">Kredit Kartı</SelectItem>
                          <SelectItem value="Nəğd">Nəğd</SelectItem>
                          <SelectItem value="Bank Köçürməsi">Bank Köçürməsi</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="bg-slate-100 p-4 rounded flex justify-between items-center">
                      <span className="font-semibold text-slate-600">Yekun Məbləğ:</span>
                      <span className="text-2xl font-bold text-green-600">{finalPrice} AZN</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          )}

          {/* 9. MÜQAVİLƏ TİPİ VƏ ŞƏRTLƏR */}
          <Card>
            <CardHeader><CardTitle className="flex gap-2"><FileText className="w-5 h-5" /> Müqavilə Tipi və Şərtlər</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Müqavilə Tipi</Label>
                <Select onValueChange={(val) => handleInputChange('muqavileTipi', val)} value={formData.muqavileTipi}>
                  <SelectTrigger><SelectValue placeholder="Seçin..." /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yetkin üçün müqavilə">Yetkin üçün müqavilə</SelectItem>
                    <SelectItem value="Gənc iştirakçı müqaviləsi">Gənc iştirakçı müqaviləsi</SelectItem>
                    <SelectItem value="Korporativ müqavilə">Korporativ müqavilə</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 pt-4 border-t">
                <div className="flex items-center gap-2">
                  <Checkbox id="terms" checked={formData.sertleriQebulEtdim} onCheckedChange={(c) => handleInputChange('sertleriQebulEtdim', c)} />
                  <Label htmlFor="terms">Şərtləri və qaydaları oxudum və qəbul edirəm.</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox id="privacy" checked={formData.melumatIslemesiRazi} onCheckedChange={(c) => handleInputChange('melumatIslemesiRazi', c)} />
                  <Label htmlFor="privacy">Şəxsi məlumatlarımın işlənməsinə razıyam.</Label>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>

        {/* SAĞ TƏRƏF: ÖNİZLƏMƏ */}
        <div className="space-y-6">
          <Card className="h-full flex flex-col">
            <CardHeader>
              <CardTitle className="flex gap-2 items-center"><FileText className="h-5 w-5" /> Müqavilə Önizləmə</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col gap-4">
              <div className="bg-slate-50 p-6 rounded-md border flex-1 overflow-y-auto max-h-[800px] text-xs font-mono whitespace-pre-wrap leading-relaxed">
                {selectedCourse ? generateContract() : <p className="text-center text-gray-400 mt-20">Zəhmət olmasa kurs seçin və məlumatları doldurun.</p>}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* PRINT AREA - HIDDEN ON SCREEN */}
      <div id="print-area" className="hidden print:block font-serif text-black text-sm leading-normal whitespace-pre-wrap p-8">
        {/* Content injected via JS before print */}
      </div>
    </div>
  );
}
