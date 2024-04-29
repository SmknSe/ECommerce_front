import { EyeFilledIcon } from "../components/EyeFilledIcon"
import { EyeSlashFilledIcon } from "../components/EyeSlashFilledIcon"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormItem, FormField, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { z } from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from "react"
import transition from "@/lib/transition"
import { useForm } from "react-hook-form"
import { LoaderIcon } from "lucide-react"
import ErrorMessage from "./ErrorMessage"

const schema = z.object({
    username: z.string().trim().min(3, 'Required length is from 3 to 16 characters').max(16, 'Required length from 6 to 16 characters'),
    email: z.string().email('Invalid e-mail format'),
    password: z.string().trim().min(3, 'Too short').max(32, 'Too long'),
    passwordConfirmation: z.string()
}).refine(
    (values) => values.password === values.passwordConfirmation,
    {
        message: "Passwords do not match",
        path: ["passwordConfirmation"]
    }
)

const SignUpForm = () => {
    function onSubmit(value) {
        return {
            message: 'Bad credentials'
        }
    }
    const [isLoading, setLoading] = useState(false)
    const [isPassVisible, setIsPassVisible] = useState(false)
    const togglePassVisibility = () => transition(() => setIsPassVisible(!isPassVisible))
    const form = useForm({
        defaultValues: {
            username: '',
            email: '',
            password: '',
            passwordConfirmation: ''
        },
        resolver: zodResolver(schema)
    })
    const { handleSubmit, formState: { errors }, setError } = form

    return (
        <Card className="w-[350px]">
            <CardHeader>
                <CardTitle>Create your account</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form} className="bg-destructive" noValidate>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input placeholder="JohnDoe" {...field} />

                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="example@mail.com" {...field} />
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
                                            <Input type={isPassVisible ? 'text' : 'password'} placeholder="strongSecret!@$7" {...field} />
                                            <div className="flex absolute mr-3 cursor-pointer" onClick={togglePassVisibility} >
                                                {
                                                    isPassVisible ? <EyeFilledIcon className='text-2xl' /> :
                                                        <EyeSlashFilledIcon className='text-2xl' />
                                                }
                                            </div>
                                        </div>
                                    </FormControl>
                                    <FormDescription>
                                        Between 6 and 32 characters
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="passwordConfirmation"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password Confirmation</FormLabel>
                                    <FormControl>
                                        <div className="flex relative items-center justify-end">
                                            <Input type={isPassVisible ? 'text' : 'password'} placeholder="strongSecret!@$7" {...field} />
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
                            <Button type='button' variant='ghost' onClick={() => { }}>Already have an account?</Button>
                            <Button disabled={isLoading} type='submit'>
                                {isLoading ? (
                                    <>
                                        <LoaderIcon className="animate-spin mr-3"></LoaderIcon>
                                        Loading
                                    </>
                                ) :
                                    'Sign Up'
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
export default SignUpForm