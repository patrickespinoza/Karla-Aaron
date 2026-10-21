
import React from "react";
import { motion } from "framer-motion";
import { Moon, Star, Sparkles } from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  novia: "Karla",
  novio: "Aarón",

  padresNovia: [
    "Verónica García",
    "Omar Briseño",
  ],

  padresNovio: [
    "Alicia Ojeda",
    "Ramón Hernández",
  ],

  frase:
    "Bajo el mismo cielo, nuestras historias se encontraron. Hoy, con el amor y la bendición de nuestras familias, comenzamos una nueva aventura juntos.",
};

// ==========================================
// CONFIGURACIÓN DEL CIELO ESTRELLADO
// ==========================================

// Puedes aumentar o reducir esta cantidad.
// Ejemplos:
// 100 = cielo moderado
// 180 = cielo muy estrellado
// 250 = cielo todavía más intenso

const CANTIDAD_ESTRELLAS = 180;

// Generador determinista para evitar cambios
// de posición en cada renderizado.

function numeroPseudoaleatorio(semilla) {
  const valor = Math.sin(semilla * 127.1 + 78.233) * 43758.5453;
  return valor - Math.floor(valor);
}

// ==========================================
// GENERAR ESTRELLAS
// ==========================================

const ESTRELLAS = Array.from(
  { length: CANTIDAD_ESTRELLAS },
  (_, index) => {
    const semilla = index + 1;

    const x = numeroPseudoaleatorio(semilla * 1.13) * 100;
    const y = numeroPseudoaleatorio(semilla * 2.37) * 100;

    const tamanoAleatorio =
      numeroPseudoaleatorio(semilla * 3.71);

    let tamano = 1;

    if (tamanoAleatorio > 0.93) {
      tamano = 3;
    } else if (tamanoAleatorio > 0.65) {
      tamano = 2;
    }

    const colorAleatorio =
      numeroPseudoaleatorio(semilla * 4.91);

    let color = "#F4F0E7";

    if (colorAleatorio > 0.75) {
      color = "#C6AA79";
    } else if (colorAleatorio > 0.55) {
      color = "#B5CBE0";
    }

    return {
      x,
      y,
      tamano,
      color,
      duracion:
        3 + numeroPseudoaleatorio(semilla * 5.23) * 4,
      retraso:
        numeroPseudoaleatorio(semilla * 6.47) * 5,
      opacidad:
        0.35 + numeroPseudoaleatorio(semilla * 7.89) * 0.4,
    };
  }
);

// ==========================================
// CIELO ESTRELLADO
// ==========================================

