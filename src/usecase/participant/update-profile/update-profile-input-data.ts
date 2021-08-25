export interface UpdateProfileInputDataProps {
  id: string
  name?: string
  email?: string
}

export class UpdateProfileInputData {
  constructor(public readonly props: UpdateProfileInputDataProps) {}
}
