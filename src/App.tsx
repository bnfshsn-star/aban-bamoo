import { FormEvent, ReactNode, useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import ResponsibleQuiz from './components/ResponsibleQuiz'
const heroImage = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1600&q=90'

type Page = 'home' | 'about' | 'map' | 'abyar' | 'events' | 'volunteer' | 'support' | 'education' | 'gallery' | 'reports' | 'dashboard'

const pages: Record<string, Page> = {
  '': 'home', home: 'home', about: 'about', map: 'map', abyar: 'abyar', events: 'events',
  volunteer: 'volunteer', support: 'support', education: 'education', gallery: 'gallery',
  reports: 'reports', dashboard: 'dashboard',
}

const img = {
  deer: 'https://images.unsplash.com/photo-1484406566174-9da000fda645?auto=format&fit=crop&w=1200&q=85',
  mountain: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85',
  water: 'https://images.unsplash.com/photo-1437482078695-73f5ca6c96e2?auto=format&fit=crop&w=1200&q=85',
  team: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=85',
  fox: 'https://images.unsplash.com/photo-1473445361085-b9a07f55608b?auto=format&fit=crop&w=1200&q=85',
  bird: 'https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1200&q=85',
  child: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?auto=format&fit=crop&w=1200&q=85',
  spring: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=85',
}

function Icon({ name, size = 22 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    drop: <path d="M12 2S5.5 9.2 5.5 14.2a6.5 6.5 0 0013 0C18.5 9.2 12 2 12 2zM9 15.5c.5 1.4 1.6 2.2 3 2.5" />,
    arrow: <path d="M5 12h14M12 5l7 7-7 7" />,
    menu: <path d="M4 7h16M4 12h16M4 17h16" />,
    close: <path d="M5 5l14 14M19 5L5 19" />,
    search: <><circle cx="11" cy="11" r="7" /><path d="M16 16l4 4" /></>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M8 3v4M16 3v4M3 10h18" /></>,
    users: <><circle cx="9" cy="8" r="3" /><circle cx="17" cy="9" r="2" /><path d="M3 20c0-4 2-7 6-7s6 3 6 7M15 14c3 0 5 2 5 5" /></>,
    check: <path d="M5 12l4 4L19 6" />,
    shield: <><path d="M12 2l8 3v6c0 5-3.5 9-8 11-4.5-2-8-6-8-11V5l8-3z" /><path d="M9 12l2 2 4-5" /></>,
    leaf: <><path d="M20 4C12 4 5 7 5 14c0 3 2 5 5 5 7 0 10-7 10-15z" /><path d="M4 21c3-6 7-9 12-12" /></>,
    pin: <><path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1116 0z" /><circle cx="12" cy="10" r="2.5" /></>,
    chart: <><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></>,
    upload: <><path d="M12 16V3M7 8l5-5 5 5" /><path d="M4 15v5h16v-5" /></>,
    plus: <path d="M12 5v14M5 12h14" />,
    info: <><circle cx="12" cy="12" r="9" /><path d="M12 11v6M12 7h.01" /></>,
    bag: <><path d="M7 7V5a5 5 0 0110 0v2M5 7h14l1 14H4L5 7z" /></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] || paths.drop}</svg>
}

