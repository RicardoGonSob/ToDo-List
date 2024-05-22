import { useState } from 'react';
import './App.css'

export default function App(){
  const [arregloTareas, setArregloTareas] = useState([])
  
  const agregarTarea = () => {
    const inputValue = document.querySelector('input').value.trim();
    if (inputValue === '') {
      alert('El campo de tarea no puede estar vacío');
      return;
    }
    const nuevaTarea = {id: crypto.randomUUID(), tarea: document.querySelector('input').value, completada: false}
    setArregloTareas([nuevaTarea, ...arregloTareas])
    document.querySelector('input').value = '';
  }

  const eliminarTarea = (id) => {
    const nuevoArreglo = arregloTareas.filter( item => item.id != id)
    setArregloTareas(nuevoArreglo)
  }

  const actualizarTarea = (id) => {
    const tareaActualizada = arregloTareas.find(item => item.id === id)
    tareaActualizada.completada = !tareaActualizada.completada
    setArregloTareas([...arregloTareas])
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      agregarTarea();
    }
  };

  return(
    <div>
      <h1>ToDo List</h1>
      <input type="text" onKeyDown={handleKeyDown}/>
      <button onClick={agregarTarea}>Agregar Tarea</button>
      <ul>
        {
          arregloTareas.map(item => {
            return <li key={item.id}>
              <p 
              onClick={() => actualizarTarea(item.id)} 
              className={ item.completada ? 'checada' : ''}
              >{item.tarea}</p>
              <button onClick={ () => eliminarTarea(item.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"fill="currentColor">
                <path d="M3 6h18v2H3V6zm2 3h14l-1 13H6L5 9zm3-6V3h8v2H8z" /></svg>
              </button>
              </li>
          })
        }
      </ul>
    </div>
  )
}