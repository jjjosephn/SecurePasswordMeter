import './App.css'
import { PasswordMeter } from './components/passwordMeter'

function App() {
  

  return (
    <div className="min-h-screen">
      <div className="container">
        <h1 className="title">Secure Password Meter</h1>
        <PasswordMeter />
      </div>
    </div>
  )
}

export default App
