let cart = [];
let totalPrice = 0;

// مدیریت کلیک دکمه "Add to Cart"
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const itemName = this.getAttribute('data-name');
    const itemPrice = parseFloat(this.getAttribute('data-price'));

    // اضافه کردن آیتم به سبد
    cart.push({name: itemName, price: itemPrice});

// نمایش پیام سفارشی به جای alert
    showCustomAlert(`${itemName} has been added to your cart!`);

    // آپدیت کردن قیمت کل
    totalPrice += itemPrice;
    
    // آپدیت کردن سبد خرید در UI
    updateCartUI();
  });
});

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


// نمایش سبد خرید در دکمه "View Cart"
document.querySelector('.Color').addEventListener('click', function() {
  const cartElement = document.querySelector('.cart');
  cartElement.style.display = (cartElement.style.display === 'none') ? 'block' : 'none';
});
// به‌روزرسانی UI سبد خرید
function updateCartUI() {
  const cartItemsList = document.querySelector('.cart-items');
  cartItemsList.innerHTML = '';

  // لیست آیتم‌ها در سبد خرید
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${item.name} - ${item.price}T`;
    
    // دکمه حذف کردن آیتم
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', function() {
      removeFromCart(index);
    });

    listItem.appendChild(removeButton);
    cartItemsList.appendChild(listItem);
  });

  // به‌روزرسانی قیمت کل
  document.querySelector('.total-price').textContent = totalPrice.toFixed(2);
}

// حذف کردن آیتم از سبد خرید
function removeFromCart(index) {
  // کاهش قیمت کل
  totalPrice -= cart[index].price;

  // حذف آیتم از آرایه سبد
  cart.splice(index, 1);

  // آپدیت کردن UI
  updateCartUI();
}