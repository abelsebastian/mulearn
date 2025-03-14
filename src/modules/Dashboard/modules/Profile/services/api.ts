import { NavigateFunction } from "react-router-dom";
import { privateGateway, publicGateway, qSeversePrivateGateway } from "@/MuLearnServices/apiGateways";
import { dashboardRoutes, qseverseRoutes } from "@/MuLearnServices/urls";
import toast from "react-hot-toast";
import axios from "axios";
import { AiOutlineConsoleSql } from "react-icons/ai";
import { error, log } from "console";

type userProfile = UseStateFunc<any>;
type userLog = UseStateFunc<any>;
type APILoadStatus = UseStateFunc<any>;
type userLevelData = UseStateFunc<any>;
interface IssueVCRequest {
    api_key: string;
    subject_info: SubjectInfo;
    credential_info: CredentialInfo;
    template_id: string;
    send_email: boolean;
}

export interface Credential  {
    id: string;
    user_id: string;
    display_name: string;
    name: string;
    created_at: string;
    banner_image_url: string | null;
    fields: Array<{ [key: string]: any }>;
    tags: string[];
    template_type: string;
    template_data: string; // JSON string, needs parsing if used programmatically
  };

  
export const getUserProfile = (
    setUserProfile: userProfile,
    setAPILoadStatus: APILoadStatus,
    setProfileStatus: any
) => {
    privateGateway
        .get(dashboardRoutes.getUserProfile)
        .then(response => {
            setAPILoadStatus(response.data.statusCode);
            setUserProfile(response.data.response);
            setProfileStatus(response.data.response.is_public);
            localStorage.setItem("userId", response.data.response.id);
        })
        .catch(error => {
            console.log(error);
        });
};

