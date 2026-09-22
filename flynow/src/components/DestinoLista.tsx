import { useEffect, useState } from 'react'

export interface Destino {
  id: number
  title: string
  extract: string
  imagem: string | null
  url: string
  liked: boolean
}

interface DestinoListaProps {
  destinos: Destino[]
}

interface WikipediaSummary {
  pageid: number
  title: string
  extract?: string
  content_urls?: {
    desktop?: {
      page?: string
    }
  }
  thumbnail?: {
    source?: string
  }
}

const destinosEmDestaque = [
  'Rio_de_Janeiro',
  'Cristo_Redentor',
  'Torre_Eiffel',
  'Pelourinho',
]

function DestinoLista({ destinos: destinosIniciais }: DestinoListaProps) {
  const [destinos, setDestinos] = useState<Destino[]>(destinosIniciais)
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function carregarDestinos() {
      try {
        setCarregando(true)
        setErro('')

        const respostas = await Promise.all(
          destinosEmDestaque.map((destino) =>
            fetch(
              `https://pt.wikipedia.org/api/rest_v1/page/summary/${destino}`,
              { signal: controller.signal },
            ),
          ),
        )

        if (respostas.some((response) => response.status !== 200)) {
          throw new Error('Uma das fontes não respondeu corretamente.')
        }

        const resumos: WikipediaSummary[] = await Promise.all(
          respostas.map((response) => response.json() as Promise<WikipediaSummary>),
        )

        setDestinos(
          resumos.map((resumo) => ({
            id: resumo.pageid,
            title: resumo.title,
            extract: resumo.extract ?? 'Descubra mais sobre este destino.',
            imagem: resumo.thumbnail?.source ?? null,
            url: resumo.content_urls?.desktop?.page ?? '#',
            liked: false,
          })),
        )
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') {
          return
        }
        setErro('Não foi possível carregar os destinos agora. Tente novamente em instantes.')
      } finally {
        if (!controller.signal.aborted) {
          setCarregando(false)
        }
      }
    }

    carregarDestinos()

    return () => controller.abort()
  }, [])

  if (carregando) {
    return (
      <div className="state-message" role="status">
        <span className="loader" aria-hidden="true" />
        <span>Buscando lugares para você...</span>
      </div>
    )
  }

  if (erro) {
    return (
      <div className="state-message state-error" role="alert">
        <span>{erro}</span>
      </div>
    )
  }

  function alternarFavorito(id: number) {
    setDestinos((destinosAtuais) =>
      destinosAtuais.map((destino) =>
        destino.id === id ? { ...destino, liked: !destino.liked } : destino,
      ),
    )
  }

  return (
    <ul className="destinations-grid">
      {destinos.map((destino) => (
        <li className="destination-card" key={destino.id}>
          <div className="destination-image-wrapper">
            {destino.imagem ? (
              <img src={destino.imagem} alt={`Paisagem de ${destino.title}`} />
            ) : (
              <div className="destination-image-fallback" aria-hidden="true">✦</div>
            )}
            <span className="destination-tag">inspire-se</span>
            <button
              className={`favorite-button${destino.liked ? ' is-liked' : ''}`}
              type="button"
              aria-label={destino.liked ? `Remover ${destino.title} dos favoritos` : `Favoritar ${destino.title}`}
              aria-pressed={destino.liked}
              onClick={() => alternarFavorito(destino.id)}
            >
              <span aria-hidden="true">{destino.liked ? '♥' : '♡'}</span>
            </button>
          </div>
          <div className="destination-content">
            <h3>{destino.title}</h3>
            <p>{destino.extract}</p>
            <a href={destino.url} target="_blank" rel="noreferrer">
              Ver história <span aria-hidden="true">↗</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default DestinoLista
