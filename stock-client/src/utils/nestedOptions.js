export const nestedOptions = (items,label = "label") => items?.map((item) => {
    return {
        value: item?.[label],
        menuLevel: 1,
    }
})