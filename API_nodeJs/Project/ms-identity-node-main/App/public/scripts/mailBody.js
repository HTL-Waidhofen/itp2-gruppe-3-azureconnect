
console.log("Checkpoint0");
document.addEventListener('DOMContentLoaded', () => {
    const mailItems = document.querySelectorAll('.mail-item');
    const emailSubject = document.getElementById('email-subject');
    const emailBody = document.getElementById('email-body');

    mailItems.forEach(item => {
        item.addEventListener('click', async () => {
            console.log("Checkpoint1");
            const emailId = item.getAttribute('data-id');
            const subject = item.textContent.split(' - ')[0];
            
            try {
                const response = await fetch(`https://graph.microsoft.com/v1.0/me/messages/${emailId}$select=body`);
                if (!response.ok) {
                    throw new Error('Failed to fetch email body');
                }
                const emailData = await response.json();
                const body = emailData.body.content;

                // Update the mail text section with email subject and body
                emailSubject.textContent = subject;
                emailBody.innerHTML = body;
            } catch (error) {
                console.error('Error fetching email body:', error);
                emailBody.innerHTML = '<p>Error loading email content.</p>';
            }
        });
    });
});