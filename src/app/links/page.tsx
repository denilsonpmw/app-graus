'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { 
  Link2, 
  Copy, 
  Plus,
  Eye,
  TrendingUp,
  Share2,
  Search,
  Filter,
  MoreVertical,
  MessageCircle,
  BarChart3,
  ExternalLink,
  Calendar,
  Target
} from "lucide-react";

interface AffiliateLink {
  id: string;
  customSlug: string | null;
  isPrimary: boolean;
  clicksCount: number;
  conversionsCount: number;
  campaignName: string | null;
  createdAt: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
}

interface AffiliateStats {
  totalClicks: number;
  totalConversions: number;
  conversionRate: number;
  totalCommissions: number;
  linksCount: number;
}

export default function LinksPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState<AffiliateLink[]>([]);
  const [stats, setStats] = useState<AffiliateStats>({
    totalClicks: 0,
    totalConversions: 0,
    conversionRate: 0,
    totalCommissions: 0,
    linksCount: 0
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'primary' | 'custom'>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Estados para produtos e tipos de link
  const [products, setProducts] = useState<any[]>([]);
  const [linkType, setLinkType] = useState<'campaign' | 'product'>('campaign');

  // Form state para criar novo link
  const [newLink, setNewLink] = useState({
    productId: '',
    customSlug: '',
    campaignName: '',
    utmSource: '',
    utmMedium: '',
    utmCampaign: ''
  });

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push('/login');
      return;
    }

    // Se for admin, permitir acesso mas redirecionar para dashboard admin
    if (session.user?.isAdmin) {
      router.push('/admin/dashboard');
      return;
    }

    // Para usuários afiliados normais, permitir acesso
    setIsLoading(false);
    fetchLinks();
    fetchStats();
    fetchProducts();
  }, [session, status, router]);

  const fetchLinks = async () => {
    try {
      const response = await fetch('/api/affiliate-links');
      if (response.ok) {
        const data = await response.json();
        setLinks(data.links || []);
      }
    } catch (error) {
      console.error('Erro ao buscar links:', error);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/affiliate-links/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const handleLinkTypeChange = (type: 'campaign' | 'product') => {
    setLinkType(type);
    // Limpar campos específicos quando trocar de tipo
    if (type === 'campaign') {
      setNewLink(prev => ({ ...prev, productId: '' }));
    } else {
      setNewLink(prev => ({ 
        ...prev, 
        campaignName: '', 
        utmSource: '', 
        utmMedium: '', 
        utmCampaign: '' 
      }));
    }
  };

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Preparar dados baseado no tipo de link
      const linkData = {
        customSlug: newLink.customSlug || undefined,
        campaignName: newLink.campaignName || undefined,
        utmSource: newLink.utmSource || undefined,
        utmMedium: newLink.utmMedium || undefined,
        utmCampaign: newLink.utmCampaign || undefined,
        ...(linkType === 'product' && newLink.productId && { productId: newLink.productId })
      };

      const response = await fetch('/api/affiliate-links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(linkData),
      });

      if (response.ok) {
        await fetchLinks();
        await fetchStats();
        setIsModalOpen(false);
        setNewLink({
          productId: '',
          customSlug: '',
          campaignName: '',
          utmSource: '',
          utmMedium: '',
          utmCampaign: ''
        });
        setLinkType('campaign');
      } else {
        const error = await response.json();
        alert(error.error || 'Erro ao criar link');
      }
    } catch (error) {
      console.error('Erro ao criar link:', error);
      alert('Erro ao criar link');
    }
  };

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const generateLinkUrl = (link: AffiliateLink) => {
    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
    const affiliateCode = session?.user?.affiliateCode || 'DEMO123';
    
    if (link.isPrimary) {
      return `${baseUrl}/ref/${affiliateCode}`;
    } else {
      return `${baseUrl}/ref/${affiliateCode}/${link.customSlug}`;
    }
  };

  const shareOnWhatsApp = (link: AffiliateLink) => {
    const url = generateLinkUrl(link);
    const message = encodeURIComponent(`🌞 Descubra como economizar até 95% na conta de luz com energia solar! \n\n${url}\n\n✅ Financiamento facilitado\n✅ Instalação profissional\n✅ 25 anos de garantia\n\nClique no link e simule sua economia!`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const filteredLinks = links.filter(link => {
    const matchesSearch = link.campaignName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         link.customSlug?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'primary' && link.isPrimary) ||
                         (filterType === 'custom' && !link.isPrimary);
    
    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-solar-600"></div>
      </div>
    );
  }

  if (!session || session.user?.isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Meus Links de Afiliado</h2>
              <p className="text-gray-600">Gerencie seus links e acompanhe o desempenho</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total de Links</p>
                <p className="text-sm font-medium text-solar-600">{stats.linksCount}</p>
              </div>
              <Button 
                onClick={() => setIsModalOpen(true)}
                className="bg-solar-600 hover:bg-solar-700"
              >
                <Plus className="h-4 w-4 mr-2" />
                Criar Link
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total de Cliques</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{stats.totalClicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Visitantes únicos
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversões</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{stats.totalConversions}</div>
                <p className="text-xs text-muted-foreground">
                  Taxa: {stats.conversionRate.toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Comissões Geradas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">R$ {stats.totalCommissions.toFixed(2)}</div>
                <p className="text-xs text-muted-foreground">
                  Valor acumulado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Links Ativos</CardTitle>
                <Link2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{stats.linksCount}</div>
                <p className="text-xs text-muted-foreground">
                  Links criados
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Filter className="h-5 w-5 mr-2" />
                Filtros e Busca
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar por nome da campanha ou slug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent"
                  />
                </div>
                
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as 'all' | 'primary' | 'custom')}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent"
                >
                  <option value="all">Todos os Links</option>
                  <option value="primary">Link Principal</option>
                  <option value="custom">Links Personalizados</option>
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Links List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2" />
                Performance dos Links
              </CardTitle>
              <CardDescription>
                Acompanhe o desempenho de cada link de afiliado
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredLinks.length === 0 ? (
                <div className="text-center py-12">
                  <Link2 className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum link encontrado</h3>
                  <p className="text-gray-500 mb-4">
                    {searchTerm || filterType !== 'all' 
                      ? 'Tente ajustar os filtros de busca.' 
                      : 'Comece criando seu primeiro link de afiliado.'
                    }
                  </p>
                  {(!searchTerm && filterType === 'all') && (
                    <Button
                      onClick={() => setIsModalOpen(true)}
                      className="bg-solar-600 hover:bg-solar-700"
                    >
                      Criar Primeiro Link
                    </Button>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredLinks.map((link) => {
                    const linkUrl = generateLinkUrl(link);
                    const conversionRate = link.clicksCount > 0 ? (link.conversionsCount / link.clicksCount) * 100 : 0;
                    
                    return (
                      <div key={link.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="font-semibold text-gray-900">
                                {link.isPrimary ? 'Link Principal' : link.campaignName || link.customSlug}
                              </h3>
                              {link.isPrimary && (
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  Principal
                                </span>
                              )}
                            </div>
                            
                            <div className="flex items-center gap-2 mb-3">
                              <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono text-gray-700 flex-1 truncate">
                                {linkUrl}
                              </code>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => copyToClipboard(linkUrl, link.id)}
                                className={copiedId === link.id ? 'bg-green-50 border-green-200 text-green-700' : ''}
                              >
                                <Copy className="w-4 h-4" />
                                {copiedId === link.id ? 'Copiado!' : 'Copiar'}
                              </Button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <p className="text-gray-500">Cliques</p>
                                <p className="font-semibold text-blue-600">{link.clicksCount}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Conversões</p>
                                <p className="font-semibold text-green-600">{link.conversionsCount}</p>
                              </div>
                              <div>
                                <p className="text-gray-500">Taxa de Conversão</p>
                                <p className={`font-semibold ${
                                  conversionRate > 5 ? 'text-green-600' : 
                                  conversionRate > 2 ? 'text-yellow-600' : 'text-gray-600'
                                }`}>
                                  {conversionRate.toFixed(1)}%
                                </p>
                              </div>
                              <div>
                                <p className="text-gray-500">Criado em</p>
                                <p className="font-semibold text-gray-600">
                                  {new Date(link.createdAt).toLocaleDateString('pt-BR')}
                                </p>
                              </div>
                            </div>

                            {(link.utmSource || link.utmMedium || link.utmCampaign) && (
                              <div className="mt-3 pt-3 border-t border-gray-100">
                                <p className="text-xs text-gray-500 mb-1">Parâmetros UTM:</p>
                                <div className="flex gap-2 text-xs">
                                  {link.utmSource && <span className="bg-gray-100 px-2 py-1 rounded">Source: {link.utmSource}</span>}
                                  {link.utmMedium && <span className="bg-gray-100 px-2 py-1 rounded">Medium: {link.utmMedium}</span>}
                                  {link.utmCampaign && <span className="bg-gray-100 px-2 py-1 rounded">Campaign: {link.utmCampaign}</span>}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col gap-2 ml-4">
                            <Button
                              size="sm"
                              onClick={() => shareOnWhatsApp(link)}
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <MessageCircle className="w-4 h-4 mr-1" />
                              WhatsApp
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => window.open(linkUrl, '_blank')}
                            >
                              <ExternalLink className="w-4 h-4 mr-1" />
                              Testar
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Modal para criar novo link */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Criar Novo Link de Afiliado</h2>
            
            <form onSubmit={handleCreateLink} className="space-y-4">
              {/* Tipo de Link */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Link
                </label>
                <div className="flex gap-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="campaign"
                      checked={linkType === 'campaign'}
                      onChange={(e) => handleLinkTypeChange(e.target.value as 'campaign' | 'product')}
                      className="mr-2"
                    />
                    Link de Campanha (Genérico)
                  </label>
                  <label className="flex items-center">
                    <input
                      type="radio"
                      value="product"
                      checked={linkType === 'product'}
                      onChange={(e) => handleLinkTypeChange(e.target.value as 'campaign' | 'product')}
                      className="mr-2"
                    />
                    Link de Produto Específico
                  </label>
                </div>
              </div>

              {/* Seleção de Produto (apenas se for tipo produto) */}
              {linkType === 'product' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Produto *
                  </label>
                  <select
                    value={newLink.productId}
                    onChange={(e) => setNewLink({ ...newLink, productId: e.target.value })}
                    required={linkType === 'product'}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent"
                  >
                    <option value="">Selecione um produto</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name} - R$ {product.price.toFixed(2)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Slug Personalizado (opcional)
                </label>
                <input
                  type="text"
                  value={newLink.customSlug}
                  onChange={(e) => setNewLink({ ...newLink, customSlug: e.target.value })}
                  placeholder={linkType === 'product' ? "ex: kit10k" : "ex: promocao-natal"}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {linkType === 'product' 
                    ? "Crie um slug único para este produto" 
                    : "Deixe vazio para usar o link principal"
                  }
                </p>
              </div>

              {/* Campos de Campanha (apenas para tipo campanha) */}
              {linkType === 'campaign' && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome da Campanha
                    </label>
                    <input
                      type="text"
                      value={newLink.campaignName}
                      onChange={(e) => setNewLink({ ...newLink, campaignName: e.target.value })}
                      placeholder="ex: Promoção de Natal"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UTM Source
                      </label>
                      <input
                        type="text"
                        value={newLink.utmSource}
                        onChange={(e) => setNewLink({ ...newLink, utmSource: e.target.value })}
                        placeholder="facebook"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        UTM Medium
                      </label>
                      <input
                        type="text"
                        value={newLink.utmMedium}
                        onChange={(e) => setNewLink({ ...newLink, utmMedium: e.target.value })}
                        placeholder="social"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      UTM Campaign
                    </label>
                    <input
                      type="text"
                      value={newLink.utmCampaign}
                      onChange={(e) => setNewLink({ ...newLink, utmCampaign: e.target.value })}
                      placeholder="natal2024"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-solar-500 focus:border-transparent"
                    />
                  </div>
                </>
              )}

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-solar-600 hover:bg-solar-700"
                >
                  Criar Link
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
