// Archivo: src/app/app.ts

import { Component, signal } from '@angular/core';
// Ya no necesitas RouterOutlet, puedes borrar esta línea
// import { RouterOutlet } from '@angular/router';

// componente producto
import { Productos } from './components/productos/productos';

@Component({
  selector: 'app-root',
  standalone: true, // <-- Esto indica que es un componente independiente
  
  // AQUÍ ESTÁ EL CAMBIO:
  // Quitamos RouterOutlet y ponemos el componente que sí vamos a usar.
  imports: [Productos], 
  
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('foodmaster-cafeteria');
}