function go(page: Page) {
  window.location.hash = page === 'home' ? '' : page
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const nav = [
  ['خانه', 'home'], ['معرفی آب‌بان', 'about'], ['نقشه آب', 'map'], ['کوله آب‌یار', 'abyar'],
  ['رویدادها', 'events'], ['آموزش و حیات‌وحش', 'education'], ['گالری', 'gallery'], ['گزارش‌ها', 'reports'],
] as [string, Page][]

function Header({ current }: { current: Page }) {
  const [open, setOpen] = useState(false)
  const navigate = (p: Page) => { setOpen(false); go(p) }
  return <header className="header">
    <div className="nav-wrap">
      <button className="brand" onClick={() => navigate('home')} aria-label="صفحه خانه">
        <span className="brand-mark"><Icon name="drop" size={25} /></span>
        <span><b>آب‌بان بمو</b><small>برای زندگی در بمو</small></span>
      </button>
      <nav className="desktop-nav" aria-label="ناوبری اصلی">
        {nav.map(([label, p]) => <button key={p} className={current === p ? 'active' : ''} onClick={() => navigate(p)}>{label}</button>)}
      </nav>
      <button className="btn btn-primary desktop-cta" onClick={() => navigate('volunteer')}>همراه آب‌بان شو <Icon name="arrow" size={17} /></button>
      <button className="menu-btn" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="نمایش فهرست"><Icon name={open ? 'close' : 'menu'} /></button>
    </div>
    {open && <div className="mobile-nav">
      {nav.map(([label, p]) => <button key={p} className={current === p ? 'active' : ''} onClick={() => navigate(p)}>{label}</button>)}
      <button className="btn btn-primary" onClick={() => navigate('volunteer')}>همراه آب‌بان شو</button>
    </div>}
  </header>
}

function Footer() {
  return <footer className="footer">
    <div className="footer-grid">
      <div><div className="brand footer-brand"><span className="brand-mark"><Icon name="drop" /></span><span><b>آب‌بان بمو</b><small>پیوند مردم، دانش و مسئولیت</small></span></div><p>یک نمونه مفهومی برای مشارکت مسئولانه در پایش و پشتیبانی از منابع آب حیات‌وحش پارک ملی بمو.</p></div>
      <div><h4>مسیرهای اصلی</h4><button onClick={() => go('map')}>نقشه پایش آب</button><button onClick={() => go('events')}>رویدادهای مشارکتی</button><button onClick={() => go('education')}>آموزش مسئولانه</button></div>
      <div><h4>مشارکت</h4><button onClick={() => go('volunteer')}>درخواست داوطلبی</button><button onClick={() => go('support')}>حمایت شفاف</button><button onClick={() => go('reports')}>ثبت گزارش محیطی</button></div>
      <div><h4>یادآوری مهم</h4><p>اطلاعات این نمونه نمایشی است و هیچ موقعیت حساس، مسیر عملیاتی یا آمار رسمی پارک را نمایش نمی‌دهد.</p><button className="admin-link" onClick={() => go('dashboard')}>ورود به نمای مفهومی مدیریت</button></div>
    </div>
    <div className="footer-bottom"><span>نمونه مفهومی آب‌بان بمو — 1405</span><span>طراحی‌شده با احترام به طبیعت و حریم زیستگاه - طراح و ایده پرداز بنفشه ثریانشان-هرگونه دزدی ایده و کپی برداری پیگرد قانونی دارد.</span></div>
  </footer>
}

function Button({ children, page, variant = 'primary', onClick, type = 'button' }: { children: ReactNode; page?: Page; variant?: string; onClick?: () => void; type?: 'button' | 'submit' }) {
  return <button type={type} className={`btn btn-${variant}`} onClick={onClick || (page ? () => go(page) : undefined)}>{children}</button>
}

function SectionHead({ eyebrow, title, text, light = false }: { eyebrow?: string; title: string; text?: string; light?: boolean }) {
  return <div className={`section-head ${light ? 'light' : ''}`}>{eyebrow && <span className="eyebrow"><i />{eyebrow}</span>}<h2>{title}</h2>{text && <p>{text}</p>}</div>
}

function PageHero({ eyebrow, title, text, children }: { eyebrow: string; title: string; text: string; children?: ReactNode }) {
  return <section className="page-hero"><div className="contour contour-a" /><div className="container page-hero-inner"><div><span className="eyebrow"><i />{eyebrow}</span><h1>{title}</h1><p>{text}</p>{children}</div><div className="page-drop"><Icon name="drop" size={70} /><span>آگاهی<br />مشارکت<br />شفافیت</span></div></div></section>
}

function Notice({ children }: { children: ReactNode }) {
  return <div className="notice"><Icon name="info" /><div>{children}</div></div>
}

const events = [
  { id: 1, title: 'کاروان کوله‌های آب‌یار', category: 'کاروان قطره‌ها', date: '۲۵ اردیبهشت ۱۴۰۴', duration: '۳ ساعت', capacity: '۱۸ نفر', image: img.team, text: 'آشنایی با کوله‌ها، کنترل قطعات و آماده‌سازی گروهی تجهیزات برای تحویل به تیم مجاز.', req: 'مناسب افراد بالای ۱۶ سال؛ بدون ورود به محدوده حفاظت‌شده' },
  { id: 2, title: 'کارگاه آشنایی با منابع آب', category: 'آموزش', date: '۱ خرداد ۱۴۰۴', duration: '۹۰ دقیقه', capacity: '۳۰ نفر', image: img.water, text: 'یک کارگاه کاربردی درباره نقش آبشخورها، نشانه‌های کم‌آبی و گزارش‌گری مسئولانه.', req: 'برای همه علاقه‌مندان؛ همراه با محتوای مقدماتی' },
  { id: 3, title: 'یک عکس برای بمو', category: 'رویداد فرهنگی', date: '۸ خرداد ۱۴۰۴', duration: '۲ ساعت', capacity: '۲۵ نفر', image: img.mountain, text: 'گفت‌وگو درباره عکاسی اخلاقی از طبیعت و انتخاب روایت‌های تصویری برای نمایشگاه بمو.', req: 'همراه داشتن دوربین الزامی نیست' },
  { id: 4, title: 'میز آماده‌سازی کوله', category: 'آماده‌سازی کوله', date: '۱۵ خرداد ۱۴۰۴', duration: '۲ ساعت', capacity: '۱۲ نفر', image: img.spring, text: 'بررسی مخزن‌ها، برچسب شناسایی و فهرست کنترل بهداشت تجهیزات آب‌یار.', req: 'تکمیل آموزش آنلاین پیش از حضور' },
  { id: 5, title: 'قصه‌های آب برای خانواده', category: 'فعالیت خانوادگی', date: '۲۲ خرداد ۱۴۰۴', duration: '۷۵ دقیقه', capacity: '۲۰ خانواده', image: img.child, text: 'یادگیری خانوادگی درباره چرخه آب و ساخت دفترچه مشاهده مسئولانه طبیعت.', req: 'مناسب کودکان ۷ تا ۱۲ سال همراه والدین' },
]

function EventCard({ event, onOpen }: { event: typeof events[0]; onOpen: () => void }) {
  return <article className="event-card">
    <div className="event-image"><img src={event.image} alt="" /><span>{event.category}</span></div>
    <div className="event-body"><div className="date"><Icon name="calendar" size={17} />{event.date}</div><h3>{event.title}</h3><p>{event.text}</p><button className="text-link" onClick={onOpen}>جزئیات و ثبت‌نام <Icon name="arrow" size={16} /></button></div>
  </article>
}

function Modal({ children, onClose, label }: { children: ReactNode; onClose: () => void; label: string }) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div
      className="modal-backdrop"
      onMouseDown={event => {
        if (event.target === event.currentTarget) onClose()
      }}
      role="dialog"
      aria-modal="true"
      aria-label={label}
    >
      <div className="modal">
        <button className="modal-close" onClick={onClose} aria-label="بستن">
          <Icon name="close" />
        </button>
        {children}
      </div>
    </div>,
    document.body
  )
}

function EventModal({ event, onClose }: { event: typeof events[0]; onClose: () => void }) {
  const [sent, setSent] = useState(false)
  return <Modal onClose={onClose} label={event.title}>{sent ? <Success title="درخواست شما ثبت شد" text="جزئیات تکمیلی و راهنمای آموزشی پس از بررسی از طریق پیامک ارسال می‌شود." /> : <>
    <img className="modal-hero" src={event.image} alt="" /><span className="tag">{event.category}</span><h2>{event.title}</h2>
    <div className="event-meta"><span><Icon name="calendar" size={18} />{event.date}</span><span>زمان: {event.duration}</span><span><Icon name="users" size={18} />ظرفیت: {event.capacity}</span></div>
    <p>{event.text}</p><Notice><b>شرایط مشارکت:</b> {event.req}</Notice>
    <form className="mini-form" onSubmit={e => { e.preventDefault(); setSent(true) }}><label>نام و نام خانوادگی<input required placeholder="نام شما" /></label><label>شماره تماس<input required inputMode="tel" placeholder="۰۹۱۲..." /></label><Button type="submit">ارسال درخواست ثبت‌نام</Button></form>
  </>}</Modal>
}

