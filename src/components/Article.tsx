export default function Article({
  title,
  headerBg,
  toneClass = "text-black",
  titleClass = "text-3xl md:text-4xl", // Küçültülmüş default
  bodyFont = '"Times New Roman", Times, serif', // Global Times
  contentMaxWidth = "max-w-3xl",
  children,
}: {
  title: string;
  headerBg?: string;
  toneClass?: string;
  titleClass?: string;
  bodyFont?: string;
  contentMaxWidth?: string; // Tailwind class
  children: React.ReactNode;
}) {
  return (
    <section className={toneClass}>
      {/* Header (isteğe bağlı görsel/renk) */}
      {headerBg && (
        <div
          className="h-40 w-full"
          style={{
            background: headerBg.startsWith("#") ? headerBg : `url(${headerBg}) center/cover`,
          }}
        />
      )}

      <div className={`mx-auto w-full ${contentMaxWidth} px-6 py-10`} style={{ fontFamily: bodyFont }}>
        <h1 className={`mb-6 font-extrabold tracking-tight ${titleClass}`}>{title}</h1>
        {children}
      </div>
    </section>
  );
}