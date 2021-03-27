import React, { Component } from "react";
import "./App.css";
import "h8k-components";
import ProductList from "./components/product-list";
import Cart from "./components/cart";

const title = "HackerShop";

class App extends Component {
  constructor() {
    super();
    const products = [...PRODUCTS].map((product, index) => {
      product.id = index + 1;
      product.image = `/images/items/${product.name.toLocaleLowerCase()}.png`;
      product.cartQuantity = 0;
      product.isAddButton = true;
      return product;
    });
    this.state = {
      items: [],
      products,
    };
  }

  handleCart = (item) => {
    const newList = this.state.items;
    item.isAddButton = false;
    this.setState({ items: [...newList, item] });
  };

  handleRemove = (item) => {
    const newList = this.state.items;
    const newProducts = this.state.products;
    const tempList = newList.map((product, index) => {
      if (product.id === item.id && product.cartQuantity > 0) {
        product.cartQuantity = product.cartQuantity - 1;
      }
      if (product.id === item.id && product.cartQuantity === 0) {
        newList.pop(index);
      }
    });

    const tempList4 = newProducts.map((product, index) => {
      if (product.id === item.id && product.cartQuantity === 0) {
        product.isAddButton = true;
      }
    });
    this.setState({ product: [...newProducts] });
    this.setState({ items: [...newList] });
  };

  handleAdd = (item) => {
    const newList = this.state.items;
    const tempList = newList.map((product) => {
      if (product.id === item.id) {
        product.cartQuantity = product.cartQuantity + 1;
      }
    });
    this.setState({ items: [...newList] });
  };

  render() {
    return (
      <div>
        <h8k-navbar header={title}></h8k-navbar>
        <div className="layout-row shop-component">
          <ProductList
            products={this.state.products}
            handleCart={(product) => this.handleCart(product)}
            handleAdd={(product) => this.handleAdd(product)}
            handleRemove={(product) => this.handleRemove(product)}
          />
          <Cart items={this.state.items} />
        </div>
      </div>
    );
  }
}

export const PRODUCTS = [
  {
    name: "Cap",
    price: 5,
  },
  {
    name: "HandBag",
    price: 30,
  },
  {
    name: "Shirt",
    price: 35,
  },
  {
    name: "Shoe",
    price: 50,
  },
  {
    name: "Pant",
    price: 35,
  },
  {
    name: "Slipper",
    price: 25,
  },
];
export default App;
