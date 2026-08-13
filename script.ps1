$contact = Get-Content -Raw 'contact.html'
$index = Get-Content -Raw 'index.html'

$bookSectionRegex = '(?s)<section id="book-section".*?</section>'
$bookSection = [regex]::Match($index, $bookSectionRegex).Value

$contactMainStart = $contact.IndexOf('<main>')
$contactMainEnd = $contact.IndexOf('</main>') + 7

$heroRegex = '(?s)<section class="page-hero.*?</section>'
$heroSection = [regex]::Match($contact, $heroRegex).Value
$heroSection = $heroSection.Replace('Get in <span class="text-primary">Touch</span>', 'Book a <span class="text-primary">Service</span>')
$heroSection = $heroSection.Replace('Book a service, request an estimate, or reach our 24/7 emergency dispatch.', 'Fill out the form below and our team will get back to you immediately.')

$newMain = "<main>`n" + $heroSection + "`n`n" + $bookSection + "`n    </main>"

$newContact = $contact.Substring(0, $contactMainStart) + $newMain + $contact.Substring($contactMainEnd)
$newContact = $newContact.Replace('<title>Contact Us | VoltCore</title>', '<title>Book Service | VoltCore</title>')
$newContact = $newContact.Replace('<a class="nav-link active fw-medium" href="contact.html">Contact</a>', '<a class="nav-link fw-medium" href="contact.html">Contact</a>')

Set-Content -Path 'book-service.html' -Value $newContact
Write-Host 'book-service.html created successfully.'
