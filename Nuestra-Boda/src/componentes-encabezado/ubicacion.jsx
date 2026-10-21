
import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock3,
  ArrowUpRight,
  CalendarDays,
  MoonStar,
  Star,
  Sparkles,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  fecha: {
    diaSemana: "Sábado",
    dia: "21",
    mes: "Noviembre",
    anio: "2026",
  },

  evento: {
    titulo: "Tornaboda",
    hora: "4:00 PM",
    lugar: "La Cabaña De Marcos",
    direccion: 
      "Sur 16 233, Agrícola Oriental, Iztacalco, 08500 Ciudad de México, CDMX",

    // AGREGAR AQUÍ EL ENLACE DE GOOGLE MAPS
    ubicacion: "https://maps.app.goo.gl/xYpoDs5aa8XTcUnR7",
  },

  frase:
    "El universo nos reunió, y queremos celebrarlo contigo.",
};

// ==========================================
// ANIMACIONES
// ==========================================

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// DECORACIÓN ASTRONÓMICA
// ==========================================

function DecoracionAstronomica() {
  return (
    <div
      className="
        pointer-events-none
        absolute inset-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {/* ÓRBITAS SUPERIORES */}

      <div
        className="
          absolute
          -left-32
          -top-32
          h-80
          w-80
          rounded-full
          border
          border-[#C6AA79]/20
          sm:h-[500px]
          sm:w-[500px]
        "
      />

      <div
        className="
          absolute
          -left-20
          -top-20
          h-56
          w-56
          rounded-full
          border
          border-[#C6AA79]/20
          sm:h-[380px]
          sm:w-[380px]
        "
      />

      {/* ÓRBITAS INFERIORES */}

      <div
        className="
          absolute
          -bottom-40
          -right-40
          h-80
          w-80
          rounded-full
          border
          border-[#C6AA79]/20
          sm:h-[500px]
          sm:w-[500px]
        "
      />

      <div
        className="
          absolute
          -bottom-24
          -right-24
          h-56
          w-56
          rounded-full
          border
          border-[#C6AA79]/20
          sm:h-[380px]
          sm:w-[380px]
        "
      />

      {/* ESTRELLAS */}

      <Star
        size={19}
        strokeWidth={1}
        className="
          absolute
          left-[12%]
          top-[17%]
          text-[#C6AA79]/50
        "
      />

      <Star
        size={13}
        strokeWidth={1}
        className="
          absolute
          right-[13%]
          top-[25%]
          text-[#C6AA79]/50
        "
      />

      <Sparkles
        size={20}
        strokeWidth={1}
        className="
          absolute
          bottom-[15%]
          left-[10%]
          text-[#C6AA79]/40
        "
      />

      <Star
        size={15}
        strokeWidth={1}
        className="
          absolute
          bottom-[18%]
          right-[17%]
          text-[#C6AA79]/50
        "
      />
    </div>
  );
}

// ==========================================
// TARJETA DEL EVENTO
// ==========================================

function TarjetaEvento() {
  const evento = CONFIG.evento;

  const tieneUbicacion =
    typeof evento.ubicacion === "string" &&
    /^https?:\/\/\S+$/i.test(
      evento.ubicacion.trim()
    );

  return (
    <motion.article
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      whileHover={{ y: -4 }}
      className="
        relative
        mx-auto
        w-full
        max-w-[620px]
        overflow-hidden
        rounded-t-[110px]
        rounded-b-[22px]
        border
        border-[#D8C5A4]
        bg-white
        px-6
        pb-12
        pt-14
        text-center
        shadow-[0_15px_45px_rgba(23,40,64,0.08)]
        sm:px-12
        sm:pb-14
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

        {/* ICONO LUNAR */}

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
            mx-auto
            mb-7
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-full
            border
            border-[#C6AA79]/50
            bg-[#F4F0E7]
          "
        >
          <MoonStar
            size={37}
            strokeWidth={1.1}
            className="text-[#A88A57]"
          />
        </motion.div>

        {/* TÍTULO */}

        <p
          className="
            mb-3
            text-[10px]
            uppercase
            tracking-[0.35em]
            text-[#A88A57]
            sm:text-xs
          "
        >
          Celebremos juntos
        </p>

        <h3
          className="
            font-playfair
            text-[34px]
            font-normal
            text-[#172840]
            sm:text-[44px]
          "
        >
          {evento.titulo}
        </h3>

        {/* ORNAMENTO */}

        <div
          className="
            my-7
            flex
            items-center
            justify-center
            gap-4
          "
        >
          <span className="h-px w-12 bg-[#C6AA79]/70" />

          <Star
            size={13}
            strokeWidth={1}
            className="text-[#A88A57]"
          />

          <span className="h-px w-12 bg-[#C6AA79]/70" />
        </div>

        {/* HORA */}

        <div className="flex flex-col items-center">
          <Clock3
            size={22}
            strokeWidth={1.4}
            className="mb-3 text-[#A88A57]"
          />

          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#8C7148]
            "
          >
            Hora del evento
          </p>

          <p
            className="
              mt-3
              font-playfair
              text-[28px]
              text-[#172840]
              sm:text-[32px]
            "
          >
            {evento.hora}
          </p>
        </div>

        {/* SEPARADOR */}

        <div
          className="
            mx-auto
            my-9
            h-px
            w-20
            bg-[#D8C5A4]
          "
        />

        {/* LUGAR */}

        <div className="flex flex-col items-center">
          <MapPin
            size={23}
            strokeWidth={1.4}
            className="mb-3 text-[#A88A57]"
          />

          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.3em]
              text-[#8C7148]
            "
          >
            Lugar de celebración
          </p>

          <h4
            className="
              mt-4
              max-w-md
              font-playfair
              text-[25px]
              leading-snug
              text-[#172840]
              sm:text-[31px]
            "
          >
            {evento.lugar}
          </h4>

          <p
            className="
              mx-auto
              mt-5
              max-w-[370px]
              text-[14px]
              leading-[1.9]
              text-[#536986]
              sm:text-[15px]
            "
          >
            {evento.direccion}
          </p>
        </div>

        {/* GOOGLE MAPS */}

        {tieneUbicacion ? (
          <motion.a
            href={evento.ubicacion}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="
              group
              mx-auto
              mt-10
              inline-flex
              min-h-[52px]
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#172840]
              px-8
              py-4
              text-[13px]
              font-medium
              tracking-wide
              text-white
              transition-colors
              hover:bg-[#253C59]
            "
          >
            <MapPin size={17} strokeWidth={1.6} />

            Ver ubicación

            <ArrowUpRight
              size={17}
              className="
                transition-transform
                group-hover:translate-x-1
                group-hover:-translate-y-1
              "
            />
          </motion.a>
        ) : (
          <button
            type="button"
            disabled
            title="Ubicación próximamente disponible"
            className="
              mx-auto
              mt-10
              inline-flex
              min-h-[52px]
              cursor-not-allowed
              items-center
              justify-center
              gap-3
              rounded-full
              bg-[#172840]/70
              px-8
              py-4
              text-[13px]
              font-medium
              tracking-wide
              text-white
            "
          >
            <MapPin size={17} strokeWidth={1.6} />

            Ubicación próximamente
          </button>
        )}
      </div>
    </motion.article>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function Celebracion() {
  return (
    <section
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#F4F0E7]
        px-5
        py-20
        sm:px-8
        sm:py-28
        lg:py-32
      "
    >
      <DecoracionAstronomica />

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
            ENCABEZADO
        ====================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-14"
        >
          {/* ORNAMENTO */}

          <div
            className="
              mb-7
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span className="h-px w-12 bg-[#A88A57]/70" />

            <CalendarDays
              size={20}
              strokeWidth={1.3}
              className="text-[#A88A57]"
            />

            <span className="h-px w-12 bg-[#A88A57]/70" />
          </div>

          {/* ETIQUETA */}

          <p
            className="
              text-[10px]
              font-medium
              uppercase
              tracking-[0.35em]
              text-[#8C7148]
              sm:text-xs
            "
          >
            Nuestra celebración
          </p>

          {/* TÍTULO */}

          <h2
            className="
              mx-auto
              mt-5
              max-w-3xl
              font-playfair
              text-[32px]
              font-normal
              leading-[1.25]
              text-[#172840]
              sm:text-[44px]
              md:text-[50px]
            "
          >
            Una celebración bajo las estrellas
          </h2>

          {/* ======================================
              FECHA
          ====================================== */}

          <div className="mt-11 flex flex-col items-center">

            <p
              className="
                text-[11px]
                font-medium
                uppercase
                tracking-[0.32em]
                text-[#8C7148]
                sm:text-[13px]
              "
            >
              {CONFIG.fecha.diaSemana}
            </p>

            <motion.h3
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              viewport={{ once: true }}
              className="
                mt-3
                font-playfair
                text-[76px]
                font-normal
                leading-none
                text-[#172840]
                sm:text-[96px]
                md:text-[110px]
              "
            >
              {CONFIG.fecha.dia}
            </motion.h3>

            <p
              className="
                mt-3
                font-playfair
                text-[20px]
                tracking-[0.15em]
                text-[#8C7148]
                sm:text-[24px]
              "
            >
              {CONFIG.fecha.mes} · {CONFIG.fecha.anio}
            </p>

          </div>
        </motion.div>

        {/* ======================================
            TARJETA DE UBICACIÓN
        ====================================== */}

        <TarjetaEvento />

        {/* ======================================
            MENSAJE FINAL
        ====================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="
            mx-auto
            mt-16
            max-w-xl
            text-center
          "
        >
          <Sparkles
            size={21}
            strokeWidth={1.2}
            className="
              mx-auto
              mb-5
              text-[#A88A57]
            "
          />

          <p
            className="
              font-playfair
              text-[17px]
              italic
              leading-relaxed
              text-[#536986]
              sm:text-[21px]
            "
          >
            {CONFIG.frase}
          </p>

          <div
            className="
              mt-8
              flex
              items-center
              justify-center
              gap-4
              text-[#A88A57]
            "
            aria-hidden="true"
          >
            <span className="h-px w-12 bg-current opacity-60" />

            <span className="text-lg">✦</span>

            <span className="h-px w-12 bg-current opacity-60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
