import axios from 'axios'

const Baseurl = "https://api.escuelajs.co/api/v1"

export const getAllProducts = async() => {
    const url = `${Baseurl}/products`;
    try {
        const {data} = await axios.get(url)
        return data

    } catch(err){
        return err
    }

}