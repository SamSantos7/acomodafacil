
import React, { ChangeEvent, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DocumentCardProps {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const DocumentCard = ({ id, title, description, icon }: DocumentCardProps) => {
  const [fileName, setFileName] = useState<string | null>(null);
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };
  
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded-md">
            {icon}
          </div>
          <div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-sm text-gray-500">{description}</p>
            {fileName && <p className="text-xs text-green-600 mt-1">Arquivo: {fileName}</p>}
          </div>
        </div>
        <div>
          <input type="file" id={id} className="hidden" onChange={handleFileChange} />
          <label htmlFor={id}>
            <Button size="sm" variant="outline" className="cursor-pointer" asChild>
              <span>Upload</span>
            </Button>
          </label>
        </div>
      </div>
    </Card>
  );
};

const DocumentUpload = () => {
  const { toast } = useToast();
  
  const documents = [
    {
      id: 'id-upload',
      title: 'Documento de identidade (RG)',
      description: 'Frente e verso do documento',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M16.5 7.5v.001"></path>
        </svg>
      )
    },
    {
      id: 'passport-upload',
      title: 'Passaporte',
      description: 'Página de identificação',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <path d="M10 12h2v6"></path>
          <rect x="2" y="12" width="4" height="6"></rect>
        </svg>
      )
    },
    {
      id: 'visa-upload',
      title: 'Visto de estudante',
      description: 'Documento de visto válido',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <rect x="3" y="5" width="18" height="14" rx="2"></rect>
          <polyline points="3 7 12 13 21 7"></polyline>
        </svg>
      )
    },
    {
      id: 'enrollment-upload',
      title: 'Comprovante de matrícula',
      description: 'Da instituição educacional',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      )
    },
  ];
  
  const handleSubmit = () => {
    toast({
      title: "Verificação pendente",
      description: "Seus documentos foram enviados e estão em análise."
    });
  };
  
  return (
    <div>
      <div className="space-y-6">
        {documents.map((doc) => (
          <DocumentCard 
            key={doc.id}
            id={doc.id}
            title={doc.title}
            description={doc.description}
            icon={doc.icon}
          />
        ))}
      </div>
      
      <div className="mt-6">
        <Button onClick={handleSubmit}>
          Enviar documentos para verificação
        </Button>
      </div>
    </div>
  );
};

export default DocumentUpload;
