export interface ICourseCard {
    id: number;
    title: string;
    author: string;
    tags: string[];
    actualPrice: number;
    discountPercentage: number;
}

export enum INavigationTypes {
    COURSES = "courses",
    WISHLIST = "wishlist",
    CHECKOUT = "checkout",
    PROFILE = "profile",
  }