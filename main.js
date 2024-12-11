document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
      const itemName = this.getAttribute('data-name');
      const itemPrice = this.getAttribute('data-price');
      const itemImg = this.getAttribute('data-img'); // آدرس تصویر مربوط به هر آیتم

      // گرفتن سبد خرید از LocalStorage
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push({ name: itemName, price: itemPrice, img: itemImg });
      localStorage.setItem('cart', JSON.stringify(cart));

      // نمایش آیتم‌ها در cart.html (برای نمایش در صفحه فعلی)
      renderCartItems();

      alert(`${itemName} added to cart!`);
  });
});

function renderCartItems() {
  const cartContainer = document.querySelector('#cart-items'); // جایی که آیتم‌ها را نمایش می‌دهید
  cartContainer.innerHTML = ''; // پاک کردن محتوای قبلی

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.forEach(item => {
      const cartItem = document.createElement('div');
      cartItem.classList.add('cart-item');
      
      cartItem.innerHTML = `
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <p>${item.name}</p>
          <p>${item.price} تومان</p>
          <button class="remove-item">حذف</button>
      `;
      
      cartContainer.appendChild(cartItem);
  });

  // اضافه کردن قابلیت حذف آیتم‌ها
  document.querySelectorAll('.remove-item').forEach((button, index) => {
      button.addEventListener('click', function() {
          removeItemFromCart(index);
      });
  });
}

function removeItemFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCartItems();
}

// Function to show the cart content
document.querySelector('.Color').addEventListener('click', function() {
  const cartElement = document.querySelector('.cart');
  cartElement.style.display = (cartElement.style.display === 'none' || cartElement.style.display === '') ? 'block' : 'none';
  updateCartUI();  // Update the cart UI when the cart is toggled
});

// Function to update the cart UI
function updateCartUI() {
  const cartItemsList = document.querySelector('.cart-items');
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cartItemsList.innerHTML = '';
  
  let totalPrice = 0;
  cart.forEach((item, index) => {
      const listItem = document.createElement('li');
      listItem.textContent = `${item.name} - ${item.price}T`;
      
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remove';
      removeButton.addEventListener('click', function() {
          removeFromCart(index);
      });
      
      listItem.appendChild(removeButton);
      cartItemsList.appendChild(listItem);
      
      totalPrice += item.price;  // Calculate the total price
  });
  
  document.querySelector('.total-price').textContent = totalPrice + "T";  // Update total price
}

// Function to remove an item from the cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();  // Update the cart UI after removal
}
// تابع نمایش پیام سفارشی
function showCustomAlert(message) {
  const alertBox = document.getElementById('custom-alert');
  const alertMessage = document.getElementById('alert-message');
  const overlay = document.getElementById('overlay');
  
  alertMessage.textContent = message;
  alertBox.classList.remove('hidden'); // نمایش هشدار
  overlay.classList.remove('hidden-overlay'); // نمایش لایه بلور

  // غیرفعال کردن اسکرول
  document.body.classList.add('no-scroll');

  // بستن پیام هشدار
  document.getElementById('close-alert').addEventListener('click', function() {
    alertBox.classList.add('hidden'); // مخفی کردن هشدار
    overlay.classList.add('hidden-overlay'); // مخفی کردن لایه بلور

    // فعال کردن مجدد اسکرول
    document.body.classList.remove('no-scroll');
  });
};

let index = 0;
const images = document.querySelectorAll('.slideshow img');

function changeSlide() {
  images[index].classList.remove('active');
  index = (index + 1) % images.length;
  images[index].classList.add('active');
}

setInterval(changeSlide, 3000);

// گرفتن دکمه و نوار دسته‌بندی
const categoryBtn = document.getElementById('category-btn');
const categoryNavbar = document.getElementById('category-navbar');
const checkboxes = document.querySelectorAll('.category-checkbox');
const priceRange = document.getElementById('price-range');
const priceValue = document.getElementById('price-value');
const products = document.querySelectorAll('.category4');

// نمایش یا پنهان کردن Navbar
categoryBtn.addEventListener('click', () => {
  categoryNavbar.classList.toggle('hidden');
});

// به‌روزرسانی مقدار نمایش قیمت در کنار ورودی محدوده قیمت
priceRange.addEventListener('input', () => {
  priceValue.textContent = priceRange.value;
  filterProducts();
});

// گوش‌دادن به تغییر در چک‌باکس‌های دسته‌بندی
checkboxes.forEach(checkbox => {
  checkbox.addEventListener('change', filterProducts);
});

function filterProducts() {
  // گرفتن دسته‌های انتخاب‌شده
  const selectedCategories = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);
  
  // گرفتن مقدار بازه قیمت
  const maxPrice = parseInt(priceRange.value, 10);
  
  products.forEach(product => {
    const productCategory = product.getAttribute('data-category');
    const productPrice = parseInt(product.getAttribute('data-price'), 10);
    
    // بررسی اینکه آیا محصول باید نشان داده شود یا خیر
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(productCategory);
    const matchesPrice = productPrice <= maxPrice;

    if (matchesCategory && matchesPrice) {
      product.style.display = 'block';
    } else {
      product.style.display = 'none';
    }
  });
}
const rangeInput = document.getElementById('price-range');
  function updateSliderBackground() {
    const value = rangeInput.value;
    const max = rangeInput.max;
    const percentage = (value / max) * 100;
    rangeInput.style.background = `linear-gradient(90deg, #3498db ${percentage}%, #ddd ${percentage}%)`;
  }

  updateSliderBackground();

  rangeInput.addEventListener('input', updateSliderBackground);