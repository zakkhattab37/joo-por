import { useState } from 'react';
import { FiArrowUpRight, FiLinkedin, FiSend } from 'react-icons/fi';
import SectionHeading from './motion/SectionHeading';
import Reveal from './motion/Reveal';
import { certifications, profile } from '../data/portfolio';
import './Contact.css';

const fields = [
  { name: 'name', label: 'Your name', autoComplete: 'name', maxLength: 100 },
  { name: 'email', label: 'Your email', type: 'email', autoComplete: 'email', maxLength: 254 },
  { name: 'message', label: 'Tell me about your project', as: 'textarea', rows: 5, maxLength: 3000 },
];

function Field({ as: Tag = 'input', name, label, ...props }) {
  return (
    <label className={`contact-field contact-field-${name}`}>
      <span>{label}</span>
      <Tag name={name} required {...props} />
    </label>
  );
}

export default function Contact() {
  const [pending, setPending] = useState(false);
  const [feedback, setFeedback] = useState(null);

  async function submit(event) {
    event.preventDefault();
    if (pending) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setPending(true);
    setFeedback(null);
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (!response.ok || result.status !== 'saved') {
        throw new Error(result.error || 'The message could not be saved.');
      }
      form.reset();
      setFeedback({ text: 'Thanks! Your message has been saved.' });
    } catch (error) {
      const text = error instanceof SyntaxError || error instanceof TypeError
        ? 'The contact service is unavailable. Please try again or reach out on LinkedIn.'
        : error.message;
      setFeedback({ text, error: true });
    } finally {
      setPending(false);
    }
  }

  return (
    <section id="contact" className="section contact">
      <div className="container">
        <SectionHeading
          index={certifications.length ? '05' : '04'}
          eyebrow="Contact"
          title="Let’s build something together"
          highlight="together"
          subtitle="Send a message about a project or a backend development opportunity."
        />
        <div className="contact-grid">
          <Reveal direction="right">
            <a className="contact-method card" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              <span className="contact-method-icon"><FiLinkedin aria-hidden="true" /></span>
              <span><small>LinkedIn</small><strong>Yousef Elaraby</strong></span>
              <FiArrowUpRight className="contact-method-arrow" aria-hidden="true" />
            </a>
          </Reveal>
          <Reveal direction="left" delay={0.15}>
            <form className="contact-form card" onSubmit={submit} aria-busy={pending}>
              <fieldset disabled={pending}>
                <div className="contact-fields">
                  {fields.map((field) => <Field key={field.name} {...field} />)}
                </div>
                <button type="submit" className="btn btn-primary">
                  {pending ? 'Sending…' : 'Send message'} <FiSend aria-hidden="true" />
                </button>
              </fieldset>
              {feedback && (
                <p className="contact-feedback" role={feedback.error ? 'alert' : 'status'}>{feedback.text}</p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
