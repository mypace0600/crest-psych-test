"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type CrestKey =
  | "courage"
  | "friendship"
  | "purity"
  | "love"
  | "knowledge"
  | "reliability"
  | "hope"
  | "light";

type Choice = {
  label: string;
  crests: CrestKey[];
};

type Question = {
  title: string;
  choices: Choice[];
};

const crestCharacters: Record<
  CrestKey,
  {
    partnerLabel: string;
    images: Array<{
      src: string;
      alt: string;
      width: number;
      height: number;
      label: string;
    }>;
  }
> = {
  courage: {
    partnerLabel: "신태일 (아구몬)",
    images: [
      { src: "/characters/taichi-1.png", alt: "어린 시절 신태일", width: 200, height: 400, label: "어릴 적 태일" },
      { src: "/characters/taichi-2.webp", alt: "성장한 신태일", width: 224, height: 673, label: "성장한 태일" },
    ],
  },
  friendship: {
    partnerLabel: "매튜 (파피몬)",
    images: [
      { src: "/characters/matthew-1.png", alt: "어린 시절 매튜", width: 145, height: 453, label: "어릴 적 매튜" },
      { src: "/characters/matthew-2.webp", alt: "성장한 매튜", width: 193, height: 705, label: "성장한 매튜" },
    ],
  },
  purity: {
    partnerLabel: "이미나 (팔몬)",
    images: [
      { src: "/characters/mimi-1.png", alt: "어린 시절 이미나", width: 240, height: 464, label: "어릴 적 미나" },
      { src: "/characters/mimi-2.webp", alt: "성장한 이미나", width: 251, height: 626, label: "성장한 미나" },
    ],
  },
  love: {
    partnerLabel: "한소라 (피요몬)",
    images: [
      { src: "/characters/sora-1.png", alt: "어린 시절 한소라", width: 240, height: 439, label: "어릴 적 소라" },
      { src: "/characters/sora-2.webp", alt: "성장한 한소라", width: 101, height: 327, label: "성장한 소라" },
    ],
  },
  knowledge: {
    partnerLabel: "장한솔 (텐타몬)",
    images: [
      { src: "/characters/koshiro-1.png", alt: "어린 시절 장한솔", width: 240, height: 480, label: "어릴 적 한솔" },
      { src: "/characters/koshiro-2.webp", alt: "성장한 장한솔", width: 286, height: 666, label: "성장한 한솔" },
    ],
  },
  reliability: {
    partnerLabel: "정석 (고마몬)",
    images: [
      { src: "/characters/joe-1.png", alt: "어린 시절 정석", width: 240, height: 480, label: "어릴 적 정석" },
      { src: "/characters/joe-2.webp", alt: "성장한 정석", width: 110, height: 353, label: "성장한 정석" },
    ],
  },
  hope: {
    partnerLabel: "리키 (파닥몬)",
    images: [
      { src: "/characters/takeru-1.png", alt: "어린 시절 리키", width: 240, height: 480, label: "어릴 적 리키" },
      { src: "/characters/takeru-2.webp", alt: "성장한 리키", width: 293, height: 687, label: "성장한 리키" },
    ],
  },
  light: {
    partnerLabel: "신나리 (가트몬 / 테일몬)",
    images: [
      { src: "/characters/hikari-1.png", alt: "어린 시절 신나리", width: 240, height: 480, label: "어릴 적 나리" },
      { src: "/characters/hikari-2.webp", alt: "성장한 신나리", width: 300, height: 641, label: "성장한 나리" },
    ],
  },
};

