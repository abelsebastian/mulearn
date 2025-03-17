import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";
import toast from "react-hot-toast";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { Switch } from "@chakra-ui/react";
import { AchievementData } from "./ManageAchievementsInterface";
import { updateAchievements } from "./services/api";

type Props = { 
    achievement: AchievementData; 
    closeModal: () => void; 
    onsuccess?: (updatedAchievement: AchievementData) => void; 
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

const AchievementForm = forwardRef((props: Props, ref: any) => {
    const [data, setData] = useState<AchievementData>({
        id: "",
        name: "",
        level_based: false,
        description: "",
        has_vc: false,
        tags: [],
        type: "",
        icon: "",
        template_id: ""
    });
    const [errors, setErrors] = useState<any>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [tagInput, setTagInput] = useState("");

    useEffect(() => {
        if (props.achievement) {
            setData({
                id: props.achievement.id,
                name: props.achievement.name || "", 
                level_based: props.achievement.level_based,
                description: props.achievement.description || "",
                has_vc: props.achievement.has_vc,
                tags: props.achievement.tags || [],
                type: props.achievement.type || "",
                icon: props.achievement.icon || "",
                template_id: props.achievement.template_id || ""
            });
        }
    }, [props.achievement]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (name: string) => {
        setData((prev) => ({ ...prev, [name]: !prev[name as keyof AchievementData] }));
    };

    const handleTagsChange = (selectedOptions: any) => {
        const tags = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [];
        setData((prev) => ({ ...prev, tags }));
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && tagInput.trim()) {
            e.preventDefault();
            setData(prev => ({
                ...prev,
                tags: [...prev.tags, tagInput.trim()]
            }));
            setTagInput("");
        }
    };

    const handleTypeChange = (selectedOption: { value: string; label: string } | null) => {
        setData((prev) => ({ ...prev, type: selectedOption?.value || "" }));
    };

    useImperativeHandle(ref, () => ({
        handleSubmitExternally: handleSubmit
    }));

    const handleSubmit = async () => {
        const requiredFields: (keyof AchievementData)[] = ["name", "description", "type"];
        let isValid = true;
        const newErrors: Partial<Record<keyof AchievementData, string>> = {};
    
        requiredFields.forEach((field) => {
            if (!data[field]) {
                isValid = false;
                newErrors[field] = `${String(field).charAt(0).toUpperCase() + String(field).slice(1)} is required`;
            }
        });
    
        setErrors(newErrors);
    
        if (!isValid) return;
    
        setIsSubmitting(true);
        try {
            const updatedAchievement = await updateAchievements(data);
            if (updatedAchievement) {
                toast.success("Achievement updated successfully");
                props.closeModal();
                if (props.onsuccess) {
                    props.onsuccess(updatedAchievement);
                }
            }
        } catch (error) {
            toast.error("Failed to update achievement");
            console.error("Error updating achievement:", error);
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
                        name="name"
                        placeholder="Name"
                        value={data.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                    {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <textarea
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
                            isChecked={data.level_based}
                            onChange={() => handleSwitchChange("level_based")}
                            isDisabled={isSubmitting}
                        />
                    </label>
                </div>

                <div className={styles.inputContainer}>
                    <label>
                        Has VC?
                        <Switch
                            isChecked={data.has_vc}
                            onChange={() => handleSwitchChange("has_vc")}
                            isDisabled={isSubmitting}
                        />
                    </label>
                </div>

                <div className={styles.inputContainer}>
                    <div className={styles.taginputcontainer}>
                        <div className={styles.taginputwrapper}>
                            {data.tags.map(tag => (
                                <span key={tag} className={styles.tagchip}>
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        disabled={isSubmitting}
                                        className={styles.removetagbutton}
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                            <input
                                type="text"
                                placeholder={data.tags.length === 0 ? "Enter a tag and press Enter" : ""}
                                value={tagInput}
                                onChange={e => setTagInput(e.target.value)}
                                onKeyPress={handleTagInputKeyPress}
                                disabled={isSubmitting}
                                className={styles.taginputfield}
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.inputContainer}>
                    <Select
                        styles={customReactSelectStyles}
                        options={achievementTypes}
                        value={achievementTypes.find((option) => option.value === data.type)}
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

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="template_id"
                        placeholder="Template ID"
                        value={data.template_id}
                        onChange={handleChange}
                        disabled={isSubmitting}
                    />
                </div>
            </form>
        </div>
    );
});

export default AchievementForm;