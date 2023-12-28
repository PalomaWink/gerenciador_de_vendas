'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Clients } from "../types";

const clientsFormSchema = z.object({
  clientName: z.string()
    .min(1)
    .max(255)
    .transform(clientName => clientName.trim().split(/\s+/).map(word => word[0].toUpperCase() + word.slice(1)).join(' ')),
  amountPaid: z.string().min(1).transform((value) => parseFloat(value)),
  paymentDate: z.string(),
  amountDue: z.string().min(1).transform((value) => parseFloat(value)),
}).refine(data => data.clientName && !isNaN(data.amountPaid) && !isNaN(data.amountDue), {
  message: "Todos os campos são obrigatórios e devem ser números válidos.",
});

export default function Client() {
  const {handleSubmit, register, reset, formState: { errors }} = useForm<Clients>({
    resolver: zodResolver(clientsFormSchema),
  })
  const [allClients, setAllClients] = useState<Clients[]>([])

  const createClient = (data: Clients) => {
    const paymentDate = new Date(data.paymentDate);
    const formattedPaymentDate = paymentDate.toLocaleDateString('pt-BR');
    setAllClients([...allClients, {...data, paymentDate: formattedPaymentDate}])
    reset()
  }
    return (
      <main className="h-screen flex flex-col gap-10 items-center justify-center">
        <form 
          className="w-full max-w-7xl flex justify-center md:flex-col md:items-center"
          onSubmit={handleSubmit(createClient)}
        >
          <div>
            <input
              className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg md:mb-5"
              type="text" 
              placeholder="Nome do cliente"
              {...register('clientName')}
            />
            {errors.clientName && <p>{errors.clientName.message}</p>}
          </div>
          <div>
            <input
              className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg md:mb-5"
              type="number" 
              placeholder="Valor pago"
              {...register('amountPaid')}
            />
            {errors.amountPaid && <p>{errors.amountPaid.message}</p>}
          </div>
          <div>
            <input 
              className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg md:mb-5"
              type="date" 
              placeholder="Data de pagamento"
              {...register('paymentDate')}
            />
            {errors.paymentDate && <p>{errors.paymentDate.message}</p>}
          </div>
          <div>
            <input
              className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg"
              type="number" 
              placeholder="Valor devido"
              {...register('amountDue')}
            />
            {errors.amountDue && <p>{errors.amountDue.message}</p>}
          </div>
          <button className="bg-cyan-600 p-3 rounded-xl w-32 hover:bg-cyan-800 mt-3">Adicionar</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Nome do cliente</th>
              <th>Valor pago</th>
              <th>Data de pagamento</th>
              <th>Valor devido</th>
            </tr>
          </thead>
          <tbody>
            {
              allClients.map(client => (
                <tr key={client.clientName}>
                  <td>{client.clientName}</td>
                  <td>R${client.amountPaid}</td>
                  <td>{client.paymentDate}</td>
                  <td>R${client.amountDue}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </main>
    )
}