import Head from "next/head";
import Footer from "../pages/footer";



export const pageTitle = "Login Sigup Next.js";

export default function Layout({pageTitle, children}) {
    const Title = " Login signup Next.js";

    return(
        <div>
           
            <Head>
            <link rel="shortcut icon" href="/favicon.ico" />
            <meta charSet="utf-8" />
           
            <title> {pageTitle} </title>
            </Head>
            <main style={{minHeight:'80vh'}}>
            {children}
            </main>
          <Footer/>
        </div>
    )

}

