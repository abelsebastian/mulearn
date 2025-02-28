import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { submitUserData } from "../../../services/newOnboardingApis";
import toast from "react-hot-toast";
import AccountCreationComponent from "../../../components/AccountCreation/AccountCreationComponent";
import { fetchLocalStorage } from "@/MuLearnServices/common_functions";
import { dashboardRoutes } from "@/MuLearnServices/urls";
import { privateGateway } from "@/MuLearnServices/apiGateways";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const param = searchParams.get("param");
    const referralId = searchParams.get("referral_id");
    const ruri = searchParams.get("ruri");
    const [isLoading, setIsLoading] = useState(false);

    const handleAccountCreation = (userData: RegisterRequestDataType) => {
        submitUserData({
            setIsLoading: setIsLoading,
            userData: userData
        }).then(res => {
            if (res) {
                checkUserDomainsAndEndgoals();
            }
        });
    };

    const checkUserDomainsAndEndgoals = () => {
        privateGateway.get(dashboardRoutes.getInfo)
            .then(response => {
                const userInfo = response.data.response;
                if (userInfo.user_domains?.length === 0 || userInfo.user_endgoals?.length === 0) {
                    navigate("/register/pathfinder?ruri=/dashboard/home");
                } else {
                    navigate(ruri ? ruri : "/dashboard/home");
                }
            })
            .catch(err => {
                toast.error("Failed to fetch user info");
            });
    };

    return (
        <AccountCreationComponent
            ruri={ruri ?? undefined}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            dwmsParam={param ?? undefined}
            refferalId={referralId ?? undefined}
            onContinue={handleAccountCreation}
        />
    );
}