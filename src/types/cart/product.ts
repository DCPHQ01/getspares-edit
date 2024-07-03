export type CartProduct = {
   availabilityStatus: string;
   category: string;
   company: string;
   companyId: null;
   description: string;
   id: string;
   images: [];
   name: string;
   amount: string;
   currency: string;
   quantity:string;
   productInformation:{
      brand: string;
      countryOfOrigin: string;
      itemModelNumber: string;
      itemWeight: string;
      manufacturer: string;
      manufacturerPartNumber: string;
      model: string;
      productionDimension: string;
      voltage: string;
      quantity:number;
   };
}

export type CartState = {
   cart: CartProduct[];
};
