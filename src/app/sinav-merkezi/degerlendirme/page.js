"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChefHat, Save } from "lucide-react";

export default function ExamMarkSheet() {
  const [criteria, setCriteria] = useState([
    { id: 1, name: "Kişisel Görünüm ve Üniforma", max: 5, score: 0 },
    { id: 2, name: "İstasyon Düzeni (Mise-en-place)", max: 10, score: 0 },
    { id: 3, name: "Hijyen ve Gıda Güvenliği", max: 10, score: 0 },
    { id: 4, name: "Kesim Teknikleri ve Bıçak Kullanımı", max: 15, score: 0 },
    { id: 5, name: "Pişirme Teknikleri ve Dereceleri", max: 15, score: 0 },
    { id: 6, name: "Lezzet Dengesi ve Baharatlama", max: 20, score: 0 },
    { id: 7, name: "Sunum ve Tabaklama", max: 15, score: 0 },
    { id: 8, name: "Temizlik ve Atık Yönetimi", max: 10, score: 0 },
  ]);

  const totalScore = criteria.reduce((acc, item) => acc + Number(item.score), 0);

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Pratik Sınav Değerlendirme</h2>
          <p className="text-muted-foreground">CTH Level 2 Award in Cookery Skills</p>
        </div>
        <div className="text-right bg-white p-4 rounded-lg border shadow-sm">
          <p className="text-sm text-muted-foreground">Toplam Puan</p>
          <p className={`text-4xl font-bold ${totalScore >= 60 ? "text-green-600" : "text-red-600"}`}>{totalScore} / 100</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader><CardTitle>Puanlama Kriterleri</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {criteria.map((item, index) => (
              <div key={item.id} className="flex items-center justify-between border-b pb-4 last:border-0">
                <div className="space-y-1 w-2/3">
                  <Label className="text-base font-medium">{index + 1}. {item.name}</Label>
                  <p className="text-xs text-muted-foreground">Max: {item.max} Puan</p>
                </div>
                <div className="flex items-center gap-2">
                  <Input 
                    type="number" 
                    min="0" 
                    max={item.max} 
                    className="w-20 text-center font-bold text-lg"
                    value={item.score}
                    onChange={(e) => {
                      const val = Math.min(Math.max(0, Number(e.target.value)), item.max);
                      const newCriteria = [...criteria];
                      newCriteria[index].score = val;
                      setCriteria(newCriteria);
                    }}
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Şefin Notları & Geribildirim</CardTitle></CardHeader>
          <CardContent>
            <Textarea placeholder="Öğrencinin performansı hakkında detaylı notlar..." className="min-h-[150px]" />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end gap-4">
        <Button className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto">
          <Save className="mr-2 h-4 w-4" /> Değerlendirmeyi Kaydet
        </Button>
      </div>
    </div>
  );
}
