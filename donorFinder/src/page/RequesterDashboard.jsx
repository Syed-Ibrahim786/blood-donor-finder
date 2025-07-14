import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"




export default function RequesterDashboard() {
  // const [requests, setRequests] = useState([])React uses the initial value you gave useState() to infer the data type (in plain JavaScript or JSX — no TypeScript involved).
  const[requests,setRequests] = useState({ pending:[], fulfilled:[]})
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/user/dashboard", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("AuthToken")}`
          }
        })
        const data = await response.json()
        if(response.ok){
          console.log("✅ Dashboard data:", data)
        // console.log(data.pending)

        // Assuming API returns { requests: [...] }
        setRequests(data || [])
        }
        
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
 console.log(requests)
  return (
    <div>
    
      <div className="">
  <h2 className="text-2xl pb-4 font-semibold">My Blood Requests</h2>

    <div className="  flex flex-row flex-wrap gap-2">
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
          <Card key={index} className=" max-w-[400px]">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                🩸 {req.bloodGroup || "--"}
                <Badge
                  variant={
                    req.status === "pending"
                      ? "secondary"
                      : req.status === "fulfilled"
                      ? "success"
                      : "destructive"
                  }
                >
                  {req.status || "--"}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>Hospital:</strong> {req.hospitalName || "--"}</p>
             
              <p><strong>Requested On:</strong> {istTime || "--"}</p>
            </CardContent>
          </Card>
        )
      })}
        {/* </div> */}
      
    {/* </div> */}


</div>  

</div>

      <div className=" mt-5" >
          <h2 className="font-semibold mb-5 text-2xl" >Fulfilled Request</h2>
          <div className=" flex flex-row flex-wrap gap-2">
    {/* <div className="p-6 space-y-4"> */}
      {/* <h2 className="text-2xl font-semibold">My Blood Requests</h2> */}
        {/* <div className=" "> */}
          {requests.fulfilled.map((req, index) => {
        const istTime = new Date(req.updatedAt).toLocaleString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour12: true,
          day: "2-digit",
          month: "short",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit"
        })

        return (
          <Card key={index} className=" max-w-[400px]" >
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                🩸 {req.bloodGroup || "--"}
                <Badge variant="success">
                  Fulfilled
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1">
              <p><strong>Hospital:</strong> {req.hospitalName || "--"}</p>
               <p><strong>Accepted By:</strong> {req.acceptedBy?.name || "--"}</p>
              <p><strong>Requested On:</strong> {istTime || "--"}</p>
            </CardContent>
          </Card>
        )
      })}
        {/* </div> */}
      
    {/* </div> */}


</div> 
      </div>
    
    </div>

  

   
    
  )
}
