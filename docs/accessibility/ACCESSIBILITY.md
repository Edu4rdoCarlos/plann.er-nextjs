# Funcionalidades de Acessibilidade - Low Vision

Este documento descreve as funcionalidades de acessibilidade implementadas no Plann.er para usuários com baixa visão, seguindo as diretrizes WCAG 2.2 Level AA.

## 🎯 Funcionalidades Implementadas

### 1. Controle de Tamanho de Fonte

- **Pequeno (A-)**: 14px base, adequado para telas pequenas
- **Médio (A)**: 16px base, tamanho padrão recomendado
- **Grande (A+)**: 18px base, ideal para baixa visão

### 2. Foco Visível Melhorado

- Outline de 3px com contraste 3:1 (WCAG AA)
- Cores: Verde lima (#10b981) com fundo branco
- Aplicado a todos os elementos interativos
- Box-shadow adicional para maior visibilidade

### 3. Suporte a Zoom 200%

- Layout responsivo que não quebra com zoom
- Unidades relativas em componentes
- Breakpoints adaptativos
- Touch targets mínimos de 44x44px

## 🛠️ Como Usar

### Para Usuários

1. Clique no ícone de acessibilidade (♿) no header
2. Selecione o tamanho de fonte desejado (A-, A, A+)
3. Ative/desative o foco melhorado conforme necessário
4. As preferências são salvas automaticamente

### Para Desenvolvedores

#### Usando o Hook de Acessibilidade

```typescript
import { useAccessibility } from "@/src/providers/AccessibilityProvider";

function MyComponent() {
  const { preferences, setFontSize, setEnhancedFocus } = useAccessibility();

  return (
    <div>
      <p>Tamanho atual: {preferences.fontSize}</p>
      <button onClick={() => setFontSize("large")}>Aumentar fonte</button>
    </div>
  );
}
```

#### Aplicando Classes CSS

```css
/* As classes são aplicadas automaticamente no documentElement */
.font-size-small {
  font-size: 0.875rem;
}
.font-size-medium {
  font-size: 1rem;
}
.font-size-large {
  font-size: 1.125rem;
}
.enhanced-focus *:focus {
  /* estilos de foco melhorado */
}
```

## 📁 Arquivos Criados/Modificados

### Novos Arquivos

- `src/types/accessibility.ts` - Tipos TypeScript
- `src/store/accessibility.ts` - Store Zustand
- `src/providers/AccessibilityProvider.tsx` - Provider React
- `src/components/compounds/AccessibilityPanel/` - Componente UI

### Arquivos Modificados

- `src/app/globals.css` - Estilos CSS de acessibilidade
- `src/app/layout.tsx` - Registro do provider
- `src/components/compounds/Layout/Header/index.tsx` - Integração
- `src/providers/index.ts` - Export do provider
- Componentes primitivos - Touch targets mínimos

## 🧪 Testando Acessibilidade

### Teste de Zoom 200%

1. Abra o DevTools (F12)
2. Defina zoom para 200%
3. Verifique se o layout não quebra
4. Teste navegação por teclado

### Teste de Contraste

1. Ative o foco melhorado
2. Navegue com Tab
3. Verifique se o foco é claramente visível
4. Teste em diferentes temas (claro/escuro)

### Teste de Tamanho de Fonte

1. Teste todos os tamanhos (pequeno, médio, grande)
2. Verifique se o texto permanece legível
3. Teste em diferentes resoluções de tela

## 🎨 Design System

### Cores de Foco

- **Cor principal**: #10b981 (lime-500)
- **Contraste**: 3:1 (WCAG AA)
- **Outline**: 3px sólido
- **Offset**: 2px

### Tamanhos de Fonte

- **Base**: 16px (1rem)
- **Pequeno**: 14px (0.875rem) - 87.5% da base
- **Grande**: 18px (1.125rem) - 112.5% da base

### Touch Targets

- **Mínimo**: 44x44px
- **Aplicado**: Botões, inputs, links interativos
- **Responsivo**: Adapta-se ao zoom

## 🔄 Persistência

As preferências são salvas no `localStorage` com a chave `accessibility-storage`:

```json
{
  "fontSize": "medium",
  "enhancedFocus": false
}
```

## 🎹 Navegação por Teclado Avançada

### Funcionalidades Implementadas

#### 1. Skip Links (Links de Navegação Rápida)
- Links invisíveis que aparecem ao pressionar Tab
- Permitem pular para conteúdo principal ou navegação
- Aparecem no topo da página ao receber foco

#### 2. Focus Trap em Modais
- Foco fica contido dentro do modal quando aberto
- Tab circular entre elementos focáveis
- Escape fecha o modal e retorna foco ao elemento anterior
- Implementado via hook `useFocusTrap`

#### 3. Navegação em Dropdowns
- **SelectWithSearch**:
  - ↑↓ para navegar opções
  - Enter para selecionar
  - Escape para fechar
  - Destaque visual na opção selecionada
- **MenuAvatar**:
  - ↑↓ para navegar itens do menu
  - Home/End para primeiro/último item
  - Enter para ativar item
  - Escape para fechar menu

#### 4. Painel de Ajuda de Atalhos
- Botão flutuante com ícone de teclado
- Atalho global: Shift + ?
- Lista completa de atalhos disponíveis
- Organizado por categorias

#### 5. Atributos ARIA
- `role="dialog"` em modais
- `role="menu"` e `role="menuitem"` em menus
- `role="combobox"` em selects
- `aria-expanded`, `aria-controls`, `aria-activedescendant`
- `aria-label` em elementos interativos

### Atalhos de Teclado Globais

| Atalho | Descrição |
|--------|-----------|
| Tab | Navegar para próximo elemento |
| Shift + Tab | Navegar para elemento anterior |
| Enter | Ativar elemento focado |
| Espaço | Ativar botão/checkbox |
| Escape | Fechar modal/dropdown |
| Shift + ? | Mostrar painel de ajuda |
| ↑↓ | Navegar em listas/menus |
| Home/End | Primeiro/último item |

### Arquivos Adicionados

- `src/hooks/useFocusTrap.ts` - Hook para focus trap
- `src/hooks/useKeyboardShortcuts.ts` - Hook para atalhos globais
- `src/components/primitives/SkipLinks/` - Links de navegação rápida
- `src/components/compounds/KeyboardShortcutsHelp/` - Painel de ajuda

### Componentes Melhorados

- `Dialog` - Focus trap, Escape para fechar, role="dialog"
- `SelectWithSearch` - Navegação por setas, role="combobox"
- `MenuAvatar` - Navegação completa, role="menu"
- `Header` - IDs para skip links, aria-labels

## 🔊 Leitura por Voz (Text-to-Speech)

### Funcionalidade Implementada

A aplicação agora inclui **leitura por voz** que lê em voz alta os elementos durante a navegação por teclado.

#### Como Ativar
1. Abra o painel de acessibilidade (ícone ♿)
2. Ative o toggle "Leitura por Voz"
3. Navegue pela aplicação com Tab

#### O que é Lido
- **Todos os elementos focados**: Botões, links, inputs
- **Modais**: Anuncia abertura e fechamento
- **Listas de opções**: Lê cada item ao navegar com setas
- **Menus**: Anuncia abertura e cada item

#### Tecnologia
- Utiliza Web Speech API (nativa do navegador)
- Processamento 100% local
- Funciona offline
- Idioma: Português (pt-BR)

**Documentação completa**: [SPEECH_ACCESSIBILITY.md](SPEECH_ACCESSIBILITY.md)

## 🚀 Próximos Passos

- [x] Suporte a mais tamanhos de fonte
- [x] Navegação por teclado avançada
- [x] Leitura por voz (Text-to-Speech)
- [ ] Alto contraste (tema escuro/claro)
- [ ] Redução de movimento (prefers-reduced-motion)
- [x] Leitores de tela (ARIA labels)
- [ ] Ajuste de velocidade da voz
- [ ] Seleção de voz específica

## 📚 Referências

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
