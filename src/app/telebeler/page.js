'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Users,
    Search,
    FileDown,
    Eye,
    Loader2,
    ChevronLeft,
    ChevronRight
} from 'lucide-react';
import { KURSLAR } from '@/data/kurslar';

export default function TelebelerPage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [kursFilter, setKursFilter] = useState('');
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0
    });

    useEffect(() => {
        fetchStudents();
    }, [search, kursFilter, pagination.page]);

    const fetchStudents = async () => {
        try {
            setLoading(true);

            const params = new URLSearchParams({
                page: pagination.page.toString(),
                limit: pagination.limit.toString()
            });

            if (search) params.append('search', search);
            if (kursFilter) params.append('kursId', kursFilter);

            const res = await fetch(`/api/students?${params}`);
            const data = await res.json();

            if (data.success) {
                setStudents(data.data.students);
                setPagination(data.data.pagination);
            }
        } catch (error) {
            console.error('Fetch students error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (value) => {
        setSearch(value);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleKursFilterChange = (value) => {
        setKursFilter(value);
        setPagination(prev => ({ ...prev, page: 1 }));
    };

    const handleExport = async () => {
        try {
            const params = new URLSearchParams();
            if (kursFilter) params.append('kursId', kursFilter);

            const res = await fetch(`/api/students/export?${params}`);
            const blob = await res.blob();

            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `telebeler_${new Date().toISOString().split('T')[0]}.xlsx`;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Export error:', error);
            alert('Excel export zamanı xəta baş verdi');
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('az-AZ');
    };

    const getKursName = (kursId) => {
        const kurs = KURSLAR.find(k => k.id === kursId);
        return kurs ? kurs.ad : kursId;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Tələbələr</h1>
                    <p className="text-muted-foreground">Bütün qeydiyyatlı tələbələr</p>
                </div>
                <div className="flex gap-2">
                    <Button onClick={handleExport} variant="outline">
                        <FileDown className="mr-2 h-4 w-4" />
                        Excel-ə Export
                    </Button>
                    <Link href="/telebe-qeydiyyat">
                        <Button>
                            <Users className="mr-2 h-4 w-4" />
                            Yeni Tələbə
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">Axtarış və Filtr</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="md:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Ad, soyad, email, telefon və ya FİN ilə axtar..."
                                    value={search}
                                    onChange={(e) => handleSearchChange(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                        </div>
                        <div>
                            <Select value={kursFilter} onValueChange={handleKursFilterChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Kurs seç..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="">Hamısı</SelectItem>
                                    {KURSLAR.map(kurs => (
                                        <SelectItem key={kurs.id} value={kurs.id}>
                                            {kurs.ad}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Table */}
            <Card>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                            <span className="ml-2">Yüklənir...</span>
                        </div>
                    ) : students.length === 0 ? (
                        <div className="text-center py-12 text-muted-foreground">
                            Tələbə tapılmadı
                        </div>
                    ) : (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-slate-50 border-b">
                                        <tr>
                                            <th className="text-left p-4 font-medium">Ad Soyad</th>
                                            <th className="text-left p-4 font-medium">Email</th>
                                            <th className="text-left p-4 font-medium">Telefon</th>
                                            <th className="text-left p-4 font-medium">Kurs</th>
                                            <th className="text-left p-4 font-medium">Qeydiyyat</th>
                                            <th className="text-left p-4 font-medium">Ödəniş</th>
                                            <th className="text-right p-4 font-medium">Əməliyyat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {students.map((student) => (
                                            <tr key={student.id} className="border-b hover:bg-slate-50">
                                                <td className="p-4">
                                                    <div className="font-medium">{student.ad} {student.soyad}</div>
                                                    <div className="text-sm text-muted-foreground">{student.anaKategoriya}</div>
                                                </td>
                                                <td className="p-4 text-sm">{student.email}</td>
                                                <td className="p-4 text-sm">{student.telefon}</td>
                                                <td className="p-4 text-sm">{getKursName(student.kursId)}</td>
                                                <td className="p-4 text-sm">{formatDate(student.kayitTarihi)}</td>
                                                <td className="p-4">
                                                    <span className="text-sm font-medium text-green-600">
                                                        {student.finalPrice} AZN
                                                    </span>
                                                </td>
                                                <td className="p-4 text-right">
                                                    <Link href={`/telebeler/${student.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex items-center justify-between p-4 border-t">
                                <div className="text-sm text-muted-foreground">
                                    Toplam {pagination.total} tələbə (Səhifə {pagination.page} / {pagination.totalPages})
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                        disabled={pagination.page === 1}
                                    >
                                        <ChevronLeft className="h-4 w-4" />
                                        Əvvəlki
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                        disabled={pagination.page === pagination.totalPages}
                                    >
                                        Sonrakı
                                        <ChevronRight className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
