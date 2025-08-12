# Prompt para Claude Code

## Instrucciones para el proyecto

Necesito crear una aplicación web interactiva para visualizar un itinerario de viaje por Portugal y España. La aplicación debe ser moderna, responsive y visualmente atractiva.

### Requisitos técnicos:
- **Frontend**: React con TypeScript
- **Styling**: Tailwind CSS
- **Características**: Responsive design, animaciones suaves, diseño moderno

### Funcionalidades requeridas:
1. **Visualización del itinerario**: Mostrar cada día del viaje con fecha, ubicación, transporte y actividades
2. **Diseño visual atractivo**: Usar gradientes, sombras y animaciones
3. **Diferenciación por país**: Colores distintos para Portugal (verde) y España (rojo)
4. **Información de transporte**: Mostrar claramente el medio de transporte y distancias
5. **Sugerencias destacadas**: Secciones especiales para consejos y advertencias
6. **Responsive**: Que funcione bien en móvil y desktop

### Datos del viaje:
- **Fechas**: 22 septiembre al 4 octubre 2025 (13 días)
- **Países**: Portugal y España
- **Ciudades**: Lisboa, Lagos, Sevilla, Granada, Valencia, Barcelona, Madrid

### Diseño deseado:
- Estilo moderno con gradientes
- Cards para cada día del viaje
- Colores temáticos por país
- Iconos para transporte y actividades
- Secciones destacadas para consejos importantes

### Estructura de archivos esperada:
```
src/
  components/
    ItineraryDay.tsx
    TransportInfo.tsx
    Suggestion.tsx
  data/
    itinerary.ts
  App.tsx
  index.css
```

**Nota**: Los datos del itinerario están en el archivo `itinerary-data.json` que debes leer e integrar en la aplicación.