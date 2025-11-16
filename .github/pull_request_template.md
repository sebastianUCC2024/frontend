name: Pull Request
description: Envía un Pull Request
labels: ["review"]

body:
  - type: markdown
    attributes:
      value: |
        Gracias por tu contribución. Por favor, rellena esta plantilla.

  - type: textarea
    id: description
    attributes:
      label: Descripción
      description: Describe los cambios que realizaste
      placeholder: "Este PR..."
    validations:
      required: true

  - type: textarea
    id: related-issue
    attributes:
      label: Issue Relacionada
      description: "Referencia a la issue: Fixes #123"
      placeholder: "Fixes #"

  - type: textarea
    id: changes
    attributes:
      label: Tipo de Cambios
      description: ¿Qué tipo de cambios incluye este PR?
      placeholder: |
        - [ ] Bug fix
        - [ ] Nueva característica
        - [ ] Breaking change
        - [ ] Documentación
    validations:
      required: true

  - type: textarea
    id: testing
    attributes:
      label: Cómo Testeaste Esto
      description: Describe los pasos que seguiste para probar tus cambios
      placeholder: |
        1. Navega a...
        2. Haz click en...
        3. Verifica que...
    validations:
      required: true

  - type: textarea
    id: checklist
    attributes:
      label: Checklist
      description: Asegúrate de completar estos puntos
      value: |
        - [ ] Mi código sigue los estándares de estilo del proyecto
        - [ ] He realizado una auto-revisión de mi código
        - [ ] He añadido comentarios donde es necesario
        - [ ] He actualizado la documentación si es necesario
        - [ ] Mis cambios no generan warnings
        - [ ] He testeado que funcione correctamente
        - [ ] Los cambios existentes siguen funcionando
    validations:
      required: true