const thoughtShifts: Record<CrestKey, { before: string; after: string }> = {
  courage: {
    before: "무섭지 않은 것이 용기다",
    after: "무섭지만 책임지는 것이 용기다",
  },
  friendship: {
    before: "혼자 강해야 한다",
    after: "서로 기대고 믿을 수 있어야 한다",
  },
  love: {
    before: "사랑은 희생이다",
    after: "나도 사랑받을 가치가 있다",
  },
  purity: {
    before: "순수는 철없는 것이다",
    after: "순수는 옳고 그름을 바라보는 힘이다",
  },
  knowledge: {
    before: "지식은 많이 아는 것이다",
    after: "지식은 자신을 이해하는 것이다",
  },
  reliability: {
    before: "실수하면 안 된다",
    after: "부족해도 끝까지 책임진다",
  },
  hope: {
    before: "잘 될 거라 믿는 것이다",
    after: "안 될 것 같아도 포기하지 않는 것이다",
  },
  light: {
    before: "착한 사람이 되는 것이다",
    after: "사람의 가능성을 비춰주는 것이다",
  },
};

const crests: Record<
  CrestKey,
  {
    name: string;
    english: string;
    owner: string;
    image: string;
    color: string;
    headline: string;
    description: string;
    keywords: string[];
  }
> = {
  courage: {
    name: "용기",
    english: "Crest of Courage",
    owner: "신태일",
    image: "/crests/courage.webp",
    color: "#f0642f",
    headline: "두려움이 있어도 먼저 한 걸음을 내딛는 사람",
    description:
      "용기는 단순히 겁이 없는 성향이 아니라, 위험과 두려움을 알고도 필요한 순간 앞으로 나아가기로 결단하는 힘입니다. 위기 앞에서 주저앉기보다 직접 행동해 상황을 바꾸려는 에너지가 강합니다.",
    keywords: ["결단", "돌파", "책임 있는 행동"],
  },
  friendship: {
    name: "우정",
    english: "Crest of Friendship",
    owner: "매튜",
    image: "/crests/friendship.webp",
    color: "#2f7ecb",
    headline: "관계의 신뢰를 지키기 위해 움직이는 사람",
    description:
      "우정은 가까운 사람과의 믿음, 약속, 의리를 중요하게 여기는 힘입니다. 갈등이 있어도 끝내 마음을 풀고, 소중한 사람을 위해 자신이 할 수 있는 몫을 선택합니다.",
    keywords: ["신뢰", "의리", "동료애"],
  },
  purity: {
    name: "순수",
    english: "Crest of Sincerity",
    owner: "이미나",
    image: "/crests/purity.webp",
    color: "#31b617",
    headline: "마음을 숨기지 않고 진심으로 반응하는 사람",
    description:
      "순수는 계산된 태도보다 솔직한 감정과 진심을 믿는 힘입니다. 억압받거나 상처 입은 존재를 보면 그대로 마음이 움직이고, 그 감정이 주변을 바꾸는 계기가 됩니다.",
    keywords: ["진심", "솔직함", "공감"],
  },
  love: {
    name: "사랑",
    english: "Crest of Love",
    owner: "한소라",
    image: "/crests/love.webp",
    color: "#d9403d",
    headline: "상대가 다치지 않도록 먼저 살피는 사람",
    description:
      "사랑은 누군가를 아끼기 때문에 멈추게 하고, 보호하고, 곁을 지키려는 마음입니다. 강하게 밀어붙이는 것보다 상대의 상태를 헤아리는 돌봄의 판단이 앞섭니다.",
    keywords: ["돌봄", "보호", "애정"],
  },
  knowledge: {
    name: "지식",
    english: "Crest of Knowledge",
    owner: "장한솔",
    image: "/crests/knowledge.webp",
    color: "#a431b1",
    headline: "이해해야 움직일 수 있는 탐구형 사람",
    description:
      "지식은 세상을 분석하고 원리를 탐구하려는 마음에서 나옵니다. 감으로만 움직이기보다 정보를 모으고, 구조를 파악하고, 더 나은 선택지를 찾아냅니다.",
    keywords: ["탐구", "분석", "이해"],
  },
  reliability: {
    name: "성실",
    english: "Crest of Reliability",
    owner: "정석",
    image: "/crests/reliability.webp",
    color: "#777a80",
    headline: "맡은 약속을 끝까지 지켜내는 사람",
    description:
      "성실은 상황이 흔들려도 해야 할 일을 놓지 않는 힘입니다. 눈에 띄는 영웅담보다 꾸준히 책임을 다하고, 누군가와 한 약속을 마지막까지 지키려 합니다.",
    keywords: ["책임", "약속", "꾸준함"],
  },
  hope: {
    name: "희망",
    english: "Crest of Hope",
    owner: "리키",
    image: "/crests/hope.webp",
    color: "#f2bc2f",
    headline: "모든 수단이 꺾여도 가능성을 붙드는 사람",
    description:
      "희망은 막연한 낙관이 아니라 절망적인 상황을 정확히 보면서도 포기하지 않는 힘입니다. 마지막 순간까지 남은 가능성을 찾아 상황을 반전시키는 열쇠가 됩니다.",
    keywords: ["끈기", "반전", "가능성"],
  },
  light: {
    name: "빛",
    english: "Crest of Light",
    owner: "신나리",
    image: "/crests/light.webp",
    color: "#ff8eb9",
    headline: "상처와 슬픔 속에서도 생명을 깨우는 사람",
    description:
      "빛은 누군가의 희생과 아픔을 외면하지 않고, 그 슬픔을 더 나은 의지로 바꾸는 힘입니다. 주변의 어둠을 밝히고 다시 살아나게 하는 회복의 에너지가 강합니다.",
    keywords: ["회복", "생명력", "따뜻한 의지"],
  },
};

