const fs = require('fs');
let contact = fs.readFileSync('contact.html', 'utf8');
let index = fs.readFileSync('index.html', 'utf8');

let startIdx = index.indexOf('<section id="book-section"');
let endIdx = index.indexOf('</section>', startIdx) + 10;
let bookSection = index.substring(startIdx, endIdx);

let contactMainStart = contact.indexOf('<main>');
let contactMainEnd = contact.indexOf('</main>') + 7;

let heroStart = contact.indexOf('<section class="page-hero');
let heroEnd = contact.indexOf('</section>', heroStart) + 10;
let heroSection = contact.substring(heroStart, heroEnd);
// Change hero text
heroSection = heroSection.replace('Get in <span class="text-primary">Touch</span>', 'Book a <span class="text-primary">Service</span>');
heroSection = heroSection.replace('Book a service, request an estimate, or reach our 24/7 emergency dispatch.', 'Fill out the form below and our team will get back to you immediately.');

let newMain = '<main>\n        ' + heroSection + '\n\n        ' + bookSection + '\n    </main>';

let newContact = contact.substring(0, contactMainStart) + newMain + contact.substring(contactMainEnd);

newContact = newContact.replace('<title>Contact Us | VoltCore</title>', '<title>Book Service | VoltCore</title>');
newContact = newContact.replace('<a class="nav-link active fw-medium" href="contact.html">Contact</a>', '<a class="nav-link fw-medium" href="contact.html">Contact</a>');

fs.writeFileSync('book-service.html', newContact);
console.log('book-service.html created successfully.');
