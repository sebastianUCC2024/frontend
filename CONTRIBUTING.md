# Guía de Contribución

¡Gracias por tu interés en contribuir a este proyecto! Esta guía te ayudará a entender cómo colaborar.

## Código de Conducta

Sé respetuoso y constructivo en todas las interacciones.

## Cómo Contribuir

### 1. Fork el Repositorio

```bash
git clone https://github.com/tu-usuario/frontend.git
cd frontend
```

### 2. Crea una Rama

```bash
git checkout -b feature/tu-caracteristica
# o
git checkout -b fix/tu-fix
```

### 3. Instala Dependencias

```bash
pnpm install
```

### 4. Realiza tus Cambios

- Mantén el código limpio y legible
- Sigue las convenciones del proyecto
- Asegúrate de usar TypeScript
- Comenta código complejo

### 5. Prueba tus Cambios

```bash
pnpm dev
# Verifica que no haya errores
```

### 6. Haz Commit

```bash
git add .
git commit -m "feat: descripción clara de los cambios"
```

#### Convenciones de Commit

- `feat:` - Nueva característica
- `fix:` - Corrección de bug
- `refactor:` - Refactorización de código
- `docs:` - Cambios en documentación
- `style:` - Cambios de formato/estilos
- `test:` - Adición de tests
- `chore:` - Cambios en dependencias o configuración

### 7. Push a tu Fork

```bash
git push origin feature/tu-caracteristica
```

### 8. Abre un Pull Request

- Describe claramente qué cambios incluye
- Referencia issues relacionados (si existen)
- Proporciona capturas de pantalla si hay cambios visuales

## Estándares de Código

### TypeScript
- Usa tipos explícitos cuando sea posible
- Evita `any`
- Mantén interfaces y types bien documentados

### Componentes
- Usa componentes funcionales
- Sigue la estructura de carpetas
- Mantén componentes pequeños y reutilizables
- Añade PropTypes o tipos si es necesario

### Estilos
- Usa Tailwind CSS
- Sigue la nomenclatura BEM si escribes CSS personalizado
- Mantén consistencia con el diseño existente

## Reportar Bugs

Si encuentras un bug:

1. Verifica que no esté reportado
2. Incluye pasos para reproducir
3. Proporciona versión del navegador
4. Añade capturas de pantalla si es relevante

## Sugerencias de Mejoras

Para sugerencias:

1. Abre una issue con etiqueta `enhancement`
2. Describe la mejora detalladamente
3. Explica el caso de uso

## Preguntas

Si tienes preguntas, abre una issue con etiqueta `question`.

## Licencia

Al contribuir, aceptas que tus cambios se publiquen bajo la MIT License.

---

¡Gracias por contribuir! 🎉
