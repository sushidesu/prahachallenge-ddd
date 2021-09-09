export interface JoinPrahaChallengeInputDataProps {
  name: string
  email: string
}

export class JoinPrahaChallengeInputData {
  constructor(public readonly props: JoinPrahaChallengeInputDataProps) {}
}
