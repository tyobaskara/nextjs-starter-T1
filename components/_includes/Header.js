import { PureComponent } from 'react';
import Link from 'next/link';

class Header extends PureComponent {
  render() {
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
    )
  }
}

export default Header;
