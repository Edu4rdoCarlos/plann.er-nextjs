import { sSkipLink, sSkipLinkContainer } from "./SkipLinks.variants";

export const SkipLinks = () => {
  return (
    <div className={sSkipLinkContainer()}>
      <a href="#main-content" className={sSkipLink()}>
        Pular para o conteúdo principal
      </a>
      <a href="#navigation" className={sSkipLink()}>
        Pular para navegação
      </a>
    </div>
  );
};
