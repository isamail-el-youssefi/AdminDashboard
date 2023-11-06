import Single from "../../components/single/Single";
import { singleProduct } from "../../data";
import "./Product.scss";

export default function Product({ id }) {
  
  //Fetch data and send to single component


    // // Find the product with the matching id
    // const product = products.find((product) => product.id === Number(id));

    // if (!product) {
    //   // Handle the case when the product is not found, e.g., show an error message.
    //   return <div>Product not found</div>;
    // }


  return (
    <div className="product">
      <Single {...singleProduct}/>
    </div>
  );
}
