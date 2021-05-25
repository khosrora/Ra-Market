import { useContext } from 'react'
import { GlobalState } from './../../../GlobalState';





const Filter = () => {

    const state = useContext(GlobalState);
    console.log(state);
    const [categories] = state.categoriesAPI.categories;
    
    const [category, setCategory] = state.productsAPI.category;
    const [sort, setSort] = state.productsAPI.sort;
    const [search, setSearch] = state.productsAPI.search;


    const handleCategory = e => {
        setCategory(e.target.value)
        setSearch("")
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>دسته بندی</span>
                <select name="category" value={category} onChange={handleCategory}>
                    <option value="">تمام محصولات</option>
                    {
                        categories.map(category => (
                            <option
                                value={"category=" + category._id}
                                key={category._id}
                            >
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            <input type="text" value={search} placeholder="جست و جو "
                onChange={e => setSearch(e.target.value.toLowerCase())}
            />
            <div className="row sort">
                <span>مرتب کن </span>
                <select name="category" value={sort} onChange={e => setSort(e.target.value)}>
                    <option value="">جدیدترین</option>
                    <option value="sort=oldest">قدیمی ترین</option>
                    <option value="sort=-sold">بیشترین فروش</option>
                    <option value="sort=-price">بیشترین قیمت</option>
                    <option value="sort=price">کمترین قیمت</option>
                </select>
            </div>
        </div>
    )
}

export default Filter
