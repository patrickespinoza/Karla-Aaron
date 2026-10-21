
import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Volume2,
  VolumeX,
  MoonStar,
  Sparkles,
  Star,
} from "lucide-react";

// ==========================================
// CONFIGURACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  cancion: "/musica.mp3",
  volumen: 0.45,

  titulo: "Una melodía entre las estrellas",

  descripcion:
    "Hay canciones que nos transportan a otros universos. Elegimos una muy especial para acompañarte en este pequeño viaje hacia nuestro gran día.",

  pregunta: "¿Nos acompañas con música?",
};

// ==========================================
// CONFIGURACIÓN DE ESTRELLAS
// ==========================================

const CANTIDAD_ESTRELLAS = 350;

// Generador estable para que las estrellas
// no cambien de posición en cada renderizado.

function numeroPseudoaleatorio(semilla) {
  const valor =
    Math.sin(semilla * 127.1 + 78.233) * 43758.5453;

  return valor - Math.floor(valor);
}

// ==========================================
// GENERACIÓN DE ESTRELLAS
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
        numeroPseudoaleatorio(semilla * 5.23) * 4,

      retraso:
        numeroPseudoaleatorio(semilla * 6.47) * 5,

      opacidad:
        0.4 +
        numeroPseudoaleatorio(semilla * 7.89) * 0.5,
    };
  }
);

