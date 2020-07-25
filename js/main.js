(function () {
  new fullpage('#fullpage', {
    navigation: 0,
    scrollOverflow: !0,
    responsiveWidth: 768,
    normalScrollElements: '.scrollable-element',
    anchors: ['home', 'about-us', 'ktsport', 'whey', 'tribis', 'balancelady', 'balanceman', 'lcarnitine', 'chondroitin', 'energyboost', 'bcaa', 'investigations', 'contact', 'footer'],

  });


  var mySwiper = new Swiper('.investigations .swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    // If we need pagination
    pagination: {
      el: '.investigations .swiper-pagination',
      clickable: true
    },

    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
  })
  var mainscreenSwiper = new Swiper('.mainscreen .swiper-container', {
    // Optional parameters
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    // If we need pagination
    lazy: true,
    loop: true,
    // Navigation arrows
    navigation: {
      nextEl: '.mainscreen .swiper-button-next',
      prevEl: '.mainscreen .swiper-button-prev',
    },

    // And if we need scrollbar
  })



  // function changeVideo() {
  //   var video = document.getElementById('video');
  //   if (window.innerWidth <= 767) {
  //     document.getElementById('video-container').innerHTML = "";
  //     document.getElementById('mainscreenimg').style.display = "block";
  //   } else {
  //     document.getElementById('video-container').innerHTML = '<video autoplay muted poster="video/header.jpg" class="mainscreen__video" id="video">\n' +
  //       '                <source src="video/head.mp4" type=\'video/mp4; codecs="avc1.42E01E, mp4a.40.2"\'>\n' +
  //       '            </video>';
  //     document.getElementById('mainscreenimg').style.display = "none";
  //
  //   }
  // }

  // changeVideo()
  // window.addEventListener('resize', changeVideo);


  function refactorBottle() {
    var botles = document.getElementsByClassName('botle');
    var botlesImg = [];
    var botlesConsist = [];
    var botleContainer = [];
    var botleContainerIns = [];
    var botlePrice = []
    for (var i = 0; i < botles.length; i++) {
      botlesImg[i] = botles[i].querySelector('.bottle__img');
      botlesConsist[i] = botles[i].querySelector('.consist__list');
      botlePrice[i] = botles[i].querySelector('.price');
      botleContainer[i] = botles[i].querySelector('.bottlewrapper');
      botleContainerIns[i] = botles[i].querySelector('.bottlewrapper__desc')
    }
    if (window.innerWidth < 767) {
      for (var i = 0; i < botles.length; i++) {
        botleContainer[i].insertBefore(botlesImg[i], botleContainer[i].firstChild);
        botleContainerIns[i].appendChild(botlesConsist[i]);
        botleContainerIns[i].appendChild(botlePrice[i])
      }
    } else {
      for (var i = 0; i < botles.length; i++) {
        botles[i].querySelector('.container').insertBefore(botlesImg[i], botles[i].querySelector('.container').firstChild);
        botles[i].querySelector('.bottle__desc').insertBefore(botlesConsist[i], botles[i].querySelector('.price__wrapper'));
        botles[i].querySelector('.price__wrapper').insertBefore(botlePrice[i], botles[i].querySelector('.price__wrapper').firstChild)
      }
    }
  }

  refactorBottle();
  window.addEventListener('resize', refactorBottle);
  showFullInfo();
  showForm()

  //create info about items

  let infoGoods = {};
  let infoitem = document.querySelectorAll('.botle');
  infoitem.forEach(item => {
    let productId = item.querySelector('.js-addtocart').dataset.good.trim()
    let info = {
      name: item.querySelector('.bottle__header h2').textContent.trim(),
      price: parseInt(item.querySelector('.price span').textContent)
    };
    infoGoods[productId] = info;
    ;
  })

  let addToCartButtons = document.querySelectorAll('.js-addtocart');
  let goodsInThePocket = [];
  let goodsAmonuntContaner = document.querySelector('#goods-amount')
  addToCartButtons.forEach(item => {
    item.addEventListener('click', function () {

      let newGoodId = item.dataset.good.trim();
      let repeated = false;
      if (goodsInThePocket.length) {
        goodsInThePocket.forEach(itemGood => {
          if (itemGood.productId === newGoodId) {
            itemGood.amount++;
            repeated = true;
          }
        })
      }
      if (!repeated) {
        for (key in infoGoods) {
          if (key === item.dataset.good) {
            let newItem = infoGoods[key];
            newItem.productId = key;
            newItem.amount = 1;
            goodsInThePocket.push(infoGoods[key]);
          }
        }
      }
      goodsAmonuntContaner.classList.remove('animated');
      goodsAmonuntContaner.offsetWidth = goodsAmonuntContaner.offsetWidth;
      goodsAmonuntContaner.classList.add('animated')
      goodsAmonuntContaner.textContent = goodsInThePocket.length;
    })
  })

  function countTotalPrice(selector) {
    return goodsInThePocket.reduce((price, item) => {
      return price + item.price * item.amount;
    }, 0)
  }

  function showForm() {
    var cart = document.getElementsByClassName('cart-icon');
    var order = document.getElementById('order');
    let orderFullPrice = order.querySelector('.order__totalprice span');
    let orderInputWrapper = order.querySelector('.input-wrapper');
    var closeOrder = order.querySelector('.order__close');
    for (var i = 0; i < cart.length; i++) {
      cart[i].addEventListener('click', function () {
        order.classList.add('active');
        orderInputWrapper.textContent="";
        orderFullPrice.textContent="";
        if(goodsInThePocket.length) {
          order.querySelector('form').style.display='';
          order.querySelector('.noitems').style.display='none';
          goodsInThePocket.forEach((item, index) => {
            let cartItem = document.createElement('div');
            cartItem.classList.add('itemordered');
            cartItem.innerHTML = `
           <div class="itemordered__name">${item.name}</div>
        <div class="itemordered__price">${item.price}грн.</div>
        <input type="hidden" value="${item.name}" name="good[][name]" class="good">
         <input type="hidden" value="${item.price}" name="good[][costPerItem]">
        <input type="hidden" class="amount" value="${item.amount}" name="good[][amount]">
       
       <div class="itemordered__amount">
          <button type="button" class="remove">-</button>
          <span class="amount">${item.amount}</span>
          <button type="button" class="add">+</button>
        </div>
          `;
            orderInputWrapper.prepend(cartItem);
            cartItem.querySelector('.add').addEventListener('click', function () {
              item.amount++;
              this.parentElement.querySelector('.amount').textContent = item.amount;
              orderFullPrice.textContent = countTotalPrice();
              cartItem.querySelector('.amount').value = item.amount;
              order.querySelector('.totalprice').value = countTotalPrice();
              order.querySelector('.foolamount').value = goodsInThePocket.length;
              goodsAmonuntContaner.textContent = goodsInThePocket.length;
            })
            cartItem.querySelector('.remove').addEventListener('click', function () {
              item.amount--;
              if (item.amount > 0) {
                this.parentElement.querySelector('.amount').textContent = item.amount;
              } else {
                cartItem.remove();
                goodsInThePocket.splice(index, 1);
                if(!goodsInThePocket.length){
                  order.querySelector('form').style.display='none';
                  order.querySelector('.noitems').style.display='block';
                }
              }
              cartItem.querySelector('.amount').value = item.amount;
              orderFullPrice.textContent = countTotalPrice();
              order.querySelector('.totalprice').value = countTotalPrice();
              order.querySelector('.foolamount').value = goodsInThePocket.length;
              goodsAmonuntContaner.textContent = goodsInThePocket.length;
            })
            cartItem.querySelector('.amount').value = item.amount;
            orderFullPrice.textContent = countTotalPrice();
            order.querySelector('.totalprice').value = countTotalPrice();
            order.querySelector('.foolamount').value = goodsInThePocket.length;
            goodsAmonuntContaner.textContent = goodsInThePocket.length;

          })
        }
        else{
          order.querySelector('form').style.display='none';
          order.querySelector('.noitems').style.display='block';
        }

      })
    }
    closeOrder.addEventListener('click', function () {
      order.classList.remove('active')
    })
  }

  function showFullInfo() {
    var botles = document.getElementsByClassName('botle');
    var botlesItem;
    var botlesText
    var showMore = [];
    for (var i = 0; i < botles.length; i++) {
      showMore[i] = botles[i].querySelector('.showmore')
    }
    var fullInfo = document.getElementById('fullinfo');
    var closeFullInfo = fullInfo.querySelector('.fullinfo__close');
    for (var i = 0; i < showMore.length; i++) {
      showMore[i].addEventListener('click', function () {
        botlesText = this.parentElement.parentElement.parentElement.querySelector('.fullinfo__desc').classList.item(1).replace('-full', '');
        botlesItem = document.querySelector('.' + botlesText);
        fullInfo.classList.add('active');
        fullInfo.querySelector('.fullinfo__wrapper').insertBefore(botlesItem.querySelector('.fullinfo__desc'), fullInfo.querySelector('.fullinfo__wrapper').firstElementChild)
      })
    }
    closeFullInfo.addEventListener('click', function () {
      fullInfo.classList.remove('active');
      botlesText = fullInfo.querySelector('.fullinfo__desc').classList.item(1).replace('-full', '')
      botlesItem = document.querySelector('.' + botlesText);
      botlesItem.querySelector('.container').appendChild(fullInfo.querySelector('.fullinfo__desc'))
    })
  }

  var modal = document.querySelector('.modal');
  var burger = document.querySelector('.header__burger');
  window.addEventListener('click', function (event) {
    let target = event.target;
    if (target.closest('.header__burger') || target.closest('.modal')) {
      initBurger();
    } else closeBurger();
  })

  function initBurger() {
    modal.classList.toggle('opened');
    burger.classList.toggle('active')
  }

  function closeBurger() {
    modal.classList.remove('opened')
    burger.classList.remove('active');
  }

  jQuery(function ($) {
    $("#mobile").mask("+38(999) 999-9999");
    $("#mobile2").mask("+38(999) 999-9999")
  });
  var image = document.querySelectorAll('.bottle__img');

  function move(x, y) {
    var dx2 = (x - window.innerWidth) / window.innerWidth * 2,
      dy2 = (y - window.innerHeight) / window.innerHeight * 2;
    if (dx2 > 0) dx2 = 0;
    if (dy2 > 0) dy2 = 0;
    for (var i = 0; i < image.length; i++) {
      image[i].style.transform = "translateX(".concat(dx2, "vmin")
    }
    dx2 += 2;
    if (dx2 > 0) dx2 = 0
  }

  document.addEventListener('mousemove', function (e) {
    move(e.pageX, e.pageY)
  });
  document.addEventListener('touchmove', function (e) {
    move(e.touches[0].pageX, e.touches[0].pageY)
  });
  var inputs = document.querySelectorAll('.input-wrapper input');
  for (i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('blur', function () {
      console.log(this.value)
      if (this.value !== "") {
        this.parentElement.querySelector('label').classList.add('full')
      } else {
        this.parentElement.querySelector('label').classList.remove('full')
      }
    })
  }
  $('#choosegood').click(function () {
    $('.checkbox-wrapper').toggle()
  })
  $("#order form").submit(function (e) {
    e.preventDefault()
    $.ajax({

      type: "POST", url: "sendMessageask2.php", data: $(this).serialize(), success: function (response) {
        $(this).find("input").val("");
        document.querySelector('#order').classList.remove('active');
        $('#orderresponce .message').html("Дякуємо! Ми отримали твій запит! \n" + "Ми зв’яжемося з тобою якнайшвидше в робочий час пн-пт з 10 до 18. ")
        $('#orderresponce').css({'display': 'flex'})
        $("#order form").trigger("reset")
      }, error: function (response) {
        document.querySelector('#order').classList.remove('active');
        $('#orderresponce .message').html("Нажаль не вдалося відправиті дані. Спробуйте пізніше")
        $('#orderresponce').css({'display': 'flex'})
      }
    });
    return !1
  });
  $('.lang span').click(function () {
    $('.wrapper-dropdown').toggleClass('active')
  })
  document.querySelector('.responce .order__close').addEventListener('click', function () {
    $('#orderresponce').css({'display': 'none'})
  })
  $("#ask").submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: "POST", url: "sendMessageask.php", data: $(this).serialize(), success: function (response) {
        $(this).find("input").val("");
        $('#orderresponce .message').html("Дякуємо! Ми отримали твій запит! \n" + "Ми зв’яжемося з тобою якнайшвидше в робочий час пн-пт з 10 до 18 ")
        $('#orderresponce').css({'display': 'flex'})
        $("#ask").trigger("reset")
      }, error: function (response) {
        $('#orderresponce .message').html("Нажаль не вдалося відправити дані. Спробуйте пізніше")
        $('#orderresponce').css({'display': 'flex'})
      }
    })
    return !1
  })
})()
