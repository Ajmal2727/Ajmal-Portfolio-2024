// 1. First, add EmailJS SDK to your HTML file (add this before closing body tag)
// <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>

// 2. Initialize EmailJS with your public key
(function() {
    // Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
    emailjs.init('gY03y2uPkbC4cOzud');
})();

// 3. Add this JavaScript code to handle form submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Show loading state
    const submitButton = this.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.disabled = true;
    submitButton.innerHTML = 'Sending...';

    // Prepare template parameters to match your email template
    const templateParams = {
        to_name: 'Ajmal', // Your name or how you want to be addressed
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    // Send email using EmailJS
    // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual EmailJS service and template IDs
    emailjs.send('service_b8b6hz9', 'template_bhxarsh', templateParams)
        .then(function(response) {
            // Show success message
            submitButton.innerHTML = 'Message Sent!';
            submitButton.classList.remove('from-cyan-500', 'to-fuchsia-500');
            submitButton.classList.add('from-green-500', 'to-green-600');
            
            // Reset form
            document.getElementById('contactForm').reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('from-green-500', 'to-green-600');
                submitButton.classList.add('from-cyan-500', 'to-fuchsia-500');
            }, 3000);
        })
        .catch(function(error) {
            // Show error message
            submitButton.innerHTML = 'Error sending message';
            submitButton.classList.remove('from-cyan-500', 'to-fuchsia-500');
            submitButton.classList.add('from-red-500', 'to-red-600');
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                submitButton.classList.remove('from-red-500', 'to-red-600');
                submitButton.classList.add('from-cyan-500', 'to-fuchsia-500');
            }, 3000);
            
            console.error('EmailJS Error:', error);
        });
});