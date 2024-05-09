// import { Button } from '@/components/ui/button'
// import useAxiosPrivate from '@/lib/hooks/useAxiosPrivate'
// import useLogout from '@/lib/hooks/useLogout'
// import useViewNavigate from '@/lib/hooks/viewNavigate'
// import transition from '@/lib/transition'
// import { useContext, useEffect, useState } from 'react'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Tabs, TabsContent, TabsList, TabsTrigger, } from '@/components/ui/tabs'
// import { Badge } from '@/components/ui/badge'
// import ThemeContext from '@/components/providers/ThemeProvider'

// const Profile = () => {
//     const axiosPrivate = useAxiosPrivate()
//     const navigate = useViewNavigate()

//     const logout = useLogout()
//     const signOut = async () => {
//         await logout()
//         navigate('/')
//     }

//     const [userData, setUserData] = useState(null)

//     const { theme, setTheme } = useContext(ThemeContext)
//     const [preferredTheme, setPreferredTheme] = useState(theme)
//     const submitPreferences = () => setTheme(preferredTheme)

//     useEffect(() => {
//         let isMounted = true
//         const controller = new AbortController()
//         const fetchData = async () => {
//             try {
//                 const response = await axiosPrivate.get('/users/current', {
//                     signal: controller.signal
//                 })
//                 isMounted && transition(() => setUserData(response.data))
//             } catch (error) {
//                 console.log(error)
//             }
//         }
//         fetchData()
//         return () => {
//             isMounted = false
//             controller.abort()
//         }
//     }, [])

//     return (
//         <div className='flex justify-center'>
//             <Tabs defaultValue='account' className='w-[300px] sm:w-[500px]'>
//                 <TabsList>
//                     <TabsTrigger value='account'>Account</TabsTrigger>
//                     <TabsTrigger value='orders'>Orders</TabsTrigger>
//                     <TabsTrigger value='appearance'>Appearance</TabsTrigger>

//                 </TabsList>
//                 <TabsContent value='account'>
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Account</CardTitle>
//                             <CardDescription>
//                                 Your personal information (temporarily unavailable for changes)
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent className='space-y-3'>
//                             <Label className='mr-5'>User ID: {userData?.id}</Label>
//                             <div className='space-y-2'>
//                                 <Label htmlFor='username'>Username</Label>
//                                 <Input disabled id='username' value={userData?.username || 'Loading...'} />
//                             </div>
//                             <div className='space-y-2'>
//                                 <Label htmlFor='email'>E-mail</Label>
//                                 <Input disabled id='email' value={userData?.email || 'Loading...'} />
//                             </div>
//                             <div className='space-y-2'>
//                                 <Label className='mr-5'>Roles</Label>
//                                 {userData && (
//                                     <Badge>{userData.role}</Badge>
//                                 )}

//                             </div>
//                         </CardContent>
//                         <CardFooter className='justify-between'>
//                             <Button disabled>Save changes</Button>
//                             <Button onClick={signOut}>Sign out</Button>
//                         </CardFooter>
//                     </Card>
//                 </TabsContent>
//                 <TabsContent value='orders'>
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Orders</CardTitle>
//                             <CardDescription>
//                                 History of your orders
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent className='space-y-3'>
//                             Will be implemented soon!
//                         </CardContent>
//                         <CardFooter>
//                             <Button>Save password</Button>
//                         </CardFooter>
//                     </Card>
//                 </TabsContent>
//                 <TabsContent value='appearance'>
//                     <Card>
//                         <CardHeader>
//                             <CardTitle>Appearance</CardTitle>
//                             <CardDescription>
//                                 Customize your application appearance
//                             </CardDescription>
//                         </CardHeader>
//                         <CardContent className='space-y-3'>
//                             <div className='space-y-2'>
//                                 <Label htmlFor='font'>Font</Label>
//                                 <Select disabled>
//                                     <SelectTrigger id='font'>
//                                         <SelectValue placeholder="Geist" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="geist">Geist</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className='space-y-2'>
//                                 <Label htmlFor='theme'>Theme</Label>
//                                 <Select value={preferredTheme} onValueChange={setPreferredTheme}>
//                                     <SelectTrigger id='theme'>
//                                         <SelectValue placeholder="Theme" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="dark">Dark</SelectItem>
//                                         <SelectItem value="light">Light</SelectItem>
//                                         <SelectItem value="system">System</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                         </CardContent>
//                         <CardFooter>
//                             <Button onClick={submitPreferences}>Update preferences</Button>
//                         </CardFooter>
//                     </Card>
//                 </TabsContent>
//             </Tabs>
//         </div>
//         // <div className='flex flex-col gap-5'>
//         //     {!userData && (
//         //         <h2>Loading...</h2>
//         //     )}
//         //     {userData && (
//         //         <ul>
//         //             <li>{userData.username}</li>
//         //             <li>{userData.email}</li>
//         //             <li>{userData.role}</li>
//         //         </ul>
//         //     )}
//         //     
//         // </div>
//     )
// }

// export default Profile


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
import Combobox from "../components/ui/Combobox"
import axios from '@/api/axios'

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

    const [file, setFile] = useState('')
    const [category, setCategory] = useState(null)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState(0.00)


    const categories = ['beds', '2', '3']

    const saveProduct = async () => {
        if (title == null || title === ''
            || price == null || category == null
            || file == null
        ) return;

        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true
        };
        const formData = new FormData();
        formData.append("file", file);
        formData.append('title', title)
        formData.append('description', description)
        formData.append('price', price)
        formData.append('category', category)
        const res = await axios.post('/products', formData, config);
        console.log(res);
    }

    useEffect(() => {
        let isMounted = true
        const controller = new AbortController()
        const fetchData = async () => {
            try {
                const response = await axiosPrivate.get('/users/current', {
                    signal: controller.signal
                })
                console.log(response);
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
                    <TabsTrigger value='products'>Products</TabsTrigger>
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
                <TabsContent value='products'>
                    <Card>
                        <CardHeader>
                            <CardTitle>Products</CardTitle>
                            <CardDescription>
                                Sell your own products
                            </CardDescription>
                        </CardHeader>
                        <CardContent className='space-y-3'>
                            <div className='space-y-2'>
                                <Label htmlFor='title'>Product title</Label>
                                <Input id='title' value={title} onChange={(e) => { setTitle(e.target.value) }} />
                            </div>
                            <div className='space-y-2'>
                                <Label htmlFor='description'>Product description</Label>
                                <Input id='description' value={description} onChange={(e) => { setDescription(e.target.value) }} />
                            </div>
                            <div className='space-y-2'>

                                <Label htmlFor='price'>Product price</Label>
                                <Input id='price' type='number' value={price} min={0} onChange={(e) => { setPrice(e.target.value) }} />
                            </div>
                            <div className='space-y-2 pt-2'>
                                <div className="grid grid-cols-3 items-between">
                                    <Combobox withSearch={true} value={category} setValue={setCategory} itemName={'category'} data={categories} />
                                </div>
                            </div>
                            <div className='space-y-2 pt-3'>
                                <Label htmlFor="files" className='cursor-pointer w-full rounded-md border border-input bg-background px-3 py-2'> {!file ? 'Product Image' : file.name}</Label>
                                <input id='files' type='file' accept="image/*"
                                    className='hidden' onChange={(e) => { setFile(e.target.files[0]) }}></input>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button onClick={saveProduct}>Save product</Button>
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
