console.log("KMS Holmans Legacy Lending Website Loaded");

// Function to handle opening different windows/sections
function openWindow(windowType) {
  switch(windowType) {
    case 'apply':
      // Open loan application window
      const applyModal = document.createElement('div');
      applyModal.className = 'modal-overlay';
      applyModal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" onclick="closeModal()">&times;</button>
          <h2>📝 Apply for a Loan</h2>
          <p>Welcome to the KMS Holmans Legacy Lending application portal.</p>
          <form class="loan-application-form">
            <input type="text" placeholder="Full Name" required>
            <input type="email" placeholder="Email Address" required>
            <input type="tel" placeholder="Phone Number" required>
            <input type="number" placeholder="Loan Amount Requested" required>
            <select required>
              <option value="">Select Loan Type</option>
              <option value="personal">Personal Loan</option>
              <option value="business">Business Loan</option>
              <option value="mortgage">Mortgage</option>
            </select>
            <button type="submit" class="btn-primary">Submit Application</button>
          </form>
        </div>
      `;
      document.body.appendChild(applyModal);
      break;
      
    case 'learn':
      // Open learn more window
      const learnModal = document.createElement('div');
      learnModal.className = 'modal-overlay';
      learnModal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" onclick="closeModal()">&times;</button>
          <h2>📚 Learn More About KMS Holmans Legacy Lending</h2>
          <div class="learn-content">
            <h3>Our Mission</h3>
            <p>To provide transparent, AI-powered lending solutions that empower individuals and businesses to achieve their financial goals.</p>
            
            <h3>How It Works</h3>
            <ol>
              <li>Submit your application through our secure portal</li>
              <li>Our AI analyzes your information instantly</li>
              <li>Get approved in minutes</li>
              <li>Receive funds quickly and securely</li>
            </ol>
            
            <h3>Why Choose Us?</h3>
            <ul>
              <li>Fast approval process</li>
              <li>Competitive rates</li>
              <li>Blockchain security</li>
              <li>Transparent terms</li>
              <li>24/7 customer support</li>
            </ul>
          </div>
        </div>
      `;
      document.body.appendChild(learnModal);
      break;
      
    case 'contact':
      // Open contact window
      const contactModal = document.createElement('div');
      contactModal.className = 'modal-overlay';
      contactModal.innerHTML = `
        <div class="modal-content">
          <button class="modal-close" onclick="closeModal()">&times;</button>
          <h2>💬 Contact Us</h2>
          <p>Have questions? We're here to help!</p>
          <form class="contact-form">
            <input type="text" placeholder="Your Name" required>
            <input type="email" placeholder="Your Email" required>
            <select required>
              <option value="">Select Topic</option>
              <option value="general">General Inquiry</option>
              <option value="application">Application Status</option>
              <option value="support">Technical Support</option>
              <option value="feedback">Feedback</option>
            </select>
            <textarea placeholder="Your Message" rows="5" required></textarea>
            <button type="submit" class="btn-primary">Send Message</button>
          </form>
          <div class="contact-info">
            <h3>Other Ways to Reach Us</h3>
            <p>📧 Email: support@kmsholmanslegacy.com</p>
            <p>📞 Phone: 1-800-KMS-LOAN</p>
            <p>🕗 Hours: 24/7 Support Available</p>
          </div>
        </div>
      `;
      document.body.appendChild(contactModal);
      break;
  }
}

// Function to close modal windows
function closeModal() {
  const modals = document.querySelectorAll('.modal-overlay');
  modals.forEach(modal => modal.remove());
}

// Close modal when clicking outside the content
document.addEventListener('click', function(event) {
  if (event.target.classList.contains('modal-overlay')) {
    closeModal();
  }
});

// Handle form submissions
document.addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Thank you! Your submission has been received. Our team will contact you shortly.');
  closeModal();
});

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
