// /components/Header.tsx
import Link from 'next/link';

const menuItems = [
  { name: "プログラム知識", href: "#" },
  { name: "プログラム単語", href: "#" },
  { name: "本、動画紹介", href: "#" },
  { name: "資格試験情報", href: "#" },
  { name: "ミニアプリ", href: "#" },
  { name: "ブログ", href: "/blog" },
];

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Prograroom
        </Link>
        <ul className="flex space-x-6">
          {menuItems.map((item) => (
            <li key={item.name}>
              <Link href={item.href} className="hover:text-gray-300 transition-colors">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