// ==========================================
// CIELO ESTRELLADO
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

      {/* CONSTELACIÓN SUPERIOR */}

      <svg
        viewBox="0 0 320 180"
        className="
          absolute
          left-0
          top-0
          w-full
          opacity-35
        "
        fill="none"
      >
        <path
          d="M12 66 L68 30 L115 78 L176 43 L224 92 L307 35"
          stroke="#C6AA79"
          strokeWidth="0.65"
          strokeDasharray="3 6"
        />

        {[
          [12, 66],
          [68, 30],
          [115, 78],
          [176, 43],
          [224, 92],
          [307, 35],
        ].map(([cx, cy], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r="2"
            fill="#E8D4AC"
          />
        ))}
      </svg>

      {/* CONSTELACIÓN INFERIOR */}

      <svg
        viewBox="0 0 320 130"
        className="
          absolute
          bottom-0
          right-0
          w-full
          opacity-25
        "
        fill="none"
      >
        <path
          d="M8 110 L72 63 L129 91 L185 35 L248 67 L311 12"
          stroke="#C6AA79"
          strokeWidth="0.65"
          strokeDasharray="3 6"
        />

        {[
          [8, 110],
          [72, 63],
          [129, 91],
          [185, 35],
          [248, 67],
          [311, 12],
        ].map(([cx, cy], index) => (
          <circle
            key={index}
            cx={cx}
            cy={cy}
            r="2"
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

export default function Musica() {
  const audioRef = useRef(null);

  const [mostrarVentana, setMostrarVentana] =
    useState(true);

  const [reproduciendo, setReproduciendo] =
    useState(false);

  // ==========================================
  // CONFIGURACIÓN DEL AUDIO
  // ==========================================

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = CONFIG.volumen;

    const sincronizar = () => {
      setReproduciendo(!audio.paused);
    };

    audio.addEventListener("play", sincronizar);
    audio.addEventListener("pause", sincronizar);
    audio.addEventListener("ended", sincronizar);

    return () => {
      audio.pause();

      audio.removeEventListener("play", sincronizar);
      audio.removeEventListener("pause", sincronizar);
      audio.removeEventListener("ended", sincronizar);
    };
  }, []);

  // ==========================================
  // BLOQUEAR SCROLL AL MOSTRAR EL MODAL
  // ==========================================

  useEffect(() => {
    if (!mostrarVentana) return;

    const overflowAnterior =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        overflowAnterior;
    };
  }, [mostrarVentana]);

  // ==========================================
  // INICIAR MÚSICA
  // ==========================================

  const iniciarMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      await audio.play();

      setReproduciendo(true);
      setMostrarVentana(false);
    } catch (error) {
      console.warn(
        "No se pudo reproducir la música:",
        error
      );

      setReproduciendo(false);
      setMostrarVentana(false);
    }
  };

  // ==========================================
  // CONTINUAR SIN MÚSICA
  // ==========================================

  const continuarSinMusica = () => {
    audioRef.current?.pause();

    setReproduciendo(false);
    setMostrarVentana(false);
  };

  // ==========================================
  // ALTERNAR MÚSICA
  // ==========================================

  const alternarMusica = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (!audio.paused) {
      audio.pause();
      setReproduciendo(false);
      return;
    }

    try {
      await audio.play();
      setReproduciendo(true);
    } catch (error) {
      console.warn(
        "No se pudo reproducir la música:",
        error
      );

      setReproduciendo(false);
    }
  };

  return (
    <>
      {/* ======================================
          AUDIO
      ====================================== */}

      <audio ref={audioRef} loop preload="none">
        <source
          src={CONFIG.cancion}
          type="audio/mpeg"
        />
      </audio>

      {/* ======================================
          VENTANA DE BIENVENIDA
      ====================================== */}

      <AnimatePresence>
        {mostrarVentana && (
          <motion.div
            key="modal-musica"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="
              fixed
              inset-0
              z-[9999]
              flex
              items-center
              justify-center
              overflow-hidden
              bg-[#030712]/90
              px-3
              py-3
              sm:px-6
              sm:py-6
            "
          >
            {/* ======================================
                TARJETA RESPONSIVA
            ====================================== */}

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-musica"
              initial={{
                opacity: 0,
                y: 25,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: 15,
                scale: 0.97,
              }}
              transition={{
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative
                flex
                w-full
                max-w-[440px]
                max-h-[calc(100dvh-24px)]
                flex-col
                overflow-hidden
                rounded-t-[110px]
                rounded-b-[20px]
                border
                border-[#C6AA79]/60
                bg-[#0B1425]
                text-center
                shadow-[0_25px_75px_rgba(0,0,0,0.5)]
                sm:max-h-[calc(100dvh-48px)]
                sm:rounded-t-[190px]
                sm:rounded-b-[24px]
              "
            >
              {/* CIELO DE 350 ESTRELLAS */}

              <CieloEstrellado />

              {/* MARCO INTERIOR */}

              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute
                  inset-[7px]
                  rounded-t-[103px]
                  rounded-b-[13px]
                  border
                  border-[#C6AA79]/25
                  sm:inset-[9px]
                  sm:rounded-t-[180px]
                  sm:rounded-b-[17px]
                "
              />

              {/* ======================================
                  CONTENIDO CON SCROLL INTERNO
              ====================================== */}

              <div
                className="
                  relative
                  z-10
                  min-h-0
                  w-full
                  overflow-x-hidden
                  overflow-y-auto
                  overscroll-contain
                  px-5
                  pb-5
                  pt-7
                  sm:px-10
                  sm:pb-10
                  sm:pt-14
                "
                style={{
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {/* ORNAMENTO SUPERIOR */}

                <div
                  className="
                    mb-4
                    flex
                    items-center
                    justify-center
                    gap-3
                    sm:mb-6
                  "
                >
                  <span className="h-px w-8 bg-[#C6AA79]/65" />

                  <Star
                    size={14}
                    strokeWidth={1.2}
                    className="text-[#C6AA79]"
                  />

                  <span className="h-px w-8 bg-[#C6AA79]/65" />
                </div>

                {/* ======================================
                    LUNA
                ====================================== */}

                <motion.div
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    relative
                    mx-auto
                    mb-4
                    flex
                    h-[68px]
                    w-[68px]
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-[#C6AA79]/40
                    bg-[#14243B]
                    sm:mb-7
                    sm:h-28
                    sm:w-28
                  "
                >
                  <div
                    className="
                      absolute
                      inset-2
                      rounded-full
                      border
                      border-[#C6AA79]/20
                    "
                  />

                  <MoonStar
                    size={34}
                    strokeWidth={1}
                    className="
                      text-[#E5CC9D]
                      sm:h-[47px]
                      sm:w-[47px]
                    "
                  />

                  <motion.span
                    animate={{
                      opacity: [0.3, 1, 0.3],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="
                      absolute
                      -right-2
                      top-2
                      text-[#E5CC9D]
                    "
                  >
                    ✦
                  </motion.span>
                </motion.div>

                {/* ======================================
                    ETIQUETA
                ====================================== */}

                <p
                  className="
                    mb-3
                    text-[9px]
                    uppercase
                    tracking-[0.19em]
                    text-[#C6AA79]
                    sm:mb-4
                    sm:text-xs
                    sm:tracking-[0.3em]
                  "
                >
                  Una historia escrita en las estrellas
                </p>

                {/* ======================================
                    TÍTULO
                ====================================== */}

                <h2
                  id="titulo-musica"
                  className="
                    mx-auto
                    max-w-[340px]
                    font-playfair
                    text-[23px]
                    font-normal
                    leading-[1.2]
                    text-[#F4F0E7]
                    sm:text-[37px]
                    sm:leading-[1.3]
                  "
                >
                  {CONFIG.titulo}
                </h2>

                {/* ======================================
                    DIVISOR
                ====================================== */}

                <div
                  className="
                    my-4
                    flex
                    items-center
                    justify-center
                    gap-3
                    sm:my-6
                  "
                >
                  <span className="h-px w-10 bg-[#C6AA79]/50" />

                  <Sparkles
                    size={13}
                    strokeWidth={1.1}
                    className="text-[#C6AA79]"
                  />

                  <span className="h-px w-10 bg-[#C6AA79]/50" />
                </div>

                {/* ======================================
                    DESCRIPCIÓN
                ====================================== */}

                <p
                  className="
                    mx-auto
                    max-w-[310px]
                    font-playfair
                    text-[12px]
                    leading-[1.6]
                    text-[#D5D9E0]
                    sm:text-[15px]
                    sm:leading-[1.9]
                  "
                >
                  {CONFIG.descripcion}
                </p>

                {/* ======================================
                    PREGUNTA
                ====================================== */}

                <p
                  className="
                    mt-4
                    font-playfair
                    text-[13px]
                    italic
                    text-[#E0C89A]
                    sm:mt-6
                    sm:text-sm
                  "
                >
                  {CONFIG.pregunta}
                </p>

                {/* ======================================
                    BOTONES
                ====================================== */}

                <div
                  className="
                    mt-5
                    flex
                    flex-col
                    gap-2
                    sm:mt-8
                    sm:gap-3
                  "
                >
                  {/* CON MÚSICA */}

                  <motion.button
                    type="button"
                    onClick={iniciarMusica}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      flex
                      min-h-[43px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      bg-[#C6AA79]
                      px-3
                      py-2.5
                      text-[12px]
                      font-medium
                      tracking-wide
                      text-[#0B1425]
                      transition-colors
                      hover:bg-[#E1C79A]
                      sm:min-h-[49px]
                      sm:px-5
                      sm:text-[13px]
                    "
                  >
                    <Volume2
                      size={17}
                      strokeWidth={1.6}
                      className="shrink-0"
                    />

                    Sí, comenzar con música
                  </motion.button>

                  {/* SIN MÚSICA */}

                  <motion.button
                    type="button"
                    onClick={continuarSinMusica}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      flex
                      min-h-[43px]
                      w-full
                      items-center
                      justify-center
                      gap-2
                      rounded-full
                      border
                      border-[#C6AA79]/50
                      bg-[#111E31]
                      px-3
                      py-2.5
                      text-[12px]
                      tracking-wide
                      text-[#F4F0E7]
                      transition-colors
                      hover:bg-[#1B2C43]
                      sm:min-h-[49px]
                      sm:px-5
                      sm:text-[13px]
                    "
                  >
                    <VolumeX
                      size={17}
                      strokeWidth={1.6}
                      className="shrink-0"
                    />

                    Continuar sin música
                  </motion.button>
                </div>

                {/* ======================================
                    ORNAMENTO FINAL
                ====================================== */}

                <div
                  className="
                    mt-5
                    flex
                    items-center
                    justify-center
                    gap-4
                    sm:mt-8
                  "
                >
                  <span className="h-px w-10 bg-[#C6AA79]/40" />

                  <span className="text-xs text-[#C6AA79]">
                    ✦
                  </span>

                  <span className="h-px w-10 bg-[#C6AA79]/40" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ======================================
          CONTROL FLOTANTE
      ====================================== */}

      {!mostrarVentana && (
        <motion.button
          type="button"
          onClick={alternarMusica}
          initial={{
            opacity: 0,
            scale: 0.75,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          aria-label={
            reproduciendo
              ? "Pausar música"
              : "Reproducir música"
          }
          title={
            reproduciendo
              ? "Pausar música"
              : "Reproducir música"
          }
          className="
            fixed
            bottom-5
            right-4
            z-[9998]
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            border
            border-[#C6AA79]
            bg-[#101C2E]
            text-[#E5CC9D]
            shadow-[0_8px_28px_rgba(0,0,0,0.3)]
            transition-colors
            hover:bg-[#1B2C43]
            sm:bottom-8
            sm:right-8
            sm:h-14
            sm:w-14
          "
        >
          {reproduciendo ? (
            <Volume2
              size={22}
              strokeWidth={1.5}
            />
          ) : (
            <VolumeX
              size={22}
              strokeWidth={1.5}
            />
          )}
        </motion.button>
      )}
    </>
  );
}
