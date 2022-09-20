
import moment from "moment";
import { DAYS_BEFORE_PICKUP } from "../../../../constants";

export const initialValues:any = {
    pickup_date: moment().add(DAYS_BEFORE_PICKUP,'days').format()  
  };

export const fakeItems = [
    {
        label: 'Shirt',
        image: 'bakery.jpg',
        price: 2000,
        product_id: 'kuahfsuhsga',
        options: [
            {
            label: 'S'
            },
            {
            label: 'M'
            },
            {
                label: 'L'
            }]
    },
    {
        label: 'Shirt',
        image: 'bakery.jpg',
        price: 2000,
        product_id:'kuahfadsgsuhsga'
    },
    {
        label: 'Shirt',
        image: 'bakery.jpg',
        price: 2000,
        product_id:'kuahf43tsuhsga'
    },
    {
        label: 'Shirt',
        image: 'bakery.jpg',
        price: 2000,
        product_id:'kuahfs2t334tuhsga'
    },
    {
        label: 'Shirt',
        image: 'bakery.jpg',
        price: 2000,
        product_id:'ku45y54ahfsuhsga'
      }
  ]