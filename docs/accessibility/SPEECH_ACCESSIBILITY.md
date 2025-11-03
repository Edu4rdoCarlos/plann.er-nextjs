# Leitura por Voz (Text-to-Speech) - Plann.er

## 📋 Resumo

Este documento descreve a funcionalidade de leitura por voz (Text-to-Speech) implementada na aplicação Plann.er, que utiliza a API Web Speech Synthesis do navegador para ler em voz alta os elementos durante a navegação por teclado.

## 🎯 Objetivo

Proporcionar uma experiência totalmente acessível para:
- Usuários com deficiência visual
- Usuários que preferem feedback auditivo
- Usuários aprendendo a navegar por teclado
- Qualquer pessoa que se beneficie de confirmação sonora das ações

## 🎤 Como Funciona

### Tecnologia Utilizada

A funcionalidade utiliza a **Web Speech API**, especificamente a interface `SpeechSynthesis`, que está disponível nativamente na maioria dos navegadores modernos.

**Compatibilidade:**
- ✅ Chrome/Edge (Chromium): Suporte completo
- ✅ Firefox: Suporte completo
- ✅ Safari: Suporte completo
- ✅ Opera: Suporte completo
- ❌ IE 11: Não suportado

### Como Ativar

1. Clique no ícone de acessibilidade (♿) no cabeçalho
2. Ative o toggle **"Leitura por Voz"**
3. A preferência é salva automaticamente no navegador

### O que é Lido

#### 1. Navegação Geral por Teclado
Quando a leitura por voz está ativada, **todos os elementos** que recebem foco são lidos automaticamente:

- **Botões**: O texto ou aria-label do botão
- **Links**: O texto do link
- **Inputs**: O placeholder ou valor atual
- **Labels**: O texto descritivo

**Prioridade de leitura:**
1. `aria-label` (se presente)
2. `title` (se presente)
3. `placeholder` para inputs
4. `textContent` do elemento (limitado a 200 caracteres)

#### 2. Modais (Dialog)
- **Ao abrir**: Anuncia "Modal aberto"
- **Ao fechar com Escape**: Anuncia "Modal fechado"
- **Elementos internos**: Lê cada elemento ao receber foco

#### 3. SelectWithSearch (Seleção de Localização)
- **Ao navegar com setas**: Lê o nome da cidade/localização destacada
- **Exemplo**: "São Paulo", "Rio de Janeiro", "Belo Horizonte"

#### 4. MenuAvatar (Menu do Usuário)
- **Ao abrir**: Anuncia "Menu do usuário aberto"
- **Ao fechar com Escape**: Anuncia "Menu fechado"
- **Navegação com setas**: Lê cada item do menu
  - "Configurações"
  - "Sair"
- **Navegação com Home/End**: Lê o primeiro/último item

#### 5. Skip Links
- **Ao focar**: Lê o texto do link
  - "Pular para o conteúdo principal"
  - "Pular para navegação"

## 🏗️ Arquitetura Técnica

### Hook Principal: useSpeech

**Localização**: `src/hooks/useSpeech.ts`

**Funções Exportadas:**

```typescript
const {
  speak,           // Falar texto diretamente
  speakElement,    // Falar conteúdo de um elemento
  announce,        // Anunciar mensagem de contexto
  stop,            // Parar fala atual
  pause,           // Pausar fala
  resume,          // Resumir fala pausada
  isSpeaking,      // Verificar se está falando
  isSupported      // Verificar se navegador suporta
} = useSpeech(enabled);
```

**Opções de Fala:**

```typescript
interface SpeechOptions {
  rate?: number;    // Velocidade (0.1 a 10, padrão: 1.0)
  pitch?: number;   // Tom (0 a 2, padrão: 1.0)
  volume?: number;  // Volume (0 a 1, padrão: 1.0)
  lang?: string;    // Idioma (padrão: "pt-BR")
}
```

### Hook de Navegação: useSpeechNavigation

**Localização**: `src/hooks/useSpeech.ts`

