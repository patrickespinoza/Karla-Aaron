
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
// ESTRELLAS DECORATIVAS
// ==========================================

const ESTRELLAS = [
  { x: 9, y: 12, size: 2, delay: 0 },
  { x: 24, y: 8, size: 1, delay: 1 },
  { x: 81, y: 11, size: 2, delay: 0.6 },
  { x: 92, y: 29, size: 1, delay: 1.8 },
  { x: 14, y: 37, size: 1, delay: 2 },
  { x: 85, y: 48, size: 2, delay: 0.9 },
  { x: 7, y: 72, size: 2, delay: 1.2 },
  { x: 91, y: 81, size: 1, delay: 0.3 },
  { x: 28, y: 91, size: 2, delay: 1.7 },
  { x: 73, y: 94, size: 1, delay: 2.4 },
  { x: 54, y: 6, size: 1, delay: 1.4 },
  { x: 48, y: 96, size: 2, delay: 0.7 },
];

function CieloEstrellado() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {ESTRELLAS.map((estrella, index) => (
        <motion.span
          key={index}
          className="absolute rounded-full bg-[#F4E8CD]"
          style={{
            left: `${estrella.x}%`,
            top: `${estrella.y}%`,
            width: estrella.size,
            height: estrella.size,
          }}
          animate={{
            opacity: [0.25, 0.95, 0.25],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: 3.5 + (index % 3),
            delay: estrella.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* CONSTELACIÓN SUPERIOR */}
      <svg
        viewBox="0 0 320 180"
        className="absolute left-0 top-0 w-full opacity-35"
        fill="none"
      >
        <path
          d="M12 66 L68 30 L115 78 L176 43 L224 92 L307 35"
          stroke="#C6AA79"
          strokeWidth="0.65"
          strokeDasharray="3 6"
        />
        {[ [12,66], [68,30], [115,78], [176,43], [224,92], [307,35] ].map(
          ([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r="2"
              fill="#E8D4AC"
            />
          )
        )}
      </svg>

      {/* CONSTELACIÓN INFERIOR */}
      <svg
        viewBox="0 0 320 130"
        className="absolute bottom-0 right-0 w-full opacity-25"
        fill="none"
      >
        <path
          d="M8 110 L72 63 L129 91 L185 35 L248 67 L311 12"
          stroke="#C6AA79"
          strokeWidth="0.65"
          strokeDasharray="3 6"
        />
        {[ [8,110], [72,63], [129,91], [185,35], [248,67], [311,12] ].map(
          ([cx, cy], index) => (
            <circle
              key={index}
              cx={cx}
              cy={cy}
              r="2"
              fill="#E8D4AC"
            />
          )
        )}
      </svg>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Musica() {
  const audioRef = useRef(null);

  const [mostrarVentana, setMostrarVentana] = useState(true);
  const [reproduciendo, setReproduciendo] = useState(false);

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
  // FUNCIONES DE MÚSICA
  // ==========================================

  const iniciarMusica = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      await audio.play();
      setReproduciendo(true);
      setMostrarVentana(false);
    } catch (error) {
      console.warn("No se pudo reproducir la música:", error);
      setReproduciendo(false);
      setMostrarVentana(false);
    }
  };

  const continuarSinMusica = () => {
    audioRef.current?.pause();
    setReproduciendo(false);
    setMostrarVentana(false);
  };

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
      console.warn("No se pudo reproducir la música:", error);
      setReproduciendo(false);
    }
  };

  return (
    <>
      {/* AUDIO */}
      <audio ref={audioRef} loop preload="none">
        <source src={CONFIG.cancion} type="audio/mpeg" />
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
            transition={{ duration: 0.45 }}
            className="
              fixed inset-0 z-[9999]
              flex items-center justify-center
              overflow-y-auto
              bg-[#030712]/90
              px-4 py-6
              sm:px-6
            "
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="titulo-musica"
              initial={{ opacity: 0, y: 35, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.97 }}
              transition={{
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative my-auto
                w-full max-w-[440px]
                overflow-hidden
                rounded-t-[190px]
                rounded-b-[24px]
                border border-[#C6AA79]/60
                bg-[#0B1425]
                px-6 pb-9 pt-14
                text-center
                shadow-[0_25px_75px_rgba(0,0,0,0.5)]
                sm:px-10 sm:pb-11 sm:pt-16
              "
            >
              <CieloEstrellado />

              {/* MARCO INTERIOR */}
              <div
                aria-hidden="true"
                className="
                  pointer-events-none
                  absolute inset-[9px]
                  rounded-t-[180px]
                  rounded-b-[17px]
                  border border-[#C6AA79]/25
                "
              />

              <div className="relative z-10">

                {/* ORNAMENTO */}
                <div className="mb-6 flex items-center justify-center gap-4">
                  <span className="h-px w-9 bg-[#C6AA79]/65" />

                  <Star
                    size={15}
                    strokeWidth={1.2}
                    className="text-[#C6AA79]"
                  />

                  <span className="h-px w-9 bg-[#C6AA79]/65" />
                </div>

                {/* LUNA */}
                <motion.div
                  animate={{ y: [0, -7, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="
                    relative mx-auto mb-7
                    flex h-24 w-24
                    items-center justify-center
                    rounded-full
                    border border-[#C6AA79]/40
                    bg-[#14243B]
                    sm:h-28 sm:w-28
                  "
                >
                  <div
                    className="
                      absolute inset-2 rounded-full
                      border border-[#C6AA79]/20
                    "
                  />

                  <MoonStar
                    size={47}
                    strokeWidth={1}
                    className="text-[#E5CC9D]"
                  />

                  <motion.span
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="
                      absolute -right-2 top-3
                      text-[#E5CC9D]
                    "
                  >
                    ✦
                  </motion.span>
                </motion.div>

                {/* ETIQUETA */}
                <p
                  className="
                    mb-4 text-[10px]
                    uppercase tracking-[0.36em]
                    text-[#C6AA79]
                    sm:text-xs
                  "
                >
                  Una historia escrita en las estrellas
                </p>

                {/* TÍTULO */}
                <h2
                  id="titulo-musica"
                  className="
                    mx-auto max-w-[340px]
                    font-playfair
                    text-[29px] font-normal
                    leading-[1.3]
                    text-[#F4F0E7]
                    sm:text-[37px]
                  "
                >
                  {CONFIG.titulo}
                </h2>

                {/* DIVISOR */}
                <div className="my-6 flex items-center justify-center gap-3">
                  <span className="h-px w-12 bg-[#C6AA79]/50" />
                  <Sparkles
                    size={14}
                    strokeWidth={1.1}
                    className="text-[#C6AA79]"
                  />
                  <span className="h-px w-12 bg-[#C6AA79]/50" />
                </div>

                {/* DESCRIPCIÓN */}
                <p
                  className="
                    mx-auto max-w-[310px]
                    font-playfair
                    text-[13px]
                    leading-[1.9]
                    text-[#D5D9E0]
                    sm:text-[15px]
                  "
                >
                  {CONFIG.descripcion}
                </p>

                {/* PREGUNTA */}
                <p
                  className="
                    mt-6 font-playfair
                    text-sm italic
                    text-[#E0C89A]
                  "
                >
                  {CONFIG.pregunta}
                </p>

                {/* BOTONES */}
                <div className="mt-8 flex flex-col gap-3">

                  <motion.button
                    type="button"
                    onClick={iniciarMusica}
                    whileHover={{ scale: 1.025 }}
                    whileTap={{ scale: 0.975 }}
                    className="
                      flex w-full
                      items-center justify-center gap-3
                      rounded-full
                      bg-[#C6AA79]
                      px-5 py-[15px]
                      text-[13px] font-medium
                      tracking-wide
                      text-[#0B1425]
                      transition-colors
                      hover:bg-[#E1C79A]
                    "
                  >
                    <Volume2 size={18} strokeWidth={1.6} />
                    Sí, comenzar con música
                  </motion.button>

                  <motion.button
                    type="button"
                    onClick={continuarSinMusica}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="
                      flex w-full
                      items-center justify-center gap-3
                      rounded-full
                      border border-[#C6AA79]/50
                      bg-[#111E31]
                      px-5 py-[15px]
                      text-[13px]
                      tracking-wide
                      text-[#F4F0E7]
                      transition-colors
                      hover:bg-[#1B2C43]
                    "
                  >
                    <VolumeX size={18} strokeWidth={1.6} />
                    Continuar sin música
                  </motion.button>
                </div>

                {/* ORNAMENTO FINAL */}
                <div className="mt-8 flex items-center justify-center gap-4">
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
          initial={{ opacity: 0, scale: 0.75 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
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
            fixed bottom-6 right-5
            z-[9998]
            flex h-14 w-14
            items-center justify-center
            rounded-full
            border border-[#C6AA79]
            bg-[#101C2E]
            text-[#E5CC9D]
            shadow-[0_8px_28px_rgba(0,0,0,0.3)]
            transition-colors
            hover:bg-[#1B2C43]
            sm:bottom-8 sm:right-8
          "
        >
          {reproduciendo ? (
            <Volume2 size={23} strokeWidth={1.5} />
          ) : (
            <VolumeX size={23} strokeWidth={1.5} />
          )}
        </motion.button>
      )}
    </>
  );
}
