"use client";

import Home from "./components/Home/home";
import styles from "./page.module.css";
import About from "./components/About/about";
import Benifits from "./components/Benifits/benifits";
// import Team from "./components/Team/team";
import FormComponent from "./components/Form/form";
import Head from "next/head";

const App = () => {
  return (
    <>
      <Head>
        <title>Axamine.ai - Ai Integrated Diagnostic</title>
        <meta
          name="description"
          content="Axamine is an Ai integrated diagnostic platform offering state-of-the-art solutions."
        />
        <meta
          name="keywords"
          content="Axamine, AI, Diagnostic, Healthcare, Technologyy"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.axamine.in" />
      </Head>
      <main className={styles.main}>
        <section id="home">
          <Home />
        </section>

        <section id="about">
          <About />
        </section>

        <section id="benifits">
          <Benifits />
        </section>

        {/* <section id="team">
          <Team />
        </section> */}

        <section id="contact" className={styles.formWrapper}>
          <FormComponent />
        </section>
      </main>
    </>
  );
};

export default App;
