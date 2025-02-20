import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { bookingSchema } from '../validation/InputValidation'
import { Card, InputForm, SelectForm } from '../components/InputForm'
import { toast } from 'sonner'
import { Loader2 } from 'lucide-react'
import axios from 'axios'

export const BookingDetails = () => {

     const {register, handleSubmit, formState: {errors}, reset}=useForm({
        resolver: zodResolver(bookingSchema),
     });

     const [loading, setLoading] = useState(false);

     const onSubmit= async (data)=>{
        setLoading(true);

        try {

           const response= await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/notify-booking`,data);

            console.log(response.data);
            toast.success("Booking confirmed successfully!");
            setLoading(false);
            reset();

            
        } catch (error) {
            console.log(error);
            toast.error("Error in booking confirmation"); 
            
        }

        setLoading(false);

     }


  return (
    <div className='flex justify-center items-center h-screen'>

        <Card title="Booking Details">
            <form onSubmit={handleSubmit(onSubmit)}>

                <InputForm label="Name" type='text' register={register("name")} error={errors.name} placeholder="Enter your full name"/>

                <InputForm label="Email" type='email' register={register("email")} error={errors.email} placeholder="Enter your email"/>

                <InputForm label="Phone" type='tel' register={register("phone")} error={errors.phone} placeholder="Enter your phone number"/>

                <div className='flex  space-x-4'>
                    <InputForm label="Check-in" type="date" register={register("checkin_date")} error={errors.checkin_date} placeholder=""/>
                    <InputForm label="Check-out" type="date" register={register("checkout_date")} error={errors.checkout_date} placeholder=""/>

                </div>

                <SelectForm label="Item Type" register={register("item_type")} error={errors.item_type} options={["stay","Experience","Transport","Package","Cruise"]}/>

                <InputForm label="Item Details" type="text" register={register("item_details")} error={errors.item_details} placeholder="Luxury Beach Resort, Goa"/>

                <InputForm label="Amount(INR)" type="number" register={register("amount")} error={errors.amount} placeholder="Enter the amount"/>



                <button type='submit' className=" w-full flex items-center justify-center gap-2 mt-4  py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700" disabled={loading}>
                    {loading ? (
                            <>
                            <Loader2 className='animate-spin h-4 w-4'/> Processing...
                            </>
                    ): "Confirm Booking"
                }
                </button>

            </form>


        </Card>


    </div>
  )
}

export default BookingDetails