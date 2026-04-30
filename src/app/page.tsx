export default function Home() {
  return (
    <main className="p-10 space-y-12 bg-bg-white min-h-screen">
      <section className="space-y-6">
        <h2 className="text-h6-semibold text-neutral-400 border-b pb-2 uppercase tracking-widest">
          Typography Test
        </h2>
        <h2 className="text-h6"></h2>
        <div className="space-y-4">
          <h1 className="text-display text-state-feature-base">
            Word to Pict
          </h1>
          <h2 className="text-h1-bold text-text-strong">
            H1 Bold - Design System Loaded ✓
          </h2>
          <h3 className="text-h3-semibold text-text-sub">
            H3 Semibold - Testing Font Nunito
          </h3>
          <p className="text-b1-regular text-text-soft">
            Body B1 Regular - Ini adalah contoh teks body menggunakan variabel --font-body.
          </p>
          <p className="text-b3-medium text-text-strong">
            Body B3 Medium - Jarak antar baris (line-height) mengikuti standar Figma.
          </p>
          <span className="text-label-medium text-state-information-base bg-blue-50 px-2 py-1 rounded">
            LABEL MEDIUM
          </span>
        </div>
      </section>

      <section className="space-y-6">
        <h2 className="text-h6-semibold text-neutral-400 border-b pb-2 uppercase tracking-widest">
          Color Palette Test
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex flex-col gap-2">
            <p className="text-label-regular">Purple Base</p>
            <div className="w-full h-16 rounded-xl bg-purple-base shadow-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-label-regular">Green 400</p>
            <div className="w-full h-16 rounded-xl bg-green-400 shadow-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-label-regular">Yellow 400</p>
            <div className="w-full h-16 rounded-xl bg-yellow-400 shadow-sm" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-label-regular">Red 400</p>
            <div className="w-full h-16 rounded-xl bg-parchment-950 shadow-sm" />
          </div>
        </div>
        <div className="flex flex-wrap gap-4 pt-4">
          <div className="px-4 py-2 bg-state-success-lighter text-state-success-dark rounded-lg border border-green-200">
            Success State
          </div>
          <div className="px-4 py-2 bg-state-error-lighter text-state-error-dark rounded-lg border border-red-200">
            Error State
          </div>
        </div>
      </section>

      {/* 3. Uji Coba Animasi */}
      <section className="space-y-6">
        <h2 className="text-h6-semibold text-neutral-400 border-b pb-2 uppercase tracking-widest">
          Animation Test
        </h2>
        <button
          className="animate-pop-in text-b3-bold bg-purple-base text-white px-6 py-3 rounded-2xl hover:animate-shake"
        >
          Hover to Shake!
        </button>
      </section>
    </main>
  );
}