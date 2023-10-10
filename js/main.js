// ## Get All Elements.
// Others
const floatMessage = document.getElementById('floatMessage');
// App
const app = document.getElementById('app');
// Inputs
const titleInput = app.querySelector('#title');
const taxesInput = app.querySelector('#taxes');
const priceInput = app.querySelector('#price');
const adsInput = app.querySelector('#ads');
const discountInput = app.querySelector('#discount');
const countInput = app.querySelector('#count');
const categoryInput = app.querySelector('#category');
const searchInput = app.querySelector('#search');
const totalPrice = app.querySelector('#total-price');
// Outputs
const table = app.querySelector('table');
const bodyTable = table.querySelector('tbody');
// Buttons
const btnCreatePro = app.querySelector('#btn-create-pro');
const btnSearchByTitle = app.querySelector('#btn-search-by-title');
const btnSearchByCategory = app.querySelector('#btn-search-by-category');
const btnDeleteAll = app.querySelector('#btn-delete-all');

// This is Variable To Save Products as Objects [ Array ].
let arrOfProducts;

// Trigger To Function When Page Load.
window.onload = focused(titleInput), checkIfFoundDataInLocalStorage();

// Function To Prevent Default To ELement [ Form ].
function preventDefault(e) {
    e.preventDefault();
}
// Function To Set Total Price.
function setTotalPrice() {
    const spanTotal = totalPrice.querySelector('span');
    spanTotal.textContent =
    `
        ${
            +taxesInput.value
            +
            +priceInput.value
            +
            +adsInput.value
            -
            +discountInput.value
        }
    `;
}
// Function To Clear Total Price.
function clearTotalPrice() {
    const spanTotal = totalPrice.querySelector('span');
    spanTotal.textContent = 0;
}
// Function To Work Focus on Input.
function focused(input) {
    input.focus();
}
// Function To Create The Obj of Product.
function createProduct(inputs) {
    // Destructuring To Array of Inputs.
    const
    [
        titleInput,
        taxesInput,
        priceInput,
        adsInput,
        discountInput,
        categoryInput
    ] = inputs;
    // Product.
    const product = {
        title: titleInput.value,
        taxes: taxesInput.value,
        price: priceInput.value,
        ads: adsInput.value,
        discount: discountInput.value,
        category: categoryInput.value,
    }
    // Call Function To Send Product To Array.
    sendToArray(arrOfProducts, product);
}
// Function to Work Trigger to Create Product Function.
function triggerCreateProduct() {
    if (countInput.value > 0 && countInput.value < 101) {
        for (let i = 0; i < countInput.value; i++) {
            createProduct([titleInput, taxesInput, priceInput, adsInput, discountInput, categoryInput]);
        }
    } else {
        createProduct([titleInput, taxesInput, priceInput, adsInput, discountInput, categoryInput]);
    }
}
// Function To Send Products To Array.
function sendToArray(arr, product) {
    arr.push(product);
}
// Function To Send The Products T Local Storage.
function sendToLocalStorage(arr) {
    window.localStorage.setItem('products', JSON.stringify(arr));
}
// Function To Empty The Body Element.
function emptyBodyElement(bodyEle) {
    bodyEle.textContent = '';
}
// Function To Create Elements.
function createElements(arr) {
    emptyBodyElement(bodyTable);
    for (let i = 0; i < arr.length; i++) {
        const trEle = document.createElement('tr');
        const innerContent = `
            <td class="border-bottom p-2">
                ${i + 1}
            </td>
            <td class="border-bottom p-2">
                ${arr[i].title || "Unknown"}
            </td>
            <td class="border-bottom p-2">
                ${arr[i].price || "Unknown"}
            </td>
            <td class="border-bottom p-2">
                ${arr[i].taxes || "Unknown"}
            </td>
            <td class="border-bottom p-2">
                ${arr[i].ads || "Unknown"}
            </td>
            <td class="border-bottom p-2">
                ${arr[i].discount || "Unknown"}
            </td>
            <td class="border-bottom p-2">
                ${arr[i].category || "Unknown"}
            </td>
            <td class="border-bottom p-2">
                <button onclick="updateData(this)" data-id="${i}" type="button" class="btn btn-success">Update</button>
            </td>
            <td class="border-bottom p-2">
                <button onclick="deleteProductFromPage(this)" data-id="${i}" type="button" class="btn btn-success">Delete</button>
            </td>
        `
        trEle.innerHTML = innerContent;
        bodyTable.appendChild(trEle);
    }
}
// Function Check if Found Data in Local Storage.
function checkIfFoundDataInLocalStorage() {
    if (window.localStorage.getItem('products')) {
        arrOfProducts = JSON.parse(window.localStorage.getItem('products'));
        createElements(arrOfProducts);
    } else {
        arrOfProducts = [];
    }
    setCountProducts(btnDeleteAll, arrOfProducts);
}
// Function To Set Count Products.
function setCountProducts(ele, arr) {
    const targetEle = ele.querySelector('span');
    targetEle.textContent = `(${arr.length})`;
}
// Function To Delete All Products.
function deleteAllProducts(arr) {
    arr.length = 0;
    sendToLocalStorage(arr);
    emptyBodyElement(bodyTable);
    // Trigger To Function To Show The Float Message Div.
    showFloatMessageDiv("Deleted All");
}
// Function To Update Data.
function updateData(btn) {
    // Looping on Array.
    for (let i = 0; i < arrOfProducts.length; i++) {
        if (i == +btn.dataset.id) {
            titleInput.value = arrOfProducts[i].title;
            taxesInput.value = arrOfProducts[i].taxes;
            priceInput.value = arrOfProducts[i].price;
            adsInput.value = arrOfProducts[i].ads;
            discountInput.value = arrOfProducts[i].discount;
            categoryInput.value = arrOfProducts[i].category;
            scrollToTop();
            setTotalPrice();
        }
    }
}
// Function To Delete Product From PAge.
function deleteProductFromPage(btn) {
    // Looping on Array.
    for (let i = 0; i < arrOfProducts.length; i++) {
        if (i == +btn.dataset.id) {
            btn.parentElement.parentElement.remove();
        }
    }
    // Trigger To Function To Remove Product From Local Storage.
    deleteProductFromLocalStorage(btn);
    // Trigger To Function To Show The Float Message Div.
    showFloatMessageDiv("Deleted");
}
// Function To Delete Product From Array and Local Storage.
function deleteProductFromLocalStorage(btn) {
    // To Save Remaining Products
    let newArr = [];
    // Filter Array.
    arrOfProducts.filter((product, idx) => {
        idx != btn.dataset.id ? newArr.push(product) : false;
    });
    arrOfProducts.length = 0;
    arrOfProducts = newArr;
    sendToLocalStorage(arrOfProducts);
    checkIfFoundDataInLocalStorage();
}
// Function To Show The Float Message Div.
function showFloatMessageDiv(textContent) {
    floatMessage.classList.add('active');
    floatMessage.textContent = textContent;
    setTimeout(() => {
        floatMessage.classList.remove('active');
    }, 1000);
}
// Function To Empty Input.
function emptyInputs(inputs) {
    // Destructuring To Array of Inputs.
    const
    [
        titleInput,
        taxesInput,
        priceInput,
        adsInput,
        discountInput,
        countInput,
        categoryInput
    ]
    = inputs;
    titleInput.value = '';
    taxesInput.value = '';
    priceInput.value = '';
    adsInput.value = '';
    discountInput.value = '';
    countInput.value = '';
    categoryInput.value = '';
}
// Function To Search By Title.
function searchByTitle(input) {
    if (input.value !== '') {
        let newArr = [];
        for (let i = 0; i < arrOfProducts.length; i++) {
            if (arrOfProducts[i].title.toLowerCase().includes(input.value.toLowerCase())) {
                newArr.push(arrOfProducts[i]);
            }
        }
        createElements(newArr);
        setCountProducts(btnDeleteAll, newArr);
        if (bodyTable.textContent == '') {
            bodyTable.innerHTML = `<tr><td class="p-3 text-danger text-center" colspan="9">No Results</td></tr>`
        }
    } else {
        createElements(arrOfProducts);
        setCountProducts(btnDeleteAll, arrOfProducts);
    }
}
// Function To Search By Category.
function searchByCategory(input) {
    if (input.value !== '') {
        let newArr = [];
        for (let i = 0; i < arrOfProducts.length; i++) {
            if (arrOfProducts[i].category.toLowerCase().includes(input.value.toLowerCase())) {
                newArr.push(arrOfProducts[i]);
            }
        }
        createElements(newArr);
        setCountProducts(btnDeleteAll, newArr);
        if (bodyTable.textContent == '') {
            bodyTable.innerHTML = `<tr><td class="p-3 text-danger" colspan="9">No Results</td></tr>`
        }
    } else {
        createElements(arrOfProducts);
        setCountProducts(btnDeleteAll, arrOfProducts);
    }
}
// Function To Scroll To Top.
function scrollToTop() {
    window.scroll({
        top: 0,
        behavior: "smooth"
    })
}
// Trigger To Functions When Click on Btn Create Product.
btnCreatePro.addEventListener('click', () => {
    if (titleInput.value !== '' && priceInput.value !== '' && categoryInput.value !== '') {
        triggerCreateProduct();
        sendToLocalStorage(arrOfProducts);
        createElements(arrOfProducts);
        setCountProducts(btnDeleteAll, arrOfProducts);
        emptyInputs([titleInput, taxesInput, priceInput, adsInput, discountInput, countInput, categoryInput])
        clearTotalPrice();
    } else {
        focused(titleInput);
        scrollToTop();
    }
})
// Trigger To Functions When Click on Btn Delete All Products.
btnDeleteAll.addEventListener('click', () => {
    deleteAllProducts(arrOfProducts);
    setCountProducts(btnDeleteAll, arrOfProducts);
})
// Trigger To Functions When Click on Btn Search By Category.
btnSearchByCategory.addEventListener('click', () => {
    searchByCategory(searchInput);
})
// Trigger To Functions When Click on Btn Search By Title.
btnSearchByTitle.addEventListener('click', () => {
    searchByTitle(searchInput);
})
// Trigger To Functions When Keyup in Input Search By Title.
searchInput.addEventListener('keyup', () => {
    searchByCategory(searchInput);
})