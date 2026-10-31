

import { auth } from "@/lib/auth";
import MyBookingsCard from "@/components/MyBookingsCard";
import { headers } from "next/headers";

const MyBookingsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user=session?.user
  const res=await fetch(`http://localhost:8000/my-bookings/${user?.email}`)
  const data=await res.json()
  console.log(data)

  return (
    <div>
      <MyBookingsCard data={data}></MyBookingsCard>
    </div>
  );
};

export default MyBookingsPage;