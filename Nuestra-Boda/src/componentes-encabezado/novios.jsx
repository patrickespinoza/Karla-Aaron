
import React from "react";
import { motion } from "framer-motion";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  frase:
    "Hace tiempo nuestros caminos se cruzaron para volverse uno solo. Amigos y familiares han sido testigos de esta trayectoria llena de amor y momentos mágicos. El día de hoy, tras hermosos atardeceres y bellas noches estrelladas decidimos honrar nuestra relación en compañía de las personas más importantes para nosotros...",
};

// ==========================================
// CONFIGURACIÓN DEL CIELO ESTRELLADO
// ==========================================

const CANTIDAD_ESTRELLAS = 350;

// Generador de posiciones estables

function numeroPseudoaleatorio(semilla) {
  const valor =
    Math.sin(semilla * 127.1 + 78.233) *
    43758.5453;

  return valor - Math.floor(valor);
}

// ==========================================
// GENERAR ESTRELLAS
// ==========================================

const ESTRELLAS = Array.from(
  { length: CANTIDAD_ESTRELLAS },
  (_, index) => {
    const semilla = index + 1;

    const x =
      numeroPseudoaleatorio(semilla * 1.13) * 100;

    const y =
      numeroPseudoaleatorio(semilla * 2.37) * 100;

    const variacionTamano =
      numeroPseudoaleatorio(semilla * 3.71);

    let tamano = 1;

    if (variacionTamano > 0.94) {
      tamano = 3;
    } else if (variacionTamano > 0.65) {
      tamano = 2;
    }

    const variacionColor =
      numeroPseudoaleatorio(semilla * 4.91);

    let color = "#F4F0E7";

    if (variacionColor > 0.78) {
      color = "#E5CC9D";
    } else if (variacionColor > 0.55) {
      color = "#B5CBE0";
    }

    return {
      x,
      y,
      tamano,
      color,

      duracion:
        3 +
        numeroPseudoaleatorio(
          semilla * 5.23
        ) * 4,

      retraso:
        numeroPseudoaleatorio(
          semilla * 6.47
        ) * 5,

      opacidad:
        0.4 +
        numeroPseudoaleatorio(
          semilla * 7.89
        ) * 0.5,
    };
  }
);

// ==========================================
// FONDO ESTRELLADO
// ==========================================

function CieloEstrellado() {
  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* 350 ESTRELLAS */}

      {ESTRELLAS.map((estrella, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full"
          style={{
            left: `${estrella.x}%`,
            top: `${estrella.y}%`,
            width: `${estrella.tamano}px`,
            height: `${estrella.tamano}px`,
            backgroundColor: estrella.color,
          }}
          initial={{
            opacity: estrella.opacidad,
          }}
          animate={{
            opacity: [
              estrella.opacidad * 0.4,
              estrella.opacidad,
              estrella.opacidad * 0.4,
            ],
            scale: [1, 1.25, 1],
          }}
          transition={{
            duration: estrella.duracion,
            delay: estrella.retraso,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* CONSTELACIÓN IZQUIERDA */}

      <svg
        viewBox="0 0 350 350"
        fill="none"
        className="
          absolute
          left-0
          top-[8%]
          w-[200px]
          opacity-35
          md:w-[350px]
        "
      >
        <path
          d="M10 70 L90 35 L155 105 L220 65 L310 145 L260 255"
          stroke="#C6AA79"
          strokeWidth="0.8"
          strokeDasharray="4 7"
        />

        {[
          [10, 70],
          [90, 35],
          [155, 105],
          [220, 65],
          [310, 145],
          [260, 255],
        ].map(([cx, cy], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r="3"
            fill="#E8D4AC"
          />
        ))}
      </svg>

      {/* CONSTELACIÓN DERECHA */}

      <svg
        viewBox="0 0 350 350"
        fill="none"
        className="
          absolute
          bottom-[5%]
          right-0
          w-[200px]
          opacity-35
          md:w-[350px]
        "
      >
        <path
          d="M35 230 L95 140 L175 185 L240 70 L330 110"
          stroke="#C6AA79"
          strokeWidth="0.8"
          strokeDasharray="4 7"
        />

        {[
          [35, 230],
          [95, 140],
          [175, 185],
          [240, 70],
          [330, 110],
        ].map(([cx, cy], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r="3"
            fill="#E8D4AC"
          />
        ))}
      </svg>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Novios() {
  return (
    <section
      className="
        relative
        isolate
        flex
        w-full
        min-h-[440px]
        items-center
        justify-center
        overflow-hidden
        bg-[#0B1425]
        px-6
        py-24
        sm:min-h-[500px]
        sm:px-10
        sm:py-32
      "
    >
      {/* FONDO ESTRELLADO */}

      <CieloEstrellado />

      {/* ÚNICAMENTE LA FRASE */}

      <motion.p
        initial={{
          opacity: 0,
          y: 30,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        viewport={{
          once: true,
          amount: 0.2,
        }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          relative
          z-10
          mx-auto
          max-w-[760px]
          text-center
          font-playfair
          text-[18px]
          font-normal
          leading-[2]
          text-[#F4F0E7]
          sm:text-[22px]
          sm:leading-[2.1]
          md:text-[25px]
        "
      >
        {CONFIG.frase}
      </motion.p>
    </section>
  );
}
