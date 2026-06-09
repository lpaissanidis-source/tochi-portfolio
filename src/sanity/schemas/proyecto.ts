import { defineType, defineField } from 'sanity'

export const proyectoSchema = defineType({
  name: 'proyecto',
  title: 'Proyecto',
  type: 'document',
  fields: [
    defineField({
      name: 'titulo',
      title: 'Título',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'URL',
      type: 'slug',
      options: { source: 'titulo' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categoria',
      title: 'Categoría',
      type: 'string',
      options: {
        list: [
          { title: 'Estilismo', value: 'estilismo' },
          { title: 'Producción de moda', value: 'produccion' },
          { title: 'Editorial', value: 'editorial' },
          { title: 'Campaña', value: 'campana' },
          { title: 'Otro', value: 'otro' },
        ],
      },
    }),
    defineField({
      name: 'año',
      title: 'Año',
      type: 'number',
    }),
    defineField({
      name: 'descripcion',
      title: 'Descripción',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'imagenPortada',
      title: 'Imagen de portada',
      type: 'image',
      options: { hotspot: true },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'galeria',
      title: 'Galería de imágenes',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'archivoPdf',
      title: 'Archivo PDF (opcional)',
      type: 'file',
      options: { accept: '.pdf' },
    }),
    defineField({
      name: 'cliente',
      title: 'Cliente / Marca',
      type: 'string',
    }),
    defineField({
      name: 'destacado',
      title: '¿Destacar en portada?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'orden',
      title: 'Orden de aparición',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: 'titulo', subtitle: 'categoria', media: 'imagenPortada' },
  },
  orderings: [{ title: 'Orden', name: 'ordenAsc', by: [{ field: 'orden', direction: 'asc' }] }],
})
