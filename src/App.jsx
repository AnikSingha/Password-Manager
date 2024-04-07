import { UserProvider } from './components/UserContext'
import Test from './components/Test'

function App() {

  return (
      <UserProvider>
        <Test/>
      </UserProvider>
  )
}

export default App
