import Image from "next/image";
import { Button } from "./ui/button";
import { DownloadCloud, PlayCircle } from "lucide-react";

interface ISuggestionCardProps {
  image: string;
  name: string;
  category: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  handleDownload?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const SuggestionCard = ({
  image,
  name,
  category,
  onClick,
  handleDownload,
}: ISuggestionCardProps) => {
  return (
    <div className="flex max-w-[200px] items-center justify-between gap-2">
      <div className="flex items-center gap-2">
        <Button
          onClick={onClick}
          className="group relative h-10 min-h-10 w-10 min-w-10 overflow-hidden rounded"
        >
          <Image
            src={image}
            height={40}
            width={40}
            alt="image"
            className="h-10 w-10 border border-b-white object-cover"
          />

          <div className="absolute left-0 top-0 hidden h-full w-full cursor-pointer items-center justify-center border bg-black/50 transition-all group-hover:flex">
            <PlayCircle className="text-3xl text-white" />
          </div>
        </Button>

        <section className="flex flex-col">
          <p className="max-w-[110px] truncate text-sm font-semibold capitalize">
            {name}
          </p>
          <p className="max-w-[110px] truncate text-sm font-semibold capitalize">
            {category}
          </p>
        </section>
      </div>
      <div>
        <Button
          onClick={handleDownload}
          className="rounded-full bg-white/80 hover:bg-white/50"
        >
          <DownloadCloud className="text-lg text-gray-600" />
        </Button>
      </div>
    </div>
  );
};

export default SuggestionCard;
