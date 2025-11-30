'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Users, UserPlus, Search, Shield, Trash2, Edit, Save, X, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users');
            const data = await res.json();
            if (data.success) {
                setUsers(data.data);
            } else {
                // Yetkisiz erişim ise ana sayfaya at
                if (res.status === 401) router.push('/');
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (id, role, aktif) => {
        try {
            const res = await fetch('/api/users', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, role, aktif }),
            });
            const data = await res.json();
            if (data.success) {
                alert('✅ İstifadəçi yeniləndi');
                setEditingUser(null);
                fetchUsers();
            } else {
                alert('❌ Xəta: ' + data.error);
            }
        } catch (error) {
            console.error('Update error:', error);
        }
    };

    const handleDelete = async (id) => {
        if (!confirm('Bu istifadəçini silmək istədiyinizə əminsiniz?')) return;

        try {
            const res = await fetch(`/api/users?id=${id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success) {
                alert('✅ İstifadəçi silindi');
                fetchUsers();
            } else {
                alert('❌ Xəta: ' + data.error);
            }
        } catch (error) {
            console.error('Delete error:', error);
        }
    };

    const filteredUsers = users.filter(user =>
        user.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.soyad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold flex items-center gap-2">
                        <Users className="h-8 w-8 text-blue-600" />
                        İstifadəçi İdarəetməsi
                    </h1>
                    <p className="text-muted-foreground">Sistemə giriş icazəsi olan istifadəçilər</p>
                </div>
                <Button onClick={() => router.push('/register')}>
                    <UserPlus className="mr-2 h-4 w-4" /> Yeni İstifadəçi
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <CardTitle>İstifadəçilər ({users.length})</CardTitle>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Axtar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-8"
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {loading ? (
                        <div className="flex justify-center py-8">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Ad Soyad</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Rol</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Son Giriş</TableHead>
                                    <TableHead className="text-right">Əməliyyatlar</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell className="font-medium">
                                            {user.ad} {user.soyad}
                                        </TableCell>
                                        <TableCell>{user.email}</TableCell>
                                        <TableCell>
                                            {editingUser === user.id ? (
                                                <Select
                                                    defaultValue={user.role}
                                                    onValueChange={(val) => handleUpdate(user.id, val, user.aktif)}
                                                >
                                                    <SelectTrigger className="w-32">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="admin">Admin</SelectItem>
                                                        <SelectItem value="teacher">Müəllim</SelectItem>
                                                        <SelectItem value="user">İstifadəçi</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) : (
                                                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                                                    {user.role === 'admin' ? <Shield className="w-3 h-3 mr-1" /> : null}
                                                    {user.role.toUpperCase()}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            {editingUser === user.id ? (
                                                <div className="flex items-center space-x-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={user.aktif}
                                                        onChange={(e) => handleUpdate(user.id, user.role, e.target.checked)}
                                                        className="h-4 w-4"
                                                    />
                                                    <span className="text-sm">Aktif</span>
                                                </div>
                                            ) : (
                                                <Badge variant={user.aktif ? 'outline' : 'destructive'} className={user.aktif ? 'text-green-600 border-green-600' : ''}>
                                                    {user.aktif ? 'Aktif' : 'Pasif'}
                                                </Badge>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {user.lastLogin ? new Date(user.lastLogin).toLocaleString('az-AZ') : '-'}
                                        </TableCell>
                                        <TableCell className="text-right">
                                            {editingUser === user.id ? (
                                                <Button variant="ghost" size="sm" onClick={() => setEditingUser(null)}>
                                                    <X className="h-4 w-4" />
                                                </Button>
                                            ) : (
                                                <div className="flex justify-end gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => setEditingUser(user.id)}>
                                                        <Edit className="h-4 w-4 text-blue-600" />
                                                    </Button>
                                                    <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)}>
                                                        <Trash2 className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