function Home() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null)
  return <>
    <section className="hero">
      <img src={heroImage} alt="چشم‌انداز کوهستانی الهام‌گرفته از بمو و یک آبگیر طبیعی" />
      <div className="hero-shade" /><div className="hero-flow" />
      <div className="hero-content"><span className="hero-kicker"><Icon name="leaf" size={18} /> یک مسیر مشترک برای آب و زندگی</span><h1>برای زندگی در بمو،<br /><em>آب را پاس بداریم</em></h1><p>با همراهی مردم، متخصصان و دوستداران طبیعت، به پایش و پشتیبانی مسئولانه از منابع آب حیات‌وحش بمو کمک می‌کنیم.</p><div className="hero-actions"><Button page="volunteer">مسیر مشارکت من <Icon name="arrow" size={18} /></Button><Button page="map" variant="glass">نقشه آب را ببین</Button></div></div>
      <div className="hero-note"><Icon name="shield" /><span><b>حفاظت پیش از حضور</b>اطلاعات حساس زیستگاه عمومی نمی‌شود.</span></div>
    </section>

    <section className="section intro-section"><div className="container split-intro">
      <div><SectionHead eyebrow="داستان آب‌بان" title="آب‌بان بمو چیست؟" text="یک اکوسیستم مشارکتی که دانش تخصصی، توان داوطلبانه و مدیریت مسئولانه را به هم پیوند می‌دهد؛ تا هر همراه، نقش درست و امن خود را برای آب بمو پیدا کند." /><Button page="about" variant="outline">اکوسیستم را بشناس <Icon name="arrow" size={17} /></Button></div>
      <div className="ecosystem-orbit"><div className="orbit-center"><Icon name="drop" size={34} /><b>آب‌بان</b></div>{['بموگرد', 'کوله آب‌یار', 'خانه آب‌بان', 'کاروان قطره‌ها'].map((x, i) => <span key={x} className={`orbit-item item-${i}`}>{x}</span>)}</div>
    </div></section>

    <section className="section stats-section"><div className="container"><div className="stats-head"><SectionHead eyebrow="نمایش نمونه" title="هر قطره، یک نشانه از وضعیت زیستگاه" text="اعداد زیر صرفاً داده نمایشی برای نشان‌دادن شیوه گزارش‌دهی سامانه هستند و آمار واقعی پارک نیستند." /><span className="demo-badge">داده آزمایشی</span></div><div className="stats-grid">
      {[['۲۴', 'منابع آب ثبت‌شده', 'drop'], ['۱۷', 'منابع پایش‌شده', 'check'], ['۴', 'نیازمند بررسی', 'info'], ['۳۶', 'تجهیزات آماده‌شده', 'bag']].map(([n, l, ic], i) => <div className="stat" key={l}><span className={`stat-icon s${i}`}><Icon name={ic} /></span><strong>{n}</strong><span>{l}</span><small>نمونه نمایشی</small></div>)}
    </div></div></section>

    <section className="section caravan"><div className="container caravan-grid"><div className="caravan-image"><img src={img.team} alt="گروهی در مسیر طبیعت" /><div className="image-stamp"><Icon name="drop" /><span>آموزش<br />آماده‌سازی<br />همراهی</span></div></div><div><SectionHead eyebrow="خدمت اصلی مشارکت" title="کاروان قطره‌ها" text="مسیر مشارکت از یک رویداد امن و سازمان‌یافته آغاز می‌شود. در کاروان قطره‌ها یاد می‌گیرید، تجهیزات را آماده می‌کنید و پشتیبان تیم‌هایی می‌شوید که مجوز فعالیت میدانی دارند." /><div className="step-row">{['یادگیری', 'انتخاب نقش', 'آماده‌سازی', 'گزارش شفاف'].map((s, i) => <div key={s}><b>۰{i + 1}</b><span>{s}</span></div>)}</div><Button page="events">آشنایی با کاروان قطره‌ها <Icon name="arrow" size={17} /></Button></div></div></section>

    <section className="section abyar-preview"><div className="container abyar-preview-grid"><div><SectionHead eyebrow="ابزار مسئولانه" title="کوله آب‌یار؛ همراه تیم‌های مسئول" text="یک سامانه حمل آب ماژولار با ساختار ارگونومیک، محفظه تجهیزات، شناسه QR و امکان افزودن حسگر سطح آب؛ طراحی‌شده برای آماده‌سازی دقیق و استفاده صرفاً توسط تیم‌های مجاز." light /><div className="feature-pills"><span>مخزن ماژولار</span><span>شناسه رهگیری</span><span>طراحی ارگونومیک</span></div><Button page="abyar" variant="cream">کوله آب‌یار را بشناس <Icon name="arrow" size={17} /></Button></div><Backpack /></div></section>

    <section className="section map-preview"><div className="container map-preview-grid"><div><SectionHead eyebrow="اطلاعات عمومی و امن" title="نقشه زنده پایش آب" text="یک نمای تجمیعی از وضعیت پایش، آموزش و خدمات؛ بدون نمایش مختصات، مسیر دسترسی یا جزئیات حساس حیات‌وحش." /><div className="legend"><span><i className="green" />پایش‌شده</span><span><i className="yellow" />نیازمند بررسی</span><span><i className="gray" />نامشخص</span></div><Button page="map">مشاهده نقشه <Icon name="arrow" size={17} /></Button></div><MiniMap /></div></section>

    <section className="section"><div className="container"><div className="section-title-row"><SectionHead eyebrow="تقویم مشارکت" title="رویدادهای پیش‌رو" text="از آموزش تا آماده‌سازی؛ یک قدم مناسب برای خودتان پیدا کنید." /><Button page="events" variant="outline">همه رویدادها</Button></div><div className="event-grid">{events.slice(0, 3).map(e => <EventCard key={e.id} event={e} onOpen={() => setSelectedEvent(e)} />)}</div></div></section>

    <section className="section culture"><div className="container culture-grid"><div><SectionHead eyebrow="روایت و فرهنگ" title="حفاظت فقط یک کار نیست؛ یک فرهنگ است" text="عکس‌ها، روایت محیط‌بان‌ها، نقاشی کودکان و تجربه همراهان کمک می‌کنند رابطه ما با آب و زیستگاه، از یک فعالیت مقطعی به یک عادت جمعی تبدیل شود." /><Button page="gallery" variant="outline">دیدن روایت‌های بمو</Button></div><div className="culture-collage"><img src={img.deer} alt="حیات وحش" /><img src={img.child} alt="فعالیت هنری کودکان" /><div className="quote">«هر بار که درباره آب درست حرف می‌زنیم، یک قدم از زیستگاه مراقبت کرده‌ایم.»<span>روایت نمونه از یک آموزشگر طبیعت</span></div></div></div></section>

    <section className="section support-strip"><div className="container support-grid"><div><SectionHead eyebrow="حمایت قابل پیگیری" title="حامی یک کوله آب‌یار باش" text="حمایت شما می‌تواند صرف تهیه تجهیزات، آموزش یا برگزاری رویداد شود. در این نمونه، تمام مراحل از تخصیص تا گزارش هزینه قابل مشاهده طراحی شده است." light /><Button page="support" variant="cream">مسیرهای حمایت <Icon name="arrow" size={17} /></Button></div><div className="support-options">{['تهیه تجهیزات', 'آموزش', 'رویدادها'].map((x, i) => <div key={x}><span>۰{i + 1}</span><b>حمایت از {x}</b><small>گزارش مرحله‌به‌مرحله</small></div>)}</div></div></section>

    <section className="final-cta"><div><Icon name="drop" size={45} /><h2>بمو به همراهی ما نیاز دارد</h2><p>نقشی متناسب با زمان، توان و علاقه خود پیدا کنید.</p><Button page="volunteer" variant="cream">به جمع آب‌بان‌ها بپیوند</Button></div></section>
    {selectedEvent && <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />}
  </>
}

