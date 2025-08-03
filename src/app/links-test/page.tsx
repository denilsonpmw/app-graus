'use client';

import { useSession } from 'next-auth/react';

export default function LinksTestPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm border p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Debug da Sessão - Links
        </h1>
        
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h2 className="font-semibold text-blue-800">Status da Autenticação</h2>
            <p className="text-blue-700">Status: {status}</p>
          </div>

          {session ? (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h2 className="font-semibold text-green-800">✅ Dados da Sessão</h2>
              <div className="text-green-700 space-y-2">
                <p><strong>Email:</strong> {session.user?.email}</p>
                <p><strong>Nome:</strong> {session.user?.name}</p>
                <p><strong>ID:</strong> {session.user?.id}</p>
                <p><strong>Plano:</strong> {session.user?.plan}</p>
                <p><strong>É Admin:</strong> {session.user?.isAdmin ? 'Sim' : 'Não'}</p>
                <p><strong>Código Afiliado:</strong> {session.user?.affiliateCode || 'Não definido'}</p>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h2 className="font-semibold text-red-800">❌ Sem Sessão</h2>
              <p className="text-red-700">Usuário não está logado</p>
            </div>
          )}

          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <h2 className="font-semibold text-yellow-800">🔧 Debug Info</h2>
            <p className="text-yellow-700">
              Acesse esta página para verificar se a sessão está funcionando corretamente
              antes de tentar acessar a página principal de links.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
