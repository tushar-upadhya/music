import { cn } from "@/lib/utils";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
import { PlusCircledIcon } from "@radix-ui/react-icons";
import { playlists } from "@/data/playlist";
import { DownloadCloud, PlayCircle } from "lucide-react";
import { Button } from "./ui/button";

interface IAlbumArtworkProps extends React.HTMLAttributes<HTMLButtonElement> {
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
  img: string;
  name: string;
  category: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;

  handleDownload?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const AlbumArtwork = ({
  category,
  img,
  name,
  aspectRatio = "portrait",
  width,
  height,
  className,
  onClick,
  ...props
}: IAlbumArtworkProps) => {
  return (
    <Button className={cn("space-y-3", className)} {...props}>
      <ContextMenu>
        <ContextMenuTrigger>
          <Button onClick={onClick} className="overflow-hidden rounded-md">
            <Image
              src={""}
              alt="image"
              height={height}
              width={width}
              className={cn(
                "h-auto w-auto object-cover transition-all hover:scale-105",
                aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
              )}
            />
          </Button>
        </ContextMenuTrigger>

        <ContextMenuContent className="w-40">
          <ContextMenuItem>Add to Library</ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger>Add to Playlist</ContextMenuSubTrigger>
            <ContextMenuSubContent className="w-48">
              <ContextMenuItem>
                <PlusCircledIcon className="mr-2 h-4 w-4" />
                New Playlist
              </ContextMenuItem>
              <ContextMenuSeparator />
              {playlists.map((playlist) => (
                <ContextMenuItem key={playlist}>
                  <PlayCircle className="mr-2 h-4 w-4" />
                  {playlist}
                </ContextMenuItem>
              ))}
            </ContextMenuSubContent>
          </ContextMenuSub>

          <ContextMenuSeparator />

          <ContextMenuItem>Play Next</ContextMenuItem>

          <ContextMenuItem>Play Later</ContextMenuItem>

          <ContextMenuItem>Create Station</ContextMenuItem>

          <ContextMenuSeparator />

          <ContextMenuItem>Like</ContextMenuItem>

          <ContextMenuItem>Share</ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>

      <div className="flex w-full justify-between gap-2 text-sm">
        <div className="space-y-1 text-sm">
          <h3 className="flex w-[200px] items-start truncate font-medium leading-none">
            {name}
          </h3>

          <p className="flex items-start text-xs text-muted-foreground">
            {category}
          </p>

          <Button className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 hover:bg-white/50">
            <DownloadCloud size={16} className="text-xl  text-gray-600" />
          </Button>
        </div>
      </div>
    </Button>
  );
};

export default AlbumArtwork;
