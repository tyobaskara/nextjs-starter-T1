import Link from 'next/link';

export default function Header() {
  return (
    <header>
      <div className="container">
      <ul>
        <li>
          <Link href="/">
            <a>Home</a>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <a>About Us</a>
          </Link>
        </li>
      </ul>
      </div>
    </header>
  );
}
