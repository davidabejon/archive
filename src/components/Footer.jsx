function Footer() {
  return (
    <footer className="w-full p-4 text-center text-sm text-gray-500">
      <p>© {new Date().getFullYear()} Archive. Powered by <a href="https://anilist.co" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">AniList</a>⚡</p>
      <p>
        Built with <span className="text-red-500">♥</span> by{' '}
        <a
          href="https://davidabejon.cv?language=en"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          David Abejón
        </a>
      </p>
    </footer>
  );
}

export default Footer;