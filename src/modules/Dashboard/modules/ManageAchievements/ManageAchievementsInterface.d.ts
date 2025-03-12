// ManageAchievementsInterface.d.ts
interface AchievementData {
    id: string;
    title: string;
    levelBased: boolean;
    description: string;
    vcToken: boolean;
    tags: string[];
    type: string;
}

interface AchievementDataFromBackend {
    id: string;
    title: string;
    levelBased: boolean;
    description: string;
    vcToken: boolean;
    tags: string[];
    type: string;
    created_at: string;
}

// Sample JSON response structure
const sampleAchievementResponse = {
    response: {
        data: [
            {
                id: "ach1",
                title: "First Step",
                levelBased: false,
                description: "Complete your first task",
                vcToken: true,
                tags: ["beginner", "welcome"],
                type: "Individual",
                created_at: "2025-01-01T10:00:00Z"
            },
            {
                id: "ach2",
                title: "Level Master",
                levelBased: true,
                description: "Reach level 5",
                vcToken: false,
                tags: ["progress", "milestone"],
                type: "Progress",
                created_at: "2025-01-02T14:00:00Z"
            }
        ],
        pagination: {
            totalPages: 1,
            currentPage: 1,
            perPage: 20
        }
    }
};