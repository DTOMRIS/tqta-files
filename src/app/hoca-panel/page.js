"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { UploadButton } from "@/utils/uploadthing";
import { ArrowLeft, Search, Calendar, Save, FileText, CheckCircle, XCircle } from "lucide-react";

export default function HocaPanel() {
    // --- STATE ---
    const [activeTab, setActiveTab] = useState("notes"); // 'notes' | 'attendance'
    const [students, setStudents] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);

    // --- NOTLAR STATE ---
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [notes, setNotes] = useState([]);
    const [noteForm, setNoteForm] = useState({ konu: "", not: "", puan: "", attachmentUrl: "" });
    const [submittingNote, setSubmittingNote] = useState(false);

    // --- DAVAMİYYƏT STATE ---
    const [attendanceDate, setAttendanceDate] = useState(new Date().toISOString().slice(0, 10));
    const [attendanceList, setAttendanceList] = useState({});
    const [submittingAttendance, setSubmittingAttendance] = useState(false);

    // --- YÜKLƏMƏ ---
    useEffect(() => { fetchStudents(); }, []);
    useEffect(() => { if (activeTab === "attendance") fetchAttendanceForDate(attendanceDate); }, [activeTab, attendanceDate]);
    useEffect(() => { if (selectedStudent) fetchNotes(selectedStudent.id); }, [selectedStudent]);

    // --- API ---
    const fetchStudents = async () => {
        try {
            const res = await fetch("/api/students?limit=100");
            const data = await res.json();
            if (data.success) {
                setStudents(data.data.students);
                const initialAttendance = {};
                data.data.students.forEach(s => initialAttendance[s.id] = 'PRESENT');
                setAttendanceList(initialAttendance);
            }
        } catch (error) { toast.error("Tələbə siyahısı alınmadı"); }
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
                students.forEach(s => loaded[s.id] = 'PRESENT');
                data.data.forEach(rec => loaded[rec.studentId] = rec.status);
                setAttendanceList(loaded);
            } else {
                const reset = {};
                students.forEach(s => reset[s.id] = 'PRESENT');
                setAttendanceList(reset);
            }
        } catch (e) { console.error(e); }
    };

    // --- ACTIONS ---
    const handleSaveNote = async () => {
        if (!selectedStudent || !noteForm.konu) return toast.warning("Zəhmət olmasa mövzu daxil edin");
        setSubmittingNote(true);
        try {
            await fetch("/api/notes", {
                method: "POST",
                body: JSON.stringify({ ...noteForm, studentId: selectedStudent.id, instructor: "Müəllim" })
            });
            toast.success("Qeyd yadda saxlanıldı! ✅");
            setNoteForm({ konu: "", not: "", puan: "", attachmentUrl: "" });
            fetchNotes(selectedStudent.id);
        } catch (e) { toast.error("Xəta baş verdi"); }
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
                body: JSON.stringify({ date: attendanceDate, records, instructor: "Müəllim" })
            });
            toast.success("Davamiyyət yadda saxlanıldı! ✅");
        } catch (e) { toast.error("Xəta baş verdi"); }
        finally { setSubmittingAttendance(false); }
    };

    const toggleAttendance = (studentId) => {
        setAttendanceList(prev => ({
            ...prev,
            [studentId]: prev[studentId] === 'PRESENT' ? 'ABSENT' : 'PRESENT'
        }));
    };

    // Axtarış Filtri
    const filteredStudents = students.filter(student =>
        student.ad.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.soyad.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans pb-32">

            <header className="mb-4 flex flex-col gap-2 sticky top-0 bg-gray-50 z-10 pt-2">
                {/* MOBİL: GERİ DÜYMƏSİ */}
                {selectedStudent && activeTab === "notes" && (
                    <button
                        onClick={() => setSelectedStudent(null)}
                        className="lg:hidden flex items-center text-blue-600 font-bold mb-2 bg-white p-2 rounded-lg shadow-sm w-max"
                    >
                        <ArrowLeft size={20} className="mr-1" /> Siyahıya Qayıt
                    </button>
                )}

                <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
                            👨‍🏫 Müəllim Paneli
                        </h1>
                    </div>

                    <div className="bg-white p-1 rounded-xl shadow-sm border border-gray-200 flex w-full md:w-auto">
                        <button
                            onClick={() => { setActiveTab("notes"); setSelectedStudent(null); }}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2 ${activeTab === 'notes' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <FileText size={16} /> Qeydlər
                        </button>
                        <button
                            onClick={() => setActiveTab("attendance")}
                            className={`flex-1 md:flex-none px-6 py-2 rounded-lg font-medium text-sm transition flex items-center justify-center gap-2 ${activeTab === 'attendance' ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:bg-gray-50'}`}
                        >
                            <Calendar size={16} /> Davamiyyət
                        </button>
                    </div>
                </div>
            </header>

            {/* --- TAB 1: QEYDLƏR VƏ PROFİL --- */}
            {activeTab === "notes" && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto">

                    {/* SOL: TƏLƏBƏ SİYAHISI (Mobilde seçili varsa gizlənir) */}
                    <div className={`lg:col-span-4 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col ${selectedStudent ? 'hidden lg:flex' : 'flex'}`}>
                        <div className="p-4 border-b bg-gray-50 relative">
                            <Search className="absolute left-7 top-7 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Tələbə axtar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-white border rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-100"
                            />
                        </div>
                        <div className="overflow-y-auto max-h-[70vh] p-2 space-y-2">
                            {filteredStudents.map((student) => (
                                <div key={student.id}
                                    className={`p-3 rounded-xl border flex justify-between items-center transition-all ${selectedStudent?.id === student.id ? "bg-blue-50 border-blue-200" : "bg-white border-transparent hover:bg-gray-50"}`}>
                                    <div onClick={() => setSelectedStudent(student)} className="flex-1 cursor-pointer flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold text-sm">
                                            {student.ad.substring(0, 2).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-gray-800 text-sm">{student.ad} {student.soyad}</h3>
                                            <span className="text-[10px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded uppercase tracking-wider">
                                                {student.kursId ? student.kursId.substring(0, 15) : "Ümumi"}...
                                            </span>
                                        </div>
                                    </div>
                                    <a href={`/telebeler/${student.id}`} className="p-2 text-gray-400 hover:text-blue-600 transition" title="Profilə get">👁️</a>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* SAĞ: DETAY FORM (Mobilde seçili yoxdursa gizlənir) */}
                    <div className={`lg:col-span-8 space-y-6 ${selectedStudent ? 'block' : 'hidden lg:block'}`}>
                        {selectedStudent ? (
                            <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm border border-gray-100">
                                <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                                    📝 Qeyd Əlavə Et: <span className="text-blue-600">{selectedStudent.ad} {selectedStudent.soyad}</span>
                                </h2>

                                <div className="grid gap-4 mb-4">
                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase ml-1">Mövzu / Dərs</label>
                                        <input type="text" placeholder="Məs: Bıçaq Texnikaları" value={noteForm.konu} onChange={e => setNoteForm({ ...noteForm, konu: e.target.value })} className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none" />
                                    </div>

                                    <div>
                                        <label className="text-xs text-gray-500 font-bold uppercase ml-1">Qeydiniz</label>
                                        <textarea rows={3} placeholder="Tələbənin performansı..." value={noteForm.not} onChange={e => setNoteForm({ ...noteForm, not: e.target.value })} className="w-full mt-1 p-3 border rounded-xl focus:ring-2 focus:ring-blue-100 outline-none"></textarea>
                                    </div>

                                    {/* FOTOĞRAF YÜKLEME ALANI */}
                                    <div className="flex flex-col md:flex-row items-center gap-4 border border-dashed border-gray-300 p-4 rounded-xl bg-gray-50">
                                        <div className="text-sm text-gray-500 w-full md:w-auto font-medium">📸 Şəkil / Fayl:</div>
                                        <UploadButton
                                            endpoint="imageUploader"
                                            onClientUploadComplete={(res) => {
                                                setNoteForm({ ...noteForm, attachmentUrl: res[0].url });
                                                toast.success("Fayl uğurla yükləndi!");
                                            }}
                                            onUploadError={(error) => toast.error(`Yükləmə xətası: ${error.message}`)}
                                            appearance={{
                                                button: "bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                                            }}
                                        />
                                        {noteForm.attachmentUrl && <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-1 rounded border border-green-200 flex items-center gap-1"><CheckCircle size={12} /> Yükləndi</span>}
                                    </div>

                                    <button onClick={handleSaveNote} disabled={submittingNote} className="bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 w-full flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                                        {submittingNote ? "Yadda saxlanılır..." : <><Save size={18} /> Yadda Saxla</>}
                                    </button>
                                </div>

                                <h3 className="font-bold text-gray-700 mt-8 mb-4 flex items-center gap-2"><Calendar size={18} /> Tarixçə</h3>
                                <div className="space-y-4">
                                    {notes.length === 0 && <p className="text-gray-400 text-center italic text-sm">Hələ ki qeyd yoxdur.</p>}
                                    {notes.map(note => (
                                        <div key={note.id} className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                                            <div className="flex justify-between font-bold text-gray-800">
                                                <span>{note.konu}</span>
                                                <span className="text-xs text-gray-400 bg-white px-2 py-1 rounded border">{new Date(note.tarih).toLocaleDateString("az-AZ")}</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2 leading-relaxed">{note.not}</p>
                                            {note.attachmentUrl && (
                                                <div className="mt-3">
                                                    <img src={note.attachmentUrl} alt="Ek" className="h-24 w-24 object-cover rounded-lg border cursor-pointer hover:scale-105 transition" onClick={() => window.open(note.attachmentUrl)} />
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 bg-white rounded-2xl border p-10 min-h-[300px]">
                                <Search size={48} className="text-gray-200 mb-4" />
                                <p>Siyahıdan bir tələbə seçin</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* --- TAB 2: DAVAMİYYƏT (MOBİL UYUMLU) --- */}
            {activeTab === "attendance" && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4 border-b pb-4">
                        <div className="flex items-center gap-4 w-full md:w-auto">
                            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                                📅 Sürətli Davamiyyət
                            </h2>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <input
                                type="date"
                                value={attendanceDate}
                                onChange={(e) => setAttendanceDate(e.target.value)}
                                className="border border-gray-300 rounded-lg p-2 text-sm w-full md:w-auto focus:ring-2 focus:ring-blue-100 outline-none"
                            />
                            <button
                                onClick={handleSaveAttendance}
                                disabled={submittingAttendance}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-bold w-full md:w-auto flex items-center justify-center gap-2 shadow-lg shadow-green-200 whitespace-nowrap"
                            >
                                <Save size={18} /> {submittingAttendance ? "..." : "Yadda Saxla"}
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {filteredStudents.map((student) => {
                            const isPresent = attendanceList[student.id] === 'PRESENT';
                            return (
                                <div
                                    key={student.id}
                                    onClick={() => toggleAttendance(student.id)}
                                    className={`p-3 rounded-xl border cursor-pointer flex justify-between items-center select-none transition-all active:scale-95 ${isPresent
                                            ? "bg-white border-green-200 shadow-sm"
                                            : "bg-red-50 border-red-200"
                                        }`}
                                >
                                    <div className="flex items-center gap-3 overflow-hidden">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white shrink-0 ${isPresent ? 'bg-green-500' : 'bg-red-500'}`}>
                                            {student.ad.charAt(0)}
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className={`font-semibold text-sm truncate ${isPresent ? 'text-gray-800' : 'text-red-700'}`}>{student.ad} {student.soyad}</h3>
                                            <p className="text-xs text-gray-400 truncate">{student.kursId}</p>
                                        </div>
                                    </div>
                                    <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shrink-0 ${isPresent ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                        {isPresent ? <><CheckCircle size={12} /> İŞTİRAK</> : <><XCircle size={12} /> QAYIB</>}
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
