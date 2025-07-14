import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"




export default function RequesterDashboard() {
  const [requests, setRequests] = useState([])

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/user/dashboard", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("AuthToken")}`
          }
        })
        const data = await response.json()
        console.log("✅ Dashboard data:", data)

        // Assuming API returns { requests: [...] }
        setRequests(data.requests || [])
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error)
      }
    }

    fetchData()
  }, [])
  const request = [
    {
      bloodGroup: "B+",
      hospital: "Apollo Chennai",
      requestedAt: "2025-07-10T07:33:53Z",
      status: "pending"
    },
    {
      bloodGroup: "O-",
      hospital: "MIOT Hospital",
      requestedAt: "2025-07-12T09:15:00Z",
      status: "accepted"
    }
  ]

  return (
    
<div className="">
  <h2 className="text-2xl pb-4 font-semibold">My Blood Requests</h2>

    <div className="h-40  flex flex-row gap-2">
    {/* <div className="p-6 space-y-4"> */}
      {/* <h2 className="text-2xl font-semibold">My Blood Requests</h2> */}
        {/* <div className=" "> */}
          {requests.pending.map((req, index) => {
        const istTime = new Date(req.createdAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })

        return (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                🩸 {req.bloodGroup}
                <Badge
                  variant={
                    req.status === "pending"
                      ? "secondary"
                      : req.status === "fulfilled"
                      ? "success"
                      : "destructive"
                  }
                >
                  {req.status}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>Hospital:</strong> {req.hospitalName}</p>
              <p><strong>Requested On:</strong> {istTime}</p>
            </CardContent>
          </Card>
        )
      })}
        {/* </div> */}
      
    {/* </div> */}


</div>  

</div>
  

   
    
  )
}
