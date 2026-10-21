
import React from "react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  imagen: "/portada.png",

  novia: "Karla",
  novio: "Aarón",

  fecha: "21 de noviembre de 2026",

  // POSICIÓN DE LA FOTOGRAFÍA
  posicionMovil: "center center",
  posicionDesktop: "center center",
};

// ==========================================
// COMPONENTE PORTADA
// ==========================================

export default function Portada() {
  return (
    <section
      className="
        relative
        isolate
        h-[100svh]
        min-h-[500px]
        w-full
        overflow-hidden
        bg-[#101820]
      "
    >
      {/* ======================================
          IMAGEN ORIGINAL
          SIN FILTROS NI CAPAS
      ====================================== */}

      <img
        src={CONFIG.imagen}
        alt="Karla y Aarón"
        fetchPriority="high"
        className="
          absolute
          inset-0
          h-full
          w-full
          object-cover
        "
        style={{
          objectPosition: CONFIG.posicionMovil,
        }}
      />

      {/* AJUSTE DE IMAGEN EN COMPUTADORA */}

      <style>
        {`
          @media (min-width: 768px) {
            .portada-imagen-wedly {
              object-position: ${CONFIG.posicionDesktop} !important;
            }
          }
        `}
      </style>

      {/* ======================================
          CONTENIDO SUPERIOR
      ====================================== */}

      <div
        className="
          absolute
          inset-x-0
          top-0
          z-10
          flex
          flex-col
          items-center
          px-4
          pt-[max(12px,env(safe-area-inset-top))]
          text-center
          md:pt-3
        "
      >
        {/* ESTRELLA DECORATIVA */}

        <div
          className="
            mb-1
            flex
            items-center
            justify-center
            gap-3
            text-[#E6D4B4]
            md:mb-1
          "
          aria-hidden="true"
        >
          <span className="h-px w-8 bg-current opacity-70" />

          <span className="text-sm leading-none">
            ✦
          </span>

          <span className="h-px w-8 bg-current opacity-70" />
        </div>

        {/* NUESTRA BODA */}

        <p
          className="
            mb-1
            font-serif
            text-[9px]
            uppercase
            tracking-[0.35em]
            text-[#F4EDE1]
            md:text-[10px]
          "
        >
          Nuestra boda
        </p>

        {/* ======================================
            NOMBRES
            MÓVIL: VERTICALES
            DESKTOP: HORIZONTALES
        ====================================== */}

        <h1
          className="
            flex
            flex-col
            items-center
            justify-center
            font-cursiveDancing
            font-normal
            leading-[0.95]
            text-[#F5E8D3]
            md:flex-row
            md:gap-4
            md:leading-none
          "
        >
          {/* NOVIA */}

          <span
            className="
              text-[46px]
              sm:text-[54px]
              md:text-[48px]
              lg:text-[56px]
              xl:text-[62px]
            "
          >
            {CONFIG.novia}
          </span>

          {/* & */}

          <span
            className="
              my-0.5
              font-serif
              text-[19px]
              italic
              text-[#D8B982]
              md:my-0
              md:text-[23px]
            "
          >
            &
          </span>

          {/* NOVIO */}

          <span
            className="
              text-[46px]
              sm:text-[54px]
              md:text-[48px]
              lg:text-[56px]
              xl:text-[62px]
            "
          >
            {CONFIG.novio}
          </span>
        </h1>

        {/* DIVISOR */}

        <div
          className="
            my-2
            flex
            items-center
            justify-center
            gap-3
            text-[#D8B982]
            md:my-1.5
          "
          aria-hidden="true"
        >
          <span className="h-px w-9 bg-current opacity-70" />

          <span className="text-[10px]">
            ✧
          </span>

          <span className="h-px w-9 bg-current opacity-70" />
        </div>

        {/* FECHA */}

        <p
          className="
            font-serif
            text-[11px]
            uppercase
            tracking-[0.12em]
            text-[#F4EDE1]
            sm:text-[12px]
            md:text-[12px]
            lg:text-[13px]
            md:tracking-[0.22em]
          "
        >
          {CONFIG.fecha}
        </p>
      </div>
    </section>
  );
}
