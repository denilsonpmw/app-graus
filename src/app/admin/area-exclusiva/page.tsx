"use client";

import { useState, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AdminSidebar from "@/components/AdminSidebar";

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
  Target,
  Plus,
  Edit,
  Trash2,
  Upload,
  Eye,
  Settings
} from "lucide-react";

export default function AdminAreaExclusivaPage() {
  const [activeTab, setActiveTab] = useState("treinamentos");
  // const searchParams = useSearchParams();
  
  // Detecta a aba via URL quando a página carrega
  // useEffect(() => {
  //   const tab = searchParams.get('tab');
  //   if (tab && ['treinamentos', 'materiais', 'suporte'].includes(tab)) {
  //     setActiveTab(tab);
  //   }
  // }, [searchParams]);
  
  // Dados dos treinamentos (visão administrativa)
  const trainings = [
    {
      id: 1,
      title: "Fundamentos da Energia Solar",
      description: "Aprenda os conceitos básicos sobre energia solar e como funciona um sistema fotovoltaico",
      duration: "45 min",
      type: "video",
      difficulty: "Iniciante",
      status: "Publicado",
      views: 1250,
      rating: 4.9,
      students: 98,
      createdAt: "2025-01-15",
      updatedAt: "2025-01-20"
    },
    {
      id: 2,
      title: "Técnicas de Vendas Consultivas",
      description: "Estratégias comprovadas para aumentar suas conversões através da venda consultiva",
      duration: "1h 20min",
      type: "video",
      difficulty: "Intermediário",
      status: "Publicado",
      views: 890,
      rating: 4.8,
      students: 67,
      createdAt: "2025-01-10",
      updatedAt: "2025-01-18"
    },
    {
      id: 3,
      title: "Calculadora Solar Avançada",
      description: "Masterclass sobre dimensionamento e cálculos técnicos para sistemas solares",
      duration: "2h 15min",
      type: "video",
      difficulty: "Avançado",
      status: "Rascunho",
      views: 0,
      rating: 0,
      students: 0,
      createdAt: "2025-01-25",
      updatedAt: "2025-01-25"
    }
  ];

  // Materiais disponíveis (visão administrativa)
  const materials = [
    {
      id: 1,
      title: "Apresentação Comercial 2025",
      description: "Slides atualizados com dados e benefícios da energia solar",
      type: "powerpoint",
      size: "15.2 MB",
      downloads: 234,
      status: "Publicado",
      createdAt: "2025-01-20",
      updatedAt: "2025-01-22"
    },
    {
      id: 2,
      title: "Catálogo de Produtos Completo",
      description: "PDF com especificações técnicas de todos os produtos",
      type: "pdf",
      size: "8.7 MB",
      downloads: 567,
      status: "Publicado",
      createdAt: "2025-01-18",
      updatedAt: "2025-01-20"
    },
    {
      id: 3,
      title: "Templates de Proposta",
      description: "Modelos editáveis para criação de propostas comerciais",
      type: "document",
      size: "2.3 MB",
      downloads: 189,
      status: "Publicado",
      createdAt: "2025-01-15",
      updatedAt: "2025-01-16"
    }
  ];

  // Configurações de suporte
  const supportConfig = {
    whatsappGroup: "https://chat.whatsapp.com/exemplo123",
    supportEmail: "suporte@graussolar.com.br",
    supportHours: "Segunda a Sexta: 8h às 18h",
    responseTime: "Até 2 horas úteis",
    faqEnabled: true,
    chatEnabled: true,
    ticketEnabled: true
  };

  const getTypeIcon = (type: string) => {
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

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case "Iniciante": return "bg-green-100 text-green-800";
      case "Intermediário": return "bg-yellow-100 text-yellow-800";
      case "Avançado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Publicado": return "bg-green-100 text-green-800";
      case "Rascunho": return "bg-yellow-100 text-yellow-800";
      case "Arquivado": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Área Exclusiva - Administração</h2>
              <p className="text-gray-600">Gerencie conteúdos, materiais e suporte para afiliados</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button className="bg-solar-600 hover:bg-solar-700">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Conteúdo
              </Button>
            </div>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white border-b">
          <nav className="px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("treinamentos")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "treinamentos"
                    ? "border-solar-500 text-solar-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <PlayCircle className="h-4 w-4 mr-2 inline-block" />
                Treinamentos
              </button>
              <button
                onClick={() => setActiveTab("materiais")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "materiais"
                    ? "border-solar-500 text-solar-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <FileText className="h-4 w-4 mr-2 inline-block" />
                Materiais
              </button>
              <button
                onClick={() => setActiveTab("suporte")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "suporte"
                    ? "border-solar-500 text-solar-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <MessageCircle className="h-4 w-4 mr-2 inline-block" />
                Configurar Suporte
              </button>
            </div>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "treinamentos" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Gerenciar Treinamentos</h3>
                <Button className="bg-solar-600 hover:bg-solar-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Vídeo
                </Button>
              </div>

              <div className="grid gap-6">
                {trainings.map((training) => (
                  <Card key={training.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-solar-100 rounded-lg">
                            {getTypeIcon(training.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{training.title}</CardTitle>
                            <CardDescription className="mt-1 max-w-2xl">
                              {training.description}
                            </CardDescription>
                            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                              <span className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                {training.duration}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyBadge(training.difficulty)}`}>
                                {training.difficulty}
                              </span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(training.status)}`}>
                                {training.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-1" />
                            Visualizar
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Visualizações</p>
                          <p className="font-semibold">{training.views.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Avaliação</p>
                          <p className="font-semibold flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 mr-1" />
                            {training.rating > 0 ? training.rating : "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Afiliados Assistindo</p>
                          <p className="font-semibold">{training.students}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Última Atualização</p>
                          <p className="font-semibold">{formatDate(training.updatedAt)}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "materiais" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Gerenciar Materiais</h3>
                <Button className="bg-solar-600 hover:bg-solar-700">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Material
                </Button>
              </div>

              <div className="grid gap-6">
                {materials.map((material) => (
                  <Card key={material.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="p-3 bg-blue-100 rounded-lg">
                            {getTypeIcon(material.type)}
                          </div>
                          <div>
                            <CardTitle className="text-lg">{material.title}</CardTitle>
                            <CardDescription className="mt-1 max-w-2xl">
                              {material.description}
                            </CardDescription>
                            <div className="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                              <span>{material.size}</span>
                              <span>{material.downloads} downloads</span>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(material.status)}`}>
                                {material.status}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-1" />
                            Download
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Criado em</p>
                          <p className="font-semibold">{formatDate(material.createdAt)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Última Atualização</p>
                          <p className="font-semibold">{formatDate(material.updatedAt)}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Total de Downloads</p>
                          <p className="font-semibold">{material.downloads}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "suporte" && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Configurações de Suporte</h3>

              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Configurações do WhatsApp</CardTitle>
                    <CardDescription>Gerencie o grupo de suporte no WhatsApp</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="whatsapp-group">Link do Grupo WhatsApp</Label>
                      <Input 
                        id="whatsapp-group"
                        value={supportConfig.whatsappGroup}
                        placeholder="https://chat.whatsapp.com/..."
                      />
                    </div>
                    <Button className="bg-solar-600 hover:bg-solar-700">
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Configurações de E-mail</CardTitle>
                    <CardDescription>Configure o suporte por e-mail</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="support-email">E-mail de Suporte</Label>
                      <Input 
                        id="support-email"
                        value={supportConfig.supportEmail}
                        placeholder="suporte@empresa.com"
                      />
                    </div>
                    <div>
                      <Label htmlFor="support-hours">Horário de Atendimento</Label>
                      <Input 
                        id="support-hours"
                        value={supportConfig.supportHours}
                        placeholder="Segunda a Sexta: 8h às 18h"
                      />
                    </div>
                    <div>
                      <Label htmlFor="response-time">Tempo de Resposta Estimado</Label>
                      <Input 
                        id="response-time"
                        value={supportConfig.responseTime}
                        placeholder="Até 2 horas úteis"
                      />
                    </div>
                    <Button className="bg-solar-600 hover:bg-solar-700">
                      Salvar Configurações
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recursos Disponíveis</CardTitle>
                    <CardDescription>Habilite ou desabilite recursos de suporte</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">FAQ Automático</p>
                        <p className="text-sm text-gray-500">Respostas automáticas para perguntas frequentes</p>
                      </div>
                      <Button variant={supportConfig.faqEnabled ? "default" : "outline"}>
                        {supportConfig.faqEnabled ? "Ativado" : "Desativado"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Chat ao Vivo</p>
                        <p className="text-sm text-gray-500">Chat em tempo real no sistema</p>
                      </div>
                      <Button variant={supportConfig.chatEnabled ? "default" : "outline"}>
                        {supportConfig.chatEnabled ? "Ativado" : "Desativado"}
                      </Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Sistema de Tickets</p>
                        <p className="text-sm text-gray-500">Abertura de chamados via sistema</p>
                      </div>
                      <Button variant={supportConfig.ticketEnabled ? "default" : "outline"}>
                        {supportConfig.ticketEnabled ? "Ativado" : "Desativado"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
