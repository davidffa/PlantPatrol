"use client"

import { Employee } from "./auth";
import api from "../services/api";

export type Alert = {
    id: string;
    title: string;
    description: string;
    sendTo: Employee;
}

export const creatAlert = async (alertData: Omit<Alert, "id">): Promise<Alert> => { //id vai ser gerado pelo backend
    const response = await api.post<Alert>("/alerts", alertData);
    return response.data;
}