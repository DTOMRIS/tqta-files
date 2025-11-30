'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ClipboardCheck, Loader2 } from 'lucide-react';

const ALL_UNITS = [
    // CTH Units
    { code: 'CTH-L2-COOK', name: 'CTH Level 2 Cookery', type: 'CTH' },
    { code: 'CTH-L2-FOH', name: 'CTH Level 2 Front of House', type: 'CTH' },
    { code: 'CTH-L2-PAST', name: 'CTH Level 2 Pastry', type: 'CTH' },
    { code: 'CTH-L3-COOK', name: 'CTH Level 3 Cookery', type: 'CTH' },
    { code: 'CTH-L3-FOH', name: 'CTH Level 3 Front of House', type: 'CTH' },
    // DMA Units
    { code: 'DMA-COOK', name: 'DMA Aşpazlıq', type: 'DMA' },
    { code: 'DMA-PAST', name: 'DMA Qənnadçı', type: 'DMA' },
    { code: 'DMA-BAR', name: 'DMA Barista', type: 'DMA' },
    { code: 'DMA-FOH', name: 'DMA Ofisiant', type: 'DMA' },
    { code: 'DMA-TOUR', name: 'DMA Turoperator', type: 'DMA' },
    // Other
    { code: 'GEN-COOK', name: 'Ümumi Aşpazlıq', type: 'General' },
    { code: 'GEN-PAST', name: 'Ümumi Qənnadçı', type: 'General' },
];

const GRADES = ['Pass', 'Merit', 'Distinction', 'Fail'];
const ASSESSMENT_TYPES = ['assignment', 'exam', 'practical'];

export default function QiymetlendirmePage() {
    const [students, setStudents] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        studentId: '',
        assessmentType: '',
        unitCode: '',
        teacherGrade: '',
        teacherName: '',
    });

    useEffect(() => {
        fetchStudents();
    }, []);

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

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const res = await fetch('/api/assessments', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                alert('✅ Qiymətləndirmə uğurla əlavə edildi! IV təsdiqi gözləyir.');
                setFormData({
                    studentId: '',
                    assessmentType: '',
                    unitCode: '',
                    teacherGrade: '',
                    teacherName: '',
                });
            } else {
                alert('❌ Xəta: ' + data.error);
            }
        } catch (error) {
            console.error('Submit error:', error);
            alert('❌ Qiymətləndirmə əlavə edilərkən xəta baş verdi');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-3xl font-bold">Qiymətləndirmə</h1>
                <p className="text-muted-foreground">Tələbə qiymətlərini daxil edin</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ClipboardCheck className="h-5 w-5 text-green-600" />
                        Yeni Qiymətləndirmə
                    </CardTitle>
                    <CardDescription>
                        Qiymətlər IV tərəfindən təsdiqlənməlidir
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
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

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Qiymətləndirmə Tipi *</Label>
                                <Select
                                    value={formData.assessmentType}
                                    onValueChange={(val) => setFormData({ ...formData, assessmentType: val })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tip seçin..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="assignment">Assignment</SelectItem>
                                        <SelectItem value="exam">Exam</SelectItem>
                                        <SelectItem value="practical">Practical</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Unit Code *</Label>
                                <Select
                                    value={formData.unitCode}
                                    onValueChange={(val) => setFormData({ ...formData, unitCode: val })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Unit seçin..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ALL_UNITS.map(unit => (
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
                                <Label>Qiymət *</Label>
                                <Select
                                    value={formData.teacherGrade}
                                    onValueChange={(val) => setFormData({ ...formData, teacherGrade: val })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Qiymət seçin..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {GRADES.map(grade => (
                                            <SelectItem key={grade} value={grade}>
                                                {grade}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Müəllim Adı</Label>
                                <Input
                                    value={formData.teacherName}
                                    onChange={(e) => setFormData({ ...formData, teacherName: e.target.value })}
                                    placeholder="Məs: Vəfa Bayramov"
                                />
                            </div>
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                            <p className="text-sm text-yellow-800">
                                ⚠️ <strong>Qeyd:</strong> Bu qiymət IV (Internal Verifier) tərəfindən təsdiqlənməlidir.
                                Təsdiq olmadan CTH-ə göndərilə bilməz.
                            </p>
                        </div>

                        <Button type="submit" disabled={submitting} className="w-full">
                            {submitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Əlavə edilir...
                                </>
                            ) : (
                                'Qiymətləndirmə Əlavə Et'
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
