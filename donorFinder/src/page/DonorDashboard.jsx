import { makeDonor } from "@/component/NavBar/NavBar";
import AppContext from "@/context/AppContext";
import React, { useCallback, useContext, useLayoutEffect, useState, useRef } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import io from "socket.io-client";

const token = localStorage.getItem("AuthToken");
export const socket = io("http://localhost:8000", {
  auth: {
    token,
  },
});

 


export function DonorComponent({response, accepted, pending, total, acceptedPercent, pendingPercent}) {
  return (
    <div className="p-4 max-w-4xl mx-auto">
      {/* --- Stats Circle --- */}
      <div className="  flex justify-evenly sm:justify-around  items-center">
        <div className="  w-35 sm:w-50  h-35 sm:h-50  relative">
          <CircularProgressbarWithChildren
            value={100}
            strokeWidth={5}
            styles={buildStyles({
              pathColor: "#e5e7eb", // base background
              trailColor: "transparent",
            })}
          >
            <CircularProgressbarWithChildren
              value={acceptedPercent}
              strokeWidth={12}
              styles={buildStyles({
                pathColor: "#16a34a", // green
                trailColor: "transparent",
              })}
            >
              <CircularProgressbarWithChildren
                value={pendingPercent}
                strokeWidth={12}
                styles={buildStyles({
                  pathColor: "#eab308", // yellow
                  trailColor: "transparent",
                })}
              >
                <div className="text-center text-sm">
                  <div className="text-gray-700 font-medium">Total</div>
                  <div className="text-xl font-bold text-fuchsia-700">
                    {total}
                  </div>
                </div>
              </CircularProgressbarWithChildren>
            </CircularProgressbarWithChildren>
          </CircularProgressbarWithChildren>

          {/* Legend */}
        </div>

        <div className="flex flex-col justify-center gap-10">
          <span className="bg-green-200 rounded-2xl mx-auto p-3 sm:p-5 flex-1 font-bold text-green-700">
            Accepted: {accepted}
          </span>
          <span className="text-yellow-700 font-bold mx-auto rounded-2xl p-3 sm:p-5 bg-yellow-200 flex-1 ">
            Pending: {pending}
          </span>
        </div>
      </div>

      {/* --- Pending Request Table --- */}
      <div className="mt-15">
        <h2 className="mb-4 font-semibold text-xl text-fuchsia-800">
          {pending > 0 ? "Pending Requests ⚠️" : "No Pending Requests"}
        </h2>
        {pending > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full border rounded-xl shadow-md text-sm">
              <thead className="bg-white rounded-xl text-[#7d7d7d]">
                <tr className="">
                  <th className="px-3 py-2 text-left">Requester</th>
                  <th className="px-3 py-2 text-left">Blood Group</th>
                  <th className="px-3 py-2 text-left">Hospital</th>
                  <th className="px-3 py-2 text-left">Called At</th>
                </tr>
              </thead>
              <tbody>
                {response.allRequest.map((item, index) => {
                  const indianTime = new Date(item.createdAt).toLocaleString(
                    "en-IN"
                  );
                  return (
                    <tr
                      key={index}
                      className="border-b hover:bg-fuchsia-50 font-medium"
                    >
                      <td className="text-left px-3 py-2">
                        {item.requester?.name}
                      </td>
                      <td className="text-left px-3 py-2">{item.bloodGroup}</td>
                      <td className="text-left px-3 py-2">
                        {item.hospitalName}
                      </td>
                      <td className="text-left px-3 py-2">{indianTime}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default function DonorDashboard() {
  const [response, setResponse] = useState({
    allRequest: [],
    acceptedRequest: [],
    donorInfo: [],
    totalRequest: 0,
    totalDonation: 0,
  });
  const successPopup = useRef();
  const successpopupMessage = useRef();
  const {isDonor, setIsDonor} = useContext(AppContext)
  console.log(isDonor);
  useLayoutEffect(() => {
    socket.on("connect", () => {
      console.log("Connected with socket ID:", socket.id); // Access the socket ID
    });

    async function fetchData() {
      const token = localStorage.getItem("AuthToken");
      console.log(token)
      if (!token) return;

      try {
        const res = await fetch("http://localhost:8000/donor/dashboard", {
          headers: {
            authorization: `Bearer ${token}`,
          },
        });
        console.log(res.status);
        if (!res.ok) throw new Error("Failed to fetch donor dashboard");

        const data = await res.json();
        console.log(data);
        setIsDonor(true);
        setResponse(data);
      } catch (err) {
        console.log("Error:", err);
      }
    }

    fetchData();
    socket.emit("register", { token, id: socket.id });
  }, []);

  const total =
    response.totalDonation ||
    response.allRequest.length + response.acceptedRequest.length;
  const accepted = response.acceptedRequest.length;
  const pending = response.allRequest.length;
  const acceptedPercent = total ? (accepted / total) * 100 : 0;
  const pendingPercent = total ? (pending / total) * 100 : 0;

  return <>
  <div ref={successPopup} className="hidden">
        <h2 ref={successpopupMessage} className="">
CONGRATUALTIONS YOU ARE DONOR NOW!        </h2>
      </div>
  {isDonor ? 
    <DonorComponent
      response={response}
      accepted={accepted}
      pending={pending}
      total={total}
      acceptedPercent={acceptedPercent}
      pendingPercent={pendingPercent}
    />
   : 
    <h2 className="mt-20 text-xl">
      Become Donor <button onClick={()=>makeDonor(successPopup, successpopupMessage, setIsDonor)} className="bg-red-600 hover:bg-red-700 text-[white] font-normal px-2 py-1 rounded-lg shadow">Click here</button>
    </h2>}
  
  </> 
}
