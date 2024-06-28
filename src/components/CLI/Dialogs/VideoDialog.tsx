"use client"

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface VideoDialogProps {
  open: boolean
  setOpen: (open: boolean) => void
  videoPath: string
  title?: string
}

// I would use Youtube in production instead of self hosting this video.

const VideoDialog: React.FC<VideoDialogProps> = ({ open, setOpen, videoPath, title }) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[80%] sm:max-h-[80%]">
        {title && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}
        <div className="aspect-video w-full">
			<video 
				src={videoPath} 
				controls 
				className="w-full h-full"
				playsInline  // allow inline playback on mobile devices
				autoPlay
          	>
				Your browser does not support the video tag.
          	</video>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default VideoDialog