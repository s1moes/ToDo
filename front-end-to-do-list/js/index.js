let taskList = [];
let shoppingList = [];
const done = true;

document.addEventListener("DOMContentLoaded", () => {
    const navLinks = document.querySelectorAll('.nav-link[data-url]');
    const mainContent = document.querySelector('.main-content');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            link.classList.add('active');
            navLinks.forEach(otherLink => {
                if (otherLink !== link) {
                    otherLink.classList.remove('active');
                }
            });
            const url = link.getAttribute('data-url');

            fetch(url)
            .then(response => response.text())
            .then(html => {
                mainContent.innerHTML = html;
            })
            .then(() => {
                if (url === 'view/lista_compras.html') {
                    loadShoppingItems();
                }
            })
            .catch(error => console.error('Error loading content:', error));

            
        });
     });

    const date = new Date().toLocaleDateString();
    /* taskList = [
        {
            id: 1,
            task: 'Enviar relatório de vendas',
            priority: 'Alta',
            state: !done,
            dateCreated: date,
            new: false,
            dateEnded: ''
        },
        {
            id: 2,
            task: 'Responder emails',
            priority: 'Média',
            state: done,
            new: false,
            dateCreated: date,
            dateEnded: ''
        },
        {
            id: 3,
            task: 'Agendar reunião com equipe',
            priority: 'Baixa',
            state: !done,
            new: false,
            dateCreated: date,
            dateEnded: ''
        },
        {
            id: 4,
            task: 'Preparar apresentação',
            priority: 'Alta',
            state: !done,
            new: false,
            dateCreated: date,
            dateEnded: ''
        }
    ]; */

    if (taskList.length > 0) {
        addTaskToUserInterface();
    }

    getAllComprasFromBD()
    .then(data => {
        shoppingList = data;
    });
});

function toggleCheckbox(checkbox) {
    checkbox.classList.toggle('checked');
    const itemText = checkbox.nextElementSibling;
    
    if (checkbox.classList.contains('checked')) {
        itemText.style.textDecoration = 'line-through';
        itemText.style.color = '#888';
    } else {
        itemText.style.textDecoration = 'none';
        itemText.style.color = 'var(--text-color)';
    }
}