const questions: Question[] = [
  {
    title: "위기 상황에서 나는 가장 먼저...",
    choices: [
      { label: "무섭더라도 먼저 움직인다", crests: ["courage", "hope"] },
      { label: "사람들이 다치지 않았는지 챙긴다", crests: ["love", "light"] },
      { label: "상황을 파악하고 방법을 찾는다", crests: ["knowledge", "reliability"] },
      { label: "흩어진 마음과 팀을 한곳으로 모은다", crests: ["friendship", "purity"] },
    ],
  },
  {
    title: "팀 안에서 내가 자연스럽게 맡는 역할은?",
    choices: [
      { label: "앞에서 결정을 내리고 길을 튼다", crests: ["courage", "knowledge"] },
      { label: "모두가 서로 믿게 연결한다", crests: ["friendship", "love"] },
      { label: "맡은 일을 놓치지 않고 끝까지 챙긴다", crests: ["reliability", "hope"] },
      { label: "분위기를 부드럽게 만들고 진심을 말한다", crests: ["purity", "light"] },
    ],
  },
  {
    title: "처음 만난 디지몬 파트너에게 나는...",
    choices: [
      { label: "바로 함께해보자고 말한다", crests: ["courage", "friendship"] },
      { label: "불안하지 않게 먼저 안심시킨다", crests: ["love", "light"] },
      { label: "어떤 존재인지 차근차근 물어본다", crests: ["knowledge", "purity"] },
      { label: "서로 지킬 약속부터 정한다", crests: ["reliability", "hope"] },
    ],
  },
  {
    title: "마지막 문장이 빛나는 순간, 나는 어떤 마음에 가장 가깝나?",
    choices: [
      { label: "두렵지만 물러서지 않겠다", crests: ["courage", "reliability"] },
      { label: "내 사람들을 끝까지 믿겠다", crests: ["friendship", "love"] },
      { label: "알아내고 이해해서 길을 찾겠다", crests: ["knowledge", "purity"] },
      { label: "끝났다고 보여도 다시 밝히겠다", crests: ["hope", "light"] },
    ],
  },
];

function getWeightedScores(answers: Choice[]) {
  const scores = Object.keys(crests).reduce(
    (acc, key) => ({ ...acc, [key]: 0 }),
    {} as Record<CrestKey, number>,
  );

  answers.forEach((answer, index) => {
    const weight = index === questions.length - 1 ? 1.5 : 1;

    answer.crests.forEach((crest) => {
      scores[crest] += weight;
    });
  });

  return scores;
}

