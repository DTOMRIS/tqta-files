'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Loader2, Trash2, Shield, User } from 'lucide-react';

export default function AdminUsersPage() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [deleting, setDeleting] = useState(null);

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/login');
        } else if (status === 'authenticated') {
            if (session?.user?.role !== 'admin') {
                router.push('/');
            } else {
                fetchUsers();
            }
        }
    }, [status, session, router]);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            if (data.success) {
                setUsers(data.users);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu istifadəçini silmək istədiyinizə əminsiniz?')) return;

        setDeleting(id);
        try {
            const res = await fetch(`/api/users?id=${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();

            if (data.success) {
                setUsers(users.filter(u => u.id !== id));
            } else {
                alert(data.error || 'Xəta baş verdi');
            }
        } catch (error) {
            alert('Server xətası');
        } finally {
            setDeleting(null);
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
        <div className="container mx-auto py-10 px-4">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-2xl font-bold flex items-center gap-2">
                        <Shield className="h-6 w-6 text-blue-600" />
                        İstifadəçi İdarəetmə Paneli
                    </CardTitle>
                    <Badge variant="outline" className="text-lg px-4 py-1">
                        Toplam: {users.length}
                    </Badge>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>İstifadəçi</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Rol</TableHead>
                                    <TableHead>Qeydiyyat Tarixi</TableHead>
                                    <TableHead>Son Giriş</TableHead>
                                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {users.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-2">
                                                <div className="bg-slate-100 p-2 rounded-full">
                                                    <User className="h-4 w-4 text-slate-600" />
                                                </div>
                                                {user.ad} {user.soyad}
                                            </div>
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                                {user.role === 'admin' ? 'Admin' : 'Müəllim'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {new Date(user.createdAt).toLocaleDateString('az-AZ')}
                                        </TableCell>
                                        <TableCell>
                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleString('az-AZ') : '-'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                                onClick={() => handleDelete(user.id)}
                                                disabled={deleting === user.id || user.id === parseInt(session?.user?.id)}
                                            >
                                                {deleting === user.id ? (
                                                    <Loader2 className="h-4 w-4 animate-spin" />
                                                ) : (
                                                    <Trash2 className="h-4 w-4" />
                                                )}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
