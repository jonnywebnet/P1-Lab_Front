import { useEffect, useState } from 'react'

export interface Destino {
  id: number
  title: string
  extract: string
}

interface DestinoListaProps {
  destinos: Destino[]
}

interface WikipediaSummary {
  pageid: number
  title: string
  extract: string
}

function DestinoLista({ destinos: destinosIniciais }: DestinoListaProps) {
  const [destinos, setDestinos] = useState<Destino[]>(destinosIniciais)

  useEffect(() => {
    async function carregarDestino() {
      try {
        const response = await fetch(
          'https://en.wikipedia.org/api/rest_v1/page/summary/Rio_de_Janeiro',
        )

        if (response.status !== 200) {
          throw new Error(`Erro ao carregar destino: ${response.status}`)
        }

        const resumo: WikipediaSummary = await response.json()

        setDestinos([
          {
            id: resumo.pageid,
            title: resumo.title,
            extract: resumo.extract,
          },
        ])
      } catch (error) {
        console.error('Não foi possível carregar o destino.', error)
      }
    }

    carregarDestino()
  }, [])

  return (
    <ul>
      {destinos.map((destino) => (
        <li key={destino.id}>
          <h2>{destino.title}</h2>
          <p>{destino.extract}</p>
        </li>
      ))}
    </ul>
  )
}

export default DestinoLista
