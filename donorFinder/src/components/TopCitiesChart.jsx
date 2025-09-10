// src/components/TopCitiesChart.jsx

import { TrendingUp } from "lucide-react"
import {
  BarChart,
  CartesianGrid,
  XAxis,
  Bar,
  LabelList,
} from "recharts"

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useEffect, useState } from "react"

export default function TopCitiesChart() {
  const [responses, setResponses] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("https://bloodnet-du9t.onrender.com/admin/dashboard", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
          },
        })
        const data = await res.json()
        console.log("📊 Top cities data:", data.topCities)
        const topThree = data.topCities?.slice(0,3)
        setResponses(topThree || [])
      } catch (err) {
        console.error("❌ Error loading chart:", err)
      }
    }

    fetchData()
    console.log(responses)
  }, [])

  return (
    <Card className="border-2 ">
      <CardHeader>
        <CardTitle>Top Cities by Blood Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer>
          <BarChart data={responses} margin={{ top: 20 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="_id" // _id should contain city name
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="count" fill="var(--foreground)" radius={8}>
              <LabelList
                dataKey="count"
                position="top"
                offset={10}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
