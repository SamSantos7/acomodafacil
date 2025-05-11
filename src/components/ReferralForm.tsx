
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Copy, Mail, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const emailSchema = z.object({
  emails: z.string().min(1, "Digite pelo menos um email").refine(
    (val) => {
      const emails = val.split(',').map(e => e.trim());
      return emails.every(email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email));
    },
    {
      message: "Um ou mais emails são inválidos. Separe múltiplos emails com vírgulas."
    }
  )
});

type EmailFormData = z.infer<typeof emailSchema>;

const ReferralForm = () => {
  const { toast } = useToast();
  const [referralLink] = useState("https://acomodafacil.com/refer/user123");
  
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      emails: ''
    }
  });
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast({
      title: "Link copiado!",
      description: "Link de indicação copiado para a área de transferência."
    });
  };
  
  const shareViaWhatsApp = () => {
    const message = encodeURIComponent(`Olá! Estou usando a AcomodaFácil para encontrar acomodações estudantis no exterior. Use meu link de indicação para ganhar um desconto: ${referralLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };
  
  const shareViaFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralLink)}`, '_blank');
  };
  
  const onSubmit = (data: EmailFormData) => {
    const emails = data.emails.split(',').map(e => e.trim());
    
    // Simulação de envio
    toast({
      title: "Convites enviados!",
      description: `${emails.length} convites foram enviados com sucesso.`
    });
    
    form.reset();
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg border">
        <h3 className="font-semibold text-lg mb-3">Como funciona</h3>
        <ul className="space-y-3">
          <li className="flex gap-2">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">1</span>
            <p>Compartilhe seu link exclusivo com amigos que planejam estudar no exterior</p>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">2</span>
            <p>Quando seu amigo fizer uma reserva usando seu link, vocês dois ganham créditos</p>
          </li>
          <li className="flex gap-2">
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-medium">3</span>
            <p>Você recebe €50 em créditos e seu amigo ganha 10% de desconto na primeira reserva</p>
          </li>
        </ul>
      </div>
      
      <div className="space-y-4">
        <h3 className="font-semibold text-lg">Seu link de indicação</h3>
        
        <div className="flex gap-2">
          <Input readOnly value={referralLink} className="font-medium" />
          <Button variant="secondary" onClick={copyReferralLink}>
            <Copy size={18} />
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-lg mb-4">Compartilhar via</h3>
        <div className="flex flex-wrap gap-3">
          <Button variant="outline" className="gap-2" onClick={shareViaWhatsApp}>
            <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>WhatsApp</span>
          </Button>
          
          <Button variant="outline" className="gap-2" onClick={shareViaFacebook}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
            </svg>
            <span>Facebook</span>
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Mail size={18} />
            <span>Email</span>
          </Button>
          
          <Button variant="outline" className="gap-2">
            <Share size={18} />
            <span>Mais opções</span>
          </Button>
        </div>
      </div>
      
      <div>
        <h3 className="font-semibold text-lg mb-4">Convide por email</h3>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="emails"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Emails dos seus amigos</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="email1@exemplo.com, email2@exemplo.com" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <Button type="submit">Enviar Convites</Button>
          </form>
        </Form>
      </div>
      
      <div>
        <h3 className="font-semibold text-lg mb-4">Amigos indicados (0)</h3>
        <Card className="bg-gray-50">
          <CardContent className="p-6 text-center text-gray-500">
            <p>Você ainda não tem nenhuma indicação.</p>
            <p className="text-sm mt-2">Comece a compartilhar seu link para acumular recompensas!</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralForm;
