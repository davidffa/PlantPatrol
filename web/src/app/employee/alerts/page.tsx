"use client"

import { AlertCollapseReceiver } from "@/components/AlertCollapseReceiver";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import api from "@/services/api";
import { useAuth } from "@/contexts/auth";


export default function Alerts() {
  interface Alert {
    id: string;
    title: string;
    timestamp: string;
    message: string;
    sendto: string;
    fromSystem: boolean;
  }

  const { user, isLogged } = useAuth();
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {

    if (!isLogged || !user) return;

    async function fetchAlerts() {
      try {
        console.log("Making API request...");
        const response = await api.get("/alert");
        console.log("API response:", response);
        console.log("Logged-in user:", user);

        if (!user) return;
        const employeeFullName = `${user.firstName} ${user.lastName}`;
        const filteredAlerts = response.data.filter(
          (alert: Alert) => alert.sendto === "Everyone" || (alert.sendto === employeeFullName)
        )
        console.log("Filtered alerts:", filteredAlerts);
        setAlerts(filteredAlerts.reverse());
      } catch (error) {
        console.log("Failed to fetch alerts: " + error);
      }
    }
    fetchAlerts();
  }, [isLogged, user]);
  return (
    <>
      <Navbar />
      <div className="p-12">
        <div className="mb-12">
          <h1 className="text-4xl font-semibold font-alt gap-2 py-2 mb-6 ">
            Alerts
          </h1>
          <hr className="mb-4" />
        </div>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <AlertCollapseReceiver
              key={alert.id}
              title={alert.title}
              data={new Date(alert.timestamp).toLocaleString()}
              description={alert.message}
            />
          ))
        ) : (
          <p>No alerts found for you</p>
        )}
      </div>
    </>
  );
}
