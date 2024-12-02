import styles from './form.module.css'

const FormComponent = () => {
  return (
    <div className={styles.formWrapper}>
        <div className={styles.leftSection}>
            <h2 className={`${styles.titleText} titleTextWithGradient`}>Let&apos;s team up on this!</h2>
            <p className={`subTitleText`}>Let us help you become even greater at what you do. Fill out the following form and we will get back to you in the next 24 hours.</p>
            <button className={`${styles.btn} buttonWithGradient`}>
          <img src="/arrow.svg" alt="arrowImage" />
        </button>
        </div>
        <div className={styles.rightSection}>
            <div className={styles.inputWrapper}>
                <label htmlFor="name">What&apos;s your name?</label>
                <input type="text"  id='name' placeholder='Type your full Name'/>
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="email">What&apos;s your email address?</label>
                <input type="email"  id='email' placeholder='example.gmail.com'/>
            </div>
            <div className={styles.inputWrapper}>
                <label htmlFor="feedback">Anything else you&apos;d like us to know?</label>
                <input type="text" placeholder='Feel free to write...' id='feedback' />
            </div>
            <button className={`${styles.btn} buttonWithGradient`}>Learn More 
                <img src="/arrow.svg" alt="arrowImage" />
            </button>
        </div>
    </div>
  )
}

export default FormComponent