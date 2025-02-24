import React, { useState, useEffect, useCallback, Suspense, useRef } from "react";
import styles from "./CampusSearchPage.module.css"; // Reuse existing styles
import { FiSearch } from "react-icons/fi";
import debounce from "lodash/debounce";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import CampusCard from "../components/CampusCard"// Adjust path as needed
import { useNavigate } from "react-router-dom";

// Define Campus type based on your API structure
interface Campus {
    id: string;

    college_name: string;
    campus_code: string;
    campus_zone: string;
    total_karma: string;
    grade: 'A' | 'B' | 'C' | 'N/A';
    lead: { campus_lead: string; enabler: string };
}

interface Pagination {
    totalPages: number;
    isNext: boolean;
}

// Mock API with 20 colleges
const mockCampusData: Campus[] = [
    {
        id: "CAMP001",
        college_name: "St. Xavier's College",
        campus_code: "C001",
        campus_zone: "North",
        total_karma: "12000",
        grade: "A",
        lead: { campus_lead: "Alice Johnson", enabler: "Bob Smith" },
    },
    {
        id: "CAMP002",
        college_name: "Greenwood Institute",
        campus_code: "C002",
        campus_zone: "South",
        total_karma: "8500",
        grade: "B",
        lead: { campus_lead: "Charlie Brown", enabler: "" },
    },
    {
        id: "CAMP003",
        college_name: "Riverdale University",
        campus_code: "C003",
        campus_zone: "East",
        total_karma: "6000",
        grade: "C",
        lead: { campus_lead: "Diana Prince", enabler: "Eve Carter" },
    },
    {
        id: "CAMP004",
        college_name: "Brighton Academy",
        campus_code: "C004",
        campus_zone: "West",
        total_karma: "9500",
        grade: "N/A",
        lead: { campus_lead: "Frank Miller", enabler: "" },
    },
    {
        id: "CAMP005",
        college_name: "Maple Grove College",
        campus_code: "C005",
        campus_zone: "North",
        total_karma: "15000",
        grade: "A",
        lead: { campus_lead: "Grace Lee", enabler: "Henry Davis" },
    },
    {
        id: "CAMP006",
        college_name: "Sunnydale Tech",
        campus_code: "C006",
        campus_zone: "South",
        total_karma: "7200",
        grade: "B",
        lead: { campus_lead: "Irene Taylor", enabler: "" },
    },
    {
        id: "CAMP007",
        college_name: "Oakwood University",
        campus_code: "C007",
        campus_zone: "East",
        total_karma: "4800",
        grade: "C",
        lead: { campus_lead: "James Wilson", enabler: "Kelly Adams" },
    },
    {
        id: "CAMP008",
        college_name: "Lakeside Institute",
        campus_code: "C008",
        campus_zone: "West",
        total_karma: "11000",
        grade: "N/A",
        lead: { campus_lead: "Laura White", enabler: "" },
    },
    {
        id: "CAMP009",
        college_name: "Pine Hill College",
        campus_code: "C009",
        campus_zone: "North",
        total_karma: "13500",
        grade: "A",
        lead: { campus_lead: "Michael Green", enabler: "Nancy Brown" },
    },
    {
        id: "CAMP010",
        college_name: "Willow Creek Academy",
        campus_code: "C010",
        campus_zone: "South",
        total_karma: "9200",
        grade: "B",
        lead: { campus_lead: "Oliver Clark", enabler: "" },
    },
    {
        id: "CAMP011",
        college_name: "Cedar Valley University",
        campus_code: "C011",
        campus_zone: "East",
        total_karma: "6500",
        grade: "C",
        lead: { campus_lead: "Patricia Moore", enabler: "Quincy Evans" },
    },
    {
        id: "CAMP012",
        college_name: "Hillside College",
        campus_code: "C012",
        campus_zone: "West",
        total_karma: "8800",
        grade: "N/A",
        lead: { campus_lead: "Rachel King", enabler: "" },
    },
    {
        id: "CAMP013",
        college_name: "Blue Ridge Institute",
        campus_code: "C013",
        campus_zone: "North",
        total_karma: "14200",
        grade: "A",
        lead: { campus_lead: "Samuel Hill", enabler: "Tara Scott" },
    },
    {
        id: "CAMP014",
        college_name: "Golden Plains Tech",
        campus_code: "C014",
        campus_zone: "South",
        total_karma: "7900",
        grade: "B",
        lead: { campus_lead: "Uma Patel", enabler: "" },
    },
    {
        id: "CAMP015",
        college_name: "Silver Lake University",
        campus_code: "C015",
        campus_zone: "East",
        total_karma: "5100",
        grade: "C",
        lead: { campus_lead: "Victor Nguyen", enabler: "Wendy Foster" },
    },
    {
        id: "CAMP016",
        college_name: "Redwood Academy",
        campus_code: "C016",
        campus_zone: "West",
        total_karma: "9700",
        grade: "N/A",
        lead: { campus_lead: "Xavier Brooks", enabler: "" },
    },
    {
        id: "CAMP017",
        college_name: "Evergreen College",
        campus_code: "C017",
        campus_zone: "North",
        total_karma: "12800",
        grade: "A",
        lead: { campus_lead: "Yvonne Carter", enabler: "Zachary Reed" },
    },
    {
        id: "CAMP018",
        college_name: "Stonebridge Institute",
        campus_code: "C018",
        campus_zone: "South",
        total_karma: "8300",
        grade: "B",
        lead: { campus_lead: "Amelia Stone", enabler: "" },
    },
    {
        id: "CAMP019",
        college_name: "Crystal Heights University",
        campus_code: "C019",
        campus_zone: "East",
        total_karma: "6900",
        grade: "C",
        lead: { campus_lead: "Benjamin Fox", enabler: "Clara Hayes" },
    },
    {
        id: "CAMP020",
        college_name: "Twilight Academy",
        campus_code: "C020",
        campus_zone: "West",
        total_karma: "10500",
        grade: "N/A",
        lead: { campus_lead: "Dylan Gray", enabler: "" },
    },
];

