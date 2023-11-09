import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { TableUserType } from "../../types/typeUser"
import { addUserService } from "../../service/userService"
import toast from "react-hot-toast"

type PropAddTypeDialog = {
    isOpen: boolean
    handleOpen: (val: boolean)=> void
}

export const AddUserDialog =({ isOpen, handleOpen }: PropAddTypeDialog)=>{
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TableUserType>({
        defaultValues: {
            username: "",
            password: "",
            api_key: "",
            secret_key: "",
            nama_dinas: ""
        }
    })
    const muttation = useMutation({
        mutationFn: (payload: TableUserType)=> addUserService(payload),
        mutationKey: ["user"],
        onSuccess: (data)=>{
            toast.success(data.message)
        },
        onError: (data)=>{
            toast.error(data.message)
        },
        onSettled: ()=>{
            queryClient.invalidateQueries({ queryKey: ["user"]})
            handleOpen(false)
            reset()
        }
    })
    const onSubmit = (data: TableUserType)=> {
        muttation.mutate(data)
    }
    
    return (
        <Dialog size="xs" open={isOpen} handler={handleOpen}>
            <DialogHeader>Tambah User</DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogBody>
                    <div>
                        <Typography variant="h6" color="blue-gray" className="">
                            Username
                        </Typography>
                        
                        <Input
                            size="md"
                            placeholder="Username"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900" crossOrigin={undefined}            // labelProps={{
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                            
                            {...register("username", { required: true })}
                        />
                        {errors.username?.type === "required" && (
                            <p role="alert" className="text-red-600">Username wajib diisi</p>
                        )}
                        <Typography variant="h6" color="blue-gray" className="mt-3">
                            Password
                        </Typography>
                        <Input
                            size="md"
                            placeholder="Password"
                            type="password"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900" crossOrigin={undefined}            // labelProps={{
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                            {...register("password", { required: true })}
                        />
                        {errors.password?.type === "required" && (
                            <p role="alert" className="text-red-600">Password wajib diisi</p>
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
                            <p role="alert" className="text-red-600">Nama dinas wajib dipilih</p>
                        )}
                        <Typography variant="h6" color="blue-gray" className="mt-3">
                            Api Key
                        </Typography>
                        <Input
                            size="md"
                            placeholder="Api Key"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900" crossOrigin={undefined}            // labelProps={{
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                            {...register("api_key", { required: true })}
                        />
                        {errors.api_key?.type === "required" && (
                            <p role="alert" className="text-red-600">Api Key wajib diisi</p>
                        )}
                        <Typography variant="h6" color="blue-gray" className="mt-3">
                            Secret Key
                        </Typography>
                        <Input
                            size="md"
                            placeholder="Secret Key"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900" crossOrigin={undefined}            // labelProps={{
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                            {...register("secret_key", { required: true })}
                        />
                        {errors.secret_key?.type === "required" && (
                            <p role="alert" className="text-red-600">Secret Key wajib diisi</p>
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