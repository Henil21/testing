import Image from "next/image";
import styles from "./home.module.css";
import image1 from "@/../../public/2.png";
import image2 from "@/../../public/1.png";
import Link from "next/link";
import Head from "next/head";

const Home = () => {
  return (
    <>
      <Head>
        <title>Axamine.ai- Ai-integrated Diagnostic</title>
        <meta
          name="description"
          content="Axamine, an AI-powered diagnostic system, revolutionizes healthcare by empowering professionals to make precise diagnoses efficiently."
        />
        <meta
          name="keywords"
          content="Axamine, AI, axamine ai, Henilsinh Raj, axamine ,examine  Diagnostic, Healthcare, Technology"
        />
        <link rel="canonical" href="https://www.axamine.in" />
      </Head>
      <div className={styles.homeWrapper}>
        <div className={styles.left}>
          <h1 className={styles.heroTitle}>AI-integrated Diagnostic</h1>
          <p className={`${styles.heroText} subTitleText`}>
            Axamine, an AI-powered diagnostic system, revolutionizes healthcare
            by empowering professionals to make precise diagnoses efficiently.
            Its AI systems process complicated medical data quickly and
            accurately, decreasing errors and enhancing treatment decisions.
            Axamine improves diagnostic workflows, saving healthcare workers
            considerable time and ensuring patients receive timely
            interventions. This efficiency and precision immediately contribute
            to better patient care and results, making Axamine an indispensable
            tool in healthcare settings{" "}
          </p>
          <Link href={"/report"}>
            <button className={`${styles.btn} buttonWithGradient`}>
              Demo Request
              <img src="/arrow.svg" alt="arrowImage" />
            </button>
          </Link>
        </div>
        <div className={styles.right}>
          <div className={styles.rightWrapper}>
            <div className={`${styles.image1} ${styles.image}`}>
              <Image
                src={image1}
                sizes="250px"
                fill
                alt="image"
                placeholder="blur"
              />
            </div>
            <div className={`${styles.image2} ${styles.image}`}>
              <Image
                src={image2}
                fill
                sizes="250px"
                alt="image"
                placeholder="blur"
              />
            </div>
            <div className={styles.cards}>
              <div className={`${styles.card} ${styles.card1}`}>
                <span></span>
                Healthcare Professionals
              </div>
              <div className={`${styles.card} ${styles.card2}`}>
                <span></span>
                Accurate Diagnoses
              </div>
              <div className={`${styles.card} ${styles.card3}`}>
                <span></span>
                Optimize Treatment Plans
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
