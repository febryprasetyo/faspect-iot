import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { TableUserType } from "../../types/typeUser"
import { updateUserService } from "../../service/userService"
import toast from "react-hot-toast"
import { useEffect } from "react"

type PropAddTypeDialog = {
    isOpen: boolean
    handleOpen: (val: boolean)=> void,
    defaultData: TableUserType
}

export const EditUserDialog =({ isOpen, handleOpen, defaultData }: PropAddTypeDialog)=>{
    const queryClient = useQueryClient()
    const { register, handleSubmit, formState: { errors }, reset } = useForm<TableUserType>({
        defaultValues: {
            username: defaultData.username,
            password: "",
            api_key: defaultData.api_key,
            secret_key: defaultData.secret_key,
            nama_dinas: defaultData.nama_dinas
        }
    })

    const muttation = useMutation({
        mutationFn: (payload: TableUserType)=> updateUserService(payload),
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.id = defaultData.id
        muttation.mutate(data)
    }

    useEffect(()=>{
        reset({
            username: defaultData.username,
            password: "",
            api_key: defaultData.api_key,
            secret_key: defaultData.secret_key,
            nama_dinas: defaultData.nama_dinas
        })
    }, [defaultData, reset])
    
    return (
        <Dialog size="xs" open={isOpen} handler={handleOpen}>
            <DialogHeader>Edit User</DialogHeader>
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
                            {...register("username", { required: true, value: 'aas' })}
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