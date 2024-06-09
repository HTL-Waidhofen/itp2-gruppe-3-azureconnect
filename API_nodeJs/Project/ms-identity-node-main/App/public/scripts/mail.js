class Mail {
    constructor(id, bodyPreview, webLink, senderName, senderMail) {
        this.id = id;
        this.bodyPreview = bodyPreview;
        this.webLink = webLink;
        this.senderName = senderName;
        this.senderMail = senderMail;
    }
}

const mails = [];

emails.value.forEach(item => {
    const mail = new Mail(item.id, item.bodyPreview, item.webLink, item.sender.emailAddress.name, item.sender.emailAddress.address);
    mails.push(mail);
});

console.log(mails);

function getEmailBody(id){
    let matches = 0;

    mails.forEach(mail => {
        if (mail.id === id) {
            document.getElementById('mailheader').innerHTML = `
                            <h2>Von</h2>
                            <div class="text">${mail.senderName}<br/><a target="_blank" href="mailto:${mail.senderMail}">${mail.senderMail}</a></div>
                            <a target="_blank" href="${mail.webLink}"><i class='bx bx-globe hovericon'></i></a>`;
            document.getElementById('mailbody').innerHTML = `<div class="text">${mail.bodyPreview}</div>`;
            matches = 1;
            return;
        }
    });

    if(matches = 0){
            document.getElementById('mailheader').innerHTML = `<h2>Fehler</h2>`
            document.getElementById('mailbody').innerHTML = `<div class="text">Email konnte nicht geladen werden.</div>`
    }

}