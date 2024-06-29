export const CurrencyFormat = (value: number) => {
  const options2 = { style: 'currency', currency: 'MXN' };
  const numberFormat2 = new Intl.NumberFormat('es-MX', options2);
  return numberFormat2.format(value)
}