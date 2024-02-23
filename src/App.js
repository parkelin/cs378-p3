import './App.css';
import MenuItem from './components/MenuItem';
import React, { useState } from 'react';
/* Option 2: Import via CSS */
import 'bootstrap/dist/css/bootstrap.min.css'; // This imports bootstrap css styles. You can use bootstrap or your own classes by using the className attribute in your elements.
import "bootstrap-icons/font/bootstrap-icons.css";

const logo = [{
  imageName: 'logo.png',
}]

// Menu data. An array of objects where each object represents a menu item. Each menu item has an id, title, description, image name, and price.
// You can use the image name to get the image from the images folder.
const menuItems = [
  {
    id: 1,
    title: 'Gyoza',
    description: 'Japanese dumplings',
    imageName: 'gyoza.png',
    price: 5.99,
  },
  {
    id: 2,
    title: 'Sushi',
    description: 'Japanese rice rolls',
    imageName: 'sushi.png',
    price: 6.99,
  },
  {
    id: 3,
    title: 'Ramen',
    description: 'Japanese noodle soup',
    imageName: 'ramen.png',
    price: 7.99,
  },
  {
    id: 4,
    title: 'Matcha Cake',
    description: 'Japanese green tea cake',
    imageName: 'matcha-cake.png',
    price: 4.99,
  },
  {
    id: 5,
    title: 'Mochi',
    description: 'Japanese rice cake',
    imageName: 'mochi.png',
    price: 3.99,
  },
  {
    id: 6,
    title: 'Yakitori',
    description: 'Japanese skewered chicken',
    imageName: 'yakitori.png',
    price: 2.99,
  },
  {
    id: 7,
    title: 'Takoyaki',
    description: 'Japanese octopus balls',
    imageName: 'takoyaki.png',
    price: 5.99,
  },
  {
    id: 8,
    title: 'Sashimi',
    description: 'Japanese raw fish',
    imageName: 'sashimi.png',
    price: 8.99,
  },
  {
    id: 9,
    title: 'Okonomiyaki',
    description: 'Japanese savory pancake',
    imageName: 'okonomiyaki.png',
    price: 6.99,
  },
  {
    id: 10,
    title: 'Katsu Curry',
    description: 'Japanese curry with fried pork',
    imageName: 'katsu-curry.png',
    price: 9.99,
  }
];

function App() {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showNoItemsAlert, setShowNoItemsAlert] = useState(false);

  let i = menuItems.map((item) => 
    ({
        id: item.id,
        title: item.title, 
        description: item.description,
        imageName: item.imageName,
        price: item.price,
        count: 0
    }))
  const [items, setItems] = useState(i);

  const increment = (id) => {
    setItems((prevItems) => (
      prevItems.map((item) => {
        if (id === item.id) {
          let nc = item.count + 1;
          return { ...item, count: nc };
        } else {
          return { ...item };
        }
      })
    ));
  };

  const decrement = (id) => {
    setItems(
      items.map((item) => {
        if (id === item.id) {
          if (item.count !== 0) {
            let nc = item.count - 1;
            return { ...item, count: nc };
          }
        }
        return { ...item };
      })
    );
  };
  
  // Calculate total
  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.count * item.price), 0);
  }

  const handleOrder = () => {
    // If no items in cart
    if (!items.some(item => item.count > 0)) {
      setShowNoItemsAlert(true); // Show the "No items in cart" alert
      return; // Return here to exit the function if there are no items in the cart
    }
    // Generate receipt 
    console.log("Order placed!");
    console.log("Order details:");
    items.forEach(item => {
      if (item.count > 0) {
        console.log(`${item.count} ${item.title}`);
      }
    });
    setOrderPlaced(true); // Set orderPlaced state to true to show the order confirmation alert
  };
  
  // Clear All
  const zero_out = (id) => {
    setItems( (prevItems) => (
     prevItems.map((item) => 
        { return {...item, count: 0} })))}

  const clearCart = (id) => {
    zero_out(id)
  };

  return (
    <div>
        <div class="container-fluid">
          <div class="row">

            <div class="header"> 
              <img class="logo" src={"images/logo.png"}/>
            </div>
            
          </div>
        </div>

        <div class="container">
          <div class="row">
            <div class="col-md-12" align="center">
              <p id="slogan"> Authentic Japanese Flavors </p> 
              <p id="slogan2"> Blend of traditional & innovation </p>
            </div>
          </div>
        </div>

      {/* Alerts */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6"></div>
            <div class="alerts">
                      {orderPlaced ? (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  Order placed!
                  {/* Display order details */}
                  {items.map(item => {
                    if (item.count > 0) {
                      return (
                        <p className="alert-item" key={item.id}>{item.count} {item.title}</p>
                      );
                    }
                    return null;
                  })}
                  <button type="button" className="btn btn-success" onClick={() => setOrderPlaced(false)}>OK</button>
                </div>
              ) : (
                // Check if there are no items in the cart
                showNoItemsAlert && !items.some(item => item.count > 0) ? (
                  <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    No items in cart.
                    <button type="button" className="btn btn-warning" onClick={() => setShowNoItemsAlert(false)}>OK</button>
                  </div>
                ) : null // Render null if there are items in the cart
              )}
            </div>
          </div>
        </div>

      <div className="menu">
        {/* Display menu items dynamicaly here by iterating over the provided menuItems */}
        {items.map((item) => 
          (<div key={item.id}>
            <MenuItem
              id={item.id}
              title={item.title}
              image={item.imageName}
              description={item.description}
              price={'$' + item.price}
              count={item.count}
              increment={increment}
              decrement={decrement}
            />
          </div>
        ))}

      </div>
      
      <div class="row">
        <div class="col-12">
          <p class="subtotal">Subtotal ${calculateTotal().toFixed(2)}</p>
          <button type="button" class="order-btn" onClick={() => {handleOrder()}} data-toggle="modal" data-target="#halllooo">Order</button>
          <button class="clearall-btn" onClick={() => {clearCart()}}>Clear all</button>
        </div>
      </div>
    </div>
  );
}

export default App;