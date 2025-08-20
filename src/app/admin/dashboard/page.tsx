"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getGreeting } from "@/lib/utils/greeting";

import { 
  Users, 
  DollarSign, 
  TrendingUp, 
  Package,
  Eye,
  Calendar,
  Download,
  UserCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search
} from "lucide-react";

export default function AdminDashboardPage() {
  const { data: session } = useSession();
  const [selectedPeriod, setSelectedPeriod] = useState("30");
  
  // Dados gerais do sistema
  const systemStats = {
    totalAffiliates: 147,
    activeAffiliates: 98,
    pendingAffiliates: 12,
    blockedAffiliates: 5,
    totalSales: 1247380.50,
    monthSales: 342950.75,
    totalCommissions: 62369.03,
    pendingCommissions: 15847.25,
    avgConversionRate: 2.3,
    topProducts: [
      { name: "Kit Solar 5kW", sales: 89, revenue: 1648500.00 },
      { name: "Kit Solar 3kW", sales: 67, revenue: 864300.00 },
      { name: "Kit Solar 8kW", sales: 34, revenue: 965600.00 }
    ]
  };

  // Vendas recentes
  const recentSales = [
    {
      id: "GS-2025-001456",
      affiliate: "João Silva",
      client: "Maria Santos",
      product: "Kit Solar 5kW",
      value: 18500.00,
      commission: 555.00,
      date: "2025-01-27",
      status: "Confirmada"
    },
    {
      id: "GS-2025-001455",
      affiliate: "Ana Costa",
      client: "Pedro Oliveira",
      product: "Kit Solar 3kW",
      value: 12900.00,
      commission: 387.00,
      date: "2025-01-27",
      status: "Pendente"
    },
    {
      id: "GS-2025-001454",
      affiliate: "Carlos Lima",
      client: "Fernanda Silva",
      product: "Kit Solar 8kW",
      value: 28400.00,
      commission: 852.00,
      date: "2025-01-26",
      status: "Confirmada"
    }
  ];

  // Afiliados top performers
  const topAffiliates = [
    {
      id: "GS001234",
      name: "João Silva",
      plan: "Premium",
      sales: 23,
      revenue: 425700.00,
      commission: 21285.00,
      conversionRate: 3.2
    },
    {
      id: "GS001189",
      name: "Ana Costa",
      plan: "Advanced",
      sales: 18,
      revenue: 298900.00,
      commission: 8967.00,
      conversionRate: 2.8
    },
    {
      id: "GS001098",
      name: "Carlos Lima",
      plan: "Premium",
      sales: 15,
      revenue: 234500.00,
      commission: 11725.00,
      conversionRate: 2.1
    }
  ];

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
      case "Confirmada":
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Confirmada</span>;
      case "Pendente":
        return <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">Pendente</span>;
      case "Cancelada":
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full">Cancelada</span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  return (
  <main className="min-h-screen bg-gray-50">
      {/* Main Content */}
  <div className="">
  {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {getGreeting(session?.user?.name || 'Administrador')}
              </h2>
              <p className="text-gray-600">Visão geral de vendas, afiliados e performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <select 
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="7">Últimos 7 dias</option>
                <option value="30">Últimos 30 dias</option>
                <option value="90">Últimos 90 dias</option>
              </select>
              <Button className="bg-solar-600 hover:bg-solar-700">
                <Download className="h-4 w-4 mr-2" />
                Exportar Relatório
              </Button>
            </div>
          </div>
        </header>

        {/* Statistics Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Afiliados</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.totalAffiliates}</div>
                <p className="text-xs text-muted-foreground">
                  {systemStats.activeAffiliates} ativos, {systemStats.pendingAffiliates} pendentes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(systemStats.totalSales)}</div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(systemStats.monthSales)} este mês
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comissões Pagas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(systemStats.totalCommissions)}</div>
                <p className="text-xs text-muted-foreground">
                  {formatCurrency(systemStats.pendingCommissions)} pendentes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Taxa de Conversão</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{systemStats.avgConversionRate}%</div>
                <p className="text-xs text-green-600 flex items-center">
                  <ArrowUpRight className="h-3 w-3 mr-1" />
                  +0.3% vs mês anterior
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle>Produtos Mais Vendidos</CardTitle>
                <CardDescription>Ranking de produtos por vendas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {systemStats.topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-solar-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-solar-600 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-gray-500">{product.sales} vendas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{formatCurrency(product.revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Affiliates */}
            <Card>
              <CardHeader>
                <CardTitle>Top Afiliados</CardTitle>
                <CardDescription>Melhores performers do período</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAffiliates.map((affiliate, index) => (
                    <div key={affiliate.id} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                          <span className="text-green-600 font-semibold text-sm">{index + 1}</span>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{affiliate.name}</p>
                          <p className="text-xs text-gray-500">{affiliate.plan} • {affiliate.sales} vendas</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-sm">{formatCurrency(affiliate.commission)}</p>
                        <p className="text-xs text-gray-500">{affiliate.conversionRate}% conversão</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Sales */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Vendas Recentes</CardTitle>
                  <CardDescription>Últimas transações do sistema</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Ver Todas
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Pedido
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Afiliado
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Cliente
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
                        Data
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {recentSales.map((sale) => (
                      <tr key={sale.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {sale.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sale.affiliate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sale.client}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {sale.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {formatCurrency(sale.value)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">
                          {formatCurrency(sale.commission)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(sale.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {formatDate(sale.date)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
      </div>{/* end inner wrapper */}
      </div>{/* end inner wrapper */}
    </main>
  );
}
