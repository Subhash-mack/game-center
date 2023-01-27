export type session = {
  session: number
  date: string
}

export interface analytics {
  id: string
  analytics: {
    [key: string]: {
      [key: string]: session[]
    }[]
  }
}
