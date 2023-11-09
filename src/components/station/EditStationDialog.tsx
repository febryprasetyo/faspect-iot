import { Button, Dialog, DialogBody, DialogFooter, DialogHeader, Input, Typography } from "@material-tailwind/react"
import Select from "react-select"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getOptionCities, getOptionDevice, getOptionProvincies } from "../../service/optionSelectService"
import { useForm, Controller } from "react-hook-form"
import toast from "react-hot-toast"
import { PayloadStationServiceType, PayloadStationType, TableStationType } from "../../types/typeStation"
import { updateStationService } from "../../service/stationService"
import { useEffect, useState } from "react"

type PropAddTypeDialog = {
    isOpen: boolean
    handleOpen: (val: boolean)=> void
    defaultData: TableStationType
}
type TypeOption = {
    device_id: number 
    nama_dinas: string
}
type TypeOptionProv = {
    id: number 
    province_name: string
}
type TypeOptionCity = {
    id: number 
    city_name: string
}

export const EditStationDialog =({ isOpen, defaultData, handleOpen }: PropAddTypeDialog)=>{
    const [prov, setProv] = useState<number>(0)
    const queryClient = useQueryClient()
    const { register, handleSubmit, control, formState: { errors }, reset, watch } = useForm<PayloadStationType>()
    const { data } = useQuery({
        queryFn: ()=> getOptionDevice(),
        queryKey: [],
    })
    const { data: provinces } = useQuery({
        queryFn: ()=> getOptionProvincies(),
        queryKey: ["province"]
    })

    const { data: cities } = useQuery({
        queryFn: ()=> getOptionCities(prov),
        queryKey: [prov, "city"]
    })
    
    const muttation = useMutation({
        mutationFn: (payload: PayloadStationServiceType)=> updateStationService(payload),
        mutationKey: ["station"],
        onSuccess: (data)=>{
            toast.success(data.message)
        },
        onError: (data)=>{
            toast.error(data.message)
        },
        onSettled: ()=>{
            queryClient.invalidateQueries({ queryKey: ["station"]})
            reset()
            handleOpen(false)
        }
    })
    const onSubmit = (data: PayloadStationType)=> {
        const copyData = { 
            ...data, 
            device_id: data.device_id.value, 
            province_id: data.province_id.value, 
            city_id: data.city_id.value,
            id: +defaultData.id 
        }
        
        muttation.mutate(copyData)
    }

    useEffect(()=>{
        const subs = watch((val, { type, name })=> {
            if (type === 'change' && name === 'province_id') {
                setProv(val.province_id?.value ?? 0)
            }
        })
        return ()=> subs.unsubscribe()
    }, [watch])

    useEffect(()=>{
        reset({
            nama_dinas: defaultData.nama_stasiun,
            nama_stasiun: defaultData.nama_stasiun,
            address: defaultData.address,
            province_id: { value: defaultData.province_id, label: defaultData.province_name},
            city_id: { label: defaultData.city_name, value: defaultData.city_id},
        })
    }, [defaultData, reset])
    useEffect(()=>{
        if (isOpen) { 
            setProv(defaultData.province_id ?? 0)
        }
    }, [defaultData.province_id, isOpen])
    
    return (
        <Dialog  size="xs" open={isOpen} handler={handleOpen}>
            <DialogHeader>Edit Stasiun</DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
            <DialogBody >
                    <div className="">
                        <Typography variant="h6" color="blue-gray" className="">
                            Nama Stasiun
                        </Typography>
                        <Input
                            size="md"
                            placeholder="Nama Stasiun"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900" crossOrigin={undefined}            // labelProps={{
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                            
                            {...register("nama_stasiun", { required: true })}
                        />
                        {errors.nama_stasiun?.type === "required" && (
                            <p role="alert" className="text-red-600">Nama Stasiun wajib diisi</p>
                        )}
                        <Typography variant="h6" color="blue-gray" className="mt-3">
                            Alamat
                        </Typography>
                        <Input
                            size="md"
                            placeholder="Alamat"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900" crossOrigin={undefined}            // labelProps={{
                            labelProps={{
                                className: "before:content-none after:content-none"
                            }}
                            {...register("address", { required: true })}
                        />
                        {errors.address?.type === "required" && (
                            <p role="alert" className="text-red-600">Alamat wajib diisi</p>
                        )}
                        <Typography variant="h6" color="blue-gray" className="mt-3 mb-2">
                            Device
                        </Typography>
                        <Controller
                            name="device_id"
                            control={control}
                            rules={{ required: true }}
                            render={({ field })=> {
                                return (
                                <Select 
                                    placeholder="Pilih Device"
                                    {...field}
                                    // value={data?.data.filter((val)=>)}
                                    options={data?.data ? data?.data.map((val: TypeOption) => ({label: val.nama_dinas, value: val.device_id})) : []}
                                />
                            )}}
                        />
                        {errors.device_id?.type === "required" && (
                            <p role="alert" className="text-red-600">Device wajib dipilih</p>
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
                            <p role="alert" className="text-red-600">Nama Dinas wajib diisi</p>
                        )}
                        <div className="w-full flex gap-x-2">
                            <div className="flex-1">
                                <Typography variant="h6" color="blue-gray" className="mt-3">
                                    Provinsi
                                </Typography>
                                <Controller
                                    name="province_id"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field })=> {
                                        return (
                                        <Select 
                                            placeholder="Pilih Provinsi"
                                            {...field}
                                            //onChange={(val)=> console.log(val)}
                                            options={provinces?.data ? provinces?.data.map((val: TypeOptionProv) => ({label: val.province_name, value: val.id})) : []}
                                        />
                                    )}}
                                />
                                {errors.province_id?.type === "required" && (
                                    <p role="alert" className="text-red-600">Provinsi wajib dipilih</p>
                                )}        
                            </div>
                            <div className="flex-1">
                            <Typography variant="h6" color="blue-gray" className="mt-3">
                                    Kota/Kab
                                </Typography>
                                <Controller
                                    name="city_id"
                                    control={control}
                                    rules={{ required: true }}
                                    render={({ field })=> {
                                        return (
                                        <Select 
                                        className=""
                                            placeholder="Pilih Kota/Kab"
                                            {...field}
                                            //onChange={(val)=> console.log(val)}
                                            options={cities?.data ? cities?.data.map((val: TypeOptionCity) => ({label: val.city_name, value: val.id})) : []}
                                        />
                                    )}}
                                />
                                {errors.city_id?.type === "required" && (
                                    <p role="alert" className="text-red-600">Kota/Kab wajib dipilih</p>
                                )}            
                            </div>
                     
                        </div>
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