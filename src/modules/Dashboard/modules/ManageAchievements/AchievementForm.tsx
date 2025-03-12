// AchievementForm.tsx
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import styles from "../../utils/modalForm.module.css";
import toast from "react-hot-toast";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";

type Props = { id: string; closeModal: () => void };

const achievementTypes = [
    { value: "Individual", label: "Individual" },
    { value: "Team", label: "Team" },
    { value: "Progress", label: "Progress" },
    { value: "Special", label: "Special" }
];

const AchievementForm = forwardRef((props: Props, ref: any) => {
    const [data, setData] = useState<AchievementData>({
        id: "",
        si: 0,
        title: "",
        levelBased: false,
        description: "",
        icon: "",
        vcToken: false,
        tags: [],
        type: ""
    });
    const [errors, setErrors] = useState<any>({});

    useEffect(() => {
        // Simulate fetching achievement data
        const sampleData = {
            id: props.id,
            si: props.id === "ach1" ? 1 : 2,
            title: props.id === "ach1" ? "First Step" : "Level Master",
            levelBased: props.id === "ach1" ? false : true,
            description: props.id === "ach1" ? "Complete your first task" : "Reach level 5",
            icon: props.id === "ach1" ? "🏆" : "⭐",
            vcToken: props.id === "ach1" ? true : false,
            tags: props.id === "ach1" ? ["beginner", "welcome"] : ["progress", "milestone"],
            type: props.id === "ach1" ? "Individual" : "Progress"
        };
        setData(sampleData);
    }, [props.id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (name: string) => {
        setData(prev => ({ ...prev, [name]: !prev[name as keyof AchievementData] }));
    };

    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const tags = e.target.value.split(",").map(tag => tag.trim());
        setData(prev => ({ ...prev, tags }));
    };

    const handleTypeChange = (selectedOption: any) => {
        setData(prev => ({ ...prev, type: selectedOption?.value || "" }));
    };

    useImperativeHandle(ref, () => ({
        handleSubmitExternally: handleSubmit
    }));

    const handleSubmit = () => {
        const requiredFields = ["si", "title", "description", "type"];
        let isValid = true;

        requiredFields.forEach(field => {
            if (!data[field as keyof AchievementData]) {
                isValid = false;
                setErrors((prev: any) => ({
                    ...prev,
                    [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required`
                }));
            }
        });

        if (isValid) {
            toast.success("Achievement updated successfully");
            props.closeModal();
            console.log("Updated achievement:", data);
        }
    };

    return (
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <div className={styles.inputContainer}>
                    <input
                        type="number"
                        name="si"
                        placeholder="Serial Index"
                        value={data.si}
                        onChange={handleChange}
                    />
                    {errors.si && <div style={{ color: "red" }}>{errors.si}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        value={data.title}
                        onChange={handleChange}
                    />
                    {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <label>
                        Level Based
                        <input
                            type="checkbox"
                            checked={data.levelBased}
                            onChange={() => handleSwitchChange("levelBased")}
                        />
                    </label>
                </div>

                <div className={styles.inputContainer}>
                    <textarea
                        name="description"
                        placeholder="Description"
                        value={data.description}
                        onChange={handleChange}
                    />
                    {errors.description && <div style={{ color: "red" }}>{errors.description}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="icon"
                        placeholder="Icon (emoji or URL)"
                        value={data.icon}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles.inputContainer}>
                    <label>
                        VC Token
                        <input
                            type="checkbox"
                            checked={data.vcToken}
                            onChange={() => handleSwitchChange("vcToken")}
                        />
                    </label>
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        name="tags"
                        placeholder="Tags (comma-separated)"
                        value={data.tags.join(", ")}
                        onChange={handleTagsChange}
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
                    />
                    {errors.type && <div style={{ color: "red" }}>{errors.type}</div>}
                </div>
            </form>
        </div>
    );
});

export default AchievementForm;