// CreateAchievementForm.tsx
import { forwardRef, useImperativeHandle, useState, useRef } from "react";
import styles from "../../utils/modalForm.module.css";
import toast from "react-hot-toast";
import Select from "react-select";
import { customReactSelectStyles } from "../../utils/common";
import { Switch } from "@chakra-ui/react";

type Props = { closeModal: () => void };

const achievementTypes = [
    { value: "Individual", label: "Individual" },
    { value: "Team", label: "Team" },
    { value: "Progress", label: "Progress" },
    { value: "Special", label: "Special" }
];

const tagsOptions = [
    { value: "beginner", label: "Beginner" },
    { value: "welcome", label: "Welcome" },
    { value: "progress", label: "Progress" },
    { value: "milestone", label: "Milestone" }
];

const CreateAchievementForm = forwardRef((props: Props, ref: any) => {
    const [data, setData] = useState<AchievementData>({
        id: "",
        title: "",
        levelBased: false,
        description: "",
        vcToken: false,
        tags: [],
        type: ""
    });
    const [errors, setErrors] = useState<any>({});

    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const handleSwitchChange = (name: string) => {
        setData(prev => ({ ...prev, [name]: !prev[name as keyof AchievementData] }));
    };

    const handleTagsChange = (selectedOptions: any) => {
        const tags = selectedOptions ? selectedOptions.map((opt: any) => opt.value) : [];
        setData(prev => ({ ...prev, tags }));
    };

    const handleTypeChange = (selectedOption: any) => {
        setData(prev => ({ ...prev, type: selectedOption?.value || "" }));
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Update data state with file info
            setData(prev => ({ ...prev, iconFile: file }));
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };


    useImperativeHandle(ref, () => ({
        handleSubmitExternally: handleSubmit
    }));

    const handleSubmit = () => {
        const requiredFields = ["title", "description", "type"];
        let isValid = true;
        const newErrors: any = {};

        requiredFields.forEach(field => {
            if (!data[field as keyof AchievementData]) {
                isValid = false;
                newErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
            }
        });

        setErrors(newErrors);

        if (isValid) {
            toast.success("Achievement created successfully");
            props.closeModal();
            console.log("New achievement:", {
                ...data,
                id: `ach_${Date.now()}`, // Generate a simple unique ID
                si: 1 // Starting sequence/index number
            });
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
                    />
                    {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        name="description"
                        placeholder="Description"
                        value={data.description}
                        onChange={handleChange}
                    />
                    {errors.description && <div style={{ color: "red" }}>{errors.description}</div>}
                </div>

                <div className={styles.inputContainer}>
                    <label>
                        Level Based
                        <Switch
                            isChecked={data.levelBased}
                            onChange={() => handleSwitchChange("levelBased")}
                        />
                    </label>
                </div>

                <div className={styles.inputContainer}>
                    <label>
                        Has VC?
                        <Switch
                            isChecked={data.vcToken}
                            onChange={() => handleSwitchChange("vcToken")}
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

                <div className={styles.inputContainer}>
                    <div className={styles.fileUploadContainer}>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelect}
                            accept="image/*"
                            style={{ display: 'none' }}
                        />
                        <button
                            type="button"
                            onClick={triggerFileInput}
                            className={styles.fileUploadButton}
                        >
                            Choose Icon
                        </button>
                        <span className={styles.fileName}>
                            {selectedFile ? selectedFile.name : "No file selected"}
                        </span>
                    </div>
                    {previewUrl && (
                        <div className={styles.iconPreview}>
                            <img src={previewUrl} alt="Icon preview" />
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
});

export default CreateAchievementForm;