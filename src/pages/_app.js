import Head from "next/head";
import "./styles.css";

function App({ Component, pageProps }) {
  return (
    <div className="root">
      <Head>
        <title>GPT-3 Dialogue</title>
      </Head>
      <Component {...pageProps} />
    </div>
  );
}
export default App;
