
import {
    cakeSchema,
    customCake,
    presetCake,
} from "../../../core/form/schema";
    
export const cakeDesignSchemas: any = {
    preset: presetCake,
    custom: customCake,
  };

  export const presetCakes = [
    {
      img: "cake/example cakes/baby blue with cherries.png",
    },
    {
      img: "cake/example cakes/mushroom cake.png",
    },
    {
      img: "cake/example cakes/pastel pink with ruffles.png",
    },
  ];
  
  export const initialValues = {
    cake_size: ["8-inch"],
    cake_compote: null,
    cake_flavor: ["Cardamom"],
    cake_base: ["Round"],
    cake_design:["Pink Ruffle"]
  };

  