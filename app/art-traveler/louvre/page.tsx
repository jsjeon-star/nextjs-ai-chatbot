"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LouvreChapterPage() {
  const [isComplete, setIsComplete] = useState(false);
  const router = useRouter();

  const handleSubmitPainting = () => {
    setIsComplete(true);

    setTimeout(() => {
      router.push("/art-traveler?completed=louvre");
    }, 1400);
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_#f3e6cf,_#dcc09b_55%,_#846340_100%)] px-6 py-10 text-amber-950">
      <section className="mx-auto max-w-3xl rounded-3xl border border-amber-900/35 bg-[linear-gradient(155deg,_#f8f0dd_0%,_#ead4b2_62%,_#d2ab7a_100%)] p-8 shadow-[0_16px_40px_rgba(58,36,17,0.35)]">
        <p className="text-xs uppercase tracking-[0.4em] text-amber-800">
          Chapter 01
        </p>
        <h1 className="mt-3 text-4xl font-semibold">루브르 박물관</h1>
        <p className="mt-4 leading-7 text-amber-950/85">
          고전 회화의 미션을 완료한 뒤, 작품을 제출하면 여권 페이지로 이동하면서
          루브르 스탬프가 찍힙니다.
        </p>

        <div className="mt-8 rounded-2xl border border-amber-900/25 bg-white/55 p-6">
          <h2 className="text-lg font-semibold">미션: 그림 제출</h2>
          <p className="mt-2 text-sm text-amber-950/80">
            완료한 작품을 제출하고 루브르 스탬프를 획득하세요.
          </p>

          <button
            className="mt-6 rounded-xl border border-amber-900/35 bg-amber-900 px-5 py-3 font-semibold text-amber-50 transition hover:-translate-y-0.5 hover:bg-amber-800"
            onClick={handleSubmitPainting}
            type="button"
          >
            그림제출
          </button>
        </div>
      </section>

      {isComplete ? (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/45 px-6">
          <div className="w-full max-w-sm rounded-2xl border border-emerald-200 bg-white p-6 text-center shadow-2xl">
            <p className="text-sm uppercase tracking-[0.25em] text-emerald-700">
              Louvre Mission
            </p>
            <h2 className="mt-2 text-3xl font-bold text-emerald-800">
              Mission Complete!
            </h2>
            <p className="mt-3 text-sm text-slate-700">
              여권 페이지로 이동 중입니다...
            </p>
          </div>
        </div>
      ) : null}
    </main>
  );
}
