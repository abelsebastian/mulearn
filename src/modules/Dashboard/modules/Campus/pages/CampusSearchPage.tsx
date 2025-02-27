import React, { useState, useEffect, useCallback, Suspense, useRef } from "react";
import styles from "./CampusSearchPage.module.css";
import { FiSearch } from "react-icons/fi";
import debounce from "lodash/debounce";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import CampusCard from "../components/CampusCard";
import { useNavigate } from "react-router-dom";
import { getCampuses } from "../services/api";

interface Campus {
    id: string;
    title: string;
    code: string;
    affiliation?: string;
    district: string;
    zone: string;
    state: string;
    country: string;
    user_count: number;
}

interface Pagination {
    totalPages: number;
    isNext: boolean;
}

const CampusList: React.FC<{
    search: string;
    searchType: "name" | "code" | "zone" | "school" | "college" | "all";
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
                const apiType = ["school", "college", "all"].includes(searchType) ? searchType : "all";
                const response = await getCampuses({
                    search: searchTerm,
                    pageIndex: pageNum,
                    perPage: 9,
                    type: apiType,
                });

                // Use the API data directly since it matches the Campus interface
                const newCampuses: Campus[] = response.data;

                // Apply client-side filtering for name, code, or zone
                let filtered: Campus[] = newCampuses;
                if (searchType === "name" && searchTerm) {
                    filtered = newCampuses.filter((campus) =>
                        campus.title.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                } else if (searchType === "code" && searchTerm) {
                    filtered = newCampuses.filter((campus) =>
                        campus.code.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                } else if (searchType === "zone" && searchTerm) {
                    filtered = newCampuses.filter((campus) =>
                        campus.zone.toLowerCase().includes(searchTerm.toLowerCase())
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
    const displayCampuses =
        ["name", "school", "college", "all"].includes(searchType) || !search
            ? allCampuses
            : filteredCampuses;
    return (
        <div>
            <div className={styles.userGrid}>
                {displayCampuses.length > 0 ? (
                    displayCampuses.map((campus, index) => (
                        <CampusCard
                            key={`${campus.code}-${index}`} // Use code instead of campus_code
                            data={{
                                name: campus.title,
                                code: campus.code,
                                grade: undefined, // Not available in API
                                lead: undefined,  // Not available in API
                                enabler: undefined, // Not available in API
                                userCount: campus.user_count.toString(),
                                district: campus.district,
                                zone: campus.zone,
                                state: campus.state,
                                country: campus.country,
                            }}
                            onSelect={() => onSelect(campus)}
                        />
                    ))
                ) : (
                    !isFetching && (
                        <p className={styles.noResultsText}>No campuses found. Try a different search?</p>
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
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchType, setSearchType] = useState<"name" | "code" | "zone" | "school" | "college" | "all">("name");
    const [error, setError] = useState<string | null>(null);
    const handleCampusSelect = (campus: Campus) => {
        navigate(`/dashboard/campus/${campus.id}`);
        console.log("Selected campus:", campus);
    };
    return (
        <div className={styles.pageContainer}>
            <div className={styles.Banner}>
                <div className={styles.BannerContent}>
                    <h1 className={styles.BannerTitle}>Find Campuses</h1>
                    <p className={styles.BannerSubtitle}>
                        Explore a network of campuses by name, code, zone, or type.
                    </p>
                </div>
            </div>
            <div className={styles.searchContainer}>
                <FiSearch className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
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
                <button
                    className={`${styles.searchTypeButton} ${searchType === "school" ? styles.active : ""}`}
                    onClick={() => setSearchType("school")}
                >
                    School
                </button>
                <button
                    className={`${styles.searchTypeButton} ${searchType === "college" ? styles.active : ""}`}
                    onClick={() => setSearchType("college")}
                >
                    College
                </button>
                <button
                    className={`${styles.searchTypeButton} ${searchType === "all" ? styles.active : ""}`}
                    onClick={() => setSearchType("all")}
                >
                    All
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