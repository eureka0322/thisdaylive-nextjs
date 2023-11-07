type LayoutProps = {
  children?: React.ReactNode
}

export default function AmpLayout({ children }: LayoutProps) {
  return (
    <>
      {children}
      <style jsx global>{`
        body {
          font: 300 16px / 1.4706 SecondaryFont,system-ui;
          color: #444;
        }
        a {
          text-decoration: none;
      }
      `}</style>
    </>
  )
}
