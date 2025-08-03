"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Sidebar from "@/components/Sidebar";
import { 
  Settings, 
  User,
  Lock,
  Bell,
  CreditCard,
  Shield,
  Save,
  Eye,
  EyeOff,
  DollarSign,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Check,
  AlertCircle
} from "lucide-react";

export default function ConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("perfil");
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Dados do perfil do usuário
  const [profileData, setProfileData] = useState({
    name: "João Silva",
    email: "joao.silva@email.com",
    phone: "(11) 99999-8888",
    cpf: "123.456.789-00",
    birthDate: "1985-05-15",
    address: "Rua das Flores, 123",
    city: "São Paulo",
    state: "SP",
    zipCode: "01234-567",
    plan: "Advanced",
    affiliateId: "GS001234"
  });

  // Configurações de notificação
  const [notifications, setNotifications] = useState({
    emailNewLead: true,
    emailSaleConfirmed: true,
    emailCommissionPaid: true,
    whatsappUpdates: true,
    smsImportant: false,
    weeklyReport: true,
    monthlyReport: true
  });

  // Dados bancários
  const [bankData, setBankData] = useState({
    bank: "Nubank",
    agency: "0001",
    account: "1234567-8",
    accountType: "Conta Corrente",
    pixKey: "joao.silva@email.com",
    pixKeyType: "E-mail"
  });

  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [key]: checked
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Configurações</h2>
              <p className="text-gray-600">Gerencie sua conta e preferências</p>
            </div>
            {saveSuccess && (
              <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg">
                <Check className="h-4 w-4" />
                <span>Configurações salvas com sucesso!</span>
              </div>
            )}
          </div>
        </header>

        {/* Content */}
        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Settings Navigation */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-0">
                  <nav className="space-y-1">
                    <button
                      onClick={() => setActiveTab("perfil")}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-t-lg ${
                        activeTab === "perfil" 
                          ? "bg-solar-50 text-solar-600 border-r-2 border-solar-600" 
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Perfil
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("seguranca")}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium ${
                        activeTab === "seguranca" 
                          ? "bg-solar-50 text-solar-600 border-r-2 border-solar-600" 
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Lock className="h-4 w-4 mr-3" />
                      Segurança
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("notificacoes")}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium ${
                        activeTab === "notificacoes" 
                          ? "bg-solar-50 text-solar-600 border-r-2 border-solar-600" 
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <Bell className="h-4 w-4 mr-3" />
                      Notificações
                    </button>
                    
                    <button
                      onClick={() => setActiveTab("pagamento")}
                      className={`w-full flex items-center px-4 py-3 text-left text-sm font-medium rounded-b-lg ${
                        activeTab === "pagamento" 
                          ? "bg-solar-50 text-solar-600 border-r-2 border-solar-600" 
                          : "text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      <CreditCard className="h-4 w-4 mr-3" />
                      Dados Bancários
                    </button>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Settings Content */}
            <div className="lg:col-span-3">
              {/* Perfil Tab */}
              {activeTab === "perfil" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Informações do Perfil</CardTitle>
                    <CardDescription>
                      Atualize suas informações pessoais e de contato
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Nome Completo</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">E-mail</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={profileData.cpf}
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                      <div>
                        <Label htmlFor="birthDate">Data de Nascimento</Label>
                        <Input
                          id="birthDate"
                          type="date"
                          value={profileData.birthDate}
                          onChange={(e) => setProfileData({...profileData, birthDate: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="plan">Plano</Label>
                        <Input
                          id="plan"
                          value={profileData.plan}
                          disabled
                          className="bg-gray-100"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Endereço</Label>
                      <Input
                        id="address"
                        value={profileData.address}
                        onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input
                          id="city"
                          value={profileData.city}
                          onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <select 
                          id="state"
                          value={profileData.state}
                          onChange={(e) => setProfileData({...profileData, state: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="SP">São Paulo</option>
                          <option value="RJ">Rio de Janeiro</option>
                          <option value="MG">Minas Gerais</option>
                          {/* Adicionar outros estados */}
                        </select>
                      </div>
                      <div>
                        <Label htmlFor="zipCode">CEP</Label>
                        <Input
                          id="zipCode"
                          value={profileData.zipCode}
                          onChange={(e) => setProfileData({...profileData, zipCode: e.target.value})}
                        />
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Shield className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">ID do Afiliado</span>
                      </div>
                      <code className="bg-blue-100 px-3 py-2 rounded text-blue-800 font-mono">
                        {profileData.affiliateId}
                      </code>
                    </div>
                    
                    <Button onClick={handleSave} className="bg-solar-600 hover:bg-solar-700">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Alterações
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Segurança Tab */}
              {activeTab === "seguranca" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Segurança da Conta</CardTitle>
                    <CardDescription>
                      Altere sua senha e configure a segurança da sua conta
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <Label htmlFor="currentPassword">Senha Atual</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Digite sua senha atual"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="newPassword">Nova Senha</Label>
                      <div className="relative">
                        <Input
                          id="newPassword"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Digite uma nova senha"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar Nova Senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirme a nova senha"
                      />
                    </div>
                    
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-yellow-800">Requisitos da senha:</p>
                          <ul className="text-xs text-yellow-700 mt-1 space-y-1">
                            <li>• Mínimo de 8 caracteres</li>
                            <li>• Pelo menos uma letra maiúscula</li>
                            <li>• Pelo menos um número</li>
                            <li>• Pelo menos um caractere especial</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={handleSave} className="bg-solar-600 hover:bg-solar-700">
                      <Save className="h-4 w-4 mr-2" />
                      Alterar Senha
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Notificações Tab */}
              {activeTab === "notificacoes" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Preferências de Notificação</CardTitle>
                    <CardDescription>
                      Configure como e quando você quer receber notificações
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-4">Notificações por E-mail</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={notifications.emailNewLead}
                            onCheckedChange={(checked) => handleNotificationChange('emailNewLead', checked as boolean)}
                          />
                          <div>
                            <p className="text-sm font-medium">Novo lead capturado</p>
                            <p className="text-xs text-gray-500">Receba um e-mail sempre que um novo lead clicar no seu link</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={notifications.emailSaleConfirmed}
                            onCheckedChange={(checked) => handleNotificationChange('emailSaleConfirmed', checked as boolean)}
                          />
                          <div>
                            <p className="text-sm font-medium">Venda confirmada</p>
                            <p className="text-xs text-gray-500">Notificação quando uma venda for efetivada</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={notifications.emailCommissionPaid}
                            onCheckedChange={(checked) => handleNotificationChange('emailCommissionPaid', checked as boolean)}
                          />
                          <div>
                            <p className="text-sm font-medium">Comissão paga</p>
                            <p className="text-xs text-gray-500">Confirmação quando sua comissão for depositada</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">WhatsApp</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={notifications.whatsappUpdates}
                            onCheckedChange={(checked) => handleNotificationChange('whatsappUpdates', checked as boolean)}
                          />
                          <div>
                            <p className="text-sm font-medium">Atualizações importantes</p>
                            <p className="text-xs text-gray-500">Receba notificações via WhatsApp sobre vendas e comissões</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-4">Relatórios</h4>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={notifications.weeklyReport}
                            onCheckedChange={(checked) => handleNotificationChange('weeklyReport', checked as boolean)}
                          />
                          <div>
                            <p className="text-sm font-medium">Relatório semanal</p>
                            <p className="text-xs text-gray-500">Resumo das suas atividades da semana</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <Checkbox
                            checked={notifications.monthlyReport}
                            onCheckedChange={(checked) => handleNotificationChange('monthlyReport', checked as boolean)}
                          />
                          <div>
                            <p className="text-sm font-medium">Relatório mensal</p>
                            <p className="text-xs text-gray-500">Relatório completo das suas vendas e comissões</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={handleSave} className="bg-solar-600 hover:bg-solar-700">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Preferências
                    </Button>
                  </CardContent>
                </Card>
              )}

              {/* Dados Bancários Tab */}
              {activeTab === "pagamento" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Dados Bancários</CardTitle>
                    <CardDescription>
                      Configure sua conta para recebimento das comissões
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="bank">Banco</Label>
                        <Input
                          id="bank"
                          value={bankData.bank}
                          onChange={(e) => setBankData({...bankData, bank: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="agency">Agência</Label>
                        <Input
                          id="agency"
                          value={bankData.agency}
                          onChange={(e) => setBankData({...bankData, agency: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="account">Conta</Label>
                        <Input
                          id="account"
                          value={bankData.account}
                          onChange={(e) => setBankData({...bankData, account: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="accountType">Tipo de Conta</Label>
                        <select 
                          id="accountType"
                          value={bankData.accountType}
                          onChange={(e) => setBankData({...bankData, accountType: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="Conta Corrente">Conta Corrente</option>
                          <option value="Poupança">Poupança</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h4 className="font-medium mb-4">Chave PIX (Preferencial)</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="pixKeyType">Tipo da Chave</Label>
                          <select 
                            id="pixKeyType"
                            value={bankData.pixKeyType}
                            onChange={(e) => setBankData({...bankData, pixKeyType: e.target.value})}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md"
                          >
                            <option value="E-mail">E-mail</option>
                            <option value="CPF">CPF</option>
                            <option value="Telefone">Telefone</option>
                            <option value="Chave Aleatória">Chave Aleatória</option>
                          </select>
                        </div>
                        <div>
                          <Label htmlFor="pixKey">Chave PIX</Label>
                          <Input
                            id="pixKey"
                            value={bankData.pixKey}
                            onChange={(e) => setBankData({...bankData, pixKey: e.target.value})}
                            placeholder="Digite sua chave PIX"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-start space-x-2">
                        <Check className="h-4 w-4 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">Pagamentos via PIX</p>
                          <p className="text-xs text-green-700 mt-1">
                            Recomendamos o PIX para recebimento mais rápido das comissões (até 1 hora útil).
                            Transferências bancárias podem levar até 2 dias úteis.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <Button onClick={handleSave} className="bg-solar-600 hover:bg-solar-700">
                      <Save className="h-4 w-4 mr-2" />
                      Salvar Dados Bancários
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
