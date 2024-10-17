
const formatPriceIndian = (price: string | number ): string => {
    const priceString = Number(price);

    const formatter = new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        minimumFractionDigits: 2
      });

      return formatter.format(priceString);
  
  
};


export default formatPriceIndian;
