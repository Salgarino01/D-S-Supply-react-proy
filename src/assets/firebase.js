import { initializeApp } from "firebase/app";
import {getFirestore, addDoc, collection, getDocs, getDoc, doc, updateDoc, deleteDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBid7zWfBLdDgm9Tn2eLAoJZf1QPFoHoxQ",
    authDomain: "ds-supply.firebaseapp.com",
    projectId: "ds-supply",
    storageBucket: "ds-supply.appspot.com",
    messagingSenderId: "690392720234",
    appId: "1:690392720234:web:f66069de84e27de8217b13",
    measurementId: "G-9FYW9NXEMY"
};

const app = initializeApp(firebaseConfig);
console.log(app)

const db = getFirestore()

const cargarBDD = async () => {
    const promise = await fetch('./json/Productos.json')
    const Productos = await promise.json()
    Productos.forEach(async (prod) => {
        await addDoc(collection(db,"Productos"), { //collection si existe consulta si no existe crea
            idCategoria: prod.idCategoria,
            nombre: prod.nombre,
            descripcion: prod.descripcion,
            detalle: prod.detalle,
            precio: prod.precio,
            stock: prod.stock,
            img: prod.img,
            srcset1: prod.srcset1,
            srcset2: prod.srcset2,
            imgbg: prod.imgbg
        })
    })
}

const getProductos = async () => {
    const Productos = await getDocs(collection(db, "Productos"))
    const items = Productos.docs.map(prod => {
        return {...prod.data(), id:prod.id}
    })
    return items
}

const getProducto = async (id) => {
    const producto = await getDoc(doc(db, "Productos", id))
    const item = {...producto.data(), id:producto.id}
    return item
}

const updateProducto = async (id, info) => {
    const estado = await updateDoc(doc(db, "Productos", id), info)
    return estado
}

const deleteProducto = async (id) => {
    const estado = await deleteDoc(doc(db, "Productos", id))
    return estado
}

const createOrdenCompra = async (cliente, Productos, preTotal, fecha) => {
    const ordenCompra = await addDoc(collection(db, "ordenCompra"),{
        nombre: cliente.name,
        email: cliente.email,
        telefono: cliente.tel,
        entrega: cliente.entrega,
        direccion: cliente.address,
        Productos: Productos,
        fecha: fecha,
        precioTotal: preTotal
    })

    return ordenCompra
}

const getOrdenCompra = async (id) => {
    const ordenCompra = await getDoc(doc(db, "ordenCompra", id))
    const item = {...ordenCompra.data(), id: ordenCompra.id}
    return item
}

export {cargarBDD, getProductos, getProducto, updateProducto, deleteProducto, createOrdenCompra, getOrdenCompra}