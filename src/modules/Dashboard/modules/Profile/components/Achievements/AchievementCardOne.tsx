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
    VStack,
    Alert,
    AlertTitle,
    AlertDescription,
    Img,
} from "@chakra-ui/react";
import { FiBookOpen, FiType } from "react-icons/fi";
import { AchievementData } from "../../../ManageAchievements/ManageAchievementsInterface";
import level7 from "../../../Profile/components/MuVoyage/assets/images/Level7.webp";
import level6 from "../../../Profile/components/MuVoyage/assets/images/Level6.webp";
import level5 from "../../../Profile/components/MuVoyage/assets/images/Level5.webp";
import level4 from "../../../Profile/components/MuVoyage/assets/images/Level4.webp";
import level3 from "../../../Profile/components/MuVoyage/assets/images/Level3.webp";
import level2 from "../../../Profile/components/MuVoyage/assets/images/Level2.webp";
import level1 from "../../../Profile/components/MuVoyage/assets/images/Level1.webp";

const Colors: Record<string, string> = {
    lavender: "#CDC1FF",
    pink: "#FFCCEA",
    green: "#BFF6C3",
    blue: "#7BD3EA",
};

interface AchievementCardOneProps {
    achievement: AchievementData;
    userDID?: string;
    muid?: string;
    usersName?: string;
    fromUserSearch?: boolean;
}

const getRandomColor = (): string => {
    const colorValues = Object.values(Colors);
    return colorValues[Math.floor(Math.random() * colorValues.length)];
};

const AchievementCardOne: React.FC<AchievementCardOneProps> = ({
    achievement,
    userDID,
    muid,
    usersName,
    fromUserSearch,
}) => {
    const bgColor = getRandomColor();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cardIcon, setCardIcon] = useState("");

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
        setCardIcon(levelIcons[achievement.achievement.achievement_name] || levelIcons["Level 1"]);
    }, [achievement]);

    const handleButtonClick = () => {
        if (fromUserSearch && !achievement.is_issued) return; // Prevent opening modal if not issued when searching
        onOpen();
    };

    return (
        <>
            <Card maxW="xs" height="md" borderRadius={10} boxShadow="none" border="1px solid #E2E8F0">
                <CardBody className="flex flex-col items-center">
                    <div
                        style={{ backgroundColor: bgColor }}
                        className="rounded-full p-3 w-48 h-48 flex items-center justify-center"
                    >
                        <Img src={cardIcon} alt="Achievement icon" className="w-3/4 h-3/4 object-cover rounded-full" />
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
                    {!fromUserSearch && (
                        <Button
                            bg="#007bff"
                            color="white"
                            _hover={{ bg: "#0056b3" }}
                            size="sm"
                            onClick={handleButtonClick}
                        >
                            {achievement.is_issued ? "View" : "Issue VC"}
                        </Button>
                    )}
                    {fromUserSearch && achievement.is_issued && (
                        <Button
                            bg="#007bff"
                            color="white"
                            _hover={{ bg: "#0056b3" }}
                            size="sm"
                            onClick={handleButtonClick}
                        >
                            View
                        </Button>
                    )}
                    {fromUserSearch && !achievement.is_issued && (
                        <Text fontSize="sm" color="gray.600">
                            The user hasn't claimed this achievement yet.
                        </Text>
                    )}
                </CardFooter>
            </Card>

            {/* Modal Logic - Only show for issued achievements when fromUserSearch is true */}
            <Modal isOpen={isOpen} onClose={onClose} isCentered size="lg">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {fromUserSearch ? "Achievement Details" : achievement.is_issued ? "Achievement Details" : "Issue Credential"}
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {fromUserSearch && achievement.is_issued ? (
                            <VStack spacing={4} align="stretch">
                                <Alert
                                    status="success"
                                    variant="subtle"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                >
                                    <AlertTitle mt={4} mb={1} fontSize="lg">
                                        Here's the user's credential!
                                    </AlertTitle>
                                    <AlertDescription maxWidth="sm">
                                        This is the issued Verifiable Credential.
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
                        ) : !fromUserSearch && achievement.is_issued ? (
                            <VStack spacing={4} align="stretch">
                                <Alert
                                    status="success"
                                    variant="subtle"
                                    flexDirection="column"
                                    alignItems="center"
                                    justifyContent="center"
                                    textAlign="center"
                                >
                                    <AlertTitle mt={4} mb={1} fontSize="lg">
                                        Here's your credential!
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
                        ) : !fromUserSearch && (
                            <Text>
                                {achievement.achievement.description}
                                <br />
                                Ready to issue your Verifiable Credential?
                            </Text>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        {!fromUserSearch && !achievement.is_issued && (
                            <Button bg="#007bff" color="white" /* onClick={handleIssueVC} */>
                                Issue VC
                            </Button>
                        )}
                        {(fromUserSearch || achievement.is_issued) && (
                            <Button bg="#007bff" color="white" onClick={onClose}>
                                Close
                            </Button>
                        )}
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default AchievementCardOne;