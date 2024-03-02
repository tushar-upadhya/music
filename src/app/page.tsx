"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { playlists } from "../data/playlists";
import { ModeToggle } from "@/components/theme/ModeToggle";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import useOnclickOutside from "react-cool-onclickoutside";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useDebounce } from "use-debounce";

import { useQuery } from "@tanstack/react-query";
import { saveAs } from "file-saver";
import Sidebar from "@/components/Sidebar";
import LoadingAlbumArtwork from "@/components/LoadingAlbumArtwork";
import AlbumArtwork from "@/components/AlbumArtwork";
import SuggestionCard from "@/components/SuggestionCard";
import { ApiResponse } from "@/lib/type/type";
import Footer from "@/components/Footer";

export default function MusicPage() {
  const [searchValue, setSearchValue] = useState("");
  const [musicUrl, setMusicUrl] = useState("");
  const [value] = useDebounce(searchValue, 500);

  const [isSearchSuggestionOpen, setSearchSuggestion] = useState(false);

  const [animationParent] = useAutoAnimate({
    duration: 100,
    easing: "ease-in-out",
  });

  const ref = useOnclickOutside(() => {
    setSearchSuggestion(false);
  });

  const LOFI_API = `https://saavn.dev/search/songs?query=loffi&page=1&limit=80`;

  const TRENDING_API = `https://saavn.dev/search/songs?query=trending&page=1&limit=80`;

  const SEARCH_API = `https://saavn.dev/search/songs?query=${
    value || "india"
  }&page=1&limit=150`;

  // TRENDING_API
  const { isLoading: isTrending_APISongsLoading, data: trending_APISongs } =
    useQuery<ApiResponse>({
      queryKey: ["treading-song"],
      queryFn: () => fetch(TRENDING_API).then((res) => res.json()),
    });

  // LOFI_API
  const { isLoading: isLoffiSongsLoading, data: loffiSongs } =
    useQuery<ApiResponse>({
      queryKey: ["loffi-song"],
      queryFn: () => fetch(LOFI_API).then((res) => res.json()),
    });

  // search api
  const {
    isLoading: isSongsLoading,
    refetch: refetchSearch,
    data: songs,
  } = useQuery<ApiResponse>({
    queryKey: ["search-song"],
    queryFn: () => fetch(SEARCH_API).then((res) => res.json()),
  });

  useEffect(() => {
    refetchSearch();
  }, [refetchSearch, value]);

  const downloadImage = (imageURL: string, imageName: string) => {
    saveAs(imageURL, `${imageName}.mp3`);
  };

  console.log("songs", songs);

  return (
    <>
      <div className="block">
        <div className="border-t">
          <div className="bg-background">
            <div className="grid lg:grid-cols-5 ">
              <Sidebar playlists={playlists} className="hidden lg:block" />
              <div className="col-span-3 lg:col-span-4 lg:grid-cols-5 ">
                {/* search section  */}
                <section className="flex items-center justify-between gap-3 px-4 py-6 lg:px-8">
                  {/* input */}
                  <div
                    ref={ref}
                    className=" relative w-full  max-w-[320px] md:max-w-[650px]"
                  >
                    <div
                      ref={animationParent}
                      onClick={() => setSearchSuggestion(true)}
                      className=" w-full "
                    >
                      <Input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        placeholder="Search Songs..."
                        className=" w-full "
                      />

                      {/* suggestion box */}

                      {isSearchSuggestionOpen && (
                        <div className="absolute left-0 top-10 z-10 grid max-h-[300px] w-full grid-cols-1 gap-3 overflow-x-auto   rounded border bg-secondary   p-2 md:grid-cols-2 lg:grid-cols-3   ">
                          {/* suggestion box */}

                          {isSongsLoading && "loading"}
                          {songs?.data.results.map((d, i) => (
                            <SuggestionCard
                              key={i}
                              handleDownload={() =>
                                downloadImage(d.downloadUrl[4].link, d.name)
                              }
                              onClick={() => setMusicUrl(d.downloadUrl[4].link)}
                              // img="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=300&dpr=2&q=80"
                              image={d.image[1].link}
                              category={d.album.name}
                              name={d.name}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <ModeToggle />
                </section>

                <div className="h-full px-4 py-6 lg:px-8">
                  <section className="border-none p-0 outline-none">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-semibold tracking-tight">
                          {/* Listen Now */}
                          Loffi Songs
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Top picks for you. Updated daily.
                        </p>
                      </div>
                    </div>

                    <Separator className="my-4" />

                    <div className="relative">
                      <ScrollArea className=" ">
                        <div className="flex  max-w-full space-x-4 overflow-x-auto pb-4">
                          {isLoffiSongsLoading
                            ? Array(6)
                                .fill(null)
                                .map((_, i) => (
                                  <LoadingAlbumArtwork
                                    key={i}
                                    className="w-[250px]"
                                    aspectRatio="portrait"
                                    width={250}
                                  />
                                ))
                            : loffiSongs?.data.results.map((d, i) => (
                                <AlbumArtwork
                                  handleDownload={() =>
                                    downloadImage(d.downloadUrl[4].link, d.name)
                                  }
                                  onClick={() =>
                                    setMusicUrl(d.downloadUrl[4].link)
                                  }
                                  key={i}
                                  name={d.name}
                                  img={d.image[2].link}
                                  category={d.album.name}
                                  className="w-[250px]"
                                  aspectRatio="portrait"
                                  width={250}
                                  height={330}
                                />
                              ))}
                        </div>

                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                    <div className="mt-6 space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Treading Songs
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your personal playlists. Updated daily.
                      </p>
                    </div>
                    <Separator className="my-4" />
                    <div className="relative">
                      <ScrollArea>
                        <div className="flex space-x-4 pb-4">
                          {isTrending_APISongsLoading
                            ? Array(6)
                                .fill(null)
                                .map((_, i) => (
                                  <LoadingAlbumArtwork
                                    key={i}
                                    aspectRatio="portrait"
                                    width={150}
                                  />
                                ))
                            : trending_APISongs?.data.results.map((d, i) => (
                                <AlbumArtwork
                                  handleDownload={() =>
                                    downloadImage(d.downloadUrl[4].link, d.name)
                                  }
                                  onClick={() =>
                                    setMusicUrl(d.downloadUrl[4].link)
                                  }
                                  key={i}
                                  name={d.name}
                                  img={d.image[2].link}
                                  category={d.album.name}
                                  className="w-[150px]"
                                  aspectRatio="square"
                                  width={150}
                                  height={150}
                                />
                              ))}
                        </div>
                        <ScrollBar orientation="horizontal" />
                      </ScrollArea>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="fixed bottom-0 left-0 w-full">
          <AudioPlayer
            className="!bg-background"
            // autoPlay
            // src="https://aac.saavncdn.com/274/aee250c500588f117ae5343688e12b42_12.mp4"
            // src="http://example.com/audio.mp3"
            src={musicUrl}
            onPlay={(e) => console.log("onPlay")}
            // other props here
          />
          <Footer />
        </section>
      </div>
    </>
  );
}
