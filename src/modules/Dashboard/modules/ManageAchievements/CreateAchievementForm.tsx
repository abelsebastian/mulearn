// CreateAchievementForm.tsx

import { forwardRef, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";
import toast from "react-hot-toast";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { Switch } from "@chakra-ui/react";
import { createAchievements } from "./services/api";
import { AchievementData } from "./ManageAchievementsInterface";

type Props = {
    closeModal: () => void;
    onSuccess?: (newAchievement: any) => void;
};

const achievementTypes = [
    { value: "Badge", label: "Badge" },
    { value: "Learning", label: "Learning" },
    { value: "Skills", label: "Skills" },
    { value: "Offers", label: "Offers" }
];

const tagsOptions = [
    { value: "Level 4 skill", label: "Level 4" },
    { value: "Level 5 skill", label: "Level 5" },
    { value: "Level 6 skill", label: "Level 6" },
    { value: "Level 7 skill", label: "Level 7" }
];

const CreateAchievementForm = forwardRef((props: Props, ref: any) => {
    const [data, setData] = useState<AchievementData>({
        title: "",
        level_based: false,
        description: "",
        has_vc: false,
        tags: [],
        type: "",
        icon: ""
    });
    const [errors, setErrors] = useState<Partial<Record<keyof AchievementData, string>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value } as AchievementData));
    };

    const handleSwitchChange = (name: keyof AchievementData) => {
        setData(prev => ({ ...prev, [name]: !prev[name] } as AchievementData));
    };

    const handleTagsChange = (selectedOptions: any) => {
        const tags = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [];
        setData(prev => ({ ...prev, tags }));
    };

    const handleTypeChange = (selectedOption: { value: string; label: string } | null) => {
        setData(prev => ({ ...prev, type: selectedOption?.value || "" }));
    };

    useImperativeHandle(ref, () => ({
        handleSubmitExternally: handleSubmit
    }));

    const handleSubmit = async () => {
        const requiredFields: (keyof AchievementData)[] = ["title", "description", "type"];
        let isValid = true;
        const newErrors: Partial<Record<keyof AchievementData, string>> = {};

        requiredFields.forEach(field => {
            if (!data[field]) {
                isValid = false;
                // Assert field as string to use string methods
                newErrors[field] = `${(field as string).charAt(0).toUpperCase() + (field as string).slice(1)} is required`;
            }
        });

        setErrors(newErrors);

        if (!isValid) return;

        setIsSubmitting(true);
        try {
            const achievementData = {
                title: data.title,
                level_based: data.level_based ?? false,
                description: data.description,
                has_vc: data.has_vc ?? false,
                type: data.type,
                tags: data.tags,
                icon: data.icon || ""
            };

            const response = await createAchievements(achievementData);
            console.log("Achievement created successfully", response);

            // Transform response to match ManageAchievements structure
            const transformedResponse: AchievementData = {
                ...response,
                levelBased: response?.level_based ?? false,
                vcToken: response?.has_vc ?? false,
                id: response?.id || `ach_${Date.now()}`,
                created_at: response?.created_at || new Date().toISOString(),
                title: response?.title ?? data.title,
                description: response?.description ?? data.description,
                type: response?.type ?? data.type,
                tags: response?.tags ?? data.tags,
                icon: response?.icon ?? data.icon
            };

            toast.success("Achievement created successfully");
            props.onSuccess?.(transformedResponse);
            props.closeModal();

            setData({
                title: "",
                level_based: false,
                description: "",
                has_vc: false,
                tags: [],
                type: "",
                icon: ""
            });
        } catch (error) {
            toast.error("Failed to create achievement");
            console.error("Error creating achievement:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={data.title}
                        onChange={handleChange}

                        disabled={isSubmitting}
                    />
                    {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        name="description"
                        placeholder="Description"
                        value={data.description}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                    {errors.description && <div style={{ color: "red" }}>{errors.description}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <label>
                        Level Based
                        <Switch
                            isChecked={data.level_based ?? false}
                            onChange={() => handleSwitchChange("level_based")}
                            isDisabled={isSubmitting}
                        />
                    </label>
                </div>

                <div className={styles.inputContainer}>
                    <label>
                        Has VC?
                        <Switch

                            isChecked={data.has_vc ?? false}
                            onChange={() => handleSwitchChange("has_vc")}
                            isDisabled={isSubmitting}
                        />
                    </label>
                </div>

                <div className={styles.inputContainer}>
                    <Select
                        styles={customReactSelectStyles}
                        options={tagsOptions}
                        isClearable
                        isMulti
                        placeholder="Tags"
                        value={tagsOptions.filter(option => data.tags.includes(option.value))}
                        onChange={handleTagsChange}
                        isDisabled={isSubmitting}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <Select
                        styles={customReactSelectStyles}
                        options={achievementTypes}
                        value={achievementTypes.find(type => type.value === data.type)}
                        onChange={handleTypeChange}
                        placeholder="Select Type"
                        isClearable
                        isDisabled={isSubmitting}
                    />
                    {errors.type && <div style={{ color: "red" }}>{errors.type}</div>}
                </div>

                <div className={styles.inputContainer}>

                    <input
                        type="text"
                        name="icon"
                        placeholder="Icon URL"
                        value={data.icon}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
});

export default CreateAchievementForm;