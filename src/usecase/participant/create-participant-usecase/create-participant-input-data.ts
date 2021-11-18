export interface CreateParticipantInputDataProps {
  name: string
  email: string
}

export class CreateParticipantInputData {
  constructor(public readonly props: CreateParticipantInputDataProps) {}
}
