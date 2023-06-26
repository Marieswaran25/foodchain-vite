export const generateOrderno = () => {
    const getrandom = () => {
        const pickarray = [];
        for (let i = 0; i <= 6; i++) {
            const pick = Math.floor(Math.random() * 9);
            pickarray.push(pick);
        }
        return pickarray.join("");
    };
    let string = "ORD";
    string += getrandom();
    return string;
};
