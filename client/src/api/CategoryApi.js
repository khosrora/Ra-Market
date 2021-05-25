import { useState, useEffect } from 'react'
import axios from 'axios';

const CategoryApi = () => {

    const [categories, setCategories] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() => {
        const getcategories = async () => {
            const res = await axios.get("/api/category")
            setCategories(res.data);
        }
        getcategories()
    }, [callback])

    return {
        categories: [categories, setCategories],
        callback: [callback, setCallback]
    }
}

export default CategoryApi
