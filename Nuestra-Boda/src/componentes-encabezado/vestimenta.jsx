
import React from "react";
import { motion } from "framer-motion";
import {
  MoonStar,
  Sparkles,
  Star,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  titulo: "Código de vestimenta",
  vestimenta: "Casual elegante",
  colores: "Colores oscuros",

  frase:
    "Una noche especial, bajo un cielo lleno de estrellas.",
};

// ==========================================
// CONFIGURACIÓN DE ESTRELLAS
// ==========================================

// Modifica este número para cambiar
// la cantidad de estrellas del fondo.
//
// 180 = Bastantes estrellas
// 350 = Cielo muy tupido
// 500 = Cielo extremadamente estrellado

const CANTIDAD_ESTRELLAS = 350;

// Generador de posiciones estables.
// Evita que las estrellas cambien de lugar
// cada vez que React actualiza el componente.

function numeroPseudoaleatorio(semilla) {
  const valor =
    Math.sin(semilla * 127.1 + 78.233) *
    43758.5453;

  return valor - Math.floor(valor);
}

// ==========================================
// GENERAR CIELO ESTRELLADO
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
        ) *
          4,

      retraso:
        numeroPseudoaleatorio(
          semilla * 6.47
        ) *
        5,

      opacidad:
        0.4 +
        numeroPseudoaleatorio(
          semilla * 7.89
        ) *
          0.5,
    };
  }
);

// ==========================================
// ANIMACIONES DE ENTRADA
// ==========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 35,
  },

  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// FONDO ESTRELLADO Y CONSTELACIONES
// ==========================================

