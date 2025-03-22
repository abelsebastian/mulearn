import React, { useState, useEffect, useCallback, Suspense, useRef } from "react";
import styles from "./MuLearnersSearchPage.module.css";
import { FiSearch } from "react-icons/fi";
import profileImage from "../assets/ProfileImages/10496279.jpg";
import userImage2 from "../assets/ProfileImages/11475206.jpg";
import debounce from "lodash/debounce";
import { getUsers } from "../services/api";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import UserCard from "../../../components/UserCard";
import { useNavigate } from "react-router-dom";
import { HStack, useBreakpointValue, VStack } from "@chakra-ui/react";
import defaultProfile from "../../../assets/images/defaultProfile.png"

interface User {
  full_name: string;
  muid: string;
  interest_groups: { id: string; name: string }[];
  organizations: { id: string; title: string; code: string; org_type: string }[];
  profile_pic: string | null;
  karma: string;
}

interface Pagination {
  totalPages: number;
  isNext: boolean;
}

interface UserResource {
  read: () => { data: User[]; pagination: Pagination };
}

const createResource = (promise: Promise<any>): UserResource => {
  let status: "pending" | "success" | "error" = "pending";
  let result: any;

  const suspender = promise.then(
    (data) => {
      status = "success";
      result = data;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read: () => {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
};

const UserList: React.FC<{
  search: string;
  searchType: "name" | "college" | "interest";
  onSelect: (user: User) => void;
}> = ({ search, searchType, onSelect }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();

  const fetchUsers = useCallback(
    async (searchTerm: string, pageNum: number) => {
      setIsFetching(true);
      try {
        const response = await getUsers({
          search: searchType === "name" ? searchTerm : "",
          pageIndex: pageNum,
          perPage: 9,
        });
        const newUsers = response.data;


        let filtered: User[] = newUsers;
        if (searchType === "college" && searchTerm) {
          filtered = newUsers.filter((user) =>
            user.organizations.some(
              (org) =>
                org.org_type === "College" &&
                org.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        } else if (searchType === "interest" && searchTerm) {
          filtered = newUsers.filter((user) =>
            user.interest_groups.some((ig) =>
              ig.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }

        setAllUsers((prevUsers) =>
          pageNum === 1 ? newUsers : [...prevUsers, ...newUsers]
        );
        setFilteredUsers((prevFiltered) =>
          pageNum === 1 ? filtered : [...prevFiltered, ...filtered]
        );
        setTotalPages(response.pagination.totalPages);
        setIsFetching(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setIsFetching(false);
      }
    },
    [searchType]
  );


  const debouncedFetchUsers = useCallback(
    debounce((searchTerm: string, pageNum: number) => {
      fetchUsers(searchTerm, pageNum);
    }, 300),
    [fetchUsers]
  );

  // Reset and fetch initial page when search or searchType changes
  useEffect(() => {
    setAllUsers([]);
    setFilteredUsers([]);
    setPage(1);
    debouncedFetchUsers(search, 1);
    return () => debouncedFetchUsers.cancel();
  }, [search, searchType, debouncedFetchUsers]);

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
      fetchUsers(search, page);
    }
  }, [page, search, fetchUsers]);

  const displayUsers =
    searchType === "name" || !search ? allUsers : filteredUsers;


  return (
    <div>
      <div className={styles.userGrid}>
        {displayUsers.length > 0 ? (
          displayUsers.map((user, index) => (
            <UserCard
              key={`${user.muid}-${index}`}
              data={{
                name: user.full_name.trim() || "Unknown User",
                muid: user.muid,
                interest_groups: user.interest_groups,
                organizations: user.organizations,
                profile_pic: user.profile_pic?user.profile_pic:  defaultProfile,
                karma: user.karma,
              }}
              onSelect={() => onSelect(user)}
            />
          ))
        ) : (
          !isFetching && (
            <p className={styles.noResultsText}>
              The universe says... no results. Try again?
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

interface User {
  full_name: string;
  muid: string;
  interest_groups: { id: string; name: string }[];
  organizations: { id: string; title: string; code: string; org_type: string }[];
  profile_pic: string | null;
  karma: string;
}

const MuLearnersSearchPage: React.FC = () => {
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack }) || VStack;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<"name" | "college" | "interest">("name");
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    window.open(`/profile/${user.muid}`, "_blank");
  };



  return (
    <div className={styles.pageContainer}>
      <div className={styles.Banner}>
        <div className={styles.BannerContent}>
          <h1 className={styles.BannerTitle}>Find & Connect</h1>
          <p className={styles.BannerSubtitle}>
            Find and connect with like-minded students based on skills, interests, or institution. Collaborate, learn, and grow together in a vibrant community of peers.
          </p>
          <span className={styles.BannerDisclaimer}>*Only <b>public</b> profiles will be displayed here</span>
        </div>
      </div>
      <StackComponent align="center" justify="start" width="100%">
      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder={`Search public profiles by ${
            searchType === "name"
              ? "name"
              : searchType === "college"
              ? "college"
              : "interest group"
          }`}
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className={styles.searchTypeButtons}>
        <button
          className={`${styles.searchTypeButton} ${
            searchType === "name" ? styles.active : ""
          }`}
          onClick={() => setSearchType("name")}
        >
          Name
        </button>
        <button
          className={`${styles.searchTypeButton} ${
            searchType === "college" ? styles.active : ""
          }`}
          onClick={() => setSearchType("college")}
        >
          College
        </button>
        <button
          className={`${styles.searchTypeButton} ${
            searchType === "interest" ? styles.active : ""
          }`}
          onClick={() => setSearchType("interest")}
        >
          Interest Group
        </button>
      </div>
    </StackComponent>

      {error && <p className={styles.errorText}>{error}</p>}

      <Suspense fallback={<MuLoader />}>
        <UserList search={searchTerm} searchType={searchType} onSelect={handleUserSelect} />
      </Suspense>


    </div>
  );
};


export default MuLearnersSearchPage;