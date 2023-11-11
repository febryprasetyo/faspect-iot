import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { PayloadDeviceType } from "../../types/typeDevice"
import { updateDeviceService } from "../../service/deviceService"
import { useEffect } from "react"

type PropEditTypeDialog = {
    isOpen: boolean
    handleOpen: (val: boolean)=> void
    defaultData: PayloadDeviceType
}

export const EditMesinDialog =({ isOpen, handleOpen, defaultData }: PropEditTypeDialog)=>{
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<PayloadDeviceType>({
        defaultValues: {
            id_mesin: "",
            nama_dinas: "",
            nama_stasiun: ""
        }
    })
    
    const muttation = useMutation({
        mutationFn: (payload: PayloadDeviceType)=> updateDeviceService(payload),
        mutationKey: ["device"],
        onSuccess: (data)=>{
            toast.success(data.message)
        },
        onError: (data)=>{
            toast.error(data.message)
        },
        onSettled: ()=>{
            queryClient.invalidateQueries({ queryKey: ["device"]})
            handleOpen(false)
            reset()
        }
    })
    const onSubmit = (data: PayloadDeviceType)=> {
        data.id = defaultData.id
        muttation.mutate(data)
    }

    useEffect(()=>{
        reset({
            nama_dinas: defaultData.nama_dinas,
            id_mesin: defaultData.nama_dinas,
            nama_stasiun: defaultData.nama_stasiun
        })
    }, [defaultData, reset])
    
    return (
        <Dialog size="xs" open={isOpen} handler={handleOpen}>
            <DialogHeader>Edit Mesin</DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogBody>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="">
                            ID Mesin
                        </Typography>
                        <Input
                            size="md"
                            placeholder="Id mesin"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900" crossOrigin={undefined}            // labelProps={{
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                            
                            {...register("id_mesin", { required: true })}
                        />
                        {errors.id_mesin?.type === "required" && (
                            <p role="alert" className="text-red-600">Id mesin wajib diisi</p>
                        )}
                        <Typography variant="h6" color="blue-gray" className="mt-3">
                            Nama Dinas
                        </Typography>
                        <Input
                            size="md"
                            placeholder="Nama Dinas"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900" crossOrigin={undefined}            // labelProps={{
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                            {...register("nama_dinas", { required: true })}
                        />
                        {errors.nama_dinas?.type === "required" && (
                            <p role="alert" className="text-red-600">Nama dinas wajib diisi</p>
                        )}
                        <Typography variant="h6" color="blue-gray" className="mt-3">
                            Nama Stasiun
                        </Typography>
                        <Input
                            size="md"
                            placeholder="Nama stasiun"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900" crossOrigin={undefined}            // labelProps={{
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                            {...register("nama_stasiun", { required: true })}
                        />
                        {errors.nama_stasiun?.type === "required" && (
                            <p role="alert" className="text-red-600">Nama stasiun wajib diisi</p>
                        )}
                    </div>
            </DialogBody>
            <DialogFooter>
                <Button
                    variant="text"
                    color="red"
                    onClick={()=> handleOpen(false)}
                    className="mr-1"
                >
                    <span>Batal</span>
                </Button>
                <Button variant="gradient" color="green" type="submit">
                    <span>Simpan</span>
                </Button>
            </DialogFooter>
            </form>
        </Dialog>
    )
}