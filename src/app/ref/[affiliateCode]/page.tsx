"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Sun, 
  Zap, 
  DollarSign, 
  Shield, 
  Phone, 
  Mail, 
  CheckCircle,
  Calculator,
  Play,
  Star,
  Users,
  TrendingUp,
  Leaf,
  Home,
  Building
} from "lucide-react";

interface AffiliateData {
  id: string;
  name: string;
  email: string;
  phone: string;
  affiliateCode: string;
  subscriptionPlan: string;
}

export default function AffiliateLandingPage() {
  const params = useParams();
  const affiliateCode = params.affiliateCode as string;
  const customSlug = params.customSlug as string;
  
  const [affiliate, setAffiliate] = useState<AffiliateData | null>(null);
  const [valorConta, setValorConta] = useState("");
  const [cep, setCep] = useState("");
  const [economiaAnual, setEconomiaAnual] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const trackClick = async () => {
      try {
        // Registrar clique do link
        await fetch('/api/tracking/click', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            affiliateCode,
            customSlug,
            source: customSlug || 'direct_link',
            timestamp: new Date(),
            userAgent: navigator.userAgent,
            referer: document.referrer
          })
        });

        // Salvar no localStorage para tracking
        localStorage.setItem('affiliate_ref', affiliateCode);
        if (customSlug) {
          localStorage.setItem('campaign_ref', customSlug);
        }
        
        // Buscar dados do afiliado
        const response = await fetch(`/api/afiliados/${affiliateCode}/public`);
        if (response.ok) {
          const data = await response.json();
          setAffiliate(data);
        }
      } catch (error) {
        console.error('Erro ao rastrear clique:', error);
      } finally {
        setLoading(false);
      }
    };

    trackClick();
  }, [affiliateCode, customSlug]);

  const calcularEconomia = () => {
    const valor = parseFloat(valorConta.replace(',', '.'));
    if (valor > 0) {
      // Economia média de 90% na conta de luz
      const economiaMensal = valor * 0.9;
      const economiaAnualCalculada = economiaMensal * 12;
      setEconomiaAnual(economiaAnualCalculada);
    }
  };

  const depoimentos = [
    {
      nome: "Maria Silva",
      local: "São Paulo - SP",
      economia: "R$ 380",
      texto: "Minha conta de luz caiu de R$ 420 para R$ 40! Incrível o resultado da energia solar.",
      rating: 5
    },
    {
      nome: "João Santos",
      local: "Rio de Janeiro - RJ", 
      economia: "R$ 520",
      texto: "Melhor investimento que já fiz. Em 2 anos já quase quitei o sistema.",
      rating: 5
    },
    {
      nome: "Ana Costa",
      local: "Belo Horizonte - MG",
      economia: "R$ 290",
      texto: "Energia limpa e economia garantida. Recomendo para todos!",
      rating: 5
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <Zap className="h-12 w-12 text-solar-600 mx-auto mb-4 animate-pulse" />
          <p className="text-lg text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Sun className="h-8 w-8 text-solar-600" />
            <h1 className="text-2xl font-bold text-gray-900">Graus Solar</h1>
          </div>
          
          {affiliate && (
            <div className="text-sm text-gray-600 flex items-center space-x-2">
              <span>Consultor:</span>
              <span className="font-semibold text-solar-600">{affiliate.name}</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <div className="mb-6">
            <span className="inline-block bg-solar-100 text-solar-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              ⚡ Energia Solar Residencial e Comercial
            </span>
          </div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Economize até <span className="text-solar-600 relative">
              95%
              <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 120 12" fill="none">
                <path d="M2 10C20 2 40 2 60 6C80 10 100 6 118 10" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            </span> 
            <br />na sua conta de luz
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transforme sua casa ou empresa em uma fonte de economia sustentável com energia solar. 
            <strong> Simulação gratuita em 2 minutos!</strong>
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-solar-600 hover:bg-solar-700 text-white px-8 py-4 text-lg" onClick={calcularEconomia}>
              <Calculator className="h-5 w-5 mr-2" />
              Simular Economia Gratuita
            </Button>
            
            <Button size="lg" variant="outline" className="border-solar-600 text-solar-600 hover:bg-solar-50 px-8 py-4 text-lg">
              <Phone className="h-5 w-5 mr-2" />
              Falar com Especialista
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-solar-600">+2.500</div>
              <div className="text-sm text-gray-600">Clientes Atendidos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">25 anos</div>
              <div className="text-sm text-gray-600">Garantia Equipamentos</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">90%</div>
              <div className="text-sm text-gray-600">Economia Média</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">5 anos</div>
              <div className="text-sm text-gray-600">Retorno Investimento</div>
            </div>
          </div>

          {/* Video Preview */}
          <div className="relative max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl">
            <div className="aspect-video bg-gradient-to-r from-solar-600 to-green-600 flex items-center justify-center">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                <Play className="h-6 w-6 mr-2" />
                Como Funciona a Energia Solar
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Simulador de Economia */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Calcule sua economia agora
            </h2>
            <p className="text-xl text-gray-600">
              Descubra quanto você pode economizar com energia solar
            </p>
          </div>
          
          <Card className="p-8 shadow-xl">
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-left font-semibold mb-3 text-gray-700">
                    💡 Valor médio da sua conta de luz:
                  </label>
                  <Input
                    type="number"
                    placeholder="Ex: 250"
                    value={valorConta}
                    onChange={(e) => setValorConta(e.target.value)}
                    className="text-lg p-4 border-2 border-gray-200 focus:border-solar-600"
                  />
                </div>
                
                <div>
                  <label className="block text-left font-semibold mb-3 text-gray-700">
                    📍 Seu CEP:
                  </label>
                  <Input
                    type="text"
                    placeholder="Ex: 01234-567"
                    value={cep}
                    onChange={(e) => setCep(e.target.value)}
                    className="text-lg p-4 border-2 border-gray-200 focus:border-solar-600"
                  />
                </div>
              </div>
              
              <Button 
                size="lg" 
                className="mt-8 bg-gradient-to-r from-solar-600 to-green-600 hover:from-solar-700 hover:to-green-700 w-full text-lg py-4"
                onClick={calcularEconomia}
              >
                <Calculator className="h-5 w-5 mr-2" />
                Calcular Minha Economia
              </Button>

              {economiaAnual > 0 && (
                <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-solar-50 rounded-lg border-2 border-green-200">
                  <div className="text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      Sua Economia Anual:
                    </h3>
                    <div className="text-4xl font-bold text-green-600 mb-4">
                      R$ {economiaAnual.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                    <p className="text-gray-600 mb-4">
                      Com energia solar, você economiza <strong>R$ {(economiaAnual/12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</strong> por mês!
                    </p>
                    <Button className="bg-green-600 hover:bg-green-700 text-white">
                      Quero uma Proposta Gratuita
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Por que escolher energia solar?
            </h2>
            <p className="text-xl text-gray-600">
              Invista no futuro e comece a economizar hoje mesmo
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent>
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <DollarSign className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">💰 Economia Imediata</h3>
                <p className="text-gray-600">
                  Reduza sua conta de luz em até 95% já no primeiro mês após instalação.
                  Retorno do investimento em 3-5 anos.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent>
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">🛡️ 25 Anos de Garantia</h3>
                <p className="text-gray-600">
                  Equipamentos com garantia estendida e suporte técnico especializado.
                  Tecnologia comprovada mundialmente.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-8 shadow-lg hover:shadow-xl transition-shadow">
              <CardContent>
                <div className="bg-solar-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="h-10 w-10 text-solar-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4">🌱 100% Sustentável</h3>
                <p className="text-gray-600">
                  Contribua para um planeta mais limpo usando energia 100% renovável.
                  Reduza sua pegada de carbono.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              O que nossos clientes dizem
            </h2>
            <p className="text-xl text-gray-600">
              Mais de 2.500 famílias já economizam com energia solar
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {depoimentos.map((depoimento, index) => (
              <Card key={index} className="p-6 shadow-lg">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(depoimento.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 mb-4 italic">
                    "{depoimento.texto}"
                  </p>
                  <div className="border-t pt-4">
                    <div className="font-semibold text-gray-900">{depoimento.nome}</div>
                    <div className="text-sm text-gray-500">{depoimento.local}</div>
                    <div className="text-sm font-medium text-green-600">
                      Economia: {depoimento.economia}/mês
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Final */}
      <section className="py-20 bg-gradient-to-r from-solar-600 to-green-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Pronto para começar a economizar?
          </h2>
          
          <p className="text-xl text-solar-100 mb-8">
            Receba uma proposta personalizada sem compromisso
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button size="lg" className="bg-white text-solar-600 hover:bg-gray-100 px-8 py-4">
              <Phone className="h-5 w-5 mr-2" />
              Falar com Especialista
            </Button>
            
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-solar-600 px-8 py-4">
              <Mail className="h-5 w-5 mr-2" />
              Receber Proposta por Email
            </Button>
          </div>

          <div className="text-solar-100 text-sm">
            ⚡ Atendimento especializado • 🏆 Melhor custo-benefício • 🚀 Instalação rápida
          </div>
        </div>
      </section>

      {/* Footer com dados do afiliado */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          {affiliate && (
            <div className="text-center mb-8 p-6 bg-gray-800 rounded-lg">
              <h3 className="text-lg font-semibold mb-4 text-solar-400">
                👨‍💼 Seu consultor especialista:
              </h3>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-white">{affiliate.name}</p>
                <div className="flex items-center justify-center space-x-6 text-gray-300">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {affiliate.email}
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {affiliate.phone}
                  </div>
                </div>
                <p className="text-sm text-gray-400 mt-4">
                  🎓 Certificado em Energia Solar • ⭐ Especialista em soluções sustentáveis
                </p>
                <div className="inline-flex items-center px-3 py-1 bg-solar-600 text-white text-xs rounded-full mt-2">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Plano {affiliate.subscriptionPlan}
                </div>
              </div>
            </div>
          )}
          
          <div className="text-center border-t border-gray-700 pt-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Sun className="h-6 w-6 text-solar-600" />
              <span className="text-xl font-bold">Graus Solar</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2024 Graus Solar. Todos os direitos reservados. • Energia solar residencial e comercial
            </p>
            <div className="mt-4 text-xs text-gray-500">
              {customSlug && (
                <span>Campanha: {customSlug} • </span>
              )}
              Código do Consultor: {affiliateCode}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
