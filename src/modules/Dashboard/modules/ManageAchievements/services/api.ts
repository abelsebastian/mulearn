import { privateGateway } from "@/MuLearnServices/apiGateways"
import { qseverseRoutes } from "@/MuLearnServices/urls"
import toast from "react-hot-toast"



export const getAchievements = async () => {
    try {
        const response = await privateGateway.get(qseverseRoutes.getAchievements);
        if(response.status === 200) {
            return response.data
        }
    } catch (error) {
        toast.error("Failed to fetch achievements")
    }
}

export const createAchievements = async (data: any) => {
    try {
        const response = await privateGateway.get(qseverseRoutes.createAchievements, data);
        if(response.status === 200) {
            return response.data
        }
    } catch (error) {
        toast.error("Failed to create achievements")
    }
}

export const updateAchievements = async (data: any) => {
    try {
        const response = await privateGateway.get(qseverseRoutes.updateAchievements, data);
        if(response.status === 200) {
            return response.data
        }
    } catch (error) {
        toast.error("Failed to update achievements")
    }

}

export const deleteAchievements = async (id: string) => {
    try {
        const response = await privateGateway.get(qseverseRoutes.deleteAchievements, {
            params : {
                id
            }
        });
        if(response.status === 200) {
            return response.data
        }
    } catch (error) {
        toast.error("Failed to delete achievements")
    }

}

