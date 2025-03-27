"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Users, Wifi, WifiOff, CheckCircle } from "lucide-react"
import styles from "./learning-circle-list-item.module.css";

interface LearningCircleListItemProps {
  id: string
  title: string
  description?: string
  ig_name: string
  mode: string
  attendees_count: number
  hasJoined?: boolean
  hasCompleted?: boolean
  onClick: () => void
}

export function LearningCircleListItem({
  title,
  description = '',
  ig_name,
  mode,
  attendees_count,
  hasJoined,
  hasCompleted,
  onClick,
}: LearningCircleListItemProps) {
  return (
    <Card className={styles.card}>
      <CardContent className={styles.cardContent}>
        <h3 className={styles.cardTitle}>
          {title}
          <span className={styles.memberCount}>
            <Users className={styles.memberIcon} />
            <span>{attendees_count}</span>
          </span>
        </h3>
        <p className={styles.cardDescription}>
          {description.length > 150 ? description.substring(0, 150) + "..." : description}
        </p>

        <div className={styles.badgeContainer}>
          <Badge variant="secondary" className={styles.categoryBadge}>{ig_name}</Badge>

          <Badge variant="outline" className={styles.statusBadge}>
            {mode === 'online' ? (
              <><Wifi className={styles.onlineIcon} /><span>Online</span></>
            ) : (
              <><WifiOff className={styles.offlineIcon} /><span>Offline</span></>
            )}
          </Badge>


          {hasJoined && (
            <Badge className={styles.joinedBadge}>Joined</Badge>
          )}

          {hasCompleted && (
            <Badge className={styles.completedBadge}>
              <CheckCircle className={styles.icon} />
              Completed
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className={styles.cardFooter}>
        <Button className={styles.viewDetailsButton} onClick={onClick}>
          View Details
        </Button>
      </CardFooter>
    </Card>
  )
}

