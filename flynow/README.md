# FlyNow · Minha Lista de Viagem

Aplicação da P1 de Laboratório de Programação Front-End, construída com **Vite, React e TypeScript**. A interface apresenta destinos turísticos consultados pela API pública de resumos da Wikipedia e mantém um formulário de contato totalmente controlado no front-end.

## Executar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

Para verificar as regras do projeto:

```bash
npm run lint
```

## Requisitos atendidos

- Componentes separados: `Header`, `DestinoForm` e `DestinoLista`.
- Formulário controlado por `useState`, sem backend ou envio de dados.
- Consulta `GET` à API pública da Wikipedia com `fetch` dentro de `useEffect`.
- Renderização dos destinos com `.map()` e `key` baseada no identificador da API.
- Estados visuais de carregamento e erro.
- Layout responsivo em CSS puro.

## API utilizada

A aplicação consulta quatro destinos de viagem em português. Cada destino é uma cidade e possui um ponto turístico ou monumento histórico filho, também carregado pela Wikipedia REST API:

- Rio de Janeiro → Cristo Redentor
- Paris → Torre Eiffel
- Roma → Coliseu
- Salvador → Pelourinho

Nenhuma chave, variável de ambiente ou serviço de backend é necessária.
