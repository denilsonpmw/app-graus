"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { 
  Zap, 
  BarChart3,
  Link2, 
  DollarSign, 
  Users,
  PlayCircle,
  FileText,
  MessageCircle,
  Settings,
  LogOut
} from "lucide-react";

interface MenuItem {
  href: string;
  icon: React.ComponentType<any>;
  label: string;
  tab?: string;
  onClick?: () => void;
}

interface MenuSection {
  section: string;
  items: MenuItem[];
}

interface SidebarProps {
  className?: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export default function Sidebar({ className = "", activeTab, onTabChange }: SidebarProps) {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === '/' || pathname === '/dashboard';
    }
    return pathname === path || pathname.startsWith(path);
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' });
  };

  const menuItems: MenuSection[] = [
    {
      section: "MENU PRINCIPAL",
      items: [
        { href: "/dashboard", icon: BarChart3, label: "Dashboard" },
        { href: "/links", icon: Link2, label: "Meus Links" },
        { href: "/comissoes", icon: DollarSign, label: "Comissões" },
        { href: "/clientes", icon: Users, label: "Clientes" }
      ]
    },
    {
      section: "ÁREA EXCLUSIVA", 
      items: [
        { href: "/area-exclusiva?tab=treinamentos", icon: PlayCircle, label: "Treinamentos", tab: "treinamentos" },
        { href: "/area-exclusiva?tab=materiais", icon: FileText, label: "Materiais", tab: "materiais" },
        { href: "/area-exclusiva?tab=suporte", icon: MessageCircle, label: "Suporte", tab: "suporte" }
      ]
    },
    {
      section: "CONTA",
      items: [
        { href: "/configuracoes", icon: Settings, label: "Configurações" },
        { href: "#", icon: LogOut, label: "Sair", onClick: handleLogout }
      ]
    }
  ];

  const isAreaExclusiva = pathname === '/area-exclusiva';

  return (
    <div className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg z-50 ${className}`}>
      <div className="flex items-center space-x-2 p-6 border-b">
        <Zap className="h-8 w-8 text-solar-600" />
        <h1 className="text-xl font-bold text-gray-900">Graus Solar</h1>
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
                // Se item tem função onClick (como logout)
                if (item.onClick) {
                  e.preventDefault();
                  item.onClick();
                  return;
                }

                if (isAreaExclusiva && item.tab && onTabChange) {
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
