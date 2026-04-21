import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: 'r1krvsp5', // от твоя screenshot
  dataset: 'production', // или "default" ако така си го създал
  useCdn: false,
  apiVersion: '2024-01-01',
})