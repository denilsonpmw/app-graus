"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Sidebar from "@/components/Sidebar";
import { 
  DollarSign, 
  Users, 
  TrendingUp, 
  Copy, 
  Eye,
  Calendar,
  Download,
  Link2,
  MessageCircle,
  PlayCircle,
  BarChart3
} from "lucide-react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (!session) {
      router.push("/login");
      return;
    }

    // Se for admin, redirecionar para dashboard admin
    if (session.user.isAdmin) {
      router.push("/admin/dashboard");
      return;
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-solar-600"></div>
      </div>
    );
  }

  if (!session || session.user.isAdmin) {
    return null;
  }
  
  // Dados do afiliado logado
  const affiliateData = {
    name: session.user.name || "Afiliado",
    plan: session.user.plan || "Light",
    affiliateId: "GS001234",
    commission: session.user.plan === "PREMIUM" ? "5%" : session.user.plan === "ADVANCED" ? "3%" : "2%",
    balance: "R$ 2.847,50",
    totalSales: "R$ 94.916,67",
    clicks: 1250,
    conversions: 12,
    conversionRate: "0.96%",
    pendingCommissions: "R$ 1.234,50",
    joinDate: "15/03/2024"
  };

  const affiliateLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://graussolar.com.br'}/ref/${affiliateData.affiliateId}`;

  const recentSales = [
    { id: 1, client: "Maria Santos", product: "Kit Solar 5kW", value: "R$ 18.500,00", commission: "R$ 555,00", status: "Pago", date: "20/01/2025" },
    { id: 2, client: "Pedro Oliveira", product: "Kit Solar 3kW", value: "R$ 12.900,00", commission: "R$ 387,00", status: "Pendente", date: "18/01/2025" },
    { id: 3, client: "Ana Costa", product: "Kit Solar 8kW", value: "R$ 28.400,00", commission: "R$ 852,00", status: "Pago", date: "15/01/2025" },
    { id: 4, client: "Carlos Lima", product: "Kit Solar 2kW", value: "R$ 8.900,00", commission: "R$ 267,00", status: "Processando", date: "12/01/2025" }
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(affiliateLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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
              <h2 className="text-2xl font-bold text-gray-900">Dashboard</h2>
              <p className="text-gray-600">Bem-vindo de volta, {affiliateData.name}!</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Plano {affiliateData.plan}</p>
                <p className="text-sm font-medium text-solar-600">Comissão: {affiliateData.commission}</p>
              </div>
              <Button className="bg-solar-600 hover:bg-solar-700">
                <MessageCircle className="h-4 w-4 mr-2" />
                Grupo VIP
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
                <CardTitle className="text-sm font-medium">Saldo Disponível</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{affiliateData.balance}</div>
                <p className="text-xs text-muted-foreground">
                  +12% em relação ao mês passado
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total em Vendas</CardTitle>
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{affiliateData.totalSales}</div>
                <p className="text-xs text-muted-foreground">
                  Desde {affiliateData.joinDate}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Cliques no Link</CardTitle>
                <Eye className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{affiliateData.clicks.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground">
                  Taxa de conversão: {affiliateData.conversionRate}
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Conversões</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{affiliateData.conversions}</div>
                <p className="text-xs text-muted-foreground">
                  Pendente: {affiliateData.pendingCommissions}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Affiliate Link Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Link2 className="h-5 w-5 mr-2" />
                Seu Link de Afiliado
              </CardTitle>
              <CardDescription>
                Compartilhe este link para rastrear suas indicações
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={affiliateLink}
                  readOnly
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
                />
                <Button onClick={copyToClipboard} variant="outline">
                  <Copy className="h-4 w-4 mr-2" />
                  {copiedLink ? "Copiado!" : "Copiar"}
                </Button>
                <Button className="bg-green-600 hover:bg-green-700">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                ID do Afiliado: <code className="bg-gray-100 px-2 py-1 rounded">{affiliateData.affiliateId}</code>
              </p>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Recent Sales */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Vendas Recentes</CardTitle>
                  <CardDescription>
                    Suas últimas indicações convertidas
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentSales.map((sale) => (
                      <div key={sale.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{sale.client}</p>
                          <p className="text-sm text-gray-500">{sale.product}</p>
                          <p className="text-xs text-gray-400">{sale.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{sale.value}</p>
                          <p className="text-sm text-green-600">{sale.commission}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            sale.status === 'Pago' ? 'bg-green-100 text-green-800' :
                            sale.status === 'Pendente' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-blue-100 text-blue-800'
                          }`}>
                            {sale.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    Ver Todas as Vendas
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Ações Rápidas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full justify-start" variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Baixar Materiais
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <PlayCircle className="h-4 w-4 mr-2" />
                    Ver Treinamentos
                  </Button>
                  <Button className="w-full justify-start" variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Relatório Mensal
                  </Button>
                  <Button className="w-full justify-start bg-green-600 hover:bg-green-700 text-white">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Suporte WhatsApp
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Meta do Mês</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progresso</span>
                      <span>8/15 vendas</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-solar-600 h-2 rounded-full" style={{ width: '53%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500">
                      Faltam 7 vendas para atingir a meta e ganhar bônus de R$ 500!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
