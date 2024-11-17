"use client"

import { AlertCollapse } from "@/components/AlertCollapse";
import Link from "next/link";
import Image from "next/image";
import { Navbar } from "@/components/Navbar";
import { useState, useEffect } from "react";
import api from "@/services/api";

export default function Alerts() {
  interface Alert {
    id: string;
    title: string;
    timestamp: string;
    sendTo: string;
    description: string;
  }

  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    async function fetchAlerts() {
      try {
        const response = await api.get("/alert");

        const alerts = response.data.map((alert: any) => ({
          id: alert.id,
          title: alert.title,
          timestamp: alert.timestamp || new Date().toISOString(),
          sendTo: alert.sendto,
          description: alert.message || "",
          sender: alert.fromSystem ? "System" : "Admin",
        }));
        setAlerts(alerts.reverse());
      } catch (error) {
        console.log("Failed to fetch alerts: " + error);
      }
    }
    fetchAlerts();
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-12">
        <div className="flex justify-between">
          <div className="">
            <h1 className="text-4xl font-semibold font-alt gap-2 py-2  ">
              Alerts
            </h1>
          </div>

          <Link href="/alerts/create">
            <button className="bg-green hover:bg-dark-green hover:duration-200 rounded-full flex py-2 px-6 justify-center items-center gap-2 " >
              <Image src="/plus.svg" alt="Adicionar" height={42} width={42} />
              <p className="text-2xl font-semibold text-white">New</p>
            </button>
          </Link>

        </div>
        <div className="py-12">
          <h2 className="text-2xl font-semibold">
            Alerts sent:
          </h2>
        </div>
        {alerts.length > 0 ? (
          alerts.map((alert) => (
            <AlertCollapse
              key={alert.id}
              title={alert.title}
              data={new Date(alert.timestamp).toLocaleString()}
              sentTo={alert.sendTo}
              description={alert.description}
              sender="Admin"
            />
          ))
        ) : (
          <p>No alerts have been sent yet.</p>
        )}
      </div>
    </>
  );
}
