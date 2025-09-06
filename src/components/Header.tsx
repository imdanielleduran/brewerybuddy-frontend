import Link from 'next/link';
import { cookies } from 'next/headers';
import LogoutButton from '@/components/LogoutButton';

const COOKIE = process.env.JWT_COOKIE_NAME || 'bb_jwt';

export default function Header() {
  const token = cookies().get(COOKIE)?.value;

  return (
    <header style={{
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'12px 16px', borderBottom:'1px solid #1f232a', background:'#0e1014'
    }}>
      <nav style={{ display:'flex', gap:12 }}>
        <Link href="/">Home</Link>
        <Link href="/breweries">Breweries</Link>
      </nav>
      <div>
        {token ? <LogoutButton/> : <Link href="/login">Log in</Link>}
      </div>
    </header>
  );
}
