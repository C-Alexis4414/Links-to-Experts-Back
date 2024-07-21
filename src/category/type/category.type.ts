export type CategoryType = {
    id: Number;
    name: String;
}

export type TagType = {
    id: number;
    name: String;
    categoryId: number;
}