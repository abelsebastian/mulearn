import React, { useEffect, useState } from "react";
import {
    Card,
    CardBody,
    CardFooter,
    Stack,
    Text,
    Heading,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    VStack,
    Box,
    Switch,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    Img,
} from "@chakra-ui/react";
import { useUserStore } from "/src/ZustandProvider";
import { FiBookOpen, FiCalendar, FiType } from "react-icons/fi";
import { AchievementData } from "../../../ManageAchievements/ManageAchievementsInterface";
import { issueVerifiableCredential, updateVCURL } from "../../services/api";
import level7 from "../../../Profile/components/MuVoyage/assets/images/Level7.webp";
import level6 from "../../../Profile/components/MuVoyage/assets/images/Level6.webp";
import level5 from "../../../Profile/components/MuVoyage/assets/images/Level5.webp";
import level4 from "../../../Profile/components/MuVoyage/assets/images/Level4.webp";
import level3 from "../../../Profile/components/MuVoyage/assets/images/Level3.webp";
import level2 from "../../../Profile/components/MuVoyage/assets/images/Level2.webp";
import level1 from "../../../Profile/components/MuVoyage/assets/images/Level1.webp";
import toast from "react-hot-toast";

const Colors: Record<string, string> = {
    lavender: "#CDC1FF",
    pink: "#FFCCEA",
    green: "#BFF6C3",
    blue: "#7BD3EA",
};

// Define the API response type
type IssuedCredentialResponse = {
    message: string; // S3 URL
    subject_info: {
        completed_date: string;
        course_name: string;
        credential_id: string;
        credential_type: "Badge" | "Certificate" | "Recognition";
        description: string;
        did: string;
        email: string;
        full_name: string;
        s3_url: string;
        template_id: string;
        type: "Badge" | "Certificate" | "Recognition";
    };
}[];

type SubjectInfo = {
    type: "Badge" | "Certificate" | "Recognition";
    did: string;
    muid: string;
    full_name: string;
}

type CredentialInfo = {
    course_name: string;
    tags: string[];
}

interface AchievementCardOneProps {
    achievement: AchievementData;
    userDID?: string;
}

const getRandomColor = (): string => {
    const colorValues = Object.values(Colors);
    return colorValues[Math.floor(Math.random() * colorValues.length)];
};

