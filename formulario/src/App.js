import './App.css';
import Formulario from './components/Formulario';
import styles from './components/container.module.css'

function App() {
  return (
    <div className="App">
      <div className={styles.container}>
      <Formulario />
      </div>
    </div>
  );
}

export default App;
