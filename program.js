const contacts = [];
const form = document.getElementById('contactForm');
const tableBody = document.querySelector('#contactsTable tbody');
const searchInput = document.getElementById('search');

form.addEventListener('añadir', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const label = document.getElementById('label').value;

    contacts.push({ name, phone, email, label });
    form.reset();
    renderContacts();
});

function renderContacts(filter = '') {
    tableBody.innerHTML = '';
    contacts
        .filter(contact => 
            contact.name.toLowerCase().includes(filter.toLowerCase()) || 
            contact.label.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach((contact, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${contact.name}</td>
                <td>${contact.phone}</td>
                <td>${contact.email}</td>
                <td>${contact.label}</td>
                <td>
                    <button class="edit" onclick="editContact(${index})">Editar</button>
                    <button class="delete" onclick="deleteContact(${index})">Eliminar</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
}

function editContact(index) {
    const contact = contacts[index];
    document.getElementById('name').value = contact.name;
    document.getElementById('phone').value = contact.phone;
    document.getElementById('email').value = contact.email;
    document.getElementById('label').value = contact.label;

    contacts.splice(index, 1);
    renderContacts();
}

function deleteContact(index) {
    contacts.splice(index, 1);
    renderContacts();
}