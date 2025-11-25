'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { CheckCircle, Clock, Send, Loader2, AlertCircle } from 'lucide-react';

export default function IVPanelPage() {
    const [assessments, setAssessments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showPendingOnly, setShowPendingOnly] = useState(true);

    useEffect(() => {
        fetchAssessments();
    }, [showPendingOnly]);

    const fetchAssessments = async () => {
        try {
            setLoading(true);
            const url = showPendingOnly ? '/api/assessments?pending=true' : '/api/assessments';
            const res = await fetch(url);
            const data = await res.json();
            if (data.success) {
                setAssessments(data.data);
            }
        } catch (error) {
            console.error('Fetch assessments error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleIVApprove = async (assessmentId) => {
        const ivName = prompt('IV adınızı daxil edin:');
        if (!ivName) return;

        const ivComments = prompt('Şərh (optional):');

        try {
            const res = await fetch(`/api/assessments/${assessmentId}/iv-approve`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ivName, ivComments }),
            });

            const data = await res.json();

            if (data.success) {
                alert('✅ Qiymətləndirmə IV tərəfindən təsdiqləndi!');
                fetchAssessments();
            } else {
                alert('❌ Xəta: ' + data.error);
            }
        } catch (error) {
            console.error('IV approve error:', error);
            alert('❌ IV təsdiq zamanı xəta baş verdi');
        }
    };

    const handleSubmitToCTH = async (assessmentId) => {
        if (!confirm('Bu qiymətləndirməni CTH-ə göndərmək istədiyinizdən əminsiniz?')) {
            return;
        }

        try {
            const res = await fetch(`/api/assessments/${assessmentId}/submit-to-cth`, {
                method: 'POST',
            });

            const data = await res.json();

            if (data.success) {
                alert('✅ Qiymətləndirmə CTH-ə uğurla göndərildi!');
                fetchAssessments();
            } else {
                alert('❌ Xəta: ' + data.error);
            }
        } catch (error) {
            console.error('CTH submit error:', error);
            alert('❌ CTH-ə göndərmə zamanı xəta baş verdi');
        }
    };

    const getGradeColor = (grade) => {
        switch (grade) {
            case 'Distinction': return 'text-green-700 bg-green-50';
            case 'Merit': return 'text-blue-700 bg-blue-50';
            case 'Pass': return 'text-yellow-700 bg-yellow-50';
            case 'Fail': return 'text-red-700 bg-red-50';
            default: return 'text-gray-700 bg-gray-50';
        }
    };

    const pendingCount = assessments.filter(a => !a.ivApproved).length;
    const approvedCount = assessments.filter(a => a.ivApproved && !a.submittedToCth).length;
    const submittedCount = assessments.filter(a => a.submittedToCth).length;

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">IV Panel</h1>
                <p className="text-muted-foreground">Internal Verification - Qiymət Təsdiqi</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Gözləyir</p>
                                <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
                            </div>
                            <Clock className="h-10 w-10 text-yellow-600 opacity-50" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Təsdiqlənib</p>
                                <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
                            </div>
                            <CheckCircle className="h-10 w-10 text-green-600 opacity-50" />
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">CTH-ə Göndərilib</p>
                                <p className="text-3xl font-bold text-blue-600">{submittedCount}</p>
                            </div>
                            <Send className="h-10 w-10 text-blue-600 opacity-50" />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filter */}
            <div className="flex gap-2">
                <Button
                    variant={showPendingOnly ? 'default' : 'outline'}
                    onClick={() => setShowPendingOnly(true)}
                >
                    Yalnız Gözləyənlər ({pendingCount})
                </Button>
                <Button
                    variant={!showPendingOnly ? 'default' : 'outline'}
                    onClick={() => setShowPendingOnly(false)}
                >
                    Hamısı ({assessments.length})
                </Button>
            </div>

            {/* Assessments Table */}
            <Card>
                <CardHeader>
                    <CardTitle>Qiymətləndirmələr</CardTitle>
                    <CardDescription>
                        {showPendingOnly ? 'IV təsdiqi gözləyən qiymətlər' : 'Bütün qiymətləndirmələr'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : assessments.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                            <AlertCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                            <p>Qiymətləndirmə tapılmadı</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Tələbə</TableHead>
                                        <TableHead>Unit</TableHead>
                                        <TableHead>Tip</TableHead>
                                        <TableHead>Qiymət</TableHead>
                                        <TableHead>Müəllim</TableHead>
                                        <TableHead>Tarix</TableHead>
                                        <TableHead>IV Status</TableHead>
                                        <TableHead>CTH Status</TableHead>
                                        <TableHead>Əməliyyat</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {assessments.map((assessment) => (
                                        <TableRow key={assessment.id}>
                                            <TableCell className="font-medium">
                                                {assessment.studentAd} {assessment.studentSoyad}
                                            </TableCell>
                                            <TableCell className="text-sm">{assessment.unitCode}</TableCell>
                                            <TableCell className="text-sm capitalize">{assessment.assessmentType}</TableCell>
                                            <TableCell>
                                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getGradeColor(assessment.teacherGrade)}`}>
                                                    {assessment.teacherGrade}
                                                </span>
                                            </TableCell>
                                            <TableCell className="text-sm">{assessment.teacherName || '-'}</TableCell>
                                            <TableCell className="text-sm">
                                                {new Date(assessment.teacherDate).toLocaleDateString('az-AZ')}
                                            </TableCell>
                                            <TableCell>
                                                {assessment.ivApproved ? (
                                                    <div className="flex items-center gap-1 text-green-600">
                                                        <CheckCircle className="h-4 w-4" />
                                                        <span className="text-xs">{assessment.ivName}</span>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1 text-yellow-600">
                                                        <Clock className="h-4 w-4" />
                                                        <span className="text-xs">Gözləyir</span>
                                                    </div>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                {assessment.submittedToCth ? (
                                                    <div className="flex items-center gap-1 text-blue-600">
                                                        <Send className="h-4 w-4" />
                                                        <span className="text-xs">Göndərilib</span>
                                                    </div>
                                                ) : (
                                                    <span className="text-xs text-gray-500">-</span>
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-2">
                                                    {!assessment.ivApproved && (
                                                        <Button
                                                            size="sm"
                                                            variant="outline"
                                                            onClick={() => handleIVApprove(assessment.id)}
                                                        >
                                                            <CheckCircle className="mr-1 h-3 w-3" />
                                                            Təsdiq
                                                        </Button>
                                                    )}
                                                    {assessment.ivApproved && !assessment.submittedToCth && (
                                                        <Button
                                                            size="sm"
                                                            variant="default"
                                                            onClick={() => handleSubmitToCTH(assessment.id)}
                                                        >
                                                            <Send className="mr-1 h-3 w-3" />
                                                            CTH-ə Göndər
                                                        </Button>
                                                    )}
                                                </div>
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
