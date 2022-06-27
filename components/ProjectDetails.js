/**** Component not used for the moment ****/

import { useState } from "react";
import styles from "./ProjectDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocalStorageValue } from "@mantine/hooks";

export const ProjectDetails = (props) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const { projects, current } = useSelector((state) => state.projects);
  const [currProdLocal, setCurrProdLocal] = useLocalStorageValue({
    key: "currProd",
  });
  const [project, setProject] = useState(
    projects[current - 1] ?? currProdLocal.currProd
  );
  const [quantity, setQuantity] = useState(1);
  const [disable, setDisable] = useState(false);

  //let product = products[current - 1] ?? currProdLocal.currProd;
  //const prodId = currProdLocal.currProd && currProdLocal.currProd.id;
  /* 
  const getProduct = async () => {
    const url = `https://fakestoreapi.com/products/${prodId}`;
    const data = await axios.get(url);
    //dispatch(setProducts(data.data));
    product = data.data;
    console.log(product);
  };
  if (!product) {
    getProduct();
  }*/

  const { title, image, description, price, rating, category, id } = props;
  return (
    <div className={styles.projectDetails}>
      <div className={styles.prodImgDiv}>
        <img className={styles.image} src={image} alt={title}></img>
      </div>
      <div className={styles.prodTitleDiv}>
        <h2 className={styles.title}>{title}</h2>
        <p>Category: {category}</p>
        <p>
          Rating: {rating && rating.rate} ({rating && rating.count} custumer
          reviews)
        </p>
        <span className={styles.price}>${price}</span>
        <p>{description}</p>
        <div className={styles.quantityDiv}></div>
      </div>
    </div>
  );
};
