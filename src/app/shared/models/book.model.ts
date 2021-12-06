export class Book {
    id?: string;
    name!: string;
    isFavorite?: Boolean
    categoryId?: string;    //if books are to be connected to its category   
    image?: string;         //if books have images
   
}
