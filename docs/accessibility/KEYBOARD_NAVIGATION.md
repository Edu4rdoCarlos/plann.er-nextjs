# Guia de Navegação por Teclado - Plann.er

## 📋 Resumo

Este documento descreve todas as funcionalidades de navegação por teclado implementadas na aplicação Plann.er, garantindo acessibilidade completa para usuários que dependem do teclado.

## 🎯 Funcionalidades Implementadas

### 1. Skip Links (Links de Atalho)
**O que são**: Links invisíveis que aparecem ao pressionar Tab na primeira vez.

**Como usar**:
- Pressione Tab ao carregar qualquer página
- Verá opções para "Pular para o conteúdo principal" e "Pular para navegação"
- Pressione Enter para ir diretamente ao destino

**Benefício**: Economiza tempo ao não precisar navegar por todos os elementos do cabeçalho.

### 2. Focus Trap em Modais
**O que é**: Quando um modal está aberto, o foco fica contido dentro dele.

**Como funciona**:
- Tab navega apenas entre elementos do modal
- Ao chegar no último elemento, Tab volta ao primeiro (circular)
- Escape fecha o modal e retorna o foco ao elemento que o abriu

**Modais com suporte**:
- CreateActivity
- InviteMember
- ConfirmTrip
- CreateAttachment
- KeyboardShortcutsHelp

### 3. SelectWithSearch (Seleção de Localização)
**Atalhos disponíveis**:
- `↓` (Seta para baixo): Navega para a próxima opção
- `↑` (Seta para cima): Navega para a opção anterior
- `Enter`: Seleciona a opção destacada
- `Escape`: Fecha o dropdown
- `Mouse hover`: Destaca a opção ao passar o mouse

**Feedback visual**:
- Opção selecionada tem fundo verde claro (bg-lime-500/20)
- Scroll automático para manter item visível

### 4. MenuAvatar (Menu do Usuário)
**Atalhos disponíveis**:
- `↓` (Seta para baixo): Próximo item do menu
- `↑` (Seta para cima): Item anterior do menu
- `Home`: Vai para o primeiro item
- `End`: Vai para o último item
- `Enter` ou `Espaço`: Ativa o item selecionado
- `Escape`: Fecha o menu e retorna foco ao avatar

**Comportamento**:
- Abre automaticamente focando no primeiro item
- Navegação circular entre itens
- Ao fechar, retorna foco ao botão avatar

### 5. Painel de Ajuda de Atalhos
**Como acessar**:
- Pressione `Shift + ?` em qualquer lugar da aplicação
- Ou clique no botão flutuante (ícone de teclado) no canto inferior direito

**Conteúdo**:
- Lista completa de atalhos organizados por categoria
- Navegação Geral
- Listas e Seleções
- Modais
- Skip Links

### 6. Componente Dialog Melhorado
**Funcionalidades**:
- `Escape`: Fecha o modal (se closable=true)
- Focus trap automático
- Previne scroll do body quando aberto
- Atributos ARIA corretos (role="dialog", aria-modal="true")
- Botão de fechar com aria-label

## 🎹 Tabela Completa de Atalhos

### Navegação Global
| Atalho | Ação |
|--------|------|
| `Tab` | Navegar para o próximo elemento focável |
| `Shift + Tab` | Navegar para o elemento anterior |
| `Enter` | Ativar botão, link ou controle focado |
| `Espaço` | Ativar botão ou checkbox focado |
| `Escape` | Fechar modal ou dropdown aberto |
| `Shift + ?` | Abrir/fechar painel de ajuda de atalhos |

### Listas e Dropdowns
| Atalho | Ação |
|--------|------|
| `↓` | Navegar para o próximo item |
| `↑` | Navegar para o item anterior |
| `Enter` | Selecionar item destacado |
| `Escape` | Fechar lista/dropdown |
| `Home` | Ir para o primeiro item (menus) |
| `End` | Ir para o último item (menus) |

### Modais
| Atalho | Ação |
|--------|------|
| `Tab` | Navegar entre elementos do modal |
| `Shift + Tab` | Navegar para trás no modal |
| `Escape` | Fechar modal |
| `Enter` | Confirmar ação (quando aplicável) |

## 🏗️ Arquitetura Técnica

### Hooks Customizados

#### useFocusTrap
**Localização**: `src/hooks/useFocusTrap.ts`

**Funcionalidades**:
- Identifica todos os elementos focáveis no container
- Implementa navegação circular com Tab
- Salva e restaura foco anterior
- Foca automaticamente no primeiro elemento

**Uso**:
```tsx
const focusTrapRef = useFocusTrap(isOpen);
<div ref={focusTrapRef}>{/* conteúdo do modal */}</div>
```

#### useKeyboardShortcuts
**Localização**: `src/hooks/useKeyboardShortcuts.ts`

**Funcionalidades**:
- Registra atalhos globais de teclado
- Ignora atalhos quando digitando em inputs
- Suporta modificadores (Ctrl, Alt, Shift, Meta)
- Permite atalho Escape mesmo em inputs

**Uso**:
```tsx
useKeyboardShortcuts([
  {
    key: 'k',
    ctrl: true,
    callback: () => openSearch(),
    description: 'Abrir busca'
  }
]);
```

### Componentes Criados

#### SkipLinks
**Localização**: `src/components/primitives/SkipLinks/`