function EstrellasFondo() {
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
          ESTRELLAS PEQUEÑAS Y MEDIANAS
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
              estrella.opacidad * 0.45,
              estrella.opacidad,
              estrella.opacidad * 0.45,
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
          ESTRELLAS DESTACADAS
      ====================================== */}

      <motion.div
        className="
          absolute
          left-[12%]
          top-[14%]
          text-[#E5CC9D]
        "
        animate={{
          opacity: [0.4, 1, 0.4],
          rotate: [0, 15, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={16} strokeWidth={1} />
      </motion.div>

      <motion.div
        className="
          absolute
          right-[14%]
          top-[24%]
          text-[#F4F0E7]
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
        <Star size={13} strokeWidth={1} />
      </motion.div>

      <motion.div
        className="
          absolute
          bottom-[19%]
          left-[9%]
          text-[#C6AA79]
        "
        animate={{
          opacity: [0.3, 0.85, 0.3],
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Sparkles size={19} strokeWidth={1} />
      </motion.div>

      <motion.div
        className="
          absolute
          bottom-[11%]
          right-[17%]
          text-[#F4F0E7]
        "
        animate={{
          opacity: [0.4, 1, 0.4],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Star size={15} strokeWidth={1} />
      </motion.div>

      {/* ======================================
          CONSTELACIÓN IZQUIERDA
      ====================================== */}

      <svg
        className="
          absolute
          left-0
          top-[12%]
          w-[200px]
          opacity-40
          md:w-[350px]
        "
        viewBox="0 0 350 350"
        fill="none"
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

      {/* ======================================
          CONSTELACIÓN DERECHA
      ====================================== */}

      <svg
        className="
          absolute
          bottom-[5%]
          right-0
          w-[200px]
          opacity-35
          md:w-[350px]
        "
        viewBox="0 0 350 350"
        fill="none"
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
// TARJETA DE PADRES
// ==========================================

function TarjetaPadres({
  titulo,
  nombres,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.9,
        delay,
        ease: "easeOut",
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="
        relative
        w-full
        overflow-hidden
        rounded-t-[100px]
        rounded-b-[18px]
        border
        border-[#C6AA79]/45
        bg-[#14243A]
        px-5
        pb-10
        pt-11
        text-center
        sm:px-8
        sm:pb-12
      "
    >
      {/* MARCO INTERIOR */}

      <div
        className="
          pointer-events-none
          absolute
          inset-[7px]
          rounded-t-[94px]
          rounded-b-[12px]
          border
          border-[#C6AA79]/20
        "
      />

      <div className="relative z-10">

        {/* ESTRELLA */}

        <div className="mb-5 flex justify-center">
          <Star
            size={21}
            strokeWidth={1}
            className="text-[#D9BC89]"
          />
        </div>

        {/* TÍTULO */}

        <h3
          className="
            mb-7
            font-serif
            text-[11px]
            uppercase
            tracking-[0.22em]
            text-[#D9BC89]
            sm:text-xs
          "
        >
          {titulo}
        </h3>

        {/* NOMBRES */}

        <div className="space-y-5">
          {nombres.map((nombre, index) => (
            <React.Fragment key={nombre}>
              {index > 0 && (
                <div className="flex justify-center">
                  <span className="text-[11px] text-[#C6AA79]">
                    ✧
                  </span>
                </div>
              )}

              <p
                className="
                  font-playfair
                  text-[20px]
                  font-normal
                  leading-relaxed
                  text-[#F4F0E7]
                  sm:text-[23px]
                "
              >
                {nombre}
              </p>
            </React.Fragment>
          ))}
        </div>

        {/* ORNAMENTO INFERIOR */}

        <div className="mt-9 flex items-center justify-center gap-3">
          <span className="h-px w-9 bg-[#C6AA79]/50" />

          <span className="text-[#C6AA79]">
            ✦
          </span>

          <span className="h-px w-9 bg-[#C6AA79]/50" />
        </div>
      </div>
    </motion.div>
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
      {/* CIELO CON MUCHAS ESTRELLAS */}

      <EstrellasFondo />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-5xl
          text-center
        "
      >
        {/* ======================================
            ORNAMENTO SUPERIOR
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-7 flex items-center justify-center gap-4"
        >
          <span className="h-px w-12 bg-[#C6AA79]/65" />

          <Moon
            size={25}
            strokeWidth={1}
            className="text-[#D9BC89]"
          />

          <span className="h-px w-12 bg-[#C6AA79]/65" />
        </motion.div>


        {/* DIVISOR */}

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            my-9
            h-px
            w-28
            origin-center
            bg-[#C6AA79]
          "
        />

        {/* FRASE */}

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.9,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="
            mx-auto
            max-w-[650px]
            font-playfair
            text-[16px]
            leading-[1.9]
            text-[#D5D9E0]
            sm:text-[19px]
          "
        >
          {CONFIG.frase}
        </motion.p>

        {/* ======================================
            TÍTULO DE LOS PADRES
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
          }}
          viewport={{ once: true }}
          className="mt-16 mb-10 sm:mt-20"
        >
          <Sparkles
            size={22}
            strokeWidth={1}
            className="mx-auto mb-5 text-[#C6AA79]"
          />

          <h2
            className="
              font-playfair
              text-[24px]
              font-normal
              text-[#F4F0E7]
              sm:text-[32px]
            "
          >
            Con la bendición de nuestros padres
          </h2>

          <p
            className="
              mt-4
              font-playfair
              text-sm
              italic
              text-[#C6AA79]
            "
          >
            Las estrellas que siempre han guiado nuestro camino
          </p>
        </motion.div>

        {/* ======================================
            TARJETAS DE PADRES
        ====================================== */}

        <div
          className="
            mx-auto
            grid
            max-w-4xl
            grid-cols-1
            gap-6
            md:grid-cols-2
            md:gap-8
          "
        >
          <TarjetaPadres
            titulo="Padres de la novia"
            nombres={CONFIG.padresNovia}
            delay={0.1}
          />

          <TarjetaPadres
            titulo="Padres del novio"
            nombres={CONFIG.padresNovio}
            delay={0.25}
          />
        </div>

        {/* ======================================
            ORNAMENTO FINAL
        ====================================== */}

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 1,
            delay: 0.4,
          }}
          viewport={{ once: true }}
          className="
            mt-16
            flex
            items-center
            justify-center
            gap-4
            text-[#C6AA79]
          "
        >
          <span className="h-px w-14 bg-current opacity-50" />

          <span className="text-xl">
            ✦
          </span>

          <span className="h-px w-14 bg-current opacity-50" />
        </motion.div>
      </div>
    </section>
  );
}
