---
name: 'usecase'
root: 'src/usecase'
output: '**/*'
ignore: []
questions:
  name: 'Please enter a usecase name.'
---

# `{{ inputs.name }}/{{ inputs.name }}-usecase.ts`

```ts
import { {{ inputs.name | pascal }}DTO } from "./{{ inputs.name }}-dto"

export interface {{ inputs.name | pascal }}UsecaseProps {}

export class {{ inputs.name | pascal }}Usecase {
  async exec(props: {{ inputs.name | pascal }}UsecaseProps): Promise<{{ inputs.name | pascal }}DTO> {
    return new {{ inputs.name | pascal }}DTO({})
  }
}

```

# `{{ inputs.name }}/{{ inputs.name }}-dto.ts`

```ts
interface {{ inputs.name | pascal }}DTOProps {}

export class {{ inputs.name | pascal }}DTO {
  constructor(public readonly props: {{ inputs.name | pascal }}DTOProps) {}
}

```
