/* Pseudo Code */
/*// ============================================
// FILE: page.tsx
// ============================================

// --------------------------------------------
// 1. RENDERING TESTS
// --------------------------------------------

describe('Contact Page - Rendering', () => {

test('Should show the contact form when page loads', () => {
// Arrange
render(<ContactPage />)

// Assert
expect(page).toHaveElement('h2', 'Contact Us')
expect(page).toHaveElement('form')
expect(page).toHaveField('topic')
expect(page).toHaveField('fullName')
expect(page).toHaveField('email')
expect(page).toHaveField('message')
expect(page).toHaveButton('Submit form')
})

test('Should show breadcrumbs at the top', () => {
render(<ContactPage />)
expect(page).toHaveBreadcrumbs(['Home', 'Contact'])
})

test('Should show map and contact details in right column', () => {
render(<ContactPage />)
expect(page).toHaveElement('iframe', { title: 'Phekong Location Map' })
expect(page).toHaveText('Voorspoed, Welkom, 9460')
expect(page).toHaveText('phekongwellnesscenter@gmail.com')
expect(page).toHaveText('Mon - Fri, 08:00 - 17:00')
})

test('Should NOT show wholesale fields by default', () => {
render(<ContactPage />)
expect(page).NOT.toHaveField('businessName')
expect(page).NOT.toHaveField('estimatedVolume')
})

test('Should show product banner when productName is in URL', () => {
// Arrange
const urlParams = { productName: 'Vitamin C Serum' }
render(<ContactPage urlParams={urlParams} />)

// Assert
expect(page).toHaveText('Inquiry about product: Vitamin C Serum')
})

test('Should NOT show product banner when no productName in URL', () => {
render(<ContactPage />)
expect(page).NOT.toHaveText('Inquiry about product')
})
})

// --------------------------------------------
// 2. URL PARAMETER TESTS
// --------------------------------------------

describe('Contact Page - URL Parameters', () => {

test('Should set topic to "product_inquiry" when productName is in URL', () => {
// Arrange
const urlParams = { productName: 'Vitamin C' }
render(<ContactPage urlParams={urlParams} />)

// Assert
expect(page.getField('topic')).toHaveValue('product_inquiry')
})

test('Should set topic to "wholesale" when intent=wholesale in URL', () => {
const urlParams = { intent: 'wholesale' }
render(<ContactPage urlParams={urlParams} />)
expect(page.getField('topic')).toHaveValue('wholesale')
})

test('Should set topic to "loyalty" when intent=loyalty in URL', () => {
const urlParams = { intent: 'loyalty' }
render(<ContactPage urlParams={urlParams} />)
expect(page.getField('topic')).toHaveValue('loyalty')
})

test('Should set topic to "general" when no params in URL', () => {
render(<ContactPage />)
expect(page.getField('topic')).toHaveValue('general')
})

test('Should show productName and productId from URL in form state', () => {
const urlParams = {
productName: 'Vitamin C',
productId: '123'
}
render(<ContactPage urlParams={urlParams} />)

// The product banner shows the name
expect(page).toHaveText('Inquiry about product: Vitamin C')
// productId is stored but not displayed (hidden in state)
})

test('Should prioritize productName over intent in URL', () => {
// If both are present, productName wins
const urlParams = {
productName: 'Vitamin C',
intent: 'wholesale'
}
render(<ContactPage urlParams={urlParams} />)
expect(page.getField('topic')).toHaveValue('product_inquiry')
})
})

// --------------------------------------------
// 3. FORM INTERACTION TESTS
// --------------------------------------------

describe('Contact Page - Form Interactions', () => {

test('Should update formData when user types in name field', () => {
// Arrange
render(<ContactPage />)
const nameInput = page.getField('fullName')

// Act
nameInput.type('Kamo mops')

// Assert
expect(nameInput).toHaveValue('Kamo mops')
expect(page.getFormData()).toHaveProperty('fullName', 'kamo mops')
})

test('Should update formData when user types in email field', () => {
render(<ContactPage />)
const emailInput = page.getField('email')
emailInput.type('john@example.com')
expect(emailInput).toHaveValue('kamo@example.com')
})

test('Should update formData when user types in message field', () => {
render(<ContactPage />)
const messageField = page.getField('message')
messageField.type('I have a question about...')
expect(messageField).toHaveValue('I have a question about...')
})

test('Should update formData when user changes topic dropdown', () => {
render(<ContactPage />)
const topicSelect = page.getField('topic')

// Act
topicSelect.select('wholesale')

// Assert
expect(topicSelect).toHaveValue('wholesale')
expect(page.getFormData()).toHaveProperty('topic', 'wholesale')
})

test('Should show wholesale fields when topic is "wholesale"', () => {
render(<ContactPage />)
const topicSelect = page.getField('topic')

// Act
topicSelect.select('wholesale')

// Assert
expect(page).toHaveField('businessName')
expect(page).toHaveField('estimatedVolume')
})

test('Should hide wholesale fields when topic is NOT "wholesale"', () => {
render(<ContactPage />)
const topicSelect = page.getField('topic')

// Act - change to general
topicSelect.select('general')

// Assert
expect(page).NOT.toHaveField('businessName')
expect(page).NOT.toHaveField('estimatedVolume')
})

test('Should update businessName when user types in wholesale field', () => {
render(<ContactPage />)
const topicSelect = page.getField('topic')
topicSelect.select('wholesale')

const businessInput = page.getField('businessName')
businessInput.type('Apex Traders')

expect(businessInput).toHaveValue('Apex Traders')
})

test('Should update estimatedVolume when user selects from dropdown', () => {
render(<ContactPage />)
const topicSelect = page.getField('topic')
topicSelect.select('wholesale')

const volumeSelect = page.getField('estimatedVolume')
volumeSelect.select('50-80')

expect(volumeSelect).toHaveValue('50-80')
})
})

// --------------------------------------------
// 4. VALIDATION TESTS
// --------------------------------------------

describe('Contact Page - Form Validation', () => {

test('Should show error when submitting empty form', () => {
// Arrange
render(<ContactPage />)

// Act
page.clickButton('Submit form')

// Assert
expect(page).toHaveError('Full name is required.')
expect(page).toHaveError('Email address is required.')
expect(page).toHaveError('Message is required.')
expect(page).toShowModal('fill in required info')
})

test('Should show error when name is empty', () => {
render(<ContactPage />)
page.fill('email', 'bonnie@example.com')
page.fill('message', 'Hello')
page.clickButton('Submit form')

expect(page).toHaveError('Full name is required.')
expect(page.getField('fullName')).toHaveClass('error')
})

test('Should show error when email is empty', () => {
render(<ContactPage />)
page.fill('fullName', 'mpume nota')
page.fill('message', 'Hello')
page.clickButton('Submit form')

expect(page).toHaveError('Email address is required.')
expect(page.getField('email')).toHaveClass('error')
})

test('Should show error when message is empty', () => {
render(<ContactPage />)
page.fill('fullName', 'Thato Dan')
page.fill('email', 'dan@gmail.com')
page.clickButton('Submit form')

expect(page).toHaveError('Message is required.')
expect(page.getField('message')).toHaveClass('error')
})

test('Should show error when businessName is empty (wholesale mode)', () => {
render(<ContactPage />)
page.getField('topic').select('wholesale')
page.fill('fullName', 'Mpho John')
page.fill('email', 'john@gmail.com')
page.fill('message', 'I want to buy in bulk')
// Leave businessName empty
page.clickButton('Submit form')

expect(page).toHaveError('Company name is required.')
expect(page.getField('businessName')).toHaveClass('error')
})

test('Should NOT show error for businessName if not in wholesale mode', () => {
render(<ContactPage />)
page.getField('topic').select('general')
page.fill('fullName', 'Kamo Sefuthi')
page.fill('email', 'kamo@gmail.com')
page.fill('message', 'Hello')
// No businessName field to validate
page.clickButton('Submit form')

expect(page).NOT.toHaveError('Company name is required.')
})

test('Should clear error when user starts typing in error field', () => {
render(<ContactPage />)

// Submit with errors
page.clickButton('Submit form')
expect(page).toHaveError('Full name is required.')

// Start typing
page.getField('fullName').type('J')

// Error should clear
expect(page).NOT.toHaveError('Full name is required.')
expect(page.getField('fullName')).NOT.toHaveClass('error')
})

test('Should show modal when validation fails', () => {
render(<ContactPage />)
page.clickButton('Submit form')

expect(page).toShowModal('fill in required info')
expect(page).toHaveModalText('Please complete all mandatory fields...')
})

test('Should close modal when clicking "OK, Got it"', () => {
render(<ContactPage />)
page.clickButton('Submit form')
expect(page).toShowModal()

page.clickButton('OK, Got it')

expect(page).NOT.toShowModal()
})
})

// --------------------------------------------
// 5. SUBMISSION TESTS
// --------------------------------------------

describe('Contact Page - Form Submission', () => {

test('Should show "Submitting..." when form is submitted', () => {
// Arrange
render(<ContactPage />)
fillValidForm(page) // Helper function to fill all fields

// Act
page.clickButton('Submit form')

// Assert
expect(page.getButton('Submit form')).toHaveText('Submitting...')
expect(page.getButton('Submit form')).toBeDisabled()
})

test('Should show success message after submission', () => {
// Using fake timers for setTimeout
jest.useFakeTimers()

render(<ContactPage />)
fillValidForm(page)
page.clickButton('Submit form')

// Fast-forward 1.5 seconds
jest.advanceTimersByTime(1500)

expect(page).toHaveText(' Message Sent!')
expect(page).toHaveText('Thank you for reaching out...')
})

test('Should reset form after successful submission', () => {
jest.useFakeTimers()

render(<ContactPage />)
fillValidForm(page)
page.clickButton('Submit form')
jest.advanceTimersByTime(1500)

// Form should be empty
expect(page.getField('fullName')).toHaveValue('')
expect(page.getField('email')).toHaveValue('')
expect(page.getField('message')).toHaveValue('')
expect(page.getField('topic')).toHaveValue('general')
})

test('Should clear errors after successful submission', () => {
jest.useFakeTimers()

render(<ContactPage />)
fillValidForm(page)
page.clickButton('Submit form')
jest.advanceTimersByTime(1500)

// No errors should remain
expect(page).NOT.toHaveAnyErrors()
})

test('Should NOT reset productName from URL after submission', () => {
// This is a bug? Or intentional? Let's test it
const urlParams = { productName: 'Vitamin C' }
render(<ContactPage urlParams={urlParams} />)

// Fill and submit
fillValidForm(page)
page.clickButton('Submit form')
jest.advanceTimersByTime(1500)

// The product banner should still show?
// Actually it clears formData.productName on reset
// So product banner disappears
expect(page).NOT.toHaveText('Inquiry about product: Vitamin C')

// BUT - If we refresh the page, it would come back from URL
// This might be unexpected behavior - worth noting!
})
})

// --------------------------------------------
// 6. MAP INTERACTION TESTS
// --------------------------------------------

describe('Contact Page - Map and Location', () => {

test('Should show map iframe with correct src', () => {
render(<ContactPage />)
const iframe = page.getIframe('Phekong Location Map')
expect(iframe).toHaveAttribute('src').toContain('google.com/maps/embed')
expect(iframe).toHaveAttribute('referrerPolicy', 'strict-origin-when-cross-origin')
})

test('Should have map badge saying "Open in Google Maps"', () => {
render(<ContactPage />)
expect(page).toHaveText('Open in Google Maps')
})

test('Map link should open in new tab when clicked', () => {
render(<ContactPage />)
const mapLink = page.getLink({ title: 'Click to open location on Google Maps' })
expect(mapLink).toHaveAttribute('target', '_blank')
expect(mapLink).toHaveAttribute('rel', 'noopener noreferrer')
})

test('Map link should have correct Google Maps URL with CID', () => {
render(<ContactPage />)
const mapLink = page.getLink({ title: 'Click to open location on Google Maps' })
expect(mapLink).toHaveAttribute('href').toContain('maps.google.com')
expect(mapLink).toHaveAttribute('href').toContain('cid=13453291359813839929')
})

test('Address link should open Google Maps in new tab', () => {
render(<ContactPage />)
const addressLink = page.getLink({ text: 'Voorspoed, Welkom, 9460' })
expect(addressLink).toHaveAttribute('target', '_blank')
expect(addressLink).toHaveAttribute('rel', 'noopener noreferrer')
})

test('Address link should use the same Google Maps URL', () => {
render(<ContactPage />)
const addressLink = page.getLink({ text: 'Voorspoed, Welkom, 9460' })
expect(addressLink).toHaveAttribute('href').toContain('cid=13453291359813839929')
})
})

// --------------------------------------------
// 7. ACCESSIBILITY TESTS
// --------------------------------------------

describe('Contact Page - Accessibility', () => {

test('All form inputs should have associated labels', () => {
render(<ContactPage />)

const fields = ['fullName', 'email', 'topic', 'message']
fields.forEach(field => {
const input = page.getField(field)
expect(input).toHaveLabel()
expect(input).toHaveAttribute('id')
const label = page.getLabel({ htmlFor: input.id })
expect(label).toExist()
})
})

test('Error fields should have aria-invalid attribute', () => {
render(<ContactPage />)
page.clickButton('Submit form') // Triggers errors

expect(page.getField('fullName')).toHaveAttribute('aria-invalid', 'true')
expect(page.getField('email')).toHaveAttribute('aria-invalid', 'true')
expect(page.getField('message')).toHaveAttribute('aria-invalid', 'true')
})

test('Error fields should have aria-describedby linking to error message', () => {
render(<ContactPage />)
page.clickButton('Submit form')

const nameField = page.getField('fullName')
const errorId = nameField.getAttribute('aria-describedby')
expect(page).toHaveElement(#${errorId}`)
expect(page.getText(errorId)).toBe('Full name is required.')
})

test('Modal should have proper ARIA attributes', () => {
render(<ContactPage />)
page.clickButton('Submit form')

const modal = page.getModal()
expect(modal).toHaveAttribute('role', 'dialog')
expect(modal).toHaveAttribute('aria-modal', 'true')
})

test('Modal OK button should have autoFocus', () => {
render(<ContactPage />)
page.clickButton('Submit form')

const okButton = page.getButton('OK, Got it')
expect(okButton).toHaveAttribute('autoFocus')
})

test('Required fields should have asterisk in label', () => {
render(<ContactPage />)
expect(page.getLabel('Full name *')).toExist()
expect(page.getLabel('Email address *')).toExist()
expect(page.getLabel('Your message *')).toExist()
})
})

// --------------------------------------------
// 8. EDGE CASES & BUG PREVENTION TESTS
// --------------------------------------------

describe('Contact Page - Edge Cases', () => {

test('Should handle very long names gracefully', () => {
render(<ContactPage />)
const longName = 'A'.repeat(1000)
page.getField('fullName').type(longName)
// Should not crash or cut off
expect(page.getField('fullName')).toHaveValue(longName)
})

test('Should handle special characters in message', () => {
render(<ContactPage />)
const specialChars = '!@#$%^&*()_+{}:"&lt;&gt;?~'
page.getField('message').type(specialChars)
expect(page.getField('message')).toHaveValue(specialChars)
})

test('Should handle email with dots and plus signs', () => {
render(<ContactPage />)
page.getField('email').type('john.doe+test@gmail.com')
expect(page.getField('email')).toHaveValue('john.doe+test@gmail.com')
})

test('Should show wholesale fields when URL has intent=wholesale', () => {
const urlParams = { intent: 'wholesale' }
render(<ContactPage urlParams={urlParams} />)

// Topic should be wholesale
expect(page.getField('topic')).toHaveValue('wholesale')
// Wholesale fields should show immediately
expect(page).toHaveField('businessName')
expect(page).toHaveField('estimatedVolume')
})

test('Should handle unknown intent values gracefully', () => {
const urlParams = { intent: 'something_weird' }
render(<ContactPage urlParams={urlParams} />)
// Should default to 'general'
expect(page.getField('topic')).toHaveValue('general')
})

test('Should handle empty URL params gracefully', () => {
const urlParams = { productName: '', productId: '', intent: '' }
render(<ContactPage urlParams={urlParams} />)
expect(page.getField('topic')).toHaveValue('general')
expect(page).NOT.toHaveText('Inquiry about product')
})

test('Should handle missing productId but present productName', () => {
const urlParams = { productName: 'Vitamin C' }
render(<ContactPage urlParams={urlParams} />)
// Should still work, productId is just empty string
expect(page).toHaveText('Inquiry about product: Vitamin C')
})

test('Should prevent multiple submissions while sending', () => {
render(<ContactPage />)
fillValidForm(page)

// First click
page.clickButton('Submit form')
expect(page.getButton('Submit form')).toBeDisabled()

// Try clicking again
page.clickButton('Submit form') // Should do nothing
expect(page.getButton('Submit form')).toHaveText('Submitting...')
})

test('Form should not refresh page on submit (preventDefault)', () => {
render(<ContactPage />)
fillValidForm(page)

const event = new Event('submit', { cancelable: true })
const form = page.getForm()
form.dispatchEvent(event)

expect(event.defaultPrevented).toBe(true)
})
})

// --------------------------------------------
// 9. RESPONSIVE DESIGN TESTS (Visual)
// --------------------------------------------

describe('Contact Page - Responsive Design', () => {

test('Should show two columns on desktop', () => {
render(<ContactPage viewport: 'desktop' />)
const layout = page.getElement('.twoColumnLayout')
expect(layout).toHaveStyle('grid-template-columns: 1fr 1fr')
})

test('Should stack columns on mobile', () => {
render(<ContactPage viewport: 'mobile' />)
const layout = page.getElement('.twoColumnLayout')
expect(layout).toHaveStyle('grid-template-columns: 1fr')
})

test('Map should maintain aspect ratio on mobile', () => {
render(<ContactPage viewport: 'mobile' />)
const map = page.getElement('.mapContainer')
expect(map).toHaveStyle('height: 320px') // Fixed height
})
})

// --------------------------------------------
// 10. PERFORMANCE TESTS
// --------------------------------------------

describe('Contact Page - Performance', () => {

test('Map iframe should use lazy loading', () => {
render(<ContactPage />)
const iframe = page.getIframe('Phekong Location Map')
expect(iframe).toHaveAttribute('loading', 'lazy')
})

test('Should not cause unnecessary re-renders on input change', () => {
const renderCount = 0
// Mock the component to track renders
render(<ContactPage />)

page.getField('fullName').type('J') // One letter
// Should only re-render once per change

expect(componentRenders).toBeLessThan(3) // Initial + 1 change
})
})

// --------------------------------------------
// HELPER FUNCTIONS (For use in tests)
// --------------------------------------------

function fillValidForm(page) {
// Fill out the entire form correctly
page.getField('fullName').type('kamohelo pholi')
page.getField('email').type('kamohelop@gmail.com')
page.getField('message').type('This is a test message.')
// If wholesale is selected, fill those too
if (page.getField('topic').value === 'wholesale') {
page.getField('businessName').type('Kamohelo Enterprise')
page.getField('estimatedVolume').select('50-80')
}
}

function fillWholesaleForm(page) {
page.getField('topic').select('wholesale')
page.getField('fullName').type('Kamohelo Pholi')
page.getField('email').type('kamohelop@gmail.com')
page.getField('businessName').type('Mk Enterprises')
page.getField('message').type('We want to buy 100 units.')
page.getField('estimatedVolume').select('80+')
} */

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
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    setTimeout(() => {
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
    }, 1500);
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