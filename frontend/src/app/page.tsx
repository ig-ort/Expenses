import { redirect } from 'next/navigation'

export default function HomePage() {
  // Redirigir directamente al dashboard ya que es una app de gastos
  redirect('/dashboard')
}