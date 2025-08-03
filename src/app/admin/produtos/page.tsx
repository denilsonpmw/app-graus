"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AdminSidebar from "@/components/AdminSidebar";
import { 
  Package, 
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
  Link
} from "lucide-react";

export default function AdminProdutosPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("todos");
  const [statusFilter, setStatusFilter] = useState("todos");
  const [planFilter, setPlanFilter] = useState("todos");
  
  // Dados dos produtos
  const products = [
    {
      id: "PROD-001",
      name: "Kit Solar Residencial 5kWp",
      description: "Kit completo para residências com consumo médio de 600-800 kWh/mês",
      category: "Residencial",
      subcategory: "Kit Completo",
      price: 18500.00,
      cost: 12000.00,
      margin: 35.1,
      status: "Ativo",
      stock: 45,
      minStock: 10,
      weight: 250,
      dimensions: "2.00m x 1.50m x 0.20m",
      warranty: "25 anos",
      brand: "Canadian Solar",
      image: "/produtos/kit-5kwp.jpg",
      sales: {
        total: 234,
        thisMonth: 18,
        revenue: 4329000.00
      },
      commission: {
        light: 2,
        advanced: 3,
        premium: 5
      },
      affiliateAccess: {
        light: true,
        advanced: true,
        premium: true
      },
      specs: {
        panels: "20x Painéis 320W",
        inverter: "Inversor 5kW",
        structure: "Estrutura em Alumínio",
        cables: "Cabos e Conectores MC4",
        monitoring: "Monitoramento Wi-Fi"
      },
      seo: {
        title: "Kit Solar Residencial 5kWp - Economia até 95% na Conta de Luz",
        description: "Kit solar completo para residências. Instalação profissional, garantia de 25 anos.",
        keywords: "energia solar, kit solar residencial, painéis solares"
      }
    },
    {
      id: "PROD-002",
      name: "Kit Solar Comercial 10kWp",
      description: "Solução ideal para pequenos comércios e escritórios",
      category: "Comercial",
      subcategory: "Kit Completo",
      price: 32000.00,
      cost: 20000.00,
      margin: 37.5,
      status: "Ativo",
      stock: 28,
      minStock: 5,
      weight: 420,
      dimensions: "4.00m x 2.00m x 0.25m",
      warranty: "25 anos",
      brand: "Jinko Solar",
      image: "/produtos/kit-10kwp.jpg",
      sales: {
        total: 156,
        thisMonth: 12,
        revenue: 4992000.00
      },
      commission: {
        light: 2,
        advanced: 3,
        premium: 5
      },
      affiliateAccess: {
        light: false,
        advanced: true,
        premium: true
      },
      specs: {
        panels: "32x Painéis 315W",
        inverter: "Inversor 10kW",
        structure: "Estrutura Metálica",
        cables: "Cabos e Conectores MC4",
        monitoring: "Monitoramento 4G"
      },
      seo: {
        title: "Kit Solar Comercial 10kWp - Reduza Custos do seu Negócio",
        description: "Sistema solar para comércios. ROI em 4-6 anos, economia garantida.",
        keywords: "energia solar comercial, kit solar empresarial, redução custos"
      }
    },
    {
      id: "PROD-003",
      name: "Kit Solar Rural 15kWp",
      description: "Sistema robusto para propriedades rurais e agronegócio",
      category: "Rural",
      subcategory: "Kit Completo",
      price: 45000.00,
      cost: 28000.00,
      margin: 37.8,
      status: "Ativo",
      stock: 12,
      minStock: 3,
      weight: 650,
      dimensions: "6.00m x 2.50m x 0.30m",
      warranty: "25 anos",
      brand: "Trina Solar",
      image: "/produtos/kit-15kwp.jpg",
      sales: {
        total: 89,
        thisMonth: 8,
        revenue: 4005000.00
      },
      commission: {
        light: 2,
        advanced: 3,
        premium: 5
      },
      affiliateAccess: {
        light: false,
        advanced: false,
        premium: true
      },
      specs: {
        panels: "48x Painéis 315W",
        inverter: "Inversor 15kW",
        structure: "Estrutura Galvanizada",
        cables: "Cabos Especiais Rural",
        monitoring: "Monitoramento Satelital"
      },
      seo: {
        title: "Kit Solar Rural 15kWp - Energia Limpa para o Campo",
        description: "Sistema solar para propriedades rurais. Resistente e durável.",
        keywords: "energia solar rural, kit solar agronegócio, sustentabilidade rural"
      }
    },
    {
      id: "PROD-004",
      name: "Painel Solar 540W Monocristalino",
      description: "Painel de alta eficiência para projetos customizados",
      category: "Componentes",
      subcategory: "Painéis",
      price: 890.00,
      cost: 520.00,
      margin: 41.6,
      status: "Ativo",
      stock: 180,
      minStock: 50,
      weight: 27,
      dimensions: "2.13m x 1.05m x 0.035m",
      warranty: "25 anos",
      brand: "LONGi Solar",
      image: "/produtos/painel-540w.jpg",
      sales: {
        total: 456,
        thisMonth: 34,
        revenue: 405840.00
      },
      commission: {
        light: 1.5,
        advanced: 2.5,
        premium: 4
      },
      affiliateAccess: {
        light: true,
        advanced: true,
        premium: true
      },
      specs: {
        power: "540W",
        efficiency: "21.7%",
        voltage: "41.8V",
        current: "12.93A",
        technology: "PERC Monocristalino"
      },
      seo: {
        title: "Painel Solar 540W Monocristalino - Alta Eficiência",
        description: "Painel solar de última geração com eficiência superior a 21%.",
        keywords: "painel solar 540w, painel monocristalino, alta eficiência"
      }
    },
    {
      id: "PROD-005",
      name: "Inversor Solar 8kW Híbrido",
      description: "Inversor híbrido com backup de bateria integrado",
      category: "Componentes",
      subcategory: "Inversores",
      price: 12500.00,
      cost: 7800.00,
      margin: 37.6,
      status: "Pré-venda",
      stock: 0,
      minStock: 5,
      weight: 45,
      dimensions: "0.65m x 0.45m x 0.22m",
      warranty: "10 anos",
      brand: "Growatt",
      image: "/produtos/inversor-8kw.jpg",
      sales: {
        total: 67,
        thisMonth: 5,
        revenue: 837500.00
      },
      commission: {
        light: 1.5,
        advanced: 2.5,
        premium: 4
      },
      affiliateAccess: {
        light: false,
        advanced: true,
        premium: true
      },
      specs: {
        power: "8kW",
        inputVoltage: "580-800V",
        efficiency: "97.6%",
        phases: "Monofásico",
        protection: "IP65"
      },
      seo: {
        title: "Inversor Solar 8kW Híbrido com Backup de Bateria",
        description: "Inversor híbrido para sistemas com armazenamento de energia.",
        keywords: "inversor híbrido, inversor solar 8kw, backup energia"
      }
    },
    {
      id: "PROD-006",
      name: "Bateria Lítio 10kWh",
      description: "Sistema de armazenamento de energia de alta capacidade",
      category: "Componentes",
      subcategory: "Baterias",
      price: 28000.00,
      cost: 18500.00,
      margin: 33.9,
      status: "Inativo",
      stock: 8,
      minStock: 2,
      weight: 120,
      dimensions: "0.60m x 0.80m x 0.15m",
      warranty: "10 anos",
      brand: "BYD",
      image: "/produtos/bateria-10kwh.jpg",
      sales: {
        total: 23,
        thisMonth: 0,
        revenue: 644000.00
      },
      commission: {
        light: 1,
        advanced: 2,
        premium: 3
      },
      affiliateAccess: {
        light: false,
        advanced: false,
        premium: true
      },
      specs: {
        capacity: "10kWh",
        voltage: "204.8V",
        cycles: "6000+",
        efficiency: "95%",
        temperature: "-10°C a +50°C"
      },
      seo: {
        title: "Bateria Lítio 10kWh - Armazenamento de Energia Solar",
        description: "Sistema de baterias para backup e armazenamento de energia solar.",
        keywords: "bateria solar, armazenamento energia, backup energia"
      }
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "todos" || product.category === categoryFilter;
    const matchesStatus = statusFilter === "todos" || product.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Ativo":
        return <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full flex items-center">
          <Check className="h-3 w-3 mr-1" />
          Ativo
        </span>;
      case "Pré-venda":
        return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full flex items-center">
          <Clock className="h-3 w-3 mr-1" />
          Pré-venda
        </span>;
      case "Inativo":
        return <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded-full flex items-center">
          <X className="h-3 w-3 mr-1" />
          Inativo
        </span>;
      default:
        return <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">{status}</span>;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Residencial":
        return <Home className="h-4 w-4 text-blue-600" />;
      case "Comercial":
        return <Building className="h-4 w-4 text-green-600" />;
      case "Rural":
        return <Tractor className="h-4 w-4 text-orange-600" />;
      case "Componentes":
        return <Settings className="h-4 w-4 text-purple-600" />;
      default:
        return <Package className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStockStatus = (stock: number, minStock: number) => {
    if (stock === 0) {
      return <span className="text-red-600 font-medium">Sem estoque</span>;
    } else if (stock <= minStock) {
      return <span className="text-yellow-600 font-medium">Estoque baixo</span>;
    } else {
      return <span className="text-green-600 font-medium">Em estoque</span>;
    }
  };

  // Cálculos de estatísticas
  const totalProducts = products.length;
  const activeProducts = products.filter(p => p.status === "Ativo").length;
  const totalRevenue = products.reduce((sum, product) => sum + product.sales.revenue, 0);
  const averageMargin = products.reduce((sum, product) => sum + product.margin, 0) / products.length;
  const lowStockProducts = products.filter(p => p.stock <= p.minStock).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Gestão de Produtos</h2>
              <p className="text-gray-600">Gerencie catálogo, preços e disponibilidade dos produtos</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline">
                <Upload className="h-4 w-4 mr-2" />
                Importar CSV
              </Button>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Exportar Catálogo
              </Button>
              <Button className="bg-solar-600 hover:bg-solar-700">
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalProducts}</div>
                <p className="text-xs text-muted-foreground">
                  No catálogo
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Produtos Ativos</CardTitle>
                <Check className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{activeProducts}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((activeProducts / totalProducts) * 100)}% do catálogo
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Receita Total</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{formatCurrency(totalRevenue)}</div>
                <p className="text-xs text-muted-foreground">
                  Total vendido
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Margem Média</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{averageMargin.toFixed(1)}%</div>
                <p className="text-xs text-muted-foreground">
                  Rentabilidade
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Estoque Baixo</CardTitle>
                <AlertTriangle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">{lowStockProducts}</div>
                <p className="text-xs text-muted-foreground">
                  Requer atenção
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                  Mais Vendidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Painel 540W</span>
                    <span className="text-sm font-medium">456 vendas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kit 5kWp</span>
                    <span className="text-sm font-medium">234 vendas</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kit 10kWp</span>
                    <span className="text-sm font-medium">156 vendas</span>
                  </div>
                </div>
                <Button variant="outline" className="mt-3 w-full">Ver Relatório</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2 text-yellow-600" />
                  Estoque Crítico
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Bateria 10kWh</span>
                    <span className="text-sm font-medium text-red-600">8 unidades</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kit Rural 15kWp</span>
                    <span className="text-sm font-medium text-yellow-600">12 unidades</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Kit 10kWp</span>
                    <span className="text-sm font-medium text-yellow-600">28 unidades</span>
                  </div>
                </div>
                <Button className="mt-3 w-full">Reabastecer</Button>
              </CardContent>
            </Card>

            <Card className="cursor-pointer hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg flex items-center">
                  <Link className="h-5 w-5 mr-2 text-blue-600" />
                  Links de Afiliados
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {products.reduce((sum, product) => sum + product.sales.total, 0)}
                </div>
                <p className="text-sm text-gray-600">
                  Total de vendas via afiliados
                </p>
                <Button variant="outline" className="mt-3 w-full">Gerar Links</Button>
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
                    placeholder="Buscar por nome, ID, marca ou descrição..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-80"
                  />
                </div>
                <select 
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todos">Todas as Categorias</option>
                  <option value="Residencial">Residencial</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Rural">Rural</option>
                  <option value="Componentes">Componentes</option>
                </select>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="todos">Todos os Status</option>
                  <option value="Ativo">Ativo</option>
                  <option value="Pré-venda">Pré-venda</option>
                  <option value="Inativo">Inativo</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Products List */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Catálogo de Produtos ({filteredProducts.length})</CardTitle>
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
                        Produto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoria
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Preço
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Margem
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Estoque
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Vendas
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Comissões
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
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-16 w-16">
                              <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                                <Image className="h-8 w-8 text-gray-400" />
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{product.name}</div>
                              <div className="text-sm text-gray-500">ID: {product.id}</div>
                              <div className="text-sm text-gray-500">{product.brand}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            {getCategoryIcon(product.category)}
                            <div className="ml-2">
                              <div className="text-sm font-medium text-gray-900">{product.category}</div>
                              <div className="text-sm text-gray-500">{product.subcategory}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-bold text-gray-900">{formatCurrency(product.price)}</div>
                            <div className="text-sm text-gray-500">Custo: {formatCurrency(product.cost)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{product.margin.toFixed(1)}%</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.stock} unidades</div>
                            <div className="text-sm">
                              {getStockStatus(product.stock, product.minStock)}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{product.sales.total} total</div>
                            <div className="text-sm text-gray-500">{product.sales.thisMonth} este mês</div>
                            <div className="text-sm text-gray-500">{formatCurrency(product.sales.revenue)}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="space-y-1">
                            <div>Light: {product.commission.light}%</div>
                            <div>Advanced: {product.commission.advanced}%</div>
                            <div>Premium: {product.commission.premium}%</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(product.status)}
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
                            <Button variant="outline" size="sm">
                              <Link className="h-4 w-4 mr-1" />
                              Links
                            </Button>
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
