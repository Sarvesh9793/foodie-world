import React, { useEffect, useRef, useState } from 'react';
import { useDispatchCart, useCart } from './ContextReducer';

export default function Card({ foodItem, options }) {
  const dispatch = useDispatchCart();
  const data = useCart();
  const priceRef = useRef();
  const priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const handleAddToCart = async () => {
    const food = data.find(item => item.id === foodItem._id && item.size === size);
    const finalPrice = qty * parseInt(options[size]);

    if (food) {
      await dispatch({
        type: "UPDATE",
        id: foodItem._id,
        price: finalPrice,
        qty: qty
      });
    } else {
      await dispatch({
        type: "ADD",
        id: foodItem._id,
        name: foodItem.name,
        price: finalPrice,
        qty: qty,
        size: size
      });
    }
  };

  useEffect(() => {
    setSize(priceRef.current.value);
  }, []);

  return (
    <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
      <img src={foodItem.img} className="card-img-top" alt={foodItem.name} style={{ height: "120px", objectFit: "fill" }} />
      <div className="card-body">
        <h5 className="card-title">{foodItem.name}</h5>
        <div className="container w-100">
          <select className="m-2 h-100 bg-success" onChange={(e) => setQty(e.target.value)}>
            {Array.from(Array(6), (e, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
          <select className="m-2 h-100 bg-success rounded" ref={priceRef} onChange={(e) => setSize(e.target.value)}>
            {priceOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <div className="d-inline h-100 fs-5">₹{qty * parseInt(options[size])}/-</div>
        </div>
      </div>
      <hr />
      <button className="btn btn-success justify-center ms-2" onClick={handleAddToCart}>Add to cart</button>
    </div>
  );
}
