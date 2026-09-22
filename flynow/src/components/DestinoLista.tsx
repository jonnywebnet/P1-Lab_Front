import { useEffect, useState } from 'react'

export interface PontoTuristico {
  title: string
  extract: string
  imagem: string | null
  url: string
}

export interface Destino {
  id: number
  title: string
  extract: string
  imagem: string | null
  url: string
  monumento: PontoTuristico
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

interface DestinoConfig {
  cidade: string
  monumento: string
}

const destinosEmDestaque: DestinoConfig[] = [
  { cidade: 'Rio_de_Janeiro', monumento: 'Cristo_Redentor' },
  { cidade: 'Paris', monumento: 'Torre_Eiffel' },
  { cidade: 'Roma', monumento: 'Coliseu' },
  { cidade: 'Salvador', monumento: 'Pelourinho' },
]

function resumoParaPonto(resumo: WikipediaSummary): PontoTuristico {
  return {
    title: resumo.title,
    extract: resumo.extract ?? 'Conheça este ponto turístico durante a viagem.',
    imagem: resumo.thumbnail?.source ?? null,
    url: resumo.content_urls?.desktop?.page ?? '#',
  }
}

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
          destinosEmDestaque.map(async ({ cidade, monumento }) => {
            const [cidadeResponse, monumentoResponse] = await Promise.all([
              fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${cidade}`, {
                signal: controller.signal,
              }),
              fetch(`https://pt.wikipedia.org/api/rest_v1/page/summary/${monumento}`, {
                signal: controller.signal,
              }),
            ])

            return { cidadeResponse, monumentoResponse }
          }),
        )

        if (
          respostas.some(
            ({ cidadeResponse, monumentoResponse }) =>
              cidadeResponse.status !== 200 || monumentoResponse.status !== 200,
          )
        ) {
          throw new Error('Uma das fontes não respondeu corretamente.')
        }

        const destinosComPontos = await Promise.all(
          respostas.map(async ({ cidadeResponse, monumentoResponse }) => {
            const cidade = (await cidadeResponse.json()) as WikipediaSummary
            const monumento = (await monumentoResponse.json()) as WikipediaSummary

            return {
              id: cidade.pageid,
              title: cidade.title,
              extract: cidade.extract ?? 'Descubra este destino durante a sua próxima viagem.',
              imagem: cidade.thumbnail?.source ?? null,
              url: cidade.content_urls?.desktop?.page ?? '#',
              monumento: resumoParaPonto(monumento),
              liked: false,
            }
          }),
        )

        setDestinos(destinosComPontos)
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
            <span className="destination-tag">destino</span>
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
            <div className="destination-landmark">
              <span className="landmark-label">Ponto turístico em destaque</span>
              <strong>{destino.monumento.title}</strong>
              <p>{destino.monumento.extract}</p>
              <a href={destino.monumento.url} target="_blank" rel="noreferrer">
                Conhecer monumento <span aria-hidden="true">↗</span>
              </a>
            </div>
            <a className="destination-link" href={destino.url} target="_blank" rel="noreferrer">
              Ver destino <span aria-hidden="true">↗</span>
            </a>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default DestinoLista
