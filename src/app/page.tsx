import Link from 'next/link'
import Image from 'next/image'
import { getProyectos } from '@/sanity/queries'
import { urlFor } from '@/sanity/client'

const CATEGORIAS = ['Todos', 'estilismo', 'produccion', 'editorial', 'campana', 'otro']
const LABEL: Record<string, string> = {
  estilismo: 'Estilismo',
  produccion: 'Producción de moda',
  editorial: 'Editorial',
  campana: 'Campaña',
  otro: 'Otro',
}

export const revalidate = 10

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>
}) {
  const { cat } = await searchParams
  const proyectos = await getProyectos()
  const filtrados = cat && cat !== 'Todos' ? proyectos.filter((p) => p.categoria === cat) : proyectos

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header className="px-6 py-10 flex flex-col items-center gap-2 border-b border-stone-200">
        <h1 className="text-4xl tracking-[0.2em] uppercase" style={{ color: 'var(--fg)' }}>
          Tochi
        </h1>
        <p className="font-sans text-sm tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
          Estilismo & Producción de Moda
        </p>
      </header>

      {/* Filtros */}
      <nav className="flex flex-wrap justify-center gap-3 px-6 py-6">
        {CATEGORIAS.map((c) => (
          <Link
            key={c}
            href={c === 'Todos' ? '/' : `/?cat=${c}`}
            className="font-sans text-xs tracking-widest uppercase px-4 py-2 border transition-colors"
            style={{
              borderColor: 'var(--muted)',
              color: (cat === c || (!cat && c === 'Todos')) ? 'var(--bg)' : 'var(--fg)',
              background: (cat === c || (!cat && c === 'Todos')) ? 'var(--fg)' : 'transparent',
            }}
          >
            {c === 'Todos' ? 'Todos' : LABEL[c]}
          </Link>
        ))}
      </nav>

      {/* Grid de proyectos */}
      {filtrados.length === 0 ? (
        <p className="text-center py-20 font-sans" style={{ color: 'var(--muted)' }}>
          No hay proyectos todavía.
        </p>
      ) : (
        <main className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-stone-200 mx-6 mb-12">
          {filtrados.map((p) => (
            <Link key={p._id} href={`/proyecto/${p.slug.current}`} className="group block bg-[#f8f7f4] overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={urlFor(p.imagenPortada).width(600).height(750).fit('crop').url()}
                  alt={p.titulo}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {p.destacado && (
                  <span className="absolute top-3 left-3 font-sans text-xs tracking-widest uppercase px-2 py-1"
                    style={{ background: 'var(--accent)', color: 'white' }}>
                    Destacado
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className="font-sans text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--muted)' }}>
                  {LABEL[p.categoria] ?? p.categoria}{p.anio ? ` · ${p.anio}` : ''}
                </p>
                <h2 className="text-lg leading-snug">{p.titulo}</h2>
                {p.cliente && (
                  <p className="font-sans text-xs mt-1" style={{ color: 'var(--muted)' }}>{p.cliente}</p>
                )}
              </div>
            </Link>
          ))}
        </main>
      )}

      {/* Footer */}
      <footer className="text-center py-8 font-sans text-xs tracking-widest uppercase border-t border-stone-200" style={{ color: 'var(--muted)' }}>
        © {new Date().getFullYear()} Tochi
      </footer>
    </div>
  )
}
