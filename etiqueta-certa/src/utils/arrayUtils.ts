export function moveItemInArray<T>(arr: T[], fromIndex: number, toIndex: number): T[] {
    if (fromIndex < 0 || fromIndex >= arr.length || toIndex < 0 || toIndex >= arr.length) {
        console.error("Índices fora dos limites do array");
        return arr;
    }

    const newArr = [...arr];
    const [item] = newArr.splice(fromIndex, 1);
    newArr.splice(toIndex, 0, item);

    return newArr;
}

