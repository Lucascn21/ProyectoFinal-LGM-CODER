import React from "react";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { ItemCount } from "../ItemCount/ItemCount";
import { useCartContext } from "../../context/CartContext";

export const ItemDetail = (props) => {
  //Could/Should deestructure but this is more semantic
  const cartContext = useCartContext();
  //Props
  const {
    itemName,
    price,
    stock,
    itemSection,
    itemImage,
    itemDescription,
    quantityInCart,
  } = props.itemData;
  //console.dir(props);
  //Img Placeholding
  const imgFoundPath = itemImage;
  const imgNotFoundPath =
    "https://firebasestorage.googleapis.com/v0/b/react-coder-lgm.appspot.com/o/no_image.jpg?alt=media&token=8c460208-0bf1-49dd-8e2f-5732635a7abc";

  //console.dir(cartContext.getQuantityInCart(props.itemData));

  const onAdd = (amount) => {
    cartContext.addToWidget(amount);
    cartContext.addToCart(props.itemData, amount);
  };

  return (
    <>
      <CardActionArea
        component={RouterLink}
        to={`/item/${itemName}-${itemSection}`.toLowerCase()}
      >
        <CardMedia
          sx={{ objectFit: "cover" }}
          component="img"
          height="140"
          image={itemImage ? imgFoundPath : imgNotFoundPath}
          alt={itemName || "Placeholder"}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {itemName || "Fetching..."}
            <Typography variant="subtitle2" color="text.secondary">
              {itemSection || "Fetching..."}
            </Typography>
          </Typography>
          <Typography variant="overline" color="text.secondary">
            ${new Intl.NumberFormat("de-DE").format(price) || "Fetching..."}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {itemDescription || "Fetching..."}
          </Typography>
        </CardContent>
      </CardActionArea>
      <ItemCount stock={stock - quantityInCart} onAdd={onAdd} />
    </>
  );
};
