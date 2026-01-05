'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, GraduationCap, ChefHat, Users, BookOpen, Trophy, Download, Play } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('teacher'); // 'student' or 'teacher'
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const result = await signIn('credentials', {
                email,
                password,
                redirect: false,
            });

            if (result?.error) {
                setError('Email və ya şifrə yanlışdır');
            } else {
                router.push('/');
                router.refresh();
            }
        } catch (err) {
            setError('Giriş zamanı xəta baş verdi');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex">
            {/* Sol Taraf - Login Formu (CTH Benzeri) */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl mb-4">
                            <ChefHat className="h-8 w-8 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">TQTA Portal</h1>
                        <p className="text-gray-600">Tədris və Öyrənmə Zonası</p>
                    </div>

                    {/* User Type Selection */}
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                        <button
                            type="button"
                            onClick={() => setUserType('teacher')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                                userType === 'teacher'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <Users className="h-4 w-4 inline mr-2" />
                            Müəllim
                        </button>
                        <button
                            type="button"
                            onClick={() => setUserType('student')}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                                userType === 'student'
                                    ? 'bg-white text-blue-600 shadow-sm'
                                    : 'text-gray-600 hover:text-gray-900'
                            }`}
                        >
                            <GraduationCap className="h-4 w-4 inline mr-2" />
                            Tələbə
                        </button>
                    </div>

                    {/* Login Form */}
                    <Card className="border-0 shadow-lg">
                        <CardContent className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">Daxil ol</h2>
                            
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="email">İstifadəçi adı / Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="ornek@tqta.az"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="h-11"
                                    />
                                </div>
                                
                                <div className="space-y-2">
                                    <Label htmlFor="password">Şifrə</Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={loading}
                                        className="h-11"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <label className="flex items-center gap-2 text-sm text-gray-600">
                                        <input type="checkbox" className="rounded" />
                                        Yadda saxla?
                                    </label>
                                    <Link href="#" className="text-sm text-blue-600 hover:underline">
                                        Şifrəni unutmusan?
                                    </Link>
                                </div>

                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                                        <p className="text-sm text-red-700 font-medium">{error}</p>
                                    </div>
                                )}

                                <Button
                                    type="submit"
                                    className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Giriş edilir...
                                        </>
                                    ) : (
                                        'Daxil ol'
                                    )}
                                </Button>
                            </form>

                            <div className="mt-6 pt-6 border-t">
                                <p className="text-center text-sm text-gray-600 mb-4">
                                    Hesabın yoxdur?
                                </p>
                                <Link href="/telebe-qeydiyyat">
                                    <Button variant="outline" className="w-full">
                                        Yeni Qeydiyyat
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Footer Links */}
                    <div className="text-center space-y-2">
                        <div className="flex justify-center gap-4 text-sm text-gray-600">
                            <Link href="#" className="hover:text-blue-600">Əlaqə</Link>
                            <span>|</span>
                            <Link href="#" className="hover:text-blue-600">Məxfilik Siyasəti</Link>
                            <span>|</span>
                            <Link href="#" className="hover:text-blue-600">Şərtlər</Link>
                        </div>
                        <p className="text-xs text-gray-500">
                            © 2025 TQTA. Bütün hüquqlar qorunur.
                        </p>
                    </div>
                </div>
            </div>

            {/* Sağ Taraf - Özellikler (CTH Benzeri) */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 text-white p-12 flex-col justify-center">
                <div className="max-w-md mx-auto space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-4">
                            TQTA Portal ilə CTH təhsilini effektiv öyrənin:
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Özellik 1 */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <Download className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Resursları Yüklə</h3>
                            <p className="text-sm text-blue-100">
                                Müəllim və tələbələr üçün geniş alət və resurslar
                            </p>
                        </div>

                        {/* Özellik 2 */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <Users className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Karyera Məsləhəti</h3>
                            <p className="text-sm text-blue-100">
                                Sənayedə öyrənmə və işləmə haqqında məsləhətlər
                            </p>
                        </div>

                        {/* Özellik 3 */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <Play className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Video Dərslər</h3>
                            <p className="text-sm text-blue-100">
                                Bütün video dərsləri bir yerdə izlə və öyrən
                            </p>
                        </div>

                        {/* Özellik 4 */}
                        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mb-4">
                                <Trophy className="h-6 w-6" />
                            </div>
                            <h3 className="font-bold text-lg mb-2">Yarışlara Qatıl</h3>
                            <p className="text-sm text-blue-100">
                                Ekskluziv yarışlarda iştirak et və mükafatlar qazan
                            </p>
                        </div>
                    </div>

                    {/* CTH Badge */}
                    <div className="mt-8 pt-8 border-t border-white/20">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                                <BookOpen className="h-6 w-6" />
                            </div>
                            <div>
                                <p className="font-semibold">CTH Akreditasiya</p>
                                <p className="text-sm text-blue-100">Beynəlxalq tanınmış sertifikatlar</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
