import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ClipboardCheck, ShieldCheck, AlertCircle } from "lucide-react";

export default function QualityAssurancePage() {
  const checks = [
    { id: 1, area: "Tədris Planı", status: "Uyğun", date: "2024-05-01", auditor: "Elvin M." },
    { id: 2, area: "Qiymətləndirmə", status: "Uyğun", date: "2024-05-10", auditor: "Aysel K." },
    { id: 3, area: "Təhlükəsizlik", status: "Düzəliş lazımdır", date: "2024-05-20", auditor: "Murad Ə." },
    { id: 4, area: "Resurslar", status: "Uyğun", date: "2024-06-01", auditor: "Elvin M." },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-8 w-8 text-blue-600" />
          Keyfiyyət Təminatı (IV)
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><ClipboardCheck className="h-5 w-5" /> IV Yoxlama Siyahısı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {checks.map((check) => (
                <div key={check.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50">
                  <div>
                    <h4 className="font-medium">{check.area}</h4>
                    <p className="text-sm text-muted-foreground">Son yoxlama: {check.date} | {check.auditor}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold 
                    ${check.status === 'Uyğun' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {check.status}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertCircle className="h-5 w-5" /> Uyğunsuzluq Hesabatı</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
              <h4 className="font-bold text-yellow-800 mb-1">Təhlükəsizlik Avadanlıqları</h4>
              <p className="text-sm text-yellow-700">Mətbəx 2-də yanğınsöndürmə balonu istifadə müddəti bitib. Təcili yenilənməlidir.</p>
              <div className="mt-2 text-xs text-yellow-600 font-mono">Qeyd tarixi: 2024-05-20</div>
            </div>
            <div className="text-center p-4 text-muted-foreground text-sm">
              Başqa aktiv uyğunsuzluq yoxdur.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
