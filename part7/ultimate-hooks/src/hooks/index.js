import {useEffect, useState} from 'react'
import axios from 'axios'

export const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
        setValue(event.target.value)
    }

    return {
        type,
        value,
        onChange
    }
}

export const useResource = (baseUrl) => {
    const [resources, setResources] = useState([])

    const index = async () => {
        if (baseUrl) {
            let apiRes = null
            try {
                apiRes = await axios.get(`${ baseUrl }`);
            } catch (err) {
                console.error("Error response:");
                console.error(err.response);
            } finally {
                if (apiRes) {
                    if (apiRes.status === 200) {
                        setResources(apiRes.data)
                    }
                }
            }
        }
    }

    useEffect( () => {
        index()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [baseUrl])

    const create = async (resource) => {
        if (baseUrl) {
            let apiRes = null
            try {
                apiRes = await axios.post(`${ baseUrl }`, resource);
            } catch (err) {
                console.error("Error response:");
                console.error(err.response);
            } finally {
                if (apiRes) {
                    if (apiRes.status === 201) {
                        setResources(resources.concat(apiRes.data))
                    }
                }
            }
        }
    }

    const service = {
        create
    }

    return [
        resources, service
    ]
}