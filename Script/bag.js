let bagItemsObjects;
onLoad();

function onLoad(){
  loadBagItemsObjects();
  displayBagItem();
  displayBagSummary();
}

function displayBagSummary(){
  let bagSummaryElement = document.querySelector('.bag-summary');
  let totalItem = bagItemsObjects.length;
  let totalMRP = 0;
  let totalDiscount = 0;
  let CONVENIENCE_FEE = 0;
  if(bagItemsObjects.length === 0){
    CONVENIENCE_FEE = 0;
  }else{
    CONVENIENCE_FEE = 99;
  }

  bagItemsObjects.forEach(bagItem => {
    totalMRP += bagItem.price.original_price;
    totalDiscount += (bagItem.price.original_price - bagItem.price.current_price);
  });

  let finalPayment = totalMRP - totalDiscount + CONVENIENCE_FEE;

  bagSummaryElement.innerHTML =`
    <div class="bag-details-container">
      <div class="price-header">PRICE DETAILS (${totalItem} Items) </div>
      <div class="price-item">
        <span class="price-item-tag">Total MRP</span>
        <span class="price-item-value">₹${totalMRP}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Discount on MRP</span>
        <span class="price-item-value priceDetail-base-discount">-₹${totalDiscount}</span>
      </div>
      <div class="price-item">
        <span class="price-item-tag">Convenience Fee</span>
        <span class="price-item-value">₹ ${CONVENIENCE_FEE}</span>
      </div>
      <hr>
      <div class="price-footer">
        <span class="price-item-tag">Total Amount</span>
        <span class="price-item-value">₹ ${finalPayment}</span>
      </div>
    </div>
    <button class="btn-place-order">
      <div class="css-xjhrni">PLACE ORDER</div>
    </button>`; 
}

function loadBagItemsObjects(){
  bagItemsObjects = bagItem.map(itemId => {
    for(let i = 0; i < items.length; i++){
      if(itemId == items[i].id){
        return items[i];
      }
    } 
  })
}

function displayBagItem() {
  let containerElement = document.querySelector('.bag-items-container');
  let innerHTML = '';
  bagItemsObjects.forEach(bagItem => {
    innerHTML += generateItemHTML(bagItem);
  });
  containerElement.innerHTML = innerHTML; 
}

function removeFromBag(itemId){
  bagItem = bagItem.filter(bagItemId => bagItemId != itemId);
  localStorage.setItem('bagItem', JSON.stringify(bagItem));
  loadBagItemsObjects();
  displayBagIcon();
  displayBagItem();
  displayBagSummary();
}

function generateItemHTML(item){
  return `<div class="bag-item-container">
    <div class="item-left-part">
      <img class="bag-item-img" src="../${item.item_image}">
    </div>
    <div class="item-right-part">
      <div class="company">${item.company_name}</div>
      <div class="item-name">${item.item_name}</div>
      <div class="price-container">
        <span class="current-price">Rs ${item.price.current_price}</span>
        <span class="original-price">Rs ${item.price.original_price}</span>
        <span class="discount-percentage">(${item.price.discounts}% OFF)</span>
      </div>
      <div class="return-period">
        <span class="return-period-days">${item.return_period} days</span> return available
      </div>
      <div class="delivery-details">
        Delivery by
        <span class="delivery-details-days">${item.delivery_date}</span>
      </div>
    </div>

    <div class="remove-from-cart" onclick="removeFromBag(${item.id})">X</div>
  </div>
  `;
}
