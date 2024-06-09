class Mail {
    constructor(id, content) {
        this.id = id;
        this.content = content;
    }
}

const mails = [];

emails.value.forEach(item => {
    const mail = new Mail(item.id, item.body.content);
    mails.push(mail);
});

console.log(mails);

function getEmailBody(id){
    let matches = 0;

    mails.forEach(mail => {
        if (mail.id === id) {
            document.getElementById('mailbody').innerHTML = `<p>${mail.content}</p>`;
            matches = 1;
            return;
        }
    });

    if(matches = 0)
            document.getElementById('mailbody').innerHTML = `<p>Email konnte nicht geladen werden.</p>`

}