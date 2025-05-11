
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import DashboardSidebar from '@/components/DashboardSidebar';
import ReferralForm from '@/components/ReferralForm';
import DocumentUpload from '@/components/DocumentUpload';

const Dashboard = () => {
  const { toast } = useToast();
  const [searchParams] = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeTab, setActiveTab] = useState(tabFromUrl || "reservations");
  
  // Atualizar o activeTab quando o parâmetro da URL mudar
  useEffect(() => {
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    }
  }, [tabFromUrl]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
        <DashboardSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        
        <div className="flex-grow">
          <h1 className="text-2xl font-semibold text-secondary mb-6">Minha Conta</h1>
          
          {activeTab === "reservations" && (
            <Card>
              <CardHeader>
                <CardTitle>Minhas Reservas</CardTitle>
                <CardDescription>Gerencie suas reservas atuais e passadas</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="accommodations" className="w-full">
                  <TabsList className="grid grid-cols-2 w-full max-w-md mb-4">
                    <TabsTrigger value="accommodations">Acomodações</TabsTrigger>
                    <TabsTrigger value="services">Outros Serviços</TabsTrigger>
                  </TabsList>
                  <TabsContent value="accommodations" className="mt-4">
                    <div className="space-y-4">
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="w-full md:w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1515263487990-61b07816b324?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                              alt="Student Housing Dublin" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold">Student Housing Dublin</h3>
                            <p className="text-sm text-gray-500">Dublin, Irlanda</p>
                            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <span className="text-sm">10/Jan/2023 - 10/Fev/2023</span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded w-fit">Confirmado</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button size="sm" variant="outline">Ver Detalhes</Button>
                              <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/10">Contato</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                      
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="w-full md:w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                              alt="Toronto Student Residence" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold">Toronto Student Residence</h3>
                            <p className="text-sm text-gray-500">Toronto, Canadá</p>
                            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <span className="text-sm">15/Mar/2023 - 15/Jun/2023</span>
                              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded w-fit">Pendente</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button size="sm" variant="outline">Ver Detalhes</Button>
                              <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/10">Contato</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>
                  <TabsContent value="services" className="mt-4">
                    <div className="space-y-4">
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col md:flex-row gap-4 items-start">
                          <div className="w-full md:w-24 h-24 bg-gray-200 rounded-md overflow-hidden">
                            <img 
                              src="https://images.unsplash.com/photo-1464219222984-216ebffaaf85?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                              alt="Serviço de Transfer" 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-grow">
                            <h3 className="font-semibold">Serviço de Transfer</h3>
                            <p className="text-sm text-gray-500">Dublin, Irlanda</p>
                            <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                              <span className="text-sm">10/Jan/2023</span>
                              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded w-fit">Confirmado</span>
                            </div>
                            <div className="mt-3 flex flex-wrap gap-2">
                              <Button size="sm" variant="outline">Ver Detalhes</Button>
                              <Button size="sm" variant="outline" className="text-primary border-primary hover:bg-primary/10">Contato</Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "wishlist" && (
            <Card>
              <CardHeader>
                <CardTitle>Lista de Desejos</CardTitle>
                <CardDescription>Acomodações salvas para consulta futura</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="w-full h-48 bg-gray-200 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                        alt="Melbourne Central Apartments" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">Melbourne Central Apartments</h3>
                      <p className="text-sm text-gray-500 mb-2">Melbourne, Austrália</p>
                      <div className="flex items-center text-sm mb-3">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-2">Quarto Privativo</span>
                        <span className="text-gray-600">• Disponível</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">A partir de €800/mês</span>
                        <Button variant="outline" size="sm">Ver detalhes</Button>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="w-full h-48 bg-gray-200 overflow-hidden">
                      <img 
                        src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60" 
                        alt="London Student Housing" 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold">London Student Housing</h3>
                      <p className="text-sm text-gray-500 mb-2">Londres, Inglaterra</p>
                      <div className="flex items-center text-sm mb-3">
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2">Quarto Compartilhado</span>
                        <span className="text-gray-600">• Disponível</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-primary">A partir de €950/mês</span>
                        <Button variant="outline" size="sm">Ver detalhes</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "referral" && (
            <Card>
              <CardHeader>
                <CardTitle>Indique e Ganhe</CardTitle>
                <CardDescription>Ganhe vouchers de desconto ao indicar amigos</CardDescription>
              </CardHeader>
              <CardContent>
                <ReferralForm />
              </CardContent>
            </Card>
          )}
          
          {activeTab === "vouchers" && (
            <Card>
              <CardHeader>
                <CardTitle>Vouchers Disponíveis</CardTitle>
                <CardDescription>Seus cupons de desconto para utilizar em reservas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">WELCOME10</h3>
                        <p className="text-sm">10% de desconto na primeira reserva</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Válido até 31/12/2023</p>
                        <Button size="sm" className="mt-2">Usar agora</Button>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="bg-gradient-to-r from-primary/20 to-secondary/20 p-4 hover:shadow-md transition-shadow">
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">FRIEND50</h3>
                        <p className="text-sm">€50 de crédito por indicação</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-600">Sem data de expiração</p>
                        <Button size="sm" className="mt-2">Usar agora</Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Perfil</CardTitle>
                <CardDescription>Atualize suas informações pessoais</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-6">
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg mb-3">
                      <img 
                        src="https://i.pravatar.cc/300?u=user" 
                        alt="Foto do Perfil" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <Button variant="outline" size="sm">Alterar foto</Button>
                  </div>
                
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium mb-1">Nome completo</label>
                      <Input defaultValue="João Silva" className="bg-white" />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium mb-1">Email</label>
                      <Input defaultValue="joao.silva@exemplo.com" className="bg-white" />
                    </div>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium mb-1">Telefone</label>
                      <Input defaultValue="+55 11 98765-4321" className="bg-white" />
                    </div>
                    <div className="w-full md:w-1/2">
                      <label className="block text-sm font-medium mb-1">País de origem</label>
                      <Input defaultValue="Brasil" className="bg-white" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Idioma preferido</label>
                    <div className="flex flex-wrap gap-2">
                      <Button type="button" variant="outline" className="bg-primary/10 border-primary">Português</Button>
                      <Button type="button" variant="outline">Inglês</Button>
                      <Button type="button" variant="outline">Espanhol</Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Preferências de contato</label>
                    <div className="flex flex-wrap gap-4">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" defaultChecked />
                        <span>Email</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" defaultChecked />
                        <span>WhatsApp</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" className="rounded text-primary focus:ring-primary h-4 w-4" />
                        <span>SMS</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button type="button" onClick={() => {
                      toast({
                        title: "Perfil atualizado!",
                        description: "Suas informações foram salvas com sucesso."
                      });
                    }}>
                      Salvar alterações
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}
          
          {activeTab === "documents" && (
            <Card>
              <CardHeader>
                <CardTitle>Meus Documentos</CardTitle>
                <CardDescription>Faça upload dos seus documentos para agilizar processos de reserva</CardDescription>
              </CardHeader>
              <CardContent>
                <DocumentUpload />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