function Constelaciones() {
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
      {/* ======================================
          350 ESTRELLAS DISTRIBUIDAS
      ====================================== */}

      {ESTRELLAS.map((estrella, index) => (
        <motion.span
          key={index}
          className="
            absolute
            rounded-full
          "
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

      {/* ======================================
          CONSTELACIÓN SUPERIOR
      ====================================== */}

      <svg
        viewBox="0 0 350 250"
        fill="none"
        className="
          absolute
          -left-10
          top-0
          w-[230px]
          opacity-40
          sm:w-[350px]
        "
      >
        <path
          d="M10 80 L95 35 L165 110 L245 60 L330 145"
          stroke="#E5CC9D"
          strokeWidth="0.8"
          strokeDasharray="4 7"
        />

        {[
          [10, 80],
          [95, 35],
          [165, 110],
          [245, 60],
          [330, 145],
        ].map(([cx, cy], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r="3"
            fill="#E5CC9D"
          />
        ))}
      </svg>

      {/* ======================================
          CONSTELACIÓN INFERIOR
      ====================================== */}

      <svg
        viewBox="0 0 350 250"
        fill="none"
        className="
          absolute
          -bottom-5
          -right-10
          w-[230px]
          opacity-35
          sm:w-[350px]
        "
      >
        <path
          d="M20 180 L95 105 L175 145 L250 55 L335 100"
          stroke="#E5CC9D"
          strokeWidth="0.8"
          strokeDasharray="4 7"
        />

        {[
          [20, 180],
          [95, 105],
          [175, 145],
          [250, 55],
          [335, 100],
        ].map(([cx, cy], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r="3"
            fill="#E5CC9D"
          />
        ))}
      </svg>

      {/* ======================================
          ESTRELLAS DESTACADAS
      ====================================== */}

      <motion.div
        className="
          absolute
          left-[12%]
          top-[38%]
          text-[#E5CC9D]
        "
        animate={{
          opacity: [0.3, 1, 0.3],
          rotate: [0, 12, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star
          size={16}
          strokeWidth={1}
        />
      </motion.div>

      <motion.div
        className="
          absolute
          right-[11%]
          top-[25%]
          text-[#E5CC9D]
        "
        animate={{
          opacity: [0.3, 0.9, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star
          size={20}
          strokeWidth={1}
        />
      </motion.div>

      <motion.div
        className="
          absolute
          bottom-[20%]
          left-[18%]
          text-[#F4F0E7]
        "
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles
          size={18}
          strokeWidth={1}
        />
      </motion.div>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Vestimenta() {
  return (
    <section
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#0B1425]
        px-5
        py-20
        sm:px-8
        sm:py-28
        lg:py-32
      "
    >
      {/* CIELO MUY ESTRELLADO */}

      <Constelaciones />

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-4xl
          flex-col
          items-center
          text-center
        "
      >
        {/* ======================================
            ORNAMENTO SUPERIOR
        ====================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mb-6
            flex
            items-center
            justify-center
            gap-4
          "
        >
          <span className="h-px w-12 bg-[#E5CC9D]/70" />

          <MoonStar
            size={24}
            strokeWidth={1.1}
            className="text-[#E5CC9D]"
          />

          <span className="h-px w-12 bg-[#E5CC9D]/70" />
        </motion.div>

        {/* ======================================
            TÍTULO
        ====================================== */}

        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mb-12
            font-playfair
            text-[34px]
            font-normal
            leading-tight
            text-[#F4F0E7]
            sm:text-[44px]
            md:text-[50px]
          "
        >
          {CONFIG.titulo}
        </motion.h2>

        {/* ======================================
            TARJETA CENTRAL
        ====================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="
            relative
            w-full
            max-w-[620px]
            overflow-hidden
            rounded-t-[110px]
            rounded-b-[22px]
            border
            border-[#C6AA79]/60
            bg-[#14243A]
            px-6
            pb-12
            pt-14
            sm:px-12
            sm:pb-16
            sm:pt-16
          "
        >
          {/* MARCO INTERIOR */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[8px]
              rounded-t-[102px]
              rounded-b-[15px]
              border
              border-[#C6AA79]/25
            "
          />

          <div className="relative z-10">

            {/* ICONO */}

            <motion.div
              animate={{
                y: [0, -5, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
                mx-auto
                mb-8
                flex
                h-20
                w-20
                items-center
                justify-center
                rounded-full
                border
                border-[#C6AA79]/50
                bg-[#1B2E47]
              "
            >
              <Sparkles
                size={36}
                strokeWidth={1.1}
                className="text-[#E5CC9D]"
              />
            </motion.div>

            {/* ======================================
                VESTIMENTA
            ====================================== */}

            <h3
              className="
                font-playfair
                text-[32px]
                font-normal
                leading-tight
                text-[#F4F0E7]
                sm:text-[43px]
              "
            >
              {CONFIG.vestimenta}
            </h3>

            {/* DIVISOR */}

            <div
              className="
                my-8
                flex
                items-center
                justify-center
                gap-4
              "
            >
              <span className="h-px w-12 bg-[#C6AA79]/60" />

              <Star
                size={13}
                strokeWidth={1.1}
                className="text-[#C6AA79]"
              />

              <span className="h-px w-12 bg-[#C6AA79]/60" />
            </div>

            {/* ======================================
                COLORES SUGERIDOS
            ====================================== */}

            <div className="flex flex-col items-center">
              <p
                className="
                  mb-3
                  text-[10px]
                  uppercase
                  tracking-[0.3em]
                  text-[#C6AA79]
                  sm:text-xs
                "
              >
                Colores sugeridos
              </p>

              <p
                className="
                  font-playfair
                  text-[23px]
                  font-normal
                  text-[#F4F0E7]
                  sm:text-[29px]
                "
              >
                {CONFIG.colores}
              </p>
            </div>

            {/* ORNAMENTO FINAL */}

            <div
              className="
                mt-10
                flex
                items-center
                justify-center
                gap-3
              "
            >
              <span className="h-px w-10 bg-[#C6AA79]/40" />

              <span className="text-[#C6AA79]">
                ✦
              </span>

              <span className="h-px w-10 bg-[#C6AA79]/40" />
            </div>
          </div>
        </motion.div>

        {/* ======================================
            FRASE FINAL
        ====================================== */}

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mx-auto
            mt-12
            max-w-lg
            font-playfair
            text-[17px]
            italic
            leading-relaxed
            text-[#F4F0E7]
            sm:text-[20px]
          "
        >
          {CONFIG.frase}
        </motion.p>
      </div>
    </section>
  );
}
