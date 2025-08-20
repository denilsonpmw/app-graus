"use client";

import { CheckCircle, Users, TrendingUp, Shield, Star, Zap, BarChart3, MessageCircle } from "lucide-react";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import GradientButton from "@/components/ui/GradientButton";
import GradientText from "@/components/ui/GradientText";
import ModernCard from "@/components/ui/ModernCard";
import StatsCard from "@/components/ui/StatsCard";

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
    <div className="min-h-screen bg-gradient-to-br from-[#00445d] via-[#00a9ec] to-[#00445d] relative overflow-hidden">
      <AnimatedBackground variant="primary" showParticles={true} showGrid={true}>
        <div className="relative z-10">
          {/* Header */}
          <header className="bg-white/10 backdrop-blur-lg border-b border-white/20">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 rounded-xl bg-gradient-to-r from-[#00a9ec]/20 to-[#ffcc00]/20 backdrop-blur-sm border border-[#00a9ec]/30">
                    <Zap className="w-8 h-8 text-[#00a9ec]" />
                  </div>
                  <GradientText variant="primary" className="text-2xl font-bold">
                    Graus Solar
                  </GradientText>
                </div>
                <nav className="hidden md:flex space-x-8">
                  <a href="#planos" className="text-white/80 hover:text-white transition-all duration-200 font-medium">Planos</a>
                  <a href="#beneficios" className="text-white/80 hover:text-white transition-all duration-200 font-medium">Benefícios</a>
                  <a href="#como-funciona" className="text-white/80 hover:text-white transition-all duration-200 font-medium">Como Funciona</a>
                </nav>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => window.location.href = `/login?callbackUrl=${encodeURIComponent('/dashboard')}`}
                    className="text-white/80 hover:text-white px-4 py-2 rounded-lg transition-all duration-200 font-medium"
                  >
                    Login
                  </button>
                  <GradientButton
                    variant="primary"
                    size="md"
                    onClick={() => window.location.href = '/cadastro'}
                  >
                    Cadastrar
                  </GradientButton>
                </div>
              </div>
            </div>
          </header>

          {/* Hero Section */}
          <section className="container mx-auto px-4 py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-6xl md:text-7xl font-bold mb-6">
                Seja um{" "}
                <GradientText variant="primary" className="inline-block">
                  Afiliado
                </GradientText>{" "}
                de<br />
                Energia Solar
              </h2>
              <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-3xl mx-auto leading-relaxed">
                Ganhe até{" "}
                <GradientText variant="secondary" className="font-bold inline-block">
                  5% de comissão
                </GradientText>{" "}
                vendendo kits de energia solar. 
                Acesso completo a materiais de marketing, treinamentos e suporte especializado.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
                <GradientButton
                  size="lg"
                  variant="primary"
                  onClick={() => window.location.href = '/cadastro'}
                  className="text-lg px-12 py-4"
                >
                  Começar Agora
                </GradientButton>
                <GradientButton
                  size="lg"
                  variant="secondary"
                  className="text-lg px-12 py-4"
                >
                  Saiba Mais
                </GradientButton>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <StatsCard
                title="Afiliados Ativos"
                value="500+"
                icon={Users}
                variant="glass"
                color="blue"
              />
              <StatsCard
                title="Comissões Pagas"
                value="R$ 2M+"
                icon={TrendingUp}
                variant="glass"
                color="yellow"
              />
              <StatsCard
                title="Vendas Realizadas"
                value="1.200+"
                icon={BarChart3}
                variant="glass"
                color="blue"
              />
            </div>
          </section>

          {/* Plans Section */}
          <section id="planos" className="container mx-auto px-4 py-20">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-bold text-white mb-6">
                Escolha Seu{" "}
                <span className="text-[#ffcc00] drop-shadow-lg">
                  Plano
                </span>
              </h3>
              <p className="text-xl text-white/80">
                Adesão anual com pagamento à vista no Pix ou cartão em até 12x
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <ModernCard
                  key={index}
                  variant="glass"
                  className={`relative p-8 ${plan.highlight ? 'scale-105 border-2 border-blue-500/50' : ''}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                        Mais Escolhido
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <h4 className="text-3xl font-bold text-white mb-2">{plan.name}</h4>
                    <p className="text-white/70 mb-6">{plan.description}</p>
                    <div className="mb-4">
                      <span className="text-5xl font-bold text-[#ffcc00] drop-shadow-lg">
                        {plan.price}
                      </span>
                      <span className="text-white/60 text-lg">/ano</span>
                    </div>
                    <div className="inline-flex items-center px-4 py-2 bg-green-500/20 rounded-full border border-green-500/30">
                      <span className="text-green-400 font-semibold text-lg">
                        Comissão: {plan.commission}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0" />
                        <span className="text-white/80">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <GradientButton
                    variant={plan.highlight ? "primary" : "secondary"}
                    size="lg"
                    className="w-full"
                    onClick={() => window.location.href = `/cadastro?plan=${plan.name.toLowerCase()}`}
                  >
                    Escolher {plan.name}
                  </GradientButton>
                </ModernCard>
              ))}
            </div>
          </section>

          {/* Benefits Section */}
          <section id="beneficios" className="bg-black/20 backdrop-blur-sm py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h3 className="text-5xl font-bold text-white mb-6">
                  Por que ser um{" "}
                  <span className="text-[#ffcc00] drop-shadow-lg">
                    Afiliado
                  </span>
                  ?
                </h3>
                <p className="text-xl text-white/80">
                  Benefícios exclusivos para impulsionar suas vendas
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                  <div className="p-4 rounded-2xl bg-blue-500/20 w-fit mx-auto mb-6">
                    <TrendingUp className="h-12 w-12 text-blue-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Comissões Altas</h4>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Ganhe até 5% sobre cada venda efetivada com rastreamento preciso
                  </p>
                </ModernCard>
                
                <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                  <div className="p-4 rounded-2xl bg-green-500/20 w-fit mx-auto mb-6">
                    <Users className="h-12 w-12 text-green-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Suporte Completo</h4>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Equipe especializada para vendas, técnico e marketing
                  </p>
                </ModernCard>

                <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                  <div className="p-4 rounded-2xl bg-purple-500/20 w-fit mx-auto mb-6">
                    <Shield className="h-12 w-12 text-purple-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Materiais Exclusivos</h4>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Vídeos, PDFs, templates e conteúdo de alta qualidade
                  </p>
                </ModernCard>

                <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                  <div className="p-4 rounded-2xl bg-yellow-500/20 w-fit mx-auto mb-6">
                    <BarChart3 className="h-12 w-12 text-yellow-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Dashboard Avançado</h4>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Métricas, gráficos e relatórios em tempo real
                  </p>
                </ModernCard>

                <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                  <div className="p-4 rounded-2xl bg-pink-500/20 w-fit mx-auto mb-6">
                    <MessageCircle className="h-12 w-12 text-pink-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Grupo VIP</h4>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Acesso obrigatório ao grupo de suporte exclusivo
                  </p>
                </ModernCard>

                <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                  <div className="p-4 rounded-2xl bg-indigo-500/20 w-fit mx-auto mb-6">
                    <Star className="h-12 w-12 text-indigo-400" />
                  </div>
                  <h4 className="text-2xl font-bold text-white mb-4">Treinamentos</h4>
                  <p className="text-white/70 text-lg leading-relaxed">
                    Capacitação contínua e materiais atualizados
                  </p>
                </ModernCard>
              </div>
            </div>
          </section>

          {/* How it Works */}
          <section id="como-funciona" className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-5xl font-bold text-white mb-6">
            <span className="text-[#00a9ec] drop-shadow-lg">
              Como
            </span>{" "}
            Funciona
          </h3>
          <p className="text-xl text-white/80">Simples, rápido e eficiente</p>
        </div>            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-500/25">
                    <span className="text-3xl font-bold text-white">1</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full animate-pulse"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Cadastre-se</h4>
                <p className="text-white/70">Escolha seu plano e faça o pagamento</p>
              </ModernCard>

              <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-green-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-green-500/25">
                    <span className="text-3xl font-bold text-white">2</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-pink-400 to-red-500 rounded-full animate-bounce"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Receba seu Link</h4>
                <p className="text-white/70">Link único para rastrear suas indicações</p>
              </ModernCard>

              <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-purple-500/25">
                    <span className="text-3xl font-bold text-white">3</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-ping"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Compartilhe</h4>
                <p className="text-white/70">Envie via WhatsApp e redes sociais</p>
              </ModernCard>

              <ModernCard variant="glass" className="text-center p-8 hover:scale-105 transition-all duration-300">
                <div className="relative mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-yellow-500/25">
                    <span className="text-3xl font-bold text-white">4</span>
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-spin"></div>
                </div>
                <h4 className="text-xl font-bold text-white mb-3">Ganhe Comissão</h4>
                <p className="text-white/70">Receba quando a venda for efetivada</p>
              </ModernCard>
            </div>
          </section>

          {/* CTA Section */}
          <section className="bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm border-y border-white/20 py-20">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-5xl font-bold text-white mb-6">
                Pronto para{" "}
                <span className="text-[#ffcc00] drop-shadow-lg">
                  Começar
                </span>
                ?
              </h3>
              <p className="text-xl text-white/80 mb-12 max-w-2xl mx-auto">
                Junte-se a centenas de afiliados que já estão ganhando com energia solar
              </p>
              <GradientButton
                size="lg"
                variant="primary"
                className="text-xl px-16 py-6 shadow-2xl shadow-blue-500/25"
                onClick={() => window.location.href = '/cadastro'}
              >
                Cadastrar Agora
              </GradientButton>
            </div>
          </section>

      {/* Footer */}
      <footer className="bg-black/40 backdrop-blur-lg border-t border-white/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 rounded-xl bg-gradient-to-r from-[#00a9ec]/20 to-[#ffcc00]/20 border border-[#00a9ec]/30">
                  <Zap className="w-6 h-6 text-[#00a9ec]" />
                </div>
                <GradientText variant="primary" className="text-xl font-bold">
                  Graus Solar
                </GradientText>
              </div>
              <p className="text-white/70 text-lg leading-relaxed">
                A melhor plataforma de afiliação para energia solar do Brasil.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-6">Produto</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#planos" className="hover:text-white transition-colors duration-200">Planos</a></li>
                <li><a href="#beneficios" className="hover:text-white transition-colors duration-200">Benefícios</a></li>
                <li><a href="#como-funciona" className="hover:text-white transition-colors duration-200">Como Funciona</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-6">Suporte</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Central de Ajuda</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Contato</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">WhatsApp</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-6">Legal</h4>
              <ul className="space-y-3 text-white/70">
                <li><a href="#" className="hover:text-white transition-colors duration-200">Termos de Uso</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">Privacidade</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-200">LGPD</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-8 text-center">
            <p className="text-white/60 text-lg">
              &copy; 2025 Graus Solar. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
        </div>
      </AnimatedBackground>
    </div>
  );
}
