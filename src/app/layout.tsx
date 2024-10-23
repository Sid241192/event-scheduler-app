import '../styles/globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <html>
      <body>
        {children}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
