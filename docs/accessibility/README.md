# 📚 Documentação de Acessibilidade - Plann.er

Bem-vindo à documentação completa de acessibilidade da aplicação Plann.er!

## 📖 Índice de Documentos

### 1. [ACCESSIBILITY.md](./ACCESSIBILITY.md) - Visão Geral
**Documento principal** com visão completa das funcionalidades de acessibilidade.

**Conteúdo:**
- ✅ Controle de tamanho de fonte (-2 a +2)
- ✅ Foco visível melhorado (WCAG 2.2 AA)
- ✅ Suporte a zoom 200%
- ✅ Touch targets 44x44px
- ✅ Navegação por teclado avançada
- ✅ Leitura por voz (Text-to-Speech)
- ✅ ARIA completo
- 📋 Guia de uso para desenvolvedores
- 🧪 Instruções de testes

**Leia este documento primeiro** para entender todas as funcionalidades disponíveis.

---

### 2. [KEYBOARD_NAVIGATION.md](./KEYBOARD_NAVIGATION.md) - Navegação por Teclado
**Guia completo** de navegação por teclado e atalhos.

**Conteúdo:**
- 🎹 Skip Links (links de atalho)
- 🔒 Focus Trap em modais
- ⌨️ Atalhos de teclado globais
- 🎯 Navegação em componentes (SelectWithSearch, MenuAvatar)
- 📋 Tabela completa de atalhos
- 🏗️ Arquitetura técnica (hooks)
- ♿ Conformidade WCAG 2.2
- 🧪 Guias de teste

**Leia este documento** se você quer entender como navegar pela aplicação usando apenas o teclado.

---

### 3. [SPEECH_ACCESSIBILITY.md](./SPEECH_ACCESSIBILITY.md) - Leitura por Voz
**Guia completo** da funcionalidade Text-to-Speech.

**Conteúdo:**
- 🎤 Como funciona a leitura por voz
- 🔊 O que é lido (modais, menus, listas)
- ⚙️ Tecnologia (Web Speech API)
- 🏗️ Arquitetura técnica (useSpeech hook)
- 🎨 Interface do usuário
- 🧪 Como testar
- 🐛 Troubleshooting
- ♿ Benefícios de acessibilidade

**Leia este documento** para entender como usar e implementar a funcionalidade de leitura por voz.

---

## 🚀 Começo Rápido

### Para Usuários

**Ativar Acessibilidade:**
1. Clique no ícone ♿ no cabeçalho
2. Ajuste o tamanho da fonte (A-, A+)
3. Ative o foco melhorado (se necessário)
4. Ative a leitura por voz (se desejado)

**Navegar por Teclado:**
- `Tab` - Próximo elemento
- `Shift + Tab` - Elemento anterior
- `Enter` - Ativar elemento
- `Escape` - Fechar modal/menu
- `Shift + ?` - Ver todos os atalhos

### Para Desenvolvedores

**Usar hook de acessibilidade:**
```typescript
import { useAccessibility } from "@/src/providers/AccessibilityProvider";

const { preferences, setFontSize, setSpeechEnabled } = useAccessibility();
```

**Usar síntese de fala:**
```typescript
import { useSpeech } from "@/src/hooks/useSpeech";

const { speak, announce } = useSpeech(preferences.speechEnabled);
speak("Olá, mundo!");
```

**Criar componente acessível:**
```typescript
<button
  onClick={handleClick}
  aria-label="Descrição clara"
  aria-expanded={isOpen}
>
  Texto do botão
</button>
```

---

## 📊 Resumo de Funcionalidades

| Funcionalidade | Status | WCAG | Documento |
|----------------|--------|------|-----------|
| Ajuste de fonte | ✅ | 1.4.4 | [ACCESSIBILITY.md](./ACCESSIBILITY.md) |
| Foco melhorado | ✅ | 2.4.7 | [ACCESSIBILITY.md](./ACCESSIBILITY.md) |
| Skip links | ✅ | 2.4.1 | [KEYBOARD_NAVIGATION.md](./KEYBOARD_NAVIGATION.md) |
| Focus trap | ✅ | 2.1.2 | [KEYBOARD_NAVIGATION.md](./KEYBOARD_NAVIGATION.md) |
| Atalhos de teclado | ✅ | 2.1.1 | [KEYBOARD_NAVIGATION.md](./KEYBOARD_NAVIGATION.md) |
| Text-to-Speech | ✅ | 1.3.1 | [SPEECH_ACCESSIBILITY.md](./SPEECH_ACCESSIBILITY.md) |
| ARIA completo | ✅ | 4.1.2 | Todos |
| Zoom 200% | ✅ | 1.4.4 | [ACCESSIBILITY.md](./ACCESSIBILITY.md) |
| Touch targets | ✅ | 2.5.5 | [ACCESSIBILITY.md](./ACCESSIBILITY.md) |

---

