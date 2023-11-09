import {
    ChevronUpDownIcon, TrashIcon,
  } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    CardFooter,
    IconButton,
    Tooltip,
    Spinner,
  } from "@material-tailwind/react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../../store/auth";
import { usePagination } from "../../hooks/usePagination";
import { getPaginateStation } from "../../service/stationService";
import { TableStationType } from "../../types/typeStation";
import { DeleteStationDialog } from "./DeleteStationDialog";
import { AddStationDialog } from "./AddStationDialog";
import { EditStationDialog } from "./EditStationDialog";
  
const TABLE_HEAD = ["#", "Nama Stasiun", "ID Mesin", "Alamat", "Provinsi", "Kota", ""];
  
const TableStasiun = () => {
    const { token } = useAuth()
    const [offset, setOffset] = useState<number>(0)
    const [page, setPage] = useState<number>(1)
    const [isOpenDeleteDialog, setIsOpenDeleteDialog] = useState<boolean>(false)
    const [isOpenAddDialog, setIsOpenAddDialog] = useState<boolean>(false)
    const [isOpenEditDialog, setIsOpenEditDialog] = useState<boolean>(false)
    const [currentSelected, setCurrentSelected] = useState<TableStationType>({ address: "", nama_stasiun: "", city_id: 0, province_id: 0, id: "", id_mesin: "", province_name: "", city_name: "" })
    const { data, isLoading } = useQuery({ queryKey: ["station", offset], queryFn: ()=> getPaginateStation({ limit: 10, offset, token: token || ''})})
    const paginate = usePagination({ currentPage: page, totalCount: data?.data?.total, siblingCount: 1, pageSize: 10})
    
     // const n = useMemo(()=> offset == 0 ? offset + 1 : offset - 10, [offset])
    const next = () => {
      const totalPageCount = Math.ceil(data?.data?.total / 10);
      if (page === totalPageCount) return;
   
      setOffset(offset + 10);
      setPage(page + 1)
    };
   
    const prev = () => {
      if (page === 1) return;
   
      setOffset(offset - 10);
      setPage(page - 1)
    };
  
    const getItemProps = (index: number) =>
      ({
        variant: page === index ? "outlined" : "text",
        color: "gray",
        onClick: () => {
          setPage(index)
          const configOffset = index === 1 ? 0 : (index - 1) * 10
          setOffset(configOffset)
        },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } as any);
  
    if (isLoading) {
      return (
        <div className="h-full w-full flex justify-center items-center">
          <Spinner className="h-12 w-12 mt-8" color="blue"/>
        </div>
      )
    }
    return (
      <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h3" color="blue-gray">
                List Mesin
              </Typography>
              
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button onClick={()=> setIsOpenAddDialog(true)} className="inline-flex items-center justify-center gap-2.5 rounded-full bg-meta-5 py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10">
                <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Tambah
              </Button>
            </div>
          </div>
          
        </CardHeader>
        <CardBody className="px-0 overflow-x-auto">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head, index) => (
                  <th
                    key={index}
                    className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                    >
                      {head}{" "}
                      {index !== TABLE_HEAD.length - 1 && (
                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                      )}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data?.data?.values && data?.data?.values.map(
                ({ id, id_mesin, nama_stasiun, address, province_name, city_name, province_id, city_id }: TableStationType, index: number) => {
                  const isLast = index === +data?.data?.total;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";
  
                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {index+1+offset}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {nama_stasiun ?? ""}
                          </Typography>
                          
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {id_mesin ?? ""}
                          </Typography>
                          
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {address ?? ""}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {province_name ?? ""}
                        </Typography>
                      </td>
                      <td className={classes}>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {city_name ?? ""}
                        </Typography>
                      </td>
                      
                      <td className={classes}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text" onClick={()=>{
                            setCurrentSelected({ id, province_id, city_id, address, id_mesin, nama_stasiun, province_name, city_name })
                            setIsOpenEditDialog(true)
                          }}>
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                      <td className={classes}>
                        <Tooltip content="Delete User">
                          <IconButton onClick={()=>{
                            setCurrentSelected({ id, province_id, city_id, address, id_mesin, nama_stasiun, province_name, city_name })
                            setIsOpenDeleteDialog(true)
                          }} variant="text">
                            <TrashIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Button onClick={prev} variant="outlined" size="sm">
            Previous
          </Button>
          <div className="flex items-center gap-2">
            {
              paginate && paginate.map((item)=>(
                <IconButton key={item} size="sm" {...getItemProps(+item)}>
                  {item}
                </IconButton>
              ))
            }
          </div>
          <Button onClick={next} variant="outlined" size="sm">
            Next
          </Button>
        </CardFooter>
      </Card>
      <DeleteStationDialog isOpen={isOpenDeleteDialog} data={currentSelected} handleOpen={setIsOpenDeleteDialog}/>
      <AddStationDialog isOpen={isOpenAddDialog} handleOpen={setIsOpenAddDialog}/>
      <EditStationDialog isOpen={isOpenEditDialog} handleOpen={setIsOpenEditDialog} defaultData={currentSelected}/>
      </>
    );
  };
  
  export default TableStasiun;
  