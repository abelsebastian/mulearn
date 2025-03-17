"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, Dialog, DialogOverlay } from "@/components/ui/dialog"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetTrigger } from "@/components/ui/sheet"
import { Users, Wifi, WifiOff, QrCode, X, Copy, Edit, Trash2, CheckCircle, User, LocateFixedIcon, Clock } from "lucide-react"
import styles from "./learning-circle-card.module.css";
import { CircleMeetingAttendee, CircleMeetupInfo } from "../../../services/LearningCircleInterface"
import { useUserStore } from "/src/ZustandProvider";
import toast from "react-hot-toast";
import { fetchURLQRCode } from "@/modules/Dashboard/modules/LearningCircle/services/LearningCircleAPIs"
import { joinMeetup } from "../../../services/LearningCircleAPIs"

interface Member {
  id: string
  name: string
}

interface LearningCircleCardProps {
  id: string
  title: string
  description?: string
  created_by_id?: string
  ig_name: string
  imageUrl?: string
  joiningCode?: string
  mode: string
  meet_place: string
  meet_link: string
  meet_time: string
  attendees: CircleMeetingAttendee[] | null
  // isCreator?: boolean
  hasJoined?: boolean
  hasCompleted?: boolean
  members?: Member[]
  open: boolean
  setOpen: (value: boolean) => void
  onClose: () => void
  handleDelete: (meetUpId: string) => void
  handleEdit: (meetupId: string) => void
}