Este hook é usado automaticamente pelo `AccessibilityProvider` e:
- Escuta eventos de foco (focusin) em toda a página
- Fala automaticamente o conteúdo do elemento focado
- Adiciona delay de 100ms para garantir que o elemento está pronto

### Integração com Componentes

#### Dialog
```typescript
const { announce } = useSpeech(preferences.speechEnabled);

useEffect(() => {
  if (open) {
    announce("Modal aberto");
  }
}, [open, announce]);
```

#### SelectWithSearch
```typescript
const { speak } = useSpeech(preferences.speechEnabled);

useEffect(() => {
  if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
    speak(filteredOptions[selectedIndex]);
  }
}, [selectedIndex, filteredOptions, speak]);
```

#### MenuAvatar
```typescript
const { speak, announce } = useSpeech(preferences.speechEnabled);

// Ao navegar
const nextText = menuItemsRef.current[nextIndex]?.textContent;
if (nextText) speak(nextText);
```

## 📦 Arquivos Criados/Modificados

### Novos Arquivos

1. **`src/hooks/useSpeech.ts`**
   - Hook principal de síntese de fala
   - useSpeech e useSpeechNavigation
   - Lógica de extração de texto de elementos

### Arquivos Modificados

1. **`src/types/accessibility.ts`**
   - Adicionado `speechEnabled: boolean`

2. **`src/store/accessibility.ts`**
   - Adicionado `setSpeechEnabled` action
   - Persistência de preferência no localStorage
   - Migração de versão 1 → 2

3. **`src/providers/AccessibilityProvider.tsx`**
   - Integração com `useSpeechNavigation`
   - Exposição de `setSpeechEnabled` no contexto

4. **`src/components/compounds/AccessibilityPanel/AccessibilityPanel.tsx`**
   - Novo toggle "Leitura por Voz"
   - Ícone Volume2
   - Descrição explicativa

5. **`src/components/primitives/Dialog/Dialog.tsx`**
   - Anúncio ao abrir/fechar
   - Integração com useSpeech

6. **`src/components/primitives/Select/SelectWithSearch.tsx`**
   - Fala opções ao navegar com setas
   - Integração com useSpeech

7. **`src/components/compounds/MenuAvatar/MenuAvatar.tsx`**
   - Anúncio ao abrir/fechar
   - Fala itens ao navegar
   - Integração com useSpeech

## 🎨 Interface do Usuário

### Painel de Acessibilidade

```
┌─────────────────────────────────────┐
│ Configurações de Acessibilidade    │
│ Personalize a experiência...       │
├─────────────────────────────────────┤
│ 📝 Tamanho da Fonte                 │
│ [A-] [A+] [0]                       │
├─────────────────────────────────────┤
│ 👁️ Foco Melhorado         [●─────]  │
│ Destaca elementos em foco...       │
├─────────────────────────────────────┤
│ 🔊 Leitura por Voz        [─────●]  │
│ Lê em voz alta os elementos...    │
└─────────────────────────────────────┘
```

### Feedback Visual

Quando ativado, o toggle fica:
- **Cor de fundo**: Verde lima (bg-lime-500)
- **Posição**: Botão deslizado para a direita
- **Ícone**: Volume2 (alto-falante)

## 🧪 Como Testar

### Teste Básico
1. Abra a aplicação
2. Pressione Tab até o ícone de acessibilidade
3. Ative "Leitura por Voz"
4. Pressione Tab
5. **Resultado esperado**: Deve ouvir o texto do próximo elemento

### Teste em Modal
1. Ative a leitura por voz
2. Abra qualquer modal (ex: criar atividade)
3. **Resultado esperado**: Ouvirá "Modal aberto"
4. Pressione Tab para navegar
5. **Resultado esperado**: Cada elemento é lido
6. Pressione Escape
7. **Resultado esperado**: Ouvirá "Modal fechado"

### Teste em SelectWithSearch
1. Ative a leitura por voz
2. Clique no campo de localização
3. Digite "São"
4. Pressione ↓ (seta para baixo)
5. **Resultado esperado**: Ouvirá o nome da cidade

