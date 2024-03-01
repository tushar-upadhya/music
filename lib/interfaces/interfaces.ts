export interface ILoadingAlbumArtworkProps
  extends React.HTMLAttributes<HTMLDivElement> {
  aspectRatio?: "portrait" | "square";
  width?: number;
  height?: number;
}