function Backpack() {
  return <div className="backpack" aria-label="نمای مفهومی کوله آب‌یار"><div className="bag-handle" /><div className="bag-body"><div className="bag-logo"><Icon name="drop" /><b>آب‌یار</b></div><div className="bag-pocket">QR</div><div className="bag-line" /></div><div className="strap left" /><div className="strap right" /><span className="bag-label l1">مخزن ماژولار</span><span className="bag-label l2">محفظه ابزار</span><span className="bag-label l3">شناسه کوله</span></div>
}

function MiniMap() {
  return <div className="mini-map"><div className="map-lines" /><span className="map-zone">محدوده عمومی نمایش</span>{[['green', 'a'], ['yellow', 'b'], ['green', 'c'], ['gray', 'd']].map(([color, pos]) => <i className={`map-marker ${pos} ${color}`} key={pos}><Icon name="drop" size={18} /></i>)}<div className="map-card"><b>ناحیه آموزشی شمالی</b><span>آخرین وضعیت: پایش‌شده</span><small>موقعیت نمایش‌داده‌شده تقریبی است</small></div></div>
}

function About() {
  const [faq, setFaq] = useState(0)
  const ecosystem = [['آب‌بان بمو', 'بستر مرکزی اطلاعات و مشارکت'], ['بموگرد', 'تجربه شخصی کشف و یادگیری'], ['کوله آب‌یار', 'ابزار پشتیبانی تیم‌های مجاز'], ['خانه آب‌بان', 'ایستگاه آموزش و آماده‌سازی'], ['قطره سیار', 'غرفه آموزشی در شهر و دانشگاه'], ['کاروان قطره‌ها', 'رویداد جمعی و سازمان‌یافته']]
  const faqs = [['آیا داوطلبان وارد مناطق حفاظت‌شده می‌شوند؟', 'خیر. ثبت‌نام به معنی مجوز ورود نیست. فعالیت میدانی فقط با تأیید و همراهی مسئولان مجاز انجام می‌شود.'], ['چرا مکان دقیق منابع آب نمایش داده نمی‌شود؟', 'انتشار مختصات می‌تواند زیستگاه و حیات‌وحش را در معرض خطر قرار دهد؛ بنابراین فقط اطلاعات تجمیعی و آموزشی عمومی می‌شود.'], ['آیا داده‌های این وب‌سایت واقعی است؟', 'این نسخه یک نمونه مفهومی است و همه اعداد و رکوردها با برچسب نمایشی ارائه شده‌اند.']]
  return <>
    <PageHero eyebrow="معرفی آب‌بان" title="یک شبکه مراقبت، نه یک حرکت مقطعی" text="آب‌بان بمو کمک می‌کند هر فرد، سازمان و متخصص در جای درست خود قرار بگیرد؛ از یادگیری و گزارش‌گری تا آماده‌سازی تجهیزات و پایش تخصصی." />
    <section className="section"><div className="container problem-grid"><div><SectionHead eyebrow="مسئله و هدف" title="آب، پیوند پنهان همه زندگی‌های بمو" text="کاهش دسترسی پایدار به آب، خرابی تجهیزات یا آلودگی یک منبع می‌تواند بر کل زیستگاه اثر بگذارد. اما مداخله بدون دانش هم ممکن است آسیب‌زا باشد. آب‌بان، مشارکت عمومی را به آموزش، مجوز و نظارت تخصصی متصل می‌کند." /><div className="principles"><span><Icon name="shield" />حفاظت از اطلاعات حساس</span><span><Icon name="users" />مشارکت نقش‌محور</span><span><Icon name="chart" />گزارش‌گری شفاف</span></div></div><img src={img.water} alt="جریان آب در طبیعت" /></div></section>
    <section className="section soft"><div className="container"><SectionHead eyebrow="نقش‌ها" title="هر همراه، مسئولیتی روشن دارد" /><div className="role-grid"><article><b>مردم و داوطلبان</b><p>یادگیری، ثبت گزارش عمومی، آماده‌سازی تجهیزات و همراهی در رویدادهای مجاز.</p></article><article><b>متخصصان محیط‌زیست</b><p>تعریف پروتکل، اعتبارسنجی داده و آموزش روش‌های درست پایش و نگهداری.</p></article><article><b>مسئولان پارک</b><p>تعیین اولویت، صدور مجوز، حفظ امنیت زیستگاه و هدایت عملیات میدانی.</p></article></div></div></section>
    <section className="section"><div className="container"><SectionHead eyebrow="اکوسیستم کامل" title="شش نقطه تماس، یک مسیر یکپارچه" /><div className="ecosystem-grid">{ecosystem.map((e, i) => <article key={e[0]}><span>{String(i + 1).padStart(2, '۰')}</span><Icon name={i === 2 ? 'bag' : i === 1 ? 'leaf' : 'drop'} /><h3>{e[0]}</h3><p>{e[1]}</p></article>)}</div></div></section>
    <section className="section journey-section"><div className="container"><SectionHead eyebrow="سفر خدمت" title="از کشف تا گزارش شفاف" text="هر گام، کاربر را برای مشارکت ایمن‌تر و اثربخش‌تر آماده می‌کند." light /><div className="journey">{['کشف آب‌بان', 'یادگیری', 'انتخاب نقش', 'ثبت درخواست', 'راهنمایی ضروری', 'فعالیت مجاز', 'پیگیری وضعیت', 'مشاهده گزارش'].map((x, i) => <div key={x}><span>{i + 1}</span><b>{x}</b></div>)}</div></div></section>
    <section className="section"><div className="container faq-wrap"><SectionHead eyebrow="پرسش‌های پرتکرار" title="پیش از همراهی بدانیم" /><div className="faq-list">{faqs.map((f, i) => <article key={f[0]}><button onClick={() => setFaq(faq === i ? -1 : i)}><span>{f[0]}</span><Icon name={faq === i ? 'close' : 'plus'} /></button>{faq === i && <p>{f[1]}</p>}</article>)}</div></div></section>
  </>
}

