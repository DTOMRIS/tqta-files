'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, Calendar, FileText, Users } from "lucide-react";

export default function SinavMerkeziPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold flex items-center gap-2">
                <ClipboardCheck className="h-8 w-8 text-blue-600" />
                İmtahan Mərkəzi
            </h1>
            <p className="text-muted-foreground">İmtahanların planlaşdırılması və idarə edilməsi.</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Aktiv İmtahanlar</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Bu həftə planlaşdırılan</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Qiymətləndirmə</CardTitle>
                        <FileText className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                        <p className="text-xs text-muted-foreground">Nəticə gözləyən tələbə</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ümumi İştirak</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">85%</div>
                        <p className="text-xs text-muted-foreground">Son ayın ortalaması</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Yaxınlaşan İmtahanlar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <p className="font-medium">CTH Level 2 Cookery - Nəzəri</p>
                                    <p className="text-sm text-muted-foreground">15 Dekabr 2025, 10:00</p>
                                </div>
                                <Button variant="outline" size="sm">Detallar</Button>
                            </div>
                            <div className="flex items-center justify-between border-b pb-4">
                                <div>
                                    <p className="font-medium">DMA Barista - Praktiki</p>
                                    <p className="text-sm text-muted-foreground">18 Dekabr 2025, 14:00</p>
                                </div>
                                <Button variant="outline" size="sm">Detallar</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sürətli Əməliyyatlar</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Button className="w-full justify-start" variant="outline">
                            <Calendar className="mr-2 h-4 w-4" /> Yeni İmtahan Təyin Et
                        </Button>
                        <Button className="w-full justify-start" variant="outline">
                            <FileText className="mr-2 h-4 w-4" /> İmtahan Protokolu Yarat
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
