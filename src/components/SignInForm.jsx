import { EyeFilledIcon } from "../components/EyeFilledIcon"
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormItem, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useContext, useEffect, useState } from "react"
import transition from "@/lib/transition"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "lucide-react"
import ErrorMessage from "./ErrorMessage"
import axios from "axios"
import { useToast } from "./ui/use-toast"
import { flushSync } from "react-dom"
import useViewNavigate from "@/lib/hooks/viewNavigate"

const schema = z.object({
    username: z.string().trim().min(1, ''),
    password: z.string().trim().min(1, '')
})

const SignInForm = () => {
    const navigate = useViewNavigate()
    async function onSubmit(formData) {
        transition(() => setLoading(true))
        try {
            const response = await axios.post('/auth/login',
                JSON.stringify(formData),
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    validateStatus: (status) => status < 500
                })
            if (response.status === 401) {
                transition(() => {
                    setLoading(false)
                    setError('responseError', { message: 'Bad credentials' })
                })
                return
            }
            else if (response.status === 200)
                navigate('/')

        } catch (err) {
            setLoading(false)
            toast({
                variant: 'destructive',
                title: 'Uh oh! Something went wrong',
                description: 'There was a problem with request, try again later',
            })
        }
    }
    const [isLoading, setLoading] = useState(false)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const togglePassVisibility = () => transition(() => setIsPassVisible(!isPassVisible))
    const form = useForm({
        defaultValues: {
            username: '',
            password: ''
        },
        resolver: zodResolver(schema)
    })
    const { handleSubmit, formState: { errors }, setError } = form
    const { toast } = useToast()

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Sign in to your account</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} className="bg-destructive" noValidate>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username/E-mail</FormLabel>
                                    <FormControl>
                                        <Input {...field} />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="flex relative items-center justify-end">
                                            <Input type={isPassVisible ? 'text' : 'password'} {...field} />
                                            <div className="flex absolute mr-3 cursor-pointer" onClick={togglePassVisibility} >
                                                {
                                                    isPassVisible ? <EyeFilledIcon className='text-2xl' /> :
                                                        <EyeSlashFilledIcon className='text-2xl' />
                                                }
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex flex-col gap-y-4 items-start">
                            <Button type='button' variant='ghost' onClick={() => {
                                transition(() => {
                                    flushSync(() => {
                                        navigate('/')
                                    })
                                })
                            }}>Do not have an account yet?</Button>
                            <Button disabled={isLoading} type='submit'>
                                {isLoading ? (
                                    <>
                                        <LoaderIcon className="animate-spin mr-3"></LoaderIcon>
                                        Loading
                                    </>
                                ) :
                                    'Sign in'
                                }</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter>
                <ErrorMessage error={errors?.responseError} />
            </CardFooter>

        </Card >

    )
}
export default SignInForm