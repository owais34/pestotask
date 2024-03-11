import { useEffect, useState } from "react";



function useDialog(message){
    const [dialogMessage,setDialogMessage]=useState(message)
    const [showDialog, setShowDialog] = useState(false)

    useEffect(()=>{
        if(dialogMessage)
            setShowDialog(true)
    },[dialogMessage])

    return {showDialog, setDialogMessage,dialogMessage,setShowDialog}
}

export {
    useDialog
}