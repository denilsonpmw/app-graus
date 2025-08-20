"use client";

import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  Zap, 
  BarChart3,
  Users, 
  DollarSign, 
  Settings,
  PlayCircle,
  FileText,
  MessageCircle,
  UserCheck,
  TrendingUp,
  Package,
  LogOut,
  Shield
} from "lucide-react";
import Logo from "./Logo";

interface AdminSidebarProps {
  className?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

interface MenuItem {
  href: string;
  icon: any;
  label: string;
  tab?: string;
}

export default function AdminSidebar({ className = "", activeTab, onTabChange }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  
  const isActive = (path: string) => {
    if (path === '/admin/dashboard') {
      return pathname === '/admin' || pathname === '/admin/dashboard';
    }
    return pathname === path || pathname.startsWith(path);
  };

  const handleLogout = async () => {
    console.log('🔄 Iniciando logout (admin)...');
    try {
      await signOut({ callbackUrl: '/' });
      console.log('✅ Logout admin realizado com sucesso');
    } catch (error) {
      console.error('❌ Erro no logout admin:', error);
      console.log('🔄 Tentando logout manual...');
      // Fallback: limpar sessão manualmente e redirecionar
      document.cookie = 'next-auth.session-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      document.cookie = 'next-auth.csrf-token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      window.location.href = '/';
    }
  };

  const menuItems = [
    {
      section: "PAINEL ADMINISTRATIVO",
      items: [
        { href: "/admin/dashboard", icon: BarChart3, label: "Dashboard Geral" },
        { href: "/admin/afiliados", icon: Users, label: "Gestão de Afiliados" },
        { href: "/admin/vendas", icon: DollarSign, label: "Vendas & Comissões" },
        { href: "/admin/produtos", icon: Package, label: "Produtos" }
      ] as MenuItem[]
    },
    {
      section: "ÁREA EXCLUSIVA", 
      items: [
        { href: "/admin/area-exclusiva?tab=treinamentos", icon: PlayCircle, label: "Treinamentos", tab: "treinamentos" },
        { href: "/admin/area-exclusiva?tab=materiais", icon: FileText, label: "Materiais", tab: "materiais" },
        { href: "/admin/area-exclusiva?tab=suporte", icon: MessageCircle, label: "Suporte", tab: "suporte" }
      ] as MenuItem[]
    },
    {
      section: "ADMINISTRAÇÃO",
      items: [
        { href: "/admin/configuracoes", icon: Settings, label: "Configurações" },
        { href: "/admin/relatorios", icon: TrendingUp, label: "Relatórios" },
        { href: "#", icon: LogOut, label: "Sair" }
      ] as MenuItem[]
    }
  ];

  const isAreaExclusiva = pathname.startsWith('/admin/area-exclusiva');

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 ${className}`}>
      <div className="flex flex-col items-center p-6 border-b">
        <Logo className="mb-2" width={96} height={96} />
        <p className="text-sm font-semibold text-gray-700 flex items-center">
          <Shield className="h-4 w-4 mr-1" />
          Painel Admin
        </p>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((section, sectionIndex) => (
          <div key={sectionIndex}>
            <div className="px-6 mb-4 mt-8 first:mt-0">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                {section.section}
              </p>
            </div>
            
            {section.items.map((item, itemIndex) => {
              const Icon = item.icon;
              let active = false;
              
              if (isAreaExclusiva && item.tab) {
                // Para área exclusiva, usar activeTab prop
                active = activeTab === item.tab;
              } else {
                // Para outras páginas, usar pathname
                active = isActive(item.href.split('?')[0]);
              }
              
              const handleClick = (e: React.MouseEvent) => {
                if (item.label === "Sair") {
                  console.log('🖱️ Clique no logout admin');
                  e.preventDefault();
                  handleLogout();
                } else if (isAreaExclusiva && item.tab && onTabChange) {
                  e.preventDefault();
                  onTabChange(item.tab);
                  // Atualiza a URL com query sem reload
                  const base = '/admin/area-exclusiva';
                  const newUrl = `${base}?tab=${item.tab}`;
                  router.push(newUrl);
                }
              };
              
              const isLastItem = itemIndex === section.items.length - 1;
              
              return (
                <a
                  key={itemIndex}
                  href={item.href}
                  onClick={handleClick}
                  className={`flex items-center px-6 py-3 ${isLastItem ? 'mb-4' : ''} ${
                    active
                      ? "text-solar-600 bg-solar-50 border-r-2 border-solar-600"
                      : "text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.label}
                </a>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
}
