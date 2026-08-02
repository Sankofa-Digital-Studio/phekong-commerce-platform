'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import { Breadcrumbs } from '../../components/routes/Breadcrumbs';
import shared from '../../components/routes/route-page.module.css';
import { ApplicationShell } from '../../components/shell/ApplicationShell';
import styles from './page.module.css';

function ContactContent() {
  const searchParams = useSearchParams();

  const queryProduct = searchParams.get('productName') || '';
  const queryProductId = searchParams.get('productId') || '';
  const queryIntent = searchParams.get('intent') || '';

  let initialTopic = 'general';
  if (queryProduct) {
    initialTopic = 'product_inquiry';
  } else if (queryIntent === 'wholesale') {
    initialTopic = 'wholesale';
  } else if (queryIntent === 'loyalty') {
    initialTopic = 'loyalty';
  }

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    topic: initialTopic,
    productId: queryProductId,
    productName: queryProduct,
    businessName: '',
    estimatedVolume: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [showModal, setShowModal] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [serverErrorMessage, setServerErrorMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
    if (serverErrorMessage) {
      setServerErrorMessage('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, boolean> = {};

    if (!formData.fullName.trim()) newErrors.fullName = true;
    if (!formData.email.trim()) newErrors.email = true;
    if (!formData.message.trim()) newErrors.message = true;

    if (formData.topic === 'wholesale' && !formData.businessName.trim()) {
      newErrors.businessName = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setShowModal(true);
      return;
    }

    setStatus('sending');
    setServerErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName: formData.fullName,
          email: formData.email,
          topic: formData.topic,
          productId: formData.productId || null,
          businessName: formData.businessName || null,
          estimatedVolume: formData.estimatedVolume || null,
          message: formData.message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit enquiry. Please try again.');
      }

      // Truthful success confirmed by backend
      setStatus('success');
      setFormData({
        fullName: '',
        email: '',
        topic: 'general',
        productId: '',
        productName: '',
        businessName: '',
        estimatedVolume: '',
        message: '',
      });
      setErrors({});
    } catch (err: unknown) {
      setStatus('error');
      const message = err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setServerErrorMessage(message);
    }
  };

  return (
    <main className={`${shared.page} ${styles.flow}`}>
      <Breadcrumbs
        items={[
          { label: 'Home', href: '/' },
          { label: 'Contact' },
        ]}
      />

      <section className={shared.section} style={{ marginTop: '1rem' }}>
        <div className={styles.twoColumnLayout}>
          
          {/* Form */}
          <div className={styles.formColumn}>
            <h2 className={styles.formTitle}>Contact Us</h2>

            {formData.productName && (
              <div className={styles.productBanner}>
                <p>
                  Inquiry about product: <strong>{formData.productName}</strong>
                </p>
              </div>
            )}

            {status === 'error' && serverErrorMessage && (
              <div style={{ padding: '1rem', marginBottom: '1rem', backgroundColor: '#fee2e2', border: '1px solid #ef4444', borderRadius: '0.375rem', color: '#991b1b' }}>
                <p><strong>Submission Failed:</strong> {serverErrorMessage}</p>
              </div>
            )}

            {status === 'success' ? (
              <div className={styles.successMessage}>
                <h3> Message Sent!</h3>
                <p>Thank you for reaching out. Our team will review your inquiry and get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className={styles.contactForm}>
                
                {/* Topic */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="topic" className={styles.fieldLabel}>
                    Inquiry Type *
                  </label>
                  <select
                    id="topic"
                    name="topic"
                    value={formData.topic}
                    onChange={handleChange}
                    className={styles.fieldSelect}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="product_inquiry">Product Question</option>
                    <option value="wholesale">Apply for Bulk / Wholesale Account</option>
                    <option value="loyalty">Claim Loyalty Program Upgrade</option>
                  </select>
                </div>

                {/* Name */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="fullName" className={`${styles.fieldLabel} ${errors.fullName ? styles.error : ''}`}>
                    Full name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`${styles.fieldInput} ${errors.fullName ? styles.error : ''}`}
                    aria-invalid={errors.fullName ? 'true' : 'false'}
                    aria-describedby={errors.fullName ? 'fullNameError' : undefined}
                  />
                  {errors.fullName && (
                    <p id="fullNameError" className={styles.errorText}>
                      Full name is required.
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="email" className={`${styles.fieldLabel} ${errors.email ? styles.error : ''}`}>
                    Email address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    className={`${styles.fieldInput} ${errors.email ? styles.error : ''}`}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'emailError' : undefined}
                  />
                  {errors.email && (
                    <p id="emailError" className={styles.errorText}>
                      Email address is required.
                    </p>
                  )}
                </div>

                {/* Wholesale fields */}
                {formData.topic === 'wholesale' && (
                  <>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="businessName" className={`${styles.fieldLabel} ${errors.businessName ? styles.error : ''}`}>
                        Company / Business Name *
                      </label>
                      <input
                        id="businessName"
                        type="text"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        placeholder="e.g. Apex Traders Ltd"
                        className={`${styles.fieldInput} ${errors.businessName ? styles.error : ''}`}
                        aria-invalid={errors.businessName ? 'true' : 'false'}
                        aria-describedby={errors.businessName ? 'businessNameError' : undefined}
                      />
                      {errors.businessName && (
                        <p id="businessNameError" className={styles.errorText}>
                          Company name is required.
                        </p>
                      )}
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="estimatedVolume" className={styles.fieldLabel}>
                        Estimated Monthly Volume
                      </label>
                      <select
                        id="estimatedVolume"
                        name="estimatedVolume"
                        value={formData.estimatedVolume}
                        onChange={handleChange}
                        className={styles.fieldSelect}
                      >
                        <option value="">Select volume range</option>
                        <option value="10-50">10 - 50 units/month</option>
                        <option value="50-80">50 - 80 units/month</option>
                        <option value="80+">80+ units/month</option>
                      </select>
                    </div>
                  </>
                )}

                {/* Message */}
                <div className={styles.fieldGroup}>
                  <label htmlFor="message" className={`${styles.fieldLabel} ${errors.message ? styles.error : ''}`}>
                    Your message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    className={`${styles.fieldTextarea} ${errors.message ? styles.error : ''}`}
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'messageError' : undefined}
                  />
                  {errors.message && (
                    <p id="messageError" className={styles.errorText}>
                      Message is required.
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className={styles.submitButton}
                >
                  {status === 'sending' ? 'Submitting...' : 'Submit form'}
                </button>
              </form>
            )}
          </div>

          {/* RIGHT: Map and Contact Info */}
          <div className={styles.rightColumn}>
            
            {/* Map */}
            <div className={styles.mapContainer}>
              <a
                href="https://maps.google.com/?cid=13453291359813839929"
                target="_blank"
                rel="noopener noreferrer"
                title="Click to open location on Google Maps"
                className={styles.mapLink}
              >
                <iframe
                  title="Phekong Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28185.070411601853!2d26.77593545!3d-27.9898025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e910cddb859c397%3A0xbab3b13691892c39!2sVoorspoed%2C%20Welkom%2C%209460!5e0!3m2!1sen!2sza!4v1784743938245!5m2!1sen!2sza"
                  className={styles.mapIframe}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
                <div className={styles.mapBadge}>
                  Open in Google Maps
                </div>
              </a>
            </div>

            {/* Contact Details */}
            <div className={styles.contactDetails}>
              <h3>Our Direct Details</h3>
              <p className={styles.contactLine}>
                <strong>Address:</strong>{' '}
                <a
                  href="https://maps.google.com/?cid=13453291359813839929"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Voorspoed, Welkom, 9460
                </a>
              </p>
              <p className={styles.contactRow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span><strong>Support Email:</strong> phekongwellnesscenter@gmail.com</span>
              </p>
              <p className={styles.contactRow}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                <span><strong>Business Hours:</strong> Mon - Fri, 08:00 - 17:00</span>
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} role="dialog" aria-modal="true">
          <div className={styles.modalContent}>
            <div className={styles.modalIcon}>
              <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h3 className={styles.modalTitle}>fill in required info</h3>
            <p className={styles.modalText}>
              Please complete all mandatory fields marked with an asterisk (*) highlighted in red.
            </p>
            <button
              onClick={() => setShowModal(false)}
              className={styles.modalButton}
              autoFocus
            >
              OK, Got it
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default function ContactPage() {
  return (
    <ApplicationShell>
      <Suspense fallback={<div>Loading contact page...</div>}>
        <ContactContent />
      </Suspense>
    </ApplicationShell>
  );
}