import React, { useState, useEffect, useCallback, Suspense, useRef } from "react";
import styles from "./CampusSearchPage.module.css"; // Reuse existing styles
import { FiSearch } from "react-icons/fi";
import debounce from "lodash/debounce";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import CampusCard from "../components/CampusCard"// Adjust path as needed

// Define Campus type based on your API structure
interface Campus {
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
const mockCampusData: Campus[] = Array.from({ length: 40 }, (_, i) => ({
    college_name: `Campus ${i + 1}`,
    campus_code: `C${String(i + 1).padStart(3, "0")}`,
    campus_zone: ["North", "South", "East", "West"][i % 4],
    total_karma: String((i + 1) * 1000),
    grade: ["A", "B", "C", "N/A"][i % 4] as 'A' | 'B' | 'C' | 'N/A',
    lead: {
        campus_lead: `Lead ${i + 1}`,
        enabler: i % 2 === 0 ? `Enabler ${i + 1}` : "", 
    },
}));

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
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchType, setSearchType] = useState<"name" | "code" | "zone">("name");
    const [error, setError] = useState<string | null>(null);

    const handleCampusSelect = (campus: Campus) => {
        console.log("Selected campus:", campus); // Placeholder for future functionality
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