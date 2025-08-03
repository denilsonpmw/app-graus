"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import { 
  Users, 
  Search,
  Filter,
  Download,
  Eye,
  Phone,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  UserPlus,
  MoreVertical,
  MessageCircle
} from "lucide-react";

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  
  // Dados dos clientes
  const clients = [
    {
      id: 1,
      name: "Maria Santos",
      email: "maria.santos@email.com",
      phone: "(11) 99999-8888",
      city: "São Paulo, SP",
      leadDate: "2025-01-20",
      saleDate: "2025-01-25",
      status: "Cliente",
      product: "Kit Solar Residencial 5kW",
      value: 18500.00,
      commission: 555.00,
      source: "WhatsApp",
      affiliateLink: "bf2025"
    },
    {
      id: 2,
      name: "Pedro Oliveira",
      email: "pedro.oliveira@empresa.com",
      phone: "(11) 88888-7777",
      city: "Campinas, SP",
      leadDate: "2025-01-18",
      saleDate: null,
      status: "Proposta Enviada",
      product: "Kit Solar Residencial 3kW",
      value: 12900.00,
      commission: 387.00,
      source: "Instagram",
      affiliateLink: "ig-bio"
    },
    {
      id: 3,
      name: "Ana Costa",
      email: "ana.costa@gmail.com",
      phone: "(11) 77777-6666",
      city: "Santos, SP",
      leadDate: "2025-01-15",
      saleDate: "2025-01-22",
      status: "Cliente",
      product: "Kit Solar Residencial 8kW",
      value: 28400.00,
      commission: 852.00,
      source: "Facebook",
      affiliateLink: "bf2025"
    },
    {
      id: 4,
      name: "Carlos Lima",
      email: "carlos.lima@hotmail.com",
      phone: "(11) 66666-5555",
      city: "Guarulhos, SP",
      leadDate: "2025-01-12",
      saleDate: null,
      status: "Negociação",
      product: "Kit Solar Residencial 2kW",
      value: 8900.00,
      commission: 267.00,
      source: "WhatsApp",
      affiliateLink: "ig-bio"
    },
    {
      id: 5,
      name: "Fernanda Silva",
      email: "fernanda@empresa.com.br",
      phone: "(11) 55555-4444",
      city: "São Bernardo, SP",
      leadDate: "2025-01-10",
      saleDate: null,
      status: "Lead",
      product: "Kit Solar Empresarial 10kW",
      value: 35900.00,
      commission: 1077.00,
      source: "LinkedIn",
      affiliateLink: "empresas"
    },
    {
      id: 6,
      name: "Roberto Mendes",
      email: "roberto.mendes@gmail.com",
      phone: "(11) 44444-3333",
      city: "Osasco, SP",
      leadDate: "2025-01-08",
      saleDate: null,
      status: "Sem Interesse",
      product: "Kit Solar Residencial 6kW",
      value: 22100.00,
      commission: 663.00,
      source: "Google",
      affiliateLink: "bf2025"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Cliente": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Proposta Enviada": return <Clock className="h-4 w-4 text-blue-500" />;
      case "Negociação": return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case "Lead": return <Users className="h-4 w-4 text-purple-500" />;
      case "Sem Interesse": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Cliente": return "bg-green-100 text-green-800";
      case "Proposta Enviada": return "bg-blue-100 text-blue-800";
      case "Negociação": return "bg-yellow-100 text-yellow-800";
      case "Lead": return "bg-purple-100 text-purple-800";
      case "Sem Interesse": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredClients = clients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         client.city.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "todos" || client.status.toLowerCase().replace(" ", "-") === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  // Estatísticas
  const totalClients = clients.filter(c => c.status === "Cliente").length;
  const totalLeads = clients.filter(c => c.status === "Lead").length;
  const totalNegotiating = clients.filter(c => c.status === "Negociação").length;
  const conversionRate = clients.length > 0 ? ((totalClients / clients.length) * 100).toFixed(1) : "0";

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Clientes</h2>
              <p className="text-gray-600">Gerencie seus leads e clientes convertidos</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button className="bg-solar-600 hover:bg-solar-700">
                <UserPlus className="h-4 w-4 mr-2" />
                Adicionar Cliente
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{totalClients}</div>
                <p className="text-xs text-muted-foreground">
                  Vendas efetivadas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Leads Ativos</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{totalLeads}</div>
                <p className="text-xs text-muted-foreground">
                  Aguardando contato
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Em Negociação</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{totalNegotiating}</div>
                <p className="text-xs text-muted-foreground">
                  Propostas em análise
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{conversionRate}%</div>
                <p className="text-xs text-muted-foreground">
                  Leads → Clientes
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Buscar por nome, email ou cidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80"
                />
              </div>
              
              <select 
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="todos">Todos os Status</option>
                <option value="cliente">Cliente</option>
                <option value="proposta-enviada">Proposta Enviada</option>
                <option value="negociação">Negociação</option>
                <option value="lead">Lead</option>
                <option value="sem-interesse">Sem Interesse</option>
              </select>
            </div>
          </div>

          {/* Clients Table */}
          <Card>
            <CardHeader>
              <CardTitle>Lista de Clientes e Prospects</CardTitle>
              <CardDescription>
                Acompanhe o funil de vendas dos seus leads
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredClients.map((client) => (
                  <div key={client.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(client.status)}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(client.status)}`}>
                            {client.status}
                          </span>
                        </div>
                        <span className="text-sm text-gray-500">
                          Origem: <code className="bg-gray-100 px-2 py-1 rounded">{client.source}</code>
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">
                          {formatCurrency(client.value)}
                        </div>
                        {client.status === "Cliente" && (
                          <div className="text-sm text-green-600">
                            Comissão: {formatCurrency(client.commission)}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{client.name}</p>
                        <p className="text-sm text-gray-500">{client.product}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {client.email}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Phone className="h-3 w-3 mr-1" />
                          {client.phone}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 flex items-center">
                          <MapPin className="h-3 w-3 mr-1" />
                          {client.city}
                        </p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          Lead: {formatDate(client.leadDate)}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Link:</p>
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded">{client.affiliateLink}</code>
                        {client.saleDate && (
                          <p className="text-sm text-green-600 mt-1">
                            Venda: {formatDate(client.saleDate)}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Phone className="h-4 w-4 mr-1" />
                          Ligar
                        </Button>
                        <Button variant="outline" size="sm">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          WhatsApp
                        </Button>
                        <Button variant="outline" size="sm">
                          <Mail className="h-4 w-4 mr-1" />
                          E-mail
                        </Button>
                      </div>
                      <Button variant="outline" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredClients.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhum cliente encontrado com os filtros aplicados.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