const markers = [
  { id: 'AB-D01', category: 'منابع طبیعی', status: 'green', x: 24, y: 29, inspect: 'پایش‌شده', maintenance: 'پایدار', desc: 'نمای آموزشی یک منبع طبیعی؛ موقعیت آن تعمیم‌یافته و غیرعملیاتی است.' },
  { id: 'AB-D02', category: 'آبشخورهای مصنوعی', status: 'yellow', x: 59, y: 24, inspect: 'نیازمند بررسی', maintenance: 'در صف ارزیابی', desc: 'نمونه آبشخور برای نمایش گردش کار نگهداری و تأیید تخصصی.' },
  { id: 'AB-D03', category: 'پایگاه‌های خدماتی', status: 'green', x: 72, y: 58, inspect: 'پایش‌شده', maintenance: 'آماده', desc: 'پایگاه مفهومی تحویل و کنترل تجهیزات؛ بدون نشانی واقعی.' },
  { id: 'AB-D04', category: 'نقاط آموزشی', status: 'gray', x: 40, y: 67, inspect: 'اطلاعات در دسترس نیست', maintenance: 'نامشخص', desc: 'نقطه عمومی آموزش درباره آب و مشاهده مسئولانه حیات‌وحش.' },
  { id: 'AB-D05', category: 'رویدادهای مجاز', status: 'green', x: 84, y: 35, inspect: 'تأییدشده', maintenance: 'برنامه‌ریزی‌شده', desc: 'رویداد نمونه در فضای عمومی؛ جزئیات پس از ثبت‌نام اعلام می‌شود.' },
]

function WaterMap() {
  const cats = ['همه', 'منابع طبیعی', 'آبشخورهای مصنوعی', 'پایگاه‌های خدماتی', 'نقاط آموزشی', 'رویدادهای مجاز']
  const [filter, setFilter] = useState('همه')
  const shown = markers.filter(m => filter === 'همه' || m.category === filter)
  const [active, setActive] = useState(markers[0])
  useEffect(() => { if (!shown.includes(active) && shown[0]) setActive(shown[0]) }, [filter])
  return <>
    <PageHero eyebrow="نقشه آب" title="دانستن، بدون به‌خطر انداختن" text="این نقشه، وضعیت‌های کلی و آموزشی را نشان می‌دهد. هیچ نقطه، مختصات واقعی منبع آب یا مسیر دسترسی به زیستگاه نیست." />
    <section className="map-page section"><div className="container"><Notice><b>نمونه مفهومی با داده آزمایشی:</b> نشانگرها و شناسه‌ها ساختگی‌اند و فقط برای نمایش تجربه کاربری سامانه استفاده شده‌اند.</Notice><div className="filter-scroll">{cats.map(c => <button key={c} onClick={() => setFilter(c)} className={filter === c ? 'active' : ''}>{c}</button>)}</div>
      <div className="map-layout"><div className="big-map"><div className="map-topo" /><span className="map-north">شمال عمومی <Icon name="arrow" /></span>{shown.map(m => <button key={m.id} className={`real-marker ${m.status} ${active.id === m.id ? 'selected' : ''}`} style={{ left: `${m.x}%`, top: `${m.y}%` }} onClick={() => setActive(m)} aria-label={`نمایش ${m.id}`}><Icon name="drop" /></button>)}{!shown.length && <div className="empty">موردی برای این فیلتر پیدا نشد.</div>}<span className="map-waterline line-1" /><span className="map-waterline line-2" /></div>
        <aside className="map-panel"><span className="tag">{active.category}</span><h2>{active.id}</h2><p>{active.desc}</p><dl><div><dt>وضعیت آخرین بررسی</dt><dd><i className={active.status} />{active.inspect}</dd></div><div><dt>وضعیت نگهداری</dt><dd>{active.maintenance}</dd></div><div><dt>دقت مکانی</dt><dd>تعمیم‌یافته و غیرحساس</dd></div></dl><Button variant="outline" page="reports">ثبت مشاهده مرتبط</Button></aside></div>
      <div className="map-legend"><b>راهنمای وضعیت</b><span><i className="green" />سبز: پایش‌شده</span><span><i className="yellow" />زرد: نیازمند بررسی</span><span><i className="gray" />خاکستری: اطلاعات در دسترس نیست</span></div>
    </div></section>
  </>
}

function Abyar() {
  const parts = [['مخزن ماژولار آب', 'قابل جداسازی برای شست‌وشو و کنترل بهداشت'], ['بندهای ارگونومیک', 'قابل تنظیم برای توزیع متوازن وزن'], ['محفظه تجهیزات', 'فضای جداگانه برای ابزار و لوازم ایمنی'], ['شناسه QR', 'پیوند هر کوله به سابقه آماده‌سازی و تحویل'], ['حسگر اختیاری', 'ثبت سطح تقریبی آب در سناریوهای تأییدشده']]
  return <>
    <section className="abyar-hero"><div className="container abyar-hero-grid"><div><span className="eyebrow light"><i />کوله آب‌یار</span><h1>ابزاری دقیق برای<br /><em>یک مأموریت مسئولانه</em></h1><p>کوله آب‌یار، محصولی برای فروش عمومی نیست؛ یک ابزار خدماتی است که با پروتکل آماده می‌شود و فقط در اختیار تیم‌های آموزش‌دیده و مجاز قرار می‌گیرد.</p><Button variant="cream" page="events">حضور در آماده‌سازی کوله</Button></div><Backpack /></div></section>
    <section className="section"><div className="container"><SectionHead eyebrow="نمای اجزا" title="هر جزء، برای کنترل بهتر" text="طراحی مفهومی کوله با هدف کاهش خطا، بهبود حمل و امکان رهگیری فرایند آماده‌سازی شکل گرفته است." /><div className="parts-grid">{parts.map((p, i) => <article key={p[0]}><span>۰{i + 1}</span><Icon name={i === 3 ? 'info' : i === 4 ? 'chart' : 'bag'} /><div><h3>{p[0]}</h3><p>{p[1]}</p></div></article>)}</div></div></section>
    <section className="section soft"><div className="container process-grid"><div><SectionHead eyebrow="نحوه آماده‌سازی" title="پیش از حرکت، همه‌چیز بررسی می‌شود" /><ol>{['بازرسی بدنه، اتصالات و مخزن', 'شست‌وشو و ثبت کنترل بهداشت', 'تکمیل تجهیزات و اسکن شناسه', 'تحویل ثبت‌شده به سرپرست تیم مجاز'].map((x, i) => <li key={x}><span>{i + 1}</span>{x}</li>)}</ol></div><div className="care-card"><Icon name="shield" size={34} /><h3>نگهداری و نظافت</h3><p>پس از هر مأموریت، مخزن تخلیه، شست‌وشو و خشک می‌شود. هر آسیب یا آلودگی در سابقه کوله ثبت و پیش از استفاده بعدی بررسی خواهد شد.</p><span>پروتکل نمایشی — نیازمند تأیید متخصص</span></div></div></section>
    <section className="section"><div className="container volunteer-role"><img src={img.team} alt="همکاری تیمی در طبیعت" /><div><SectionHead eyebrow="نقش داوطلبان" title="پشتیبانی از عملیات، بدون ورود خودسرانه" text="داوطلبان می‌توانند در خانه آب‌بان به شست‌وشو، کنترل فهرست، نصب شناسه و بسته‌بندی کمک کنند. حمل میدانی آب فقط توسط تیم دارای مجوز انجام می‌شود." /><Notice>ثبت‌نام داوطلبی یا حضور در کارگاه، مجوز ورود به مناطق حفاظت‌شده یا حمل آب در زیستگاه نیست.</Notice><Button page="volunteer">ثبت درخواست همراهی</Button></div></div></section>
  </>
}

