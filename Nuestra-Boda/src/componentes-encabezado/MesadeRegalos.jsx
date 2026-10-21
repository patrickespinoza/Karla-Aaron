
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Gift,
  MailOpen,
  Landmark,
  Copy,
  Check,
  X,
  MoonStar,
  Sparkles,
  Heart,
  CreditCard,
  Star,
} from "lucide-react";

// ==========================================
// INFORMACIÓN EDITABLE - WEDLY
// ==========================================

const CONFIG = {
  titulo: "Mesa de regalos",

  descripcion:
    "El mejor regalo es compartir este momento contigo. Si deseas tener un detalle con nosotros, te compartimos estas opciones.",

  lluviaSobres: {
    titulo: "Lluvia de sobres",
    descripcion:
      "Si deseas obsequiarnos un detalle, el día de nuestra celebración contaremos con un espacio especial para recibirlo.",
  },

  transferencia: {
    titulo: "Transferencia bancaria",
    descripcion:
      "Si lo prefieres, también puedes hacernos llegar tu regalo mediante una transferencia bancaria.",

    // DATOS FICTICIOS - REEMPLAZAR DESPUÉS
    nombre: "Aarón Hernández Ojeda",
    banco: "BBVA",
    numero: "012180011552096841",
    concepto: "K & A",
  },
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
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

// ==========================================
// DECORACIÓN DE FONDO
// ==========================================

function DecoracionFondo() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 350 350"
        fill="none"
        className="
          absolute
          -left-20
          top-5
          w-[240px]
          opacity-30
          md:w-[350px]
        "
      >
        <circle
          cx="100"
          cy="100"
          r="90"
          stroke="#C6AA79"
          strokeWidth="0.8"
        />
        <circle
          cx="100"
          cy="100"
          r="135"
          stroke="#C6AA79"
          strokeWidth="0.8"
        />
        <circle cx="185" cy="70" r="3" fill="#C6AA79" />
      </svg>

      <svg
        viewBox="0 0 350 350"
        fill="none"
        className="
          absolute
          -bottom-24
          -right-24
          w-[260px]
          opacity-25
          md:w-[380px]
        "
      >
        <circle
          cx="200"
          cy="200"
          r="100"
          stroke="#C6AA79"
          strokeWidth="0.8"
        />
        <circle
          cx="200"
          cy="200"
          r="145"
          stroke="#C6AA79"
          strokeWidth="0.8"
        />
      </svg>

      <Star
        size={17}
        strokeWidth={1}
        className="absolute left-[15%] top-[38%] text-[#C6AA79]/50"
      />

      <Star
        size={15}
        strokeWidth={1}
        className="absolute right-[12%] top-[22%] text-[#C6AA79]/50"
      />

      <Sparkles
        size={20}
        strokeWidth={1}
        className="absolute bottom-[15%] left-[12%] text-[#C6AA79]/50"
      />
    </div>
  );
}

// ==========================================
// TARJETA DE REGALO
// ==========================================

