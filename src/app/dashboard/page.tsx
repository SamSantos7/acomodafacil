'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface Reservation {
  id: string;
  startDate: string;
  endDate: string;
  status: string;
  accommodation: {
    id: string;
    name: string;
    city: string;
    country: string;
  };
}

export default function Dashboard() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          router.push('/');
          return;
        }

        const response = await fetch('/api/reservations', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Falha ao buscar reservas');
        }

        const data = await response.json();
        setReservations(data.reservations);
      } catch (error) {
        toast({
          title: 'Erro',
          description: 'Não foi possível carregar suas reservas',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [router, toast]);

  const cancelReservation = async (id: string) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        router.push('/');
        return;
      }

      const response = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: 'cancelled' })
      });

      if (!response.ok) {
        throw new Error('Falha ao cancelar reserva');
      }

      // Atualizar a lista de reservas
      setReservations(reservations.map(res => 
        res.id === id ? { ...res, status: 'cancelled' } : res
      ));

      toast({
        title: 'Sucesso',
        description: 'Reserva cancelada com sucesso',
      });
    } catch (error) {
      toast({
        title: 'Erro',
        description: 'Não foi possível cancelar a reserva',
        variant: 'destructive',
      });
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Meu Painel</h1>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Minhas Reservas</CardTitle>
            <CardDescription>Gerencie suas reservas atuais e passadas</CardDescription>
          </CardHeader>
          <CardContent>
            {reservations.length === 0 ? (
              <p className="text-center py-4">Você ainda não tem reservas</p>
            ) : (
              <div className="space-y-4">
                {reservations.map((reservation) => (
                  <div key={reservation.id} className="border p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold">{reservation.accommodation.name}</h3>
                        <p className="text-sm text-gray-500">
                          {reservation.accommodation.city}, {reservation.accommodation.country}
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
                      {reservation.status !== 'cancelled' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => cancelReservation(reservation.id)}
                        >
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}