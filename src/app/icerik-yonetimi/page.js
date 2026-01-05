'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  BookOpen,
  Sparkles,
  Briefcase,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Image as ImageIcon,
  Save,
  X,
  Search,
  Filter,
  TrendingUp
} from 'lucide-react';

export default function IcerikYonetimiPage() {
  const [activeTab, setActiveTab] = useState('blog');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    baslik: '',
    slug: '',
    ozet: '',
    icerik: '',
    kapakResmi: '',
    kategori: '',
    aktif: false,
    oneCikan: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    setIsFormOpen(false);
    setFormData({
      baslik: '',
      slug: '',
      ozet: '',
      icerik: '',
      kapakResmi: '',
      kategori: '',
      aktif: false,
      oneCikan: false
    });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Header - CTH/Escoffier Style */}
      <div className="bg-slate-900 text-white border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-400 text-sm uppercase tracking-widest mb-2 font-medium">
                Məzmun İdarəetmə Sistemi
              </p>
              <h1 className="text-4xl md:text-5xl font-serif mb-3">
                İçerik Yönetimi
              </h1>
              <p className="text-slate-300 text-lg max-w-2xl">
                Blog, Workshop, Masterclass və Kurumsal Eğitimler üçün məzmun yaradın və idarə edin
              </p>
            </div>
            <Button 
              onClick={() => setIsFormOpen(true)}
              className="bg-amber-600 hover:bg-amber-700 text-white"
            >
              <Plus className="mr-2 h-4 w-4" />
              Yeni İçerik
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Form Modal - Premium Style */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <Card className="w-full max-w-3xl max-h-[90vh] overflow-y-auto border-slate-200 shadow-2xl">
              <CardHeader className="bg-slate-900 text-white border-b border-slate-800">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-xl font-serif">Yeni İçerik Ekle</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setIsFormOpen(false)}
                    className="text-white hover:bg-slate-800"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 bg-white">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="text-sm font-semibold mb-2 block text-slate-700">Başlıq</label>
                    <Input
                      name="baslik"
                      value={formData.baslik}
                      onChange={handleInputChange}
                      placeholder="Başlıq girin"
                      required
                      className="h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-slate-700">Slug (URL)</label>
                    <Input
                      name="slug"
                      value={formData.slug}
                      onChange={handleInputChange}
                      placeholder="url-friendly-slug"
                      required
                      className="h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-slate-700">Özet</label>
                    <Textarea
                      name="ozet"
                      value={formData.ozet}
                      onChange={handleInputChange}
                      placeholder="Kısa açıklama"
                      rows={3}
                      className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-slate-700">İçerik</label>
                    <Textarea
                      name="icerik"
                      value={formData.icerik}
                      onChange={handleInputChange}
                      placeholder="Tam içerik"
                      rows={8}
                      required
                      className="border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-slate-700">Kapak Resmi URL</label>
                    <Input
                      name="kapakResmi"
                      value={formData.kapakResmi}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      type="url"
                      className="h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-semibold mb-2 block text-slate-700">Kategori</label>
                    <Input
                      name="kategori"
                      value={formData.kategori}
                      onChange={handleInputChange}
                      placeholder="Kategori"
                      className="h-12 border-slate-300 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>

                  <div className="flex gap-6">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="aktif"
                        checked={formData.aktif}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Aktif</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        name="oneCikan"
                        checked={formData.oneCikan}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-amber-600 border-slate-300 rounded focus:ring-amber-500"
                      />
                      <span className="text-sm font-medium text-slate-700">Əsas Səhifə</span>
                    </label>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-slate-200">
                    <Button 
                      type="submit" 
                      className="flex-1 bg-amber-600 hover:bg-amber-700 text-white h-12"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      Yadda Saxla
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsFormOpen(false)}
                      className="h-12 border-slate-300"
                    >
                      Ləğv Et
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Tabs - Premium Style */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white border border-slate-200 p-1 h-auto">
            <TabsTrigger 
              value="blog" 
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              Blog
            </TabsTrigger>
            <TabsTrigger 
              value="workshops" 
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              <BookOpen className="h-4 w-4" />
              Workshoplar
            </TabsTrigger>
            <TabsTrigger 
              value="masterclasses" 
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              <Sparkles className="h-4 w-4" />
              Masterclasslar
            </TabsTrigger>
            <TabsTrigger 
              value="kurumsal" 
              className="flex items-center gap-2 px-6 py-3 data-[state=active]:bg-amber-600 data-[state=active]:text-white"
            >
              <Briefcase className="h-4 w-4" />
              Kurumsal
            </TabsTrigger>
          </TabsList>

          {/* BLOG TAB */}
          <TabsContent value="blog" className="space-y-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-serif">Blog Yazıları</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        placeholder="Başlıqla axtar..." 
                        className="pl-10 w-64 border-slate-300" 
                      />
                    </div>
                    <Button variant="outline" className="border-slate-300">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Örnek Blog Kartı */}
                  <Card className="hover:shadow-lg transition-all border-l-4 border-l-amber-500 border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-lg text-slate-900">Blog Başlığı</h3>
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium border border-green-200">
                              Aktif
                            </span>
                            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium border border-amber-200">
                              Əsas Səhifə
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                            Qısa təsvir və ya özət mətn burada görünəcək...
                          </p>
                          <div className="flex items-center gap-6 text-xs text-slate-500">
                            <span className="flex items-center gap-2">
                              <User className="h-4 w-4" />
                              Yazar Adı
                            </span>
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              15 Yanvar 2025
                            </span>
                            <span className="flex items-center gap-2">
                              <Eye className="h-4 w-4" />
                              125 görüntülənmə
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-6">
                          <Button variant="outline" size="sm" className="border-slate-300">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-300">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* WORKSHOPS TAB */}
          <TabsContent value="workshops" className="space-y-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-serif">Workshoplar</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        placeholder="Workshop adı ilə axtar..." 
                        className="pl-10 w-64 border-slate-300" 
                      />
                    </div>
                    <Button variant="outline" className="border-slate-300">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Card className="hover:shadow-lg transition-all border-l-4 border-l-blue-500 border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-lg text-slate-900">Workshop Adı</h3>
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium border border-green-200">
                              Aktif
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mb-4">
                            <span className="font-medium">Müəllim:</span> Usta Barista • 
                            <span className="font-medium ml-2">Müddət:</span> 3 saat • 
                            <span className="font-medium ml-2">Qiymət:</span> 150 AZN
                          </p>
                          <div className="flex items-center gap-6 text-xs text-slate-500">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              20 Yanvar 2025
                            </span>
                            <span>📍 TQTA Mətbəxi</span>
                            <span>👥 5/15 nəfər</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-6">
                          <Button variant="outline" size="sm" className="border-slate-300">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-300">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* MASTERCLASSES TAB */}
          <TabsContent value="masterclasses" className="space-y-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-serif">Aylıq Masterclasslar</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        placeholder="Masterclass adı ilə axtar..." 
                        className="pl-10 w-64 border-slate-300" 
                      />
                    </div>
                    <Button variant="outline" className="border-slate-300">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Card className="hover:shadow-lg transition-all border-l-4 border-l-purple-500 border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-lg text-slate-900">Masterclass Adı</h3>
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium border border-green-200">
                              Aktif
                            </span>
                            <span className="px-3 py-1 bg-amber-50 text-amber-700 text-xs rounded-full font-medium border border-amber-200">
                              Aylıq
                            </span>
                            <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full font-medium border border-purple-200">
                              Əsas Səhifə
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mb-4">
                            <span className="font-medium">Müəllim:</span> Chef Adı • 
                            <span className="font-medium ml-2">Müddət:</span> 1 gün • 
                            <span className="font-medium ml-2">Qiymət:</span> 500 AZN
                          </p>
                          <div className="flex items-center gap-6 text-xs text-slate-500">
                            <span className="flex items-center gap-2">
                              <Calendar className="h-4 w-4" />
                              15 Yanvar 2025
                            </span>
                            <span>📍 TQTA Mətbəxi</span>
                            <span>👥 8/20 nəfər</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-6">
                          <Button variant="outline" size="sm" className="border-slate-300">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-300">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* KURUMSAL TAB */}
          <TabsContent value="kurumsal" className="space-y-4">
            <Card className="border-slate-200 shadow-sm">
              <CardHeader className="bg-white border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-serif">Kurumsal Eğitimler</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <Input 
                        placeholder="Eğitim adı ilə axtar..." 
                        className="pl-10 w-64 border-slate-300" 
                      />
                    </div>
                    <Button variant="outline" className="border-slate-300">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Card className="hover:shadow-lg transition-all border-l-4 border-l-indigo-500 border-slate-200">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="font-bold text-lg text-slate-900">Kurumsal Eğitim Adı</h3>
                            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs rounded-full font-medium border border-green-200">
                              Aktif
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 mb-4">
                            <span className="font-medium">Format:</span> Onsite/Online • 
                            <span className="font-medium ml-2">Minimum:</span> 10 nəfər • 
                            <span className="font-medium ml-2">Qiymət:</span> Müqavilə əsasında
                          </p>
                          <div className="flex items-center gap-6 text-xs text-slate-500">
                            <span>📋 Sertifikat, Material, Qida daxildir</span>
                          </div>
                        </div>
                        <div className="flex gap-2 ml-6">
                          <Button variant="outline" size="sm" className="border-slate-300">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-slate-300">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm" className="border-red-300 text-red-600 hover:bg-red-50">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
