interface AchievementData {
    id: string;
    title: string;
    levelBased: boolean;
    description: string;
    vcToken: boolean;
    tags: string[];
    type: string;
    iconFile?: File | null; // For file uploads in the form
    icon?: string; // For the icon URL or emoji from the backend
}

interface AchievementDataFromBackend {
    id: string;
    title: string;
    levelBased: boolean;
    description: string;
    vcToken: boolean;
    tags: string[];
    type: string;
    icon: string; // Icon URL or emoji from the backend
    created_at: string;
}