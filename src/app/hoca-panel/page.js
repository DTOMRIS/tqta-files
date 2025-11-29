'use client';
'use client';

import { useState, useEffect } from "react";
import { toast } from "sonner";

export default function HocaPanel() {
    // State'ler
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [notes, setNotes] = useState([]); // Geçmiş notlar
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Form
    const [formData, setFormData] = useState({ konu: "", not: "", puan: "" });

    // 1. Sayfa açılınca öğrencileri çek
    useEffect(() => {
        fetchStudents();
    }, []);

    // 2. Öğrenci seçilince geçmiş notlarını çek
    useEffect(() => {
        if (selectedStudent) {
            fetchNotes(selectedStudent.id);
        }
    }, [selectedStudent]);

    const fetchStudents = async () => {
        try {
            const res = await fetch("/api/students?limit=100");
            const data = await res.json();
            if (data.success) setStudents(data.data.students);
        } catch (error) {
            toast.error("Öğrenci listesi alınamadı");
        } finally {
            setLoading(false);
        }
    };

    const fetchNotes = async (studentId) => {
        try {
            const res = await fetch(`/api/notes?studentId=${studentId}`);
            const data = await res.json();
            if (data.success) setNotes(data.data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSave = async () => {
        if (!selectedStudent || !formData.konu || !formData.not) {
            toast.warning("Lütfen konu ve not alanlarını doldurun.");
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch("/api/notes", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    studentId: selectedStudent.id,
                    ...formData,
                    instructor: "Şef Eğitmen" // Şimdilik sabit
                })
            });

            if (res.ok) {
                toast.success("Ders notu kaydedildi! ✅");
                setFormData({ konu: "", not: "", puan: "" }); // Formu temizle
                fetchNotes(selectedStudent.id); // Listeyi yenile
            } else {
                toast.error("Kaydedilemedi ❌");
            }
        } catch (error) {
            toast.error("Bir hata oluştu.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">👨‍🍳 Eğitmen Paneli</h1>
                    <p className="text-gray-500">Öğrenci takibi ve ders notları</p>
                </div>
                <div className="bg-white px-4 py-2 rounded-full shadow-sm text-sm font-medium text-blue-600 border border-blue-100">
                    {students.length} Kayıtlı Öğrenci
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[80vh]">

                {/* SOL: ÖĞRENCİ LİSTESİ (4 birim genişlik) */}
                <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                    <div className="p-4 border-b bg-gray-50">
                        <input
                            type="text"
                            placeholder="🔍 Öğrenci Ara..."
                            className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm outline-none focus:border-blue-500 transition"
                        />
                    </div>

                    <div className="overflow-y-auto flex-1 p-2 space-y-2">
                        {loading ? (
                            <p className="text-center text-gray-400 mt-10">Yükleniyor...</p>
                        ) : (
                            students.map((student) => (
                                <div
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student)}
                                    className={`p-4 rounded-xl cursor-pointer transition-all border ${selectedStudent?.id === student.id
                                            ? "bg-blue-50 border-blue-200 shadow-sm"
                                            : "bg-white border-transparent hover:bg-gray-50 hover:border-gray-200"
                                        }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h3 className="font-semibold text-gray-800">{student.ad} {student.soyad}</h3>
                                            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded mt-1 inline-block">
                                                {student.kursId || "Genel"}
                                            </span>
                                        </div>
                                        <div className={`w-2 h-2 rounded-full mt-2 ${student.aktif ? 'bg-green-500' : 'bg-red-300'}`}></div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* SAĞ: DETAY VE İŞLEM (8 birim genişlik) */}
                <div className="lg:col-span-8 space-y-6 overflow-y-auto pr-2">
                    {selectedStudent ? (
                        <>
                            {/* Giriş Formu */}
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                                    📝 Yeni Not Gir: <span className="text-blue-600">{selectedStudent.ad} {selectedStudent.soyad}</span>
                                </h2>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Konu / Ders</label>
                                        <input
                                            type="text"
                                            value={formData.konu}
                                            onChange={(e) => setFormData({ ...formData, konu: e.target.value })}
                                            placeholder="Örn: Temel Kesim Teknikleri"
                                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Puan (1-100)</label>
                                        <input
                                            type="number"
                                            value={formData.puan}
                                            onChange={(e) => setFormData({ ...formData, puan: e.target.value })}
                                            placeholder="85"
                                            className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label className="text-xs font-semibold text-gray-500 uppercase ml-1">Eğitmen Gözlemi</label>
                                    <textarea
                                        rows={4}
                                        value={formData.not}
                                        onChange={(e) => setFormData({ ...formData, not: e.target.value })}
                                        placeholder="Öğrencinin bugünkü performansı, eksikleri ve artıları..."
                                        className="w-full mt-1 p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition resize-none"
                                    ></textarea>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={handleSave}
                                        disabled={submitting}
                                        className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 active:scale-95 transition shadow-lg shadow-blue-200 disabled:opacity-50"
                                    >
                                        {submitting ? "Kaydediliyor..." : "Kaydet ve Bitir"}
                                    </button>
                                </div>
                            </div>

                            {/* Geçmiş Notlar */}
                            <h3 className="text-lg font-bold text-gray-700 ml-2">📋 Geçmiş Kayıtlar</h3>
                            <div className="space-y-4">
                                {notes.length === 0 ? (
                                    <div className="text-center p-8 text-gray-400 bg-white rounded-2xl border border-dashed">
                                        Henüz not girilmemiş.
                                    </div>
                                ) : (
                                    notes.map((note) => (
                                        <div key={note.id} className="bg-white p-5 rounded-2xl border border-gray-100 hover:shadow-md transition">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h4 className="font-bold text-gray-800">{note.konu}</h4>
                                                    <p className="text-xs text-gray-400">
                                                        {new Date(note.tarih).toLocaleDateString("tr-TR", { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' })}
                                                    </p>
                                                </div>
                                                {note.puan && (
                                                    <div className="bg-green-100 text-green-700 font-bold px-3 py-1 rounded-lg">
                                                        {note.puan} Puan
                                                    </div>
                                                )}
                                            </div>
                                            <p className="text-gray-600 text-sm leading-relaxed">{note.not}</p>
                                            <div className="mt-3 pt-3 border-t flex items-center gap-2 text-xs text-gray-400">
                                                <span>👨‍🏫 {note.instructor}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border border-gray-100">
                            <span className="text-6xl mb-4">👈</span>
                            <p className="text-lg font-medium">İşlem yapmak için soldan öğrenci seçin</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
