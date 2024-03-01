import { Podcast } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { DialogContent, DialogFooter, DialogHeader } from "./ui/dialog";

const PodcastEmptyPlaceholder = () => {
  return (
    <div className="flex h-[450px] shrink-0 items-center justify-center rounded-md border border-dashed">
      <div className="mx-auto flex max-h-[420px] flex-col items-center justify-center text-center">
        <Podcast className="h-10 w-10 text-muted-foreground" />

        <h3 className="mt-4 text-lg font-semibold">No Episodes added</h3>

        <p className="mb-4 mt-2 text-sm text-muted-foreground">
          You have not added any podcast. Add one below
        </p>

        <Dialog>
          <DialogTrigger asChild>
            <Button size={"sm"} className="relative">
              Add Prodcast
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Podcast</DialogTitle>
              <DialogDescription>
                Copy and paste the podcast feed URL to import.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="url">Podcast URL</Label>
                <Input id="url" placeholder="https://example.com/feed.xml" />
              </div>
            </div>
            <DialogFooter>
              <Button>Import Podcast</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default PodcastEmptyPlaceholder;
