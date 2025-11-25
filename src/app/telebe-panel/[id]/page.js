'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
import { Upload, FileText, Video, DollarSign, Loader2, CheckCircle, Download } from 'lucide-react';

const EVIDENCE_TYPES = [
    { value: 'recipe_log', label: 'Recipe Log', icon: FileText, accept: 'image/*,application/pdf' },
    { value: 'video', label: 'Video', icon: Video, accept: 'video/*' },
    { value: 'assignment', label: 'Assignment', icon: FileText, accept: 'application/pdf,.docx' },
    { value: 'time_plan', label: 'Time Plan & Costing', icon: DollarSign, accept: 'application/pdf,.xlsx' },
];

export default function TelebePanel() {
    const params = useParams();
    const studentId = params.id;

    const [student, setStudent] = useState(null);
    const [evidence, setEvidence] = useState([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const [uploadForm, setUploadForm] = useState({
        evidenceType: '',
        recipeName: '',
        description: '',
        file: null,
    });

    useEffect(() => {
        if (studentId) {
            fetchStudent();
            fetchEvidence();
        }
    }, [studentId]);

    const fetchStudent = async () => {
        try {
            const res = await fetch(`/api/students?search=${studentId}`);
            const data = await res.json();
            if (data.success && data.data.students.length > 0) {
                setStudent(data.data.students[0]);
            }
        } catch (error) {
            console.error('Fetch student error:', error);
        }
    };

    const fetchEvidence = async () => {
        try {
            setLoading(true);
            const res = await fetch(`/api/evidence/upload?studentId=${studentId}`);
            const data = await res.json();
            if (data.success) {
                setEvidence(data.data);
            }
        } catch (error) {
            console.error('Fetch evidence error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            setUploadForm({ ...uploadForm, file });
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (!uploadForm.file || !uploadForm.evidenceType) {
            alert('Fayl və sənəd tipi seçin');
            return;
        }

        setUploading(true);

        try {
            const formData = new FormData();
            formData.append('file', uploadForm.file);
            formData.append('studentId', studentId);
            formData.append('evidenceType', uploadForm.evidenceType);
            formData.append('recipeName', uploadForm.recipeName);
            formData.append('description', uploadForm.description);

            const res = await fetch('/api/evidence/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                alert('✅ Fayl uğurla yükləndi!');
                setUploadForm({
                    evidenceType: '',
                    recipeName: '',
                    description: '',
                    file: null,
                });

                const fileInput = document.getElementById('file-input');
                if (fileInput) fileInput.value = '';

                fetchEvidence();
                fetchStudent();
            } else {
                alert('❌ Xəta: ' + data.error);
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('❌ Fayl yükləməkdə xəta baş verdi');
        } finally {
            setUploading(false);
        }
    };

    const getEvidenceIcon = (type) => {
        const evidenceType = EVIDENCE_TYPES.find(t => t.value === type);
        const Icon = evidenceType?.icon || FileText;
        return <Icon className="h-5 w-5" />;
    };

    const groupedEvidence = EVIDENCE_TYPES.reduce((acc, type) => {
        acc[type.value] = evidence.filter(e => e.evidenceType === type.value);
        return acc;
    }, {});

    if (loading && !student) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold">
                    {student ? `${student.ad} ${student.soyad}` : 'Tələbə Paneli'}
                </h1>
                <p className="text-muted-foreground">Dijital Portfolyo - CTH Evidence Folder</p>
            </div>

            {/* Stats */}
            {student && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <FileText className="h-8 w-8 mx-auto mb-2 text-blue-600" />
                                <p className="text-2xl font-bold">{student.recipeLogCount || 0}</p>
                                <p className="text-sm text-muted-foreground">Recipe Logs</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <Video className="h-8 w-8 mx-auto mb-2 text-purple-600" />
                                <p className="text-2xl font-bold">{student.videoCount || 0}</p>
                                <p className="text-sm text-muted-foreground">Videos</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <FileText className="h-8 w-8 mx-auto mb-2 text-green-600" />
                                <p className="text-2xl font-bold">{student.assignmentCount || 0}</p>
                                <p className="text-sm text-muted-foreground">Assignments</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <CheckCircle className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                                <p className="text-2xl font-bold">{student.progressTutorialsCount || 0}</p>
                                <p className="text-sm text-muted-foreground">Tutorials</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Upload Form */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Upload className="h-5 w-5 text-blue-600" />
                        Yeni Sənəd Yüklə
                    </CardTitle>
                    <CardDescription>
                        CTH formatında sənəd yükləyin (Recipe log, video, assignment)
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpload} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Sənəd Tipi *</Label>
                                <Select
                                    value={uploadForm.evidenceType}
                                    onValueChange={(val) => setUploadForm({ ...uploadForm, evidenceType: val })}
                                    required
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Tip seçin..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {EVIDENCE_TYPES.map(type => (
                                            <SelectItem key={type.value} value={type.value}>
                                                {type.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {uploadForm.evidenceType === 'recipe_log' && (
                                <div className="space-y-2">
                                    <Label>Tarif Adı</Label>
                                    <Input
                                        value={uploadForm.recipeName}
                                        onChange={(e) => setUploadForm({ ...uploadForm, recipeName: e.target.value })}
                                        placeholder="Məs: Chicken Cordon Bleu"
                                    />
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <Label>Fayl *</Label>
                            <Input
                                id="file-input"
                                type="file"
                                onChange={handleFileChange}
                                accept={EVIDENCE_TYPES.find(t => t.value === uploadForm.evidenceType)?.accept}
                                required
                            />
                            <p className="text-xs text-muted-foreground">
                                {uploadForm.evidenceType === 'video' ? 'Maksimum 100MB' : 'Maksimum 5MB'}
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label>Təsvir</Label>
                            <Textarea
                                value={uploadForm.description}
                                onChange={(e) => setUploadForm({ ...uploadForm, description: e.target.value })}
                                placeholder="Qısa təsvir..."
                                rows={3}
                            />
                        </div>

                        <Button type="submit" disabled={uploading}>
                            {uploading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Yüklənir...
                                </>
                            ) : (
                                <>
                                    <Upload className="mr-2 h-4 w-4" />
                                    Yüklə
                                </>
                            )}
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Evidence List */}
            {EVIDENCE_TYPES.map(type => {
                const items = groupedEvidence[type.value] || [];
                if (items.length === 0) return null;

                return (
                    <Card key={type.value}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2 text-lg">
                                {getEvidenceIcon(type.value)}
                                {type.label} ({items.length})
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {items.map((item) => (
                                    <div key={item.id} className="border rounded-lg p-4 space-y-2">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <p className="font-medium text-sm">{item.fileName}</p>
                                                {item.recipeName && (
                                                    <p className="text-xs text-muted-foreground">{item.recipeName}</p>
                                                )}
                                                {item.description && (
                                                    <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between text-xs text-muted-foreground">
                                            <span>{new Date(item.uploadedAt).toLocaleDateString('az-AZ')}</span>
                                            <span>{(item.fileSize / 1024).toFixed(0)} KB</span>
                                        </div>
                                        <a href={item.filePath} target="_blank" rel="noopener noreferrer">
                                            <Button size="sm" variant="outline" className="w-full">
                                                <Download className="mr-2 h-3 w-3" />
                                                Bax/Endir
                                            </Button>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}

            {evidence.length === 0 && !loading && (
                <Card>
                    <CardContent className="py-12 text-center text-muted-foreground">
                        <Upload className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p>Hələ sənəd yüklənməyib</p>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
