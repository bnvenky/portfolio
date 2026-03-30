import './globals.css'

export const metadata = {
  title: 'Bokka Naga Venkatesh - Full-Stack Developer',
  description: 'Portfolio of Bokka Naga Venkatesh, Full-Stack Developer specializing in MERN stack and SaaS applications.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}