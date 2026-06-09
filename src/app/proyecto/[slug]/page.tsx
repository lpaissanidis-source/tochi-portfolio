import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getProyecto, getProyectos } from '@/sanity/queries'
import { urlFor } from '@/sanity/client'

export const revalidate = 60

export async function generateStaticParams() {
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) return []
  const proyectos = await getProyectos()
  return proyectos.map((p) => ({ slug: p.slug.current }))
}

const LABEL: Record<string, string> = {
  estilismo: 'Estilismo',
  produccion: 'Producción de moda',
  editorial: 'Editorial',
  campana: 'Campaña',
  otro: 'Otro',
}

export default async function ProyectoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const proyecto = await getProyecto(slug)
  if (!proyecto) notFound()

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      {/* Header */}
      <header className="px-6 py-8 flex items-center justify-between border-b border-stone-200">
        <Link href="/" className="font-sans text-sm tracking-widest uppercase" style={{ color: 'var(--muted)' }}>
          ← Volver
        </Link>
        <h1 className="text-2xl tracking-[0.2em] uppercase" style={{ color: 'var(--fg)' }}>Tochi</h1>
        <div className="w-16" />
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        {/* Meta */}
        <div className="mb-8">
          <p className="font-sans text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--muted)' }}>
            {LABEL[proyecto.categoria] ?? proyecto.categoria}
            {proyecto.anio ? ` · ${proyecto.anio}` : ''}
            {proyecto.cliente ? ` · ${proyecto.cliente}` : ''}
          </p>
          <h2 className="text-3xl md:text-4xl leading-tight mb-4">{proyecto.titulo}</h2>
          {proyecto.descripcion && (
            <p className="font-sans text-base leading-relaxed max-w-2xl" style={{ color: 'var(--muted)' }}>
              {proyecto.descripcion}
            </p>
          )}
        </div>

        {/* Imagen portada */}
        <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden">
          <Image
            src={urlFor(proyecto.imagenPortada).width(1200).height(675).fit('crop').url()}
            alt={proyecto.titulo}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Galería */}
        {proyecto.galeria && proyecto.galeria.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 mb-8">
            {proyecto.galeria.map((img, i) => (
              <div key={i} className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={urlFor(img).width(800).height(600).fit('crop').url()}
                  alt={`${proyecto.titulo} ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        )}

        {/* PDF */}
        {proyecto.archivoPdf && (
          <div className="mt-8 p-6 border border-stone-200 flex items-center justify-between">
            <div>
              <p className="font-sans text-xs tracking-widest uppercase mb-1" style={{ color: 'var(--muted)' }}>
                Documento
              </p>
              <p className="text-base">{proyecto.titulo} — PDF</p>
            </div>
            <a
              href={proyecto.archivoPdf as unknown as string}
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs tracking-widest uppercase px-5 py-3 border transition-colors hover:bg-stone-100"
              style={{ borderColor: 'var(--fg)' }}
            >
              Ver PDF
            </a>
          </div>
        )}
      </main>

      <footer className="text-center py-8 font-sans text-xs tracking-widest uppercase border-t border-stone-200 mt-8" style={{ color: 'var(--muted)' }}>
        © {new Date().getFullYear()} Tochi
      </footer>
    </div>
  )
}
