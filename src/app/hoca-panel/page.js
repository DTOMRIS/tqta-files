"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { UploadButton } from "@/components/UploadButton";
import "@uploadthing/react/styles.css";

export default function HocaPanel() {
    // --- GENEL STATE ---
    const [activeTab, setActiveTab] = useState("notes"); // 'notes' | 'attendance'
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    // --- NOTLAR STATE ---
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [notes, setNotes] = useState([]);
    const [noteForm, setNoteForm] = useState({ konu: "", not: "", puan: "", attachmentUrl: "" });
    const [submittingNote, setSubmittingNote] = useState(false);

    // --- YOKLAMA STATE ---
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().slice(0, 10)); // YYYY-MM-DD
    const [attendanceList, setAttendanceList] = useState({}); // { studentId: 'PRESENT' }
    const [submittingAttendance, setSubmittingAttendance] = useState(false);

    // 1. BAŞLANGIÇ: Öğrencileri Çek
    useEffect(() => {
        fetchStudents();
    }, []);

    // 2. TAB DEĞİŞİNCE: Yoklama verisini çek
    useEffect(() => {
        if (activeTab === "attendance") {
            fetchAttendanceForDate(attendanceDate);
        }
    }, [activeTab, attendanceDate]);

    // 3. ÖĞRENCİ SEÇİLİNCE: Notları çek
    useEffect(() => {
        if (selectedStudent) fetchNotes(selectedStudent.id);
    }, [selectedStudent]);

    // --- API FONKSİYONLARI ---
    const fetchStudents = async () => {
        try {
            const res = await fetch("/api/students?limit=100");
            const data = await res.json();
            if (data.success) {
                setStudents(data.data.students);
                // Yoklama listesini varsayılan olarak 'PRESENT' yap
                const initialAttendance = {};
                data.data.students.forEach(s => initialAttendance[s.id] = 'PRESENT');
                setAttendanceList(initialAttendance);
            }
        } catch (error) { toast.error("Liste alınamadı"); }
        finally { setLoading(false); }
    };

    const fetchNotes = async (studentId) => {
        const res = await fetch(`/api/notes?studentId=${studentId}`);
        const data = await res.json();
        if (data.success) setNotes(data.data);
    };

    const fetchAttendanceForDate = async (date) => {
        try {
            const res = await fetch(`/api/attendance?date=${date}`);
            const data = await res.json();
            if (data.success && data.data.length > 0) {
                const loaded = {};
                // Mevcut kayıtları eşleştir
                students.forEach(s => loaded[s.id] = 'PRESENT'); // Önce hepsini var say
                data.data.forEach(rec => loaded[rec.studentId] = rec.status); // Veritabanındakileri güncelle
                setAttendanceList(loaded);
            } else {
                // Kayıt yoksa hepsini PRESENT yap
                const reset = {};
                students.forEach(s => reset[s.id] = 'PRESENT');
                setAttendanceList(reset);
            }
        } catch (e) { console.error(e); }
    };

    // --- İŞLEM FONKSİYONLARI ---
    const handleSaveNote = async () => {
        if (!selectedStudent || !noteForm.konu) return toast.warning("Konu giriniz");
        setSubmittingNote(true);
        try {
            await fetch("/api/notes", {
                method: "POST",
                body: JSON.stringify({ ...noteForm, studentId: selectedStudent.id, instructor: "Şef" })
            });
            toast.success("Not kaydedildi");
            setNoteForm({ konu: "", not: "", puan: "", attachmentUrl: "" });
            fetchNotes(selectedStudent.id);
        } catch (e) { toast.error("Hata oluştu"); }
        finally { setSubmittingNote(false); }
    };

    const handleSaveAttendance = async () => {
        setSubmittingAttendance(true);
        try {
            const records = students.map(s => ({
                studentId: s.id,
                status: attendanceList[s.id] || 'PRESENT'
            }));

            await fetch("/api/attendance", {
                method: "POST",
                body: JSON.stringify({ date: attendanceDate, records, instructor: "Şef" })
            });
            toast.success("Yoklama kaydedildi! ✅");
        } catch (e) { toast.error("Yoklama hatası"); }
        finally { setSubmittingAttendance(false); }
    };

    const toggleAttendance = (studentId) => {
        setAttendanceList(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'PRESENT' ? 'ABSENT' : 'PRESENT'
        }));
    };

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
            {/* ÜST BAŞLIK */}
            <header className="mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">👨‍🍳 Eğitmen Paneli</h1>
                    <p className="text-gray-500">Mutfak Yönetim ve Takip Sistemi</p>
                </div>

                {/* TAB MENÜSÜ */}
                <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex">
                    <button
                        onClick={() => setActiveTab("notes")}
                        className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'notes' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        📝 Not & Profil
                    </button>
                    <button
                        onClick={() => setActiveTab("attendance")}
                        className={`px-6 py-2 rounded-lg font-medium transition ${activeTab === 'attendance' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                    >
                        📅 Hızlı Yoklama
                    </button>
                </div>
            </header>

            {/* --- TAB 1: NOTLAR VE PROFİL --- */}
            {activeTab === "notes" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[80vh]">
                    {/* SOL LİSTE */}
                    <div className="lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
                        <div className="p-4 border-b bg-gray-50">
                            <input type="text" placeholder="🔍 Öğrenci Ara..." className="w-full bg-white border rounded-lg px-4 py-2 text-sm outline-none" />
                        </div>
                        <div className="overflow-y-auto flex-1 p-2 space-y-2">
                            {students.map((student) => (
                                <div
                                    key={student.id}
                                    className={`p-4 rounded-xl border transition flex justify-between items-center group ${selectedStudent?.id === student.id
                                            ? "bg-blue-50 border-blue-200"
                                            : "bg-white border-transparent hover:bg-gray-50"
                                        }`}
                                >
                                    {/* Öğrenci İsmi - Tıklayınca Not Seçimi Yapar */}
                                    <div
                                        onClick={() => setSelectedStudent(student)}
                                        className="cursor-pointer flex-1"
                                    >
                                        <h3 className="font-semibold text-gray-800">{student.ad} {student.soyad}</h3>
                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 rounded">
                                            {student.kursId || "Genel"}
                                        </span>
                                    </div>

                                    {/* YENİ EKLENEN: Profil Butonu (👁️) */}
                                    <a
                                        href={`/telebeler/${student.id}`}
                                        target="_blank"
                                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-100 rounded-full transition"
                                        title="Detaylı Profili Gör"
                                    >
                                        👁️
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SAĞ DETAY */}
                    <div className="lg:col-span-8 space-y-6 overflow-y-auto pr-2">
                        {selectedStudent ? (
                            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold mb-4">📝 Not Ekle: <span className="text-blue-600">{selectedStudent.ad} {selectedStudent.soyad}</span></h2>
                                <div className="grid gap-4 mb-4">
                                    <input type="text" placeholder="Konu" value={noteForm.konu} onChange={e => setNoteForm({ ...noteForm, konu: e.target.value })} className="w-full p-3 border rounded-xl" />
                                    <textarea rows={3} placeholder="Notunuz..." value={noteForm.not} onChange={e => setNoteForm({ ...noteForm, not: e.target.value })} className="w-full p-3 border rounded-xl"></textarea>

                                    {/* FOTO YÜKLEME */}
                                    <div className="flex items-center gap-4 border p-3 rounded-xl bg-gray-50">
                                        <div className="text-sm text-gray-500">📸 Fotoğraf Ekle:</div>
                                        <UploadButton
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                setNoteForm({ ...noteForm, attachmentUrl: res[0].url });
                                                toast.success("Fotoğraf yüklendi!");
                                            }}
                                            onUploadError={(error) => toast.error(`Hata: ${error.message}`)}
                                        />
                                        {noteForm.attachmentUrl && <span className="text-green-600 text-xs font-bold">✅ Dosya Hazır</span>}
                                    </div>

                                    <button onClick={handleSaveNote} disabled={submittingNote} className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 disabled:opacity-50">
                                        {submittingNote ? "Kaydediliyor..." : "Kaydet"}
                                    </button>
                                </div>

                                {/* GEÇMİŞ */}
                                <h3 className="font-bold text-gray-700 mt-8 mb-4">📋 Geçmiş</h3>
                                <div className="space-y-4">
                                    {notes.map(note => (
                                        <div key={note.id} className="bg-gray-50 p-4 rounded-xl border">
                                            <div className="flex justify-between font-bold text-gray-800">
                                                <span>{note.konu}</span>
                                                <span className="text-xs text-gray-400">{new Date(note.tarih).toLocaleDateString("tr-TR")}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-1">{note.not}</p>
                                            {note.attachmentUrl && (
                                                <div className="mt-3">
                                                    <img src={note.attachmentUrl} alt="Ek" className="h-20 w-20 object-cover rounded-lg border cursor-pointer hover:scale-105 transition" onClick={() => window.open(note.attachmentUrl)} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border">👈 Öğrenci Seçin</div>
                        )}
                    </div>
                </div>
            )}

            {/* --- TAB 2: HIZLI YOKLAMA --- */}
            {activeTab === "attendance" && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center gap-4">
                            <h2 className="text-xl font-bold text-gray-800">📅 Sınıf Yoklaması</h2>
                            <input
                                type="date"
                                value={attendanceDate}
                                onChange={(e) => setAttendanceDate(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                        </div>
                        <button
                            onClick={handleSaveAttendance}
                            disabled={submittingAttendance}
                            className="bg-green-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-green-700 transition shadow-lg shadow-green-200 disabled:opacity-50"
                        >
                            {submittingAttendance ? "Kaydediliyor..." : "💾 Yoklamayı Kaydet"}
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {students.map((student) => {
                            const isPresent = attendanceList[student.id] === 'PRESENT';
                            return (
                                <div
                                    key={student.id}
                                    onClick={() => toggleAttendance(student.id)}
                                    className={`p-4 rounded-xl border-2 cursor-pointer transition flex justify-between items-center select-none ${isPresent
                                        ? "bg-white border-green-100 hover:border-green-300 shadow-sm"
                                        : "bg-red-50 border-red-200 hover:border-red-300"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white ${isPresent ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {student.ad.charAt(0)}
                                        </div>
                                        <div>
                                            <h3 className={`font-semibold ${isPresent ? 'text-gray-800' : 'text-red-700'}`}>{student.ad} {student.soyad}</h3>
                                            <p className="text-xs text-gray-400">{student.kursId}</p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${isPresent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {isPresent ? "GELDİ" : "YOK"}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
