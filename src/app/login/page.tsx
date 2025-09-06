'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Login.module.scss';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) router.push('/breweries');
    else {
      const j = await res.json().catch(() => null);
      setErr(j?.error || 'Login failed');
    }
  }

  return (
    <main className={`page ${styles.wrap}`}>
      <h1>Sign in</h1>
      <form onSubmit={onSubmit} className={styles.panel}>
        <div className={styles.row}>
          <label className={styles.label}>Email</label>
          <input className={styles.input} value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Password</label>
          <input className={styles.input} type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        {err && <p className={styles.error}>{err}</p>}
        <div className={styles.actions}>
          <button className="primary" disabled={loading} type="submit">{loading ? '…' : 'Log in'}</button>
        </div>
      </form>
    </main>
  );
}
