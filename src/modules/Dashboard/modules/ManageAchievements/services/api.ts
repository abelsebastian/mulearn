import { privateGateway } from "@/MuLearnServices/apiGateways"
import { qseverseRoutes } from "@/MuLearnServices/urls"
import toast from "react-hot-toast"

import { AchievementData } from "../ManageAchievementsInterface";
import axios from "axios";

export const getAchievements = async (): Promise<AchievementData[] | undefined> => {
    try {
        const response = await privateGateway.get<{ response: AchievementData[] }>(
            qseverseRoutes.getAchievements
        );
        if (response.status === 200) {
            return response.data.response; // Access 'response' instead of 'data'
        }
    } catch (error) {
        toast.error("Failed to fetch achievements");
        console.error("Error fetching achievements:", error);
    }
};

export const createAchievements = async (data: AchievementData): Promise<AchievementData | undefined> => {

    try {
        const response = await privateGateway.post<{ data: AchievementData }>(qseverseRoutes.createAchievements, data);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        toast.error("Failed to create achievements");
    }
};

export const updateAchievements = async (data: AchievementData): Promise<AchievementData | undefined> => {
    try {
        const response = await privateGateway.put<{ data: AchievementData }>(qseverseRoutes.updateAchievements, data);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        toast.error("Failed to update achievements");
    }
};

export const deleteAchievements = async (id: string): Promise<void> => {
    try {

        const response = await axios.delete(qseverseRoutes.deleteAchievements+`${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        });
        console.log("Deleting at URL:", qseverseRoutes.deleteAchievements+`${id}`);
        if (response.status === 200) {
            toast.success("Achievement deleted successfully");
        }
    } catch (error) {
        toast.error("Failed to delete achievements");
    }
};