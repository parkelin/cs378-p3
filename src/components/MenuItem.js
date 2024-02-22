import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";

// This is a functional component that represents a single menu item. It currently takes in the title and displays it in an h2 element.
// Modify the component to take in all the other properties of a menu item you need and display them in the component.
// Use bootstrap to style the elements so that it looks like the mockup in the assignment.
// Hint: You can use the image name to get the image from the images folder.
const MenuItem = ({ id, title, image, description, price, count, increment, decrement }) => {

    return (
        <div class="menu">
            <div class="row">
                <div class="col-4">
                    {/* Image */}
                    <img class="image" src={"images/" + image}/>
                </div>

                <div class="col-8">
                    {/* Name + Desc */}
                    <h2 class="menu-name">{title}</h2>
                    <p class="menu-desc">{description}</p>
                    
                    <div class="row">
                        <div class="col-md-12">
                            {/* Price */}
                            <p class="menu-price">{price}</p>

                            <div class="toggle">
                                {/* - button */}
                                <i style={{paddingLeft: "10%"}} class="bi bi-dash-circle" onClick={() => decrement(id)}> {count} </i>

                                {/* + button */}
                                <i class="bi bi-plus-circle" onClick={() => increment(id)}></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItem;