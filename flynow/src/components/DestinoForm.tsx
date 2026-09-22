import { useState, type FormEvent } from 'react'

function DestinoForm() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [destino, setDestino] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    console.log({ nome, email, destino })
    setNome('')
    setEmail('')
    setDestino('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Entre em contato com a FlyNow</h2>

      <label htmlFor="nome">Nome</label>
      <input
        id="nome"
        type="text"
        value={nome}
        onChange={(event) => setNome(event.target.value)}
        required
      />

      <label htmlFor="email">E-mail</label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        required
      />

      <label htmlFor="destino">Destino de interesse</label>
      <input
        id="destino"
        type="text"
        value={destino}
        onChange={(event) => setDestino(event.target.value)}
        required
      />

      <button type="submit">Enviar</button>
    </form>
  )
}

export default DestinoForm
