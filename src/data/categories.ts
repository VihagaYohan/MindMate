class Category {
    _id: string
    name: string

    constructor(
        id: string,
        name: string
    ) {
        this._id = id;
        this.name = name;
    }
}

const categories: Category[] = [
    new Category("68e26956ecafb9e684d9b184", "Depression"),
    new Category("68e26cf3e034a1559778ee48", "Anger"),
    new Category("68e26d32e034a1559778ee4a", "Anxiety"),
    new Category("68e26d49e034a1559778ee4c", "Stress"),
    new Category("68e26d5de034a1559778ee4e", "Panic")
];

export default categories