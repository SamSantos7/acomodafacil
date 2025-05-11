
import React, { useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Plus, Edit, Trash2, User, Building, MapPin, Calendar } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';

const Admin = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  
  const handleDelete = (id: string, type: string) => {
    toast({
      title: "Item excluído",
      description: `${type} com ID ${id} foi removido com sucesso.`
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="text-2xl font-semibold text-secondary">Painel Administrativo</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <User size={16} className="mr-1" />
              Admin
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="accommodations" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="accommodations" className="flex gap-2 items-center">
              <Building size={16} />
              Acomodações
            </TabsTrigger>
            <TabsTrigger value="cities" className="flex gap-2 items-center">
              <MapPin size={16} />
              Cidades
            </TabsTrigger>
            <TabsTrigger value="users" className="flex gap-2 items-center">
              <User size={16} />
              Usuários
            </TabsTrigger>
            <TabsTrigger value="reservations" className="flex gap-2 items-center">
              <Calendar size={16} />
              Reservas
            </TabsTrigger>
          </TabsList>
          
          {/* Conteúdo das guias */}
          <TabsContent value="accommodations">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Gerenciar Acomodações</CardTitle>
                    <CardDescription>Adicione, edite ou remova acomodações do sistema</CardDescription>
                  </div>
                  <Button>
                    <Plus size={16} className="mr-1" />
                    Nova Acomodação
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input 
                      className="pl-10" 
                      placeholder="Buscar acomodações..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                </div>
                
                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cidade</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-sm">#A001</td>
                        <td className="py-3 px-4 text-sm">Student Housing Dublin</td>
                        <td className="py-3 px-4 text-sm">Dublin</td>
                        <td className="py-3 px-4 text-sm">Residência</td>
                        <td className="py-3 px-4 text-sm">€800/mês</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ativo</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete("A001", "Acomodação")}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-sm">#A002</td>
                        <td className="py-3 px-4 text-sm">Toronto Student Residence</td>
                        <td className="py-3 px-4 text-sm">Toronto</td>
                        <td className="py-3 px-4 text-sm">Apartamento</td>
                        <td className="py-3 px-4 text-sm">€950/mês</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ativo</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete("A002", "Acomodação")}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cities">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <CardTitle>Gerenciar Cidades</CardTitle>
                    <CardDescription>Adicione, edite ou remova cidades do sistema</CardDescription>
                  </div>
                  <Button>
                    <Plus size={16} className="mr-1" />
                    Nova Cidade
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input className="pl-10" placeholder="Buscar cidades..." />
                  </div>
                </div>
                
                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">País</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acomodações</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-sm">#C001</td>
                        <td className="py-3 px-4 text-sm">Dublin</td>
                        <td className="py-3 px-4 text-sm">Irlanda</td>
                        <td className="py-3 px-4 text-sm">12</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ativo</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete("C001", "Cidade")}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-sm">#C002</td>
                        <td className="py-3 px-4 text-sm">Toronto</td>
                        <td className="py-3 px-4 text-sm">Canadá</td>
                        <td className="py-3 px-4 text-sm">8</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ativo</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete("C002", "Cidade")}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="users">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
                <CardDescription>Visualize e gerencie usuários do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input className="pl-10" placeholder="Buscar usuários..." />
                  </div>
                </div>
                
                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registro</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-sm">#U001</td>
                        <td className="py-3 px-4 text-sm">João Silva</td>
                        <td className="py-3 px-4 text-sm">joao.silva@exemplo.com</td>
                        <td className="py-3 px-4 text-sm">10/01/2023</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ativo</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete("U001", "Usuário")}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-sm">#U002</td>
                        <td className="py-3 px-4 text-sm">Maria Oliveira</td>
                        <td className="py-3 px-4 text-sm">maria.oliveira@exemplo.com</td>
                        <td className="py-3 px-4 text-sm">15/03/2023</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Ativo</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete("U002", "Usuário")}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reservations">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Reservas</CardTitle>
                <CardDescription>Visualize e gerencie reservas do sistema</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                    <Input className="pl-10" placeholder="Buscar reservas..." />
                  </div>
                </div>
                
                <div className="overflow-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acomodação</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-in</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Check-out</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="py-2 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-sm">#R001</td>
                        <td className="py-3 px-4 text-sm">João Silva</td>
                        <td className="py-3 px-4 text-sm">Student Housing Dublin</td>
                        <td className="py-3 px-4 text-sm">10/01/2023</td>
                        <td className="py-3 px-4 text-sm">10/02/2023</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Confirmado</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete("R001", "Reserva")}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="py-3 px-4 text-sm">#R002</td>
                        <td className="py-3 px-4 text-sm">Maria Oliveira</td>
                        <td className="py-3 px-4 text-sm">Toronto Student Residence</td>
                        <td className="py-3 px-4 text-sm">15/03/2023</td>
                        <td className="py-3 px-4 text-sm">15/06/2023</td>
                        <td className="py-3 px-4 text-sm">
                          <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pendente</span>
                        </td>
                        <td className="py-3 px-4 text-sm">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete("R002", "Reserva")}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      <Footer />
    </div>
  );
};

export default Admin;
