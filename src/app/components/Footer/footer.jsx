import styles from "./footer.module.css"

const Footer = () => {
  
  return (
    <div className={styles.wrapper}>
      <div className={styles.footerWrapper}>
      <div className={styles.contentWrapper}>
        <div className={styles.left}>
          <p className={styles.footerHeading}>About Us</p>
          <p className={styles.footerHeading}>Contact Us</p>
          <p className={styles.footerPara}>Have questions or feedback? We&apos;re here to help! Feel free to reach out to our dedicated support team via email at <span><a href="#">axamine@support.com</a></span> or give us a call at <span>+91 12345 67890</span>. We look forward to assisting you!</p>
          <p className={styles.footerHeading}>FAQs</p>
          <p className={styles.footerPara}>Got questions? We&apos;ve got answers! Explore our frequently asked questions to find solutions to common queries about our app. If you don&apos;t find what you&apos;re looking for, don&apos;t hesitate to reach out to our support team for further assistance.</p>
          <p className={styles.footerPara}>see people&apos;s question here : <span><a href="#">faqs.support.com</a></span></p>
        </div>
        <div className={styles.middle}>
          <p className={styles.footerHeading}>Privacy Policy</p>
          <p className={styles.footerPara}>Your privacy matters to us. Our Privacy Policy outlines how we collect, use, and protect your personal information while using our app. We are committed to ensuring the confidentiality and security of your data.<span>check it here</span></p>
          <p className={styles.footerHeading}>Terms & Conditions</p>
          <p className={styles.footerPara}>By using our app, you agree to abide by our Terms & Conditions. These terms govern the use of our services, including rights, responsibilities, and limitations. Please review them carefully to understand your rights and obligations while using our app.<span>check it here</span></p>
          <p className={styles.footerHeading}>Download App</p>
          <p className={styles.footerPara}>downlode from : <span>apple app store , google play store</span></p>
        </div>
        <div className={styles.right}>
          <p className={styles.footerHeading}>social media links</p>
          <ul className={styles.links}>
            <li><a href="https://www.instagram.com/axamine.ai" target="_blank" className={styles.link}>Instagram</a></li>
            <li><a href="https://www.linkedin.com/company/axamine-ai/" target="_blank" className={styles.link}>LinkedIn</a></li>
            <li><a href="https://twitter.com/axamine_ai" target="_blank" className={styles.link}>Twitter</a></li>
          </ul>
          <p className={styles.footerHeading}>Blog Or News</p>
          <p className={styles.footerPara}>Stay up-to-date with the latest trends, tips, and news in the world of shopping and technology. Explore our blog for insightful articles, product updates, and industry news. Join us on a journey of discovery and innovation! <span>click it here</span></p>
        </div>
      </div>
      <p className={styles.footerCopyRight}>Copyright © <span>2024 Axamine.ai</span>. All rights reserved.</p>
      
      </div>
    </div>
  )
}

export default Footer