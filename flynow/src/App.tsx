import DestinoForm from './components/DestinoForm'
import DestinoLista from './components/DestinoLista'
import Header from './components/Header'

function App() {
  return (
    <main>
      <Header titulo="Minha Lista de Viagem" />
      <DestinoForm />
      <DestinoLista destinos={[]} />
    </main>
  )
}

export default App
