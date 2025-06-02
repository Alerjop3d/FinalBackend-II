import { model, Schema } from "mongoose"
import mongoosepaginatev2 from 'mongoose-paginate-v2'

// Definir el modelo
const productSchema = new Schema({
    id: Number,
    title: String,
    price: Number,
    type: String,
    gamma: String,
    stock: Number,
    status: Boolean,
    img: String
});

productSchema.plugin(mongoosepaginatev2)

const Product = model('Products', productSchema);
export default Product;