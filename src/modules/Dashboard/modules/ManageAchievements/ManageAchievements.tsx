// ManageAchievements.tsx
import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import AchievementForm from "./AchievementForm";
import CreateAchievementForm from "./CreateAchievementForm"; // Import the new form

const sampleAchievement = [
    {
        id: "ach1",
        title: "First Step",
        levelBased: false,
        description: "Complete your first task",
        vcToken: true,
        tags: ["beginner", "welcome"],
        type: "Individual",
        icon: "https://www.svgrepo.com/show/422992/trophy-prize-medal-2.svg",
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
        icon: "https://www.svgrepo.com/show/422993/medal-badge-prize.svg",
        created_at: "2025-01-02T14:00:00Z"
    }
];

function ManageAchievements() {
    const [data, setData] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [perPage, setPerPage] = useState(20);
    const [sort, setSort] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const firstFetch = useRef(true);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [id, setId] = useState("");
    const AchievementFormRef = useRef<any>(null);
    const CreateAchievementFormRef = useRef<any>(null);

    const columnOrder = [
        { column: "icon", Label: "Icon", isSortable: false },
        { column: "title", Label: "Title", isSortable: true },
        { column: "levelBased", Label: "Level Based", isSortable: true },
        { column: "description", Label: "Description", isSortable: false },
        { column: "vcToken", Label: "VC Token", isSortable: true },
        { column: "tags", Label: "Tags", isSortable: false },
        { column: "type", Label: "Type", isSortable: true },
        { column: "created_at", Label: "Created On", isSortable: true }
    ];

    useEffect(() => {
        if (firstFetch.current) {
            setData(sampleAchievement);
            setTotalPages(1);
            setIsLoading(false);
        }
        firstFetch.current = false;
    }, []);

    const handleNextClick = () => {
        setCurrentPage(prev => prev + 1);
    };

    const handlePreviousClick = () => {
        setCurrentPage(prev => prev - 1);
    };

    const handleSearch = (search: string) => {
        setCurrentPage(1);
        if (search.trim() === "") {
            setData(sampleAchievement);
        } else {
            const filteredData = sampleAchievement.filter(item =>
                item.title.toLowerCase().includes(search.toLowerCase()) ||
                item.description.toLowerCase().includes(search.toLowerCase())
            );
            setData(filteredData);
        }
    };

    const handleEdit = (id: string | number | boolean) => {
        setId(id as string);
        setIsEditModalOpen(true);
    };

    const handleDelete = (id: string | undefined) => {
        setData(prev => prev.filter(item => item.id !== id));

        navigate("/dashboard/management/manage-achievements");
    };

    const handlePerPageNumber = (selectedValue: number) => {
        setPerPage(selectedValue);
        setCurrentPage(1);
    };

    const handleIconClick = (column: string) => {
        const newSort = sort === column ? `-${column}` : column;
        setSort(newSort);
        const sortedData = [...data].sort((a, b) => {
            if (newSort.startsWith("-")) {
                return b[newSort.slice(1)] > a[newSort.slice(1)] ? 1 : -1;
            }
            return a[column] > b[column] ? 1 : -1;
        });
        setData(sortedData);
    };

    const handleCreateAchievement = () => {
        setIsCreateModalOpen(true);
    };

    const handleCreateSubmit = () => {
        CreateAchievementFormRef.current?.handleSubmitExternally();
        
    };

    return (
        <>
            {data && (
                <>
                    <TableTop
                        onSearchText={handleSearch}
                        onPerPageNumber={handlePerPageNumber}
                        extraButtons={[
                            {
                                text: "Create Achievement",
                                onClick: handleCreateAchievement,
                                style: { marginRight: "5px", padding: "5px 10px", background: '#556ff1', borderRadius: 10, color: '#FFFFFF' }
                            }
                        ]}
                    />
                    <MuModal
                        isOpen={isEditModalOpen}
                        onClose={() => setIsEditModalOpen(false)}
                        title="Edit Achievement"
                        type="success"
                        body="Enter the details of the achievement."
                        onDone={() =>
                            AchievementFormRef.current?.handleSubmitExternally()
                        }
                    >
                        <AchievementForm
                            ref={AchievementFormRef}
                            id={id}
                            closeModal={() => setIsEditModalOpen(false)}
                        />
                    </MuModal>
                    <MuModal
                        isOpen={isCreateModalOpen}
                        onClose={() => setIsCreateModalOpen(false)}
                        title="Create Achievement"
                        type="success"
                        body="Enter the details for the new achievement."
                        onDone={handleCreateSubmit}
                    >
                        <CreateAchievementForm
                            ref={CreateAchievementFormRef}
                            closeModal={() => setIsCreateModalOpen(false)}
                        />
                    </MuModal>
                    <Table
                        rows={data}
                        isloading={isLoading}
                        page={currentPage}
                        perPage={perPage}
                        columnOrder={columnOrder}
                        id={["id"]}
                        onEditClick={handleEdit}
                        onDeleteClick={handleDelete}
                        modalDeleteHeading="Delete Achievement"
                        modalTypeContent="error"
                        modalDeleteContent="Are you sure you want to delete this achievement?"
                        customCellRender={(column: any, row: any) => {
                            if (column === "icon") {
                                return (
                                    <div style={{ width: "50px", height: "50px" }}>
                                        {row.icon.startsWith("http") ? (
                                            <img
                                                src={row.icon}
                                                alt="Achievement Icon"
                                                style={{ width: "100%", height: "100%", objectFit: "contain" }}
                                            />
                                        ) : (
                                            <span style={{ fontSize: "24px" }}>{row.icon}</span>
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        }}
                    >
                        <THead
                            columnOrder={columnOrder}
                            onIconClick={handleIconClick}
                            action={true}
                        />
                        <div>
                            {!isLoading && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    margin="10px 0"
                                    handleNextClick={handleNextClick}
                                    handlePreviousClick={handlePreviousClick}
                                    onSearchText={handleSearch}
                                    onPerPageNumber={handlePerPageNumber}
                                    perPage={perPage}
                                    setPerPage={setPerPage}
                                />
                            )}
                        </div>
                        <Blank />
                    </Table>
                </>
            )}
        </>
    );
}

export default ManageAchievements;