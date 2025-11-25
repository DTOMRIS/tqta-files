'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, UserPlus } from 'lucide-react';

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        ad: '',
        soyad: '',
        role: 'admin',
        registrationKey: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                setSuccess(true);
                alert('✅ İstifadəçi yaradıldı! İndi login edə bilərsiniz.');
                setTimeout(() => {
                    router.push('/login');
                }, 2000);
            } else {
                setError(data.error || 'Xəta baş verdi');
            }
        } catch (err) {
            setError('Server xətası');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-2xl">
                        <UserPlus className="h-6 w-6" />
                        Yeni İstifadəçi Yarat
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <div className="text-center py-8">
                            <div className="text-green-600 text-6xl mb-4">✅</div>
                            <p className="text-lg font-semibold">İstifadəçi yaradıldı!</p>
                            <p className="text-sm text-muted-foreground mt-2">Login səhifəsinə yönləndirilirsiniz...</p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label>Ad *</Label>
                                <Input
                                    value={formData.ad}
                                    onChange={(e) => setFormData({ ...formData, ad: e.target.value })}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Soyad *</Label>
                                <Input
                                    value={formData.soyad}
                                    onChange={(e) => setFormData({ ...formData, soyad: e.target.value })}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Email *</Label>
                                <Input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="admin@tqta.az"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Şifrə *</Label>
                                <Input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Rol *</Label>
                                <Select
                                    value={formData.role}
                                    onValueChange={(val) => setFormData({ ...formData, role: val })}
                                >
                                    <SelectTrigger>
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="admin">Admin</SelectItem>
                                        <SelectItem value="teacher">Müəllim</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="space-y-2">
                                <Label>Qeydiyyat Açarı *</Label>
                                <Input
                                    type="password"
                                    value={formData.registrationKey}
                                    onChange={(e) => setFormData({ ...formData, registrationKey: e.target.value })}
                                    placeholder="Admin tərəfindən verilən kod"
                                    required
                                    disabled={loading}
                                />
                            </div>

                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded">
                                    <p className="text-sm text-red-700">{error}</p>
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Yaradılır...
                                    </>
                                ) : (
                                    'İstifadəçi Yarat'
                                )}
                            </Button>
                        </form>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
