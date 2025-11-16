name: Feature Request
description: Sugiere una nueva característica
labels: ["enhancement"]
assignees:
  - sebastianUCC2024

body:
  - type: markdown
    attributes:
      value: |
        Gracias por sugerir una mejora. Por favor, describe tu idea claramente.

  - type: textarea
    id: description
    attributes:
      label: Descripción de la Característica
      description: ¿Qué característica te gustaría ver?
      placeholder: "Me gustaría que..."
    validations:
      required: true

  - type: textarea
    id: motivation
    attributes:
      label: Motivación
      description: ¿Por qué es importante esta característica?
      placeholder: "Esto sería útil porque..."
    validations:
      required: true

  - type: textarea
    id: solution
    attributes:
      label: Solución Propuesta
      description: Describe tu idea de cómo implementar esto
      placeholder: "Se podría implementar mediante..."

  - type: textarea
    id: alternatives
    attributes:
      label: Alternativas Consideradas
      description: ¿Hay otras formas de resolver esto?
      placeholder: "Otra opción sería..."

  - type: textarea
    id: additional
    attributes:
      label: Contexto Adicional
      description: Cualquier contexto adicional (capturas, enlaces, etc.)
