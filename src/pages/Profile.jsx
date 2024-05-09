import { Button } from '@/components/ui/button'
import useAxiosPrivate from '@/lib/hooks/useAxiosPrivate'
import useLogout from '@/lib/hooks/useLogout'
import useViewNavigate from '@/lib/hooks/viewNavigate'
import transition from '@/lib/transition'
import { useContext, useEffect, useState } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import ThemeContext from '@/components/providers/ThemeProvider'

const Profile = () => {
    const axiosPrivate = useAxiosPrivate()
    const navigate = useViewNavigate()

    const logout = useLogout()
    const signOut = async () => {
        await logout()
        navigate('/')
    }

    const [userData, setUserData] = useState(null)

    const { theme, setTheme } = useContext(ThemeContext)
    const [preferredTheme, setPreferredTheme] = useState(theme)
    const submitPreferences = () => setTheme(preferredTheme)

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/users/current', {
                    signal: controller.signal
                })
                isMounted && transition(() => setUserData(response.data))
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
        return () => {
            isMounted = false
            controller.abort()
        }
    }, [])

    return (
        <div className='flex justify-center'>
            <Tabs defaultValue='account' className='w-[300px] sm:w-[500px]'>
                <TabsList>
                    <TabsTrigger value='account'>Account</TabsTrigger>
                    <TabsTrigger value='orders'>Orders</TabsTrigger>
                    <TabsTrigger value='appearance'>Appearance</TabsTrigger>

                </TabsList>
                <TabsContent value='account'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Account</CardTitle>
                            <CardDescription>
                                Your personal information (temporarily unavailable for changes)
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <Label className='mr-5'>User ID: {userData?.id}</Label>
                            <div className='space-y-2'>
                                <Label htmlFor='username'>Username</Label>
                                <Input disabled id='username' value={userData?.username || 'Loading...'} />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='email'>E-mail</Label>
                                <Input disabled id='email' value={userData?.email || 'Loading...'} />
                            </div>
                            <div className='space-y-2'>
                                <Label className='mr-5'>Roles</Label>
                                {userData && (
                                    <Badge>{userData.role}</Badge>
                                )}

                            </div>
                        </CardContent>
                        <CardFooter className='justify-between'>
                            <Button disabled>Save changes</Button>
                            <Button onClick={signOut}>Sign out</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value='orders'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Orders</CardTitle>
                            <CardDescription>
                                History of your orders
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='space-y-2'>
                                <Label htmlFor='current'>Current password</Label>
                                <Input id='current' type='password' />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='new'>New password</Label>
                                <Input id='new' type='password' />
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button>Save password</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
                <TabsContent value='appearance'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Appearance</CardTitle>
                            <CardDescription>
                                Customize your application appearance
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='space-y-2'>
                                <Label htmlFor='font'>Font</Label>
                                <Select disabled>
                                    <SelectTrigger id='font'>
                                        <SelectValue placeholder="Geist" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="geist">Geist</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='theme'>Theme</Label>
                                <Select value={preferredTheme} onValueChange={setPreferredTheme}>
                                    <SelectTrigger id='theme'>
                                        <SelectValue placeholder="Theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="dark">Dark</SelectItem>
                                        <SelectItem value="light">Light</SelectItem>
                                        <SelectItem value="system">System</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={submitPreferences}>Update preferences</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
        // <div className='flex flex-col gap-5'>
        //     {!userData && (
        //         <h2>Loading...</h2>
        //     )}
        //     {userData && (
        //         <ul>
        //             <li>{userData.username}</li>
        //             <li>{userData.email}</li>
        //             <li>{userData.role}</li>
        //         </ul>
        //     )}
        //     
        // </div>
    )
}

export default Profile