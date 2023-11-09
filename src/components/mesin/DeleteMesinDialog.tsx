import { Button, Dialog, DialogFooter, DialogHeader } from "@material-tailwind/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { deleteDeviceById } from "../../service/deviceService"
import { PayloadDeviceType } from "../../types/typeDevice"

type PropsDelType = {
    data: PayloadDeviceType
    isOpen: boolean
    handleOpen: (val: boolean)=> void
}

export const DeleteMesinDialog =({ data, isOpen, handleOpen }: PropsDelType)=>{
    const queryClient = useQueryClient()
    const muttation = useMutation({
        mutationFn: ()=> deleteDeviceById(data.id),
        mutationKey: ["device"],
        onSettled: ()=>{
          queryClient.invalidateQueries({ queryKey: ["device"]})
          handleOpen(false)
        },
        onSuccess: (data)=>{
          toast.success(data.message)
        },
        onError: (data)=>{
          toast.error(data.message)
        }
    })
    
    return (
        <Dialog size="xs" open={isOpen} handler={handleOpen}>
        <DialogHeader>Apakah anda yakin menghapus Mesin ini ?</DialogHeader>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={()=> handleOpen(false)}
            className="mr-1"
          >
            <span>Batal</span>
          </Button>
          <Button variant="gradient" color="green" disabled={muttation.isPending} onClick={()=> {
            muttation.mutate()
          }}>
            <span>Hapus</span>
          </Button>
        </DialogFooter>
        </Dialog>
    )
}