const mockFetchCampuses = async (params: { search?: string; pageIndex: number; perPage: number }) => {
    const { search = "", pageIndex, perPage } = params;
    const start = (pageIndex - 1) * perPage;
    const end = start + perPage;

    // Simulate filtering based on search term
    let filteredData = mockCampusData;
    if (search) {
        filteredData = mockCampusData.filter(
            (campus) =>
                campus.college_name.toLowerCase().includes(search.toLowerCase()) ||
                campus.campus_code.toLowerCase().includes(search.toLowerCase()) ||
                campus.campus_zone.toLowerCase().includes(search.toLowerCase())
        );
    }

    const paginatedData = filteredData.slice(start, end);
    const totalPages = Math.ceil(filteredData.length / perPage);

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
        data: paginatedData,
        pagination: { totalPages, isNext: end < filteredData.length },
    };
};

const CampusList: React.FC<{
    search: string;
    searchType: "name" | "code" | "zone";
    onSelect: (campus: Campus) => void;
}> = ({ search, searchType, onSelect }) => {
    const [allCampuses, setAllCampuses] = useState<Campus[]>([]);
    const [filteredCampuses, setFilteredCampuses] = useState<Campus[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const fetchCampuses = useCallback(
        async (searchTerm: string, pageNum: number) => {
            setIsFetching(true);
            try {
                const response = await mockFetchCampuses({
                    search: searchTerm,
                    pageIndex: pageNum,
                    perPage: 9,
                });
                const newCampuses = response.data;

                let filtered: Campus[] = newCampuses;
                if (searchType === "code" && searchTerm) {
                    filtered = newCampuses.filter((campus) =>
                        campus.campus_code.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                } else if (searchType === "zone" && searchTerm) {
                    filtered = newCampuses.filter((campus) =>
                        campus.campus_zone.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                setAllCampuses((prev) => (pageNum === 1 ? newCampuses : [...prev, ...newCampuses]));
                setFilteredCampuses((prev) => (pageNum === 1 ? filtered : [...prev, ...filtered]));
                setTotalPages(response.pagination.totalPages);
                setIsFetching(false);
            } catch (error) {
                console.error("Failed to fetch campuses:", error);
                setIsFetching(false);
            }
        },
        [searchType]
    );

    const debouncedFetchCampuses = useCallback(
        debounce((searchTerm: string, pageNum: number) => {
            fetchCampuses(searchTerm, pageNum);
        }, 300),
        [fetchCampuses]
    );

    useEffect(() => {
        setAllCampuses([]);
        setFilteredCampuses([]);
        setPage(1);
        debouncedFetchCampuses(search, 1);
        return () => debouncedFetchCampuses.cancel();
    }, [search, searchType, debouncedFetchCampuses]);

    useEffect(() => {
        if (observerRef.current) observerRef.current.disconnect();

        observerRef.current = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting && !isFetching && page < totalPages) {
                    setPage((prevPage) => prevPage + 1);
                }
            },
            { threshold: 0.1 }
        );

        if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

        return () => {
            if (observerRef.current) observerRef.current.disconnect();
        };
    }, [isFetching, page, totalPages]);

    useEffect(() => {
        if (page > 1) {
            fetchCampuses(search, page);
        }
    }, [page, search, fetchCampuses]);

    const displayCampuses = searchType === "name" || !search ? allCampuses : filteredCampuses;

    return (
        <div>
            <div className={styles.userGrid}>
                {displayCampuses.length > 0 ? (
                    displayCampuses.map((campus, index) => (
                        <CampusCard
                            key={`${campus.campus_code}-${index}`}
                            data={{
                                name: campus.college_name,
                                code: campus.campus_code,
                                grade: campus.grade, 
                                lead: campus.lead.campus_lead,
                                enabler: campus.lead.enabler,
                                karmaPoints: campus.total_karma,
                            }}
                            onSelect={() => onSelect(campus)}
                        />
                    ))
                ) : (
                    !isFetching && (
                        <p className={styles.noResultsText}>
                            No campuses found. Try a different search?
                        </p>
                    )
                )}
            </div>
            <div className={styles.loadingContainer}>
                {isFetching && <MuLoader />}
                <div ref={loadMoreRef} style={{ height: "20px" }} />
            </div>
        </div>
    );
};

const CampusSearchPage: React.FC = () => {
    const navigate = useNavigate()
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchType, setSearchType] = useState<"name" | "code" | "zone">("name");
    const [error, setError] = useState<string | null>(null);
    const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);


    const handleCampusSelect = (campus: Campus) => {
        setSelectedCampus(campus);
        navigate(`/dashboard/campus/${campus.id}`);

        console.log("Selected campus:", campus); 
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.Banner}>
                <div className={styles.BannerContent}>
                    <h1 className={styles.BannerTitle}>Find Campuses</h1>
                    <p className={styles.BannerSubtitle}>
                        Explore a network of campuses by name, code, or zone.
                    </p>
                </div>
            </div>

            <div className={styles.searchContainer}>
                <FiSearch className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder={`Search by ${searchType === "name" ? "name" : searchType === "code" ? "code" : "zone"}`}
                    className={styles.searchInput}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className={styles.searchTypeButtons}>
                <button
                    className={`${styles.searchTypeButton} ${searchType === "name" ? styles.active : ""}`}
                    onClick={() => setSearchType("name")}
                >
                    Name
                </button>
                <button
                    className={`${styles.searchTypeButton} ${searchType === "code" ? styles.active : ""}`}
                    onClick={() => setSearchType("code")}
                >
                    Code
                </button>
                <button
                    className={`${styles.searchTypeButton} ${searchType === "zone" ? styles.active : ""}`}
                    onClick={() => setSearchType("zone")}
                >
                    Zone
                </button>
            </div>

            {error && <p className={styles.errorText}>{error}</p>}

            <Suspense fallback={<MuLoader />}>
                <CampusList search={searchTerm} searchType={searchType} onSelect={handleCampusSelect} />
            </Suspense>
        </div>
    );
};

export default CampusSearchPage;