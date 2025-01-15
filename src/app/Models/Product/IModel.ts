export interface IProductEntity {
  id:number;
  keysat:string;
  keyunit:string;
  description:string;
  barcode:string;
  lineid:number | string;
  brandid:number | string;
  cost:number;
  price:number;
  existence:number;
  maximum:number;
  minimun:number;
  urlimage:string;
  isdeleted:boolean;
  //createdate:unknown | Date;
}
export interface IProductView{
  prodid:number;
  nameproduct:string;
  nameline:string;
  namebrand:string;
  urlimage:string;
  price:number;
}
