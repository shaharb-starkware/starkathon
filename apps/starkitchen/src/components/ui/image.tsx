import * as React from "react"
import { cn } from "@/lib/utils"

export interface ImageProps
    extends React.ImgHTMLAttributes<HTMLImageElement> {
    width: number
    height: number
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
    ({ className, alt, ...props }, ref) => {
        return (
            <img
                className={cn("object-cover", className)}
                alt={alt}
                ref={ref}
                {...props}
            />
        )
    }
)
Image.displayName = "Image"

export { Image }
