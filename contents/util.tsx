import { ILoadingAlbumArtworkProps } from "@/lib/interfaces/interfaces";
import { cn } from "@/lib/utils";

export function LoadingAlbumArtwork({
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ILoadingAlbumArtworkProps) {
  return (
    <div className="space-y-3">
      <div
        style={{ height: height, width: width }}
        className={cn(
          "animate-pulse rounded-lg bg-secondary object-cover transition-all",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
        )}
      >
        <div className="space-y-1 text-sm">
          <h3 className="h-5 w-[70%] animate-pulse rounded-lg bg-secondary font-medium leading-none">
            <p className="h5 w-[40%] animate-pulse rounded-lg bg-secondary text-xs text-muted-foreground"></p>
          </h3>
        </div>
      </div>
    </div>
  );
}
