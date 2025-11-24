import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Settings, Bell, Lock, User, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Settings className="h-8 w-8 text-slate-700" />
          Sistem Ayarları
        </h1>
        <Button><Save className="mr-2 h-4 w-4" /> Yadda Saxla</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* SOL MENU */}
        <div className="md:col-span-1 space-y-2">
          <Button variant="secondary" className="w-full justify-start"><User className="mr-2 h-4 w-4" /> Ümumi Məlumatlar</Button>
          <Button variant="ghost" className="w-full justify-start"><Bell className="mr-2 h-4 w-4" /> Bildirişlər</Button>
          <Button variant="ghost" className="w-full justify-start"><Lock className="mr-2 h-4 w-4" /> Təhlükəsizlik</Button>
        </div>

        {/* SAĞ MƏZMUN */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Şirkət Məlumatları</CardTitle>
              <CardDescription>Müqavilələrdə və sənədlərdə görünəcək məlumatlar.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Şirkət Adı</Label><Input defaultValue="TURAN QASTRO TURİZM MMC" /></div>
                <div className="space-y-2"><Label>VÖEN</Label><Input defaultValue="2907713481" /></div>
              </div>
              <div className="space-y-2"><Label>Ünvan</Label><Input defaultValue="Sumqayıt şəhəri, Səməd Vurğun küçəsi 86" /></div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2"><Label>Telefon</Label><Input defaultValue="+994 51 769 61 81" /></div>
                <div className="space-y-2"><Label>Email</Label><Input defaultValue="info@tqta.az" /></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sistem Tərcihləri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Avtomatik Yedəkləmə</Label>
                  <p className="text-sm text-muted-foreground">Hər gün gecə saat 03:00-da</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Bildirişləri</Label>
                  <p className="text-sm text-muted-foreground">Tələbə qeydiyyatı zamanı SMS göndər</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
