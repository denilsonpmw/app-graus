"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
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
  MoreVertical,
  CreditCard,
  Banknote,
  Target,
  Users,
  ArrowUpDown,
  FileText,
  ExternalLink
} from "lucide-react";

export default function AdminVendasPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [paymentFilter, setPaymentFilter] = useState("todos");
  const [dateFilter, setDateFilter] = useState("30");
  
  // Dados das vendas e comissões
  const sales = [
    {
      id: "VND-2025-001247",
      customer: {
        name: "Maria Silva",
        email: "maria.silva@email.com",
        phone: "(11) 99999-9999",
        address: "São Paulo, SP"
      },
      affiliate: {
        id: "GS001234",
        name: "João Silva",
        plan: "Premium"
      },
      product: {
        name: "Kit Solar Residencial 5kWp",
        price: 18500.00,
        category: "Residencial"
      },
      sale: {
        amount: 18500.00,
        date: "2025-01-27",
        status: "Concluída",
        paymentMethod: "PIX",
        installments: 1,
        commission: {
          rate: 5,
          amount: 925.00,
          status: "Pago"
        }
      },
      tracking: {
        leadDate: "2025-01-20",
        proposalDate: "2025-01-22",
        closedDate: "2025-01-27",
        conversionDays: 7
      }
    },
    {
      id: "VND-2025-001246",
      customer: {
        name: "Carlos Oliveira",
        email: "carlos.oliveira@email.com",
        phone: "(21) 98888-8888",
        address: "Rio de Janeiro, RJ"
      },
      affiliate: {
        id: "GS001189",
        name: "Ana Costa",
        plan: "Advanced"
      },
      product: {
        name: "Kit Solar Comercial 10kWp",
        price: 32000.00,
        category: "Comercial"
      },
      sale: {
        amount: 32000.00,
        date: "2025-01-26",
        status: "Concluída",
        paymentMethod: "Cartão",
        installments: 6,
        commission: {
          rate: 3,
          amount: 960.00,
          status: "Pago"
        }
      },
      tracking: {
        leadDate: "2025-01-15",
        proposalDate: "2025-01-18",
        closedDate: "2025-01-26",
        conversionDays: 11
      }
    },
    {
      id: "VND-2025-001245",
      customer: {
        name: "Fernanda Santos",
        email: "fernanda.santos@email.com",
        phone: "(31) 97777-7777",
        address: "Belo Horizonte, MG"
      },
      affiliate: {
        id: "GS000856",
        name: "Pedro Oliveira",
        plan: "Premium"
      },
      product: {
        name: "Kit Solar Rural 15kWp",
        price: 45000.00,
        category: "Rural"
      },
      sale: {
        amount: 45000.00,
        date: "2025-01-25",
        status: "Aguardando Pagamento",
        paymentMethod: "Boleto",
        installments: 1,
        commission: {
          rate: 5,
          amount: 2250.00,
          status: "Pendente"
        }
      },
      tracking: {
        leadDate: "2025-01-10",
        proposalDate: "2025-01-15",
        closedDate: "2025-01-25",
        conversionDays: 15
      }
    },
    {
      id: "VND-2025-001244",
      customer: {
        name: "Roberto Costa",
        email: "roberto.costa@email.com",
        phone: "(41) 96666-6666",
        address: "Curitiba, PR"
      },
      affiliate: {
        id: "GS001098",
        name: "Carlos Lima",
        plan: "Light"
      },
      product: {
        name: "Kit Solar Residencial 3kWp",
        price: 12500.00,
        category: "Residencial"
      },
      sale: {
        amount: 12500.00,
        date: "2025-01-24",
        status: "Cancelada",
        paymentMethod: "Cartão",
        installments: 12,
        commission: {
          rate: 2,
          amount: 250.00,
          status: "Cancelado"
        }
      },
      tracking: {
        leadDate: "2025-01-12",
        proposalDate: "2025-01-16",
        closedDate: null,
        conversionDays: 0
      }
    },
    {
      id: "VND-2025-001243",
      customer: {
        name: "Ana Rodrigues",
        email: "ana.rodrigues@email.com",
        phone: "(51) 95555-5555",
        address: "Porto Alegre, RS"
      },
      affiliate: {
        id: "GS001234",
        name: "João Silva",
        plan: "Premium"
      },
      product: {
        name: "Kit Solar Residencial 8kWp",
        price: 28000.00,
        category: "Residencial"
      },
      sale: {
        amount: 28000.00,
        date: "2025-01-23",
        status: "Em Disputa",
        paymentMethod: "Cartão",
        installments: 10,
        commission: {
          rate: 5,
          amount: 1400.00,
          status: "Retido"
        }
      },
      tracking: {
        leadDate: "2025-01-08",
        proposalDate: "2025-01-12",
        closedDate: "2025-01-23",
        conversionDays: 15
      }
    }
  ];

  const filteredSales = sales.filter(sale => {
    const matchesSearch = sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         sale.customer.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "todos" || sale.sale.status === statusFilter;
    const matchesPayment = paymentFilter === "todos" || sale.sale.paymentMethod === paymentFilter;
    
    return matchesSearch && matchesStatus && matchesPayment;
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
      case "Concluída":
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
          <Check className="h-3 w-3 mr-1" />
          Concluída
        </span>;
      case "Aguardando Pagamento":
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Aguardando Pagamento
        </span>;
      case "Em Disputa":
        return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full flex items-center">
          <AlertTriangle className="h-3 w-3 mr-1" />
          Em Disputa
        </span>;
      case "Cancelada":
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
          <X className="h-3 w-3 mr-1" />
          Cancelada
        </span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  const getCommissionStatusBadge = (status: string) => {
    switch (status) {
      case "Pago":
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Pago</span>;
      case "Pendente":
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pendente</span>;
      case "Retido":
        return <span className="px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded-full">Retido</span>;
      case "Cancelado":
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Cancelado</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  const getPaymentIcon = (method: string) => {
    switch (method) {
      case "PIX":
        return <Banknote className="h-4 w-4 text-green-600" />;
      case "Cartão":
        return <CreditCard className="h-4 w-4 text-blue-600" />;
      case "Boleto":
        return <FileText className="h-4 w-4 text-orange-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  // Cálculos de estatísticas
  const totalSales = sales.reduce((sum, sale) => sum + sale.sale.amount, 0);
  const totalCommissions = sales.reduce((sum, sale) => sum + sale.sale.commission.amount, 0);
  const completedSales = sales.filter(sale => sale.sale.status === "Concluída").length;
  const averageTicket = totalSales / sales.length;

  return (
    <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Vendas e Comissões</h2>
              <p className="text-gray-600">Gerencie vendas, rastreie comissões e analise performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
              <Button className="bg-solar-600 hover:bg-solar-700">
                <Plus className="h-4 w-4 mr-2" />
                Nova Venda
              </Button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total em Vendas</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalSales)}</div>
                <p className="text-xs text-muted-foreground">
                  +12% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total em Comissões</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{formatCurrency(totalCommissions)}</div>
                <p className="text-xs text-muted-foreground">
                  +8% vs mês anterior
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas Concluídas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{completedSales}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((completedSales / sales.length) * 100)}% taxa de conversão
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(averageTicket)}</div>
                <p className="text-xs text-muted-foreground">
                  +5% vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-yellow-600" />
                  Comissões Pendentes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(sales.filter(s => s.sale.commission.status === "Pendente").reduce((sum, s) => sum + s.sale.commission.amount, 0))}
                </div>
                <p className="text-sm text-gray-600">
                  {sales.filter(s => s.sale.commission.status === "Pendente").length} pagamentos pendentes
                </p>
                <Button className="mt-3 w-full">Processar Pagamentos</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-orange-600" />
                  Disputas Ativas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">
                  {sales.filter(s => s.sale.status === "Em Disputa").length}
                </div>
                <p className="text-sm text-gray-600">
                  Vendas com problemas para resolver
                </p>
                <Button variant="outline" className="mt-3 w-full">Ver Disputas</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Users className="h-5 w-5 mr-2 text-blue-600" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">João Silva</span>
                    <span className="text-sm font-medium">{formatCurrency(2325.00)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Pedro Oliveira</span>
                    <span className="text-sm font-medium">{formatCurrency(2250.00)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Ana Costa</span>
                    <span className="text-sm font-medium">{formatCurrency(960.00)}</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-3 w-full">Ver Ranking</Button>
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
                    placeholder="Buscar por cliente, afiliado ou ID da venda..."
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
                  <option value="Concluída">Concluída</option>
                  <option value="Aguardando Pagamento">Aguardando Pagamento</option>
                  <option value="Em Disputa">Em Disputa</option>
                  <option value="Cancelada">Cancelada</option>
                </select>
                <select 
                  value={paymentFilter}
                  onChange={(e) => setPaymentFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todos">Todos os Pagamentos</option>
                  <option value="PIX">PIX</option>
                  <option value="Cartão">Cartão</option>
                  <option value="Boleto">Boleto</option>
                </select>
                <select 
                  value={dateFilter}
                  onChange={(e) => setDateFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="7">Últimos 7 dias</option>
                  <option value="30">Últimos 30 dias</option>
                  <option value="90">Últimos 90 dias</option>
                  <option value="365">Último ano</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Sales List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Lista de Vendas ({filteredSales.length})</CardTitle>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Ordenar
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
                        Venda
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Afiliado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Produto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Valor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comissão
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ações
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sale.id}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              {formatDate(sale.sale.date)}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              {getPaymentIcon(sale.sale.paymentMethod)}
                              <span className="ml-1">
                                {sale.sale.paymentMethod}
                                {sale.sale.installments > 1 && ` (${sale.sale.installments}x)`}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sale.customer.name}</div>
                            <div className="text-sm text-gray-500">{sale.customer.email}</div>
                            <div className="text-sm text-gray-500">{sale.customer.address}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sale.affiliate.name}</div>
                            <div className="text-sm text-gray-500">ID: {sale.affiliate.id}</div>
                            <div className="text-sm">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                                sale.affiliate.plan === 'Premium' ? 'bg-purple-100 text-purple-800' :
                                sale.affiliate.plan === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {sale.affiliate.plan}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{sale.product.name}</div>
                            <div className="text-sm text-gray-500">{sale.product.category}</div>
                            <div className="text-sm font-medium text-gray-900">{formatCurrency(sale.product.price)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-gray-900">{formatCurrency(sale.sale.amount)}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {formatCurrency(sale.sale.commission.amount)} ({sale.sale.commission.rate}%)
                            </div>
                            <div className="mt-1">
                              {getCommissionStatusBadge(sale.sale.commission.status)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(sale.sale.status)}
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
                            {sale.sale.commission.status === "Pendente" && (
                              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                <Check className="h-4 w-4 mr-1" />
                                Pagar
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
  </main>
  );
}