**Estilo**:
- Posicionado fora da tela por padrão
- Aparece ao receber foco (transform: translateY(0))
- Fundo verde lima com texto escuro
- z-index alto para ficar acima de tudo

#### KeyboardShortcutsHelp
**Localização**: `src/components/compounds/KeyboardShortcutsHelp/`

**Características**:
- Botão flutuante fixo no canto inferior direito
- Modal com lista de atalhos organizados
- Atalho global Shift + ? para abrir/fechar
- Scroll interno se lista for longa

### Componentes Melhorados

#### Dialog
**Mudanças**:
- Adicionado `useFocusTrap`
- Listener para tecla Escape
- Previne scroll do body
- Atributos ARIA: role, aria-modal
- Trigger acessível por teclado

#### SelectWithSearch
**Mudanças**:
- Estado `selectedIndex` para item destacado
- Handler `handleKeyDown` para setas e Enter
- Atributos ARIA: role="combobox", aria-expanded, aria-activedescendant
- Scroll automático para item selecionado
- Feedback visual (background verde)

#### MenuAvatar
**Mudanças**:
- Navegação completa por setas, Home, End
- Foco automático no primeiro item ao abrir
- Refs para todos os itens do menu
- Escape fecha e retorna foco
- Atributos ARIA: role="menu", role="menuitem"

#### Header
**Mudanças**:
- ID "navigation" para skip link
- aria-label nos links
- Estilos de foco visíveis em links

#### Layout (Dashboard)
**Mudanças**:
- Tag `<main>` com ID "main-content"
- Estrutura semântica correta

## ♿ Atributos ARIA Utilizados

### Roles
- `role="dialog"` - Modais
- `role="menu"` - Menus dropdown
- `role="menuitem"` - Itens de menu
- `role="combobox"` - Select com busca
- `role="listbox"` - Lista de opções
- `role="option"` - Item da lista
- `role="button"` - Elementos clicáveis não-button

### Estados e Propriedades
- `aria-expanded` - Indica se dropdown está aberto
- `aria-haspopup` - Indica que elemento tem popup
- `aria-controls` - ID do elemento controlado
- `aria-activedescendant` - Item ativo em lista
- `aria-selected` - Item selecionado em lista
- `aria-modal` - Indica modal que bloqueia conteúdo atrás
- `aria-label` - Label descritivo para leitores de tela

## 🧪 Como Testar

### Teste 1: Skip Links
1. Abra qualquer página da aplicação
2. Pressione Tab
3. Deve ver "Pular para o conteúdo principal"
4. Pressione Enter
5. Foco deve ir para o conteúdo principal

### Teste 2: Focus Trap em Modal
1. Abra qualquer modal (ex: criar atividade)
2. Pressione Tab repetidamente
3. Foco deve circular entre elementos do modal
4. Não deve focar em elementos fora do modal
5. Pressione Escape
6. Modal fecha e foco retorna ao botão que abriu

### Teste 3: SelectWithSearch
1. Clique no campo de localização
2. Digite algumas letras
3. Pressione ↓ para navegar opções
4. Item deve ser destacado visualmente
5. Pressione Enter para selecionar
6. Valor deve ser preenchido

### Teste 4: MenuAvatar
1. Pressione Tab até chegar no avatar
2. Pressione Enter para abrir menu
3. Use ↓↑ para navegar
4. Use Home/End para primeiro/último
5. Pressione Enter para selecionar opção
6. Ou Escape para fechar

### Teste 5: Painel de Ajuda
1. Pressione Shift + ?
2. Painel deve abrir
3. Use Tab para navegar
4. Pressione Escape ou Shift + ? novamente para fechar

## 📈 Benefícios de Acessibilidade

✅ **WCAG 2.2 Level AA Compliant**
- 2.1.1 Keyboard - Toda funcionalidade via teclado
- 2.1.2 No Keyboard Trap - Focus trap correto em modais
- 2.4.1 Bypass Blocks - Skip links implementados
- 2.4.3 Focus Order - Ordem lógica de foco
- 2.4.7 Focus Visible - Indicadores claros de foco

✅ **Usuários Beneficiados**
- Pessoas com deficiência motora
- Usuários de leitores de tela
- Usuários avançados que preferem teclado
- Pessoas com fadiga ou RSI
- Usuários em situações temporárias (mão ocupada, mouse quebrado)

## 🚀 Próximas Melhorias Sugeridas

- [ ] Atalhos customizáveis pelo usuário
- [ ] Navegação por tecla "/" para busca global
- [ ] Atalhos numéricos para ações rápidas (1-9)
- [ ] Modo "vim" para navegação avançada
- [ ] Indicador visual de atalhos em botões (badges)
- [ ] Tour interativo de atalhos para novos usuários
- [ ] Estatísticas de uso de atalhos
- [ ] Exportar/importar configurações de atalhos

## 📚 Referências

- [WCAG 2.2 Keyboard Accessible](https://www.w3.org/WAI/WCAG22/Understanding/keyboard-accessible)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [WebAIM Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [MDN Keyboard-navigable JavaScript widgets](https://developer.mozilla.org/en-US/docs/Web/Accessibility/Keyboard-navigable_JavaScript_widgets)

---

**Última atualização**: 2025-10-27
**Versão**: 1.0.0
