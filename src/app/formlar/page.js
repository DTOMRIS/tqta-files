import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Download, File } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FormsPage() {
  const forms = [
    { category: "Müqavilələr", items: ["Tələbə Müqaviləsi (Standart)", "Gənc İştirakçı Müqaviləsi", "Korporativ Müqavilə"] },
    { category: "Sağlamlıq", items: ["Tibbi Arayış Forması", "Allergiya Bəyanatı"] },
    { category: "İmtahan", items: ["İmtahan Protokolu (Boş)", "Qiymətləndirmə Cədvəli"] },
    { category: "Digər", items: ["Davamiyyət Jurnalı", "Təlimçi Hesabatı"] },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <FileText className="h-8 w-8 text-blue-600" />
          Sənədlər və Formlar
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {forms.map((section, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle className="text-lg">{section.category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-3 border rounded hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <File className="h-4 w-4 text-slate-400" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4 text-blue-600" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
