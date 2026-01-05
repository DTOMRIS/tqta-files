'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Mic, MessageCircle, BrainCircuit, ChefHat, Bot, Zap } from 'lucide-react';
import Link from 'next/link';

export default function AIStudioPage() {
  const [activeTab, setActiveTab] = useState('overview');

  const aiFeatures = [
    {
      id: 'sous-chef',
      title: 'AI Sous-Chef',
      description: 'Səslə idarə olunan peşəkar kulinariya köməkçisi. Reseptlərdə addım-addım kömək və termin tərcüməsi.',
      icon: <ChefHat className="h-8 w-8" />,
      color: 'bg-[#0A192F]',
      status: 'Aktiv',
      action: 'İstifadə et'
    },
    {
      id: 'beledchiniz',
      title: 'Beledçiniz',
      description: 'Virtual bələdçi. Kurslar, proqramlar və karyera məsləhətləri haqqında suallarınıza cavab verir.',
      icon: <BrainCircuit className="h-8 w-8" />,
      color: 'bg-[#C5A022]',
      status: 'Aktiv',
      action: 'Söhbətə başla'
    },
    {
      id: 'career-assessment',
      title: 'Karyera Testi',
      description: 'Mən/Mən Deyil anket sistemi ilə sizə ən uyğun rolü tapın. 60 saniyəlik vizual anket.',
      icon: <Sparkles className="h-8 w-8" />,
      color: 'bg-[#0097A7]',
      status: 'Aktiv',
      action: 'Testə başla',
      link: '/karyera-testi'
    }
  ];

  return (
    <div className="space-y-8 p-6 md:p-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Bot className="h-8 w-8 text-[#C5A022]" />
            AI Studio
          </h1>
          <p className="text-muted-foreground mt-1">
            Süni intellekt ilə gücləndirilmiş təhsil təcrübəsi
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Zap className="mr-2 h-4 w-4" />
            Sürətli Başlanğıc
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-elevated hover-lift border-l-4 border-l-[#0A192F]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">AI Agentlər</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-[#0A192F]/10 flex items-center justify-center">
              <Bot className="h-5 w-5 text-[#0A192F]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">3</div>
            <p className="text-xs text-muted-foreground mt-2">Aktiv AI xidmətləri</p>
          </CardContent>
        </Card>

        <Card className="card-elevated hover-lift border-l-4 border-l-[#C5A022]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">İstifadəçi Söhbətləri</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-[#C5A022]/10 flex items-center justify-center">
              <MessageCircle className="h-5 w-5 text-[#C5A022]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">1,234</div>
            <p className="text-xs text-muted-foreground mt-2">Bu ay söhbətlər</p>
          </CardContent>
        </Card>

        <Card className="card-elevated hover-lift border-l-4 border-l-[#0097A7]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-semibold text-muted-foreground">Məmnuniyyət</CardTitle>
            <div className="h-10 w-10 rounded-lg bg-[#0097A7]/10 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-[#0097A7]" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">98%</div>
            <p className="text-xs text-muted-foreground mt-2">Müsbət rəylər</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Features Grid */}
      <div>
        <h2 className="text-xl font-semibold text-foreground mb-4">AI Xidmətləri</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiFeatures.map((feature) => (
            <Card key={feature.id} className="card-elevated hover-lift group cursor-pointer">
              <CardHeader>
                <div className={`${feature.color} w-16 h-16 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}>
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="mt-2">{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    {feature.status}
                  </span>
                  {feature.link ? (
                    <Link href={feature.link}>
                      <Button size="sm" className="bg-[#C5A022] hover:bg-[#A6891A] text-white">
                        {feature.action}
                      </Button>
                    </Link>
                  ) : (
                    <Button size="sm" variant="outline">
                      {feature.action}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <Card className="card-elevated">
        <CardHeader>
          <CardTitle className="text-xl">Necə İşləyir?</CardTitle>
          <CardDescription>AI Studio xidmətlərimiz haqqında məlumat</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0A192F]/10 flex items-center justify-center mx-auto mb-4">
                <Mic className="h-8 w-8 text-[#0A192F]" />
              </div>
              <h3 className="font-semibold mb-2">1. Səslə İnteraksiya</h3>
              <p className="text-sm text-muted-foreground">
                AI Sous-Chef ilə səslə danışın və real vaxtda cavab alın
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#C5A022]/10 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8 text-[#C5A022]" />
              </div>
              <h3 className="font-semibold mb-2">2. Çat Dəstəyi</h3>
              <p className="text-sm text-muted-foreground">
                Beledçiniz ilə yazışın və kurslar haqqında məlumat alın
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#0097A7]/10 flex items-center justify-center mx-auto mb-4">
                <Sparkles className="h-8 w-8 text-[#0097A7]" />
              </div>
              <h3 className="font-semibold mb-2">3. Karyera Analizi</h3>
              <p className="text-sm text-muted-foreground">
                Vizual anket ilə sizə ən uyğun rolü kəşf edin
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Qeyd: AI Agentlər (AISousChef və Beledchiniz) bütün səhifələrdə sağ alt küncdə mövcuddur */}
    </div>
  );
}

