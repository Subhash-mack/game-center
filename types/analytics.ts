export type Session = {
  session: number
  date: string
}

export interface Analytics {
  id: string
  analytics: {
    [key: string]: {
      [key: string]: Session[]
    }[]
  }
}

export type AnalyticsGraph = {
  totalSessions: { [key: string]: number }
  avgSessions: { [key: string]: number }
}
