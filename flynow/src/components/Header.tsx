interface HeaderProps {
  titulo: string
}

function Header({ titulo }: HeaderProps) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Voltar ao início">
        <span className="brand-symbol" aria-hidden="true">✦</span>
        <span>{titulo}</span>
      </a>
      <nav aria-label="Navegação principal">
        <a href="#destinos">Destinos</a>
        <a href="#contato">Contato</a>
      </nav>
      <a className="header-action" href="#contato">Planejar viagem <span aria-hidden="true">↗</span></a>
    </header>
  )
}

export default Header
