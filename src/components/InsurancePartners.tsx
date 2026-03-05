/**
 * Sekce „Spolupracujeme s pojišťovnami“ – horizontálně posouvající se pruh s logy.
 * Loga uložte do public/photo/pojistovny/ (vzp.png, 213rbp.png, ozp.png, zpmv.png, cpzp.png, 13bp.png).
 */

import { useState } from "react";

const INSURERS = [
  { id: "vzp", name: "Všeobecná zdravotní pojišťovna ČR", file: "vzp.png" },
  { id: "213rbp", name: "213 RBP zdravotní pojišťovna", file: "213rbp.png" },
  { id: "ozp", name: "Oborová zdravotní pojišťovna", file: "ozp.png" },
  { id: "zpmv", name: "ZP Ministerstva vnitra ČR", file: "zpmv.png" },
  { id: "cpzp", name: "Česká průmyslová zdravotní pojišťovna", file: "cpzp.png" },
];

function LogoItem({ id, name, file }: { id: string; name: string; file: string }) {
  const [failed, setFailed] = useState(false);
  const src = `/photo/pojistovny/${file}`;
  return (
    <div
      className="flex-shrink-0 w-[180px] h-[80px] flex items-center justify-center px-6 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-gray-200 transition-all"
      title={name}
    >
      {!failed ? (
        <img
          src={src}
          alt=""
          className="max-h-[56px] w-auto object-contain"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="text-gray-400 font-semibold text-sm">{id.toUpperCase()}</span>
      )}
      <span className="sr-only">{name}</span>
    </div>
  );
}

export function InsurancePartners() {
  /* 4 kopie = pruh je dlouhý i na širokých monitorech, reset o 1/4 je neviditelný */
  const duplicated = [...INSURERS, ...INSURERS, ...INSURERS, ...INSURERS];

  return (
    <section id="pojistovny" className="py-16 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6 mb-10">
        <h2 className="text-2xl md:text-3xl font-serif font-medium text-gray-900 text-center">
          Spolupracujeme s pojišťovnami
        </h2>
        <p className="text-gray-600 text-center mt-2 max-w-xl mx-auto">
          Přijímáme všechny hlavní české zdravotní pojišťovny.
        </p>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none" />

        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_80px,black_calc(100%-80px),transparent)]">
          <div className="flex gap-8 py-4 animate-scroll-insurance min-w-max">
            {duplicated.map((item, i) => (
              <LogoItem key={`${item.id}-${i}`} id={item.id} name={item.name} file={item.file} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
