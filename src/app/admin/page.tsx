'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Accommodation {
  id: string;
  name: string;
  city: string;
  country: string;
  price: number;
  description: string;
}

interface Reservation {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
  accommodation: {
    id: string;
    name: string;
  };
}

export default function Admin() {
  const [accommodations, setAccommodations] = useState<Accommodation[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/');
          return;
        }

        // Buscar acomodações
        const accommodationsResponse = await fetch('/api/accommodations/admin', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        // Buscar reservas
        const reservationsResponse = await fetch('/api/reservations/admin', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!accommodationsResponse.ok || !reservationsResponse.ok) {
          throw new Error('Falha ao buscar dados');
        }

        const accommodationsData = await accommodationsResponse.json();
        const reservationsData = await reservationsResponse.json();
        
        setAccommodations(accommodationsData.accommodations);
        setReservations(reservationsData.reservations);
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar os dados',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router, toast]);

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/');
        return;
      }

      const response = await fetch(`/api/reservations/admin/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status })
      });

      if (!response.ok) {
        throw new Error('Falha ao atualizar reserva');
      }

      // Atualizar a lista de reservas
      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status } : res
      ));

      toast({
        title: 'Sucesso',
        description: 'Status da reserva atualizado com sucesso',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível atualizar o status da reserva',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Painel Administrativo</h1>
      
      <Tabs defaultValue="reservations">
        <TabsList className="mb-6">
          <TabsTrigger value="reservations">Reservas</TabsTrigger>
          <TabsTrigger value="accommodations">Acomodações</TabsTrigger>
        </TabsList>
        
        <TabsContent value="reservations">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Reservas</CardTitle>
              <CardDescription>Visualize e gerencie todas as reservas</CardDescription>
            </CardHeader>
            <CardContent>
              {reservations.length === 0 ? (
                <p className="text-center py-4">Não há reservas para exibir</p>
              ) : (
                <div className="space-y-4">
                  {reservations.map((reservation) => (
                    <div key={reservation.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{reservation.accommodation.name}</h3>
                          <p className="text-sm">
                            Cliente: {reservation.user.name} ({reservation.user.email})
                          </p>
                          <p className="text-sm mt-2">
                            {new Date(reservation.startDate).toLocaleDateString()} - {new Date(reservation.endDate).toLocaleDateString()}
                          </p>
                          <span className={`inline-block px-2 py-1 text-xs rounded mt-2 ${
                            reservation.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                            reservation.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {reservation.status === 'confirmed' ? 'Confirmada' :
                             reservation.status === 'pending' ? 'Pendente' : 'Cancelada'}
                          </span>
                        </div>
                        <div className="flex gap-2">
                          {reservation.status === 'pending' && (
                            <>
                              <Button 
                                variant="default" 
                                size="sm"
                                onClick={() => updateReservationStatus(reservation.id, 'confirmed')}
                              >
                                Confirmar
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => updateReservationStatus(reservation.id, 'cancelled')}
                              >
                                Recusar
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="accommodations">
          <Card>
            <CardHeader>
              <CardTitle>Gerenciar Acomodações</CardTitle>
              <CardDescription>Visualize e gerencie todas as acomodações</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end mb-4">
                <Button onClick={() => router.push('/admin/accommodations/new')}>
                  Adicionar Nova Acomodação
                </Button>
              </div>
              
              {accommodations.length === 0 ? (
                <p className="text-center py-4">Não há acomodações para exibir</p>
              ) : (
                <div className="space-y-4">
                  {accommodations.map((accommodation) => (
                    <div key={accommodation.id} className="border p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold">{accommodation.name}</h3>
                          <p className="text-sm text-gray-500">
                            {accommodation.city}, {accommodation.country}
                          </p>
                          <p className="text-sm mt-2">
                            Preço: R$ {accommodation.price.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => router.push(`/admin/accommodations/edit/${accommodation.id}`)}
                          >
                            Editar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}