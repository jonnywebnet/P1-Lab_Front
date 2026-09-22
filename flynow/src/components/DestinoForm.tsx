import { useState, type FormEvent } from 'react'

function DestinoForm() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('')
  const [destino, setDestino] = useState('')
  const [enviado, setEnviado] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setEnviado(true)
    setNome('')
    setEmail('')
    setDestino('')
  }

  return (
    <form className="contact-form" id="contato" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="nome">
          Seu nome
          <input
            id="nome"
            name="nome"
            type="text"
            placeholder="Como podemos te chamar?"
            value={nome}
            onChange={(event) => {
              setNome(event.target.value)
              setEnviado(false)
            }}
            required
          />
        </label>
        <label htmlFor="email">
          Seu e-mail
          <input
            id="email"
            name="email"
            type="email"
            placeholder="voce@email.com"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value)
              setEnviado(false)
            }}
            required
          />
        </label>
      </div>

      <label htmlFor="destino">
        Destino de interesse
        <input
          id="destino"
          name="destino"
          type="text"
          placeholder="Ex.: Lisboa, Kyoto, Salvador..."
          value={destino}
          onChange={(event) => {
            setDestino(event.target.value)
            setEnviado(false)
          }}
          required
        />
      </label>

      <div className="form-submit-row">
        <button className="submit-button" type="submit">
          Salvar inspiração <span aria-hidden="true">↗</span>
        </button>
        {enviado && (
          <p className="success-message" role="status">
            Inspiração salva localmente.
          </p>
        )}
      </div>
    </form>
  )
}

export default DestinoForm
