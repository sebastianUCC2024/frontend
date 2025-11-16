name: Bug Report
description: Reporta un bug encontrado en la aplicación
labels: ["bug"]
assignees:
  - sebastianUCC2024

body:
  - type: markdown
    attributes:
      value: |
        Gracias por reportar un bug. Por favor, rellena esta plantilla lo mejor posible.

  - type: textarea
    id: description
    attributes:
      label: Descripción del Bug
      description: Describe el problema que encontraste
      placeholder: "Cuando hago click en X, ocurre Y en lugar de Z..."
    validations:
      required: true

  - type: textarea
    id: steps
    attributes:
      label: Pasos para Reproducir
      description: Pasos detallados para reproducir el problema
      placeholder: |
        1. Navega a...
        2. Haz click en...
        3. Observa que...
    validations:
      required: true

  - type: textarea
    id: expected
    attributes:
      label: Comportamiento Esperado
      description: ¿Qué debería haber ocurrido?
    validations:
      required: true

  - type: textarea
    id: actual
    attributes:
      label: Comportamiento Actual
      description: ¿Qué ocurrió en su lugar?
    validations:
      required: true

  - type: textarea
    id: screenshots
    attributes:
      label: Capturas de Pantalla
      description: Si es relevante, adjunta capturas de pantalla

  - type: textarea
    id: environment
    attributes:
      label: Información del Entorno
      description: Información sobre tu navegador y SO
      placeholder: |
        - OS: Windows 10
        - Navegador: Chrome 120
        - Versión de Node: 18.17.0
    validations:
      required: true

  - type: textarea
    id: additional
    attributes:
      label: Información Adicional
      description: Cualquier información adicional que sea relevante
