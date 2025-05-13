
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, Facebook, Mail, X, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { motion } from 'framer-motion';
import mockApi from '@/services/mockApi';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal = ({ isOpen, onClose }: AuthModalProps) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState("");
  const { toast } = useToast();

  // Resetar estados quando o modal é aberto/fechado
  useEffect(() => {
    if (!isOpen) {
      // Pequeno delay para não afetar a animação de fechamento
      setTimeout(() => {
        setShowOtpInput(false);
        setOtpValue("");
        setEmailError("");
      }, 300);
    }
  }, [isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Usar o mockApi em vez de chamadas fetch diretas
      const data = await mockApi.login(email, password);
      
      // Armazenar dados do usuário e token
      localStorage.setItem('user', JSON.stringify(data.user));
      localStorage.setItem('token', data.token);
      
      toast({
        title: "Login realizado com sucesso",
        description: "Bem-vindo de volta!",
      });
      
      onClose();
      window.location.reload(); // Recarregar para atualizar o estado da aplicação
    } catch (error) {
      console.error('Erro de login:', error);
      toast({
        title: "Erro de login",
        description: error instanceof Error ? error.message : "Ocorreu um erro durante o login",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setEmailError("");
    
    if (!email) {
      setEmailError("Por favor, insira seu e-mail para continuar.");
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Por favor, insira um e-mail válido.");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Erro ao solicitar código');
      }

      setIsLoading(false);
      setShowOtpInput(true);
      
      toast({
        title: "Código enviado!",
        description: "Um código de verificação foi enviado para seu e-mail.",
      });
    } catch (err) {
      setIsLoading(false);
      setEmailError(err instanceof Error ? err.message : 'Erro ao solicitar código');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otpValue.length !== 5) {
      toast({
        title: "Código inválido",
        description: "Por favor, insira o código de 5 dígitos enviado para seu e-mail.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: otpValue })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Código inválido ou expirado');
      }

      // Salvar token no localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      toast({
        title: "Login realizado!",
        description: "Você foi autenticado com sucesso.",
      });
      
      onClose();
      navigate('/dashboard');
    } catch (err) {
      setIsLoading(false);
      toast({
        title: "Erro",
        description: err instanceof Error ? err.message : 'Erro ao verificar código',
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    // Simular login social
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      
      // Simular login bem-sucedido
      const mockUser = {
        id: 'social123',
        name: provider === 'google' ? 'João Google' : 'João Facebook',
        email: provider === 'google' ? 'joao@gmail.com' : 'joao@facebook.com',
        avatar: `https://i.pravatar.cc/150?u=${provider}`,
      };
      
      // Salvar informações do usuário no localStorage (temporário, seria substituído por uma solução real de autenticação)
      localStorage.setItem('user', JSON.stringify(mockUser));
      
      toast({
        title: "Login realizado!",
        description: `Você foi autenticado com sucesso via ${provider === 'google' ? 'Google' : 'Facebook'}.`,
      });
      
      onClose();
      navigate('/dashboard');
    }, 1500);
  };

  const slideVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-xl">Bem-vindo de volta!</DialogTitle>
          <DialogDescription className="text-center">
            Acesse sua conta para gerenciar suas reservas e preferências
          </DialogDescription>
        </DialogHeader>

        {!showOtpInput ? (
          <Tabs defaultValue="email" value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-2 mb-4">
              <TabsTrigger value="email" className="flex items-center gap-2">
                <Mail size={16} />
                E-mail
              </TabsTrigger>
              <TabsTrigger value="social" className="flex items-center gap-2">
                <Facebook size={16} />
                Redes Sociais
              </TabsTrigger>
            </TabsList>

            <TabsContent value="email" className="space-y-4">
              <motion.form
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                onSubmit={handleEmailLogin} 
                className="space-y-4"
              >
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-sm font-medium">
                    E-mail
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="seu@email.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={emailError ? "border-red-500" : ""}
                  />
                  {emailError && (
                    <p className="text-sm text-red-500">{emailError}</p>
                  )}
                </div>
                <Button type="submit" className="w-full gap-2" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Enviando...
                    </>
                  ) : (
                    <>
                      Continuar com E-mail
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </motion.form>
            </TabsContent>

            <TabsContent value="social" className="space-y-4">
              <motion.div 
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={slideVariants}
                className="space-y-3"
              >
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
                  onClick={() => handleSocialLogin('google')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                  )}
                  Continuar com Google
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full flex items-center justify-center gap-2 bg-[#1877F2] text-white hover:bg-[#1877F2]/90 transition-colors"
                  onClick={() => handleSocialLogin('facebook')}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                  ) : (
                    <Facebook size={20} />
                  )}
                  Continuar com Facebook
                </Button>
                
                <div className="text-center text-sm text-gray-500 mt-4">
                  <p>Ao continuar, você concorda com nossos</p>
                  <div className="flex justify-center gap-1 mt-1">
                    <a href="/terms" className="text-primary hover:underline">Termos de Uso</a>
                    <span>e</span>
                    <a href="/privacy" className="text-primary hover:underline">Política de Privacidade</a>
                  </div>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        ) : (
          <motion.div 
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={slideVariants}
            className="space-y-6"
          >
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle size={16} className="text-green-500" />
              <span>Código enviado para <strong>{email}</strong></span>
            </div>
            
            <form onSubmit={handleOtpSubmit} className="space-y-6">
              <div className="space-y-4">
                <label className="block text-sm font-medium">
                  Digite o código de 5 dígitos
                </label>
                <div className="flex justify-center">
                  <InputOTP maxLength={5} value={otpValue} onChange={setOtpValue}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} className="transition-all" />
                      <InputOTPSlot index={1} className="transition-all" />
                      <InputOTPSlot index={2} className="transition-all" />
                      <InputOTPSlot index={3} className="transition-all" />
                      <InputOTPSlot index={4} className="transition-all" />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </div>
              
              <div className="text-center text-sm">
                <button 
                  type="button" 
                  className="text-primary hover:underline"
                  onClick={() => setShowOtpInput(false)}
                >
                  Voltar
                </button>
                <span className="mx-2">•</span>
                <button 
                  type="button" 
                  className="text-primary hover:underline"
                  onClick={() => {
                    toast({
                      title: "Novo código enviado!",
                      description: "Um novo código de verificação foi enviado para seu e-mail."
                    });
                  }}
                >
                  Reenviar código
                </button>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <span className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                    Verificando...
                  </>
                ) : (
                  "Verificar"
                )}
              </Button>
            </form>
          </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
