"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/AdminSidebar";
import { 
  TrendingUp, 
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
  DollarSign,
  Mail,
  Phone,
  Calendar,
  AlertTriangle,
  Download,
  Upload,
  Image,
  MoreVertical,
  ShoppingCart,
  Zap,
  Home,
  Building,
  Tractor,
  Sun,
  Battery,
  Settings,
  Wrench,
  Globe,
  Users,
  Target,
  BarChart3,
  Link,
  PieChart,
  LineChart,
  FileBarChart,
  Calculator,
  Percent,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  Table,
  FileSpreadsheet,
  Package
} from "lucide-react";

export default function AdminRelatoriosPage() {
  const [dateRange, setDateRange] = useState("30");
  const [reportType, setReportType] = useState("vendas");
  const [affiliateFilter, setAffiliateFilter] = useState("todos");
  
  // Dados dos relatórios
  const salesData = {
    thisMonth: {
      total: 1247380.50,
      count: 147,
      growth: 12.5,
      commissions: 41826.25
    },
    lastMonth: {
      total: 1109234.80,
      count: 131,
      growth: -2.1,
      commissions: 37107.18
    },
    byAffiliate: [
      { name: "João Silva", sales: 23, revenue: 425700.00, commission: 21285.00, growth: 18.5 },
      { name: "Pedro Oliveira", sales: 31, revenue: 587300.00, commission: 29365.00, growth: 25.3 },
      { name: "Ana Costa", sales: 18, revenue: 298900.00, commission: 8967.00, growth: -5.2 },
      { name: "Carlos Lima", sales: 12, revenue: 189400.00, commission: 3788.00, growth: 8.7 },
      { name: "Fernanda Santos", sales: 15, revenue: 245600.00, commission: 7368.00, growth: -12.3 }
    ],
    byProduct: [
      { name: "Kit Solar 5kWp", sales: 89, revenue: 1646500.00, margin: 35.1 },
      { name: "Kit Solar 10kWp", sales: 34, revenue: 1088000.00, margin: 37.5 },
      { name: "Painel 540W", sales: 156, revenue: 138840.00, margin: 41.6 },
      { name: "Kit Rural 15kWp", sales: 12, revenue: 540000.00, margin: 37.8 },
      { name: "Inversor 8kW", sales: 23, revenue: 287500.00, margin: 37.6 }
    ],
    byRegion: [
      { region: "São Paulo", sales: 45, revenue: 890000.00, percentage: 35.2 },
      { region: "Rio de Janeiro", sales: 23, revenue: 456700.00, percentage: 18.1 },
      { region: "Minas Gerais", sales: 18, revenue: 389200.00, percentage: 15.4 },
      { region: "Paraná", sales: 15, revenue: 298400.00, percentage: 11.8 },
      { region: "Outros", sales: 46, revenue: 495080.50, percentage: 19.5 }
    ]
  };

  const affiliateData = {
    performance: [
      { 
        plan: "Premium", 
        count: 45, 
        avgSales: 18.5, 
        avgCommission: 15680.00, 
        conversionRate: 4.2,
        retention: 94.5 
      },
      { 
        plan: "Advanced", 
        count: 78, 
        avgSales: 12.3, 
        avgCommission: 8940.00, 
        conversionRate: 3.1,
        retention: 89.2 
      },
      { 
        plan: "Light", 
        count: 24, 
        avgSales: 6.8, 
        avgCommission: 3250.00, 
        conversionRate: 2.4,
        retention: 82.1 
      }
    ],
    newSignups: {
      thisMonth: 18,
      lastMonth: 14,
      growth: 28.6
    },
    churnRate: {
      thisMonth: 3.2,
      lastMonth: 4.1,
      improvement: -0.9
    }
  };

  const financialData = {
    revenue: {
      gross: 1247380.50,
      net: 1205554.25,
      commissions: 41826.25,
      taxes: 124738.05
    },
    costs: {
      products: 810047.33,
      operations: 89316.44,
      marketing: 62369.03,
      support: 28495.16
    },
    profit: {
      gross: 437333.17,
      net: 256874.99,
      margin: 20.6
    }
  };

  const reportTemplates = [
    {
      id: "vendas-mensal",
      name: "Relatório de Vendas Mensal",
      description: "Análise completa das vendas por afiliado, produto e região",
      category: "Vendas",
      icon: ShoppingCart,
      frequency: "Mensal",
      lastGenerated: "2025-01-27",
      subscribers: 5
    },
    {
      id: "comissoes-semanal",
      name: "Relatório de Comissões Semanal",
      description: "Resumo das comissões pagas e pendentes",
      category: "Financeiro",
      icon: DollarSign,
      frequency: "Semanal",
      lastGenerated: "2025-01-27",
      subscribers: 3
    },
    {
      id: "performance-afiliados",
      name: "Performance de Afiliados",
      description: "Ranking e métricas de performance dos afiliados",
      category: "Afiliados",
      icon: Users,
      frequency: "Quinzenal",
      lastGenerated: "2025-01-20",
      subscribers: 8
    },
    {
      id: "estoque-produtos",
      name: "Relatório de Estoque",
      description: "Status do estoque e produtos com baixa disponibilidade",
      category: "Produtos",
      icon: Package,
      frequency: "Semanal",
      lastGenerated: "2025-01-25",
      subscribers: 2
    },
    {
      id: "roi-marketing",
      name: "ROI de Marketing",
      description: "Retorno sobre investimento em marketing e campanhas",
      category: "Marketing",
      icon: Target,
      frequency: "Mensal",
      lastGenerated: "2025-01-15",
      subscribers: 4
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

  const formatPercent = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
  };

  const getGrowthIcon = (growth: number) => {
    return growth > 0 ? 
      <ArrowUpRight className="h-4 w-4 text-green-600" /> : 
      <ArrowDownRight className="h-4 w-4 text-red-600" />;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Vendas":
        return <ShoppingCart className="h-4 w-4 text-blue-600" />;
      case "Financeiro":
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case "Afiliados":
        return <Users className="h-4 w-4 text-purple-600" />;
      case "Produtos":
        return <Package className="h-4 w-4 text-orange-600" />;
      case "Marketing":
        return <Target className="h-4 w-4 text-pink-600" />;
      default:
        return <FileText className="h-4 w-4 text-gray-600" />;
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
              <h2 className="text-2xl font-bold text-gray-900">Relatórios e Analytics</h2>
              <p className="text-gray-600">Análises detalhadas e insights do negócio</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                Agendar Relatório
              </Button>
              <Button className="bg-solar-600 hover:bg-solar-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Relatório
              </Button>
            </div>
          </div>
        </header>

        <div className="p-6">
          {/* Period Selector */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Filtros de Análise</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-4">
                <select 
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="7">Últimos 7 dias</option>
                  <option value="30">Últimos 30 dias</option>
                  <option value="90">Últimos 90 dias</option>
                  <option value="365">Último ano</option>
                  <option value="custom">Período customizado</option>
                </select>
                <select 
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="vendas">Vendas</option>
                  <option value="afiliados">Afiliados</option>
                  <option value="financeiro">Financeiro</option>
                  <option value="produtos">Produtos</option>
                </select>
                <select 
                  value={affiliateFilter}
                  onChange={(e) => setAffiliateFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todos">Todos os Afiliados</option>
                  <option value="premium">Premium</option>
                  <option value="advanced">Advanced</option>
                  <option value="light">Light</option>
                </select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Exportar
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Main Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(salesData.thisMonth.total)}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  {getGrowthIcon(salesData.thisMonth.growth)}
                  <span className="ml-1">{formatPercent(salesData.thisMonth.growth)} vs mês anterior</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Vendas</CardTitle>
                <ShoppingCart className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{salesData.thisMonth.count}</div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowUpRight className="h-4 w-4 text-green-600" />
                  <span className="ml-1">+16 vs mês anterior</span>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comissões Pagas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(salesData.thisMonth.commissions)}</div>
                <p className="text-xs text-muted-foreground">
                  {((salesData.thisMonth.commissions / salesData.thisMonth.total) * 100).toFixed(1)}% da receita
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ticket Médio</CardTitle>
                <Calculator className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(salesData.thisMonth.total / salesData.thisMonth.count)}
                </div>
                <p className="text-xs text-muted-foreground flex items-center">
                  <ArrowDownRight className="h-4 w-4 text-red-600" />
                  <span className="ml-1">-2.3% vs mês anterior</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Sales by Affiliate */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Top Afiliados por Receita
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.byAffiliate.map((affiliate, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="flex-shrink-0 h-8 w-8 bg-solar-100 rounded-full flex items-center justify-center">
                          <span className="text-solar-600 font-medium text-xs">
                            {index + 1}
                          </span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{affiliate.name}</div>
                          <div className="text-xs text-gray-500">{affiliate.sales} vendas</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{formatCurrency(affiliate.revenue)}</div>
                        <div className="text-xs flex items-center">
                          {getGrowthIcon(affiliate.growth)}
                          <span className="ml-1">{formatPercent(affiliate.growth)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Sales by Product */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="h-5 w-5 mr-2" />
                  Vendas por Produto
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.byProduct.map((product, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">{product.sales} unidades vendidas</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium">{formatCurrency(product.revenue)}</div>
                        <div className="text-xs text-gray-500">{product.margin}% margem</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Regional Performance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Performance por Região
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {salesData.byRegion.map((region, index) => (
                  <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-lg font-bold text-gray-900">{region.region}</div>
                    <div className="text-sm text-gray-600">{region.sales} vendas</div>
                    <div className="text-sm font-medium text-solar-600">{formatCurrency(region.revenue)}</div>
                    <div className="text-xs text-gray-500">{region.percentage}% do total</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Affiliate Performance */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Performance por Plano de Afiliado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {affiliateData.performance.map((plan, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`px-3 py-1 text-sm font-medium rounded-full ${
                        plan.plan === 'Premium' ? 'bg-purple-100 text-purple-800' :
                        plan.plan === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {plan.plan}
                      </span>
                      <span className="text-lg font-bold">{plan.count} afiliados</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Vendas médias:</span>
                        <span className="text-sm font-medium">{plan.avgSales}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Comissão média:</span>
                        <span className="text-sm font-medium">{formatCurrency(plan.avgCommission)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Taxa conversão:</span>
                        <span className="text-sm font-medium">{plan.conversionRate}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Retenção:</span>
                        <span className="text-sm font-medium text-green-600">{plan.retention}%</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Financial Summary */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calculator className="h-5 w-5 mr-2" />
                Resumo Financeiro
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-800 mb-3">Receitas</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Receita Bruta:</span>
                      <span className="text-sm font-medium">{formatCurrency(financialData.revenue.gross)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Receita Líquida:</span>
                      <span className="text-sm font-medium">{formatCurrency(financialData.revenue.net)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-green-700">Comissões:</span>
                      <span className="text-sm font-medium">{formatCurrency(financialData.revenue.commissions)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-red-50 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-3">Custos</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-red-700">Produtos:</span>
                      <span className="text-sm font-medium">{formatCurrency(financialData.costs.products)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-700">Operacional:</span>
                      <span className="text-sm font-medium">{formatCurrency(financialData.costs.operations)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-red-700">Marketing:</span>
                      <span className="text-sm font-medium">{formatCurrency(financialData.costs.marketing)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-3">Lucro</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Lucro Bruto:</span>
                      <span className="text-sm font-medium">{formatCurrency(financialData.profit.gross)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Lucro Líquido:</span>
                      <span className="text-sm font-medium">{formatCurrency(financialData.profit.net)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-blue-700">Margem:</span>
                      <span className="text-sm font-medium">{financialData.profit.margin}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Report Templates */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Relatórios Automatizados
                </CardTitle>
                <Button variant="outline">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Template
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {reportTemplates.map((template) => {
                  const Icon = template.icon;
                  return (
                    <div key={template.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          {getCategoryIcon(template.category)}
                          <span className="text-xs text-gray-500">{template.category}</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">{template.name}</h4>
                      <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{template.frequency}</span>
                        <span>{template.subscribers} inscritos</span>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-gray-500">
                          Último: {formatDate(template.lastGenerated)}
                        </span>
                        <div className="flex space-x-1">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
