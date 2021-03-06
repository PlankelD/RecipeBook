// export class Ingredient {
//   public name: string;
//   public amount: number;

//   constructor(name: string, amount: number){
//     this.name = name;
//     this.amount = amount;
//   }
// }

//ShortCut
// das gleiche wie: Es wird automatisch Eigenschaften mit den Namen zugewiesen, die wir hier als Argument angeben

export class Ingredient {
  constructor(public name: string, public amount:number){}
}
