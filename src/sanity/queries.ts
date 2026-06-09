import { client } from './client'

export interface Proyecto {
  _id: string
  titulo: string
  slug: { current: string }
  categoria: string
  anio: number
  descripcion: string
  imagenPortada: { asset: { _ref: string } }
  galeria?: { asset: { _ref: string } }[]
  archivoPdf?: { asset: { url: string } }
  cliente?: string
  destacado: boolean
  orden: number
}

export async function getProyectos(): Promise<Proyecto[]> {
  return client.fetch(
    `*[_type == "proyecto"] | order(orden asc, _createdAt desc) {
      _id, titulo, slug, categoria, anio, descripcion,
      imagenPortada, cliente, destacado, orden
    }`
  )
}

export async function getProyecto(slug: string): Promise<Proyecto | null> {
  return client.fetch(
    `*[_type == "proyecto" && slug.current == $slug][0] {
      _id, titulo, slug, categoria, anio, descripcion,
      imagenPortada, galeria, "archivoPdf": archivoPdf.asset->url,
      cliente, destacado, orden
    }`,
    { slug }
  )
}
