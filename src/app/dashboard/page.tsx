"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DocumentUpload from "@/components/DocumentUpload";
import { useToast } from "@/hooks/use-toast";

export default function DashboardPage() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    documents: [],
    reservations: []
  });

  useEffect(() => {
    // Simulação de carregamento de dados
    const timer = setTimeout(() => {
      setUserData({
        name: "Estudante Exemplo",
        email: "estudante@exemplo.com",
        documents: [
          { id: 1, name: "Passaporte", status: "approved" },
          { id: 2, name: "Visto de Estudante", status: "pending" }
        ],
        reservations: [
          { id: 1, property: "Residência Universitária Central", status: "confirmed", checkIn: "2023-09-01", checkOut: "2024-06-30" }
        ]
      });
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleContactSupport = () => {
    toast({
      title: "Suporte contactado",
      description: "Nossa equipe entrará em contato em breve.",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Painel do Estudante</h1>
      
      <Tabs defaultValue="account" className="space-y-6">
        <TabsList>
          <TabsTrigger value="account">Minha Conta</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
        </TabsList>
        
        <TabsContent value="account" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informações Pessoais</CardTitle>
              <CardDescription>Gerencie suas informações de perfil</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Nome:</p>
                <p>{userData.name}</p>
              </div>
              <div>
                <p className="font-medium">Email:</p>
                <p>{userData.email}</p>
              </div>
              <Button variant="outline">Editar Perfil</Button>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Suporte</CardTitle>
              <CardDescription>Precisa de ajuda?</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleContactSupport}>Contatar Suporte</Button>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Meus Documentos</CardTitle>
              <CardDescription>Gerencie seus documentos para verificação</CardDescription>
            </CardHeader>
            <CardContent>
              <DocumentUpload />
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Minhas Reservas</CardTitle>
              <CardDescription>Gerencie suas reservas de acomodação</CardDescription>
            </CardHeader>
            <CardContent>
              {userData.reservations.length > 0 ? (
                <div className="space-y-4">
                  {userData.reservations.map(reservation => (
                    <div key={reservation.id} className="border p-4 rounded-md">
                      <p className="font-medium">{reservation.property}</p>
                      <p className="text-sm text-gray-500">Check-in: {reservation.checkIn}</p>
                      <p className="text-sm text-gray-500">Check-out: {reservation.checkOut}</p>
                      <p className="text-sm mt-2">
                        Status: <span className="font-medium text-green-600">{reservation.status}</span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>Você não tem reservas ativas.</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}