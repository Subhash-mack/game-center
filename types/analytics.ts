export type session = {
  session: number
  date: string
}

export interface analytics {
  [key: string]: {
    [key: string]: session[]
  }[]
}
