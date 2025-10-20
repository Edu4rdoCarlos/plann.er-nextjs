# Sistema de Internacionalização (i18n)

Este projeto utiliza **next-intl** para suporte a múltiplos idiomas.

## 🌍 Idiomas Suportados

- 🇧🇷 **Português** (pt) - Idioma padrão
- 🇺🇸 **English** (en)
- 🇪🇸 **Español** (es)

## 📁 Estrutura de Arquivos

```
/messages
  ├── pt.json    # Traduções em Português
  ├── en.json    # Traduções em Inglês
  └── es.json    # Traduções em Espanhol

/i18n.ts         # Configuração do i18n
/src/middleware.ts    # Middleware para detectar idioma
```

## 🎯 Como Usar

### 1. Em Componentes Client

```tsx
"use client";
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations("namespace");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
    </div>
  );
}
```

### 2. Com Parâmetros

```tsx
const t = useTranslations("auth");

// Em messages/pt.json: "codeSent": "Código enviado para {email}"
<p>{t("codeSent", { email: user.email })}</p>;
```

### 3. Mudando de Idioma

O seletor de idioma já está integrado no **Painel de Acessibilidade**:

```tsx
import { useLocale } from "@/src/hooks/useLocale";

const { locale, changeLocale } = useLocale();

// Mudar para inglês
changeLocale("en");
```

## 📝 Adicionando Novas Traduções

1. Abra os arquivos em `/messages/`
2. Adicione a nova chave em todos os idiomas:

```json
// pt.json
{
  "common": {
    "newKey": "Novo texto em português"
  }
}

// en.json
{
  "common": {
    "newKey": "New text in English"
  }
}

// es.json
{
  "common": {
    "newKey": "Nuevo texto en español"
  }
}
```

3. Use no componente:

```tsx
const t = useTranslations("common");
<span>{t("newKey")}</span>;
```

## 🎨 Painel de Acessibilidade

O seletor de idioma está localizado no **Painel de Acessibilidade** (ícone ♿), junto com:

- Tamanho da fonte
- Foco melhorado
- **Seletor de idioma com bandeiras**

## 🔧 Configuração

### next.config.mjs

```js
import createNextIntlPlugin from "next-intl/plugin";
const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
```

### i18n.ts

Define os idiomas disponíveis e configurações:

```ts
export const locales = ["pt", "en", "es"] as const;
export const localeNames = {
  pt: "Português",
  en: "English",
  es: "Español",
};
```

## 🚀 Funcionalidades

✅ Detecção automática de idioma preferido do navegador
✅ Persistência da escolha do usuário via cookies
✅ Interface com bandeiras para seleção visual
✅ Suporte a interpolação de variáveis
✅ Tradução de componentes Server e Client
✅ TypeScript com type-safety

## 📚 Namespaces Disponíveis

- `common` - Textos comuns (Home, navegação, etc.)
- `auth` - Autenticação e login
- `accessibility` - Painel de acessibilidade
- `toast` - Mensagens de notificação

---

Para mais informações, consulte a [documentação oficial do next-intl](https://next-intl-docs.vercel.app/).
