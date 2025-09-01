import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
    <div className=" p-10 bg-white  rounded-2xl shadow-lg">
    <div className="flex justify-between items-center mb-10">
  <h1 className="text-2xl text-[#6e6e6e] font-bold">Dashboard</h1>
  <Link
    to="/find-donors"
    className="bg-red-600 hover:bg-red-700 text-[white] font-medium px-4 py-2 rounded-lg shadow"
  >
    Find Donors
  </Link>
</div>

      {/* Pending Requests */}
      <section className="mb-10">
        <h2 className="text-xl  text-left font-semibold mb-12">My Blood Requests (Pending)</h2>

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
        <div className="hidden md:block my-5">
          <table className="w-full rounded-md shadow-md text-sm">
            <thead className=" text-[#6e6e6e]">
              <tr className=" flex">
                <th className="p-2 flex-1 text-left">Blood Group</th>
                <th className="p-2 flex-1 text-left">Hospital</th>
                <th className="p-2 flex-1 text-left">Requested On</th>
                <th className="p-2 flex-1 text-left">Status</th>
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
        <h2 className="text-xl text-left font-semibold mb-12">Fulfilled Blood Requests</h2>

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
          <table className="w-full  rounded-xl shadow-md text-sm">
            <thead>
              <tr className=" flex text-[#6e6e6e]">
                <th className="p-2 flex-1 text-left">Blood Group</th>
                <th className="p-2 flex-1 text-left">Hospital</th>
                <th className="p-2 flex-1 text-left">Accepted By</th>
                <th className="p-2 flex-1 text-left">Fulfilled On</th>
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
    </div>
  );
}
