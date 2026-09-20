import Image from "next/image";

export default function Header() {
  return (
    <header className="site-header">
      <div className="header-container">

        {/* Logo */}
        <a href="/" className="logo">
          <Image
            src="/logo/opsmind-logo.png"
            alt="OpsMind AI"
            width={320}
            height={100}
            priority
          />
        </a>

        {/* Menu principal */}
        <nav className="main-nav">
          <a href="/">Início</a>
          <a href="#sobre">Sobre nós</a>
          <a href="#solucoes">Soluções</a>
          <a href="#academy">Academy</a>
          <a href="/labs">Labs</a>
          <a href="#projetos">Projetos</a>
          <a href="/contactos">Contactos</a>
        </nav>

        {/* Botão de contacto */}
        <a href="/contactos" className="header-button">
  Fale connosco
  <span>→</span>
</a>

      </div>
    </header>
  );
}