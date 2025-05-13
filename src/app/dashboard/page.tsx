'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { UploadButton } from '@/utils/uploadthing';
import { User, FileText, Home, Clock } from 'lucide-react';

export default function Dashboard() {
  const { toast } = useToast();
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [reservations, setReservations] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Carregar dados do usuário
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/');
          return;
        }

        const userResponse = await fetch('/api/user', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (!userResponse.ok) throw new Error('Falha ao carregar dados do usuário');
        
        const userData = await userResponse.json();
        setUser(userData.user);

        // Carregar reservas
        const reservationsResponse = await fetch('/api/reservations', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (reservationsResponse.ok) {
          const reservationsData = await reservationsResponse.json();
          setReservations(reservationsData.reservations);
        }

        // Carregar documentos
        const documentsResponse = await fetch('/api/documents', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (documentsResponse.ok) {
          const documentsData = await documentsResponse.json();
          setDocuments(documentsData.documents);
        }
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar seus dados. Tente novamente.",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Painel do Estudante</h1>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList className="grid grid-cols-4 w-full max-w-3xl">
          <TabsTrigger value="account" className="flex items-center gap-2">
            <User size={16} />
            Minha Conta
          </TabsTrigger>
          <TabsTrigger value="documents" className="flex items-center gap-2">
            <FileText size={16} />
            Documentos
          </TabsTrigger>
          <TabsTrigger value="reservations" className="flex items-center gap-2">
            <Home size={16} />
            Reservas
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <Clock size={16} />
            Histórico
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Dados da Conta</CardTitle>
              <CardDescription>
                Visualize e edite suas informações pessoais
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {user && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium">Nome</label>
                      <div className="mt-1 p-2 border rounded-md">{user.name || 'Não informado'}</div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">E-mail</label>
                      <div className="mt-1 p-2 border rounded-md">{user.email}</div>
                    </div>
                  </div>
                  
                  <Button variant="outline">Editar Perfil</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Meus Documentos</CardTitle>
              <CardDescription>
                Envie documentos necessários para seu processo
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border rounded-md p-4">
                <h3 className="font-medium mb-2">Enviar Novo Documento</h3>
                <p className="text-sm text-gray-500 mb-4">
                  Formatos aceitos: PDF, DOCX (máx. 4MB)
                </p>
                
                <UploadButton
                  endpoint="documentUploader"
                  onClientUploadComplete={(res) => {
                    toast({
                      title: "Upload concluído!",
                      description: "Seu documento foi enviado com sucesso.",
                    });
                    // Recarregar lista de documentos
                  }}
                  onUploadError={(error: Error) => {
                    toast({
                      title: "Erro no upload",
                      description: error.message,
                      variant: "destructive"
                    });
                  }}
                />
              </div>
              
              <div>
                <h3 className="font-medium mb-3">Documentos Enviados</h3>
                
                {documents.length === 0 ? (
                  <p className="text-sm text-gray-500">
                    Você ainda não enviou nenhum documento.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {documents.map((doc: any) => (
                      <div key={doc.id} className="flex items-center justify-between p-3 border rounded-md">
                        <div>
                          <p className="font-medium">{doc.name}</p>
                          <p className="text-sm text-gray-500">
                            Status: <span className={`font-medium ${
                              doc.status === 'approved' ? 'text-green-600' : 
                              doc.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'
                            }`}>
                              {doc.status === 'approved' ? 'Aprovado' : 
                               doc.status === 'rejected' ? 'Rejeitado' : 'Pendente'}
                            </span>
                          </p>
                        </div>
                        <a 
                          href={doc.fileUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline"
                        >
                          Visualizar
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Reservas</CardTitle>
              <CardDescription>
                Acompanhe suas reservas atuais
              </CardDescription>
            </CardHeader>
            <CardContent>
              {reservations.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Você ainda não possui reservas.
                </p>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reservation: any) => (
                    <div key={reservation.id} className="border rounded-md p-4">
                      <h3 className="font-medium">{reservation.accommodation.name}</h3>
                      <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                        <div>
                          <p className="text-gray-500">Check-in</p>
                          <p>{new Date(reservation.startDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Check-out</p>
                          <p>{new Date(reservation.endDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Status</p>
                          <p className={`font-medium ${
                            reservation.status === '