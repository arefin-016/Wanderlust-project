import { ArrowRight, Check } from 'lucide-react';
import React from 'react';
import { Button } from '../ui/button';
import { toast } from '../ui/toast';
import { Iitem } from '@/types/item';
import { authClient } from '@/lib/auth-client';

const BookingsCard = ({item}:{item:Iitem}) => {
	const perks = [
  "Free cancellation up to 7 days",
  "Travel insurance included",
  "24/7 customer support",
];
const {data: session,} =authClient.useSession()
	const user=session?.user
	const handleBookNow =async () => {
    if (!item) return;
    const dateInput = document.getElementById(
      "booking-date"
    ) as HTMLInputElement | null;
    toast.add({
      type: "success",
      title: "Booking confirmed",
      description: `${item.destinationName} is booked for ${
        dateInput?.value || item.departureDate || "your selected date"
      }.`,
    });
	const bookingData={
		name:user?.name,
		email:user?.email,
		...item,
		departureData:dateInput?.value,
		bookingDate:new Date()
	}
const res=await fetch(`http://localhost:8000/booking`,{
	method:"POST",
	headers:{
		'Content-Type':"application/json"
	},
	body:JSON.stringify(bookingData)
})
const data=await res.json()
console.log(data)
  };
	return (
		 <aside className="lg:sticky lg:top-24 lg:self-start">
                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  <p className="text-sm text-muted-foreground">Starting from</p>
                  <p className="mt-1 text-4xl font-bold text-sky-600">
                    ${item.price}
                  </p>
                  <p className="text-xs text-muted-foreground">per person</p>
				  <form action="">
                  <input
				  name='departureDate'
                    id="booking-date"
                    type="date"
                    defaultValue={item.departureDate}
                    className="mt-5 w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700 outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-100"
                  />

                  <Button
                    className="mt-4 w-full gap-2 bg-sky-600 text-white hover:bg-sky-700"
                    onClick={handleBookNow}
                  >
                    Book Now
                    <ArrowRight className="h-4 w-4" />
                  </Button>
				  </form>


                  <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                    {perks.map((perk) => (
                      <p
                        key={perk}
                        className="flex items-start gap-2 text-sm text-gray-700"
                      >
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
                        {perk}
                      </p>
                    ))}
                  </div>
                </div>
              </aside>
	);
};

export default BookingsCard;