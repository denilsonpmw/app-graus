"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, TrendingUp, Shield, Star, Zap, BarChart3, MessageCircle } from "lucide-react";

export default function HomePage() {
  const plans = [
    {
      name: "Light",
      price: "R$ 387,30",
      commission: "2%",
      description: "Ideal para iniciantes",
      features: [
        "Acesso aos recursos básicos",
        "Materiais de marketing essenciais",
        "Suporte técnico padrão",
        "Dashboard pessoal",
        "Link único de afiliado"
      ],
      highlight: false
    },
    {
      name: "Advanced",
      price: "R$ 597,30",
      commission: "3%",
      description: "Para afiliados experientes",
      features: [
        "Todos os recursos do Light",
        "Ferramentas avançadas de vendas",
        "Conteúdos exclusivos",
        "Suporte prioritário",
        "Relatórios detalhados",
        "Webinars exclusivos"
      ],
      highlight: true
    },
    {
      name: "Premium",
      price: "R$ 897,30",
      commission: "5%",
      description: "Alto desempenho",
      features: [
        "Todos os recursos do Advanced",
        "Suporte VIP 24/7",
        "Materiais exclusivos Premium",
        "Mentoria personalizada",
        "Acesso antecipado a novos produtos",
        "Eventos exclusivos"
      ],
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-solar-50 via-white to-green-50">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Zap className="h-8 w-8 text-solar-600" />
            <h1 className="text-2xl font-bold text-gray-900">Graus Solar</h1>
          </div>
          <nav className="hidden md:flex space-x-6">
            <a href="#planos" className="text-gray-600 hover:text-solar-600 transition-colors">Planos</a>
            <a href="#beneficios" className="text-gray-600 hover:text-solar-600 transition-colors">Benefícios</a>
            <a href="#como-funciona" className="text-gray-600 hover:text-solar-600 transition-colors">Como Funciona</a>
          </nav>
          <div className="space-x-2">
            <Button variant="outline">Login</Button>
            <Button className="bg-solar-600 hover:bg-solar-700">Cadastrar</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Seja um <span className="text-solar-600">Afiliado</span> de 
          <br />Energia Solar
        </h2>
        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
          Ganhe até <strong className="text-solar-600">5% de comissão</strong> vendendo kits de energia solar. 
          Acesso completo a materiais de marketing, treinamentos e suporte especializado.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-solar-600 hover:bg-solar-700 text-lg px-8 py-3">
            Começar Agora
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-3">
            Saiba Mais
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="text-3xl font-bold text-solar-600 mb-2">500+</div>
            <div className="text-gray-600">Afiliados Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-solar-600 mb-2">R$ 2M+</div>
            <div className="text-gray-600">Em Comissões Pagas</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-solar-600 mb-2">1.200+</div>
            <div className="text-gray-600">Vendas Realizadas</div>
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planos" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Escolha Seu Plano</h3>
          <p className="text-xl text-gray-600">Adesão anual com pagamento à vista no Pix ou cartão em até 12x</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <Card key={index} className={`relative ${plan.highlight ? 'ring-2 ring-solar-500 scale-105' : ''}`}>
              {plan.highlight && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-solar-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Mais Escolhido
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  <span className="text-gray-600">/ano</span>
                </div>
                <div className="text-solar-600 font-semibold text-lg">
                  Comissão: {plan.commission}
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button 
                  className={`w-full ${plan.highlight ? 'bg-solar-600 hover:bg-solar-700' : 'bg-gray-900 hover:bg-gray-800'}`}
                >
                  Escolher {plan.name}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-gray-900 mb-4">Por que ser um Afiliado?</h3>
            <p className="text-xl text-gray-600">Benefícios exclusivos para impulsionar suas vendas</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <TrendingUp className="h-12 w-12 text-solar-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Comissões Altas</h4>
              <p className="text-gray-600">Ganhe até 5% sobre cada venda efetivada com rastreamento preciso</p>
            </div>
            
            <div className="text-center p-6">
              <Users className="h-12 w-12 text-solar-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Suporte Completo</h4>
              <p className="text-gray-600">Equipe especializada para vendas, técnico e marketing</p>
            </div>

            <div className="text-center p-6">
              <Shield className="h-12 w-12 text-solar-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Materiais Exclusivos</h4>
              <p className="text-gray-600">Vídeos, PDFs, templates e conteúdo de alta qualidade</p>
            </div>

            <div className="text-center p-6">
              <BarChart3 className="h-12 w-12 text-solar-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Dashboard Avançado</h4>
              <p className="text-gray-600">Métricas, gráficos e relatórios em tempo real</p>
            </div>

            <div className="text-center p-6">
              <MessageCircle className="h-12 w-12 text-solar-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Grupo VIP</h4>
              <p className="text-gray-600">Acesso obrigatório ao grupo de suporte exclusivo</p>
            </div>

            <div className="text-center p-6">
              <Star className="h-12 w-12 text-solar-600 mx-auto mb-4" />
              <h4 className="text-xl font-semibold mb-3">Treinamentos</h4>
              <p className="text-gray-600">Capacitação contínua e materiais atualizados</p>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold text-gray-900 mb-4">Como Funciona</h3>
          <p className="text-xl text-gray-600">Simples, rápido e eficiente</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-solar-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-solar-600">1</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Cadastre-se</h4>
            <p className="text-gray-600">Escolha seu plano e faça o pagamento</p>
          </div>

          <div className="text-center">
            <div className="bg-solar-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-solar-600">2</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Receba seu Link</h4>
            <p className="text-gray-600">Link único para rastrear suas indicações</p>
          </div>

          <div className="text-center">
            <div className="bg-solar-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-solar-600">3</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Compartilhe</h4>
            <p className="text-gray-600">Envie via WhatsApp e redes sociais</p>
          </div>

          <div className="text-center">
            <div className="bg-solar-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl font-bold text-solar-600">4</span>
            </div>
            <h4 className="text-lg font-semibold mb-2">Ganhe Comissão</h4>
            <p className="text-gray-600">Receba quando a venda for efetivada</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-solar-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-4">Pronto para Começar?</h3>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a centenas de afiliados que já estão ganhando com energia solar
          </p>
          <Button size="lg" variant="secondary" className="bg-white text-solar-600 hover:bg-gray-100 text-lg px-8 py-3">
            Cadastrar Agora
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Zap className="h-6 w-6 text-solar-500" />
                <span className="text-xl font-bold">Graus Solar</span>
              </div>
              <p className="text-gray-400">
                A melhor plataforma de afiliação para energia solar do Brasil.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Produto</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Planos</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Benefícios</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Como Funciona</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Suporte</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Graus Solar. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
