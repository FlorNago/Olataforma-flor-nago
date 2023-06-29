import Image from "next/image"

import Background from "@/imagens/Background.jpg"
import { AiOutlineUser } from "react-icons/ai"

async function getUser(user_id) {
 const response = await fetch(
  `${process.env.BACKEND_URL}/user/information/${user_id}`,
  {
   method: "GET",
   headers: {
    "Content-Type": "application/json",
   },
   cache: "no-store",
  }
 )

 const data = await response.json()

 return data
}

export default async function PaginaDePerfil({ params }) {
 const user = await getUser(params.id)
 console.log(user)

 return (
  <main className="profile-page">
   <section className="relative block" style={{ height: "500px" }}>
    <div
     className="absolute top-0 w-full h-full bg-center bg-cover"
     style={{
      backgroundImage: `url('${Background.src}')`,
     }}
    ></div>
    <div
     className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
     style={{ height: "70px" }}
    >
     <svg
      className="absolute bottom-0 overflow-hidden"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      version="1.1"
      viewBox="0 0 2560 100"
      x="0"
      y="0"
     >
      <polygon
       className="text-gray-300 fill-current"
       points="2560 0 2560 100 0 100"
      ></polygon>
     </svg>
    </div>
   </section>
   <section className="relative py-16 bg-gray-300">
    <div className="container mx-auto px-4">
     <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
      <div className="px-6">
       <div className="flex flex-col items-center">
        {user.image_url !== null ? (
         <Image
          alt="..."
          src={user.image_url}
          className="shadow-xl rounded-full align-middle border-none relative bottom-16 w-[150px] h-[150px] object-cover"
          width={150}
          height={150}
         />
        ) : (
         <AiOutlineUser
          size={150}
          className="shadow-xl rounded-full align-middle border-none relative bottom-16 w-[150px] h-[150px] bg-white"
         />
        )}
        <div className="px-4 lg:order-1 p-6 flex items-center -m-16">
         <div className="p-3 text-center">
          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
           {user.followers.length}
          </span>
          <span className="text-sm text-gray-500">Seguidores</span>
         </div>
         <div className="p-3 text-center">
          <span className="text-xl font-bold block uppercase tracking-wide text-gray-700">
           {user.following.length}
          </span>
          <span className="text-sm text-gray-500">Seguindo</span>
         </div>
        </div>
       </div>
       <div className="text-center mt-12">
        <h3 className="text-4xl font-semibold leading-normal text-gray-800 mb-2">
         {user.username ? `@${user.username}` : "Sem nome de usuário"}
        </h3>
        <p className="text-gray-400">
         {user.instagram ? `@${user.instagram}` : "Instagram não informado"}
        </p>
       </div>
       <div className="flex items-center justify-center mt-2 gap-4">
        {user.segments &&
         user.segments.map((segment, index) => {
          return (
           <span
            key={index}
            className="bg-quarta/10 text-segunda text-base font-medium px-2.5 py-0.5 rounded"
           >
            {segment.name}
           </span>
          )
         })}
       </div>
       <div className="mt-10 py-10 border-t border-gray-300 text-center">
        <div className="flex flex-wrap justify-center">
         <div className="w-full lg:w-9/12 px-4">
          <p className="mb-4 text-lg leading-relaxed text-gray-800">
           {user.biography}
          </p>
         </div>
        </div>
       </div>
      </div>
     </div>
    </div>
   </section>
  </main>
 )
}
