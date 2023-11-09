import { useState, useEffect } from "react"
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

type FormType = {
  username: string
  password: string
}

export function SignIn() {
  const { actionLogin, setLoadingLogin, errMsg, loadingLogin, isLogin } = useAuth()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [form, setForm] = useState<FormType>({ username: "", password: "" })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [errForm, setErrForm] = useState<string>("")
  const navigate = useNavigate()

  const handleSubmitLogin =()=>{
    if (!form.password || !form.username) {
      setErrForm("Pastikan Form Username & Password Terisi")
      return
    }
    setLoadingLogin(true)
    actionLogin(form)
  }

  useEffect(()=>{
    if (isLogin) {
      navigate("/")
    }
  }, [isLogin, navigate])
  
  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4">
        <Card className="absolute top-2/4 left-2/4 w-full max-w-[24rem] -translate-y-2/4 -translate-x-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            { errForm && <Typography className="text-sm" color="red">{errForm}</Typography>}
            { errMsg && <Typography className="text-sm" color="red">{errMsg}</Typography>}
            <Input
              onChange={(e)=> setForm({...form, username: e.target.value})}
              type="text" label="username" size="lg" crossOrigin={undefined} />
            <Input 
              onChange={(e)=> setForm({...form, password: e.target.value})}
              type="password" label="Password" size="lg" crossOrigin={undefined} />
            {/* <div className="-ml-2.5">
              <Checkbox label="Remember Me" crossOrigin={undefined} />
            </div> */}
          </CardBody>
          <CardFooter className="pt-0">
            <Button onClick={handleSubmitLogin} disabled={loadingLogin} className="bg-blue-gray-900" fullWidth>
              Sign In
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}

export default SignIn;