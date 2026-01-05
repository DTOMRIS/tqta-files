'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  MessageSquare,
  Send,
  CheckCircle,
  Clock,
  User,
  Search,
  Filter
} from 'lucide-react';

export default function SorularPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [newQuestion, setNewQuestion] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('umumi');

  // Örnek sorular (gerçekte API'den gelecek)
  const sorular = [
    {
      id: 1,
      studentId: 1,
      studentName: 'Əli Məmmədov',
      sual: 'CTH sertifikatı neçə müddətə hazır olur?',
      cavab: 'CTH sertifikatları təhsil tamamlandıqdan sonra 4-6 həftə ərzində hazır olur.',
      kateqoriya: 'cth',
      status: 'cavablandırıldı',
      cavabVerən: 'Admin',
      cavabTarixi: '2025-01-15',
      createdAt: '2025-01-14'
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Leyla Həsənova',
      sual: 'Ödənişi hissə-hissə edə bilərəmmi?',
      cavab: null,
      kateqoriya: 'odeme',
      status: 'gözləyir',
      createdAt: '2025-01-16'
    }
  ];

  const handleSubmitQuestion = async () => {
    if (!newQuestion.trim()) return;
    
    // API'ye gönder
    console.log('Yeni sual:', {
      sual: newQuestion,
      kateqoriya: selectedCategory
    });
    
    setNewQuestion('');
  };

  const handleAnswer = async (questionId, answer) => {
    // API'ye gönder
    console.log('Cavab:', { questionId, answer });
    
    // Context Graph'e kaydet
    await fetch('/api/context/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entityType: 'question',
        entityId: questionId.toString(),
        eventType: 'decision',
        actor: 'current_user', // TODO: get from session
        action: 'answered',
        reasoning: `Sual kateqoriyası: ${selectedCategory}, Cavab verildi`,
        outcome: 'question_answered'
      })
    });
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'cavablandırıldı':
        return <Badge className="bg-green-100 text-green-700">Cavablandırıldı</Badge>;
      case 'gözləyir':
        return <Badge className="bg-yellow-100 text-yellow-700">Gözləyir</Badge>;
      case 'bağlandı':
        return <Badge className="bg-gray-100 text-gray-700">Bağlandı</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const filteredSorular = sorular.filter(soru => {
    const matchesSearch = 
      soru.sual.toLowerCase().includes(searchTerm.toLowerCase()) ||
      soru.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || soru.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <MessageSquare className="h-8 w-8" />
            Soru-Cevap Sistemi
          </h1>
          <p className="text-muted-foreground mt-1">
            Tələbələrin suallarını cavablandırın və Context Graph-də qeydə alın
          </p>
        </div>
      </div>

      {/* Yeni Soru Ekle */}
      <Card>
        <CardHeader>
          <CardTitle>Yeni Sual Göndər</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Kateqoriya</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border rounded-md"
            >
              <option value="umumi">Ümumi</option>
              <option value="kurs">Kurs</option>
              <option value="qeydiyyat">Qeydiyyat</option>
              <option value="odeme">Ödəniş</option>
              <option value="cth">CTH</option>
            </select>
          </div>
          <Textarea
            placeholder="Sualınızı yazın..."
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            rows={4}
          />
          <Button onClick={handleSubmitQuestion} className="w-full">
            <Send className="mr-2 h-4 w-4" />
            Sual Göndər
          </Button>
        </CardContent>
      </Card>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Sual və ya tələbə adı ilə axtar..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant={filterStatus === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('all')}
              >
                Hamısı
              </Button>
              <Button
                variant={filterStatus === 'gözləyir' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('gözləyir')}
              >
                Gözləyir
              </Button>
              <Button
                variant={filterStatus === 'cavablandırıldı' ? 'default' : 'outline'}
                onClick={() => setFilterStatus('cavablandırıldı')}
              >
                Cavablandırıldı
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sorular Listesi */}
      <div className="space-y-4">
        {filteredSorular.map((soru) => (
          <Card key={soru.id} className="hover-lift">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-slate-600" />
                    </div>
                    <div>
                      <div className="font-semibold">{soru.studentName}</div>
                      <div className="text-xs text-muted-foreground">
                        {soru.createdAt}
                      </div>
                    </div>
                    <Badge variant="outline">{soru.kateqoriya}</Badge>
                    {getStatusBadge(soru.status)}
                  </div>
                  
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Sual:</h3>
                    <p className="text-slate-700">{soru.sual}</p>
                  </div>

                  {soru.cavab ? (
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="font-semibold text-green-900">Cavab:</span>
                        <span className="text-xs text-green-700">
                          {soru.cavabVerən} • {soru.cavabTarixi}
                        </span>
                      </div>
                      <p className="text-green-800">{soru.cavab}</p>
                    </div>
                  ) : (
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="h-4 w-4 text-yellow-600" />
                        <span className="font-semibold text-yellow-900">Gözləyir</span>
                      </div>
                      <Textarea
                        placeholder="Cavabınızı yazın..."
                        rows={3}
                        className="mb-2"
                      />
                      <Button 
                        size="sm"
                        onClick={() => handleAnswer(soru.id, 'cavab')}
                      >
                        <Send className="mr-2 h-4 w-4" />
                        Cavab Göndər
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}





