
import moment from "moment";
import { DAYS_BEFORE_PICKUP } from '../../../../constants'

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
  
export const initialValues:any = {
    cake_size: "6-inch",
    cake_type: "Choose a Preset Cake",
    cake_design: 'Baby Blue w/ Cherries',
    pickup_date: moment().add(DAYS_BEFORE_PICKUP,'days').format()  
  };


export const cakeImages: any = {
    'cake_design_Baby Blue w/ Cherries': 'example cakes/baby blue with cherries.PNG',
    'cake_design_Pink Ruffle': 'example cakes/pastel pink with ruffles.PNG',
    'cake_design_Green Mushroom': 'example cakes/mushroom cake.PNG',
    'cake_base_Round': 'base/round base color.PNG',
    'cake_base_Heart': 'base/heart base color.PNG',
    'cake_top_Shell':'top trim/shell top trim round color.PNG',
    'cake_top_Ruffles':'top trim/ribbon top trim round color.PNG',
    'cake_top_Rosettes': 'top trim/rosettes top trim round color.PNG',
    'cake_bottom_Shell':'bottom trim/shell bottom trim round color.PNG',
    'cake_bottom_Ruffles':'',
    'cake_bottom_Heart Line':'',
    'cake_bottom_Rosettes':'',
    'cake_side_Double String':'side trim/double string side trim.PNG',
    'cake_side_Single String':'side trim/single string side trim.PNG',
    'cake_side_Flat Ribbon':'side trim/flat ribbon side trim color.PNG',
    'cake_side_Ribbon':'side trim/ribbon side trim color.PNG',
    'cake_side_Ruffles': 'side trim/ruffles side trim color.PNG',
    'cake_decorations_cherries_Cherries': 'decorations/cherries/cherries round base.PNG',
    'cake_decorations_sprinkles_Pearls': 'decorations/sprinkles/mini pearls round.PNG',
    'cake_decorations_sprinkles_Stars':'decorations/sprinkles/gold stars round.PNG',
    'cake_decorations_sprinkles_Rainbow': 'decorations/sprinkles/rainbow sprinkles top round no trim.PNG',
    'cake_decorations_trim_accent_Bows': 'decorations/side trim accents/ribbon trim/bows accent ribbon trim.PNG',
    'cake_decorations_trim_accent_Pearls': 'decorations/side trim accents/ribbon trim/pearls accent ribbon trim.PNG',
    'cake_decorations_trim_accent_Rosettes': 'decorations/side trim accents/ribbon trim/rosettes leaves accent ribbon trim color.PNG',
    'cake_text':'text/text round.PNG'
}
  
const heartOptions: any = {
  'cake_design':["Pink Ruffle", "Green Mushroom"],
  'cake_base':["Heart"]
}

 export const doCakeImages = (schema:any, formState:any) => {
   const imgs: string[] = [] 

   let isHeart:boolean = false

   schema.forEach((s: any) => {
     const key = s.name
     const keyValue = formState[key]
     if (keyValue && heartOptions[key]?.includes(keyValue)) {
      isHeart = true
     }
   })
   
   schema.forEach((s: any) => {
     const keyname:string = s.name
     const value: any = formState[keyname]
     
     if (typeof value === 'string') {
       let imgKey = keyname + '_' + value
       //only one key for cake text
       if (keyname === 'cake_text' && value) {
         imgKey = 'cake_text'
       }
       let imgUrl: string = cakeImages[`${imgKey}`]
       
       if (imgUrl) {
         if (isHeart) {
           console.log('IS HEART!')
           imgUrl = imgUrl.replace('round', 'heart')
           console.log('imgUrl',imgUrl)
         }
         imgs.push(imgUrl)

         if (imgUrl.includes('color')) {
           // add lines
           let lineImgUrl = imgUrl.replace('color','line')
           imgs.push(lineImgUrl)
         }
       }
     }
   })
   
  
   return imgs
  }