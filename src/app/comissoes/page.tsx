"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Sidebar from "@/components/Sidebar";
import { 
  DollarSign, 
  TrendingUp,
  Calendar,
  Filter,
  Download,
  Search,
  Eye,
  CreditCard,
  Clock,
  CheckCircle,
  AlertCircle,
  Calendar as CalendarIcon,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

export default function ComissoesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  
  // Dados das comissões
  const commissions = [
    {
      id: 1,
      clientName: "Maria Santos",
      product: "Kit Solar Residencial 5kW",
      saleValue: 18500.00,
      commissionRate: 3,
      commissionValue: 555.00,
      status: "Pago",
      saleDate: "2025-01-20",
      paymentDate: "2025-01-25",
      affiliateLink: "bf2025",
      orderId: "GS-2025-001234"
    },
    {
      id: 2,
      clientName: "Pedro Oliveira", 
      product: "Kit Solar Residencial 3kW",
      saleValue: 12900.00,
      commissionRate: 3,
      commissionValue: 387.00,
      status: "Pendente",
      saleDate: "2025-01-18",
      paymentDate: null,
      affiliateLink: "ig-bio",
      orderId: "GS-2025-001198"
    },
    {
      id: 3,
      clientName: "Ana Costa",
      product: "Kit Solar Residencial 8kW", 
      saleValue: 28400.00,
      commissionRate: 3,
      commissionValue: 852.00,
      status: "Pago",
      saleDate: "2025-01-15",
      paymentDate: "2025-01-22",
      affiliateLink: "bf2025",
      orderId: "GS-2025-001156"
    },
    {
      id: 4,
      clientName: "Carlos Lima",
      product: "Kit Solar Residencial 2kW",
      saleValue: 8900.00,
      commissionRate: 3,
      commissionValue: 267.00,
      status: "Processando",
      saleDate: "2025-01-12",
      paymentDate: null,
      affiliateLink: "ig-bio", 
      orderId: "GS-2025-001089"
    },
    {
      id: 5,
      clientName: "Fernanda Silva",
      product: "Kit Solar Empresarial 10kW",
      saleValue: 35900.00,
      commissionRate: 3,
      commissionValue: 1077.00,
      status: "Pendente",
      saleDate: "2025-01-10",
      paymentDate: null,
      affiliateLink: "empresas",
      orderId: "GS-2025-001045"
    },
    {
      id: 6,
      clientName: "Roberto Mendes",
      product: "Kit Solar Residencial 6kW",
      saleValue: 22100.00,
      commissionRate: 3,
      commissionValue: 663.00,
      status: "Cancelado",
      saleDate: "2025-01-08",
      paymentDate: null,
      affiliateLink: "bf2025",
      orderId: "GS-2025-001021"
    }
  ];

  // Totais calculados
  const totalCommissions = commissions.reduce((acc, comm) => acc + comm.commissionValue, 0);
  const paidCommissions = commissions.filter(c => c.status === 'Pago').reduce((acc, comm) => acc + comm.commissionValue, 0);
  const pendingCommissions = commissions.filter(c => c.status === 'Pendente').reduce((acc, comm) => acc + comm.commissionValue, 0);
  const processingCommissions = commissions.filter(c => c.status === 'Processando').reduce((acc, comm) => acc + comm.commissionValue, 0);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pago": return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "Pendente": return <Clock className="h-4 w-4 text-yellow-500" />;
      case "Processando": return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case "Cancelado": return <AlertCircle className="h-4 w-4 text-red-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pago": return "bg-green-100 text-green-800";
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Processando": return "bg-blue-100 text-blue-800";
      case "Cancelado": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredCommissions = commissions.filter(commission => {
    const matchesSearch = commission.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.orderId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "todos" || commission.status.toLowerCase() === selectedStatus;
    
    return matchesSearch && matchesStatus;
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Comissões</h2>
              <p className="text-gray-600">Acompanhe seus ganhos e pagamentos</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar
              </Button>
              <Button className="bg-solar-600 hover:bg-solar-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Solicitar Saque
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
                <CardTitle className="text-sm font-medium">Total Acumulado</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {formatCurrency(totalCommissions)}
                </div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1 text-green-500" />
                  +12% vs mês anterior
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Já Recebido</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(paidCommissions)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {commissions.filter(c => c.status === 'Pago').length} vendas pagas
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pendente</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">
                  {formatCurrency(pendingCommissions)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {commissions.filter(c => c.status === 'Pendente').length} vendas aguardando
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Processando</CardTitle>
                <AlertCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {formatCurrency(processingCommissions)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {commissions.filter(c => c.status === 'Processando').length} em análise
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
                  placeholder="Buscar por cliente, produto ou pedido..."
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
                <option value="pago">Pago</option>
                <option value="pendente">Pendente</option>
                <option value="processando">Processando</option>
                <option value="cancelado">Cancelado</option>
              </select>
              
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
                <option value="365">Último ano</option>
              </select>
            </div>
          </div>

          {/* Commissions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Histórico de Comissões</CardTitle>
              <CardDescription>
                Todas suas comissões detalhadas por venda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredCommissions.map((commission) => (
                  <div key={commission.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(commission.status)}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(commission.status)}`}>
                            {commission.status}
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          Pedido: <code className="bg-gray-100 px-2 py-1 rounded">{commission.orderId}</code>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">
                          {formatCurrency(commission.commissionValue)}
                        </div>
                        <div className="text-sm text-gray-500">
                          {commission.commissionRate}% de {formatCurrency(commission.saleValue)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{commission.clientName}</p>
                        <p className="text-sm text-gray-500">{commission.product}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Data da Venda</p>
                        <p className="text-sm font-medium">{formatDate(commission.saleDate)}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {commission.status === 'Pago' ? 'Data do Pagamento' : 'Previsão de Pagamento'}
                        </p>
                        <p className="text-sm font-medium">
                          {commission.paymentDate 
                            ? formatDate(commission.paymentDate)
                            : commission.status === 'Pendente' 
                              ? 'Próximos 5 dias úteis'
                              : 'Em análise'
                          }
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>Link: <code className="bg-gray-100 px-2 py-1 rounded">{commission.affiliateLink}</code></span>
                      </div>
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-1" />
                        Detalhes
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              {filteredCommissions.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Nenhuma comissão encontrada com os filtros aplicados.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Payment Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Informações de Pagamento
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Cronograma de Pagamentos</h4>
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span>Vendas confirmadas até dia 15:</span>
                      <span className="font-medium">Pagamento no dia 30</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Vendas confirmadas após dia 15:</span>
                      <span className="font-medium">Pagamento no dia 15 seguinte</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Método de pagamento:</span>
                      <span className="font-medium">PIX ou Transferência</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Próximo Pagamento</h4>
                  <div className="bg-solar-50 p-4 rounded-lg">
                    <p className="text-sm text-gray-600">Previsão para 30/01/2025</p>
                    <p className="text-xl font-bold text-solar-600">
                      {formatCurrency(pendingCommissions + processingCommissions)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {commissions.filter(c => ['Pendente', 'Processando'].includes(c.status)).length} vendas pendentes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
