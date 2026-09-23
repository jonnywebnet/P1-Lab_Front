import './App.css'
import DestinoForm from './components/DestinoForm'
import DestinoLista from './components/DestinoLista'
import Header from './components/Header'

function App() {
  return (
    <div className="app-shell" id="top">
      <Header titulo="Minha Lista de Viagem" />

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow">FlyNow · planejamento sem complicação</span>
            <h1 id="hero-title">
              Próxima parada:
              <span> o mundo.</span>
            </h1>
            <p>
              Descubra lugares incríveis, salve inspirações e comece a desenhar
              a sua próxima aventura.
            </p>
            <a className="primary-button" href="#destinos">
              Explorar destinos <span aria-hidden="true">↓</span>
            </a>
          </div>

          <div className="hero-visual" aria-label="Ilustração de uma viagem" role="img">
            <div className="sun" />
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="plane" aria-hidden="true">✈</div>
            <div className="visual-card visual-card-top">
              <span className="card-icon">✦</span>
              <span>novos lugares</span>
            </div>
            <div className="visual-card visual-card-bottom">
              <span className="pulse-dot" />
              <span>seu próximo destino</span>
            </div>
          </div>
        </section>

        <section className="content-section" id="destinos" aria-labelledby="destinos-title">
          <div className="section-heading">
            <div>
              <span className="eyebrow">Inspire-se</span>
              <h2 id="destinos-title">Destinos para colocar no mapa</h2>
            </div>
            <p>Curadoria direto da Wikipedia para alimentar seus planos.</p>
          </div>
          <DestinoLista destinos={[]} />
        </section>

        <section className="contact-section" aria-labelledby="contact-title">
          <div className="contact-copy">
            <span className="eyebrow">Vamos conversar</span>
            <h2 id="contact-title">Conte para onde você quer ir.</h2>
            <p>
              Deixe seus dados e o destino dos sonhos. Este formulário é uma
              anotação local para ajudar a organizar a sua inspiração.
            </p>
          </div>
          <DestinoForm />
        </section>
      </main>

      <footer>
        <span className="footer-mark">Fly<span>Now</span></span>
        <span>Feito para quem coleciona caminhos.</span>
      </footer>
    </div>
  )
}

export default App
