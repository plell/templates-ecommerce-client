
import moment from "moment-timezone";

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

export const defaultPickupDay = () => {
  let dd = moment().add(DAYS_BEFORE_PICKUP, 'days')

  const dayOfWeek = dd.day();

  if (dayOfWeek === 1) {
    dd.add(2, 'days')
  } else if (dayOfWeek === 2) {
    dd.add(1, 'days')
  }
   
  return dd.toISOString()
}

  export const cakeInformation:any = {
    "Green Mushroom": {
      label: "Green Goddess",
      id: "Green Mushroom"
    },
    "Pink Ruffle": {
      label: "The Romantic",
      id: "Pink Ruffle"
    },
    "Baby Blue w/ Cherries": {
      label: "The Classic",
      id: "Baby Blue w/ Cherries"
    }
  };

  export const initialValues:any = {
    cake_size: "6-inch",
    cake_type: "Choose a Preset Cake",
    cake_design: cakeInformation["Baby Blue w/ Cherries"].label,
    cake_color:"#f8bbd0",
    pickup_date: defaultPickupDay()
  };

const cakeDesigns = Object.keys(cakeInformation).map((c) => {
  const cake = cakeInformation[c]
  return {
      ...cake
    }
  })

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
    'cake_bottom_Ribbon':'bottom trim/ribbon bottom trim round color.PNG',
    'cake_side_Double String':'side trim/double string side trim.PNG',
    'cake_side_Single String':'side trim/single string side trim.PNG',
    'cake_side_Flat Ribbon':'side trim/flat ribbon side trim color.PNG',
    'cake_side_Ribbon':'side trim/ribbon side trim color.PNG',
    'cake_side_Ruffles': 'side trim/ruffles side trim color.PNG',
    'cake_decorations_cherries_Cherries': 'decorations/cherries/cherries round base.PNG',
    'cake_decorations_sprinkles_Pearls': 'decorations/sprinkles/mini pearls round.PNG',
    'cake_decorations_sprinkles_Stars':'decorations/sprinkles/gold stars round.PNG',
    'cake_decorations_sprinkles_Rainbow': 'decorations/sprinkles/rainbow sprinkles top round no trim.PNG',
    'cake_decorations_trim_accent_Shells': 'decorations/side trim accents/ribbon trim/shell accent ribbon trim color.PNG',
    'cake_decorations_trim_accent_Bows': 'decorations/side trim accents/ribbon trim/bows accent ribbon trim.PNG',
    'cake_decorations_trim_accent_Pearls': 'decorations/side trim accents/ribbon trim/pearls accent ribbon trim.PNG',
    'cake_decorations_trim_accent_Rosettes': 'decorations/side trim accents/ribbon trim/rosettes leaves accent ribbon trim color.PNG',
  'cake_text': 'text/text round.PNG',

  // custom for trim
  'Rosettes_Double String': 'decorations/side trim accents/string - double string trim/rosettes accent string trim color.PNG',
  'Rosettes_Single String': 'decorations/side trim accents/string - double string trim/rosettes accent string trim color.PNG',
  'Rosettes_Flat Ribbon': 'decorations/side trim accents/flat ribbon trim/rosettes accent flat ribbon trim color.PNG',
  'Rosettes_Ribbon': 'decorations/side trim accents/ribbon trim/rosettes accent ribbon trim color.PNG',
  'Rosettes_Ruffles': 'decorations/side trim accents/ruffles trim/rosettes accent ruffles trim color.PNG',

  'Shells_Double String': 'decorations/side trim accents/string - double string trim/shell accent string trim color.PNG',
  'Shells_Single String': 'decorations/side trim accents/string - double string trim/shell accent string trim color.PNG',
  'Shells_Flat Ribbon': 'decorations/side trim accents/flat ribbon trim/shell accent flat ribbon trim color.PNG',
  'Shells_Ribbon': 'decorations/side trim accents/ribbon trim/shell accent ribbon trim color.PNG',
  'Shells_Ruffles': 'decorations/side trim accents/ruffles trim/shell accent ruffles trim color.PNG',

  'Pearls_Double String': 'decorations/side trim accents/string - double string trim/pearls accent string trim.PNG',
  'Pearls_Single String': 'decorations/side trim accents/string - double string trim/pearls accent string trim.PNG',
  'Pearls_Flat Ribbon': 'decorations/side trim accents/flat ribbon trim/pearls accent flat ribbon trim.PNG',
  'Pearls_Ribbon': 'decorations/side trim accents/ribbon trim/pearls accent ribbon trim.PNG',
  'Pearls_Ruffles': 'decorations/side trim accents/ruffles trim/pearls accent ruffles trim.PNG',

  'Bows_Double String': 'decorations/side trim accents/string - double string trim/bows accent string trim.PNG',
  'Bows_Single String': 'decorations/side trim accents/string - double string trim/bows accent string trim.PNG',
  'Bows_Flat Ribbon': 'decorations/side trim accents/flat ribbon trim/bows accent flat ribbon trim.PNG',
  'Bows_Ribbon': 'decorations/side trim accents/ribbon trim/bows accent ribbon trim.PNG',
  'Bows_Ruffles': 'decorations/side trim accents/ruffles trim/bows accent ruffles trim.PNG',

}
  
const heartOptions: any = {
  'cake_design':["Pink Ruffle", "Green Mushroom"],
  'cake_base':["Heart"]
}

export const doCakeImages = (schemaOriginal: any, formStateOriginal: any): string[] => {
  const imgs: string[] = []
  const formState = {...formStateOriginal}
   const schema = [...schemaOriginal]

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
     let value: any = formState[keyname]
     
     if (typeof value === 'string') {
       
       const isCakeDesign = cakeDesigns.find(f => f.label === value)
       if (isCakeDesign) {
         value = isCakeDesign.id
       }
       
       let imgKey = keyname + '_' + value
       //only one key for cake text
       if (keyname === 'cake_text' && value) {
         imgKey = 'cake_text'
       }

       // do side trim accent

       if (keyname === 'cake_decorations_trim_accent') {
        imgKey = getSideTrimAccentImageKey(imgKey, value, formState)
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


function getSideTrimAccentImageKey(imgKey:string, value: string, formValues: any) {  
  const sideTrimValue = formValues["cake_side"]
  if (sideTrimValue) {
    return value+ `_${sideTrimValue}`
  } else {
    return imgKey
  }
  }

  