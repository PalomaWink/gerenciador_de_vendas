import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/client" className='mr-8'>Client</Link>
      <Link href="/admin" className='mr-8'>Admin</Link>
      <Link href="/recipe">Lista de ingredientes</Link>
    </main>
  )
}
