function saveShoppingItems() {
    const itemsContainer = document.getElementById('items-container');
    const shoppingItems = itemsContainer.querySelectorAll('.shopping-item');
    
    const itemText = shoppingItems[0].querySelector('.item-text').textContent;
    const isChecked = shoppingItems[0].querySelector('.checkbox').classList.contains('checked');
        
    postCompra(itemText, isChecked);
}

// Load shopping items from database
function loadShoppingItems() {
    const savedItems = shoppingList;
    
    if (savedItems) {
        const itemsContainer = document.getElementById('items-container');
        
        // Clear empty state if it exists
        const emptyState = itemsContainer.querySelector('.empty-state');
        if (emptyState && savedItems.length > 0) {
            emptyState.remove();
        }
        
        // Add each saved item to the DOM
        savedItems.forEach(item => {
            const newItem = document.createElement('div');
            newItem.className = 'shopping-item';
            
            const checkboxClass = item.isChecked ? 'checkbox checked' : 'checkbox';
            const textStyle = item.isChecked ? 'text-decoration: line-through; color: #888;' : '';
            
            newItem.innerHTML = `
                <div class="${checkboxClass}" onclick="toggleCheckbox(this)"></div>
                <div class="item-text" style="${textStyle}">${item.produto}</div>
                <div class="item-actions">
                    <i class="fas fa-trash delete-button" onclick="deleteItem(this)"></i>
                </div>
            `;
            
            itemsContainer.appendChild(newItem);
        });
    }
}

function addNewItem() {
    const itemName = document.getElementById('item-name').value;
    if (!itemName.trim()) return; // Don't add empty items
    
    const newItem = document.createElement('div');
    newItem.className = 'shopping-item';
    newItem.innerHTML = `
        <div class="checkbox" onclick="toggleCheckbox(this)"></div>
        <div class="item-text">${itemName}</div>
        <div class="item-actions">
            <i class="fas fa-trash delete-button" onclick="deleteItem(this)"></i>
        </div>
    `;
    
    // Add the new item at the beginning of the list, right after the form
    const itemsContainer = document.getElementById('items-container');
    
    // Remove empty state if it exists
    const emptyState = itemsContainer.querySelector('.empty-state');
    if (emptyState) {
        emptyState.remove();
    }
    
    itemsContainer.insertBefore(newItem, itemsContainer.firstChild);
    
    document.getElementById('item-name').value = '';
    
    // Save the updated list to database
    saveShoppingItems();
}

function deleteItem(button) {
    const item = button.closest('.shopping-item');
    
    // Add fade-out animation
    item.style.transition = 'opacity 0.3s ease';
    item.style.opacity = '0';
    
    // Remove after animation completes
    setTimeout(() => {
        item.remove();
        
        // Show empty state if no items left
        if (document.querySelectorAll('.shopping-item').length === 0) {
            const emptyState = document.createElement('div');
            emptyState.className = 'empty-state';
            emptyState.innerHTML = `
                <i class="fas fa-shopping-basket" style="font-size: 32px; margin-bottom: 10px;"></i>
                <p>A lista de compras está vazia</p>
            `;
            document.getElementById('items-container').appendChild(emptyState);
        }
        
        // Save the updated list to localStorage
        saveShoppingItems();
    }, 200);
}

function getAllComprasFromBD() {
    return fetch('https://localhost:44345/api/compra')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            return data;
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            return [];
        });
}

function postCompra(product, isChecked) {
    const data = {
        produto: product,
        isChecked: isChecked
    };

    return fetch('https://localhost:44345/api/compra', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Success:', data);
        return data;
    })
    .catch(error => {
        console.error('Error posting data:', error);
        return null;
    });
}