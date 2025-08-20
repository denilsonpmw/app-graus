"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Settings,
  Users,
  DollarSign,
  Shield,
  Bell,
  Mail,
  Globe,
  CreditCard,
  FileText,
  Lock,
  AlertTriangle,
  Check,
  Plus,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Save
} from "lucide-react";

export default function AdminConfiguracoesPage() {
  const [activeTab, setActiveTab] = useState("geral");
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Configurações gerais do sistema
  const [systemConfig, setSystemConfig] = useState({
    siteName: "Graus Solar",
    siteUrl: "https://graussolar.com.br",
    supportEmail: "suporte@graussolar.com.br",
    adminEmail: "admin@graussolar.com.br",
    maintenanceMode: false,
    allowRegistration: true,
    autoApproveAffiliates: false,
    emailNotifications: true,
    smsNotifications: false
  });

  // Planos de afiliação
  const [affiliatePlans, setAffiliatePlans] = useState([
    {
      id: 1,
      name: "Light",
      price: 387.30,
      commission: 2,
      features: ["Links básicos", "Suporte por email", "Relatórios mensais"],
      active: true
    },
    {
      id: 2,
      name: "Advanced",
      price: 597.30,
      commission: 3,
      features: ["Links personalizados", "Suporte prioritário", "Relatórios semanais", "Materiais exclusivos"],
      active: true
    },
    {
      id: 3,
      name: "Premium",
      price: 897.30,
      commission: 5,
      features: ["Links ilimitados", "Suporte VIP", "Relatórios diários", "Materiais exclusivos", "Treinamento 1:1"],
      active: true
    }
  ]);

  // Configurações de pagamento
  const [paymentConfig, setPaymentConfig] = useState({
    stripeEnabled: true,
    stripePublishableKey: "pk_test_xxxxxxxxxxxxx",
    stripeSecretKey: "sk_test_xxxxxxxxxxxxx",
    pagseguroEnabled: true,
    pagseguroToken: "xxxxxxxxxxxxx",
    mercadopagoEnabled: true,
    mercadopagoAccessToken: "APP_USR-xxxxxxxxxxxxx",
    pixEnabled: true,
    pixKey: "empresa@graussolar.com.br",
    minimumCommissionPayout: 50.00,
    payoutSchedule: "weekly" // weekly, biweekly, monthly
  });

  // Configurações de e-mail
  const [emailConfig, setEmailConfig] = useState({
    smtpHost: "smtp.gmail.com",
    smtpPort: 587,
    smtpUser: "noreply@graussolar.com.br",
    smtpPassword: "***********",
    fromName: "Graus Solar",
    fromEmail: "noreply@graussolar.com.br",
    templatesEnabled: true
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleSystemConfigChange = (field: string, value: any) => {
    setSystemConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentConfigChange = (field: string, value: any) => {
    setPaymentConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleEmailConfigChange = (field: string, value: any) => {
    setEmailConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <main className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Configurações Administrativas</h2>
              <p className="text-gray-600">Gerencie configurações do sistema, afiliados e pagamentos</p>
            </div>
            <Button className="bg-solar-600 hover:bg-solar-700">
              <Save className="h-4 w-4 mr-2" />
              Salvar Todas
            </Button>
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white border-b">
          <nav className="px-6">
            <div className="flex space-x-8">
              <button
                onClick={() => setActiveTab("geral")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "geral"
                    ? "border-solar-500 text-solar-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Settings className="h-4 w-4 mr-2 inline-block" />
                Configurações Gerais
              </button>
              <button
                onClick={() => setActiveTab("afiliados")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "afiliados"
                    ? "border-solar-500 text-solar-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Users className="h-4 w-4 mr-2 inline-block" />
                Gestão de Afiliados
              </button>
              <button
                onClick={() => setActiveTab("pagamentos")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "pagamentos"
                    ? "border-solar-500 text-solar-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <CreditCard className="h-4 w-4 mr-2 inline-block" />
                Pagamentos
              </button>
              <button
                onClick={() => setActiveTab("email")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "email"
                    ? "border-solar-500 text-solar-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Mail className="h-4 w-4 mr-2 inline-block" />
                E-mail
              </button>
            </div>
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {activeTab === "geral" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Informações do Site</CardTitle>
                  <CardDescription>Configurações básicas da plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="site-name">Nome do Site</Label>
                      <Input 
                        id="site-name"
                        value={systemConfig.siteName}
                        onChange={(e) => handleSystemConfigChange('siteName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="site-url">URL do Site</Label>
                      <Input 
                        id="site-url"
                        value={systemConfig.siteUrl}
                        onChange={(e) => handleSystemConfigChange('siteUrl', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="support-email">E-mail de Suporte</Label>
                      <Input 
                        id="support-email"
                        value={systemConfig.supportEmail}
                        onChange={(e) => handleSystemConfigChange('supportEmail', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="admin-email">E-mail do Administrador</Label>
                      <Input 
                        id="admin-email"
                        value={systemConfig.adminEmail}
                        onChange={(e) => handleSystemConfigChange('adminEmail', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Sistema</CardTitle>
                  <CardDescription>Controles de funcionamento da plataforma</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Modo Manutenção</p>
                      <p className="text-sm text-gray-500">Desabilita o acesso público ao site</p>
                    </div>
                    <Checkbox 
                      checked={systemConfig.maintenanceMode}
                      onCheckedChange={(checked) => handleSystemConfigChange('maintenanceMode', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Permitir Cadastros</p>
                      <p className="text-sm text-gray-500">Novos afiliados podem se registrar</p>
                    </div>
                    <Checkbox 
                      checked={systemConfig.allowRegistration}
                      onCheckedChange={(checked) => handleSystemConfigChange('allowRegistration', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Aprovação Automática</p>
                      <p className="text-sm text-gray-500">Afiliados são aprovados automaticamente</p>
                    </div>
                    <Checkbox 
                      checked={systemConfig.autoApproveAffiliates}
                      onCheckedChange={(checked) => handleSystemConfigChange('autoApproveAffiliates', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Notificações por E-mail</p>
                      <p className="text-sm text-gray-500">Enviar notificações importantes por e-mail</p>
                    </div>
                    <Checkbox 
                      checked={systemConfig.emailNotifications}
                      onCheckedChange={(checked) => handleSystemConfigChange('emailNotifications', checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "afiliados" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Planos de Afiliação</h3>
                <Button className="bg-solar-600 hover:bg-solar-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Novo Plano
                </Button>
              </div>

              <div className="grid gap-6">
                {affiliatePlans.map((plan) => (
                  <Card key={plan.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center">
                            {plan.name}
                            {plan.active && (
                              <span className="ml-2 px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                Ativo
                              </span>
                            )}
                          </CardTitle>
                          <CardDescription>
                            {formatCurrency(plan.price)}/mês • {plan.commission}% de comissão
                          </CardDescription>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-1" />
                            Editar
                          </Button>
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4 mr-1" />
                            Excluir
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <p className="font-medium mb-2">Recursos inclusos:</p>
                        <ul className="list-disc list-inside space-y-1 text-sm text-gray-600">
                          {plan.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Aprovação</CardTitle>
                  <CardDescription>Defina critérios para aprovação de afiliados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="min-followers">Mínimo de Seguidores (Instagram)</Label>
                    <Input 
                      id="min-followers"
                      type="number"
                      placeholder="1000"
                    />
                  </div>
                  <div>
                    <Label htmlFor="required-docs">Documentos Obrigatórios</Label>
                    <div className="space-y-2 mt-2">
                      <label className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">CPF/CNPJ</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">Comprovante de Residência</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox />
                        <span className="text-sm">Dados Bancários</span>
                      </label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "pagamentos" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Gateways de Pagamento</CardTitle>
                  <CardDescription>Configure os métodos de pagamento disponíveis</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stripe */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">Stripe</h4>
                        <p className="text-sm text-gray-500">Cartões de crédito internacionais</p>
                      </div>
                      <Checkbox 
                        checked={paymentConfig.stripeEnabled}
                        onCheckedChange={(checked) => handlePaymentConfigChange('stripeEnabled', checked)}
                      />
                    </div>
                    {paymentConfig.stripeEnabled && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="stripe-public">Chave Pública</Label>
                          <Input 
                            id="stripe-public"
                            value={paymentConfig.stripePublishableKey}
                            onChange={(e) => handlePaymentConfigChange('stripePublishableKey', e.target.value)}
                          />
                        </div>
                        <div>
                          <Label htmlFor="stripe-secret">Chave Secreta</Label>
                          <div className="relative">
                            <Input 
                              id="stripe-secret"
                              type={showApiKey ? "text" : "password"}
                              value={paymentConfig.stripeSecretKey}
                              onChange={(e) => handlePaymentConfigChange('stripeSecretKey', e.target.value)}
                            />
                            <button
                              type="button"
                              onClick={() => setShowApiKey(!showApiKey)}
                              className="absolute inset-y-0 right-0 pr-3 flex items-center"
                            >
                              {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PagSeguro */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">PagSeguro</h4>
                        <p className="text-sm text-gray-500">Pagamentos nacionais</p>
                      </div>
                      <Checkbox 
                        checked={paymentConfig.pagseguroEnabled}
                        onCheckedChange={(checked) => handlePaymentConfigChange('pagseguroEnabled', checked)}
                      />
                    </div>
                    {paymentConfig.pagseguroEnabled && (
                      <div>
                        <Label htmlFor="pagseguro-token">Token de Integração</Label>
                        <Input 
                          id="pagseguro-token"
                          type="password"
                          value={paymentConfig.pagseguroToken}
                          onChange={(e) => handlePaymentConfigChange('pagseguroToken', e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* PIX */}
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">PIX</h4>
                        <p className="text-sm text-gray-500">Pagamentos instantâneos</p>
                      </div>
                      <Checkbox 
                        checked={paymentConfig.pixEnabled}
                        onCheckedChange={(checked) => handlePaymentConfigChange('pixEnabled', checked)}
                      />
                    </div>
                    {paymentConfig.pixEnabled && (
                      <div>
                        <Label htmlFor="pix-key">Chave PIX</Label>
                        <Input 
                          id="pix-key"
                          value={paymentConfig.pixKey}
                          onChange={(e) => handlePaymentConfigChange('pixKey', e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Configurações de Comissão</CardTitle>
                  <CardDescription>Defina regras para pagamento de comissões</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="min-payout">Valor Mínimo para Saque</Label>
                    <Input 
                      id="min-payout"
                      type="number"
                      step="0.01"
                      value={paymentConfig.minimumCommissionPayout}
                      onChange={(e) => handlePaymentConfigChange('minimumCommissionPayout', parseFloat(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="payout-schedule">Frequência de Pagamento</Label>
                    <select 
                      id="payout-schedule"
                      value={paymentConfig.payoutSchedule}
                      onChange={(e) => handlePaymentConfigChange('payoutSchedule', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="weekly">Semanal</option>
                      <option value="biweekly">Quinzenal</option>
                      <option value="monthly">Mensal</option>
                    </select>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "email" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Configurações SMTP</CardTitle>
                  <CardDescription>Configure o servidor de e-mail para envios automáticos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtp-host">Servidor SMTP</Label>
                      <Input 
                        id="smtp-host"
                        value={emailConfig.smtpHost}
                        onChange={(e) => handleEmailConfigChange('smtpHost', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtp-port">Porta</Label>
                      <Input 
                        id="smtp-port"
                        type="number"
                        value={emailConfig.smtpPort}
                        onChange={(e) => handleEmailConfigChange('smtpPort', parseInt(e.target.value))}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="smtp-user">Usuário</Label>
                      <Input 
                        id="smtp-user"
                        value={emailConfig.smtpUser}
                        onChange={(e) => handleEmailConfigChange('smtpUser', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="smtp-password">Senha</Label>
                      <Input 
                        id="smtp-password"
                        type="password"
                        value={emailConfig.smtpPassword}
                        onChange={(e) => handleEmailConfigChange('smtpPassword', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="from-name">Nome do Remetente</Label>
                      <Input 
                        id="from-name"
                        value={emailConfig.fromName}
                        onChange={(e) => handleEmailConfigChange('fromName', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="from-email">E-mail do Remetente</Label>
                      <Input 
                        id="from-email"
                        value={emailConfig.fromEmail}
                        onChange={(e) => handleEmailConfigChange('fromEmail', e.target.value)}
                      />
                    </div>
                  </div>
                  <Button className="bg-solar-600 hover:bg-solar-700">
                    Testar Configurações
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Templates de E-mail</CardTitle>
                  <CardDescription>Gerencie modelos de e-mail automáticos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Boas-vindas para Afiliados</p>
                        <p className="text-sm text-gray-500">Enviado quando um novo afiliado se cadastra</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Confirmação de Venda</p>
                        <p className="text-sm text-gray-500">Enviado quando uma venda é confirmada</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">Pagamento de Comissão</p>
                        <p className="text-sm text-gray-500">Enviado quando comissões são pagas</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
    </div>
  </main>
  );
}
