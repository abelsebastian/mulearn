import { privateGateway } from "@/MuLearnServices/apiGateways"
import { qseverseRoutes } from "@/MuLearnServices/urls"
import toast from "react-hot-toast"
import { AchievementDataFromBackend,  AchievementData} from "./ManageAchievementsInterface";



export const getAchievements = async (): Promise<AchievementDataFromBackend[] | undefined> => {
    try {
        const response = await privateGateway.get<{ data: AchievementDataFromBackend[] }>(qseverseRoutes.getAchievements);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        toast.error("Failed to fetch achievements");
    }
};

export const createAchievements = async (data: AchievementData): Promise<AchievementDataFromBackend | undefined> => {
    try {
        const response = await privateGateway.post<{ data: AchievementDataFromBackend }>(qseverseRoutes.createAchievements, data);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        toast.error("Failed to create achievements");
    }
};

export const updateAchievements = async (data: AchievementData): Promise<AchievementDataFromBackend | undefined> => {
    try {
        const response = await privateGateway.put<{ data: AchievementDataFromBackend }>(qseverseRoutes.updateAchievements, data);
        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        toast.error("Failed to update achievements");
    }
};

export const deleteAchievements = async (id: string): Promise<void> => {
    try {
        const response = await privateGateway.delete(qseverseRoutes.deleteAchievements, {
            params: { id }
        });
        if (response.status === 200) {
            toast.success("Achievement deleted successfully");
        }
    } catch (error) {
        toast.error("Failed to delete achievements");
    }
};