function EventsPage() {
  const categories = ['همه', 'آموزش', 'کاروان قطره‌ها', 'آماده‌سازی کوله', 'رویداد فرهنگی', 'فعالیت خانوادگی']
  const [filter, setFilter] = useState('همه')
  const [selected, setSelected] = useState<typeof events[0] | null>(null)
  const list = events.filter(e => filter === 'همه' || e.category === filter)
  return <>
    <PageHero eyebrow="رویدادها" title="یک قدم واقعی برای همراهی" text="رویدادهای آب‌بان، از یادگیری شروع می‌شوند و به مشارکت روشن، امن و قابل‌پیگیری می‌رسند." />
    <section className="section"><div className="container"><div className="filter-scroll">{categories.map(c => <button key={c} className={filter === c ? 'active' : ''} onClick={() => setFilter(c)}>{c}</button>)}</div>{list.length ? <div className="event-grid event-page-grid">{list.map(e => <EventCard key={e.id} event={e} onOpen={() => setSelected(e)} />)}</div> : <div className="empty-state"><Icon name="calendar" size={38} /><h3>رویدادی پیدا نشد</h3><p>فیلتر دیگری را انتخاب کنید یا بعداً دوباره سر بزنید.</p></div>}</div></section>
    {selected && <EventModal event={selected} onClose={() => setSelected(null)} />}
  </>
}

function Success({ title, text }: { title: string; text: string }) {
  return <div className="success"><span><Icon name="check" size={38} /></span><h2>{title}</h2><p>{text}</p><Button page="home" variant="outline">بازگشت به خانه</Button></div>
}

function Volunteer() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const submit = (e: FormEvent) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); setSent(true) }, 700) }
  return <>
    <PageHero eyebrow="همراه آب‌بان شو" title="نقش تو از همین‌جا آغاز می‌شود" text="کمی از علایق و تجربه‌ات بگو تا مناسب‌ترین مسیر آموزش و مشارکت را به تو پیشنهاد دهیم." />
    <section className="section form-section"><div className="container form-layout"><aside><h3>بعد از ثبت درخواست چه می‌شود؟</h3>{['بررسی علایق و ظرفیت‌ها', 'پیشنهاد مسیر آموزشی', 'دعوت به رویداد مناسب', 'تأیید نقش و محدوده فعالیت'].map((x, i) => <div key={x}><span>{i + 1}</span>{x}</div>)}<Notice>این فرم فقط درخواست داوطلبی است و به‌هیچ‌وجه مجوز ورود به مناطق حفاظت‌شده محسوب نمی‌شود.</Notice></aside><div className="main-form">{sent ? <Success title="درخواست همراهی ثبت شد" text="پس از بررسی اولیه، مسیر پیشنهادی یادگیری و مشارکت از طریق اطلاعات تماس شما ارسال می‌شود." /> : <form onSubmit={submit}><h2>فرم درخواست داوطلبی</h2><p>فیلدهای ستاره‌دار ضروری‌اند.</p><div className="field-grid"><label>نام و نام خانوادگی *<input required placeholder="مثلاً سارا احمدی" /></label><label>شماره تماس *<input required inputMode="tel" pattern="[۰-۹0-9+ ]{10,14}" placeholder="۰۹۱۲ ۰۰۰ ۰۰۰۰" /></label><label>ایمیل<input type="email" placeholder="name@example.com" dir="ltr" /></label><label>زمینه علاقه‌مندی *<select required defaultValue=""><option value="" disabled>انتخاب کنید</option><option>آموزش و فرهنگ‌سازی</option><option>آماده‌سازی تجهیزات</option><option>عکاسی و روایت‌گری</option><option>پایش تخصصی</option><option>پشتیبانی رویداد</option></select></label></div><label>تجربه قبلی<textarea placeholder="اگر تجربه مرتبطی دارید کوتاه بنویسید." /></label><label>دلیل علاقه‌مندی به مشارکت *<textarea required placeholder="چه چیزی شما را به همراهی با آب‌بان بمو علاقه‌مند کرده است؟" /></label><label className="checkbox"><input type="checkbox" required /><span>می‌دانم ثبت درخواست به معنی تأیید عضویت یا مجوز فعالیت میدانی نیست.</span></label><Button type="submit">{loading ? <span className="loader">در حال ثبت</span> : 'ثبت درخواست همراهی'}</Button></form>}</div></div></section>
  </>
}

function Support() {
  const options = [{ t: 'حامی یک کوله آب‌یار', a: '۴٬۵۰۰٬۰۰۰ تومان', d: 'سهم پیشنهادی برای مخزن، اتصالات و تجهیزات شناسایی' }, { t: 'حمایت از آموزش', a: '۵۰۰٬۰۰۰ تومان', d: 'تولید محتوای آموزشی و اجرای یک نشست عمومی' }, { t: 'آماده‌سازی تجهیزات', a: '۱٬۲۰۰٬۰۰۰ تومان', d: 'شست‌وشو، کنترل، بسته‌بندی و اقلام مصرفی' }, { t: 'همکاری سازمانی', a: 'توافقی', d: 'پشتیبانی از یک برنامه با گزارش اختصاصی' }]
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState(false)
  return <>
    <PageHero eyebrow="حمایت و پشتیبانی" title="اعتماد، با گزارش روشن ساخته می‌شود" text="در این نمونه مفهومی، هر حمایت به یک هدف مشخص متصل و از مرحله تخصیص تا گزارش هزینه قابل‌پیگیری طراحی شده است." />
    <section className="section"><div className="container"><Notice>مبالغ، پیشرفت کارزارها و گزارش‌های این صفحه همگی نمایشی‌اند. پرداخت واقعی تنها پس از اتصال درگاه مورد تأیید امکان‌پذیر خواهد بود.</Notice><div className="support-card-grid">{options.map((o, i) => <button key={o.t} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)}><span className="radio" /><Icon name={i === 0 ? 'bag' : i === 1 ? 'leaf' : i === 3 ? 'users' : 'drop'} /><h3>{o.t}</h3><b>{o.a}</b><p>{o.d}</p></button>)}</div><div className="donation-action"><div><span>انتخاب شما</span><h3>{options[selected].t}</h3><p>{options[selected].d}</p></div><Button onClick={() => setOpen(true)}>ادامه حمایت آزمایشی</Button></div></div></section>
    <section className="section soft"><div className="container"><SectionHead eyebrow="پیشرفت نمونه" title="کارزار آماده‌سازی ۲۰ کوله" text="داده زیر برای نمایش شیوه گزارش‌دهی است و کارزار واقعی محسوب نمی‌شود." /><div className="campaign"><div className="progress-head"><b>۶۸٪ آماده‌سازی</b><span>۱۳ از ۲۰ کوله — داده نمایشی</span></div><div className="progress"><i style={{ width: '68%' }} /></div><div className="campaign-steps"><span className="done">تأمین مخزن‌ها</span><span className="done">کنترل اتصالات</span><span>نصب شناسه‌ها</span><span>تحویل به تیم مجاز</span></div></div></div></section>
    <section className="section"><div className="container report-table-wrap"><SectionHead eyebrow="شفافیت مالی" title="نمونه گزارش تخصیص" /><div className="report-table"><div className="table-head"><span>ردیف نمایشی</span><span>مبلغ</span><span>وضعیت</span><span>سند</span></div>{[['تهیه مخزن ماژولار', '۱۸٬۰۰۰٬۰۰۰', 'تأییدشده'], ['چاپ شناسه و برچسب', '۲٬۴۰۰٬۰۰۰', 'تأییدشده'], ['اقلام نظافت و کنترل', '۳٬۲۰۰٬۰۰۰', 'در بررسی']].map(r => <div key={r[0]}><span>{r[0]}</span><span>{r[1]} تومان</span><span><i />{r[2]}</span><button>مشاهده نمونه</button></div>)}</div></div></section>
    {open && <Modal onClose={() => setOpen(false)} label="حمایت آزمایشی"><div className="payment-note"><Icon name="shield" size={44} /><h2>درگاه پرداخت فعال نیست</h2><p>این وب‌سایت یک نمونه مفهومی است. برای دریافت پرداخت واقعی باید درگاه رسمی و مورد تأیید مجموعه متصل شود.</p><Button onClick={() => setOpen(false)}>متوجه شدم</Button></div></Modal>}
  </>
}

