import React, {createContext, useState} from 'react';
import ProductService from "../../services/productService";

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState({
        productName: '',
        barCode: '',
        weight: '',
        height: '',
        length: '',
        description: '',
        commission: ''
    });

    const [details, setDetails] = useState({
        enabled: false,
        soldSeparately: false,
        enabledOnPDV: false,
    });

    const [price, setPrice] = useState({
        unitCost: 0,
        additionalCost: 0,
        finalCost: 0,
        profitPercent: 0,
        salePrice: 0,
    });

    const [inventory, setInventory] = useState({
        minQuantity: 0,
        maxQuantity: 0,
        currentQuantity: 0,
    });

    //images
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);

    const isValidFileExtension = (filename) => {
        const validExtensions = ['jpg', 'jpeg', 'gif', 'png'];
        const fileExtension = filename.split('.').pop().toLowerCase();
        return validExtensions.includes(fileExtension);
    };

    const handleFileChange = (pickerResult) => {
        if (!pickerResult.uri) {
            console.error("Objeto de resposta inválido recebido em handleFileChange.");
            return;
        }

        setUploadedFiles([...uploadedFiles, pickerResult.uri]);
        setPreviews([...previews, pickerResult.uri]);
    };


    const removeFile = (index) => {
        setUploadedFiles(files => files.filter((file, i) => i !== index));
        setPreviews(files => files.filter((file, i) => i !== index));
    }
    //end images


    const handleProduct = (name, value) => {
        setProduct({
            ...product,
            [name]: value
        });
    };

    const handleDetails = (e) => {
        const name = e.target.name;
        const currentValue = details[name];
        setDetails({
            ...details,
            [name]: !currentValue
        });
    };


    const handlePrice = async (name, value) => {
        const parsedValue = parseFloat(value);
        if (isNaN(parsedValue)) {
            // Handle invalid number input, if necessary
            return;
        }

        let updatePrice = { ...price, [name]: parsedValue };

        if (['unitCost', 'additionalCost', 'profitPercent'].includes(name)) {
            const calculatedPrice = await ProductService.calculateProductPrice(updatePrice);
            updatePrice = { ...calculatedPrice };
        }

        setPrice(updatePrice);
    };



    const handleInventory = (name, value) => {
        setInventory({
            ...inventory,
            [name]: value
        });
    };

    return (
        <ProductContext.Provider
            value={{
                product,
                handleProduct,
                details,
                handleDetails,
                price,
                handlePrice,
                inventory,
                handleInventory,
                uploadedFiles,
                previews,
                handleFileChange,
                removeFile,
            }}
        >
            {children}
        </ProductContext.Provider>
    );
};
