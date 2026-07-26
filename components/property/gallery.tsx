"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { Expand, X, ChevronLeft, ChevronRight } from "lucide-react";
import { img } from "@/lib/data/images";
import type { PhotoKey } from "@/lib/data/images";

export function Gallery({ photos, name }: { photos: PhotoKey[]; name: string }) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const move = useCallback(
    (dir: number) => setIndex((i) => (i + dir + photos.length) % photos.length),
    [photos.length]
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") move(1);
      if (e.key === "ArrowLeft") move(-1);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, move]);

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  return (
    <>
      {/* Mosaic */}
      <div className="grid grid-cols-4 grid-rows-2 gap-2 md:gap-3">
        <button
          onClick={() => openAt(0)}
          className="group relative col-span-4 row-span-2 aspect-[16/10] overflow-hidden rounded-3xl md:col-span-2"
        >
          <Image
            src={img(photos[0], 1400)}
            alt={`${name} — main`}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-obsidian/10 transition-colors group-hover:bg-obsidian/0" />
        </button>

        {photos.slice(1, 5).map((p, i) => (
          <button
            key={p + i}
            onClick={() => openAt(i + 1)}
            className="group relative col-span-2 row-span-1 aspect-[4/3] overflow-hidden rounded-2xl md:col-span-1"
          >
            <Image
              src={img(p, 700)}
              alt={`${name} — ${i + 2}`}
              fill
              sizes="25vw"
              className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
            />
            {i === 3 && photos.length > 5 && (
              <span className="absolute inset-0 grid place-items-center bg-obsidian/60 text-sm font-medium text-pearl backdrop-blur-sm">
                +{photos.length - 5} more
              </span>
            )}
          </button>
        ))}
      </div>

      <button
        onClick={() => openAt(0)}
        className="mt-3 flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-pearl transition-colors hover:border-champagne/40"
      >
        <Expand className="h-4 w-4 text-champagne" />
        View all {photos.length} photos
      </button>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex flex-col bg-obsidian/97 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between px-5 py-5 md:px-8">
              <p className="text-sm text-mist">
                {index + 1} / {photos.length} · {name}
              </p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close gallery"
                className="grid h-11 w-11 place-items-center rounded-full glass text-pearl"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="relative flex flex-1 items-center justify-center px-4 pb-6 md:px-16">
              <button
                onClick={() => move(-1)}
                aria-label="Previous photo"
                className="absolute left-3 z-10 grid h-12 w-12 place-items-center rounded-full glass text-pearl md:left-6"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="relative h-full w-full max-w-5xl"
                >
                  <Image
                    src={img(photos[index], 1800)}
                    alt={`${name} — ${index + 1}`}
                    fill
                    sizes="90vw"
                    className="rounded-2xl object-contain"
                  />
                </motion.div>
              </AnimatePresence>
              <button
                onClick={() => move(1)}
                aria-label="Next photo"
                className="absolute right-3 z-10 grid h-12 w-12 place-items-center rounded-full glass text-pearl md:right-6"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="flex justify-center gap-2 overflow-x-auto px-5 pb-6">
              {photos.map((p, i) => (
                <button
                  key={p + i}
                  onClick={() => setIndex(i)}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg transition-all ${
                    i === index ? "ring-2 ring-gold" : "opacity-50 hover:opacity-100"
                  }`}
                >
                  <Image src={img(p, 200)} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
