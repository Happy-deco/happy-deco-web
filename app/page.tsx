"use client";
import { KeyboardEvent, useEffect, useState } from "react";

const phone = "543853034509";
const base = "/happy-deco-web";
const asset = (path: string) => `${base}${path}`;
const whatsapp = `https://wa.me/${phone}?text=${encodeURIComponent("Hola Happy Deco, quiero consultar por una ambientación")}`;
const tabs = [
  { id: "inicio", label: "Inicio" },
  { id: "nosotras", label: "Nosotras" },
  { id: "propuestas", label: "Propuestas" },
  { id: "galeria", label: "Galería" },
  { id: "proceso", label: "Cómo trabajamos" },
  { id: "vidrieras", label: "Vidrieras" },
  { id: "contacto", label: "Contacto" },
] as const;
type TabId = (typeof tabs)[number]["id"];
const proposals = [
  {
    name: "Express",
    tag: "Íntima",
    image: asset("/images/ambientacion-03.jpg"),
    desc: "Una ambientación simple y cuidada, ideal para festejos íntimos y espacios pequeños.",
    meta: "Hasta 20 personas",
    items: [
      "Panel con funda temática",
      "Mesa principal y armado decorativo",
      "Globos en paleta combinada",
      "Nombre y personaje impreso",
    ],
  },
  {
    name: "Minimalista",
    tag: "Sutil",
    image: asset("/images/ambientacion-04.jpg"),
    desc: "Un único foco visual, delicado y personalizado para casas, departamentos o salones pequeños.",
    meta: "Ideal para 30 personas",
    items: [
      "Panel de fondo",
      "Mesa principal con mantel",
      "Guirnalda y globos temáticos",
      "Gráfica, nombre y número en neón",
    ],
  },
  {
    name: "Clásica",
    tag: "Completa",
    image: asset("/images/evento-real-05.jpg"),
    desc: "Una composición envolvente con más mobiliario y presencia visual.",
    meta: "Hasta 40 personas",
    items: [
      "Dos paneles con fundas",
      "Tres mesas decorativas",
      "Globos y gráfica temática",
      "Nombre y alfombra decorativa",
    ],
  },
  {
    name: "Intermedia",
    tag: "Especial",
    image: asset("/images/ambientacion-06.jpg"),
    desc: "Una puesta armoniosa para espacios medianos, con arco orgánico y distintos planos.",
    meta: "30 a 50 personas",
    items: [
      "Tres paneles",
      "Mesa principal y tres accesorias",
      "Alfombra y arco orgánico",
      "Floreros, nombre, personaje y neón",
    ],
  },
  {
    name: "Premium",
    tag: "Distinguida",
    image: asset("/images/evento-real-07.jpg"),
    desc: "Una propuesta completa y de alto impacto, pensada para celebraciones que buscan destacarse.",
    meta: "Desde 3 × 3 m",
    items: [
      "Cuatro paneles",
      "Mesa principal y cinco accesorias",
      "Arco orgánico de alto impacto",
      "Alfombra, floreros, gráfica y neón",
    ],
  },
  {
    name: "Exclusiva",
    tag: "Inolvidable",
    image: asset("/images/evento-real-08.jpg"),
    desc: "Una ambientación amplia con tarima, panel 3D e iluminación decorativa.",
    meta: "80 a 100 personas",
    items: [
      "Cuatro paneles y panel 3D",
      "Tarima y siete mesas",
      "Globos, alfombra y floreros",
      "Gráfica, neón e iluminación",
    ],
  },
  {
    name: "Escenográfica 3×3",
    tag: "Inmersiva",
    image: asset("/images/evento-real-09.jpg"),
    desc: "Una escena temática inmersiva que transforma por completo un sector del evento.",
    meta: "Armado estimado: 3 a 4 h",
    items: [
      "Telón ambientado de 3 × 3 m",
      "Panel 3D y cinco mesas",
      "Elementos inmersivos y arco orgánico",
      "Gráfica, neón e iluminación",
    ],
  },
  {
    name: "Escenográfica 6×3",
    tag: "Gran escala",
    image: asset("/images/evento-real-10.jpg"),
    desc: "Mayor desarrollo visual para eventos medianos a grandes.",
    meta: "Armado estimado: 3 a 4 h",
    items: [
      "Telón ambientado de 6 × 3 m",
      "Panel 3D y siete mesas",
      "Elementos inmersivos y arco orgánico",
      "Gráfica, neón e iluminación",
    ],
  },
  {
    name: "Escenográfica 10×3",
    tag: "Impactante",
    image: asset("/images/evento-real-11.jpg"),
    desc: "La propuesta más completa, creada para celebraciones centrales y espacios de gran escala.",
    meta: "Armado estimado: 5 a 6 h",
    items: [
      "Telón ambientado de 10 × 3 m",
      "Panel 3D y trece mesas",
      "Sector de exhibición y piso sublimado",
      "Elementos inmersivos, neón e iluminación",
    ],
  },
];
const gallery = ["05", "07", "08", "09", "10", "11"];
const process = [
  {
    n: "01",
    t: "Nos contás tu idea",
    d: "Conversamos sobre la fecha, el lugar, la temática, los colores y todo aquello que imaginás para ese momento.",
  },
  {
    n: "02",
    t: "Creamos el concepto",
    d: "Definimos una propuesta visual con paleta, composición, volúmenes y detalles personalizados para que todo tenga armonía.",
  },
  {
    n: "03",
    t: "Preparamos cada detalle",
    d: "Coordinamos gráfica, globos, mobiliario y elementos decorativos para que la puesta llegue completa y cuidada.",
  },
  {
    n: "04",
    t: "Transformamos el espacio",
    d: "Montamos con orden y seguridad, ajustamos la composición al lugar real y dejamos cada ángulo listo para disfrutar y fotografiar.",
  },
  {
    n: "05",
    t: "Vos disfrutás",
    d: "Revisamos la terminación final y te entregamos un escenario pensado para emocionar, compartir y convertirse en recuerdo.",
  },
];