export function LearningCircleCard({
  id,
  title,
  description,
  ig_name,
  mode,
  attendees = [],
  meet_place,
  meet_link,
  meet_time,
  imageUrl,
  joiningCode = 'U145K4', //adding temporerily for testing
  hasJoined = false,
  hasCompleted = false,
  open,
  setOpen,
  handleDelete,
  handleEdit,
  members = [],
  onClose,
  ...data
}: LearningCircleCardProps) {
  const [showJoinInput, setShowJoinInput] = useState(false)
  const [joiningCodeInput, setJoiningCodeInput] = useState("")
  const [isJoined, setIsJoined] = useState(hasJoined)
  const [isCompleted, setIsCompleted] = useState(hasCompleted)
  const [blob, setBlob] = useState('')
  const [showQrCode, setShowQrCode] = useState(false)
  const [showCongratulations, setShowCongratulations] = useState(false)
  const [learningSummary, setLearningSummary] = useState("")
  const [showMembersList, setShowMembersList] = useState(false)

  useEffect(() => {
    fetchURLQRCode(
      setBlob,
      (window.location.href ?? "unknown") +
      "/?code=" +
      joiningCode
    );
  }, [joiningCode]);

  let currentLoggedInUser = useUserStore((state) => state.userProfile.id);

  const isCreator = data.created_by_id === currentLoggedInUser;

  const handleClose = () => {
    setOpen(false)
    setJoiningCodeInput('')
    setShowJoinInput(false)
    onClose()
  }

  const handleBadgeClick = () => {
    if (mode === 'online') {
      navigator.clipboard.writeText(meet_link);
      toast.success('Meet link is copied');
    }
  };

  const handleJoin = async () => {
    console.log()
    if (joiningCodeInput === joiningCode) {
      try {
        const success = await joinMeetup(id);
        if (success) {
          setIsJoined(true);
          setShowJoinInput(false);
        }
      } catch (e) {
        console.error('Failed to join meetup:', e, id);
      }
    }
    else {
      toast.error('Invalid joining code. Please contact the meeting owner for assistance')
    }
  };


  const handleSubmitReport = () => {
    if (learningSummary.trim()) {
      setIsCompleted(true)
      setShowCongratulations(true)
    }
  }

  const copyJoiningCode = () => {
    navigator.clipboard.writeText(joiningCode || '')
    toast.success('Copied joining code')
    // Could add a toast notification here
  }

  return (
    <>
      <Dialog open={open} onOpenChange={(value) => { setOpen(value); if (!value) onClose(); }}>
        <DialogOverlay />
        <DialogContent className={styles.dialogContent}>
          <Card className={styles.card}>
            {/* <div className={styles.cardImageContainer}>
            <img src={imageUrl || "/placeholder.svg"} alt={title} className={styles.cardImage} />
          </div> */}

            <CardContent className={styles.cardContent}>
              <h2 className={styles.cardTitle}>{title}</h2>
              <p className={styles.cardDescription}>{description}</p>

              <div className={styles.badgeContainer}>
                <Badge variant="secondary" className={styles.categoryBadge}>{ig_name}</Badge>
                <Badge variant="outline" className={styles.onlineBadge}>
                  {mode === 'online' ? <><Wifi className={styles.onlineIcon} /><span>Online</span></>
                    : <><WifiOff className={styles.offlineIcon} /><span>Offline</span></>}
                </Badge>

                <Sheet open={showMembersList} onOpenChange={setShowMembersList}>
                  <SheetTrigger asChild>
                    <Badge variant="outline" className={styles.membersBadge}>
                      <Users className={styles.icon} />
                      <span>{attendees?.length} {attendees?.length === 1 ? 'member' : 'members'}</span>
                    </Badge>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Members</SheetTitle>
                      <SheetDescription>People who have joined this learning circle.</SheetDescription>
                    </SheetHeader>
                    <div className={styles.membersList}>
                      {members.map((member) => (
                        <div key={member.id} className={styles.memberItem}>
                          <div className={styles.memberAvatar}>
                            <User className={styles.icon} />
                          </div>
                          <span>{member.name}</span>
                        </div>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>

              <div className={styles.badgeContainer}>
                <Badge
                  variant="outline"
                  className={styles.onlineBadge}
                  onClick={handleBadgeClick}
                >
                  <LocateFixedIcon className={styles.icon} />
                  {mode === 'online' ? (
                    <span>Meet Link</span>
                  ) : (
                    <span>{meet_place}</span>
                  )}
                </Badge>
                <Badge variant="outline" className={styles.onlineBadge}>
                  <Clock className={styles.clockIcon} />{<span>{new Date(meet_time).toLocaleString()}</span>
                  }
                </Badge>
              </div>


              {isCreator && (
                <>
                  <div className={styles.joiningCodeContainer}>
                    <div className={styles.joiningCodeDetails}>
                      <p className={styles.joiningCodeLabel}>Joining Code</p>
                      <p className={styles.joiningCode}>{joiningCode}</p>


                    </div>

                    <div className={styles.joiningCodeActions}>
                      <Button size="icon" variant="outline" onClick={copyJoiningCode}>
                        <Copy className={styles.icon} />
                      </Button>
                      <Button size="icon" variant="outline" onClick={() => setShowQrCode(!showQrCode)}>
                        <QrCode className={styles.icon} />
                      </Button>
                    </div>

                  </div>
                  {showQrCode && (
                    <div className={styles.qrCodeContainer}>
                      <img
                        src={blob}
                        alt="QR Code"
                        className={styles.qrCode}
                      />
                    </div>
                  )}
                </>
              )}


              {isJoined && !isCompleted && (
                <div className={styles.learningSummaryContainer}><label className={styles.learningSummaryLabel}>Learning Summary</label><Textarea placeholder="Share what you've learned in this circle..." className={styles.textarea} value={learningSummary} onChange={(e) => setLearningSummary(e.target.value)} /></div>
              )}

              {showJoinInput && !isJoined && (
                <div className={styles.joinInputContainer}><Input placeholder="Enter joining code" className={styles.input} value={joiningCodeInput} onChange={(e) => setJoiningCodeInput(e.target.value)} /><Button size="icon" variant="outline"><QrCode className={styles.icon} /></Button></div>
              )}
            </CardContent>

            <CardFooter className={styles.cardFooter}>
              {isCreator && (
                <div className={styles.actionButtons}>
                  <Button size="icon" variant="outline" className={styles.editButton} onClick={() => handleEdit(id)}>
                    <Edit className={styles.icon} />
                  </Button>
                  <Button size="icon" variant="outline" className={styles.deleteButton} onClick={() => handleDelete(id)}><Trash2 className={styles.icon} /></Button>
                </div>
              )}
              <Button variant="outline" className={styles.closeButton} onClick={handleClose}><X className={styles.icon} />Close</Button>
              {!isJoined && !isCreator ? (<Button className={styles.joinButton} onClick={() => (showJoinInput ? handleJoin() : setShowJoinInput(true))}>{showJoinInput ? "Join Circle" : "Enter Code"}</Button>) : isJoined && !isCompleted ? (<Button className={styles.submitButton} onClick={handleSubmitReport} disabled={!learningSummary.trim()}>Submit Report</Button>) : null}
            </CardFooter>
          </Card>
        </DialogContent>
      </Dialog>

      <Dialog open={showCongratulations} onOpenChange={setShowCongratulations}>
        <DialogContent className={styles.dialogContent}><DialogHeader><DialogTitle className={styles.congratsTitle}>🎉 Congratulations! 🎉</DialogTitle><DialogDescription className={styles.congratsDescription}>You've successfully completed the <span className={styles.bold}>{title}</span> learning circle.</DialogDescription></DialogHeader><div className={styles.congratsIconContainer}><div className={styles.congratsIcon}><CheckCircle className={styles.icon} /></div></div><div className={styles.congratsMessage}><p>Keep exploring and growing your skills!</p><div className={styles.continueButtonContainer}><Button onClick={() => { setShowCongratulations(false); handleClose(); }}>Continue Learning</Button></div></div></DialogContent>
      </Dialog>
    </>
  )
}

