"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";

// Forçar renderização dinâmica
export const dynamic = 'force-dynamic';

import { 
  PlayCircle, 
  FileText, 
  Download,
  MessageCircle,
  Star,
  Clock,
  Users,
  CheckCircle,
  Book,
  Video,
  Headphones,
  Image,
  Award,
  Target
} from "lucide-react";

// Componente separado para usar useSearchParams
function AreaExclusivaContent() {
  const [activeTab, setActiveTab] = useState("treinamentos");
  // const searchParams = useSearchParams();
  
  // Detecta a aba via URL quando a página carrega
  // useEffect(() => {
  //   const tab = searchParams.get('tab');
  //   if (tab && ['treinamentos', 'materiais', 'suporte'].includes(tab)) {
  //     setActiveTab(tab);
  //   }
  // }, [searchParams]);
  
  // Dados dos treinamentos
  const trainings = [
    {
      id: 1,
      title: "Fundamentos da Energia Solar",
      description: "Aprenda os conceitos básicos sobre energia solar e como funciona um sistema fotovoltaico",
      duration: "45 min",
      type: "video",
      difficulty: "Iniciante",
      completed: true,
      rating: 4.9,
      students: 1250,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 2,
      title: "Técnicas de Vendas Consultivas",
      description: "Estratégias comprovadas para aumentar suas conversões através da venda consultiva",
      duration: "1h 20min",
      type: "video",
      difficulty: "Intermediário",
      completed: false,
      rating: 4.8,
      students: 890,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 3,
      title: "Calculadora Solar na Prática",
      description: "Como usar nossa calculadora para dimensionar sistemas e impressionar clientes",
      duration: "30 min",
      type: "video",
      difficulty: "Intermediário",
      completed: false,
      rating: 4.9,
      students: 670,
      thumbnail: "/api/placeholder/300/200"
    },
    {
      id: 4,
      title: "Objeções Mais Comuns e Como Contornar",
      description: "Aprenda a lidar com as principais objeções dos clientes de energia solar",
      duration: "55 min",
      type: "audio",
      difficulty: "Avançado",
      completed: false,
      rating: 4.7,
      students: 540,
      thumbnail: "/api/placeholder/300/200"
    }
  ];

  // Materiais disponíveis
  const materials = [
    {
      id: 1,
      title: "Apresentação Comercial 2025",
      description: "Slides atualizados com dados e benefícios da energia solar",
      type: "powerpoint",
      size: "15.2 MB",
      downloads: 2400,
      category: "Apresentações"
    },
    {
      id: 2,
      title: "Calculadora de ROI",
      description: "Planilha Excel para calcular retorno do investimento do cliente",
      type: "excel",
      size: "2.8 MB",
      downloads: 1890,
      category: "Ferramentas"
    },
    {
      id: 3,
      title: "E-book: Guia Completo da Energia Solar",
      description: "Material educativo para compartilhar com prospects",
      type: "pdf",
      size: "8.5 MB",
      downloads: 3200,
      category: "E-books"
    },
    {
      id: 4,
      title: "Templates para WhatsApp",
      description: "Mensagens prontas para diferentes situações de venda",
      type: "document",
      size: "1.2 MB",
      downloads: 1650,
      category: "Templates"
    },
    {
      id: 5,
      title: "Imagens para Redes Sociais",
      description: "Pack com 50 imagens para posts e stories",
      type: "zip",
      size: "45.2 MB",
      downloads: 980,
      category: "Design"
    },
    {
      id: 6,
      title: "Vídeos Explicativos",
      description: "10 vídeos curtos para compartilhar no WhatsApp",
      type: "video",
      size: "120.5 MB",
      downloads: 756,
      category: "Vídeos"
    }
  ];

  const getFileIcon = (type: string) => {
    switch (type) {
      case "video": return <Video className="h-5 w-5" />;
      case "audio": return <Headphones className="h-5 w-5" />;
      case "pdf": return <FileText className="h-5 w-5" />;
      case "powerpoint": return <FileText className="h-5 w-5" />;
      case "excel": return <FileText className="h-5 w-5" />;
      case "document": return <FileText className="h-5 w-5" />;
      case "zip": return <Download className="h-5 w-5" />;
      default: return <FileText className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante": return "bg-green-100 text-green-800";
      case "Intermediário": return "bg-yellow-100 text-yellow-800";
      case "Avançado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Área Exclusiva</h2>
              <p className="text-gray-600">Conteúdos exclusivos para impulsionar suas vendas</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-lg">
                <Award className="h-5 w-5 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-800">Plano Advanced</span>
              </div>
              <Button className="bg-green-600 hover:bg-green-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Grupo VIP
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Progresso</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">25%</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                  <div className="bg-solar-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Concluídos</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1</div>
                <p className="text-xs text-muted-foreground">
                  de 4 treinamentos
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tempo Estudado</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">45min</div>
                <p className="text-xs text-muted-foreground">
                  Esta semana
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Downloads</CardTitle>
                <Download className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  Materiais baixados
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6 bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => setActiveTab("treinamentos")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "treinamentos" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <PlayCircle className="h-4 w-4 mr-2 inline" />
              Treinamentos
            </button>
            <button
              onClick={() => setActiveTab("materiais")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "materiais" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText className="h-4 w-4 mr-2 inline" />
              Materiais
            </button>
            <button
              onClick={() => setActiveTab("suporte")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "suporte" 
                  ? "bg-white text-gray-900 shadow-sm" 
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <MessageCircle className="h-4 w-4 mr-2 inline" />
              Suporte
            </button>
          </div>

          {/* Treinamentos Tab */}
          {activeTab === "treinamentos" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Trilha de Aprendizado</CardTitle>
                  <CardDescription>
                    Siga nossa sequência recomendada para maximizar seus resultados
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trainings.map((training, index) => (
                      <div key={training.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-4">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            training.completed ? 'bg-green-500' : index === 1 ? 'bg-solar-600' : 'bg-gray-300'
                          }`}>
                            {training.completed ? (
                              <CheckCircle className="h-5 w-5 text-white" />
                            ) : (
                              <span className="text-white font-bold">{index + 1}</span>
                            )}
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="font-medium text-lg">{training.title}</h3>
                              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(training.difficulty)}`}>
                                {training.difficulty}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 text-sm mb-3">{training.description}</p>
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                              <div className="flex items-center">
                                {training.type === 'video' ? <Video className="h-4 w-4 mr-1" /> : <Headphones className="h-4 w-4 mr-1" />}
                                {training.duration}
                              </div>
                              <div className="flex items-center">
                                <Star className="h-4 w-4 mr-1 text-yellow-400" />
                                {training.rating}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-4 w-4 mr-1" />
                                {training.students}
                              </div>
                            </div>
                            
                            <Button 
                              className={`w-full ${
                                training.completed 
                                  ? 'bg-gray-500 hover:bg-gray-600' 
                                  : index === 1 
                                    ? 'bg-solar-600 hover:bg-solar-700' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                              }`}
                              disabled={!training.completed && index > 1}
                            >
                              <PlayCircle className="h-4 w-4 mr-2" />
                              {training.completed ? 'Assistir Novamente' : index === 1 ? 'Continuar' : 'Bloqueado'}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Materiais Tab */}
          {activeTab === "materiais" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Biblioteca de Materiais</CardTitle>
                  <CardDescription>
                    Downloads gratuitos para apoiar suas vendas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {materials.map((material) => (
                      <div key={material.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start space-x-3 mb-3">
                          <div className="w-10 h-10 bg-solar-100 rounded-lg flex items-center justify-center">
                            {getFileIcon(material.type)}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm">{material.title}</h3>
                            <p className="text-xs text-gray-500">{material.category}</p>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{material.description}</p>
                        
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                          <span>{material.size}</span>
                          <span>{material.downloads} downloads</span>
                        </div>
                        
                        <Button variant="outline" className="w-full">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Suporte Tab */}
          {activeTab === "suporte" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Central de Suporte</CardTitle>
                  <CardDescription>
                    Tire suas dúvidas e obtenha ajuda especializada
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Grupo WhatsApp VIP */}
                    <div className="border rounded-lg p-6 bg-green-50">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                          <MessageCircle className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Grupo WhatsApp VIP</h3>
                          <p className="text-sm text-gray-600">Acesso obrigatório para todos afiliados</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Conecte-se com outros afiliados, tire dúvidas em tempo real e receba suporte 
                        direto da nossa equipe especializada.
                      </p>
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Acessar Grupo VIP
                      </Button>
                    </div>

                    {/* Suporte Técnico */}
                    <div className="border rounded-lg p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                          <Users className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">Suporte Técnico</h3>
                          <p className="text-sm text-gray-600">Disponível de segunda a sexta</p>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">
                        Dúvidas sobre produtos, instalação ou dimensionamento? 
                        Nossa equipe técnica está pronta para ajudar.
                      </p>
                      <Button variant="outline" className="w-full">
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Falar com Técnico
                      </Button>
                    </div>
                  </div>

                  {/* FAQ Rápido */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg mb-4">Perguntas Frequentes</h4>
                    
                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">🔄 Quando recebo minha comissão?</h5>
                      <p className="text-gray-600 text-sm">
                        As comissões são pagas entre os dias 15 e 30 de cada mês, após confirmação da instalação do sistema.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">📊 Como acompanhar minhas vendas?</h5>
                      <p className="text-gray-600 text-sm">
                        Pelo dashboard você pode acompanhar cliques, conversões e status de cada venda em tempo real.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">🔗 Posso criar links personalizados?</h5>
                      <p className="text-gray-600 text-sm">
                        Sim! Na seção "Meus Links" você pode criar links personalizados para diferentes campanhas e produtos.
                      </p>
                    </div>

                    <div className="border rounded-lg p-4">
                      <h5 className="font-medium mb-2">💰 Qual o valor mínimo para saque?</h5>
                      <p className="text-gray-600 text-sm">
                        O valor mínimo para solicitação de saque é R$ 100,00. Os pagamentos são feitos via PIX ou transferência.
                      </p>
                    </div>
                  </div>

                  {/* Contatos de Emergência */}
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                    <h4 className="font-semibold text-yellow-800 mb-2">📞 Contatos de Emergência</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium text-yellow-800">Vendas/Comercial:</p>
                        <p className="text-yellow-700">(11) 99999-9999</p>
                      </div>
                      <div>
                        <p className="font-medium text-yellow-800">Técnico/Instalação:</p>
                        <p className="text-yellow-700">(11) 88888-8888</p>
                      </div>
                      <div>
                        <p className="font-medium text-yellow-800">Financeiro:</p>
                        <p className="text-yellow-700">financeiro@graussolar.com.br</p>
                      </div>
                      <div>
                        <p className="font-medium text-yellow-800">Suporte Afiliados:</p>
                        <p className="text-yellow-700">afiliados@graussolar.com.br</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// Componente principal com Suspense
export default function AreaExclusivaPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AreaExclusivaContent />
    </Suspense>
  );
}
