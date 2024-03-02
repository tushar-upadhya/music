import { cn } from "@/lib/utils";

interface ILoadingAlbumArtwork extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}

const LoadingAlbumArtwork = ({
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: ILoadingAlbumArtwork) => {
  return (
    <div className="space-y-3  ">
      <div
        style={{
          height: height,
          width: width,
        }}
        // h-auto w-auto
        className={cn(
          " animate-pulse rounded-lg  bg-secondary object-cover transition-all ",
          aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square",
        )}
      />
      <div className="space-y-1 text-sm">
        <h3 className="h-5 w-[70%] animate-pulse rounded-lg bg-secondary font-medium leading-none" />
        <p className="h-5 w-[40%] animate-pulse rounded-lg bg-secondary text-xs text-muted-foreground" />
      </div>
    </div>
  );
};

export default LoadingAlbumArtwork;
