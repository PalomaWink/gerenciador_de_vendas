'use Client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";


export default function Client() {
    return (
      <main className="h-screen flex flex-col gap-10 items-center justify-center">
        <form className="w-full max-w-7xl flex justify-center">
          <div>
            <input
              className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg"
              type="text" 
              placeholder="Nome do cliente"
              
            />
          </div>
          <div>
            <input
              className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg"
              type="number" 
              placeholder="Valor pago"
              
            />
          </div>
          <div>
            <input 
              className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg"
              type="date" 
              placeholder="Data de pagamento"
              
            />
          </div>
          <div>
            <input
              className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg"
              type="number" 
              placeholder="Valor devido"
              
            />
          </div>
        </form>
      </main>
    )
}