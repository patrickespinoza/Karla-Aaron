
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MoonStar,
  Star,
  Sparkles,
  Send,
  MessageCircle,
  UserRound,
  Users,
  Heart,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

// WhatsApp de confirmación
// México: 52 + número de 10 dígitos
const NUMERO_WHATSAPP = "525531906880";

const CONFIG = {
  novios: "Karla & Aarón",

  titulo: "Confirmación de asistencia",

  descripcion:
    "Nos encantará saber si podremos contar con tu presencia en este momento tan especial.",

  frase:
    "Nuestra historia será aún más especial si formas parte de ella.",
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
// DECORACIÓN DE ESTRELLAS
// ==========================================

const ESTRELLAS = [
  { x: 8, y: 12, s: 2, d: 0 },
  { x: 18, y: 28, s: 1, d: 1 },
  { x: 84, y: 9, s: 2, d: 0.5 },
  { x: 94, y: 35, s: 1, d: 2 },
  { x: 7, y: 68, s: 2, d: 1.5 },
  { x: 88, y: 78, s: 2, d: 0.8 },
  { x: 15, y: 91, s: 1, d: 2.5 },
  { x: 78, y: 94, s: 2, d: 1.3 },
];

function EstrellasFondo() {
  return (
    <div
      className="
        pointer-events-none
        absolute inset-0
        overflow-hidden
      "
      aria-hidden="true"
    >
      {ESTRELLAS.map((estrella, index) => (
        <motion.span
          key={index}
          className="
            absolute
            rounded-full
            bg-[#E5CC9D]
          "
          style={{
            left: `${estrella.x}%`,
            top: `${estrella.y}%`,
            width: estrella.s,
            height: estrella.s,
          }}
          animate={{
            opacity: [0.2, 0.85, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 4,
            delay: estrella.d,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* CONSTELACIÓN SUPERIOR */}

      <svg
        viewBox="0 0 350 250"
        fill="none"
        className="
          absolute
          -left-12
          top-8
          w-[230px]
          opacity-25
          md:w-[350px]
        "
      >
        <path
          d="M10 80 L95 35 L165 110 L245 60 L330 145"
          stroke="#C6AA79"
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
            fill="#C6AA79"
          />
        ))}
      </svg>

      {/* CONSTELACIÓN INFERIOR */}

      <svg
        viewBox="0 0 350 250"
        fill="none"
        className="
          absolute
          -bottom-10
          -right-12
          w-[230px]
          opacity-25
          md:w-[350px]
        "
      >
        <path
          d="M20 180 L95 105 L175 145 L250 55 L335 100"
          stroke="#C6AA79"
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
            fill="#C6AA79"
          />
        ))}
      </svg>
    </div>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function ConfirmacionAsistencia() {
  const [nombre, setNombre] = useState("");
  const [asistencia, setAsistencia] = useState("");
  const [invitados, setInvitados] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState("");

  // ==========================================
  // ENVIAR POR WHATSAPP
  // ==========================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !asistencia) {
      setError(
        "Por favor, escribe tu nombre y selecciona si asistirás."
      );
      return;
    }

    if (
      asistencia === "Sí asistiré" &&
      invitados !== "" &&
      (!Number.isInteger(Number(invitados)) ||
        Number(invitados) < 1)
    ) {
      setError(
        "Por favor, ingresa un número válido de invitados."
      );
      return;
    }

    setError("");

    const textoWhatsApp = [
      "🌙 *CONFIRMACIÓN DE ASISTENCIA*",
      `✨ *Boda de ${CONFIG.novios}*`,
      "",
      `👤 *Nombre:* ${nombre.trim()}`,
      `💌 *Asistencia:* ${asistencia}`,
      `👥 *Número de invitados:* ${
        asistencia === "No asistiré"
          ? "0"
          : invitados || "No especificado"
      }`,
      "",
      "💬 *Mensaje para los novios:*",
      mensaje.trim() || "Sin mensaje adicional",
      "",
      "✦ Con cariño ✦",
    ].join("\n");

    const urlWhatsApp =
      `https://wa.me/${NUMERO_WHATSAPP}` +
      `?text=${encodeURIComponent(textoWhatsApp)}`;

    // Navegar directamente evita bloqueos de ventanas
    // emergentes en algunos navegadores móviles.
    window.location.href = urlWhatsApp;
  };

  return (
    <section
      className="
        relative
        isolate
        w-full
        overflow-hidden
        bg-[#080E1C]
        px-5
        py-20
        sm:px-8
        sm:py-28
        lg:py-32
      "
    >
      <EstrellasFondo />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-3xl
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
          className="mb-12 text-center"
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
            <span className="h-px w-12 bg-[#C6AA79]/70" />

            <MoonStar
              size={25}
              strokeWidth={1.1}
              className="text-[#E5CC9D]"
            />

            <span className="h-px w-12 bg-[#C6AA79]/70" />
          </div>

          {/* ETIQUETA */}

          <p
            className="
              mb-5
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-[#C6AA79]
              sm:text-xs
            "
          >
            Nos encantaría verte
          </p>

          {/* TÍTULO */}

          <h2
            className="
              font-playfair
              text-[34px]
              font-normal
              leading-tight
              text-[#F4F0E7]
              sm:text-[46px]
              md:text-[52px]
            "
          >
            {CONFIG.titulo}
          </h2>

          {/* DIVISOR */}

          <div
            className="
              mx-auto
              my-7
              flex
              items-center
              justify-center
              gap-4
            "
          >
            <span className="h-px w-12 bg-[#C6AA79]/60" />

            <Star
              size={13}
              strokeWidth={1}
              className="text-[#C6AA79]"
            />

            <span className="h-px w-12 bg-[#C6AA79]/60" />
          </div>

          {/* DESCRIPCIÓN */}

          <p
            className="
              mx-auto
              max-w-xl
              font-playfair
              text-[16px]
              leading-[1.9]
              text-[#C7CED8]
              sm:text-[19px]
            "
          >
            {CONFIG.descripcion}
          </p>
        </motion.div>

        {/* ======================================
            TARJETA DEL FORMULARIO
        ====================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="
            relative
            overflow-hidden
            rounded-[24px]
            border
            border-[#C6AA79]/55
            bg-[#14243A]
            px-5
            py-9
            sm:px-10
            sm:py-12
          "
        >
          {/* MARCO INTERIOR */}

          <div
            className="
              pointer-events-none
              absolute
              inset-[7px]
              rounded-[18px]
              border
              border-[#C6AA79]/20
            "
          />

          <form
            onSubmit={handleSubmit}
            className="relative z-10 space-y-7"
          >
            {/* ======================================
                NOMBRE
            ====================================== */}

            <div>
              <label
                htmlFor="nombre-confirmacion"
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                  text-[12px]
                  font-medium
                  tracking-wide
                  text-[#E5CC9D]
                "
              >
                <UserRound size={16} strokeWidth={1.5} />
                Nombre y apellido
              </label>

              <input
                id="nombre-confirmacion"
                type="text"
                placeholder="Escribe tu nombre completo"
                value={nombre}
                onChange={(e) =>
                  setNombre(e.target.value)
                }
                required
                className="
                  w-full
                  rounded-xl
                  border
                  border-[#536986]/60
                  bg-[#1B2E47]
                  px-5
                  py-4
                  text-[15px]
                  text-[#F4F0E7]
                  placeholder:text-[#AAB6C5]
                  outline-none
                  transition-colors
                  focus:border-[#C6AA79]
                "
              />
            </div>

            {/* ======================================
                ASISTENCIA
            ====================================== */}

            <div>
              <p
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                  text-[12px]
                  font-medium
                  tracking-wide
                  text-[#E5CC9D]
                "
              >
                <Heart size={16} strokeWidth={1.5} />
                ¿Nos acompañarás?
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">

                {/* SÍ ASISTIRÉ */}

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setAsistencia("Sí asistiré");
                    setError("");
                  }}
                  aria-pressed={
                    asistencia === "Sí asistiré"
                  }
                  className={`
                    min-h-[54px]
                    rounded-xl
                    border
                    px-3
                    py-4
                    text-[13px]
                    font-medium
                    transition-colors
                    sm:text-[15px]
                    ${
                      asistencia === "Sí asistiré"
                        ? "border-[#C6AA79] bg-[#C6AA79] text-[#080E1C]"
                        : "border-[#536986]/60 bg-[#1B2E47] text-[#F4F0E7] hover:border-[#C6AA79]"
                    }
                  `}
                >
                  Sí asistiré
                </motion.button>

                {/* NO ASISTIRÉ */}

                <motion.button
                  type="button"
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setAsistencia("No asistiré");
                    setInvitados("");
                    setError("");
                  }}
                  aria-pressed={
                    asistencia === "No asistiré"
                  }
                  className={`
                    min-h-[54px]
                    rounded-xl
                    border
                    px-3
                    py-4
                    text-[13px]
                    font-medium
                    transition-colors
                    sm:text-[15px]
                    ${
                      asistencia === "No asistiré"
                        ? "border-[#C6AA79] bg-[#C6AA79] text-[#080E1C]"
                        : "border-[#536986]/60 bg-[#1B2E47] text-[#F4F0E7] hover:border-[#C6AA79]"
                    }
                  `}
                >
                  No asistiré
                </motion.button>
              </div>
            </div>

            {/* ======================================
                NÚMERO DE INVITADOS
            ====================================== */}

            {asistencia !== "No asistiré" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <label
                  htmlFor="invitados-confirmacion"
                  className="
                    mb-3
                    flex
                    items-center
                    gap-2
                    text-[12px]
                    font-medium
                    tracking-wide
                    text-[#E5CC9D]
                  "
                >
                  <Users size={16} strokeWidth={1.5} />
                  Número de invitados
                </label>

                <input
                  id="invitados-confirmacion"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="Cantidad de asistentes"
                  value={invitados}
                  onChange={(e) =>
                    setInvitados(e.target.value)
                  }
                  className="
                    w-full
                    rounded-xl
                    border
                    border-[#536986]/60
                    bg-[#1B2E47]
                    px-5
                    py-4
                    text-[15px]
                    text-[#F4F0E7]
                    placeholder:text-[#AAB6C5]
                    outline-none
                    transition-colors
                    focus:border-[#C6AA79]
                  "
                />
              </motion.div>
            )}

            {/* ======================================
                MENSAJE
            ====================================== */}

            <div>
              <label
                htmlFor="mensaje-confirmacion"
                className="
                  mb-3
                  flex
                  items-center
                  gap-2
                  text-[12px]
                  font-medium
                  tracking-wide
                  text-[#E5CC9D]
                "
              >
                <MessageCircle
                  size={16}
                  strokeWidth={1.5}
                />
                Mensaje para los novios
              </label>

              <textarea
                id="mensaje-confirmacion"
                placeholder="Escribe un mensaje especial..."
                value={mensaje}
                onChange={(e) =>
                  setMensaje(e.target.value)
                }
                rows={4}
                className="
                  w-full
                  resize-none
                  rounded-xl
                  border
                  border-[#536986]/60
                  bg-[#1B2E47]
                  px-5
                  py-4
                  text-[15px]
                  text-[#F4F0E7]
                  placeholder:text-[#AAB6C5]
                  outline-none
                  transition-colors
                  focus:border-[#C6AA79]
                "
              />
            </div>

            {/* ======================================
                MENSAJE DE ERROR
            ====================================== */}

            {error && (
              <p
                role="alert"
                className="
                  rounded-lg
                  border
                  border-[#C6AA79]/40
                  bg-[#1B2E47]
                  px-4
                  py-3
                  text-center
                  text-[13px]
                  text-[#E5CC9D]
                "
              >
                {error}
              </p>
            )}

            {/* ======================================
                BOTÓN WHATSAPP
            ====================================== */}

            <motion.button
              type="submit"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              className="
                flex
                min-h-[56px]
                w-full
                items-center
                justify-center
                gap-3
                rounded-xl
                bg-[#C6AA79]
                px-5
                py-4
                text-[14px]
                font-semibold
                tracking-wide
                text-[#080E1C]
                transition-colors
                hover:bg-[#D9BC89]
                sm:text-[15px]
              "
            >
              <Send size={18} strokeWidth={1.8} />

              Confirmar por WhatsApp
            </motion.button>

            {/* AVISO */}

            <p
              className="
                text-center
                text-[12px]
                leading-relaxed
                text-[#B8C4D1]
              "
            >
              Al confirmar, se abrirá WhatsApp
              con tu mensaje preparado para enviarlo.
            </p>
          </form>
        </motion.div>

        {/* ======================================
            FRASE FINAL
        ====================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 text-center"
        >
          <Sparkles
            size={23}
            strokeWidth={1.1}
            className="mx-auto mb-5 text-[#C6AA79]"
          />

          <p
            className="
              mx-auto
              max-w-xl
              font-playfair
              text-[17px]
              italic
              leading-relaxed
              text-[#F4F0E7]
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
            "
          >
            <span className="h-px w-12 bg-[#C6AA79]/60" />
            <span className="text-[#C6AA79]">✦</span>
            <span className="h-px w-12 bg-[#C6AA79]/60" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
