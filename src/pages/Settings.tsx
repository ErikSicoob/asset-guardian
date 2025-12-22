import { Settings as SettingsIcon, Building2, Shield, Database, Bell, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

export default function Settings() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Configurações</h1>
        <p className="text-muted-foreground">
          Gerencie as configurações do sistema
        </p>
      </div>

      {/* Settings Sections */}
      <div className="space-y-6">
        {/* Company Settings */}
        <div className="bg-card border rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Dados da Empresa</h2>
              <p className="text-sm text-muted-foreground">
                Informações básicas da organização
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                Nome da Empresa
              </label>
              <Input defaultValue="Empresa Exemplo LTDA" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">
                CNPJ
              </label>
              <Input defaultValue="00.000.000/0001-00" />
            </div>
          </div>

          <Button>Salvar Alterações</Button>
        </div>

        {/* Security Settings */}
        <div className="bg-card border rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-destructive/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-destructive" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Segurança</h2>
              <p className="text-sm text-muted-foreground">
                Configurações de autenticação e acesso
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-foreground">Integração com Active Directory</p>
                <p className="text-sm text-muted-foreground">
                  Autenticação centralizada via AD
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-foreground">Autenticação em Dois Fatores</p>
                <p className="text-sm text-muted-foreground">
                  Exigir 2FA para todos os usuários
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-foreground">Sessão Automática</p>
                <p className="text-sm text-muted-foreground">
                  Encerrar sessão após 30 minutos de inatividade
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Data Settings */}
        <div className="bg-card border rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-status-maintenance-bg flex items-center justify-center">
              <Database className="h-5 w-5 text-status-maintenance" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Dados e Backup</h2>
              <p className="text-sm text-muted-foreground">
                Gerenciamento de dados e backups
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-foreground">Backup Automático</p>
                <p className="text-sm text-muted-foreground">
                  Realizar backup diário às 03:00
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-foreground">Retenção de Logs</p>
                <p className="text-sm text-muted-foreground">
                  Manter logs por 5 anos (LGPD)
                </p>
              </div>
              <Switch defaultChecked disabled />
            </div>
          </div>

          <Button variant="outline">Fazer Backup Agora</Button>
        </div>

        {/* Notification Settings */}
        <div className="bg-card border rounded-xl p-6 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-status-active-bg flex items-center justify-center">
              <Bell className="h-5 w-5 text-status-active" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">Notificações</h2>
              <p className="text-sm text-muted-foreground">
                Configure alertas e notificações
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-foreground">Alertas de Manutenção</p>
                <p className="text-sm text-muted-foreground">
                  Notificar sobre manutenções pendentes
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3 border-b">
              <div>
                <p className="font-medium text-foreground">Ativos Ociosos</p>
                <p className="text-sm text-muted-foreground">
                  Alertar sobre ativos sem movimentação há 90 dias
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-foreground">E-mail de Relatórios</p>
                <p className="text-sm text-muted-foreground">
                  Enviar relatório semanal por e-mail
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
