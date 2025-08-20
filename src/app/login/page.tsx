"use client";

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Zap, Eye, EyeOff, Loader2, Sun, Users, TrendingUp, Shield, Star } from 'lucide-react';
import Logo from '@/components/Logo';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email ou senha incorretos');
        return;
      }

      // Aguardar um pouco para a sessão ser atualizada e recarregar
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Verificar sessão atualizada e redirecionar baseado no tipo de usuário
      const session = await getSession();
      console.log('📋 Sessão após login:', session?.user);
      
      if (session?.user?.isAdmin) {
        console.log('🔄 Redirecionando admin para /admin/dashboard');
        window.location.href = '/admin/dashboard';
      } else {
        console.log('🔄 Redirecionando afiliado para /dashboard');
        window.location.href = '/dashboard';
      }
      
    } catch (error) {
      console.error('Erro no login:', error);
      setError('Erro interno. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Background decorativo com partículas animadas */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute -bottom-32 left-40 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:50px_50px]"></div>

      {/* Floating elements */}
      <div className="absolute top-10 left-10 animate-float">
        <Sun className="w-8 h-8 text-yellow-400 opacity-60" />
      </div>
      <div className="absolute top-32 right-16 animate-float animation-delay-2000">
        <Zap className="w-6 h-6 text-blue-400 opacity-60" />
      </div>
      <div className="absolute bottom-32 left-16 animate-float animation-delay-4000">
        <Star className="w-5 h-5 text-pink-400 opacity-60" />
      </div>

      <div className="relative min-h-screen flex">
        {/* Painel esquerdo - Informações */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12 text-white">
          <div className="max-w-md">
            <div className="flex items-center space-x-3 mb-8">
              <Logo width={48} height={48} />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Graus Solar
              </h1>
            </div>
            
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Bem-vindo ao futuro da 
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent"> energia limpa</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Junte-se a centenas de afiliados que já estão transformando o mercado de energia solar no Brasil
            </p>

            {/* Features */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">Comissões de até 5%</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">Suporte especializado</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span className="text-gray-300">Materiais exclusivos</span>
              </div>
            </div>
          </div>
        </div>

        {/* Painel direito - Formulário */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Header mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className="flex justify-center items-center space-x-3 mb-4">
                <Logo width={40} height={40} />
                <h1 className="text-3xl font-bold text-white">Graus Solar</h1>
              </div>
              <p className="text-gray-300">Entre na sua conta</p>
            </div>

            {/* Card do formulário */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">
                  Acesse sua conta
                </h2>
                <p className="text-gray-300">
                  Entre e comece a ganhar hoje mesmo
                </p>
              </div>

              <form className="space-y-6" onSubmit={handleSubmit}>
                {error && (
                  <div className="bg-red-500/10 backdrop-blur border border-red-500/20 rounded-lg p-4">
                    <p className="text-sm text-red-200 text-center">{error}</p>
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-2">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                      placeholder="seu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-2">
                      Senha
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full px-4 py-3 pr-12 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-200"
                        placeholder="Sua senha"
                      />
                      <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-white transition-colors"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-end">
                  <Link 
                    href="/esqueci-senha" 
                    className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    Esqueceu sua senha?
                  </Link>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none transition-all duration-200"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin h-5 w-5 mr-2 inline" />
                      Entrando...
                    </>
                  ) : (
                    'Entrar'
                  )}
                </button>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/20" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-transparent text-gray-300">Novo por aqui?</span>
                  </div>
                </div>

                {/* Cadastro */}
                <Link
                  href="/cadastro"
                  className="w-full py-3 px-4 bg-white/10 backdrop-blur hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 hover:border-white/30 shadow-lg hover:shadow-xl transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all duration-200 text-center block"
                >
                  Criar conta de afiliado
                </Link>
              </form>
            </div>

            {/* Footer */}
            <p className="text-center text-gray-400 text-sm mt-8">
              © 2025 Graus Solar. Transformando o Brasil com energia limpa.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