function getLastMatchedIndex(answers: Choice[], crest: CrestKey) {
  for (let index = answers.length - 1; index >= 0; index -= 1) {
    if (answers[index].crests.includes(crest)) {
      return index;
    }
  }

  return -1;
}

const clubPhotos: Array<{ src: string; alt: string }> = [
  { src: "/club/anione-1.jpg", alt: "애니원 월간 애니감상회 활동 사진" },
  { src: "/club/anione-2.jpg", alt: "애니원 홍대 모임 활동 사진" },
  { src: "/club/anione-3.jpg", alt: "애니원 식사 모임 활동 사진" },
];

function AdBanner({ label }: { label: string }) {
  return (
    <div className="ad-banner" role="complementary" aria-label={label}>
      <span>AD</span>
      <strong>{label}</strong>
      <small>광고 코드를 이 영역에 연결할 수 있습니다</small>
    </div>
  );
}

function AnimeOneModal({ onClose }: { onClose: () => void }) {
  const [photoIndex, setPhotoIndex] = useState(0);
  const currentPhoto = clubPhotos[photoIndex];

  useEffect(() => {
    if (clubPhotos.length < 2) {
      return;
    }

    const timerId = window.setInterval(() => {
      setPhotoIndex((index) => (index + 1) % clubPhotos.length);
    }, 2000);

    return () => window.clearInterval(timerId);
  }, []);

  return (
    <div className="club-modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="club-modal-title">
      <section className="club-modal">
        <button className="modal-close" onClick={onClose} type="button" aria-label="애니원 소개 닫기">
          ×
        </button>
        <p className="eyebrow">애니동아리 소개</p>
        <h2 id="club-modal-title">애니원</h2>
        <div className="club-photo-viewer" aria-label="애니원 동아리 활동 사진">
          {currentPhoto ? (
            <>
              <Image src={currentPhoto.src} alt={currentPhoto.alt} width={640} height={360} />
              <div className="club-photo-dots" aria-hidden="true">
                {clubPhotos.map((photo, index) => (
                  <i className={index === photoIndex ? "active" : ""} key={photo.src} />
                ))}
              </div>
            </>
          ) : (
            <div className="club-photo-empty">
              <strong>활동 사진 준비 중</strong>
              <span>사진 파일을 추가하면 자동으로 넘어가는 슬라이드가 표시됩니다</span>
            </div>
          )}
        </div>
        <p>
          애니원은 애니를 가지고 다양한 주제에 대해 대화하는 모임입니다. 매주 토요일 오후 3시,
          홍대 인근에서 모입니다.
        </p>
        <p>가입을 희망하시는 분들은 아래 오픈채팅방으로 들어오시면 됩니다.</p>
        <a className="kakao-button" href="https://open.kakao.com/o/sFy1fkyi" target="_blank" rel="noreferrer">
          오픈채팅방 들어가기
        </a>
      </section>
    </div>
  );
}

