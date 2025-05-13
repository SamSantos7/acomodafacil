import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { requireAuthentication } from '../../lib/auth';
import Layout from '../../components/layout/DashboardLayout';
import { toast } from 'react-hot-toast';

export default function Dashboard({ user, reservations, documents }) {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Painel do Cliente</h1>
        
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('overview')}
          >
            Visão Geral
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'reservations' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('reservations')}
          >
            Minhas Reservas
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'documents' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('documents')}
          >
            Documentos
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
            onClick={() => setActiveTab('profile')}
          >
            Meu Perfil
          </button>
        </div>
        
        {activeTab === 'overview' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Bem-vindo, {user.name || 'Usuário'}!</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Reservas</h3>
                <p className="text-2xl font-bold">{reservations.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Documentos</h3>
                <p className="text-2xl font-bold">{documents.length}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="font-medium text-gray-700">Status</h3>
                <p className="text-2xl font-bold text-green-500">Ativo</p>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'reservations' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Minhas Reservas</h2>
            {reservations.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-2 px-4 border-b">Acomodação</th>
                      <th className="py-2 px-4 border-b">Check-in</th>
                      <th className="py-2 px-4 border-b">Check-out</th>
                      <th className="py-2 px-4 border-b">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((reservation) => (
                      <tr key={reservation.id}>
                        <td className="py-2 px-4 border-b">{reservation.accommodation.title}</td>
                        <td className="py-2 px-4 border-b">{new Date(reservation.checkInDate).toLocaleDateString()}</td>
                        <td className="py-2 px-4 border-b">{new Date(reservation.checkOutDate).toLocaleDateString()}</td>
                        <td className="py-2 px-4 border-b">
                          <span className={`px-2 py-1 rounded text-xs ${
                            reservation.status === 'CONFIRMED' ? 'bg-green-100 text-green-800' :
                            reservation.status === 'CANCELLED' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {reservation.status === 'CONFIRMED' ? 'Confirmada' :
                             reservation.status === 'CANCELLED' ? 'Cancelada' : 'Pendente'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500">Você ainda não possui reservas.</p>
            )}
          </div>
        )}
        
        {activeTab === 'documents' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Meus Documentos</h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-2">Enviar Novo Documento</h3>
              <DocumentUploadForm userId={user.id} />
            </div>
            
            {documents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="bg-white p-4 rounded-lg shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-gray-500">{doc.type}</p>
                        <p className="text-sm text-gray-500">Enviado em: {new Date(doc.createdAt).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-1 rounded text-xs ${
                        doc.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                        doc.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {doc.status === 'APPROVED' ? 'Aprovado' :
                         doc.status === 'REJECTED' ? 'Rejeitado' : 'Pendente'}
                      </span>
                    </div>
                    <div className="mt-2">
                      <a 
                        href={doc.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        Visualizar documento
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Você ainda não enviou nenhum documento.</p>
            )}
          </div>
        )}
        
        {activeTab === 'profile' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Meu Perfil</h2>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-600 text-sm">Nome</h3>
                  <p className="font-medium">{user.name || 'Não informado'}</p>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">E-mail</h3>
                  <p className="font-medium">{user.email}</p>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Membro desde</h3>
                  <p className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</p>
                </div>
                <div>
                  <h3 className="text-gray-600 text-sm">Status da conta</h3>
                  <p className="font-medium text-green-500">Ativo</p>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Editar Perfil
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

function DocumentUploadForm({ userId }) {
  const [file, setFile] = useState(null);
  const [documentName, setDocumentName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !documentName) {
      toast.error('Por favor, selecione um arquivo e informe o nome do documento.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('name', documentName);
    formData.append('userId', userId);

    try {
      const response = await fetch('/api/documents/upload', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        toast.success('Documento enviado com sucesso!');
        setFile(null);
        setDocumentName('');
        // Recarregar a página para atualizar a lista de documentos
        window.location.reload();
      } else {
        toast.error('Erro ao enviar documento. Tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao enviar documento. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="documentName" className="block text-sm font-medium text-gray-700">
          Nome do Documento
        </label>
        <input
          type="text"
          id="documentName"
          value={documentName}
          onChange={(e) => setDocumentName(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          Arquivo (PDF, DOCX, JPG, PNG)
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          accept=".pdf,.docx,.jpg,.jpeg,.png"
          required
          className="mt-1 block w-full"
        />
      </div>
      
      <div>
        <button
          type="submit"
          disabled={loading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          {loading ? 'Enviando...' : 'Enviar Documento'}
        </button>
      </div>
    </form>
  );
}

export async function getServerSideProps(context) {
  return requireAuthentication(context, async ({ session }) => {
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
    });

    const reservations = await prisma.reservation.findMany({
      where: { userId: session.user.id },
      include: { accommodation: true },
      orderBy: { createdAt: 'desc' },
    });

    const documents = await prisma.document.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
    });

    return {
      props: {
        user: JSON.parse(JSON.stringify(user)),
        reservations: JSON.parse(JSON.stringify(reservations)),
        documents: JSON.parse(JSON.stringify(documents)),
      },
    };
  });
}