### Teste em MenuAvatar
1. Ative a leitura por voz
2. Clique no avatar do usuário
3. **Resultado esperado**: Ouvirá "Menu do usuário aberto"
4. Pressione ↓ ou ↑
5. **Resultado esperado**: Ouvirá o nome de cada item

## ⚙️ Configuração Avançada

### Personalizar Voz

O hook aceita opções personalizadas:

```typescript
speak("Olá, mundo!", {
  rate: 1.5,      // 50% mais rápido
  pitch: 1.2,     // Tom mais alto
  volume: 0.8,    // 80% do volume
  lang: "pt-BR"   // Português do Brasil
});
```

### Vozes Disponíveis

Para listar todas as vozes disponíveis no navegador:

```javascript
const voices = window.speechSynthesis.getVoices();
voices.forEach(voice => {
  console.log(voice.name, voice.lang);
});
```

### Parar Fala Manualmente

```typescript
const { stop } = useSpeech(true);
stop(); // Para imediatamente
```

## 🐛 Troubleshooting

### A voz não está funcionando

**Problema**: Ativei a leitura por voz mas não ouço nada.

**Soluções**:
1. Verifique se o volume do dispositivo está ligado
2. Verifique se o navegador suporta Speech Synthesis
3. Abra o console e digite: `window.speechSynthesis`
4. Se undefined, o navegador não suporta

### A voz está muito rápida/lenta

**Solução**: Por padrão está em velocidade 1.0. Futuramente será possível ajustar nas configurações.

### A voz está em outro idioma

**Solução**: A aplicação força `lang: "pt-BR"`. Se ainda assim estiver errado, o navegador pode não ter voz em português instalada.

### A fala para no meio

**Problema**: A fala é interrompida ao navegar muito rápido.

**Solução**: Isso é esperado! O hook automaticamente cancela a fala anterior ao iniciar uma nova, evitando sobreposição de áudio.

## ♿ Benefícios de Acessibilidade

### WCAG 2.2 Compliance

Esta funcionalidade ajuda a atender:

- **1.3.1 Info and Relationships**: Informações são transmitidas por voz
- **2.4.3 Focus Order**: Ordem de foco é reforçada pelo áudio
- **2.4.7 Focus Visible**: Foco é anunciado verbalmente
- **4.1.3 Status Messages**: Mudanças de estado são anunciadas

### Usuários Beneficiados

✅ **Deficiência Visual**
- Navegação totalmente por áudio
- Confirmação de cada ação
- Compreensão da estrutura da página

✅ **Dislexia**
- Reforço auditivo do texto visual
- Reduz carga cognitiva

✅ **Aprendizagem**
- Feedback imediato sobre navegação
- Aprende atalhos de teclado com confirmação

✅ **Multitarefa**
- Pode navegar sem olhar para tela
- Útil para tarefas paralelas

## 🔐 Privacidade e Segurança

- ✅ Todo processamento ocorre **localmente** no navegador
- ✅ **Nenhum dado** é enviado para servidores externos
- ✅ A preferência é salva apenas no **localStorage** do navegador
- ✅ Funciona **offline** (após carregar a página)

## 🚀 Próximas Melhorias Sugeridas

- [ ] Ajuste de velocidade da voz (rate)
- [ ] Ajuste de tom da voz (pitch)
- [ ] Seleção de voz específica
- [ ] Atalho global para ativar/desativar (ex: Ctrl + Shift + S)
- [ ] Leitura de mensagens de erro e sucesso (toasts)
- [ ] Leitura de notificações
- [ ] Modo "leitura contínua" da página
- [ ] Anúncio de progresso em formulários multipasso
- [ ] Estatísticas de uso de voz

## 📚 Referências

- [Web Speech API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [SpeechSynthesis - MDN](https://developer.mozilla.org/en-US/docs/Web/API/SpeechSynthesis)
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM Screen Reader Testing](https://webaim.org/articles/screenreader_testing/)

---

**Última atualização**: 2025-10-27
**Versão**: 1.0.0
