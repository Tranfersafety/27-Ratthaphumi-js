let list = [];
let cartList = [];
let id = 1;
let addCartCount = 1;

let createProduct = () => {
  let name = document.querySelector("#pName").value;
  let price = document.querySelector("#price").value;
  let image = document.querySelector("#image").value;
  let form = document.querySelector("form");

  if (checkURL(image)) {
    if (name && image && price) {
      let product = {
        id: id++,
        name: name,
        price: price,
        image: image,
      };

      list.push(product);
    } else {
      alert("Fill all blank");
    }
  } else {
    alert("Wrong image type file");
  }
  // form.reset();
  renderItem(list, "#dashboard");
};

function checkURL(url) {
  return url.match(/\.(jpeg|jpg|gif|png)$/) != null;
}

let renderItem = (array, where) => {
  let dashboard = document.querySelector(where);
  dashboard.innerHTML = " ";
  array.forEach((element) => {
    let div = document.createElement("div");
    div.setAttribute("class", "product w-4/12 flex gap-2 m-1");
    div.id = element.id;

    let checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    let imageShow = document.createElement("img");
    imageShow.setAttribute("src", element.image);
    imageShow.alt = "element.name";
    imageShow.className = "w-24 h-24";

    let detail = document.createElement("div");

    let h4 = document.createElement("h4");
    h4.innerHTML = `<strong>${element.name}</strong>`;

    let value = document.createElement("div");
    value.className = "value flex";

    let dollar = document.createElement("p");
    dollar.innerText = "$";

    let price = document.createElement("p");
    price.innerHTML = element.price;

    value.appendChild(dollar);
    value.appendChild(price);

    detail.appendChild(h4);
    detail.appendChild(value);

    if (where == "#dashboard") {
      div.appendChild(checkbox);
    }
    div.appendChild(imageShow);
    div.appendChild(detail);
    if (where == "#cartBoard") {
      let remove = document.createElement("input");
      remove.type = "button";
      remove.className = "rounded-md bg-orange-200 p-1 mt-2";
      remove.setAttribute("onclick", `removeFromCart(${element.id})`);
      remove.value = "Remove";
      div.appendChild(remove);
    }

    dashboard.appendChild(div);
  });
  if (where == "#cartBoard") {
    let idCartboard = document.querySelector("#payBTN");
    idCartboard.innerHTML = "";
    let button = document.createElement("input");
    button.setAttribute("type", "button");
    button.className = "rounded-md bg-orange-200 p-1";
    button.value = "Calculate final price";
    button.addEventListener("click", finalPrice);
    idCartboard.appendChild(button);
  }
  let pay = document.querySelector("#pay");
  pay.innerHTML = "";
};
