module.exports = (temp, product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replaceAll('{%PRICE%}', product.price);
    output = output.replace(/{%QUANTITY%}/, product.quantity);
    output = output.replace(/{%ID%}/, product.id);
    output = output.replace(/{%DESCRIPTION%}/, product.description);
    output = output.replace(/{%FROM%}/, product.from);
    output = output.replace(/{%NUTRIENTS%}/, product.nutrients);

    if (!product.organic)
        output = output.replace(/{%NOT_ORGANIC%}/, 'not-organic');

    return output;
};
