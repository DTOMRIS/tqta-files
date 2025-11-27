'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, FileCheck, Clock, FileDown } from "lucide-react";
import { exportToExcel } from '@/lib/excel';

export default function DMAProtocolsPage() {
    const protocols = [
        { id: "DMA-2024-001", date: "2024-05-15", course: "Aşpazlıq (Level 2)", students: 12, status: "Təsdiqlənib" },
        { id: "DMA-2024-002", date: "2024-06-01", course: "Barista", students: 8, status: "Gözləmədə" },
        { id: "DMA-2024-003", date: "2024-06-10", course: "Ofisiant", students: 15, status: "Planlaşdırılır" },
    ];

    const handleExport = () => {
        if (protocols.length === 0) {
            alert('Export ediləcək məlumat yoxdur');
            return;
        }

        const data = protocols.map(p => ({
            'Protokol №': p.id,
            'Tarix': p.date,
            'İxtisas': p.course,
            'Tələbə Sayı': p.students,
            'Status': p.status
        }));

        exportToExcel(data, `dma_protokollar_${new Date().toISOString().split('T')[0]}.xlsx`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <ScrollText className="h-8 w-8 text-blue-600" />
                    DMA İmtahan Protokolları
                </h1>
                <Button onClick={handleExport} variant="outline">
                    <FileDown className="mr-2 h-4 w-4" />
                    Excel-ə Export
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ümumi Protokol</CardTitle>
                        <ScrollText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">24</div>
                        <p className="text-xs text-muted-foreground">+2 bu ay</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Təsdiqlənən</CardTitle>
                        <FileCheck className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">18</div>
                        <p className="text-xs text-muted-foreground">75% uğur dərəcəsi</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Gözləmədə</CardTitle>
                        <Clock className="h-4 w-4 text-yellow-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">6</div>
                        <p className="text-xs text-muted-foreground">Cari ay üçün</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Son Protokollar</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="relative w-full overflow-auto">
                        <table className="w-full caption-bottom text-sm">
                            <thead className="[&_tr]:border-b">
                                <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Protokol №</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tarix</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">İxtisas</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Tələbə Sayı</th>
                                    <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                                </tr>
                            </thead>
                            <tbody className="[&_tr:last-child]:border-0">
                                {protocols.map((p) => (
                                    <tr key={p.id} className="border-b transition-colors hover:bg-muted/50">
                                        <td className="p-4 align-middle font-medium">{p.id}</td>
                                        <td className="p-4 align-middle">{p.date}</td>
                                        <td className="p-4 align-middle">{p.course}</td>
                                        <td className="p-4 align-middle">{p.students}</td>
                                        <td className="p-4 align-middle">
                                            <span className={`px-2 py-1 rounded-full text-xs font-semibold 
                        ${p.status === 'Təsdiqlənib' ? 'bg-green-100 text-green-800' :
                                                    p.status === 'Gözləmədə' ? 'bg-yellow-100 text-yellow-800' : 'bg-slate-100 text-slate-800'}`}>
                                                {p.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
