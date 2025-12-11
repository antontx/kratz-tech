type ContributionDay = {
  date: string
  count: number
  level: number
}

type ContributionGridProps = {
  data: ContributionDay[]
}

export function ContributionGrid({ data }: ContributionGridProps) {
  const totalCount = data.reduce((sum, d) => sum + d.count, 0)

  const levelColors: Record<number, string> = {
    0: 'bg-gray-800',
    1: 'bg-gray-600',
    2: 'bg-gray-500',
    3: 'bg-gray-400',
    4: 'bg-white',
  }

  return (
    <div>
      <div className="flex gap-1 mb-2">
        {data.map((day) => (
          <div
            key={day.date}
            className={`w-3 h-3 ${levelColors[day.level] || 'bg-gray-800'}`}
          />
        ))}
      </div>
      <p className="text-gray-600 text-xs">{totalCount} commits in last 30 days</p>
    </div>
  )
}
