import { publicGateway } from "@/MuLearnServices/apiGateways";
import { onboardingRoutes } from "@/MuLearnServices/urls";

interface ApiInterestGroup {
    id: string;
    name: string;
    icon: string;
    code: string;
    category: string;
    members: number;
    updated_by: string;
    updated_at: string;
    created_by: string;
    created_at: string;
}
export async function getDomainBasedInterestGroups(domain: string): Promise<ApiInterestGroup[]> {
    try {
        const response = await publicGateway.get(onboardingRoutes.interestGroups);
        
        if (response && response.data && response.data.response && response.data.response.interestGroup) {
            const interestGroups = response.data.response.interestGroup
                .filter((group: { category: string }) => group.category === domain)
                .map((group: { category: string }) => group); 
            
            return interestGroups; 
        }
        
        console.log("No valid interest groups found in response");
        return []; 
    } catch (error) {
        console.error("Failed to fetch interest groups:", error);
        return []; 
    }
}

//TODO Define reusable top three students api
// export function fetchTopThreeStudents(): Promise<any> {
   
// }