const articles = [
  { title: 'چطور حیات‌وحش را مسئولانه مشاهده کنیم؟', cat: 'مشاهده مسئولانه', image: img.deer, time: '۶ دقیقه', text: 'فاصله امن، سکوت و پرهیز از خوراک‌دهی سه اصل مهم مشاهده هستند.' },
  { title: 'آبشخور چه نقشی در زیستگاه دارد؟', cat: 'دانش آب', image: img.water, time: '۸ دقیقه', text: 'آشنایی مقدماتی با منابع طبیعی و مصنوعی و اهمیت پایش تخصصی آن‌ها.' },
  { title: 'ردپاها چه می‌گویند، چه نمی‌گویند؟', cat: 'حیات‌وحش', image: img.fox, time: '۵ دقیقه', text: 'دیدن نشانه‌ها جذاب است، اما تفسیر دقیق باید به متخصص سپرده شود.' },
  { title: 'راهنمای عکاسی بدون مزاحمت', cat: 'مشاهده مسئولانه', image: img.bird, time: '۷ دقیقه', text: 'چطور بدون نزدیک‌شدن یا تغییر رفتار جانور، روایتی زیبا بسازیم.' },
]

function Education() {
  const [query, setQuery] = useState('')
  const [cat, setCat] = useState('همه')
  const [quizOpen, setQuizOpen] = useState(false)
  const filtered = articles.filter(a => (cat === 'همه' || a.cat === cat) && a.title.includes(query))
  return <>
   <section className="section education-banner">
  <div className="container">
    <div>
      <Icon name="shield" size={40} />
      <h2>آزمون راهنمای حضور مسئولانه</h2>
      <p>
        پیش از شرکت در برخی فعالیت‌ها،
        راهنمای کوتاه حفاظت و ایمنی را کامل کنید.
      </p>
    </div>

    <Button
      variant="cream"
      onClick={() => setQuizOpen(true)}
    >
      شروع راهنمای آزمایشی
    </Button>

    {quizOpen && (
      <Modal
        label="آزمون راهنمای حضور مسئولانه"
        onClose={() => setQuizOpen(false)}
      >
        <ResponsibleQuiz />
      </Modal>
    )}

  </div>
</section>
  </>
}

const galleryItems = [
  { title: 'کل و بز در ارتفاعات', cat: 'حیات‌وحش', image: img.deer, h: 'tall' }, { title: 'خط‌الرأس بمو', cat: 'چشم‌انداز بمو', image: heroImage, h: 'wide' },
  { title: 'آب و سنگ', cat: 'آب و طبیعت', image: img.water, h: 'small' }, { title: 'پرنده در سکوت', cat: 'حیات‌وحش', image: img.bird, h: 'tall' },
  { title: 'نقاشی یک زیستگاه', cat: 'نقاشی کودکان', image: img.child, h: 'small' }, { title: 'همراهی در مسیر', cat: 'مستند رویداد', image: img.team, h: 'wide' },
  { title: 'روایت روباه', cat: 'عکاسی', image: img.fox, h: 'small' },
]

function Gallery() {
  const cats = ['همه', 'حیات‌وحش', 'چشم‌انداز بمو', 'آب و طبیعت', 'نقاشی کودکان', 'مستند رویداد']
  const [cat, setCat] = useState('همه')
  const [active, setActive] = useState<typeof galleryItems[0] | null>(null)
  const items = galleryItems.filter(x => cat === 'همه' || x.cat === cat)
  return <>
    <PageHero eyebrow="گالری" title="روایت‌هایی از آب، کوه و زندگی" text="تصویر می‌تواند ما را به طبیعت نزدیک کند؛ اگر با احترام، فاصله امن و بدون افشای موقعیت حساس ثبت شود." />
    <section className="section"><div className="container"><div className="filter-scroll">{cats.map(c => <button className={cat === c ? 'active' : ''} onClick={() => setCat(c)} key={c}>{c}</button>)}</div><div className="masonry">{items.map(x => <button key={x.title} className={x.h} onClick={() => setActive(x)}><img src={x.image} alt={x.title} /><span><small>{x.cat}</small><b>{x.title}</b></span></button>)}</div></div></section>
    {active && <Modal onClose={() => setActive(null)} label={active.title}><img className="gallery-modal-img" src={active.image} alt={active.title} /><span className="tag">{active.cat}</span><h2>{active.title}</h2><p>تصویر نمونه برای نمایش تجربه گالری. محل ثبت تصاویر حیات‌وحش و منابع آب به‌صورت عمومی منتشر نمی‌شود.</p></Modal>}
  </>
}

