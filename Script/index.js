let bagItem;
onLoad();

function onLoad(){
  let bagItemStr = localStorage.getItem('bagItem');
  bagItem = bagItemStr ? JSON.parse(bagItemStr) : [];
  displayItemOnHomePage();
  displayBagIcon();
}

function addToBag(itemId){
  bagItem.push(itemId);
  localStorage.setItem('bagItem', JSON.stringify(bagItem));
  displayBagIcon();
}

function displayBagIcon(){
  let bagItemCountElement = document.querySelector('.bag-item-count');
  if(bagItem.length > 0){
    bagItemCountElement.style.visibility = 'visible';
    bagItemCountElement.innerText = bagItem.length;
  }else{
    bagItemCountElement.style.visibility = 'hidden';
  }
}

function displayItemOnHomePage(){
  let itemContainerElement = document.querySelector(".items-container");
  if(!itemContainerElement){
    return;
  }
  let innerHTML = '';
  items.forEach(item => {
    innerHTML +=  `
    <div class="item-container">
      <img class="item-img" src="${item.item_image}" alt="item-image">
      <div class="rating">
        ${item.rating.stars} ⭐ |${item.rating.noOfReviews}
      </div>
      <div class="company-name">
        ${item.company_name}
      </div>
      <div class="item-name">
        ${item.item_name}
      </div>
      <div class="price">
        <span class="current-price">Rs ${item.price.current_price}</span>
        <span class="original-price">Rs ${item.price.original_price}</span>
        <span class="discount">(${item.price.discounts}% OFF)</span>
      </div>
      <button class="btn-bag-cart" onClick="addToBag(${item.id})">Add To Bag</button>
    </div>
    `;
  })
  itemContainerElement.innerHTML = innerHTML;
}


