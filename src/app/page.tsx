import { Button } from "@/components/ui/button";
import { GameBackground } from "@/components/ui/background";
import { CardLevel } from "@/components/ui/card-level";
import { CardGame } from "@/components/ui/card-game";
import { ImageContainer } from "@/components/ui/image-container";
import { AnswerCard } from "@/components/ui/answer-card";
import { Notification } from "@/components/ui/notification";

export default function Home() {
  return (
    <GameBackground>
      <main className="w-full max-w-[1440px] mx-auto p-6 md:p-10 space-y-12 md:space-y-16">

        {/* Hero Section: Skala font adaptif */}
        <section className="space-y-6 text-center md:text-left">
          <div className="space-y-4">
            <h1 className="text-display2 md:text-display text-state-feature-darker text-stroke-4 md:text-stroke-8 text-stroke-white">
              Word to Pict
            </h1>
            <h2 className="text-b3-bold md:text-b2-bold text-text-strong max-w-md mx-auto md:mx-0">
              Tarik kata, pasangkan gambar, dan kumpulkan lencananya!
            </h2>
          </div>

          {/* Button Group: Grid 2 kolom di mobile, flex di tablet */}
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-3">
            <Button size="lg" variant="primary" className="w-full md:w-auto">Let's Play!</Button>
            <Button size="lg" variant="secondary" className="w-full md:w-auto">Berikutnya</Button>
            <Button size="lg" variant="neutral" className="w-full md:w-auto">Lewati</Button>
            <Button size="lg" variant="confirm" className="w-full md:w-auto">Benar!</Button>
            <Button size="lg" variant="warning" className="w-full md:w-auto">Hati-hati</Button>
            <Button size="lg" variant="error" className="w-full md:w-auto">Salah!</Button>
          </div>
        </section>

        {/* Level Selection: Grid responsive (2 kolom mobile, 3+ kolom tablet) */}
        <section className="space-y-6">
          <h2 className="text-h5-extrabold md:text-h4-extrabold text-semantic-text-strong">Pilih Level</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            <CardLevel level={1} active stars={3} />
            <CardLevel level={2} active stars={2} />
            <CardLevel level={3} active={false} unlockMessage="Reach level 2 to unlock" />
          </div>
        </section>

        {/* Menu Permainan: Full width cards di mobile, 2 kolom di tablet */}
        <section className="space-y-6">
          <h2 className="text-h5-extrabold md:text-h4-extrabold text-semantic-text-strong">Menu Permainan</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <CardGame
              title="What Time Is It?"
              description="Tebak jam berapa sekarang!"
            />
            <CardGame
              title="Vroom! Let's Ride!"
              description="Kenali alat transportasi di sekitarmu!"
            />
          </div>
        </section>

        {/* Elemen Permainan: Area interaksi sentuh (Drag & Drop area) */}
        <section className="space-y-6 pb-10">
          <h2 className="text-h5-extrabold md:text-h4-extrabold text-text-strong">Elemen Permainan</h2>
          <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-start gap-8 md:gap-10">

            {/* Item 1 */}
            <div className="flex flex-col items-center gap-5 w-full md:w-auto">
              <ImageContainer
                imageSrc="/card-game-thumb.png"
                alt="Bus"
                className="w-full max-w-[300px] aspect-video md:w-[300px]"
              />
              <AnswerCard state="default">School Bus</AnswerCard>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col items-center gap-5 w-full md:w-auto">
              <ImageContainer
                imageSrc="/card-game-thumb.png"
                alt="Bus"
                className="w-full max-w-[300px] aspect-video md:w-[300px]"
              />
              <AnswerCard state="true">School Bus</AnswerCard>
            </div>

            {/* Item 3 (Placeholder) */}
            <div className="flex flex-col items-center gap-5 w-full md:w-auto">
              <ImageContainer
                className="w-full max-w-[300px] aspect-video md:w-[300px]"
              />
              <AnswerCard state="placeholder" />
            </div>

          </div>
        </section>
        <section className="space-y-6">
          <h2 className="text-h4-extrabold text-[var(--color-neutral-950)]">Komponen Feedback</h2>
          <div className="flex flex-wrap gap-6">
            <Notification type="success" message="Excellent move, you nailed it!" />
            <Notification type="success" message="You solved it perfectly!" />
            <Notification type="warning" message="Take a deep breath and try again!" />
            <Notification type="error" message="Oops, a little mix-up!" />
          </div>
        </section>
      </main>
    </GameBackground>
  );
}