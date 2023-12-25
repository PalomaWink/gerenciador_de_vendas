'use client';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Recipe } from "../types";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const listIngredientsFormSchema = z.object({
  ingredient: z.string().min(1).max(255), // Exemplo: Limite de 255 caracteres
  price: z.number().positive(),
  itemQuantity: z.number().positive(),
  usedAmount: z.number().positive(),
  priceToCharge: z.number().positive(),
}).refine(data => data.priceToCharge === ((data.price / data.itemQuantity) * data.usedAmount) )
  .refine(data => data.ingredient || data.price || data.itemQuantity || data.usedAmount || data.priceToCharge, {
  message: "Todos os campos são obrigatórios.",
});
export default function Recipe() {
  // o registrer é um hook que registra os inputs do formulário
  // o handleSubmit é um hook que faz o submit do formulário
  // os erros são retornados pelo hook form, e podem ser acessados pelo hook useForm.errors
  const { 
      register, 
      handleSubmit,
      formState: { errors },
    } = useForm<Recipe>({
    resolver: zodResolver(listIngredientsFormSchema),
  });
  const [allRecipes, setAllRecipes] = useState<Recipe[]>([]);

  const createRecipe = (data: Recipe) => {
    setAllRecipes([...allRecipes, data]);
  }

  return (
    <main className="h-screen flex flex-col gap-10 items-center justify-center">
      <form 
        className="w-full max-w-7xl flex justify-center"
        onSubmit={handleSubmit(createRecipe)}
      >
        <div>
          <input 
            className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg" 
            type="text" 
            placeholder="Nome do ingrediente" 
            {...register('ingredient')}
          />
          {errors.ingredient && <p>{errors.ingredient.message}</p>}
        </div>
        <div>
          <input 
            className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg" 
            type="number" 
            placeholder="Valor pago" 
            {...register('price')}  
          />
          {errors.price && <p>{errors.price.message}</p>}
        </div>
        <div>
          <input 
            className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg" 
            type="number" 
            placeholder="Quantidade do pacote (em gramas ou ml)"
            {...register('itemQuantity')} 
          />
          {errors.itemQuantity && <p>{errors.itemQuantity.message}</p>}
        </div>
        <div>
          <input 
            className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg" 
            type="number" 
            placeholder="Quantidade utilizada (em gramas ou ml)"
            {...register('usedAmount')} 
          />
          {errors.usedAmount && <p>{errors.usedAmount.message}</p>}
        </div>
        <div>
          <input 
            className="border-black border-2 mr-2 rounded-xl p-2 shadow-lg" 
            type="number" 
            placeholder="Valor a ser cobrado"
            {...register('priceToCharge')}
          />
          {errors.priceToCharge && <p>{errors.priceToCharge.message}</p>}
        </div>
        <button className="bg-cyan-600 p-3 rounded-xl w-20 hover:bg-cyan-800">Salvar</button>
      </form>
        <table>
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Preço a ser cobrado</th>
            </tr>
          </thead>
      {
        allRecipes.map((recipe, index) => (
            <tbody key={index}>
              <tr>
                <td>{recipe.ingredient}</td>
                <td>{recipe.price}</td>
                <td>{recipe.itemQuantity}</td>
                <td>{recipe.usedAmount}</td>
                <td>{recipe.priceToCharge}</td>
              </tr>
            </tbody>
        ))
      }
      </table>
    </main>
  )
}