function TarjetaRegalo({
  icono: Icono,
  titulo,
  descripcion,
  boton,
  onClick,
  delay = 0,
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -4 }}
      className="
        relative
        flex
        h-full
        w-full
        flex-col
        items-center
        overflow-hidden
        rounded-[24px]
        border
        border-[#D9C8AA]
        bg-white
        px-6
        py-11
        text-center
        shadow-[0_12px_35px_rgba(23,40,64,0.06)]
        sm:px-9
        sm:py-14
      "
    >
      {/* LÍNEA DECORATIVA SUPERIOR */}

      <div
        className="
          absolute
          left-1/2
          top-0
          h-[2px]
          w-28
          -translate-x-1/2
          bg-[#C6AA79]
        "
      />

      {/* ICONO */}

      <div
        className="
          mb-7
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          border
          border-[#C6AA79]/60
          bg-[#F4F0E7]
        "
      >
        <Icono
          size={34}
          strokeWidth={1.2}
          className="text-[#A88A57]"
        />
      </div>

      {/* TÍTULO */}

      <h3
        className="
          font-playfair
          text-[25px]
          leading-tight
          text-[#172840]
          sm:text-[30px]
        "
      >
        {titulo}
      </h3>

      {/* DIVISOR */}

      <div className="my-6 flex items-center gap-3">
        <span className="h-px w-10 bg-[#C6AA79]/70" />
        <span className="text-[#A88A57]">✦</span>
        <span className="h-px w-10 bg-[#C6AA79]/70" />
      </div>

      {/* DESCRIPCIÓN */}

      <p
        className="
          mb-8
          max-w-sm
          flex-1
          font-playfair
          text-[15px]
          leading-[1.9]
          text-[#536986]
          sm:text-[17px]
        "
      >
        {descripcion}
      </p>

      {/* BOTÓN OPCIONAL */}

      {boton && (
        <motion.button
          type="button"
          onClick={onClick}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="
            inline-flex
            min-h-[50px]
            items-center
            justify-center
            gap-3
            rounded-full
            bg-[#172840]
            px-6
            py-3
            text-[13px]
            font-medium
            tracking-wide
            text-[#F4F0E7]
            transition-colors
            hover:bg-[#253C59]
          "
        >
          <CreditCard size={17} strokeWidth={1.5} />
          {boton}
        </motion.button>
      )}

      {!boton && (
        <div className="mt-1 flex items-center gap-2 text-[#A88A57]">
          <Heart size={16} strokeWidth={1.3} />
          <span className="font-playfair text-sm italic">
            Con mucho cariño
          </span>
        </div>
      )}
    </motion.article>
  );
}

// ==========================================
// MODAL DE TRANSFERENCIA
// ==========================================

function ModalTransferencia({ abierto, onCerrar }) {
  const [copiado, setCopiado] = useState(false);

  const datos = CONFIG.transferencia;

  // Bloquear scroll al abrir
  useEffect(() => {
    if (!abierto) return;

    const scrollAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const cerrarConEscape = (event) => {
      if (event.key === "Escape") {
        onCerrar();
      }
    };

    document.addEventListener("keydown", cerrarConEscape);

    return () => {
      document.body.style.overflow = scrollAnterior;
      document.removeEventListener(
        "keydown",
        cerrarConEscape
      );
    };
  }, [abierto, onCerrar]);

  // Restablecer mensaje de copiado
  useEffect(() => {
    if (!abierto) {
      setCopiado(false);
    }
  }, [abierto]);

  const copiarNumero = async () => {
    try {
      await navigator.clipboard.writeText(datos.numero);
      setCopiado(true);
    } catch (error) {
      console.error(
        "No se pudo copiar el número:",
        error
      );

      // Respaldo para navegadores antiguos
      try {
        const input = document.createElement("textarea");
        input.value = datos.numero;
        input.style.position = "fixed";
        input.style.opacity = "0";

        document.body.appendChild(input);
        input.select();

        const resultado = document.execCommand("copy");
        document.body.removeChild(input);

        if (resultado) {
          setCopiado(true);
        }
      } catch (errorRespaldo) {
        console.error(
          "Error al copiar:",
          errorRespaldo
        );
      }
    }
  };

  return (
    <AnimatePresence>
      {abierto && (
        <motion.div
          key="modal-transferencia"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="
            fixed
            inset-0
            z-[9999]
            flex
            items-center
            justify-center
            bg-[#080E1C]/90
            px-4
            py-5
          "
          onClick={onCerrar}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 20,
              scale: 0.97,
            }}
            transition={{
              duration: 0.35,
              ease: "easeOut",
            }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="titulo-transferencia"
            onClick={(event) => event.stopPropagation()}
            className="
              relative
              max-h-[90dvh]
              w-full
              max-w-[480px]
              overflow-y-auto
              rounded-[24px]
              border
              border-[#C6AA79]/65
              bg-[#F4F0E7]
              px-5
              pb-8
              pt-12
              text-center
              shadow-[0_20px_70px_rgba(0,0,0,0.25)]
              sm:px-9
              sm:pb-10
            "
          >
            {/* CERRAR */}

            <button
              type="button"
              onClick={onCerrar}
              aria-label="Cerrar datos de transferencia"
              className="
                absolute
                right-4
                top-4
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-full
                border
                border-[#C6AA79]/50
                text-[#172840]
                transition-colors
                hover:bg-[#E9DFC9]
              "
            >
              <X size={19} />
            </button>

            {/* ORNAMENTO */}

            <MoonStar
              size={34}
              strokeWidth={1.1}
              className="mx-auto mb-5 text-[#A88A57]"
            />

            <p
              className="
                mb-3
                text-[10px]
                uppercase
                tracking-[0.28em]
                text-[#8C7148]
              "
            >
              Un detalle con cariño
            </p>

            <h3
              id="titulo-transferencia"
              className="
                font-playfair
                text-[27px]
                text-[#172840]
                sm:text-[32px]
              "
            >
              Datos de transferencia
            </h3>

            <div className="my-6 flex items-center justify-center gap-3">
              <span className="h-px w-10 bg-[#C6AA79]" />
              <Star
                size={12}
                className="text-[#A88A57]"
              />
              <span className="h-px w-10 bg-[#C6AA79]" />
            </div>

            {/* DATOS BANCARIOS */}

            <div
              className="
                rounded-[16px]
                border
                border-[#D9C8AA]
                bg-white
                px-4
                py-6
                text-left
                sm:px-6
              "
            >
              {/* NOMBRE */}

              <div className="mb-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8C7148]">
                  Nombre del titular
                </p>

                <p className="font-playfair text-[17px] text-[#172840]">
                  {datos.nombre}
                </p>
              </div>

              {/* BANCO */}

              <div className="mb-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8C7148]">
                  Banco
                </p>

                <div className="flex items-center gap-2">
                  <Landmark
                    size={18}
                    strokeWidth={1.5}
                    className="text-[#A88A57]"
                  />

                  <p className="font-playfair text-[18px] text-[#172840]">
                    {datos.banco}
                  </p>
                </div>
              </div>

              {/* NÚMERO DE CUENTA */}

              <div className="mb-6">
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8C7148]">
                  Número de cuenta / CLABE
                </p>

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-2
                    rounded-[12px]
                    border
                    border-[#D9C8AA]
                    bg-[#F4F0E7]
                    p-3
                  "
                >
                  <span
                    className="
                      min-w-0
                      break-all
                      font-mono
                      text-[13px]
                      tracking-[0.04em]
                      text-[#172840]
                      sm:text-[15px]
                    "
                  >
                    {datos.numero}
                  </span>

                  <button
                    type="button"
                    onClick={copiarNumero}
                    aria-label="Copiar número de cuenta"
                    title="Copiar número"
                    className="
                      flex
                      h-9
                      w-9
                      shrink-0
                      items-center
                      justify-center
                      rounded-lg
                      bg-[#172840]
                      text-white
                      transition-colors
                      hover:bg-[#253C59]
                    "
                  >
                    {copiado ? (
                      <Check size={17} />
                    ) : (
                      <Copy size={17} />
                    )}
                  </button>
                </div>

                <p
                  role="status"
                  aria-live="polite"
                  className="
                    mt-2
                    min-h-[18px]
                    text-xs
                    text-[#536986]
                  "
                >
                  {copiado
                    ? "¡Número copiado!"
                    : "Toca el ícono para copiar"}
                </p>
              </div>

              {/* CONCEPTO */}

              <div>
                <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-[#8C7148]">
                  Concepto de transferencia
                </p>

                <p
                  className="
                    font-playfair
                    text-[21px]
                    text-[#172840]
                  "
                >
                  {datos.concepto}
                </p>
              </div>
            </div>

            {/* MENSAJE FINAL */}

            <p
              className="
                mt-6
                font-playfair
                text-[15px]
                italic
                leading-relaxed
                text-[#536986]
              "
            >
              Gracias por acompañarnos y ser parte
              de nuestra historia.
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ==========================================
// COMPONENTE PRINCIPAL
// ==========================================

export default function MesadeRegalos() {
  const [modalAbierto, setModalAbierto] =
    useState(false);

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
      <DecoracionFondo />

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-5xl
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
          className="mb-14 text-center"
        >
          <div className="mb-6 flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-[#A88A57]/70" />

            <Gift
              size={23}
              strokeWidth={1.2}
              className="text-[#A88A57]"
            />

            <span className="h-px w-12 bg-[#A88A57]/70" />
          </div>

          <p
            className="
              mb-4
              text-[10px]
              uppercase
              tracking-[0.35em]
              text-[#8C7148]
              sm:text-xs
            "
          >
            Un detalle especial
          </p>

          <h2
            className="
              font-playfair
              text-[36px]
              font-normal
              text-[#172840]
              sm:text-[48px]
            "
          >
            {CONFIG.titulo}
          </h2>

          <div className="mx-auto my-7 h-px w-20 bg-[#C6AA79]" />

          <p
            className="
              mx-auto
              max-w-[650px]
              font-playfair
              text-[16px]
              leading-[1.9]
              text-[#536986]
              sm:text-[19px]
            "
          >
            {CONFIG.descripcion}
          </p>
        </motion.div>

        {/* ======================================
            OPCIONES DE REGALO
        ====================================== */}

        <div
          className="
            grid
            grid-cols-1
            items-stretch
            gap-7
            md:grid-cols-2
          "
        >
          {/* LLUVIA DE SOBRES */}

          <TarjetaRegalo
            icono={MailOpen}
            titulo={CONFIG.lluviaSobres.titulo}
            descripcion={CONFIG.lluviaSobres.descripcion}
            delay={0.1}
          />

          {/* TRANSFERENCIA */}

          <TarjetaRegalo
            icono={Landmark}
            titulo={CONFIG.transferencia.titulo}
            descripcion={CONFIG.transferencia.descripcion}
            boton="Ver datos de transferencia"
            onClick={() => setModalAbierto(true)}
            delay={0.25}
          />
        </div>

        {/* ======================================
            FRASE INFERIOR
        ====================================== */}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Sparkles
            size={22}
            strokeWidth={1.2}
            className="mx-auto mb-5 text-[#A88A57]"
          />

          <p
            className="
              font-playfair
              text-[17px]
              italic
              text-[#536986]
              sm:text-[20px]
            "
          >
            Su presencia es el regalo más valioso
            para nosotros.
          </p>
        </motion.div>
      </div>

      {/* ======================================
          MODAL DE TRANSFERENCIA
      ====================================== */}

      <ModalTransferencia
        abierto={modalAbierto}
        onCerrar={() => setModalAbierto(false)}
      />
    </section>
  );
}
