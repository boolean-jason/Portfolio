export default function Contact() {
  return (
    <>
      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">CONTACT.EXE</span>
            <span className="section-index">JL - ARCHIVE / 005</span>
          </div>

          <div className="contact-grid">
            <p className="contact-big">
              Got something to build?<br />Let's talk.
            </p>

            <div className="contact-links">
              <a className="contact-link" href="mailto:Jasonhunyhle@gmail.com">
                <span>Email</span>
                <span>&#8599;</span>
              </a>
              <a
                className="contact-link"
                href="https://linkedin.com/in/jason-le-461317331"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>LinkedIn</span>
                <span>&#8599;</span>
              </a>
              <a className="contact-link" href="tel:+31642708724">
                <span>Phone</span>
                <span>&#8599;</span>
              </a>
              <a className="contact-link" href="#top">
                <span>Back to top</span>
                <span>&#8599;</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <span>&copy; {new Date().getFullYear()} Jason Huynh Le</span>
        <span>Almere, NL - Built with React Three Fiber</span>
      </footer>
    </>
  )
}
