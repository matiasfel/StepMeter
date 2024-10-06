# Página de Inicio (Landing Page)

La página de inicio de nuestra aplicación Angular sirve como la primera interacción del usuario con la aplicación. Esta página incluye las siguientes secciones principales:

## Secciones Principales

1. **Inicio de Sesión**
   - Permite a los usuarios existentes ingresar a la aplicación utilizando sus credenciales.
   - Incluye campos para el nombre de usuario y la contraseña.
   - Proporciona un enlace para recuperar la contraseña en caso de que el usuario la haya olvidado.

2. **Registro**
   - Permite a los nuevos usuarios crear una cuenta en la aplicación.
   - Incluye campos para el nombre, correo electrónico, contraseña y confirmación de contraseña.
   - Puede incluir validaciones para asegurar que los datos ingresados sean correctos.

## Funcionalidades Adicionales

- **Navegación Intuitiva**: La página de inicio está diseñada para ser intuitiva y fácil de navegar, con enlaces claros a las secciones de inicio de sesión y registro.
- **Diseño Responsivo**: La página se adapta a diferentes tamaños de pantalla, asegurando una buena experiencia de usuario tanto en dispositivos móviles como en computadoras de escritorio.

## Tecnologías Utilizadas

- **Angular**: El framework principal utilizado para construir la aplicación.
- **TypeScript**: Lenguaje de programación utilizado para escribir el código de la aplicación.
- **npm**: Gestor de paquetes utilizado para manejar las dependencias del proyecto.

## Ejemplo de Código

Aquí tienes un ejemplo de cómo podría verse el componente de la página de inicio en Angular:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  // Lógica del componente
}