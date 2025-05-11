
import React from 'react';
import { Heart, Gift, Ticket, User, Upload, File, LogOut } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type DashboardSidebarProps = {
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

const DashboardSidebar = ({ activeTab, setActiveTab }: DashboardSidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Para uma implementação simples sem backend, apenas remove os dados do localStorage
    localStorage.removeItem('user');
    navigate('/');
  };

  const menuItems = [
    { id: 'reservations', icon: File, label: 'Minhas Reservas' },
    { id: 'wishlist', icon: Heart, label: 'Lista de Desejos' },
    { id: 'referral', icon: Gift, label: 'Indique e Ganhe' },
    { id: 'vouchers', icon: Ticket, label: 'Vouchers' },
    { id: 'profile', icon: User, label: 'Perfil' },
    { id: 'documents', icon: Upload, label: 'Documentos' },
  ];

  return (
    <div className="w-full md:w-64 md:min-w-64 mb-6 md:mb-0">
      <div className="p-4 border rounded-lg mb-4 flex flex-col items-center">
        <Avatar className="w-20 h-20 mb-3">
          <AvatarImage src="https://i.pravatar.cc/150?u=user" alt="Foto do usuário" />
          <AvatarFallback>JS</AvatarFallback>
        </Avatar>
        <h3 className="font-medium text-lg">Samuel Santos</h3>
        <p className="text-sm text-gray-500">samuel.santos@exemplo.com</p>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <nav className="flex flex-col">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3 text-sm transition-colors",
                activeTab === item.id 
                  ? "bg-primary/10 text-primary border-l-2 border-primary" 
                  : "hover:bg-gray-100"
              )}
              onClick={() => setActiveTab(item.id)}
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </button>
          ))}
          
          <button
            className="flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors border-t"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            <span>Sair</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default DashboardSidebar;
