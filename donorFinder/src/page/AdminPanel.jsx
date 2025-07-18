import TopCitiesChart from '@/components/TopCitiesChart'
import { Card } from '@/components/ui/card'
import { PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer } from 'recharts';
import React, { useEffect, useState } from 'react'

const COLORS = ['#22c55e', '#eab308', '#f87171', '#3b82f6', '#a855f7', '#f97316'];

function AdminPanel() {
  
  const[response, setResponse] = useState([])
  useEffect(() => {
      async function fetchData() {
        const token = localStorage.getItem("AuthToken");
        if (!token) return;
  
        try {
          const res = await fetch("http://localhost:8000/admin/dashboard", {
            headers: {
              authorization: `Bearer ${token}`,
            },
          });
  
          if (!res.ok) throw new Error("Failed to fetch donor dashboard");
  
          const data = await res.json();
          console.log(data);
          setResponse(data);
        } catch (err) {
          console.error("Error:", err);
        }
      }
  
      fetchData();
    }, []);
  return (
    <div className=' p-10'>
     
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card className="shadow p-4 rounded-2xl">
          <h2 className="text-gray-700 font-semibold">Total Donors</h2>
          <p className="text-3xl font-bold text-blue-600">{response.totalDonors}</p>
        </Card>
        <Card className="shadow p-4 rounded-2xl">
          <h2 className="text-gray-700 font-semibold">New Donors This Week</h2>
          <p className="text-3xl font-bold text-green-500">{response.DonorsRegisteredThisWeek?.length}</p>
        </Card>
        <Card className="shadow p-4 rounded-2xl">
          <h2 className="text-gray-700 font-semibold">Pending Alerts</h2>
          <p className="text-3xl font-bold text-yellow-500">{response.pendingAlerts}</p>
        </Card>
      </div>

<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="p-4 rounded-2xl shadow-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Blood Group Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={response.bloodGroupDistribution}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {response?.bloodGroupDistribution?.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </Card>




     <TopCitiesChart/>
     </div>

    </div>
   
  )
}

export default AdminPanel