'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, AlertCircle, CheckCircle2, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CthPanelPage() {
    const [data, setData] = useState({ urgent: [], warning: [], normal: [], total: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await fetch('/api/cth/pending-registrations');
            const json = await res.json();
            if (json.success) {
                setData(json.data);
            }
        } catch (error) {
            console.error('Error fetching CTH data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">CTH Qeydiyyat Paneli</h1>
                    <p className="text-muted-foreground">14 gün qaydasına əsasən tələbə qeydiyyatı izləmə sistemi</p>
                </div>
            </div>

            {/* Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-red-50 border-red-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-red-700 flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Təcili
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-red-800">{data.urgent.length}</div>
                        <p className="text-sm text-red-600">Gecikmiş və ya &lt; 3 gün qalıb</p>
                    </CardContent>
                </Card>

                <Card className="bg-yellow-50 border-yellow-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-yellow-700 flex items-center gap-2">
                            <Clock className="h-5 w-5" />
                            Xəbərdarlıq
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-yellow-800">{data.warning.length}</div>
                        <p className="text-sm text-yellow-600">4-7 gün qalıb</p>
                    </CardContent>
                </Card>

                <Card className="bg-green-50 border-green-200">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-green-700 flex items-center gap-2">
                            <CheckCircle2 className="h-5 w-5" />
                            Normal
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-800">{data.normal.length}</div>
                        <p className="text-sm text-green-600">7 gündən çox vaxt var</p>
                    </CardContent>
                </Card>
            </div>

            {/* Student Lists */}
            <div className="space-y-6">
                {data.urgent.length > 0 && (
                    <Card className="border-red-200">
                        <CardHeader>
                            <CardTitle className="text-red-700">Təcili Qeydiyyat Tələb Edənlər</CardTitle>
                            <CardDescription>Bu tələbələrin CTH qeydiyyatı dərhal tamamlanmalıdır!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <StudentList students={data.urgent} type="urgent" />
                        </CardContent>
                    </Card>
                )}

                {data.warning.length > 0 && (
                    <Card className="border-yellow-200">
                        <CardHeader>
                            <CardTitle className="text-yellow-700">Yaxınlaşan Deadline-lar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StudentList students={data.warning} type="warning" />
                        </CardContent>
                    </Card>
                )}

                {data.normal.length > 0 && (
                    <Card className="border-green-200">
                        <CardHeader>
                            <CardTitle className="text-green-700">Digər Gözləyənlər</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <StudentList students={data.normal} type="normal" />
                        </CardContent>
                    </Card>
                )}
            </div>
        </div>
    );
}

function StudentList({ students, type }) {
    return (
        <div className="space-y-4">
            {students.map((student) => (
                <div key={student.id} className="flex items-center justify-between p-4 bg-white rounded-lg border shadow-sm">
                    <div>
                        <h3 className="font-semibold text-lg">{student.ad} {student.soyad}</h3>
                        <div className="flex gap-2 text-sm text-muted-foreground mt-1">
                            <Badge variant="outline">{student.kurs}</Badge>
                            <span>•</span>
                            <span>Başlama: {student.startDate}</span>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className={`font-bold ${type === 'urgent' ? 'text-red-600' :
                                type === 'warning' ? 'text-yellow-600' : 'text-green-600'
                            }`}>
                            {student.isOverdue ? 'GECİKMİŞ' : `${student.daysLeft} gün qalıb`}
                        </div>
                        <div className="text-sm text-muted-foreground">
                            Son: {student.deadline}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
