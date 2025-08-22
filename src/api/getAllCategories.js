import axios from 'axios'

const Baseurl = "https://api.escuelajs.co/api/v1"

export const getAllCategories = async() => {
    const url = `${Baseurl}/categories`;
    try {
        const {data} = await axios.get(url)
        return data

    } catch(err){
        return err
    }

}