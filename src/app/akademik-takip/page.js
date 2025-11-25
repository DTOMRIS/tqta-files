'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { BookOpen, CheckCircle, Clock, AlertCircle, Loader2 } from 'lucide-react';

const CTH_UNITS = [
    { code: 'CTH-L2-COOK', name: 'CTH Level 2 Cookery' },
    { code: 'CTH-L2-FOH', name: 'CTH Level 2 Front of House' },
    { code: 'CTH-L2-PAST', name: 'CTH Level 2 Pastry' },
    { code: 'CTH-L3-COOK', name: 'CTH Level 3 Cookery' },
    { code: 'CTH-L3-FOH', name: 'CTH Level 3 Front of House' },
];

export default function AkademikTakipPage() {
    const [students, setStudents] = useState([]);
    const [tutorials, setTutorials] = useState([]);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        studentId: '',
        unitCode: '',
        unitName: '',
        topic: '',
        feedback: '',
        tutorialDate: new Date().toISOString().split('T')[0],
        tutorName: '',
    });

    const [filter, setFilter] = useState({
        studentId: '',
        unitCode: '',
    });

    useEffect(() => {
        fetchStudents();
        fetchTutorials();
    }, []);

    useEffect(() => {
        fetchTutorials();
    }, [filter]);

    const fetchStudents = async () => {
        try {
            const res = await fetch('/api/students?limit=1000');
            const data = await res.json();
            if (data.success) {
                setStudents(data.data.students);
            }
        } catch (error) {
            console.error('Fetch students error:', error);
        }
    };

    const fetchTutorials = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (filter.studentId) params.append('studentId', filter.studentId);
            if (filter.unitCode) params.append('unitCode', filter.unitCode);

            const res = await fetch(`/api/tutorials?${params}`);
            const data = await res.json();
            if (data.success) {
                setTutorials(data.data);
            }
        } catch (error) {
            console.error('Fetch tutorials error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/tutorials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                alert('✅ Tutorial uğurla əlavə edildi!');
                // Reset form
                setFormData({
                    studentId: '',
                    unitCode: '',
                    unitName: '',
                    topic: '',
                    feedback: '',
                    tutorialDate: new Date().toISOString().split('T')[0],
                    tutorName: '',
                });
                fetchTutorials();
            } else {
                alert('❌ Xəta: ' + data.error);
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('❌ Tutorial əlavə edilərkən xəta baş verdi');
        } finally {
            setSubmitting(false);
        }
    };

    const handleIVApprove = async (tutorialId) => {
        const ivName = prompt('IV adınızı daxil edin:');
        if (!ivName) return;

        try {
            const res = await fetch(`/api/tutorials/${tutorialId}/iv-approve`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ivCheckedBy: ivName }),
            });

            const data = await res.json();

            if (data.success) {
                alert('✅ Tutorial IV tərəfindən təsdiqləndi!');
                fetchTutorials();
            } else {
                alert('❌ Xəta: ' + data.error);
            }
        } catch (error) {
            console.error('IV approve error:', error);
            alert('❌ IV təsdiq zamanı xəta baş verdi');
        }
    };

    const handleUnitChange = (code) => {
        const unit = CTH_UNITS.find(u => u.code === code);
        setFormData({
            ...formData,
            unitCode: code,
            unitName: unit?.name || '',
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">Akademik Takip</h1>
                <p className="text-muted-foreground">Progress Tutorials - CTH Tələbi</p>
            </div>

            {/* Tutorial Əlavə Et */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600" />
                        Yeni Tutorial Əlavə Et
                    </CardTitle>
                    <CardDescription>
                        Hər assignment üçün minimum 2-3 fərdi görüşmə tələb olunur
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Tələbə *</Label>
                                <Select
                                    value={formData.studentId}
                                    onValueChange={(val) => setFormData({ ...formData, studentId: val })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tələbə seçin..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {students.map(s => (
                                            <SelectItem key={s.id} value={s.id.toString()}>
                                                {s.ad} {s.soyad} - {s.kursId}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Unit/Modul *</Label>
                                <Select
                                    value={formData.unitCode}
                                    onValueChange={handleUnitChange}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Unit seçin..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CTH_UNITS.map(unit => (
                                            <SelectItem key={unit.code} value={unit.code}>
                                                {unit.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Görüşmə Tarixi *</Label>
                                <Input
                                    type="date"
                                    value={formData.tutorialDate}
                                    onChange={(e) => setFormData({ ...formData, tutorialDate: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Müəllim Adı</Label>
                                <Input
                                    value={formData.tutorName}
                                    onChange={(e) => setFormData({ ...formData, tutorName: e.target.value })}
                                    placeholder="Məs: Vəfa Bayramov"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Mövzu *</Label>
                            <Input
                                value={formData.topic}
                                onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                                placeholder="Məs: Knife Skills və Food Safety"
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label>Feedback/Rəy</Label>
                            <Textarea
                                value={formData.feedback}
                                onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
                                placeholder="Tələbənin irəliləyişi, güclü və zəif tərəfləri..."
                                rows={4}
                            />
                        </div>

                        <Button type="submit" disabled={submitting} className="w-full md:w-auto">
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Əlavə edilir...
                                </>
                            ) : (
                                'Tutorial Əlavə Et'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Filtr */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Filtr</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Tələbə</Label>
                            <Select
                                value={filter.studentId}
                                onValueChange={(val) => setFilter({ ...filter, studentId: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Hamısı" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Hamısı</SelectItem>
                                    {students.map(s => (
                                        <SelectItem key={s.id} value={s.id.toString()}>
                                            {s.ad} {s.soyad}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Unit</Label>
                            <Select
                                value={filter.unitCode}
                                onValueChange={(val) => setFilter({ ...filter, unitCode: val })}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Hamısı" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Hamısı</SelectItem>
                                    {CTH_UNITS.map(unit => (
                                        <SelectItem key={unit.code} value={unit.code}>
                                            {unit.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Tutorial Siyahısı */}
            <Card>
                <CardHeader>
                    <CardTitle>Tutorial Tarixçəsi</CardTitle>
                    <CardDescription>
                        Toplam: {tutorials.length} tutorial
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : tutorials.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Hələ tutorial əlavə edilməyib</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tələbə</TableHead>
                                        <TableHead>Unit</TableHead>
                                        <TableHead>Mövzu</TableHead>
                                        <TableHead>Tarix</TableHead>
                                        <TableHead>Müəllim</TableHead>
                                        <TableHead>IV Status</TableHead>
                                        <TableHead>Əməliyyat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {tutorials.map((tutorial) => (
                                        <TableRow key={tutorial.id}>
                                            <TableCell className="font-medium">
                                                {tutorial.studentAd} {tutorial.studentSoyad}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {tutorial.unitName || tutorial.unitCode}
                                            </TableCell>
                                            <TableCell>{tutorial.topic}</TableCell>
                                            <TableCell className="text-sm">
                                                {new Date(tutorial.tutorialDate).toLocaleDateString('az-AZ')}
                                            </TableCell>
                                            <TableCell className="text-sm">
                                                {tutorial.tutorName || '-'}
                                            </TableCell>
                                            <TableCell>
                                                {tutorial.ivChecked ? (
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <CheckCircle className="h-4 w-4" />
                                                        <span className="text-xs">
                                                            {tutorial.ivCheckedBy}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-yellow-600">
                                                        <Clock className="h-4 w-4" />
                                                        <span className="text-xs">Gözləyir</span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {!tutorial.ivChecked && (
                                                    <Button
                                                        size="sm"
                                                        variant="outline"
                                                        onClick={() => handleIVApprove(tutorial.id)}
                                                    >
                                                        IV Təsdiq
                                                    </Button>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
