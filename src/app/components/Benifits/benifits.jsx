import styles from "./benifits.module.css";



const cardDetails = [
  {
    id: 1,
    title: "Accuracy: ",
    desc: "AI systems can analyze vast amounts of data quickly and accurately, leading to more precise and reliable diagnoses. They can detect patterns and anomalies that may not be obvious to human clinicians",
    number: "01",
  },
  {
    id: 2,
    title: "Efficiency",
    desc: "AI systems can process patient data and medical records much faster than humans, reducing the time needed for diagnosis. This efficiency can lead to faster treatment decisions and improved patient outcomes",
    number: "02",
  },
  {
    id: 3,
    title: "Scalability",
    desc: "AI systems can be scaled to handle large volumes of data and can be deployed across different healthcare settings, from clinics to hospitals, improving access to quality healthcare",
    number: "03",
  },
  {
    id: 4,
    title: "Consistency",
    desc: "AI systems provide consistent results based on predefined algorithms, reducing the variability often seen in human diagnoses. This consistency can help standardize healthcare practices and improve overall quality of care",
    number: "04",
  },
  {
    id: 5,
    title: "Early Detection",
    desc: "AI systems can identify subtle signs and patterns that may indicate early stages of diseases or conditions, enabling early intervention and treatment. This can significantly improve prognosis and patient survival rates",
    number: "05",
  },
  {
    id: 6,
    title: "Decision Support",
    desc: "AI systems can provide valuable decision support to healthcare professionals by suggesting potential diagnoses based on data analysis. This can complement clinicians expertise and lead to more informed treatment plans",
    number: "06",
  },
];

const Benifits = () => {
  return (
    <div className={styles.befinitsWrapper}>
      <h2 className={`${styles.benifitTitle} titleTextWithGradient`}>
        Our Benifits
      </h2>
      <div className={styles.cards}>
        {cardDetails?.map((card) => (
          <div className={styles.card} key={card.id}>
            <div className={styles.cardIcon}>
                <img src="/upDownArrow.svg" alt="iconImage" />
            </div>
            <h3 className={styles.cardTitle}>{card.title}</h3>
            <p className={styles.cardDesc}>{card.desc}</p>
            <div className={`${styles.cardNumber} titleTextWithGradient`}>
              {card.number}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Benifits;
