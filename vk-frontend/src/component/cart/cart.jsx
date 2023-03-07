import { useContext } from "react"
import { useNavigate } from "react-router-dom";
import { cartContext } from "../cartcontext";
import "./cart.css"
const STRAPI_URL = "http://localhost:1337";

const Cart = () => {
    const cart = useContext(cartContext);
    const navigate = useNavigate()
    // console.log(cart.cartItem);


    const navigateCheckout = () => {
        navigate("/checkout")
    }
    return (
        <>
            <section className="cart-container">
                <div className="game-list">
                    {cart?.cartItem?.map((game) => {
                        return (
                            <div key={game.id} className="game-item">
                                <img src={STRAPI_URL + game?.attributes?.image?.data?.attributes?.url} alt={game.title} />
                                <h2>{game.attributes.title} </h2>
                                <p>{game.attributes.desc}</p>
                                <p>Price: ${game.attributes.price}</p>
                                <center>
                                    <button onClick={navigateCheckout}>Checkut</button>
                                </center>
                            </div>
                        )
                    })}
                </div>
            </section>
        </>
    )
}
export default Cart;