export const getUserLog = (setUserLog: userLog) => {
    privateGateway
        .get(dashboardRoutes.getUserLog)
        .then(response => {
            setUserLog(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};
export const getPublicUserProfile = (
    setUserProfile: userProfile,
    setAPILoadStatus: APILoadStatus,
    muid: string
) => {
    publicGateway
        .get(dashboardRoutes.getPublicUserProfile.replace("${muid}", muid))
        .then(response => {
            setAPILoadStatus(response.data.statusCode);
            // console.log(response.data.statusCode);
            setUserProfile(response.data.response);
        })
        .catch(error => {
            console.log(error);
            setAPILoadStatus(error.response.data.statusCode);
        });
};

export const getPublicUserLog = (setUserLog: userLog, muid: string) => {
    publicGateway
        .get(dashboardRoutes.getPublicUserLog.replace("${muid}", muid))
        .then(response => {
            setUserLog(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};
export const putIsPublic = (is_public: boolean) => {
    privateGateway
        .put(dashboardRoutes.putIsPublic, { is_public })
        .then((response: APIResponse<{}, string[]>) => {
            console.log(response.data.message.general[0]);

            toast.success("Profile status is updated");
        })
        .catch(error => {
            console.log(error);
        });
};

export const getUserLevels = (setUserLevelData: userLevelData) => {
    privateGateway
        .get(dashboardRoutes.getUserLevels)
        .then(response => {
            setUserLevelData(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};

export const getPublicUserLevels = (
    setUserLevelData: userLevelData,
    muid: string
) => {
    publicGateway
        .get(dashboardRoutes.getPublicUserLevels.replace("${muid}", muid))
        .then(response => {
            // console.log(response.data);
            setUserLevelData(response.data.response);
        })
        .catch(error => {
            console.log(error);
        });
};

export const issueVerifiableCredential = async (
    subject_info: SubjectInfo,
    credential_info: CredentialInfo,
    template_id: string,

): Promise<any> => {
    try {
        const requestData: IssueVCRequest = {
            api_key: import.meta.env.VITE_QSEVERSE_API_KEY as string,
            subject_info: subject_info,
            credential_info: credential_info,
            template_id: template_id,
            send_email: true,
        };

        const response = await qSeversePrivateGateway.post(qseverseRoutes.issueVerifiableCredentials, requestData,);

        return response.data;
    } catch (error: any) {
        console.error("Error issuing VC:", error.response?.data || error.message);
        toast.error("Failed to issue VC");
        throw new Error(error.response?.data?.message || "Failed to issue VC");
    }
};


export const getAllConnectedUsers = async (): Promise<any> => {
    try {
        const response = await qSeversePrivateGateway.get(qseverseRoutes.getAllConnectedUsers, {
        });
        console.log(response);
        return response;
    } catch (error: any) {
        console.error("Error fetching achievements:", error.response?.data || error.message);
        toast.error("Failed to fetch achievements");
        throw new Error(error.response?.data?.message || "Failed to fetch achievements");
    }
}


export const getConnectedUsers = async (
    key?: string,
    value?: string
): Promise<any> => {
    try {
        const response = await qSeversePrivateGateway.get(qseverseRoutes.getConnectedUsers, {
            params: { key, value }
        });
        return response.data.matching_users[0].did;
    } catch (error: any) {
        console.error("Error fetching connected users:", error.response?.data || error.message);
        toast.error("Failed to fetch connected users");
        throw new Error(error.response?.data?.message || "Failed to fetch connected users");
    }
};


export const getQSCredentials = async (): Promise<any> => {
    try {
        const response = await qSeversePrivateGateway.get(qseverseRoutes.getCredentials);
        return response.data;
    } catch (error: any) {
        console.error("Error fetching QS credentials:", error.response?.data || error.message);
        toast.error("Failed to fetch QS credentials");
        throw new Error(error.response?.data?.message || "Failed to fetch QS credentials");
    }
}

export const getUserAchievements = async (
    muid: string,
    credentials: Credential[]
  ): Promise<any[]> => {
    try {
      const response = await publicGateway.get(
        qseverseRoutes.getUserAchievements + `${muid}`
      );
      if (response?.data?.response && credentials.length !== 0) {
        const achievements = response.data.response.map((achievement: any) => {
          const matchedCredential = credentials.find(
              (credential) => 
              achievement.achievement.tags[0] === credential.tags[0],
          );

          
          
          return {
            id: achievement.achievement.id,
            title: achievement.achievement.achievement_name,
            level_based: achievement.achievement.level_based,
            description: achievement.achievement.description,
            tags: achievement.achievement.tags || [],
            type: "Learning", // Assuming this based on context
            templateID: matchedCredential ? matchedCredential.id : "", 
            icon: achievement.achievement.icon,
            has_vc: achievement.is_issued,
          };
        });
        console.log(achievements);

        return achievements; 
      }
  
      return []; // Return empty array if response is empty
    } catch (error: any) {
      console.error("Error fetching achievements:", error.response?.data || error.message);
      toast.error("Failed to fetch achievements");
      throw new Error(error.response?.data?.message || "Failed to fetch achievements");
    }
  };

// export const getUserAchievementsWithCredentials = async (muid: string): Promise<any[]> => {
//     try {
//         // Fetch credentials and user achievements concurrently
//         const [credentialsResponse, userAchievementsResponse] = await Promise.all([
//             qSeversePrivateGateway.get(qseverseRoutes.getCredentials),
//             publicGateway.get(qseverseRoutes.getUserAchievements + muid)
//         ]);

//         const credentials = credentialsResponse.data;
//         const userAchievementsData = userAchievementsResponse.data.response;

//         if (userAchievementsData && Array.isArray(userAchievementsData) && credentials && Array.isArray(credentials) && credentials.length !== 0) {
//             const achievements = userAchievementsData.map((achievement: any) => {
//                 const matchedCredential = credentials.find(
//                     (credential: any) => achievement.achievement.tags[0] === credential.tags[0]
//                 );
//                 return {
//                     id: achievement.achievement.id,
//                     title: achievement.achievement.achievement_name,
//                     level_based: achievement.achievement.level_based,
//                     description: achievement.achievement.description,
//                     tags: achievement.achievement.tags || [],
//                     type: "Learning",
//                     templateID: matchedCredential ? matchedCredential.id : "",
//                     icon: achievement.achievement.icon,
//                     has_vc: achievement.is_issued,
//                 };
//             });
//             return achievements;
//         }

//         // Return empty array if conditions are not met
//         return [];
//     } catch (error: any) {
//         console.error("Error fetching data:", error.response?.data || error.message);
//         toast.error("Failed to fetch data");
//         throw new Error(error.response?.data?.message || "Failed to fetch data");
//     }
// };
  


export const updateVCURL = async (
    achievementID: string,
    vcURL: string
    ): Promise<void> => {
    try {
        await privateGateway.post(qseverseRoutes.updateVCURL, {
            achievement_id: achievementID,
            vc_url: vcURL,
        });
    } catch (error: any) {
        console.error("Error updating VC URL:", error.response?.data || error.message);
        toast.error("Failed to update VC URL");
        throw new Error(error.response?.data?.message || "Failed to update VC URL");
    }
};