function createShareId() {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`;
}

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Choice[]>([]);
  const [shareState, setShareState] = useState<"idle" | "copied">("idle");
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [sharedResult, setSharedResult] = useState<CrestKey | null>(null);
  const [sharedUserId, setSharedUserId] = useState<string | null>(null);
  const [isClubOpen, setIsClubOpen] = useState(false);
  const resultCaptureRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const resultParam = params.get("result");
    const userIdParam = params.get("u");

    const loadSharedResult = async () => {
      if (!userIdParam) {
        return false;
      }

      try {
        const response = await fetch(`/api/share/${encodeURIComponent(userIdParam)}`);

        if (!response.ok) {
          return false;
        }

        const data = (await response.json()) as { result?: unknown };

        if (typeof data.result === "string" && data.result in crests) {
          setSharedResult(data.result as CrestKey);
          setSharedUserId(userIdParam);
          setHasStarted(true);
          return true;
        }
      } catch {
        return false;
      }

      return false;
    };

    void loadSharedResult().then((found) => {
      if (found) {
        return;
      }

      if (resultParam && resultParam in crests) {
        setSharedResult(resultParam as CrestKey);
        setSharedUserId(userIdParam);
        setHasStarted(true);
        return;
      }

      if (userIdParam) {
        const savedResult = window.localStorage.getItem(`crest-share:${userIdParam}`);

        if (savedResult && savedResult in crests) {
          setSharedResult(savedResult as CrestKey);
          setSharedUserId(userIdParam);
          setHasStarted(true);
        }
      }
    });
  }, []);

  const result = useMemo(() => {
    const weightedScores = getWeightedScores(answers);

    return (Object.keys(weightedScores) as CrestKey[]).sort((a, b) => {
      if (weightedScores[b] !== weightedScores[a]) {
        return weightedScores[b] - weightedScores[a];
      }

      return getLastMatchedIndex(answers, b) - getLastMatchedIndex(answers, a);
    })[0];
  }, [answers]);

  const isDone = answers.length === questions.length;
  const current = questions[step];
  const progress = isDone ? 100 : (answers.length / questions.length) * 100;

  const selectChoice = (choice: Choice) => {
    const nextAnswers = [...answers.slice(0, step), choice];
    setAnswers(nextAnswers);

    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const goBack = () => {
    if (step === 0) return;
    setStep(step - 1);
    setAnswers(answers.slice(0, step - 1));
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShareState("idle");
    setSaveState("idle");
    setSharedResult(null);
    setSharedUserId(null);
    setHasStarted(false);
    window.history.replaceState(null, "", "/");
  };

  const startQuiz = () => {
    setSharedResult(null);
    setSharedUserId(null);
    setSaveState("idle");
    setHasStarted(true);
    window.history.replaceState(null, "", "/");
  };

  const shareResult = async (key: CrestKey, crest: (typeof crests)[CrestKey]) => {
    const origin = typeof window !== "undefined" ? window.location.origin : "https://crest-psych-test.vercel.app";
    let userId = sharedUserId ?? createShareId();
    let isStored = false;
    const shareTitle = "디지몬, 나의 선택받은 문장은?!";
    const shareText = `디지몬 문장 심리검사 결과, 나는 ${crest.name}의 문장! ${crest.headline}`;

    try {
      const response = await fetch("/api/share", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ result: key }),
      });

      if (response.ok) {
        const data = (await response.json()) as { id?: string };

        if (data.id) {
          userId = data.id;
          isStored = true;
        }
      }
    } catch {
      userId = sharedUserId ?? userId;
    }

    const shareUrl = isStored
      ? `${origin}?u=${encodeURIComponent(userId)}`
      : `${origin}?u=${encodeURIComponent(userId)}&result=${key}`;

    try {
      window.localStorage.setItem(`crest-share:${userId}`, key);
      setSharedUserId(userId);

      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(`${shareText}\n${shareUrl}`);
      }
      setShareState("copied");
      window.setTimeout(() => setShareState("idle"), 2200);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
    }
  };

  const saveResultImage = async (crest: (typeof crests)[CrestKey]) => {
    if (!resultCaptureRef.current || saveState === "saving") {
      return;
    }

    setSaveState("saving");

    try {
      const resultCapture = resultCaptureRef.current;
      const images = Array.from(resultCapture.querySelectorAll("img"));

      await Promise.all(
        images.map(async (image) => {
          if (image.complete) {
            return;
          }

          if (image.decode) {
            await image.decode().catch(() => undefined);
            return;
          }

          await new Promise<void>((resolve) => {
            image.addEventListener("load", () => resolve(), { once: true });
            image.addEventListener("error", () => resolve(), { once: true });
          });
        }),
      );

      const { toPng } = await import("html-to-image");
      const dataUrl = await Promise.race([
        toPng(resultCapture, {
          backgroundColor: "#e9f7ff",
          cacheBust: true,
          pixelRatio: Math.min(window.devicePixelRatio || 2, 2),
          filter: (node) => {
            if (!(node instanceof HTMLElement)) {
              return true;
            }

            return node.dataset.captureHidden !== "true";
          },
        }),
        new Promise<string>((_, reject) => {
          window.setTimeout(() => reject(new Error("Result image capture timed out")), 12000);
        }),
      ]);
      const link = document.createElement("a");

      link.download = `digimon-crest-${crest.english.toLowerCase().replaceAll(" ", "-")}.png`;
      link.href = dataUrl;
      link.click();
      setSaveState("saved");
      window.setTimeout(() => setSaveState("idle"), 4000);
    } catch {
      setSaveState("error");
      window.setTimeout(() => setSaveState("idle"), 4200);
    }
  };

  if (!hasStarted && !sharedResult) {
    const crestKeys = Object.keys(crests) as CrestKey[];

    return (
      <>
        <main className="splash-shell">
          <section className="splash-stage" aria-label="문장 심리검사 시작 화면">
            <div className="crest-orbit" aria-hidden="true">
              {crestKeys.map((key, index) => {
                const crest = crests[key];

                return (
                  <span
                    className="floating-crest"
                    key={key}
                    style={
                      {
                        "--orbit-index": index,
                        "--crest-color": crest.color,
                      } as React.CSSProperties
                    }
                  >
                    <Image src={crest.image} alt="" width={78} height={78} />
                  </span>
                );
              })}
            </div>

            <div className="digivice-wrap">
              <Image src="/digivice.png" alt="디지바이스" width={360} height={360} priority />
            </div>

            <div className="splash-copy">
              <p>4개의 질문으로 빠르게</p>
              <h1>
                디지몬
                <span>나의 선택받은 문장은?</span>
              </h1>
              <div className="splash-actions">
                <button className="start-button" onClick={startQuiz} type="button">
                  간편 검사 시작
                </button>
                <button className="club-button" onClick={() => setIsClubOpen(true)} type="button">
                  애니원 모임 소개
                </button>
              </div>
            </div>
          </section>
        </main>
        {isClubOpen && <AnimeOneModal onClose={() => setIsClubOpen(false)} />}
      </>
    );
  }

  if (isDone || sharedResult) {
    const resultKey = sharedResult ?? result;
    const top = crests[resultKey];
    const characterSet = crestCharacters[resultKey];
    const thoughtShift = thoughtShifts[resultKey];
    const weightedScores = getWeightedScores(answers);
    const ranking = (Object.keys(crests) as CrestKey[])
      .map((key) => ({
        key,
        score: weightedScores[key],
      }))
      .sort((a, b) => {
        if (sharedResult) {
          if (a.key === sharedResult) return -1;
          if (b.key === sharedResult) return 1;
        }

        if (weightedScores[b.key] !== weightedScores[a.key]) {
          return weightedScores[b.key] - weightedScores[a.key];
        }

        return getLastMatchedIndex(answers, b.key) - getLastMatchedIndex(answers, a.key);
      });
    const maxScore = questions.length + 0.5;

    return (
      <>
        <main
          className="shell result-shell"
          ref={resultCaptureRef}
          style={{ "--crest-color": top.color } as React.CSSProperties}
        >
          <section className="result-card">
            <div className="result-visual" aria-label={`${top.name}의 문장과 캐릭터 이미지`}>
              <div className="result-symbol">
                <Image src={top.image} alt={`${top.name}의 문장`} width={180} height={180} priority />
              </div>
              <div className="result-character-stack">
                {characterSet.images.map((character) => (
                  <figure key={character.src}>
                    <Image
                      src={character.src}
                      alt={character.alt}
                      width={character.width}
                      height={character.height}
                    />
                  </figure>
                ))}
              </div>
            </div>
            <p className="character-partner">{characterSet.partnerLabel}</p>
            <p className="eyebrow">{sharedResult ? "공유된 문장" : "당신의 문장"}</p>
            <h1>{top.name}의 문장</h1>
            <p className="english">{top.english} · {top.owner}</p>
            <h2>{top.headline}</h2>
            <p className="description">{top.description}</p>
            <div className="thought-shift" aria-label={`${top.name}의 문장 생각 변화`}>
              <section>
                <span>기존 생각</span>
                <strong>{thoughtShift.before}</strong>
              </section>
              <section>
                <span>바뀐 생각</span>
                <strong>{thoughtShift.after}</strong>
              </section>
            </div>
            <div className="keywords">
              {top.keywords.map((keyword) => (
                <span key={keyword}>{keyword}</span>
              ))}
            </div>
            <div className="result-actions" data-capture-hidden="true">
              <button className="primary-button" onClick={() => shareResult(resultKey, top)} type="button">
                친구에게 공유하기
              </button>
              <button
                className="secondary-button"
                disabled={saveState === "saving"}
                onClick={() => saveResultImage(top)}
                type="button"
              >
                {saveState === "saving" ? "이미지 저장 중..." : "내 결과 저장하기"}
              </button>
              <button className="secondary-button" onClick={sharedResult ? startQuiz : reset} type="button">
                {sharedResult ? "나도 검사하기" : "다시 검사하기"}
              </button>
              <button className="secondary-button" onClick={() => setIsClubOpen(true)} type="button">
                애니원 모임 소개
              </button>
            </div>
            <p className="share-feedback" aria-live="polite" data-capture-hidden="true">
              {shareState === "copied"
                ? "링크가 복사됐습니다"
                : saveState === "saved"
                  ? "결과 이미지가 저장됐습니다"
                  : saveState === "error"
                    ? "이미지 저장에 실패했습니다"
                    : " "}
            </p>
            {sharedUserId && (
              <p className="share-id" data-capture-hidden="true">
                공유 ID {sharedUserId}
              </p>
            )}
          </section>

          <aside className="ranking-panel" aria-label="문장별 점수">
            <h3>{sharedResult ? "공유된 결과" : "문장별 반응"}</h3>
            {ranking.map(({ key, score }) => {
              const crest = crests[key];
              return (
                <div className="rank-row" key={key}>
                  <Image src={crest.image} alt="" width={34} height={34} />
                  <span>{crest.name}</span>
                  <div className="rank-bar">
                    <i
                      style={{
                        width: `${sharedResult ? (key === sharedResult ? 100 : 0) : (score / maxScore) * 100}%`,
                        backgroundColor: crest.color,
                      }}
                    />
                  </div>
                  <strong>{sharedResult ? (key === sharedResult ? "결과" : "") : score.toFixed(1).replace(".0", "")}</strong>
                </div>
              );
            })}
            <div data-capture-hidden="true">
              <AdBanner label="결과 페이지 배너" />
            </div>
          </aside>
        </main>
        {isClubOpen && <AnimeOneModal onClose={() => setIsClubOpen(false)} />}
      </>
    );
  }

  return (
    <main className="shell">
      <section className="quiz-card">
        <div className="progress-wrap" aria-hidden="true">
          <div className="progress-track">
            <i style={{ width: `${progress}%` }} />
          </div>
        </div>

        <p className="question-count">Question {step + 1} of {questions.length}</p>
        <h1>{current.title}</h1>
        <p className="hint">4개 중 가장 가까운 답변을 하나만 선택해 주세요</p>

        <div className="choices">
          {current.choices.map((choice) => (
            <button
              className="choice"
              key={`${choice.crests.join("-")}-${choice.label}`}
              onClick={() => selectChoice(choice)}
              type="button"
            >
              <span className="checkmark" aria-hidden="true" />
              <span>{choice.label}</span>
            </button>
          ))}
        </div>

        <div className="quiz-actions">
          <button className="ghost-button" disabled={step === 0} onClick={goBack} type="button">
            이전
          </button>
          <div className="answer-dots" aria-label={`${answers.length}개 답변 완료`}>
            {questions.map((question, index) => (
              <i className={index < answers.length ? "filled" : ""} key={question.title} />
            ))}
          </div>
        </div>
        {step === 3 && <AdBanner label="검사 중간 배너" />}
      </section>
    </main>
  );
}