function Reports() {
  const [sent, setSent] = useState(false)
  const [file, setFile] = useState('')
  return <>
    <PageHero eyebrow="گزارش محیطی" title="مشاهده‌ات می‌تواند آغاز یک بررسی باشد" text="اگر آلودگی، آسیب یا خرابی تجهیزات را در یک فضای عمومی مشاهده کرده‌اید، گزارش کنید تا پس از بررسی به مرجع مناسب ارجاع شود." />
    <section className="section form-section"><div className="container report-form-layout"><div><SectionHead eyebrow="حریم و ایمنی" title="گزارش مسئولانه چیست؟" text="کوتاه، دقیق و بدون انتشار عمومی اطلاعات حساس. مکان‌های احتمالی فقط در فرایند امن بررسی می‌شوند و روی سایت نمایش داده نخواهند شد." /><div className="safe-list"><span><Icon name="check" />شرح آنچه مشاهده کرده‌اید</span><span><Icon name="check" />زمان تقریبی مشاهده</span><span><Icon name="close" />عدم نزدیک‌شدن به جانور یا خطر</span><span><Icon name="close" />عدم انتشار مختصات در شبکه‌های عمومی</span></div></div><div className="main-form">{sent ? <Success title="گزارش برای بررسی ثبت شد" text="گزارش شما ابتدا توسط تیم مسئول بررسی می‌شود و هیچ اطلاعات مکانی حساسی به‌صورت عمومی منتشر نخواهد شد." /> : <form onSubmit={e => { e.preventDefault(); setSent(true) }}><h2>ثبت گزارش تازه</h2><label>نوع گزارش *<select required defaultValue=""><option value="" disabled>یک مورد را انتخاب کنید</option><option>آلودگی</option><option>آسیب به پوشش گیاهی</option><option>آتش‌سوزی</option><option>خرابی تجهیزات</option><option>سایر موارد</option></select></label><label>زمان تقریبی مشاهده<input type="text" placeholder="مثلاً امروز، حدود ساعت ۱۰" /></label><label>شرح مشاهده *<textarea required rows={5} placeholder="آنچه دیده‌اید را بدون حدس یا تفسیر بنویسید..." /></label><label className="upload"><input type="file" accept="image/*" onChange={e => setFile(e.target.files?.[0]?.name || '')} /><Icon name="upload" size={30} /><b>{file || 'افزودن تصویر'}</b><span>فرمت JPG یا PNG، حداکثر ۵ مگابایت</span></label><label className="checkbox"><input type="checkbox" required /><span>تأیید می‌کنم این گزارش بر اساس مشاهده شخصی و بدون دست‌کاری محیط ثبت شده است.</span></label><Button type="submit">ارسال برای بررسی</Button></form>}</div></div></section>
  </>
}

function Dashboard() {
  const [tab, setTab] = useState('منابع آب')
  const rows = [
    ['AB-D01', 'منبع طبیعی', 'پایش‌شده', 'تأیید شد'], ['AB-D02', 'آبشخور مصنوعی', 'نیازمند بررسی', 'در انتظار'], ['AB-D04', 'نقطه آموزشی', 'نامشخص', 'نیازمند داده'], ['AB-D06', 'پایگاه خدماتی', 'پایش‌شده', 'تأیید شد'],
  ]
  return <div className="dashboard">
    <aside className="dash-side"><div className="brand"><span className="brand-mark"><Icon name="drop" /></span><span><b>مدیریت آب‌بان</b><small>نمای مفهومی</small></span></div><nav>{['نمای کلی', 'منابع آب', 'سوابق پایش', 'تجهیزات و کوله‌ها', 'رویدادها', 'داوطلبان', 'حمایت و هزینه', 'اعتبارسنجی داده'].map(x => <button className={tab === x ? 'active' : ''} onClick={() => setTab(x)} key={x}><Icon name={x === 'نمای کلی' ? 'chart' : x.includes('کوله') ? 'bag' : 'drop'} size={19} />{x}</button>)}</nav><button className="back-public" onClick={() => go('home')}>بازگشت به وب‌سایت عمومی</button></aside>
    <main className="dash-main"><header><div><small>داشبورد مفهومی / {tab}</small><h1>{tab}</h1></div><div className="dash-user"><span>کاربر نمونه</span><i>آب</i></div></header><Notice>این داشبورد به سامانه واقعی پارک متصل نیست و تمام رکوردها داده نمایشی هستند.</Notice>
      <div className="dash-stats">{[['۲۴', 'منابع ثبت‌شده', '+۳ این ماه'], ['۱۷', 'پایش تکمیل‌شده', '۷۱٪ کل'], ['۱۲', 'کوله آماده', '۳ در حال کنترل'], ['۸', 'درخواست داوطلبی', 'نیازمند بررسی']].map((s, i) => <article key={s[1]}><span><Icon name={i === 2 ? 'bag' : i === 3 ? 'users' : 'drop'} /></span><div><strong>{s[0]}</strong><b>{s[1]}</b><small>{s[2]}</small></div></article>)}</div>
      <div className="dash-grid"><section className="dash-card chart-card"><div className="card-title"><h3>روند پایش نمونه</h3><select><option>شش ماه اخیر</option></select></div><div className="bars">{[42, 58, 48, 72, 64, 83].map((h, i) => <div key={i}><i style={{ height: `${h}%` }} /><span>{['آذر', 'دی', 'بهمن', 'اسفند', 'فروردین', 'اردیبهشت'][i]}</span></div>)}</div></section><section className="dash-card donut-card"><div className="card-title"><h3>وضعیت تأیید داده</h3></div><div className="donut"><span><b>۷۱٪</b>تأییدشده</span></div><div className="donut-legend"><span><i className="green" />تأییدشده ۱۷</span><span><i className="yellow" />در بررسی ۴</span><span><i className="gray" />نامشخص ۳</span></div></section></div>
      <section className="dash-card dash-table"><div className="card-title"><h3>آخرین رکوردهای نمایشی</h3><div className="table-search"><Icon name="search" size={17} /><input placeholder="جست‌وجو..." /></div></div><div className="table-head"><span>شناسه</span><span>دسته</span><span>وضعیت پایش</span><span>اعتبارسنجی</span></div>{rows.map(r => <div className="table-row" key={r[0]}>{r.map((x, i) => <span className={i > 1 ? 'status-cell' : ''} key={x}>{x}</span>)}</div>)}</section>
    </main>
  </div>
}

function App() {
  const getPage = () => pages[window.location.hash.slice(1)] || 'home'
  const [page, setPage] = useState<Page>(getPage)
  useEffect(() => { const onHash = () => setPage(getPage()); window.addEventListener('hashchange', onHash); return () => window.removeEventListener('hashchange', onHash) }, [])
  const content = useMemo(() => ({ home: <Home />, about: <About />, map: <WaterMap />, abyar: <Abyar />, events: <EventsPage />, volunteer: <Volunteer />, support: <Support />, education: <Education />, gallery: <Gallery />, reports: <Reports />, dashboard: <Dashboard /> })[page], [page])
  if (page === 'dashboard') return content
  return <div dir="rtl"><Header current={page} /><main>{content}</main><Footer /></div>
}

export default App
