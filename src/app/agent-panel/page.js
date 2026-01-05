'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  FileText,
  Sparkles,
  BarChart3,
  Play,
  Loader2,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

export default function AgentPanelPage() {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [activeTab, setActiveTab] = useState('analyze');

  const runAgent = async (task, data = {}) => {
    setLoading(true);
    try {
      const response = await fetch('/api/agent/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task, data })
      });
      const result = await response.json();
      setResults(result);
    } catch (error) {
      console.error('Agent error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
            <Bot className="h-8 w-8" />
            Agent Paneli
          </h1>
          <p className="text-muted-foreground mt-1">
            AI Agent ilə projeleri analiz edin, raporlar hazırlayın, blog yazıları oluşturun
          </p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analyze">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analiz Et
          </TabsTrigger>
          <TabsTrigger value="blog">
            <FileText className="h-4 w-4 mr-2" />
            Blog Yaz
          </TabsTrigger>
          <TabsTrigger value="design">
            <Sparkles className="h-4 w-4 mr-2" />
            Dizayn Təklifi
          </TabsTrigger>
          <TabsTrigger value="report">
            <FileText className="h-4 w-4 mr-2" />
            Günlük Rapor
          </TabsTrigger>
        </TabsList>

        {/* ANALYZE TAB */}
        <TabsContent value="analyze" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Başvuruları Analiz Et</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Agent başvuruları analiz edərək trendlər, patternlər və tövsiyələr hazırlayır.
              </p>
              <Button 
                onClick={() => runAgent('analyze_applications')}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analiz edilir...
                  </>
                ) : (
                  <>
                    <Play className="mr-2 h-4 w-4" />
                    Analiz Et
                  </>
                )}
              </Button>
              
              {results && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(results, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* BLOG TAB */}
        <TabsContent value="blog" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Günlük Blog Yazısı Oluştur</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Agent günün xəbərləri, uğurlar və hadisələr əsasında blog yazısı hazırlayır.
              </p>
              <Button 
                onClick={() => runAgent('generate_blog_post')}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Yazı hazırlanır...
                  </>
                ) : (
                  <>
                    <FileText className="mr-2 h-4 w-4" />
                    Blog Yazısı Oluştur
                  </>
                )}
              </Button>
              
              {results && results.data && (
                <Card className="mt-4">
                  <CardHeader>
                    <CardTitle>{results.data.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p>{results.data.content}</p>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline">
                        CMS-ə Əlavə Et
                      </Button>
                      <Button size="sm" variant="outline">
                        Redaktə Et
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* DESIGN TAB */}
        <TabsContent value="design" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Dizayn Təklifləri</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Agent sayfa performansına görə dizayn təklifləri və A/B test variantları hazırlayır.
              </p>
              <Button 
                onClick={() => runAgent('suggest_design')}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analiz edilir...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Dizayn Təklifi Al
                  </>
                )}
              </Button>
              
              {results && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <pre className="text-xs overflow-auto">
                      {JSON.stringify(results, null, 2)}
                    </pre>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* REPORT TAB */}
        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Günlük Rapor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Agent günlük fəaliyyət, metrikalar və highlightları hazırlayır.
              </p>
              <Button 
                onClick={() => runAgent('daily_report')}
                disabled={loading}
                className="w-full"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Rapor hazırlanır...
                  </>
                ) : (
                  <>
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Günlük Rapor Oluştur
                  </>
                )}
              </Button>
              
              {results && (
                <Card className="mt-4">
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold mb-2">Xülasə</h3>
                        <p className="text-sm">{results.data?.summary}</p>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Metrikalar</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(results.data?.metrics || {}).map(([key, value]) => (
                            <div key={key} className="p-3 bg-muted rounded-lg">
                              <div className="text-xs text-muted-foreground">{key}</div>
                              <div className="text-lg font-bold">{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Context Graph Info */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-blue-900">Context Graph Sistemi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-blue-800">
            <p>✅ Karar izləri saxlanılır (Event Clock)</p>
            <p>✅ Agent trajectory-ləri qeydə alınır</p>
            <p>✅ World model: Təşkilat fizikası öyrənilir</p>
            <p>✅ Simulyasiya: "Nə olar?" suallarına cavab</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}





