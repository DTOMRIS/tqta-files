'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Phone, Mail, User, MessageSquare, Loader2, CheckCircle2 } from 'lucide-react';

export default function LeadCaptureModal({ open, onOpenChange, program = null }) {
  const [formData, setFormData] = useState({
    adSoyad: '',
    telefon: '',
    email: '',
    ilgilenilenProgram: program || '',
    mesaj: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const programs = [
    'Aşpaz Bacarıqları',
    'Barista Bacarıqları',
    'Restoran Xidməti',
    'Turizm və Qonaqlama İngiliscəsi',
    'Workshop',
    'Masterclass',
    'Kurumsal Eğitim',
    'Digər'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          kaynak: program ? 'program_detail' : 'landing_page'
        })
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        
        // Context Graph event trigger
        try {
          await fetch('/api/context/events', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              entityType: 'lead',
              entityId: data.id.toString(),
              eventType: 'lead_captured',
              actor: 'system',
              action: 'form_submitted',
              reasoning: `Yeni lead: ${formData.adSoyad} - ${formData.ilgilenilenProgram || 'Program seçilmədi'}`,
              context: {
                program: formData.ilgilenilenProgram,
                kaynak: program ? 'program_detail' : 'landing_page',
                email: formData.email,
                telefon: formData.telefon
              },
              outcome: 'lead_created'
            })
          });
        } catch (error) {
          console.error('Context Graph event error:', error);
        }

        toast.success('Müraciətiniz qeydə alındı! Tezliklə sizinlə əlaqə saxlayacağıq. 🎉');
        
        // 2 saniye sonra modal'ı kapat
        setTimeout(() => {
          setSuccess(false);
          onOpenChange(false);
          setFormData({
            adSoyad: '',
            telefon: '',
            email: '',
            ilgilenilenProgram: '',
            mesaj: ''
          });
        }, 2000);
      } else {
        toast.error(data.error || 'Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
      }
    } catch (error) {
      console.error('Lead kayıt hatası:', error);
      toast.error('Xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-white border-slate-200 shadow-2xl">
        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-10 w-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Təşəkkürlər! 🎉</h3>
            <p className="text-slate-600">
              Müraciətiniz qeydə alındı. Tezliklə sizinlə əlaqə saxlayacağıq.
            </p>
          </div>
        ) : (
          <>
            <DialogHeader className="text-center pb-4">
              <DialogTitle className="text-3xl font-serif text-slate-900 mb-2">
                Gələcəyin Şefi Olmağa Hazırsan? 🌟
              </DialogTitle>
              <DialogDescription className="text-slate-600 text-base">
                Bizimlə əlaqə saxla, sənə ən uyğun proqramı tapmaqda kömək edək
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="adSoyad" className="text-slate-700 font-medium flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Ad və Soyad *
                </Label>
                <Input
                  id="adSoyad"
                  name="adSoyad"
                  value={formData.adSoyad}
                  onChange={handleInputChange}
                  placeholder="Məsələn: Əli Məmmədov"
                  required
                  className="h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="telefon" className="text-slate-700 font-medium flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Telefon *
                </Label>
                <Input
                  id="telefon"
                  name="telefon"
                  type="tel"
                  value={formData.telefon}
                  onChange={handleInputChange}
                  placeholder="+994 50 123 45 67"
                  required
                  className="h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 font-medium flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  E-poçt *
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="ornek@email.com"
                  required
                  className="h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ilgilenilenProgram" className="text-slate-700 font-medium">
                  Hansı Proqramla Maraqlanırsınız?
                </Label>
                <Select
                  value={formData.ilgilenilenProgram}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, ilgilenilenProgram: value }))}
                >
                  <SelectTrigger className="h-12 border-slate-300 focus:border-amber-500">
                    <SelectValue placeholder="Proqram seçin (istəyə bağlı)" />
                  </SelectTrigger>
                  <SelectContent>
                    {programs.map((prog) => (
                      <SelectItem key={prog} value={prog}>
                        {prog}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="mesaj" className="text-slate-700 font-medium flex items-center gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Mesajınız (istəyə bağlı)
                </Label>
                <Textarea
                  id="mesaj"
                  name="mesaj"
                  value={formData.mesaj}
                  onChange={handleInputChange}
                  placeholder="Sualınız və ya mesajınız varsa buraya yaza bilərsiniz..."
                  rows={4}
                  className="border-slate-300 focus:border-amber-500 focus:ring-amber-500 resize-none"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 h-12 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-500 hover:from-amber-600 hover:via-amber-700 hover:to-amber-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Göndərilir...
                    </>
                  ) : (
                    <>
                      <Phone className="mr-2 h-4 w-4" />
                      Məni Zəng Edin 📞
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={loading}
                  className="h-12 border-slate-300 hover:bg-slate-50"
                >
                  Ləğv Et
                </Button>
              </div>

              <p className="text-xs text-slate-500 text-center">
                Məlumatlarınız təhlükəsiz saxlanılır və yalnız sizinlə əlaqə üçün istifadə olunur.
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}