const AchievementCardOne: React.FC<AchievementCardOneProps> = ({
    achievement,
    userDID
}) => {
    const bgColor = getRandomColor();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userInfo = useUserStore((state) => state.userInfo);
    const [shareEmail, setShareEmail] = useState(false);
    const [cardIcon, setCardIcon] = useState("");
    const [issuedCredential, setIssuedCredential] = useState<IssuedCredentialResponse | null>(null);

    const handleButtonClick = () => {
        onOpen();
    };

    const levelIcons: Record<string, string> = {
        "Level 1": level1,
        "Level 2": level2,
        "Level 3": level3,
        "Level 4": level4,
        "Level 5": level5,
        "Level 6": level6,
        "Level 7": level7,
    };

    useEffect(() => {
        if (!achievement?.achievement?.achievement_name) return;
        setCardIcon(levelIcons[achievement.achievement.achievement_name] || levelIcons["Level 1"]); // Fallback to "Level 1" if no match
    }, [achievement]);

    const handleIssueVC = async () => {
        if (!userDID) return;

        try {
            const subject_info: SubjectInfo = {
                type: "Badge",
                muid: userInfo.muid || "",
                did: userDID,
                full_name: userInfo?.full_name || "",
            };

            const template_id = achievement.achievement.template_id; // Adjust this based on actual property name
            const credential_info: CredentialInfo = {
                course_name: achievement.achievement?.achievement_name || "",
                tags: achievement.achievement?.tags || [],
            };

            const response = await issueVerifiableCredential(subject_info, credential_info, template_id);
            const vc_url = response[0].subject_info.s3_url;
            if (!vc_url) {
                toast.error("Failed to issue VC. Please try again.");
                return;
            }
            await updateVCURL(achievement.achievement?.id || "", vc_url);
            setIssuedCredential(response);
        } catch (error) {
            console.error("Error issuing VC:", error);
        }
    };

    return (
        <>
            <Card maxW="xs" height="md" borderRadius={10} boxShadow="none" border="1px solid #E2E8F0">
                <CardBody className="flex flex-col items-center">
                    <div
                        style={{ backgroundColor: bgColor }}
                        className="rounded-full p-3 w-48 h-48 flex items-center justify-center"
                    >
                        <Img src={cardIcon} alt="Achievement icon" className="w-3/4 h-3/4 object-cover rounded-full"/>
                    </div>
                    <Stack mt="6" spacing="3">
                        <div className="flex flex-col w-full items-center">
                            <Heading className="text-center !mb-4">
                                {achievement.achievement.achievement_name}
                            </Heading>
                            <Text color="blue.600" fontSize="sm" align="center">
                                {achievement.achievement.description}
                            </Text>
                        </div>
                    </Stack>
                </CardBody>
                <CardFooter className="flex justify-center">
                    <Button
                        bg="#007bff"
                        color="white"
                        _hover={{ bg: "#0056b3" }}
                        size="sm"
                        onClick={handleButtonClick}
                    >
                        {achievement.is_issued ? "View" : "Issue VC"}
                    </Button>
                </CardFooter>
            </Card>
            {/* Modal Logic */}
            <Modal isOpen={isOpen} onClose={() => { onClose(); setIssuedCredential(null); }} isCentered size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {userDID === ""
                            ? "Link Your DID"
                            : issuedCredential
                                ? "Credential Issued"
                                : achievement.is_issued
                                    ? "Achievement Details"
                                    :  "Credential Issued"}

                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {userDID === "" ? (
                            <VStack spacing={4} align="stretch">
                                <Text>
                                    It seems you haven't linked your DID yet. Please link it to proceed.
                                </Text>
                                <Text fontSize="sm" color="gray.600">
                                    Note: Your name ({userInfo?.full_name || "Unknown"}) and muid ({userInfo?.muid || "Not provided"}) will be shared when you issue this credential.
                                </Text>
                                <div className="bg-gray-100 !p-4 rounded-md">
                                    <FormControl className="flex justify-between items-center">
                                        <FormLabel htmlFor="email-switch" mb="0">
                                            Share Email
                                        </FormLabel>
                                        <Switch
                                            id="email-switch"
                                            isChecked={shareEmail}
                                            onChange={(e) => setShareEmail(e.target.checked)}
                                        />
                                    </FormControl>
                                </div>
                                <Box>
                                    <Text mb={2}>How to Link Your DID:</Text>
                                    <iframe
                                        width="100%"
                                        height="200"
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                        title="How to Link Your DID"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                </Box>
                            </VStack>
                        ) : issuedCredential ? (
                            <VStack spacing={4} align="stretch">
                                <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
                                    <AlertIcon boxSize="20px" mr={0} />
                                    <AlertTitle mt={4} mb={1} fontSize="lg">
                                        Credential Issued Successfully!
                                    </AlertTitle>
                                    <AlertDescription maxWidth="sm">
                                        Your Verifiable Credential has been issued.<br /> Scan the QR to add it to your wallet.
                                    </AlertDescription>
                                </Alert>
                                <Img src={issuedCredential[0].message} alt="Credential Badge" />
                                <Stack direction="row" spacing={4} wrap="wrap" className="items-start justify-start gap-4">
                                    <Text className="bg-green-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                                        <FiBookOpen /> {issuedCredential[0].subject_info.course_name}
                                    </Text>
                                    <Text className="bg-orange-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                                        <FiType /> {issuedCredential[0].subject_info.type}
                                    </Text>
                                    <Text className="bg-red-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                                        <FiCalendar /> {issuedCredential[0].subject_info.completed_date}
                                    </Text>
                                </Stack>
                            </VStack>
                        ) : achievement.is_issued? (
                            <VStack spacing={4} align="stretch">
                                <Alert status="success" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center">
                                    <AlertTitle mt={4} mb={1} fontSize="lg">
                                        Here&apos;s your credentials!
                                    </AlertTitle>
                                    <AlertDescription maxWidth="sm">
                                        Scan the QR to add it to your wallet.
                                    </AlertDescription>
                                </Alert>
                                <Img src={achievement.vc_url} alt="Credential Badge" />
                                <Stack direction="row" spacing={4} wrap="wrap" className="items-start justify-start gap-4">
                                    <Text className="bg-green-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                                    <FiBookOpen /> <span>{achievement.achievement?.achievement_name}</span>
                                    
                                    </Text>
                                    <Text className="bg-red-300 text-white !px-2 !py-1 rounded-full text-xs flex justify-center items-center gap-2">
                                        <FiType /> {achievement.achievement?.tags[0]}
                                    </Text>
                                 
                                </Stack>
                            </VStack>
                        ) : (
                            <Text>
                                {achievement.achievement.description}
                                <br />
                                Ready to issue your Verifiable Credential?
                            </Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {userDID === "" ? (
                            <>
                                <Button
                                    bg="#007bff"
                                    color="white"
                                    mr={3}
                                    as="a"
                                    href="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                    target="_blank"
                                >
                                    Link DID
                                </Button>
                                <Button variant="ghost" onClick={onClose}>
                                    Cancel
                                </Button>
                            </>
                        ) : issuedCredential ? (
                            <Button
                                bg="#007bff"
                                color="white"
                                onClick={() => { onClose(); setIssuedCredential(null); }}
                            >
                                Close
                            </Button>
                        ) : achievement.is_issued? (
                            ""
                        ) : (
                            <Button
                                bg="#007bff"
                                color="white"
                                onClick={handleIssueVC}
                            >
                                Issue VC
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AchievementCardOne;