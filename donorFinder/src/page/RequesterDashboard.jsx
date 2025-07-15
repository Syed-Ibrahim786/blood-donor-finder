import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

export default function RequesterDashboard() {
  const [requests, setRequests] = useState({ pending: [], fulfilled: [] });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/user/dashboard", {
          headers: {
            authorization: `Bearer ${localStorage.getItem("AuthToken")}`
          }
        });
        const data = await response.json();
        if (response.ok) {
          console.log("✅ Dashboard data:", data);
          setRequests(data || []);
        }
      } catch (error) {
        console.error("❌ Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      {/* Pending Requests */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">My Blood Requests (Pending)</h2>

        {/* Mobile View: Cards */}
        <div className="block md:hidden overflow-x-auto">
          <div className="flex gap-3">
            {requests.pending.map((req, index) => {
              const istTime = new Date(req.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour12: true,
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              });

              return (
                <Card key={index} className="min-w-[270px]">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      🩸 {req.bloodGroup}
                      <Badge variant="secondary">{req.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p><strong>Hospital:</strong> {req.hospitalName}</p>
                    <p><strong>Requested On:</strong> {istTime}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block">
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Blood Group</th>
                <th className="p-2">Hospital</th>
                <th className="p-2">Requested On</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.pending.map((req, index) => {
                const istTime = new Date(req.createdAt).toLocaleString("en-IN");
                return (
                  <tr key={index} className="border-t">
                    <td className="p-2">{req.bloodGroup}</td>
                    <td className="p-2">{req.hospitalName}</td>
                    <td className="p-2">{istTime}</td>
                    <td className="p-2">
                      <Badge variant="secondary">{req.status}</Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Fulfilled Requests */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4">Fulfilled Blood Requests</h2>

        {/* Mobile View: Cards */}
        <div className="block md:hidden overflow-x-auto">
          <div className="flex gap-3">
            {requests.fulfilled.map((req, index) => {
              const istTime = new Date(req.updatedAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                hour12: true,
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit"
              });

              return (
                <Card key={index} className="min-w-[270px]">
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      🩸 {req.bloodGroup}
                      <Badge variant="success">{req.status}</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm space-y-1">
                    <p><strong>Hospital:</strong> {req.hospitalName}</p>
                    <p><strong>Accepted By:</strong> {req.acceptedBy?.name || "--"}</p>
                    <p><strong>Fulfilled On:</strong> {istTime}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Desktop View: Table */}
        <div className="hidden md:block">
          <table className="w-full text-left border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2">Blood Group</th>
                <th className="p-2">Hospital</th>
                <th className="p-2">Accepted By</th>
                <th className="p-2">Fulfilled On</th>
              </tr>
            </thead>
            <tbody>
              {requests.fulfilled.map((req, index) => {
                const istTime = new Date(req.updatedAt).toLocaleString("en-IN");
                return (
                  <tr key={index} className="border-t">
                    <td className="p-2">{req.bloodGroup}</td>
                    <td className="p-2">{req.hospitalName}</td>
                    <td className="p-2">{req.acceptedBy?.name || "--"}</td>
                    <td className="p-2">{istTime}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
}
