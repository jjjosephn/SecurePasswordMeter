import './App.css'
import { PasswordMeter } from './components/passwordMeter'
import { PasswordGenerator } from './components/passwordGenerator'

function App() {
  return (
    <div className="app-container">
      <div className="min-h-screen" style={{ width: '29rem' }}>
        <div className="container">
          <h1 className="title">Secure Password Meter</h1>
          <PasswordMeter />
        </div>
      </div>
      <div className="min-h-screen">
        <div className="container">
          <h1 className="title">Secure Password Generator</h1>
          <PasswordGenerator />
        </div>
      </div>
    </div>
  )
}

export default App
