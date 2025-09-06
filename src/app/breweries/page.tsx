import Link from 'next/link';
import { cookies } from 'next/headers';
import styles from './Breweries.module.scss';

const COOKIE = process.env.JWT_COOKIE_NAME || 'bb_jwt';

async function getBreweries() {
  const base = process.env.NEXT_PUBLIC_BASE_URL || '';
  const res = await fetch(`${base}/api/breweries`, { cache: 'no-store' });
  if (!res.ok) return [];
  return res.json();
}

export default async function BreweriesPage() {
  const token = cookies().get(COOKIE)?.value;
  if (!token) {
    return (
      <main className="page">
        <p>You’re not logged in. <Link href="/login">Go to login</Link>.</p>
      </main>
    );
  }

  const breweries = await getBreweries();

  return (
    <main className="page">
      <h1>Breweries</h1>
      <div className={styles.list}>
        {breweries.map((b: any) => (
          <div key={b.id} className={styles.item}>
            <strong>{b.name}</strong>{' '}
            <span className={styles.muted}>
              {b.city ? `— ${b.city}${b.region ? `, ${b.region}` : ''}` : ''}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
