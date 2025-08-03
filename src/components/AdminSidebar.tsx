"use client";

import { usePathname } from "next/navigation";
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
  
  const isActive = (path: string) => {
    if (path === '/admin/dashboard') {
      return pathname === '/admin' || pathname === '/admin/dashboard';
    }
    return pathname === path || pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
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

  const isAreaExclusiva = pathname === '/admin/area-exclusiva';

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 ${className}`}>
      <div className="flex items-center space-x-2 p-6 border-b">
        <Zap className="h-8 w-8 text-solar-600" />
        <div>
          <h1 className="text-xl font-bold text-gray-900">Graus Solar</h1>
          <p className="text-xs text-gray-500 flex items-center">
            <Shield className="h-3 w-3 mr-1" />
            Painel Admin
          </p>
        </div>
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
                  e.preventDefault();
                  handleLogout();
                } else if (isAreaExclusiva && item.tab && onTabChange) {
                  e.preventDefault();
                  onTabChange(item.tab);
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
