import styles from './form.module.css';

const FormComponent = () => {
    const handleGmailClick = () => {
        const name = document.getElementById('name').value || "N/A";
        const email = document.getElementById('email').value || "N/A";
        const feedback = document.getElementById('feedback').value || "N/A";
      
        const subject = `Team Up Request from ${name}`;
        const body = `Hello Team,My name is ${name}.My email address is: ${email}.Here’s something I’d like you to know:%0D%0A${feedback}Looking forward to teaming up!Best regards,${name}`;
      
        const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=support@axamine.in&su=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
      
        // Open the Gmail Compose interface in a new tab
        window.open(gmailLink, '_blank');
      };
      
      

  return (
    <div className={styles.formWrapper}>
      <div className={styles.leftSection}>
        <h2 className={`${styles.titleText} titleTextWithGradient`}>
          Let&apos;s team up on this!
        </h2>
        <p className={`subTitleText`}>
          Let us help you become even greater at what you do. Fill out the
          following form and we will get back to you in the next 24 hours.
        </p>
        <button
          className={`${styles.btn} buttonWithGradient`}
          onClick={handleGmailClick}
        >
          <img src="/arrow.svg" alt="arrowImage" />
        </button>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.inputWrapper}>
          <label htmlFor="name">What&apos;s your name?</label>
          <input type="text" id="name" placeholder="Type your full Name" />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="email">What&apos;s your email address?</label>
          <input
            type="email"
            id="email"
            placeholder="example@gmail.com"
          />
        </div>
        <div className={styles.inputWrapper}>
          <label htmlFor="feedback">
            Anything else you&apos;d like us to know?
          </label>
          <input
            type="text"
            placeholder="Feel free to write..."
            id="feedback"
          />
        </div>
        <button
          className={`${styles.btn} buttonWithGradient`}
          onClick={handleGmailClick}
        >
          Contact us
          <img src="/arrow.svg" alt="arrowImage" />
        </button>
      </div>
    </div>
  );
};

export default FormComponent;
