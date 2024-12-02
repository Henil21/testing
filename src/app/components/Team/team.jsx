import Image from "next/image";
import styles from "./team.module.css";
import profile1 from "@/../../public/profile1.png";
import profile2 from "@/../../public/profile2.png";
import Link from "next/link";

const teamMembers = [
  {
    id: 1,
    name: 'Henilsinh Raj',
    tag: 'Founder',
    image: profile1
  },
  {
    id: 2,
    name: 'Parth bangoria',
    tag: 'co-founder',
    image: profile2
  }
]

const Team = () => {
  console.log();
  return (
    <div className={styles.teamWrapper}>
      <h2 className={`${styles.teamTitle} titleTextWithGradient`}>Our Team</h2>
      <p className={`${styles.teamText} subTitleText`}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. A ullam
        inventore totam nam nulla possimus. In ut at facere tempora.{" "}
      </p>
      <div className={styles.profileCards}>
        {
          teamMembers?.map((card, index) => (
            // <div className={`${styles.profileCard} ${styles.card1} ${Math.round(teamMembers.length / 2 - 1) === index ? styles.active : ""}`} key={index}>
            <div className={`${styles.profileCard}`} key={index}>
                <div className={styles.backgroundImage}>
                    <Image src={card.image} fill sizes="20%" alt="profile" placeholder="blur"/>
                </div>
                <div className={styles.content}>
                    <p className={styles.tag}>{card.tag}</p>    
                    <p className={styles.name}>{card.name}</p>   
                </div>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Team;