export default function Home() {
  const [open, setOpen] = useState<number | null>(null),
    [active, setActive] = useState<TabId>("inicio");
  useEffect(() => {
    const syncTab = () => {
      const hash = window.location.hash.slice(1) as TabId;
      if (tabs.some((t) => t.id === hash)) setActive(hash);
    };
    syncTab();
    window.addEventListener("popstate", syncTab);
    return () => window.removeEventListener("popstate", syncTab);
  }, []);
  useEffect(() => {
    const closeOnEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") setOpen(null);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, []);
  const selectTab = (id: TabId) => {
    setActive(id);
    if (window.location.hash !== `#${id}`) window.history.pushState(null, "", `#${id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const tabKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    let next = index;
    if (event.key === "ArrowRight") next = (index + 1) % tabs.length;
    if (event.key === "ArrowLeft")
      next = (index - 1 + tabs.length) % tabs.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = tabs.length - 1;
    selectTab(tabs[next].id);
    document.getElementById(`tab-${tabs[next].id}`)?.focus();
  };
  const Header = () => (
    <header className="site-header">
      <button className="logo logo-button" onClick={() => selectTab("inicio")}>
        Happy <span>Deco</span>
      </button>
      <nav className="tabs" role="tablist" aria-label="Secciones del sitio">
        {tabs.map((tab, i) => (
          <button
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={active === tab.id}
            aria-controls={`panel-${tab.id}`}
            tabIndex={active === tab.id ? 0 : -1}
            className={active === tab.id ? "active" : ""}
            onClick={() => selectTab(tab.id)}
            onKeyDown={(e) => tabKey(e, i)}
            key={tab.id}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      <a className="mini-cta" href={whatsapp} target="_blank" rel="noreferrer">
        Consultar
      </a>
    </header>
  );
  return (
    <main>
      <Header />
      {active === "inicio" && (
        <section
          id="panel-inicio"
          role="tabpanel"
          className="tab-panel home-panel"
        >
          <div className="hero">
            <div className="hero-copy">
              <p className="eyebrow">Ambientaciones con identidad</p>
              <h1>
                Magia en
                <br />
                <em>cada evento.</em>
              </h1>
              <p className="lead">
                Creamos escenarios que transforman espacios y hacen que cada
                celebración se sienta verdaderamente especial.
              </p>
              <div className="hero-actions">
                <button
                  className="button primary"
                  onClick={() => selectTab("propuestas")}
                >
                  Conocé las propuestas
                </button>
                <a
                  className="button ghost"
                  href={whatsapp}
                  target="_blank"
                  rel="noreferrer"
                >
                  Escribinos por WhatsApp
                </a>
              </div>
            </div>
            <div className="hero-collage">
              <figure className="photo-main">
                <img
                  src={asset("/images/evento-real-11.jpg")}
                  alt="Ambientación amplia en tonos pastel"
                />
              </figure>
              <figure className="photo-small">
                <img
                  src={asset("/images/evento-real-07.jpg")}
                  alt="Ambientación en tonos rosa y dorado"
                />
              </figure>
            </div>
          </div>
          <div className="promise">
            <p className="eyebrow">Lo que queremos entregarte</p>
            <h2>Más que una decoración.</h2>
            <div className="promise-grid">
              <article>
                <span>01</span>
                <h3>Tranquilidad</h3>
                <p>
                  Nos ocupamos del proceso para que vos puedas disfrutar de ese
                  día.
                </p>
              </article>
              <article>
                <span>02</span>
                <h3>Emoción</h3>
                <p>
                  Diseñamos cada escena para sorprender y hacer sentir especial
                  a quien celebra.
                </p>
              </article>
              <article>
                <span>03</span>
                <h3>Un recuerdo</h3>
                <p>
                  Creamos un marco único para las fotos y los momentos que
                  quedan para siempre.
                </p>
              </article>
            </div>
          </div>
          <div className="proposals home-proposals">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Nuestras propuestas</p>
                <h2>La escala justa<br />para tu celebración.</h2>
              </div>
              <p>Desde encuentros íntimos hasta grandes escenografías. Elegí una propuesta para conocer todo lo que incluye.</p>
            </div>
            <div className="proposal-grid">
              {proposals.map((p, i) => (
                <article className={`proposal-card c${i % 5}`} key={p.name}>
                  <div className="proposal-photo">
                    <img src={p.image} alt={`Ambientación ${p.name}`} />
                    <span>{p.tag}</span>
                  </div>
                  <div className="proposal-copy">
                    <p className="proposal-index">0{i + 1}</p>
                    <h3>{p.name}</h3><p>{p.desc}</p><small>{p.meta}</small>
                    <button onClick={() => setOpen(i)}>Ver qué incluye <b>→</b></button>
                  </div>
                </article>
              ))}
            </div>
            <div className="home-proposals-action">
              <button className="button primary" onClick={() => selectTab("propuestas")}>Abrir la solapa Propuestas</button>
            </div>
          </div>
          <div className="process home-process">
            <div className="process-intro">
              <p className="eyebrow">Cómo trabajamos</p>
              <h2>De una idea<br />a un momento<br /><span>inolvidable.</span></h2>
              <p>Te acompañamos desde la primera conversación hasta el detalle final.</p>
            </div>
            <ol>{process.map((s) => <li key={s.n}><span>{s.n}</span><div><h3>{s.t}</h3><p>{s.d}</p></div></li>)}</ol>
          </div>
        </section>
      )}
      {active === "nosotras" && (
        <section
          id="panel-nosotras"
          role="tabpanel"
          className="tab-panel story-page"
        >
          <div className="page-cover story-cover">
            <div>
              <p className="eyebrow">Nuestra historia</p>
              <h1>
                Dos miradas,
                <br />
                una misma <em>pasión.</em>
              </h1>
            </div>
            <img
              src={asset("/xime-cati-happy-deco.jpg")}
              alt="Xime y Cati, creadoras de Happy Deco"
            />
          </div>
          <div className="story-detail">
            <p className="story-lead">
              Happy Deco nació en 2022 de la mano de Xime y Cati, madre e hija,
              durante un momento familiar que las impulsó a crear algo propio.
            </p>
            <p>
              Todo comenzó con un pequeño conjunto de mobiliario y una sesión de
              fotos en el living de casa. Después llegaron las primeras
              decoraciones y una certeza que todavía guía cada trabajo: no se
              trata solamente de armar algo lindo, sino de crear un momento que
              se sienta inolvidable.
            </p>
            <p>
              El proyecto creció de forma orgánica, con aprendizaje continuo,
              trabajo en equipo y la convicción de que los detalles hacen la
              diferencia. Hoy diseñamos ambientaciones integrales con
              sensibilidad, cercanía y un estándar profesional que cuida tanto
              lo visible como aquello que hace que todo funcione.
            </p>
            <blockquote>
              “En Happy Deco no armamos decoraciones. Armamos momentos.”
            </blockquote>
            <div className="values">
              <span>Creatividad</span>
              <span>Cercanía</span>
              <span>Calidez</span>
              <span>Prolijidad</span>
              <span>Detalle</span>
            </div>
          </div>
        </section>
      )}
      {active === "propuestas" && (
        <section
          id="panel-propuestas"
          role="tabpanel"
          className="tab-panel proposals"
        >
          <div className="section-heading">
            <div>
              <p className="eyebrow">Nuestras propuestas</p>
              <h2>
                La escala justa
                <br />
                para tu celebración.
              </h2>
            </div>
            <p>
              Desde encuentros íntimos hasta grandes escenografías. Todas se
              personalizan y se adaptan al espacio.
            </p>
          </div>
          <div className="proposal-grid">
            {proposals.map((p, i) => (
              <article className={`proposal-card c${i % 5}`} key={p.name}>
                <div className="proposal-photo">
                  <img src={p.image} alt={`Ambientación ${p.name}`} />
                  <span>{p.tag}</span>
                </div>
                <div className="proposal-copy">
                  <p className="proposal-index">0{i + 1}</p>
                  <h3>{p.name}</h3>
                  <p>{p.desc}</p>
                  <small>{p.meta}</small>
                  <button onClick={() => setOpen(i)}>
                    Ver qué incluye <b>→</b>
                  </button>
                </div>
              </article>
            ))}
          </div>
          <p className="catalog-note">
            Pastelería y papelería creativa no incluidas. Las imágenes son
            ilustrativas.
          </p>
        </section>
      )}
      {active === "galeria" && (
        <section
          id="panel-galeria"
          role="tabpanel"
          className="tab-panel gallery"
        >
          <div className="gallery-head">
            <div>
              <p className="eyebrow">Momentos transformados</p>
              <h2>
                Cada evento,
                <br />
                un universo propio.
              </h2>
            </div>
            <p>
              Temáticas, colores y escalas diferentes. Una misma atención por lo
              que hace único a cada festejo.
            </p>
          </div>
          <div className="gallery-grid">
            {gallery.map((n, i) => (
              <figure className={`gallery-item g${i + 1}`} key={n}>
                <img
                  src={asset(`/images/evento-real-${n}.jpg`)}
                  alt={`Ambientación Happy Deco ${i + 1}`}
                  loading="lazy"
                />
              </figure>
            ))}
          </div>
        </section>
      )}
      {active === "proceso" && (
        <section
          id="panel-proceso"
          role="tabpanel"
          className="tab-panel process"
        >
          <div className="process-intro">
            <p className="eyebrow">Cómo trabajamos</p>
            <h2>
              De una idea
              <br />a un momento
              <br />
              <span>inolvidable.</span>
            </h2>
            <p>
              Te acompañamos desde la primera conversación hasta el detalle
              final.
            </p>
          </div>
          <ol>
            {process.map((s) => (
              <li key={s.n}>
                <span>{s.n}</span>
                <div>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}
      {active === "vidrieras" && (
        <section id="panel-vidrieras" role="tabpanel" className="tab-panel window-page">
          <div className="shop-window">
            <div className="window-image">
              <img src={asset("/images/vidriera-dia-nino.jpg")} alt="Vidriera comercial para el Día del Niño" />
            </div>
            <div className="window-copy">
              <p className="eyebrow">Ambientaciones para comercios</p>
              <h2>Vidrieras que<br />atraen miradas.</h2>
              <p>Creamos campañas estacionales para transformar vidrieras, destacar productos y conectar cada negocio con fechas especiales.</p>
              <a className="button dark" href="https://happy-deco-vidrieras.netlify.app" target="_blank" rel="noreferrer">Conocé el catálogo de vidrieras <span>↗</span></a>
            </div>
          </div>
          <div className="window-benefits">
            <article><span>01</span><h3>Diseño estacional</h3><p>Propuestas pensadas para cada fecha comercial y para la identidad de tu negocio.</p></article>
            <article><span>02</span><h3>Impacto visual</h3><p>Composiciones que atraen miradas y ayudan a destacar los productos.</p></article>
            <article><span>03</span><h3>Servicio integral</h3><p>Diseño, preparación y montaje para que el comercio esté listo a tiempo.</p></article>
          </div>
        </section>
      )}
      {active === "contacto" && (
        <section
          id="panel-contacto"
          role="tabpanel"
          className="tab-panel contact-page"
        >
          <div className="contact-card">
            <p className="eyebrow">Empecemos a imaginar</p>
            <h1>
              Tu próximo evento
              <br />
              puede sentirse <em>así.</em>
            </h1>
            <p>
              Para orientarte mejor, contanos qué celebrás, la fecha, el lugar y
              la temática o colores que imaginás.
            </p>
            <div className="brief-list">
              <span>Fecha y tipo de evento</span>
              <span>Lugar y espacio disponible</span>
              <span>Temática y colores</span>
              <span>Nombre, edad o texto especial</span>
            </div>
            <a
              className="button contact-button"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
            >
              Consultar por WhatsApp
            </a>
            <div className="contact-links">
              <a href="tel:+543853034509">385 303-4509</a>
              <a href="mailto:happydecoar@gmail.com">happydecoar@gmail.com</a>
              <a
                href="https://instagram.com/happydecoar"
                target="_blank"
                rel="noreferrer"
              >
                @happydecoar
              </a>
              <span>Santiago del Estero, Argentina</span>
            </div>
          </div>
        </section>
      )}
      <footer>
        <div className="footer-brand">
          <button
            className="logo logo-button"
            onClick={() => selectTab("inicio")}
          >
            Happy <span>Deco</span>
          </button>
          <p>Magia en cada evento.</p>
        </div>
        <div className="footer-group">
          <h2>Seguinos</h2>
          <div className="footer-links social-links">
            <a href="https://instagram.com/happydecoar" target="_blank" rel="noreferrer">Instagram ↗</a>
            <a href={whatsapp} target="_blank" rel="noreferrer">WhatsApp ↗</a>
          </div>
        </div>
        <div className="footer-group">
          <h2>Contacto</h2>
          <div className="footer-links">
            <a href="tel:+543853034509">385 303-4509</a>
            <a href="mailto:happydecoar@gmail.com">happydecoar@gmail.com</a>
            <span>Santiago del Estero, Argentina</span>
          </div>
        </div>
        <p className="footer-copy">© 2026 Happy Deco</p>
      </footer>
      <a
        className="floating-wa"
        href={whatsapp}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
      {open !== null && (
        <div className="modal-backdrop" onClick={() => setOpen(null)}>
          <section
            className="modal"
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={() => setOpen(null)} aria-label="Cerrar detalles">
              ×
            </button>
            <div className="modal-photo">
              <img src={proposals[open].image} alt="" />
            </div>
            <div className="modal-body">
              <p className="eyebrow">Propuesta Happy Deco</p>
              <h2>{proposals[open].name}</h2>
              <p>{proposals[open].desc}</p>
              <h3>Incluye</h3>
              <ul>
                {proposals[open].items.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
              <p className="modal-meta">{proposals[open].meta}</p>
              <a
                className="button primary"
                href={`https://wa.me/${phone}?text=${encodeURIComponent(`Hola Happy Deco, quiero consultar por la propuesta ${proposals[open].name}`)}`}
                target="_blank"
                rel="noreferrer"
              >
                Consultar esta propuesta
              </a>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
