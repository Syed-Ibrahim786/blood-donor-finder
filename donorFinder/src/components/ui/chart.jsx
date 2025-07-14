"use client"

import {
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts"

export function ChartContainer({ config, children }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      {children}
    </ResponsiveContainer>
  )
}

export function ChartTooltip(props) {
  return <RechartsTooltip {...props} />
}

export function ChartTooltipContent({ active, payload, hideLabel = false }) {
  if (!active || !payload || payload.length === 0) return null

  const item = payload[0]
  return (
    <div className="rounded-md border bg-background p-2 shadow-sm">
      {!hideLabel && (
        <div className="text-[0.70rem] uppercase text-muted-foreground">
          {item?.name}
        </div>
      )}
      <div className="text-sm font-medium text-foreground">{item?.value}</div>
    </div>
  )
}
