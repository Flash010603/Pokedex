import { useEffect, useState } from "react"


export const useDebounce = (input: string = "", timeout:number = 500) => {
    
    const [debounceValue, setDebounceValue] = useState(input);

    useEffect(() => {

        const time = setTimeout(() => {
            
            setDebounceValue(input)

        }, timeout);

        return ()=>{
            clearTimeout(time);
        }
    }, [input])
    
    return {
        debounceValue
    }
}
