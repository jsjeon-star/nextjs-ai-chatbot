"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type Museum = {
  id: string;
  name: string;
  country: string;
  flag: string;
  href?: string;
};

const STORAGE_KEY = "art-traveler-stamps";

const museums: Museum[] = [
  {
    id: "louvre",
    name: "루브르 박물관",
    country: "프랑스",
    flag: "🇫🇷",
    href: "/art-traveler/louvre",
  },
  { id: "british", name: "대영박물관", country: "영국", flag: "🇬🇧" },
  { id: "vatican", name: "바티칸 박물관", country: "바티칸", flag: "🇻🇦" },
  { id: "met", name: "메트로폴리탄 미술관", country: "미국", flag: "🇺🇸" },
  { id: "uffizi", name: "우피치 미술관", country: "이탈리아", flag: "🇮🇹" },
  { id: "prado", name: "프라도 미술관", country: "스페인", flag: "🇪🇸" },
  { id: "rijks", name: "국립미술관", country: "네덜란드", flag: "🇳🇱" },
  { id: "orsay", name: "오르세 미술관", country: "프랑스", flag: "🇫🇷" },
  {
    id: "acropolis",
    name: "아크로폴리스 박물관",
    country: "그리스",
    flag: "🇬🇷",
  },
  { id: "egypt", name: "이집트 박물관", country: "이집트", flag: "🇪🇬" },
  { id: "moma", name: "뉴욕 현대미술관", country: "미국", flag: "🇺🇸" },
  { id: "hermitage", name: "에르미타주", country: "러시아", flag: "🇷🇺" },
  { id: "tokyo", name: "도쿄국립박물관", country: "일본", flag: "🇯🇵" },
  { id: "nationalpalace", name: "국립고궁박물원", country: "대만", flag: "🇹🇼" },
  { id: "australian", name: "호주 국립박물관", country: "호주", flag: "🇦🇺" },
];

export function ArtTravelerPassport() {
  const [completedMuseums, setCompletedMuseums] = useState<string[]>([]);
  const [animatedMuseumId, setAnimatedMuseumId] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return;
    }

    try {
      const parsed = JSON.parse(stored) as string[];
      setCompletedMuseums(parsed);
    } catch {
      setCompletedMuseums([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedMuseums));
  }, [completedMuseums]);

  useEffect(() => {
    const completed = searchParams.get("completed");

    if (!completed) {
      return;
    }

    setCompletedMuseums((prev) =>
      prev.includes(completed) ? prev : [...prev, completed]
    );
    setAnimatedMuseumId(completed);

    const timer = setTimeout(() => {
      setAnimatedMuseumId(null);
      router.replace("/art-traveler");
    }, 1800);

    return () => clearTimeout(timer);
  }, [searchParams, router]);

  const completedCount = useMemo(
    () => completedMuseums.length,
    [completedMuseums]
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f4ecd8_0%,_#e5d4b5_40%,_#b89463_100%)] px-6 py-10 text-amber-950">
      <section className="mx-auto max-w-6xl rounded-3xl border border-amber-900/25 bg-[linear-gradient(160deg,_#f8f1df_0%,_#eddcc0_55%,_#d8b98a_100%)] p-8 shadow-[0_18px_45px_rgba(66,43,18,0.35)]">
        <header className="mb-8 rounded-2xl border border-amber-900/35 bg-[linear-gradient(145deg,_#5a3d22,_#3d2817)] px-6 py-5 text-amber-100 shadow-inner">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-200/80">
            Digital Passport
          </p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-3xl font-semibold tracking-wide">
              Art Traveler Passport
            </h1>
            <div className="rounded-xl border border-amber-100/20 bg-amber-50/10 px-4 py-3 text-sm">
              <p>이름: 아트 탐험가</p>
              <p>등급: 입문 여행자</p>
              <p>완료한 스탬프: {completedCount}/15</p>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {museums.map((museum) => {
            const isCompleted = completedMuseums.includes(museum.id);
            const isAnimating = animatedMuseumId === museum.id;

            const card = (
              <article
                className={`relative min-h-44 overflow-hidden rounded-xl border p-4 transition-all duration-300 ${
                  isCompleted
                    ? "border-rose-800/40 bg-amber-50"
                    : "border-slate-500/30 bg-slate-100/65 grayscale"
                }`}
              >
                <div className="relative z-10">
                  <p className="text-sm font-semibold">{museum.name}</p>
                  <p className="mt-1 text-xs text-slate-700/80">
                    {museum.country}
                  </p>
                  <p className="mt-2 text-xl">{museum.flag}</p>
                </div>

                <div
                  className={`absolute inset-0 m-4 grid place-items-center rounded-full border-4 text-center text-sm font-bold uppercase tracking-widest transition-all ${
                    isCompleted
                      ? "border-rose-700/75 bg-rose-600/15 text-rose-800"
                      : "border-slate-500/35 bg-slate-300/30 text-slate-600/70"
                  } ${isAnimating ? "animate-[stamp-impact_0.8s_ease-out]" : ""}`}
                  style={
                    isCompleted ? { transform: "rotate(-10deg)" } : undefined
                  }
                >
                  {isCompleted ? "Visited" : "Pending"}
                </div>
              </article>
            );

            if (!museum.href) {
              return <div key={museum.id}>{card}</div>;
            }

            return (
              <Link
                className="block focus:outline-none"
                href={museum.href}
                key={museum.id}
              >
                {card}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
