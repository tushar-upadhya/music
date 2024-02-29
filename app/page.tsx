import Sidebar from "@/components/Sidebar";
import { playlists } from "@/data/playlist";
import ModeToggle from "@/theme/ModeToggle";

export default function Home() {
  return (
    <div className="block">
      <div className="border-t">
        <div className="bg-background">
          <div className="grid lg:grid-cols-5">
            <Sidebar playlists={playlists} className="hidden lg:block" />

            <div className="col-span-3 lg:col-span-4 lg:grid-cols-5">
              <section className="flex items-center justify-between gap-3 lg:px-8 px-4 py-6">
                {/* <ModeToggle /> */}
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
