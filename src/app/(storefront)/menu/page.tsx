export default function MenuPage() {
  const items = [
    ["🍕", "Ali Baba Special", "Pepperoni, spicy beef, peppers, onions & mozzarella", "£11.99"],
    ["🍕", "Margherita", "Tomato, mozzarella, basil and our secret sauce", "£8.99"],
    ["🍕", "BBQ Chicken", "BBQ chicken, red onion, sweetcorn & smoky sauce", "£10.99"],
    ["🍔", "Big Baba Burger", "Two smashed beef patties, cheese, lettuce & house sauce", "£9.49"],
    ["🍗", "Hot Wings", "Crispy wings tossed in your choice of spicy sauce", "£6.49"],
    ["🥤", "Churros & Dip", "Warm cinnamon churros with chocolate dipping sauce", "£4.49"],
  ];
  return (
    <main className="menu-page">
      <div className="menu-intro">
        <div>
          <div className="eyebrow">Fresh from the kitchen</div>
          <h1>Our menu</h1>
        </div>
        <p>
          From legendary pizzas to loaded sides, everything is made to order and made to make you
          smile.
        </p>
      </div>
      <div className="menu-tabs">
        <button className="menu-tab active">All favourites</button>
        <button className="menu-tab">Pizza</button>
        <button className="menu-tab">Burgers</button>
        <button className="menu-tab">Chicken</button>
        <button className="menu-tab">Sides &amp; drinks</button>
      </div>
      <div className="product-grid">
        {items.map(([icon, name, description, price]) => (
          <article className="product-card" key={name}>
            <div className="product-visual" aria-hidden="true">
              {icon}
            </div>
            <div className="product-info">
              <h3>{name}</h3>
              <p>{description}</p>
              <div className="product-bottom">
                <span className="price">{price}</span>
                <button className="add-button" aria-label={`Add ${name} to cart`}>
                  +
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
