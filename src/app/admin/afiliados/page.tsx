"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/AdminSidebar";
import { 
  Users, 
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Check,
  X,
  Clock,
  Star,
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  Download,
  UserCheck,
  UserX,
  MoreVertical
} from "lucide-react";

export default function AdminAfiliadosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [planFilter, setPlanFilter] = useState("todos");
  
  // Dados dos afiliados
  const affiliates = [
    {
      id: "GS001234",
      name: "João Silva",
      email: "joao.silva@email.com",
      phone: "(11) 99999-9999",
      plan: "Premium",
      status: "Ativo",
      joinDate: "2024-03-15",
      lastActivity: "2025-01-27",
      totalSales: 23,
      totalRevenue: 425700.00,
      totalCommission: 21285.00,
      conversionRate: 3.2,
      rating: 4.8,
      documents: {
        cpf: true,
        address: true,
        bank: true,
        contract: true
      },
      socialMedia: {
        instagram: "@joaosilvaenergia",
        followers: 15400
      }
    },
    {
      id: "GS001189",
      name: "Ana Costa",
      email: "ana.costa@email.com",
      phone: "(21) 98888-8888",
      plan: "Advanced",
      status: "Ativo",
      joinDate: "2024-05-20",
      lastActivity: "2025-01-26",
      totalSales: 18,
      totalRevenue: 298900.00,
      totalCommission: 8967.00,
      conversionRate: 2.8,
      rating: 4.6,
      documents: {
        cpf: true,
        address: true,
        bank: false,
        contract: true
      },
      socialMedia: {
        instagram: "@anacosta_solar",
        followers: 8900
      }
    },
    {
      id: "GS001098",
      name: "Carlos Lima",
      email: "carlos.lima@email.com",
      phone: "(31) 97777-7777",
      plan: "Light",
      status: "Pendente",
      joinDate: "2025-01-25",
      lastActivity: "2025-01-25",
      totalSales: 0,
      totalRevenue: 0.00,
      totalCommission: 0.00,
      conversionRate: 0,
      rating: 0,
      documents: {
        cpf: true,
        address: false,
        bank: false,
        contract: false
      },
      socialMedia: {
        instagram: "@carloslimatech",
        followers: 2300
      }
    },
    {
      id: "GS000987",
      name: "Fernanda Santos",
      email: "fernanda.santos@email.com",
      phone: "(41) 96666-6666",
      plan: "Advanced",
      status: "Bloqueado",
      joinDate: "2024-08-10",
      lastActivity: "2025-01-20",
      totalSales: 8,
      totalRevenue: 124500.00,
      totalCommission: 3735.00,
      conversionRate: 1.8,
      rating: 3.2,
      documents: {
        cpf: true,
        address: true,
        bank: true,
        contract: true
      },
      socialMedia: {
        instagram: "@fernandasantos_eco",
        followers: 5600
      }
    },
    {
      id: "GS000856",
      name: "Pedro Oliveira",
      email: "pedro.oliveira@email.com",
      phone: "(51) 95555-5555",
      plan: "Premium",
      status: "Ativo",
      joinDate: "2024-01-12",
      lastActivity: "2025-01-27",
      totalSales: 31,
      totalRevenue: 587300.00,
      totalCommission: 29365.00,
      conversionRate: 4.1,
      rating: 4.9,
      documents: {
        cpf: true,
        address: true,
        bank: true,
        contract: true
      },
      socialMedia: {
        instagram: "@pedrooliveira_sustentavel",
        followers: 22100
      }
    }
  ];

  const filteredAffiliates = affiliates.filter(affiliate => {
    const matchesSearch = affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         affiliate.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || affiliate.status === statusFilter;
    const matchesPlan = planFilter === "todos" || affiliate.plan === planFilter;
    
    return matchesSearch && matchesStatus && matchesPlan;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
          <Check className="h-3 w-3 mr-1" />
          Ativo
        </span>;
      case "Pendente":
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Pendente
        </span>;
      case "Bloqueado":
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
          <X className="h-3 w-3 mr-1" />
          Bloqueado
        </span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case "Premium":
        return <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Premium</span>;
      case "Advanced":
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Advanced</span>;
      case "Light":
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">Light</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{plan}</span>;
    }
  };

  const getDocumentStatus = (docs: any) => {
    const total = Object.keys(docs).length;
    const completed = Object.values(docs).filter(Boolean).length;
    const percentage = (completed / total) * 100;
    
    if (percentage === 100) {
      return <span className="text-green-600 text-sm font-medium">Completo</span>;
    } else if (percentage >= 50) {
      return <span className="text-yellow-600 text-sm font-medium">Incompleto ({completed}/{total})</span>;
    } else {
      return <span className="text-red-600 text-sm font-medium">Pendente ({completed}/{total})</span>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestão de Afiliados</h2>
              <p className="text-gray-600">Gerencie cadastros, aprovações e performance dos afiliados</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Lista
              </Button>
              <Button className="bg-solar-600 hover:bg-solar-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Afiliado
              </Button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Afiliados</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{affiliates.length}</div>
                <p className="text-xs text-muted-foreground">
                  +3 novos este mês
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Afiliados Ativos</CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {affiliates.filter(a => a.status === "Ativo").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((affiliates.filter(a => a.status === "Ativo").length / affiliates.length) * 100)}% do total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {affiliates.filter(a => a.status === "Pendente").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Aguardando aprovação
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bloqueados</CardTitle>
                <UserX className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {affiliates.filter(a => a.status === "Bloqueado").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Requer atenção
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filtros</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar por nome, email ou ID..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80"
                  />
                </div>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Pendente">Pendente</option>
                  <option value="Bloqueado">Bloqueado</option>
                </select>
                <select 
                  value={planFilter}
                  onChange={(e) => setPlanFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todos">Todos os Planos</option>
                  <option value="Premium">Premium</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Light">Light</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Affiliates List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lista de Afiliados ({filteredAffiliates.length})</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filtros Avançados
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Afiliado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contato
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Plano
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Performance
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Documentos
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cadastro
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAffiliates.map((affiliate) => (
                      <tr key={affiliate.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-solar-100 flex items-center justify-center">
                                <span className="text-solar-600 font-medium text-sm">
                                  {affiliate.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                                </span>
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                              <div className="text-sm text-gray-500">ID: {affiliate.id}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <Mail className="h-4 w-4 mr-1 text-gray-400" />
                            {affiliate.email}
                          </div>
                          <div className="text-sm text-gray-500 flex items-center">
                            <Phone className="h-4 w-4 mr-1 text-gray-400" />
                            {affiliate.phone}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getPlanBadge(affiliate.plan)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(affiliate.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="text-gray-900 font-medium">{affiliate.totalSales} vendas</div>
                          <div className="text-gray-500">{formatCurrency(affiliate.totalCommission)}</div>
                          <div className="text-gray-500 flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1" />
                            {affiliate.conversionRate}%
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getDocumentStatus(affiliate.documents)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            {formatDate(affiliate.joinDate)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4 mr-1" />
                              Ver
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Editar
                            </Button>
                            {affiliate.status === "Pendente" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <Check className="h-4 w-4 mr-1" />
                                Aprovar
                              </Button>
                            )}
                            {affiliate.status === "Ativo" && (
                              <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                                <X className="h-4 w-4 mr-1" />
                                Bloquear
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
