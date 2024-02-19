'use client'
import Link from "next/link";
import Layout from "./component/layout";
import { useAuth, handleLogout } from "./useAuth";

export default function Home() {
  const isSignedIn = useAuth();

  return (
    <Layout>
      {isSignedIn ? (
        <>
          <h1>Dashboard</h1> 
          <Link href="/login" onClick={handleLogout}>
            Logout
          </Link>
        </>
      ) : null}
    </Layout>
  );
}
