export interface JoinPairInputDataProps {
  name: string
  email: string
}

export class JoinPairInputData {
  constructor(public readonly props: JoinPairInputDataProps) {}
}
