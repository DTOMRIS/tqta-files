"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { getStudents } from "@/app/actions/instructor"; // Mövcud action
import { getNotes, saveNote } from "@/app/actions/notes"; // Yeni action

export default function DersNotlari() {
    const [students, setStudents] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form verileri
    const [not, setNot] = useState("");
    const [konu, setKonu] = useState("");

    // Keçmiş notlar
    const [pastNotes, setPastNotes] = useState([]);
    const [notesLoading, setNotesLoading] = useState(false);

    // 1. Tüm öğrencileri çekelim
    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const result = await getStudents();
                if (result.success) {
                    setStudents(result.data);
                } else {
                    toast.error("Tələbələr yüklənə bilmədi");
                }
            } catch (error) {
                console.error("Öğrenciler çekilemedi", error);
                toast.error("Öğrenci listesi alınamadı");
            } finally {
                setLoading(false);
            }
        };
        fetchStudents();
    }, []);

    // 2. Tələbə seçiləndə notları gətir
    useEffect(() => {
        if (selectedStudent) {
            setNotesLoading(true);
            getNotes(selectedStudent.id).then(res => {
                if (res.success) {
                    setPastNotes(res.data);
                }
                setNotesLoading(false);
            });
        }
    }, [selectedStudent]);

    // 3. Not Kaydetme Fonksiyonu
    const handleSaveNote = async () => {
        if (!selectedStudent || !not) {
            toast.warning("Lütfen bir öğrenci seçin ve not yazın.");
            return;
        }

        try {
            const result = await saveNote({
                studentId: selectedStudent.id,
                topic: konu,
                note: not
            });

            if (result.success) {
                toast.success(`${selectedStudent.ad} için not kaydedildi!`);
                setNot(""); // Formu temizle
                setKonu("");

                // Siyahını yenilə
                const updatedNotes = await getNotes(selectedStudent.id);
                if (updatedNotes.success) setPastNotes(updatedNotes.data);

            } else {
                toast.error("Xəta: " + result.error);
            }
        } catch (error) {
            toast.error("Kaydedilirken hata oluştu.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* SOL TARA: ÖĞRENCİ LİSTESİ */}
                <div className="bg-white p-4 rounded-xl shadow-sm h-[80vh] overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4 text-gray-800">👨‍🎓 Öğrenciler</h2>
                    <input
                        type="text"
                        placeholder="Öğrenci ara..."
                        className="w-full p-2 mb-4 border rounded-lg text-sm"
                    />

                    {loading ? (
                        <p>Yükleniyor...</p>
                    ) : (
                        <div className="space-y-2">
                            {students.map((student) => (
                                <div
                                    key={student.id}
                                    onClick={() => setSelectedStudent(student)}
                                    className={`p-3 rounded-lg cursor-pointer transition flex justify-between items-center ${selectedStudent?.id === student.id
                                            ? "bg-blue-100 border-blue-500 border"
                                            : "bg-gray-50 hover:bg-gray-100"
                                        }`}
                                >
                                    <div>
                                        <p className="font-semibold text-gray-800">{student.ad} {student.soyad}</p>
                                        <p className="text-xs text-gray-500">{student.kursId || "Kurs Yok"}</p>
                                    </div>
                                    <div className="text-gray-400">👉</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* SAĞ TARAF: NOT GİRME VE GEÇMİŞ */}
                <div className="md:col-span-2 space-y-6">

                    {selectedStudent ? (
                        <>
                            {/* Üst Kısım: Yeni Not Ekle */}
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-blue-100">
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-bold text-blue-900">
                                        📝 {selectedStudent.ad} {selectedStudent.soyad}
                                    </h2>
                                    <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
                                        Aktif Öğrenci
                                    </span>
                                </div>

                                <div className="grid gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Ders Konusu</label>
                                        <input
                                            type="text"
                                            value={konu}
                                            onChange={(e) => setKonu(e.target.value)}
                                            placeholder="Örn: Bıçak Teknikleri, Soslar..."
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Eğitmen Notu</label>
                                        <textarea
                                            value={not}
                                            onChange={(e) => setNot(e.target.value)}
                                            rows={5}
                                            placeholder="Öğrencinin bugünkü performansı nasıldı? Eksikleri neler?"
                                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        />
                                    </div>

                                    <div className="flex justify-end gap-3">
                                        {/* Buraya Dosya Yükleme Butonu Gelebilir */}
                                        <button className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                                            📎 Dosya/Fotoğraf Ekle
                                        </button>

                                        <button
                                            onClick={handleSaveNote}
                                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
                                        >
                                            Kaydet
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Alt Kısım: Geçmiş Notlar (DB-dən Gələn) */}
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <h3 className="text-lg font-bold mb-4 text-gray-800">📋 Geçmiş Ders Notları</h3>

                                {notesLoading ? (
                                    <p>Notlar yükleniyor...</p>
                                ) : pastNotes.length === 0 ? (
                                    <p className="text-gray-400">Hələ ki, heç bir qeyd yoxdur.</p>
                                ) : (
                                    <div className="space-y-4">
                                        {pastNotes.map((note) => (
                                            <div key={note.id} className="border-l-4 border-blue-500 pl-4 py-2">
                                                <div className="flex justify-between text-sm text-gray-500">
                                                    <span>{new Date(note.date).toLocaleDateString('az-AZ')}</span>
                                                    <span>Mövzu: {note.topic}</span>
                                                </div>
                                                <p className="text-gray-800 mt-1">{note.note}</p>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col items-center justify-center h-full text-gray-400 bg-white rounded-xl shadow-sm p-10">
                            <div className="text-6xl mb-4">👈</div>
                            <p className="text-xl">İşlem yapmak için soldan bir öğrenci seçin.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