## 🎯 Conformidade WCAG 2.2

A aplicação Plann.er está em conformidade com **WCAG 2.2 Level AA**:

### Princípio 1: Perceptível
- ✅ 1.3.1 Info and Relationships
- ✅ 1.4.4 Resize Text
- ✅ 1.4.11 Non-text Contrast

### Princípio 2: Operável
- ✅ 2.1.1 Keyboard
- ✅ 2.1.2 No Keyboard Trap
- ✅ 2.4.1 Bypass Blocks
- ✅ 2.4.3 Focus Order
- ✅ 2.4.7 Focus Visible
- ✅ 2.5.5 Target Size

### Princípio 3: Compreensível
- ✅ 3.2.4 Consistent Identification

### Princípio 4: Robusto
- ✅ 4.1.2 Name, Role, Value
- ✅ 4.1.3 Status Messages

---

## 🏗️ Arquitetura

### Estrutura de Pastas
```
src/
├── hooks/
│   ├── useFocusTrap.ts           # Focus trap para modais
│   ├── useKeyboardShortcuts.ts   # Atalhos globais
│   └── useSpeech.ts              # Síntese de fala
├── components/
│   ├── primitives/
│   │   ├── Dialog/               # Modal com focus trap
│   │   ├── Select/               # SelectWithSearch com navegação
│   │   └── SkipLinks/            # Links de navegação rápida
│   └── compounds/
│       ├── AccessibilityPanel/   # Painel de configurações
│       ├── KeyboardShortcutsHelp/ # Ajuda de atalhos
│       └── MenuAvatar/           # Menu com navegação
├── providers/
│   └── AccessibilityProvider.tsx # Provedor global
├── store/
│   └── accessibility.ts          # Store Zustand
└── types/
    └── accessibility.ts          # Tipos TypeScript
```

### Componentes Principais

| Componente | Responsabilidade |
|------------|------------------|
| `AccessibilityProvider` | Gerencia preferências globais |
| `AccessibilityPanel` | UI para configurar acessibilidade |
| `useFocusTrap` | Prende foco dentro de modais |
| `useSpeech` | Síntese de fala |
| `useKeyboardShortcuts` | Registra atalhos globais |
| `SkipLinks` | Links de navegação rápida |
| `KeyboardShortcutsHelp` | Modal de ajuda |

---

## 🧪 Como Testar

### Teste Rápido (5 minutos)
1. **Tab**: Navegue pela página
2. **Skip Link**: Pressione Tab e Enter no primeiro link
3. **Modal**: Abra um modal e teste Tab/Escape
4. **Voz**: Ative leitura por voz e navegue
5. **Fonte**: Ajuste tamanho da fonte

### Teste Completo
Siga os guias de teste em cada documento específico.

---

## 🤝 Contribuindo

### Ao adicionar novos componentes:

1. **ARIA**: Adicione roles e atributos apropriados
2. **Keyboard**: Garanta navegação por teclado
3. **Focus**: Teste focus trap se for modal
4. **Speech**: Adicione aria-label descritivo
5. **Docs**: Atualize a documentação

### Checklist de Acessibilidade:
- [ ] Componente navegável por teclado
- [ ] ARIA roles e atributos corretos
- [ ] Contraste de cores adequado
- [ ] Touch targets >= 44x44px
- [ ] Funciona com zoom 200%
- [ ] Suporta leitores de tela
- [ ] Testado com voz ativada

---

## 📞 Suporte

### Problemas Comuns

**"Não consigo navegar por teclado"**
→ Veja [KEYBOARD_NAVIGATION.md](./KEYBOARD_NAVIGATION.md)

**"Voz não está funcionando"**
→ Veja seção Troubleshooting em [SPEECH_ACCESSIBILITY.md](./SPEECH_ACCESSIBILITY.md)

**"Como ajustar o tamanho da fonte?"**
→ Veja seção "Como Usar" em [ACCESSIBILITY.md](./ACCESSIBILITY.md)

### Reportar Bugs
Abra uma issue no GitHub com:
- Navegador e versão
- Funcionalidade afetada
- Passos para reproduzir
- Comportamento esperado vs atual

---

## 📚 Recursos Externos

### Padrões e Diretrizes
- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM](https://webaim.org/)

### Ferramentas de Teste
- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WAVE](https://wave.webaim.org/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

### APIs Utilizadas
- [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)
- [ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA)

---

## 📈 Histórico de Versões

### v1.0.0 (2025-10-27)
- ✅ Sistema completo de navegação por teclado
- ✅ Leitura por voz (Text-to-Speech)
- ✅ Skip links e focus trap
- ✅ Painel de ajuda de atalhos
- ✅ Ajuste de tamanho de fonte
- ✅ Foco melhorado
- ✅ ARIA completo em todos os componentes

---

**Última atualização**: 2025-10-27
**Versão**: 1.0.0
**Conformidade**: WCAG 2.2 Level AA
